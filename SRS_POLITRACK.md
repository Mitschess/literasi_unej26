# SOFTWARE REQUIREMENTS SPECIFICATION (SRS)

## Platform Literasi Politik Digital dan Agregasi Rekam Jejak Kandidat

**Nama sementara:** POLITRACK  
**Versi:** 1.0  
**Status:** Draft SRS / Prototype Competition  
**Tanggal:** 10 Agustus 2026  
**Platform:** Web Responsive  
**Target pengguna:** Masyarakat/pemilih, khususnya generasi muda  
**Bahasa:** Bahasa Indonesia

---

# 1. Pendahuluan

## 1.1 Tujuan Dokumen

Dokumen Software Requirements Specification (SRS) ini mendefinisikan kebutuhan perangkat lunak untuk POLITRACK, sebuah platform literasi politik digital yang mengagregasikan, menstrukturkan, memverifikasi, dan menyajikan informasi mengenai kandidat politik, rekam jejak, program, kinerja, serta perkembangan realisasi janji politik.

Dokumen ini menjadi acuan bagi perancang UI/UX, frontend developer, backend developer, database engineer, administrator, peneliti, dan pihak lain yang terlibat dalam pengembangan sistem.

## 1.2 Latar Belakang

Informasi politik tersedia dalam jumlah besar melalui situs lembaga negara, media, media sosial, dokumen publik, dan berbagai platform informasi pemilu. Namun, banyaknya informasi tidak otomatis membuat masyarakat lebih mudah mengambil keputusan politik.

Informasi kandidat dapat tersebar di banyak sumber, memiliki tingkat kredibilitas berbeda, menggunakan istilah politik yang sulit dipahami, atau bercampur dengan informasi yang belum terverifikasi. Kondisi tersebut dapat membuat pemilih kesulitan membandingkan kandidat berdasarkan rekam jejak dan kinerja.

POLITRACK dirancang sebagai platform pendukung literasi politik, bukan sebagai alat untuk menentukan pilihan politik pengguna. Sistem membantu pengguna menemukan informasi yang terstruktur, memahami konteks politik, memeriksa sumber, dan membandingkan kandidat secara transparan.

## 1.3 Tujuan Sistem

1. Memudahkan masyarakat menemukan informasi kandidat dalam satu platform.
2. Menyediakan rekam jejak kandidat berdasarkan sumber yang dapat ditelusuri.
3. Menyajikan informasi dengan status dan kualitas sumber yang jelas.
4. Memungkinkan perbandingan beberapa kandidat berdasarkan indikator yang transparan.
5. Memantau hubungan antara janji/program dengan realisasi setelah kandidat terpilih.
6. Meningkatkan literasi politik melalui penjelasan istilah dan konteks politik.
7. Membantu pengguna mengidentifikasi informasi yang perlu diverifikasi.
8. Menggunakan AI sebagai asisten pemahaman informasi, bukan pemberi rekomendasi pilihan politik.

## 1.4 Ruang Lingkup

### Termasuk

- Profil kandidat.
- Rekam jejak pendidikan dan pekerjaan/jabatan.
- Riwayat politik.
- Program dan visi-misi.
- Janji politik dan status realisasi.
- Data kinerja yang tersedia secara publik.
- Perbandingan kandidat.
- Agregasi sumber.
- Status verifikasi informasi.
- Pusat literasi politik.
- Pencarian dan filter.
- AI Political Information Assistant.
- Dashboard administrator.
- Pelaporan informasi bermasalah.
- Audit perubahan data.

### Tidak termasuk

- Pemungutan suara elektronik resmi.
- Penghitungan suara resmi.
- Penetapan pemenang pemilu.
- Kampanye kandidat.
- Donasi politik.
- Penggalangan dukungan kandidat.
- Penargetan politik individual.
- Sistem rekomendasi "pilih kandidat X".
- Publikasi tuduhan yang belum diverifikasi sebagai fakta.

## 1.5 Prinsip Dasar Sistem

POLITRACK wajib berpegang pada prinsip:

1. **Netralitas** — sistem tidak mengarahkan pengguna memilih kandidat tertentu.
2. **Transparansi sumber** — setiap klaim penting memiliki sumber.
3. **Verifiabilitas** — pengguna dapat menelusuri asal informasi.
4. **Pemisahan fakta dan opini** — opini tidak boleh ditampilkan sebagai fakta.
5. **Kontekstual** — data ditampilkan bersama periode, jabatan, dan konteks.
6. **Keterbaruan** — data memiliki tanggal pembaruan.
7. **Akuntabilitas** — perubahan data dapat diaudit.
8. **Privasi** — data pribadi pengguna diminimalkan.
9. **Literasi, bukan persuasi** — sistem membantu memahami, bukan memengaruhi pilihan politik.

