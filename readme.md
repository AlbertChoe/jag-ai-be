# JagAI Backend (Express + TypeScript + Prisma)

Backend untuk **JagAI** — platform yang membantu petani (fokus awal: jagung) di Indonesia melalui analisis kesuburan lahan, deteksi penyakit tanaman, dan konsultasi pakar.
Repo ini menyajikan **API terukur, aman, dan mudah dikembangkan** menggunakan **Express + TypeScript + Prisma** (PostgreSQL di-host via Supabase).

---

## Daftar Isi

- [Fitur Utama](#fitur-utama)
- [Arsitektur](#arsitektur)
- [Teknologi](#teknologi)
- [Struktur Proyek](#struktur-proyek)
- [Instalasi & Menjalankan](#instalasi--menjalankan)

---

## Fitur Utama

- **Auth JWT**: Registrasi/Login, Bearer token, endpoint “profil saya”.
- **Manajemen Pengguna**: Lihat & update profil (`/users/me`).
- **Pemisahan concern**: Controller tipis → Service (bisnis) → Prisma (DB).
- **Validasi input** dengan **Zod**.
- **Logging terstruktur** dengan **Winston** (+ `express-winston`).
- **Siap dikembangkan** untuk modul domain: lahan, analisis, deteksi penyakit, konsultasi, notifikasi cuaca.

---

## Arsitektur

Aplikasi menggunakan arsitektur berlapis:

1. **Client** berkomunikasi dengan **REST API** yang dibangun menggunakan Express.
2. **Controller** menerima request dari client dan meneruskannya ke **Service**.
3. **Service** berisi logika bisnis dan memanggil **Prisma ORM** untuk akses data.
4. **Prisma ORM** terhubung ke **PostgreSQL** yang di-host di Supabase.
5. **Middleware** (Auth, Zod validation, Logger, Error handler) digunakan di seluruh lapisan API untuk keamanan, validasi, dan logging.

## Teknologi

- **Runtime**: Node.js (TypeScript)
- **Framework**: Express
- **ORM**: Prisma (PostgreSQL @ Supabase)
- **Auth**: JWT (Bearer)
- **Validasi**: Zod
- **Logging**: Winston + express-winston

## 📂 Struktur Proyek

```plaintext
src/
 ├── config/        # Konfigurasi Prisma Client, logger, dll.
 ├── middleware/    # Middleware (auth JWT, validasi Zod, error handler)
 ├── schema/        # Skema Zod untuk validasi request
 ├── controller/    # Controller untuk menangani request & response
 ├── services/      # Logika bisnis & akses database
 ├── routes/        # Definisi rute API
 ├── app.ts         # Inisialisasi aplikasi Express
 └── server.ts      # Entry point server

prisma/             # Skema Prisma & migrasi database
```

## Instalasi & Menjalankan

### 1) Clone

```bash
git clone https://github.com/AlbertChoe/jag-ai-be.git
cd jag-ai-be
```

### 2) Install deps

```bash
npm install
```

### 3) Environment

```bash
cp .env.example .env
# lalu isi nilai-nilai (lihat bagian Konfigurasi)
```

### 4) Prisma: generate client

```bash
npx prisma generate
```

### 5) Jalankan

```bash
npm run dev
# atau
npm run build && npm start   # production build

```
