import { LiteracyArticle, GlossaryTerm } from "@/lib/types";

export const mockArticles: LiteracyArticle[] = [
  {
    id: "art-001",
    slug: "mengenal-sistem-pemilu-indonesia",
    title: "Mengenal Sistem Pemilu di Indonesia",
    excerpt:
      "Pemilu adalah mekanisme demokrasi untuk memilih wakil rakyat. Pelajari bagaimana sistem pemilu di Indonesia bekerja.",
    content: `
## Apa itu Pemilu?

Pemilihan Umum (Pemilu) adalah proses di mana warga negara yang memenuhi syarat memilih wakil mereka untuk menduduki jabatan publik. Di Indonesia, pemilu diselenggarakan oleh Komisi Pemilihan Umum (KPU).

## Jenis Pemilu di Indonesia

### 1. Pemilu Legislatif (Pileg)
Memilih anggota DPR RI, DPD RI, DPRD Provinsi, dan DPRD Kabupaten/Kota.

### 2. Pemilu Presiden (Pilpres)
Memilih Presiden dan Wakil Presiden.

### 3. Pemilihan Kepala Daerah (Pilkada)
Memilih Gubernur, Bupati, dan Walikota.

## Sistem Proporsional Terbuka

Indonesia menggunakan sistem proporsional terbuka untuk pemilu legislatif. Artinya, pemilih memilih partai sekaligus calon anggota legislatif secara langsung.

## Daerah Pemilihan (Dapil)

Setiap daerah pemilihan memiliki kuota kursi tertentu. Pembagian dapil ditentukan oleh KPU berdasarkan jumlah penduduk.

## Sumber
- UU No. 7 Tahun 2017 tentang Pemilihan Umum
- Peraturan KPU terkait
    `,
    category: "Pemilu",
    author: "Tim POLITRACK",
    publishedAt: "2026-07-01",
    readTime: 5,
    tags: ["pemilu", "demokrasi", "KPU", "legislatif"],
  },
  {
    id: "art-002",
    slug: "cara-memeriksa-sumber-informasi",
    title: "Cara Memeriksa Sumber Informasi Politik",
    excerpt:
      "Panduan praktis untuk memverifikasi klaim politik dan mengenali informasi yang tidak dapat dipercaya.",
    content: `
## Mengapa Penting?

Di era digital, informasi politik dapat tersebar luas tanpa proses verifikasi. Kemampuan memeriksa sumber informasi adalah bagian penting dari literasi politik.

## Langkah-Langkah Verifikasi

### 1. Identifikasi Sumbernya
- Siapa yang membuat klaim tersebut?
- Kapan klaim tersebut dibuat?
- Dalam konteks apa?

### 2. Periksa Sumber Primer
- Apakah ada dokumen resmi yang mendukung?
- Apakah data dapat ditelusuri ke sumber aslinya?

### 3. Bandingkan dengan Sumber Lain
- Apakah media lain melaporkan hal yang sama?
- Apakah ada perbedaan informasi antar sumber?

### 4. Perhatikan Konteks
- Apakah informasi ditampilkan secara lengkap atau dipotong?
- Apakah ada konteks waktu yang relevan?

### 5. Waspada terhadap Red Flags
- Tidak ada sumber yang disebutkan
- Bahasa yang sangat emosional
- Klaim tanpa data kuantitatif
- Screenshot tanpa link asli

## Jenis Sumber dan Tingkat Kepercayaan

| Tingkat | Jenis Sumber | Contoh |
|---------|-------------|--------|
| 1 | Dokumen resmi lembaga negara | UU, Peraturan KPU |
| 2 | Dokumen hukum/peraturan | Perda, SK Gubernur |
| 3 | Situs resmi institusi | dpr.go.id, kpu.go.id |
| 4 | Dokumen publik terverifikasi | Laporan audit BPK |
| 5 | Media dengan standar editorial | Kompas, Tempo |
| 6 | Pernyataan kandidat langsung | Press release, wawancara |
| 7 | Sumber sekunder lainnya | Blog, media sosial |
    `,
    category: "Hoax & Disinformasi",
    author: "Tim POLITRACK",
    publishedAt: "2026-07-15",
    readTime: 7,
    tags: ["verifikasi", "hoax", "literasi-digital", "sumber"],
  },
  {
    id: "art-003",
    slug: "memahami-fungsi-dprd",
    title: "Memahami Fungsi dan Tugas DPRD",
    excerpt:
      "DPRD memiliki tiga fungsi utama: legislasi, anggaran, dan pengawasan. Ketahui apa artinya bagi Anda.",
    content: `
## Apa itu DPRD?

Dewan Perwakilan Rakyat Daerah (DPRD) adalah lembaga legislatif di tingkat provinsi dan kabupaten/kota. Anggota DPRD dipilih melalui Pemilu Legislatif.

## Tiga Fungsi DPRD

### 1. Fungsi Legislasi
Membuat peraturan daerah (Perda) bersama kepala daerah.

### 2. Fungsi Anggaran
Membahas dan menyetujui Rancangan APBD yang diajukan kepala daerah.

### 3. Fungsi Pengawasan
Mengawasi pelaksanaan peraturan daerah dan APBD.

## Mengapa Ini Penting?

Memahami fungsi DPRD membantu pemilih menilai kinerja wakil rakyat mereka. Apakah mereka aktif dalam legislasi? Apakah anggaran daerah diawasi dengan baik?

## Indikator Kinerja yang Dapat Dipantau

- Kehadiran dalam sidang
- Jumlah Perda yang diinisiasi
- Partisipasi dalam pembahasan anggaran
- Aspirasi yang diperjuangkan
    `,
    category: "Lembaga Negara",
    author: "Tim POLITRACK",
    publishedAt: "2026-07-20",
    readTime: 4,
    tags: ["DPRD", "legislatif", "pemerintahan-daerah"],
  },
  {
    id: "art-004",
    slug: "membedakan-fakta-dan-opini",
    title: "Membedakan Fakta dan Opini dalam Berita Politik",
    excerpt:
      "Pelajari cara membedakan pernyataan faktual dari opini dalam pemberitaan politik sehari-hari.",
    content: `
## Fakta vs Opini

### Fakta
Pernyataan yang dapat dibuktikan benar atau salahnya melalui bukti.

**Contoh:** "Anggota DPR periode 2019-2024 berjumlah 575 orang."

### Opini
Pernyataan yang mengandung penilaian, pandangan, atau interpretasi subjektif.

**Contoh:** "Kinerja DPR periode ini sangat mengecewakan."

## Cara Membedakannya

1. **Apakah dapat diverifikasi?** Jika bisa dicek kebenarannya → fakta
2. **Apakah menggunakan kata sifat subjektif?** "terbaik", "terburuk", "paling" → seringkali opini
3. **Apakah ada data pendukung?** Angka dan data cenderung faktual
4. **Siapa yang menyatakan?** Pernyataan pejabat bisa berisi campuran fakta dan opini

## Mengapa Penting di POLITRACK?

Platform ini memisahkan klaim faktual (yang dapat diverifikasi) dari penilaian subjektif. Setiap klaim dilengkapi status verifikasi dan sumber.
    `,
    category: "Hoax & Disinformasi",
    author: "Tim POLITRACK",
    publishedAt: "2026-08-01",
    readTime: 4,
    tags: ["fakta", "opini", "literasi-media", "berita"],
  },
  {
    id: "art-005",
    slug: "hak-pilih-dan-kewajiban-warga",
    title: "Hak Pilih dan Kewajiban Warga Negara",
    excerpt:
      "Setiap warga negara yang memenuhi syarat memiliki hak untuk memilih. Ketahui hak dan kewajiban Anda.",
    content: `
## Hak Pilih

Setiap warga negara Indonesia yang telah berusia 17 tahun atau sudah/pernah menikah memiliki hak pilih dalam pemilihan umum.

## Syarat Pemilih
- WNI berusia minimal 17 tahun pada hari pemungutan suara
- Terdaftar dalam Daftar Pemilih Tetap (DPT)
- Tidak sedang menjalani hukuman pidana
- Tidak sedang dicabut hak pilihnya oleh pengadilan

## Prinsip Pemilu
Pemilu di Indonesia menganut asas **LUBER JURDIL**:
- **Langsung**: pemilih memilih sendiri
- **Umum**: semua yang memenuhi syarat boleh ikut
- **Bebas**: tanpa paksaan atau tekanan
- **Rahasia**: pilihan tidak diketahui orang lain
- **Jujur**: sesuai aturan
- **Adil**: perlakuan sama untuk semua peserta

## Partisipasi Politik di Luar Pemilu
- Mengawasi kinerja wakil rakyat
- Memantau penggunaan anggaran
- Melaporkan pelanggaran
- Menyampaikan aspirasi
    `,
    category: "Hak & Kewajiban",
    author: "Tim POLITRACK",
    publishedAt: "2026-08-05",
    readTime: 4,
    tags: ["hak-pilih", "pemilu", "partisipasi", "demokrasi"],
  },
  {
    id: "art-006",
    slug: "memahami-apbd-dan-transparansi",
    title: "Memahami APBD dan Pentingnya Transparansi Anggaran",
    excerpt:
      "APBD adalah instrumen penting kebijakan publik. Ketahui bagaimana membaca dan mengawasi anggaran daerah.",
    content: `
## Apa itu APBD?

Anggaran Pendapatan dan Belanja Daerah (APBD) adalah rencana keuangan tahunan pemerintahan daerah yang dibahas dan disetujui bersama antara pemerintah daerah dan DPRD.

## Komponen APBD
1. **Pendapatan Daerah**: PAD, Dana Perimbangan, dll.
2. **Belanja Daerah**: Belanja langsung dan tidak langsung
3. **Pembiayaan**: Penerimaan dan pengeluaran pembiayaan

## Mengapa Transparansi Penting?
- Mencegah korupsi
- Memastikan anggaran sesuai kebutuhan rakyat
- Meningkatkan akuntabilitas pejabat publik
- Mendorong partisipasi masyarakat

## Cara Mengawasi APBD
1. Akses dokumen APBD melalui situs resmi pemda
2. Bandingkan rencana dengan realisasi
3. Periksa alokasi untuk sektor prioritas
4. Laporkan jika ada kejanggalan
    `,
    category: "Kebijakan Publik",
    author: "Tim POLITRACK",
    publishedAt: "2026-08-08",
    readTime: 6,
    tags: ["APBD", "anggaran", "transparansi", "kebijakan-publik"],
  },
];

