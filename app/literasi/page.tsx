"use client";

import React, { useState } from "react";
import Link from "next/link";
import { mockArticles, mockGlossary } from "@/lib/data/articles";

export default function LiteracyCenterPage() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [glossaryQuery, setGlossaryQuery] = useState("");

  const categories = Array.from(new Set(mockArticles.map((a) => a.category)));

  const filteredArticles =
    selectedCategory === "all"
      ? mockArticles
      : mockArticles.filter((a) => a.category === selectedCategory);

  const filteredGlossary = mockGlossary.filter(
    (g) =>
      g.term.toLowerCase().includes(glossaryQuery.toLowerCase()) ||
      g.definition.toLowerCase().includes(glossaryQuery.toLowerCase()),
  );

  return (
    <div className="min-h-screen py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-12">
      {/* BREADCRUMB & HEADER */}
      <div className="space-y-2">
        <div className="flex items-center gap-2 text-xs text-ink-muted">
          <Link href="/" className="hover:underline">
            Beranda
          </Link>
          <span>/</span>
          <span className="font-semibold text-ink">Literasi Politik</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-ink">
          Pusat Literasi & Edukasi Demokrasi
        </h1>
        <p className="text-xs sm:text-sm text-ink-soft max-w-3xl">
          Pahami konsep tata negara, sistem pemilu, cara verifikasi informasi
          politik, serta glosarium istilah-istilah politik secara mudah dan
          kontekstual.
        </p>
      </div>

      {/* SECTION 1: EDUCATIONAL ARTICLES (SRS §10.5) */}
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-line pb-4">
          <h2 className="text-xl font-extrabold text-ink">
            Artikel Edukasi & Panduan
          </h2>

          {/* Categories Filter */}
          <div className="flex flex-wrap gap-1.5">
            <button
              onClick={() => setSelectedCategory("all")}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                selectedCategory === "all"
                  ? "bg-brand-800 text-white"
                  : "bg-mist/50 text-ink-soft hover:bg-mist"
              }`}
            >
              Semua Topik
            </button>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                  selectedCategory === cat
                    ? "bg-brand-800 text-white"
                    : "bg-mist/50 text-ink-soft hover:bg-mist"
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
            <div
              key={article.id}
              className="p-6 bg-white rounded-3xl border border-line hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <span className="px-2.5 py-0.5 rounded-md bg-mist/60 text-brand-800 font-bold">
                    {article.category}
                  </span>
                  <span className="text-ink-muted">
                    {article.readTime} min baca
                  </span>
                </div>
                <h3 className="text-base font-extrabold text-ink hover:text-brand-700:text-sage transition-colors">
                  <Link href={`/literasi/${article.slug}`}>
                    {article.title}
                  </Link>
                </h3>
                <p className="text-xs text-ink-soft line-clamp-3 leading-relaxed">
                  {article.excerpt}
                </p>
              </div>

              <div className="pt-4 mt-4 border-t border-line flex items-center justify-between text-xs">
                <span className="text-ink-muted">{article.publishedAt}</span>
                <Link
                  href={`/literasi/${article.slug}`}
                  className="font-bold text-brand-700 hover:underline"
                >
                  Baca Selengkapnya →
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* SECTION 2: POLITICAL GLOSSARY (FR-014) */}
      <div className="p-6 sm:p-8 bg-brand-900 text-white rounded-3xl space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-gold">
              Kamus Istilah Politik
            </span>
            <h2 className="text-2xl font-extrabold text-white mt-1">
              Glosarium Politik Digital
            </h2>
          </div>

          <div className="w-full sm:w-72">
            <input
              type="text"
              value={glossaryQuery}
              onChange={(e) => setGlossaryQuery(e.target.value)}
              placeholder="Cari istilah (misal: Dapil, APBD, RAG)..."
              className="w-full px-4 py-2.5 rounded-xl bg-brand-800 border border-line text-white placeholder-mist/70 text-xs focus:outline-none focus:ring-2 focus:ring-gold"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredGlossary.map((item) => (
            <div
              key={item.id}
              className="p-5 rounded-2xl bg-brand-800/80 border border-line/80 space-y-2"
            >
              <div className="flex items-center justify-between">
                <h3 className="text-base font-extrabold text-gold">
                  {item.term}
                </h3>
                {item.relatedTerms && (
                  <div className="flex gap-1">
                    {item.relatedTerms.map((rt) => (
                      <span
                        key={rt}
                        className="px-2 py-0.5 rounded text-[10px] bg-brand-700 text-mist"
                      >
                        {rt}
                      </span>
                    ))}
                  </div>
                )}
              </div>
              <p className="text-xs text-mist leading-relaxed">
                {item.definition}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
