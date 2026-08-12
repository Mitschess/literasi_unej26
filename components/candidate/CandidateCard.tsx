"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { Candidate } from "@/lib/types";
import ProfileCard from "@/components/ProfileCard";
import { useCompare } from "@/lib/context/CompareContext";

// Map candidate party shortName to logo paths
const PARTY_LOGOS: Record<string, string> = {
  NasDem: "/images/parpol/nasdem.png",
  PKB: "/images/parpol/PKB.png",
  Gerindra: "/images/parpol/gerindra.svg",
  Golkar: "/images/parpol/golkar.png",
  "PDI-P": "/images/parpol/pdi.png",
  PKS: "/images/parpol/pks.png",
  Demokrat: "/images/parpol/demokrat.png",
  PAN: "/images/parpol/PAN.png",
};

interface Props {
  candidate: Candidate;
}

export const CandidateCard: React.FC<Props> = ({ candidate }) => {
  const router = useRouter();
  const { toggleCandidate, isSelected } = useCompare();
  const selected = isSelected(candidate.id);

  const partyLogoUrl = candidate.party.logoUrl || PARTY_LOGOS[candidate.party.shortName];

  return (
    <div className={`w-full max-w-[240px] mx-auto relative ${selected ? "ring-2 ring-sage ring-offset-2 ring-offset-cream rounded-[22px]" : ""}`}>
      {/* Party logo badge */}
      {partyLogoUrl && (
        <div
          className="absolute top-3 right-3 z-20 w-9 h-9 rounded-xl bg-white/90 backdrop-blur-sm border border-white/60 shadow-md flex items-center justify-center p-1.5 pointer-events-none"
          title={candidate.party.name}
        >
          <img
            src={partyLogoUrl}
            alt={`Logo ${candidate.party.shortName}`}
            className="w-full h-full object-contain"
            onError={(e) => {
              const t = e.target as HTMLImageElement;
              t.style.display = "none";
              const parent = t.parentElement;
              if (parent) {
                parent.style.backgroundColor = candidate.party.color + "22";
                parent.innerHTML = `<span style="color:${candidate.party.color};font-size:9px;font-weight:900">${candidate.party.shortName}</span>`;
              }
            }}
          />
        </div>
      )}
      <ProfileCard
        compact
        className="w-full"
        name={candidate.name}
        title={`${candidate.party.shortName} · ${candidate.constituency.name}`}
        contactText="Rekam Jejak"
        secondaryActionText={selected ? "✓ Terpilih" : "Bandingkan"}
        avatarUrl={candidate.photoUrl}
        iconUrl=""
        grainUrl=""
        enableTilt
        behindGlowEnabled
        behindGlowColor="rgba(27, 42, 65, 0.32)"
        behindGlowSize="48%"
        innerGradient="linear-gradient(165deg, #1B2A41 0%, #243447 55%, #1C7A6F28 100%)"
        onContactClick={() => router.push(`/kandidat/${candidate.slug}`)}
        onSecondaryActionClick={() => toggleCandidate(candidate.id)}
      />
    </div>
  );
};