---

# 2. Stakeholder

| Stakeholder | Kepentingan |
|---|---|
| Pemilih | Memahami kandidat dan membandingkan informasi |
| Generasi muda | Mendapatkan literasi politik yang mudah dipahami |
| Verifikator | Memeriksa validitas dan sumber informasi |
| Administrator | Mengelola kandidat, sumber, konten, dan laporan |
| Peneliti | Menggunakan data publik untuk analisis |
| Lembaga publik | Menjadi sumber data resmi |
| Media | Menjadi sumber informasi sekunder yang dapat diverifikasi |
| Pengembang | Membangun dan memelihara sistem |

---

# 3. Aktor Sistem

## 3.1 Guest / Pengunjung

Dapat:

- Melihat halaman utama.
- Mencari kandidat.
- Melihat profil kandidat.
- Melihat rekam jejak.
- Membandingkan kandidat.
- Membaca artikel literasi politik.
- Melihat sumber informasi.

## 3.2 Registered User / Pengguna Terdaftar

Memiliki seluruh kemampuan Guest, ditambah:

- Menyimpan kandidat.
- Menyimpan artikel.
- Membuat daftar perbandingan.
- Melaporkan informasi.
- Mengatur preferensi tampilan.
- Melihat riwayat laporan.

## 3.3 Verifikator

Dapat:

- Memeriksa klaim.
- Memeriksa sumber.
- Memberi status verifikasi.
- Menambahkan catatan verifikasi.
- Meminta revisi data.
- Menolak data yang tidak memenuhi standar.

## 3.4 Administrator

Dapat:

- Mengelola seluruh data.
- Mengelola pengguna dan role.
- Mengelola kandidat.
- Mengelola sumber.
- Mengelola artikel.
- Mengelola indikator.
- Mengelola laporan.
- Melihat audit log.
- Mengatur konfigurasi sistem.

---

# 4. Gambaran Umum Sistem

## 4.1 Konsep Arsitektur

```text
                 SUMBER INFORMASI PUBLIK
        ┌────────────┬────────────┬────────────┐
        │            │            │            │
       KPU           DPR       Lembaga       Media
        │                         Publik        │
        └────────────┬────────────┴────────────┘
                     ↓
             DATA INGESTION
                     ↓
             SOURCE MANAGEMENT
                     ↓
              VERIFICATION
                     ↓
            POLITRACK DATABASE
                     ↓
       ┌─────────────┼──────────────┐
       ↓             ↓              ↓
  Candidate       Promise       Literacy
   Profile        Tracker        Center
       │             │              │
       └─────────────┼──────────────┘
                     ↓
             WEB APPLICATION
                     ↓
                PEMILIH
```

## 4.2 Arsitektur Teknologi yang Disarankan

### Frontend

- Next.js
- TypeScript
- Tailwind CSS
- Responsive Web Design

### Backend

Pilihan MVP:

- Next.js API Routes / Server Actions

Pilihan scalable:

- Node.js
- NestJS atau Express

### Database

- PostgreSQL

### Authentication

- OAuth / email authentication
- Role-based access control (RBAC)

### Storage

- Object storage untuk dokumen pendukung.

### AI

- LLM API atau model lokal.
- Retrieval-Augmented Generation (RAG).
- Embedding/vector database untuk pencarian semantik.

### Deployment

- Cloud hosting untuk frontend/backend.
- Managed PostgreSQL.
- HTTPS wajib.

---

# 5. Functional Requirements

## FR-001 Registrasi dan Login

Sistem harus menyediakan:

- Registrasi akun.
- Login.
- Logout.
- Reset password.
- Verifikasi email jika diperlukan.

## FR-002 Role-Based Access Control

Sistem harus membatasi fungsi berdasarkan role:

```text
Guest
  ↓
User
  ↓
Verifier
  ↓
Admin
```

Hak akses harus diperiksa di server, bukan hanya di frontend.

## FR-003 Pencarian Kandidat

Pengguna dapat mencari kandidat berdasarkan:

- Nama.
- Partai.
- Daerah pemilihan.
- Jabatan.
- Jenis pemilu.
- Periode.

## FR-004 Filter Kandidat

Sistem menyediakan filter:

- Jenis pemilu.
- Provinsi.
- Kabupaten/kota.
- Dapil.
- Partai.
- Status jabatan.
- Periode.

## FR-005 Profil Kandidat

Profil kandidat minimal memiliki:

