"use client";

import React, { useState, Suspense } from "react";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import { mockCandidates } from "@/lib/data/candidates";
import { Candidate } from "@/lib/types";
import { VerificationBadge } from "@/components/ui/VerificationBadge";
import { StatusPill } from "@/components/ui/StatusPill";

function CandidateComparisonContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  // Get candidate IDs from URL params: ?c1=c-001&c2=c-002
  const c1 = searchParams.get("c1");
  const c2 = searchParams.get("c2");
  const c3 = searchParams.get("c3");
  const c4 = searchParams.get("c4");

  const initialSelectedIds = [c1, c2, c3, c4].filter(Boolean) as string[];

  // If URL params exist with at least 2 candidates, start in comparison mode
  const [selectedIds, setSelectedIds] = useState<string[]>(initialSelectedIds);
  const [isComparing, setIsComparing] = useState<boolean>(initialSelectedIds.length >= 2);
  const [searchQuery, setSearchQuery] = useState("");

  const selectedCandidates = selectedIds
    .map((id) => mockCandidates.find((c) => c.id === id))
    .filter(Boolean) as Candidate[];

  // Filter candidates for selection view based on search query
  const filteredCandidates = mockCandidates.filter((c) => {
    const q = searchQuery.toLowerCase();
    return (
      c.name.toLowerCase().includes(q) ||
      c.party.name.toLowerCase().includes(q) ||
      c.party.shortName.toLowerCase().includes(q) ||
      c.constituency.name.toLowerCase().includes(q)
    );
  });

  const toggleCandidateSelection = (candidateId: string) => {
    if (selectedIds.includes(candidateId)) {
      setSelectedIds(selectedIds.filter((id) => id !== candidateId));
    } else {
      if (selectedIds.length >= 4) {
        alert("Maksimal 4 kandidat untuk dibandingkan sekaligus.");
        return;
      }
      setSelectedIds([...selectedIds, candidateId]);
    }
  };

  const handleStartComparison = () => {
    if (selectedIds.length < 2) {
      alert("Pilih minimal 2 kandidat untuk dibandingkan.");
      return;
    }
    setIsComparing(true);
    const query = selectedIds.map((id, i) => `c${i + 1}=${id}`).join("&");
    router.replace(`/bandingkan?${query}`);
  };

  const handleSelectCandidateInSlot = (index: number, newId: string) => {
    const updated = [...selectedIds];
    updated[index] = newId;
    setSelectedIds(updated);

    const query = updated.map((id, i) => `c${i + 1}=${id}`).join("&");
    router.replace(`/bandingkan?${query}`);
  };

  const addCandidateSlot = () => {
    if (selectedIds.length >= 4) return;
    const available = mockCandidates.find((c) => !selectedIds.includes(c.id));
    if (available) {
      const updated = [...selectedIds, available.id];
      setSelectedIds(updated);
      const query = updated.map((id, i) => `c${i + 1}=${id}`).join("&");
      router.replace(`/bandingkan?${query}`);
    }
  };

  const removeCandidateSlot = (index: number) => {
    if (selectedIds.length <= 2) {
      alert("Minimal 2 kandidat untuk dibandingkan.");
      return;
    }
    const updated = selectedIds.filter((_, i) => i !== index);
    setSelectedIds(updated);
    const query = updated.map((id, i) => `c${i + 1}=${id}`).join("&");
    router.replace(`/bandingkan?${query}`);
  };

  return (
    <div className="space-y-8">
      {/* BREADCRUMB */}
      <div className="space-y-2">
        <div className="flex items-center gap-2 text-xs text-ink-muted">
          <Link href="/" className="hover:underline">
            Beranda
          </Link>
          <span>/</span>
          <span className="font-semibold text-ink">Perbandingan Kandidat</span>
        </div>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-1">
            <h1 className="text-3xl font-black text-ink">
              {isComparing ? "Tabel Perbandingan Side-by-Side" : "Pilih Kandidat untuk Dibandingkan"}
            </h1>
            <p className="text-xs sm:text-sm text-ink-soft max-w-2xl">
              {isComparing
                ? "Bandingkan profil, program, rekam jejak terverifikasi, dan realisasi janji politik secara transparan."
                : "Cari dan pilih 2 hingga 4 kandidat politik untuk melihat perbandingan berdampingan."}
            </p>
          </div>
          <div className="w-24 h-24 sm:w-28 sm:h-28 shrink-0 self-center">
            <img
              src="/images/assets/perbandingan.png"
              alt="Perbandingan Kandidat"
              className="w-full h-full object-contain drop-shadow-md"
            />
          </div>
        </div>
      </div>

      {/* VIEW MODE 1: SELECTION & SEARCH GRID */}
      {!isComparing ? (
        <div className="space-y-6">
          {/* SEARCH BAR & FILTER TOOLBAR */}
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <div className="group relative flex-1 w-full flex items-center rounded-lg bg-white/80 backdrop-blur-xl border border-line/80 shadow-soft transition-all outline-none focus:outline-none focus-visible:outline-none">
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
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Cari nama, partai, atau dapil…"
                className="w-full bg-transparent pl-14 pr-28 py-4 text-sm sm:text-base text-ink placeholder:text-ink-muted/70 border-none outline-none focus:outline-none focus-visible:outline-none focus:ring-0 focus-visible:ring-0"
              />
              {searchQuery ? (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className="absolute right-2 px-4 py-2.5 rounded-md bg-brand-700 text-cream text-xs sm:text-sm font-semibold hover:bg-brand-600 transition-colors focus:outline-none focus-visible:outline-none focus:ring-0 focus-visible:ring-0"
                >
                  Reset
                </button>
              ) : (
                <button
                  type="button"
                  className="absolute right-2 px-5 py-2.5 rounded-md bg-brand-700 text-cream text-xs sm:text-sm font-semibold hover:bg-brand-600 transition-colors focus:outline-none focus-visible:outline-none focus:ring-0 focus-visible:ring-0"
                >
                  Cari
                </button>
              )}
            </div>
            <div className="flex items-center gap-2 px-4 py-3.5 rounded-lg bg-white/80 backdrop-blur-xl border border-line/80 shadow-soft text-xs sm:text-sm font-bold text-ink-soft shrink-0">
              <span>Terpilih:</span>
              <span className="rounded-md bg-brand-800 px-2 py-0.5 text-cream font-extrabold">
                {selectedIds.length} / 4
              </span>
            </div>
          </div>

          {/* CANDIDATES SELECTION GRID */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {filteredCandidates.map((candidate) => {
              const isSelected = selectedIds.includes(candidate.id);
              return (
                <div
                  key={candidate.id}
                  onClick={() => toggleCandidateSelection(candidate.id)}
                  className={`p-4 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between space-y-3 ${isSelected
                      ? "bg-brand-50/50 border-brand-700 shadow-md ring-2 ring-brand-700"
                      : "bg-white border-line hover:border-sage hover:shadow-sm"
                    }`}
                >
                  <div className="flex items-start gap-3">
                    <img
                      src={candidate.photoUrl}
                      alt={candidate.name}
                      className="w-14 h-14 rounded-xl object-cover border border-line shrink-0 bg-mist/50"
                    />
                    <div className="flex-1 min-w-0">
                      <h3 className="font-extrabold text-sm text-ink line-clamp-1">
                        {candidate.name}
                      </h3>
                      <span
                        className="inline-block px-2 py-0.5 rounded text-[10px] font-bold text-white mt-1"
                        style={{ backgroundColor: candidate.party.color }}
                      >
                        {candidate.party.shortName}
                      </span>
                      <p className="text-[11px] text-ink-muted mt-1 line-clamp-1">
                        {candidate.constituency.name}
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleCandidateSelection(candidate.id);
                    }}
                    className={`w-full py-2 rounded-xl text-xs font-bold transition-all ${isSelected
                        ? "bg-brand-800 text-white shadow-sm"
                        : "bg-cream border border-line text-ink-soft hover:bg-sage hover:text-white"
                      }`}
                  >
                    {isSelected ? "✓ Terpilih" : "+ Pilih Bandingkan"}
                  </button>
                </div>
              );
            })}
          </div>

          {/* FLOATING ACTION BAR FOR MOBILE/DESKTOP */}
          {selectedIds.length > 0 && (
            <div className="p-4 bg-brand-900 text-white rounded-2xl shadow-xl flex items-center justify-between gap-4">
              <div className="text-xs">
                <span className="font-bold">{selectedIds.length} kandidat</span> dipilih untuk dibanding.
              </div>
              <button
                onClick={handleStartComparison}
                disabled={selectedIds.length < 2}
                className="px-6 py-2.5 rounded-xl bg-gold hover:bg-yellow-500 disabled:opacity-50 text-ink-dark font-extrabold text-xs shadow-md transition-all"
              >
                {selectedIds.length < 2 ? "Pilih Minimal 2 Kandidat" : "Mulai Bandingkan Sekarang →"}
              </button>
            </div>
          )}
        </div>
      ) : (
        /* VIEW MODE 2: COMPARISON TABLE */
        <div className="overflow-x-auto rounded-3xl border border-line bg-white shadow-lg">
          <table className="w-full text-left border-collapse min-w-[700px]">
            {/* CANDIDATE HEADER SELECTORS */}
            <thead>
              <tr className="border-b border-line bg-cream/50">
                <th className="p-4 w-48 text-xs font-black uppercase text-ink-muted">
                  Indikator / Kandidat
                </th>
                {selectedCandidates.map((candidate, idx) => (
                  <th key={candidate.id} className="p-4 w-72 align-top">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-ink-muted">
                          Kandidat #{idx + 1}
                        </span>
                        {selectedCandidates.length > 2 && (
                          <button
                            onClick={() => removeCandidateSlot(idx)}
                            className="text-ink-muted hover:text-rose-500 text-xs"
                            title="Hapus dari perbandingan"
                          >
                            ✕ Hapus
                          </button>
                        )}
                      </div>

                      {/* Candidate Selector dropdown */}
                      <select
                        value={candidate.id}
                        onChange={(e) =>
                          handleSelectCandidateInSlot(idx, e.target.value)
                        }
                        className="w-full p-2 rounded-xl bg-white border border-line text-xs font-bold focus:outline-none"
                      >
                        {mockCandidates.map((c) => (
                          <option key={c.id} value={c.id}>
                            {c.name} ({c.party.shortName})
                          </option>
                        ))}
                      </select>

                      {/* Candidate Identity Brief */}
                      <div className="flex items-center gap-3 pt-2">
                        <img
                          src={candidate.photoUrl}
                          alt={candidate.name}
                          className="w-12 h-12 rounded-xl object-cover border border-line shrink-0 bg-mist/50"
                        />
                        <div>
                          <div className="font-extrabold text-sm text-ink line-clamp-1">
                            {candidate.name}
                          </div>
                          <span
                            className="inline-block px-2 py-0.5 rounded text-[10px] font-bold text-white mt-1"
                            style={{ backgroundColor: candidate.party.color }}
                          >
                            {candidate.party.shortName}
                          </span>
                        </div>
                      </div>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>

            <tbody className="divide-y divide-line text-xs text-ink-soft">
              {/* ROW 1: ELECTION & REGION */}
              <tr>
                <td className="p-4 font-bold bg-cream/50 text-ink">
                  Pemilu & Dapil
                </td>
                {selectedCandidates.map((c) => (
                  <td key={c.id} className="p-4">
                    <div className="font-semibold text-ink">
                      {c.election.name}
                    </div>
                    <div className="text-ink-muted mt-0.5">
                      {c.constituency.name}
                    </div>
                  </td>
                ))}
              </tr>

              {/* ROW 2: EDUCATION */}
              <tr>
                <td className="p-4 font-bold bg-cream/50 text-ink">Pendidikan</td>
                {selectedCandidates.map((c) => (
                  <td key={c.id} className="p-4">
                    <ul className="space-y-1">
                      {c.education.map((edu, i) => (
                        <li key={i} className="flex items-start gap-1.5">
                          <span className="text-sage font-bold">•</span>
                          <span>{edu}</span>
                        </li>
                      ))}
                    </ul>
                  </td>
                ))}
              </tr>

              {/* ROW 3: PUBLIC POSITIONS */}
              <tr>
                <td className="p-4 font-bold bg-cream/50 text-ink">
                  Jabatan & Pekerjaan
                </td>
                {selectedCandidates.map((c) => (
                  <td key={c.id} className="p-4">
                    <ul className="space-y-1">
                      {c.occupation.map((occ, i) => (
                        <li key={i} className="flex items-start gap-1.5">
                          <span className="text-gold font-bold">•</span>
                          <span>{occ}</span>
                        </li>
                      ))}
                    </ul>
                  </td>
                ))}
              </tr>

              {/* ROW 4: VERIFIED CLAIMS SUMMARY */}
              <tr>
                <td className="p-4 font-bold bg-cream/50 text-ink">
                  Klaim Terverifikasi
                </td>
                {selectedCandidates.map((c) => {
                  const verified = c.claims.filter(
                    (cl) => cl.verificationStatus === "verified"
                  );
                  return (
                    <td key={c.id} className="p-4">
                      <div className="font-extrabold text-sm text-verified mb-1">
                        {verified.length} dari {c.claims.length} Klaim
                      </div>
                      <ul className="space-y-1 text-[11px] text-ink-muted">
                        {c.claims.map((cl) => (
                          <li key={cl.id} className="flex items-center gap-1.5">
                            <VerificationBadge
                              status={cl.verificationStatus}
                              size="sm"
                              showLabel={false}
                            />
                            <span className="line-clamp-1">{cl.title}</span>
                          </li>
                        ))}
                      </ul>
                    </td>
                  );
                })}
              </tr>

              {/* ROW 5: KEY PROGRAMS */}
              <tr>
                <td className="p-4 font-bold bg-cream/50 text-ink">
                  Program Kerja Utama
                </td>
                {selectedCandidates.map((c) => (
                  <td key={c.id} className="p-4">
                    <ul className="space-y-1.5">
                      {c.programs.map((prog, i) => (
                        <li
                          key={i}
                          className="p-2 rounded-lg bg-cream/50 border border-line"
                        >
                          {prog}
                        </li>
                      ))}
                    </ul>
                  </td>
                ))}
              </tr>

              {/* ROW 6: PROMISE TRACKER SUMMARY */}
              <tr>
                <td className="p-4 font-bold bg-cream/50 text-ink">
                  Status Janji Politik
                </td>
                {selectedCandidates.map((c) => (
                  <td key={c.id} className="p-4">
                    <div className="space-y-2">
                      {c.promises.map((p) => (
                        <div
                          key={p.id}
                          className="p-2 rounded-lg bg-cream/50 space-y-1"
                        >
                          <div className="flex items-center justify-between gap-1">
                            <span className="font-bold text-[11px] text-ink line-clamp-1">
                              {p.title}
                            </span>
                          </div>
                          <StatusPill status={p.status} size="sm" />
                        </div>
                      ))}
                    </div>
                  </td>
                ))}
              </tr>

              {/* ROW 7: PERFORMANCE METRICS */}
              <tr>
                <td className="p-4 font-bold bg-cream/50 text-ink">
                  Metrik Kinerja
                </td>
                {selectedCandidates.map((c) => (
                  <td key={c.id} className="p-4">
                    {c.performanceMetrics.length > 0 ? (
                      <div className="space-y-1.5">
                        {c.performanceMetrics.map((pm) => (
                          <div
                            key={pm.id}
                            className="flex justify-between items-center p-1.5 rounded bg-cream"
                          >
                            <span className="text-ink-muted text-[11px]">
                              {pm.label}:
                            </span>
                            <span className="font-extrabold text-brand-700">
                              {pm.value}
                            </span>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <span className="text-ink-muted italic">
                        Belum ada metrik terdata
                      </span>
                    )}
                  </td>
                ))}
              </tr>

              {/* ROW 8: DETAIL LINK */}
              <tr>
                <td className="p-4 font-bold bg-cream/50 text-ink">
                  Tautan Profil
                </td>
                {selectedCandidates.map((c) => (
                  <td key={c.id} className="p-4">
                    <Link
                      href={`/kandidat/${c.slug}`}
                      className="block w-full py-2 text-center rounded-xl bg-brand-800 hover:bg-brand-700 text-white font-bold text-xs"
                    >
                      Buka Profil Lengkap →
                    </Link>
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default function CandidateComparisonPage() {
  return (
    <div className="min-h-screen py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <Suspense
        fallback={
          <div className="p-8 text-center text-xs text-ink-muted">
            Memuat perbandingan kandidat...
          </div>
        }
      >
        <CandidateComparisonContent />
      </Suspense>
    </div>
  );
}
