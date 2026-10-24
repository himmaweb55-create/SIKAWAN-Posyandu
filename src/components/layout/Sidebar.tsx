import React from 'react';
import {
  Home,
  Search,
  FileSpreadsheet,
  Calendar,
  BookOpen,
  Megaphone,
  Users,
  Info,
  FileEdit,
  ShieldCheck,
  Building2,
  UserCheck,
  CheckCircle2,
  ChevronRight,
  ExternalLink,
} from 'lucide-react';

export type ActivePage =
  | 'beranda'
  | 'cari-posyandu'
  | 'gateway-formulir'
  | 'jadwal'
  | 'pustaka-materi'
  | 'pengumuman'
  | 'kontak-petugas'
  | 'tentang'
  | 'beranda-pengguna'
  | 'usulan-koreksi'
  | 'kelola-admin';

export type UserRole = 'publik' | 'bidan-desa' | 'admin-promkes';

interface SidebarProps {
  activePage: ActivePage;
  onNavigate: (page: ActivePage) => void;
  currentRole: UserRole;
  onChangeRole: (role: UserRole) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activePage,
  onNavigate,
  currentRole,
  onChangeRole,
}) => {
  return (
    <aside className="w-[280px] shrink-0 bg-[#17503C] text-white flex flex-col justify-between min-h-screen border-r border-[#13362c]">
      <div className="flex flex-col">
        {/* Brand Header */}
        <div className="p-5 border-b border-[#1f5f48]">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-lg bg-[#2F9E73] flex items-center justify-center text-white font-bold text-lg shadow-sm">
              <Building2 className="h-6 w-6" />
            </div>
            <div>
              <h1 className="font-bold text-sm tracking-tight text-white leading-tight">
                SI-KAWAN
              </h1>
              <p className="text-[11px] text-[#9ad3b8] font-medium leading-tight">
                UPTD PUSKESMAS KEPANJEN
              </p>
            </div>
          </div>

          {/* Wilayah Badge */}
          <div className="mt-3.5 rounded-lg bg-[#123e2e] p-2.5 flex items-center justify-between border border-[#236850]">
            <div>
              <span className="text-[10px] uppercase tracking-wider text-[#9ad3b8] font-semibold block">
                Kecamatan Kepanjen
              </span>
              <span className="text-xs font-bold text-white font-mono">
                108 Posyandu Aktif
              </span>
            </div>
            <span className="h-2 w-2 rounded-full bg-[#71daab] animate-pulse"></span>
          </div>
        </div>

        {/* Navigation Menus */}
        <nav className="p-3 space-y-6 text-xs">
          {/* Group 1: Beranda Publik */}
          <div>
            <span className="px-3 text-[10px] font-bold uppercase tracking-wider text-[#71daab]">
              Beranda Publik
            </span>
            <ul className="mt-1.5 space-y-0.5">
              <li>
                <button
                  onClick={() => onNavigate('beranda')}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg font-medium transition-colors text-left cursor-pointer ${
                    activePage === 'beranda'
                      ? 'bg-[#2F9E73] text-white font-semibold shadow-xs'
                      : 'text-[#d3f9ea] hover:bg-[#1f5f48] hover:text-white'
                  }`}
                >
                  <Home className="h-4 w-4 shrink-0" />
                  <span>Beranda</span>
                </button>
              </li>

              <li>
                <button
                  onClick={() => onNavigate('cari-posyandu')}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg font-medium transition-colors text-left cursor-pointer ${
                    activePage === 'cari-posyandu'
                      ? 'bg-[#2F9E73] text-white font-semibold shadow-xs'
                      : 'text-[#d3f9ea] hover:bg-[#1f5f48] hover:text-white'
                  }`}
                >
                  <Search className="h-4 w-4 shrink-0" />
                  <span>Cari Posyandu</span>
                </button>
              </li>

              <li>
                <button
                  onClick={() => onNavigate('gateway-formulir')}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg font-medium transition-colors text-left cursor-pointer ${
                    activePage === 'gateway-formulir'
                      ? 'bg-[#2F9E73] text-white font-semibold shadow-xs'
                      : 'text-[#d3f9ea] hover:bg-[#1f5f48] hover:text-white'
                  }`}
                >
                  <FileSpreadsheet className="h-4 w-4 shrink-0" />
                  <span>Gateway Formulir</span>
                </button>
              </li>

              <li>
                <button
                  onClick={() => onNavigate('jadwal')}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg font-medium transition-colors text-left cursor-pointer ${
                    activePage === 'jadwal'
                      ? 'bg-[#2F9E73] text-white font-semibold shadow-xs'
                      : 'text-[#d3f9ea] hover:bg-[#1f5f48] hover:text-white'
                  }`}
                >
                  <Calendar className="h-4 w-4 shrink-0" />
                  <span>Jadwal Kegiatan</span>
                </button>
              </li>

              <li>
                <button
                  onClick={() => onNavigate('pustaka-materi')}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg font-medium transition-colors text-left cursor-pointer ${
                    activePage === 'pustaka-materi'
                      ? 'bg-[#2F9E73] text-white font-semibold shadow-xs'
                      : 'text-[#d3f9ea] hover:bg-[#1f5f48] hover:text-white'
                  }`}
                >
                  <BookOpen className="h-4 w-4 shrink-0" />
                  <span>Pustaka Materi Kader</span>
                </button>
              </li>

              <li>
                <button
                  onClick={() => onNavigate('pengumuman')}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg font-medium transition-colors text-left cursor-pointer ${
                    activePage === 'pengumuman'
                      ? 'bg-[#2F9E73] text-white font-semibold shadow-xs'
                      : 'text-[#d3f9ea] hover:bg-[#1f5f48] hover:text-white'
                  }`}
                >
                  <Megaphone className="h-4 w-4 shrink-0" />
                  <span>Pengumuman</span>
                </button>
              </li>

              <li>
                <button
                  onClick={() => onNavigate('kontak-petugas')}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg font-medium transition-colors text-left cursor-pointer ${
                    activePage === 'kontak-petugas'
                      ? 'bg-[#2F9E73] text-white font-semibold shadow-xs'
                      : 'text-[#d3f9ea] hover:bg-[#1f5f48] hover:text-white'
                  }`}
                >
                  <Users className="h-4 w-4 shrink-0" />
                  <span>Kontak Petugas</span>
                </button>
              </li>

              <li>
                <button
                  onClick={() => onNavigate('tentang')}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg font-medium transition-colors text-left cursor-pointer ${
                    activePage === 'tentang'
                      ? 'bg-[#2F9E73] text-white font-semibold shadow-xs'
                      : 'text-[#d3f9ea] hover:bg-[#1f5f48] hover:text-white'
                  }`}
                >
                  <Info className="h-4 w-4 shrink-0" />
                  <span>Tentang SI-KAWAN</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Group 2: Manajemen Portal */}
          <div>
            <span className="px-3 text-[10px] font-bold uppercase tracking-wider text-[#71daab]">
              Manajemen Portal
            </span>
            <ul className="mt-1.5 space-y-0.5">
              {currentRole === 'bidan-desa' && (
                <li>
                  <button
                    onClick={() => onNavigate('beranda-pengguna')}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg font-medium transition-colors text-left cursor-pointer ${
                      activePage === 'beranda-pengguna'
                        ? 'bg-[#2F9E73] text-white font-semibold shadow-xs'
                        : 'text-[#d3f9ea] hover:bg-[#1f5f48] hover:text-white'
                    }`}
                  >
                    <UserCheck className="h-4 w-4 shrink-0" />
                    <span>Dashboard Bidan Desa</span>
                  </button>
                </li>
              )}

              <li>
                <button
                  onClick={() => onNavigate('usulan-koreksi')}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg font-medium transition-colors text-left cursor-pointer ${
                    activePage === 'usulan-koreksi'
                      ? 'bg-[#2F9E73] text-white font-semibold shadow-xs'
                      : 'text-[#d3f9ea] hover:bg-[#1f5f48] hover:text-white'
                  }`}
                >
                  <FileEdit className="h-4 w-4 shrink-0" />
                  <span>Usulan Koreksi</span>
                </button>
              </li>

              <li>
                <button
                  onClick={() => onNavigate('kelola-admin')}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg font-medium transition-colors text-left cursor-pointer ${
                    activePage === 'kelola-admin'
                      ? 'bg-[#2F9E73] text-white font-semibold shadow-xs'
                      : 'text-[#d3f9ea] hover:bg-[#1f5f48] hover:text-white'
                  }`}
                >
                  <ShieldCheck className="h-4 w-4 shrink-0" />
                  <span>Kelola Data & Admin</span>
                </button>
              </li>
            </ul>
          </div>
        </nav>
      </div>

      {/* Role Switcher & Bottom Identity Card */}
      <div className="p-3 border-t border-[#1f5f48] bg-[#12362c]">
        <div className="mb-2">
          <label className="text-[10px] text-[#9ad3b8] font-semibold uppercase tracking-wider block mb-1">
            Mode Akses Pengguna:
          </label>
          <div className="grid grid-cols-3 gap-1 p-0.5 rounded-lg bg-[#0e2a22]">
            <button
              onClick={() => onChangeRole('publik')}
              className={`py-1 text-[10px] rounded font-medium transition-colors cursor-pointer ${
                currentRole === 'publik'
                  ? 'bg-[#2F9E73] text-white font-bold'
                  : 'text-[#9ad3b8] hover:text-white'
              }`}
            >
              Publik
            </button>
            <button
              onClick={() => {
                onChangeRole('bidan-desa');
                onNavigate('beranda-pengguna');
              }}
              className={`py-1 text-[10px] rounded font-medium transition-colors cursor-pointer ${
                currentRole === 'bidan-desa'
                  ? 'bg-[#2F9E73] text-white font-bold'
                  : 'text-[#9ad3b8] hover:text-white'
              }`}
            >
              Bidan Desa
            </button>
            <button
              onClick={() => {
                onChangeRole('admin-promkes');
                onNavigate('kelola-admin');
              }}
              className={`py-1 text-[10px] rounded font-medium transition-colors cursor-pointer ${
                currentRole === 'admin-promkes'
                  ? 'bg-[#2F9E73] text-white font-bold'
                  : 'text-[#9ad3b8] hover:text-white'
              }`}
            >
              Admin
            </button>
          </div>
        </div>

        <div className="flex items-center gap-2.5 pt-1">
          <div className="h-8 w-8 rounded-full bg-[#2F9E73] text-white flex items-center justify-center font-bold text-xs">
            {currentRole === 'bidan-desa' ? 'SS' : currentRole === 'admin-promkes' ? 'LL' : 'KD'}
          </div>
          <div className="flex-1 min-w-0">
            <span className="text-xs font-semibold text-white block truncate leading-tight">
              {currentRole === 'bidan-desa'
                ? 'Siti Saudah, A.Md.Keb.'
                : currentRole === 'admin-promkes'
                ? 'Luluk Lady Laili, SKM'
                : 'Kader Posyandu'}
            </span>
            <span className="text-[10px] text-[#9ad3b8] block truncate">
              {currentRole === 'bidan-desa'
                ? 'Bidan Desa Tegalsari'
                : currentRole === 'admin-promkes'
                ? 'Admin Utama Promkes'
                : 'Puskesmas Kepanjen'}
            </span>
          </div>
        </div>
      </div>
    </aside>
  );
};
