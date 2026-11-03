// ============================================================
// POLITRACK — Direktori pejabat publik
// Gubernur, bupati, wali kota, dan anggota DPR RI 2024–2029.
// Data mentah ada di officials.generated.ts (tools/build_officials_data.py).
// ============================================================

import {
  Candidate,
  CurrentOffice,
  Party,
  Source,
  TimelineEvent,
} from "@/lib/types";
import { mockParties } from "./parties";
import {
  DPR_LIST_PAGE,
  OFFICIALS_ACCESSED_AT,
  dprMemberRecords,
  regionalHeadRecords,
} from "./officials.generated";

export interface RegionalHeadRecord {
  kind: "gubernur" | "bupati" | "wali_kota";
  slug: string;
  name: string;
  region: string;
  province: string;
  party: string;
  acting?: string;
  deputy?: string;
  deputyParty?: string;
  start?: string;
  end?: string;
  wiki?: string;
  photo?: string;
}

export interface DprMemberRecord {
  no: number;
  slug: string;
  name: string;
  province: string;
  dapil: string;
  party: string;
  commission?: string;
  votes?: number;
  note?: string;
  replacing?: string[];
  wiki?: string;
  photo?: string;
}

const GOVERNOR_LIST_PAGE = "Daftar gubernur dan wakil gubernur di Indonesia";
const REGIONAL_LIST_PAGE = "Daftar kepala daerah dan wakil kepala daerah petahana di ";
const DPR_INAUGURATION = "2024-10-01";

const OFFICE_LABEL: Record<RegionalHeadRecord["kind"], string> = {
  gubernur: "Gubernur",
  bupati: "Bupati",
  wali_kota: "Wali Kota",
};

const MONTHS = [
  "Januari", "Februari", "Maret", "April", "Mei", "Juni",
  "Juli", "Agustus", "September", "Oktober", "November", "Desember",
];

// Partai di luar 8 fraksi DPR (lib/data/parties.ts) yang muncul di kursi kepala daerah
const EXTRA_PARTIES: Record<string, { name: string; color: string }> = {
  PPP: { name: "Partai Persatuan Pembangunan", color: "#00703C" },
  PSI: { name: "Partai Solidaritas Indonesia", color: "#D7001A" },
  Perindo: { name: "Partai Persatuan Indonesia", color: "#1F3A93" },
  Hanura: { name: "Partai Hati Nurani Rakyat", color: "#E58E26" },
  PBB: { name: "Partai Bulan Bintang", color: "#00613A" },
  "Partai Aceh": { name: "Partai Aceh", color: "#B71C1C" },
  PNA: { name: "Partai Nanggroe Aceh", color: "#E65100" },
  SIRA: { name: "Partai SIRA", color: "#5D4037" },
  "PAS Aceh": { name: "Partai Adil Sejahtera Aceh", color: "#2E7D32" },
  PDA: { name: "Partai Darul Aceh", color: "#33691E" },
  Buruh: { name: "Partai Buruh", color: "#EF6C00" },
  PKN: { name: "Partai Kebangkitan Nusantara", color: "#7B1FA2" },
  Independen: { name: "Nonpartai / Independen", color: "#607D8B" },
};

function partyFor(shortName: string): Party {
  const known = mockParties.find((p) => p.shortName === shortName);
  if (known) {
    return {
      id: known.id,
      name: known.name,
      shortName: known.shortName,
      color: known.color,
      logoUrl: known.logoUrl,
    };
  }
  const extra = EXTRA_PARTIES[shortName] ?? { name: shortName, color: "#607D8B" };
  return {
    id: `p-${shortName.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`,
    name: extra.name,
    shortName,
    color: extra.color,
  };
}

function formatDate(iso?: string): string {
  if (!iso) return "";
  const [y, m, d] = iso.split("-").map(Number);
  return `${d} ${MONTHS[m - 1]} ${y}`;
}

