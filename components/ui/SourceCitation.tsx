"use client";

import React, { useState } from "react";
import { Source } from "@/lib/types";

interface Props {
  sources: Source[];
  compact?: boolean;
}

const sourceTypeLabels: Record<string, { label: string; color: string }> = {
  government: {
    label: "Resmi Pemerintah",
    color: "bg-brand-100 text-brand-800",
  },
  state_institution: {
    label: "Lembaga Negara",
    color: "bg-mist text-brand-800",
  },
  public_document: {
    label: "Dokumen Publik",
    color: "bg-gold-100 text-gold-600",
  },
  media: { label: "Media Massa", color: "bg-sage/20 text-brand-700" },
  civil_society: {
    label: "Organisasi Sipil",
    color: "bg-cream text-ink-soft border border-line",
  },
  candidate_statement: {
    label: "Pernyataan Kandidat",
    color: "bg-surface-sunken text-ink-soft",
  },
  other: { label: "Sumber Lain", color: "bg-surface-sunken text-ink-muted" },
};

export const SourceCitation: React.FC<Props> = ({
  sources,
  compact = false,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  if (!sources || sources.length === 0) {
    return (
      <span className="text-xs text-ink-muted italic">
        Belum ada sumber publik terdaftar
      </span>
    );
  }

  if (compact) {
    return (
      <div className="relative inline-block">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-xs font-medium bg-mist/60 hover:bg-mist text-brand-800 transition-colors"
        >
          <svg
            className="w-3.5 h-3.5 text-sage"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
            />
          </svg>
          <span>{sources.length} Sumber</span>
        </button>

        {isOpen && (
          <div className="absolute bottom-full left-0 z-50 mb-1.5 w-72 animate-fade-in rounded-xl border border-line bg-white p-3 shadow-lift">
            <div className="flex items-center justify-between pb-2 mb-2 border-b border-line">
              <span className="text-xs font-bold text-ink">
                Rincian Sumber Terverifikasi
              </span>
              <button
                onClick={() => setIsOpen(false)}
                className="text-ink-muted hover:text-ink text-xs"
              >
                ✕
              </button>
            </div>
            <div className="space-y-2.5 max-h-48 overflow-y-auto pr-1">
              {sources.map((src) => {
                const typeInfo =
                  sourceTypeLabels[src.sourceType] || sourceTypeLabels.other;
                return (
                  <div key={src.id} className="text-xs">
                    <div className="flex items-center gap-1.5 mb-1">
                      <span
                        className={`px-1.5 py-0.5 rounded text-[10px] font-semibold ${typeInfo.color}`}
                      >
                        {typeInfo.label}
                      </span>
                    </div>
                    <a
                      href={src.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-medium text-brand-700 hover:text-sage hover:underline block truncate transition-colors"
                    >
                      {src.name}
                    </a>
                    <div className="text-[10px] text-ink-muted flex justify-between mt-0.5">
                      <span>Penerbit: {src.publisher || "N/A"}</span>
                      <span>Diakses: {src.accessedAt}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="space-y-2">
      <h5 className="text-xs font-semibold uppercase tracking-wider text-ink-muted">
        Sumber & Transparansi Data ({sources.length})
      </h5>
      <div className="grid gap-2">
        {sources.map((src) => {
          const typeInfo =
            sourceTypeLabels[src.sourceType] || sourceTypeLabels.other;
          return (
            <a
              key={src.id}
              href={src.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col sm:flex-row sm:items-center justify-between gap-2 rounded-xl border border-line bg-cream/60 p-2.5 text-xs transition-all hover:border-sage hover:bg-sage/10 hover:shadow-sm"
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span
                    className={`px-2 py-0.5 rounded text-[10px] font-bold ${typeInfo.color}`}
                  >
                    {typeInfo.label}
                  </span>
                  {src.publisher && (
                    <span className="text-ink-muted font-medium group-hover:text-ink-soft transition-colors">
                      {src.publisher}
                    </span>
                  )}
                </div>
                <span className="font-semibold text-brand-800 group-hover:text-sage transition-colors flex items-center gap-1">
                  <span className="group-hover:underline">{src.name}</span>
                  <svg
                    className="w-3 h-3 text-ink-muted group-hover:text-sage transition-colors"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                    />
                  </svg>
                </span>
              </div>
              <div className="text-[11px] text-ink-muted group-hover:text-ink-soft flex sm:flex-col items-start sm:items-end justify-between gap-1 border-t sm:border-t-0 pt-1 sm:pt-0 border-line transition-colors">
                {src.publishedAt && <span>Terbit: {src.publishedAt}</span>}
                <span>Terakhir Diuji: {src.accessedAt}</span>
              </div>
            </a>
          );
        })}
      </div>
    </div>
  );
};
