"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { mockArticles, mockGlossary } from "@/lib/data/articles";

export default function LiteracyCenterPage() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [glossaryQuery, setGlossaryQuery] = useState("");
  const [selectedLetter, setSelectedLetter] = useState("all");
  const [copiedTermId, setCopiedTermId] = useState<string | null>(null);

  const categories = Array.from(new Set(mockArticles.map((a) => a.category)));

  // Available initial letters from glossary terms
  const alphabetIndex = useMemo(() => {
    const letters = new Set<string>();
    mockGlossary.forEach((item) => {
      const firstChar = item.term.charAt(0).toUpperCase();
      if (/[A-Z]/.test(firstChar)) {
        letters.add(firstChar);
      }
    });
    return Array.from(letters).sort();
  }, []);

  const filteredArticles =
    selectedCategory === "all"
      ? mockArticles
      : mockArticles.filter((a) => a.category === selectedCategory);

  const filteredGlossary = useMemo(() => {
    return mockGlossary.filter((item) => {
      // Letter filter
      if (selectedLetter !== "all") {
        if (item.term.charAt(0).toUpperCase() !== selectedLetter) {
          return false;
        }
      }

      // Search query filter
      if (glossaryQuery.trim()) {
        const q = glossaryQuery.toLowerCase();
        const matchesTerm = item.term.toLowerCase().includes(q);
        const matchesDef = item.definition.toLowerCase().includes(q);
        const matchesRelated = item.relatedTerms?.some((rt) =>
          rt.toLowerCase().includes(q),
        );
        if (!matchesTerm && !matchesDef && !matchesRelated) return false;
      }

      return true;
    });
  }, [glossaryQuery, selectedLetter]);

  const handleCopyDefinition = (id: string, term: string, def: string) => {
    navigator.clipboard.writeText(`${term}: ${def}`);
    setCopiedTermId(id);
    setTimeout(() => setCopiedTermId(null), 2000);
  };

  return (
    <div className="min-h-screen py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-16">
      {/* BREADCRUMB & HEADER */}
      <div className="space-y-3">
        <div className="flex items-center gap-2 text-xs text-ink-muted">
          <Link href="/" className="hover:underline">
            Beranda
          </Link>
          <span>/</span>
          <span className="font-semibold text-ink">Literasi Politik</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-ink tracking-tight">
          Pusat Literasi & Edukasi Demokrasi
        </h1>
        <p className="text-xs sm:text-sm text-ink-soft max-w-3xl leading-relaxed">
          Pahami konsep tata negara, sistem pemilu, cara verifikasi informasi
          politik, serta glosarium istilah-istilah politik secara mudah, netral,
          dan kontekstual.
        </p>
      </div>

      {/* SECTION 1: EDUCATIONAL ARTICLES */}
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-line pb-4">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-sage">
              Panduan Pemilih
            </span>
            <h2 className="text-xl font-black text-ink">
              Artikel Edukasi & Panduan Publik
            </h2>
          </div>

          {/* Categories Filter */}
          <div className="flex flex-wrap gap-1.5">
            <button
              onClick={() => setSelectedCategory("all")}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${selectedCategory === "all"
                  ? "bg-brand-800 text-white shadow-sm"
                  : "bg-white text-ink-soft hover:bg-mist/50 border border-line"
                }`}
            >
              Semua Topik
            </button>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${selectedCategory === cat
                    ? "bg-brand-800 text-white shadow-sm"
                    : "bg-white text-ink-soft hover:bg-mist/50 border border-line"
                  }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {filteredArticles.map((article) => (
            <article
              key={article.id}
              className="p-6 bg-white rounded-3xl border border-line hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <span className="px-2.5 py-0.5 rounded-md bg-brand-50 text-brand-800 font-bold border border-brand-100">
                    {article.category}
                  </span>
                  <span className="text-ink-muted text-[11px] font-medium">
                    📖 {article.readTime} mtk baca
                  </span>
                </div>
                <h3 className="text-base font-extrabold text-ink hover:text-brand-700 transition-colors leading-snug">
                  <Link href={`/literasi/${article.slug}`}>
                    {article.title}
                  </Link>
                </h3>
                <p className="text-xs text-ink-soft line-clamp-3 leading-relaxed">
                  {article.excerpt}
                </p>
              </div>

              <div className="pt-4 mt-5 border-t border-line flex items-center justify-between text-xs">
                <span className="text-ink-muted text-[11px]">
                  {article.publishedAt}
                </span>
                <Link
                  href={`/literasi/${article.slug}`}
                  className="font-bold text-brand-700 hover:text-brand-900 flex items-center gap-1"
                >
                  <span>Baca</span>
                  <span>→</span>
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* SECTION 2: POLITICAL GLOSSARY (REDESIGNED DICTIONARY) */}
      <section className="space-y-6 pt-4 border-t border-line">
        {/* GLOSSARY HEADER */}
        <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-cream to-white border border-line shadow-sm space-y-6">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="space-y-1">
              <h2 className="text-2xl sm:text-3xl font-black text-ink">
                Glosarium Demokrasi & Tata Negara
              </h2>
              <p className="text-xs sm:text-sm text-ink-soft max-w-2xl">
                Cari dan pahami definisi istilah-istilah politik, pemilu, serta
                lembaga negara secara transparan dan akurat.
              </p>
            </div>

            {/* SEARCH INPUT BAR */}
            <div className="w-full lg:w-80 relative">
              <div className="relative">
                <input
                  type="text"
                  value={glossaryQuery}
                  onChange={(e) => setGlossaryQuery(e.target.value)}
                  placeholder="Cari istilah (contoh: Dapil, APBD, KPU)..."
                  className="w-full pl-10 pr-9 py-3 rounded-2xl bg-white border border-line text-ink placeholder:text-ink-muted text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-sage shadow-sm"
                />
                <svg
                  className="w-4 h-4 text-ink-muted absolute left-3.5 top-3.5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
                {glossaryQuery && (
                  <button
                    onClick={() => setGlossaryQuery("")}
                    className="absolute right-3 top-3 text-ink-muted hover:text-ink text-xs font-bold"
                  >
                    ✕
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* ALPHABETICAL INDEX BAR (A - Z) */}
          <div className="space-y-2 pt-2 border-t border-line/60">
            <div className="flex items-center justify-between text-xs text-ink-muted font-medium">
              <span>Indeks Abjad:</span>
              <span>
                Menampilkan <strong>{filteredGlossary.length}</strong> istilah
              </span>
            </div>
            <div className="flex flex-wrap gap-1">
              <button
                onClick={() => setSelectedLetter("all")}
                className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${selectedLetter === "all"
                    ? "bg-brand-800 text-white shadow-sm"
                    : "bg-white text-ink-soft hover:bg-mist/40 border border-line"
                  }`}
              >
                Semua Abjad
              </button>
              {alphabetIndex.map((letter) => (
                <button
                  key={letter}
                  onClick={() => setSelectedLetter(letter)}
                  className={`w-8 h-8 rounded-lg text-xs font-bold transition-all ${selectedLetter === letter
                      ? "bg-brand-800 text-white shadow-sm"
                      : "bg-white text-ink-soft hover:bg-mist/40 border border-line"
                    }`}
                >
                  {letter}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* DICTIONARY CARDS GRID */}
        {filteredGlossary.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {filteredGlossary.map((item) => (
              <div
                key={item.id}
                className="p-6 rounded-3xl bg-white border border-line shadow-sm hover:shadow-md transition-all duration-200 space-y-3 flex flex-col justify-between relative group"
              >
                <div className="space-y-2.5">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-2xl bg-brand-50 border border-brand-100 flex items-center justify-center font-black text-brand-800 text-sm shrink-0">
                        {item.term.charAt(0).toUpperCase()}
                      </div>
                      <h3 className="text-lg font-black text-ink group-hover:text-brand-800 transition-colors">
                        {item.term}
                      </h3>
                    </div>

                    {/* Copy button */}
                    <button
                      onClick={() =>
                        handleCopyDefinition(item.id, item.term, item.definition)
                      }
                      className="px-2.5 py-1 rounded-lg text-[11px] font-bold text-ink-muted hover:text-brand-800 bg-cream hover:bg-mist/60 border border-line transition-colors shrink-0"
                      title="Salin definisi ke clipboard"
                    >
                      {copiedTermId === item.id ? "✓ Tersalin" : "Salin"}
                    </button>
                  </div>

                  {/* Definition text */}
                  <p className="text-xs text-ink-soft leading-relaxed pt-1">
                    {item.definition}
                  </p>
                </div>

                {/* Related Terms tags */}
                {item.relatedTerms && item.relatedTerms.length > 0 && (
                  <div className="pt-3 border-t border-line/60 flex items-center gap-1.5 flex-wrap">
                    <span className="text-[10px] font-bold text-ink-muted uppercase">
                      Terkait:
                    </span>
                    {item.relatedTerms.map((rt) => (
                      <button
                        key={rt}
                        onClick={() => setGlossaryQuery(rt)}
                        className="px-2 py-0.5 rounded-md text-[10px] font-semibold bg-mist/40 hover:bg-mist text-ink hover:text-brand-800 border border-line/60 transition-colors"
                      >
                        #{rt}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="p-12 text-center bg-white rounded-3xl border border-line space-y-3">
            <div className="text-4xl">📖</div>
            <h3 className="text-base font-bold text-ink">
              Istilah Tidak Ditemukan
            </h3>
            <p className="text-xs text-ink-muted max-w-md mx-auto">
              Tidak ada istilah politik yang cocok dengan pencarian &quot;
              {glossaryQuery}&quot; atau abjad &quot;{selectedLetter}&quot;.
            </p>
            <button
              onClick={() => {
                setGlossaryQuery("");
                setSelectedLetter("all");
              }}
              className="px-4 py-2 rounded-xl bg-brand-800 text-white text-xs font-bold hover:bg-brand-700"
            >
              Reset Filter Abjad & Pencarian
            </button>
          </div>
        )}
      </section>
    </div>
  );
}
