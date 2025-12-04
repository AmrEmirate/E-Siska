export interface Rapor {
  id: string;
  siswaId: string;
  tahunAjaranId: string;
  urlFile?: string;
  siswa?: {
    id: string;
    nama: string;
    nisn: string;
  };
  tahunAjaran?: {
    id: string;
    tahun: string;
    semester: string;
  };
  createdAt?: string;
  updatedAt?: string;
  NilaiRaporAkhir?: {
    id: string;
    mapelId: string;
    nilaiAkhir: number;
    isOverride: boolean;
    mapel?: {
      id: string;
      namaMapel: string;
      kategori: string;
    };
  }[];
  isFinalisasi?: boolean;
  catatanWaliKelas?: string;
  dataKokurikuler?: string;
}
