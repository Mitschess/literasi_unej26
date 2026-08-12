"use client";

import React, { useState, useMemo, useEffect } from "react";
import { mockParties, Party } from "@/lib/data/parties";
import { PartyCard } from "@/components/partai/PartyCard";
import {
  StudioShell,
  StudioCrumb,
  StudioCard,
} from "@/components/literacy/StudioChrome";
import {
  sentimentBadge,
  sentimentLabel,
  categoryIcon,
} from "@/lib/party/display";

const PAGE_SIZE = 8;

// ─── Comparison Table ─────────────────────────────────────────────────────────
function PartyComparisonTable({ parties, onClose }: { parties: Party[]; onClose: () => void }) {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div className="space-y-1">
          <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-sage">
            Perbandingan
          </p>
          <h2 className="font-display text-2xl text-brand-800">
            Tabel Perbandingan Partai
          </h2>
          <p className="text-xs text-ink-muted">
            Membandingkan {parties.length} partai secara side-by-side
          </p>
        </div>
        <button
          onClick={onClose}
          className="shrink-0 rounded-xl border border-line bg-cream px-4 py-2.5 text-xs font-semibold text-ink-soft transition-all hover:bg-sage hover:border-sage hover:text-white"
        >
          ← Kembali Pilih
        </button>
      </div>

      <StudioCard className="overflow-x-auto">
        <table className="w-full min-w-[720px] border-collapse text-left text-xs text-ink-soft">
          <thead>
            <tr className="border-b border-line bg-cream/60">
              <th className="p-4 w-44 text-xs font-black uppercase text-ink-muted">Aspek / Partai</th>
              {parties.map((p) => (
                <th key={p.id} className="p-4 align-top">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <div className="w-10 h-10 rounded-xl bg-white border border-line flex items-center justify-center p-1 shrink-0">
                        <img src={p.logoUrl} alt={p.shortName} className="w-full h-full object-contain"
                          onError={(e) => { const t = e.target as HTMLImageElement; t.style.display = "none"; }} />
                      </div>
                      <div>
                        <div className="font-black text-sm text-ink">{p.shortName}</div>
                        <span className="text-[10px] font-bold text-white px-1.5 py-0.5 rounded" style={{ backgroundColor: p.color }}>{p.founded}</span>
                      </div>
                    </div>
                    <div className="text-xs text-ink-muted font-medium leading-tight line-clamp-2">{p.name}</div>
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-line text-xs text-ink-soft">
            <tr>
              <td className="p-4 font-bold bg-cream/60 text-ink">Ketua Umum</td>
              {parties.map((p) => <td key={p.id} className="p-4 font-semibold text-ink">{p.chairman}</td>)}
            </tr>
            <tr>
              <td className="p-4 font-bold bg-cream/60 text-ink">Ideologi</td>
              {parties.map((p) => (
                <td key={p.id} className="p-4">
                  <div className="flex flex-wrap gap-1">
                    {p.ideology.slice(0, 2).map((i) => (
                      <span key={i} className="px-1.5 py-0.5 rounded text-[10px] font-semibold" style={{ backgroundColor: p.color + "15", color: p.color }}>{i}</span>
                    ))}
                  </div>
                </td>
              ))}
            </tr>
            <tr>
              <td className="p-4 font-bold bg-cream/60 text-ink">Fokus Utama</td>
              {parties.map((p) => (
                <td key={p.id} className="p-4">
                  <ul className="space-y-1">
                    {p.focusAreas.slice(0, 3).map((a) => (
                      <li key={a} className="flex items-center gap-1.5"><span className="text-sage font-bold text-lg leading-none">·</span>{a}</li>
                    ))}
                  </ul>
                </td>
              ))}
            </tr>
            <tr>
              <td className="p-4 font-bold bg-cream/60 text-ink">Kursi DPR 2024</td>
              {parties.map((p) => (
                <td key={p.id} className="p-4">
                  <div className="font-black text-xl" style={{ color: p.color }}>{p.dprSeats2024}</div>
                  <div className="text-[10px] text-ink-muted">dari 580 kursi</div>
                </td>
              ))}
            </tr>
            <tr>
              <td className="p-4 font-bold bg-cream/60 text-ink">Suara Pemilu 2024</td>
              {parties.map((p) => {
                const r = p.electionResults?.[p.electionResults.length - 1];
                return (
                  <td key={p.id} className="p-4">
                    {r ? (
                      <>
                        <div className="font-black text-xl" style={{ color: p.color }}>{r.percentage.toFixed(2)}%</div>
                        <div className="w-full h-1.5 bg-cream rounded-full mt-1 overflow-hidden">
                          <div className="h-full rounded-full" style={{ width: `${Math.min(r.percentage * 5, 100)}%`, backgroundColor: p.color }} />
                        </div>
                        <div className="text-[10px] text-ink-muted mt-0.5">{r.votes.toLocaleString("id-ID")} suara</div>
                      </>
                    ) : "—"}
                  </td>
                );
              })}
            </tr>
            <tr>
              <td className="p-4 font-bold bg-cream/60 text-ink">Program Unggulan</td>
              {parties.map((p) => (
                <td key={p.id} className="p-4">
                  <ul className="space-y-1.5">
                    {p.keyPrograms.slice(0, 3).map((prog, i) => (
                      <li key={i} className="p-2 rounded-lg bg-cream border border-line text-[11px] leading-snug">{prog}</li>
                    ))}
                  </ul>
                </td>
              ))}
            </tr>
            <tr>
              <td className="p-4 font-bold bg-cream/60 text-ink">Rekam Jejak</td>
              {parties.map((p) => (
                <td key={p.id} className="p-4">
                  <div className="space-y-2">
                    {p.trackRecords.slice(0, 2).map((tr) => (
                      <div key={tr.id} className="flex items-start gap-1.5">
                        <span>{categoryIcon(tr.category)}</span>
                        <div>
                          <div className="text-[11px] font-bold text-ink line-clamp-1">{tr.title}</div>
                          <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded ${sentimentBadge(tr.sentiment)}`}>{sentimentLabel(tr.sentiment)} · {tr.year}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </td>
              ))}
            </tr>
            <tr>
              <td className="p-4 font-bold bg-cream/60 text-ink">Visi Singkat</td>
              {parties.map((p) => (
                <td key={p.id} className="p-4">
                  <p className="text-[11px] text-ink-muted italic line-clamp-4 leading-relaxed">&ldquo;{p.vision}&rdquo;</p>
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </StudioCard>
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function PartyPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [compareMode, setCompareMode] = useState(false);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [isComparing, setIsComparing] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const filteredParties = useMemo(() => {
    return mockParties.filter((p) => {
      if (searchQuery) {
        const q = searchQuery.toLowerCase();
        if (!p.name.toLowerCase().includes(q) && !p.shortName.toLowerCase().includes(q) && !p.chairman.toLowerCase().includes(q)) return false;
      }
      return true;
    });
  }, [searchQuery]);

  const totalPages = Math.max(1, Math.ceil(filteredParties.length / PAGE_SIZE));

  const paginatedParties = useMemo(() => {
    const start = (currentPage - 1) * PAGE_SIZE;
    return filteredParties.slice(start, start + PAGE_SIZE);
  }, [filteredParties, currentPage]);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery]);

  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [currentPage, totalPages]);

  const rangeStart =
    filteredParties.length === 0 ? 0 : (currentPage - 1) * PAGE_SIZE + 1;
  const rangeEnd = Math.min(currentPage * PAGE_SIZE, filteredParties.length);

  const selectedParties = selectedIds.map((id) => mockParties.find((p) => p.id === id)).filter(Boolean) as Party[];

  const toggleSelect = (id: string) => {
    if (selectedIds.includes(id)) {
      setSelectedIds(selectedIds.filter((i) => i !== id));
    } else {
      if (selectedIds.length >= 4) {
        alert("Maksimal 4 partai untuk dibandingkan sekaligus.");
        return;
      }
      setSelectedIds([...selectedIds, id]);
    }
  };

  return (
    <StudioShell>
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      {isComparing && selectedParties.length >= 2 ? (
        <>
          <StudioCrumb
            items={[
              { label: "Beranda", href: "/" },
              { label: "Cari Partai", href: "/partai" },
              { label: "Perbandingan" },
            ]}
          />
          <div className="mt-8">
            <PartyComparisonTable
              parties={selectedParties}
              onClose={() => setIsComparing(false)}
            />
          </div>
        </>
      ) : (
        <div className="space-y-8">
          <StudioCrumb
            items={[
              { label: "Beranda", href: "/" },
              { label: "Cari Partai" },
            ]}
          />

          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2">
                <span className="h-px w-8 bg-sage" />
                <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-sage">
                  Direktori publik
                </p>
              </div>
              <h1 className="font-display text-3xl tracking-tight text-brand-800 sm:text-4xl">
                Cari & Bandingkan Partai
              </h1>
              <p className="max-w-xl text-sm leading-relaxed text-ink-muted">
                Telusuri profil, visi-misi, dan rekam jejak partai yang terdaftar di Pemilu legislatif terakhir.
              </p>
            </div>
            <div className="h-24 w-24 shrink-0 self-center sm:h-32 sm:w-32">
              <img
                src="/images/assets/direktori.png"
                alt="Direktori partai politik Indonesia"
                className="h-full w-full object-contain drop-shadow-md"
              />
            </div>
          </div>

          <div className="space-y-4 rounded-2xl border border-line bg-white p-5">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <div className="relative flex-1">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Cari nama partai, singkatan, atau ketua umum..."
                  className="w-full rounded-xl border border-line bg-cream py-3 pl-10 pr-4 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-sage"
                />
                <svg className="absolute left-3 top-3.5 h-5 w-5 text-ink-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <button
                onClick={() => {
                  setCompareMode(!compareMode);
                  if (compareMode) {
                    setSelectedIds([]);
                    setIsComparing(false);
                  }
                }}
                className={`shrink-0 rounded-xl px-4 py-3 text-xs font-semibold transition-all ${
                  compareMode
                    ? "bg-brand-800 text-cream shadow-sm"
                    : "border border-line bg-cream text-ink-soft hover:bg-sage hover:border-sage hover:text-white"
                }`}
              >
                {compareMode ? "✓ Mode Bandingkan" : "Bandingkan Partai"}
              </button>
            </div>

            {/* Stats & reset row */}
            <div className="flex items-center justify-between text-xs text-ink-muted pt-2 border-t border-line">
              <span>
                {filteredParties.length > 0 ? (
                  <>
                    Menampilkan <strong>{rangeStart}–{rangeEnd}</strong> dari{" "}
                    <strong>{filteredParties.length}</strong> partai
                  </>
                ) : (
                  <>Tidak ada partai yang cocok</>
                )}
                {compareMode && <span className="ml-2 text-brand-700 font-bold">· {selectedIds.length} terpilih</span>}
              </span>
              {searchQuery && (
                <button
                  onClick={() => { setSearchQuery(""); setCurrentPage(1); }}
                  className="text-brand-700 font-bold hover:underline"
                >
                  Reset Filter
                </button>
              )}
            </div>
          </div>

          {/* Party grid */}
          {filteredParties.length > 0 && (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5 items-start">
                {paginatedParties.map((party) => (
                  <PartyCard
                    key={party.id}
                    party={party}
                    isSelected={selectedIds.includes(party.id)}
                    onToggleSelect={() => toggleSelect(party.id)}
                    compareMode={compareMode}
                  />
                ))}
              </div>

              {totalPages > 1 && (
                <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-between">
                  <p className="text-xs text-ink-muted">
                    Halaman <strong>{currentPage}</strong> dari{" "}
                    <strong>{totalPages}</strong>
                  </p>
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                      disabled={currentPage <= 1}
                      className="rounded-xl border border-line bg-cream px-4 py-2 text-xs font-semibold text-ink-soft transition-all hover:bg-sage hover:border-sage hover:text-white disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-cream disabled:hover:border-line disabled:hover:text-ink-soft"
                    >
                      ← Sebelumnya
                    </button>
                    <button
                      type="button"
                      onClick={() =>
                        setCurrentPage((p) => Math.min(totalPages, p + 1))
                      }
                      disabled={currentPage >= totalPages}
                      className="rounded-xl border border-line bg-cream px-4 py-2 text-xs font-semibold text-ink-soft transition-all hover:bg-sage hover:border-sage hover:text-white disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-cream disabled:hover:border-line disabled:hover:text-ink-soft"
                    >
                      Selanjutnya →
                    </button>
                  </div>
                </div>
              )}
            </>
          )}

          {filteredParties.length === 0 && (
            <div className="rounded-2xl border border-line bg-white p-12 text-center">
              <h3 className="font-display text-lg text-brand-800">Partai tidak ditemukan</h3>
              <p className="mt-2 text-xs text-ink-muted">Coba ubah kata kunci pencarian</p>
              <button
                onClick={() => { setSearchQuery(""); setCurrentPage(1); }}
                className="mt-5 rounded-xl border border-line bg-cream px-4 py-2 text-xs font-semibold text-ink-soft transition-all hover:bg-sage hover:border-sage hover:text-white"
              >
                Reset filter
              </button>
            </div>
          )}

          {/* Floating compare bar */}
          {compareMode && selectedIds.length > 0 && (
            <div className="fixed bottom-6 left-1/2 z-40 w-full max-w-lg -translate-x-1/2 px-4">
              <div className="flex items-center justify-between gap-4 rounded-2xl border border-sage/30 bg-white p-4 shadow-xl shadow-sage/10 backdrop-blur-xl">
                <div className="text-xs text-ink-soft">
                  <span className="font-bold text-ink">{selectedIds.length} partai</span> dipilih
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => setSelectedIds([])}
                    className="rounded-xl border border-line bg-cream px-3 py-2 text-xs font-semibold text-ink-soft transition-all hover:bg-sage hover:border-sage hover:text-white"
                  >
                    Reset
                  </button>
                  <button
                    onClick={() => {
                      if (selectedIds.length < 2) {
                        alert("Pilih minimal 2 partai untuk dibandingkan.");
                        return;
                      }
                      setIsComparing(true);
                    }}
                    disabled={selectedIds.length < 2}
                    className="rounded-xl bg-brand-800 px-5 py-2 text-xs font-bold text-cream transition hover:bg-brand-700 disabled:opacity-50"
                  >
                    {selectedIds.length < 2 ? "Pilih Min. 2" : "Bandingkan →"}
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
      </div>
    </StudioShell>
  );
}
