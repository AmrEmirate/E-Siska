# E-Siska Frontend

Platform manajemen akademik dan administrasi untuk SDN Ciater 02 Serpong.

## Fitur Utama

### Admin
- Manajemen data siswa, guru, dan kelas
- Manajemen mata pelajaran dengan skema penilaian dinamis
- Manajemen jadwal pengajaran
- Publikasi pengumuman dan dokumen
- Backup & restore database

### Guru
- Input nilai dan capaian kompetensi siswa
- Manajemen absensi dengan sistem pertemuan
- Lihat jadwal mengajar pribadi
- Akses pengumuman sekolah

### Wali Kelas
- Rekap nilai siswa di kelas bimbingan
- Rekap absensi kelas
- Finalisasi dan generate rapor siswa
- Isi catatan wali kelas

### Siswa
- Lihat nilai per mata pelajaran
- Lihat jadwal pelajaran
- Lihat rekam jejak absensi
- Akses pengumuman sekolah

## Setup

\`\`\`bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm build
\`\`\`

## Integrasi Axios

Semua API calls dilakukan melalui axios client yang sudah dikonfigurasi di `lib/api-client.ts`:

\`\`\`typescript
import apiClient from '@/lib/api-client'

// GET request
const data = await apiClient.get('/students')

// POST request
const response = await apiClient.post('/auth/login', {
  identifier: 'username',
  password: 'password'
})

// PUT request
await apiClient.put(`/grades/${id}`, updatedData)

// DELETE request
await apiClient.delete(`/students/${id}`)
\`\`\`

## Menggunakan useApi Hook

Untuk kemudahan, gunakan custom hook `useApi`:

\`\`\`typescript
import { useApi } from '@/hooks/use-api'

export function MyComponent() {
  const { data, loading, error, get, post } = useApi()

  const fetchStudents = async () => {
    const students = await get('/students')
  }

  const createStudent = async (studentData) => {
    const result = await post('/students', studentData)
  }

  return (...)
}
\`\`\`

## Struktur Folder

\`\`\`
app/
├── layout.tsx                 # Root layout
├── login/                     # Login page
├── dashboard/                 # Protected dashboard
│   ├── layout.tsx
│   ├── page.tsx
│   ├── admin/                 # Admin pages
│   ├── teacher/               # Teacher pages
│   ├── wali/                  # Class teacher pages
│   └── student/               # Student pages
components/
├── header.tsx                 # Dashboard header
├── sidebar.tsx                # Dashboard sidebar
└── wali/                      # Wali-specific components
context/
├── auth-context.tsx           # Authentication context
lib/
├── api-client.ts              # Axios configuration
├── constants.ts               # Constants and utilities
hooks/
├── use-api.ts                 # API hook
types/
├── index.ts                   # TypeScript types
\`\`\`

## Development Tips

1. Semua pages diproteksi oleh authentication check di `DashboardLayout`
2. Gunakan `useAuth` hook untuk akses data user dan logout
3. Axios client secara otomatis menambahkan token dari localStorage
4. Semua 401 responses akan redirect ke login page

## Fitur yang Sudah Ready untuk Backend Integration

- Login/logout dengan axios
- CRUD operations untuk semua entity
- Pagination dan filtering
- Error handling dan loading states
- Token management dan session handling

Hubungkan semua API endpoints sesuai dengan dokumentasi backend Anda!
