export interface PosyanduItem {
  id: string; // e.g. "KPN-001"
  nama: string; // e.g. "Anggrek 1 Kepanjen"
  desa: string; // e.g. "Kepanjen"
  alamat: string; // e.g. "Jl. Utara Stasiun RT.05 RW.05"
  strata: 'Mandiri' | 'Purnama' | 'Madya';
  statusTautan: 'Tautan tersedia' | 'Perlu diperiksa' | 'Lengkap' | 'Belum Ada';
  slotTersedia: number; // e.g. 2 of 4
  bidan: {
    nama: string;
    gelar: string;
    telepon: string;
  };
  perawat: {
    nama: string;
    gelar: string;
    telepon: string;
  };
  sheetLinks: {
    absen: string | null;
    hasilPelayanan: string | null;
    rekapKunjungan: string | null;
    hasilKunjungan: string | null;
  };
  linktreeUrl: string;
}

export interface DesaDistribusi {
  nama: string;
  jumlah: number;
}

export const DISTRIBUSI_DESA: DesaDistribusi[] = [
  { nama: 'Kepanjen', jumlah: 16 },
  { nama: 'Panggungrejo', jumlah: 8 },
  { nama: 'Cepokomulyo', jumlah: 7 },
  { nama: 'Ardirejo', jumlah: 7 },
  { nama: 'Talangagung', jumlah: 7 },
  { nama: 'Sukoraharjo', jumlah: 7 },
  { nama: 'Ngadilangkung', jumlah: 6 },
  { nama: 'Jatirejoyoso', jumlah: 6 },
  { nama: 'Mangunrejo', jumlah: 6 },
  { nama: 'Jenggolo', jumlah: 6 },
  { nama: 'Penarukan', jumlah: 5 },
  { nama: 'Dilem', jumlah: 5 },
  { nama: 'Curungrejo', jumlah: 5 },
  { nama: 'Mojosari', jumlah: 4 },
  { nama: 'Sengguruh', jumlah: 4 },
  { nama: 'Kedungpedaringan', jumlah: 3 },
  { nama: 'Tegalsari', jumlah: 3 },
  { nama: 'Kemiri', jumlah: 3 },
];

export const DAFTAR_DESA = DISTRIBUSI_DESA.map((d) => d.nama);

// Generate 108 realistic Posyandu matching the 18 villages exactly
function generatePosyanduData(): PosyanduItem[] {
  const result: PosyanduItem[] = [];
  let counter = 1;

  DISTRIBUSI_DESA.forEach((desaInfo) => {
    for (let i = 1; i <= desaInfo.jumlah; i++) {
      const code = `KPN-${String(counter).padStart(3, '0')}`;
      let name = '';
      let status: 'Tautan tersedia' | 'Perlu diperiksa' | 'Lengkap' | 'Belum Ada' = 'Tautan tersedia';
      let slot = 2;

      if (desaInfo.nama === 'Tegalsari') {
        const letters = ['A', 'B', 'C'];
        name = `Posyandu ${letters[i - 1]} Tegalsari`;
        slot = 2;
      } else if (desaInfo.nama === 'Kepanjen') {
        const flowers = ['Anggrek', 'Melati', 'Mawar', 'Cempaka'];
        const group = flowers[(i - 1) % 4];
        const num = Math.ceil(i / 4);
        name = `${group} ${num} Kepanjen`;
        if (i === 2 || i === 3) {
          status = 'Perlu diperiksa';
          slot = 2;
        } else if (i === 1 || i >= 4) {
          status = 'Tautan tersedia';
          slot = 2;
        }
      } else {
        const names = ['Kenanga', 'Bougenville', 'Flamboyan', 'Teratai', 'Dahlia', 'Kamboja', 'Asoka', 'Tulip'];
        const chosen = names[(i - 1) % names.length];
        name = `Posyandu ${chosen} ${i} ${desaInfo.nama}`;
        if (counter % 5 === 0) {
          status = 'Lengkap';
          slot = 4;
        } else if (counter % 7 === 0) {
          status = 'Perlu diperiksa';
          slot = 1;
        } else {
          status = 'Tautan tersedia';
          slot = 2;
        }
      }

      result.push({
        id: code,
        nama: name,
        desa: desaInfo.nama,
        alamat: `Jl. Melati RT.0${(i % 5) + 1} RW.0${(i % 4) + 1}, ${desaInfo.nama}`,
        strata: i % 2 === 0 ? 'Mandiri' : 'Purnama',
        statusTautan: status,
        slotTersedia: slot,
        bidan: {
          nama: desaInfo.nama === 'Tegalsari' ? 'Siti Saudah' : 'Bd. Rahayu',
          gelar: desaInfo.nama === 'Tegalsari' ? 'A.Md.Keb.' : 'S.Tr.Keb',
          telepon: '0812-3456-7890',
        },
        perawat: {
          nama: desaInfo.nama === 'Tegalsari' ? 'Tri Wahyuningtyas' : 'Ns. Didik P.',
          gelar: desaInfo.nama === 'Tegalsari' ? 'A.Md.Kep.' : 'S.Kep',
          telepon: '0813-9876-5432',
        },
        sheetLinks: {
          absen: `https://docs.google.com/spreadsheets/d/1kPn_Kepanjen_${counter}_Absen/edit`,
          hasilPelayanan: slot >= 2 ? `https://docs.google.com/spreadsheets/d/1kPn_Kepanjen_${counter}_Pelayanan/edit` : null,
          rekapKunjungan: slot >= 3 ? `https://docs.google.com/spreadsheets/d/1kPn_Kepanjen_${counter}_Rekap/edit` : null,
          hasilKunjungan: slot === 4 ? `https://docs.google.com/spreadsheets/d/1kPn_Kepanjen_${counter}_Kunjungan/edit` : null,
        },
        linktreeUrl: `https://linktree.com/posyandukepanjen_${desaInfo.nama.toLowerCase()}`,
      });

      counter++;
    }
  });

  return result;
}

