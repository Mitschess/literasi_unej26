// ============================================================
// POLITRACK — Isu Strategis Data (inspired by Bijak Memilih)
// ============================================================

export interface StrategicIssue {
  id: string;
  slug: string;
  title: string;
  icon: string;
  summary: string;
  description: string;
  context: string;
  relatedLaw?: string;
  subIssues: SubIssue[];
}

export interface SubIssue {
  id: string;
  title: string;
  description: string;
}

export interface PemilutSteps {
  id: string;
  step: number;
  title: string;
  description: string;
  icon: string;
  tips: string[];
}

export const strategicIssues: StrategicIssue[] = [
  {
    id: "isu-01",
    slug: "transisi-energi",
    title: "Transisi Energi",
    icon: "⚡",
    summary: "UU Energi Baru-Terbarukan dan target net-zero Indonesia",
    description:
      "Indonesia berkomitmen mencapai net-zero emissions pada 2060. Namun, kebijakan energi masih mencakup turunan batubara sebagai 'energi baru'. Perdebatan terkait RUU EBET menyoroti perlunya transisi berkeadilan.",
    context:
      "Indonesia adalah salah satu eksportir batubara terbesar di dunia. Transisi energi berdampak langsung pada jutaan pekerja di sektor ini.",
    relatedLaw: "UU No. 30/2007 tentang Energi, RUU EBET",
    subIssues: [
      { id: "si-01a", title: "Energi terbarukan vs batubara", description: "Perdebatan peran batubara dalam bauran energi nasional." },
      { id: "si-01b", title: "Carbon tax", description: "Implementasi pajak karbon untuk menurunkan emisi." },
      { id: "si-01c", title: "Green jobs", description: "Penciptaan lapangan kerja hijau di sektor energi terbarukan." },
    ],
  },
  {
    id: "isu-02",
    slug: "perlindungan-pekerja",
    title: "Perlindungan Pekerja Informal",
    icon: "👷",
    summary: "UU Ciptaker belum mengakomodasi pekerja informal",
    description:
      "Sekitar 60% pekerja Indonesia berada di sektor informal tanpa perlindungan jaminan sosial yang memadai. UU Cipta Kerja dikritik karena belum memberikan payung hukum yang cukup untuk kelompok ini.",
    context:
      "Pekerja informal mencakup petani, pedagang kaki lima, pekerja rumah tangga, dan pekerja gig economy.",
    relatedLaw: "UU No. 6/2023 tentang Cipta Kerja",
    subIssues: [
      { id: "si-02a", title: "Jaminan sosial pekerja informal", description: "Perluasan BPJS untuk pekerja non-formal." },
      { id: "si-02b", title: "Gig economy", description: "Regulasi untuk pekerja ojol, kurir, dan freelancer." },
      { id: "si-02c", title: "Upah layak", description: "Penetapan upah minimum yang berkeadilan." },
    ],
  },
  {
    id: "isu-03",
    slug: "kebebasan-berpendapat",
    title: "Kebebasan Berpendapat",
    icon: "📢",
    summary: "Revisi UU ITE untuk menghilangkan pasal karet",
    description:
      "Kebebasan berpendapat di Indonesia masih dibatasi oleh pasal-pasal 'karet' dalam UU ITE dan KUHP baru. Banyak aktivis, jurnalis, dan warga biasa yang menjadi korban kriminalisasi karena mengkritik pejabat.",
    context:
      "Indonesia turun peringkat dalam indeks kebebasan pers dunia (RSF) dalam beberapa tahun terakhir.",
    relatedLaw: "UU No. 1/2024 (Revisi UU ITE), KUHP Baru",
    subIssues: [
      { id: "si-03a", title: "Revisi pasal karet UU ITE", description: "Penghapusan pasal pencemaran nama baik yang multitafsir." },
      { id: "si-03b", title: "Kebebasan pers", description: "Perlindungan jurnalis dari intimidasi dan kriminalisasi." },
      { id: "si-03c", title: "Kebebasan akademik", description: "Menjamin kebebasan kampus untuk mengkritik kebijakan." },
    ],
  },
  {
    id: "isu-04",
    slug: "korupsi",
    title: "Pemberantasan Korupsi",
    icon: "🔍",
    summary: "Penguatan KPK & penegakan hukum anti-korupsi",
    description:
      "KPK mengalami pelemahan setelah revisi UU KPK 2019. Skor CPI Indonesia stagnan. Perlu ada penguatan institusi anti-korupsi dan pengesahan UU Perampasan Aset.",
    context:
      "Indonesia masih menghadapi tantangan korupsi sistemik di berbagai level pemerintahan.",
    relatedLaw: "UU No. 19/2019 (Revisi UU KPK), RUU Perampasan Aset",
    subIssues: [
      { id: "si-04a", title: "Independensi KPK", description: "Mengembalikan independensi dan kewenangan KPK." },
      { id: "si-04b", title: "UU Perampasan Aset", description: "Pengesahan undang-undang untuk merampas aset hasil korupsi." },
      { id: "si-04c", title: "Transparansi APBN/APBD", description: "Meningkatkan keterbukaan anggaran negara." },
    ],
  },
  {
    id: "isu-05",
    slug: "pendidikan-berkualitas",
    title: "Pendidikan Berkualitas",
    icon: "🎓",
    summary: "Kesejahteraan guru, kurikulum, dan akses pendidikan",
    description:
      "Indonesia mengalokasikan 20% APBN untuk pendidikan, namun kualitas belum merata. Gaji guru masih rendah, dan akses pendidikan di daerah 3T masih terbatas.",
    context:
      "Skor PISA Indonesia masih di bawah rata-rata OECD, menunjukkan tantangan besar dalam literasi, numerasi, dan sains.",
    subIssues: [
      { id: "si-05a", title: "Gaji guru", description: "Peningkatan kesejahteraan guru honorer dan ASN." },
      { id: "si-05b", title: "Akses pendidikan 3T", description: "Pemerataan pendidikan di daerah terdepan, terluar, tertinggal." },
      { id: "si-05c", title: "Kurikulum", description: "Relevansi kurikulum dengan kebutuhan dunia kerja." },
    ],
  },
  {
    id: "isu-06",
    slug: "kesehatan-publik",
    title: "Kesehatan & Stunting",
    icon: "🏥",
    summary: "Penurunan stunting dan reformasi BPJS Kesehatan",
    description:
      "Angka stunting Indonesia masih tinggi (21.6%). BPJS Kesehatan mengalami defisit dan pelayanan di fasilitas kesehatan belum merata. Perlu intervensi serius dari hulu ke hilir.",
    context:
      "Stunting berdampak jangka panjang pada kualitas SDM Indonesia dan daya saing ekonomi nasional.",
    subIssues: [
      { id: "si-06a", title: "Intervensi stunting", description: "Program 1000 hari pertama kehidupan." },
      { id: "si-06b", title: "Reformasi BPJS", description: "Memperbaiki sistem jaminan kesehatan nasional." },
      { id: "si-06c", title: "Nakes desa", description: "Pemenuhan tenaga kesehatan di pedesaan." },
    ],
  },
];

