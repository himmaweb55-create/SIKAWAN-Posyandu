import React from 'react';
import { Search, Cloud, MapPin, User, CheckCircle2 } from 'lucide-react';
import { UserRole } from './Sidebar';

interface TopHeaderProps {
  onSearch: (query: string) => void;
  searchQuery: string;
  currentRole: UserRole;
  onChangeRole: (role: UserRole) => void;
}

export const TopHeader: React.FC<TopHeaderProps> = ({
  onSearch,
  searchQuery,
  currentRole,
  onChangeRole,
}) => {
  return (
    <header className="sticky top-0 z-30 flex h-16 w-full items-center justify-between border-b border-[#D6EBE1] bg-white/95 px-6 backdrop-blur-md">
      {/* Universal Search Bar */}
      <div className="relative w-full max-w-md">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-[#5B7A70]" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => onSearch(e.target.value)}
          placeholder="Cari Posyandu (nama, desa/kelurahan, strata)..."
          className="w-full rounded-full border border-[#D6EBE1] bg-[#F7FCFA] pl-10 pr-4 py-2 text-xs text-[#12352B] placeholder:text-[#5B7A70] focus:border-[#2F9E73] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#2F9E73]/15 transition-all"
        />
      </div>

      {/* Badges & Identity */}
      <div className="flex items-center gap-3">
        {/* Wilayah Badge */}
        <div className="hidden sm:flex items-center gap-2 rounded-full border border-[#D6EBE1] bg-[#d6fced]/60 px-3 py-1.5 text-xs text-[#17503C] font-medium">
          <span className="h-2 w-2 rounded-full bg-[#2F9E73]"></span>
          <span>Wilayah: Kec. Kepanjen (108 Posyandu)</span>
        </div>

        {/* Sinkronisasi Badge */}
        <div className="hidden md:flex items-center gap-2 rounded-full border border-[#BBF7D0] bg-[#DCFCE7] px-3 py-1.5 text-xs font-semibold text-[#166534]">
          <Cloud className="h-3.5 w-3.5" />
          <span>Sinkronisasi Aktif</span>
        </div>

        {/* User Profile Button */}
        <button
          onClick={() => {
            const roles: UserRole[] = ['publik', 'bidan-desa', 'admin-promkes'];
            const nextIdx = (roles.indexOf(currentRole) + 1) % roles.length;
            onChangeRole(roles[nextIdx]);
          }}
          title="Klik untuk beralih peran pengguna"
          className="flex h-9 w-9 items-center justify-center rounded-full bg-[#17503C] text-white hover:bg-[#2F9E73] transition-colors shadow-2xs cursor-pointer"
        >
          <User className="h-4 w-4" />
        </button>
      </div>
    </header>
  );
};
