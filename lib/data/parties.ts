export interface PartyTrackRecord {
  id: string;
  year: number;
  title: string;
  description: string;
  category: "prestasi" | "kontroversi" | "kebijakan" | "pemilu";
  sentiment: "positive" | "negative" | "neutral";
}

export interface PartyElectionResult {
  year: number;
  electionType: string;
  votes: number;
  percentage: number;
  seats: number;
  totalSeats: number;
  rank: number;
}

export interface Party {
  id: string;
  slug: string;
  name: string;
  shortName: string;
  logoUrl: string;
  color: string;
  secondaryColor?: string;
  founded: number;
  chairman: string;
  ideology: string[];
  spectrum: "kiri" | "tengah-kiri" | "tengah" | "tengah-kanan" | "kanan";
  description: string;
  vision: string;
  mission: string[];
  keyPrograms: string[];
  focusAreas: string[];
  trackRecords: PartyTrackRecord[];
  electionResults: PartyElectionResult[];
  headOffice: string;
  website?: string;
  dprSeats2024: number;
  memberCount: string;
}

export const mockParties: Party[] = [
  {
    id: "p-001",
    slug: "pdi-p",
    name: "Partai Demokrasi Indonesia Perjuangan",
    shortName: "PDI-P",
    logoUrl: "/images/parpol/pdi.png",
    color: "#B71C1C",
    secondaryColor: "#E53935",
    founded: 1999,
    chairman: "Megawati Soekarnoputri",
    ideology: ["Nasionalisme", "Demokrasi Sosial", "Pancasila"],
    spectrum: "tengah-kiri",
    description:
      "PDI-P adalah partai berhaluan nasionalis-sosial demokrat yang didirikan oleh Megawati Soekarnoputri. Partai ini merupakan penerus PDI era Orde Baru dan menjadi kekuatan oposisi utama selama reformasi. Kemenangan besar di Pemilu 2014 dan 2019 menjadikannya partai penguasa selama satu dekade.",
    vision:
      "Terwujudnya cita-cita Proklamasi 17 Agustus 1945 sebagaimana yang dimaksud dalam Pembukaan Undang-Undang Dasar Negara Republik Indonesia Tahun 1945 melalui pembangunan jalan tengah yang berkeadaban dan berkeadilan.",
    mission: [
      "Memperjuangkan hak-hak rakyat Indonesia lewat demokrasi Pancasila.",
      "Mewujudkan pemerintahan yang bersih, transparan, dan berwibawa.",
      "Membangun ekonomi kerakyatan yang berkeadilan dan berdaulat.",
      "Memperkuat persatuan dan kesatuan bangsa berdasarkan Bhinneka Tunggal Ika.",
      "Menegakkan hukum secara adil dan merata bagi seluruh warga negara.",
    ],
    keyPrograms: [
      "Program KUR (Kredit Usaha Rakyat) untuk UMKM",
      "Sekolah Kejuruan Gratis (SMK Gratis)",
      "Program 1 Juta Rumah untuk Rakyat",
      "Kartu Tani & Subsidi Pupuk Berkeadilan",
      "Perlindungan Buruh & Pekerja Informal",
    ],
    focusAreas: ["Ekonomi Kerakyatan", "Pendidikan", "Pertanian", "Ketenagakerjaan", "Keadilan Sosial"],
    trackRecords: [
      {
        id: "tr-pdip-1",
        year: 2014,
        title: "Mengusung Joko Widodo sebagai Presiden RI",
        description:
          "PDI-P berhasil mengusung Joko Widodo sebagai calon presiden dan memenangkan Pilpres 2014, mengakhiri era pemerintahan Susilo Bambang Yudhoyono.",
        category: "pemilu",
        sentiment: "positive",
      },
      {
        id: "tr-pdip-2",
        year: 2019,
        title: "Raih Suara Terbanyak di Pileg 2019",
        description:
          "PDI-P meraih 27,05 juta suara (19,33%) di Pileg 2019, menjadi partai pertama dengan perolehan kursi DPR terbanyak sejak era reformasi.",
        category: "pemilu",
        sentiment: "positive",
      },
      {
        id: "tr-pdip-3",
        year: 2021,
        title: "Kasus Korupsi Wahyu Setiawan",
        description:
          "Komisioner KPU Wahyu Setiawan terjerat korupsi janji pemenangan PAW DPR terkait kader PDI-P, menimbulkan sorotan terhadap integritas partai.",
        category: "kontroversi",
        sentiment: "negative",
      },
      {
        id: "tr-pdip-4",
        year: 2024,
        title: "Gagal Pertahankan Kursi Presiden di Pilpres 2024",
        description:
          "Ganjar Pranowo yang diusung PDI-P kalah dalam Pilpres 2024, mengakhiri era kepemimpinan koalisi berbasis PDI-P selama satu dekade.",
        category: "pemilu",
        sentiment: "negative",
      },
    ],
    electionResults: [
      { year: 2014, electionType: "Legislatif", votes: 23681471, percentage: 18.95, seats: 109, totalSeats: 560, rank: 1 },
      { year: 2019, electionType: "Legislatif", votes: 27053961, percentage: 19.33, seats: 128, totalSeats: 575, rank: 1 },
      { year: 2024, electionType: "Legislatif", votes: 25387279, percentage: 16.72, seats: 110, totalSeats: 580, rank: 1 },
    ],
    headOffice: "Jakarta Selatan, DKI Jakarta",
    dprSeats2024: 110,
    memberCount: "5 Juta+",
  },
  {
    id: "p-002",
    slug: "golkar",
    name: "Partai Golongan Karya",
    shortName: "Golkar",
    logoUrl: "/images/parpol/golkar.png",
    color: "#F9A825",
    secondaryColor: "#FFD600",
    founded: 1964,
    chairman: "Bahlil Lahadalia",
    ideology: ["Nasionalisme", "Demokrasi Pancasila", "Pembangunanisme"],
    spectrum: "tengah",
    description:
      "Golkar adalah salah satu partai tertua Indonesia, warisan dari organisasi politik era Orde Baru. Selama 32 tahun Soeharto berkuasa, Golkar menjadi mesin politik utama pemerintahan. Pasca reformasi, partai ini bertransformasi menjadi partai tengah dengan basis massa luas di birokrasi dan kalangan pengusaha.",
    vision:
      "Terwujudnya Indonesia yang maju, modern, bersatu, dan berkeadilan sosial berdasarkan Pancasila dan UUD 1945.",
    mission: [
      "Memperjuangkan tegaknya demokrasi Pancasila yang berkeadaban.",
      "Mendorong pembangunan ekonomi nasional yang tumbuh dan berkeadilan.",
      "Membangun birokrasi yang profesional, bersih, dan berorientasi pelayanan.",
      "Memperkuat persatuan nasional dalam bingkai Bhinneka Tunggal Ika.",
      "Meningkatkan kesejahteraan rakyat melalui program-program nyata.",
    ],
    keyPrograms: [
      "Optimalisasi Dana Desa & Pemberdayaan Desa",
      "Penguatan UMKM & Koperasi Nasional",
      "Infrastruktur Jalan & Konektivitas Daerah",
      "Beasiswa Pendidikan Golkar untuk Anak Bangsa",
      "Program Kewirausahaan Pemuda",
    ],
    focusAreas: ["Pembangunan Infrastruktur", "UMKM", "Birokrasi", "Stabilitas Politik", "Ekonomi"],
    trackRecords: [
      {
        id: "tr-golkar-1",
        year: 2019,
        title: "Bergabung dalam Koalisi Jokowi-Ma'ruf",
        description:
          "Golkar memilih bergabung dalam koalisi pendukung Jokowi-Ma'ruf Amin di Pilpres 2019, meraih kursi kementerian dalam pemerintahan.",
        category: "kebijakan",
        sentiment: "neutral",
      },
      {
        id: "tr-golkar-2",
        year: 2022,
        title: "Setya Novanto Terjerat Korupsi e-KTP",
        description:
          "Mantan Ketua Umum Golkar, Setya Novanto, divonis 15 tahun penjara atas kasus korupsi proyek e-KTP senilai Rp 2,3 triliun.",
        category: "kontroversi",
        sentiment: "negative",
      },
      {
        id: "tr-golkar-3",
        year: 2024,
        title: "Mendukung Koalisi Prabowo-Gibran",
        description:
          "Golkar menjadi pendukung utama pasangan Prabowo Subianto–Gibran Rakabuming yang menang Pilpres 2024 dengan selisih suara signifikan.",
        category: "pemilu",
        sentiment: "positive",
      },
    ],
    electionResults: [
      { year: 2014, electionType: "Legislatif", votes: 18432312, percentage: 14.75, seats: 91, totalSeats: 560, rank: 2 },
      { year: 2019, electionType: "Legislatif", votes: 22151979, percentage: 12.31, seats: 85, totalSeats: 575, rank: 3 },
      { year: 2024, electionType: "Legislatif", votes: 23208654, percentage: 15.28, seats: 102, totalSeats: 580, rank: 2 },
    ],
    headOffice: "Jakarta Barat, DKI Jakarta",
    dprSeats2024: 102,
    memberCount: "7 Juta+",
  },
  {
    id: "p-003",
    slug: "gerindra",
    name: "Partai Gerakan Indonesia Raya",
    shortName: "Gerindra",
    logoUrl: "/images/parpol/gerindra.png",
    color: "#C62828",
    secondaryColor: "#E53935",
    founded: 2008,
    chairman: "Prabowo Subianto",
    ideology: ["Nasionalisme", "Ekonomi Kerakyatan", "Kedaulatan Nasional"],
    spectrum: "tengah-kanan",
    description:
      "Gerindra didirikan oleh Prabowo Subianto pada 2008. Partai ini berkembang pesat dengan menempatkan nasionalisme dan kemandirian ekonomi sebagai platform utamanya. Prabowo maju di Pilpres 2014, 2019 (dua kali kalah), sebelum akhirnya memenangkan Pilpres 2024.",
    vision:
      "Terwujudnya kehidupan rakyat yang merdeka, berdaulat, serta bangsa yang mandiri, adil, dan makmur berdasarkan Pancasila dan UUD 1945.",
    mission: [
      "Membangun ekonomi yang kuat, mandiri, dan berdaulat.",
      "Mewujudkan Indonesia yang berdaulat di bidang pangan dan energi.",
      "Membangun TNI dan Polri yang profesional dan kuat.",
      "Menegakkan hukum yang tegas dan berkeadilan.",
      "Mensejahterakan rakyat melalui program nyata pro-rakyat.",
    ],
    keyPrograms: [
      "Program Makan Bergizi Gratis untuk 82,9 Juta Penerima",
      "Swasembada Pangan & Lumbung Pangan Nasional",
      "Modernisasi Alutsista TNI (Jet Rafale, F-15EX)",
      "Hilirisasi Industri & Energi Biofuel (B50/E100)",
      "Pembangunan 3 Juta Rumah untuk Rakyat",
    ],
    focusAreas: ["Pertahanan & Keamanan", "Ketahanan Pangan", "Energi Nasional", "Kesejahteraan Sosial", "Ekonomi"],
    trackRecords: [
      {
        id: "tr-gerindra-1",
        year: 2014,
        title: "Prabowo Kalah di Pilpres 2014",
        description:
          "Prabowo-Hatta kalah dari Jokowi-JK di Pilpres 2014 dengan selisih sekitar 6 persen suara nasional.",
        category: "pemilu",
        sentiment: "negative",
      },
      {
        id: "tr-gerindra-2",
        year: 2019,
        title: "Gerindra Jadi Oposisi Utama di DPR",
        description:
          "Setelah Prabowo kembali kalah di Pilpres 2019, Gerindra memilih berada di luar koalisi pemerintahan Jokowi sebagai oposisi yang kritis.",
        category: "kebijakan",
        sentiment: "neutral",
      },
      {
        id: "tr-gerindra-3",
        year: 2024,
        title: "Prabowo Menangkan Pilpres 2024",
        description:
          "Prabowo Subianto memenangkan Pilpres 2024 dengan 58,6% suara, mengakhiri perjalanan panjangnya menuju kursi presiden.",
        category: "pemilu",
        sentiment: "positive",
      },
    ],
    electionResults: [
      { year: 2014, electionType: "Legislatif", votes: 14760371, percentage: 11.81, seats: 73, totalSeats: 560, rank: 3 },
      { year: 2019, electionType: "Legislatif", votes: 17594839, percentage: 12.57, seats: 78, totalSeats: 575, rank: 2 },
      { year: 2024, electionType: "Legislatif", votes: 20071016, percentage: 13.22, seats: 86, totalSeats: 580, rank: 3 },
    ],
    headOffice: "Jakarta Selatan, DKI Jakarta",
    dprSeats2024: 86,
    memberCount: "4 Juta+",
  },
  {
    id: "p-004",
    slug: "pkb",
    name: "Partai Kebangkitan Bangsa",
    shortName: "PKB",
    logoUrl: "/images/parpol/PKB.png",
    color: "#1B5E20",
    secondaryColor: "#388E3C",
    founded: 1998,
    chairman: "Muhaimin Iskandar",
    ideology: ["Islam Moderat", "Nasionalisme", "Demokrasi", "Ahlus Sunnah wal Jamaah"],
    spectrum: "tengah",
    description:
      "PKB lahir pasca reformasi 1998 sebagai representasi politik warga Nahdlatul Ulama (NU). Berbasis komunitas pesantren, PKB mengusung Islam Nusantara yang moderat dan inklusif. Di bawah kepemimpinan Muhaimin Iskandar, partai ini aktif memperjuangkan kepentingan petani, buruh, dan masyarakat desa.",
    vision:
      "Terwujudnya masyarakat Indonesia yang adil, beradab, dan sejahtera berdasarkan Pancasila dan nilai-nilai agama yang moderat.",
    mission: [
      "Memperjuangkan Islam yang rahmatan lil 'alamin dalam kehidupan berbangsa.",
      "Mewujudkan pemerataan pembangunan pedesaan melalui dana desa.",
      "Melindungi hak-hak petani, nelayan, dan pekerja informal.",
      "Membangun pendidikan pesantren yang berkualitas dan modern.",
      "Mendorong demokrasi yang bermartabat dan berkeadaban.",
    ],
    keyPrograms: [
      "Dana Desa Rp 5 Miliar Per Desa Per Tahun",
      "Revitalisasi Pesantren & Santripreneur",
      "Subsidi Pupuk & Perlindungan Petani",
      "Sertifikasi Vokasi Gratis Anak Muda",
      "Jaminan Sosial Pekerja Informal",
    ],
    focusAreas: ["Pemberdayaan Desa", "Pendidikan Agama", "Pertanian", "Komunitas NU", "Ketenagakerjaan"],
    trackRecords: [
      {
        id: "tr-pkb-1",
        year: 1999,
        title: "Abdurrahman Wahid (Gus Dur) Terpilih sebagai Presiden RI",
        description:
          "Tokoh sentral PKB, Abdurrahman Wahid atau Gus Dur, terpilih menjadi Presiden RI ke-4 lewat pemungutan suara di DPR/MPR.",
        category: "pemilu",
        sentiment: "positive",
      },
      {
        id: "tr-pkb-2",
        year: 2021,
        title: "Konflik Internal PKB & Kepemimpinan Muhaimin",
        description:
          "PKB menghadapi dinamika internal terkait kepemimpinan Muhaimin Iskandar yang sempat mendapat gugatan dari PBNU.",
        category: "kontroversi",
        sentiment: "negative",
      },
      {
        id: "tr-pkb-3",
        year: 2024,
        title: "Muhaimin Maju sebagai Cawapres Anies",
        description:
          "Muhaimin Iskandar maju bersama Anies Baswedan di Pilpres 2024 namun kalah dari Prabowo-Gibran di putaran pertama.",
        category: "pemilu",
        sentiment: "neutral",
      },
    ],
    electionResults: [
      { year: 2014, electionType: "Legislatif", votes: 11298957, percentage: 9.04, seats: 47, totalSeats: 560, rank: 5 },
      { year: 2019, electionType: "Legislatif", votes: 13570970, percentage: 9.69, seats: 58, totalSeats: 575, rank: 4 },
      { year: 2024, electionType: "Legislatif", votes: 16115655, percentage: 10.62, seats: 68, totalSeats: 580, rank: 4 },
    ],
    headOffice: "Jakarta Pusat, DKI Jakarta",
    dprSeats2024: 68,
    memberCount: "5 Juta+",
  },
  {
    id: "p-005",
    slug: "nasdem",
    name: "Partai Nasional Demokrat",
    shortName: "NasDem",
    logoUrl: "/images/parpol/nasdem.png",
    color: "#002B7F",
    secondaryColor: "#1565C0",
    founded: 2011,
    chairman: "Surya Paloh",
    ideology: ["Nasionalisme", "Restorasi Indonesia", "Demokrasi Liberal"],
    spectrum: "tengah",
    description:
      "NasDem adalah partai yang lahir dari gerakan sosial yang diinisiasi oleh media mogul Surya Paloh. Mengkampanyekan 'Restorasi Indonesia', NasDem menekankan pembaruan politik, anti-korupsi, dan penguatan institusi demokrasi. Pada Pemilu 2024, NasDem maju bersama Anies Baswedan.",
    vision:
      "Terwujudnya Indonesia yang berdaulat, maju, adil, dan makmur melalui restorasi Indonesia yang berkelanjutan.",
    mission: [
      "Memulihkan kedaulatan rakyat dari cengkeraman oligarki dan korupsi.",
      "Membangun sistem pemerintahan yang transparan dan akuntabel.",
      "Mendorong pertumbuhan ekonomi yang inklusif berbasis inovasi.",
      "Memperkuat demokrasi dan kebebasan sipil.",
      "Menjaga persatuan dan toleransi dalam kebhinnekaan Indonesia.",
    ],
    keyPrograms: [
      "Restorasi Institusi Demokrasi & KPK",
      "Integrasi Transportasi Publik Perkotaan",
      "Beasiswa NasDem untuk Generasi Muda",
      "Akses Internet & Transformasi Digital Desa",
      "Perlindungan Kebebasan Pers & Demokrasi",
    ],
    focusAreas: ["Reformasi Politik", "Pendidikan", "Demokrasi", "Media", "Teknologi"],
    trackRecords: [
      {
        id: "tr-nasdem-1",
        year: 2019,
        title: "Mendukung Koalisi Jokowi-Ma'ruf Amin",
        description:
          "NasDem bergabung dalam koalisi pemenang Pilpres 2019, meraih kursi kementerian di Kabinet Indonesia Maju.",
        category: "kebijakan",
        sentiment: "positive",
      },
      {
        id: "tr-nasdem-2",
        year: 2023,
        title: "Mendeklarasikan Anies Baswedan sebagai Capres",
        description:
          "NasDem mengejutkan publik dengan mendeklarasikan Anies Baswedan sebagai calon presiden 2024, memutus hubungan dengan koalisi Jokowi.",
        category: "kebijakan",
        sentiment: "neutral",
      },
      {
        id: "tr-nasdem-3",
        year: 2024,
        title: "Johnny G. Plate Terjerat Kasus Korupsi BTS",
        description:
          "Menteri Komunikasi Johnny G. Plate dari NasDem divonis 15 tahun penjara atas korupsi proyek BTS Kominfo senilai Rp 8 triliun.",
        category: "kontroversi",
        sentiment: "negative",
      },
    ],
    electionResults: [
      { year: 2014, electionType: "Legislatif", votes: 8402812, percentage: 6.72, seats: 35, totalSeats: 560, rank: 8 },
      { year: 2019, electionType: "Legislatif", votes: 12661792, percentage: 9.05, seats: 59, totalSeats: 575, rank: 5 },
      { year: 2024, electionType: "Legislatif", votes: 11279944, percentage: 7.43, seats: 69, totalSeats: 580, rank: 5 },
    ],
    headOffice: "Jakarta Pusat, DKI Jakarta",
    dprSeats2024: 69,
    memberCount: "2 Juta+",
  },
  {
    id: "p-006",
    slug: "pks",
    name: "Partai Keadilan Sejahtera",
    shortName: "PKS",
    logoUrl: "/images/parpol/pks.png",
    color: "#558B2F",
    secondaryColor: "#689F38",
    founded: 2003,
    chairman: "Ahmad Syaikhu",
    ideology: ["Islam", "Demokrasi Islam", "Kesejahteraan Sosial"],
    spectrum: "tengah-kanan",
    description:
      "PKS adalah partai Islam berbasis kader yang terkenal dengan disiplin organisasi tinggi dan jaringan relawan aktif. Partai ini lahir dari gerakan Tarbiyah di kampus-kampus Islam dan menjadi representasi Islam politik yang mengakar di kalangan muda terdidik dan perkotaan.",
    vision:
      "Terwujudnya masyarakat madani yang adil, sejahtera, dan bermartabat dalam wadah Negara Kesatuan Republik Indonesia yang berdasarkan Pancasila.",
    mission: [
      "Membangun kader-kader bangsa yang bertaqwa dan profesional.",
      "Memperjuangkan nilai-nilai Islam dalam kebijakan publik.",
      "Mendorong penegakan hukum dan pemberantasan korupsi.",
      "Meningkatkan kesejahteraan rakyat melalui kebijakan keadilan sosial.",
      "Membangun masyarakat yang mandiri dan berdaya.",
    ],
    keyPrograms: [
      "Jaminan Kesehatan Nasional yang Berkualitas",
      "Beasiswa Anak Kurang Mampu Berprestasi",
      "Bantuan Sosial Berbasis Komunitas Masjid",
      "Pemberdayaan UMKM & Ekosistem Halal",
      "Perlindungan Lingkungan & Air Bersih",
    ],
    focusAreas: ["Pendidikan", "Kesehatan", "Islam Sosial", "UMKM Halal", "Ketahanan Keluarga"],
    trackRecords: [
      {
        id: "tr-pks-1",
        year: 2004,
        title: "Kejutan Pemilu 2004: Gelombang Partai Berbasis Kader",
        description:
          "PKS meraih 7,34% suara di Pemilu 2004, kejutan besar bagi partai yang baru berdiri dengan kekuatan kader terorganisir.",
        category: "pemilu",
        sentiment: "positive",
      },
      {
        id: "tr-pks-2",
        year: 2013,
        title: "Lutfi Hasan Ishaaq Terjerat Korupsi Daging Sapi",
        description:
          "Presiden PKS Lutfi Hasan Ishaaq divonis 16 tahun penjara atas kasus suap impor daging sapi, mengguncang citra partai Islam ini.",
        category: "kontroversi",
        sentiment: "negative",
      },
      {
        id: "tr-pks-3",
        year: 2024,
        title: "PKS Bergabung dalam Koalisi Anis-Muhaimin",
        description:
          "PKS mendukung Anies Baswedan-Muhaimin Iskandar di Pilpres 2024 sebagai bagian dari Koalisi Perubahan.",
        category: "pemilu",
        sentiment: "neutral",
      },
    ],
    electionResults: [
      { year: 2014, electionType: "Legislatif", votes: 8480204, percentage: 6.79, seats: 40, totalSeats: 560, rank: 7 },
      { year: 2019, electionType: "Legislatif", votes: 11493663, percentage: 8.21, seats: 50, totalSeats: 575, rank: 6 },
      { year: 2024, electionType: "Legislatif", votes: 12781024, percentage: 8.41, seats: 53, totalSeats: 580, rank: 6 },
    ],
    headOffice: "Jakarta Selatan, DKI Jakarta",
    dprSeats2024: 53,
    memberCount: "4 Juta+",
  },
  {
    id: "p-007",
    slug: "pan",
    name: "Partai Amanat Nasional",
    shortName: "PAN",
    logoUrl: "/images/parpol/PAN.png",
    color: "#1565C0",
    secondaryColor: "#1976D2",
    founded: 1998,
    chairman: "Zulkifli Hasan",
    ideology: ["Nasionalisme", "Islam Moderat", "Reformis"],
    spectrum: "tengah",
    description:
      "PAN lahir dari gerakan reformasi 1998 yang digagas oleh Amien Rais. Partai ini mengusung platform reformasi politik, penguatan demokrasi, dan perwakilan Islam moderat. PAN dikenal dengan tradisi intelektual dan basis massa kalangan organisasi Islam Muhammadiyah.",
    vision:
      "Terwujudnya Indonesia yang maju, adil, dan sejahtera dalam bingkai Negara Kesatuan Republik Indonesia berdasarkan Pancasila.",
    mission: [
      "Memperkuat sistem demokrasi yang matang dan berintegritas.",
      "Mendorong keadilan sosial dan pemerataan ekonomi nasional.",
      "Membangun pendidikan yang berkualitas dan terjangkau.",
      "Memperjuangkan kepentingan masyarakat menengah ke bawah.",
      "Mendorong Islam yang moderat, toleran, dan rahmatan lil alamin.",
    ],
    keyPrograms: [
      "Reformasi Birokrasi & E-Government",
      "Vaksin & Jaminan Kesehatan Gratis",
      "Penguatan Koperasi & UMKM",
      "Diversifikasi Pangan Nasional",
      "Program Beasiswa Kuliah Berbasis Merit",
    ],
    focusAreas: ["Reformasi Birokrasi", "Kesehatan", "UMKM", "Pendidikan", "Demokrasi"],
    trackRecords: [
      {
        id: "tr-pan-1",
        year: 1999,
        title: "Amien Rais Terpilih sebagai Ketua MPR",
        description:
          "Pendiri PAN, Amien Rais, terpilih sebagai Ketua MPR RI periode 1999–2004, menjadi figur kunci era reformasi.",
        category: "prestasi",
        sentiment: "positive",
      },
      {
        id: "tr-pan-2",
        year: 2023,
        title: "PAN Bergabung dalam Koalisi Indonesia Maju",
        description:
          "PAN memilih bergabung mendukung pasangan Prabowo-Gibran jelang Pilpres 2024, meninggalkan tradisi oposisi.",
        category: "kebijakan",
        sentiment: "neutral",
      },
    ],
    electionResults: [
      { year: 2014, electionType: "Legislatif", votes: 9481621, percentage: 7.59, seats: 49, totalSeats: 560, rank: 6 },
      { year: 2019, electionType: "Legislatif", votes: 9572623, percentage: 6.84, seats: 44, totalSeats: 575, rank: 7 },
      { year: 2024, electionType: "Legislatif", votes: 10984363, percentage: 7.24, seats: 48, totalSeats: 580, rank: 7 },
    ],
    headOffice: "Jakarta Selatan, DKI Jakarta",
    dprSeats2024: 48,
    memberCount: "3 Juta+",
  },
  {
    id: "p-008",
    slug: "demokrat",
    name: "Partai Demokrat",
    shortName: "Demokrat",
    logoUrl: "/images/parpol/demokrat.png",
    color: "#0D47A1",
    secondaryColor: "#1565C0",
    founded: 2001,
    chairman: "Agus Harimurti Yudhoyono (AHY)",
    ideology: ["Nasionalisme", "Demokrasi", "Pro-Rakyat"],
    spectrum: "tengah-kanan",
    description:
      "Partai Demokrat didirikan sebagai kendaraan politik Susilo Bambang Yudhoyono (SBY). Mengalami kejayaan dua periode pemerintahan SBY (2004–2014), partai ini terpuruk setelah beberapa kadernya terhadi kasus korupsi besar. AHY kini memimpin upaya pemulihan image partai.",
    vision:
      "Terwujudnya Indonesia yang maju, demokratis, aman, dan sejahtera berdasarkan Pancasila dan UUD 1945.",
    mission: [
      "Membangun pemerintahan yang bersih dan berwibawa.",
      "Mendorong pertumbuhan ekonomi yang berkeadilan.",
      "Memperkuat ketahanan nasional di segala bidang.",
      "Membangun sumber daya manusia Indonesia yang unggul.",
      "Menjaga stabilitas politik dan keamanan nasional.",
    ],
    keyPrograms: [
      "Pembangunan Infrastruktur Pro-Rakyat",
      "Kredit Usaha Rakyat (KUR) Berbunga Rendah",
      "Program Indonesia Pintar & KIP Kuliah",
      "Sistem Jaminan Sosial Nasional (SJSN)",
      "Reformasi Birokrasi Berbasis Integritas",
    ],
    focusAreas: ["Stabilitas Keamanan", "Pendidikan", "Infrastruktur", "Kesehatan", "Reformasi Birokrasi"],
    trackRecords: [
      {
        id: "tr-demokrat-1",
        year: 2009,
        title: "Demokrat Raih Suara Terbanyak di Pemilu 2009",
        description:
          "Di puncak kepopuleran SBY, Demokrat meraih 20,85% suara dan menjadi partai dengan kursi DPR terbanyak.",
        category: "pemilu",
        sentiment: "positive",
      },
      {
        id: "tr-demokrat-2",
        year: 2013,
        title: "Ketua Umum Anas Urbaningrum Terjerat Korupsi Hambalang",
        description:
          "Anas Urbaningrum divonis 14 tahun penjara atas kasus korupsi proyek Hambalang, pukulan berat bagi citra Demokrat.",
        category: "kontroversi",
        sentiment: "negative",
      },
      {
        id: "tr-demokrat-3",
        year: 2024,
        title: "AHY Dilantik sebagai Menteri ATR/BPN",
        description:
          "AHY dipercaya menjabat Menteri Agraria dan Tata Ruang dalam pemerintahan Prabowo-Gibran, menandai kembalinya Demokrat ke koalisi.",
        category: "prestasi",
        sentiment: "positive",
      },
    ],
    electionResults: [
      { year: 2014, electionType: "Legislatif", votes: 12728913, percentage: 10.19, seats: 61, totalSeats: 560, rank: 4 },
      { year: 2019, electionType: "Legislatif", votes: 10876507, percentage: 7.77, seats: 54, totalSeats: 575, rank: 8 },
      { year: 2024, electionType: "Legislatif", votes: 11173558, percentage: 7.36, seats: 44, totalSeats: 580, rank: 8 },
    ],
    headOffice: "Jakarta Pusat, DKI Jakarta",
    dprSeats2024: 44,
    memberCount: "3 Juta+",
  },
];

export function getPartyBySlug(slug: string): Party | undefined {
  return mockParties.find((p) => p.slug === slug);
}

export function getPartyById(id: string): Party | undefined {
  return mockParties.find((p) => p.id === id);
}
