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
    <div className="h-[280px] sm:h-[360px] animate-pulse rounded-2xl bg-mist/30" />
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
  const [selectedCandidatesForCompare, setSelectedCandidatesForCompare] =
    useState<string[]>([]);

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

  const toggleCompare = (candidateId: string) => {
    if (selectedCandidatesForCompare.includes(candidateId)) {
      setSelectedCandidatesForCompare((prev) =>
        prev.filter((id) => id !== candidateId),
      );
    } else {
      if (selectedCandidatesForCompare.length >= 4) {
        alert("Maksimal 4 kandidat untuk dibandingkan secara bersamaan.");
        return;
      }
      setSelectedCandidatesForCompare((prev) => [...prev, candidateId]);
    }
  };

  const getCompareUrl = () => {
    const params = selectedCandidatesForCompare
      .map((id, index) => `c${index + 1}=${id}`)
      .join("&");
    return `/bandingkan?${params}`;
  };

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
      {/* HEADER & BREADCRUMB */}
      <div className="space-y-2">
        <div className="flex items-center gap-2 text-xs text-ink-muted">
          <Link href="/" className="hover:underline">
            Beranda
          </Link>
          <span>/</span>
          <span className="font-semibold text-ink">Daftar Kandidat</span>
        </div>
        <h1 className="text-3xl font-black text-ink">
          Eksplorasi Rekam Jejak Kandidat
        </h1>
        <p className="text-xs sm:text-sm text-ink-soft max-w-3xl">
          Jelajahi kandidat lewat peta Indonesia, pencarian, atau filter partai
          dan wilayah untuk memeriksa profil serta rekam jejak mereka secara
          transparan.
        </p>
      </div>

      {/* INTERACTIVE MAP */}
      <div className="p-5 rounded-2xl bg-white border border-line shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
          <div className="space-y-1">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-sage">
              Eksplorasi Wilayah
            </p>
            <h2 className="text-xl font-black text-ink">Peta Kandidat Indonesia</h2>
            <p className="text-xs text-ink-muted max-w-2xl">
              Klik provinsi di peta untuk memfilter daftar kandidat. Provinsi
              berwarna hijau memiliki data kandidat.
            </p>
          </div>
          {selectedProvince !== "all" && (
            <button
              onClick={() => handleProvinceSelect(null)}
              className="shrink-0 px-3 py-2 rounded-xl text-xs font-bold text-brand-700 bg-brand-50 hover:bg-brand-100 border border-line transition-colors"
            >
              Tampilkan Semua Provinsi
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

      {/* MULTI-CANDIDATE COMPARISON BAR */}
      {selectedCandidatesForCompare.length > 0 && (
        <div className="sticky top-20 z-40 p-4 rounded-2xl bg-brand-900 text-white shadow-2xl flex items-center justify-between gap-4 border border-brand-700 animate-slide-in-right">
          <div className="flex items-center gap-3">
            <span className="w-8 h-8 rounded-full bg-brand-800 flex items-center justify-center font-bold text-xs">
              {selectedCandidatesForCompare.length}
            </span>
            <div className="text-xs">
              <span className="font-bold block">
                {selectedCandidatesForCompare.length} Kandidat Dipilih
              </span>
              <span className="text-mist hidden sm:inline">
                Siap untuk dibandingkan kinerjanya side-by-side
              </span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setSelectedCandidatesForCompare([])}
              className="px-3 py-1.5 rounded-xl text-xs font-medium text-mist hover:text-white"
            >
              Batal
            </button>
            <Link
              href={getCompareUrl()}
              className="px-4 py-2 rounded-xl text-xs font-bold bg-verified hover:bg-sage text-brand-900 transition-colors shadow-sm"
            >
              Bandingkan Sekarang →
            </Link>
          </div>
        </div>
      )}

      {/* CANDIDATE CARDS GRID */}
      {filteredCandidates.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 items-start">
          {filteredCandidates.map((candidate) => {
            const isSelected = selectedCandidatesForCompare.includes(
              candidate.id,
            );
            return (
              <div key={candidate.id} className="relative">
                <div className="absolute top-4 right-4 z-10">
                  <button
                    onClick={() => toggleCompare(candidate.id)}
                    className={`p-1.5 rounded-lg text-xs font-bold transition-all ${
                      isSelected
                        ? "bg-brand-800 text-white shadow-md ring-2 ring-sage"
                        : "bg-mist/50 text-ink-soft hover:bg-mist"
                    }`}
                    title="Pilih untuk perbandingan"
                  >
                    {isSelected ? "✓ Dibandingkan" : "+ Bandingkan"}
                  </button>
                </div>
                <CandidateCard candidate={candidate} />
              </div>
            );
          })}
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
