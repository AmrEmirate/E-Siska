"use client"

import { useState, useEffect } from "react"
import { useSiswa, type Siswa } from "@/hooks/use-siswa"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Label } from "@/components/ui/label"
import { Pencil, Trash2, Plus, Search } from "lucide-react"

export default function StudentsManagementPage() {
  const { data: students, meta, loading, fetchSiswa, createSiswa, updateSiswa, deleteSiswa } = useSiswa()
  const [search, setSearch] = useState("")
  const [isAddOpen, setIsAddOpen] = useState(false)
  const [isEditOpen, setIsEditOpen] = useState(false)
  const [selectedStudent, setSelectedStudent] = useState<Siswa | null>(null)
  
  // Form State
  const [formData, setFormData] = useState<Partial<Siswa>>({
    nis: "",
    nama: "",
    jenisKelamin: "L",
    status: "Aktif",
  })

  useEffect(() => {
    fetchSiswa(1, 10, search)
  }, [fetchSiswa, search])

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value)
  }

  const resetForm = () => {
    setFormData({
      nis: "",
      nama: "",
      jenisKelamin: "L",
      status: "Aktif",
    })
    setSelectedStudent(null)
  }

  const handleAdd = async () => {
    const success = await createSiswa(formData)
    if (success) {
      setIsAddOpen(false)
      resetForm()
    }
  }

  const handleEdit = async () => {
    if (!selectedStudent) return
    const success = await updateSiswa(selectedStudent.id, formData)
    if (success) {
      setIsEditOpen(false)
      resetForm()
    }
  }

  const openEdit = (student: Siswa) => {
    setSelectedStudent(student)
    setFormData({
      nis: student.nis,
      nama: student.nama,
      jenisKelamin: student.jenisKelamin,
      status: student.status,
      // Add other fields as needed
    })
    setIsEditOpen(true)
  }

  return (
    <div className="p-8 space-y-8 bg-gray-50/50 min-h-screen">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Manajemen Siswa</h1>
          <p className="text-gray-500 mt-2">Kelola data, status, dan informasi siswa.</p>
        </div>
        <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
          <DialogTrigger asChild>
            <Button className="bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-600/20 transition-all hover:scale-105" onClick={resetForm}>
              <Plus className="w-4 h-4 mr-2" />
              Tambah Siswa
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Tambah Siswa Baru</DialogTitle>
              <DialogDescription>
                Masukkan informasi lengkap siswa baru di bawah ini.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-6 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="nis">NIS</Label>
                  <Input
                    id="nis"
                    placeholder="Nomor Induk Siswa"
                    value={formData.nis}
                    onChange={(e) => setFormData({ ...formData, nis: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="nama">Nama Lengkap</Label>
                  <Input
                    id="nama"
                    placeholder="Nama Siswa"
                    value={formData.nama}
                    onChange={(e) => setFormData({ ...formData, nama: e.target.value })}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="jk">Jenis Kelamin</Label>
                  <select
                    id="jk"
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    value={formData.jenisKelamin}
                    onChange={(e) => setFormData({ ...formData, jenisKelamin: e.target.value as "L" | "P" })}
                  >
                    <option value="L">Laki-laki</option>
                    <option value="P">Perempuan</option>
                  </select>
                </div>
                {/* Status default is Aktif for new students usually, but kept if needed */}
              </div>
            </div>
            <DialogFooter>
              <Button type="submit" onClick={handleAdd} className="w-full sm:w-auto">Simpan Data</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-6 border-b border-gray-200 flex flex-col sm:flex-row justify-between items-center gap-4 bg-gray-50/30">
          <div className="relative w-full sm:max-w-sm">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input 
              placeholder="Cari berdasarkan NIS atau Nama..." 
              className="pl-10 bg-white"
              value={search}
              onChange={handleSearch}
            />
          </div>
          <div className="text-sm text-gray-500">
            Total: <span className="font-semibold text-gray-900">{meta.total} Siswa</span>
          </div>
        </div>

        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="bg-gray-50/50 hover:bg-gray-50/50">
                <TableHead className="w-[150px]">NIS</TableHead>
                <TableHead>Nama Siswa</TableHead>
                <TableHead>L/P</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                [...Array(5)].map((_, i) => (
                  <TableRow key={i}>
                    <TableCell><div className="h-4 w-24 bg-gray-200 rounded animate-pulse" /></TableCell>
                    <TableCell><div className="h-4 w-40 bg-gray-200 rounded animate-pulse" /></TableCell>
                    <TableCell><div className="h-4 w-8 bg-gray-200 rounded animate-pulse" /></TableCell>
                    <TableCell><div className="h-4 w-16 bg-gray-200 rounded animate-pulse" /></TableCell>
                    <TableCell><div className="h-8 w-8 bg-gray-200 rounded animate-pulse ml-auto" /></TableCell>
                  </TableRow>
                ))
              ) : students.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-12 text-gray-500">
                    <div className="flex flex-col items-center justify-center gap-2">
                      <Search className="w-8 h-8 text-gray-300" />
                      <p>Tidak ada data siswa yang ditemukan</p>
                    </div>
                  </TableCell>
                </TableRow>
              ) : (
                students.map((student) => (
                  <TableRow key={student.id} className="hover:bg-gray-50 transition-colors">
                    <TableCell className="font-medium font-mono text-gray-600">{student.nis}</TableCell>
                    <TableCell>
                      <div className="font-medium text-gray-900">{student.nama}</div>
                    </TableCell>
                    <TableCell>
                      <span className={`inline-flex items-center justify-center w-6 h-6 rounded-full text-xs font-medium ${
                        student.jenisKelamin === 'L' ? 'bg-blue-100 text-blue-700' : 'bg-pink-100 text-pink-700'
                      }`}>
                        {student.jenisKelamin}
                      </span>
                    </TableCell>
                    <TableCell>
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${
                        student.status === 'Aktif' 
                          ? 'bg-green-50 text-green-700 border-green-100' 
                          : 'bg-gray-100 text-gray-700 border-gray-200'
                      }`}>
                        <span className={`w-1.5 h-1.5 rounded-full mr-1.5 ${
                          student.status === 'Aktif' ? 'bg-green-500' : 'bg-gray-500'
                        }`} />
                        {student.status}
                      </span>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-blue-50 hover:text-blue-600" onClick={() => openEdit(student)}>
                          <Pencil className="w-4 h-4" />
                        </Button>
                        
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-red-50 hover:text-red-600">
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Hapus Data Siswa?</AlertDialogTitle>
                              <AlertDialogDescription>
                                Tindakan ini akan menghapus data siswa <strong>{student.nama}</strong> secara permanen.
                                Akun pengguna terkait juga akan dihapus.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Batal</AlertDialogCancel>
                              <AlertDialogAction onClick={() => deleteSiswa(student.id)} className="bg-red-600 hover:bg-red-700">
                                Hapus Permanen
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>

        {/* Pagination */}
        <div className="p-4 border-t border-gray-200 flex justify-between items-center bg-gray-50/30">
          <div className="text-sm text-gray-500">
            Halaman {meta.page} dari {meta.totalPages || 1}
          </div>
          <div className="space-x-2">
            <Button 
              variant="outline" 
              size="sm" 
              disabled={meta.page === 1}
              onClick={() => fetchSiswa(meta.page - 1, meta.limit, search)}
              className="bg-white"
            >
              Sebelumnya
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              disabled={meta.page >= meta.totalPages}
              onClick={() => fetchSiswa(meta.page + 1, meta.limit, search)}
              className="bg-white"
            >
              Selanjutnya
            </Button>
          </div>
        </div>
      </div>

      {/* Edit Modal */}
      <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Edit Data Siswa</DialogTitle>
            <DialogDescription>
              Perbarui informasi siswa di bawah ini.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-6 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="edit-nis">NIS</Label>
                <Input
                  id="edit-nis"
                  value={formData.nis}
                  onChange={(e) => setFormData({ ...formData, nis: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-nama">Nama Lengkap</Label>
                <Input
                  id="edit-nama"
                  value={formData.nama}
                  onChange={(e) => setFormData({ ...formData, nama: e.target.value })}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="edit-jk">Jenis Kelamin</Label>
                <select
                  id="edit-jk"
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  value={formData.jenisKelamin}
                  onChange={(e) => setFormData({ ...formData, jenisKelamin: e.target.value as "L" | "P" })}
                >
                  <option value="L">Laki-laki</option>
                  <option value="P">Perempuan</option>
                </select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-status">Status</Label>
                <select
                  id="edit-status"
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
                >
                  <option value="Aktif">Aktif</option>
                  <option value="Lulus">Lulus</option>
                  <option value="Keluar">Keluar</option>
                  <option value="Pindah">Pindah</option>
                </select>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button type="submit" onClick={handleEdit} className="w-full sm:w-auto">Simpan Perubahan</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
