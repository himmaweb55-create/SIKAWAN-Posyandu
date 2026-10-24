import React, { useState, useMemo } from 'react';
import {
  Search,
  Filter,
  RotateCcw,
  ExternalLink,
  ChevronRight,
  CheckCircle2,
  AlertTriangle,
  Clock,
  X,
  Phone,
  FileSpreadsheet,
  Link as LinkIcon,
  Shield,
  Info,
  MapPin,
} from 'lucide-react';
import {
  POSYANDU_LIST,
  DAFTAR_DESA,
  PosyanduItem,
} from '../../data/posyanduData';

interface CariPosyanduViewProps {
  initialSearchQuery?: string;
  onOpenGateway?: (posyanduId: string) => void;
  onOpenGatewayWithPosyandu?: (posyanduId: string) => void;
}

export const CariPosyanduView: React.FC<CariPosyanduViewProps> = ({
  initialSearchQuery = '',
  onOpenGateway,
  onOpenGatewayWithPosyandu,
}) => {
  const triggerGateway = onOpenGateway || onOpenGatewayWithPosyandu;
  const [search, setSearch] = useState(initialSearchQuery);
  const [selectedDesa, setSelectedDesa] = useState('Semua');
  const [selectedStatus, setSelectedStatus] = useState('Semua');
  const [activeItem, setActiveItem] = useState<PosyanduItem | null>(POSYANDU_LIST[0]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  // Filtered posyandu list
  const filteredList = useMemo(() => {
    return POSYANDU_LIST.filter((item) => {
      const matchSearch =
        search === '' ||
        item.nama.toLowerCase().includes(search.toLowerCase()) ||
        item.id.toLowerCase().includes(search.toLowerCase()) ||
        item.desa.toLowerCase().includes(search.toLowerCase()) ||
        item.alamat.toLowerCase().includes(search.toLowerCase());

      const matchDesa = selectedDesa === 'Semua' || item.desa === selectedDesa;

      const matchStatus =
        selectedStatus === 'Semua' ||
        (selectedStatus === 'tersedia' && item.statusTautan === 'Tautan tersedia') ||
        (selectedStatus === 'periksa' && item.statusTautan === 'Perlu diperiksa') ||
        (selectedStatus === 'lengkap' && item.statusTautan === 'Lengkap');

      return matchSearch && matchDesa && matchStatus;
    });
  }, [search, selectedDesa, selectedStatus]);

  const totalPages = Math.ceil(filteredList.length / itemsPerPage);
  const paginatedList = filteredList.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleReset = () => {
    setSearch('');
    setSelectedDesa('Semua');
    setSelectedStatus('Semua');
    setCurrentPage(1);
  };

  return (
    <div className="space-y-6">
      {/* Header and Reference Strip */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        <div className="lg:col-span-8">
          <span className="text-[10px] uppercase font-bold tracking-wider text-[#2F9E73]">
            DATABASE WILAYAH KERJA PUSKESMAS
          </span>
          <h2 className="text-2xl font-bold text-[#12352B] tracking-tight mt-0.5">
            Direktori & Cari Posyandu
          </h2>
          <p className="mt-1 text-xs text-[#5B7A70] leading-relaxed max-w-2xl">
            108 Posyandu di 18 Desa/Kelurahan Wilayah UPTD Puskesmas Kepanjen. Akses navigasi satu pintu menuju lembar kerja dan instrumen lapangan Posyandu.
          </p>

          <div className="mt-3 flex items-center gap-3 text-xs">
            <span className="rounded-full bg-[#d6fced] px-3 py-1 text-[#17503C] font-semibold">
              18 Desa / Kelurahan Terdaftar
            </span>
            <span className="rounded-full bg-[#DCFCE7] px-3 py-1 text-[#166534] font-semibold">
              ✓ Validasi Master SK 2024
            </span>
          </div>
        </div>

        {/* Right Reference Box: Data Desa Tegalsari Sample */}
        <div className="lg:col-span-4 rounded-xl border border-[#D6EBE1] bg-white p-4 shadow-kawan-rest">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-[#12352B]">
              Referensi Khusus: Data Desa Tegalsari
            </span>
            <span className="rounded bg-[#E8F7F0] px-2 py-0.5 text-[10px] font-mono font-bold text-[#2F9E73]">
              3 Unit
            </span>
          </div>

          <div className="space-y-1 text-xs font-mono">
            <div className="flex items-center justify-between p-1.5 rounded bg-[#F7FCFA]">
              <span className="font-bold text-[#17503C]">KPN - 079</span>
              <span className="text-[#12352B]">Posyandu A</span>
              <span className="text-[10px] text-[#5B7A70]">Tegalsari</span>
            </div>
            <div className="flex items-center justify-between p-1.5 rounded bg-[#F7FCFA]">
              <span className="font-bold text-[#17503C]">KPN - 080</span>
              <span className="text-[#12352B]">Posyandu B</span>
              <span className="text-[10px] text-[#5B7A70]">Tegalsari</span>
            </div>
            <div className="flex items-center justify-between p-1.5 rounded bg-[#F7FCFA]">
              <span className="font-bold text-[#17503C]">KPN - 081</span>
              <span className="text-[#12352B]">Posyandu C</span>
              <span className="text-[10px] text-[#5B7A70]">Tegalsari</span>
            </div>
          </div>
          <p className="mt-2 text-[10px] text-[#5B7A70]">
            Katalog penamaan standar sesuai penetapan data master puskesmas.
          </p>
        </div>
      </div>

      {/* Filter Toolbar */}
      <div className="rounded-xl border border-[#D6EBE1] bg-white p-4 shadow-kawan-rest flex flex-wrap items-center gap-3">
        {/* Search Input */}
        <div className="relative flex-1 min-w-[220px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#5B7A70]" />
          <input
            type="text"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setCurrentPage(1);
            }}
            placeholder="Cari ID Posyandu atau Nama Posyandu..."
            className="w-full rounded-lg border border-[#D6EBE1] bg-[#F7FCFA] pl-9 pr-3 py-2 text-xs text-[#12352B] focus:border-[#2F9E73] focus:bg-white focus:outline-none"
          />
        </div>

        {/* Desa Dropdown */}
        <div className="w-48">
          <select
            value={selectedDesa}
            onChange={(e) => {
              setSelectedDesa(e.target.value);
              setCurrentPage(1);
            }}
            className="w-full rounded-lg border border-[#D6EBE1] bg-white px-3 py-2 text-xs text-[#12352B] focus:border-[#2F9E73] focus:outline-none cursor-pointer"
          >
            <option value="Semua">Semua Desa / Kelurahan (18)</option>
            {DAFTAR_DESA.map((d) => (
              <option key={d} value={d}>
                {d}
              </option>
            ))}
          </select>
        </div>

        {/* Status Dropdown */}
        <div className="w-44">
          <select
            value={selectedStatus}
            onChange={(e) => {
              setSelectedStatus(e.target.value);
              setCurrentPage(1);
            }}
            className="w-full rounded-lg border border-[#D6EBE1] bg-white px-3 py-2 text-xs text-[#12352B] focus:border-[#2F9E73] focus:outline-none cursor-pointer"
          >
            <option value="Semua">Semua Status Tautan</option>
            <option value="tersedia">Tautan Tersedia (2/4)</option>
            <option value="periksa">Perlu Diperiksa</option>
            <option value="lengkap">Lengkap (4/4)</option>
          </select>
        </div>

        {/* Reset Button */}
        <button
          onClick={handleReset}
          className="flex items-center gap-1.5 rounded-lg border border-[#D6EBE1] bg-[#F7FCFA] px-3 py-2 text-xs font-semibold text-[#17503C] hover:bg-[#E8F7F0] transition-colors cursor-pointer"
        >
          <RotateCcw className="h-3.5 w-3.5" />
          <span>Reset Filter</span>
        </button>
      </div>

      {/* Main Table + Detail Drawer Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Table Area (8 cols or full width) */}
        <div className={`${activeItem ? 'lg:col-span-8' : 'lg:col-span-12'} space-y-4`}>
          <div className="rounded-xl border border-[#D6EBE1] bg-white shadow-kawan-rest overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="border-b border-[#D6EBE1] bg-[#F7FCFA] text-[#5B7A70] font-semibold">
                    <th className="py-3 px-4">ID POSYANDU</th>
                    <th className="py-3 px-4">NAMA POSYANDU</th>
                    <th className="py-3 px-4">DESA/KELURAHAN</th>
                    <th className="py-3 px-4">ALAMAT POSYANDU</th>
                    <th className="py-3 px-4">STATUS TAUTAN</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#D6EBE1]">
                  {paginatedList.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="py-10 text-center text-[#5B7A70]">
                        Tidak ada posyandu yang cocok dengan filter pencarian.
                      </td>
                    </tr>
                  ) : (
                    paginatedList.map((item) => {
                      const isSelected = activeItem?.id === item.id;
                      return (
                        <tr
                          key={item.id}
                          onClick={() => setActiveItem(item)}
                          className={`hover:bg-[#E8F7F0]/60 transition-colors cursor-pointer ${
                            isSelected ? 'bg-[#E8F7F0] font-medium' : ''
                          }`}
                        >
                          <td className="py-3 px-4 font-mono font-bold text-[#17503C] whitespace-nowrap">
                            <span className="flex items-center gap-2">
                              <span className="h-2 w-2 rounded-full bg-[#2F9E73]" />
                              {item.id}
                            </span>
                          </td>
                          <td className="py-3 px-4 font-semibold text-[#12352B]">
                            {item.nama}
                          </td>
                          <td className="py-3 px-4 text-[#5B7A70]">
                            {item.desa}
                          </td>
                          <td className="py-3 px-4 text-[#5B7A70] max-w-xs truncate">
                            {item.alamat}
                          </td>
                          <td className="py-3 px-4 whitespace-nowrap">
                            {item.statusTautan === 'Tautan tersedia' ? (
                              <span className="inline-flex items-center gap-1.5 rounded-full bg-[#DCFCE7] px-2.5 py-1 text-[11px] font-semibold text-[#166534]">
                                <span className="h-1.5 w-1.5 rounded-full bg-[#166534]"></span>
                                Tautan tersedia ({item.slotTersedia}/4)
                              </span>
                            ) : item.statusTautan === 'Perlu diperiksa' ? (
                              <span className="inline-flex items-center gap-1.5 rounded-full bg-[#FEF3C7] px-2.5 py-1 text-[11px] font-semibold text-[#92400E]">
                                <span className="h-1.5 w-1.5 rounded-full bg-[#92400E]"></span>
                                Perlu diperiksa (URL ganda)
                              </span>
                            ) : (
                              <span className="inline-flex items-center gap-1.5 rounded-full bg-[#d6fced] px-2.5 py-1 text-[11px] font-semibold text-[#006948]">
                                <span className="h-1.5 w-1.5 rounded-full bg-[#006948]"></span>
                                Lengkap (4/4)
                              </span>
                            )}
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>

            {/* Pagination Controls */}
            <div className="flex flex-col sm:flex-row items-center justify-between border-t border-[#D6EBE1] bg-[#F7FCFA] p-3 text-xs text-[#5B7A70] gap-3">
              <div>
                Menampilkan <span className="font-semibold text-[#12352B]">{(currentPage - 1) * itemsPerPage + 1}</span> -{' '}
                <span className="font-semibold text-[#12352B]">
                  {Math.min(currentPage * itemsPerPage, filteredList.length)}
                </span>{' '}
                dari <span className="font-semibold text-[#12352B]">{filteredList.length}</span> Posyandu
              </div>

              <div className="flex items-center gap-1">
                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => i + 1).map((pg) => (
                  <button
                    key={pg}
                    onClick={() => setCurrentPage(pg)}
                    className={`h-7 w-7 rounded-md font-mono text-xs font-semibold transition-colors cursor-pointer ${
                      currentPage === pg
                        ? 'bg-[#17503C] text-white'
                        : 'bg-white border border-[#D6EBE1] text-[#12352B] hover:bg-[#E8F7F0]'
                    }`}
                  >
                    {pg}
                  </button>
                ))}
                {totalPages > 5 && <span className="px-1">...</span>}
                {totalPages > 5 && (
                  <button
                    onClick={() => setCurrentPage(totalPages)}
                    className={`h-7 w-7 rounded-md font-mono text-xs font-semibold bg-white border border-[#D6EBE1] text-[#12352B] hover:bg-[#E8F7F0]`}
                  >
                    {totalPages}
                  </button>
                )}
                <button
                  disabled={currentPage >= totalPages}
                  onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                  className="rounded-md border border-[#D6EBE1] bg-white px-2.5 py-1 text-xs font-medium text-[#12352B] disabled:opacity-40 cursor-pointer"
                >
                  Lanjut &rarr;
                </button>
              </div>
            </div>
          </div>

          {/* System Integrity Notification Card */}
          <div className="rounded-xl border border-[#D6EBE1] bg-[#E8F7F0]/80 p-4 flex items-start gap-3 text-xs text-[#17503C]">
            <Info className="h-5 w-5 text-[#2F9E73] shrink-0 mt-0.5" />
            <div>
              <strong className="block font-bold">Pemberitahuan Sistem & Integritas Data</strong>
              <span>
                Portal ini hanya menyediakan navigasi dan direktori satu pintu. Pengisian data tetap berlangsung di Google Sheets masing-masing Posyandu yang terhubung dengan akun terverifikasi.
              </span>
            </div>
          </div>
        </div>

        {/* Right Drawer / Detail Panel (4 cols) */}
        {activeItem && (
          <div className="lg:col-span-4 rounded-xl border border-[#D6EBE1] bg-white p-5 shadow-kawan-rest space-y-5">
            {/* Drawer Header */}
            <div>
              <div className="flex items-center justify-between">
                <span className="rounded bg-[#E8F7F0] px-2 py-0.5 font-mono text-xs font-bold text-[#17503C]">
                  {activeItem.id} SEDANG DITINJAU
                </span>
                <button
                  onClick={() => setActiveItem(null)}
                  className="rounded p-1 text-[#5B7A70] hover:bg-[#E8F7F0] cursor-pointer"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
              <h3 className="text-base font-bold text-[#12352B] mt-2">
                {activeItem.nama}
              </h3>
              <p className="text-xs text-[#5B7A70] flex items-center gap-1 mt-0.5">
                <MapPin className="h-3.5 w-3.5 text-[#2F9E73]" />
                <span>Desa/Kelurahan {activeItem.desa}</span>
              </p>
            </div>

            {/* Address */}
            <div className="rounded-lg bg-[#F7FCFA] p-3 border border-[#D6EBE1] text-xs">
              <span className="text-[10px] uppercase font-bold text-[#5B7A70] block">
                ALAMAT LOKASI LAYANAN
              </span>
              <p className="text-[#12352B] mt-0.5 leading-snug font-medium">
                {activeItem.alamat}, Kec. Kepanjen, Kab. Malang
              </p>
            </div>

            {/* 4 Sheets Status */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-[#12352B]">
                  STATUS 4 INSTRUMEN SHEETS
                </span>
                <span className="rounded-full bg-[#d6fced] px-2 py-0.5 font-mono text-[11px] font-bold text-[#17503C]">
                  {activeItem.slotTersedia} / 4 Tervalidasi
                </span>
              </div>

              <div className="space-y-2 text-xs">
                {/* Form 1 */}
                <div className="flex items-center justify-between p-2 rounded-lg bg-[#F7FCFA] border border-[#D6EBE1]">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-[#2F9E73]" />
                    <span className="font-medium text-[#12352B]">1. Absen Pelaporan Posyandu</span>
                  </div>
                  <a
                    href={activeItem.sheetLinks.absen || '#'}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-1 font-semibold text-[#2F9E73] hover:underline"
                  >
                    <span>Buka</span>
                    <ExternalLink className="h-3 w-3" />
                  </a>
                </div>

                {/* Form 2 */}
                <div className="flex items-center justify-between p-2 rounded-lg bg-[#F7FCFA] border border-[#D6EBE1]">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-[#2F9E73]" />
                    <span className="font-medium text-[#12352B]">2. Rekap Kunjungan Rumah</span>
                  </div>
                  <a
                    href={activeItem.sheetLinks.hasilPelayanan || '#'}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-1 font-semibold text-[#2F9E73] hover:underline"
                  >
                    <span>Buka</span>
                    <ExternalLink className="h-3 w-3" />
                  </a>
                </div>

                {/* Form 3 */}
                <div className="flex items-center justify-between p-2 rounded-lg bg-[#F7FCFA] border border-[#D6EBE1]">
                  <div className="flex items-center gap-2">
                    {activeItem.sheetLinks.rekapKunjungan ? (
                      <CheckCircle2 className="h-4 w-4 text-[#2F9E73]" />
                    ) : (
                      <Clock className="h-4 w-4 text-[#D97706]" />
                    )}
                    <span className="text-[#12352B]">3. Hasil Pelayanan Posyandu</span>
                  </div>
                  {activeItem.sheetLinks.rekapKunjungan ? (
                    <a
                      href={activeItem.sheetLinks.rekapKunjungan}
                      target="_blank"
                      rel="noreferrer"
                      className="font-semibold text-[#2F9E73] hover:underline flex items-center gap-1"
                    >
                      <span>Buka</span>
                      <ExternalLink className="h-3 w-3" />
                    </a>
                  ) : (
                    <span className="rounded bg-[#FEF3C7] px-2 py-0.5 text-[10px] text-[#92400E] font-medium">
                      Tautan Belum Ada
                    </span>
                  )}
                </div>

                {/* Form 4 */}
                <div className="flex items-center justify-between p-2 rounded-lg bg-[#F7FCFA] border border-[#D6EBE1]">
                  <div className="flex items-center gap-2">
                    {activeItem.sheetLinks.hasilKunjungan ? (
                      <CheckCircle2 className="h-4 w-4 text-[#2F9E73]" />
                    ) : (
                      <Clock className="h-4 w-4 text-[#D97706]" />
                    )}
                    <span className="text-[#12352B]">4. Hasil Kunjungan Rumah</span>
                  </div>
                  {activeItem.sheetLinks.hasilKunjungan ? (
                    <a
                      href={activeItem.sheetLinks.hasilKunjungan}
                      target="_blank"
                      rel="noreferrer"
                      className="font-semibold text-[#2F9E73] hover:underline flex items-center gap-1"
                    >
                      <span>Buka</span>
                      <ExternalLink className="h-3 w-3" />
                    </a>
                  ) : (
                    <span className="rounded bg-[#FEF3C7] px-2 py-0.5 text-[10px] text-[#92400E] font-medium">
                      Tautan Belum Ada
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Launch Buttons */}
            <div className="space-y-2">
              {triggerGateway && (
                <button
                  onClick={() => triggerGateway(activeItem.id)}
                  className="w-full flex items-center justify-center gap-2 rounded-xl bg-[#2F9E73] py-2.5 text-xs font-semibold text-white hover:bg-[#268762] shadow-sm transition-colors cursor-pointer"
                >
                  <FileSpreadsheet className="h-4 w-4" />
                  <span>Buka di Gateway 4 Formulir</span>
                </button>
              )}

              <a
                href={activeItem.sheetLinks.absen || '#'}
                target="_blank"
                rel="noreferrer"
                className="w-full flex items-center justify-center gap-2 rounded-xl bg-[#17503C] py-2 text-xs font-semibold text-white hover:bg-[#123e2e] shadow-sm transition-colors"
              >
                <FileSpreadsheet className="h-3.5 w-3.5" />
                <span>Buka Spreadsheet Google Drive Langsung</span>
              </a>

              <a
                href={activeItem.linktreeUrl}
                target="_blank"
                rel="noreferrer"
                className="w-full flex items-center justify-center gap-2 rounded-xl border border-[#D6EBE1] bg-white py-2 text-xs font-semibold text-[#17503C] hover:bg-[#E8F7F0] transition-colors"
              >
                <LinkIcon className="h-3.5 w-3.5" />
                <span>Buka Linktree Desa {activeItem.desa}</span>
              </a>
            </div>

            <div className="rounded-lg bg-[#F7FCFA] p-3 text-[11px] text-[#5B7A70] border border-[#D6EBE1]">
              <span className="flex items-center gap-1.5 font-semibold text-[#12352B] mb-1">
                <Shield className="h-3.5 w-3.5 text-[#2F9E73]" />
                Izin Akses Dokumen
              </span>
              Izin Google Drive/Sheets terikat akun Google resmi Posyandu. Jika belum memperoleh hak akses, silakan koordinasikan dengan Bidan Desa atau pengelola Puskesmas.
            </div>

            {/* Pembina Wilayah Nakes */}
            <div className="border-t border-[#D6EBE1] pt-3">
              <span className="text-[10px] uppercase font-bold text-[#5B7A70] block mb-2">
                PEMBINA WILAYAH KESEHATAN (NAKES)
              </span>

              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="p-2 rounded-lg bg-[#F7FCFA] border border-[#D6EBE1]">
                  <span className="text-[10px] text-[#5B7A70] block">Bidan Desa</span>
                  <strong className="text-[#12352B] block text-[11px] truncate">
                    {activeItem.bidan.nama}, {activeItem.bidan.gelar}
                  </strong>
                  <span className="font-mono text-[10px] text-[#2F9E73] flex items-center gap-1 mt-0.5">
                    <Phone className="h-3 w-3" />
                    {activeItem.bidan.telepon}
                  </span>
                </div>

                <div className="p-2 rounded-lg bg-[#F7FCFA] border border-[#D6EBE1]">
                  <span className="text-[10px] text-[#5B7A70] block">Perawat Desa</span>
                  <strong className="text-[#12352B] block text-[11px] truncate">
                    {activeItem.perawat.nama}, {activeItem.perawat.gelar}
                  </strong>
                  <span className="font-mono text-[10px] text-[#2F9E73] flex items-center gap-1 mt-0.5">
                    <Phone className="h-3 w-3" />
                    {activeItem.perawat.telepon}
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
