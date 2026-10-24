import React, { useState } from 'react';
import {
  FileSpreadsheet,
  ExternalLink,
  Search,
  Filter,
  CheckCircle2,
  Clock,
  ShieldCheck,
  AlertTriangle,
  Info,
  Users,
  HeartPulse,
  Home,
  CheckSquare,
  Share2,
} from 'lucide-react';
import { POSYANDU_DATA, DAFTAR_DESA, PosyanduItem } from '../../data/posyanduData';

interface GatewayFormulirViewProps {
  initialPosyanduId?: string;
}

export const GatewayFormulirView: React.FC<GatewayFormulirViewProps> = ({
  initialPosyanduId,
}) => {
  const [selectedDesa, setSelectedDesa] = useState<string>('Tegalsari');
  const [selectedPosyanduId, setSelectedPosyanduId] = useState<string>(
    initialPosyanduId || 'TGL-001'
  );
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Posyandu in current village
  const posyanduInDesa = POSYANDU_DATA.filter((p) => p.desa === selectedDesa);

  // Active posyandu item
  const activePosyandu: PosyanduItem =
    POSYANDU_DATA.find((p) => p.id === selectedPosyanduId) ||
    posyanduInDesa[0] ||
    POSYANDU_DATA[0];

  const handleDesaChange = (desa: string) => {
    setSelectedDesa(desa);
    const firstInDesa = POSYANDU_DATA.find((p) => p.desa === desa);
    if (firstInDesa) {
      setSelectedPosyanduId(firstInDesa.id);
    }
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="bg-white rounded-2xl border border-[#D6EBE1] shadow-kawan-rest p-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full text-xs font-semibold bg-[#E8F7F0] text-[#17503C] border border-[#D6EBE1] mb-2">
              <FileSpreadsheet className="w-3.5 h-3.5 text-[#2F9E73]" />
              Integrasi Cloud Google Workspace UPTD Puskesmas Kepanjen
            </div>
            <h1 className="text-2xl font-bold text-[#12352B] tracking-tight">
              Gateway Formulir Google Sheets Posyandu
            </h1>
            <p className="text-sm text-[#5B7A70] mt-1 max-w-3xl">
              Akses terpusat ke 4 instrumen lembar kerja spreadsheet terstandarisasi untuk
              pencatatan absensi, pelayanan siklus hidup, dan rekap kunjungan rumah kader.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-[#DCFCE7] text-[#166534] border border-[#BBF7D0]">
              <span className="w-2 h-2 rounded-full bg-[#166534] animate-pulse" />
              API Sheets Terhubung
            </span>
          </div>
        </div>
      </div>

      {/* Selector & Filter Bar */}
      <div className="bg-white rounded-2xl border border-[#D6EBE1] shadow-kawan-rest p-5">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
          {/* Desa Filter */}
          <div className="md:col-span-4">
            <label className="block text-xs font-semibold text-[#17503C] mb-1.5">
              1. Pilih Desa / Kelurahan
            </label>
            <div className="relative">
              <select
                value={selectedDesa}
                onChange={(e) => handleDesaChange(e.target.value)}
                className="w-full bg-[#F7FCFA] border border-[#D6EBE1] focus:border-[#2F9E73] rounded-[10px] px-3.5 py-2.5 text-sm font-semibold text-[#12352B] focus:outline-none transition-colors appearance-none"
              >
                {DAFTAR_DESA.map((d) => (
                  <option key={d} value={d}>
                    Desa / Kel. {d}
                  </option>
                ))}
              </select>
              <div className="absolute right-3.5 top-3 pointer-events-none text-[#5B7A70] text-xs">
                ▼
              </div>
            </div>
          </div>

          {/* Posyandu Select */}
          <div className="md:col-span-5">
            <label className="block text-xs font-semibold text-[#17503C] mb-1.5">
              2. Pilih Posyandu Sasaran ({posyanduInDesa.length} Posyandu di {selectedDesa})
            </label>
            <div className="relative">
              <select
                value={activePosyandu.id}
                onChange={(e) => setSelectedPosyanduId(e.target.value)}
                className="w-full bg-[#F7FCFA] border border-[#D6EBE1] focus:border-[#2F9E73] rounded-[10px] px-3.5 py-2.5 text-sm font-bold text-[#12352B] focus:outline-none transition-colors appearance-none font-mono"
              >
                {posyanduInDesa.map((p) => (
                  <option key={p.id} value={p.id}>
                    [{p.id}] Posyandu {p.nama} ({p.strata})
                  </option>
                ))}
              </select>
              <div className="absolute right-3.5 top-3 pointer-events-none text-[#5B7A70] text-xs">
                ▼
              </div>
            </div>
          </div>

          {/* Posyandu Quick Jump */}
          <div className="md:col-span-3">
            <label className="block text-xs font-semibold text-[#17503C] mb-1.5">
              Kode Posyandu
            </label>
            <div className="px-3.5 py-2.5 bg-[#E8F7F0] border border-[#D6EBE1] rounded-[10px] text-xs font-mono font-bold text-[#17503C] flex items-center justify-between">
              <span>{activePosyandu.id}</span>
              <span className="text-[11px] font-sans font-medium text-[#2F9E73] bg-white px-2 py-0.5 rounded border border-[#BBF7D0]">
                {activePosyandu.strata}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Posyandu Target Detail Strip */}
      <div className="bg-gradient-to-r from-[#17503C] to-[#267557] text-white rounded-2xl p-5 shadow-kawan-rest flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="font-mono text-xs bg-white/20 text-white px-2 py-0.5 rounded">
              {activePosyandu.id}
            </span>
            <span className="text-xs bg-[#2F9E73] text-white px-2 py-0.5 rounded-full font-semibold">
              Kecamatan Kepanjen
            </span>
          </div>
          <h2 className="text-xl font-bold text-white">
            Posyandu {activePosyandu.nama}
          </h2>
          <p className="text-xs text-[#d0f6e7] mt-0.5">
            {activePosyandu.alamat} • Desa {activePosyandu.desa}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <div className="text-right hidden sm:block">
            <div className="text-[11px] text-[#d0f6e7]">Bidan Pembina:</div>
            <div className="text-xs font-bold text-white">
              {activePosyandu.bidan.nama}
            </div>
          </div>
          <a
            href={activePosyandu.linktreeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-[10px] bg-white/10 hover:bg-white/20 text-white border border-white/20 text-xs font-semibold transition-colors"
          >
            <Share2 className="w-3.5 h-3.5" />
            Linktree Posyandu
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </div>

      {/* 4 Google Sheets Gateway Cards */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-bold text-base text-[#12352B]">
            4 Instrumen Spreadsheet Pelaporan Siklus Hidup
          </h3>
          <span className="text-xs text-[#5B7A70]">
            Format Terstandarisasi Kemenkes RI & ILP 2025
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Card 01: Absen */}
          <div className="bg-white rounded-2xl border border-[#D6EBE1] shadow-kawan-rest hover:shadow-kawan-hover transition-all p-5 flex flex-col justify-between border-l-4 border-l-[#2F9E73]">
            <div>
              <div className="flex items-start justify-between gap-2 mb-3">
                <div className="flex items-center gap-2">
                  <div className="p-2 rounded-xl bg-[#E8F7F0] text-[#17503C]">
                    <Users className="w-5 h-5 text-[#2F9E73]" />
                  </div>
                  <div>
                    <span className="font-mono text-xs font-bold text-[#17503C] bg-[#F7FCFA] px-2 py-0.5 rounded border border-[#D6EBE1]">
                      FORMULIR 01
                    </span>
                    <h4 className="font-bold text-base text-[#12352B] mt-1">
                      Absensi Kader & Kehadiran Sasaran
                    </h4>
                  </div>
                </div>
                <span className="inline-flex items-center gap-1 text-[11px] font-semibold px-2 py-0.5 rounded-full bg-[#DCFCE7] text-[#166534] border border-[#BBF7D0]">
                  <CheckCircle2 className="w-3 h-3 text-[#166534]" />
                  Aktif
                </span>
              </div>

              <p className="text-xs text-[#5B7A70] mb-4 leading-relaxed">
                Pencatatan presensi kehadiran kader aktif bertugas, petugas pembina puskesmas,
                dan rekap jumlah sasaran per kluster usia yang hadir di hari buka.
              </p>

              <div className="bg-[#F7FCFA] p-3 rounded-xl border border-[#D6EBE1] space-y-1.5 mb-4 text-xs">
                <div className="flex justify-between text-[#5B7A70]">
                  <span>Penyimpanan:</span>
                  <span className="font-medium text-[#12352B]">Google Drive UPTD Kepanjen</span>
                </div>
                <div className="flex justify-between text-[#5B7A70]">
                  <span>Sinkronisasi Terakhir:</span>
                  <span className="font-mono text-[#17503C]">Otomatis Real-time</span>
                </div>
                <div className="flex justify-between text-[#5B7A70]">
                  <span>Akses:</span>
                  <span className="font-medium text-[#166534]">Kader & Nakes Pembina</span>
                </div>
              </div>
            </div>

            <a
              href={activePosyandu.sheetLinks.absen || '#'}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 w-full py-2.5 rounded-[10px] bg-[#2F9E73] hover:bg-[#268762] text-white text-xs font-bold shadow-sm transition-all"
            >
              <FileSpreadsheet className="w-4 h-4" />
              Buka Google Sheets Formulir 01
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* Card 02: Hasil Pelayanan */}
          <div className="bg-white rounded-2xl border border-[#D6EBE1] shadow-kawan-rest hover:shadow-kawan-hover transition-all p-5 flex flex-col justify-between border-l-4 border-l-[#2F9E73]">
            <div>
              <div className="flex items-start justify-between gap-2 mb-3">
                <div className="flex items-center gap-2">
                  <div className="p-2 rounded-xl bg-[#E8F7F0] text-[#17503C]">
                    <HeartPulse className="w-5 h-5 text-[#2F9E73]" />
                  </div>
                  <div>
                    <span className="font-mono text-xs font-bold text-[#17503C] bg-[#F7FCFA] px-2 py-0.5 rounded border border-[#D6EBE1]">
                      FORMULIR 02
                    </span>
                    <h4 className="font-bold text-base text-[#12352B] mt-1">
                      Catatan Hasil Pelayanan Siklus Hidup
                    </h4>
                  </div>
                </div>
                <span className="inline-flex items-center gap-1 text-[11px] font-semibold px-2 py-0.5 rounded-full bg-[#DCFCE7] text-[#166534] border border-[#BBF7D0]">
                  <CheckCircle2 className="w-3 h-3 text-[#166534]" />
                  Aktif
                </span>
              </div>

              <p className="text-xs text-[#5B7A70] mb-4 leading-relaxed">
                Data antropometri balita (BB/TB/LiLA), status imunisasi, tensi usia produktif,
                serta skrining lansia sederhana (SKILAS) terintegrasi 5 kluster ILP.
              </p>

              <div className="bg-[#F7FCFA] p-3 rounded-xl border border-[#D6EBE1] space-y-1.5 mb-4 text-xs">
                <div className="flex justify-between text-[#5B7A70]">
                  <span>Penyimpanan:</span>
                  <span className="font-medium text-[#12352B]">Google Drive UPTD Kepanjen</span>
                </div>
                <div className="flex justify-between text-[#5B7A70]">
                  <span>Validasi Nakes:</span>
                  <span className="font-medium text-[#166534]">Terhubung Dashboard Bidan</span>
                </div>
                <div className="flex justify-between text-[#5B7A70]">
                  <span>Pencegahan Stunting:</span>
                  <span className="font-medium text-[#166534]">Z-Score Otomatis</span>
                </div>
              </div>
            </div>

            <a
              href={activePosyandu.sheetLinks.hasilPelayanan || '#'}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 w-full py-2.5 rounded-[10px] bg-[#2F9E73] hover:bg-[#268762] text-white text-xs font-bold shadow-sm transition-all"
            >
              <FileSpreadsheet className="w-4 h-4" />
              Buka Google Sheets Formulir 02
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* Card 03: Rekap Kunjungan Rumah */}
          <div className="bg-white rounded-2xl border border-[#D6EBE1] shadow-kawan-rest hover:shadow-kawan-hover transition-all p-5 flex flex-col justify-between border-l-4 border-l-[#2F9E73]">
            <div>
              <div className="flex items-start justify-between gap-2 mb-3">
                <div className="flex items-center gap-2">
                  <div className="p-2 rounded-xl bg-[#E8F7F0] text-[#17503C]">
                    <Home className="w-5 h-5 text-[#2F9E73]" />
                  </div>
                  <div>
                    <span className="font-mono text-xs font-bold text-[#17503C] bg-[#F7FCFA] px-2 py-0.5 rounded border border-[#D6EBE1]">
                      FORMULIR 03
                    </span>
                    <h4 className="font-bold text-base text-[#12352B] mt-1">
                      Rekapitulasi Kunjungan Rumah Kader
                    </h4>
                  </div>
                </div>
                <span className="inline-flex items-center gap-1 text-[11px] font-semibold px-2 py-0.5 rounded-full bg-[#DCFCE7] text-[#166534] border border-[#BBF7D0]">
                  <CheckCircle2 className="w-3 h-3 text-[#166534]" />
                  Aktif
                </span>
              </div>

              <p className="text-xs text-[#5B7A70] mb-4 leading-relaxed">
                Agenda sweeping dan pendataan keluarga berisiko di lingkungan Posyandu: ibu hamil
                KEK, balita gizi kurang/kurus, serta penderita tuberkulosis/hipertensi drop out obat.
              </p>

              <div className="bg-[#F7FCFA] p-3 rounded-xl border border-[#D6EBE1] space-y-1.5 mb-4 text-xs">
                <div className="flex justify-between text-[#5B7A70]">
                  <span>Penyimpanan:</span>
                  <span className="font-medium text-[#12352B]">Google Drive UPTD Kepanjen</span>
                </div>
                <div className="flex justify-between text-[#5B7A70]">
                  <span>Target Sweeping:</span>
                  <span className="font-medium text-[#12352B]">Maks. H+5 Hari Buka</span>
                </div>
                <div className="flex justify-between text-[#5B7A70]">
                  <span>Status Verifikasi:</span>
                  <span className="font-medium text-[#166534]">Bidan Wilayah</span>
                </div>
              </div>
            </div>

            <a
              href={activePosyandu.sheetLinks.rekapKunjungan || '#'}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 w-full py-2.5 rounded-[10px] bg-[#2F9E73] hover:bg-[#268762] text-white text-xs font-bold shadow-sm transition-all"
            >
              <FileSpreadsheet className="w-4 h-4" />
              Buka Google Sheets Formulir 03
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* Card 04: Hasil Kunjungan Rumah */}
          <div className="bg-white rounded-2xl border border-[#D6EBE1] shadow-kawan-rest hover:shadow-kawan-hover transition-all p-5 flex flex-col justify-between border-l-4 border-l-[#2F9E73]">
            <div>
              <div className="flex items-start justify-between gap-2 mb-3">
                <div className="flex items-center gap-2">
                  <div className="p-2 rounded-xl bg-[#E8F7F0] text-[#17503C]">
                    <CheckSquare className="w-5 h-5 text-[#2F9E73]" />
                  </div>
                  <div>
                    <span className="font-mono text-xs font-bold text-[#17503C] bg-[#F7FCFA] px-2 py-0.5 rounded border border-[#D6EBE1]">
                      FORMULIR 04
                    </span>
                    <h4 className="font-bold text-base text-[#12352B] mt-1">
                      Laporan Hasil Intervensi Kunjungan Rumah
                    </h4>
                  </div>
                </div>
                <span className="inline-flex items-center gap-1 text-[11px] font-semibold px-2 py-0.5 rounded-full bg-[#DCFCE7] text-[#166534] border border-[#BBF7D0]">
                  <CheckCircle2 className="w-3 h-3 text-[#166534]" />
                  Aktif
                </span>
              </div>

              <p className="text-xs text-[#5B7A70] mb-4 leading-relaxed">
                Tindak lanjut edukasi kesehatan oleh kader posyandu, dokumentasi pemberian PMT
                pemulihan, dan laporan rujukan kasus risiko ke Pustu/Puskesmas Kepanjen.
              </p>

              <div className="bg-[#F7FCFA] p-3 rounded-xl border border-[#D6EBE1] space-y-1.5 mb-4 text-xs">
                <div className="flex justify-between text-[#5B7A70]">
                  <span>Penyimpanan:</span>
                  <span className="font-medium text-[#12352B]">Google Drive UPTD Kepanjen</span>
                </div>
                <div className="flex justify-between text-[#5B7A70]">
                  <span>Tindak Lanjut Rujukan:</span>
                  <span className="font-medium text-[#166534]">Terhubung Pustu Desa</span>
                </div>
                <div className="flex justify-between text-[#5B7A70]">
                  <span>Laporan Akhir:</span>
                  <span className="font-medium text-[#12352B]">Sinkron Bulanan</span>
                </div>
              </div>
            </div>

            <a
              href={activePosyandu.sheetLinks.hasilKunjungan || '#'}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 w-full py-2.5 rounded-[10px] bg-[#2F9E73] hover:bg-[#268762] text-white text-xs font-bold shadow-sm transition-all"
            >
              <FileSpreadsheet className="w-4 h-4" />
              Buka Google Sheets Formulir 04
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </div>

      {/* Keamanan & Disclaimer UU PDP */}
      <div className="bg-[#F7FCFA] rounded-2xl border border-[#D6EBE1] p-5 flex items-start gap-3.5">
        <ShieldCheck className="w-5 h-5 text-[#2F9E73] shrink-0 mt-0.5" />
        <div className="text-xs text-[#5B7A70] leading-relaxed">
          <span className="font-bold text-[#12352B]">
            Protokol Keamanan Data & Perlindungan Informasi Pribadi (UU PDP No. 27/2022):
          </span>{' '}
          Seluruh tautan spreadsheet di atas dikelola di dalam workspace resmi UPTD Puskesmas Kepanjen.
          Akses edit dibatasi hanya untuk akun Google nakes dan koordinator kader yang telah terdaftar.
          Dilarang membagikan tautan formulir ini ke pihak tidak berwenang.
        </div>
      </div>
    </div>
  );
};