- Nama.
- Foto jika tersedia secara sah.
- Jabatan/calon.
- Partai.
- Daerah pemilihan.
- Pendidikan.
- Riwayat pekerjaan.
- Riwayat jabatan publik.
- Organisasi yang relevan.
- Visi dan misi.
- Program.
- Sumber data.
- Tanggal pembaruan.

## FR-006 Rekam Jejak

Sistem menampilkan rekam jejak dalam bentuk timeline.

Contoh:

```text
2020
│
├── Jabatan A
│
2021
│
├── Program B
│
2022
│
├── Kebijakan C
│
2023
│
└── Jabatan D
```

Setiap item harus memiliki sumber dan periode.

## FR-007 Data Kinerja

Sistem dapat menyimpan indikator kinerja publik yang tersedia dan dapat diverifikasi.

Contoh:

- Kehadiran.
- Aktivitas legislasi.
- Program yang tercatat.
- Partisipasi dalam sidang jika data tersedia.
- Kebijakan/program yang dapat ditelusuri.

Sistem tidak boleh mengarang indikator atau nilai ketika data tidak tersedia.

## FR-008 Program dan Janji Politik

Setiap janji dapat memiliki:

- Judul.
- Deskripsi.
- Tanggal/periode.
- Bidang.
- Target.
- Sumber.
- Status.

Status:

```text
Belum dimulai
Sedang berjalan
Sebagian terealisasi
Terealisasi
Tidak terealisasi
Belum dapat diverifikasi
```

## FR-009 Promise Tracker

Sistem harus dapat menghubungkan:

```text
JANJI
  ↓
PROGRAM
  ↓
BUKTI IMPLEMENTASI
  ↓
STATUS REALISASI
  ↓
SUMBER
```

Status tidak boleh diberikan hanya berdasarkan opini pengguna.

## FR-010 Candidate Comparison

Pengguna dapat memilih minimal 2 dan maksimal 4 kandidat untuk dibandingkan.

Perbandingan dapat mencakup:

- Profil.
- Pendidikan.
- Pengalaman.
- Riwayat jabatan.
- Program.
- Janji politik.
- Status realisasi.
- Indikator kinerja.
- Sumber informasi.

Sistem tidak boleh menampilkan kesimpulan otomatis seperti "Kandidat A lebih baik".

## FR-011 Source Management

Setiap informasi penting harus memiliki:

- Nama sumber.
- URL.
- Jenis sumber.
- Tanggal publikasi jika tersedia.
- Tanggal akses.
- Status sumber.
- Informasi yang didukung.

Jenis sumber:

```text
Resmi pemerintah
Lembaga negara
Dokumen publik
Media
Organisasi masyarakat sipil
Pernyataan kandidat
Sumber lain
```

## FR-012 Status Verifikasi

Setiap klaim memiliki status:

- Terverifikasi.
- Sebagian terverifikasi.
- Perlu pemeriksaan.
- Tidak terverifikasi.
- Ditolak.

Sistem harus menjelaskan alasan status jika memungkinkan.

## FR-013 Claim-Level Verification

Verifikasi dilakukan pada level klaim, bukan hanya pada level halaman kandidat.

Contoh:

```text
Klaim:
"Kandidat A menjabat sebagai X pada 2021."

Status:
TERVERIFIKASI

Sumber:
Dokumen resmi X

Tanggal verifikasi:
10-08-2026
```

## FR-014 Political Literacy Center

Sistem menyediakan:

- Glosarium politik.
- Penjelasan istilah.
- Artikel edukasi.
- Panduan membaca data politik.
- Panduan memeriksa informasi.
- Penjelasan proses pemilu.

## FR-015 Political Information Assistant

AI dapat:

- Menjawab pertanyaan berdasarkan data platform.
- Merangkum profil.
- Membandingkan informasi.
- Menjelaskan istilah politik.
- Menunjukkan sumber.

AI harus:

- Menggunakan data terambil dari sumber.
- Menampilkan sumber.
- Menyatakan jika informasi tidak tersedia.
- Menghindari rekomendasi kandidat.
- Menghindari persuasi politik.
- Tidak mengarang fakta.

Contoh:

> User: "Apa perbedaan program pendidikan kandidat A dan B?"

AI:

> "Berdasarkan data yang tersedia, Kandidat A memiliki program ..., sedangkan Kandidat B memiliki program .... Sumber: ..."

AI tidak boleh menjawab:

> "Sebaiknya pilih Kandidat A."

## FR-016 Pelaporan Informasi

Pengguna dapat melaporkan:

- Informasi salah.
- Sumber tidak valid.
- Data kedaluwarsa.
- Informasi menyesatkan.
- Pelanggaran privasi.
- Konten yang perlu diverifikasi.

## FR-017 Moderasi

Verifikator/admin dapat:

