export const ROLE_MENUS = {
  admin: [
    { href: "/dashboard", label: "Dashboard", icon: "📊" },
    { href: "/dashboard/admin/students", label: "Manajemen Siswa", icon: "👥" },
    { href: "/dashboard/admin/teachers", label: "Manajemen Guru", icon: "🎓" },
    { href: "/dashboard/admin/classes", label: "Manajemen Kelas", icon: "🏫" },
    { href: "/dashboard/admin/subjects", label: "Mata Pelajaran", icon: "📚" },
    { href: "/dashboard/admin/schedule", label: "Jadwal", icon: "📅" },
    { href: "/dashboard/admin/announcements", label: "Pengumuman", icon: "📢" },
    { href: "/dashboard/admin/documents", label: "Dokumen", icon: "📄" },
  ],
  guru: [
    { href: "/dashboard", label: "Dashboard", icon: "📊" },
    {
      href: "/dashboard/teacher/grades",
      label: "Nilai & Kompetensi",
      icon: "📝",
    },
    { href: "/dashboard/teacher/attendance", label: "Absensi", icon: "✓" },
    {
      href: "/dashboard/teacher/schedule",
      label: "Jadwal Mengajar",
      icon: "📅",
    },
    {
      href: "/dashboard/teacher/announcements",
      label: "Pengumuman",
      icon: "📢",
    },
  ],
  wali_kelas: [
    { href: "/dashboard", label: "Dashboard", icon: "📊" },
    { href: "/dashboard/wali/grades", label: "Rekap Nilai", icon: "📊" },
    { href: "/dashboard/wali/attendance", label: "Rekap Absensi", icon: "✓" },
    {
      href: "/dashboard/wali/finalize-grades",
      label: "Finalisasi Rapor",
      icon: "🎖️",
    },
    {
      href: "/dashboard/wali/generate-report",
      label: "Cetak Rapor",
      icon: "🖨️",
    },
  ],
  siswa: [
    { href: "/dashboard", label: "Dashboard", icon: "📊" },
    { href: "/dashboard/student/attendance", label: "Absensi Saya", icon: "✓" },
    { href: "/dashboard/student/grades", label: "Nilai Saya", icon: "📝" },
    {
      href: "/dashboard/student/schedule",
      label: "Jadwal Pelajaran",
      icon: "📅",
    },
    {
      href: "/dashboard/student/announcements",
      label: "Pengumuman",
      icon: "📢",
    },
  ],
};

export const ATTENDANCE_STATUS = ["Hadir", "Sakit", "Izin", "Alpa"];
export const ANNOUNCEMENT_PRIORITY = ["Normal", "Penting"];
export const SUBJECT_CATEGORIES = ["Wajib", "Muatan Lokal", "Ekstrakurikuler"];
export const GRADE_TYPES = ["Kuantitatif", "Kualitatif"];

export const formatDate = (date: Date | string) => {
  return new Date(date).toLocaleDateString("id-ID", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

export const formatDateTime = (date: Date | string) => {
  return new Date(date).toLocaleString("id-ID", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

export const calculateAttendancePercentage = (hadir: number, total: number) => {
  return Math.round((hadir / total) * 100);
};
