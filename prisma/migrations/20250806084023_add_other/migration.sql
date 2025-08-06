/*
  Warnings:

  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "public"."Role" AS ENUM ('PETANI', 'PAKAR');

-- DropTable
DROP TABLE "public"."User";

-- CreateTable
CREATE TABLE "public"."users" (
    "user_id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "phone_number" TEXT,
    "email" TEXT,
    "password_hash" TEXT NOT NULL,
    "role" "public"."Role" NOT NULL DEFAULT 'PETANI',
    "location" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "users_pkey" PRIMARY KEY ("user_id")
);

-- CreateTable
CREATE TABLE "public"."lahan" (
    "lahan_id" SERIAL NOT NULL,
    "user_id_owner" INTEGER NOT NULL,
    "latitude" DOUBLE PRECISION NOT NULL,
    "longitude" DOUBLE PRECISION NOT NULL,
    "description" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "lahan_pkey" PRIMARY KEY ("lahan_id")
);

-- CreateTable
CREATE TABLE "public"."analisis_lahan" (
    "id" SERIAL NOT NULL,
    "lahan_id" INTEGER NOT NULL,
    "ndvi_score" DOUBLE PRECISION,
    "ndwi_score" DOUBLE PRECISION,
    "fertility_score" DOUBLE PRECISION,
    "rekomendasi_perawatan" TEXT,
    "kebutuhan_air_harian_liter" INTEGER,
    "cuaca_prediksi" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "analisis_lahan_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."penyakit_deteksi" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "image_url" TEXT NOT NULL,
    "penyakit" TEXT NOT NULL,
    "tingkat_keparahan" TEXT NOT NULL,
    "tindakan_penanganan" TEXT NOT NULL,
    "daftar_belanja" JSONB NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "penyakit_deteksi_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."konsultasi" (
    "konsultasi_id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "pakar_id" INTEGER NOT NULL,
    "topik" TEXT NOT NULL,
    "metode" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'terjadwal',
    "waktu_konsultasi" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "konsultasi_pkey" PRIMARY KEY ("konsultasi_id")
);

-- CreateTable
CREATE TABLE "public"."notifikasi_cuaca" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "tanggal" TIMESTAMP(3) NOT NULL,
    "suhu_harian" DOUBLE PRECISION NOT NULL,
    "curah_hujan_mm" DOUBLE PRECISION NOT NULL,
    "kelembapan" DOUBLE PRECISION NOT NULL,
    "rekomendasi_kegiatan" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "notifikasi_cuaca_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."health_check" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "image_url" TEXT,
    "analisis" TEXT,
    "rekomendasi" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "health_check_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_phone_number_key" ON "public"."users"("phone_number");

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "public"."users"("email");

-- AddForeignKey
ALTER TABLE "public"."lahan" ADD CONSTRAINT "lahan_user_id_owner_fkey" FOREIGN KEY ("user_id_owner") REFERENCES "public"."users"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."analisis_lahan" ADD CONSTRAINT "analisis_lahan_lahan_id_fkey" FOREIGN KEY ("lahan_id") REFERENCES "public"."lahan"("lahan_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."penyakit_deteksi" ADD CONSTRAINT "penyakit_deteksi_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."users"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."konsultasi" ADD CONSTRAINT "konsultasi_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."users"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."konsultasi" ADD CONSTRAINT "konsultasi_pakar_id_fkey" FOREIGN KEY ("pakar_id") REFERENCES "public"."users"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."notifikasi_cuaca" ADD CONSTRAINT "notifikasi_cuaca_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."users"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."health_check" ADD CONSTRAINT "health_check_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."users"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;