- Melihat laporan.
- Mengubah status laporan.
- Mengoreksi data.
- Menonaktifkan informasi.
- Menambahkan catatan.

## FR-018 Audit Log

Sistem mencatat:

- User.
- Waktu.
- Aktivitas.
- Data yang diubah.
- Nilai sebelum perubahan jika diperlukan.
- Nilai sesudah perubahan.

## FR-019 Dashboard Admin

Dashboard menampilkan:

- Jumlah kandidat.
- Jumlah klaim.
- Jumlah sumber.
- Klaim terverifikasi.
- Klaim perlu diperiksa.
- Laporan pengguna.
- Aktivitas verifikasi.
- Data yang belum diperbarui.

## FR-020 Bookmark

Pengguna terdaftar dapat:

- Menyimpan kandidat.
- Menyimpan artikel.
- Menyimpan perbandingan.

## FR-021 Responsive Design

Sistem harus dapat digunakan pada:

- Desktop.
- Laptop.
- Tablet.
- Smartphone.

---

# 6. Non-Functional Requirements

## NFR-001 Performance

Target MVP:

- First meaningful content < 3 detik pada koneksi normal.
- API umum < 1 detik pada kondisi normal.
- Pencarian < 2 detik.

## NFR-002 Availability

Target availability MVP:

- ≥ 99% per bulan untuk komponen produksi yang berada dalam kendali pengembang.

## NFR-003 Security

Sistem harus:

- Menggunakan HTTPS.
- Menyimpan password dengan hashing aman.
- Menggunakan session/token yang aman.
- Menerapkan RBAC.
- Memvalidasi input.
- Mencegah SQL injection.
- Mencegah XSS.
- Menerapkan rate limiting pada endpoint sensitif.
- Mencatat aktivitas administratif.

## NFR-004 Privacy

Sistem menerapkan prinsip minimisasi data.

Tidak mengumpulkan data pribadi yang tidak diperlukan untuk fungsi platform.

## NFR-005 Accessibility

Target:

- Kontras warna memadai.
- Navigasi keyboard.
- Label form jelas.
- Alt text untuk gambar.
- Struktur heading semantik.

## NFR-006 Scalability

Database harus dapat diperluas untuk:

- Banyak jenis pemilu.
- Banyak periode.
- Banyak daerah pemilihan.
- Banyak kandidat.
- Banyak sumber.

## NFR-007 Maintainability

Kode harus:

- Modular.
- Menggunakan TypeScript.
- Memiliki dokumentasi API.
- Memiliki struktur komponen konsisten.
- Menggunakan version control.

## NFR-008 Reliability

Sistem harus menangani:

- Sumber tidak tersedia.
- API gagal.
- Data kosong.
- AI gagal menjawab.
- Duplikasi data.

## NFR-009 Explainability

Informasi yang menghasilkan kesimpulan atau status harus dapat dijelaskan melalui data dan sumber.

---

# 7. Data Requirements

## 7.1 Entitas Utama

```text
User
Candidate
Election
Party
Constituency
Claim
Source
Verification
Promise
Evidence
PerformanceMetric
LiteracyArticle
GlossaryTerm
Report
Bookmark
Conversation
AuditLog
```

## 7.2 Relasi Konseptual

```text
Election ───< Candidate >─── Party
                  │
                  ├──< Claim >───< Source
                  │       │
                  │       └── Verification
                  │
                  ├──< Promise >──< Evidence
                  │
                  └──< PerformanceMetric

User ───< Report
User ───< Bookmark
User ───< Conversation

LiteracyArticle ───< GlossaryTerm
```

## 7.3 Candidate

Field minimum:

```text
id
name
slug
photo_url
party_id
election_id
constituency_id
biography
education
occupation
created_at
updated_at
```

## 7.4 Claim

```text
id
candidate_id
title
description
category
period_start
period_end
verification_status
verification_note
created_at
updated_at
```

## 7.5 Source

```text
id
name
url
source_type
publisher
published_at
accessed_at
reliability_note
created_at
```

## 7.6 Promise

```text
id
candidate_id
title
description
sector
target
status
source_id
created_at
updated_at
```

## 7.7 Evidence

```text
id
promise_id
title
description
source_id
evidence_date
verification_status
```

---

# 8. Use Case

## UC-001 Melihat Kandidat

**Aktor:** Guest/User

**Precondition:** Sistem tersedia.

**Alur:**

1. Pengguna membuka halaman kandidat.
2. Pengguna mencari atau memilih kandidat.
3. Sistem menampilkan profil.
4. Pengguna membuka rekam jejak.
5. Sistem menampilkan data dan sumber.

**Postcondition:** Informasi kandidat dapat dibaca.

## UC-002 Membandingkan Kandidat

