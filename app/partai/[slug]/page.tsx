"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { getPartyBySlug } from "@/lib/data/parties";
import FadeContent from "@/components/FadeContent";
import {
  StudioShell,
  StudioCrumb,
  StudioCard,
} from "@/components/literacy/StudioChrome";
import {
  sentimentBadge,
  sentimentLabel,
  categoryLabel,
  partyHeaderGradient,
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

  const latestResult =
    party.electionResults?.[party.electionResults.length - 1];

  const tabs: { id: TabId; label: string; count?: number }[] = [
    { id: "overview", label: "Profil" },
    { id: "visi-misi", label: "Visi & Misi" },
    { id: "rekam-jejak", label: "Rekam Jejak", count: party.trackRecords.length },
    { id: "pemilu", label: "Pemilu", count: party.electionResults.length },
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
            className="p-5 sm:p-7"
            style={{ background: partyHeaderGradient(party) }}
          >
            <div className="flex gap-5">
              <div className="min-w-0 flex-1 space-y-5">
                <div className="flex flex-wrap items-center gap-2">
                  <span
                    className="rounded-md px-2.5 py-1 text-[11px] font-bold text-white"
                    style={{ backgroundColor: party.color }}
                  >
                    {party.shortName}
                  </span>
                  <span className="rounded-md bg-white/80 px-2.5 py-1 text-[11px] font-semibold text-ink-soft">
                    Est. {party.founded}
                  </span>
                </div>

                <div>
                  <h1 className="font-display text-3xl tracking-tight text-brand-800 sm:text-4xl">
                    {party.name}
                  </h1>
                  <p className="mt-1.5 text-sm text-ink-muted">
                    Ketua Umum: {party.chairman}
                  </p>
                </div>

                <div className="grid max-w-md grid-cols-3 gap-3">
                  {[
                    { label: "Kursi DPR 2024", value: String(party.dprSeats2024) },
                    {
                      label: "Suara 2024",
                      value: latestResult
                        ? `${latestResult.percentage.toFixed(1)}%`
                        : "—",
                    },
                    { label: "Anggota", value: party.memberCount },
                  ].map((stat) => (
                    <div
                      key={stat.label}
                      className="rounded-xl border border-line/80 bg-white/80 px-3 py-2.5 backdrop-blur-sm"
                    >
                      <p className="font-display text-lg tabular-nums text-brand-800">
                        {stat.value}
                      </p>
                      <p className="mt-0.5 text-[10px] leading-snug text-ink-muted">
                        {stat.label}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="hidden shrink-0 sm:flex sm:items-center sm:pr-4">
                <img
                  src={party.logoUrl}
                  alt={party.name}
                  className="h-24 w-24 object-contain lg:h-32 lg:w-32"
                  onError={(e) => {
                    const t = e.target as HTMLImageElement;
                    t.style.display = "none";
                  }}
                />
              </div>
            </div>
          </div>

          <div className="flex gap-1 overflow-x-auto border-t border-line bg-[#F8FAFC] px-2 py-2 no-scrollbar">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`shrink-0 rounded-lg px-3.5 py-2 text-xs font-semibold transition ${
                  activeTab === tab.id
                    ? "bg-brand-800 text-cream"
                    : "text-ink-muted hover:bg-white hover:text-ink"
                }`}
              >
                {tab.label}
                {typeof tab.count === "number" && (
                  <span className="ml-1.5 tabular-nums opacity-70">
                    {tab.count}
                  </span>
                )}
              </button>
            ))}
          </div>
        </StudioCard>

        <FadeContent key={activeTab} duration={350}>
          {activeTab === "overview" && (
            <div className="grid grid-cols-1 gap-5 lg:grid-cols-12">
              <div className="space-y-5 lg:col-span-8">
                <StudioCard className="space-y-3 p-5 sm:p-6">
                  <h2 className="font-display text-lg text-brand-800">
                    Tentang Partai
                  </h2>
                  <p className="text-sm leading-relaxed text-ink-soft">
                    {party.description}
                  </p>
                </StudioCard>

                <StudioCard className="space-y-3 p-5 sm:p-6">
                  <h2 className="font-display text-lg text-brand-800">
                    Program Kerja Utama
                  </h2>
                  <ul className="space-y-2">
                    {party.keyPrograms.map((prog) => (
                      <li
                        key={prog}
                        className="flex items-start gap-2 text-sm text-ink-soft"
                      >
                        <span
                          className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full"
                          style={{ backgroundColor: party.color }}
                        />
                        <span>{prog}</span>
                      </li>
                    ))}
                  </ul>
                </StudioCard>
              </div>

              <div className="space-y-5 lg:col-span-4">
                <StudioCard className="space-y-3 p-5 sm:p-6">
                  <h2 className="font-display text-lg text-brand-800">
                    Ideologi
                  </h2>
                  <div className="flex flex-wrap gap-2">
                    {party.ideology.map((i) => (
                      <span
                        key={i}
                        className="rounded-full px-3 py-1 text-xs font-semibold"
                        style={{
                          backgroundColor: party.color + "15",
                          color: party.color,
                        }}
                      >
                        {i}
                      </span>
                    ))}
                  </div>
                </StudioCard>

                <StudioCard className="space-y-3 p-5 sm:p-6">
                  <h2 className="font-display text-lg text-brand-800">
                    Fokus Utama
                  </h2>
                  <div className="flex flex-wrap gap-2">
                    {party.focusAreas.map((a) => (
                      <span
                        key={a}
                        className="rounded-full bg-cream px-3 py-1 text-xs font-semibold text-ink-muted"
                      >
                        {a}
                      </span>
                    ))}
                  </div>
                </StudioCard>
              </div>
            </div>
          )}

          {activeTab === "visi-misi" && (
            <StudioCard className="overflow-hidden">
              <div
                className="px-6 py-8 sm:px-10 sm:py-10"
                style={{ background: partyHeaderGradient(party) }}
              >
                <p
                  className="text-[11px] font-bold uppercase tracking-[0.16em]"
                  style={{ color: party.color }}
                >
                  Visi partai
                </p>
                <blockquote className="mt-4 max-w-3xl font-display text-xl leading-relaxed text-brand-800 sm:text-2xl sm:leading-snug">
                  &ldquo;{party.vision}&rdquo;
                </blockquote>
              </div>

              <div className="grid border-t border-line lg:grid-cols-[1fr_240px]">
                <div className="space-y-5 p-6 sm:p-8">
                  <div>
                    <h2 className="font-display text-lg text-brand-800">Misi</h2>
                    <p className="mt-1 text-xs text-ink-muted">
                      {party.mission.length} poin arah gerak partai
                    </p>
                  </div>
                  <ol className="space-y-4">
                    {party.mission.map((m, i) => (
                      <li key={m} className="flex gap-4">
                        <span
                          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-bold text-white"
                          style={{ backgroundColor: party.color }}
                        >
                          {i + 1}
                        </span>
                        <p className="pt-1 text-sm leading-relaxed text-ink-soft">
                          {m}
                        </p>
                      </li>
                    ))}
                  </ol>
                </div>

                <aside className="border-t border-line bg-cream/50 p-6 sm:p-8 lg:border-t-0 lg:border-l">
                  <h2 className="font-display text-sm text-brand-800">
                    Kantor Pusat
                  </h2>
                  <p className="mt-3 text-sm leading-relaxed text-ink-soft">
                    {party.headOffice}
                  </p>
                  <div className="mt-6 space-y-2 border-t border-line/70 pt-5">
                    <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-ink-muted">
                      Informasi
                    </p>
                    <p className="text-xs text-ink-muted">
                      Berdiri {party.founded}
                    </p>
                    <p className="text-xs text-ink-muted">
                      Ketua Umum: {party.chairman}
                    </p>
                  </div>
                </aside>
              </div>
            </StudioCard>
          )}

          {activeTab === "rekam-jejak" && (
            <div className="space-y-4">
              <p className="text-xs font-semibold text-ink-muted">
                Rekam jejak diverifikasi dari sumber publik terpercaya.
              </p>
              {party.trackRecords.map((tr) => (
                <StudioCard key={tr.id} className="space-y-3 p-5 sm:p-6">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold uppercase tracking-wider text-ink-muted">
                        {tr.year}
                      </span>
                      <span className="rounded-full bg-cream px-2 py-0.5 text-[10px] font-semibold text-ink-soft">
                        {categoryLabel(tr.category)}
                      </span>
                    </div>
                    <span
                      className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${sentimentBadge(tr.sentiment)}`}
                    >
                      {sentimentLabel(tr.sentiment)}
                    </span>
                  </div>
                  <h3 className="font-display text-base text-brand-800">
                    {tr.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-ink-soft">
                    {tr.description}
                  </p>
                </StudioCard>
              ))}
            </div>
          )}

          {activeTab === "pemilu" && (
            <div className="space-y-4">
              {party.electionResults.map((result) => {
                const pct = result.percentage;
                const seatPct = (result.seats / result.totalSeats) * 100;
                return (
                  <StudioCard key={`${result.year}-${result.electionType}`} className="space-y-4 p-5 sm:p-6">
                    <div className="flex items-center justify-between gap-3">
                      <h3 className="font-display text-base text-brand-800">
                        Pemilu {result.electionType} {result.year}
                      </h3>
                      <span className="rounded-full bg-cream px-2.5 py-1 text-[11px] font-semibold text-ink-muted">
                        Peringkat #{result.rank}
                      </span>
                    </div>

                    <div className="grid grid-cols-3 gap-3 text-center">
                      {[
                        { label: "Suara", value: `${pct.toFixed(2)}%` },
                        { label: "Kursi DPR", value: String(result.seats) },
                        {
                          label: "Total Suara",
                          value: result.votes.toLocaleString("id-ID"),
                        },
                      ].map((item) => (
                        <div
                          key={item.label}
                          className="rounded-xl border border-line bg-cream/50 px-3 py-3"
                        >
                          <p
                            className="font-display text-xl tabular-nums"
                            style={{ color: party.color }}
                          >
                            {item.value}
                          </p>
                          <p className="mt-1 text-[9px] font-semibold uppercase tracking-wider text-ink-muted">
                            {item.label}
                          </p>
                        </div>
                      ))}
                    </div>

                    <div className="space-y-3">
                      <div>
                        <div className="mb-1 flex justify-between text-[10px] text-ink-muted">
                          <span>Share suara</span>
                          <span>{pct.toFixed(2)}%</span>
                        </div>
                        <div className="h-2 overflow-hidden rounded-full bg-cream">
                          <div
                            className="h-full rounded-full"
                            style={{
                              width: `${Math.min(pct * 4, 100)}%`,
                              backgroundColor: party.color,
                            }}
                          />
                        </div>
                      </div>
                      <div>
                        <div className="mb-1 flex justify-between text-[10px] text-ink-muted">
                          <span>Proporsi kursi DPR</span>
                          <span>{seatPct.toFixed(1)}%</span>
                        </div>
                        <div className="h-2 overflow-hidden rounded-full bg-cream">
                          <div
                            className="h-full rounded-full"
                            style={{
                              width: `${Math.min(seatPct * 5, 100)}%`,
                              backgroundColor: party.secondaryColor ?? party.color,
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  </StudioCard>
                );
              })}
            </div>
          )}
        </FadeContent>

        <Link
          href="/partai"
          className="inline-flex items-center gap-2 rounded-xl border border-line bg-white px-4 py-2.5 text-xs font-semibold text-ink-soft transition-all hover:bg-sage hover:border-sage hover:text-white"
        >
          ← Kembali ke Cari Partai
        </Link>
      </div>
    </StudioShell>
  );
}
