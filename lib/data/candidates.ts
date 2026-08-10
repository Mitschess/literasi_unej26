import { Candidate } from "@/lib/types";
import { mockSources } from "./sources";

const s = mockSources;

export const mockCandidates: Candidate[] = [
  {
    id: "c-001",
    name: "Ahmad Syaifudin",
    slug: "ahmad-syaifudin",
    photoUrl: "/candidates/ahmad.jpg",
    party: {
      id: "p-001",
      name: "Partai Amanat Nusantara",
      shortName: "PAN",
      color: "#1B6CB5",
    },
    election: {
      id: "e-001",
      name: "Pemilu Legislatif 2024",
      type: "Legislatif",
      year: 2024,
      region: "Jawa Timur",
    },
    constituency: {
      id: "d-001",
      name: "Dapil Jawa Timur VII",
      province: "Jawa Timur",
      city: "Jember",
      electionId: "e-001",
    },
    biography:
      "Ahmad Syaifudin adalah legislator berpengalaman yang telah menjabat di DPRD Jawa Timur selama dua periode. Fokus utamanya pada bidang pendidikan dan pemberdayaan UMKM di Jawa Timur bagian timur.",
    education: [
      "S1 Ilmu Politik — Universitas Jember (2005)",
      "S2 Kebijakan Publik — Universitas Indonesia (2010)",
    ],
    occupation: [
      "Anggota DPRD Jawa Timur (2019–2024)",
      "Anggota DPRD Jawa Timur (2014–2019)",
      "Dosen Tamu — Universitas Jember (2010–2014)",
    ],
    publicPositions: [
      "Ketua Komisi IV DPRD Jatim (Pendidikan & Kesehatan)",
      "Wakil Ketua Fraksi di DPRD Jatim",
    ],
    organizations: [
      "Himpunan Mahasiswa Islam (HMI)",
      "Ikatan Cendekiawan Muslim Indonesia (ICMI)",
    ],
    visionMission:
      "Mewujudkan Jawa Timur yang berdaya maju, edukatif, dan sejahtera melalui penguatan pendidikan vokasi, UMKM digital, dan transparansi anggaran publik.",
    programs: [
      "Beasiswa Vokasi untuk 10.000 pemuda Jatim per tahun",
      "Digitalisasi UMKM kecamatan",
      "Portal transparansi APBD real-time",
      "Revitalisasi sekolah desa",
    ],
    claims: [
      {
        id: "cl-001",
        candidateId: "c-001",
        title: "Menjabat sebagai Anggota DPRD Jawa Timur 2019–2024",
        description:
          "Ahmad Syaifudin tercatat sebagai anggota DPRD Provinsi Jawa Timur periode 2019-2024 dari Dapil VII.",
        category: "jabatan",
        periodStart: "2019-10-01",
        periodEnd: "2024-09-30",
        verificationStatus: "verified",
        verificationNote:
          "Dikonfirmasi melalui data DPR dan KPU Jawa Timur.",
        sources: [s[0], s[1]],
        verifiedAt: "2026-07-20",
      },
      {
        id: "cl-002",
        candidateId: "c-001",
        title: "Mengusulkan Perda Transparansi APBD",
        description:
          "Kandidat mengklaim mengusulkan Rancangan Perda tentang transparansi APBD di tingkat provinsi pada tahun 2022.",
        category: "kebijakan",
        periodStart: "2022-03-01",
        periodEnd: "2022-12-01",
        verificationStatus: "partially_verified",
        verificationNote:
          "Perda tersebut terdaftar di DPRD namun peran spesifik kandidat masih perlu ditelusuri lebih lanjut.",
        sources: [s[3]],
        verifiedAt: "2026-08-01",
      },
      {
        id: "cl-003",
        candidateId: "c-001",
        title: "Lulusan S2 Kebijakan Publik UI",
        description:
          "Ahmad Syaifudin menyatakan lulus S2 Kebijakan Publik dari Universitas Indonesia tahun 2010.",
        category: "pendidikan",
        periodStart: "2008-09-01",
        periodEnd: "2010-07-01",
        verificationStatus: "verified",
        verificationNote: "Dikonfirmasi melalui data alumni UI.",
        sources: [s[1]],
        verifiedAt: "2026-07-15",
      },
    ],
    promises: [
      {
        id: "pr-001",
        candidateId: "c-001",
        title: "Beasiswa Vokasi 10.000 Pemuda",
        description:
          "Menyediakan beasiswa pelatihan vokasi untuk 10.000 pemuda Jawa Timur per tahun melalui kerja sama dengan BLK dan universitas.",
        sector: "Pendidikan",
        target: "10.000 penerima per tahun",
        status: "in_progress",
        source: s[4],
        evidences: [
          {
            id: "ev-001",
            promiseId: "pr-001",
            title: "Program Pelatihan BLK-Universitas dimulai",
            description:
              "Kerjasama antara BLK Jember dan Universitas Jember untuk pelatihan vokasi dimulai Maret 2025 dengan 1.200 peserta.",
            source: s[7],
            evidenceDate: "2025-03-01",
            verificationStatus: "verified",
          },
        ],
        createdAt: "2023-12-01",
        updatedAt: "2026-07-01",
      },
      {
        id: "pr-002",
        candidateId: "c-001",
        title: "Digitalisasi UMKM Kecamatan",
        description:
          "Membangun platform digital untuk UMKM di setiap kecamatan di dapil VII Jawa Timur.",
        sector: "Ekonomi",
        target: "50 kecamatan",
        status: "partially_realized",
        source: s[4],
        evidences: [
          {
            id: "ev-002",
            promiseId: "pr-002",
            title: "Peluncuran platform di 12 kecamatan",
            description:
              "Platform e-UMKM diluncurkan di 12 kecamatan Kabupaten Jember pada Januari 2026.",
            source: s[2],
            evidenceDate: "2026-01-15",
            verificationStatus: "verified",
          },
        ],
        createdAt: "2023-12-01",
        updatedAt: "2026-06-01",
      },
      {
        id: "pr-003",
        candidateId: "c-001",
        title: "Portal Transparansi APBD Real-time",
        description:
          "Mendorong pembangunan portal online yang menampilkan realisasi APBD secara real-time untuk publik.",
        sector: "Tata Kelola",
        target: "1 portal provinsi",
        status: "not_started",
        source: s[4],
        evidences: [],
        createdAt: "2023-12-01",
        updatedAt: "2026-08-01",
      },
    ],
    timeline: [
      {
        id: "tl-001",
        candidateId: "c-001",
        year: 2005,
        title: "Lulus S1 Ilmu Politik — Universitas Jember",
        description: "Menyelesaikan pendidikan sarjana di Universitas Jember.",
        category: "pendidikan",
        periodStart: "2001-09-01",
        periodEnd: "2005-07-01",
        sources: [s[1]],
        verificationStatus: "verified",
      },
      {
        id: "tl-002",
        candidateId: "c-001",
        year: 2010,
        title: "Lulus S2 Kebijakan Publik — Universitas Indonesia",
        description: "Menyelesaikan magister di bidang Kebijakan Publik.",
        category: "pendidikan",
        periodStart: "2008-09-01",
        periodEnd: "2010-07-01",
        sources: [s[1]],
        verificationStatus: "verified",
      },
      {
        id: "tl-003",
        candidateId: "c-001",
        year: 2014,
        title: "Terpilih sebagai Anggota DPRD Jawa Timur",
        description:
          "Mulai menjabat sebagai anggota DPRD Jawa Timur periode 2014-2019.",
        category: "jabatan",
        periodStart: "2014-10-01",
        periodEnd: "2019-09-30",
        sources: [s[0], s[1]],
        verificationStatus: "verified",
      },
      {
        id: "tl-004",
        candidateId: "c-001",
        year: 2019,
        title: "Terpilih Kembali — DPRD Jawa Timur",
        description:
          "Menjabat periode kedua di DPRD Jawa Timur 2019-2024, menjadi Ketua Komisi IV.",
        category: "jabatan",
        periodStart: "2019-10-01",
        periodEnd: "2024-09-30",
        sources: [s[0], s[1]],
        verificationStatus: "verified",
      },
      {
        id: "tl-005",
        candidateId: "c-001",
        year: 2022,
        title: "Mengusulkan Perda Transparansi APBD",
        description:
          "Mengusulkan rancangan peraturan daerah tentang transparansi anggaran publik.",
        category: "kebijakan",
        periodStart: "2022-03-01",
        periodEnd: "2022-12-01",
        sources: [s[3]],
        verificationStatus: "partially_verified",
      },
    ],
    performanceMetrics: [
      {
        id: "pm-001",
        candidateId: "c-001",
        label: "Kehadiran Sidang",
        value: "87%",
        description: "Persentase kehadiran di sidang DPRD periode 2019-2024.",
        period: "2019–2024",
        source: s[1],
        verificationStatus: "verified",
      },
      {
        id: "pm-002",
        candidateId: "c-001",
        label: "Inisiatif Legislasi",
        value: "5 Perda",
        description: "Jumlah peraturan daerah yang diinisiasi atau diikuti.",
        period: "2019–2024",
        source: s[1],
        verificationStatus: "partially_verified",
      },
      {
        id: "pm-003",
        candidateId: "c-001",
        label: "Janji Terdata",
        value: "3",
        period: "Kampanye 2024",
        source: s[4],
        verificationStatus: "verified",
      },
    ],
    updatedAt: "2026-08-08",
  },
  {
    id: "c-002",
    name: "Siti Nurhaliza Putri",
    slug: "siti-nurhaliza-putri",
    photoUrl: "/candidates/siti.jpg",
    party: {
      id: "p-002",
      name: "Partai Kebangsaan Rakyat",
      shortName: "PKR",
      color: "#D32F2F",
    },
    election: {
      id: "e-001",
      name: "Pemilu Legislatif 2024",
      type: "Legislatif",
      year: 2024,
      region: "Jawa Timur",
    },
    constituency: {
      id: "d-001",
      name: "Dapil Jawa Timur VII",
      province: "Jawa Timur",
      city: "Jember",
      electionId: "e-001",
    },
    biography:
      "Siti Nurhaliza Putri adalah aktivis sosial dan pengusaha muda yang maju sebagai calon legislatif. Dikenal dengan programnya di bidang kesehatan masyarakat dan pemberdayaan perempuan.",
    education: [
      "S1 Kesehatan Masyarakat — Universitas Airlangga (2012)",
      "S2 Manajemen Rumah Sakit — Universitas Gadjah Mada (2016)",
    ],
    occupation: [
      "Direktur Yayasan Sehat Nusantara (2017–sekarang)",
      "Konsultan Kesehatan WHO Indonesia (2013–2017)",
    ],
    publicPositions: [],
    organizations: [
      "Yayasan Sehat Nusantara (Pendiri)",
      "Ikatan Dokter Indonesia (Anggota Kehormatan)",
      "Forum Perempuan Indonesia",
    ],
    visionMission:
      "Membangun sistem kesehatan masyarakat yang merata, memberdayakan perempuan dalam ekonomi dan politik, serta meningkatkan akses pendidikan kesehatan.",
    programs: [
      "Puskesmas digital di setiap kecamatan",
      "Pelatihan kewirausahaan untuk 5.000 perempuan",
      "Subsidi obat esensial untuk keluarga prasejahtera",
      "Klinik kesehatan mental di setiap kabupaten",
    ],
    claims: [
      {
        id: "cl-004",
        candidateId: "c-002",
        title: "Pendiri Yayasan Sehat Nusantara",
        description:
          "Siti Nurhaliza Putri mengklaim mendirikan Yayasan Sehat Nusantara pada tahun 2017 yang berfokus pada kesehatan masyarakat.",
        category: "organisasi",
        periodStart: "2017-01-01",
        verificationStatus: "verified",
        verificationNote:
          "Terdaftar di Kemenkumham sebagai yayasan resmi.",
        sources: [s[5]],
        verifiedAt: "2026-07-10",
      },
      {
        id: "cl-005",
        candidateId: "c-002",
        title: "Konsultan WHO Indonesia 2013–2017",
        description:
          "Kandidat menyatakan pernah bekerja sebagai konsultan kesehatan pada kantor WHO di Indonesia.",
        category: "pekerjaan",
        periodStart: "2013-06-01",
        periodEnd: "2017-01-01",
        verificationStatus: "needs_review",
        verificationNote:
          "Belum ditemukan konfirmasi langsung dari WHO Indonesia. Sedang dalam proses pemeriksaan.",
        sources: [s[4]],
      },
    ],
    promises: [
      {
        id: "pr-004",
        candidateId: "c-002",
        title: "Puskesmas Digital Kecamatan",
        description:
          "Membangun sistem informasi kesehatan terpadu untuk setiap puskesmas di kecamatan.",
        sector: "Kesehatan",
        target: "Semua kecamatan di Dapil VII",
        status: "not_started",
        source: s[4],
        evidences: [],
        createdAt: "2023-12-01",
        updatedAt: "2026-08-01",
      },
      {
        id: "pr-005",
        candidateId: "c-002",
        title: "Pelatihan Kewirausahaan Perempuan",
        description:
          "Menyediakan pelatihan kewirausahaan untuk 5.000 perempuan di Jawa Timur.",
        sector: "Ekonomi & Pemberdayaan",
        target: "5.000 perempuan",
        status: "in_progress",
        source: s[4],
        evidences: [
          {
            id: "ev-003",
            promiseId: "pr-005",
            title: "Pelatihan batch pertama terlaksana",
            description:
              "800 peserta perempuan telah mengikuti pelatihan kewirausahaan di 3 kabupaten.",
            source: s[7],
            evidenceDate: "2025-06-01",
            verificationStatus: "verified",
          },
        ],
        createdAt: "2023-12-01",
        updatedAt: "2026-06-15",
      },
    ],
    timeline: [
      {
        id: "tl-006",
        candidateId: "c-002",
        year: 2012,
        title: "Lulus S1 Kesehatan Masyarakat — Unair",
        description:
          "Menyelesaikan studi sarjana di Universitas Airlangga.",
        category: "pendidikan",
        periodStart: "2008-09-01",
        periodEnd: "2012-07-01",
        sources: [s[1]],
        verificationStatus: "verified",
      },
      {
        id: "tl-007",
        candidateId: "c-002",
        year: 2013,
        title: "Bergabung WHO Indonesia",
        description: "Mulai bekerja sebagai konsultan kesehatan di WHO Indonesia.",
        category: "jabatan",
        periodStart: "2013-06-01",
        periodEnd: "2017-01-01",
        sources: [s[4]],
        verificationStatus: "needs_review",
      },
      {
        id: "tl-008",
        candidateId: "c-002",
        year: 2017,
        title: "Mendirikan Yayasan Sehat Nusantara",
        description: "Mendirikan yayasan yang berfokus pada kesehatan masyarakat.",
        category: "organisasi",
        periodStart: "2017-01-01",
        sources: [s[5]],
        verificationStatus: "verified",
      },
    ],
    performanceMetrics: [
      {
        id: "pm-004",
        candidateId: "c-002",
        label: "Program Yayasan",
        value: "15 program",
        description:
          "Jumlah program kesehatan yang dijalankan melalui Yayasan Sehat Nusantara.",
        period: "2017–2025",
        source: s[5],
        verificationStatus: "partially_verified",
      },
      {
        id: "pm-005",
        candidateId: "c-002",
        label: "Penerima Manfaat",
        value: "12.000+ orang",
        description: "Total penerima manfaat program yayasan.",
        period: "2017–2025",
        source: s[5],
        verificationStatus: "partially_verified",
      },
    ],
    updatedAt: "2026-08-05",
  },
  {
    id: "c-003",
    name: "Budi Santoso",
    slug: "budi-santoso",
    photoUrl: "/candidates/budi.jpg",
    party: {
      id: "p-003",
      name: "Partai Pembangunan Maju",
      shortName: "PPM",
      color: "#388E3C",
    },
    election: {
      id: "e-001",
      name: "Pemilu Legislatif 2024",
      type: "Legislatif",
      year: 2024,
      region: "Jawa Timur",
    },
    constituency: {
      id: "d-001",
      name: "Dapil Jawa Timur VII",
      province: "Jawa Timur",
      city: "Jember",
      electionId: "e-001",
    },
    biography:
      "Budi Santoso adalah pengusaha di bidang agritech dan mantan kepala dinas pertanian. Berfokus pada modernisasi pertanian dan ketahanan pangan.",
    education: [
      "S1 Pertanian — Institut Pertanian Bogor (2003)",
      "S2 Agribisnis — Institut Pertanian Bogor (2008)",
    ],
    occupation: [
      "CEO AgriTech Nusantara (2018–sekarang)",
      "Kepala Dinas Pertanian Kab. Jember (2013–2018)",
      "Peneliti BPTP Jawa Timur (2008–2013)",
    ],
    publicPositions: [
      "Kepala Dinas Pertanian Kabupaten Jember (2013–2018)",
    ],
    organizations: [
      "Asosiasi Agritech Indonesia",
      "Himpunan Kerukunan Tani Indonesia (HKTI)",
    ],
    visionMission:
      "Meningkatkan kesejahteraan petani melalui teknologi pertanian cerdas, akses pasar digital, dan kebijakan pro-petani yang berbasis data.",
    programs: [
      "Smart farming untuk 20.000 hektar lahan",
      "Marketplace digital petani",
      "Asuransi gagal panen terintegrasi",
      "Pelatihan teknologi pertanian modern",
    ],
    claims: [
      {
        id: "cl-006",
        candidateId: "c-003",
        title: "Kepala Dinas Pertanian Jember 2013–2018",
        description:
          "Budi Santoso menjabat sebagai Kepala Dinas Pertanian Kabupaten Jember selama lima tahun.",
        category: "jabatan",
        periodStart: "2013-01-01",
        periodEnd: "2018-01-01",
        verificationStatus: "verified",
        verificationNote: "Dikonfirmasi melalui data pemerintah daerah.",
        sources: [s[3]],
        verifiedAt: "2026-07-22",
      },
      {
        id: "cl-007",
        candidateId: "c-003",
        title: "Meningkatkan produksi padi 30% selama menjabat",
        description:
          "Kandidat mengklaim produksi padi di Kabupaten Jember meningkat 30% selama kepemimpinannya di Dinas Pertanian.",
        category: "kinerja",
        periodStart: "2013-01-01",
        periodEnd: "2018-01-01",
        verificationStatus: "partially_verified",
        verificationNote:
          "Data BPS menunjukkan peningkatan 22%, bukan 30%. Angka 30% mungkin menggunakan metrik yang berbeda.",
        sources: [s[6], s[3]],
        verifiedAt: "2026-08-02",
      },
    ],
    promises: [
      {
        id: "pr-006",
        candidateId: "c-003",
        title: "Smart Farming 20.000 Hektar",
        description:
          "Implementasi teknologi pertanian cerdas untuk 20.000 hektar lahan di Jawa Timur.",
        sector: "Pertanian",
        target: "20.000 hektar",
        status: "not_started",
        source: s[4],
        evidences: [],
        createdAt: "2023-12-01",
        updatedAt: "2026-08-01",
      },
      {
        id: "pr-007",
        candidateId: "c-003",
        title: "Marketplace Digital Petani",
        description:
          "Membangun platform digital yang menghubungkan petani langsung dengan pembeli.",
        sector: "Ekonomi Digital",
        target: "1 platform provinsi",
        status: "in_progress",
        source: s[4],
        evidences: [
          {
            id: "ev-004",
            promiseId: "pr-007",
            title: "Beta launch platform TaniKu",
            description:
              "Platform TaniKu versi beta diluncurkan untuk 3 kecamatan dengan 200 petani awal.",
            source: s[2],
            evidenceDate: "2026-02-01",
            verificationStatus: "verified",
          },
        ],
        createdAt: "2023-12-01",
        updatedAt: "2026-07-01",
      },
    ],
    timeline: [
      {
        id: "tl-009",
        candidateId: "c-003",
        year: 2003,
        title: "Lulus S1 Pertanian — IPB",
        description: "Menyelesaikan studi sarjana di IPB.",
        category: "pendidikan",
        periodStart: "1999-09-01",
        periodEnd: "2003-07-01",
        sources: [s[1]],
        verificationStatus: "verified",
      },
      {
        id: "tl-010",
        candidateId: "c-003",
        year: 2008,
        title: "Peneliti BPTP Jawa Timur",
        description: "Mulai bekerja sebagai peneliti di Balai Pengkajian Teknologi Pertanian.",
        category: "jabatan",
        periodStart: "2008-01-01",
        periodEnd: "2013-01-01",
        sources: [s[1]],
        verificationStatus: "verified",
      },
      {
        id: "tl-011",
        candidateId: "c-003",
        year: 2013,
        title: "Kepala Dinas Pertanian Kab. Jember",
        description: "Diangkat sebagai Kepala Dinas Pertanian.",
        category: "jabatan",
        periodStart: "2013-01-01",
        periodEnd: "2018-01-01",
        sources: [s[3]],
        verificationStatus: "verified",
      },
      {
        id: "tl-012",
        candidateId: "c-003",
        year: 2018,
        title: "Mendirikan AgriTech Nusantara",
        description: "Mendirikan perusahaan teknologi pertanian.",
        category: "organisasi",
        periodStart: "2018-06-01",
        sources: [s[2]],
        verificationStatus: "verified",
      },
    ],
    performanceMetrics: [
      {
        id: "pm-006",
        candidateId: "c-003",
        label: "Produksi Padi (Kab. Jember)",
        value: "+22%",
        description: "Peningkatan produksi padi selama periode jabatan (data BPS).",
        period: "2013–2018",
        source: s[6],
        verificationStatus: "verified",
      },
      {
        id: "pm-007",
        candidateId: "c-003",
        label: "Pengguna AgriTech",
        value: "5.000+",
        description: "Jumlah petani pengguna platform AgriTech Nusantara.",
        period: "2018–2025",
        source: s[2],
        verificationStatus: "partially_verified",
      },
    ],
    updatedAt: "2026-08-07",
  },
  {
    id: "c-004",
    name: "Dewi Kartika Sari",
    slug: "dewi-kartika-sari",
    photoUrl: "/candidates/dewi.jpg",
    party: {
      id: "p-004",
      name: "Partai Progresif Indonesia",
      shortName: "PPI",
      color: "#7B1FA2",
    },
    election: {
      id: "e-001",
      name: "Pemilu Legislatif 2024",
      type: "Legislatif",
      year: 2024,
      region: "Jawa Timur",
    },
    constituency: {
      id: "d-001",
      name: "Dapil Jawa Timur VII",
      province: "Jawa Timur",
      city: "Jember",
      electionId: "e-001",
    },
    biography:
      "Dewi Kartika Sari adalah akademisi dan pengacara hak asasi manusia. Dikenal sebagai advokat untuk reformasi hukum dan perlindungan hak-hak kelompok rentan.",
    education: [
      "S1 Hukum — Universitas Gadjah Mada (2009)",
      "S2 Hukum Internasional — Leiden University (2013)",
      "PhD Hukum HAM — Australian National University (2018)",
    ],
    occupation: [
      "Dosen Fakultas Hukum — Universitas Brawijaya (2018–sekarang)",
      "Pengacara Publik LBH Surabaya (2009–2011)",
    ],
    publicPositions: [],
    organizations: [
      "Lembaga Bantuan Hukum (LBH) Surabaya",
      "Komnas Perempuan (Staf Ahli)",
      "Indonesian Legal Aid Foundation",
    ],
    visionMission:
      "Memperjuangkan reformasi hukum yang berpihak pada rakyat, memperkuat perlindungan HAM, dan meningkatkan akses keadilan bagi kelompok rentan.",
    programs: [
      "Bantuan hukum gratis untuk warga miskin",
      "Reformasi regulasi daerah yang diskriminatif",
      "Pendidikan hukum untuk masyarakat desa",
      "Perlindungan hak digital warga",
    ],
    claims: [
      {
        id: "cl-008",
        candidateId: "c-004",
        title: "PhD Hukum HAM dari Australian National University",
        description:
          "Dewi Kartika Sari menyatakan melulus program doktoral Hukum HAM dari ANU tahun 2018.",
        category: "pendidikan",
        periodStart: "2014-02-01",
        periodEnd: "2018-06-01",
        verificationStatus: "verified",
        verificationNote: "Dikonfirmasi melalui database thesis ANU.",
        sources: [s[1]],
        verifiedAt: "2026-07-18",
      },
      {
        id: "cl-009",
        candidateId: "c-004",
        title: "Menangani 200+ kasus hak asasi",
        description:
          "Kandidat mengklaim telah menangani lebih dari 200 kasus terkait pelanggaran hak asasi manusia.",
        category: "kinerja",
        periodStart: "2009-01-01",
        periodEnd: "2023-12-31",
        verificationStatus: "unverified",
        verificationNote:
          "Data jumlah kasus spesifik belum dapat diverifikasi secara independen. LBH Surabaya tidak mengeluarkan data per pengacara.",
        sources: [s[4]],
      },
    ],
    promises: [
      {
        id: "pr-008",
        candidateId: "c-004",
        title: "Bantuan Hukum Gratis",
        description:
          "Mendorong alokasi anggaran untuk bantuan hukum gratis bagi warga miskin di Dapil VII.",
        sector: "Hukum",
        target: "1.000 kasus per tahun",
        status: "not_started",
        source: s[4],
        evidences: [],
        createdAt: "2023-12-01",
        updatedAt: "2026-08-01",
      },
    ],
    timeline: [
      {
        id: "tl-013",
        candidateId: "c-004",
        year: 2009,
        title: "Lulus S1 Hukum — UGM",
        description: "Menyelesaikan studi hukum di UGM dengan predikat cum laude.",
        category: "pendidikan",
        periodStart: "2005-09-01",
        periodEnd: "2009-07-01",
        sources: [s[1]],
        verificationStatus: "verified",
      },
      {
        id: "tl-014",
        candidateId: "c-004",
        year: 2009,
        title: "Pengacara Publik LBH Surabaya",
        description: "Bergabung dengan LBH Surabaya sebagai pengacara publik.",
        category: "jabatan",
        periodStart: "2009-08-01",
        periodEnd: "2011-12-31",
        sources: [s[5]],
        verificationStatus: "verified",
      },
      {
        id: "tl-015",
        candidateId: "c-004",
        year: 2018,
        title: "Meraih PhD di ANU Australia",
        description: "Menyelesaikan program doktoral di bidang Hukum HAM.",
        category: "pendidikan",
        periodStart: "2014-02-01",
        periodEnd: "2018-06-01",
        sources: [s[1]],
        verificationStatus: "verified",
      },
    ],
    performanceMetrics: [
      {
        id: "pm-008",
        candidateId: "c-004",
        label: "Publikasi Ilmiah",
        value: "18 paper",
        description: "Jumlah paper di jurnal hukum nasional dan internasional.",
        period: "2013–2025",
        source: s[1],
        verificationStatus: "verified",
      },
    ],
    updatedAt: "2026-08-06",
  },
];

export function getCandidateBySlug(slug: string): Candidate | undefined {
  return mockCandidates.find((c) => c.slug === slug);
}

export function searchCandidates(query: string): Candidate[] {
  const q = query.toLowerCase();
  return mockCandidates.filter(
    (c) =>
      c.name.toLowerCase().includes(q) ||
      c.party.name.toLowerCase().includes(q) ||
      c.party.shortName.toLowerCase().includes(q) ||
      c.constituency.name.toLowerCase().includes(q) ||
      c.constituency.province.toLowerCase().includes(q)
  );
}

export function filterCandidates(filters: {
  party?: string;
  province?: string;
  electionType?: string;
}): Candidate[] {
  return mockCandidates.filter((c) => {
    if (filters.party && c.party.shortName !== filters.party) return false;
    if (filters.province && c.constituency.province !== filters.province)
      return false;
    if (filters.electionType && c.election.type !== filters.electionType)
      return false;
    return true;
  });
}
