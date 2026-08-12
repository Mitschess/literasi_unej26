"use client";

import React, { useState } from "react";
import ImagePlaceholder from "@/components/literacy/ImagePlaceholder";
import { BijakCard, BijakLabel } from "@/components/literacy/BijakChrome";

/* ── Slot gambar — isi `src` dengan path di /public/images/... ── */
const SIMULASI_IMAGES = {
  hero: {
    src: "",
    alt: "Ilustrasi Suasana TPS",
    label: "Gambar Slot: Hero Simulasi TPS",
  },
  step1: {
    src: "",
    alt: "Meja Registrasi KPPS",
    label: "Gambar Slot: Meja Registrasi KTP & C6",
  },
  step2: {
    src: "",
    alt: "Bilik Suara & Surat Suara",
    label: "Gambar Slot: Bilik Suara & Surat Suara",
  },
  step3: {
    src: "",
    alt: "Celup Tinta KPU",
    label: "Gambar Slot: Celup Tinta TPS",
  },
} as const;

const STEPS = [
  { id: 1, short: "Registrasi", icon: "📋" },
  { id: 2, short: "Bilik Suara", icon: "🗳️" },
  { id: 3, short: "Celup Tinta", icon: "🖐️" },
] as const;

const PASLON = [
  { id: "paslon-1", num: "01", name: "Pasangan Calon 01" },
  { id: "paslon-2", num: "02", name: "Pasangan Calon 02" },
  { id: "paslon-3", num: "03", name: "Pasangan Calon 03" },
] as const;

function IconArrowRight({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M5 12h14" /><path d="m12 5 7 7-7 7" />
    </svg>
  );
}