export const mockGlossary: GlossaryTerm[] = [
  {
    id: "gl-001",
    term: "Dapil",
    definition:
      "Daerah Pemilihan — wilayah yang menjadi dasar untuk menentukan calon anggota legislatif yang berhak dipilih oleh pemilih di wilayah tersebut.",
    relatedTerms: ["Pemilu", "DPR", "DPRD"],
  },
  {
    id: "gl-002",
    term: "DPRD",
    definition:
      "Dewan Perwakilan Rakyat Daerah — lembaga legislatif tingkat provinsi atau kabupaten/kota yang dipilih melalui pemilu.",
    relatedTerms: ["Dapil", "Legislatif", "Perda"],
  },
  {
    id: "gl-003",
    term: "APBD",
    definition:
      "Anggaran Pendapatan dan Belanja Daerah — rencana keuangan tahunan pemerintah daerah yang dibahas dan disetujui bersama DPRD.",
    relatedTerms: ["DPRD", "Transparansi"],
  },
  {
    id: "gl-004",
    term: "KPU",
    definition:
      "Komisi Pemilihan Umum — lembaga negara yang menyelenggarakan pemilihan umum di Indonesia.",
    relatedTerms: ["Pemilu", "Dapil", "DPT"],
  },
  {
    id: "gl-005",
    term: "DPT",
    definition:
      "Daftar Pemilih Tetap — daftar warga negara yang berhak memberikan suaranya dalam pemilihan umum.",
    relatedTerms: ["KPU", "Pemilu"],
  },
  {
    id: "gl-006",
    term: "Perda",
    definition:
      "Peraturan Daerah — produk hukum yang ditetapkan oleh kepala daerah bersama DPRD untuk mengatur daerahnya.",
    relatedTerms: ["DPRD", "Legislasi"],
  },
  {
    id: "gl-007",
    term: "Fraksi",
    definition:
      "Pengelompokan anggota DPR/DPRD berdasarkan partai politik. Fraksi berperan dalam menyalurkan aspirasi partai dalam lembaga legislatif.",
    relatedTerms: ["DPR", "DPRD", "Partai Politik"],
  },
  {
    id: "gl-008",
    term: "Legislasi",
    definition:
      "Proses pembentukan peraturan perundang-undangan. Merupakan salah satu fungsi utama DPR/DPRD.",
    relatedTerms: ["Perda", "DPR", "DPRD"],
  },
  {
    id: "gl-009",
    term: "Hak Interpelasi",
    definition:
      "Hak DPR/DPRD untuk meminta keterangan kepada pemerintah/pemerintah daerah mengenai kebijakan yang penting dan strategis.",
    relatedTerms: ["DPR", "DPRD", "Pengawasan"],
  },
  {
    id: "gl-010",
    term: "RAG",
    definition:
      "Retrieval-Augmented Generation — teknik AI yang mengambil informasi dari database/sumber terverifikasi untuk menyusun jawaban, sehingga mengurangi risiko halusinasi.",
    relatedTerms: ["AI", "Verifikasi"],
  },
];

export function getArticleBySlug(slug: string): LiteracyArticle | undefined {
  return mockArticles.find((a) => a.slug === slug);
}

export function getArticlesByCategory(category: string): LiteracyArticle[] {
  return mockArticles.filter((a) => a.category === category);
}

export function getGlossaryTerm(term: string): GlossaryTerm | undefined {
  return mockGlossary.find(
    (g) => g.term.toLowerCase() === term.toLowerCase()
  );
}