function formatNumber(n: number): string {
  return String(n).replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

function wikiUrl(title: string): string {
  return `https://id.wikipedia.org/wiki/${encodeURIComponent(title.replace(/ /g, "_"))}`;
}

function photoUrl(file?: string): string {
  if (!file) return "";
  return `https://id.wikipedia.org/wiki/Special:FilePath/${encodeURIComponent(file)}?width=360`;
}

function wikiSource(id: string, title: string, note: string): Source {
  return {
    id,
    name: title,
    url: wikiUrl(title),
    sourceType: "other",
    publisher: "Wikipedia bahasa Indonesia",
    accessedAt: OFFICIALS_ACCESSED_AT,
    reliabilityNote: note,
  };
}

const VERIFICATION_NOTE =
  "Dihimpun otomatis dari daftar pejabat di Wikipedia bahasa Indonesia. Cocokkan dengan SK pelantikan, situs pemerintah daerah, atau KPU/DPR sebelum dikutip.";

function sourcesFor(slug: string, listPage: string, article?: string): Source[] {
  const sources = [
    wikiSource(`src-${slug}-list`, listPage, "Daftar petahana yang merujuk berita pelantikan resmi."),
  ];
  if (article) {
    sources.push(wikiSource(`src-${slug}-bio`, article, "Artikel biografi ensiklopedia terbuka."));
  }
  return sources;
}

function buildRegionalHead(r: RegionalHeadRecord): Candidate {
  const id = `kd-${r.slug}`;
  const label = OFFICE_LABEL[r.kind];
  const place = r.kind === "gubernur" ? r.region : r.region.replace(/^(Kabupaten|Kota) /, "");
  const acting = Boolean(r.acting);
  const title = `${acting ? "Plt. " : ""}${label} ${place}`;
  const party = partyFor(r.party);
  const sources = sourcesFor(
    r.slug,
    r.kind === "gubernur" ? GOVERNOR_LIST_PAGE : REGIONAL_LIST_PAGE + r.province,
    r.wiki,
  );
  const period = r.end ? `${r.start?.slice(0, 4)}–${r.end.slice(0, 4)}` : `sejak ${r.start?.slice(0, 4)}`;
  const isYogyakarta = r.kind === "gubernur" && r.province === "Daerah Istimewa Yogyakarta";
  const electionYear = isYogyakarta ? Number(r.start?.slice(0, 4)) : 2024;

  const where = r.kind === "gubernur" ? "" : `, Provinsi ${r.province}`;
  const biography = [
    `${r.name} adalah ${title}${where}.`,
    acting
      ? `Menjalankan tugas sebagai pelaksana tugas kepala daerah sejak ${formatDate(r.start)}.`
      : `Menjabat sejak ${formatDate(r.start)}${r.end ? `; masa jabatan saat ini direncanakan berakhir ${formatDate(r.end)}` : ""}.`,
    r.deputy
      ? `Wakilnya adalah ${r.deputy}${r.deputyParty ? ` (${partyFor(r.deputyParty).shortName})` : ""}.`
      : "",
    `Afiliasi partai: ${party.name}.`,
  ]
    .filter(Boolean)
    .join(" ");

  const timeline: TimelineEvent[] = r.start
    ? [
        {
          id: `tl-${id}`,
          candidateId: id,
          year: Number(r.start.slice(0, 4)),
          title: acting ? `Menjadi ${title}` : `Mulai menjabat sebagai ${label} ${place}`,
          description: r.end
            ? `Masa jabatan direncanakan hingga ${formatDate(r.end)}.`
            : "Masa jabatan tidak dibatasi periode pemilihan.",
          category: "jabatan",
          periodStart: r.start,
          periodEnd: r.end,
          sources,
          verificationStatus: "partially_verified",
        },
      ]
    : [];

  const office: CurrentOffice = {
    kind: r.kind,
    title,
    region: r.region,
    province: r.province,
    startDate: r.start,
    endDate: r.end,
    acting,
    deputy: r.deputy,
  };

  return {
    id,
    name: r.name,
    slug: r.slug,
    photoUrl: photoUrl(r.photo),
    party,
    election: {
      id: `e-${id}`,
      name: isYogyakarta
        ? "Penetapan Gubernur DIY (Keistimewaan Yogyakarta)"
        : `Pilkada ${label} ${place} 2024`,
      type: "Eksekutif Regional",
      year: electionYear,
      region: r.province,
    },
    constituency: {
      id: `d-${id}`,
      name: r.region,
      province: r.province,
      city: r.kind === "gubernur" ? undefined : r.region,
      electionId: `e-${id}`,
    },
    biography,
    education: [],
    occupation: [`${title} (${period})`],
    publicPositions: [`${title} (${period})`],
    organizations: [],
    visionMission: "",
    programs: [],
    claims: [
      {
        id: `cl-${id}`,
        candidateId: id,
        title: `${title} periode ${period}`,
        description: biography,
        category: "jabatan",
        periodStart: r.start,
        periodEnd: r.end,
        verificationStatus: "partially_verified",
        verificationNote: VERIFICATION_NOTE,
        sources,
        verifiedAt: OFFICIALS_ACCESSED_AT,
      },
    ],
    promises: [],
    timeline,
    performanceMetrics: [],
    currentOffice: office,
    profileDepth: "directory",
    updatedAt: OFFICIALS_ACCESSED_AT,
  };
}

function buildDprMember(m: DprMemberRecord): Candidate {
  const id = `dpr-${m.no}`;
  const party = partyFor(m.party);
  const sources = sourcesFor(m.slug, DPR_LIST_PAGE, m.wiki);
  const replacing = m.replacing ?? [];
  const isPaw = replacing.length > 0;

  const biography = [
    `${m.name} adalah anggota DPR RI periode 2024–2029 dari Fraksi ${party.shortName}, mewakili daerah pemilihan ${m.dapil} (${m.province})${m.commission ? ` dan bertugas di ${m.commission}` : ""}.`,
    m.votes ? `Perolehan suara sah pada Pemilu 2024: ${formatNumber(m.votes)} suara.` : "",
    isPaw
      ? `Duduk di DPR melalui pergantian antarwaktu (PAW) menggantikan ${replacing[replacing.length - 1]}.`
      : "",
    m.note ? `Jabatan di DPR/MPR: ${m.note}.` : "",
  ]
    .filter(Boolean)
    .join(" ");

  const timeline: TimelineEvent[] = isPaw
    ? []
    : [
        {
          id: `tl-${id}`,
          candidateId: id,
          year: 2024,
          title: "Dilantik sebagai anggota DPR RI 2024–2029",
          description: `Mewakili dapil ${m.dapil} dari Fraksi ${party.shortName}.`,
          category: "jabatan",
          periodStart: DPR_INAUGURATION,
          periodEnd: "2029-10-01",
          sources,
          verificationStatus: "partially_verified",
        },
      ];

  return {
    id,
    name: m.name,
    slug: m.slug,
    photoUrl: photoUrl(m.photo),
    party,
    election: {
      id: "e-dpr-2024",
      name: "Pemilu Legislatif DPR RI 2024",
      type: "Legislatif",
      year: 2024,
      region: m.province,
    },
    constituency: {
      id: `d-dpr-${m.dapil.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`,
      name: `Dapil ${m.dapil}`,
      province: m.province,
      electionId: "e-dpr-2024",
    },
    biography,
    education: [],
    occupation: ["Anggota DPR RI (2024–2029)"],
    publicPositions: [
      "Anggota DPR RI (2024–2029)",
      ...(m.commission ? [`Anggota ${m.commission} DPR RI`] : []),
      ...(m.note ? [m.note] : []),
    ],
    organizations: [`Fraksi ${party.shortName} DPR RI`],
    visionMission: "",
    programs: [],
    claims: [
      {
        id: `cl-${id}`,
        candidateId: id,
        title: `Anggota DPR RI dapil ${m.dapil}`,
        description: biography,
        category: "jabatan",
        periodStart: isPaw ? undefined : DPR_INAUGURATION,
        periodEnd: "2029-10-01",
        verificationStatus: "partially_verified",
        verificationNote: VERIFICATION_NOTE,
        sources,
        verifiedAt: OFFICIALS_ACCESSED_AT,
      },
    ],
    promises: [],
    timeline,
    performanceMetrics: [],
    currentOffice: {
      kind: "anggota_dpr",
      title: "Anggota DPR RI",
      region: `Dapil ${m.dapil}`,
      province: m.province,
      startDate: isPaw ? undefined : DPR_INAUGURATION,
      endDate: "2029-10-01",
      commission: m.commission,
      votes: m.votes,
      replacing: isPaw ? replacing : undefined,
    },
    profileDepth: "directory",
    updatedAt: OFFICIALS_ACCESSED_AT,
  };
}

export const OFFICE_KIND_LABELS: Record<CurrentOffice["kind"], string> = {
  gubernur: "Gubernur",
  bupati: "Bupati",
  wali_kota: "Wali Kota",
  anggota_dpr: "Anggota DPR RI",
};

const normalizeName = (name: string) =>
  name.toLowerCase().replace(/[^a-z]+/g, " ").trim();

/**
 * Gabungkan profil lengkap dengan direktori pejabat. Pejabat yang sudah punya
 * profil lengkap tidak diduplikasi; profilnya diberi data jabatan saat ini.
 */
export function withOfficials(profiles: Candidate[]): Candidate[] {
  const byName = new Map(profiles.map((c) => [normalizeName(c.name), c]));
  const usedSlugs = new Set(profiles.map((c) => c.slug));
  const officeOf = new Map<string, CurrentOffice>();
  const directory: Candidate[] = [];

  const officials = [
    ...regionalHeadRecords.map(buildRegionalHead),
    ...dprMemberRecords.map(buildDprMember),
  ];

  for (const official of officials) {
    const profile = byName.get(normalizeName(official.name));
    if (profile && official.currentOffice && !officeOf.has(profile.id)) {
      officeOf.set(profile.id, official.currentOffice);
      continue;
    }
    if (usedSlugs.has(official.slug)) {
      official.slug = `${official.slug}-${official.id}`;
    }
    usedSlugs.add(official.slug);
    directory.push(official);
  }

  return [
    ...profiles.map((c) => ({
      ...c,
      currentOffice: c.currentOffice ?? officeOf.get(c.id),
      profileDepth: c.profileDepth ?? ("full" as const),
    })),
    ...directory,
  ];
}
