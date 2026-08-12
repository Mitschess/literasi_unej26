"use client";

import React, { useState, useMemo, Suspense, useCallback, useEffect } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import { mockCandidates } from "@/lib/data/candidates";
import { CandidateCard } from "@/components/candidate/CandidateCard";
import { SearchableSelect } from "@/components/ui/SearchableSelect";
import { getCandidateCountsByProvince } from "@/lib/map/province-stats";

const IndonesiaMap = dynamic(() => import("@/components/map/IndonesiaMap"), {
  ssr: false,
  loading: () => (
    <div className="h-[220px] sm:h-[320px] animate-pulse rounded-2xl bg-mist/30" />
  ),
});

const CARDS_PER_PAGE = 8;

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
  const [currentPage, setCurrentPage] = useState(1);
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

  const partyOptions = useMemo(
    () => [
      { value: "all", label: "Semua Partai" },
      ...parties.map((p) => ({ value: p, label: p })),
    ],
    [parties],
  );

  const provinceOptions = useMemo(
    () => [
      { value: "all", label: "Semua Wilayah" },
      ...provinces.sort().map((prov) => ({ value: prov, label: prov })),
    ],
    [provinces],
  );

  const electionOptions = useMemo(
    () => [
      { value: "all", label: "Semua Pemilu" },
      ...electionTypes.map((type) => ({ value: type, label: type })),
    ],
    [electionTypes],
  );

  const activeFilters = [
    selectedParty !== "all" && { key: "party", label: selectedParty },
    selectedProvince !== "all" && { key: "province", label: selectedProvince },
    selectedElectionType !== "all" && { key: "type", label: selectedElectionType },
  ].filter(Boolean) as { key: string; label: string }[];

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

  const totalPages = Math.max(
    1,
    Math.ceil(filteredCandidates.length / CARDS_PER_PAGE),
  );

  const paginatedCandidates = useMemo(() => {
    const start = (currentPage - 1) * CARDS_PER_PAGE;
    return filteredCandidates.slice(start, start + CARDS_PER_PAGE);
  }, [filteredCandidates, currentPage]);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, selectedParty, selectedProvince, selectedElectionType]);

  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [currentPage, totalPages]);

  const pageStart =
    filteredCandidates.length === 0 ? 0 : (currentPage - 1) * CARDS_PER_PAGE + 1;
  const pageEnd = Math.min(currentPage * CARDS_PER_PAGE, filteredCandidates.length);

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
      <div className="rounded-2xl border border-line bg-white shadow-sm">
        <div className="rounded-t-2xl border-b border-line bg-gradient-to-r from-brand-50/80 to-cream px-5 py-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-sage">
                Filter & Pencarian
              </p>
              <p className="mt-0.5 text-xs text-ink-muted">
                Cari nama kandidat atau saring berdasarkan partai, wilayah, dan jenis pemilu
              </p>
            </div>
            {activeFilters.length > 0 && (
              <button
                type="button"
                onClick={() => {
                  setSearchQuery("");
                  setSelectedParty("all");
                  handleProvinceSelect(null);
                  setSelectedElectionType("all");
                }}
                className="rounded-full border border-line bg-white px-3 py-1.5 text-[11px] font-bold text-brand-700 transition hover:border-sage hover:text-sage"
              >
                Reset semua
              </button>
            )}
          </div>
        </div>

        <div className="space-y-4 p-5">
          {/* Search input */}
          <div className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cari kandidat berdasarkan nama, partai, atau daerah pemilihan..."
              className="w-full rounded-xl border border-line bg-cream py-3 pl-10 pr-4 text-sm font-medium transition focus:outline-none focus:ring-2 focus:ring-sage"
            />
            <svg
              className="absolute left-3 top-3.5 h-5 w-5 text-ink-muted"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>

          {/* Searchable Filters */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <SearchableSelect
              label="Partai Politik"
              value={selectedParty}
              onChange={setSelectedParty}
              options={partyOptions}
              placeholder="Semua Partai"
              searchPlaceholder="Cari partai..."
            />
            <SearchableSelect
              label="Provinsi / Wilayah"
              value={selectedProvince}
              onChange={handleProvinceDropdownChange}
              options={provinceOptions}
              placeholder="Semua Wilayah"
              searchPlaceholder="Cari provinsi..."
            />
            <SearchableSelect
              label="Jenis Pemilu"
              value={selectedElectionType}
              onChange={setSelectedElectionType}
              options={electionOptions}
              placeholder="Semua Pemilu"
              searchPlaceholder="Cari jenis pemilu..."
            />
          </div>

          {/* Active filter chips */}
          {activeFilters.length > 0 && (
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-ink-muted">
                Filter aktif:
              </span>
              {activeFilters.map((filter) => (
                <span
                  key={filter.key}
                  className="inline-flex items-center gap-1 rounded-full bg-sage/15 px-2.5 py-1 text-[11px] font-semibold text-brand-800 ring-1 ring-sage/25"
                >
                  {filter.label}
                </span>
              ))}
            </div>
          )}

          {/* Filter stats */}
          <div className="flex items-center justify-between border-t border-line pt-3 text-xs text-ink-muted">
            <span>
              {filteredCandidates.length > 0 ? (
                <>
                  Menampilkan <strong className="text-ink">{pageStart}–{pageEnd}</strong> dari{" "}
                  <strong className="text-ink">{filteredCandidates.length}</strong> kandidat
                </>
              ) : (
                <>
                  Menampilkan <strong className="text-ink">0</strong> kandidat
                </>
              )}
            </span>
          </div>
        </div>
      </div>

      {/* CANDIDATE CARDS GRID */}
      {filteredCandidates.length > 0 ? (
        <div className="space-y-8">
          <div
            id="kandidat-grid"
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5 items-start"
          >
            {paginatedCandidates.map((candidate) => (
              <CandidateCard key={candidate.id} candidate={candidate} />
            ))}
          </div>

          {totalPages > 1 && (
            <div className="flex justify-center">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setCurrentPage((p) => Math.max(1, p - 1));
                    document.getElementById("kandidat-grid")?.scrollIntoView({
                      behavior: "smooth",
                      block: "start",
                    });
                  }}
                  disabled={currentPage === 1}
                  className="inline-flex items-center gap-2 rounded-full border border-line bg-white px-5 py-2.5 text-xs font-bold text-brand-800 transition hover:bg-brand-50 disabled:cursor-not-allowed disabled:opacity-40"
                >
                  ← Sebelumnya
                </button>

                {totalPages <= 7 &&
                  Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <button
                      key={page}
                      type="button"
                      onClick={() => {
                        setCurrentPage(page);
                        document.getElementById("kandidat-grid")?.scrollIntoView({
                          behavior: "smooth",
                          block: "start",
                        });
                      }}
                      className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold transition ${
                        currentPage === page
                          ? "bg-brand-800 text-cream"
                          : "border border-line bg-white text-ink-muted hover:border-sage hover:text-brand-800"
                      }`}
                    >
                      {page}
                    </button>
                  ))}

                <button
                  type="button"
                  onClick={() => {
                    setCurrentPage((p) => Math.min(totalPages, p + 1));
                    document.getElementById("kandidat-grid")?.scrollIntoView({
                      behavior: "smooth",
                      block: "start",
                    });
                  }}
                  disabled={currentPage === totalPages}
                  className="inline-flex items-center gap-2 rounded-full bg-brand-800 px-5 py-2.5 text-xs font-bold text-cream transition hover:bg-brand-700 disabled:cursor-not-allowed disabled:opacity-40"
                >
                  Selanjutnya →
                </button>
              </div>
            </div>
          )}
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
