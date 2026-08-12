"use client";

import React, { useState } from "react";
import Link from "next/link";
import AnimatedContent from "@/components/AnimatedContent";
import FadeContent from "@/components/FadeContent";
import ImagePlaceholder from "@/components/literacy/ImagePlaceholder";
import { antiHoaxTips } from "@/lib/data/issues";
import {
  BijakShell,
  BijakCrumb,
  BijakLabel,
  BijakCard,
  BijakStepBadge,
} from "@/components/literacy/BijakChrome";

// Inline SVG Icon Helpers
function IconExternalLink({ className = "h-3.5 w-3.5" }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M15 3h6v6"/><path d="M10 14 21 3"/><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
    </svg>
  );
}

function IconArrowRight({ className = "h-3.5 w-3.5" }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>
    </svg>
  );
}

function IconCheckCircle({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/>
    </svg>
  );
}

function IconPlayCircle({ className = "h-3.5 w-3.5" }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <circle cx="12" cy="12" r="10"/><polygon points="10 8 16 12 10 16 10 8"/>
    </svg>
  );
}

function IconCalendar({ className = "h-3.5 w-3.5" }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M8 2v4"/><path d="M16 2v4"/><rect width="18" height="18" x="3" y="4" rx="2"/><path d="M3 10h18"/>
    </svg>
  );
}

function IconHelpCircle({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><path d="M12 17h.01"/>
    </svg>
  );
}

function IconX({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M18 6 6 18"/><path d="m6 6 12 12"/>
    </svg>
  );
}

type TabId = "101" | "simulasi" | "hoax" | "faq";

