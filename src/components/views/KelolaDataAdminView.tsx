import React, { useState } from 'react';
import {
  Database,
  Users,
  CheckCircle2,
  XCircle,
  Clock,
  Search,
  Filter,
  PlusCircle,
  FileSpreadsheet,
  Edit2,
  Trash2,
  Download,
  ShieldCheck,
  Key,
  ExternalLink,
  ChevronRight,
  AlertTriangle,
  Save,
} from 'lucide-react';
import {
  POSYANDU_DATA,
  DAFTAR_DESA,
  MOCK_AKUN_LIST,
  USULAN_LIST_INIT,
  PosyanduItem,
  MasterAkunItem,
  UsulanKoreksiItem,
} from '../../data/posyanduData';

export const KelolaDataAdminView: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'master' | 'akun' | 'validasi'>('master');

  // Master Data State
  const [posyanduList, setPosyanduList] = useState<PosyanduItem[]>(POSYANDU_DATA);
  const [masterSearch, setMasterSearch] = useState('');
  const [masterDesaFilter, setMasterDesaFilter] = useState('Semua');
  const [editingPosyandu, setEditingPosyandu] = useState<PosyanduItem | null>(null);

  // User Accounts State
  const [akunList, setAkunList] = useState<MasterAkunItem[]>(MOCK_AKUN_LIST);
  const [showAddAkunModal, setShowAddAkunModal] = useState(false);
  const [newAkunNama, setNewAkunNama] = useState('');
  const [newAkunEmail, setNewAkunEmail] = useState('');
  const [newAkunRole, setNewAkunRole] = useState<MasterAkunItem['role']>('Bidan Desa');
  const [newAkunDesa, setNewAkunDesa] = useState('Kepanjen');

  // Validasi Usulan State
  const [usulanList, setUsulanList] = useState<UsulanKoreksiItem[]>(USULAN_LIST_INIT);
  const [notification, setNotification] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 3000);
  };

  // Filtered Master Posyandu
  const filteredMaster = posyanduList.filter((p) => {
    const matchSearch =
      p.nama.toLowerCase().includes(masterSearch.toLowerCase()) ||
      p.id.toLowerCase().includes(masterSearch.toLowerCase()) ||
      p.desa.toLowerCase().includes(masterSearch.toLowerCase());
    const matchDesa = masterDesaFilter === 'Semua' || p.desa === masterDesaFilter;
    return matchSearch && matchDesa;
  });

  // Handle Approve Usulan
  const handleApproveUsulan = (id: string) => {
    setUsulanList((prev) =>
      prev.map((u) =>
        u.id === id
          ? {
              ...u,
              status: 'Disetujui & Diterapkan',
              catatanAdmin: 'Diverifikasi dan diterapkan otomatis ke sistem oleh Admin Promkes.',
            }
          : u
      )
    );
    showToast(`Usulan ${id} berhasil disetujui & diterapkan ke master.`);
  };

  // Handle Reject Usulan
  const handleRejectUsulan = (id: string) => {
    setUsulanList((prev) =>
      prev.map((u) =>
        u.id === id
          ? {
              ...u,
              status: 'Ditolak',
              catatanAdmin: 'Ditolak: Data lampiran tidak sesuai dengan ketentuan ILP.',
            }
          : u
      )
    );
    showToast(`Usulan ${id} ditolak.`);
  };

  // Handle Add Akun
  const handleAddAkunSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAkunNama || !newAkunEmail) return;

    const newAkun: MasterAkunItem = {
      id: `USR-${String(akunList.length + 1).padStart(3, '0')}`,
      nama: newAkunNama,
      email: newAkunEmail,
      role: newAkunRole,
      desaTugas: `Desa ${newAkunDesa}`,
      posyanduBinaan: [`Posyandu Wilayah ${newAkunDesa}`],
      status: 'Aktif',
      terakhirLogin: 'Baru dibuat',
    };

    setAkunList([...akunList, newAkun]);
    setShowAddAkunModal(false);
    setNewAkunNama('');
    setNewAkunEmail('');
    showToast(`Akun tenaga kesehatan ${newAkun.nama} berhasil didaftarkan!`);
  };

  // Save Edit Posyandu
  const handleSavePosyandu = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingPosyandu) return;

    setPosyanduList((prev) =>
      prev.map((p) => (p.id === editingPosyandu.id ? editingPosyandu : p))
    );
    setEditingPosyandu(null);
    showToast(`Data Posyandu ${editingPosyandu.id} berhasil diperbarui.`);
  };

  return (
    <div className="space-y-6">
      {/* Toast Notification */}
      {notification && (
        <div className="bg-[#17503C] text-white p-4 rounded-xl flex items-center justify-between shadow-kawan-rest text-xs font-semibold animate-fadeIn">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-[#71daab]" />
            <span>{notification}</span>
          </div>
          <button
            onClick={() => setNotification(null)}
            className="text-white/60 hover:text-white"
          >
            ✕
          </button>
        </div>
      )}

      {/* Admin Panel Header */}
      <div className="bg-white rounded-2xl border border-[#D6EBE1] shadow-kawan-rest p-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full text-xs font-semibold bg-[#DCFCE7] text-[#166534] border border-[#BBF7D0] mb-2">
              <ShieldCheck className="w-3.5 h-3.5 text-[#166534]" />
              Hak Akses Penuh: Admin Promkes (Luluk Lady Laili, SKM)
            </div>
            <h1 className="text-2xl font-bold text-[#12352B] tracking-tight">
              Konsol Kelola Data & Administrasi Master SI-KAWAN
            </h1>
            <p className="text-sm text-[#5B7A70] mt-1 max-w-3xl">
              Manajemen registri 108 posyandu, pengelolaan akun RBAC tenaga kesehatan,
              dan validasi permohonan koreksi tautan Google Sheets secara terpusat.
            </p>
          </div>

          {/* Tab Navigation */}
          <div className="flex flex-wrap items-center gap-2 bg-[#F7FCFA] p-1.5 rounded-xl border border-[#D6EBE1]">
            <button
              onClick={() => setActiveTab('master')}
              className={`px-3.5 py-2 rounded-[8px] text-xs font-bold transition-all flex items-center gap-1.5 ${
                activeTab === 'master'
                  ? 'bg-[#2F9E73] text-white shadow-sm'
                  : 'text-[#17503C] hover:bg-[#E8F7F0]'
              }`}
            >
              <Database className="w-3.5 h-3.5" />
              Master 108 Posyandu
            </button>
            <button
              onClick={() => setActiveTab('akun')}
              className={`px-3.5 py-2 rounded-[8px] text-xs font-bold transition-all flex items-center gap-1.5 ${
                activeTab === 'akun'
                  ? 'bg-[#2F9E73] text-white shadow-sm'
                  : 'text-[#17503C] hover:bg-[#E8F7F0]'
              }`}
            >
              <Users className="w-3.5 h-3.5" />
              Kelola Akun Nakes ({akunList.length})
            </button>
            <button
              onClick={() => setActiveTab('validasi')}
              className={`px-3.5 py-2 rounded-[8px] text-xs font-bold transition-all flex items-center gap-1.5 ${
                activeTab === 'validasi'
                  ? 'bg-[#2F9E73] text-white shadow-sm'
                  : 'text-[#17503C] hover:bg-[#E8F7F0]'
              }`}
            >
              <Clock className="w-3.5 h-3.5" />
              Validasi Koreksi
              <span className="w-4 h-4 rounded-full bg-amber-400 text-[#92400E] text-[10px] font-bold flex items-center justify-center">
                {usulanList.filter((u) => u.status === 'Menunggu Verifikasi').length}
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* TAB 1: MASTER DATA 108 POSYANDU */}
      {activeTab === 'master' && (
        <div className="space-y-4">
          {/* Controls Bar */}
          <div className="bg-white rounded-2xl border border-[#D6EBE1] shadow-kawan-rest p-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-3 flex-1">
              {/* Search */}
              <div className="relative min-w-[240px] flex-1 max-w-md">
                <Search className="w-4 h-4 absolute left-3.5 top-3 text-[#5B7A70]" />
                <input
                  type="text"
                  placeholder="Cari ID, nama posyandu, atau desa..."
                  value={masterSearch}
                  onChange={(e) => setMasterSearch(e.target.value)}
                  className="w-full bg-[#F7FCFA] border border-[#D6EBE1] focus:border-[#2F9E73] rounded-[10px] pl-10 pr-4 py-2 text-xs text-[#12352B] focus:outline-none"
                />
              </div>

              {/* Desa Filter */}
              <div className="relative min-w-[180px]">
                <select
                  value={masterDesaFilter}
                  onChange={(e) => setMasterDesaFilter(e.target.value)}
                  className="w-full bg-[#F7FCFA] border border-[#D6EBE1] focus:border-[#2F9E73] rounded-[10px] px-3 py-2 text-xs text-[#12352B] focus:outline-none appearance-none"
                >
                  <option value="Semua">Semua 18 Desa/Kelurahan</option>
                  {DAFTAR_DESA.map((d) => (
                    <option key={d} value={d}>
                      {d}
                    </option>
                  ))}
                </select>
                <div className="absolute right-3 top-2.5 pointer-events-none text-xs text-[#5B7A70]">
                  ▼
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="font-mono text-xs text-[#5B7A70] px-2 py-1 bg-[#F7FCFA] rounded border border-[#D6EBE1]">
                {filteredMaster.length} dari {posyanduList.length} Posyandu
              </span>
            </div>
          </div>

          {/* Master Table */}
          <div className="bg-white rounded-2xl border border-[#D6EBE1] shadow-kawan-rest overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-[#F7FCFA] border-b border-[#D6EBE1] text-[#5B7A70] font-semibold">
                    <th className="py-3 px-4">Kode</th>
                    <th className="py-3 px-4">Nama Posyandu & Alamat</th>
                    <th className="py-3 px-4">Desa / Kel.</th>
                    <th className="py-3 px-4">Strata</th>
                    <th className="py-3 px-4">Bidan Pembina</th>
                    <th className="py-3 px-4">Status 4 Sheet</th>
                    <th className="py-3 px-4 text-center">Aksi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#D6EBE1]">
                  {filteredMaster.slice(0, 25).map((p) => (
                    <tr key={p.id} className="hover:bg-[#F7FCFA]/70 transition-colors">
                      <td className="py-3 px-4 font-mono font-bold text-[#17503C]">
                        {p.id}
                      </td>
                      <td className="py-3 px-4">
                        <div className="font-bold text-[#12352B]">{p.nama}</div>
                        <div className="text-[11px] text-[#5B7A70]">{p.alamat}</div>
                      </td>
                      <td className="py-3 px-4 font-semibold text-[#12352B]">
                        {p.desa}
                      </td>
                      <td className="py-3 px-4">
                        <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold bg-[#DCFCE7] text-[#166534] border border-[#BBF7D0]">
                          {p.strata}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <div className="font-medium text-[#12352B]">{p.bidan.nama}</div>
                        <div className="font-mono text-[10px] text-[#5B7A70]">
                          {p.bidan.telepon}
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-1">
                          <span
                            className="w-2 h-2 rounded-full bg-[#166534]"
                            title="Formulir 01 Aktif"
                          />
                          <span
                            className="w-2 h-2 rounded-full bg-[#166534]"
                            title="Formulir 02 Aktif"
                          />
                          <span
                            className="w-2 h-2 rounded-full bg-[#166534]"
                            title="Formulir 03 Aktif"
                          />
                          <span
                            className="w-2 h-2 rounded-full bg-[#166534]"
                            title="Formulir 04 Aktif"
                          />
                          <span className="text-[11px] font-mono text-[#166534] ml-1">4/4</span>
                        </div>
                      </td>
                      <td className="py-3 px-4 text-center">
                        <button
                          onClick={() => setEditingPosyandu(p)}
                          className="inline-flex items-center gap-1 px-2.5 py-1 rounded-[6px] bg-[#E8F7F0] hover:bg-[#d0f6e7] text-[#17503C] text-[11px] font-semibold transition-colors"
                        >
                          <Edit2 className="w-3 h-3 text-[#2F9E73]" />
                          Edit
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {filteredMaster.length > 25 && (
              <div className="p-3 bg-[#F7FCFA] border-t border-[#D6EBE1] text-center text-xs text-[#5B7A70]">
                Menampilkan 25 dari total {filteredMaster.length} Posyandu (Gunakan pencarian untuk data spesifik)
              </div>
            )}
          </div>
        </div>
      )}

      {/* TAB 2: KELOLA AKUN NAKES & RBAC */}
      {activeTab === 'akun' && (
        <div className="space-y-4">
          <div className="bg-white rounded-2xl border border-[#D6EBE1] shadow-kawan-rest p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-base font-bold text-[#12352B]">
                Master Akun Tenaga Kesehatan & Koordinator
              </h2>
              <p className="text-xs text-[#5B7A70]">
                Daftar akun berwenang untuk mengakses, mengedit, dan memvalidasi formulir Google Sheets
              </p>
            </div>
            <button
              onClick={() => setShowAddAkunModal(true)}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-[10px] bg-[#2F9E73] hover:bg-[#268762] text-white text-xs font-bold shadow-sm transition-all"
            >
              <PlusCircle className="w-4 h-4" />
              Tambah Akun Petugas
            </button>
          </div>

          <div className="bg-white rounded-2xl border border-[#D6EBE1] shadow-kawan-rest overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-[#F7FCFA] border-b border-[#D6EBE1] text-[#5B7A70] font-semibold">
                    <th className="py-3 px-4">ID Akun</th>
                    <th className="py-3 px-4">Nama Petugas</th>
                    <th className="py-3 px-4">Email Dinas Google</th>
                    <th className="py-3 px-4">Peran (RBAC)</th>
                    <th className="py-3 px-4">Wilayah Tugas</th>
                    <th className="py-3 px-4">Status & Sesi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#D6EBE1]">
                  {akunList.map((a) => (
                    <tr key={a.id} className="hover:bg-[#F7FCFA]/70 transition-colors">
                      <td className="py-3.5 px-4 font-mono font-bold text-[#17503C]">
                        {a.id}
                      </td>
                      <td className="py-3.5 px-4">
                        <div className="font-bold text-[#12352B]">{a.nama}</div>
                        <div className="text-[11px] text-[#5B7A70]">
                          {a.posyanduBinaan.join(', ')}
                        </div>
                      </td>
                      <td className="py-3.5 px-4 font-mono text-[#17503C]">
                        {a.email}
                      </td>
                      <td className="py-3.5 px-4">
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-semibold ${
                            a.role === 'Admin Promkes'
                              ? 'bg-[#E8F7F0] text-[#17503C] border border-[#D6EBE1]'
                              : a.role === 'Bidan Desa'
                              ? 'bg-[#DCFCE7] text-[#166534] border border-[#BBF7D0]'
                              : 'bg-[#F1F5F9] text-[#475569] border border-[#CBD5E1]'
                          }`}
                        >
                          {a.role}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 font-medium text-[#12352B]">
                        {a.desaTugas}
                      </td>
                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-1.5 text-[#166534] font-semibold text-[11px]">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#166534]" />
                          {a.status}
                        </div>
                        <div className="text-[10px] text-[#5B7A70] mt-0.5">
                          {a.terakhirLogin}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: PORTAL VALIDASI PUSKESMAS PROMKES */}
      {activeTab === 'validasi' && (
        <div className="space-y-4">
          <div className="bg-white rounded-2xl border border-[#D6EBE1] shadow-kawan-rest p-5">
            <h2 className="text-base font-bold text-[#12352B]">
              Portal Verifikasi Permohonan Perubahan Data Mandiri
            </h2>
            <p className="text-xs text-[#5B7A70]">
              Tinjau usulan dari nakes dan kader lapangan sebelum diterapkan secara resmi ke master data SI-KAWAN
            </p>
          </div>

          <div className="space-y-4">
            {usulanList.map((u) => (
              <div
                key={u.id}
                className="bg-white rounded-2xl border border-[#D6EBE1] shadow-kawan-rest p-5 flex flex-col md:flex-row md:items-center justify-between gap-5"
              >
                <div className="flex-1 space-y-2">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-mono text-xs font-bold text-[#17503C] bg-[#F7FCFA] px-2 py-0.5 rounded border border-[#D6EBE1]">
                      {u.id}
                    </span>
                    <span className="text-xs font-semibold px-2 py-0.5 rounded bg-[#E8F7F0] text-[#17503C]">
                      {u.kategori}
                    </span>
                    <span className="text-xs text-[#5B7A70]">{u.tanggalDiajukan}</span>
                  </div>

                  <div className="text-sm font-bold text-[#12352B]">
                    Posyandu {u.posyanduNama} ({u.posyanduId}) • Desa {u.desa}
                  </div>

                  <p className="text-xs text-[#5B7A70] leading-relaxed bg-[#F7FCFA] p-3 rounded-xl border border-[#D6EBE1]">
                    <span className="font-semibold text-[#12352B]">Rincian:</span> {u.deskripsi}
                  </p>

                  <div className="text-xs text-[#5B7A70]">
                    Diajukan oleh:{' '}
                    <span className="font-semibold text-[#12352B]">{u.namaPengusul}</span> (
                    {u.peran}) • Telp: <span className="font-mono">{u.telepon}</span>
                  </div>

                  {u.catatanAdmin && (
                    <div className="text-xs text-[#166534] bg-[#DCFCE7] px-3 py-1.5 rounded-lg border border-[#BBF7D0]">
                      <span className="font-bold">Catatan Promkes:</span> {u.catatanAdmin}
                    </div>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row md:flex-col gap-2 shrink-0">
                  {u.status === 'Menunggu Verifikasi' ? (
                    <>
                      <button
                        onClick={() => handleApproveUsulan(u.id)}
                        className="inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-[8px] bg-[#2F9E73] hover:bg-[#268762] text-white text-xs font-bold transition-all shadow-sm"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        Setujui & Terapkan
                      </button>
                      <button
                        onClick={() => handleRejectUsulan(u.id)}
                        className="inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-[8px] bg-white hover:bg-[#FEE2E2] text-[#991B1B] border border-[#FECACA] text-xs font-semibold transition-all"
                      >
                        <XCircle className="w-3.5 h-3.5" />
                        Tolak Usulan
                      </button>
                    </>
                  ) : (
                    <div className="text-right">
                      <span
                        className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-bold ${
                          u.status === 'Disetujui & Diterapkan'
                            ? 'bg-[#DCFCE7] text-[#166534] border border-[#BBF7D0]'
                            : 'bg-[#FEE2E2] text-[#991B1B] border border-[#FECACA]'
                        }`}
                      >
                        {u.status === 'Disetujui & Diterapkan' ? (
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#166534]" />
                        ) : (
                          <XCircle className="w-3.5 h-3.5 text-[#991B1B]" />
                        )}
                        {u.status}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Modal: Edit Master Posyandu */}
      {editingPosyandu && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-[#D6EBE1]">
            <div className="flex items-center justify-between pb-4 border-b border-[#D6EBE1] mb-4">
              <h3 className="font-bold text-base text-[#12352B]">
                Edit Data Posyandu [{editingPosyandu.id}]
              </h3>
              <button
                onClick={() => setEditingPosyandu(null)}
                className="text-[#5B7A70] hover:text-[#12352B]"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSavePosyandu} className="space-y-3.5 text-xs">
              <div>
                <label className="block font-semibold text-[#17503C] mb-1">
                  Nama Posyandu
                </label>
                <input
                  type="text"
                  required
                  value={editingPosyandu.nama}
                  onChange={(e) =>
                    setEditingPosyandu({ ...editingPosyandu, nama: e.target.value })
                  }
                  className="w-full bg-[#F7FCFA] border border-[#D6EBE1] focus:border-[#2F9E73] rounded-[8px] p-2.5 text-xs text-[#12352B] focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-semibold text-[#17503C] mb-1">
                  Alamat / Lokasi
                </label>
                <input
                  type="text"
                  required
                  value={editingPosyandu.alamat}
                  onChange={(e) =>
                    setEditingPosyandu({ ...editingPosyandu, alamat: e.target.value })
                  }
                  className="w-full bg-[#F7FCFA] border border-[#D6EBE1] focus:border-[#2F9E73] rounded-[8px] p-2.5 text-xs text-[#12352B] focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-[#17503C] mb-1">Strata</label>
                  <select
                    value={editingPosyandu.strata}
                    onChange={(e) =>
                      setEditingPosyandu({
                        ...editingPosyandu,
                        strata: e.target.value as PosyanduItem['strata'],
                      })
                    }
                    className="w-full bg-[#F7FCFA] border border-[#D6EBE1] focus:border-[#2F9E73] rounded-[8px] p-2.5 text-xs text-[#12352B] focus:outline-none"
                  >
                    <option value="Mandiri">Mandiri</option>
                    <option value="Purnama">Purnama</option>
                    <option value="Madya">Madya</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-[#17503C] mb-1">
                    Bidan Pembina
                  </label>
                  <input
                    type="text"
                    value={editingPosyandu.bidan.nama}
                    onChange={(e) =>
                      setEditingPosyandu({
                        ...editingPosyandu,
                        bidan: { ...editingPosyandu.bidan, nama: e.target.value },
                      })
                    }
                    className="w-full bg-[#F7FCFA] border border-[#D6EBE1] focus:border-[#2F9E73] rounded-[8px] p-2.5 text-xs text-[#12352B] focus:outline-none"
                  />
                </div>
              </div>

              <div className="pt-3 flex items-center justify-end gap-2 border-t border-[#D6EBE1]">
                <button
                  type="button"
                  onClick={() => setEditingPosyandu(null)}
                  className="px-3.5 py-2 rounded-[8px] bg-[#F7FCFA] border border-[#D6EBE1] text-[#5B7A70]"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-[8px] bg-[#2F9E73] hover:bg-[#268762] text-white font-bold flex items-center gap-1.5"
                >
                  <Save className="w-3.5 h-3.5" />
                  Simpan Perubahan
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal: Tambah Akun Nakes Baru */}
      {showAddAkunModal && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-[#D6EBE1]">
            <div className="flex items-center justify-between pb-4 border-b border-[#D6EBE1] mb-4">
              <h3 className="font-bold text-base text-[#12352B]">
                Tambah Akun Petugas Nakes Baru
              </h3>
              <button
                onClick={() => setShowAddAkunModal(false)}
                className="text-[#5B7A70] hover:text-[#12352B]"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleAddAkunSubmit} className="space-y-3.5 text-xs">
              <div>
                <label className="block font-semibold text-[#17503C] mb-1">
                  Nama Petugas & Gelar *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Contoh: Siti Rahmawati, A.Md.Keb."
                  value={newAkunNama}
                  onChange={(e) => setNewAkunNama(e.target.value)}
                  className="w-full bg-[#F7FCFA] border border-[#D6EBE1] focus:border-[#2F9E73] rounded-[8px] p-2.5 text-xs text-[#12352B] focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-semibold text-[#17503C] mb-1">
                  Email Akun Google Workspace *
                </label>
                <input
                  type="email"
                  required
                  placeholder="nama.petugas@posyandukepanjen.id"
                  value={newAkunEmail}
                  onChange={(e) => setNewAkunEmail(e.target.value)}
                  className="w-full bg-[#F7FCFA] border border-[#D6EBE1] focus:border-[#2F9E73] rounded-[8px] p-2.5 text-xs text-[#12352B] focus:outline-none font-mono"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-[#17503C] mb-1">Peran</label>
                  <select
                    value={newAkunRole}
                    onChange={(e) =>
                      setNewAkunRole(e.target.value as MasterAkunItem['role'])
                    }
                    className="w-full bg-[#F7FCFA] border border-[#D6EBE1] focus:border-[#2F9E73] rounded-[8px] p-2.5 text-xs text-[#12352B] focus:outline-none"
                  >
                    <option value="Bidan Desa">Bidan Desa</option>
                    <option value="Perawat Pembina">Perawat Pembina</option>
                    <option value="Koordinator Wilayah">Koordinator Wilayah</option>
                    <option value="Admin Promkes">Admin Promkes</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-[#17503C] mb-1">
                    Desa Tugas
                  </label>
                  <select
                    value={newAkunDesa}
                    onChange={(e) => setNewAkunDesa(e.target.value)}
                    className="w-full bg-[#F7FCFA] border border-[#D6EBE1] focus:border-[#2F9E73] rounded-[8px] p-2.5 text-xs text-[#12352B] focus:outline-none"
                  >
                    {DAFTAR_DESA.map((d) => (
                      <option key={d} value={d}>
                        {d}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="pt-3 flex items-center justify-end gap-2 border-t border-[#D6EBE1]">
                <button
                  type="button"
                  onClick={() => setShowAddAkunModal(false)}
                  className="px-3.5 py-2 rounded-[8px] bg-[#F7FCFA] border border-[#D6EBE1] text-[#5B7A70]"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-[8px] bg-[#2F9E73] hover:bg-[#268762] text-white font-bold"
                >
                  Daftarkan Akun
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