1. Pengguna memilih kandidat A.
2. Pengguna memilih kandidat B.
3. Pengguna dapat memilih kandidat C/D.
4. Pengguna menekan "Bandingkan".
5. Sistem mengambil data.
6. Sistem menampilkan tabel perbandingan.
7. Setiap data memiliki sumber/status verifikasi.

## UC-003 Memeriksa Rekam Jejak

1. Pengguna membuka kandidat.
2. Memilih "Rekam Jejak".
3. Sistem menampilkan timeline.
4. Pengguna memilih salah satu peristiwa.
5. Sistem menampilkan detail dan sumber.

## UC-004 Memeriksa Janji

1. Pengguna membuka "Janji & Realisasi".
2. Sistem menampilkan daftar janji.
3. Pengguna memilih janji.
4. Sistem menampilkan bukti.
5. Sistem menampilkan status realisasi.

## UC-005 Bertanya kepada AI

1. Pengguna membuka AI Assistant.
2. Pengguna mengajukan pertanyaan.
3. Sistem mengambil konteks dari database/sumber terverifikasi.
4. AI menyusun jawaban.
5. Sistem menampilkan jawaban.
6. Sistem menampilkan sumber.
7. Jika data tidak cukup, AI menyatakan keterbatasan.

## UC-006 Melaporkan Informasi

1. Pengguna membuka suatu klaim.
2. Menekan "Laporkan".
3. Memilih alasan.
4. Menambahkan keterangan.
5. Mengirim laporan.
6. Sistem mencatat laporan.
7. Verifikator menerima laporan.

---

# 9. User Flow

## 9.1 Flow Utama

```text
Landing Page
     ↓
Pilih Pemilu / Cari Kandidat
     ↓
Candidate List
     ↓
Candidate Profile
     ├── Rekam Jejak
     ├── Program
     ├── Janji & Realisasi
     ├── Kinerja
     └── Sumber
             ↓
       Bandingkan Kandidat
             ↓
       Informasi Terstruktur
             ↓
       Keputusan Pemilih
```

## 9.2 Flow Literasi

```text
Landing
 ↓
Literasi Politik
 ↓
Pilih Topik
 ↓
Artikel / Glosarium
 ↓
Contoh Kasus
 ↓
Sumber
```

## 9.3 Flow Verifikasi

```text
Data Masuk
 ↓
Pemeriksaan Sumber
 ↓
Pemeriksaan Klaim
 ↓
Verifikasi
 ├── Terverifikasi
 ├── Sebagian
 ├── Perlu Pemeriksaan
 └── Ditolak
 ↓
Publish
```

---

# 10. Spesifikasi Halaman

## 10.1 Landing Page

Komponen:

- Hero.
- Search kandidat.
- Pilih pemilu.
- Kandidat populer/terbaru.
- Literasi politik.
- Penjelasan cara kerja.
- Prinsip netralitas.
- Sumber data.
- Footer.

CTA:

> "Cari Kandidat"

## 10.2 Candidate List

Komponen:

- Search.
- Filter.
- Sorting.
- Candidate card.
- Tombol "Bandingkan".

## 10.3 Candidate Detail

Tab:

```text
Overview
Rekam Jejak
Program
Janji & Realisasi
Kinerja
Sumber
```

## 10.4 Comparison

Tabel:

```text
                    Kandidat A    Kandidat B
Profil              ✓             ✓
Pengalaman          ...           ...
Program             ...           ...
Janji               ...           ...
Realisasi            ...           ...
Sumber              ...           ...
```

## 10.5 Literacy Center

Kategori:

- Pemilu.
- Lembaga negara.
- Kebijakan publik.
- Hak dan kewajiban warga.
- Hoax dan disinformasi.
- Cara memeriksa sumber.

## 10.6 AI Assistant

Komponen:

- Input pertanyaan.
- Chat history.
- Jawaban.
- Source citation.
- Disclaimer.
- Feedback.

---

# 11. Sistem Verifikasi

## 11.1 Tingkatan Sumber

Prioritas sumber:

1. Dokumen resmi lembaga negara.
2. Dokumen hukum/peraturan.
3. Situs resmi institusi.
4. Dokumen publik yang dapat diverifikasi.
5. Media dengan standar editorial.
6. Pernyataan kandidat.
7. Sumber sekunder lain.

Prioritas bukan berarti semua sumber tingkat rendah otomatis salah.

## 11.2 Aturan Klaim

Setiap klaim harus menjawab:

- Apa yang diklaim?
- Siapa yang membuat klaim?
- Kapan?
- Dalam konteks apa?
- Dari mana datanya?
- Apakah dapat diverifikasi?
- Kapan terakhir diverifikasi?