function IconCheck({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

export default function SimulasiTPS() {
  const [step, setStep] = useState(1);
  const [docsReady, setDocsReady] = useState(false);
  const [selectedBallot, setSelectedBallot] = useState<string | null>(null);
  const [hasInkedFinger, setHasInkedFinger] = useState(false);
  const [ballotDropped, setBallotDropped] = useState(false);

  const progress = step === 1 ? 33 : step === 2 ? 66 : hasInkedFinger ? 100 : 85;

  function resetSimulasi() {
    setStep(1);
    setDocsReady(false);
    setSelectedBallot(null);
    setHasInkedFinger(false);
    setBallotDropped(false);
  }

  function goToStep(next: number) {
    setStep(next);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <div className="space-y-6">
      {/* Hero banner + slot gambar */}
      <BijakCard tint="navy" className="overflow-hidden">
        <div className="grid lg:grid-cols-2">
          <div className="relative min-h-[180px] lg:min-h-[240px]">
            <ImagePlaceholder
              src={SIMULASI_IMAGES.hero.src}
              alt={SIMULASI_IMAGES.hero.alt}
              label={SIMULASI_IMAGES.hero.label}
              aspectRatio="min-h-[180px] lg:min-h-[240px] h-full"
              className="h-full w-full rounded-none border-0 border-r border-line/40"
            />
          </div>
          <div className="flex flex-col justify-center gap-3 p-6 sm:p-8">
            <BijakLabel variant="teal">Latihan Praktis</BijakLabel>
            <h2 className="font-display text-2xl font-bold text-brand-800 sm:text-3xl">
              Simulasi Hari Pemilu di TPS
            </h2>
            <p className="text-sm text-ink-soft leading-relaxed">
              Ikuti 3 langkah standar KPU: registrasi, coblos di bilik suara, lalu celup jari ke tinta. Setiap langkah punya slot gambar yang bisa kamu isi.
            </p>
          </div>
        </div>
      </BijakCard>

      {/* Progress bar + stepper */}
      <BijakCard tint="paper" className="p-4 sm:p-6">
        <div className="mb-4 flex items-center justify-between text-xs font-bold text-ink-muted">
          <span>Progres simulasi</span>
          <span className="text-brand-800">{progress}%</span>
        </div>
        <div className="mb-5 h-2 overflow-hidden rounded-full bg-brand-100">
          <div
            className="h-full rounded-full bg-gradient-to-r from-sage to-brand-700 transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className="grid grid-cols-3 gap-2">
          {STEPS.map((s) => {
            const isActive = step === s.id;
            const isDone = step > s.id || (step === 3 && s.id === 3 && hasInkedFinger);
            return (
              <button
                key={s.id}
                type="button"
                onClick={() => goToStep(s.id)}
                className={`group relative flex flex-col items-center gap-2 rounded-2xl border p-3 sm:p-4 text-center transition-all ${
                  isActive
                    ? "border-brand-800 bg-brand-800 text-cream shadow-md scale-[1.02]"
                    : isDone
                      ? "border-sage/50 bg-sage/10 text-brand-800"
                      : "border-line bg-white text-ink-muted hover:border-sage/40 hover:bg-brand-50"
                }`}
              >
                <span className="text-xl sm:text-2xl" aria-hidden>{s.icon}</span>
                <span className="text-[10px] sm:text-xs font-bold leading-tight">
                  {s.short}
                </span>
                {isDone && (
                  <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-sage text-white">
                    <IconCheck className="h-3 w-3" />
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </BijakCard>

      {/* Step content */}
      <BijakCard tint="paper" className="overflow-hidden">
        {/* ── STEP 1: Registrasi ── */}
        {step === 1 && (
          <div className="divide-y divide-line">
            <div className="p-4 sm:p-6">
              <ImagePlaceholder
                src={SIMULASI_IMAGES.step1.src}
                alt={SIMULASI_IMAGES.step1.alt}
                label={SIMULASI_IMAGES.step1.label}
                aspectRatio="aspect-[16/9] sm:aspect-[21/9]"
                className="w-full"
              />
            </div>

            <div className="space-y-6 p-6 sm:p-8">
              <div className="space-y-3">
                <span className="inline-block rounded-md bg-sage/20 px-3 py-1 text-xs font-bold text-brand-800">
                  Langkah 1 dari 3
                </span>
                <h3 className="font-display text-xl font-bold text-brand-800 sm:text-2xl">
                  Verifikasi Identitas di Meja Pendaftaran
                </h3>
                <p className="max-w-2xl text-sm text-ink-soft leading-relaxed">
                  Saat tiba di TPS, serahkan formulir C6 (undangan) dan KTP-el kepada petugas KPPS 4/5.
                  Petugas akan mencocokkan identitasmu dengan Daftar Pemilih Tetap (DPT) dan memintamu
                  menandatangani daftar hadir.
                </p>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                {[
                  { label: "KTP-el / Surat Keterangan", emoji: "🪪" },
                  { label: "Formulir C6 (Undangan Pemilih)", emoji: "📄" },
                ].map((doc) => (
                  <div
                    key={doc.label}
                    className={`flex items-center gap-3 rounded-2xl border p-4 transition ${
                      docsReady
                        ? "border-sage/50 bg-sage/10"
                        : "border-line bg-brand-50/50"
                    }`}
                  >
                    <span className="text-2xl" aria-hidden>{doc.emoji}</span>
                    <div className="flex-1">
                      <p className="text-xs font-bold text-brand-800">{doc.label}</p>
                      <p className="text-[11px] text-ink-muted">Dokumen wajib</p>
                    </div>
                    {docsReady && (
                      <span className="flex h-7 w-7 items-center justify-center rounded-full bg-sage text-white">
                        <IconCheck className="h-3.5 w-3.5" />
                      </span>
                    )}
                  </div>
                ))}
              </div>

              <button
                type="button"
                onClick={() => setDocsReady(true)}
                className={`w-full rounded-2xl border-2 border-dashed p-4 text-sm font-bold transition sm:w-auto sm:px-6 ${
                  docsReady
                    ? "border-sage bg-sage/10 text-brand-800"
                    : "border-brand-300 bg-white text-brand-800 hover:border-sage hover:bg-brand-50"
                }`}
              >
                {docsReady ? "✅ Dokumen sudah diserahkan ke KPPS" : "📋 Simulasikan: Serahkan Dokumen"}
              </button>

              <div className="flex justify-end border-t border-line pt-6">
                <button
                  type="button"
                  disabled={!docsReady}
                  onClick={() => goToStep(2)}
                  className={`inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-bold transition ${
                    docsReady
                      ? "bg-brand-800 text-cream hover:bg-brand-700"
                      : "cursor-not-allowed bg-gray-200 text-gray-400"
                  }`}
                >
                  Lanjut ke Bilik Suara
                  <IconArrowRight />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ── STEP 2: Bilik Suara ── */}
        {step === 2 && (
          <div className="divide-y divide-line">
            <div className="p-4 sm:p-6">
              <ImagePlaceholder
                src={SIMULASI_IMAGES.step2.src}
                alt={SIMULASI_IMAGES.step2.alt}
                label={SIMULASI_IMAGES.step2.label}
                aspectRatio="aspect-[16/9] sm:aspect-[21/9]"
                className="w-full"
              />
            </div>

            <div className="space-y-6 p-6 sm:p-8">
              <div className="space-y-3">
                <span className="inline-block rounded-md bg-sage/20 px-3 py-1 text-xs font-bold text-brand-800">
                  Langkah 2 dari 3
                </span>
                <h3 className="font-display text-xl font-bold text-brand-800 sm:text-2xl">
                  Pencoblosan di Bilik Suara
                </h3>
                <p className="max-w-2xl text-sm text-ink-soft leading-relaxed">
                  Buka surat suara di dalam bilik yang tertutup. Gunakan paku yang disediakan untuk
                  mencoblos <strong className="text-brand-800">SATU kali</strong> pada nomor, foto,
                  nama pasangan, atau logo partai.
                </p>
              </div>

              <div className="rounded-2xl border border-brand-200 bg-brand-50/60 p-4 sm:p-6">
                <p className="mb-4 text-center text-xs font-bold uppercase tracking-wider text-brand-800">
                  Surat Suara — Pilih & Coblos
                </p>
                <div className="grid gap-4 sm:grid-cols-3">
                  {PASLON.map((item) => {
                    const isSelected = selectedBallot === item.id;
                    return (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => setSelectedBallot(item.id)}
                        className={`group relative overflow-hidden rounded-xl border-2 bg-white text-left transition-all ${
                          isSelected
                            ? "border-brand-800 shadow-lg ring-2 ring-brand-800/20"
                            : "border-line hover:border-sage hover:shadow-md"
                        }`}
                      >
                        {/* Header surat suara */}
                        <div className={`px-3 py-2 text-center text-[10px] font-bold uppercase tracking-wider ${
                          isSelected ? "bg-brand-800 text-cream" : "bg-brand-100 text-brand-800"
                        }`}>
                          Pasangan Calon
                        </div>

                        <div className="flex flex-col items-center gap-3 p-4">
                          {/* Nomor urut */}
                          <div className={`flex h-14 w-14 items-center justify-center rounded-full border-4 font-display text-xl font-black transition ${
                            isSelected
                              ? "border-brand-800 bg-brand-800 text-cream"
                              : "border-brand-200 bg-white text-brand-800 group-hover:border-sage"
                          }`}>
                            {item.num}
                          </div>

                          {/* Mini slot foto paslon — bisa diisi nanti */}
                          <div className="flex h-16 w-full items-center justify-center rounded-lg border border-dashed border-brand-200 bg-brand-50/80">
                            <span className="text-[10px] font-semibold text-ink-muted">
                              Slot foto paslon
                            </span>
                          </div>

                          <p className="text-center text-xs font-bold text-brand-800">{item.name}</p>

                          {/* Area coblos */}
                          <div className={`relative flex h-10 w-10 items-center justify-center rounded-full border-2 transition ${
                            isSelected
                              ? "border-brand-800 bg-brand-800"
                              : "border-brand-300 bg-white group-hover:border-sage"
                          }`}>
                            {isSelected ? (
                              <span className="text-lg text-cream">✓</span>
                            ) : (
                              <span className="h-3 w-3 rounded-full bg-brand-200 group-hover:bg-sage/50" />
                            )}
                          </div>
                        </div>

                        {isSelected && (
                          <div className="border-t border-sage/30 bg-sage/15 px-3 py-2 text-center text-[10px] font-bold text-brand-800">
                            ✓ Dicoblos Sah
                          </div>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="flex items-center justify-between border-t border-line pt-6">
                <button
                  type="button"
                  onClick={() => goToStep(1)}
                  className="rounded-full border border-line bg-white px-5 py-2.5 text-xs font-bold text-ink-soft hover:bg-brand-50"
                >
                  ← Kembali
                </button>
                <button
                  type="button"
                  disabled={!selectedBallot}
                  onClick={() => goToStep(3)}
                  className={`inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-bold transition ${
                    selectedBallot
                      ? "bg-brand-800 text-cream hover:bg-brand-700"
                      : "cursor-not-allowed bg-gray-200 text-gray-400"
                  }`}
                >
                  Lanjut Celup Tinta
                  <IconArrowRight />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ── STEP 3: Celup Tinta ── */}
        {step === 3 && (
          <div className="divide-y divide-line">
            <div className="p-4 sm:p-6">
              <ImagePlaceholder
                src={SIMULASI_IMAGES.step3.src}
                alt={SIMULASI_IMAGES.step3.alt}
                label={SIMULASI_IMAGES.step3.label}
                aspectRatio="aspect-[16/9] sm:aspect-[21/9]"
                className="w-full"
              />
            </div>

            <div className="space-y-6 p-6 sm:p-8">
              <div className="space-y-3">
                <span className="inline-block rounded-md bg-sage/20 px-3 py-1 text-xs font-bold text-brand-800">
                  Langkah 3 dari 3
                </span>
                <h3 className="font-display text-xl font-bold text-brand-800 sm:text-2xl">
                  Masukkan Surat Suara & Celup Tinta
                </h3>
                <p className="max-w-2xl text-sm text-ink-soft leading-relaxed">
                  Lipat surat suara, masukkan ke kotak suara sesuai jenis warna, lalu celupkan salah
                  satu jarimu ke botol tinta khusus sebagai tanda telah menggunakan hak pilih.
                </p>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                {/* Kotak suara interaktif */}
                <button
                  type="button"
                  onClick={() => setBallotDropped(true)}
                  className={`flex flex-col items-center justify-center gap-3 rounded-2xl border-2 p-6 text-center transition ${
                    ballotDropped
                      ? "border-sage bg-sage/10"
                      : "border-line bg-brand-50/50 hover:border-brand-400 hover:bg-brand-50"
                  }`}
                >
                  <span className="text-4xl" aria-hidden>🗳️</span>
                  <p className="text-sm font-bold text-brand-800">Kotak Suara</p>
                  <p className="text-xs text-ink-muted">
                    {ballotDropped
                      ? "Surat suara sudah dimasukkan!"
                      : "Klik untuk masukkan surat suara"}
                  </p>
                </button>

                {/* Celup tinta interaktif */}
                <button
                  type="button"
                  onClick={() => setHasInkedFinger(true)}
                  className={`flex flex-col items-center justify-center gap-3 rounded-2xl border-2 p-6 text-center transition ${
                    hasInkedFinger
                      ? "border-purple-400 bg-purple-50"
                      : "border-line bg-brand-50/50 hover:border-purple-300 hover:bg-purple-50/50"
                  }`}
                >
                  <div className="relative">
                    <span className="text-4xl" aria-hidden>☝️</span>
                    {hasInkedFinger && (
                      <span className="absolute -bottom-1 left-1/2 h-4 w-4 -translate-x-1/2 rounded-full bg-purple-600 shadow-md" />
                    )}
                  </div>
                  <p className="text-sm font-bold text-brand-800">Tinta KPU</p>
                  <p className="text-xs text-ink-muted">
                    {hasInkedFinger
                      ? "Jari sudah ditingtai ungu!"
                      : "Klik untuk celup jari ke tinta"}
                  </p>
                </button>
              </div>

              {hasInkedFinger && ballotDropped && (
                <div className="rounded-2xl border border-sage/40 bg-gradient-to-r from-sage/15 to-brand-50 p-6 text-center">
                  <p className="text-2xl mb-2" aria-hidden>🎉</p>
                  <h4 className="font-display text-lg font-bold text-brand-800">
                    Simulasi Selesai!
                  </h4>
                  <p className="mt-1 text-sm text-ink-soft">
                    Kamu sudah menjalani seluruh proses pemungutan suara di TPS. Di hari H, ikuti langkah yang sama ya!
                  </p>
                </div>
              )}

              <div className="flex items-center justify-between border-t border-line pt-6">
                <button
                  type="button"
                  onClick={() => goToStep(2)}
                  className="rounded-full border border-line bg-white px-5 py-2.5 text-xs font-bold text-ink-soft hover:bg-brand-50"
                >
                  ← Kembali
                </button>
                <button
                  type="button"
                  onClick={resetSimulasi}
                  className="inline-flex items-center gap-2 rounded-full bg-brand-800 px-6 py-3 text-sm font-bold text-cream transition hover:bg-brand-700"
                >
                  Ulang Simulasi
                </button>
              </div>
            </div>
          </div>
        )}
      </BijakCard>
    </div>
  );
}
