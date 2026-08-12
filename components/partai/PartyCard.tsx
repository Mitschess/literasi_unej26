"use client";

import React, { useRef } from "react";
import Link from "next/link";
import { Party } from "@/lib/data/parties";
import { partyCardGradient } from "@/lib/party/display";

const actionBtnClass =
  "flex-1 py-2 rounded-xl font-semibold text-xs transition-all bg-white/80 border border-line text-ink-soft hover:bg-sage hover:border-sage hover:text-white";

interface PartyCardProps {
  party: Party;
  isSelected: boolean;
  onToggleSelect: () => void;
  compareMode: boolean;
}

function PartyLogo({
  party,
  size = "md",
}: {
  party: Party;
  size?: "sm" | "md";
}) {
  const dim = size === "sm" ? "h-12 w-12" : "h-14 w-14";

  return (
    <div className={`${dim} flex shrink-0 items-center justify-center`}>
      <img
        src={party.logoUrl}
        alt={`Logo ${party.shortName}`}
        className="h-full w-full object-contain"
        onError={(e) => {
          const t = e.target as HTMLImageElement;
          t.style.display = "none";
          const parent = t.parentElement;
          if (parent) {
            parent.innerHTML = `<span style="color:${party.color};font-weight:800;font-size:11px;letter-spacing:-0.02em">${party.shortName}</span>`;
          }
        }}
      />
    </div>
  );
}

export function PartyCard({
  party,
  isSelected,
  onToggleSelect,
  compareMode,
}: PartyCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const latestResult =
    party.electionResults?.[party.electionResults.length - 1];

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = cardRef.current;
    if (!el) return;

    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const rotateX = ((y - rect.height / 2) / (rect.height / 2)) * -5;
    const rotateY = ((x - rect.width / 2) / (rect.width / 2)) * 5;

    el.style.transform = `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(0)`;
  };

  const handleMouseLeave = () => {
    const el = cardRef.current;
    if (!el) return;
    el.style.transform = "perspective(900px) rotateX(0deg) rotateY(0deg) translateZ(0)";
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`relative mx-auto flex w-full max-w-[260px] flex-col overflow-hidden rounded-[22px] border transition-[transform,border-color] duration-300 ease-out will-change-transform ${
        isSelected
          ? "border-sage ring-2 ring-sage ring-offset-2 ring-offset-cream"
          : "border-line hover:border-sage/40"
      }`}
      style={{
        transformStyle: "preserve-3d",
        background: partyCardGradient(party),
      }}
    >
      <div className="flex flex-1 flex-col gap-3 p-4">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0 flex-1 space-y-1">
            <h3 className="font-display text-lg leading-tight text-brand-800">
              {party.shortName}
            </h3>
            <p className="line-clamp-2 text-[11px] leading-relaxed text-ink-muted">
              {party.name}
            </p>
          </div>
          <PartyLogo party={party} />
        </div>

        <div className="space-y-0.5 text-[11px] text-ink-soft">
          <p className="font-medium text-ink">{party.chairman}</p>
          <p className="text-ink-muted">Est. {party.founded}</p>
        </div>

        {latestResult && (
          <div className="mt-auto flex items-end justify-center gap-4 border-t border-line/70 pt-3">
            <div className="text-center">
              <p className="font-display text-xl tabular-nums leading-none text-brand-800">
                {party.dprSeats2024}
              </p>
              <p className="mt-1 text-[9px] font-semibold uppercase tracking-[0.14em] text-ink-muted">
                Kursi DPR
              </p>
            </div>
            <div className="mb-px h-8 w-px bg-line/80" />
            <div className="text-center">
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
        <Link
          href={`/partai/${party.slug}`}
          className={`${actionBtnClass} text-center`}
        >
          Jelajahi
        </Link>
        {compareMode && (
          <button
            onClick={onToggleSelect}
            className={`flex-1 rounded-xl py-2 text-xs font-semibold transition-all ${
              isSelected
                ? "border border-transparent bg-brand-800 text-cream"
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
