import React, { useState } from 'react';
import {
  FileEdit,
  Send,
  CheckCircle2,
  Clock,
  AlertCircle,
  HelpCircle,
  Search,
  PlusCircle,
  ShieldCheck,
  RefreshCw,
  FileSpreadsheet,
} from 'lucide-react';
import {
  USULAN_LIST_INIT,
  UsulanKoreksiItem,
  POSYANDU_DATA,
  DAFTAR_DESA,
} from '../../data/posyanduData';

export const UsulanKoreksiView: React.FC = () => {
  const [usulanList, setUsulanList] = useState<UsulanKoreksiItem[]>(USULAN_LIST_INIT);
  const [activeTab, setActiveTab] = useState<'form' | 'riwayat'>('form');

  // Form State
  const [namaPengusul, setNamaPengusul] = useState('Siti Saudah, A.Md.Keb.');
  const [peran, setPeran] = useState('Bidan Desa Tegalsari');
  const [telepon, setTelepon] = useState('0812-3456-7890');
  const [selectedDesa, setSelectedDesa] = useState('Tegalsari');
  const [selectedPosyanduId, setSelectedPosyanduId] = useState('TGL-001');
  const [kategori, setKategori] = useState<UsulanKoreksiItem['kategori']>(
    'Perbaikan Tautan Google Sheets'
  );
  const [deskripsi, setDeskripsi] = useState('');
  const [tautanBaru, setTautanBaru] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  // Posyandu options for current selected village
  const availablePosyandu = POSYANDU_DATA.filter((p) => p.desa === selectedDesa);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!deskripsi.trim()) return;

    const currentPos = POSYANDU_DATA.find((p) => p.id === selectedPosyanduId);
    const newUsulan: UsulanKoreksiItem = {
      id: `USL-2025-${String(usulanList.length + 1).padStart(3, '0')}`,
      namaPengusul,
      peran,
      telepon,
      posyanduId: selectedPosyanduId,
      posyanduNama: currentPos?.nama || 'Posyandu Terpilih',
      desa: selectedDesa,
      kategori,
      deskripsi: tautanBaru ? `${deskripsi} (Tautan baru: ${tautanBaru})` : deskripsi,
      tanggalDiajukan: 'Hari ini',
      status: 'Menunggu Verifikasi',
    };

    setUsulanList([newUsulan, ...usulanList]);
    setIsSuccess(true);
    setDeskripsi('');
    setTautanBaru('');
    setTimeout(() => {
      setIsSuccess(false);
      setActiveTab('riwayat');
    }, 2000);
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-white rounded-2xl border border-[#D6EBE1] shadow-kawan-rest p-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full text-xs font-semibold bg-[#E8F7F0] text-[#17503C] border border-[#D6EBE1] mb-2">
              <FileEdit className="w-3.5 h-3.5 text-[#2F9E73]" />
              Layanan Koreksi Data Mandiri Terverifikasi
            </div>
            <h1 className="text-2xl font-bold text-[#12352B] tracking-tight">
              Usulan Koreksi Data & Tautan Posyandu
            </h1>
            <p className="text-sm text-[#5B7A70] mt-1 max-w-3xl">
              Fasilitas bagi Bidan Wilayah, Perawat Desa, dan Kader Koordinator untuk mengajukan
              pembaruan tautan Google Sheets, rotasi jadwal hari buka, atau verifikasi nomor kontak.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveTab('form')}
              className={`px-4 py-2 rounded-[10px] text-xs font-semibold transition-all ${
                activeTab === 'form'
                  ? 'bg-[#2F9E73] text-white shadow-sm'
                  : 'bg-[#F7FCFA] text-[#17503C] border border-[#D6EBE1] hover:bg-[#E8F7F0]'
              }`}
            >
              Formulir Pengajuan
            </button>
            <button
              onClick={() => setActiveTab('riwayat')}
              className={`px-4 py-2 rounded-[10px] text-xs font-semibold transition-all flex items-center gap-1.5 ${
                activeTab === 'riwayat'
                  ? 'bg-[#2F9E73] text-white shadow-sm'
                  : 'bg-[#F7FCFA] text-[#17503C] border border-[#D6EBE1] hover:bg-[#E8F7F0]'
              }`}
            >
              Riwayat Usulan
              <span className="w-5 h-5 rounded-full bg-white/20 text-current flex items-center justify-center text-[10px] font-bold">
                {usulanList.length}
              </span>
            </button>
          </div>
        </div>
      </div>

      {isSuccess && (
        <div className="bg-[#DCFCE7] border border-[#BBF7D0] p-4 rounded-xl flex items-center gap-3 text-xs text-[#166534] shadow-sm animate-fadeIn">
          <CheckCircle2 className="w-5 h-5 text-[#166534] shrink-0" />
          <div>
            <div className="font-bold">Usulan Koreksi Berhasil Dikirimkan!</div>
            <div>
              ID Pengajuan telah dicatat dan diteruskan ke Admin Promkes untuk proses verifikasi teknis.
            </div>
          </div>
        </div>
      )}

      {/* Tab 1: Form Pengajuan */}
      {activeTab === 'form' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-8 bg-white rounded-2xl border border-[#D6EBE1] shadow-kawan-rest p-6">
            <h2 className="text-lg font-bold text-[#12352B] mb-1">
              Formulir Pengajuan Usulan Koreksi
            </h2>
            <p className="text-xs text-[#5B7A70] mb-6">
              Data akan diverifikasi oleh Admin Promkes Puskesmas Kepanjen dalam 1x24 jam kerja.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Row 1: Identitas Pengusul */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#17503C] mb-1.5">
                    Nama Lengkap Pengusul *
                  </label>
                  <input
                    type="text"
                    required
                    value={namaPengusul}
                    onChange={(e) => setNamaPengusul(e.target.value)}
                    className="w-full bg-[#F7FCFA] border border-[#D6EBE1] focus:border-[#2F9E73] rounded-[10px] px-3.5 py-2.5 text-xs text-[#12352B] focus:outline-none"
                    placeholder="Nama lengkap dan gelar nakes/kader"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#17503C] mb-1.5">
                    Peran / Jabatan Dinas *
                  </label>
                  <input
                    type="text"
                    required
                    value={peran}
                    onChange={(e) => setPeran(e.target.value)}
                    className="w-full bg-[#F7FCFA] border border-[#D6EBE1] focus:border-[#2F9E73] rounded-[10px] px-3.5 py-2.5 text-xs text-[#12352B] focus:outline-none"
                    placeholder="Contoh: Bidan Desa Tegalsari"
                  />
                </div>
              </div>

              {/* Row 2: Kontak WA & Kategori */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#17503C] mb-1.5">
                    Nomor WhatsApp / Telepon Aktif *
                  </label>
                  <input
                    type="text"
                    required
                    value={telepon}
                    onChange={(e) => setTelepon(e.target.value)}
                    className="w-full bg-[#F7FCFA] border border-[#D6EBE1] focus:border-[#2F9E73] rounded-[10px] px-3.5 py-2.5 text-xs text-[#12352B] focus:outline-none font-mono"
                    placeholder="08xx-xxxx-xxxx"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#17503C] mb-1.5">
                    Kategori Perbaikan *
                  </label>
                  <select
                    value={kategori}
                    onChange={(e) =>
                      setKategori(e.target.value as UsulanKoreksiItem['kategori'])
                    }
                    className="w-full bg-[#F7FCFA] border border-[#D6EBE1] focus:border-[#2F9E73] rounded-[10px] px-3.5 py-2.5 text-xs text-[#12352B] focus:outline-none"
                  >
                    <option value="Perbaikan Tautan Google Sheets">
                      Perbaikan Tautan Google Sheets
                    </option>
                    <option value="Perubahan Kontak Bidan/Perawat">
                      Perubahan Kontak Bidan/Perawat
                    </option>
                    <option value="Penyesuaian Jadwal Hari Buka">
                      Penyesuaian Jadwal Hari Buka
                    </option>
                    <option value="Koreksi Data Wilayah & Strata">
                      Koreksi Data Wilayah & Strata
                    </option>
                  </select>
                </div>
              </div>

              {/* Row 3: Posyandu Sasaran */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#17503C] mb-1.5">
                    Desa / Kelurahan Sasaran *
                  </label>
                  <select
                    value={selectedDesa}
                    onChange={(e) => {
                      setSelectedDesa(e.target.value);
                      const f = POSYANDU_DATA.find((p) => p.desa === e.target.value);
                      if (f) setSelectedPosyanduId(f.id);
                    }}
                    className="w-full bg-[#F7FCFA] border border-[#D6EBE1] focus:border-[#2F9E73] rounded-[10px] px-3.5 py-2.5 text-xs text-[#12352B] focus:outline-none"
                  >
                    {DAFTAR_DESA.map((d) => (
                      <option key={d} value={d}>
                        Desa {d}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#17503C] mb-1.5">
                    Posyandu yang Dikoreksi *
                  </label>
                  <select
                    value={selectedPosyanduId}
                    onChange={(e) => setSelectedPosyanduId(e.target.value)}
                    className="w-full bg-[#F7FCFA] border border-[#D6EBE1] focus:border-[#2F9E73] rounded-[10px] px-3.5 py-2.5 text-xs text-[#12352B] focus:outline-none font-mono"
                  >
                    {availablePosyandu.map((p) => (
                      <option key={p.id} value={p.id}>
                        [{p.id}] {p.nama}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Tautan Baru (jika ada) */}
              <div>
                <label className="block text-xs font-semibold text-[#17503C] mb-1.5">
                  Tautan Pengganti / Bukti Pendukung (Opsional)
                </label>
                <input
                  type="url"
                  value={tautanBaru}
                  onChange={(e) => setTautanBaru(e.target.value)}
                  className="w-full bg-[#F7FCFA] border border-[#D6EBE1] focus:border-[#2F9E73] rounded-[10px] px-3.5 py-2.5 text-xs text-[#12352B] focus:outline-none font-mono"
                  placeholder="https://docs.google.com/spreadsheets/d/..."
                />
              </div>

              {/* Deskripsi Usulan */}
              <div>
                <label className="block text-xs font-semibold text-[#17503C] mb-1.5">
                  Rincian Koreksi & Alasan Perubahan *
                </label>
                <textarea
                  required
                  rows={4}
                  value={deskripsi}
                  onChange={(e) => setDeskripsi(e.target.value)}
                  className="w-full bg-[#F7FCFA] border border-[#D6EBE1] focus:border-[#2F9E73] rounded-[10px] p-3.5 text-xs text-[#12352B] focus:outline-none"
                  placeholder="Jelaskan secara spesifik apa yang perlu diperbaiki (contoh: Link Formulir 02 Mawar Tegalsari perlu diganti karena kapasitas baris penuh; jadwal diundur 2 hari karena ada kegiatan desa)..."
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setDeskripsi('');
                    setTautanBaru('');
                  }}
                  className="px-4 py-2.5 rounded-[10px] bg-white border border-[#D6EBE1] text-[#5B7A70] hover:text-[#17503C] text-xs font-semibold transition-colors"
                >
                  Reset Form
                </button>
                <button
                  type="submit"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-[10px] bg-[#2F9E73] hover:bg-[#268762] text-white text-xs font-bold shadow-sm transition-all"
                >
                  <Send className="w-3.5 h-3.5" />
                  Kirim Usulan Koreksi
                </button>
              </div>
            </form>
          </div>

          {/* Kolom Informasi & Alur Validasi */}
          <div className="lg:col-span-4 space-y-5">
            <div className="bg-[#17503C] text-white rounded-2xl p-5 shadow-kawan-rest">
              <h3 className="font-bold text-sm text-white mb-2 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#71daab]" />
                Alur Verifikasi Promkes
              </h3>
              <div className="space-y-3 text-xs text-[#d0f6e7]">
                <div className="flex items-start gap-2.5">
                  <div className="w-5 h-5 rounded-full bg-white/10 flex items-center justify-center font-bold text-white shrink-0">
                    1
                  </div>
                  <div>
                    <span className="font-semibold text-white">Pengajuan Online:</span> Nakes atau
                    kader mengisi form secara rinci.
                  </div>
                </div>
                <div className="flex items-start gap-2.5">
                  <div className="w-5 h-5 rounded-full bg-white/10 flex items-center justify-center font-bold text-white shrink-0">
                    2
                  </div>
                  <div>
                    <span className="font-semibold text-white">Review Admin:</span> Admin Promkes
                    memeriksa keabsahan tautan & hak akses.
                  </div>
                </div>
                <div className="flex items-start gap-2.5">
                  <div className="w-5 h-5 rounded-full bg-white/10 flex items-center justify-center font-bold text-white shrink-0">
                    3
                  </div>
                  <div>
                    <span className="font-semibold text-white">Pembaruan Master:</span> Data
                    langsung aktif di portal SI-KAWAN.
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-[#D6EBE1] shadow-kawan-rest p-5">
              <h3 className="font-bold text-sm text-[#12352B] mb-2">
                Pedoman Pengajuan Tautan Sheets
              </h3>
              <ul className="text-xs text-[#5B7A70] space-y-2 list-disc list-inside">
                <li>Pastikan hak akses dokumen Google Sheets disetel ke akun dinas puskesmas.</li>
                <li>Format kolom wajib mengikuti template standar ILP 2025.</li>
                <li>Sertakan nama posyandu dan desa yang jelas pada judul file.</li>
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Riwayat Usulan */}
      {activeTab === 'riwayat' && (
        <div className="bg-white rounded-2xl border border-[#D6EBE1] shadow-kawan-rest overflow-hidden">
          <div className="p-5 border-b border-[#D6EBE1] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h2 className="text-base font-bold text-[#12352B]">
                Riwayat Pengajuan Usulan Koreksi Data
              </h2>
              <p className="text-xs text-[#5B7A70]">
                Daftar pengajuan koreksi yang diajukan oleh nakes dan koordinator posyandu
              </p>
            </div>
            <span className="font-mono text-xs text-[#17503C] bg-[#E8F7F0] px-3 py-1 rounded-full border border-[#D6EBE1]">
              Total {usulanList.length} Pengajuan
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-[#F7FCFA] border-b border-[#D6EBE1] text-[#5B7A70] font-semibold">
                  <th className="py-3 px-4">ID Usulan</th>
                  <th className="py-3 px-4">Pengusul & Kontak</th>
                  <th className="py-3 px-4">Posyandu & Desa</th>
                  <th className="py-3 px-4">Kategori & Keterangan</th>
                  <th className="py-3 px-4">Tanggal</th>
                  <th className="py-3 px-4">Status & Catatan</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#D6EBE1]">
                {usulanList.map((u) => (
                  <tr key={u.id} className="hover:bg-[#F7FCFA]/70 transition-colors">
                    <td className="py-3.5 px-4 font-mono font-bold text-[#17503C]">
                      {u.id}
                    </td>
                    <td className="py-3.5 px-4">
                      <div className="font-bold text-[#12352B]">{u.namaPengusul}</div>
                      <div className="text-[11px] text-[#5B7A70]">{u.peran}</div>
                      <div className="font-mono text-[11px] text-[#2F9E73]">{u.telepon}</div>
                    </td>
                    <td className="py-3.5 px-4">
                      <div className="font-bold text-[#12352B]">{u.posyanduNama}</div>
                      <div className="text-[11px] text-[#5B7A70]">Desa {u.desa}</div>
                      <span className="font-mono text-[10px] bg-[#F7FCFA] px-1.5 py-0.5 rounded border border-[#D6EBE1]">
                        {u.posyanduId}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 max-w-xs">
                      <div className="font-semibold text-[#17503C] mb-0.5">
                        {u.kategori}
                      </div>
                      <p className="text-[11px] text-[#5B7A70] line-clamp-2">
                        {u.deskripsi}
                      </p>
                    </td>
                    <td className="py-3.5 px-4 font-mono text-[11px] text-[#5B7A70] whitespace-nowrap">
                      {u.tanggalDiajukan}
                    </td>
                    <td className="py-3.5 px-4 whitespace-nowrap">
                      {u.status === 'Disetujui & Diterapkan' ? (
                        <div>
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-[#DCFCE7] text-[#166534] border border-[#BBF7D0]">
                            <CheckCircle2 className="w-3 h-3 text-[#166534]" />
                            Disetujui
                          </span>
                          {u.catatanAdmin && (
                            <div className="text-[10px] text-[#5B7A70] mt-1 max-w-[200px] truncate" title={u.catatanAdmin}>
                              {u.catatanAdmin}
                            </div>
                          )}
                        </div>
                      ) : (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-[#FEF3C7] text-[#92400E] border border-[#FDE68A]">
                          <Clock className="w-3 h-3 text-[#92400E]" />
                          Menunggu Verifikasi
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};
