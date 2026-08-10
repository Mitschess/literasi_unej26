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
import Magnet from "@/components/Magnet";
import BlurText from "@/components/BlurText";
import FadeContent from "@/components/FadeContent";

export default function Home() {
  const featuredCandidates = mockCandidates.slice(0, 3);
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

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 items-start">
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
                <Magnet padding={36} magnetStrength={2.5}>
                  <Link href="/asisten" className="btn-gold shrink-0">
                    Buka Asisten AI
                  </Link>
                </Magnet>
              </div>
            </div>
          </AnimatedContent>
        </section>
      </div>
    </ClickSpark>
  );
}