export const pemilu101Steps: PemilutSteps[] = [
  {
    id: "p101-01",
    step: 1,
    title: "Apa itu Pemilu?",
    description:
      "Pemilihan Umum (Pemilu) adalah mekanisme demokrasi di mana rakyat memilih wakil-wakilnya untuk menjalankan pemerintahan. Di Indonesia, pemilu diadakan setiap 5 tahun sekali untuk memilih Presiden & Wakil Presiden, serta anggota legislatif (DPR, DPD, DPRD).",
    icon: "🗳️",
    tips: [
      "Pemilu diatur dalam UUD 1945 Pasal 22E",
      "Diselenggarakan oleh KPU (Komisi Pemilihan Umum)",
      "Diawasi oleh Bawaslu (Badan Pengawas Pemilihan Umum)",
    ],
  },
  {
    id: "p101-02",
    step: 2,
    title: "Siapa yang Dipilih?",
    description:
      "Dalam Pemilu, kita memilih: (1) Presiden & Wakil Presiden, (2) Anggota DPR RI, (3) Anggota DPD RI, (4) Anggota DPRD Provinsi, dan (5) Anggota DPRD Kabupaten/Kota. Masing-masing memiliki surat suara berbeda.",
    icon: "👥",
    tips: [
      "Kamu menerima 5 surat suara saat pencoblosan",
      "Pilkada (Gubernur, Bupati, Walikota) diadakan terpisah",
      "Setiap surat suara memiliki warna berbeda",
    ],
  },
  {
    id: "p101-03",
    step: 3,
    title: "Bagaimana Cara Memilih?",
    description:
      "Mencoblos surat suara di TPS (Tempat Pemungutan Suara) pada hari pemilihan. Kamu hanya perlu mencoblos SATU pasangan/calon/partai di setiap surat suara. Coblos di bagian foto/nama/logo, bukan di luar kotak.",
    icon: "✅",
    tips: [
      "Gunakan paku yang disediakan di bilik suara",
      "Lipat surat suara setelah dicoblos",
      "Masukkan ke kotak suara yang sesuai warnanya",
    ],
  },
  {
    id: "p101-04",
    step: 4,
    title: "Apa yang Perlu Dibawa?",
    description:
      "Bawa KTP/e-KTP atau Surat Keterangan sebagai bukti identitas, Formulir C6 (undangan pemilih) jika sudah diterima, dan semangat untuk berpartisipasi dalam demokrasi!",
    icon: "📋",
    tips: [
      "Cek DPT (Daftar Pemilih Tetap) di website KPU",
      "Kalau belum terdaftar, lapor ke PPS kelurahan setempat",
      "Bisa menggunakan KTP/KK jika formulir C6 belum diterima",
    ],
  },
  {
    id: "p101-05",
    step: 5,
    title: "Menghindari Hoax & Misinformasi",
    description:
      "Di masa pemilu, informasi palsu merajalela. Selalu verifikasi informasi sebelum membagikan. Cek sumber, baca lengkap (bukan hanya judul), dan jangan mudah terprovokasi oleh berita emosional.",
    icon: "🛡️",
    tips: [
      "PAUSE — berhenti sebelum share",
      "VERIFY — cek fakta di turnbackhoax.id atau cekfakta.com",
      "THINK — apakah informasi ini masuk akal?",
      "Hati-hati dengan gambar/video yang dimanipulasi (deepfake)",
    ],
  },
  {
    id: "p101-06",
    step: 6,
    title: "Setelah Pemilu",
    description:
      "Setelah memilih, tugas kita belum selesai! Pantau penghitungan suara, kawal hasil pemilu, dan pantau kerja wakil rakyat yang sudah kita pilih. Mereka bekerja untuk kita dan digaji dari uang kita.",
    icon: "📡",
    tips: [
      "Pantau hasil real count di website KPU",
      "Laporkan pelanggaran ke Bawaslu",
      "Ikuti perkembangan janji-janji politik yang sudah dibuat",
    ],
  },
];

