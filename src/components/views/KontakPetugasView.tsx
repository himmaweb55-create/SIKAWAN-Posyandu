import React, { useState } from 'react';
import {
  Users,
  Search,
  Filter,
  RotateCcw,
  Phone,
  Mail,
  MapPin,
  ShieldCheck,
  CheckCircle2,
  Lock,
  Building2,
  Calendar,
  X,
  Send,
  MessageSquare,
} from 'lucide-react';
import { NAKES_LIST, DAFTAR_DESA, NakesItem } from '../../data/posyanduData';

export const KontakPetugasView: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedJabatan, setSelectedJabatan] = useState('Semua');
  const [selectedWilayah, setSelectedWilayah] = useState('Semua');
  const [selectedNakes, setSelectedNakes] = useState<NakesItem | null>(NAKES_LIST[2]); // Siti Saudah by default

  const filteredNakes = NAKES_LIST.filter((nakes) => {
    const matchSearch =
      searchQuery === '' ||
      nakes.nama.toLowerCase().includes(searchQuery.toLowerCase()) ||
      nakes.wilayahTugas.toLowerCase().includes(searchQuery.toLowerCase()) ||
      nakes.id.toLowerCase().includes(searchQuery.toLowerCase());

    const matchJabatan =
      selectedJabatan === 'Semua' || nakes.jabatan === selectedJabatan;

    const matchWilayah =
      selectedWilayah === 'Semua' || nakes.wilayahTugas.includes(selectedWilayah);

    return matchSearch && matchJabatan && matchWilayah;
  });

  const handleReset = () => {
    setSearchQuery('');
    setSelectedJabatan('Semua');
    setSelectedWilayah('Semua');
  };

  return (
    <div className="space-y-6">
      {/* Top Breadcrumb & Status */}
      <div>
        <div className="flex flex-wrap items-center justify-between gap-3 mb-2">
          <div className="flex flex-wrap items-center gap-2 text-xs">
            <span className="rounded-full bg-[#d6fced] px-3 py-0.5 font-semibold text-[#17503C]">
              Terverifikasi SK Puskesmas
            </span>
            <span className="rounded-full bg-[#DCFCE7] px-3 py-0.5 font-semibold text-[#166534]">
              ✓ Total 39 Petugas Kesehatan
            </span>
            <span className="rounded-full bg-[#E8F7F0] px-3 py-0.5 font-semibold text-[#2F9E73]">
              SOP Perlindungan Privasi Nakes
            </span>
          </div>

          <div className="flex items-center gap-2">
            <a
              href="tel:08889924444"
              className="flex items-center gap-1.5 rounded-xl bg-[#17503C] px-3.5 py-1.5 text-xs font-semibold text-white hover:bg-[#123e2e] transition-colors cursor-pointer"
            >
              <Phone className="h-3.5 w-3.5" />
              <span>Pusat Helpdesk Puskesmas</span>
            </a>
          </div>
        </div>

        <h2 className="text-2xl font-bold text-[#12352B] tracking-tight">
          Kontak Petugas Kesehatan Terverifikasi
        </h2>
        <p className="mt-1 text-xs text-[#5B7A70] max-w-2xl">
          Direktori resmi tenaga kesehatan pendamping posyandu dan pengelola program UPTD Puskesmas Kepanjen di 18 desa/kelurahan. Menjamin koordinasi rujukan, pembinaan kader, serta validasi data terintegrasi.
        </p>
      </div>

      {/* 4 Stat Counters */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <div className="rounded-xl border border-[#D6EBE1] bg-white p-4 shadow-kawan-rest">
          <span className="text-[10px] uppercase font-bold text-[#5B7A70] block">
            TOTAL PETUGAS
          </span>
          <div className="flex items-baseline gap-2 mt-1">
            <span className="text-2xl font-bold font-mono text-[#12352B]">39</span>
            <span className="rounded bg-[#DCFCE7] px-1.5 py-0.2 text-[10px] font-bold text-[#166534]">
              100% Aktif
            </span>
          </div>
          <span className="text-[11px] text-[#5B7A70] mt-1 block">
            Menjangkau 18 Desa/Kelurahan
          </span>
        </div>

        <div className="rounded-xl border border-[#D6EBE1] bg-white p-4 shadow-kawan-rest">
          <span className="text-[10px] uppercase font-bold text-[#5B7A70] block">
            PROMOSI KESEHATAN
          </span>
          <div className="flex items-baseline gap-2 mt-1">
            <span className="text-2xl font-bold font-mono text-[#12352B]">2</span>
            <span className="text-xs text-[#5B7A70]">Nakes</span>
          </div>
          <span className="text-[11px] text-[#5B7A70] mt-1 block">
            Admin Utama & Program
          </span>
        </div>

        <div className="rounded-xl border border-[#D6EBE1] bg-white p-4 shadow-kawan-rest">
          <span className="text-[10px] uppercase font-bold text-[#5B7A70] block">
            BIDAN DESA
          </span>
          <div className="flex items-baseline gap-2 mt-1">
            <span className="text-2xl font-bold font-mono text-[#12352B]">19</span>
            <span className="text-xs text-[#5B7A70]">Terdaftar</span>
          </div>
          <span className="text-[11px] text-[#5B7A70] mt-1 block">
            Koordinator KIA & Balita
          </span>
        </div>

        <div className="rounded-xl border border-[#D6EBE1] bg-white p-4 shadow-kawan-rest">
          <span className="text-[10px] uppercase font-bold text-[#5B7A70] block">
            PERAWAT DESA
          </span>
          <div className="flex items-baseline gap-2 mt-1">
            <span className="text-2xl font-bold font-mono text-[#12352B]">18</span>
            <span className="text-xs text-[#5B7A70]">Akun</span>
          </div>
          <span className="text-[11px] text-[#5B7A70] mt-1 block">
            Pendamping Ponkesdes/Pustu
          </span>
        </div>
      </div>

      {/* Filter Toolbar */}
      <div className="rounded-xl border border-[#D6EBE1] bg-white p-3.5 shadow-kawan-rest flex flex-wrap items-center gap-3">
        <div className="relative flex-1 min-w-[220px]">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-[#5B7A70]" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Cari nama nakes, wilayah tugas, atau ID..."
            className="w-full rounded-lg border border-[#D6EBE1] bg-[#F7FCFA] pl-10 pr-3 py-2 text-xs text-[#12352B] focus:border-[#2F9E73] focus:bg-white focus:outline-none"
          />
        </div>

        <div className="w-44">
          <select
            value={selectedJabatan}
            onChange={(e) => setSelectedJabatan(e.target.value)}
            className="w-full rounded-lg border border-[#D6EBE1] bg-white px-3 py-2 text-xs text-[#12352B] focus:border-[#2F9E73] focus:outline-none cursor-pointer"
          >
            <option value="Semua">Semua Jabatan</option>
            <option value="Bidan">Bidan</option>
            <option value="Perawat">Perawat</option>
            <option value="Tenaga Promosi Kesehatan">Promosi Kesehatan</option>
          </select>
        </div>

        <div className="w-44">
          <select
            value={selectedWilayah}
            onChange={(e) => setSelectedWilayah(e.target.value)}
            className="w-full rounded-lg border border-[#D6EBE1] bg-white px-3 py-2 text-xs text-[#12352B] focus:border-[#2F9E73] focus:outline-none cursor-pointer"
          >
            <option value="Semua">Semua 18 Desa/Kelurahan</option>
            {DAFTAR_DESA.map((d) => (
              <option key={d} value={d}>
                {d}
              </option>
            ))}
          </select>
        </div>

        <button
          onClick={handleReset}
          className="flex items-center gap-1 rounded-lg border border-[#D6EBE1] bg-[#F7FCFA] px-3 py-2 text-xs font-semibold text-[#17503C] hover:bg-[#E8F7F0] cursor-pointer"
        >
          <RotateCcw className="h-3.5 w-3.5" />
          <span>Reset</span>
        </button>
      </div>

      {/* Grid Cards of Nakes */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredNakes.map((nakes) => {
          const isSelected = selectedNakes?.id === nakes.id;
          const initials = nakes.nama
            .split(' ')
            .map((n) => n[0])
            .slice(0, 2)
            .join('');

          return (
            <div
              key={nakes.id}
              onClick={() => setSelectedNakes(nakes)}
              className={`rounded-2xl border p-5 transition-all cursor-pointer flex flex-col justify-between ${
                isSelected
                  ? 'border-[#2F9E73] bg-[#E8F7F0]/60 ring-1 ring-[#2F9E73] shadow-kawan-hover'
                  : 'border-[#D6EBE1] bg-white hover:border-[#2F9E73] hover:bg-[#F7FCFA] shadow-kawan-rest'
              }`}
            >
              <div>
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className="flex items-center gap-3">
                    <div className="h-11 w-11 rounded-xl bg-[#17503C] text-white flex items-center justify-center font-bold text-sm shadow-xs">
                      {initials}
                    </div>
                    <div>
                      <h4 className="font-bold text-xs text-[#12352B] leading-tight">
                        {nakes.nama}, {nakes.gelar}
                      </h4>
                      <span className="text-[11px] text-[#5B7A70] font-medium block">
                        {nakes.jabatan}
                      </span>
                    </div>
                  </div>

                  <span className="rounded-full bg-[#DCFCE7] px-2 py-0.5 text-[10px] font-semibold text-[#166534] flex items-center gap-1">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#166534]"></span>
                    Aktif
                  </span>
                </div>

                <div className="space-y-1.5 text-xs">
                  <div className="flex items-center gap-2 text-[#5B7A70]">
                    <Building2 className="h-3.5 w-3.5 text-[#2F9E73] shrink-0" />
                    <span>Wilayah Tugas: <strong className="text-[#12352B]">{nakes.wilayahTugas}</strong></span>
                  </div>
                  <div className="flex items-center gap-2 text-[#5B7A70]">
                    <ShieldCheck className="h-3.5 w-3.5 text-[#2F9E73] shrink-0" />
                    <span className="truncate">Peran: <strong className="text-[#12352B]">{nakes.peranKhusus}</strong></span>
                  </div>
                </div>

                <div className="mt-3 rounded-lg bg-white border border-[#D6EBE1] p-2 text-[11px] text-[#5B7A70]">
                  <strong className="text-[10px] uppercase text-[#17503C] block font-bold">
                    FOKUS LAYANAN:
                  </strong>
                  <p className="text-[#12352B] mt-0.5 leading-snug">{nakes.fokusLayanan}</p>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-[#D6EBE1] flex items-center justify-between">
                <span className="font-mono text-[10px] text-[#5B7A70]">
                  SK UPTD Terverifikasi
                </span>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    alert(`Menghubungkan ke helpdesk resmi Puskesmas untuk koordinasi dengan: ${nakes.nama}, ${nakes.gelar}`);
                  }}
                  className="flex items-center gap-1.5 rounded-lg bg-[#17503C] px-3 py-1.5 text-xs font-semibold text-white hover:bg-[#123e2e] transition-colors cursor-pointer"
                >
                  <Phone className="h-3 w-3" />
                  <span>Hubungi via Helpdesk</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Selected Detail Profil & Penugasan Nakes */}
      {selectedNakes && (
        <div className="rounded-2xl border border-[#D6EBE1] bg-white p-6 shadow-kawan-rest space-y-4">
          <div className="flex items-center justify-between border-b border-[#D6EBE1] pb-3">
            <div className="flex items-center gap-2">
              <ShieldCheck className="h-5 w-5 text-[#2F9E73]" />
              <h3 className="text-sm font-bold text-[#12352B]">
                Detail Profil & Penugasan Nakes Terverifikasi
              </h3>
            </div>
            <div className="flex items-center gap-2 text-xs">
              <span className="rounded bg-[#DCFCE7] px-2 py-0.5 font-semibold text-[#166534]">
                Aktif Terbina
              </span>
              <span className="font-mono text-[11px] text-[#5B7A70]">
                No. Reg: SK-NAKES/KPJ/2024/019
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
            {/* Identity Card */}
            <div className="md:col-span-4 flex items-start gap-4">
              <div className="h-16 w-16 rounded-2xl bg-[#17503C] text-white flex items-center justify-center font-bold text-xl shadow-sm shrink-0">
                {selectedNakes.nama
                  .split(' ')
                  .map((n) => n[0])
                  .slice(0, 2)
                  .join('')}
              </div>
              <div>
                <h4 className="font-bold text-base text-[#12352B]">
                  {selectedNakes.nama}, {selectedNakes.gelar}
                </h4>
                <p className="text-xs text-[#2F9E73] font-semibold">
                  {selectedNakes.jabatan} Penanggung Jawab KIA
                </p>
                <p className="text-[11px] text-[#5B7A70] mt-0.5">
                  Wilayah Binaan: <strong>{selectedNakes.wilayahTugas}</strong>
                </p>
                <span className="inline-block mt-2 font-mono text-[10px] text-[#5B7A70] bg-[#F7FCFA] border border-[#D6EBE1] px-2 py-0.5 rounded">
                  NIP/Reg: Terlindungi UU PDP
                </span>
              </div>
            </div>

            {/* Scope of Duty */}
            <div className="md:col-span-5 rounded-xl border border-[#D6EBE1] bg-[#F7FCFA] p-4 text-xs space-y-2">
              <strong className="text-[10px] uppercase font-bold text-[#17503C] block">
                FOKUS LAYANAN 5 SIKLUS HIDUP:
              </strong>
              <ul className="space-y-1 text-[#12352B]">
                <li>• Kesehatan Ibu Hamil & Deteksi Risiko Tinggi</li>
                <li>• Pemantauan Tumbuh Kembang Bayi & Balita (Cegah Stunting)</li>
                <li>• Pelayanan KB Pasca Persalinan & Imunisasi Rutin</li>
                <li>• Supervisi Posyandu Wilayah {selectedNakes.wilayahTugas}</li>
              </ul>
            </div>

            {/* Direct Disposisi Action */}
            <div className="md:col-span-3 space-y-2">
              <a
                href="tel:08889924444"
                className="w-full flex items-center justify-center gap-2 rounded-xl bg-[#17503C] py-2.5 text-xs font-semibold text-white hover:bg-[#123e2e] shadow-sm transition-colors"
              >
                <Phone className="h-4 w-4" />
                <span>Hubungi via Helpdesk</span>
              </a>
              <button
                onClick={() => alert(`Disposisi koordinasi operasional telah dikirimkan ke koordinator wilayah: ${selectedNakes.nama}`)}
                className="w-full flex items-center justify-center gap-2 rounded-xl border border-[#D6EBE1] bg-white py-2 text-xs font-semibold text-[#17503C] hover:bg-[#E8F7F0] transition-colors cursor-pointer"
              >
                <Send className="h-3.5 w-3.5" />
                <span>Kirim Disposisi Koordinasi</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Catatan Perlindungan Privasi Nakes */}
      <div className="rounded-2xl border border-[#D6EBE1] bg-white p-6 shadow-kawan-rest grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
        <div className="md:col-span-8 space-y-2">
          <div className="flex items-center gap-2 text-xs font-bold text-[#12352B]">
            <Lock className="h-4 w-4 text-[#2F9E73]" />
            <span>Catatan Perlindungan Privasi Tenaga Kesehatan</span>
            <span className="rounded bg-[#E8F7F0] px-2 py-0.5 text-[10px] font-mono text-[#17503C]">
              Kepatuhan UU PDP No. 27/2022
            </span>
          </div>
          <p className="text-xs text-[#5B7A70] leading-relaxed">
            Hanya kontak resmi dan identitas penugasan yang telah diverifikasi yang ditampilkan pada portal ini. Nomor telepon pribadi, NIK, dan NIP <strong>tidak dipublikasikan</strong> demi perlindungan data pribadi tenaga kesehatan. Seluruh komunikasi masyarakat dan kader posyandu difasilitasi melalui saluran Helpdesk resmi UPTD Puskesmas Kepanjen.
          </p>
        </div>

        <div className="md:col-span-4 rounded-xl border border-[#BBF7D0] bg-[#DCFCE7]/70 p-4 text-xs text-[#166534]">
          <span className="text-[10px] uppercase font-bold tracking-wider block">
            PUSAT LAYANAN RESMI PUSKESMAS
          </span>
          <strong className="block text-sm text-[#12352B] mt-1">
            0888-9924-444
          </strong>
          <span className="text-[11px] block text-[#386e59]">
            Jam Operasional: Senin - Jumat (07.30 - 14.30 WIB)
          </span>
          <span className="text-[10px] font-mono text-[#5B7A70] block mt-1">
            Kode Faskes: 1033638
          </span>
        </div>
      </div>
    </div>
  );
};
