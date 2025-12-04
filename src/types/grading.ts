export interface StudentGrade {
  siswaId: string;
  nisn: string;
  nama: string;
  grades: Record<string, number | string>; 
}
export interface GradingComponent {
  id: string;
  namaKomponen: string;
  tipe: "INPUT" | "READ_ONLY";
  formula?: string;
  urutan: number;
}
export interface Skema {
  id: string;
  Komponen: GradingComponent[];
}
export interface ClassItem {
  id: string;
  name: string;
}
export interface SubjectItem {
  id: string;
  namaMapel: string;
  kategori: "WAJIB" | "MUATAN_LOKAL" | "EKSTRAKURIKULER";
}
export interface CapaianData {
  siswaId: string;
  deskripsi: string;
}
