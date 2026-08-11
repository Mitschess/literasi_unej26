"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { Candidate } from "@/lib/types";
import ProfileCard from "@/components/ProfileCard";

interface Props {
  candidate: Candidate;
}

export const CandidateCard: React.FC<Props> = ({ candidate }) => {
  const router = useRouter();

  return (
    <div className="w-full max-w-[240px] mx-auto">
      <ProfileCard
        compact
        className="w-full"
        name={candidate.name}
        title={`${candidate.party.shortName} · ${candidate.constituency.name}`}
        contactText="Rekam Jejak"
        secondaryActionText="Bandingkan"
        avatarUrl={candidate.photoUrl}
        iconUrl=""
        grainUrl=""
        enableTilt
        behindGlowEnabled
        behindGlowColor="rgba(27, 42, 65, 0.32)"
        behindGlowSize="48%"
        innerGradient="linear-gradient(165deg, #1B2A41 0%, #243447 55%, #1C7A6F28 100%)"
        onContactClick={() => router.push(`/kandidat/${candidate.slug}`)}
        onSecondaryActionClick={() => router.push(`/bandingkan?c1=${candidate.id}`)}
      />
    </div>
  );
};
