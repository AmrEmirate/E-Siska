# Quick Start - Integrasi Hooks ke Component yang Sudah Ada

Panduan cepat untuk menghubungkan component UI yang sudah ada dengan backend menggunakan hooks.

## Contoh 1: Mengintegrasikan ke Table Component

### Sebelum (Tanpa Backend)
```typescript
export function SiswaTable() {
  const siswaData = [
    { id: "1", nama: "John Doe", nis: "12345" },
    { id: "2", nama: "Jane Smith", nis: "12346" },
  ]

  return (
    <div>
      {siswaData.map(siswa => (
        <div key={siswa.id}>{siswa.nama}</div>
      ))}
    </div>
  )
}
```

### Sesudah (Dengan Backend)
```typescript
import { useEffect } from "react"
import { useSiswa } from "@/hooks"

export function SiswaTable() {
  // Tambahkan hook
  const { data: siswaData, loading, fetchSiswa } = useSiswa()

  // Fetch data saat component mount
  useEffect(() => {
    fetchSiswa(1, 10) // page 1, limit 10
  }, [fetchSiswa])

  // Tambahkan loading state
  if (loading) return <div>Loading...</div>

  // Render seperti biasa
  return (
    <div>
      {siswaData.map(siswa => (
        <div key={siswa.id}>{siswa.nama}</div>
      ))}
    </div>
  )
}
```

**Yang berubah:**
1. Import `useSiswa` hook
2. Ganti hardcoded data dengan `data` dari hook
3. Tambah `useEffect` untuk fetch data
4. (Optional) Tambah loading state

## Contoh 2: Form dengan Create/Update

### Sebelum (Tanpa Backend)
```typescript
export function TambahSiswaForm() {
  const [formData, setFormData] = useState({ nama: "", nis: "" })

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    console.log("Data:", formData)
    // Tidak menyimpan ke backend
  }

  return (
    <form onSubmit={handleSubmit}>
      <input 
        value={formData.nama}
        onChange={e => setFormData({...formData, nama: e.target.value})}
      />
      <button type="submit">Simpan</button>
    </form>
  )
}
```

### Sesudah (Dengan Backend)
```typescript
import { useSiswa } from "@/hooks"

export function TambahSiswaForm() {
  const [formData, setFormData] = useState({ nama: "", nis: "" })
  // Tambahkan hook
  const { createSiswa, loading } = useSiswa()

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    // Simpan ke backend
    const success = await createSiswa(formData)
    if (success) {
      // Reset form setelah berhasil
      setFormData({ nama: "", nis: "" })
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <input 
        value={formData.nama}
        onChange={e => setFormData({...formData, nama: e.target.value})}
      />
      {/* Disable button saat loading */}
      <button type="submit" disabled={loading}>
        {loading ? "Menyimpan..." : "Simpan"}
      </button>
    </form>
  )
}
```

**Yang berubah:**
1. Import `useSiswa` hook
2. Gunakan `createSiswa` dari hook
3. Ubah `handleSubmit` jadi async dan panggil `createSiswa`
4. (Optional) Disable button saat loading

## Contoh 3: Delete dengan Confirmation

### Sebelum (Tanpa Backend)
```typescript
export function SiswaCard({ siswa }: { siswa: Siswa }) {
  const handleDelete = () => {
    if (confirm("Hapus data siswa?")) {
      console.log("Delete:", siswa.id)
    }
  }

  return (
    <div>
      <h3>{siswa.nama}</h3>
      <button onClick={handleDelete}>Hapus</button>
    </div>
  )
}
```

### Sesudah (Dengan Backend)
```typescript
import { useSiswa } from "@/hooks"

export function SiswaCard({ siswa }: { siswa: Siswa }) {
  // Tambahkan hook
  const { deleteSiswa } = useSiswa()

  const handleDelete = async () => {
    if (confirm("Hapus data siswa?")) {
      // Hapus dari backend
      await deleteSiswa(siswa.id)
      // Hook otomatis refresh data dan tampilkan toast
    }
  }

  return (
    <div>
      <h3>{siswa.nama}</h3>
      <button onClick={handleDelete}>Hapus</button>
    </div>
  )
}
```

**Yang berubah:**
1. Import `useSiswa` hook
2. Gunakan `deleteSiswa` dari hook
3. Ubah `handleDelete` jadi async dan panggil `deleteSiswa`

## Contoh 4: Login Page

```typescript
"use client"

import { useState } from "react"
import { useAuth } from "@/hooks"
import { useRouter } from "next/navigation"

export function LoginPage() {
  const router = useRouter()
  const { login, loading } = useAuth()
  const [credentials, setCredentials] = useState({
    username: "",
    password: ""
  })

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    const success = await login(credentials)
    if (success) {
      router.push("/dashboard")
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Username"
        value={credentials.username}
        onChange={e => setCredentials({
          ...credentials,
          username: e.target.value
        })}
      />
      <input
        type="password"
        placeholder="Password"
        value={credentials.password}
        onChange={e => setCredentials({
          ...credentials,
          password: e.target.value
        })}
      />
      <button type="submit" disabled={loading}>
        {loading ? "Loading..." : "Login"}
      </button>
    </form>
  )
}
```

## Checklist Integrasi

Saat mengintegrasikan hook ke component:

- [ ] Import hook yang sesuai dari `@/hooks`
- [ ] Destructure fungsi yang dibutuhkan dari hook
- [ ] Tambahkan `useEffect` untuk fetch data (jika perlu)
- [ ] Replace hardcoded data dengan `data` dari hook
- [ ] Gunakan `loading` state untuk UI feedback
- [ ] Panggil fungsi CRUD di event handler
- [ ] (Optional) Handle error dengan custom logic jika perlu

## Tips

1. **Jangan lupa `useEffect` dependency**: Selalu include fungsi fetch di dependency array
2. **Loading State**: Gunakan untuk disable button atau tampilkan spinner
3. **Error Handling**: Hook sudah include toast notification, tidak perlu handle manual
4. **Data Refresh**: Setelah create/update/delete, data otomatis di-refresh
5. **Type Safety**: Import interface dari hook untuk type-safe form data

## Pattern Umum

```typescript
// 1. Import hook
import { useEntity } from "@/hooks"

// 2. Di component
const { data, loading, fetchEntity, createEntity } = useEntity()

// 3. Fetch data
useEffect(() => {
  fetchEntity()
}, [fetchEntity])

// 4. Render dengan loading
if (loading) return <div>Loading...</div>

// 5. Render data
return <div>{data.map(...)}</div>
```

Selamat mengintegrasikan! 🎉
