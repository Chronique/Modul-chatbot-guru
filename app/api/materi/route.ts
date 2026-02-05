import { NextResponse } from 'next/server';

// 1. Ini ceritanya Database Soal (Nanti bisa diganti database beneran)
const databaseMateri = [
  {
    id: 1,
    mapel: "Matematika",
    kelas: "X SMA",
    judul: "Logaritma Dasar & Eksponen",
    tipe: "Latihan Soal",
    downloadUrl: "https://docs.google.com/document/d/contoh1", 
    tanggal: "2024-02-05"
  },
  {
    id: 2,
    mapel: "Fisika",
    kelas: "XII SMA",
    judul: "Hukum Newton & Gaya Gravitasi",
    tipe: "Rangkuman Materi",
    downloadUrl: "https://docs.google.com/pdf/contoh2",
    tanggal: "2024-02-04"
  },
  {
    id: 3,
    mapel: "Bahasa Inggris",
    kelas: "IX SMP",
    judul: "Tenses: Past Perfect vs Present Perfect",
    tipe: "PPT Presentasi",
    downloadUrl: "https://docs.google.com/ppt/contoh3",
    tanggal: "2024-02-03"
  },
  {
    id: 4,
    mapel: "Biologi",
    kelas: "XI SMA",
    judul: "Sistem Pencernaan Manusia",
    tipe: "Video Pembelajaran",
    downloadUrl: "https://youtube.com/contoh4",
    tanggal: "2024-02-05"
  }
];

export async function GET() {
  // 2. Simulasi loading biar kerasa kayak aplikasi beneran
  // (Nanti dihapus kalau sudah production)
  await new Promise(resolve => setTimeout(resolve, 1000));

  return NextResponse.json({ 
    status: "success", 
    data: databaseMateri 
  });
}