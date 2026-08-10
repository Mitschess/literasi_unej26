import { Candidate } from "@/lib/types";

export function getCandidateCountsByProvince(
  candidates: Candidate[],
): Record<string, number> {
  const counts: Record<string, number> = {};

  for (const candidate of candidates) {
    const province = candidate.constituency.province;
    counts[province] = (counts[province] ?? 0) + 1;
  }

  return counts;
}

export function getMaxCandidateCount(counts: Record<string, number>): number {
  return Math.max(0, ...Object.values(counts));
}
