"use client";
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { User, School, Hash, ArrowRight, BookOpen, Clock, CheckCircle } from 'lucide-react';

export default function SiswaPage() {
  // --- STATE DATA ---
  const [step, setStep] = useState<'login' | 'exam' | 'finish'>('login');
  
  // Data Siswa (Diisi saat login)
  const [siswa, setSiswa] = useState({ nama: '', kelas: '', nisn: '' });
  
  // Data Ujian (Diambil dari LocalStorage)
  const [ujian, setUjian] = useState<any>(null);
  
  // Jawaban Siswa
  const [jawaban, setJawaban] = useState<{[key: number]: number}>({});

  // Cek apakah ada ujian dari Guru?
  useEffect(() => {
    const data = localStorage.getItem('ujian_aktif');
    if (data) {
      setUjian(JSON.parse(data));
    }
  }, []);

  // --- LOGIKA LOGIN ---
  const handleLogin = () => {
    if (!siswa.nama || !siswa.kelas || !siswa.nisn) {
      alert("Mohon lengkapi Nama, Kelas, dan NISN!");
      return;
    }
    setStep('exam');
  };

  // --- JIKA BELUM ADA UJIAN DARI GURU ---
  if (!ujian && step !== 'login') { // Tetap bisa login dulu, baru dicek
     // ... logic handling kosong (opsional)
  }

  // --- TAMPILAN 1: HALAMAN LOGIN SISWA ---
  if (step === 'login') {
    return (
      <div className="min-h-screen bg-slate-100 flex items-center justify-center p-4 font-sans">
        <div className="bg-white max-w-md w-full p-8 rounded-2xl shadow-xl border border-slate-200">
          
          <div className="text-center mb-8">
            <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <BookOpen className="text-blue-600 w-8 h-8" />
            </div>
            <h1 className="text-2xl font-bold text-slate-800">Ujian Berbasis Komputer</h1>
            <p className="text-slate-500 text-sm">Silakan masukkan identitas untuk memulai.</p>
          </div>

          <div className="space-y-4">
            {/* Input Nama */}
            <div>
              <label className="block text-xs font-bold text-slate-600 mb-1 uppercase tracking-wider">Nama Lengkap</label>
              <div className="flex items-center border rounded-lg px-3 py-2 focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-blue-500 transition-all bg-slate-50">
                <User className="text-slate-400 w-5 h-5 mr-3" />
                <input 
                  type="text" 
                  placeholder="Contoh: Budi Santoso"
                  className="bg-transparent border-none outline-none w-full text-slate-800 placeholder:text-slate-400"
                  value={siswa.nama}
                  onChange={(e) => setSiswa({...siswa, nama: e.target.value})}
                />
              </div>
            </div>

            {/* Input NISN */}
            <div>
              <label className="block text-xs font-bold text-slate-600 mb-1 uppercase tracking-wider">NISN</label>
              <div className="flex items-center border rounded-lg px-3 py-2 focus-within:ring-2 focus-within:ring-blue-500 transition-all bg-slate-50">
                <Hash className="text-slate-400 w-5 h-5 mr-3" />
                <input 
                  type="number" 
                  placeholder="1234567890"
                  className="bg-transparent border-none outline-none w-full text-slate-800 placeholder:text-slate-400"
                  value={siswa.nisn}
                  onChange={(e) => setSiswa({...siswa, nisn: e.target.value})}
                />
              </div>
            </div>

            {/* Input Kelas */}
            <div>
              <label className="block text-xs font-bold text-slate-600 mb-1 uppercase tracking-wider">Kelas</label>
              <div className="flex items-center border rounded-lg px-3 py-2 focus-within:ring-2 focus-within:ring-blue-500 transition-all bg-slate-50">
                <School className="text-slate-400 w-5 h-5 mr-3" />
                <select 
                  className="bg-transparent border-none outline-none w-full text-slate-800 cursor-pointer"
                  value={siswa.kelas}
                  onChange={(e) => setSiswa({...siswa, kelas: e.target.value})}
                >
                  <option value="">-- Pilih Kelas --</option>
                  <option value="X - IPA 1">X - IPA 1</option>
                  <option value="X - IPA 2">X - IPA 2</option>
                  <option value="X - IPS 1">X - IPS 1</option>
                  <option value="XI - IPA 1">XI - IPA 1</option>
                  <option value="XII - IPA 1">XII - IPA 1</option>
                </select>
              </div>
            </div>

            <button 
              onClick={handleLogin}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-xl shadow-lg shadow-blue-200 transition-transform active:scale-95 flex items-center justify-center gap-2 mt-6"
            >
              MASUK UJIAN <ArrowRight size={18} />
            </button>
          </div>

          <div className="mt-6 text-center">
            <Link href="/" className="text-xs text-slate-400 hover:text-blue-500 transition">Kembali ke Menu Utama</Link>
          </div>

        </div>
      </div>
    );
  }

  // --- TAMPILAN 2: HALAMAN MENGERJAKAN UJIAN ---
  
  // Cek kalau ternyata Guru belum bikin soal
  if (!ujian) {
    return (
      <div className="h-screen flex flex-col items-center justify-center bg-slate-50 p-6 text-center font-sans">
        <img src="https://cdni.iconscout.com/illustration/premium/thumb/empty-state-2130362-1800926.png" className="w-64 opacity-80" alt="Empty" />
        <h1 className="text-xl font-bold text-slate-600 mt-4">Belum Ada Ujian Aktif</h1>
        <p className="text-slate-400 text-sm mb-6">Pak Guru belum mengupload materi ujian.</p>
        <button onClick={() => window.location.reload()} className="bg-slate-800 text-white px-6 py-2 rounded-full text-sm">Cek Lagi</button>
      </div>
    );
  }

  // Tampilan Selesai
  if (step === 'finish') {
    return (
      <div className="h-screen flex flex-col items-center justify-center bg-green-50 font-sans p-6 text-center">
        <div className="bg-green-100 p-6 rounded-full mb-6 animate-bounce">
            <CheckCircle className="text-green-600 w-16 h-16" />
        </div>
        <h1 className="text-3xl font-bold text-green-700 mb-2">Ujian Selesai!</h1>
        <p className="text-slate-600">Terima kasih <b>{siswa.nama}</b>, jawabanmu sudah tersimpan.</p>
        <div className="bg-white p-4 rounded-xl border border-green-200 mt-6 w-full max-w-sm">
            <div className="flex justify-between text-sm py-2 border-b">
                <span className="text-slate-500">Nama</span>
                <span className="font-bold text-slate-800">{siswa.nama}</span>
            </div>
            <div className="flex justify-between text-sm py-2">
                <span className="text-slate-500">Kelas</span>
                <span className="font-bold text-slate-800">{siswa.kelas}</span>
            </div>
        </div>
        <Link href="/" className="mt-8 bg-slate-800 text-white px-8 py-3 rounded-full hover:bg-slate-900 transition">Kembali ke Home</Link>
      </div>
    );
  }

  // Tampilan Soal
  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      
      {/* HEADER UJIAN (Sticky) */}
      <div className="bg-white border-b shadow-sm sticky top-0 z-10 px-4 py-3 flex justify-between items-center">
        <div>
          <h1 className="font-bold text-slate-800 text-lg md:text-xl truncate max-w-[200px] md:max-w-none">{ujian.judul}</h1>
          <div className="flex items-center gap-4 text-xs text-slate-500 mt-1">
             <span className="flex items-center gap-1"><User size={12}/> {siswa.nama}</span>
             <span className="flex items-center gap-1 bg-blue-50 text-blue-600 px-2 py-0.5 rounded border border-blue-100">{siswa.kelas}</span>
          </div>
        </div>
        <div className="bg-slate-100 px-3 py-1.5 rounded-lg flex items-center gap-2 border border-slate-200">
           <Clock size={16} className="text-red-500 animate-pulse" />
           <span className="font-mono font-bold text-slate-700">{ujian.durasi}:00</span>
        </div>
      </div>

      {/* AREA SOAL */}
      <div className="max-w-3xl mx-auto p-6 space-y-6 pb-20">
        {ujian.soal.map((soal: any, index: number) => (
          <div key={index} className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
            <div className="flex gap-3 mb-4">
               <span className="bg-blue-600 text-white w-8 h-8 flex-shrink-0 flex items-center justify-center rounded-lg font-bold text-sm">
                 {index + 1}
               </span>
               <p className="text-slate-800 font-medium text-lg leading-relaxed">{soal.q}</p>
            </div>
            
            <div className="space-y-2 ml-11">
              {soal.options.map((opt: string, i: number) => (
                <label key={i} className={`flex items-center gap-3 p-3 border rounded-lg cursor-pointer transition-all group ${
                    jawaban[index] === i 
                    ? 'bg-blue-50 border-blue-500 ring-1 ring-blue-500' 
                    : 'hover:bg-slate-50 hover:border-blue-300'
                }`}>
                  <div className={`w-5 h-5 rounded-full border flex items-center justify-center ${
                      jawaban[index] === i ? 'border-blue-600 bg-blue-600' : 'border-slate-300'
                  }`}>
                      {jawaban[index] === i && <div className="w-2 h-2 bg-white rounded-full"></div>}
                  </div>
                  <input 
                    type="radio" 
                    name={`soal-${index}`} 
                    className="hidden" 
                    onChange={() => setJawaban({...jawaban, [index]: i})}
                  />
                  <span className="text-slate-700 text-sm md:text-base">{opt}</span>
                </label>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* FOOTER TOMBOL KIRIM */}
      <div className="fixed bottom-0 left-0 w-full bg-white p-4 border-t shadow-[0_-5px_20px_rgba(0,0,0,0.05)] flex justify-center">
         <button 
            onClick={() => {
                if(Object.keys(jawaban).length < ujian.soal.length) {
                    if(!confirm("Masih ada soal yang kosong. Yakin mau kumpul?")) return;
                }
                setStep('finish');
            }}
            className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-12 rounded-full shadow-lg shadow-green-200 transition-transform active:scale-95 flex items-center gap-2"
         >
            <CheckCircle size={20}/> SELESAI & KUMPULKAN
         </button>
      </div>

    </div>
  );
}