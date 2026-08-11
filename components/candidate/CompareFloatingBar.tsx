"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { useCompare } from "@/lib/context/CompareContext";

export function CompareFloatingBar() {
  const router = useRouter();
  const { selectedIds, selectedCandidates, removeCandidate, clearAll } =
    useCompare();

  if (selectedIds.length === 0) return null;

  const handleCompare = () => {
    const query = selectedIds.map((id, i) => `c${i + 1}=${id}`).join("&");
    router.push(`/bandingkan?${query}`);
  };

  return (
    <div className="fixed bottom-6 left-1/2 z-50 animate-slide-in-bottom">
      <div className="flex items-center gap-3 px-4 py-3 rounded-2xl bg-white border border-sage/30 shadow-xl shadow-sage/15 backdrop-blur-xl">
        {/* Selected candidate avatars */}
        <div className="flex items-center gap-2">
          {selectedCandidates.map((c) => (
            <div key={c.id} className="relative group">
              <div className="w-10 h-10 rounded-xl overflow-hidden border-2 border-sage shadow-sm">
                <img
                  src={c.photoUrl}
                  alt={c.name}
                  className="w-full h-full object-cover object-top"
                />
              </div>
              {/* Remove button on hover */}
              <button
                onClick={() => removeCandidate(c.id)}
                className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-red-400 text-white text-[10px] font-bold flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-md hover:bg-red-500"
                title={`Hapus ${c.name}`}
              >
                ✕
              </button>
              {/* Name tooltip */}
              <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 rounded-lg bg-sage text-white text-[10px] font-bold whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-lg">
                {c.name.split(" ").slice(0, 2).join(" ")}
              </div>
            </div>
          ))}

          {/* Empty slot indicator */}
          {selectedIds.length < 2 && (
            <div className="w-10 h-10 rounded-xl border-2 border-dashed border-sage/30 bg-sage/5 flex items-center justify-center text-sage/40 text-lg font-bold">
              +
            </div>
          )}
        </div>

        {/* Divider */}
        <div className="w-px h-8 bg-sage/20" />

        {/* Info & Action */}
        <div className="flex items-center gap-3">
          <div>
            <p className="text-[11px] font-extrabold text-sage leading-tight">
              {selectedIds.length} kandidat dipilih
            </p>
            <p className="text-[10px] text-ink-muted leading-tight">
              {selectedIds.length < 2
                ? "Pilih minimal 2 untuk membandingkan"
                : "Siap dibandingkan ✓"}
            </p>
          </div>

          <button
            onClick={handleCompare}
            disabled={selectedIds.length < 2}
            className="px-4 py-2.5 rounded-xl bg-sage hover:bg-sage/85 disabled:bg-sage/20 disabled:text-sage/40 text-white text-xs font-bold transition-all shadow-sm hover:shadow-md disabled:shadow-none disabled:cursor-not-allowed whitespace-nowrap"
          >
            Bandingkan →
          </button>

          <button
            onClick={clearAll}
            className="px-2 py-2 rounded-lg text-ink-muted hover:text-red-400 hover:bg-red-50 transition-colors text-xs font-bold"
            title="Hapus semua"
          >
            ✕
          </button>
        </div>
      </div>
    </div>
  );
}
