// ============================================================
// POLITRACK — Quiz "Bijak Memilih" Data
// Interactive quiz to discover political preferences
// ============================================================

export interface QuizQuestion {
  id: string;
  category: string;
  categoryIcon: string;
  question: string;
  options: QuizOption[];
}

export interface QuizOption {
  id: string;
  text: string;
  /** Maps candidate IDs to alignment scores (0-3) */
  scores: Record<string, number>;
}

export interface QuizResult {
  candidateId: string;
  candidateName: string;
  matchPercentage: number;
  topIssues: string[];
}

export const quizCategories = [
  { id: "ekonomi", label: "Ekonomi & Industri" },
  { id: "lingkungan", label: "Krisis Iklim & Lingkungan" },
  { id: "hukum", label: "Hukum & Tata Kelola" },
  { id: "sosial", label: "Kesetaraan & Sosial" },
  { id: "pendidikan", label: "Pendidikan & Kesehatan" },
  { id: "hubungan", label: "Hubungan Internasional" },
];

export const quizQuestions: QuizQuestion[] = [
  // ---- EKONOMI ----
  {
    id: "q-01",
    category: "ekonomi",
    categoryIcon: "📊",
    question: "Menurut Anda, apa prioritas utama untuk ekonomi Indonesia?",
    options: [
      {
        id: "q01-a",
        text: "Reindustrialisasi dan pemerataan pembangunan ke seluruh wilayah Indonesia",
        scores: { "c-001": 3, "c-003": 1, "c-005": 2 },
      },
      {
        id: "q01-b",
        text: "Hilirisasi komoditas dan swasembada energi melalui biofuel",
        scores: { "c-001": 1, "c-003": 3, "c-005": 2 },
      },
      {
        id: "q01-c",
        text: "Optimalisasi infrastruktur yang sudah ada dan diversifikasi ekonomi",
        scores: { "c-001": 2, "c-003": 2, "c-005": 3 },
      },
    ],
  },
  {
    id: "q-02",
    category: "ekonomi",
    categoryIcon: "📊",
    question: "Bagaimana pendekatan terbaik untuk mendukung UMKM?",
    options: [
      {
        id: "q02-a",
        text: "Menguatkan kapasitas produksi, fasilitas, dan pemasaran untuk pelaku UMKM",
        scores: { "c-001": 3, "c-003": 1, "c-005": 2 },
      },
      {
        id: "q02-b",
        text: "Inkubasi lengkap dari packaging, branding, marketing online, hingga off-taker",
        scores: { "c-001": 1, "c-003": 3, "c-005": 2 },
      },
      {
        id: "q02-c",
        text: "Kurasi e-catalogue lokal untuk UMKM agar masuk ke pengadaan pemerintah",
        scores: { "c-001": 2, "c-003": 2, "c-005": 3 },
      },
    ],
  },
  {
    id: "q-03",
    category: "ekonomi",
    categoryIcon: "📊",
    question: "Pendekatan seperti apa yang tepat untuk food estate/ketahanan pangan?",
    options: [
      {
        id: "q03-a",
        text: "Food estate gagal, perlu evaluasi dan fokus pada produktivitas petani",
        scores: { "c-001": 3, "c-003": 1, "c-005": 2 },
      },
      {
        id: "q03-b",
        text: "Food estate butuh waktu, harus dilanjutkan dengan perbaikan",
        scores: { "c-001": 1, "c-003": 3, "c-005": 1 },
      },
      {
        id: "q03-c",
        text: "Food estate gagal, perlu pendataan lahan, petani dan diversifikasi pangan",
        scores: { "c-001": 2, "c-003": 1, "c-005": 3 },
      },
    ],
  },
  // ---- LINGKUNGAN ----
  {
    id: "q-04",
    category: "lingkungan",
    categoryIcon: "🌿",
    question: "Apa langkah paling penting untuk transisi energi Indonesia?",
    options: [
      {
        id: "q04-a",
        text: "Energi berkeadilan — intervensi di wilayah yang bergantung pada fosil",
        scores: { "c-001": 3, "c-003": 1, "c-005": 2 },
      },
      {
        id: "q04-b",
        text: "Swasembada energi 100% dari biofuel (sawit, jagung, tebu)",
        scores: { "c-001": 1, "c-003": 3, "c-005": 1 },
      },
      {
        id: "q04-c",
        text: "Membangun ecoport dan hilirisasi menuju transportasi elektrik",
        scores: { "c-001": 2, "c-003": 2, "c-005": 3 },
      },
    ],
  },
  {
    id: "q-05",
    category: "lingkungan",
    categoryIcon: "🌿",
    question: "Bagaimana cara menangani polusi dan dampak lingkungan?",
    options: [
      {
        id: "q05-a",
        text: "Uji emisi wajib, elektrifikasi dan konversi kendaraan umum",
        scores: { "c-001": 3, "c-003": 1, "c-005": 2 },
      },
      {
        id: "q05-b",
        text: "Penegakan hukum tegas bagi perusahaan yang merusak lingkungan",
        scores: { "c-001": 1, "c-003": 3, "c-005": 2 },
      },
      {
        id: "q05-c",
        text: "Mendorong desa-desa mandiri energi dan waste energi",
        scores: { "c-001": 2, "c-003": 1, "c-005": 3 },
      },
    ],
  },
  // ---- HUKUM & TATA KELOLA ----
  {
    id: "q-06",
    category: "hukum",
    categoryIcon: "⚖️",
    question: "Langkah prioritas untuk pemberantasan korupsi?",
    options: [
      {
        id: "q06-a",
        text: "Revisi UU KPK agar menjadi lembaga kuat kembali + UU perampasan aset",
        scores: { "c-001": 3, "c-003": 1, "c-005": 2 },
      },
      {
        id: "q06-b",
        text: "Memperkuat badan-badan anti-korupsi dan memperbaiki gaji ASN",
        scores: { "c-001": 1, "c-003": 3, "c-005": 2 },
      },
      {
        id: "q06-c",
        text: "UU perampasan aset + sistem meritokrasi tanpa jual beli jabatan",
        scores: { "c-001": 2, "c-003": 1, "c-005": 3 },
      },
    ],
  },
  {
    id: "q-07",
    category: "hukum",
    categoryIcon: "⚖️",
    question: "Sikap Anda terhadap kebebasan berpendapat dan mengkritik pemerintah?",
    options: [
      {
        id: "q07-a",
        text: "Harus memberi ruang kebebasan penuh, kampus harus berani bicara",
        scores: { "c-001": 3, "c-003": 2, "c-005": 2 },
      },
      {
        id: "q07-b",
        text: "Bebas berpendapat untuk check and balance, tapi harus bertanggung jawab",
        scores: { "c-001": 1, "c-003": 3, "c-005": 2 },
      },
      {
        id: "q07-c",
        text: "Tidak akan memenjarakan yang mengkritik selama menjabat",
        scores: { "c-001": 2, "c-003": 2, "c-005": 3 },
      },
    ],
  },
  // ---- KESETARAAN & SOSIAL ----
  {
    id: "q-08",
    category: "sosial",
    categoryIcon: "🤝",
    question: "Pendekatan terbaik untuk pekerja informal dan sektor non-formal?",
    options: [
      {
        id: "q08-a",
        text: "Ubah regulasi KPR agar pekerja informal bisa mengakses kredit rumah",
        scores: { "c-001": 3, "c-003": 1, "c-005": 2 },
      },
      {
        id: "q08-b",
        text: "Lanjutkan program yang sudah berjalan (KIS, KIP, PKH)",
        scores: { "c-001": 1, "c-003": 3, "c-005": 2 },
      },
      {
        id: "q08-c",
        text: "Jamin struktur upah adil + sediakan hunian dekat pusat ekonomi dan transportasi",
        scores: { "c-001": 2, "c-003": 2, "c-005": 3 },
      },
    ],
  },
  {
    id: "q-09",
    category: "sosial",
    categoryIcon: "🤝",
    question: "Bagaimana seharusnya negara menangani isu kesetaraan gender?",
    options: [
      {
        id: "q09-a",
        text: "Cuti ayah, penitipan anak, dan jaminan perempuan di proses politik",
        scores: { "c-001": 3, "c-003": 2, "c-005": 2 },
      },
      {
        id: "q09-b",
        text: "Menguatkan pemberdayaan perempuan dan memastikan kebijakan berperspektif gender",
        scores: { "c-001": 2, "c-003": 3, "c-005": 2 },
      },
      {
        id: "q09-c",
        text: "Menambah cuti melahirkan ibu dan ayah dengan tunjangan 100%",
        scores: { "c-001": 2, "c-003": 1, "c-005": 3 },
      },
    ],
  },
  // ---- PENDIDIKAN & KESEHATAN ----
  {
    id: "q-10",
    category: "pendidikan",
    categoryIcon: "🎓",
    question: "Bagaimana cara terbaik untuk meningkatkan kualitas pendidikan?",
    options: [
      {
        id: "q10-a",
        text: "Investasi pada guru (gaji tinggi) melalui Dana Abadi Guru, bukan ubah kurikulum",
        scores: { "c-001": 3, "c-003": 2, "c-005": 2 },
      },
      {
        id: "q10-b",
        text: "Pendidikan berbasis riset, inovasi, dan delapan karakter utama bangsa",
        scores: { "c-001": 1, "c-003": 3, "c-005": 2 },
      },
      {
        id: "q10-c",
        text: "Pendidikan kontekstual (isu iklim, digitalisasi) + naikkan gaji guru bertahap",
        scores: { "c-001": 2, "c-003": 2, "c-005": 3 },
      },
    ],
  },
  {
    id: "q-11",
    category: "pendidikan",
    categoryIcon: "🎓",
    question: "Pendekatan terbaik untuk menyelesaikan masalah stunting dan kesehatan ibu-anak?",
    options: [
      {
        id: "q11-a",
        text: "Memastikan pasokan gizi ibu hamil dari level pemerintah pusat",
        scores: { "c-001": 3, "c-003": 2, "c-005": 2 },
      },
      {
        id: "q11-b",
        text: "Makan siang dan susu gratis di sekolah + Kartu Anak Sehat",
        scores: { "c-001": 1, "c-003": 3, "c-005": 1 },
      },
      {
        id: "q11-c",
        text: "Program 1000 hari pertama dan satu desa satu puskesmas satu nakes",
        scores: { "c-001": 2, "c-003": 2, "c-005": 3 },
      },
    ],
  },
  // ---- HUBUNGAN INTERNASIONAL ----
  {
    id: "q-12",
    category: "hubungan",
    categoryIcon: "🌏",
    question: "Bagaimana seharusnya posisi Indonesia di panggung internasional?",
    options: [
      {
        id: "q12-a",
        text: "Lebih fokus pada kerjasama ekonomi, hindari aliansi militer agar tetap netral",
        scores: { "c-001": 3, "c-003": 1, "c-005": 2 },
      },
      {
        id: "q12-b",
        text: "Menjadi perantara netral dunia dengan militer yang kuat",
        scores: { "c-001": 1, "c-003": 3, "c-005": 2 },
      },
      {
        id: "q12-c",
        text: "Politik luar negeri bebas aktif, menjadi hub manufaktur alternatif",
        scores: { "c-001": 2, "c-003": 2, "c-005": 3 },
      },
    ],
  },
];

