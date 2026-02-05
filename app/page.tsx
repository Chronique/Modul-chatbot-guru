"use client";
import Link from 'next/link';
import { UserCog, GraduationCap } from 'lucide-react';

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
      <div className="max-w-2xl w-full grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Tombol Masuk Guru */}
        <Link href="/guru/buat-ujian" className="group">
          <div className="bg-white p-8 rounded-2xl shadow-sm border hover:border-blue-500 hover:shadow-xl transition-all text-center h-full flex flex-col items-center justify-center gap-4">
            <div className="bg-blue-100 p-4 rounded-full group-hover:bg-blue-600 transition-colors">
              <UserCog size={40} className="text-blue-600 group-hover:text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-slate-800">Mode Guru</h2>
              <p className="text-slate-500 mt-2">Upload materi & buat soal ujian otomatis.</p>
            </div>
          </div>
        </Link>

        {/* Tombol Masuk Siswa */}
        <Link href="/siswa/kerjakan" className="group">
          <div className="bg-white p-8 rounded-2xl shadow-sm border hover:border-green-500 hover:shadow-xl transition-all text-center h-full flex flex-col items-center justify-center gap-4">
            <div className="bg-green-100 p-4 rounded-full group-hover:bg-green-600 transition-colors">
              <GraduationCap size={40} className="text-green-600 group-hover:text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-slate-800">Mode Siswa</h2>
              <p className="text-slate-500 mt-2">Masuk kelas & kerjakan ujian aktif.</p>
            </div>
          </div>
        </Link>

      </div>
    </main>
  );
}