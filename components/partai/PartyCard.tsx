"use client";

import React from "react";
import Link from "next/link";
import { Party } from "@/lib/data/parties";
import { spectrumLabel } from "@/lib/party/display";

const actionBtnClass =
  "flex-1 py-2 rounded-xl font-semibold text-xs transition-all bg-cream border border-line text-ink-soft hover:bg-sage hover:border-sage hover:text-white";

interface PartyCardProps {
  party: Party;
  isSelected: boolean;
  onToggleSelect: () => void;
  compareMode: boolean;
}

export function PartyCard({
  party,
  isSelected,
  onToggleSelect,
  compareMode,
}: PartyCardProps) {
  const latestResult =
    party.electionResults?.[party.electionResults.length - 1];

  return (
    <div
      className={`relative mx-auto flex w-full max-w-[260px] flex-col overflow-hidden rounded-[22px] border bg-white transition-all duration-300 ${
        isSelected
          ? "border-sage/50 ring-2 ring-sage ring-offset-2 ring-offset-cream"
          : "border-line hover:border-sage/25 hover:shadow-[0_10px_32px_rgba(20,32,51,0.07)]"
      }`}
    >
      <Link
        href={`/partai/${party.slug}`}
        className="group block border-b border-line/70"
      >
        <div
          className="relative flex h-[108px] items-center justify-center px-5"
          style={{
            background: `linear-gradient(165deg, ${party.color}12 0%, ${party.color}04 55%, transparent 100%)`,
          }}
        >
          <div className="flex h-[72px] w-[72px] items-center justify-center rounded-2xl border border-line/80 bg-white p-2.5 shadow-[0_4px_14px_rgba(20,32,51,0.06)] transition-transform duration-300 group-hover:scale-[1.04]">
            <img
              src={party.logoUrl}
              alt={`Logo ${party.shortName}`}
              className="h-full w-full object-contain"
              onError={(e) => {
                const t = e.target as HTMLImageElement;
                t.style.display = "none";
                const parent = t.parentElement;
                if (parent) {
                  parent.style.backgroundColor = party.color + "18";
                  parent.innerHTML = `<span style="color:${party.color};font-weight:800;font-size:13px;letter-spacing:-0.02em">${party.shortName}</span>`;
                }
              }}
            />
          </div>
        </div>
      </Link>

      <div className="flex flex-1 flex-col gap-3 p-4">
        <div className="space-y-1">
          <h3 className="font-display text-lg leading-tight text-brand-800">
            {party.shortName}
          </h3>
          <p className="line-clamp-2 text-[11px] leading-relaxed text-ink-muted">
            {party.name}
          </p>
        </div>

        <div className="space-y-0.5 text-[11px] text-ink-soft">
          <p className="font-medium text-ink">{party.chairman}</p>
          <p className="text-ink-muted">
            Est. {party.founded}
            <span className="mx-1.5 text-line">·</span>
            {spectrumLabel[party.spectrum]}
          </p>
        </div>

        {latestResult && (
          <div className="mt-auto flex items-end gap-4 border-t border-line/70 pt-3">
            <div>
              <p className="font-display text-xl tabular-nums leading-none text-brand-800">
                {party.dprSeats2024}
              </p>
              <p className="mt-1 text-[9px] font-semibold uppercase tracking-[0.14em] text-ink-muted">
                Kursi DPR
              </p>
            </div>
            <div className="mb-px h-8 w-px bg-line/80" />
            <div>
              <p className="font-display text-xl tabular-nums leading-none text-brand-800">
                {latestResult.percentage.toFixed(1)}%
              </p>
              <p className="mt-1 text-[9px] font-semibold uppercase tracking-[0.14em] text-ink-muted">
                Suara 2024
              </p>
            </div>
          </div>
        )}
      </div>

      <div className="flex gap-2 px-4 pb-4">
        <Link href={`/partai/${party.slug}`} className={`${actionBtnClass} text-center`}>
          Jelajahi
        </Link>
        {compareMode && (
          <button
            onClick={onToggleSelect}
            className={`flex-1 rounded-xl py-2 text-xs font-semibold transition-all ${
              isSelected
                ? "border border-transparent bg-brand-800 text-cream shadow-sm"
                : actionBtnClass
            }`}
          >
            {isSelected ? "✓ Terpilih" : "+ Bandingkan"}
          </button>
        )}
      </div>
    </div>
  );
}