export function calculateQuizResults(
  answers: Record<string, string>
): QuizResult[] {
  const candidateScores: Record<string, number> = {};
  const candidateTopics: Record<string, Set<string>> = {};
  let maxPossible = 0;

  for (const question of quizQuestions) {
    const selectedOptionId = answers[question.id];
    if (!selectedOptionId) continue;

    const option = question.options.find((o) => o.id === selectedOptionId);
    if (!option) continue;

    maxPossible += 3; // max score per question

    for (const [candidateId, score] of Object.entries(option.scores)) {
      if (!candidateScores[candidateId]) {
        candidateScores[candidateId] = 0;
        candidateTopics[candidateId] = new Set();
      }
      candidateScores[candidateId] += score;

      if (score >= 2) {
        candidateTopics[candidateId].add(question.category);
      }
    }
  }

  const candidateNames: Record<string, string> = {
    "c-001": "Anies & Cak Imin (No. 1)",
    "c-003": "Prabowo & Gibran (No. 2)",
    "c-005": "Ganjar & Mahfud (No. 3)",
  };

  const categoryLabels: Record<string, string> = {
    ekonomi: "Ekonomi & Industri",
    lingkungan: "Lingkungan",
    hukum: "Hukum & Tata Kelola",
    sosial: "Kesetaraan Sosial",
    pendidikan: "Pendidikan & Kesehatan",
    hubungan: "Hubungan Internasional",
  };

  return Object.entries(candidateScores)
    .map(([candidateId, score]) => ({
      candidateId,
      candidateName: candidateNames[candidateId] || candidateId,
      matchPercentage: maxPossible > 0 ? Math.round((score / maxPossible) * 100) : 0,
      topIssues: Array.from(candidateTopics[candidateId] || []).map(
        (c) => categoryLabels[c] || c
      ),
    }))
    .sort((a, b) => b.matchPercentage - a.matchPercentage);
}