export const POSYANDU_LIST: PosyanduItem[] = generatePosyanduData();
export const POSYANDU_DATA: PosyanduItem[] = POSYANDU_LIST;

export interface JadwalItem {
  id: string;
  kodePosyandu: string;
  namaPosyandu: string;
  desa: string;
  hariTanggal: string;
  tanggalIso: string;
  jam: string;
  lokasi: string;
  layanan: string[];
  petugas: {
    bidan: string;
    perawat: string;
  };
  status: 'Siap Pelaksanaan' | 'Terverifikasi' | 'Perlu Konfirmasi';
}

export const JADWAL_LIST: JadwalItem[] = [
  {
    id: 'JDW-001',
    kodePosyandu: 'KPN-TGL-001',
    namaPosyandu: 'Posyandu Balita & ILP Anggrek 1',
    desa: 'Tegalsari',
    hariTanggal: 'Selasa, 11 Feb 2025',
    tanggalIso: '2025-02-11',
    jam: '08.00 - 11.30 WIB',
    lokasi: 'Balai RW 02, Desa Tegalsari',
    layanan: ['Ibu Hamil & Nifas', 'Bayi & Balita (Timbang/Ukur)', 'Imunisasi & Vitamin A', 'Skrining Usia Produktif & Lansia'],
    petugas: {
      bidan: 'Bidan Siti Saudah, A.Md.Keb.',
      perawat: 'Perawat Tri Wahyuningtyas, A.Md.Kep.',
    },
    status: 'Siap Pelaksanaan',
  },
  {
    id: 'JDW-002',
    kodePosyandu: 'KPN-KPJ-014',
    namaPosyandu: 'Posyandu Melati 3',
    desa: 'Kepanjen',
    hariTanggal: 'Kamis, 13 Feb 2025',
    tanggalIso: '2025-02-13',
    jam: '08.30 - 12.00 WIB',
    lokasi: 'Gedung Poskesdes RW 03, Kelurahan Kepanjen',
    layanan: ['Bayi & Balita (Antropometri Standar)', 'Pemberian PMT Penyuluhan', 'Skrining PTM (Gula Darah & Tensi)'],
    petugas: {
      bidan: 'Bidan Mamik Makrifatin, A.Md.Keb.',
      perawat: 'Perawat Nurul Mashfiyah, A.Md.Kep.',
    },
    status: 'Siap Pelaksanaan',
  },
  {
    id: 'JDW-003',
    kodePosyandu: 'KPN-CRG-005',
    namaPosyandu: 'Posyandu Mawar Indah',
    desa: 'Curungrejo',
    hariTanggal: 'Sabtu, 15 Feb 2025',
    tanggalIso: '2025-02-15',
    jam: '08.00 - 11.00 WIB',
    lokasi: 'Rumah Kader Ibu Titik RW 04, Desa Curungrejo',
    layanan: ['Ibu Hamil & Nifas', 'Pemantauan Tumbuh Kembang', 'Pemeriksaan Kesehatan Usia Remaja & Produktif'],
    petugas: {
      bidan: 'Bidan Desa Slamet Mariyani, A.Md.Keb.',
      perawat: 'Perawat Pustu Curungrejo',
    },
    status: 'Siap Pelaksanaan',
  },
  {
    id: 'JDW-004',
    kodePosyandu: 'KPN-DLM-008',
    namaPosyandu: 'Posyandu Kencana Ungu',
    desa: 'Dilem',
    hariTanggal: 'Selasa, 18 Feb 2025',
    tanggalIso: '2025-02-18',
    jam: '08.30 - 11.30 WIB',
    lokasi: 'Balai Dusun Dilem Barat, Desa Dilem',
    layanan: ['5 Kluster Lengkap (KIA, Balita, Remaja)', 'PTM Lansia & Home Care'],
    petugas: {
      bidan: 'Bidan Desa Miswati, A.Md.Keb.',
      perawat: 'Tim Promkes Puskesmas Kepanjen',
    },
    status: 'Siap Pelaksanaan',
  },
];

