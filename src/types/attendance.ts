export interface ClassItem {
  id: string;
  namaKelas: string;
}

export interface SesiAbsensi {
  id: string;
  tanggal: string;
  pertemuanKe: number;
  _count: {
    Detail: number;
  };
}
