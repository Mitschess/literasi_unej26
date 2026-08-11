"use client";

import React, { useState } from "react";
import Link from "next/link";
import { notFound, useParams } from "next/navigation";
import { getCandidateBySlug } from "@/lib/data/candidates";
import { VerificationBadge } from "@/components/ui/VerificationBadge";
import { StatusPill } from "@/components/ui/StatusPill";
import { SourceCitation } from "@/components/ui/SourceCitation";

export default function CandidateDetailPage() {
  const params = useParams();
  const slug = params?.slug as string;
  const candidate = getCandidateBySlug(slug);

  const [activeTab, setActiveTab] = useState<
    | "overview"
    | "timeline"
    | "programs"
    | "promises"
    | "performance"
    | "sources"
  >("overview");

  // Report Modal State
  const [reportModalOpen, setReportModalOpen] = useState(false);
  const [reportSubmitted, setReportSubmitted] = useState(false);
  const [reportReason, setReportReason] = useState("incorrect_info");
  const [reportDetails, setReportDetails] = useState("");

  if (!candidate) {
    return (
      <div className="min-h-screen py-20 px-4 text-center max-w-xl mx-auto space-y-4">
        <div className="text-5xl">⚠️</div>
        <h1 className="text-2xl font-black text-ink ">
          Kandidat Tidak Ditemukan
        </h1>
        <p className="text-xs text-ink-muted">
          Kandidat yang Anda cari tidak terdaftar atau telah mengalami perubahan
          data.
        </p>
        <Link
          href="/kandidat"
          className="inline-block px-5 py-2.5 rounded-xl bg-brand-800 text-white font-bold text-xs"
        >
          Kembali ke Daftar Kandidat
        </Link>
      </div>
    );
  }

  // Aggregate all sources connected to this candidate
  const allSources = Array.from(
    new Map(
      [
        ...candidate.claims.flatMap((c) => c.sources),
        ...candidate.promises.map((p) => p.source),
        ...candidate.promises.flatMap((p) => p.evidences.map((e) => e.source)),
        ...candidate.timeline.flatMap((t) => t.sources),
        ...candidate.performanceMetrics.map((pm) => pm.source),
      ].map((item) => [item.id, item]),
    ).values(),
  );

  const handleReportSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setReportSubmitted(true);
    setTimeout(() => {
      setReportModalOpen(false);
      setReportSubmitted(false);
      setReportDetails("");
    }, 2000);
  };

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8">
      {/* BREADCRUMB */}
      <div className="flex items-center gap-2 text-xs text-ink-muted">
        <Link href="/" className="hover:underline">
          Beranda
        </Link>
        <span>/</span>
        <Link href="/kandidat" className="hover:underline">
          Kandidat
        </Link>
        <span>/</span>
        <span className="font-semibold text-ink ">{candidate.name}</span>
      </div>

      {/* CANDIDATE HEADER HERO CARD */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white border border-line shadow-md relative overflow-hidden space-y-6">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex items-center gap-6">
            {/* Avatar */}
            <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-3xl bg-gradient-to-tr from-sage to-gold p-1 shadow-lg shrink-0">
              <img
                src={candidate.photoUrl}
                alt={candidate.name}
                className="w-full h-full rounded-[22px] object-cover bg-mist/50"
              />
            </div>

            {/* Main Info */}
            <div className="space-y-1.5">
              <div className="flex flex-wrap items-center gap-2">
                <span
                  className="px-3 py-1 rounded-full text-xs font-bold text-white shadow-xs"
                  style={{ backgroundColor: candidate.party.color }}
                >
                  {candidate.party.shortName} — {candidate.party.name}
                </span>
                <span className="px-3 py-1 rounded-full bg-mist/50 text-ink-soft text-xs font-semibold">
                  {candidate.constituency.name}
                </span>
              </div>
              <h1 className="text-2xl sm:text-4xl font-black text-ink tracking-tight">
                {candidate.name}
              </h1>
              <p className="text-xs sm:text-sm font-semibold text-brand-700 ">
                {candidate.election.name} ({candidate.election.year})
              </p>
              <p className="text-xs text-ink-muted">
                Terakhir Diperbarui: {candidate.updatedAt}
              </p>
            </div>
          </div>

          {/* Quick Action buttons */}
          <div className="flex flex-wrap md:flex-col items-stretch gap-2.5 w-full md:w-auto shrink-0">
            <Link
              href={`/bandingkan?c1=${candidate.id}`}
              className="flex-1 md:flex-none px-4 py-2.5 rounded-xl bg-brand-800 hover:bg-sage text-white font-bold text-xs text-center transition-colors shadow-sm flex items-center justify-center gap-1.5"
            >
              <span>⚡ Bandingkan Kandidat</span>
            </Link>
            <button
              onClick={() => setReportModalOpen(true)}
              className="flex-1 md:flex-none px-4 py-2.5 rounded-xl bg-mist/50 hover:bg-mist text-ink-soft font-semibold text-xs text-center transition-colors flex items-center justify-center gap-1.5"
            >
              <svg
                className="w-4 h-4 text-rose-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                />
              </svg>
              <span>Laporkan Data</span>
            </button>
          </div>
        </div>

        {/* TABS NAVIGATION (SRS §10.3) */}
        <div className="flex overflow-x-auto border-b border-line gap-2 pt-2 no-scrollbar">
          {[
            { id: "overview", label: "Overview Profil" },
            {
              id: "timeline",
              label: `Rekam Jejak (${candidate.timeline.length})`,
            },
            {
              id: "programs",
              label: `Program Visi-Misi (${candidate.programs.length})`,
            },
            {
              id: "promises",
              label: `Janji & Realisasi (${candidate.promises.length})`,
            },
            {
              id: "performance",
              label: `Kinerja Publik (${candidate.performanceMetrics.length})`,
            },
            { id: "sources", label: `Sumber Data (${allSources.length})` },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-4 py-3 text-xs font-bold whitespace-nowrap border-b-2 transition-all ${
                activeTab === tab.id
                  ? "border-sage text-brand-700 "
                  : "border-transparent text-ink-muted hover:text-ink:text-cream"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* TAB CONTENT PANELS */}
      <div className="space-y-6">
        {/* 1. OVERVIEW TAB */}
        {activeTab === "overview" && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              {/* Biography */}
              <div className="p-6 rounded-2xl bg-white border border-line space-y-3">
                <h3 className="text-base font-extrabold text-ink ">
                  Biografi Kandidat
                </h3>
                <p className="text-xs sm:text-sm text-ink-soft leading-relaxed">
                  {candidate.biography}
                </p>
              </div>

              {/* Vision & Mission */}
              <div className="p-6 rounded-2xl bg-gradient-to-br from-mist/40 to-gold-50 border border-mist space-y-3">
                <h3 className="text-base font-extrabold text-ink flex items-center gap-2">
                  <span>🎯 Visi & Misi</span>
                </h3>
                <p className="text-xs sm:text-sm text-ink-soft font-medium leading-relaxed italic">
                  "{candidate.visionMission}"
                </p>
              </div>

              {/* Key Verified Claims */}
              <div className="p-6 rounded-2xl bg-white border border-line space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-base font-extrabold text-ink ">
                    Klaim Rekam Jejak Terdaftar
                  </h3>
                  <span className="text-xs font-semibold text-ink-muted">
                    {candidate.claims.length} Klaim
                  </span>
                </div>

                <div className="space-y-4">
                  {candidate.claims.map((claim) => (
                    <div
                      key={claim.id}
                      className="p-4 rounded-xl border border-line bg-cream/50 space-y-2"
                    >
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <h4 className="text-sm font-bold text-ink ">
                          {claim.title}
                        </h4>
                        <VerificationBadge status={claim.verificationStatus} />
                      </div>
                      <p className="text-xs text-ink-soft ">
                        {claim.description}
                      </p>
                      {claim.verificationNote && (
                        <div className="p-2.5 rounded-lg bg-amber-500/10 border border-amber-500/20 text-xs text-amber-800">
                          <strong>Catatan Verifikator:</strong>{" "}
                          {claim.verificationNote}
                        </div>
                      )}
                      <SourceCitation sources={claim.sources} compact={true} />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar Details */}
            <div className="space-y-6">
              {/* Education */}
              <div className="p-6 rounded-2xl bg-white border border-line space-y-3">
                <h4 className="text-xs font-extrabold uppercase tracking-wider text-ink-muted">
                  Riwayat Pendidikan
                </h4>
                <ul className="space-y-2 text-xs text-ink-soft ">
                  {candidate.education.map((edu, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-sage font-bold">🎓</span>
                      <span>{edu}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Occupation & Positions */}
              <div className="p-6 rounded-2xl bg-white border border-line space-y-3">
                <h4 className="text-xs font-extrabold uppercase tracking-wider text-ink-muted">
                  Pengalaman & Jabatan Publik
                </h4>
                <ul className="space-y-2 text-xs text-ink-soft ">
                  {candidate.occupation.map((occ, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-gold font-bold">💼</span>
                      <span>{occ}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Organizations */}
              <div className="p-6 rounded-2xl bg-white border border-line space-y-3">
                <h4 className="text-xs font-extrabold uppercase tracking-wider text-ink-muted">
                  Riwayat Organisasi
                </h4>
                <ul className="space-y-2 text-xs text-ink-soft ">
                  {candidate.organizations.map((org, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-purple-500 font-bold">👥</span>
                      <span>{org}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* 2. REKAM JEJAK (TIMELINE) TAB (FR-006) */}
        {activeTab === "timeline" && (
          <div className="p-6 sm:p-8 rounded-2xl bg-white border border-line space-y-6">
            <h3 className="text-base font-extrabold text-ink ">
              Timeline Rekam Jejak Kandidat
            </h3>
            <div className="relative pl-6 sm:pl-8 border-l-2 border-mist space-y-8">
              {candidate.timeline.map((event) => (
                <div key={event.id} className="relative group">
                  {/* Timeline dot */}
                  <div className="absolute -left-[31px] sm:-left-[39px] top-1.5 w-4 h-4 rounded-full bg-brand-800 border-4 border-white group-hover:scale-125 transition-transform" />

                  <div className="p-5 rounded-2xl bg-cream/60 border border-line space-y-3">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <span className="px-2.5 py-0.5 rounded-md bg-mist text-brand-800 text-xs font-extrabold">
                        Tahun {event.year}
                      </span>
                      <VerificationBadge status={event.verificationStatus} />
                    </div>

                    <h4 className="text-base font-bold text-ink ">
                      {event.title}
                    </h4>

                    <p className="text-xs sm:text-sm text-ink-soft leading-relaxed">
                      {event.description}
                    </p>

                    <div className="pt-2 border-t border-line ">
                      <SourceCitation sources={event.sources} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 3. PROGRAM TAB */}
        {activeTab === "programs" && (
          <div className="p-6 sm:p-8 rounded-2xl bg-white border border-line space-y-6">
            <h3 className="text-base font-extrabold text-ink ">
              Program Kerja Diusulkan
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {candidate.programs.map((prog, idx) => (
                <div
                  key={idx}
                  className="p-5 rounded-2xl bg-cream/60 border border-line space-y-2"
                >
                  <div className="w-8 h-8 rounded-lg bg-brand-800 text-white font-bold text-xs flex items-center justify-center">
                    #{idx + 1}
                  </div>
                  <h4 className="text-sm font-bold text-ink ">{prog}</h4>
                  <p className="text-xs text-ink-muted">
                    Program resmi yang tercantum dalam dokumen kampanye publik.
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 4. JANJI & REALISASI (PROMISE TRACKER) TAB (FR-008 & FR-009) */}
        {activeTab === "promises" && (
          <div className="p-6 sm:p-8 rounded-2xl bg-white border border-line space-y-6">
            <div>
              <h3 className="text-base font-extrabold text-ink ">
                Promise Tracker (Pemantauan Janji Politik)
              </h3>
              <p className="text-xs text-ink-muted mt-1">
                Janji politik dihubungkan langsung dengan bukti fisik
                implementasi dan status verifikasi independen.
              </p>
            </div>

            <div className="space-y-6">
              {candidate.promises.map((promise) => (
                <div
                  key={promise.id}
                  className="p-6 rounded-2xl bg-cream/60 border border-line space-y-4"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span className="px-2.5 py-1 rounded-lg bg-mist text-ink text-xs font-bold">
                        {promise.sector}
                      </span>
                      {promise.target && (
                        <span className="text-xs text-ink-muted">
                          Target: {promise.target}
                        </span>
                      )}
                    </div>
                    <StatusPill status={promise.status} />
                  </div>

                  <div>
                    <h4 className="text-base font-bold text-ink ">
                      {promise.title}
                    </h4>
                    <p className="text-xs sm:text-sm text-ink-soft mt-1">
                      {promise.description}
                    </p>
                  </div>

                  {/* Evidence list */}
                  <div className="space-y-2 pt-2 border-t border-line ">
                    <h5 className="text-xs font-bold text-ink-muted uppercase">
                      Bukti Implementasi ({promise.evidences.length})
                    </h5>
                    {promise.evidences.length > 0 ? (
                      promise.evidences.map((ev) => (
                        <div
                          key={ev.id}
                          className="p-3 rounded-xl bg-white border border-line text-xs space-y-1"
                        >
                          <div className="flex items-center justify-between">
                            <span className="font-bold text-ink ">
                              {ev.title} ({ev.evidenceDate})
                            </span>
                            <VerificationBadge
                              status={ev.verificationStatus}
                              size="sm"
                            />
                          </div>
                          <p className="text-ink-soft ">{ev.description}</p>
                          <SourceCitation
                            sources={[ev.source]}
                            compact={true}
                          />
                        </div>
                      ))
                    ) : (
                      <p className="text-xs text-ink-muted italic">
                        Belum ada dokumen bukti fisik yang berhasil diverifikasi
                        untuk janji ini.
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 5. KINERJA TAB (FR-007) */}
        {activeTab === "performance" && (
          <div className="p-6 sm:p-8 rounded-2xl bg-white border border-line space-y-6">
            <h3 className="text-base font-extrabold text-ink ">
              Metrik Kinerja Publik Terdata
            </h3>
            {candidate.performanceMetrics.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {candidate.performanceMetrics.map((metric) => (
                  <div
                    key={metric.id}
                    className="p-5 rounded-2xl bg-cream/60 border border-line space-y-2"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-ink-muted uppercase">
                        {metric.label}
                      </span>
                      <VerificationBadge
                        status={metric.verificationStatus}
                        size="sm"
                      />
                    </div>
                    <div className="text-3xl font-black text-brand-700 ">
                      {metric.value}
                    </div>
                    {metric.description && (
                      <p className="text-xs text-ink-soft ">
                        {metric.description}
                      </p>
                    )}
                    <SourceCitation sources={[metric.source]} compact={true} />
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-xs text-ink-muted italic">
                Data indikator kinerja publik belum tersedia untuk kandidat ini.
              </p>
            )}
          </div>
        )}

        {/* 6. SUMBER TAB (FR-011) */}
        {activeTab === "sources" && (
          <div className="p-6 sm:p-8 rounded-2xl bg-white border border-line space-y-6">
            <div>
              <h3 className="text-base font-extrabold text-ink ">
                Daftar Sumber Informasi Publik ({allSources.length})
              </h3>
              <p className="text-xs text-ink-muted mt-1">
                Seluruh informasi profil, klaim, janji, dan rekam jejak kandidat
                didasarkan pada dokumen berikut.
              </p>
            </div>

            <SourceCitation sources={allSources} compact={false} />
          </div>
        )}
      </div>

      {/* REPORT MODAL (FR-016) */}
      {reportModalOpen && (
        <div className="fixed inset-0 z-50 bg-brand-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white border border-line rounded-3xl p-6 max-w-lg w-full space-y-4 shadow-2xl animate-fade-in">
            <div className="flex items-center justify-between pb-3 border-b border-line ">
              <h3 className="text-base font-bold text-ink flex items-center gap-2">
                <span>🚩 Laporkan Informasi Bermasalah</span>
              </h3>
              <button
                onClick={() => setReportModalOpen(false)}
                className="text-ink-muted hover:text-ink-soft text-sm"
              >
                ✕
              </button>
            </div>

            {reportSubmitted ? (
              <div className="p-6 text-center space-y-2 text-verified">
                <div className="text-4xl">✓</div>
                <h4 className="font-bold text-base">
                  Laporan Berhasil Terkirim
                </h4>
                <p className="text-xs text-ink-muted">
                  Tim verifikator kami akan segera memeriksa laporan Anda.
                  Terima kasih atas partisipasi aktif Anda!
                </p>
              </div>
            ) : (
              <form onSubmit={handleReportSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-ink-muted uppercase mb-1">
                    Alasan Pelaporan
                  </label>
                  <select
                    value={reportReason}
                    onChange={(e) => setReportReason(e.target.value)}
                    className="w-full p-2.5 rounded-xl bg-cream border border-line text-xs font-medium focus:outline-none"
                  >
                    <option value="incorrect_info">
                      Informasi Salah / Tidak Akurat
                    </option>
                    <option value="invalid_source">
                      Sumber Tidak Valid / Mati
                    </option>
                    <option value="outdated">Data Kedaluwarsa</option>
                    <option value="misleading">
                      Informasi Menyesatkan (Konteks Salah)
                    </option>
                    <option value="privacy_violation">
                      Pelanggaran Privasi
                    </option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-ink-muted uppercase mb-1">
                    Rincian Keterangan
                  </label>
                  <textarea
                    rows={4}
                    value={reportDetails}
                    onChange={(e) => setReportDetails(e.target.value)}
                    required
                    placeholder="Sebutkan bagian mana yang perlu diverifikasi dan sertakan link sumber tandingan jika ada..."
                    className="w-full p-3 rounded-xl bg-cream border border-line text-xs focus:outline-none"
                  />
                </div>

                <div className="flex items-center justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setReportModalOpen(false)}
                    className="px-4 py-2 rounded-xl text-xs font-semibold text-ink-soft hover:bg-mist/50 "
                  >
                    Batal
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs shadow-sm"
                  >
                    Kirim Laporan
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