export interface NakesItem {
  id: string; // e.g. "USR-001"
  nama: string;
  gelar: string;
  jabatan: 'Tenaga Promosi Kesehatan' | 'Bidan' | 'Perawat';
  peranSistem: 'Admin Utama' | 'Bidan Desa' | 'Perawat Desa';
  wilayahTugas: string;
  peranKhusus: string;
  fokusLayanan: string;
  telepon: string;
  email: string;
  status: 'Aktif' | 'Menunggu Aktivasi';
}

export const NAKES_LIST: NakesItem[] = [
  {
    id: 'USR-001',
    nama: 'Luluk Lady Laili',
    gelar: 'SKM',
    jabatan: 'Tenaga Promosi Kesehatan',
    peranSistem: 'Admin Utama',
    wilayahTugas: 'Puskesmas Kepanjen',
    peranKhusus: 'Koord. Pemberdayaan Masyarakat',
    fokusLayanan: 'Pemberdayaan Kader, Edukasi Promkes & ILP',
    telepon: '0888-9924-444',
    email: 'pkm.kepanjen@gmail.com',
    status: 'Aktif',
  },
  {
    id: 'USR-002',
    nama: 'Yuswantien Himmamie',
    gelar: 'SKM',
    jabatan: 'Tenaga Promosi Kesehatan',
    peranSistem: 'Admin Utama',
    wilayahTugas: 'Puskesmas Kepanjen',
    peranKhusus: 'Pengelola Gateway Portal',
    fokusLayanan: 'Tata Kelola Data 108 Posyandu & Integrasi Sheets',
    telepon: '0888-9924-444',
    email: 'yuswantien.promkes@gmail.com',
    status: 'Aktif',
  },
  {
    id: 'USR-003',
    nama: 'Siti Saudah',
    gelar: 'A.Md.Keb.',
    jabatan: 'Bidan',
    peranSistem: 'Bidan Desa',
    wilayahTugas: 'Desa Tegalsari',
    peranKhusus: 'Koordinator KIA Desa',
    fokusLayanan: 'KIA, Ibu Hamil & Balita',
    telepon: '0812-3456-7890',
    email: 'siti.saudah@tegalsari.desa.id',
    status: 'Aktif',
  },
  {
    id: 'USR-004',
    nama: 'Tri Wahyuningtyas',
    gelar: 'A.Md.Kep.',
    jabatan: 'Perawat',
    peranSistem: 'Perawat Desa',
    wilayahTugas: 'Desa Tegalsari',
    peranKhusus: 'Pendamping Ponkesdes',
    fokusLayanan: 'Skrining PTM & Pelayanan Kesehatan Dewasa/Lansia',
    telepon: '0813-9876-5432',
    email: 'tri.wahyuningtyas@ponkesdes.id',
    status: 'Aktif',
  },
  {
    id: 'USR-005',
    nama: 'Mamik Makrifatin',
    gelar: 'A.Md.Keb.',
    jabatan: 'Bidan',
    peranSistem: 'Bidan Desa',
    wilayahTugas: 'Kelurahan Kepanjen',
    peranKhusus: 'Koordinator KIA Desa',
    fokusLayanan: 'KIA, Ibu Hamil & Balita',
    telepon: '0812-7788-9900',
    email: 'mamik.makrifatin@kepanjen.id',
    status: 'Aktif',
  },
  {
    id: 'USR-006',
    nama: 'Nurul Mashfiyah',
    gelar: 'A.Md.Kep.',
    jabatan: 'Perawat',
    peranSistem: 'Perawat Desa',
    wilayahTugas: 'Kelurahan Kepanjen',
    peranKhusus: 'Pendamping Pustu Kepanjen',
    fokusLayanan: 'Integrasi Layanan Primer Siklus Hidup',
    telepon: '0813-1122-3344',
    email: 'nurul.mashfiyah@kepanjen.id',
    status: 'Aktif',
  },
  {
    id: 'USR-007',
    nama: 'Miswati',
    gelar: 'A.Md.Keb.',
    jabatan: 'Bidan',
    peranSistem: 'Bidan Desa',
    wilayahTugas: 'Desa Dilem',
    peranKhusus: 'Koordinator KIA Desa',
    fokusLayanan: 'KIA, Ibu Hamil & Balita',
    telepon: '0812-5566-7788',
    email: 'miswati.dilem@gmail.com',
    status: 'Aktif',
  },
  {
    id: 'USR-008',
    nama: 'Slamet Mariyani',
    gelar: 'A.Md.Keb.',
    jabatan: 'Bidan',
    peranSistem: 'Bidan Desa',
    wilayahTugas: 'Desa Curungrejo',
    peranKhusus: 'Koordinator KIA Desa',
    fokusLayanan: 'KIA, Ibu Hamil & Balita',
    telepon: '0812-9900-1122',
    email: 'slamet.mariyani@curungrejo.id',
    status: 'Aktif',
  },
  {
    id: 'USR-009',
    nama: 'Lulismiati',
    gelar: 'S.ST.',
    jabatan: 'Bidan',
    peranSistem: 'Bidan Desa',
    wilayahTugas: 'Desa Cepokomulyo',
    peranKhusus: 'Koordinator KIA Desa',
    fokusLayanan: 'KIA, Ibu Hamil & Balita',
    telepon: '0813-4455-6677',
    email: 'lulismiati@cepokomulyo.id',
    status: 'Aktif',
  },
  {
    id: 'USR-010',
    nama: 'Dyah Retno Martini',
    gelar: 'A.Md.Kep.',
    jabatan: 'Perawat',
    peranSistem: 'Perawat Desa',
    wilayahTugas: 'Desa Panggungrejo',
    peranKhusus: 'Pendamping Ponkesdes',
    fokusLayanan: 'Pelayanan Lansia & PTM',
    telepon: '0812-8877-6655',
    email: 'dyah.retno@panggungrejo.id',
    status: 'Menunggu Aktivasi',
  },
];

