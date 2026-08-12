import { Party, PartyTrackRecord } from "@/lib/data/parties";

export const spectrumLabel: Record<Party["spectrum"], string> = {
  kiri: "Kiri",
  "tengah-kiri": "Tengah-Kiri",
  tengah: "Tengah",
  "tengah-kanan": "Tengah-Kanan",
  kanan: "Kanan",
};

export const spectrumColor: Record<Party["spectrum"], string> = {
  kiri: "#C62828",
  "tengah-kiri": "#E53935",
  tengah: "#1565C0",
  "tengah-kanan": "#2E7D32",
  kanan: "#1B5E20",
};

export function sentimentBadge(sentiment: PartyTrackRecord["sentiment"]) {
  if (sentiment === "positive")
    return "bg-emerald-50 text-emerald-700 border border-emerald-200";
  if (sentiment === "negative")
    return "bg-rose-50 text-rose-700 border border-rose-200";
  return "bg-gray-100 text-gray-600 border border-gray-200";
}

export function sentimentLabel(s: PartyTrackRecord["sentiment"]) {
  if (s === "positive") return "Positif";
  if (s === "negative") return "Kontroversi";
  return "Netral";
}

export function categoryIcon(c: PartyTrackRecord["category"]) {
  if (c === "prestasi") return "🏆";
  if (c === "kontroversi") return "⚠️";
  if (c === "kebijakan") return "📋";
  return "📊";
}

export function categoryLabel(c: PartyTrackRecord["category"]) {
  if (c === "prestasi") return "Prestasi";
  if (c === "kontroversi") return "Kontroversi";
  if (c === "kebijakan") return "Kebijakan";
  return "Pemilu";
}

export function partyCardGradient(party: Party) {
  const secondary = party.secondaryColor ?? party.color;
  return `linear-gradient(225deg, ${party.color}28 0%, ${secondary}14 30%, #ffffff 68%)`;
}

export function partyHeaderGradient(party: Party) {
  const secondary = party.secondaryColor ?? party.color;
  return `linear-gradient(135deg, ${party.color}18 0%, ${secondary}0a 45%, #ffffff 100%)`;
}
