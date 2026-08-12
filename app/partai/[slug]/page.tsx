"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { getPartyBySlug } from "@/lib/data/parties";
import {
  StudioShell,
  StudioCrumb,
  StudioCard,
} from "@/components/literacy/StudioChrome";
import {
  spectrumLabel,
  sentimentBadge,
  sentimentLabel,
  categoryIcon,
} from "@/lib/party/display";

type TabId = "overview" | "visi-misi" | "rekam-jejak" | "pemilu";

export default function PartyDetailPage() {
  const params = useParams();
  const slug = params?.slug as string;
  const party = getPartyBySlug(slug);
  const [activeTab, setActiveTab] = useState<TabId>("overview");

  if (!party) {
    return (
      <StudioShell>
        <div className="mx-auto max-w-xl space-y-4 px-4 py-20 text-center">
          <h1 className="font-display text-2xl text-brand-800">
            Partai tidak ditemukan
          </h1>
          <p className="text-sm text-ink-muted">
            Data tidak terdaftar atau telah berubah.
          </p>
          <Link
            href="/partai"
            className="inline-flex rounded-lg bg-brand-800 px-5 py-2.5 text-sm font-semibold text-cream"
          >
            Kembali ke daftar
          </Link>
        </div>
      </StudioShell>
    );
  }

  const tabs: { id: TabId; label: string }[] = [
    { id: "overview", label: "Profil" },
    { id: "visi-misi", label: "Visi & Misi" },
    { id: "rekam-jejak", label: "Rekam Jejak" },
    { id: "pemilu", label: "Pemilu" },
  ];

  return (
    <StudioShell>
      <div className="mx-auto max-w-6xl space-y-8 px-4 py-10 sm:px-6 lg:px-8">
        <StudioCrumb
          items={[
            { label: "Beranda", href: "/" },
            { label: "Cari Partai", href: "/partai" },
            { label: party.shortName },
          ]}
        />

        <StudioCard className="overflow-hidden">
          <div
            className="px-6 pt-6 pb-5"
            style={{
              background: `linear-gradient(135deg, ${party.color} 0%, ${party.secondaryColor ?? party.color}cc 100%)`,
            }}
          >
            <div className="flex items-start gap-4">
              <div className="w-20 h-20 rounded-2xl bg-white/95 flex items-center justify-center p-2 shadow-lg shrink-0">
                <img
                  src={party.logoUrl}
                  alt={party.name}
                  className="w-full h-full object-contain"
                  onError={(e) => {
                    const t = e.target as HTMLImageElement;
                    t.style.display = "none";
                    const parent = t.parentElement;
                    if (parent)
                      parent.innerHTML = `<span style="color:${party.color};font-weight:900;font-size:16px">${party.shortName}</span>`;
                  }}
                />
              </div>
              <div className="flex-1 min-w-0 text-white">
                <div className="text-xs font-bold uppercase tracking-wider text-white/70 mb-1">
                  Partai Politik Indonesia
                </div>
                <h1 className="font-display text-2xl sm:text-3xl tracking-tight leading-tight">
                  {party.name}
                </h1>
                <div className="flex items-center gap-3 mt-2 flex-wrap">
                  <span className="bg-white/20 text-white text-xs font-bold px-2.5 py-1 rounded-full">
                    {party.shortName}
                  </span>
                  <span className="text-white/80 text-xs">
                    Ketua: {party.chairman}
                  </span>
                  <span className="text-white/80 text-xs">
                    Est. {party.founded}
                  </span>
                  <span
                    className="px-2 py-0.5 rounded text-[10px] font-bold border bg-white/10"
                    style={{
                      color: "#fff",
                      borderColor: "rgba(255,255,255,0.3)",
                    }}
                  >
                    {spectrumLabel[party.spectrum]}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap gap-1 px-6 pt-4 border-b border-line bg-white">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-3 py-2 text-xs font-bold rounded-t-lg transition-colors ${
                  activeTab === tab.id
                    ? "bg-cream text-brand-800 border border-line border-b-cream -mb-px"
                    : "text-ink-muted hover:text-ink hover:bg-cream/50"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="p-6 space-y-5 bg-cream/40">
            {activeTab === "overview" && (
              <div className="space-y-5">
                <div className="p-5 rounded-2xl bg-white border border-line space-y-2">
                  <h4 className="font-black text-sm text-ink">Tentang Partai</h4>
                  <p className="text-sm text-ink-muted leading-relaxed">
                    {party.description}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 rounded-2xl bg-white border border-line text-center">
                    <div
                      className="text-3xl font-black"
                      style={{ color: party.color }}
                    >
                      {party.dprSeats2024}
                    </div>
                    <div className="text-[10px] text-ink-muted mt-0.5 font-semibold uppercase tracking-wider">
                      Kursi DPR 2024
                    </div>
                  </div>
                  <div className="p-4 rounded-2xl bg-white border border-line text-center">
                    <div
                      className="text-3xl font-black"
                      style={{ color: party.color }}
                    >
                      {party.memberCount}
                    </div>
                    <div className="text-[10px] text-ink-muted mt-0.5 font-semibold uppercase tracking-wider">
                      Anggota
                    </div>
                  </div>
                </div>

                <div className="p-5 rounded-2xl bg-white border border-line space-y-3">
                  <h4 className="font-black text-sm text-ink">Ideologi & Fokus</h4>
                  <div className="flex flex-wrap gap-2">
                    {party.ideology.map((i) => (
                      <span
                        key={i}
                        className="px-3 py-1 rounded-full text-xs font-bold"
                        style={{
                          backgroundColor: party.color + "15",
                          color: party.color,
                        }}
                      >
                        {i}
                      </span>
                    ))}
                  </div>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {party.focusAreas.map((a) => (
                      <span
                        key={a}
                        className="px-3 py-1 rounded-full text-xs font-semibold bg-cream text-ink-muted"
                      >
                        {a}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="p-5 rounded-2xl bg-white border border-line space-y-2">
                  <h4 className="font-black text-sm text-ink">
                    Program Kerja Utama
                  </h4>
                  <ul className="space-y-2">
                    {party.keyPrograms.map((prog, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-2 text-sm text-ink-muted"
                      >
                        <span
                          className="font-black text-lg leading-none"
                          style={{ color: party.color }}
                        >
                          ·
                        </span>
                        <span>{prog}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}

            {activeTab === "visi-misi" && (
              <div className="space-y-5">
                <div className="p-5 rounded-2xl bg-white border border-line space-y-3">
                  <div className="flex items-center gap-2">
                    <span
                      className="w-7 h-7 rounded-lg flex items-center justify-center text-sm font-bold"
                      style={{
                        backgroundColor: party.color + "15",
                        color: party.color,
                      }}
                    >
                      🎯
                    </span>
                    <h4 className="font-black text-sm text-ink">Visi</h4>
                  </div>
                  <p className="text-sm text-ink leading-relaxed bg-cream p-4 rounded-xl border border-line">
                    &ldquo;{party.vision}&rdquo;
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-white border border-line space-y-3">
                  <div className="flex items-center gap-2">
                    <span
                      className="w-7 h-7 rounded-lg flex items-center justify-center text-sm font-bold"
                      style={{
                        backgroundColor: party.color + "15",
                        color: party.color,
                      }}
                    >
                      📌
                    </span>
                    <h4 className="font-black text-sm text-ink">Misi</h4>
                  </div>
                  <ol className="space-y-3">
                    {party.mission.map((m, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-3 text-sm text-ink-muted"
                      >
                        <span
                          className="w-6 h-6 rounded-full flex items-center justify-center text-[11px] font-black text-white shrink-0 mt-0.5"
                          style={{ backgroundColor: party.color }}
                        >
                          {i + 1}
                        </span>
                        <span className="leading-relaxed">{m}</span>
                      </li>
                    ))}
                  </ol>
                </div>

                <div className="p-5 rounded-2xl bg-white border border-line space-y-3">
                  <div className="flex items-center gap-2">
                    <span
                      className="w-7 h-7 rounded-lg flex items-center justify-center text-sm font-bold"
                      style={{
                        backgroundColor: party.color + "15",
                        color: party.color,
                      }}
                    >
                      📍
                    </span>
                    <h4 className="font-black text-sm text-ink">Kantor Pusat</h4>
                  </div>
                  <p className="text-sm text-ink-muted">{party.headOffice}</p>
                </div>
              </div>
            )}

            {activeTab === "rekam-jejak" && (
              <div className="space-y-4">
                <p className="text-xs text-ink-muted font-semibold">
                  Rekam jejak diverifikasi dari sumber publik terpercaya.
                </p>
                {party.trackRecords.map((tr) => (
                  <div
                    key={tr.id}
                    className="p-5 rounded-2xl bg-white border border-line space-y-2"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-center gap-2">
                        <span className="text-base">
                          {categoryIcon(tr.category)}
                        </span>
                        <span className="text-xs font-black text-ink-muted uppercase tracking-wider">
                          {tr.year}
                        </span>
                      </div>
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${sentimentBadge(tr.sentiment)}`}
                      >
                        {sentimentLabel(tr.sentiment)}
                      </span>
                    </div>
                    <h5 className="font-black text-sm text-ink">{tr.title}</h5>
                    <p className="text-xs text-ink-muted leading-relaxed">
                      {tr.description}
                    </p>
                  </div>
                ))}
              </div>
            )}

            {activeTab === "pemilu" && (
              <div className="space-y-4">
                {party.electionResults.map((result, i) => {
                  const pct = result.percentage;
                  const seatPct = (result.seats / result.totalSeats) * 100;
                  return (
                    <div
                      key={i}
                      className="p-5 rounded-2xl bg-white border border-line space-y-3"
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-black text-sm text-ink">
                          Pemilu {result.electionType} {result.year}
                        </span>
                        <span className="text-xs text-ink-muted bg-cream px-2 py-0.5 rounded-full">
                          Peringkat #{result.rank}
                        </span>
                      </div>

                      <div className="grid grid-cols-3 gap-3 text-center">
                        <div>
                          <div
                            className="font-black text-xl"
                            style={{ color: party.color }}
                          >
                            {pct.toFixed(2)}%
                          </div>
                          <div className="text-[9px] text-ink-muted uppercase tracking-wider font-semibold">
                            Suara
                          </div>
                        </div>
                        <div>
                          <div
                            className="font-black text-xl"
                            style={{ color: party.color }}
                          >
                            {result.seats}
                          </div>
                          <div className="text-[9px] text-ink-muted uppercase tracking-wider font-semibold">
                            Kursi DPR
                          </div>
                        </div>
                        <div>
                          <div
                            className="font-black text-xl"
                            style={{ color: party.color }}
                          >
                            {result.votes.toLocaleString("id-ID")}
                          </div>
                          <div className="text-[9px] text-ink-muted uppercase tracking-wider font-semibold">
                            Total Suara
                          </div>
                        </div>
                      </div>

                      <div className="space-y-1.5">
                        <div className="flex justify-between text-[10px] text-ink-muted">
                          <span>Share suara</span>
                          <span>{pct.toFixed(2)}%</span>
                        </div>
                        <div className="w-full h-2 bg-cream rounded-full overflow-hidden">
                          <div
                            className="h-full rounded-full transition-all"
                            style={{
                              width: `${Math.min(pct * 4, 100)}%`,
                              backgroundColor: party.color,
                            }}
                          />
                        </div>
                        <div className="flex justify-between text-[10px] text-ink-muted mt-2">
                          <span>Proporsi kursi DPR</span>
                          <span>{seatPct.toFixed(1)}%</span>
                        </div>
                        <div className="w-full h-2 bg-cream rounded-full overflow-hidden">
                          <div
                            className="h-full rounded-full transition-all"
                            style={{
                              width: `${Math.min(seatPct * 5, 100)}%`,
                              backgroundColor:
                                party.secondaryColor ?? party.color,
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </StudioCard>

        <div className="flex justify-start">
          <Link
            href="/partai"
            className="inline-flex items-center gap-2 rounded-xl border border-line bg-white px-4 py-2.5 text-xs font-bold text-ink-soft hover:bg-cream transition-colors"
          >
            ← Kembali ke Cari Partai
          </Link>
        </div>
      </div>
    </StudioShell>
  );
}
