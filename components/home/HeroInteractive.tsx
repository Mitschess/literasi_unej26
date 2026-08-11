"use client";

import React, { useRef } from "react";
import BlurText from "@/components/BlurText";
import GradientText from "@/components/GradientText";
import ShinyText from "@/components/ShinyText";
import FadeContent from "@/components/FadeContent";
import CountUp from "@/components/CountUp";

import { TypewriterText } from "@/components/TypewriterText";

function useSpotlight<T extends HTMLElement>() {
  const ref = useRef<T>(null);

  const onMove = (e: React.MouseEvent<T>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${e.clientX - rect.left}px`);
    el.style.setProperty("--my", `${e.clientY - rect.top}px`);
  };

  return { ref, onMove };
}

export function HeroSection() {
  const { ref, onMove } = useSpotlight<HTMLElement>();

  return (
    <section
      ref={ref}
      onMouseMove={onMove}
      className="relative min-h-[min(92vh,920px)] overflow-hidden bg-atmosphere bg-noise"
    >
      <div className="absolute inset-0 bg-mesh opacity-70" />

      <div className="pointer-events-none absolute -top-24 -left-16 w-[420px] h-[420px] rounded-full bg-sage/20 blur-3xl animate-drift" />
      <div className="pointer-events-none absolute top-1/3 -right-20 w-[380px] h-[380px] rounded-full bg-brand-300/30 blur-3xl animate-float" />
      <div className="pointer-events-none absolute bottom-0 left-1/3 w-[520px] h-[280px] rounded-full bg-mist/60 blur-3xl animate-pulse-soft" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-20 flex flex-col lg:flex-row items-center justify-between gap-12 min-h-[min(92vh,920px)]">
        <div className="flex-1 max-w-2xl space-y-8">
          <FadeContent blur duration={900} className="space-y-3">
            <ShinyText
              text="PLATFORM LITERASI POLITIK"
              speed={3}
              color="#6B7C96"
              shineColor="#2A9D8F"
              className="text-xs font-semibold uppercase tracking-[0.22em]"
            />
            <BlurText
              text="POLITRACK"
              delay={80}
              animateBy="letters"
              direction="top"
              className="font-display text-5xl sm:text-7xl lg:text-8xl tracking-tight text-ink leading-[0.92]"
            />
          </FadeContent>

          <h1 className="font-display text-2xl sm:text-4xl lg:text-[2.75rem] text-ink-soft leading-snug max-w-2xl min-h-[4.5rem]">
            Rekam jejak yang bisa ditelusuri —{" "}
            <GradientText
              colors={["#1B2A41", "#2A9D8F", "#3D516C", "#2A9D8F"]}
              animationSpeed={6}
              className="italic inline"
            >
              <TypewriterText
                phrases={[
                  "bukan janji yang mengambang.",
                  "bukan klaim tanpa data.",
                  "bukan narasi tanpa bukti.",
                  "bukan sekadar retorika.",
                ]}
                typingSpeed={70}
                deletingSpeed={35}
                pauseDuration={2400}
              />
            </GradientText>
          </h1>

          <p className="text-base sm:text-lg text-ink-muted max-w-xl leading-relaxed">
            Agregasi, verifikasi, dan literasi politik dalam satu ruang netral
            agar pemilih membaca fakta sebelum memilih.
          </p>

          <form
            action="/kandidat"
            method="GET"
            className="pt-2 max-w-2xl"
          >
            <label className="sr-only" htmlFor="hero-search">
              Cari kandidat
            </label>
            <div className="group relative flex items-center rounded-lg border border-line-strong bg-white/80 backdrop-blur-xl shadow-soft focus-within:border-sage focus-within:shadow-lift transition-all">
              <svg
                className="w-5 h-5 text-ink-muted absolute left-5"
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
              <input
                id="hero-search"
                type="text"
                name="q"
                placeholder="Cari nama, partai, atau dapil…"
                className="w-full bg-transparent pl-14 pr-36 py-4 text-sm sm:text-base text-ink placeholder:text-ink-muted/70 focus:outline-none"
              />
              <button
                type="submit"
                className="absolute right-2 px-5 py-2.5 rounded-md bg-brand-700 text-cream text-sm font-semibold hover:bg-brand-600 transition-colors"
              >
                Cari
              </button>
            </div>
          </form>
        </div>

        <div className="flex-1 w-full max-w-md lg:max-w-lg flex justify-center items-center relative z-20">
          <img
            src="/images/assets/cari_kandidat.png"
            alt="Cari Kandidat Politrack"
            className="w-full h-auto object-contain drop-shadow-2xl animate-float"
          />
        </div>
      </div>

      <div className="absolute bottom-0 inset-x-0 h-24 bg-gradient-to-t from-cream to-transparent pointer-events-none" />
    </section>
  );
}

const pipelineSteps = [
  {
    step: "01",
    title: "Sumber Publik",
    desc: "Dokumen KPU, DPR, BPS, Perda & media terpercaya.",
  },
  {
    step: "02",
    title: "Ekstraksi Klaim",
    desc: "Pemisahan rekam jejak, pendidikan, dan janji.",
  },
  {
    step: "03",
    title: "Verifikasi",
    desc: "Status fakta diperiksa sistem dan reviewer.",
  },
  {
    step: "04",
    title: "Promise Tracker",
    desc: "Janji dihubungkan dengan bukti realisasi.",
  },
  {
    step: "05",
    title: "Keputusan Pemilih",
    desc: "Anda memutuskan sendiri berdasarkan fakta.",
  },
];

export function PipelineSection() {
  return (
    <section className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div className="absolute inset-0 bg-brand-900" />
      <div
        className="absolute inset-0 opacity-30 bg-mesh"
        style={{ filter: "invert(1)" }}
      />
      <div className="pointer-events-none absolute -left-20 top-10 w-72 h-72 rounded-full bg-sage/30 blur-3xl animate-drift" />
      <div className="pointer-events-none absolute right-0 bottom-0 w-80 h-80 rounded-full bg-sage/15 blur-3xl animate-float" />

      <div className="relative z-10 max-w-7xl mx-auto space-y-12">
        <div className="max-w-2xl space-y-3">
          <ShinyText
            text="ALUR KERJA TRANSPARAN"
            speed={3.5}
            color="#A8B5C8"
            shineColor="#2A9D8F"
            className="text-xs font-semibold uppercase tracking-[0.2em]"
          />
          <h2 className="font-display text-3xl sm:text-5xl text-cream leading-tight">
            Source-to-Decision Pipeline
          </h2>
          <p className="text-mist/80 text-sm sm:text-base leading-relaxed">
            Dari dokumen mentah hingga wawasan yang bisa Anda uji sendiri —
            tanpa arahan pilihan politik.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
          {pipelineSteps.map((item, i) => (
            <FadeContent key={item.step} delay={i * 80} duration={700}>
              <button
                type="button"
                className="group w-full text-left p-5 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 hover:border-sage/50 transition-all duration-300 hover:-translate-y-1 focus:outline-none"
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="font-display text-2xl text-sage group-hover:brightness-110 transition-colors">
                    {item.step}
                  </span>
                  <span className="w-8 h-8 rounded-md border border-mist/30 text-mist/60 text-xs flex items-center justify-center group-hover:border-sage group-hover:text-sage transition-colors">
                    {i + 1}
                  </span>
                </div>
                <h3 className="font-semibold text-cream mb-2">{item.title}</h3>
                <p className="text-xs text-mist/70 leading-relaxed group-hover:text-mist transition-colors">
                  {item.desc}
                </p>
              </button>
            </FadeContent>
          ))}
        </div>
      </div>
    </section>
  );
}

export function PrinciplesMarquee() {
  const stats = [
    { label: "Prinsip Netralitas", value: 1, suffix: "" },
    { label: "Sumber Tertelusur", value: 100, suffix: "%" },
    { label: "Tanpa Rekomendasi", value: 0, suffix: "" },
  ];

  return (
    <div className="border-y border-line bg-mist/35 py-6 px-4">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
        {stats.map((stat) => (
          <div key={stat.label} className="space-y-1">
            <div className="font-display text-3xl text-brand-700">
              <CountUp to={stat.value} duration={1.6} />
              {stat.suffix}
            </div>
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-ink-muted">
              {stat.label}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
