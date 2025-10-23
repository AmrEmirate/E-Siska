export const DEFAULT_CREDENTIALS = {
  siswa: [
    {
      email: "ahmad.rizki@sekolah.ac.id",
      password: "siswa123",
      name: "Ahmad Rizki",
      nisn: "0012345678",
    },
    {
      email: "siti.nurhaliza@sekolah.ac.id",
      password: "siswa123",
      name: "Siti Nurhaliza",
      nisn: "0012345679",
    },
    {
      email: "budi.wijaya@sekolah.ac.id",
      password: "siswa123",
      name: "Budi Wijaya",
      nisn: "0012345680",
    },
  ],
  guru: [
    {
      email: "budi.santoso@sekolah.ac.id",
      password: "guru123",
      name: "Budi Santoso",
      nip: "198505151234567890",
    },
    {
      email: "siti.rahayu@sekolah.ac.id",
      password: "guru123",
      name: "Siti Rahayu",
      nip: "198607201234567891",
    },
    {
      email: "ahmad.suryanto@sekolah.ac.id",
      password: "guru123",
      name: "Ahmad Suryanto",
      nip: "198803151234567892",
    },
  ],
  "wali-kelas": [
    {
      email: "wali.kelas1@sekolah.ac.id",
      password: "wali123",
      name: "Wali Kelas 1",
      nip: "198904101234567893",
    },
    {
      email: "wali.kelas2@sekolah.ac.id",
      password: "wali123",
      name: "Wali Kelas 2",
      nip: "199005151234567894",
    },
  ],
  admin: [
    {
      email: "admin@sekolah.ac.id",
      password: "admin123",
      name: "Admin Sekolah",
      nip: "199106201234567895",
    },
    {
      email: "superadmin@sekolah.ac.id",
      password: "superadmin123",
      name: "Super Admin",
      nip: "199207251234567896",
    },
  ],
}

export function validateCredentials(email: string, password: string) {
  for (const [role, credentials] of Object.entries(DEFAULT_CREDENTIALS)) {
    const user = credentials.find((u) => u.email === email && u.password === password)
    if (user) {
      return { ...user, role }
    }
  }
  return null
}

export function getRoleFromEmail(email: string): string | null {
  for (const [role, credentials] of Object.entries(DEFAULT_CREDENTIALS)) {
    if (credentials.some((u) => u.email === email)) {
      return role
    }
  }
  return null
}
