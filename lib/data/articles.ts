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
    term: "APBD",
    definition:
      "Anggaran Pendapatan dan Belanja Daerah — Rencana keuangan tahunan pemerintah daerah yang dibahas dan disetujui bersama oleh DPRD dan Pemerintah Daerah.",
    relatedTerms: ["DPRD", "Transparansi", "APBN"],
  },
  {
    id: "gl-002",
    term: "Bawaslu",
    definition:
      "Badan Pengawas Pemilihan Umum — Lembaga penyelenggara pemilu yang bertugas mengawasi seluruh tahapan penyelenggaraan pemilu di seluruh wilayah Indonesia.",
    relatedTerms: ["KPU", "Pemilu", "Pelanggaran"],
  },
  {
    id: "gl-003",
    term: "Dapil",
    definition:
      "Daerah Pemilihan — Wilayah administratif atau gabungan wilayah yang menjadi dasar batas penentuan alokasi kursi wakil rakyat di parlemen.",
    relatedTerms: ["Pemilu", "DPR", "DPRD"],
  },
  {
    id: "gl-004",
    term: "DPRD",
    definition:
      "Dewan Perwakilan Rakyat Daerah — Lembaga perwakilan rakyat daerah yang berkedudukan sebagai unsur penyelenggara pemerintahan daerah.",
    relatedTerms: ["Dapil", "Legislatif", "Perda"],
  },
  {
    id: "gl-005",
    term: "DPT",
    definition:
      "Daftar Pemilih Tetap — Hasil pemutakhiran data pemilih yang telah diverifikasi dan disahkan oleh KPU untuk digunakan pada pemungutan suara.",
    relatedTerms: ["KPU", "Pemilu", "Hak Pilih"],
  },
  {
    id: "gl-006",
    term: "Fraksi",
    definition:
      "Wadah berhimpun anggota DPR/DPRD dari partai politik yang sama atau gabungan partai untuk mengoptimalkan pelaksanaan tugas legislatif.",
    relatedTerms: ["DPR", "DPRD", "Partai Politik"],
  },
  {
    id: "gl-007",
    term: "Hak Interpelasi",
    definition:
      "Hak DPR/DPRD untuk meminta keterangan kepada Pemerintah mengenai kebijakan penting dan strategis yang berdampak luas bagi masyarakat.",
    relatedTerms: ["DPR", "Hak Angket", "Pengawasan"],
  },
  {
    id: "gl-008",
    term: "Koalisi",
    definition:
      "Aliansi atau kerja sama antar beberapa partai politik untuk membentuk mayoritas dalam pemerintahan atau mendukung pasangan calon dalam pemilu.",
    relatedTerms: ["Partai Politik", "Pilpres"],
  },
  {
    id: "gl-009",
    term: "KPU",
    definition:
      "Komisi Pemilihan Umum — Lembaga negara yang bersifat nasional, tetap, dan mandiri yang bertugas menyelenggarakan pemilu.",
    relatedTerms: ["Pemilu", "Bawaslu", "DPT"],
  },
  {
    id: "gl-010",
    term: "Legislasi",
    definition:
      "Proses pembuatan atau pembentukan undang-undang dan peraturan daerah yang menjadi wewenang utama badan legislatif.",
    relatedTerms: ["Perda", "DPR", "DPRD"],
  },
  {
    id: "gl-011",
    term: "Mahkamah Konstitusi (MK)",
    definition:
      "Lembaga peradilan tinggi negara yang berwenang menguji undang-undang terhadap UUD 1945 serta memutus perselisihan hasil pemilu.",
    relatedTerms: ["Sengketa Pemilu", "UUD 1945"],
  },
  {
    id: "gl-012",
    term: "Perda",
    definition:
      "Peraturan Daerah — Peraturan perundang-undangan yang dibentuk oleh DPRD dengan persetujuan bersama Kepala Daerah (Gubernur/Bupati/Wali Kota).",
    relatedTerms: ["DPRD", "Legislasi"],
  },
  {
    id: "gl-013",
    term: "RAG (Retrieval-Augmented Generation)",
    definition:
      "Teknologi AI yang memadukan pencarian data kontekstual dari basis pengetahuan terverifikasi sebelum menyusun jawaban guna mencegah halusinasi fakta.",
    relatedTerms: ["AI Neutrality", "Verifikasi"],
  },
  {
    id: "gl-014",
    term: "Threshold (Ambang Batas)",
    definition:
      "Batas minimum persentase perolehan suara atau kursi partai politik untuk dapat menempatkan wakilnya di parlemen atau mengusung calon presiden.",
    relatedTerms: ["Parliamentary Threshold", "Pilpres"],
  },
  {
    id: "gl-015",
    term: "Opini WTP (Wajar Tanpa Pengecualian)",
    definition:
      "Predikat tertinggi dari Badan Pemeriksa Keuangan (BPK) atas audit laporan keuangan pemerintah yang disajikan secara wajar dan akuntabel.",
    relatedTerms: ["BPK", "Transparansi APBD"],
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