export interface MateriItem {
  id: string;
  judul: string;
  kategori: 'Panduan Pencatatan' | 'Panduan Pelaporan' | 'Integrasi Layanan Primer (ILP)' | '5 Kluster Siklus Hidup';
  format: 'PDF Resmi' | 'Dokumen Juknis' | 'Media Edukasi';
  ukuran: string;
  tanggal: string;
  deskripsi: string;
  downloadUrl: string;
}

export const MATERI_LIST: MateriItem[] = [
  {
    id: 'MAT-001',
    judul: 'Pedoman Kader 5 Klaster Siklus Hidup ILP Posyandu 2025',
    kategori: 'Integrasi Layanan Primer (ILP)',
    format: 'PDF Resmi',
    ukuran: '5.1 MB',
    tanggal: '15 Jan 2025',
    deskripsi: 'Standar nasional panduan integrasi layanan posyandu era transformasi kesehatan Kemenkes RI.',
    downloadUrl: '#',
  },
  {
    id: 'MAT-002',
    judul: 'Juknis Pelaksanaan Bulan Penimbangan Balita & Pemberian Vitamin A',
    kategori: 'Panduan Pelaporan',
    format: 'PDF Resmi',
    ukuran: '2.4 MB',
    tanggal: '12 Feb 2025',
    deskripsi: 'Petunjuk teknis pengukuran antropometri standar, distribusi kapsul vitamin A merah/biru, dan entri data digital.',
    downloadUrl: '#',
  },
  {
    id: 'MAT-003',
    judul: 'Buku Saku Penggunaan Antropometri Kit Terstandar',
    kategori: 'Panduan Pencatatan',
    format: 'Dokumen Juknis',
    ukuran: '3.8 MB',
    tanggal: '05 Jan 2025',
    deskripsi: 'Panduan kalibrasi dan teknik menimbang bayi dengan infantometer dan timbangan digital akurasi 5 gram.',
    downloadUrl: '#',
  },
  {
    id: 'MAT-004',
    judul: 'Instrumen Skrining Lansia Sederhana (SKILAS) Posyandu',
    kategori: '5 Kluster Siklus Hidup',
    format: 'PDF Resmi',
    ukuran: '1.9 MB',
    tanggal: '20 Des 2024',
    deskripsi: 'Lembar ceklist skrining penurunan kapasitas intrinsik lansia meliputi kognitif, mobilitas, nutrisi, dan depresi.',
    downloadUrl: '#',
  },
  {
    id: 'MAT-005',
    judul: 'SOP Sinkronisasi dan Keamanan Akses Google Workspace Puskesmas',
    kategori: 'Panduan Pelaporan',
    format: 'Dokumen Juknis',
    ukuran: '1.2 MB',
    tanggal: '10 Jan 2025',
    deskripsi: 'Standar operasional perlindungan data sasaran dan hak akses dokumen Google Sheets 108 posyandu.',
    downloadUrl: '#',
  },
];

