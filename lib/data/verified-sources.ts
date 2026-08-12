import { Source, SourceType } from "@/lib/types";

export interface VerifiedSourceEntry extends Source {
  keywords: string[];
}

const today = () => new Date().toISOString().split("T")[0];

export const verifiedWebSources: VerifiedSourceEntry[] = [
  {
    id: "vs-kpu-info",
    name: "Info Pemilu KPU RI",
    url: "https://infopemilu.kpu.go.id",
    sourceType: "government",
    publisher: "Komisi Pemilihan Umum",
    accessedAt: today(),
    keywords: [
      "kpu", "pemilu", "pilpres", "pilkada", "caleg", "calon", "dpt", "tps",
      "surat suara", "pemilih", "pencoblosan", "form a5", "pindah memilih",
    ],
  },
  {
    id: "vs-kpu-dpt",
    name: "Cek DPT Online — KPU",
    url: "https://cekdptonline.kpu.go.id",
    sourceType: "government",
    publisher: "Komisi Pemilihan Umum",
    accessedAt: today(),
    keywords: ["dpt", "daftar pemilih", "nik", "cek pemilih", "terdaftar"],
  },
  {
    id: "vs-bawaslu",
    name: "Bawaslu — Pengawasan Pemilu",
    url: "https://bawaslu.go.id",
    sourceType: "government",
    publisher: "Badan Pengawas Pemilu",
    accessedAt: today(),
    keywords: ["bawaslu", "pelanggaran pemilu", "pengawasan", "sengketa pemilu"],
  },
  {
    id: "vs-dpr",
    name: "Profil Anggota DPR RI",
    url: "https://www.dpr.go.id/anggota",
    sourceType: "state_institution",
    publisher: "DPR RI",
    accessedAt: today(),
    keywords: [
      "dpr", "parlemen", "legislatif", "sidang", "kehadiran", "fraksi",
      "rancangan undang", "ruu", "anggaran apbn",
    ],
  },
  {
    id: "vs-dpd",
    name: "Portal DPD RI",
    url: "https://www.dpd.go.id",
    sourceType: "state_institution",
    publisher: "DPD RI",
    accessedAt: today(),
    keywords: ["dpd", "daerah", "provinsi", "daerah pemilihan dpd"],
  },
  {
    id: "vs-bps",
    name: "Badan Pusat Statistik",
    url: "https://www.bps.go.id",
    sourceType: "government",
    publisher: "BPS",
    accessedAt: today(),
    keywords: [
      "bps", "statistik", "data", "angka", "kesejahteraan", "penduduk",
      "ekonomi", "kemiskinan", "stunting",
    ],
  },
  {
    id: "vs-kemendagri",
    name: "Kemendagri — Wilayah Administrasi",
    url: "https://www.kemendagri.go.id",
    sourceType: "government",
    publisher: "Kementerian Dalam Negeri",
    accessedAt: today(),
    keywords: ["kemendagri", "wilayah", "provinsi", "kabupaten", "kecamatan", "pemda"],
  },
  {
    id: "vs-setneg",
    name: "Sekretariat Negara RI",
    url: "https://www.setneg.go.id",
    sourceType: "government",
    publisher: "Sekretariat Negara",
    accessedAt: today(),
    keywords: ["presiden", "wapres", "kabinet", "menteri", "eksekutif", "undang-undang"],
  },
  {
    id: "vs-icw",
    name: "Indonesia Corruption Watch",
    url: "https://antikorupsi.org",
    sourceType: "civil_society",
    publisher: "ICW",
    accessedAt: today(),
    keywords: ["korupsi", "transparansi", "anggaran", "icw", "integritas"],
  },
  {
    id: "vs-turnbackhoax",
    name: "TurnBackHoax.id",
    url: "https://turnbackhoax.id",
    sourceType: "civil_society",
    publisher: "Masyarakat Antihoax Indonesia",
    accessedAt: today(),
    keywords: ["hoax", "misinformasi", "disinformasi", "cek fakta", "berita palsu"],
  },
  {
    id: "vs-cekfakta",
    name: "CekFakta by Tempo",
    url: "https://cekfakta.tempo.co",
    sourceType: "media",
    publisher: "Tempo",
    accessedAt: today(),
    keywords: ["hoax", "cek fakta", "fact check", "verifikasi berita"],
  },
  {
    id: "vs-kompas",
    name: "Kompas.com",
    url: "https://www.kompas.com",
    sourceType: "media",
    publisher: "Kompas",
    accessedAt: today(),
    keywords: ["kompas", "berita", "program", "kebijakan", "politik"],
  },
  {
    id: "vs-tempo",
    name: "Tempo.co",
    url: "https://www.tempo.co",
    sourceType: "media",
    publisher: "Tempo",
    accessedAt: today(),
    keywords: ["tempo", "investigasi", "berita", "politik"],
  },
];

const TRUSTED_DOMAINS = verifiedWebSources.map((s) => {
  try {
    return new URL(s.url).hostname.replace(/^www\./, "");
  } catch {
    return "";
  }
}).filter(Boolean);

export function getTrustedDomains(): string[] {
  return TRUSTED_DOMAINS;
}

export function matchVerifiedSources(
  text: string,
  limit = 4,
): Source[] {
  const lower = text.toLowerCase();
  const scored = verifiedWebSources
    .map((source) => {
      const score = source.keywords.reduce(
        (acc, keyword) => (lower.includes(keyword) ? acc + 1 : acc),
        0,
      );
      return { source, score };
    })
    .filter(({ score }) => score > 0)
    .sort((a, b) => b.score - a.score);

  const picked = scored.length > 0
    ? scored.slice(0, limit).map(({ source }) => {
        const { keywords: _keywords, ...rest } = source;
        return rest;
      })
    : verifiedWebSources.slice(0, limit).map(({ keywords: _keywords, ...rest }) => rest);

  return picked;
}

export function mergeSources(primary: Source[], fallback: Source[], limit = 5): Source[] {
  const seen = new Set<string>();
  const merged: Source[] = [];

  for (const source of [...primary, ...fallback]) {
    const key = source.url || source.id;
    if (seen.has(key)) continue;
    seen.add(key);
    merged.push(source);
    if (merged.length >= limit) break;
  }

  return merged;
}

export function isTrustedUrl(url: string): boolean {
  try {
    const host = new URL(url).hostname.replace(/^www\./, "");
    return TRUSTED_DOMAINS.some(
      (domain) => host === domain || host.endsWith(`.${domain}`),
    );
  } catch {
    return false;
  }
}

export function toSourceFromUrl(
  url: string,
  title: string,
  idx: number,
): Source {
  let publisher = "Sumber online";
  let sourceType: SourceType = "media";

  try {
    const host = new URL(url).hostname.replace(/^www\./, "");
    publisher = host;
    const matched = verifiedWebSources.find((s) => {
      try {
        return new URL(s.url).hostname.replace(/^www\./, "") === host;
      } catch {
        return false;
      }
    });
    if (matched) sourceType = matched.sourceType;
    if (host.endsWith(".go.id")) sourceType = "government";
  } catch {
    // keep defaults
  }

  return {
    id: `web-${idx}`,
    name: title,
    url,
    sourceType,
    publisher,
    accessedAt: today(),
  };
}