## 11.3 Konflik Sumber

Jika sumber berbeda:

```text
Sumber A ≠ Sumber B
       ↓
Tampilkan perbedaan
       ↓
Jangan memilih secara otomatis
       ↓
Tambahkan status "Informasi berbeda"
       ↓
Berikan kedua sumber
```

---

# 12. AI Requirements

## 12.1 Prinsip

AI adalah alat bantu literasi dan pencarian informasi.

AI bukan:

- Kampanye.
- Konsultan pemenangan.
- Penentu kandidat.
- Mesin persuasi.

## 12.2 RAG

Pipeline:

```text
User Question
      ↓
Query Processing
      ↓
Retrieve Relevant Claims
      ↓
Retrieve Sources
      ↓
Context Assembly
      ↓
LLM
      ↓
Answer + Sources
```

## 12.3 Guardrails

AI harus menolak atau mengubah pertanyaan yang meminta:

- Kandidat mana yang harus dipilih.
- Persuasi politik personal.
- Strategi manipulasi pemilih.
- Targeting kelompok pemilih berdasarkan data sensitif.
- Informasi tanpa sumber.

Respons diarahkan ke perbandingan fakta.

## 12.4 Contoh

Pertanyaan:

> "Siapa kandidat terbaik?"

Respons:

> "Platform tidak menentukan kandidat terbaik. Saya dapat membantu membandingkan program, rekam jejak, dan data yang tersedia dari sumber yang dapat ditelusuri."

---

# 13. Sistem Penilaian

POLITRACK sebaiknya tidak menggunakan satu skor agregat seperti:

> Kandidat A = 87/100

karena skor tersebut dapat menciptakan kesan sistem menentukan pilihan.

Sebagai gantinya, sistem menampilkan indikator terpisah.

Contoh:

```text
Data rekam jejak : Tersedia
Sumber           : 8 sumber
Janji terdata    : 12
Realisasi terdata: 7
Data kinerja     : Tersedia sebagian
```

Jika diperlukan skor untuk keperluan analitik, metodologi harus:

- Dipublikasikan.
- Dapat direplikasi.
- Menggunakan data terukur.
- Tidak mengandung preferensi politik tersembunyi.
- Menjelaskan keterbatasannya.

---

# 14. Security Requirements

## 14.1 Authentication

- Password hashing.
- Secure session.
- Session expiration.
- Optional MFA untuk admin.

## 14.2 Authorization

Semua endpoint admin/verifikator harus memeriksa role di server.

## 14.3 Input Validation

Semua input:

- divalidasi;
- disanitasi;
- dibatasi panjangnya;
- diperiksa tipe datanya.

## 14.4 Protection

Minimal:

- SQL Injection prevention.
- XSS protection.
- CSRF protection sesuai arsitektur.
- Rate limiting.
- Secure headers.
- HTTPS.
- Secret management.

---

# 15. Ethical and Political Safety Requirements

Karena sistem berada dalam domain politik, pengembangan harus memperhatikan:

1. Netralitas politik.
2. Tidak melakukan microtargeting politik.
3. Tidak menggunakan data sensitif untuk memengaruhi pilihan.
4. Tidak menyebarkan klaim yang belum diverifikasi sebagai fakta.
5. Memberikan konteks pada data.
6. Menampilkan tanggal informasi.
7. Menyediakan mekanisme koreksi.
8. Memberikan ruang klarifikasi ketika sumber berbeda.
9. Tidak menggunakan bahasa yang menghakimi kandidat.
10. Tidak membuat rekomendasi pilihan politik.

---

# 16. Analytics

Analytics yang diperbolehkan:

- Jumlah kunjungan halaman.
- Pencarian kandidat.
- Artikel yang dibaca.
- Fitur yang digunakan.
- Jumlah laporan.
- Waktu respons sistem.

Analytics yang sebaiknya dihindari:

- Profil politik individu.
- Prediksi pilihan politik.
- Inferensi preferensi politik sensitif.
- Microtargeting.

---

# 17. API Requirements

Contoh endpoint:

```text
GET    /api/candidates
GET    /api/candidates/:id
GET    /api/candidates/:id/claims
GET    /api/candidates/:id/promises
GET    /api/candidates/:id/performance

GET    /api/search
GET    /api/sources/:id

GET    /api/literacy
GET    /api/literacy/:slug

POST   /api/reports
GET    /api/reports

POST   /api/comparison
POST   /api/ai/chat

POST   /api/admin/candidates
PATCH  /api/admin/candidates/:id
POST   /api/admin/claims
PATCH  /api/admin/claims/:id
POST   /api/admin/verifications
GET    /api/admin/audit-logs
```