export const antiHoaxTips = [
  {
    id: "ah-01",
    title: "STOP — Jangan Langsung Share",
    description: "Saat menerima informasi mengejutkan, berhenti sejenak. Jangan langsung forward ke grup WhatsApp atau media sosial tanpa verifikasi.",
    icon: "🛑",
  },
  {
    id: "ah-02",
    title: "PERIKSA — Cek Sumber Utama",
    description: "Apakah dari media kredibel? Apakah ada nama penulis/jurnalis? Apakah ada tanggal publikasi? Kalau tidak ada, kemungkinan besar hoax.",
    icon: "🔎",
  },
  {
    id: "ah-03",
    title: "BANDINGKAN — Cross-Check",
    description: "Cek informasi yang sama di minimal 2-3 sumber berbeda. Jika hanya satu sumber yang memberitakan, waspada.",
    icon: "⚖️",
  },
  {
    id: "ah-04",
    title: "TANYA — Konsultasi Ahli",
    description: "Gunakan platform cek fakta seperti turnbackhoax.id, cekfakta.com, atau Mafindo untuk memverifikasi klaim yang mencurigakan.",
    icon: "❓",
  },
  {
    id: "ah-05",
    title: "LAPORKAN — Hentikan Rantai Hoax",
    description: "Jika terbukti hoax, laporkan ke platform media sosial, Kominfo, atau Bawaslu jika terkait pemilu. Jangan jadi penyebar misinformasi!",
    icon: "📣",
  },
];
