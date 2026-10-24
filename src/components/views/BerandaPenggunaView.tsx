import React from 'react';
import {
  FileSpreadsheet,
  Calendar,
  Clock,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
  PlusCircle,
  FileText,
  UserCheck,
  Send,
  Layers,
  ChevronRight,
  TrendingUp,
} from 'lucide-react';
import { POSYANDU_DATA, PosyanduItem } from '../../data/posyanduData';

interface BerandaPenggunaViewProps {
  onNavigate: (page: string) => void;
  onOpenGateway?: (posyanduId: string) => void;
}

export const BerandaPenggunaView: React.FC<BerandaPenggunaViewProps> = ({
  onNavigate,
}) => {
  // Posyandu binaan for Siti Saudah, A.Md.Keb. (Desa Tegalsari)
  const posyanduBinaan: PosyanduItem[] = POSYANDU_DATA.filter(
    (p) => p.desa === 'Tegalsari'
  );

  return (
    <div className="space-y-6">
      {/* Banner Identitas Tenaga Kesehatan */}
      <div className="bg-white rounded-2xl border border-[#D6EBE1] shadow-kawan-rest p-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-full bg-gradient-to-l from-[#E8F7F0] to-transparent pointer-events-none opacity-60" />
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
          <div className="flex items-start sm:items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#17503C] to-[#2F9E73] flex items-center justify-center text-white font-bold text-2xl shadow-md shrink-0">
              SS
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-1">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[#DCFCE7] text-[#166534] border border-[#BBF7D0]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#166534] animate-pulse" />
                  Sesi Aktif: Bidan Desa
                </span>
                <span className="font-mono text-xs text-[#5B7A70] bg-[#F7FCFA] px-2 py-0.5 rounded border border-[#D6EBE1]">
                  NIP: 19880415 201101 2 004
                </span>
              </div>
              <h1 className="text-2xl font-bold text-[#12352B] tracking-tight">
                Selamat Bertugas, Siti Saudah, A.Md.Keb.
              </h1>
              <p className="text-sm text-[#5B7A70] mt-0.5">
                Koordinator Wilayah Binaan Desa Tegalsari • UPTD Puskesmas Kepanjen
              </p>
            </div>
          </div>

          <div className="flex flex-wrap gap-2.5">
            <button
              onClick={() => onNavigate('gateway-formulir')}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-[10px] bg-[#2F9E73] hover:bg-[#268762] text-white text-sm font-semibold shadow-sm transition-all"
            >
              <FileSpreadsheet className="w-4 h-4" />
              Buka Gateway 4 Sheet
            </button>
            <button
              onClick={() => onNavigate('usulan-koreksi')}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-[10px] bg-white hover:bg-[#E8F7F0] text-[#17503C] border border-[#D6EBE1] text-sm font-semibold transition-all"
            >
              <PlusCircle className="w-4 h-4 text-[#2F9E73]" />
              Ajukan Koreksi Data
            </button>
          </div>
        </div>

        {/* Ringkasan Cepat Wilayah Kerja */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6 pt-6 border-t border-[#D6EBE1]">
          <div>
            <div className="text-xs text-[#5B7A70]">Wilayah Kerja</div>
            <div className="text-base font-bold text-[#12352B] mt-0.5">Desa Tegalsari</div>
          </div>
          <div>
            <div className="text-xs text-[#5B7A70]">Jumlah Posyandu Binaan</div>
            <div className="text-base font-bold text-[#12352B] mt-0.5">3 Posyandu Mandiri</div>
          </div>
          <div>
            <div className="text-xs text-[#5B7A70]">Perawat Pendamping</div>
            <div className="text-base font-bold text-[#12352B] mt-0.5">Ahmad Fauzi, S.Kep.</div>
          </div>
          <div>
            <div className="text-xs text-[#5B7A70]">Status Akun Cloud</div>
            <div className="text-base font-bold text-[#166534] flex items-center gap-1.5 mt-0.5">
              <CheckCircle2 className="w-4 h-4 text-[#2F9E73]" />
              Terverifikasi Promkes
            </div>
          </div>
        </div>
      </div>

      {/* Warning Bar & Batas Sinkronisasi Bulanan */}
      <div className="bg-gradient-to-r from-[#FEF3C7] to-[#FFFBEB] rounded-2xl border border-[#FDE68A] p-5 shadow-kawan-rest flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-start gap-3.5">
          <div className="p-2.5 rounded-xl bg-[#F59E0B] text-white shrink-0 mt-0.5">
            <Clock className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-[#92400E] text-sm sm:text-base">
                Batas Pengisian Google Sheets Pelayanan: 25 Februari 2025
              </span>
              <span className="text-xs bg-[#FDE68A] text-[#92400E] font-semibold px-2 py-0.5 rounded-full">
                Sisa 5 Hari
              </span>
            </div>
            <p className="text-xs sm:text-sm text-[#78350F] mt-1 leading-relaxed">
              Sesuai SE No. 440/082/2025, pastikan hasil penimbangan balita dan distribusi Vitamin A
              pada 3 posyandu binaan telah disinkronkan ke Formulir 02 sebelum tanggal cut-off.
            </p>
          </div>
        </div>
        <button
          onClick={() => onNavigate('gateway-formulir')}
          className="px-4 py-2 bg-[#92400E] hover:bg-[#78350F] text-white text-xs font-semibold rounded-[10px] shrink-0 transition-colors"
        >
          Periksa Pengisian Sekarang
        </button>
      </div>

      {/* Daftar Posyandu Binaan Tegalsari */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-lg font-bold text-[#12352B]">
              Daftar Posyandu Binaan Anda di Desa Tegalsari
            </h2>
            <p className="text-xs text-[#5B7A70]">
              Kelola instrumen Google Sheets 4 lembar kerja dan pantau status keterisian
            </p>
          </div>
          <span className="text-xs font-mono font-medium text-[#17503C] bg-[#E8F7F0] px-3 py-1 rounded-full border border-[#D6EBE1]">
            3 dari 3 Posyandu Terhubung
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {posyanduBinaan.map((p, idx) => (
            <div
              key={p.id}
              className="bg-white rounded-2xl border border-[#D6EBE1] shadow-kawan-rest hover:shadow-kawan-hover transition-all p-5 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between gap-2 mb-3">
                  <span className="font-mono text-xs font-semibold px-2 py-0.5 rounded bg-[#F7FCFA] text-[#17503C] border border-[#D6EBE1]">
                    {p.id}
                  </span>
                  <span className="inline-flex items-center gap-1 text-[11px] font-semibold px-2 py-0.5 rounded-full bg-[#DCFCE7] text-[#166534] border border-[#BBF7D0]">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#166534]" />
                    {p.strata}
                  </span>
                </div>

                <h3 className="font-bold text-base text-[#12352B] mb-1">
                  Posyandu {p.nama}
                </h3>
                <p className="text-xs text-[#5B7A70] mb-4">
                  {p.alamat}
                </p>

                {/* 4 Sheets Status Indicator */}
                <div className="space-y-2 mb-4 bg-[#F7FCFA] p-3 rounded-xl border border-[#D6EBE1]">
                  <div className="text-[11px] font-semibold text-[#17503C] uppercase tracking-wider mb-1 flex items-center justify-between">
                    <span>4 Instrumen Sheets</span>
                    <span className="text-[#2F9E73] font-bold">Lengkap 4/4</span>
                  </div>

                  <div className="grid grid-cols-2 gap-1.5 text-xs">
                    <a
                      href={p.sheetLinks.absen || '#'}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between p-1.5 rounded bg-white border border-[#D6EBE1] hover:border-[#2F9E73] text-[#12352B] transition-colors"
                      title="Formulir 01: Absen Kader & Balita"
                    >
                      <span className="truncate text-[11px]">01. Absen</span>
                      <ExternalLink className="w-3 h-3 text-[#2F9E73] shrink-0" />
                    </a>
                    <a
                      href={p.sheetLinks.hasilPelayanan || '#'}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between p-1.5 rounded bg-white border border-[#D6EBE1] hover:border-[#2F9E73] text-[#12352B] transition-colors"
                      title="Formulir 02: Hasil Pelayanan Siklus Hidup"
                    >
                      <span className="truncate text-[11px]">02. Pelayanan</span>
                      <ExternalLink className="w-3 h-3 text-[#2F9E73] shrink-0" />
                    </a>
                    <a
                      href={p.sheetLinks.rekapKunjungan || '#'}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between p-1.5 rounded bg-white border border-[#D6EBE1] hover:border-[#2F9E73] text-[#12352B] transition-colors"
                      title="Formulir 03: Rekap Kunjungan Rumah"
                    >
                      <span className="truncate text-[11px]">03. Rekap KR</span>
                      <ExternalLink className="w-3 h-3 text-[#2F9E73] shrink-0" />
                    </a>
                    <a
                      href={p.sheetLinks.hasilKunjungan || '#'}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between p-1.5 rounded bg-white border border-[#D6EBE1] hover:border-[#2F9E73] text-[#12352B] transition-colors"
                      title="Formulir 04: Hasil Sweeping & Kunjungan Rumah"
                    >
                      <span className="truncate text-[11px]">04. Hasil KR</span>
                      <ExternalLink className="w-3 h-3 text-[#2F9E73] shrink-0" />
                    </a>
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-[#D6EBE1] flex items-center justify-between gap-2">
                <a
                  href={p.linktreeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-semibold text-[#17503C] hover:text-[#2F9E73] inline-flex items-center gap-1"
                >
                  Linktree Posyandu
                  <ExternalLink className="w-3 h-3" />
                </a>
                <button
                  onClick={() => onNavigate('gateway-formulir')}
                  className="px-3 py-1.5 bg-[#E8F7F0] hover:bg-[#d0f6e7] text-[#17503C] rounded-[8px] text-xs font-semibold transition-colors"
                >
                  Detail Gateway
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Grid 2 Kolom: Aktivitas Pelaporan & Pustaka Cepat */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Riwayat Sinkronisasi Terbaru */}
        <div className="bg-white rounded-2xl border border-[#D6EBE1] shadow-kawan-rest p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-base text-[#12352B] flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-[#2F9E73]" />
              Log Aktivitas Sinkronisasi Dokumen
            </h3>
            <span className="text-xs text-[#5B7A70]">Terkini</span>
          </div>

          <div className="space-y-3">
            <div className="flex items-start gap-3 p-3 rounded-xl bg-[#F7FCFA] border border-[#D6EBE1]">
              <div className="p-2 rounded-lg bg-[#DCFCE7] text-[#166534] shrink-0 mt-0.5">
                <CheckCircle2 className="w-4 h-4" />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-xs text-[#12352B]">
                    Mawar Tegalsari (Formulir 02)
                  </span>
                  <span className="text-[11px] text-[#5B7A70]">Hari ini, 08:30 WIB</span>
                </div>
                <p className="text-xs text-[#5B7A70] mt-0.5">
                  18 data balita berhasil dicatat kader posyandu via Google Sheets resmi.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3 rounded-xl bg-[#F7FCFA] border border-[#D6EBE1]">
              <div className="p-2 rounded-lg bg-[#DCFCE7] text-[#166534] shrink-0 mt-0.5">
                <CheckCircle2 className="w-4 h-4" />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-xs text-[#12352B]">
                    Melati Tegalsari (Formulir 01)
                  </span>
                  <span className="text-[11px] text-[#5B7A70]">Kemarin, 15:45 WIB</span>
                </div>
                <p className="text-xs text-[#5B7A70] mt-0.5">
                  Absensi 5 kader aktif dan 2 petugas pendamping tersimpan otomatis.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3 rounded-xl bg-[#F7FCFA] border border-[#D6EBE1]">
              <div className="p-2 rounded-lg bg-[#FEF3C7] text-[#92400E] shrink-0 mt-0.5">
                <AlertCircle className="w-4 h-4" />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-xs text-[#12352B]">
                    Kenanga Tegalsari (Formulir 03)
                  </span>
                  <span className="text-[11px] text-[#5B7A70]">17 Feb 2025</span>
                </div>
                <p className="text-xs text-[#5B7A70] mt-0.5">
                  Rekap kunjungan rumah lansia resiko tinggi membutuhkan review verifikasi bidan.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Akses Cepat Dokumen Pedoman Bidan */}
        <div className="bg-white rounded-2xl border border-[#D6EBE1] shadow-kawan-rest p-5 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-base text-[#12352B] flex items-center gap-2">
                <FileText className="w-4 h-4 text-[#2F9E73]" />
                Pedoman & Format Laporan Bidan
              </h3>
              <button
                onClick={() => onNavigate('pustaka-materi')}
                className="text-xs font-semibold text-[#17503C] hover:text-[#2F9E73] flex items-center gap-1"
              >
                Lihat Semua
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="space-y-2.5">
              <div className="p-3 rounded-xl border border-[#D6EBE1] hover:border-[#2F9E73] transition-colors flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-[#E8F7F0] rounded-lg text-[#17503C]">
                    <FileText className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="font-bold text-xs text-[#12352B]">
                      Juknis ILP Posyandu 5 Siklus Hidup 2025
                    </div>
                    <div className="text-[11px] text-[#5B7A70]">PDF Resmi • 2.4 MB</div>
                  </div>
                </div>
                <span className="text-xs font-semibold text-[#2F9E73] bg-[#DCFCE7] px-2.5 py-1 rounded-full">
                  Unduh
                </span>
              </div>

              <div className="p-3 rounded-xl border border-[#D6EBE1] hover:border-[#2F9E73] transition-colors flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-[#E8F7F0] rounded-lg text-[#17503C]">
                    <FileSpreadsheet className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="font-bold text-xs text-[#12352B]">
                      Format Template Offline Rekap Kunjungan Rumah
                    </div>
                    <div className="text-[11px] text-[#5B7A70]">XLSX Spreadsheet • 850 KB</div>
                  </div>
                </div>
                <span className="text-xs font-semibold text-[#2F9E73] bg-[#DCFCE7] px-2.5 py-1 rounded-full">
                  Unduh
                </span>
              </div>

              <div className="p-3 rounded-xl border border-[#D6EBE1] hover:border-[#2F9E73] transition-colors flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-[#E8F7F0] rounded-lg text-[#17503C]">
                    <UserCheck className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="font-bold text-xs text-[#12352B]">
                      Standar Operasional Penimbangan & Antropometri
                    </div>
                    <div className="text-[11px] text-[#5B7A70]">Juknis Puskesmas • 1.1 MB</div>
                  </div>
                </div>
                <span className="text-xs font-semibold text-[#2F9E73] bg-[#DCFCE7] px-2.5 py-1 rounded-full">
                  Unduh
                </span>
              </div>
            </div>
          </div>

          <div className="mt-4 pt-4 border-t border-[#D6EBE1] flex items-center justify-between">
            <span className="text-xs text-[#5B7A70]">Butuh bantuan administrasi?</span>
            <button
              onClick={() => onNavigate('kontak-petugas')}
              className="text-xs font-semibold text-[#17503C] hover:text-[#2F9E73] inline-flex items-center gap-1"
            >
              Hubungi Admin Promkes
              <Send className="w-3 h-3" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
