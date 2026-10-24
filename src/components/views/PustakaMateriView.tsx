import React, { useState } from 'react';
import {
  BookOpen,
  Search,
  Filter,
  RotateCcw,
  FileText,
  Download,
  ExternalLink,
  ShieldCheck,
  CheckCircle2,
  Cloud,
  MapPin,
  Mail,
  Phone,
  Layers,
} from 'lucide-react';
import { MATERI_LIST, MateriItem } from '../../data/posyanduData';

export const PustakaMateriView: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('Semua Kategori');
  const [searchQuery, setSearchQuery] = useState('');
  const [formatFilter, setFormatFilter] = useState('Semua');

  const categories = [
    'Semua Kategori',
    'Panduan Pencatatan',
    'Panduan Pelaporan',
    'Integrasi Layanan Primer (ILP)',
    '5 Kluster Siklus Hidup',
  ];

  const filteredMateri = MATERI_LIST.filter((item) => {
    const matchCategory =
      activeCategory === 'Semua Kategori' || item.kategori === activeCategory;
    const matchSearch =
      searchQuery === '' ||
      item.judul.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.deskripsi.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCategory && matchSearch;
  });

  const handleDownloadSim = (judul: string) => {
    alert(`Mengunduh dokumen resmi: ${judul}\nSumber repositori terenkripsi UPTD Puskesmas Kepanjen.`);
  };

  return (
    <div className="space-y-6">
      {/* Top Breadcrumb & Status */}
      <div>
        <div className="flex flex-wrap items-center gap-2 mb-2 text-xs">
          <span className="rounded-full bg-[#d6fced] px-3 py-0.5 font-semibold text-[#17503C]">
            Akses Terbuka untuk Kader & Petugas
          </span>
          <span className="rounded-full bg-[#DCFCE7] px-3 py-0.5 font-semibold text-[#166534]">
            ✓ Edisi ILP 2024/2025
          </span>
        </div>

        <h2 className="text-2xl font-bold text-[#12352B] tracking-tight">
          Pustaka Materi & Edukasi Kader
        </h2>
        <p className="mt-1 text-xs text-[#5B7A70] max-w-2xl">
          Pusat referensi panduan pencatatan, pelaporan, standar Integrasi Layanan Primer (ILP) 5 siklus hidup, dan materi penyuluhan kesehatan resmi UPTD Puskesmas Kepanjen.
        </p>
      </div>

      {/* Category Pills Filter */}
      <div className="flex flex-wrap items-center gap-2">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`rounded-xl px-4 py-2 text-xs font-semibold transition-all cursor-pointer ${
              activeCategory === cat
                ? 'bg-[#17503C] text-white shadow-sm'
                : 'bg-white border border-[#D6EBE1] text-[#17503C] hover:bg-[#E8F7F0]'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Search Toolbar */}
      <div className="rounded-xl border border-[#D6EBE1] bg-white p-3.5 shadow-kawan-rest flex flex-wrap items-center gap-3">
        <div className="relative flex-1 min-w-[240px]">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-[#5B7A70]" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Cari judul materi, panduan, atau kata kunci..."
            className="w-full rounded-lg border border-[#D6EBE1] bg-[#F7FCFA] pl-10 pr-3 py-2 text-xs text-[#12352B] focus:border-[#2F9E73] focus:bg-white focus:outline-none"
          />
        </div>

        <div className="w-44">
          <select
            value={formatFilter}
            onChange={(e) => setFormatFilter(e.target.value)}
            className="w-full rounded-lg border border-[#D6EBE1] bg-white px-3 py-2 text-xs text-[#12352B] focus:border-[#2F9E73] focus:outline-none cursor-pointer"
          >
            <option value="Semua">Format: Semua Format</option>
            <option value="PDF Resmi">PDF Resmi</option>
            <option value="Dokumen Juknis">Dokumen Juknis</option>
          </select>
        </div>

        <button
          onClick={() => {
            setActiveCategory('Semua Kategori');
            setSearchQuery('');
            setFormatFilter('Semua');
          }}
          className="flex items-center gap-1 rounded-lg border border-[#D6EBE1] bg-[#F7FCFA] px-3 py-2 text-xs font-semibold text-[#17503C] hover:bg-[#E8F7F0] cursor-pointer"
        >
          <RotateCcw className="h-3.5 w-3.5" />
          <span>Reset</span>
        </button>
      </div>

      {/* 5 Kluster Siklus Hidup Section */}
      <div className="rounded-2xl border border-[#D6EBE1] bg-[#d0f6e7]/40 p-6 shadow-kawan-rest space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#386e59]">
              STANDARISASI NASIONAL KEMENKES RI
            </span>
            <h3 className="text-base font-bold text-[#12352B]">
              Cakupan Materi 5 Kluster Siklus Hidup (Standar Kemenkes ILP)
            </h3>
          </div>
          <span className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-[#17503C] border border-[#D6EBE1]">
            Posyandu Era Integrasi
          </span>
        </div>

        {/* 5 Cards Horizontal Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
          {/* Kluster 1 */}
          <div className="rounded-xl border border-[#D6EBE1] bg-white p-4 shadow-2xs flex flex-col justify-between">
            <div>
              <span className="rounded bg-[#E8F7F0] px-2 py-0.5 text-[10px] font-bold font-mono text-[#17503C]">
                👤 Kluster 1
              </span>
              <h4 className="font-bold text-xs text-[#12352B] mt-2 leading-snug">
                Ibu Hamil & Nifas
              </h4>
              <p className="text-[11px] text-[#5B7A70] mt-1 leading-relaxed">
                Ibu Hamil, Bersalin, Nifas, dan Pemeriksaan Anemia.
              </p>
            </div>
            <span className="text-[10px] font-bold text-[#2F9E73] mt-3 block">
              Standar Buku KIA
            </span>
          </div>

          {/* Kluster 2 */}
          <div className="rounded-xl border border-[#D6EBE1] bg-white p-4 shadow-2xs flex flex-col justify-between">
            <div>
              <span className="rounded bg-[#E8F7F0] px-2 py-0.5 text-[10px] font-bold font-mono text-[#17503C]">
                👶 Kluster 2
              </span>
              <h4 className="font-bold text-xs text-[#12352B] mt-2 leading-snug">
                Bayi & Balita
              </h4>
              <p className="text-[11px] text-[#5B7A70] mt-1 leading-relaxed">
                Pemantauan Tumbuh Kembang, Imunisasi, & Cegah Stunting.
              </p>
            </div>
            <span className="text-[10px] font-bold text-[#2F9E73] mt-3 block">
              Antropometri Kit
            </span>
          </div>

          {/* Kluster 3 */}
          <div className="rounded-xl border border-[#D6EBE1] bg-white p-4 shadow-2xs flex flex-col justify-between">
            <div>
              <span className="rounded bg-[#E8F7F0] px-2 py-0.5 text-[10px] font-bold font-mono text-[#17503C]">
                🎓 Kluster 3
              </span>
              <h4 className="font-bold text-xs text-[#12352B] mt-2 leading-snug">
                Usia Sekolah & Remaja
              </h4>
              <p className="text-[11px] text-[#5B7A70] mt-1 leading-relaxed">
                Posyandu Remaja, Gizi Seimbang, & Edukasi Reproduksi.
              </p>
            </div>
            <span className="text-[10px] font-bold text-[#2F9E73] mt-3 block">
              Skrining Berkala
            </span>
          </div>

          {/* Kluster 4 */}
          <div className="rounded-xl border border-[#D6EBE1] bg-white p-4 shadow-2xs flex flex-col justify-between">
            <div>
              <span className="rounded bg-[#E8F7F0] px-2 py-0.5 text-[10px] font-bold font-mono text-[#17503C]">
                💼 Kluster 4
              </span>
              <h4 className="font-bold text-xs text-[#12352B] mt-2 leading-snug">
                Usia Produktif
              </h4>
              <p className="text-[11px] text-[#5B7A70] mt-1 leading-relaxed">
                Skrining Penyakit Tidak Menular (PTM), Tensi, & Gula Darah.
              </p>
            </div>
            <span className="text-[10px] font-bold text-[#2F9E73] mt-3 block">
              Faktor Risiko PTM
            </span>
          </div>

          {/* Kluster 5 */}
          <div className="rounded-xl border border-[#D6EBE1] bg-white p-4 shadow-2xs flex flex-col justify-between">
            <div>
              <span className="rounded bg-[#E8F7F0] px-2 py-0.5 text-[10px] font-bold font-mono text-[#17503C]">
                🚶 Kluster 5
              </span>
              <h4 className="font-bold text-xs text-[#12352B] mt-2 leading-snug">
                Lanjut Usia (Lansia)
              </h4>
              <p className="text-[11px] text-[#5B7A70] mt-1 leading-relaxed">
                Kemandirian Lansia, Status Kognitif, Emosional, & Nutrisi.
              </p>
            </div>
            <span className="text-[10px] font-bold text-[#2F9E73] mt-3 block">
              SKILAS Lansia
            </span>
          </div>
        </div>

        {/* Cloud Infra Notice */}
        <div className="rounded-xl border border-[#D6EBE1] bg-white p-3.5 flex items-center gap-3 text-xs text-[#17503C]">
          <div className="h-8 w-8 rounded-lg bg-[#E8F7F0] flex items-center justify-center text-[#2F9E73] shrink-0">
            <Cloud className="h-4 w-4" />
          </div>
          <div>
            <strong className="block text-[#12352B]">Infrastruktur Cloud Puskesmas</strong>
            <span className="text-[11px] text-[#5B7A70]">
              Portal SI-KAWAN berfungsi sebagai jembatan akses; materi yang ditautkan tersimpan aman pada repositori Google Drive UPTD Puskesmas Kepanjen untuk kemudahan pembaruan berkas tanpa merusak riwayat arsip sebelumnya.
            </span>
          </div>
        </div>
      </div>

      {/* Daftar Dokumen & Materi Unduhan */}
      <div className="rounded-2xl border border-[#D6EBE1] bg-white p-6 shadow-kawan-rest space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-bold text-sm text-[#12352B]">
            Daftar Materi & Juknis Terverifikasi ({filteredMateri.length})
          </h3>
          <span className="text-xs font-mono text-[#5B7A70]">Format Terenkripsi</span>
        </div>

        <div className="space-y-3">
          {filteredMateri.map((item) => (
            <div
              key={item.id}
              className="rounded-xl border border-[#D6EBE1] bg-[#F7FCFA] p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:border-[#2F9E73] transition-colors"
            >
              <div className="flex items-start gap-3">
                <div className="h-10 w-10 rounded-lg bg-[#DCFCE7] text-[#166534] flex items-center justify-center shrink-0">
                  <FileText className="h-5 w-5" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-[10px] font-bold text-[#17503C]">
                      {item.id}
                    </span>
                    <span className="rounded bg-white px-2 py-0.5 text-[10px] font-semibold text-[#5B7A70] border border-[#D6EBE1]">
                      {item.kategori}
                    </span>
                  </div>
                  <h4 className="font-bold text-xs text-[#12352B] mt-1">
                    {item.judul}
                  </h4>
                  <p className="text-[11px] text-[#5B7A70] mt-0.5 max-w-2xl leading-relaxed">
                    {item.deskripsi}
                  </p>
                  <div className="flex items-center gap-3 text-[10px] text-[#5B7A70] font-mono mt-1">
                    <span>{item.format}</span>
                    <span>•</span>
                    <span>{item.ukuran}</span>
                    <span>•</span>
                    <span>Diperbarui {item.tanggal}</span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => handleDownloadSim(item.judul)}
                className="flex items-center justify-center gap-1.5 rounded-xl bg-[#2F9E73] px-4 py-2 font-semibold text-xs text-white hover:bg-[#268762] transition-colors shadow-2xs shrink-0 cursor-pointer"
              >
                <Download className="h-3.5 w-3.5" />
                <span>Unduh Materi</span>
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Kurator & Pengarah Materi Resmi Strip */}
      <div className="rounded-2xl border border-[#D6EBE1] bg-white p-5 shadow-kawan-rest grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
        <div className="md:col-span-8">
          <div className="flex items-center gap-2 text-xs font-bold text-[#12352B]">
            <ShieldCheck className="h-4 w-4 text-[#2F9E73]" />
            <span>KURATOR & PENGARAH MATERI RESMI</span>
          </div>
          <p className="text-xs text-[#5B7A70] mt-1">
            Tenaga Promosi Kesehatan UPTD Puskesmas Kepanjen:
          </p>
          <div className="mt-2 flex flex-wrap gap-2 text-xs">
            <span className="rounded-lg bg-[#E8F7F0] border border-[#D6EBE1] px-3 py-1 font-semibold text-[#17503C]">
              🩺 Luluk Lady Laili, SKM.
            </span>
            <span className="rounded-lg bg-[#E8F7F0] border border-[#D6EBE1] px-3 py-1 font-semibold text-[#17503C]">
              🩺 Yuswantien Himmamie, SKM.
            </span>
          </div>
        </div>

        <div className="md:col-span-4 text-xs text-[#5B7A70] space-y-1 border-t md:border-t-0 md:border-l border-[#D6EBE1] pt-3 md:pt-0 md:pl-4">
          <div className="flex items-center gap-1.5">
            <MapPin className="h-3.5 w-3.5 text-[#2F9E73]" />
            <span>Jl. Kawi No.50, Banurejo, Kepanjen</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Mail className="h-3.5 w-3.5 text-[#2F9E73]" />
            <span>pkm.kepanjen@gmail.com</span>
          </div>
          <div className="flex items-center gap-1.5 font-mono text-[#17503C] font-semibold">
            <Phone className="h-3.5 w-3.5 text-[#2F9E73]" />
            <span>Helpdesk: 0888-9924-444</span>
          </div>
        </div>
      </div>
    </div>
  );
};
