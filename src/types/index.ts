export type UserRole = "admin" | "guru" | "wali_kelas" | "siswa";

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  nisn?: string;
  nip?: string;
  schoolName?: string;
}

export interface AuthResponse {
  user: User;
  token: string;
}

export interface Student {
  id: string;
  nisn: string;
  name: string;
  classId: string;
  guardianEmail?: string;
  status: "Aktif" | "Pindah" | "Keluar";
}

export interface Teacher {
  id: string;
  nip: string;
  name: string;
  email: string;
  subjects: string[];
  classAdvisor?: string;
}

export interface Class {
  id: string;
  name: string;
  levelId: string;
  capacity: number;
  classAdvisorId?: string;
}

export interface Subject {
  id: string;
  name: string;
  category: "Wajib" | "Muatan Lokal" | "Ekstrakurikuler";
  gradeType: "Kuantitatif" | "Kualitatif";
}

export interface Grade {
  id: string;
  studentId: string;
  subjectId: string;
  components: GradeComponent[];
  finalGrade: number;
  competency: string;
}

export interface GradeComponent {
  id: string;
  name: string;
  type: "input" | "readonly";
  value: number;
  weight?: number;
}

export interface Attendance {
  id: string;
  studentId: string;
  date: Date;
  status: "Hadir" | "Sakit" | "Izin" | "Alpa";
  notes?: string;
}

export interface Announcement {
  id: string;
  title: string;
  content: string;
  createdAt: Date;
  priority: "Normal" | "Penting";
  attachments?: string[];
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

export interface ApiError {
  code: string;
  message: string;
  details?: Record<string, any>;
}
