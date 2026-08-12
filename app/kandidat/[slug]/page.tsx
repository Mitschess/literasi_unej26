"use client";

import React, { useMemo, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { getCandidateBySlug } from "@/lib/data/candidates";
import { getPartyById } from "@/lib/data/parties";
import { VerificationBadge } from "@/components/ui/VerificationBadge";
import { StatusPill } from "@/components/ui/StatusPill";
import { SourceCitation } from "@/components/ui/SourceCitation";
import FadeContent from "@/components/FadeContent";
import {
  StudioShell,
  StudioCrumb,
  StudioCard,
  StudioRail,
} from "@/components/literacy/StudioChrome";

type TabId =
  | "overview"
  | "timeline"
  | "stances"
  | "programs"
  | "promises"
  | "performance"
  | "sources";

const PARTY_LOGOS: Record<string, string> = {
  NasDem: "/images/parpol/nasdem.png",
  PKB: "/images/parpol/PKB.png",
  Gerindra: "/images/parpol/gerindra.svg",
  Golkar: "/images/parpol/golkar.png",
  "PDI-P": "/images/parpol/pdi.png",
  PKS: "/images/parpol/pks.png",
  Demokrat: "/images/parpol/demokrat.png",
  PAN: "/images/parpol/PAN.png",
};

export default function CandidateDetailPage() {
  const params = useParams();
  const slug = params?.slug as string;
  const candidate = getCandidateBySlug(slug);

  const [activeTab, setActiveTab] = useState<TabId>("overview");
  const [reportModalOpen, setReportModalOpen] = useState(false);
  const [reportSubmitted, setReportSubmitted] = useState(false);
  const [reportReason, setReportReason] = useState("incorrect_info");
  const [reportDetails, setReportDetails] = useState("");

  const allSources = useMemo(() => {
    if (!candidate) return [];
    return Array.from(
      new Map(
        [
          ...candidate.claims.flatMap((c) => c.sources),
          ...candidate.promises.map((p) => p.source),
          ...candidate.promises.flatMap((p) =>
            p.evidences.map((e) => e.source),
          ),
          ...candidate.timeline.flatMap((t) => t.sources),
          ...candidate.performanceMetrics.map((pm) => pm.source),
        ].map((item) => [item.id, item]),
      ).values(),
    );
  }, [candidate]);

  if (!candidate) {
    return (
      <StudioShell>
        <div className="mx-auto max-w-xl space-y-4 px-4 py-20 text-center">
          <h1 className="font-display text-2xl text-brand-800">
            Kandidat tidak ditemukan
          </h1>
          <p className="text-sm text-ink-muted">
            Data tidak terdaftar atau telah berubah.
          </p>
          <Link
            href="/kandidat"
            className="inline-flex rounded-lg bg-brand-800 px-5 py-2.5 text-sm font-semibold text-cream"
          >
            Kembali ke daftar
          </Link>
        </div>
      </StudioShell>
    );
  }

  const tabs: { id: TabId; label: string; count?: number }[] = [
    { id: "overview", label: "Ikhtisar" },
    { id: "timeline", label: "Rekam jejak", count: candidate.timeline.length },
    {
      id: "stances",
      label: "Condongan Isu & Berita",
      count: candidate.issueStances?.length || 0,
    },
    { id: "programs", label: "Program", count: candidate.programs.length },
    { id: "promises", label: "Janji", count: candidate.promises.length },
    {
      id: "performance",
      label: "Kinerja",
      count: candidate.performanceMetrics.length,
    },
    { id: "sources", label: "Sumber", count: allSources.length },
  ];

  const handleReportSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setReportSubmitted(true);
    setTimeout(() => {
      setReportModalOpen(false);
      setReportSubmitted(false);
      setReportDetails("");
    }, 1800);
  };

  const verifiedClaims = candidate.claims.filter(
    (c) => c.verificationStatus === "verified",
  ).length;

  const partyHref = (() => {
    const party = getPartyById(candidate.party.id);
    return party ? `/partai/${party.slug}` : "/partai";
  })();

  return (
    <StudioShell>
      <div className="mx-auto max-w-6xl space-y-8 px-4 py-10 sm:px-6 lg:px-8">
        <StudioCrumb
          items={[
            { label: "Beranda", href: "/" },
            { label: "Kandidat", href: "/kandidat" },
            { label: candidate.name },
          ]}
        />

        {/* Profile header */}
        <StudioCard className="overflow-hidden">
          <div className="grid gap-0 lg:grid-cols-[220px_1fr]">
            <div className="relative min-h-[240px] bg-brand-800 lg:min-h-full">
              <img
                src={candidate.photoUrl}
                alt={candidate.name}
                className="absolute inset-0 h-full w-full object-cover object-top opacity-95"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-900/70 via-transparent to-transparent lg:bg-gradient-to-r lg:from-transparent lg:to-brand-900/20" />
            </div>

            <div className="flex gap-5 p-5 sm:p-7">
              <div className="space-y-5 flex-1 min-w-0">
              <div className="flex flex-wrap items-center gap-2">
                <span
                  className="rounded-md px-2.5 py-1 text-[11px] font-bold text-white"
                  style={{ backgroundColor: candidate.party.color }}
                >
                  {candidate.party.shortName}
                </span>
                <span className="rounded-md bg-[#F5F7FA] px-2.5 py-1 text-[11px] font-semibold text-ink-soft">
                  {candidate.constituency.name}
                </span>
                <span className="text-[11px] text-ink-muted">
                  Update {candidate.updatedAt}
                </span>
              </div>

              <div>
                <h1 className="font-display text-3xl tracking-tight text-brand-800 sm:text-4xl">
                  {candidate.name}
                </h1>
                <p className="mt-1.5 text-sm text-ink-muted">
                  {candidate.party.name} · {candidate.election.name} (
                  {candidate.election.year})
                </p>
              </div>

              <div className="grid grid-cols-3 gap-3 max-w-md">
                {[
                  {
                    label: "Klaim terverifikasi",
                    value: `${verifiedClaims}/${candidate.claims.length}`,
                  },
                  {
                    label: "Janji tercatat",
                    value: String(candidate.promises.length),
                  },
                  {
                    label: "Titik rekam jejak",
                    value: String(candidate.timeline.length),
                  },
                ].map((stat) => (
                  <div
                    key={stat.label}
                    className="rounded-xl border border-line bg-[#F8FAFC] px-3 py-2.5"
                  >
                    <p className="font-display text-lg text-brand-800 tabular-nums">
                      {stat.value}
                    </p>
                    <p className="mt-0.5 text-[10px] leading-snug text-ink-muted">
                      {stat.label}
                    </p>
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap gap-2 pt-1">
                <Link
                  href={`/bandingkan?c1=${candidate.id}`}
                  className="rounded-lg bg-brand-800 px-4 py-2.5 text-xs font-semibold text-cream transition hover:bg-brand-700"
                >
                  Bandingkan
                </Link>
                <button
                  onClick={() => setReportModalOpen(true)}
                  className="rounded-lg border border-line bg-white px-4 py-2.5 text-xs font-semibold text-ink-soft transition hover:border-sage/40"
                >
                  Laporkan data
                </button>
              </div>
              </div>

              {/* Party Logo - Right Side */}
              <div className="hidden sm:flex flex-col items-center justify-center shrink-0 pl-2 pr-8 group">
                <Link
                  href={partyHref}
                  className="w-28 h-28 lg:w-36 lg:h-36 flex items-center justify-center transition-transform hover:scale-105 cursor-pointer"
                  title={candidate.party.name}
                >
                  <img
                    src={candidate.party.logoUrl || PARTY_LOGOS[candidate.party.shortName] || "/images/parpol/pdi.png"}
                    alt={`Logo ${candidate.party.name}`}
                    className="w-full h-full object-contain border-0 outline-none"
                    onError={(e) => {
                      const t = e.target as HTMLImageElement;
                      t.style.display = "none";
                      const parent = t.parentElement;
                      if (parent) {
                        parent.innerHTML = `<span style="color:${candidate.party.color};font-weight:900;font-size:24px">${candidate.party.shortName}</span>`;
                      }
                    }}
                  />
                </Link>
                <Link
                  href={partyHref}
                  className="mt-2 text-xs font-bold text-ink-muted text-center uppercase tracking-wider group-hover:text-[#2A9D8F] transition-colors cursor-pointer"
                >
                  {candidate.party.shortName}
                </Link>
              </div>
            </div>
          </div>

          <div className="flex overflow-x-auto border-t border-line bg-[#F8FAFC] no-scrollbar sm:grid sm:grid-cols-7 sm:overflow-visible">
            {tabs.map((tab) => {
              const isActive = activeTab === tab.id;
              const hasCount = typeof tab.count === "number";
              const hasItems = hasCount && tab.count > 0;

              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex min-w-[5.5rem] shrink-0 flex-col items-center justify-center gap-1 border-r border-line/60 px-2 py-2.5 text-center transition last:border-r-0 sm:min-w-0 sm:flex-row sm:gap-1.5 ${
                    isActive
                      ? "bg-brand-800 text-cream"
                      : "text-ink-muted hover:bg-white hover:text-ink"
                  }`}
                >
                  <span className="text-[10px] font-semibold leading-tight sm:text-xs">
                    {tab.label}
                  </span>
                  {hasCount && (
                    <span
                      className={`inline-flex h-2 w-2 shrink-0 rounded-full sm:h-2.5 sm:w-2.5 ${
                        hasItems
                          ? isActive
                            ? "bg-sage ring-2 ring-sage/30"
                            : "bg-sage"
                          : isActive
                            ? "bg-cream/30"
                            : "bg-line"
                      }`}
                      title={
                        hasItems
                          ? `${tab.count} item`
                          : "Belum ada data"
                      }
                      aria-label={
                        hasItems
                          ? `${tab.count} item di ${tab.label}`
                          : `Belum ada data di ${tab.label}`
                      }
                    />
                  )}
                </button>
              );
            })}
          </div>
        </StudioCard>

        <FadeContent key={activeTab} duration={350}>
          {activeTab === "overview" && (
            <div className="grid grid-cols-1 gap-5 lg:grid-cols-12">
              <div className="space-y-5 lg:col-span-8">
                <StudioCard className="p-5 sm:p-6 space-y-3">
                  <h2 className="font-display text-lg text-brand-800">
                    Biografi
                  </h2>
                  <p className="text-sm leading-relaxed text-ink-soft">
                    {candidate.biography}
                  </p>
                </StudioCard>

                <StudioCard className="p-5 sm:p-6">
                  <StudioRail>
                    <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-sage">
                      Visi & misi
                    </p>
                    <p className="mt-2 text-sm leading-relaxed text-ink-soft italic">
                      {candidate.visionMission}
                    </p>
                  </StudioRail>
                </StudioCard>

                {candidate.issueStances && candidate.issueStances.length > 0 && (
                  <StudioCard className="p-5 sm:p-6 space-y-4">
                    <div className="flex items-center justify-between border-b border-line pb-3">
                      <div>
                        <h2 className="font-display text-lg text-brand-800">
                          Condongan Isu & Sikap Kebijakan
                        </h2>
                        <p className="text-xs text-ink-muted">
                          Pemetaan posisi kandidat terhadap isu strategis nasional
                        </p>
                      </div>
                      <button
                        onClick={() => setActiveTab("stances")}
                        className="text-xs font-bold text-sage hover:underline"
                      >
                        Lihat berita terverifikasi →
                      </button>
                    </div>
                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                      {candidate.issueStances.map((st) => (
                        <div
                          key={st.id}
                          className="rounded-xl border border-line bg-[#F8FAFC] p-4 space-y-2"
                        >
                          <div className="flex items-center justify-between gap-2">
                            <span className="text-[10px] font-bold uppercase tracking-wider text-sage">
                              {st.category}
                            </span>
                            <span className="rounded-full bg-gold-50 px-2.5 py-0.5 text-[10px] font-bold text-brand-800">
                              {st.stance}
                            </span>
                          </div>
                          <h3 className="text-xs font-bold text-brand-800">
                            {st.issueTitle}
                          </h3>
                          <p className="text-[11px] text-ink-soft leading-relaxed line-clamp-2">
                            {st.description}
                          </p>
                        </div>
                      ))}
                    </div>
                  </StudioCard>
                )}

                <StudioCard className="overflow-hidden">
                  <div className="border-b border-line px-5 py-4 sm:px-6">
                    <h2 className="font-display text-lg text-brand-800">
                      Klaim rekam jejak
                    </h2>
                    <p className="mt-1 text-xs text-ink-muted">
                      {candidate.claims.length} klaim tercatat
                    </p>
                  </div>
                  <div className="divide-y divide-line">
                    {candidate.claims.map((claim) => (
                      <div key={claim.id} className="space-y-2.5 px-5 py-4 sm:px-6">
                        <div className="flex flex-wrap items-start justify-between gap-2">
                          <h3 className="text-sm font-semibold text-brand-800">
                            {claim.title}
                          </h3>
                          <VerificationBadge status={claim.verificationStatus} />
                        </div>
                        <p className="text-xs leading-relaxed text-ink-soft">
                          {claim.description}
                        </p>
                        {claim.verificationNote && (
                          <p className="rounded-lg bg-amber-50 px-3 py-2 text-xs text-amber-900">
                            <span className="font-semibold">Catatan: </span>
                            {claim.verificationNote}
                          </p>
                        )}
                        <SourceCitation sources={claim.sources} compact />
                      </div>
                    ))}
                  </div>
                </StudioCard>
              </div>

              <aside className="space-y-4 lg:col-span-4">
                <StudioCard className="p-5 space-y-3">
                  <h3 className="text-[11px] font-semibold uppercase tracking-[0.14em] text-ink-muted">
                    Pendidikan
                  </h3>
                  <ul className="space-y-2.5">
                    {candidate.education.map((edu) => (
                      <li
                        key={edu}
                        className="border-l-2 border-sage/50 pl-3 text-xs leading-relaxed text-ink-soft"
                      >
                        {edu}
                      </li>
                    ))}
                  </ul>
                </StudioCard>

                <StudioCard className="p-5 space-y-3">
                  <h3 className="text-[11px] font-semibold uppercase tracking-[0.14em] text-ink-muted">
                    Jabatan & pekerjaan
                  </h3>
                  <ul className="space-y-2.5">
                    {candidate.occupation.map((occ) => (
                      <li
                        key={occ}
                        className="border-l-2 border-brand-300 pl-3 text-xs leading-relaxed text-ink-soft"
                      >
                        {occ}
                      </li>
                    ))}
                  </ul>
                </StudioCard>

                <StudioCard className="p-5 space-y-3">
                  <h3 className="text-[11px] font-semibold uppercase tracking-[0.14em] text-ink-muted">
                    Organisasi
                  </h3>
                  <ul className="space-y-2.5">
                    {candidate.organizations.map((org) => (
                      <li
                        key={org}
                        className="border-l-2 border-line pl-3 text-xs leading-relaxed text-ink-soft"
                      >
                        {org}
                      </li>
                    ))}
                  </ul>
                </StudioCard>
              </aside>
            </div>
          )}

          {activeTab === "timeline" && (
            <div className="space-y-6">
              {candidate.issueStances && candidate.issueStances.length > 0 && (
                <StudioCard className="p-5 sm:p-6 space-y-3 bg-brand-50 border-brand-100">
                  <div className="flex items-center justify-between">
                    <h3 className="font-display text-base font-bold text-brand-800">
                      Ringkasan Condongan Isu & Berita Terverifikasi
                    </h3>
                    <button
                      onClick={() => setActiveTab("stances")}
                      className="text-xs font-bold text-sage hover:underline"
                    >
                      Buka rincian berita →
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {candidate.issueStances.map((st) => (
                      <span
                        key={st.id}
                        className="inline-flex items-center gap-1.5 rounded-full border border-sage/40 bg-white px-3 py-1 text-xs font-semibold text-brand-800"
                      >
                        <span className="h-2 w-2 rounded-full bg-sage" />
                        <strong>{st.issueTitle}:</strong> {st.stance}
                      </span>
                    ))}
                  </div>
                </StudioCard>
              )}

              <StudioCard className="p-5 sm:p-7">
                <h2 className="font-display text-xl text-brand-800">
                  Timeline rekam jejak
                </h2>
                <div className="relative mt-6 space-y-0">
                  {candidate.timeline.map((event, i) => (
                    <div
                      key={event.id}
                      className="relative grid grid-cols-[72px_1fr] gap-4 pb-8 last:pb-0 sm:grid-cols-[96px_1fr]"
                    >
                      {i < candidate.timeline.length - 1 && (
                        <div className="absolute left-[71px] top-8 bottom-0 w-px bg-line sm:left-[95px]" />
                      )}
                      <div className="pt-1 text-right">
                        <p className="font-display text-lg text-brand-800 tabular-nums">
                          {event.year}
                        </p>
                      </div>
                      <div className="rounded-xl border border-line bg-[#F8FAFC] p-4 space-y-2.5">
                        <div className="flex flex-wrap items-center justify-between gap-2">
                          <h3 className="text-sm font-semibold text-brand-800">
                            {event.title}
                          </h3>
                          <VerificationBadge status={event.verificationStatus} />
                        </div>
                        <p className="text-xs leading-relaxed text-ink-soft">
                          {event.description}
                        </p>
                        <SourceCitation sources={event.sources} compact />
                      </div>
                    </div>
                  ))}
                </div>
              </StudioCard>
            </div>
          )}

          {activeTab === "stances" && (
            <div className="space-y-6">
              <StudioCard className="p-5 sm:p-7 space-y-6">
                <div className="flex flex-wrap items-center justify-between gap-3 border-b border-line pb-4">
                  <div>
                    <h2 className="font-display text-xl font-bold text-brand-800">
                      Condongan Isu Strategis & Berita Terverifikasi
                    </h2>
                    <p className="mt-1 text-xs text-ink-muted">
                      Pemetaan sikap politik kandidat beserta pembuktian artikel berita dari media publik nasional.
                    </p>
                  </div>
                  <span className="rounded-full bg-sage/15 px-3 py-1 text-xs font-bold text-brand-800">
                    {candidate.issueStances?.length || 0} Isu Terpeta
                  </span>
                </div>

                {candidate.issueStances && candidate.issueStances.length > 0 ? (
                  <div className="space-y-6">
                    {candidate.issueStances.map((stance) => (
                      <div
                        key={stance.id}
                        className="rounded-2xl border border-line bg-[#F8FAFC] p-5 sm:p-6 space-y-4 shadow-sm"
                      >
                        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-line/60 pb-3">
                          <div className="flex items-center gap-2">
                            <span className="rounded-md bg-brand-800 px-2.5 py-1 text-[11px] font-bold text-cream">
                              {stance.category}
                            </span>
                            <h3 className="font-display text-base font-bold text-brand-800">
                              {stance.issueTitle}
                            </h3>
                          </div>
                          <span className="rounded-full border border-sage/40 bg-gold-50 px-3 py-1 text-xs font-bold text-brand-800">
                            Condongan: {stance.stance}
                          </span>
                        </div>

                        <p className="text-sm leading-relaxed text-ink-soft">
                          {stance.description}
                        </p>

                        {/* Verified News Articles */}
                        {stance.verifiedNews.length > 0 && (
                          <div className="space-y-3 pt-2">
                            <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-ink-muted">
                              Berita Terverifikasi ({stance.verifiedNews.length})
                            </p>
                            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                              {stance.verifiedNews.map((news) => (
                                <a
                                  key={news.id}
                                  href={news.url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="group flex flex-col justify-between rounded-xl border border-line bg-white p-4 transition hover:border-sage hover:shadow-md"
                                >
                                  <div className="space-y-2">
                                    <div className="flex items-center justify-between gap-2">
                                      <span className="text-[11px] font-bold text-sage">
                                        {news.media}
                                      </span>
                                      <VerificationBadge status={news.verificationStatus} size="sm" />
                                    </div>
                                    <h4 className="text-xs font-bold text-brand-800 group-hover:text-sage transition-colors leading-snug">
                                      {news.title}
                                    </h4>
                                    <p className="text-[11px] text-ink-muted line-clamp-2 leading-relaxed">
                                      {news.snippet}
                                    </p>
                                  </div>
                                  <div className="mt-3 flex items-center justify-between border-t border-line/50 pt-2 text-[10px] text-ink-muted">
                                    <span>{news.publishedAt}</span>
                                    <span className="font-bold text-brand-700 group-hover:underline">
                                      Baca artikel ↗
                                    </span>
                                  </div>
                                </a>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="p-6 text-center text-xs text-ink-muted">
                    Belum ada data condongan isu spesifik yang terverifikasi untuk kandidat ini.
                  </div>
                )}
              </StudioCard>
            </div>
          )}

          {activeTab === "programs" && (
            <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
              {candidate.programs.map((prog, idx) => (
                <StudioCard key={prog} className="p-5 space-y-2">
                  <p className="text-[11px] font-semibold tabular-nums text-sage">
                    {String(idx + 1).padStart(2, "0")}
                  </p>
                  <h3 className="text-sm font-semibold text-brand-800">{prog}</h3>
                  <p className="text-xs text-ink-muted">
                    Tercantum dalam dokumen kampanye publik.
                  </p>
                </StudioCard>
              ))}
            </div>
          )}

          {activeTab === "promises" && (
            <div className="space-y-4">
              <StudioRail>
                <p className="text-sm text-ink-muted">
                  Janji dihubungkan dengan bukti implementasi dan status
                  verifikasi independen.
                </p>
              </StudioRail>
              {candidate.promises.map((promise, idx) => (
                <StudioCard key={promise.id} className="overflow-hidden">
                  <div className="flex flex-wrap items-center justify-between gap-2 border-b border-line px-5 py-4">
                    <div className="flex items-center gap-2">
                      <span className="text-[11px] font-semibold tabular-nums text-sage">
                        {String(idx + 1).padStart(2, "0")}
                      </span>
                      <span className="rounded-md bg-[#F5F7FA] px-2 py-0.5 text-[11px] font-semibold text-ink-soft">
                        {promise.sector}
                      </span>
                    </div>
                    <StatusPill status={promise.status} />
                  </div>
                  <div className="space-y-3 p-5">
                    <div>
                      <h3 className="font-display text-lg text-brand-800">
                        {promise.title}
                      </h3>
                      <p className="mt-1 text-sm text-ink-soft">
                        {promise.description}
                      </p>
                      {promise.target && (
                        <p className="mt-2 text-xs text-ink-muted">
                          Target: {promise.target}
                        </p>
                      )}
                    </div>
                    <div className="space-y-2 border-t border-line pt-3">
                      <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-ink-muted">
                        Bukti ({promise.evidences.length})
                      </p>
                      {promise.evidences.length > 0 ? (
                        promise.evidences.map((ev) => (
                          <div
                            key={ev.id}
                            className="rounded-xl border border-line bg-[#F8FAFC] p-3 space-y-1.5"
                          >
                            <div className="flex flex-wrap items-center justify-between gap-2">
                              <p className="text-xs font-semibold text-brand-800">
                                {ev.title} · {ev.evidenceDate}
                              </p>
                              <VerificationBadge
                                status={ev.verificationStatus}
                                size="sm"
                              />
                            </div>
                            <p className="text-xs text-ink-soft">
                              {ev.description}
                            </p>
                            <SourceCitation sources={[ev.source]} compact />
                          </div>
                        ))
                      ) : (
                        <p className="text-xs italic text-ink-muted">
                          Belum ada bukti terverifikasi untuk janji ini.
                        </p>
                      )}
                    </div>
                  </div>
                </StudioCard>
              ))}
            </div>
          )}

          {activeTab === "performance" && (
            <div>
              {candidate.performanceMetrics.length > 0 ? (
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  {candidate.performanceMetrics.map((metric) => (
                    <StudioCard key={metric.id} className="p-5 space-y-2">
                      <div className="flex items-center justify-between gap-2">
                        <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-ink-muted">
                          {metric.label}
                        </p>
                        <VerificationBadge
                          status={metric.verificationStatus}
                          size="sm"
                        />
                      </div>
                      <p className="font-display text-3xl text-brand-800">
                        {metric.value}
                      </p>
                      {metric.description && (
                        <p className="text-xs text-ink-soft">
                          {metric.description}
                        </p>
                      )}
                      <SourceCitation sources={[metric.source]} compact />
                    </StudioCard>
                  ))}
                </div>
              ) : (
                <StudioCard className="p-6">
                  <p className="text-sm text-ink-muted">
                    Data indikator kinerja publik belum tersedia.
                  </p>
                </StudioCard>
              )}
            </div>
          )}

          {activeTab === "sources" && (
            <StudioCard className="p-5 sm:p-6 space-y-4">
              <div>
                <h2 className="font-display text-xl text-brand-800">
                  Sumber publik
                </h2>
                <p className="mt-1 text-xs text-ink-muted">
                  {allSources.length} dokumen/tautan yang mendukung data profil
                  ini.
                </p>
              </div>
              <SourceCitation sources={allSources} compact={false} />
            </StudioCard>
          )}
        </FadeContent>
      </div>

      {reportModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-brand-900/55 p-4 backdrop-blur-sm">
          <div className="w-full max-w-lg space-y-4 rounded-2xl border border-line bg-white p-5 shadow-lift sm:p-6">
            <div className="flex items-center justify-between border-b border-line pb-3">
              <h3 className="font-display text-lg text-brand-800">
                Laporkan data
              </h3>
              <button
                onClick={() => setReportModalOpen(false)}
                className="text-sm text-ink-muted hover:text-ink"
              >
                Tutup
              </button>
            </div>

            {reportSubmitted ? (
              <div className="space-y-2 py-6 text-center">
                <p className="font-display text-lg text-brand-800">
                  Laporan terkirim
                </p>
                <p className="text-xs text-ink-muted">
                  Tim verifikator akan meninjau laporan Anda.
                </p>
              </div>
            ) : (
              <form onSubmit={handleReportSubmit} className="space-y-4">
                <div>
                  <label className="mb-1 block text-[11px] font-semibold uppercase tracking-[0.12em] text-ink-muted">
                    Alasan
                  </label>
                  <select
                    value={reportReason}
                    onChange={(e) => setReportReason(e.target.value)}
                    className="w-full rounded-lg border border-line bg-[#F8FAFC] p-2.5 text-sm outline-none focus:border-sage"
                  >
                    <option value="incorrect_info">Informasi tidak akurat</option>
                    <option value="invalid_source">Sumber tidak valid</option>
                    <option value="outdated">Data kedaluwarsa</option>
                    <option value="misleading">Konteks menyesatkan</option>
                    <option value="privacy_violation">Pelanggaran privasi</option>
                  </select>
                </div>
                <div>
                  <label className="mb-1 block text-[11px] font-semibold uppercase tracking-[0.12em] text-ink-muted">
                    Keterangan
                  </label>
                  <textarea
                    rows={4}
                    value={reportDetails}
                    onChange={(e) => setReportDetails(e.target.value)}
                    required
                    placeholder="Jelaskan bagian yang perlu diverifikasi…"
                    className="w-full rounded-lg border border-line bg-[#F8FAFC] p-3 text-sm outline-none focus:border-sage"
                  />
                </div>
                <div className="flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setReportModalOpen(false)}
                    className="rounded-lg px-4 py-2 text-xs font-semibold text-ink-soft"
                  >
                    Batal
                  </button>
                  <button
                    type="submit"
                    className="rounded-lg bg-brand-800 px-4 py-2 text-xs font-semibold text-cream"
                  >
                    Kirim laporan
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </StudioShell>
  );
}
