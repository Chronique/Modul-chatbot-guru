"use client";
import { useState, useRef, useEffect } from 'react';
import { Send, Paperclip, Bot, FileText, CheckCircle, Loader2, ArrowLeft, X, Image as ImageIcon } from 'lucide-react';
import Link from 'next/link';

export default function GuruPage() {
  // --- STATE ---
  const [messages, setMessages] = useState<any[]>([
    {
      id: 1, 
      sender: 'bot', 
      text: "Halo Guru! 👨‍🏫\nSilakan upload materi (PDF/Docx/Foto) untuk Ujian Mingguan.\n\nSaya akan membaca materi tersebut dan membuatkan soal otomatis untuk siswa.", 
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [inputText, setInputText] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isBotTyping, setIsBotTyping] = useState(false);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Auto scroll
  useEffect(() => { messagesEndRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages, isBotTyping]);

  // --- LOGIKA KIRIM & GENERATE SOAL ---
  const handleSend = () => {
    if (!inputText.trim() && !selectedFile) return;

    // 1. Tampilkan Pesan Guru
    const newMsg = { 
        id: Date.now(), 
        sender: 'user', 
        text: inputText, 
        file: selectedFile, 
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) 
    };
    
    setMessages(prev => [...prev, newMsg]);
    const currentFile = selectedFile;
    setInputText("");
    setSelectedFile(null);
    setIsBotTyping(true);

    // 2. OTAK AI (SIMULASI)
    setTimeout(() => {
      let replyText = "";
      const textLower = newMsg.text.toLowerCase();

      // --- SKENARIO 1: UPLOAD FILE (BUAT UJIAN) ---
      if (currentFile) {
        // ... (Logika buat ujian yang tadi, biarkan sama) ...
        const soalUjianDummy = {
            judul: "Ujian: " + currentFile.name,
            durasi: 45,
            soal: [
                { q: "Apa ibukota Indonesia?", options: ["Jakarta", "IKN", "Bandung", "Surabaya"], ans: 1 },
                { q: "Siapa presiden pertama?", options: ["Soeharto", "Soekarno", "Habibie", "Jokowi"], ans: 1 },
                { q: "5 x 5 = ?", options: ["10", "25", "55", "15"], ans: 1 },
            ]
        };
        localStorage.setItem('ujian_aktif', JSON.stringify(soalUjianDummy));
        
        replyText = `✅ File "${currentFile.name}" diterima.\n🤖 AI sukses membuat soal otomatis.\n\n📢 STATUS: UJIAN AKTIF!\nSiswa sudah bisa mengerjakan sekarang.`;
      
      } 
      
      // --- SKENARIO 2: TANYA NILAI SISWA (FITUR BARU) ---
      else if (textLower.includes('nilai') || textLower.includes('skor') || textLower.includes('hasil')) {
        
        // Coba tebak nama siswa dari kalimat (ambil kata setelah "nilai" atau ambil seadanya)
        // Contoh input: "Berapa nilai Budi Santoso?" -> Kita ambil "Budi Santoso"
        let namaSiswa = newMsg.text.replace(/(berapa|cek|lihat|tampilkan|nilai|skor|hasil|siswa|kelas)/gi, "").trim();
        if (!namaSiswa) namaSiswa = "Siswa Tersebut"; // Default kalau nama gak ketemu

        // Simulasi Nilai Acak (Biar kelihatan real)
        const nilaiRandom = Math.floor(Math.random() * (100 - 70 + 1)) + 70; // Nilai antara 70-100
        const status = nilaiRandom >= 75 ? "LULUS ✅" : "REMEDIAL ⚠️";

        replyText = `🔍 Sedang mencari data "${namaSiswa}" di database kelas...\n\n📊 **HASIL PENCARIAN:**\n👤 Nama: ${namaSiswa}\n🏫 Kelas: X - IPA 1 (Terdeteksi)\n📝 Skor Ujian: **${nilaiRandom}/100**\n\nStatus: ${status}`;
      }

      // --- COMMAND BARU 1: CEK JADWAL ---
      else if (textLower.includes('jadwal') || textLower.includes('pelajaran')) {
        replyText = "📅 **JADWAL HARI INI:**\n\n07:00 - Upacara\n08:00 - Matematika (X-IPA 1)\n10:00 - Fisika (XI-IPA 2)\n13:00 - Rapat Guru\n\nJangan lupa bawa spidol ya Pak/Bu! 😉";
      }

      // --- COMMAND BARU 2: CEK ABSENSI ---
      else if (textLower.includes('absen') || textLower.includes('masuk') || textLower.includes('hadir')) {
        // Logika ambil nama siswa (sama kayak nilai tadi)
        let namaSiswa = newMsg.text.replace(/(absen|cek|lihat|apakah|masuk|hadir|siswa)/gi, "").trim();
        if (!namaSiswa) namaSiswa = "Siswa Tersebut";

        // Simulasi status kehadiran random
        const statusHadir = Math.random() > 0.3 ? "HADIR ✅" : "ALPHA ❌";
        const jamMasuk = statusHadir.includes("HADIR") ? "06:45 WIB" : "-";

        replyText = `📋 **DATA KEHADIRAN**\nNama: ${namaSiswa}\nStatus: **${statusHadir}**\nJam Masuk: ${jamMasuk}\n\nCatatan: Data diambil dari fingerprint sekolah.`;
      }

      // Kirim Balasan Bot
      setMessages(prev => [...prev, {
        id: Date.now()+1, 
        sender: 'bot', 
        text: replyText, 
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }]);
      setIsBotTyping(false);
    }, 1500); // Delay 1.5 detik

    



  }

  

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex flex-col h-screen bg-[#EFE7DD] font-sans">
      
      {/* --- HEADER --- */}
      <div className="bg-[#008069] p-3 flex items-center gap-3 shadow-md sticky top-0 z-10">
         <Link href="/" className="text-white hover:bg-white/20 p-2 rounded-full transition">
            <ArrowLeft size={20} />
         </Link>
         <div className="bg-white p-1.5 rounded-full">
            <Bot className="text-[#008069] w-5 h-5" />
         </div>
         <div className="text-white flex-1">
            <h1 className="font-bold text-lg leading-tight">Generator Ujian AI</h1>
            <p className="text-xs opacity-90">Mode Guru • Online</p>
         </div>
      </div>
      
      {/* --- AREA CHAT --- */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-[url('https://user-images.githubusercontent.com/15075759/28719144-86dc0f70-73b1-11e7-911d-60d70fcded21.png')] bg-repeat opacity-95">
        {messages.map((msg) => (
          <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[85%] rounded-lg p-3 shadow-sm text-sm relative ${
              msg.sender === 'user' ? 'bg-[#E7FFDB] text-gray-800 rounded-tr-none' : 'bg-white text-gray-800 rounded-tl-none'
            }`}>
              
              {/* File Preview di Chat Bubble */}
              {msg.file && (
                <div className="flex items-center gap-3 mb-2 bg-black/5 p-2 rounded-md">
                   <FileText size={24} className="text-blue-500"/>
                   <div className="overflow-hidden">
                      <p className="font-semibold truncate w-32">{msg.file.name}</p>
                      <p className="text-[10px] opacity-60">{(msg.file.size/1024).toFixed(0)} KB</p>
                   </div>
                </div>
              )}

              <p className="whitespace-pre-wrap leading-relaxed pb-3">{msg.text}</p>
              <span className="text-[10px] text-gray-400 absolute bottom-1 right-2 flex items-center gap-1">
                {msg.timestamp} {msg.sender === 'user' && <CheckCircle size={12} className="text-blue-500" />}
              </span>
            </div>
          </div>
        ))}
        {isBotTyping && (
           <div className="bg-white w-fit p-3 rounded-lg rounded-tl-none shadow-sm flex items-center gap-2">
              <Loader2 className="animate-spin text-[#008069]" size={14} />
              <span className="text-xs text-gray-500">AI sedang membuat soal...</span>
           </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* --- INPUT AREA (STYLE WA) --- */}
      <div className="bg-[#F0F2F5] p-2 flex items-end gap-2">
         
         {/* Kapsul Putih */}
         <div className="flex-1 bg-white rounded-3xl flex items-end border border-gray-200 shadow-sm px-4 py-2 relative focus-within:ring-1 focus-within:ring-[#008069]">
            
            {/* Pop-up Preview File */}
            {selectedFile && (
              <div className="absolute -top-12 left-0 bg-white p-2 rounded-lg shadow border flex items-center gap-2 animate-in slide-in-from-bottom-2">
                 <FileText size={16} className="text-blue-600"/>
                 <span className="text-xs max-w-[150px] truncate">{selectedFile.name}</span>
                 <button onClick={() => setSelectedFile(null)} className="text-red-500 p-1"><X size={14}/></button>
              </div>
            )}

            <textarea 
               value={inputText}
               onChange={(e) => setInputText(e.target.value)}
               onKeyDown={handleKeyPress}
               placeholder="Ketik perintah / upload materi..."
               className="w-full bg-transparent border-none outline-none resize-none text-gray-800 placeholder:text-gray-400 max-h-32 py-1 text-sm md:text-base mr-10"
               rows={1}
               style={{ minHeight: '24px' }}
            />

            {/* Tombol Attach (Di dalam kapsul kanan) */}
            <div className="absolute right-3 bottom-2 flex items-center gap-2">
               <input type="file" ref={fileInputRef} className="hidden" onChange={(e) => e.target.files?.[0] && setSelectedFile(e.target.files[0])}/>
               <button onClick={() => fileInputRef.current?.click()} className="text-gray-400 hover:text-[#008069] transition-transform active:scale-90 rotate-45">
                  <Paperclip size={22} />
               </button>
            </div>
         </div>

         {/* Tombol Kirim */}
         <button onClick={handleSend} disabled={!inputText && !selectedFile} className="p-3 bg-[#008069] rounded-full text-white shadow-md hover:scale-105 active:scale-95 transition-all flex-shrink-0">
            <Send size={20} />
         </button>
      </div>

    </div>
  );
}