export interface PengumumanItem {
  id: string;
  nomorSurat: string;
  judul: string;
  kategori: 'Surat Edaran Teknis' | 'Imunisasi & Vaksinasi' | 'Operasional Kader Posyandu';
  tanggal: string;
  sifat: 'Penting / Edaran Terbuka' | 'Segera' | 'Biasa';
  penandatangan: string;
  ringkasan: string;
  isiLengkap: string;
  lampiranNama: string;
  lampiranUkuran: string;
}

export const PENGUMUMAN_LIST: PengumumanItem[] = [
  {
    id: 'PGM-001',
    nomorSurat: '440 / 082 / 35.07.103 / 2025',
    judul: 'SE No. 440/082/2025: Juknis Pelaksanaan Bulan Penimbangan Balita & Vitamin A Februari 2025',
    kategori: 'Surat Edaran Teknis',
    tanggal: '15 Januari 2025',
    sifat: 'Penting / Edaran Terbuka',
    penandatangan: 'Kepala UPTD Puskesmas Kepanjen',
    ringkasan: 'Instruksi serentak 108 Posyandu se-Kepanjen: Antropometri terstandar, distribusi Vit. A kapsul biru/merah, & batas pelaporan digital Sheets 25 Februari.',
    isiLengkap: `Sehubungan dengan pelaksanaan Bulan Penimbangan Balita dan Pemberian Vitamin A Tahun 2025, bersama ini kami sampaikan arahan teknis operasional bagi seluruh koordinator kader dan bidan/perawat pembina wilayah di 18 desa/kelurahan:

1. Setiap Posyandu wajib menggunakan alat timbang terkalibrasi (Antropometri Kit Standar Kemenkes RI) dan memastikan keabsahan data balita.
2. Pemberian Vitamin A: Kapsul Biru (100.000 IU) untuk bayi usia 6-11 bulan, Kapsul Merah (200.000 IU) untuk anak balita usia 12-59 bulan.
3. Seluruh pencatatan hasil pelayanan wajib disinkronkan melalui Formulir 02 di Google Sheets Posyandu masing-masing paling lambat tanggal 25 Februari 2025 pukul 17.00 WIB.
4. Apabila terdapat balita yang berhalangan hadir pada hari buka posyandu, kader melakukan kunjungan rumah (sweeping) selambat-lambatnya 5 hari setelah pelaksanaan.`,
    lampiranNama: 'Lampiran-Surat-Edaran-Kepanjen-2025.pdf',
    lampiranUkuran: '2.4 MB',
  },
  {
    id: 'PGM-002',
    nomorSurat: '440 / 019 / 35.07.103 / 2025',
    judul: 'Pedoman Teknis Penyelenggaraan Posyandu Siklus Hidup & Sinkronisasi Data Gateway',
    kategori: 'Operasional Kader Posyandu',
    tanggal: '05 Januari 2025',
    sifat: 'Penting / Edaran Terbuka',
    penandatangan: 'Admin Utama Promkes (Luluk Lady Laili, SKM)',
    ringkasan: 'Standarisasi alur koordinasi satu pintu portal SI-KAWAN, integrasi spreadsheet terproteksi, dan perlindungan privasi sasaran nakes-kader.',
    isiLengkap: `Pedoman ini memuat panduan implementasi Integrasi Layanan Primer (ILP) di tingkat Posyandu:
- Tata cara pengisian 4 lembar kerja (Absen, Hasil Pelayanan, Rekap Kunjungan Rumah, dan Hasil Kunjungan Rumah).
- Prosedur pengajuan koreksi data mandiri melalui portal jika terdapat rotasi jadwal atau perubahan link sheet.
- Larangan mempublikasikan NIK atau rekam medis individu di ranah publik terbuka.`,
    lampiranNama: 'Pedoman-Teknis-SI-KAWAN-v2.4.pdf',
    lampiranUkuran: '3.1 MB',
  },
  {
    id: 'PGM-003',
    nomorSurat: '440 / 642 / 35.07.103 / 2024',
    judul: 'Pemberitahuan Jadwal Distribusi Vaksin Polio nOPV2 & Vitamin A Dosis Tinggi',
    kategori: 'Imunisasi & Vaksinasi',
    tanggal: '12 Oktober 2024',
    sifat: 'Segera',
    penandatangan: 'Koordinator Gizi & KIA Puskesmas Kepanjen',
    ringkasan: 'Pengambilan logistik vaksin dan vitamin A di ruang Farmasi UPTD Puskesmas Kepanjen bagi 18 koordinator desa.',
    isiLengkap: `Jadwal pengambilan logistik imunisasi dibuka setiap hari kerja pukul 08.00 - 13.00 WIB dengan membawa cooler box standar rantai dingin (cold chain).`,
    lampiranNama: 'Jadwal-Distribusi-Vaksin-Kepanjen.pdf',
    lampiranUkuran: '1.5 MB',
  },
];

