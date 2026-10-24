import React, { useState } from 'react';
import {
  Info,
  ShieldCheck,
  CheckCircle2,
  FileSpreadsheet,
  ChevronDown,
  ChevronUp,
  Lock,
  Layers,
  ArrowRight,
  ExternalLink,
  BookOpen,
} from 'lucide-react';

export const TentangView: React.FC = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const faqs = [
    {
      q: 'Apakah kader harus mendaftarkan akun pribadi baru untuk menggunakan SI-KAWAN?',
      a: 'Tidak. Seluruh direktori, jadwal posyandu, dan materi edukasi bersifat publik terbuka tanpa perlu registrasi mandiri. Akun khusus berbasis peran (RBAC) hanya diterbitkan secara terpusat oleh Admin Puskesmas untuk Bidan Desa dan Koordinator yang bertugas memvalidasi data.',
    },
    {
      q: 'Bagaimana jika tautan Google Sheets Posyandu saya tidak bisa dibuka atau muncul pesan izin ditolak?',
      a: 'Izin akses lembar kerja Google Sheets diatur oleh akun resmi Posyandu desa masing-masing. Pastikan browser Anda telah masuk (login) menggunakan akun Google desa yang terdaftar. Jika tetap terkendala, hubungi koordinator desa atau ajukan perbaikan melalui menu Usulan Koreksi Data.',
    },
    {
      q: 'Apakah data kesehatan sasaran warga disimpan pada server web luar pihak ketiga?',
      a: 'Tidak. Portal SI-KAWAN bertindak murni sebagai jembatan akses dan direktori penunjuk arah satu pintu. Seluruh data rekam medis, NIK, dan hasil penimbangan warga tersimpan langsung di dalam repositori Google Sheets resmi UPTD Puskesmas Kepanjen dengan enkripsi Google Cloud.',
    },
    {
      q: 'Mengapa jadwal Posyandu di tempat saya berstatus "Data Belum Tersedia"?',
      a: 'Sesuai dengan Pilar Integritas & Tanpa Nol Palsu, sistem tidak akan menampilkan perkiraan jadwal palsu jika musyawarah jadwal desa belum diverifikasi resmi oleh Bidan Pembina Wilayah. Setelah divalidasi, jadwal akan otomatis tampil secara transparan.',
    },
  ];

  return (
    <div className="space-y-8">
      {/* Top Header */}
      <div>
        <div className="flex flex-wrap items-center gap-2 mb-2 text-xs">
          <span className="rounded-full bg-[#d6fced] px-3 py-0.5 font-semibold text-[#17503C]">
            v2.4.0 Siklus Hidup
          </span>
          <span className="rounded-full bg-[#DCFCE7] px-3 py-0.5 font-semibold text-[#166534]">
            Portal Akses Resmi UPTD Puskesmas Kepanjen
          </span>
        </div>

        <h2 className="text-2xl font-bold text-[#12352B] tracking-tight">
          Tentang SI-KAWAN POSYANDU
        </h2>
        <p className="mt-1 text-xs text-[#5B7A70] max-w-2xl">
          Mengenal sistem kolaborasi administrasi, wawasan, akses, dan navigasi informasi bagi kader Posyandu di 18 desa/kelurahan Kecamatan Kepanjen, Kabupaten Malang.
        </p>
      </div>

      {/* Hero Presentation Card */}
      <div className="rounded-2xl border border-[#D6EBE1] bg-[#17503C] p-7 text-white shadow-kawan-rest">
        <div className="flex flex-wrap items-center gap-2 text-[10px] uppercase font-bold text-[#71daab] mb-2 tracking-wider">
          <span>DOKUMEN KETETAPAN #26</span>
          <span>•</span>
          <span>INISIASI ILP KEMENKES</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          <div className="lg:col-span-8">
            <h3 className="text-2xl font-black tracking-tight leading-tight">
              SI-KAWAN POSYANDU
            </h3>
            <p className="text-xs text-[#9ad3b8] font-semibold mt-0.5">
              Sistem Informasi Kolaborasi, Akses, dan Integrasi Posyandu
            </p>
            <p className="text-xs text-[#d3f9ea] mt-2 italic">
              "Teman Kader untuk Belajar dan Melayani" — Jargon: "Saling Hadir, Bantu, dan Tumbuh Bersama"
            </p>

            <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs border-t border-[#1f5f48] pt-4">
              <div>
                <span className="text-[10px] uppercase text-[#71daab] block">DATA UNIT</span>
                <strong className="text-base font-bold font-mono text-white block">108 Posyandu</strong>
                <span className="text-[10px] text-[#9ad3b8]">Terdata aktif di sistem</span>
              </div>
              <div>
                <span className="text-[10px] uppercase text-[#71daab] block">CAKUPAN WILAYAH</span>
                <strong className="text-base font-bold font-mono text-white block">18 Desa / Kel.</strong>
                <span className="text-[10px] text-[#9ad3b8]">Kecamatan Kepanjen</span>
              </div>
              <div>
                <span className="text-[10px] uppercase text-[#71daab] block">INTEGRASI ILP</span>
                <strong className="text-base font-bold font-mono text-white block">5 Siklus Hidup</strong>
                <span className="text-[10px] text-[#9ad3b8]">Bumil hingga Lansia</span>
              </div>
              <div>
                <span className="text-[10px] uppercase text-[#71daab] block">STATUS DATA</span>
                <strong className="text-base font-bold font-mono text-white block">Google Workspace</strong>
                <span className="text-[10px] text-[#9ad3b8]">Terproteksi UPTD</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-4 rounded-xl border border-[#236850] bg-[#123e2e] p-5 text-center">
            <span className="text-[10px] uppercase tracking-wider text-[#71daab] font-bold block">
              FOKUS IMPLEMENTASI
            </span>
            <strong className="text-base font-bold text-white block mt-1">
              Tahap 1: Satu Pintu
            </strong>
            <p className="text-xs text-[#9ad3b8] mt-1 leading-relaxed">
              Integrasi Rantai Data Posyandu Prima UPTD Puskesmas Kepanjen
            </p>
          </div>
        </div>
      </div>

      {/* 4 Pilar Fondasi Transparan Tata Kelola Data */}
      <div className="space-y-3">
        <span className="text-[10px] uppercase font-bold tracking-wider text-[#5B7A70] block">
          KETETAPAN OPERASIONAL • Prinsip & Batasan Sistem
        </span>
        <h3 className="text-base font-bold text-[#12352B]">
          Fondasi Transparan Tata Kelola Data
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Pilar 1 */}
          <div className="rounded-xl border border-[#D6EBE1] bg-white p-5 shadow-kawan-rest flex flex-col justify-between">
            <div>
              <span className="text-[10px] uppercase font-bold text-[#5B7A70] block">
                PILAR 01
              </span>
              <h4 className="font-bold text-sm text-[#12352B] mt-1">
                Satu Pintu Akses
              </h4>
              <p className="text-xs text-[#5B7A70] mt-2 leading-relaxed">
                Menyatukan 18 tautan Linktree desa dan ratusan spreadsheet pelaporan ke dalam satu repositori terstandarisasi tanpa mengubah format kerja yang sudah dipahami kader.
              </p>
            </div>
            <span className="mt-4 rounded bg-[#E8F7F0] px-2.5 py-1 text-[11px] font-semibold text-[#17503C] inline-block">
              ✓ Bebas tautan terputus/kadaluarsa
            </span>
          </div>

          {/* Pilar 2 */}
          <div className="rounded-xl border border-[#D6EBE1] bg-white p-5 shadow-kawan-rest flex flex-col justify-between">
            <div>
              <span className="text-[10px] uppercase font-bold text-[#5B7A70] block">
                PILAR 02
              </span>
              <h4 className="font-bold text-sm text-[#12352B] mt-1">
                Bukan Pengganti Spreadsheet
              </h4>
              <p className="text-xs text-[#5B7A70] mt-2 leading-relaxed">
                Aplikasi tahap awal tidak menggantikan buku register fisik atau spreadsheet resmi yang sudah ada dengan formulir web baru, melainkan menjadi gerbang navigasi yang aman.
              </p>
            </div>
            <span className="mt-4 rounded bg-[#E8F7F0] px-2.5 py-1 text-[11px] font-semibold text-[#17503C] inline-block">
              ✓ Tanpa kurva belajar ganda bagi kader
            </span>
          </div>

          {/* Pilar 3 */}
          <div className="rounded-xl border border-[#D6EBE1] bg-white p-5 shadow-kawan-rest flex flex-col justify-between">
            <div>
              <span className="text-[10px] uppercase font-bold text-[#5B7A70] block">
                PILAR 03
              </span>
              <h4 className="font-bold text-sm text-[#12352B] mt-1">
                Integritas & Tanpa Nol Palsu
              </h4>
              <p className="text-xs text-[#5B7A70] mt-2 leading-relaxed">
                Bila data jadwal penimbangan atau materi belum divalidasi SK, sistem secara tegas menampilkan label "Data belum tersedia", bukan menampilkan angka nol palsu yang menyesatkan.
              </p>
            </div>
            <span className="mt-4 rounded bg-[#E8F7F0] px-2.5 py-1 text-[11px] font-semibold text-[#17503C] inline-block">
              ✓ Kejujuran metrik kesehatan publik
            </span>
          </div>

          {/* Pilar 4 */}
          <div className="rounded-xl border border-[#D6EBE1] bg-white p-5 shadow-kawan-rest flex flex-col justify-between">
            <div>
              <span className="text-[10px] uppercase font-bold text-[#5B7A70] block">
                PILAR 04
              </span>
              <h4 className="font-bold text-sm text-[#12352B] mt-1">
                Perlindungan Privasi Warga
              </h4>
              <p className="text-xs text-[#5B7A70] mt-2 leading-relaxed">
                Data pribadi sasaran (NIK, rekam medis individu) tersimpan di dokumen Google Sheets terenkripsi Puskesmas. Portal publik hanya menyajikan direktori layanan dan informasi agregat.
              </p>
            </div>
            <span className="mt-4 rounded bg-[#E8F7F0] px-2.5 py-1 text-[11px] font-semibold text-[#17503C] inline-block">
              ✓ Kepatuhan UU PDP & standar Kemenkes
            </span>
          </div>
        </div>
      </div>

      {/* Alur Kerja Integrasi Satu Pintu */}
      <div className="rounded-2xl border border-[#D6EBE1] bg-white p-6 shadow-kawan-rest space-y-4">
        <span className="text-[10px] uppercase font-bold tracking-wider text-[#5B7A70] block">
          ARSITEKTUR EKOSISTEM
        </span>
        <h3 className="text-base font-bold text-[#12352B]">
          Alur Kerja Integrasi Satu Pintu
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="rounded-xl border border-[#D6EBE1] bg-[#F7FCFA] p-4">
            <span className="h-6 w-6 rounded-full bg-[#17503C] text-white flex items-center justify-center font-bold text-xs font-mono">
              1
            </span>
            <strong className="text-sm text-[#12352B] block mt-2">
              Kader Posyandu (Pelaksana Lapangan)
            </strong>
            <p className="text-xs text-[#5B7A70] mt-1 leading-relaxed">
              Membuka SI-KAWAN untuk memilih nama desa dan Posyandu, kemudian diarahkan otomatis ke Google Sheets formulir penimbangan dan 5 klaster siklus hidup.
            </p>
          </div>

          <div className="rounded-xl border border-[#D6EBE1] bg-[#F7FCFA] p-4">
            <span className="h-6 w-6 rounded-full bg-[#17503C] text-white flex items-center justify-center font-bold text-xs font-mono">
              2
            </span>
            <strong className="text-sm text-[#12352B] block mt-2">
              Bidan Desa & Koordinator (Verifikator Wilayah)
            </strong>
            <p className="text-xs text-[#5B7A70] mt-1 leading-relaxed">
              Memantau kelengkapan laporan posyandu di wilayah kerjanya. Jika ada perubahan kader, link sheet baru, atau jadwal baru, mereka mengajukan koreksi mandiri.
            </p>
          </div>

          <div className="rounded-xl border border-[#D6EBE1] bg-[#F7FCFA] p-4">
            <span className="h-6 w-6 rounded-full bg-[#17503C] text-white flex items-center justify-center font-bold text-xs font-mono">
              3
            </span>
            <strong className="text-sm text-[#12352B] block mt-2">
              Admin UPTD Puskesmas (Pusat Validasi)
            </strong>
            <p className="text-xs text-[#5B7A70] mt-1 leading-relaxed">
              Menyetujui usulan koreksi tautan, merilis pengumuman puskesmas, mengunggah materi edukasi Kemenkes terbaru, dan memelihara keandalan akses link.
            </p>
          </div>
        </div>
      </div>

      {/* Interactive FAQ Accordion */}
      <div className="rounded-2xl border border-[#D6EBE1] bg-white p-6 shadow-kawan-rest space-y-4">
        <div>
          <span className="text-[10px] uppercase font-bold tracking-wider text-[#5B7A70] block">
            TANYA JAWAB PENGGUNA
          </span>
          <h3 className="text-base font-bold text-[#12352B] mt-0.5">
            Pertanyaan yang Sering Diajukan (FAQ)
          </h3>
        </div>

        <div className="divide-y divide-[#D6EBE1]">
          {faqs.map((faq, idx) => {
            const isOpen = openFaq === idx;
            return (
              <div key={idx} className="py-3.5">
                <button
                  onClick={() => setOpenFaq(isOpen ? null : idx)}
                  className="w-full flex items-center justify-between text-left text-xs font-bold text-[#12352B] hover:text-[#2F9E73] transition-colors cursor-pointer"
                >
                  <span>{faq.q}</span>
                  {isOpen ? (
                    <ChevronUp className="h-4 w-4 text-[#2F9E73] shrink-0" />
                  ) : (
                    <ChevronDown className="h-4 w-4 text-[#5B7A70] shrink-0" />
                  )}
                </button>
                {isOpen && (
                  <p className="mt-2 text-xs text-[#5B7A70] leading-relaxed pl-2 border-l-2 border-[#2F9E73]">
                    {faq.a}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
