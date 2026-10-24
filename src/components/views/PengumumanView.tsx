import React, { useState } from 'react';
import {
  Megaphone,
  Search,
  Filter,
  RotateCcw,
  FileText,
  Download,
  Share2,
  ShieldCheck,
  CheckCircle2,
  Phone,
  Mail,
  MapPin,
  ArrowLeft,
  ChevronRight,
  ExternalLink,
} from 'lucide-react';
import { PENGUMUMAN_LIST, PengumumanItem } from '../../data/posyanduData';

export const PengumumanView: React.FC = () => {
  const [selectedPengumuman, setSelectedPengumuman] = useState<PengumumanItem>(
    PENGUMUMAN_LIST[0]
  );
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Semua Kategori');

  const filteredList = PENGUMUMAN_LIST.filter((item) => {
    const matchCat =
      selectedCategory === 'Semua Kategori' || item.kategori === selectedCategory;
    const matchSearch =
      searchQuery === '' ||
      item.judul.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.nomorSurat.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.ringkasan.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCat && matchSearch;
  });

  const handleDownloadPdf = (fileName: string) => {
    alert(`Mengunduh dokumen surat edaran resmi: ${fileName}\nDokumen terverifikasi UPTD Puskesmas Kepanjen.`);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <div className="flex flex-wrap items-center gap-2 mb-2 text-xs">
          <span className="rounded-full bg-[#d6fced] px-3 py-0.5 font-semibold text-[#17503C]">
            Saluran Resmi Kedinasan
          </span>
          <span className="rounded-full bg-[#DCFCE7] px-3 py-0.5 font-semibold text-[#166534]">
            ✓ Sinkronisasi Aktif
          </span>
          <span className="rounded-full bg-[#E8F7F0] px-3 py-0.5 font-semibold text-[#2F9E73]">
            Kecamatan Kepanjen
          </span>
        </div>

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold text-[#12352B] tracking-tight">
              Pengumuman Resmi & Surat Edaran
            </h2>
            <p className="mt-1 text-xs text-[#5B7A70] max-w-2xl">
              Kanal publikasi resmi informasi operasional, surat edaran teknis, dan pengumuman kegiatan posyandu dari UPTD Puskesmas Kepanjen untuk 18 desa dan kelurahan.
            </p>
          </div>

          <div className="rounded-xl border border-[#D6EBE1] bg-white p-3 text-xs text-right shadow-2xs">
            <span className="text-[10px] uppercase font-bold text-[#5B7A70] block">
              STATUS PORTAL BERITA
            </span>
            <div className="flex items-center gap-1.5 justify-end font-semibold text-[#166534] mt-0.5">
              <span className="h-2 w-2 rounded-full bg-[#2F9E73]" />
              <span>Arsip Terkini Aktif</span>
            </div>
            <span className="text-[10px] text-[#5B7A70]">UPTD Puskesmas Kepanjen</span>
          </div>
        </div>
      </div>

      {/* Filter Toolbar */}
      <div className="rounded-xl border border-[#D6EBE1] bg-white p-3.5 shadow-kawan-rest flex flex-wrap items-center gap-3">
        <div className="relative flex-1 min-w-[240px]">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-[#5B7A70]" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Cari judul edaran, nomor surat, atau kata kunci..."
            className="w-full rounded-lg border border-[#D6EBE1] bg-[#F7FCFA] pl-10 pr-3 py-2 text-xs text-[#12352B] focus:border-[#2F9E73] focus:bg-white focus:outline-none"
          />
        </div>

        <div className="flex flex-wrap items-center gap-1.5">
          {['Semua Kategori', 'Surat Edaran Teknis', 'Imunisasi & Vaksinasi'].map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition-colors cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-[#17503C] text-white'
                  : 'bg-[#F7FCFA] border border-[#D6EBE1] text-[#17503C] hover:bg-[#E8F7F0]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <button
          onClick={() => {
            setSearchQuery('');
            setSelectedCategory('Semua Kategori');
          }}
          className="flex items-center gap-1 rounded-lg border border-[#D6EBE1] bg-[#F7FCFA] px-3 py-2 text-xs font-semibold text-[#17503C] hover:bg-[#E8F7F0] cursor-pointer"
        >
          <RotateCcw className="h-3.5 w-3.5" />
          <span>Reset</span>
        </button>
      </div>

      {/* 2-Panel Layout: List (Left) & Document Viewer (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left List Panel (5 cols) */}
        <div className="lg:col-span-5 space-y-3">
          <div className="flex items-center justify-between text-xs text-[#5B7A70] px-1">
            <span className="font-bold uppercase tracking-wider text-[10px]">
              KERANGKA DAFTAR PENGUMUMAN
            </span>
            <span className="font-mono">{filteredList.length} Dokumen</span>
          </div>

          {filteredList.map((item) => {
            const isSelected = selectedPengumuman.id === item.id;
            return (
              <div
                key={item.id}
                onClick={() => setSelectedPengumuman(item)}
                className={`rounded-xl border p-4 transition-all cursor-pointer ${
                  isSelected
                    ? 'border-[#2F9E73] bg-[#E8F7F0] shadow-kawan-hover ring-1 ring-[#2F9E73]'
                    : 'border-[#D6EBE1] bg-white hover:border-[#2F9E73] hover:bg-[#F7FCFA]'
                }`}
              >
                <div className="flex items-center justify-between text-[11px] mb-1.5">
                  <span className="rounded bg-[#DCFCE7] px-2 py-0.5 text-[10px] font-semibold text-[#166534]">
                    {item.kategori}
                  </span>
                  <span className="font-mono text-[#5B7A70]">{item.tanggal}</span>
                </div>

                <h4 className="font-bold text-xs text-[#12352B] leading-snug">
                  {item.judul}
                </h4>
                <p className="text-[11px] text-[#5B7A70] mt-1 line-clamp-2 leading-relaxed">
                  {item.ringkasan}
                </p>

                <div className="mt-3 flex items-center justify-between border-t border-[#D6EBE1] pt-2 text-[11px] text-[#5B7A70]">
                  <span className="truncate max-w-[180px]">{item.penandatangan}</span>
                  <span className="font-semibold text-[#2F9E73] flex items-center gap-1">
                    <span>Lihat Detail</span>
                    <ChevronRight className="h-3 w-3" />
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Right Detail Document Panel (7 cols) */}
        <div className="lg:col-span-7 rounded-2xl border border-[#D6EBE1] bg-white p-6 shadow-kawan-rest space-y-5">
          {/* Top Panel Bar */}
          <div className="flex items-center justify-between border-b border-[#D6EBE1] pb-3 text-xs">
            <span className="font-semibold text-[#17503C] flex items-center gap-1.5">
              <FileText className="h-4 w-4 text-[#2F9E73]" />
              Detail Dokumen Resmi Kedinasan
            </span>

            <div className="flex items-center gap-2">
              <span className="rounded-full bg-[#DCFCE7] px-2.5 py-0.5 text-[11px] font-bold text-[#166534] flex items-center gap-1">
                <CheckCircle2 className="h-3 w-3" />
                Dokumen Terverifikasi
              </span>
              <button
                onClick={() => alert('Tautan dokumen resmi disalin ke clipboard.')}
                className="p-1 rounded text-[#5B7A70] hover:bg-[#E8F7F0] cursor-pointer"
                title="Bagikan Tautan"
              >
                <Share2 className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Official Letterhead Header */}
          <div className="rounded-xl border border-[#D6EBE1] bg-[#F7FCFA] p-4 text-center">
            <span className="text-[10px] uppercase font-bold text-[#5B7A70] tracking-wider block">
              PEMERINTAH KABUPATEN MALANG • DINAS KESEHATAN
            </span>
            <h3 className="font-extrabold text-sm text-[#12352B] tracking-tight mt-0.5">
              UPTD PUSKESMAS KEPANJEN
            </h3>
            <p className="text-[10px] text-[#5B7A70] mt-0.5">
              Jl. Kawi No.50, Banurejo, Kepanjen, Kabupaten Malang, Jawa Timur 65163
            </p>
          </div>

          {/* Letter Meta Box */}
          <div className="rounded-xl border border-[#D6EBE1] bg-[#d6fced]/40 p-3 grid grid-cols-3 gap-2 text-xs font-mono">
            <div>
              <span className="text-[10px] uppercase text-[#5B7A70] block font-sans">
                Nomor Surat:
              </span>
              <strong className="text-[#12352B] text-[11px] block truncate">
                {selectedPengumuman.nomorSurat}
              </strong>
            </div>
            <div>
              <span className="text-[10px] uppercase text-[#5B7A70] block font-sans">
                Tanggal Terbit:
              </span>
              <strong className="text-[#12352B] text-[11px] block">
                {selectedPengumuman.tanggal}
              </strong>
            </div>
            <div>
              <span className="text-[10px] uppercase text-[#5B7A70] block font-sans">
                Sifat / Perihal:
              </span>
              <strong className="text-[#166534] text-[11px] block truncate">
                {selectedPengumuman.sifat}
              </strong>
            </div>
          </div>

          {/* Title & Target Audience */}
          <div>
            <h3 className="text-base font-bold text-[#12352B] leading-snug">
              {selectedPengumuman.judul}
            </h3>
            <p className="text-xs text-[#5B7A70] mt-1">
              <strong>Sasaran:</strong> 108 Posyandu, 18 Desa/Kelurahan se-Kecamatan Kepanjen
            </p>
          </div>

          {/* Intisari Arahan Kedinasan */}
          <div className="rounded-xl border border-[#BBF7D0] bg-[#DCFCE7]/70 p-4 space-y-2 text-xs text-[#12352B]">
            <span className="font-bold flex items-center gap-1.5 text-[#166534]">
              <ShieldCheck className="h-4 w-4" />
              Intisari Arahan Kedinasan:
            </span>
            <div className="whitespace-pre-line text-[#386e59] leading-relaxed text-[11px]">
              {selectedPengumuman.isiLengkap}
            </div>
          </div>

          {/* Lampiran PDF Card */}
          <div className="rounded-xl border border-[#D6EBE1] bg-[#F7FCFA] p-4 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-[#DCFCE7] text-[#166534] flex items-center justify-center">
                <FileText className="h-5 w-5" />
              </div>
              <div>
                <strong className="font-bold text-xs text-[#12352B] block">
                  {selectedPengumuman.lampiranNama}
                </strong>
                <span className="text-[10px] text-[#5B7A70] font-mono">
                  Google Drive Puskesmas Kepanjen • PDF Resmi ({selectedPengumuman.lampiranUkuran})
                </span>
              </div>
            </div>

            <button
              onClick={() => handleDownloadPdf(selectedPengumuman.lampiranNama)}
              className="flex items-center gap-1.5 rounded-xl bg-[#17503C] px-4 py-2 font-semibold text-xs text-white hover:bg-[#123e2e] shadow-sm transition-colors cursor-pointer shrink-0"
            >
              <Download className="h-3.5 w-3.5" />
              <span>Unduh Lampiran Resmi</span>
            </button>
          </div>
        </div>
      </div>

      {/* Kebijakan Publikasi & Integritas Pengumuman */}
      <div className="rounded-2xl border border-[#D6EBE1] bg-white p-6 shadow-kawan-rest space-y-3">
        <span className="text-[10px] uppercase font-bold tracking-wider text-[#5B7A70] block">
          TATA KELOLA DOKUMEN PUBLIK
        </span>
        <h4 className="font-bold text-sm text-[#12352B]">
          Kebijakan Publikasi & Integritas Pengumuman
        </h4>
        <p className="text-xs text-[#5B7A70] max-w-3xl">
          Untuk menjamin ketertiban dan akurasi informasi kader serta warga Kecamatan Kepanjen, kanal ini beroperasi dengan standar kedinasan:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
          <div className="rounded-xl border border-[#D6EBE1] bg-[#F7FCFA] p-4">
            <strong className="text-xs font-bold text-[#12352B] block mb-1">
              ✓ Verifikasi Satu Pintu
            </strong>
            <p className="text-[11px] text-[#5B7A70] leading-relaxed">
              Seluruh naskah pengumuman dan surat edaran wajib divalidasi langsung oleh Admin Operasional Promkes atau Kepala UPTD Puskesmas Kepanjen sebelum diterbitkan.
            </p>
          </div>

          <div className="rounded-xl border border-[#D6EBE1] bg-[#F7FCFA] p-4">
            <strong className="text-xs font-bold text-[#12352B] block mb-1">
              ✓ Bebas Hoaks & Broadcast Liar
            </strong>
            <p className="text-[11px] text-[#5B7A70] leading-relaxed">
              Kader dihimbau hanya mempedomani surat berpenomoran sah dan bertanda tangan digital resmi untuk menghindari simpang siur jadwal maupun instruksi posyandu.
            </p>
          </div>

          <div className="rounded-xl border border-[#D6EBE1] bg-[#F7FCFA] p-4">
            <strong className="text-xs font-bold text-[#12352B] block mb-1">
              ✓ Pengarsipan Otomatis
            </strong>
            <p className="text-[11px] text-[#5B7A70] leading-relaxed">
              Setelah batas waktu operasional kegiatan terlewati, surat dinas akan dipindahkan secara terotomatisasi ke arsip tertutup demi transparansi 18 desa/kelurahan.
            </p>
          </div>
        </div>
      </div>

      {/* Contact Confirmation Strip */}
      <div className="rounded-2xl border border-[#D6EBE1] bg-[#17503C] p-6 text-white flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <span className="text-[10px] text-[#71daab] uppercase font-bold tracking-wider block">
            PUSAT BANTUAN & KOORDINASI EDARAN
          </span>
          <h4 className="text-base font-bold mt-0.5">
            Butuh Konfirmasi Mengenai Pengumuman Khusus?
          </h4>
          <p className="text-xs text-[#d3f9ea] mt-1 max-w-xl">
            Apabila terdapat keraguan terhadap nomor surat atau membutuhkan klarifikasi operasional langsung dari UPTD Puskesmas Kepanjen, silakan hubungi saluran siaga resmi kami.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-2 shrink-0">
          <a
            href="tel:08889924444"
            className="flex items-center gap-2 rounded-xl bg-[#2F9E73] px-4 py-2 text-xs font-semibold text-white hover:bg-[#268762] transition-colors"
          >
            <Phone className="h-4 w-4" />
            <span>0888-9924-444</span>
          </a>
          <a
            href="mailto:pkm.kepanjen@gmail.com"
            className="flex items-center gap-2 rounded-xl border border-[#71daab] bg-white/10 px-4 py-2 text-xs font-semibold text-white hover:bg-white/20 transition-colors"
          >
            <Mail className="h-4 w-4" />
            <span>pkm.kepanjen@gmail.com</span>
          </a>
        </div>
      </div>
    </div>
  );
};