export interface UsulanKoreksiItem {
  id: string; // e.g. "USL-2025-001"
  namaPengusul: string;
  peran: string;
  telepon: string;
  posyanduId: string;
  posyanduNama: string;
  desa: string;
  kategori: 'Perbaikan Tautan Google Sheets' | 'Perubahan Kontak Bidan/Perawat' | 'Koreksi Data Wilayah & Strata' | 'Penyesuaian Jadwal Hari Buka';
  deskripsi: string;
  lampiranUrl?: string;
  tanggalDiajukan: string;
  status: 'Menunggu Verifikasi' | 'Disetujui & Diterapkan' | 'Ditolak';
  catatanAdmin?: string;
}

export const USULAN_LIST_INIT: UsulanKoreksiItem[] = [
  {
    id: 'USL-2025-001',
    namaPengusul: 'Siti Saudah, A.Md.Keb.',
    peran: 'Bidan Desa Tegalsari',
    telepon: '0812-3456-7890',
    posyanduId: 'TGL-001',
    posyanduNama: 'Mawar Tegalsari',
    desa: 'Tegalsari',
    kategori: 'Perbaikan Tautan Google Sheets',
    deskripsi: 'Pembaruan tautan Google Sheets Absen Kader 2025 karena dokumen lama telah mencapai batas kapasitas kuota baris.',
    tanggalDiajukan: '18 Feb 2025',
    status: 'Menunggu Verifikasi',
  },
  {
    id: 'USL-2025-002',
    namaPengusul: 'Rina Wijayanti, A.Md.Keb.',
    peran: 'Bidan Desa Kepanjen',
    telepon: '0813-9876-5432',
    posyanduId: 'KPN-002',
    posyanduNama: 'Anggrek 2 Kepanjen',
    desa: 'Kepanjen',
    kategori: 'Penyesuaian Jadwal Hari Buka',
    deskripsi: 'Pergeseran jadwal pelaksanaan dari Selasa Minggu II menjadi Kamis Minggu II atas musyawarah RT/RW setempat.',
    tanggalDiajukan: '14 Feb 2025',
    status: 'Disetujui & Diterapkan',
    catatanAdmin: 'Jadwal telah diperbarui di master kalender SI-KAWAN pada 15 Feb 2025.',
  },
  {
    id: 'USL-2025-003',
    namaPengusul: 'Kader Posyandu Bougenville',
    peran: 'Kader Posyandu',
    telepon: '0857-1122-3344',
    posyanduId: 'CKM-001',
    posyanduNama: 'Bougenville 1 Cepokomulyo',
    desa: 'Cepokomulyo',
    kategori: 'Perubahan Kontak Bidan/Perawat',
    deskripsi: 'Pembaruan nomor kontak Bidan Wilayah karena penggantian kartu dinas puskesmas.',
    tanggalDiajukan: '10 Feb 2025',
    status: 'Disetujui & Diterapkan',
    catatanAdmin: 'Nomor telepon terverifikasi aktif oleh koordinator Promkes.',
  },
  {
    id: 'USL-2025-004',
    namaPengusul: 'Budi Santoso, S.Kep.',
    peran: 'Perawat Desa Ardirejo',
    telepon: '0821-4455-6677',
    posyanduId: 'ARD-003',
    posyanduNama: 'Cempaka 3 Ardirejo',
    desa: 'Ardirejo',
    kategori: 'Koreksi Data Wilayah & Strata',
    deskripsi: 'Koreksi penulisan RW pada master posyandu: sebelumnya RW.03 yang benar adalah RW.04.',
    tanggalDiajukan: '08 Feb 2025',
    status: 'Disetujui & Diterapkan',
  },
];

