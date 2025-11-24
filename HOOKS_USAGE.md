# Contoh Penggunaan Hooks

## Import Hooks

### Import Individual Hook
```typescript
import { useAuth } from "@/hooks/use-auth"
import { useSiswa } from "@/hooks/use-siswa"
```

### Import dari Index (Recommended)
```typescript
import { useAuth, useSiswa, useGuru } from "@/hooks"
```

## Contoh Penggunaan di Component

### 1. Authentication (Login/Logout)

```typescript
"use client"

import { useState } from "react"
import { useAuth } from "@/hooks"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export function LoginForm() {
  const { login, loading } = useAuth()
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    const success = await login({ username, password })
    if (success) {
      // Redirect atau action lainnya
      window.location.href = "/dashboard"
    }
  }

  return (
    <form onSubmit={handleLogin}>
      <Input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Username"
      />
      <Input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
      />
      <Button type="submit" disabled={loading}>
        {loading ? "Loading..." : "Login"}
      </Button>
    </form>
  )
}
```

### 2. Fetch dan Display Data (Siswa)

```typescript
"use client"

import { useEffect } from "react"
import { useSiswa } from "@/hooks"

export function SiswaTable() {
  const { data, loading, fetchSiswa, deleteSiswa } = useSiswa()

  useEffect(() => {
    fetchSiswa(1, 10) // page 1, limit 10
  }, [fetchSiswa])

  const handleDelete = async (id: string) => {
    if (confirm("Hapus data siswa?")) {
      await deleteSiswa(id)
    }
  }

  if (loading) return <div>Loading...</div>

  return (
    <table>
      <thead>
        <tr>
          <th>NIS</th>
          <th>Nama</th>
          <th>Kelas</th>
          <th>Aksi</th>
        </tr>
      </thead>
      <tbody>
        {data.map((siswa) => (
          <tr key={siswa.id}>
            <td>{siswa.nis}</td>
            <td>{siswa.nama}</td>
            <td>{siswa.rombel?.nama || "-"}</td>
            <td>
              <button onClick={() => handleDelete(siswa.id)}>Hapus</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}
```

### 3. Create/Update Data (Guru)

```typescript
"use client"

import { useState } from "react"
import { useGuru } from "@/hooks"

export function TambahGuruForm() {
  const { createGuru, loading } = useGuru()
  const [formData, setFormData] = useState({
    nip: "",
    nama: "",
    email: "",
    jenisKelamin: "L" as "L" | "P",
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const success = await createGuru(formData)
    if (success) {
      // Reset form atau redirect
      setFormData({ nip: "", nama: "", email: "", jenisKelamin: "L" })
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        value={formData.nip}
        onChange={(e) => setFormData({ ...formData, nip: e.target.value })}
        placeholder="NIP"
      />
      <input
        value={formData.nama}
        onChange={(e) => setFormData({ ...formData, nama: e.target.value })}
        placeholder="Nama"
      />
      <input
        value={formData.email}
        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        placeholder="Email"
      />
      <button type="submit" disabled={loading}>
        {loading ? "Menyimpan..." : "Tambah Guru"}
      </button>
    </form>
  )
}
```

### 4. Upload File (Dokumen)

```typescript
"use client"

import { useState } from "react"
import { useDokumen } from "@/hooks"

export function UploadDokumen() {
  const { uploadDokumen, loading } = useDokumen()
  const [file, setFile] = useState<File | null>(null)

  const handleUpload = async () => {
    if (!file) return

    const success = await uploadDokumen(file, {
      namaDokumen: file.name,
      jenisDokumen: "Umum",
    })

    if (success) {
      setFile(null)
    }
  }

  return (
    <div>
      <input
        type="file"
        onChange={(e) => setFile(e.target.files?.[0] || null)}
      />
      <button onClick={handleUpload} disabled={loading || !file}>
        {loading ? "Uploading..." : "Upload"}
      </button>
    </div>
  )
}
```

### 5. Filter Data (Jadwal by Kelas)

```typescript
"use client"

import { useEffect, useState } from "react"
import { useJadwal, useKelas } from "@/hooks"

export function JadwalKelas() {
  const { data: jadwalList, loading, fetchJadwal } = useJadwal()
  const { data: kelasList, fetchKelas } = useKelas()
  const [selectedKelasId, setSelectedKelasId] = useState<string>("")

  useEffect(() => {
    fetchKelas()
  }, [fetchKelas])

  useEffect(() => {
    if (selectedKelasId) {
      fetchJadwal(selectedKelasId)
    }
  }, [selectedKelasId, fetchJadwal])

  return (
    <div>
      <select
        value={selectedKelasId}
        onChange={(e) => setSelectedKelasId(e.target.value)}
      >
        <option value="">Pilih Kelas</option>
        {kelasList.map((kelas) => (
          <option key={kelas.id} value={kelas.id}>
            {kelas.namaKelas}
          </option>
        ))}
      </select>

      {loading ? (
        <div>Loading...</div>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Hari</th>
              <th>Jam</th>
              <th>Mata Pelajaran</th>
              <th>Guru</th>
            </tr>
          </thead>
          <tbody>
            {jadwalList.map((jadwal) => (
              <tr key={jadwal.id}>
                <td>{jadwal.hari}</td>
                <td>{jadwal.jamMulai} - {jadwal.jamSelesai}</td>
                <td>{jadwal.mapel?.namaMapel}</td>
                <td>{jadwal.guru?.nama}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  )
}
```

## Hook Interfaces

Setiap hook mengembalikan object dengan properti berikut:

### Standard CRUD Hook
```typescript
{
  data: T[],                    // Array data
  loading: boolean,             // Loading state
  fetchEntity: () => Promise<void>,      // Fetch data
  createEntity: (data) => Promise<boolean>,  // Create new
  updateEntity: (id, data) => Promise<boolean>, // Update
  deleteEntity: (id) => Promise<boolean>  // Delete
}
```

### Special Hooks

**useAuth**
```typescript
{
  user: User | null,
  loading: boolean,
  login: (credentials) => Promise<boolean>,
  logout: () => Promise<boolean>,
  updateProfileImage: (file) => Promise<boolean>,
  getCurrentUser: () => void
}
```

**useRapor**
```typescript
{
  data: Rapor[],
  loading: boolean,
  fetchRapor: (siswaId?, tahunAjaranId?) => Promise<void>,
  generateRapor: (siswaId, tahunAjaranId) => Promise<any>,
  downloadRapor: (id) => Promise<boolean>
}
```

**useSekolah**
```typescript
{
  data: Sekolah | null,  // Single object, not array
  loading: boolean,
  fetchSekolah: () => Promise<void>,
  updateSekolah: (data) => Promise<boolean>
}
```

## Error Handling

Semua hooks sudah dilengkapi dengan:
- ✅ Toast notifications untuk success/error
- ✅ Try-catch error handling
- ✅ Console logging untuk debugging
- ✅ Loading states

Tidak perlu menambahkan error handling tambahan di component.
