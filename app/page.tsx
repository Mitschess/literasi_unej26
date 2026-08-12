"use client";

import React from "react";
import Link from "next/link";
import { mockCandidates } from "@/lib/data/candidates";
import { mockArticles } from "@/lib/data/articles";
import { CandidateCard } from "@/components/candidate/CandidateCard";
import {
  HeroSection,
  PipelineSection,
  PrinciplesMarquee,
} from "@/components/home/HeroInteractive";
import SpotlightCard from "@/components/SpotlightCard";
import AnimatedContent from "@/components/AnimatedContent";
import ClickSpark from "@/components/ClickSpark";
import BlurText from "@/components/BlurText";
import FadeContent from "@/components/FadeContent";

export default function Home() {
  const featuredCandidates = mockCandidates.slice(0, 4);
  const featuredArticles = mockArticles.slice(0, 3);

  return (
    <ClickSpark sparkColor="#2A9D8F" sparkSize={8} sparkRadius={18} sparkCount={10}>
      <div className="flex flex-col min-h-screen bg-cream">
        <HeroSection />
        <PrinciplesMarquee />

        <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full space-y-10">
          <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4">
            <div className="space-y-2">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-sage">
                Eksplorasi Data
              </p>
              <BlurText
                text="Kandidat & Rekam Jejak"
                delay={60}
                className="font-display text-3xl sm:text-4xl text-ink"
              />
            </div>
            <Link
              href="/kandidat"
              className="group inline-flex items-center gap-2 text-sm font-semibold text-brand-700 hover:text-brand-900 transition-colors"
            >
              Lihat semua ({mockCandidates.length})
              <span className="transition-transform group-hover:translate-x-1">→</span>
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-6 items-start">
            {featuredCandidates.map((candidate, index) => (
              <AnimatedContent
                key={candidate.id}
                distance={40}
                delay={index * 0.08}
                duration={0.7}
              >
                <CandidateCard candidate={candidate} />
              </AnimatedContent>
            ))}
          </div>
        </section>

        {/* BIJAK MEMILIH INTEGRATED FEATURES SECTION */}
        <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
          <div className="p-8 sm:p-10 rounded-3xl bg-gradient-to-br from-cream via-white to-brand-50/30 border border-line shadow-sm space-y-8">
            <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4">
              <div className="space-y-2">
                <span className="px-3 py-1 rounded-full bg-brand-800 text-white text-[11px] font-extrabold uppercase tracking-wider">
                  Fitur Interaktif · Bijak Memilih
                </span>
                <h2 className="font-display text-3xl sm:text-4xl text-ink">
                  Kenali & Tentukan Pilihanmu Lebih Bijak
                </h2>
                <p className="text-xs sm:text-sm text-ink-soft max-w-2xl leading-relaxed">
                  Pelajari isu strategis nasional dan rasakan simulasi hari pemilu secara transparan dan netral.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* CARD 1: ISU STRATEGIS */}
              <div className="p-6 rounded-2xl bg-white border border-line shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between space-y-4 group">
                <div className="space-y-3">
                  <div className="w-16 h-16 rounded-2xl bg-brand-50 border border-brand-100 flex items-center justify-center p-2">
                    <img src="/images/assets/program-visi-misi.png" alt="Isu Strategis" className="w-full h-full object-contain" />
                  </div>
                  <h3 className="font-extrabold text-xl text-ink group-hover:text-brand-800 transition-colors">
                    Isu Strategis Nasional
                  </h3>
                  <p className="text-xs text-ink-soft leading-relaxed">
                    Pahami perdebatan krisis iklim, kebebasan berpendapat, pekerja informal, korupsi, dan regulasi terkait.
                  </p>
                </div>
                <Link
                  href="/isu"
                  className="w-full py-2.5 rounded-xl bg-cream border border-line text-ink font-extrabold text-xs text-center block transition-all hover:bg-sage hover:border-sage hover:text-white"
                >
                  Jelajahi Isu →
                </Link>
              </div>

              {/* CARD 2: PEMILU 101 */}
              <div className="p-6 rounded-2xl bg-white border border-line shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between space-y-4 group">
                <div className="space-y-3">
                  <div className="w-16 h-16 rounded-2xl bg-brand-50 border border-brand-100 flex items-center justify-center p-2">
                    <img src="/images/assets/kandidat-legislatif.png" alt="Panduan Pemilu" className="w-full h-full object-contain" />
                  </div>
                  <h3 className="font-extrabold text-xl text-ink group-hover:text-brand-800 transition-colors">
                    Panduan Pemilu & Pause Dulu
                  </h3>
                  <p className="text-xs text-ink-soft leading-relaxed">
                    Crash course pemilu, simulasi mencoblos di TPS, serta 5 langkah menjaga diri dari hoax dan misinformasi.
                  </p>
                </div>
                <Link
                  href="/pemilu-101"
                  className="w-full py-2.5 rounded-xl bg-cream border border-line text-ink font-extrabold text-xs text-center block transition-all hover:bg-sage hover:border-sage hover:text-white"
                >
                  Buka Panduan →
                </Link>
              </div>

              {/* CARD 3: CARI PARTAI */}
              <div className="p-6 rounded-2xl bg-white border border-line shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between space-y-4 group">
                <div className="space-y-3">
                  <div className="w-16 h-16 rounded-2xl bg-white border border-line flex items-center justify-center p-1 overflow-hidden">
                    <img
                      src="/images/parpol/kumpulan_partai.png"
                      alt="Logo partai politik Indonesia"
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <h3 className="font-extrabold text-xl text-ink group-hover:text-brand-800 transition-colors">
                    Cari & Bandingkan Partai
                  </h3>
                  <p className="text-xs text-ink-soft leading-relaxed">
                    Jelajahi visi-misi, rekam jejak, dan perolehan suara partai-partai politik Indonesia secara transparan.
                  </p>
                </div>
                <Link
                  href="/partai"
                  className="w-full py-2.5 rounded-xl bg-cream border border-line text-ink font-extrabold text-xs text-center block transition-all hover:bg-sage hover:border-sage hover:text-white"
                >
                  Jelajahi Partai →
                </Link>
              </div>
            </div>
          </div>
        </section>

        <PipelineSection />

        <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full space-y-10">
          <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4">
            <div className="space-y-2">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-sage">
                Edukasi Demokrasi
              </p>
              <h2 className="font-display text-3xl sm:text-4xl text-ink">
                Pusat Literasi Politik
              </h2>
            </div>
            <Link
              href="/literasi"
              className="group inline-flex items-center gap-2 text-sm font-semibold text-brand-700 hover:text-brand-900 transition-colors"
            >
              Semua artikel & glosarium
              <span className="transition-transform group-hover:translate-x-1">→</span>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {featuredArticles.map((article, index) => (
              <FadeContent key={article.id} delay={index * 90} duration={700}>
                <SpotlightCard className="h-full min-h-[220px] !p-0">
                  <Link
                    href={`/literasi/${article.slug}`}
                    className="p-6 flex flex-col justify-between min-h-[220px] group block h-full"
                  >
                    <div className="space-y-3">
                      <div className="flex items-center justify-between text-xs text-ink-muted">
                        <span className="px-2.5 py-1 rounded-md bg-mist/60 text-brand-700 font-semibold">
                          {article.category}
                        </span>
                        <span>{article.readTime} min</span>
                      </div>
                      <h3 className="font-display text-xl text-ink group-hover:text-brand-700 transition-colors leading-snug">
                        {article.title}
                      </h3>
                      <p className="text-sm text-ink-muted line-clamp-3 leading-relaxed">
                        {article.excerpt}
                      </p>
                    </div>
                    <div className="pt-5 mt-4 border-t border-line flex items-center justify-between text-xs">
                      <span className="text-ink-muted">{article.publishedAt}</span>
                      <span className="font-semibold text-sage">Baca →</span>
                    </div>
                  </Link>
                </SpotlightCard>
              </FadeContent>
            ))}
          </div>
        </section>

        <section className="pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
          <AnimatedContent distance={30} duration={0.75}>
            <div className="relative overflow-hidden rounded-2xl border border-line bg-gradient-to-br from-brand-700 via-brand-800 to-brand-900 p-8 sm:p-12 text-cream">
              <div className="pointer-events-none absolute -right-10 -top-10 w-56 h-56 rounded-full bg-sage/25 blur-3xl animate-drift" />
              <div className="pointer-events-none absolute left-1/3 -bottom-16 w-64 h-64 rounded-full bg-white/10 blur-3xl animate-float" />

              <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
                <div className="space-y-3 max-w-2xl">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-sage">
                    RAG · Berbasis Sumber
                  </p>
                  <h2 className="font-display text-3xl sm:text-4xl text-cream leading-tight">
                    Punya pertanyaan soal kandidat?
                  </h2>
                  <p className="text-sm sm:text-base text-mist/85 leading-relaxed">
                    Asisten AI menyusun jawaban netral dari data terverifikasi —
                    lengkap dengan sitasi sumber, tanpa mendorong pilihan politik.
                  </p>
                </div>
                <div className="flex flex-col items-center gap-5 shrink-0">
                  <img
                    src="/images/assets/ai-assistant.png"
                    alt="AI Assistant"
                    className="h-28 w-28 sm:h-36 sm:w-36 object-contain drop-shadow-lg"
                  />
                  <Link href="/asisten" className="btn-gold shrink-0">
                    Buka Asisten AI
                  </Link>
                </div>
              </div>
            </div>
          </AnimatedContent>
        </section>
      </div>
    </ClickSpark>
  );
}
