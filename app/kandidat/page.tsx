"use client";

import React, { useState, useMemo, Suspense, useCallback } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import { mockCandidates } from "@/lib/data/candidates";
import { CandidateCard } from "@/components/candidate/CandidateCard";
import { getCandidateCountsByProvince } from "@/lib/map/province-stats";

const IndonesiaMap = dynamic(() => import("@/components/map/IndonesiaMap"), {
  ssr: false,
  loading: () => (
    <div className="h-[220px] sm:h-[320px] animate-pulse rounded-2xl bg-mist/30" />
  ),
});

function CandidateListContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const initialQuery = searchParams.get("q") || "";
  const initialType = searchParams.get("type") || "";
  const initialProvince = searchParams.get("provinsi") || "all";

  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [selectedParty, setSelectedParty] = useState("all");
  const [selectedProvince, setSelectedProvince] = useState(initialProvince);
  const [selectedElectionType, setSelectedElectionType] = useState(
    initialType || "all",
  );
  const provinceCounts = useMemo(
    () => getCandidateCountsByProvince(mockCandidates),
    [],
  );

  // Unique filter options
  const parties = Array.from(
    new Set(mockCandidates.map((c) => c.party.shortName)),
  );
  const provinces = Array.from(
    new Set(mockCandidates.map((c) => c.constituency.province)),
  );
  const electionTypes = Array.from(
    new Set(mockCandidates.map((c) => c.election.type)),
  );

  const filteredCandidates = useMemo(() => {
    return mockCandidates.filter((c) => {
      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesName = c.name.toLowerCase().includes(q);
        const matchesParty =
          c.party.name.toLowerCase().includes(q) ||
          c.party.shortName.toLowerCase().includes(q);
        const matchesConstituency =
          c.constituency.name.toLowerCase().includes(q) ||
          c.constituency.province.toLowerCase().includes(q);
        if (!matchesName && !matchesParty && !matchesConstituency) return false;
      }

      // Party filter
      if (selectedParty !== "all" && c.party.shortName !== selectedParty) {
        return false;
      }

      // Province filter
      if (
        selectedProvince !== "all" &&
        c.constituency.province !== selectedProvince
      ) {
        return false;
      }

      // Election type filter
      if (
        selectedElectionType !== "all" &&
        c.election.type !== selectedElectionType
      ) {
        return false;
      }

      return true;
    });
  }, [searchQuery, selectedParty, selectedProvince, selectedElectionType]);

  const updateProvinceInUrl = useCallback(
    (province: string) => {
      const params = new URLSearchParams(searchParams.toString());
      if (province === "all") {
        params.delete("provinsi");
      } else {
        params.set("provinsi", province);
      }
      const query = params.toString();
      router.replace(query ? `/kandidat?${query}` : "/kandidat", {
        scroll: false,
      });
    },
    [router, searchParams],
  );

  const handleProvinceSelect = useCallback(
    (province: string | null) => {
      const next = province ?? "all";
      setSelectedProvince(next);
      updateProvinceInUrl(next);
    },
    [updateProvinceInUrl],
  );

  const handleProvinceDropdownChange = (province: string) => {
    setSelectedProvince(province);
    updateProvinceInUrl(province);
  };

  return (
    <div className="space-y-8">
      <div className="space-y-3">
        <div className="flex items-center gap-2 text-xs text-ink-muted">
          <Link href="/" className="hover:text-ink transition-colors">
            Beranda
          </Link>
          <span className="opacity-40">/</span>
          <span className="font-semibold text-ink">Kandidat</span>
        </div>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2">
              <span className="h-px w-8 bg-sage" />
              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-sage">
                Direktori publik
              </p>
            </div>
            <h1 className="font-display text-3xl sm:text-4xl tracking-tight text-brand-800">
              Rekam Jejak Kandidat
            </h1>
            <p className="text-sm text-ink-muted max-w-xl leading-relaxed">
              Jelajahi kandidat lewat peta, pencarian, atau filter partai dan wilayah
              untuk memeriksa profil serta rekam jejak secara transparan.
            </p>
          </div>
          <div className="w-24 h-24 sm:w-32 sm:h-32 shrink-0 self-center">
            <img
              src="/images/assets/verifikator.png"
              alt="Cari Rekam Jejak Kandidat"
              className="w-full h-full object-contain drop-shadow-md"
            />
          </div>
        </div>
      </div>

      <div className="p-5 rounded-2xl bg-white border border-line space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
          <div className="space-y-1">
            <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-sage">
              Eksplorasi wilayah
            </p>
            <h2 className="font-display text-xl text-brand-800">
              Peta kandidat Indonesia
            </h2>
            <p className="text-xs text-ink-muted max-w-2xl">
              Klik provinsi untuk memfilter daftar. Provinsi berwarna menandai
              wilayah yang punya data kandidat.
            </p>
          </div>
          {selectedProvince !== "all" && (
            <button
              onClick={() => handleProvinceSelect(null)}
              className="shrink-0 px-3 py-2 rounded-lg text-xs font-semibold text-brand-700 bg-[#F5F7FA] border border-line transition-colors hover:border-sage/40"
            >
              Tampilkan semua
            </button>
          )}
        </div>

        <IndonesiaMap
          selectedProvince={
            selectedProvince === "all" ? null : selectedProvince
          }
          provinceCounts={provinceCounts}
          onProvinceSelect={handleProvinceSelect}
          className="rounded-2xl overflow-hidden border border-line bg-cream"
        />

        {selectedProvince !== "all" && (
          <p className="text-xs text-ink-soft">
            Menampilkan kandidat dari{" "}
            <strong className="text-ink">{selectedProvince}</strong>
            {provinceCounts[selectedProvince]
              ? ` · ${provinceCounts[selectedProvince]} kandidat`
              : " · belum ada data kandidat"}
          </p>
        )}
      </div>

      {/* SEARCH AND FILTER BAR */}
      <div className="p-5 rounded-2xl bg-white border border-line shadow-sm space-y-4">
        {/* Search input */}
        <div className="relative">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Cari kandidat berdasarkan nama, partai, atau daerah pemilihan..."
            className="w-full pl-10 pr-4 py-3 rounded-xl bg-cream border border-line text-sm font-medium focus:outline-none focus:ring-2 focus:ring-sage"
          />
          <svg
            className="w-5 h-5 text-ink-muted absolute left-3 top-3.5"
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
        </div>

        {/* Dropdown Filters */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {/* Party Filter */}
          <div>
            <label className="block text-[11px] font-bold text-ink-muted uppercase mb-1">
              Partai Politik
            </label>
            <select
              value={selectedParty}
              onChange={(e) => setSelectedParty(e.target.value)}
              className="w-full p-2.5 rounded-xl bg-cream border border-line text-xs font-medium focus:outline-none focus:ring-2 focus:ring-sage"
            >
              <option value="all">Semua Partai</option>
              {parties.map((p) => (
                <option key={p} value={p}>
                  {p}
                </option>
              ))}
            </select>
          </div>

          {/* Province Filter */}
          <div>
            <label className="block text-[11px] font-bold text-ink-muted uppercase mb-1">
              Provinsi / Wilayah
            </label>
            <select
              value={selectedProvince}
              onChange={(e) => handleProvinceDropdownChange(e.target.value)}
              className="w-full p-2.5 rounded-xl bg-cream border border-line text-xs font-medium focus:outline-none focus:ring-2 focus:ring-sage"
            >
              <option value="all">Semua Wilayah</option>
              {provinces.map((prov) => (
                <option key={prov} value={prov}>
                  {prov}
                </option>
              ))}
            </select>
          </div>

          {/* Election Type Filter */}
          <div>
            <label className="block text-[11px] font-bold text-ink-muted uppercase mb-1">
              Jenis Pemilu
            </label>
            <select
              value={selectedElectionType}
              onChange={(e) => setSelectedElectionType(e.target.value)}
              className="w-full p-2.5 rounded-xl bg-cream border border-line text-xs font-medium focus:outline-none focus:ring-2 focus:ring-sage"
            >
              <option value="all">Semua Pemilu</option>
              {electionTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Filter stats & Reset */}
        <div className="flex items-center justify-between text-xs text-ink-muted pt-2 border-t border-line">
          <span>
            Menampilkan <strong>{filteredCandidates.length}</strong> kandidat
          </span>
          {(searchQuery ||
            selectedParty !== "all" ||
            selectedProvince !== "all" ||
            selectedElectionType !== "all") && (
              <button
                onClick={() => {
                  setSearchQuery("");
                  setSelectedParty("all");
                  handleProvinceSelect(null);
                  setSelectedElectionType("all");
                }}
                className="text-brand-700 font-bold hover:underline"
              >
                Reset Filter
              </button>
            )}
        </div>
      </div>

      {/* CANDIDATE CARDS GRID */}
      {filteredCandidates.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5 items-start">
          {filteredCandidates.map((candidate) => (
            <CandidateCard key={candidate.id} candidate={candidate} />
          ))}
        </div>
      ) : (
        <div className="p-12 text-center bg-white rounded-3xl border border-line space-y-3">
          <div className="text-4xl">🔍</div>
          <h3 className="text-base font-bold text-ink">
            Kandidat Tidak Ditemukan
          </h3>
          <p className="text-xs text-ink-muted max-w-md mx-auto">
            Silakan periksa kembali kata kunci pencarian atau sesuaikan filter
            partai dan wilayah Anda.
          </p>
          <button
            onClick={() => {
              setSearchQuery("");
              setSelectedParty("all");
              handleProvinceSelect(null);
              setSelectedElectionType("all");
            }}
            className="px-4 py-2 rounded-xl bg-brand-800 text-white text-xs font-bold"
          >
            Tampilkan Semua Kandidat
          </button>
        </div>
      )}
    </div>
  );
}

export default function CandidateListPage() {
  return (
    <div className="min-h-screen py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <Suspense
        fallback={
          <div className="p-8 text-center text-xs text-ink-muted">
            Memuat data kandidat...
          </div>
        }
      >
        <CandidateListContent />
      </Suspense>
    </div>
  );
}