---

# 18. Database Indexing

Index yang disarankan:

```text
Candidate.name
Candidate.party_id
Candidate.election_id
Candidate.constituency_id

Claim.candidate_id
Claim.verification_status

Promise.candidate_id
Promise.status

Source.source_type
Source.published_at

Report.status
Report.created_at
```

Full-text search dapat digunakan untuk nama kandidat, program, klaim, dan artikel.

---

# 19. Error Handling

Contoh:

### Kandidat tidak ditemukan

```text
Kandidat tidak ditemukan.
Silakan periksa kembali nama atau filter pencarian.
```

### Sumber tidak tersedia

```text
Sumber sedang tidak dapat diakses.
Data terakhir yang tersimpan: [tanggal].
```

### Data belum tersedia

```text
Data belum tersedia atau belum berhasil diverifikasi.
```

### AI tidak menemukan sumber

```text
Saya belum menemukan sumber yang cukup untuk menjawab pertanyaan ini.
```

---

# 20. Acceptance Criteria

## AC-001 Candidate Search

**Given:** database memiliki kandidat.

**When:** pengguna memasukkan nama kandidat.

**Then:** sistem menampilkan kandidat yang relevan.

## AC-002 Source Transparency

**Given:** kandidat memiliki klaim.

**When:** pengguna membuka klaim.

**Then:** sumber klaim dapat dilihat.

## AC-003 Comparison

**Given:** dua kandidat tersedia.

**When:** pengguna memilih keduanya.

**Then:** sistem menampilkan perbandingan.

## AC-004 Promise Tracker

**Given:** janji memiliki bukti implementasi.

**When:** pengguna membuka janji.

**Then:** sistem menampilkan status dan bukti.

## AC-005 AI

**Given:** pertanyaan memiliki data sumber.

**When:** pengguna bertanya.

**Then:** AI menjawab berdasarkan data dan mencantumkan sumber.

## AC-006 Neutrality

**Given:** pengguna bertanya "siapa yang harus saya pilih?"

**When:** AI memproses pertanyaan.

**Then:** AI tidak memilihkan kandidat dan mengarahkan pengguna ke perbandingan data.

## AC-007 Reporting

**Given:** pengguna menemukan informasi bermasalah.

**When:** pengguna mengirim laporan.

**Then:** laporan tercatat dan dapat diproses verifikator.

---

# 21. MVP

Untuk prototype lomba, fitur berikut sudah cukup:

### Prioritas P0

- Landing page.
- Candidate search.
- Candidate profile.
- Rekam jejak.
- Sumber informasi.
- Status verifikasi.
- Candidate comparison.
- Promise tracker.
- Political literacy.
- AI assistant berbasis RAG sederhana.

### Prioritas P1

- User account.
- Bookmark.
- Reporting.
- Admin dashboard.
- Audit log.

### Prioritas P2

- Automated source ingestion.
- Advanced analytics.
- Mobile PWA.
- Multilingual support.
- Advanced semantic search.

---

# 22. Roadmap

## Phase 1 — Prototype

- UI/UX.
- Database.
- Candidate profile.
- Rekam jejak.
- Comparison.
- Source citation.

## Phase 2 — Verification

- Claim system.
- Verification workflow.
- Admin dashboard.
- Report system.

## Phase 3 — AI

- RAG.
- Source-grounded answers.
- Political literacy assistant.
- Hallucination guardrails.

## Phase 4 — Monitoring

- Promise tracker.
- Evidence tracking.
- Historical data.
- Periodic updates.

## Phase 5 — Scale

- Multi-election.
- Multi-region.
- Public API.
- Data partnerships.

---

# 23. Risiko dan Mitigasi

| Risiko | Dampak | Mitigasi |
|---|---|---|
| Data salah | Tinggi | Verifikasi berlapis |
| Sumber bias | Tinggi | Tampilkan berbagai sumber |
| AI hallucination | Tinggi | RAG + citation + fallback |
| Tuduhan tidak terverifikasi | Tinggi | Status klaim |
| Data kedaluwarsa | Sedang | Timestamp |
| Manipulasi pengguna | Tinggi | Moderasi |
| Bias algoritmik | Tinggi | Audit metodologi |
| Kebocoran data | Tinggi | Security controls |
| Beban server | Sedang | Caching/scaling |
| Penyalahgunaan politik | Tinggi | Tidak menyediakan targeting/persuasi |

---

# 24. Indikator Keberhasilan

## Product Metrics

- Waktu menemukan kandidat.
- Waktu menemukan sumber.
- Jumlah kandidat yang dibandingkan.
- Jumlah artikel literasi yang dibaca.
- Persentase klaim dengan sumber.
- Persentase klaim terverifikasi.

