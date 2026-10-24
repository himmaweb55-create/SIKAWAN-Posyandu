import React, { useState } from 'react';
import {
  Search,
  Calendar,
  BookOpen,
  Megaphone,
  Users,
  Info,
  FileSpreadsheet,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  FileText,
  Download,
  ExternalLink,
  Phone,
  Mail,
  MapPin,
  Sparkles,
  Building2,
} from 'lucide-react';
import { DISTRIBUSI_DESA } from '../../data/posyanduData';
import { ActivePage } from '../layout/Sidebar';

interface BerandaPublikViewProps {
  onNavigate: (page: ActivePage) => void;
  onSearchPosyandu?: (query: string) => void;
  onSearchFocus?: () => void;
}

export const BerandaPublikView: React.FC<BerandaPublikViewProps> = ({
  onNavigate,
  onSearchPosyandu,
  onSearchFocus,
}) => {
  const [searchInput, setSearchInput] = useState('');

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchInput.trim()) {
      onSearchPosyandu?.(searchInput.trim());
      onSearchFocus?.();
      onNavigate('cari-posyandu');
    }
  };

  return (
    <div className="space-y-8">
      {/* Top Welcome Notification Strip */}
      <div className="rounded-xl border border-[#BBF7D0] bg-[#DCFCE7]/70 p-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2 shadow-2xs">
        <div className="flex items-center gap-2.5">
          <div className="flex h-7 w-7 items-center justify-center rounded-md bg-[#2F9E73] text-white">
            <ShieldCheck className="h-4 w-4" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-xs text-[#12352B]">
                Teman Kader untuk Belajar dan Melayani
              </span>
              <span className="rounded bg-[#d6fced] px-2 py-0.5 text-[10px] font-semibold text-[#166534]">
                UPTD Puskesmas Kepanjen
              </span>
            </div>
            <p className="text-[11px] text-[#386e59]">
              "Saling Hadir, Bantu, dan Tumbuh Bersama" — Pelayanan Terintegrasi Siklus Hidup
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2 text-xs font-semibold text-[#166534]">
          <span className="h-2 w-2 rounded-full bg-[#2F9E73] animate-pulse"></span>
          <span>Sistem Aktif • Wilayah Kepanjen</span>
        </div>
      </div>

      {/* Hero Section Split */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        {/* Left Hero Card */}
        <div className="lg:col-span-8 rounded-2xl border border-[#D6EBE1] bg-white p-7 shadow-kawan-rest flex flex-col justify-between">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-[#D6EBE1] bg-[#E8F7F0] px-3 py-1 text-xs font-semibold text-[#17503C] mb-3">
              <ShieldCheck className="h-3.5 w-3.5 text-[#2F9E73]" />
              <span>PORTAL RESMI POSYANDU KEPANJEN</span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#12352B] leading-tight">
              SI-KAWAN POSYANDU
            </h2>
            <p className="mt-2 text-sm text-[#5B7A70] leading-relaxed max-w-2xl">
              Portal Satu Pintu Akses Pelaporan Spreadsheet, Informasi, dan Pustaka Edukasi Kader Posyandu Se-Kecamatan Kepanjen, Kabupaten Malang.
            </p>

            {/* Quick Search */}
            <form onSubmit={handleSearchSubmit} className="mt-6 flex gap-2 max-w-xl">
              <div className="relative flex-1">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-[#5B7A70]" />
                <input
                  type="text"
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  placeholder="Cari Posyandu atau desa/kelurahan..."
                  className="w-full rounded-xl border border-[#D6EBE1] bg-[#F7FCFA] pl-10 pr-4 py-2.5 text-xs text-[#12352B] placeholder:text-[#5B7A70] focus:border-[#2F9E73] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#2F9E73]/15 transition-all"
                />
              </div>
              <button
                type="submit"
                className="rounded-xl bg-[#2F9E73] px-5 py-2.5 font-semibold text-xs text-white hover:bg-[#268762] transition-colors shadow-sm cursor-pointer"
              >
                Cari
              </button>
            </form>

            {/* Actions */}
            <div className="mt-5 flex flex-wrap gap-3">
              <button
                onClick={() => onNavigate('gateway-formulir')}
                className="flex items-center gap-2 rounded-xl bg-[#17503C] px-4 py-2.5 font-semibold text-xs text-white hover:bg-[#123e2e] transition-colors shadow-sm cursor-pointer"
              >
                <span>Masuk untuk Akses Formulir</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </button>
              <button
                onClick={() => onNavigate('cari-posyandu')}
                className="rounded-xl border border-[#D6EBE1] bg-white px-4 py-2.5 font-semibold text-xs text-[#17503C] hover:bg-[#E8F7F0] transition-colors cursor-pointer"
              >
                Jelajahi 108 Posyandu
              </button>
            </div>
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-6 pt-5 border-t border-[#D6EBE1] text-xs text-[#5B7A70]">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-[#2F9E73]" />
              <span>Integrasi Google Workspace</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-[#2F9E73]" />
              <span>Akses Terverifikasi Puskesmas</span>
            </div>
          </div>
        </div>

        {/* Right Hero Card: Kolaborasi Kader & Visual */}
        <div className="lg:col-span-4 rounded-2xl border border-[#D6EBE1] bg-[#d0f6e7]/40 p-6 shadow-kawan-rest flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#386e59]">
                  KOLABORASI KADER POSYANDU
                </span>
                <h3 className="text-base font-bold text-[#12352B]">
                  Layanan Siklus Hidup
                </h3>
              </div>
              <div className="h-8 w-8 rounded-lg bg-[#2F9E73]/20 flex items-center justify-center text-[#17503C]">
                <Users className="h-4 w-4" />
              </div>
            </div>

            {/* Illustration Card */}
            <div className="mt-4 rounded-xl overflow-hidden border border-[#D6EBE1] bg-white p-4 shadow-2xs">
              <div className="h-36 rounded-lg bg-linear-to-tr from-[#17503C] via-[#2F9E73] to-[#71daab] p-4 text-white flex flex-col justify-end">
                <span className="text-[10px] uppercase font-semibold tracking-wider text-[#d3f9ea]">
                  Puskesmas Ramah Publik
                </span>
                <p className="text-xs font-bold leading-snug mt-1">
                  Mendampingi masyarakat Banurejo hingga Kemiri menuju keluarga sehat paripurna.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-5 rounded-xl border border-[#BBF7D0] bg-[#DCFCE7] p-3 flex items-center justify-between text-xs text-[#166534]">
            <div className="flex items-center gap-2">
              <FileSpreadsheet className="h-4 w-4 text-[#2F9E73]" />
              <div>
                <span className="font-bold block text-[11px]">Mekanisme Google Sheets</span>
                <span className="text-[10px] text-[#386e59]">Sinkronisasi data kader terkoordinasi</span>
              </div>
            </div>
            <span className="rounded bg-[#2F9E73] px-2 py-0.5 font-mono text-[10px] font-bold text-white uppercase">
              LIVE
            </span>
          </div>
        </div>
      </div>

      {/* Ringkasan Sistem Wilayah (3 KPI Cards) */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-bold text-[#12352B] tracking-tight">
            Ringkasan Sistem Wilayah
          </h3>
          <span className="text-xs text-[#5B7A70]">
            Statistik terkini pendataan Posyandu di Kecamatan Kepanjen
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="rounded-xl border border-[#D6EBE1] bg-white p-5 shadow-kawan-rest flex items-center justify-between">
            <div>
              <span className="text-xs font-semibold text-[#5B7A70] block">Posyandu Terdaftar</span>
              <div className="flex items-baseline gap-2 mt-1">
                <span className="text-2xl font-bold font-mono text-[#12352B]">108</span>
                <span className="rounded-full bg-[#DCFCE7] px-2 py-0.5 text-[11px] font-bold text-[#166534]">
                  Aktif
                </span>
              </div>
              <span className="text-[11px] text-[#5B7A70] mt-1 block">
                Tersebar di 18 desa/kelurahan
              </span>
            </div>
            <div className="h-10 w-10 rounded-xl bg-[#E8F7F0] text-[#2F9E73] flex items-center justify-center">
              <MapPin className="h-5 w-5" />
            </div>
          </div>

          <div className="rounded-xl border border-[#D6EBE1] bg-white p-5 shadow-kawan-rest flex items-center justify-between">
            <div>
              <span className="text-xs font-semibold text-[#5B7A70] block">Wilayah Kerja</span>
              <div className="flex items-baseline gap-2 mt-1">
                <span className="text-2xl font-bold font-mono text-[#12352B]">18</span>
                <span className="text-xs font-medium text-[#5B7A70]">Unit</span>
              </div>
              <span className="text-[11px] text-[#5B7A70] mt-1 block">
                Desa & Kelurahan Kec. Kepanjen
              </span>
            </div>
            <div className="h-10 w-10 rounded-xl bg-[#E8F7F0] text-[#2F9E73] flex items-center justify-center">
              <Building2 className="h-5 w-5" />
            </div>
          </div>

          <div className="rounded-xl border border-[#D6EBE1] bg-white p-5 shadow-kawan-rest flex items-center justify-between">
            <div>
              <span className="text-xs font-semibold text-[#5B7A70] block">Standar ILP & Juknis</span>
              <div className="flex items-baseline gap-2 mt-1">
                <span className="text-2xl font-bold font-mono text-[#12352B]">4</span>
                <span className="rounded-full bg-[#DCFCE7] px-2 py-0.5 text-[11px] font-bold text-[#166534]">
                  Siap Unduh
                </span>
              </div>
              <span className="text-[11px] text-[#5B7A70] mt-1 block">
                Standar Kemenkes RI & Juknis 5 Kluster
              </span>
            </div>
            <div className="h-10 w-10 rounded-xl bg-[#E8F7F0] text-[#2F9E73] flex items-center justify-center">
              <FileText className="h-5 w-5" />
            </div>
          </div>
        </div>
      </div>

      {/* Layanan Cepat Kader (6 Modul Utama) */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <div>
            <h3 className="text-sm font-bold text-[#12352B] tracking-tight">
              Layanan Cepat Kader
            </h3>
            <p className="text-xs text-[#5B7A70]">
              Akses langsung ke instrumen kerja dan pedoman operasional
            </p>
          </div>
          <span className="text-xs font-mono text-[#5B7A70]">6 MODUL UTAMA</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Card 1: Jadwal */}
          <button
            onClick={() => onNavigate('jadwal')}
            className="group rounded-xl border border-[#D6EBE1] bg-white p-5 text-left shadow-kawan-rest hover:shadow-kawan-hover hover:border-[#2F9E73] transition-all cursor-pointer flex flex-col justify-between min-h-[140px]"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="h-9 w-9 rounded-lg bg-[#E8F7F0] text-[#2F9E73] flex items-center justify-center group-hover:scale-105 transition-transform">
                  <Calendar className="h-4 w-4" />
                </div>
                <ArrowRight className="h-4 w-4 text-[#BDCAC0] group-hover:text-[#2F9E73] group-hover:translate-x-1 transition-all" />
              </div>
              <h4 className="font-bold text-sm text-[#12352B] group-hover:text-[#2F9E73] transition-colors">
                Jadwal Kegiatan
              </h4>
              <p className="text-xs text-[#5B7A70] mt-1 leading-relaxed">
                Informasi jadwal posyandu dari sumber terverifikasi
              </p>
            </div>
            <span className="text-[11px] text-[#5B7A70] font-mono mt-3">
              Pembaruan Terkini UPTD
            </span>
          </button>

          {/* Card 2: Materi Pembelajaran */}
          <button
            onClick={() => onNavigate('pustaka-materi')}
            className="group rounded-xl border border-[#D6EBE1] bg-white p-5 text-left shadow-kawan-rest hover:shadow-kawan-hover hover:border-[#2F9E73] transition-all cursor-pointer flex flex-col justify-between min-h-[140px]"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="h-9 w-9 rounded-lg bg-[#E8F7F0] text-[#2F9E73] flex items-center justify-center group-hover:scale-105 transition-transform">
                  <BookOpen className="h-4 w-4" />
                </div>
                <ArrowRight className="h-4 w-4 text-[#BDCAC0] group-hover:text-[#2F9E73] group-hover:translate-x-1 transition-all" />
              </div>
              <h4 className="font-bold text-sm text-[#12352B] group-hover:text-[#2F9E73] transition-colors">
                Materi Pembelajaran
              </h4>
              <p className="text-xs text-[#5B7A70] mt-1 leading-relaxed">
                Pustaka ILP, 5 siklus hidup, dan panduan kader
              </p>
            </div>
            <span className="text-[11px] text-[#5B7A70] font-mono mt-3">
              Integrasi Layanan Primer
            </span>
          </button>

          {/* Card 3: Pengumuman */}
          <button
            onClick={() => onNavigate('pengumuman')}
            className="group rounded-xl border border-[#D6EBE1] bg-white p-5 text-left shadow-kawan-rest hover:shadow-kawan-hover hover:border-[#2F9E73] transition-all cursor-pointer flex flex-col justify-between min-h-[140px]"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="h-9 w-9 rounded-lg bg-[#E8F7F0] text-[#2F9E73] flex items-center justify-center group-hover:scale-105 transition-transform">
                  <Megaphone className="h-4 w-4" />
                </div>
                <ArrowRight className="h-4 w-4 text-[#BDCAC0] group-hover:text-[#2F9E73] group-hover:translate-x-1 transition-all" />
              </div>
              <h4 className="font-bold text-sm text-[#12352B] group-hover:text-[#2F9E73] transition-colors">
                Pengumuman
              </h4>
              <p className="text-xs text-[#5B7A70] mt-1 leading-relaxed">
                Pemberitahuan resmi UPTD Puskesmas Kepanjen
              </p>
            </div>
            <span className="text-[11px] text-[#5B7A70] font-mono mt-3">
              Saluran Resmi Dinas
            </span>
          </button>

          {/* Card 4: Kontak Petugas */}
          <button
            onClick={() => onNavigate('kontak-petugas')}
            className="group rounded-xl border border-[#D6EBE1] bg-white p-5 text-left shadow-kawan-rest hover:shadow-kawan-hover hover:border-[#2F9E73] transition-all cursor-pointer flex flex-col justify-between min-h-[140px]"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="h-9 w-9 rounded-lg bg-[#E8F7F0] text-[#2F9E73] flex items-center justify-center group-hover:scale-105 transition-transform">
                  <Users className="h-4 w-4" />
                </div>
                <ArrowRight className="h-4 w-4 text-[#BDCAC0] group-hover:text-[#2F9E73] group-hover:translate-x-1 transition-all" />
              </div>
              <h4 className="font-bold text-sm text-[#12352B] group-hover:text-[#2F9E73] transition-colors">
                Kontak Petugas
              </h4>
              <p className="text-xs text-[#5B7A70] mt-1 leading-relaxed">
                39 petugas kesehatan terverifikasi (Promkes, Bidan, Perawat)
              </p>
            </div>
            <span className="text-[11px] text-[#5B7A70] font-mono mt-3">
              39 Tenaga Medis Pendamping
            </span>
          </button>

          {/* Card 5: Tentang SI-KAWAN */}
          <button
            onClick={() => onNavigate('tentang')}
            className="group rounded-xl border border-[#D6EBE1] bg-white p-5 text-left shadow-kawan-rest hover:shadow-kawan-hover hover:border-[#2F9E73] transition-all cursor-pointer flex flex-col justify-between min-h-[140px]"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="h-9 w-9 rounded-lg bg-[#E8F7F0] text-[#2F9E73] flex items-center justify-center group-hover:scale-105 transition-transform">
                  <Info className="h-4 w-4" />
                </div>
                <ArrowRight className="h-4 w-4 text-[#BDCAC0] group-hover:text-[#2F9E73] group-hover:translate-x-1 transition-all" />
              </div>
              <h4 className="font-bold text-sm text-[#12352B] group-hover:text-[#2F9E73] transition-colors">
                Tentang SI-KAWAN
              </h4>
              <p className="text-xs text-[#5B7A70] mt-1 leading-relaxed">
                Prinsip satu pintu & mekanisme integrasi Google Sheets
              </p>
            </div>
            <span className="text-[11px] text-[#5B7A70] font-mono mt-3">
              Transparansi & Kolaborasi
            </span>
          </button>

          {/* Card 6: Gateway Formulir */}
          <button
            onClick={() => onNavigate('gateway-formulir')}
            className="group rounded-xl border border-[#D6EBE1] bg-white p-5 text-left shadow-kawan-rest hover:shadow-kawan-hover hover:border-[#2F9E73] transition-all cursor-pointer flex flex-col justify-between min-h-[140px]"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="h-9 w-9 rounded-lg bg-[#E8F7F0] text-[#2F9E73] flex items-center justify-center group-hover:scale-105 transition-transform">
                  <FileSpreadsheet className="h-4 w-4" />
                </div>
                <span className="rounded-full bg-[#FEF3C7] px-2 py-0.5 text-[10px] font-semibold text-[#92400E]">
                  Perlu login
                </span>
              </div>
              <h4 className="font-bold text-sm text-[#12352B] group-hover:text-[#2F9E73] transition-colors">
                Gateway Formulir
              </h4>
              <p className="text-xs text-[#5B7A70] mt-1 leading-relaxed">
                Akses 4 spreadsheet pelaporan bulanan
              </p>
            </div>
            <span className="text-[11px] text-[#2F9E73] font-semibold flex items-center gap-1 mt-3">
              <span>Pelaporan Rutin</span>
              <ArrowRight className="h-3 w-3" />
            </span>
          </button>
        </div>
      </div>

      {/* Two Column Bottom Grid: Distribusi Wilayah & Pengumuman Terkini */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Distribusi Posyandu per Desa/Kelurahan */}
        <div className="lg:col-span-7 rounded-2xl border border-[#D6EBE1] bg-white p-6 shadow-kawan-rest">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h4 className="font-bold text-sm text-[#12352B]">
                Distribusi Posyandu per Desa/Kelurahan
              </h4>
              <p className="text-xs text-[#5B7A70]">
                Total 108 Posyandu terdaftar di 18 desa/kelurahan Kecamatan Kepanjen
              </p>
            </div>
            <span className="rounded-full bg-[#DCFCE7] px-2.5 py-1 text-xs font-bold font-mono text-[#166534]">
              108 POSYANDU
            </span>
          </div>

          <div className="space-y-2.5">
            {DISTRIBUSI_DESA.map((item) => {
              const maxVal = 16;
              const percent = Math.round((item.jumlah / maxVal) * 100);
              const isKepanjen = item.nama === 'Kepanjen';

              return (
                <div key={item.nama} className="flex items-center gap-3 text-xs">
                  <span className="w-32 shrink-0 truncate font-medium text-[#12352B]">
                    {item.nama}
                  </span>
                  <div className="flex-1 h-3.5 bg-[#E8F7F0] rounded-full overflow-hidden p-0.5">
                    <div
                      className={`h-full rounded-full transition-all duration-500 ${
                        isKepanjen ? 'bg-[#17503C]' : 'bg-[#2F9E73]'
                      }`}
                      style={{ width: `${percent}%` }}
                    />
                  </div>
                  <span className="w-6 text-right font-mono font-semibold text-[#12352B] tabular-nums">
                    {item.jumlah}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Pengumuman Terkini & Unduhan */}
        <div className="lg:col-span-5 space-y-4">
          {/* Pengumuman Terkini Card */}
          <div className="rounded-2xl border border-[#D6EBE1] bg-white p-6 shadow-kawan-rest">
            <div className="flex items-center justify-between mb-3">
              <span className="font-bold text-xs uppercase tracking-wider text-[#12352B] flex items-center gap-1.5">
                <Megaphone className="h-4 w-4 text-[#2F9E73]" />
                Pengumuman Terkini
              </span>
              <span className="h-2 w-2 rounded-full bg-[#D97706]"></span>
            </div>

            <div className="rounded-xl border border-[#BBF7D0] bg-[#DCFCE7]/60 p-4">
              <span className="text-[10px] uppercase font-bold text-[#166534] tracking-wider block">
                SURAT EDARAN TERBARU • 12 FEB 2025
              </span>
              <h5 className="font-bold text-xs text-[#12352B] mt-1 leading-snug">
                SE No. 440/082/2025: Juknis Pelaksanaan Bulan Penimbangan Balita & Vitamin A Februari 2025
              </h5>
              <p className="text-[11px] text-[#386e59] mt-1.5 leading-relaxed">
                Instruksi serentak 108 Posyandu se-Kepanjen: Antropometri terstandar, distribusi Vit. A kapsul biru/merah, & batas pelaporan digital Sheets 25 Februari.
              </p>
              <button
                onClick={() => onNavigate('pengumuman')}
                className="mt-3 flex items-center gap-1.5 text-xs font-semibold text-[#166534] hover:text-[#006948] transition-colors cursor-pointer"
              >
                <FileText className="h-3.5 w-3.5" />
                <span>Baca Edaran Lengkap & Lampiran PDF</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </button>
            </div>

            <button
              onClick={() => onNavigate('pengumuman')}
              className="mt-3 w-full text-center text-xs font-semibold text-[#2F9E73] hover:underline cursor-pointer"
            >
              Lihat arsip pengumuman &rarr;
            </button>
          </div>

          {/* Quick Spreadsheet Portal Strip */}
          <div className="rounded-xl border border-[#D6EBE1] bg-white p-4 shadow-2xs flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="h-9 w-9 rounded-lg bg-[#E8F7F0] text-[#2F9E73] flex items-center justify-center">
                <FileSpreadsheet className="h-4 w-4" />
              </div>
              <div>
                <span className="font-mono text-xs font-bold text-[#12352B] block">
                  KEC-KPJ-SPREADSHEET
                </span>
                <span className="text-[11px] text-[#5B7A70]">
                  Terintegrasi 4 Form Posyandu ILP
                </span>
              </div>
            </div>
            <button
              onClick={() => onNavigate('gateway-formulir')}
              className="rounded-lg p-2 text-[#2F9E73] hover:bg-[#E8F7F0] transition-colors cursor-pointer"
              title="Buka Gateway"
            >
              <ExternalLink className="h-4 w-4" />
            </button>
          </div>

          {/* Buku Panduan Card */}
          <div className="rounded-xl border border-[#D6EBE1] bg-[#17503C] p-4 text-white shadow-2xs flex items-center justify-between">
            <div>
              <span className="text-[10px] text-[#71daab] uppercase font-bold tracking-wider block">
                PEDOMAN KADER
              </span>
              <h5 className="font-bold text-xs leading-tight mt-0.5">
                5 Klaster Siklus Hidup ILP Posyandu
              </h5>
              <span className="text-[11px] text-[#d3f9ea]">
                Buku panduan digital kader 2025
              </span>
            </div>
            <button
              onClick={() => onNavigate('pustaka-materi')}
              className="rounded-lg bg-[#2F9E73] px-3 py-1.5 text-xs font-semibold text-white hover:bg-[#268762] transition-colors cursor-pointer"
            >
              Unduh
            </button>
          </div>
        </div>
      </div>

      {/* Institutional Footer Block */}
      <div className="rounded-2xl border border-[#D6EBE1] bg-[#12362c] p-7 text-white">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          <div className="md:col-span-5">
            <div className="flex items-center gap-3">
              <div className="h-9 w-9 rounded-lg bg-[#2F9E73] flex items-center justify-center text-white font-bold">
                <Building2 className="h-5 w-5" />
              </div>
              <div>
                <h4 className="font-bold text-sm tracking-tight">SI-KAWAN POSYANDU</h4>
                <p className="text-xs text-[#9ad3b8]">UPTD PUSKESMAS KEPANJEN</p>
              </div>
            </div>
            <p className="text-xs text-[#d3f9ea] mt-3 italic">
              "Teman Kader untuk Belajar dan Melayani"
            </p>
            <p className="text-[11px] text-[#9ad3b8] mt-1 leading-relaxed">
              Platform kolaborasi data, jadwal pelayanan, dan pendampingan kader kesehatan di 18 desa/kelurahan Kecamatan Kepanjen.
            </p>
          </div>

          <div className="md:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-[#d3f9ea]">
            <div className="space-y-2">
              <span className="font-bold text-white uppercase text-[10px] tracking-wider block">
                KONTAK RESMI OPERASIONAL
              </span>
              <div className="flex items-start gap-2">
                <MapPin className="h-4 w-4 text-[#71daab] shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white block">Alamat UPTD</strong>
                  <span>Jl. Kawi No.50, Banurejo, Kepanjen, Kabupaten Malang 65163</span>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <Mail className="h-4 w-4 text-[#71daab] shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white block">Email Resmi</strong>
                  <span>pkm.kepanjen@gmail.com</span>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <span className="font-bold text-white uppercase text-[10px] tracking-wider block">
                LAYANAN PENGADUAN
              </span>
              <div className="flex items-start gap-2">
                <Phone className="h-4 w-4 text-[#71daab] shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white block">Telepon Helpdesk</strong>
                  <span className="font-mono">0888-9924-444</span>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <ShieldCheck className="h-4 w-4 text-[#71daab] shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white block">Status Verifikasi</strong>
                  <span>Puskesmas Ramah Anak & ILP</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
