import React, { useState } from 'react';
import {
  Calendar,
  Clock,
  MapPin,
  Users,
  Search,
  Filter,
  RotateCcw,
  CheckCircle2,
  ListFilter,
  Grid,
  ShieldCheck,
  ChevronRight,
  Phone,
  X,
} from 'lucide-react';
import { JADWAL_LIST, DAFTAR_DESA, JadwalItem } from '../../data/posyanduData';

export const JadwalKegiatanView: React.FC = () => {
  const [selectedDesa, setSelectedDesa] = useState('Semua Wilayah');
  const [selectedBulan, setSelectedBulan] = useState('Februari 2025');
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'daftar' | 'kalender'>('daftar');
  const [selectedJadwal, setSelectedJadwal] = useState<JadwalItem | null>(null);

  const filteredJadwal = JADWAL_LIST.filter((item) => {
    const matchDesa = selectedDesa === 'Semua Wilayah' || item.desa === selectedDesa;
    const matchSearch =
      searchQuery === '' ||
      item.namaPosyandu.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.kodePosyandu.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.lokasi.toLowerCase().includes(searchQuery.toLowerCase());
    return matchDesa && matchSearch;
  });

  const handleReset = () => {
    setSelectedDesa('Semua Wilayah');
    setSelectedBulan('Februari 2025');
    setSearchQuery('');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <div className="flex flex-wrap items-center gap-2 mb-2 text-xs">
          <span className="rounded-full bg-[#d6fced] px-3 py-0.5 font-semibold text-[#17503C]">
            Siklus Hidup Terintegrasi ILP
          </span>
          <span className="rounded-full bg-[#E8F7F0] px-3 py-0.5 font-semibold text-[#2F9E73]">
            18 Desa & Kelurahan
          </span>
        </div>

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold text-[#12352B] tracking-tight">
              Jadwal Kegiatan Posyandu
            </h2>
            <p className="mt-1 text-xs text-[#5B7A70] max-w-2xl">
              Informasi jadwal pelaksanaan Posyandu terintegrasi 5 siklus hidup di 108 Posyandu wilayah kerja UPTD Puskesmas Kepanjen.
            </p>
          </div>

          <div className="rounded-xl border border-[#D6EBE1] bg-white p-3 flex items-center gap-3 shadow-2xs">
            <ShieldCheck className="h-5 w-5 text-[#2F9E73]" />
            <div>
              <span className="text-[10px] uppercase font-bold text-[#5B7A70] block">
                OTORITAS VALIDASI
              </span>
              <span className="text-xs font-bold text-[#12352B]">
                Data Terverifikasi UPTD Puskesmas Kepanjen
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="rounded-xl border border-[#D6EBE1] bg-white p-4 shadow-kawan-rest flex flex-wrap items-center gap-3">
        {/* Desa Filter */}
        <div className="min-w-[180px]">
          <label className="text-[10px] font-bold uppercase text-[#5B7A70] block mb-1">
            DESA / KELURAHAN
          </label>
          <select
            value={selectedDesa}
            onChange={(e) => setSelectedDesa(e.target.value)}
            className="w-full rounded-lg border border-[#D6EBE1] bg-white px-3 py-2 text-xs text-[#12352B] focus:border-[#2F9E73] focus:outline-none cursor-pointer"
          >
            <option value="Semua Wilayah">Semua Wilayah</option>
            {DAFTAR_DESA.map((d) => (
              <option key={d} value={d}>
                {d}
              </option>
            ))}
          </select>
        </div>

        {/* Bulan Filter */}
        <div className="min-w-[160px]">
          <label className="text-[10px] font-bold uppercase text-[#5B7A70] block mb-1">
            BULAN & TAHUN
          </label>
          <select
            value={selectedBulan}
            onChange={(e) => setSelectedBulan(e.target.value)}
            className="w-full rounded-lg border border-[#D6EBE1] bg-white px-3 py-2 text-xs text-[#12352B] focus:border-[#2F9E73] focus:outline-none cursor-pointer"
          >
            <option value="Februari 2025">Februari 2025</option>
            <option value="Maret 2025">Maret 2025</option>
            <option value="Januari 2025">Januari 2025</option>
          </select>
        </div>

        {/* Search */}
        <div className="flex-1 min-w-[200px]">
          <label className="text-[10px] font-bold uppercase text-[#5B7A70] block mb-1">
            CARI NAMA / KODE POSYANDU
          </label>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#5B7A70]" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Contoh: Anggrek, KPN-TGL..."
              className="w-full rounded-lg border border-[#D6EBE1] bg-[#F7FCFA] pl-9 pr-3 py-2 text-xs text-[#12352B] focus:border-[#2F9E73] focus:bg-white focus:outline-none"
            />
          </div>
        </div>

        {/* Toggle Mode & Reset */}
        <div className="flex items-end gap-2 pt-4 sm:pt-0">
          <div className="flex rounded-lg border border-[#D6EBE1] bg-[#F7FCFA] p-0.5 text-xs">
            <button
              onClick={() => setViewMode('daftar')}
              className={`flex items-center gap-1 px-3 py-1.5 rounded-md font-medium transition-colors cursor-pointer ${
                viewMode === 'daftar'
                  ? 'bg-[#17503C] text-white font-semibold'
                  : 'text-[#5B7A70] hover:text-[#12352B]'
              }`}
            >
              <ListFilter className="h-3.5 w-3.5" />
              <span>Tampilan Daftar</span>
            </button>
            <button
              onClick={() => setViewMode('kalender')}
              className={`flex items-center gap-1 px-3 py-1.5 rounded-md font-medium transition-colors cursor-pointer ${
                viewMode === 'kalender'
                  ? 'bg-[#17503C] text-white font-semibold'
                  : 'text-[#5B7A70] hover:text-[#12352B]'
              }`}
            >
              <Calendar className="h-3.5 w-3.5" />
              <span>Kalender</span>
            </button>
          </div>

          <button
            onClick={handleReset}
            className="flex items-center gap-1 rounded-lg border border-[#D6EBE1] bg-white px-3 py-2 text-xs font-semibold text-[#17503C] hover:bg-[#E8F7F0] cursor-pointer"
          >
            <RotateCcw className="h-3.5 w-3.5" />
            <span>Reset</span>
          </button>
        </div>
      </div>

      {/* Jadwal Status Banner */}
      <div className="rounded-xl border border-[#BBF7D0] bg-[#DCFCE7]/70 p-3.5 flex items-center justify-between shadow-2xs">
        <div className="flex items-center gap-2.5">
          <CheckCircle2 className="h-5 w-5 text-[#2F9E73]" />
          <div>
            <span className="font-bold text-xs text-[#12352B]">
              Jadwal Terverifikasi Bulan Ini
            </span>
            <span className="ml-2 rounded bg-white px-2 py-0.5 text-[10px] font-mono font-semibold text-[#166534]">
              {selectedBulan}
            </span>
            <p className="text-[11px] text-[#386e59] mt-0.5">
              Menampilkan {filteredJadwal.length} jadwal kegiatan posyandu siap pelaksanaan yang telah disetujui Bidan Desa dan UPTD Puskesmas Kepanjen.
            </p>
          </div>
        </div>
        <span className="rounded-full bg-[#2F9E73] px-3 py-1 text-xs font-bold text-white font-mono">
          {filteredJadwal.length} Titik Terjadwal
        </span>
      </div>

      {/* Schedule Cards Grid (2x2) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {filteredJadwal.map((jadwal) => (
          <div
            key={jadwal.id}
            className="rounded-2xl border border-[#D6EBE1] bg-white p-5 shadow-kawan-rest hover:shadow-kawan-hover transition-all flex flex-col justify-between"
          >
            <div>
              {/* Card Top Row: Date Pill + Code & Status */}
              <div className="flex items-start justify-between gap-3 mb-3">
                <div className="flex items-center gap-3">
                  <div className="rounded-xl bg-[#DCFCE7] p-2.5 text-center min-w-[70px] border border-[#BBF7D0]">
                    <span className="text-[10px] uppercase font-bold text-[#166534] block leading-tight">
                      {jadwal.hariTanggal.split(',')[0]}
                    </span>
                    <span className="text-sm font-extrabold font-mono text-[#12352B] block">
                      {jadwal.hariTanggal.split(',')[1]?.trim().split(' ')[0]}
                    </span>
                    <span className="text-[9px] uppercase font-bold text-[#5B7A70] block">
                      FEB 2025
                    </span>
                  </div>

                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs font-bold text-[#17503C]">
                        {jadwal.kodePosyandu}
                      </span>
                      <span className="text-xs text-[#5B7A70]">
                        Desa {jadwal.desa}
                      </span>
                    </div>
                    <h3 className="font-bold text-base text-[#12352B] mt-0.5">
                      {jadwal.namaPosyandu}
                    </h3>
                  </div>
                </div>

                <div className="flex flex-col items-end gap-1">
                  <span className="inline-flex items-center gap-1 rounded-full bg-[#DCFCE7] px-2 py-0.5 text-[10px] font-semibold text-[#166534]">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#166534]"></span>
                    Terverifikasi Resmi
                  </span>
                  <span className="text-[10px] text-[#5B7A70] font-medium">
                    ✓ Siap Pelaksanaan
                  </span>
                </div>
              </div>

              {/* Time and Location */}
              <div className="grid grid-cols-2 gap-2 my-3 text-xs">
                <div className="flex items-center gap-2 text-[#5B7A70] bg-[#F7FCFA] p-2 rounded-lg border border-[#D6EBE1]">
                  <Clock className="h-3.5 w-3.5 text-[#2F9E73] shrink-0" />
                  <span className="font-mono">{jadwal.jam}</span>
                </div>
                <div className="flex items-center gap-2 text-[#5B7A70] bg-[#F7FCFA] p-2 rounded-lg border border-[#D6EBE1] truncate">
                  <MapPin className="h-3.5 w-3.5 text-[#2F9E73] shrink-0" />
                  <span className="truncate">{jadwal.lokasi}</span>
                </div>
              </div>

              {/* 5 Siklus Hidup Pills */}
              <div className="space-y-1.5 mt-3">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#5B7A70] block">
                  LAYANAN 5 SIKLUS HIDUP YANG DISEDIAKAN:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {jadwal.layanan.map((layanan, i) => (
                    <span
                      key={i}
                      className="rounded-full bg-[#E8F7F0] border border-[#D6EBE1] px-2.5 py-0.5 text-[11px] font-medium text-[#17503C]"
                    >
                      {layanan}
                    </span>
                  ))}
                </div>
              </div>

              {/* Petugas Wilayah */}
              <div className="mt-3.5 rounded-xl border border-[#D6EBE1] bg-[#F7FCFA] p-2.5 flex items-center justify-between text-xs">
                <div className="flex items-center gap-2 text-[#12352B]">
                  <Users className="h-4 w-4 text-[#2F9E73] shrink-0" />
                  <span className="font-medium truncate max-w-[260px]">
                    {jadwal.petugas.bidan} & {jadwal.petugas.perawat}
                  </span>
                </div>
                <span className="text-[10px] text-[#5B7A70] font-semibold shrink-0">
                  Petugas Wilayah
                </span>
              </div>
            </div>

            {/* Card Footer Button */}
            <div className="mt-4 pt-3 border-t border-[#D6EBE1] flex items-center justify-between text-xs">
              <span className="text-[11px] text-[#5B7A70] font-mono">
                📅 Bulan Berjalan 2025
              </span>
              <button
                onClick={() => setSelectedJadwal(jadwal)}
                className="flex items-center gap-1.5 rounded-xl bg-[#17503C] px-3.5 py-1.5 font-semibold text-xs text-white hover:bg-[#123e2e] transition-colors cursor-pointer"
              >
                <span>Lihat Detail & Lokasi</span>
                <ChevronRight className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Ketentuan Publikasi Jadwal Kegiatan Box */}
      <div className="rounded-2xl border border-[#D6EBE1] bg-white p-6 shadow-kawan-rest grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
        <div className="md:col-span-8 space-y-2.5">
          <h4 className="font-bold text-sm text-[#12352B] flex items-center gap-2">
            <ShieldCheck className="h-4 w-4 text-[#2F9E73]" />
            Ketentuan Publikasi Jadwal Kegiatan
          </h4>
          <ul className="space-y-1.5 text-xs text-[#5B7A70]">
            <li className="flex items-start gap-2">
              <CheckCircle2 className="h-3.5 w-3.5 text-[#2F9E73] mt-0.5 shrink-0" />
              <span>Jadwal Posyandu disusun berdasarkan kesepakatan musyawarah kader desa dan dikonfirmasi oleh bidan/perawat pendamping.</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="h-3.5 w-3.5 text-[#2F9E73] mt-0.5 shrink-0" />
              <span>Tidak ada estimasi atau jadwal perkiraan otomatis untuk menjaga kepastian sasaran keluarga dan balita.</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="h-3.5 w-3.5 text-[#2F9E73] mt-0.5 shrink-0" />
              <span>Perubahan jadwal mendesak dapat diajukan koordinator via menu Usulan Koreksi Data.</span>
            </li>
          </ul>
        </div>

        <div className="md:col-span-4 rounded-xl border border-[#BBF7D0] bg-[#DCFCE7]/70 p-4 text-xs text-[#166534]">
          <span className="text-[10px] uppercase font-bold tracking-wider block">
            PUSAT LAYANAN INFORMASI RESMI
          </span>
          <strong className="block text-sm text-[#12352B] mt-1">
            UPTD Puskesmas Kepanjen
          </strong>
          <span className="text-[11px] block text-[#386e59]">
            Jl. Kawi No.50 Banurejo Kepanjen
          </span>
          <div className="mt-2 flex items-center gap-1.5 font-mono font-bold text-xs text-[#166534]">
            <Phone className="h-3.5 w-3.5" />
            <span>0888-9924-444</span>
          </div>
        </div>
      </div>

      {/* Modal Detail Jadwal */}
      {selectedJadwal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs p-4">
          <div className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-kawan-modal space-y-4 border border-[#D6EBE1]">
            <div className="flex items-center justify-between border-b border-[#D6EBE1] pb-3">
              <div>
                <span className="font-mono text-xs font-bold text-[#17503C]">
                  {selectedJadwal.kodePosyandu}
                </span>
                <h3 className="font-bold text-base text-[#12352B]">
                  {selectedJadwal.namaPosyandu}
                </h3>
              </div>
              <button
                onClick={() => setSelectedJadwal(null)}
                className="rounded-lg p-1 text-[#5B7A70] hover:bg-[#E8F7F0] cursor-pointer"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="p-3 rounded-lg bg-[#F7FCFA] border border-[#D6EBE1]">
                <strong className="text-[10px] uppercase font-bold text-[#5B7A70] block">
                  WAKTU & TEMPAT PELAKSANAAN
                </strong>
                <p className="font-semibold text-sm text-[#12352B] mt-0.5">
                  {selectedJadwal.hariTanggal}
                </p>
                <p className="text-[#5B7A70] font-mono mt-0.5">
                  Pukul {selectedJadwal.jam}
                </p>
                <p className="text-[#12352B] font-medium mt-1">
                  📍 {selectedJadwal.lokasi}
                </p>
              </div>

              <div>
                <strong className="text-[10px] uppercase font-bold text-[#5B7A70] block mb-1">
                  PAKET LAYANAN SIKLUS HIDUP:
                </strong>
                <ul className="space-y-1 text-slate-700 pl-4 list-disc">
                  {selectedJadwal.layanan.map((lay, i) => (
                    <li key={i}>{lay}</li>
                  ))}
                </ul>
              </div>

              <div className="p-3 rounded-lg bg-[#DCFCE7] border border-[#BBF7D0] text-[#166534]">
                <strong className="block text-xs font-bold">Nakes Pendamping Terverifikasi:</strong>
                <p className="mt-0.5">{selectedJadwal.petugas.bidan}</p>
                <p>{selectedJadwal.petugas.perawat}</p>
              </div>
            </div>

            <div className="flex justify-end pt-2 border-t border-[#D6EBE1]">
              <button
                onClick={() => setSelectedJadwal(null)}
                className="rounded-xl bg-[#17503C] px-4 py-2 font-semibold text-xs text-white hover:bg-[#123e2e] cursor-pointer"
              >
                Tutup Informasi
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