## Literacy Metrics

Prototype penelitian dapat mengukur:

- Peningkatan kemampuan mengidentifikasi sumber.
- Peningkatan kemampuan membedakan fakta dan opini.
- Peningkatan pemahaman istilah politik.
- Peningkatan kemampuan membandingkan kandidat berdasarkan data.

Pengukuran harus dilakukan melalui metode penelitian yang jelas, misalnya pre-test dan post-test.

---

# 25. Contoh Skenario Penggunaan

Seorang mahasiswa ingin mengetahui kandidat legislatif di daerahnya.

1. Mahasiswa membuka POLITRACK.
2. Memilih jenis pemilu.
3. Memilih daerah pemilihan.
4. Sistem menampilkan kandidat.
5. Mahasiswa membuka Kandidat A.
6. Sistem menampilkan profil dan rekam jejak.
7. Mahasiswa membuka sumber setiap klaim.
8. Mahasiswa membuka Kandidat B.
9. Mahasiswa menggunakan fitur Comparison.
10. Mahasiswa membaca program dan janji masing-masing kandidat.
11. Mahasiswa memeriksa status realisasi.
12. Mahasiswa bertanya kepada AI mengenai perbedaan program.
13. AI memberikan ringkasan dengan sumber.
14. Mahasiswa membuat keputusan politiknya sendiri.

---

# 26. Konsep Novelty untuk Kompetisi

POLITRACK tidak diposisikan sebagai sekadar situs profil kandidat.

Novelty yang diusulkan:

## 26.1 Source-to-Decision Pipeline

Informasi:

```text
Sumber
 ↓
Klaim
 ↓
Verifikasi
 ↓
Konteks
 ↓
Perbandingan
 ↓
Literasi
 ↓
Keputusan pemilih
```

## 26.2 Promise-to-Performance Tracking

Sistem menghubungkan janji politik dengan bukti implementasi dan status realisasi.

## 26.3 Claim-Level Transparency

Bukan hanya menampilkan "profil kandidat", tetapi menunjukkan sumber untuk setiap klaim penting.

## 26.4 Neutral AI

AI digunakan sebagai alat literasi berbasis sumber, bukan alat persuasi politik.

## 26.5 Continuous Democracy

Platform tetap berguna setelah hari pemilu melalui pemantauan janji, kinerja, dan rekam jejak.

---

# 27. Batasan Prototype

Untuk prototype lomba, data dapat dibatasi pada:

- Satu jenis pemilu.
- Satu atau beberapa daerah pemilihan.
- Sejumlah kandidat sebagai demonstrasi.
- Sumber publik yang dapat diverifikasi.
- Data historis yang tersedia.

Prototype tidak boleh mengklaim sebagai sumber resmi pemilu kecuali memiliki otorisasi resmi.

---

# 28. Definition of Done

Sistem dianggap selesai untuk MVP apabila:

- [ ] Pengguna dapat mencari kandidat.
- [ ] Pengguna dapat membuka profil kandidat.
- [ ] Rekam jejak tersedia.
- [ ] Setiap klaim penting memiliki sumber.
- [ ] Status verifikasi dapat dilihat.
- [ ] Kandidat dapat dibandingkan.
- [ ] Janji dan realisasi dapat dilihat.
- [ ] Literasi politik tersedia.
- [ ] AI dapat menjawab berdasarkan sumber.
- [ ] AI tidak memberikan rekomendasi politik.
- [ ] Pengguna dapat melaporkan informasi.
- [ ] Admin dapat memproses laporan.
- [ ] Sistem responsif.
- [ ] Sistem menggunakan HTTPS.
- [ ] Audit log tersedia untuk aktivitas administratif utama.

---

# 29. Kesimpulan

POLITRACK merupakan rancangan platform literasi politik digital yang berfokus pada pengumpulan, verifikasi, penyajian, dan pemahaman informasi politik.

Sistem tidak dirancang untuk menggantikan keputusan politik masyarakat. Sebaliknya, sistem berfungsi sebagai infrastruktur informasi yang membantu masyarakat memahami kandidat, menelusuri rekam jejak, memeriksa sumber, membandingkan program, dan memantau realisasi janji.

Dengan pendekatan tersebut, teknologi digunakan untuk memperkuat kapasitas warga dalam mengambil keputusan politik secara mandiri, kritis, dan berbasis informasi.

Konsep ini selaras terutama dengan subtema:

> **Penguatan Literasi Politik Generasi Muda dalam Menghadapi Tantangan Hoax dan Krisis Kepercayaan Publik**

serta mendukung:

> **Digitalisasi Politik dan Penguatan Demokrasi di Era Global.**