export interface MasterAkunItem {
  id: string;
  nama: string;
  email: string;
  role: 'Bidan Desa' | 'Perawat Pembina' | 'Admin Promkes' | 'Koordinator Wilayah';
  desaTugas: string;
  posyanduBinaan: string[];
  status: 'Aktif' | 'Nonaktif';
  terakhirLogin: string;
}

export const MOCK_AKUN_LIST: MasterAkunItem[] = [
  {
    id: 'USR-001',
    nama: 'Luluk Lady Laili, SKM',
    email: 'promkes.kepanjen@malangkab.go.id',
    role: 'Admin Promkes',
    desaTugas: 'Puskesmas Induk (Semua 18 Desa)',
    posyanduBinaan: ['Seluruh 108 Posyandu'],
    status: 'Aktif',
    terakhirLogin: 'Hari ini, 09:14 WIB',
  },
  {
    id: 'USR-002',
    nama: 'Siti Saudah, A.Md.Keb.',
    email: 'siti.saudah@posyandukepanjen.id',
    role: 'Bidan Desa',
    desaTugas: 'Desa Tegalsari',
    posyanduBinaan: ['Mawar Tegalsari', 'Melati Tegalsari', 'Kenanga Tegalsari'],
    status: 'Aktif',
    terakhirLogin: 'Kemarin, 14:20 WIB',
  },
  {
    id: 'USR-003',
    nama: 'Rina Wijayanti, A.Md.Keb.',
    email: 'rina.wijayanti@posyandukepanjen.id',
    role: 'Bidan Desa',
    desaTugas: 'Kelurahan Kepanjen',
    posyanduBinaan: ['Anggrek 1 Kepanjen', 'Anggrek 2 Kepanjen', 'Anggrek 3 Kepanjen', 'Anggrek 4 Kepanjen'],
    status: 'Aktif',
    terakhirLogin: '18 Feb 2025',
  },
  {
    id: 'USR-004',
    nama: 'Ahmad Fauzi, S.Kep., Ns.',
    email: 'ahmad.fauzi@posyandukepanjen.id',
    role: 'Perawat Pembina',
    desaTugas: 'Desa Panggungrejo',
    posyanduBinaan: ['Flamboyan 1 Panggungrejo', 'Flamboyan 2 Panggungrejo', 'Flamboyan 3 Panggungrejo'],
    status: 'Aktif',
    terakhirLogin: '16 Feb 2025',
  },
  {
    id: 'USR-005',
    nama: 'Dewi Lestari, A.Md.Keb.',
    email: 'dewi.lestari@posyandukepanjen.id',
    role: 'Koordinator Wilayah',
    desaTugas: 'Desa Cepokomulyo',
    posyanduBinaan: ['Bougenville 1 Cepokomulyo', 'Bougenville 2 Cepokomulyo'],
    status: 'Aktif',
    terakhirLogin: '12 Feb 2025',
  },
];

