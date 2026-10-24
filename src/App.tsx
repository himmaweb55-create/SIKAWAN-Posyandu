import React, { useState } from 'react';
import { Sidebar, ActivePage, UserRole } from './components/layout/Sidebar';
import { TopHeader } from './components/layout/TopHeader';
import { Footer } from './components/layout/Footer';

// Operational Views
import { BerandaPublikView } from './components/views/BerandaPublikView';
import { CariPosyanduView } from './components/views/CariPosyanduView';
import { JadwalKegiatanView } from './components/views/JadwalKegiatanView';
import { PustakaMateriView } from './components/views/PustakaMateriView';
import { PengumumanView } from './components/views/PengumumanView';
import { KontakPetugasView } from './components/views/KontakPetugasView';
import { TentangView } from './components/views/TentangView';
import { BerandaPenggunaView } from './components/views/BerandaPenggunaView';
import { GatewayFormulirView } from './components/views/GatewayFormulirView';
import { UsulanKoreksiView } from './components/views/UsulanKoreksiView';
import { KelolaDataAdminView } from './components/views/KelolaDataAdminView';

export default function App() {
  const [activePage, setActivePage] = useState<ActivePage>('beranda');
  const [currentRole, setCurrentRole] = useState<UserRole>('publik');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGatewayPosyandu, setSelectedGatewayPosyandu] = useState<string>('TGL-001');

  // Handle universal search bar: typing navigates to cari-posyandu view
  const handleUniversalSearch = (query: string) => {
    setSearchQuery(query);
    if (activePage !== 'cari-posyandu') {
      setActivePage('cari-posyandu');
    }
  };

  const handleRoleChange = (newRole: UserRole) => {
    setCurrentRole(newRole);
    if (newRole === 'bidan-desa') {
      setActivePage('beranda-pengguna');
    } else if (newRole === 'admin-promkes') {
      setActivePage('kelola-admin');
    } else {
      setActivePage('beranda');
    }
  };

  const handleOpenGatewayForPosyandu = (posyanduId: string) => {
    setSelectedGatewayPosyandu(posyanduId);
    setActivePage('gateway-formulir');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#E8F7F0] via-[#F1FBF6] to-[#F7FCFA] font-sans text-[#12352B] flex flex-col antialiased selection:bg-[#2F9E73] selection:text-white">
      <div className="flex flex-1 w-full">
        {/* Fixed 280px Institutional Sidebar */}
        <div className="hidden lg:block shrink-0">
          <Sidebar
            activePage={activePage}
            onNavigate={(p) => setActivePage(p)}
            currentRole={currentRole}
            onChangeRole={handleRoleChange}
          />
        </div>

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col min-w-0">
          {/* Top Universal Header */}
          <TopHeader
            onSearch={handleUniversalSearch}
            searchQuery={searchQuery}
            currentRole={currentRole}
            onChangeRole={handleRoleChange}
          />

          {/* Mobile Bottom / Secondary Navigation Bar for small screens */}
          <div className="lg:hidden bg-[#17503C] text-white px-4 py-2 flex items-center justify-between text-xs overflow-x-auto gap-2 border-b border-[#13362c]">
            <button
              onClick={() => setActivePage('beranda')}
              className={`px-2.5 py-1 rounded-md shrink-0 ${
                activePage === 'beranda' ? 'bg-[#2F9E73] font-bold' : 'text-[#d3f9ea]'
              }`}
            >
              Beranda
            </button>
            <button
              onClick={() => setActivePage('cari-posyandu')}
              className={`px-2.5 py-1 rounded-md shrink-0 ${
                activePage === 'cari-posyandu' ? 'bg-[#2F9E73] font-bold' : 'text-[#d3f9ea]'
              }`}
            >
              108 Posyandu
            </button>
            <button
              onClick={() => setActivePage('gateway-formulir')}
              className={`px-2.5 py-1 rounded-md shrink-0 ${
                activePage === 'gateway-formulir' ? 'bg-[#2F9E73] font-bold' : 'text-[#d3f9ea]'
              }`}
            >
              Gateway Sheets
            </button>
            <button
              onClick={() => setActivePage('jadwal')}
              className={`px-2.5 py-1 rounded-md shrink-0 ${
                activePage === 'jadwal' ? 'bg-[#2F9E73] font-bold' : 'text-[#d3f9ea]'
              }`}
            >
              Jadwal
            </button>
            <button
              onClick={() => setActivePage('pustaka-materi')}
              className={`px-2.5 py-1 rounded-md shrink-0 ${
                activePage === 'pustaka-materi' ? 'bg-[#2F9E73] font-bold' : 'text-[#d3f9ea]'
              }`}
            >
              Materi
            </button>
            <button
              onClick={() => setActivePage('kontak-petugas')}
              className={`px-2.5 py-1 rounded-md shrink-0 ${
                activePage === 'kontak-petugas' ? 'bg-[#2F9E73] font-bold' : 'text-[#d3f9ea]'
              }`}
            >
              Kontak
            </button>
          </div>

          {/* View Container */}
          <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
            {activePage === 'beranda' && (
              <BerandaPublikView
                onNavigate={(page) => setActivePage(page as ActivePage)}
                onSearchFocus={() => {
                  setActivePage('cari-posyandu');
                }}
              />
            )}

            {activePage === 'cari-posyandu' && (
              <CariPosyanduView
                initialSearchQuery={searchQuery}
                onOpenGateway={handleOpenGatewayForPosyandu}
              />
            )}

            {activePage === 'gateway-formulir' && (
              <GatewayFormulirView initialPosyanduId={selectedGatewayPosyandu} />
            )}

            {activePage === 'jadwal' && <JadwalKegiatanView />}

            {activePage === 'pustaka-materi' && <PustakaMateriView />}

            {activePage === 'pengumuman' && <PengumumanView />}

            {activePage === 'kontak-petugas' && <KontakPetugasView />}

            {activePage === 'tentang' && <TentangView />}

            {activePage === 'beranda-pengguna' && (
              <BerandaPenggunaView
                onNavigate={(page) => setActivePage(page as ActivePage)}
                onOpenGateway={handleOpenGatewayForPosyandu}
              />
            )}

            {activePage === 'usulan-koreksi' && <UsulanKoreksiView />}

            {activePage === 'kelola-admin' && <KelolaDataAdminView />}
          </main>

          {/* Institutional Footer */}
          <Footer />
        </div>
      </div>
    </div>
  );
}