export default function Pemilu101Page() {
  const [activeTab, setActiveTab] = useState<TabId>("101");
  const [knowledgeLevel, setKnowledgeLevel] = useState<"baru" | "paham" | null>(null);
  
  // Simulasi TPS State
  const [simulasiStep, setSimulasiStep] = useState<number>(1);
  const [selectedBallot, setSelectedBallot] = useState<string | null>(null);
  const [hasInkedFinger, setHasInkedFinger] = useState<boolean>(false);

  // Video Modal State
  const [showVideoModal, setShowVideoModal] = useState<boolean>(false);

  return (
    <BijakShell>
      <div className="mx-auto max-w-5xl space-y-10 px-4 py-10 sm:px-6 lg:px-8">
        {/* Navigation Breadcrumb */}
        <BijakCrumb
          items={[
            { label: "Beranda", href: "/" },
            { label: "Panduan Pemilu" },
          ]}
        />

        {/* HERO SECTION */}
        <div className="grid gap-8 lg:grid-cols-12 lg:items-center">
          <div className="space-y-4 lg:col-span-7">
            <div className="flex flex-wrap items-center gap-2">
              <span className="rounded-md bg-sage px-2.5 py-1 text-[11px] font-bold tracking-wider text-brand-900 uppercase">
                Panduan Pemilu
              </span>
              <span className="rounded-md bg-gold-400/30 px-2.5 py-1 text-[11px] font-bold text-brand-900">
                Baru!
              </span>
            </div>
            
            <h1 className="font-display text-4xl font-extrabold tracking-tight text-brand-800 sm:text-5xl lg:text-6xl leading-[1.05]">
              PANDUAN PEMILU
            </h1>

            <p className="text-base sm:text-lg text-ink-soft leading-relaxed max-w-xl">
              Sebuah crash course singkat untuk lebih memahami pemilu, lembaga negara, dan partai politik menjelang Pemilu.
            </p>
          </div>

          {/* Hero Image Slot */}
          <div className="lg:col-span-5 flex justify-center">
            <ImagePlaceholder
              src="/images/assets/pemilih-muda-perempuan.png"
              alt="Hero Panduan Pemilu"
              label="Gambar Banner Hero Panduan Pemilu"
              aspectRatio="aspect-[4/3]"
              className="w-full"
            />
          </div>
        </div>

        {/* TABS NAVIGATION */}
        <div className="grid w-full grid-cols-2 gap-1 rounded-2xl border border-line bg-white p-1.5 shadow-2xs sm:grid-cols-4">
          {[
            { id: "101", label: "Panduan Lengkap" },
            { id: "simulasi", label: "Simulasi TPS" },
            { id: "hoax", label: "Pause Dulu (Anti-Hoax)" },
            { id: "faq", label: "FAQ Merantau" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as TabId)}
              className={`flex w-full items-center justify-center rounded-xl px-3 py-2.5 text-center text-sm font-bold transition ${
                activeTab === tab.id
                  ? "bg-brand-800 text-cream shadow-2xs"
                  : "text-ink-soft hover:bg-brand-50 hover:text-ink"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* TAB 1: MAIN PEMILU 101 GUIDE */}
        {activeTab === "101" && (
          <div className="space-y-12">
            {/* SECTION 1: SEJAUH MANA KAMU PAHAM? */}
            <section className="space-y-6">
              <div className="flex items-start gap-4">
                <BijakStepBadge step={1} />
                <div className="space-y-1 pt-1">
                  <h2 className="font-display text-2xl font-bold text-brand-800 sm:text-3xl">
                    Mau tahu sejauh mana kamu paham tentang Pemilu?
                  </h2>
                  <p className="text-sm text-ink-soft">
                    Pilih kondisi yang paling menggambarkan pengetahuan kamu saat ini:
                  </p>
                </div>
              </div>

              <div className="grid gap-6 md:grid-cols-2">
                {/* Option A: Belum Paham */}
                <BijakCard
                  tint={knowledgeLevel === "baru" ? "navy" : "paper"}
                  className={`relative flex flex-col justify-between overflow-hidden p-6 sm:p-8 transition-all ${
                    knowledgeLevel === "baru" ? "ring-2 ring-brand-800" : "hover:border-sage/40"
                  }`}
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-3xl">😫</span>
                      <BijakLabel variant="teal">Level 01: Pemula</BijakLabel>
                    </div>

                    <h3 className="font-display text-xl font-bold text-brand-800">
                      Masih belum tahu apa-apa
                    </h3>
                    <p className="text-sm text-ink-soft leading-relaxed">
                      Gapapa banget! Yuk belajar bareng tentang apa, siapa yang bakal dipilih dan kenapa kita harus memilih di Pemilu nanti!
                    </p>

                    {/* Image Slot for Card A */}
                    <ImagePlaceholder
                      src=""
                      alt="Gambar Belum Paham Pemilu"
                      label="Gambar Slot: Masih Pemula"
                      aspectRatio="h-40"
                      className="mt-4"
                    />
                  </div>

                  <div className="mt-6 pt-4 border-t border-line/60 flex items-center justify-between">
                    <button
                      onClick={() => {
                        setKnowledgeLevel("baru");
                        const el = document.getElementById("langkah-pemilu");
                        el?.scrollIntoView({ behavior: "smooth" });
                      }}
                      className="inline-flex items-center gap-2 rounded-full bg-brand-800 px-5 py-2.5 text-xs font-bold text-cream transition hover:bg-brand-700"
                    >
                      <span>Ngapain sih di Pemilu?</span>
                      <IconArrowRight />
                    </button>
                    {knowledgeLevel === "baru" && (
                      <span className="text-xs font-bold text-sage flex items-center gap-1">
                        <IconCheckCircle /> Terpilih
                      </span>
                    )}
                  </div>
                </BijakCard>

                {/* Option B: Lumayan Paham */}
                <BijakCard
                  tint={knowledgeLevel === "paham" ? "teal" : "paper"}
                  className={`relative flex flex-col justify-between overflow-hidden p-6 sm:p-8 transition-all ${
                    knowledgeLevel === "paham" ? "ring-2 ring-brand-800" : "hover:border-sage/40"
                  }`}
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-3xl">😎</span>
                      <BijakLabel>Level 02: Paham</BijakLabel>
                    </div>

                    <h3 className="font-display text-xl font-bold text-brand-800">
                      Udah lumayan paham!
                    </h3>
                    <p className="text-sm text-ink-soft leading-relaxed">
                      Biar tambah naik level, nih pelajari gimana caranya kamu bisa terhindar dari Hoax & Misinformasi menjelang Pemilu!
                    </p>

                    {/* Image Slot for Card B */}
                    <ImagePlaceholder
                      src=""
                      alt="Gambar Lumayan Paham"
                      label="Gambar Slot: Udah Paham"
                      aspectRatio="h-40"
                      className="mt-4"
                    />
                  </div>

                  <div className="mt-6 pt-4 border-t border-line/60 flex items-center justify-between">
                    <button
                      onClick={() => {
                        setKnowledgeLevel("paham");
                        setActiveTab("hoax");
                      }}
                      className="inline-flex items-center gap-2 rounded-full border border-brand-800 bg-white px-5 py-2.5 text-xs font-bold text-brand-800 transition hover:bg-brand-50"
                    >
                      <span>Kepoin "Pause Dulu"</span>
                      <IconArrowRight />
                    </button>
                    {knowledgeLevel === "paham" && (
                      <span className="text-xs font-bold text-sage flex items-center gap-1">
                        <IconCheckCircle /> Terpilih
                      </span>
                    )}
                  </div>
                </BijakCard>
              </div>
            </section>

            {/* HIGHLIGHT BANNER: SIMULASI HARI PEMILU */}
            <BijakCard tint="navy" className="overflow-hidden p-6 sm:p-8 relative">
              <div className="grid gap-6 md:grid-cols-12 md:items-center">
                <div className="space-y-4 md:col-span-7">
                  <BijakLabel variant="teal">Interaktif</BijakLabel>
                  <h2 className="font-display text-2xl font-bold text-brand-800 sm:text-3xl">
                    SIMULASI HARI PEMILU!
                  </h2>
                  <p className="text-sm text-ink-soft leading-relaxed">
                    Rasakan pengalaman datang ke TPS, verifikasi data KTP, memilih calon di bilik suara, dan menyelupkan jari ke tinta.
                  </p>
                  <button
                    onClick={() => setActiveTab("simulasi")}
                    className="inline-flex items-center gap-2 rounded-full bg-brand-800 px-6 py-3 text-sm font-bold text-cream shadow-md transition hover:bg-brand-700 hover:scale-105"
                  >
                    <span>Cobain ah!</span>
                    <IconArrowRight className="h-4 w-4" />
                  </button>
                </div>

                {/* Image Slot for Highlight Banner */}
                <div className="md:col-span-5">
                  <ImagePlaceholder
                    src="/images/assets/kandidat-kepala-daerah.png"
                    alt="Simulasi TPS"
                    label="Gambar Slot: Simulasi TPS"
                    aspectRatio="aspect-[4/3]"
                    className="w-full"
                  />
                </div>
              </div>
            </BijakCard>

            {/* SECTION 2: LANGKAH PEMILU (GUIDED STEPS 1 - 5) */}
            <section id="langkah-pemilu" className="space-y-6">
              <div className="flex items-start gap-4">
                <BijakStepBadge step={2} />
                <div className="space-y-1 pt-1">
                  <h2 className="font-display text-2xl font-bold text-brand-800 sm:text-3xl">
                    Kalau udah siap, ikuti langkah-langkah ini
                  </h2>
                  <p className="text-sm text-ink-soft">
                    Panduan teknis dan persiapan menjadi pemilih cerdas
                  </p>
                </div>
              </div>

              <div className="space-y-6">
                {/* STEP 1: CEK DPT */}
                <AnimatedContent distance={15} duration={0.4}>
                  <BijakCard tint="paper" className="p-6 sm:p-8 space-y-6">
                    <div className="grid gap-6 md:grid-cols-12 md:items-center">
                      <div className="space-y-4 md:col-span-8">
                        <div className="flex items-center gap-2">
                          <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-brand-800 text-xs font-bold text-cream">
                            01
                          </span>
                          <span className="text-xs font-bold text-sage uppercase tracking-wider">Langkah Pertama</span>
                        </div>
                        <h3 className="font-display text-xl font-bold text-brand-800 sm:text-2xl">
                          Pastikan kamu terdaftar sebagai Daftar Pemilih Tetap (DPT)
                        </h3>
                        <p className="text-sm text-ink-soft leading-relaxed">
                          Gunakan NIK atau Nomor Paspor untuk cek DPT kamu, dan jangan lupa catat nama Kabupaten/Kota serta kecamatan yang terdaftar (ini berguna untuk cari dapil!)
                        </p>
                        <div className="pt-2">
                          <a
                            href="https://cekdptonline.kpu.go.id/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 rounded-full bg-brand-800 px-5 py-2.5 text-xs font-bold text-cream transition hover:bg-brand-700"
                          >
                            <span>Cek DPT Online</span>
                            <IconExternalLink />
                          </a>
                        </div>
                      </div>

                      <div className="md:col-span-4">
                        <ImagePlaceholder
                          src=""
                          alt="Cek DPT Online"
                          label="Gambar Step 1: Cek DPT"
                          aspectRatio="aspect-[4/3]"
                          className="w-full"
                        />
                      </div>
                    </div>
                  </BijakCard>
                </AnimatedContent>

                {/* STEP 2: DAPIL */}
                <AnimatedContent distance={15} duration={0.4} delay={0.1}>
                  <BijakCard tint="teal" className="p-6 sm:p-8 space-y-6">
                    <div className="grid gap-6 md:grid-cols-12 md:items-center">
                      <div className="space-y-4 md:col-span-8">
                        <div className="flex items-center gap-2">
                          <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-brand-800 text-xs font-bold text-cream">
                            02
                          </span>
                          <span className="text-xs font-bold text-brand-800 uppercase tracking-wider">Langkah Kedua</span>
                        </div>
                        <h3 className="font-display text-xl font-bold text-brand-800 sm:text-2xl">
                          Cari tahu lokasi Daerah Pemilihan (Dapil) kamu
                        </h3>
                        <p className="text-sm text-ink-soft leading-relaxed">
                          Mengetahui lokasi dapil membantu kamu mencari informasi caleg (calon legislatif) yang nanti bisa kamu pilih:
                        </p>

                        <div className="grid gap-2.5 sm:grid-cols-2">
                          <div className="rounded-xl border border-line bg-white p-3.5">
                            <span className="text-xs font-bold text-brand-800 flex items-center gap-1.5">
                              🏛️ DPR RI
                            </span>
                            <p className="mt-1 text-xs text-ink-soft">Berdasarkan Kota/Kabupaten</p>
                          </div>
                          <div className="rounded-xl border border-line bg-white p-3.5">
                            <span className="text-xs font-bold text-brand-800 flex items-center gap-1.5">
                              🏢 DPRD Provinsi
                            </span>
                            <p className="mt-1 text-xs text-ink-soft">Berdasarkan Kabupaten/Kota</p>
                          </div>
                          <div className="rounded-xl border border-line bg-white p-3.5">
                            <span className="text-xs font-bold text-brand-800 flex items-center gap-1.5">
                              🏛️ DPRD Kota/Kab
                            </span>
                            <p className="mt-1 text-xs text-ink-soft">Berdasarkan Kecamatan/Kelurahan</p>
                          </div>
                          <div className="rounded-xl border border-line bg-white p-3.5">
                            <span className="text-xs font-bold text-brand-800 flex items-center gap-1.5">
                              🌐 DPD
                            </span>
                            <p className="mt-1 text-xs text-ink-soft">Berdasarkan Daerah Provinsi</p>
                          </div>
                        </div>

                        <div className="pt-2">
                          <a
                            href="https://docs.google.com/spreadsheets/d/1HIuSmuDMgPbzhF0SPGqlAfVrsEIXtrApBZzD6u0drmc/edit?usp=sharing"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 rounded-full border border-brand-800 bg-white px-5 py-2.5 text-xs font-bold text-brand-800 transition hover:bg-brand-50"
                          >
                            <span>Cek Lokasi Dapil</span>
                            <IconExternalLink />
                          </a>
                        </div>
                      </div>

                      <div className="md:col-span-4">
                        <ImagePlaceholder
                          src=""
                          alt="Cari Lokasi Dapil"
                          label="Gambar Step 2: Cek Dapil"
                          aspectRatio="aspect-[4/3]"
                          className="w-full"
                        />
                      </div>
                    </div>
                  </BijakCard>
                </AnimatedContent>

                {/* STEP 3: CEK CALEG */}
                <AnimatedContent distance={15} duration={0.4} delay={0.15}>
                  <BijakCard tint="paper" className="p-6 sm:p-8 space-y-6">
                    <div className="grid gap-6 md:grid-cols-12 md:items-center">
                      <div className="space-y-4 md:col-span-8">
                        <div className="flex items-center gap-2">
                          <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-brand-800 text-xs font-bold text-cream">
                            03
                          </span>
                          <span className="text-xs font-bold text-sage uppercase tracking-wider">Langkah Ketiga</span>
                        </div>
                        <h3 className="font-display text-xl font-bold text-brand-800 sm:text-2xl">
                          Cek list Calon Legislatif (Caleg) yang kamu bisa pilih
                        </h3>
                        <p className="text-sm text-ink-soft leading-relaxed">
                          Klik link di bawah ini, lalu masukkan Dapil kamu untuk cek caleg siapa saja yang terdaftar di wilayahmu.
                        </p>
                        <div className="flex flex-wrap gap-3 pt-2">
                          <a
                            href="https://goodkind.id/pemilu?mode=simulasi"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 rounded-full bg-brand-800 px-5 py-2.5 text-xs font-bold text-cream transition hover:bg-brand-700"
                          >
                            <span>Cek List Caleg (Goodkind)</span>
                            <IconExternalLink />
                          </a>
                          <a
                            href="https://infopemilu.kpu.go.id/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 rounded-full border border-line bg-white px-4 py-2.5 text-xs font-bold text-ink-soft hover:bg-brand-50"
                          >
                            <span>Info KPU RI</span>
                            <IconExternalLink />
                          </a>
                        </div>
                      </div>

                      <div className="md:col-span-4">
                        <ImagePlaceholder
                          src=""
                          alt="Cek List Caleg"
                          label="Gambar Step 3: List Caleg"
                          aspectRatio="aspect-[4/3]"
                          className="w-full"
                        />
                      </div>
                    </div>
                  </BijakCard>
                </AnimatedContent>

                {/* STEP 4: SIAP KE TPS */}
                <AnimatedContent distance={15} duration={0.4} delay={0.2}>
                  <BijakCard tint="navy" className="p-6 sm:p-8 space-y-6">
                    <div className="grid gap-6 md:grid-cols-12 md:items-center">
                      <div className="space-y-4 md:col-span-8">
                        <div className="flex items-center gap-2">
                          <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-brand-800 text-xs font-bold text-cream">
                            04
                          </span>
                          <span className="text-xs font-bold text-sage uppercase tracking-wider">Langkah Keempat</span>
                        </div>
                        <h3 className="font-display text-xl font-bold text-brand-800 sm:text-2xl">
                          Kamu udah siap datang ke TPS!
                        </h3>
                        <p className="text-sm text-ink-soft leading-relaxed">
                          Eits… tapi ternyata di TPS kita gak bisa asal nyoblos 😢. Kita juga harus belajar cara nyoblos yang sah gimana sih?
                        </p>
                        <div className="pt-2">
                          <button
                            onClick={() => setActiveTab("simulasi")}
                            className="inline-flex items-center gap-2 rounded-full bg-brand-800 px-5 py-2.5 text-xs font-bold text-cream transition hover:bg-brand-700"
                          >
                            <span>Pelajari Tata Cara Nyoblos Sah</span>
                            <IconArrowRight />
                          </button>
                        </div>
                      </div>

                      <div className="md:col-span-4">
                        <ImagePlaceholder
                          src=""
                          alt="Siap Ke TPS"
                          label="Gambar Step 4: Hari Pemilu"
                          aspectRatio="aspect-[4/3]"
                          className="w-full"
                        />
                      </div>
                    </div>
                  </BijakCard>
                </AnimatedContent>

                {/* STEP 5: MERANTAU FAQ */}
                <AnimatedContent distance={15} duration={0.4} delay={0.25}>
                  <BijakCard tint="paper" className="p-6 sm:p-8 space-y-6">
                    <div className="grid gap-6 md:grid-cols-12 md:items-center">
                      <div className="space-y-4 md:col-span-8">
                        <div className="flex items-center gap-2">
                          <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-brand-800 text-xs font-bold text-cream">
                            05
                          </span>
                          <span className="text-xs font-bold text-sage uppercase tracking-wider">Langkah Kelima</span>
                        </div>
                        <h3 className="font-display text-xl font-bold text-brand-800 sm:text-2xl">
                          Sedang merantau? Baca FAQ seputar Pemilu disini
                        </h3>
                        <p className="text-sm text-ink-soft leading-relaxed">
                          Jangan khawatir, kalau kamu sedang di luar kota atau luar negeri, kamu masih bisa memilih dengan mengikuti prosedur pindah memilih (Form A5)!
                        </p>
                        <div className="pt-2">
                          <button
                            onClick={() => setActiveTab("faq")}
                            className="inline-flex items-center gap-2 rounded-full border border-brand-800 bg-white px-5 py-2.5 text-xs font-bold text-brand-800 transition hover:bg-brand-50"
                          >
                            <span>Baca FAQ Merantau</span>
                            <IconArrowRight />
                          </button>
                        </div>
                      </div>

                      <div className="md:col-span-4">
                        <ImagePlaceholder
                          src=""
                          alt="FAQ Merantau"
                          label="Gambar Step 5: FAQ Merantau"
                          aspectRatio="aspect-[4/3]"
                          className="w-full"
                        />
                      </div>
                    </div>
                  </BijakCard>
                </AnimatedContent>
              </div>
            </section>

            {/* SECTION 3: LEMBAGA NEGARA & PERAN POLITIK */}
            <section className="space-y-6">
              <div className="flex items-start gap-4">
                <BijakStepBadge step={3} />
                <div className="space-y-1 pt-1">
                  <h2 className="font-display text-2xl font-bold text-brand-800 sm:text-3xl">
                    Terakhir! Pelajari lebih lanjut peran & fungsi lembaga negara 🦅
                  </h2>
                  <p className="text-sm text-ink-soft">
                    Karena mengurus negara itu kerja kelompok, kamu juga harus paham siapa aja yang akan terlibat di dalamnya
                  </p>
                </div>
              </div>

              <div className="grid gap-6 md:grid-cols-3">
                {/* Article 1: Partai Politik */}
                <BijakCard tint="paper" className="flex h-full flex-col justify-between p-6 transition hover:shadow-md">
                  <div className="space-y-4">
                    <ImagePlaceholder
                      src="/images/assets/kandidat-legislatif.png"
                      alt="Partai Politik"
                      label="Gambar Artikel: Partai Politik"
                      aspectRatio="aspect-[16/10]"
                      className="w-full"
                    />
                    <BijakLabel variant="teal">Partai Politik</BijakLabel>
                    <h3 className="font-display text-lg font-bold text-brand-800 leading-snug">
                      Sebenernya Partai Politik itu ngapain sih?
                    </h3>
                    <p className="text-xs text-ink-soft leading-relaxed">
                      Memahami peran partai politik dalam menyerap aspirasi rakyat, kaderisasi kepemimpinan, dan penyusunan kebijakan publik.
                    </p>
                  </div>
                  <div className="mt-6 pt-4 border-t border-line/60">
                    <Link
                      href="/kandidat"
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-800 hover:text-sage transition"
                    >
                      <span>Pelajari Partai Politik</span>
                      <IconArrowRight />
                    </Link>
                  </div>
                </BijakCard>

                {/* Article 2: Tugas Presiden */}
                <BijakCard tint="paper" className="flex h-full flex-col justify-between p-6 transition hover:shadow-md">
                  <div className="space-y-4">
                    <ImagePlaceholder
                      src="/images/assets/kandidat-kepala-daerah.png"
                      alt="Tugas Presiden"
                      label="Gambar Artikel: Tugas Presiden"
                      aspectRatio="aspect-[16/10]"
                      className="w-full"
                    />
                    <BijakLabel>Eksekutif</BijakLabel>
                    <h3 className="font-display text-lg font-bold text-brand-800 leading-snug">
                      Apa sih tugas Presiden & Wakil Presiden?
                    </h3>
                    <p className="text-xs text-ink-soft leading-relaxed">
                      Pelajari kewenangan eksekutif, pelaksanaan undang-undang, serta batas-batas wewenang kepala negara dan kepala pemerintahan.
                    </p>
                  </div>
                  <div className="mt-6 pt-4 border-t border-line/60">
                    <Link
                      href="/kandidat"
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-800 hover:text-sage transition"
                    >
                      <span>Pelajari Tugas Presiden</span>
                      <IconArrowRight />
                    </Link>
                  </div>
                </BijakCard>

                {/* Article 3: Tugas Legislatif */}
                <BijakCard tint="paper" className="flex h-full flex-col justify-between p-6 transition hover:shadow-md">
                  <div className="space-y-4">
                    <ImagePlaceholder
                      src="/images/assets/profil-kandidat.png"
                      alt="Tugas Legislatif"
                      label="Gambar Artikel: Tugas Legislatif"
                      aspectRatio="aspect-[16/10]"
                      className="w-full"
                    />
                    <BijakLabel variant="teal">Legislatif (DPR/DPD)</BijakLabel>
                    <h3 className="font-display text-lg font-bold text-brand-800 leading-snug">
                      Apa sih tugas lembaga Legislatif?
                    </h3>
                    <p className="text-xs text-ink-soft leading-relaxed">
                      Fungsi pembuatan UU (legislasi), penyusunan anggaran (budgeting), dan pengawasan kinerja pemerintah.
                    </p>
                  </div>
                  <div className="mt-6 pt-4 border-t border-line/60">
                    <Link
                      href="/literasi"
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-800 hover:text-sage transition"
                    >
                      <span>Pelajari Tugas Legislatif</span>
                      <IconArrowRight />
                    </Link>
                  </div>
                </BijakCard>
              </div>
            </section>

            {/* SECTION 4: CALLOUT & DIRECT LINKS */}
            <BijakCard tint="navy" className="p-8 text-center space-y-6">
              <div className="max-w-2xl mx-auto space-y-3">
                <span className="inline-flex items-center gap-2 rounded-full bg-gold-400/30 px-3.5 py-1 text-xs font-bold text-brand-900">
                  <IconCalendar /> 14 Februari 2024
                </span>
                <h2 className="font-display text-2xl font-bold text-brand-800 sm:text-4xl leading-snug">
                  Sebagai mayoritas pemilih, kita punya andil yang besar untuk menentukan masa depan negara.
                </h2>
                <p className="text-sm text-ink-soft">
                  Gunakan hak pilihmu secara rasional, objektif, dan berlandaskan rekam jejak.
                </p>
              </div>

              {/* 4 Direct Link Cards */}
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 pt-4 text-left">
                <Link
                  href="/isu"
                  className="group rounded-2xl border border-line bg-white p-5 transition hover:border-sage hover:shadow-md"
                >
                  <span className="text-2xl">🎯</span>
                  <h4 className="mt-2 font-display text-sm font-bold text-brand-800 group-hover:text-sage">
                    Pahami 16 Isu Strategis
                  </h4>
                  <p className="mt-1 text-xs text-ink-muted">Pelajari posisi kandidat dalam isu publik</p>
                </Link>

                <Link
                  href="/kandidat"
                  className="group rounded-2xl border border-line bg-white p-5 transition hover:border-sage hover:shadow-md"
                >
                  <span className="text-2xl">🏛️</span>
                  <h4 className="mt-2 font-display text-sm font-bold text-brand-800 group-hover:text-sage">
                    Pelajari Profil Partai
                  </h4>
                  <p className="mt-1 text-xs text-ink-muted">Cek rekam jejak dan perolehan suara partai</p>
                </Link>

                <Link
                  href="/kandidat"
                  className="group rounded-2xl border border-line bg-white p-5 transition hover:border-sage hover:shadow-md"
                >
                  <span className="text-2xl">👤</span>
                  <h4 className="mt-2 font-display text-sm font-bold text-brand-800 group-hover:text-sage">
                    Pelajari Profil Kandidat
                  </h4>
                  <p className="mt-1 text-xs text-ink-muted">Ketahui riwayat hidup dan gagasan calon</p>
                </Link>

                <button
                  onClick={() => setShowVideoModal(true)}
                  className="group text-left rounded-2xl border border-line bg-white p-5 transition hover:border-sage hover:shadow-md"
                >
                  <span className="text-2xl">📺</span>
                  <h4 className="mt-2 font-display text-sm font-bold text-brand-800 group-hover:text-sage flex items-center justify-between">
                    <span>Jadi, ngapain kita Bijak Memilih?</span>
                  </h4>
                  <p className="mt-1 text-xs text-sage font-bold flex items-center gap-1">
                    <IconPlayCircle /> Tonton Video
                  </p>
                </button>
              </div>
            </BijakCard>
          </div>
        )}

        {/* TAB 2: INTERACTIVE SIMULASI TPS */}
        {activeTab === "simulasi" && (
          <FadeContent duration={400} className="space-y-6">
            <BijakCard tint="paper" className="p-6 sm:p-8">
              <div className="flex flex-wrap items-center justify-between gap-4 border-b border-line pb-6">
                <div>
                  <BijakLabel variant="teal">Latihan Praktis</BijakLabel>
                  <h2 className="mt-2 font-display text-2xl font-bold text-brand-800 sm:text-3xl">
                    Simulasi Hari Pemilu di TPS
                  </h2>
                  <p className="mt-1 text-sm text-ink-soft">
                    Cobalah langkah-langkah pencoblosan sesuai standar Komisi Pemilihan Umum
                  </p>
                </div>
                
                {/* Step Indicators */}
                <div className="flex items-center gap-2 bg-brand-50 p-2 rounded-2xl border border-brand-100">
                  {[1, 2, 3].map((stepNum) => (
                    <button
                      key={stepNum}
                      onClick={() => setSimulasiStep(stepNum)}
                      className={`flex h-9 w-9 items-center justify-center rounded-xl text-xs font-bold transition ${
                        simulasiStep === stepNum
                          ? "bg-brand-800 text-cream shadow-2xs"
                          : "bg-white text-ink-muted border border-line hover:border-sage"
                      }`}
                    >
                      {stepNum}
                    </button>
                  ))}
                </div>
              </div>

              {/* SIMULASI STEP 1: REGISTRASI & VERIFIKASI */}
              {simulasiStep === 1 && (
                <div className="py-8 space-y-6">
                  <div className="max-w-2xl space-y-4">
                    <span className="inline-block rounded-md bg-sage/20 px-3 py-1 text-xs font-bold text-brand-800">
                      Langkah 1 dari 3: Registrasi KPPS
                    </span>
                    <h3 className="font-display text-xl font-bold text-brand-800 sm:text-2xl">
                      Verifikasi Identitas di Meja Pendaftaran
                    </h3>
                    <p className="text-sm text-ink-soft leading-relaxed">
                      Saat tiba di TPS, serahkan formulir C6 (undangan) dan KTP-el kepada petugas KPPS 4/5. Petugas akan mencocokkan identitasmu dengan Daftar Pemilih Tetap (DPT) dan memintamu menandatangani daftar hadir.
                    </p>

                    <div className="rounded-2xl border border-line bg-brand-50/50 p-4 space-y-3">
                      <p className="text-xs font-bold text-brand-800 uppercase tracking-wider">Dokumen Wajib Bawa:</p>
                      <div className="flex flex-wrap gap-2">
                        <span className="inline-flex items-center gap-1.5 rounded-lg bg-white px-3 py-1.5 text-xs font-semibold text-brand-800 border border-line">
                          <IconCheckCircle className="text-sage" /> KTP-el / Surat Keterangan
                        </span>
                        <span className="inline-flex items-center gap-1.5 rounded-lg bg-white px-3 py-1.5 text-xs font-semibold text-brand-800 border border-line">
                          <IconCheckCircle className="text-sage" /> Formulir C6 (Undangan Pemilih)
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Image Slot for Step 1 TPS */}
                  <ImagePlaceholder
                    src=""
                    alt="Simulasi Meja Registrasi TPS"
                    label="Gambar Simulasi: Meja Registrasi KTP & C6"
                    aspectRatio="aspect-[21/9]"
                    className="w-full"
                  />

                  <div className="flex justify-end pt-4">
                    <button
                      onClick={() => setSimulasiStep(2)}
                      className="inline-flex items-center gap-2 rounded-full bg-brand-800 px-6 py-3 text-sm font-bold text-cream transition hover:bg-brand-700"
                    >
                      <span>Lanjut ke Bilik Suara</span>
                      <IconArrowRight className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              )}

              {/* SIMULASI STEP 2: BILIK SUARA & PENCHOBLOSAN */}
              {simulasiStep === 2 && (
                <div className="py-8 space-y-6">
                  <div className="max-w-2xl space-y-4">
                    <span className="inline-block rounded-md bg-sage/20 px-3 py-1 text-xs font-bold text-brand-800">
                      Langkah 2 dari 3: Bilik Pemilihan
                    </span>
                    <h3 className="font-display text-xl font-bold text-brand-800 sm:text-2xl">
                      Pencoblosan Surat Suara
                    </h3>
                    <p className="text-sm text-ink-soft leading-relaxed">
                      Buka surat suara di dalam bilik yang tertutup. Gunakan paku yang disediakan untuk mencoblos SATU kali pada nomor, foto, nama pasangan, atau logo partai.
                    </p>
                  </div>

                  {/* Interactive Ballot Selector */}
                  <div className="space-y-4">
                    <p className="text-xs font-bold text-brand-800">Pilih Simulasi Coblos Pasangan Calon:</p>
                    <div className="grid gap-4 sm:grid-cols-3">
                      {[
                        { id: "paslon-1", num: "01", name: "Pasangan Calon Nomor 01" },
                        { id: "paslon-2", num: "02", name: "Pasangan Calon Nomor 02" },
                        { id: "paslon-3", num: "03", name: "Pasangan Calon Nomor 03" },
                      ].map((item) => (
                        <button
                          key={item.id}
                          onClick={() => setSelectedBallot(item.id)}
                          className={`relative flex flex-col items-center justify-center rounded-2xl border p-6 text-center transition ${
                            selectedBallot === item.id
                              ? "border-brand-800 bg-brand-800 text-cream shadow-md"
                              : "border-line bg-white hover:border-sage"
                          }`}
                        >
                          <span className="text-2xl font-black font-display mb-2">{item.num}</span>
                          <span className="text-xs font-bold">{item.name}</span>
                          {selectedBallot === item.id && (
                            <span className="mt-3 inline-flex items-center gap-1 rounded-full bg-sage px-3 py-0.5 text-[10px] font-bold text-brand-900">
                              <IconCheckCircle className="h-3 w-3" /> Dicoblos Sah
                            </span>
                          )}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Image Slot for Step 2 TPS */}
                  <ImagePlaceholder
                    src=""
                    alt="Simulasi Bilik Suara"
                    label="Gambar Simulasi: Bilik Suara & Surat Suara"
                    aspectRatio="aspect-[21/9]"
                    className="w-full"
                  />

                  <div className="flex items-center justify-between pt-4">
                    <button
                      onClick={() => setSimulasiStep(1)}
                      className="inline-flex items-center gap-2 rounded-full border border-line bg-white px-5 py-2.5 text-xs font-bold text-ink-soft hover:bg-brand-50"
                    >
                      Kembali
                    </button>
                    <button
                      disabled={!selectedBallot}
                      onClick={() => setSimulasiStep(3)}
                      className={`inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-bold text-cream transition ${
                        selectedBallot
                          ? "bg-brand-800 hover:bg-brand-700 cursor-pointer"
                          : "bg-gray-300 cursor-not-allowed opacity-60"
                      }`}
                    >
                      <span>Lanjut Celup Tinta</span>
                      <IconArrowRight className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              )}

              {/* SIMULASI STEP 3: CELUP TINTA */}
              {simulasiStep === 3 && (
                <div className="py-8 space-y-6">
                  <div className="max-w-2xl space-y-4">
                    <span className="inline-block rounded-md bg-sage/20 px-3 py-1 text-xs font-bold text-brand-800">
                      Langkah 3 dari 3: Celup Tinta
                    </span>
                    <h3 className="font-display text-xl font-bold text-brand-800 sm:text-2xl">
                      Celupkan Jari Tangan ke Tinta KPU
                    </h3>
                    <p className="text-sm text-ink-soft leading-relaxed">
                      Masukkan surat suara yang telah dilipat ke dalam kotak suara sesuai jenis warna, lalu celupkan salah satu jarimu ke botol tinta khusus sebagai tanda telah menggunakan hak pilih.
                    </p>
                  </div>

                  <div className="flex flex-col items-center justify-center p-8 rounded-2xl border border-line bg-brand-50/50 text-center space-y-4">
                    <div className="text-4xl">☝️🟣</div>
                    <h4 className="font-display text-lg font-bold text-brand-800">
                      {hasInkedFinger ? "Jari Kamu Sudah Ditingtai!" : "Klik untuk latihan celup tinta:"}
                    </h4>
                    <button
                      onClick={() => setHasInkedFinger(true)}
                      className={`inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-bold transition ${
                        hasInkedFinger
                          ? "bg-sage text-brand-900 border border-sage-600"
                          : "bg-brand-800 text-cream hover:bg-brand-700"
                      }`}
                    >
                      {hasInkedFinger ? "✅ Jari Berwarna Ungu (Selesai)" : "Celup Jari Ke Tinta 🖌️"}
                    </button>
                  </div>

                  {/* Image Slot for Step 3 TPS */}
                  <ImagePlaceholder
                    src=""
                    alt="Simulasi Celup Tinta"
                    label="Gambar Simulasi: Celup Tinta TPS"
                    aspectRatio="aspect-[21/9]"
                    className="w-full"
                  />

                  <div className="flex items-center justify-between pt-4">
                    <button
                      onClick={() => setSimulasiStep(2)}
                      className="inline-flex items-center gap-2 rounded-full border border-line bg-white px-5 py-2.5 text-xs font-bold text-ink-soft hover:bg-brand-50"
                    >
                      Kembali
                    </button>
                    <button
                      onClick={() => {
                        setSimulasiStep(1);
                        setSelectedBallot(null);
                        setHasInkedFinger(false);
                      }}
                      className="inline-flex items-center gap-2 rounded-full bg-brand-800 px-6 py-3 text-sm font-bold text-cream transition hover:bg-brand-700"
                    >
                      Ulang Simulasi
                    </button>
                  </div>
                </div>
              )}
            </BijakCard>
          </FadeContent>
        )}

        {/* TAB 3: PAUSE DULU (ANTI-HOAX) */}
        {activeTab === "hoax" && (
          <FadeContent duration={400} className="space-y-6">
            <BijakCard tint="navy" className="p-6 sm:p-8 space-y-4">
              <BijakLabel variant="teal">Edukasi Media</BijakLabel>
              <h2 className="font-display text-2xl font-bold text-brand-800 sm:text-3xl">
                Pause Dulu: 5 Kebiasaan Menangkal Hoax & Misinformasi
              </h2>
              <p className="text-sm text-ink-soft leading-relaxed max-w-2xl">
                Informasi politik bergerak dengan sangat cepat di media sosial. Sebelum emosi dan buru-buru menyebarkan berita, terapkan 5 kebiasaan dasar ini:
              </p>
            </BijakCard>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {antiHoaxTips.map((tip, idx) => (
                <BijakCard
                  key={tip.id}
                  tint={idx % 2 === 0 ? "paper" : "teal"}
                  className="p-6 space-y-3 flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-2xl">{tip.icon}</span>
                      <span className="text-xs font-bold text-sage font-display">0{idx + 1}</span>
                    </div>
                    <h3 className="font-display text-base font-bold text-brand-800 leading-snug">
                      {tip.title}
                    </h3>
                    <p className="text-xs text-ink-soft leading-relaxed">
                      {tip.description}
                    </p>
                  </div>

                  {/* Image Placeholder for Hoax Tip */}
                  <ImagePlaceholder
                    src=""
                    alt={tip.title}
                    label={`Gambar Tip: 0${idx + 1}`}
                    aspectRatio="h-28"
                    className="mt-4"
                  />
                </BijakCard>
              ))}
            </div>

            <BijakCard tint="paper" className="p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="space-y-1">
                <h4 className="font-display text-base font-bold text-brand-800">
                  Temukan Informasi Mencurigakan?
                </h4>
                <p className="text-xs text-ink-soft">
                  Lakukan penelusuran fakta independen melalui situs resmi TurnBackHoax & CekFakta.
                </p>
              </div>
              <div className="flex gap-2">
                <a
                  href="https://turnbackhoax.id"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-full bg-brand-800 px-4 py-2 text-xs font-bold text-cream hover:bg-brand-700"
                >
                  <span>TurnBackHoax</span>
                  <IconExternalLink className="h-3 w-3" />
                </a>
              </div>
            </BijakCard>
          </FadeContent>
        )}

        {/* TAB 4: FAQ MERANTAU */}
        {activeTab === "faq" && (
          <FadeContent duration={400} className="space-y-6">
            <BijakCard tint="paper" className="p-6 sm:p-8 space-y-6">
              <div className="border-b border-line pb-4">
                <BijakLabel variant="teal">Prosedur Merantau (Form A5)</BijakLabel>
                <h2 className="mt-2 font-display text-2xl font-bold text-brand-800 sm:text-3xl">
                  FAQ Pemilih Di Luar Domisili (Merantau)
                </h2>
                <p className="mt-1 text-sm text-ink-soft">
                  Informasi lengkap bagi pemilih yang sedang berada di luar daerah asal pada hari pencoblosan.
                </p>
              </div>

              <div className="space-y-4">
                {[
                  {
                    q: "Apakah saya bisa memilih jika sedang di luar kota / luar domisili?",
                    a: "Bisa! Kamu perlu mengurus Surat Pindah Memilih (Formulir A5 / Form Pindah Memilih) di KPU Kabupaten/Kota atau PPS/PPK domisili asal maupun domisili tujuan sebelum batas waktu yang ditentukan KPU.",
                  },
                  {
                    q: "Surat suara apa saja yang akan saya dapatkan jika pindah memilih?",
                    a: "Tergantung lokasi pindahmu! Jika pindah antar provinsi, kamu hanya mendapatkan 1 surat suara (Presiden & Wapres). Jika pindah antar kabupaten/kota dalam 1 provinsi, kamu mendapatkan surat suara Presiden dan DPD.",
                  },
                  {
                    q: "Apa saja syarat untuk mengurus Pindah Memilih?",
                    a: "1. KTP-el / KK, 2. Bukti pendukung alasan pindah (misal: Surat Tugas kerja, Surat Aktif Kuliah/KTP Mahasiswa, atau Surat Rawat Inap Rumah Sakit).",
                  },
                  {
                    q: "Bagaimana jika saya bekerja/kuliah di luar negeri?",
                    a: "Kamu bisa mendaftar lewat PPLN (Panitia Pemilihan Luar Negeri) di Kedutaan Besar / KRI setempat untuk memilih melalui TPS Luar Negeri, Kotak Suara Keliling (KSK), atau Pos.",
                  },
                ].map((faq, idx) => (
                  <div key={idx} className="rounded-2xl border border-line bg-brand-50/50 p-5 space-y-2">
                    <h3 className="font-display text-base font-bold text-brand-800 flex items-start gap-2">
                      <IconHelpCircle />
                      <span>{faq.q}</span>
                    </h3>
                    <p className="text-sm text-ink-soft leading-relaxed pl-7">
                      {faq.a}
                    </p>
                  </div>
                ))}
              </div>

              {/* Image Slot for FAQ */}
              <ImagePlaceholder
                src=""
                alt="Panduan Merantau KPU"
                label="Gambar Slot: Infografis Pindah Memilih / Form A5"
                aspectRatio="aspect-[21/9]"
                className="w-full"
              />
            </BijakCard>
          </FadeContent>
        )}
      </div>

      {/* VIDEO MODAL FOR "JADI NGAPAIN KITA BIJAK MEMILIH?" */}
      {showVideoModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-xs">
          <div className="relative w-full max-w-3xl overflow-hidden rounded-3xl bg-white shadow-2xl">
            <div className="flex items-center justify-between border-b border-line px-6 py-4">
              <h3 className="font-display text-lg font-bold text-brand-800">
                Jadi, ngapain kita Bijak Memilih?
              </h3>
              <button
                onClick={() => setShowVideoModal(false)}
                className="rounded-full p-1.5 text-ink-muted hover:bg-brand-50 hover:text-ink transition"
              >
                <IconX />
              </button>
            </div>
            <div className="relative aspect-video w-full bg-black">
              <iframe
                src="https://www.youtube.com/embed/ZCP_ntUkYH4"
                title="Jadi, ngapain kita Bijak Memilih?"
                className="h-full w-full border-0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      )}
    </BijakShell>
  );
}
