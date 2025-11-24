# E-SISKA Hooks Integration

Integrasi frontend-backend menggunakan custom React hooks untuk E-SISKA (Sistem Informasi Sekolah).

## 📁 Struktur Hooks

Semua hooks berada di folder [`src/hooks/`](file:///c:/Dev%201/SISKO/E-Siska-FE/src/hooks):

### 🔐 Authentication
- `use-auth.ts` - Login, logout, profile management

### 👥 Master Data
- `use-guru.ts` - Data guru
- `use-siswa.ts` - Data siswa  
- `use-tingkatan.ts` - Tingkatan kelas
- `use-kelas.ts` - Data kelas
- `use-ruangan.ts` - Data ruangan
- `use-mapel.ts` - Mata pelajaran

### 📅 Akademik
- `use-tahun-ajaran.ts` - Tahun ajaran
- `use-skema.ts` - Skema penilaian
- `use-penempatan.ts` - Penempatan siswa
- `use-penugasan.ts` - Penugasan guru
- `use-jadwal.ts` - Jadwal pelajaran

### 📝 Kegiatan
- `use-absensi.ts` - Absensi siswa
- `use-nilai.ts` - Nilai akademik
- `use-ekskul.ts` - Nilai ekstrakurikuler
- `use-capaian.ts` - Capaian kompetensi

### 📊 Laporan & Sistem
- `use-rapor.ts` - Generate rapor
- `use-pengumuman.ts` - Pengumuman
- `use-dokumen.ts` - Upload dokumen
- `use-wali-kelas.ts` - Penugasan wali kelas
- `use-sekolah.ts` - Profil sekolah
- `use-backup.ts` - Backup & restore database

## 🚀 Cara Menggunakan

### 1. Import Hook

```typescript
// Import individual
import { useAuth } from "@/hooks/use-auth"

// Import dari index (recommended)
import { useAuth, useSiswa, useGuru } from "@/hooks"
```

### 2. Gunakan di Component

```typescript
"use client"

import { useEffect } from "react"
import { useSiswa } from "@/hooks"

export function SiswaPage() {
  const { data, loading, fetchSiswa, deleteSiswa } = useSiswa()

  useEffect(() => {
    fetchSiswa(1, 10) // Fetch page 1, 10 items
  }, [fetchSiswa])

  if (loading) return <div>Loading...</div>

  return (
    <div>
      {data.map(siswa => (
        <div key={siswa.id}>
          {siswa.nama} - {siswa.nis}
        </div>
      ))}
    </div>
  )
}
```

## 📖 Dokumentasi

- **[HOOKS_USAGE.md](file:///c:/Dev%201/SISKO/E-Siska-FE/HOOKS_USAGE.md)** - Contoh penggunaan lengkap untuk setiap hook
- **[Walkthrough](file:///C:/Users/amrem/.gemini/antigravity/brain/5abd014f-631e-41be-8867-4f08a2ca017e/walkthrough.md)** - Detail implementasi dan fitur

## ⚙️ Konfigurasi

### Environment Variables
File `.env.local`:
```env
NEXT_PUBLIC_API_URL=http://localhost:8181/api
```

### API Client
Konfigurasi otomatis di [`src/lib/api-client.ts`](file:///c:/Dev%201/SISKO/E-Siska-FE/src/lib/api-client.ts):
- Automatic token injection
- 401 redirect to login
- Base URL dari environment

## ✨ Fitur

✅ **TypeScript Support** - Full type safety dengan interfaces
✅ **Error Handling** - Toast notifications otomatis
✅ **Loading States** - Built-in loading management
✅ **Consistent Pattern** - Semua hooks mengikuti pattern yang sama
✅ **No UI Changes** - Hanya menambahkan logika, design tidak berubah

## 📦 Hooks yang Tersedia

Total: **27 hooks** siap digunakan!

| Hook | Fitur | File |
|------|-------|------|
| useAuth | Login, logout, profile | [use-auth.ts](file:///c:/Dev%201/SISKO/E-Siska-FE/src/hooks/use-auth.ts) |
| useSiswa | CRUD siswa + pagination | [use-siswa.ts](file:///c:/Dev%201/SISKO/E-Siska-FE/src/hooks/use-siswa.ts) |
| useGuru | CRUD guru + pagination | [use-guru.ts](file:///c:/Dev%201/SISKO/E-Siska-FE/src/hooks/use-guru.ts) |
| useKelas | CRUD kelas | [use-kelas.ts](file:///c:/Dev%201/SISKO/E-Siska-FE/src/hooks/use-kelas.ts) |
| useTingkatan | CRUD tingkatan | [use-tingkatan.ts](file:///c:/Dev%201/SISKO/E-Siska-FE/src/hooks/use-tingkatan.ts) |
| useRuangan | CRUD ruangan | [use-ruangan.ts](file:///c:/Dev%201/SISKO/E-Siska-FE/src/hooks/use-ruangan.ts) |
| useMapel | CRUD mata pelajaran | [use-mapel.ts](file:///c:/Dev%201/SISKO/E-Siska-FE/src/hooks/use-mapel.ts) |
| useTahunAjaran | CRUD + set active | [use-tahun-ajaran.ts](file:///c:/Dev%201/SISKO/E-Siska-FE/src/hooks/use-tahun-ajaran.ts) |
| useSkema | CRUD skema penilaian | [use-skema.ts](file:///c:/Dev%201/SISKO/E-Siska-FE/src/hooks/use-skema.ts) |
| usePenempatan | CRUD penempatan siswa | [use-penempatan.ts](file:///c:/Dev%201/SISKO/E-Siska-FE/src/hooks/use-penempatan.ts) |
| usePenugasan | CRUD penugasan guru | [use-penugasan.ts](file:///c:/Dev%201/SISKO/E-Siska-FE/src/hooks/use-penugasan.ts) |
| useJadwal | CRUD jadwal + filter | [use-jadwal.ts](file:///c:/Dev%201/SISKO/E-Siska-FE/src/hooks/use-jadwal.ts) |
| useAbsensi | CRUD absensi + filter | [use-absensi.ts](file:///c:/Dev%201/SISKO/E-Siska-FE/src/hooks/use-absensi.ts) |
| useNilai | CRUD nilai + filter | [use-nilai.ts](file:///c:/Dev%201/SISKO/E-Siska-FE/src/hooks/use-nilai.ts) |
| useEkskul | CRUD nilai ekskul | [use-ekskul.ts](file:///c:/Dev%201/SISKO/E-Siska-FE/src/hooks/use-ekskul.ts) |
| useCapaian | CRUD capaian | [use-capaian.ts](file:///c:/Dev%201/SISKO/E-Siska-FE/src/hooks/use-capaian.ts) |
| useRapor | Generate & download | [use-rapor.ts](file:///c:/Dev%201/SISKO/E-Siska-FE/src/hooks/use-rapor.ts) |
| usePengumuman | CRUD pengumuman | [use-pengumuman.ts](file:///c:/Dev%201/SISKO/E-Siska-FE/src/hooks/use-pengumuman.ts) |
| useDokumen | Upload & manage | [use-dokumen.ts](file:///c:/Dev%201/SISKO/E-Siska-FE/src/hooks/use-dokumen.ts) |
| useWaliKelas | CRUD wali kelas | [use-wali-kelas.ts](file:///c:/Dev%201/SISKO/E-Siska-FE/src/hooks/use-wali-kelas.ts) |
| useSekolah | Profil sekolah | [use-sekolah.ts](file:///c:/Dev%201/SISKO/E-Siska-FE/src/hooks/use-sekolah.ts) |
| useBackup | Backup & restore | [use-backup.ts](file:///c:/Dev%201/SISKO/E-Siska-FE/src/hooks/use-backup.ts) |

## 🎯 Next Steps

Untuk mengintegrasikan dengan UI yang sudah ada:

1. Import hook yang diperlukan di component
2. Gunakan `fetchX()` di `useEffect` untuk load data
3. Gunakan state `data` dan `loading` untuk render
4. Panggil fungsi CRUD untuk tambah/edit/hapus

Semua hooks siap pakai tanpa perlu setup tambahan! 🚀
