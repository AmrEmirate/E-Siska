"use client"

import { useState, useEffect } from "react"
import { usePenempatan, type Penempatan } from "@/hooks/use-penempatan"
import { useSiswa } from "@/hooks/use-siswa"
import { useKelas } from "@/hooks/use-kelas"
import { useTahunAjaran } from "@/hooks/use-tahun-ajaran"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
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
import { Loader2, Plus, Pencil, Trash2, User, Users, GraduationCap } from "lucide-react"
import { Badge } from "@/components/ui/badge"

export default function StudentPlacementPage() {
  const {
    data: placements,
    loading,
    fetchPenempatan,
    createPenempatan,
    updatePenempatan,
    deletePenempatan,
  } = usePenempatan()

  const { data: students, fetchSiswa } = useSiswa()
  const { data: classes, fetchKelas } = useKelas()
  const { data: academicYears, fetchTahunAjaran } = useTahunAjaran()

  const [isAddOpen, setIsAddOpen] = useState(false)
  const [isEditOpen, setIsEditOpen] = useState(false)
  const [formData, setFormData] = useState({
    siswaId: "",
    kelasId: "",
    tahunAjaranId: "",
  })
  const [selectedPlacement, setSelectedPlacement] = useState<Penempatan | null>(null)

  useEffect(() => {
    fetchPenempatan()
    fetchSiswa(1, 100)
    fetchKelas()
    fetchTahunAjaran()
  }, [fetchPenempatan, fetchSiswa, fetchKelas, fetchTahunAjaran])

  const activeYear = academicYears.find(y => y.isActive)

  // Auto-set active academic year when opening add modal
  useEffect(() => {
    if (isAddOpen && activeYear) {
      setFormData(prev => ({ ...prev, tahunAjaranId: activeYear.id }))
    }
  }, [isAddOpen, activeYear])

  const resetForm = () => {
    setFormData({
      siswaId: "",
      kelasId: "",
      tahunAjaranId: activeYear?.id || "",
    })
    setSelectedPlacement(null)
  }

  const handleAdd = async () => {
    const success = await createPenempatan(formData)
    if (success) {
      setIsAddOpen(false)
      resetForm()
    }
  }

  const handleEdit = async () => {
    if (!selectedPlacement) return
    const success = await updatePenempatan(selectedPlacement.id, formData)
    if (success) {
      setIsEditOpen(false)
      resetForm()
    }
  }

  const openEdit = (placement: Penempatan) => {
    setSelectedPlacement(placement)
    setFormData({
      siswaId: placement.siswaId,
      kelasId: placement.kelasId,
      tahunAjaranId: placement.tahunAjaranId || activeYear?.id || "",
    })
    setIsEditOpen(true)
  }

  const handleDelete = async (id: string) => {
    await deletePenempatan(id)
  }

  return (
    <div className="p-8 space-y-8 bg-gray-50/50 min-h-screen">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Manajemen Penempatan Siswa</h1>
          <p className="text-gray-500 mt-2">Tempatkan siswa ke dalam kelas yang sesuai.</p>
        </div>
        <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
          <DialogTrigger asChild>
            <Button className="bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-600/20 transition-all hover:scale-105" onClick={resetForm}>
              <Plus className="w-4 h-4 mr-2" />
              Tambah Penempatan
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Tambah Penempatan Siswa</DialogTitle>
              <DialogDescription>
                Pilih siswa dan kelas untuk menempatkan siswa.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-6 py-4">
              <div className="space-y-2">
                <Label htmlFor="siswa">Siswa</Label>
                <select
                  id="siswa"
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  value={formData.siswaId}
                  onChange={(e) => setFormData({ ...formData, siswaId: e.target.value })}
                >
                  <option value="">Pilih Siswa</option>
                  {students.map((student) => (
                    <option key={student.id} value={student.id}>
                      {student.nama} ({student.nis})
                    </option>
                  ))}
                </select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="kelas">Kelas</Label>
                <select
                  id="kelas"
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  value={formData.kelasId}
                  onChange={(e) => setFormData({ ...formData, kelasId: e.target.value })}
                >
                  <option value="">Pilih Kelas</option>
                  {classes.map((kelas) => (
                    <option key={kelas.id} value={kelas.id}>
                      {kelas.namaKelas}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <DialogFooter>
              <Button type="submit" onClick={handleAdd} disabled={loading || !formData.siswaId || !formData.kelasId}>
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Menyimpan...
                  </>
                ) : (
                  "Simpan"
                )}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-6 border-b border-gray-200 flex flex-col sm:flex-row justify-between items-center gap-4 bg-gray-50/30">
          <div className="flex items-center gap-2">
            <Users className="w-5 h-5 text-blue-600" />
            <h2 className="text-lg font-semibold text-gray-900">Daftar Penempatan</h2>
          </div>
          <div className="text-sm text-gray-500">
            Total: <span className="font-semibold text-gray-900">{placements.length} Siswa</span>
          </div>
        </div>

        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="bg-gray-50/50 hover:bg-gray-50/50">
                <TableHead>Siswa</TableHead>
                <TableHead>Kelas</TableHead>
                <TableHead>Tahun Ajaran</TableHead>
                <TableHead className="text-right">Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading && placements.length === 0 ? (
                [...Array(5)].map((_, i) => (
                  <TableRow key={i}>
                    <TableCell><div className="h-4 w-40 bg-gray-200 rounded animate-pulse" /></TableCell>
                    <TableCell><div className="h-4 w-20 bg-gray-200 rounded animate-pulse" /></TableCell>
                    <TableCell><div className="h-4 w-24 bg-gray-200 rounded animate-pulse" /></TableCell>
                    <TableCell><div className="h-8 w-8 bg-gray-200 rounded animate-pulse ml-auto" /></TableCell>
                  </TableRow>
                ))
              ) : placements.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={4} className="text-center py-12 text-gray-500">
                    <div className="flex flex-col items-center justify-center gap-2">
                      <User className="w-8 h-8 text-gray-300" />
                      <p>Belum ada penempatan siswa</p>
                    </div>
                  </TableCell>
                </TableRow>
              ) : (
                placements.map((placement) => (
                  <TableRow key={placement.id} className="hover:bg-gray-50 transition-colors">
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-xs">
                          {placement.siswa?.nama.charAt(0)}
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">{placement.siswa?.nama}</p>
                          <p className="text-xs text-gray-500">{placement.siswa?.nis}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="secondary" className="bg-blue-50 text-blue-700 hover:bg-blue-100">
                        {placement.kelas?.namaKelas}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <span className="text-sm text-gray-500">
                        {placement.tahunAjaran ? `${placement.tahunAjaran.tahun} - ${placement.tahunAjaran.semester}` : "-"}
                      </span>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 hover:bg-blue-50 hover:text-blue-600"
                          onClick={() => openEdit(placement)}
                        >
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
                              <AlertDialogTitle>Hapus Penempatan?</AlertDialogTitle>
                              <AlertDialogDescription>
                                Penempatan ini akan dihapus. Siswa tidak akan terdaftar di kelas ini lagi.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Batal</AlertDialogCancel>
                              <AlertDialogAction onClick={() => handleDelete(placement.id)} className="bg-red-600 hover:bg-red-700">
                                Hapus
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
      </div>

      {/* Edit Modal */}
      <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Edit Penempatan</DialogTitle>
            <DialogDescription>
              Perbarui informasi penempatan siswa.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-6 py-4">
            <div className="space-y-2">
              <Label htmlFor="edit-siswa">Siswa</Label>
              <select
                id="edit-siswa"
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                value={formData.siswaId}
                onChange={(e) => setFormData({ ...formData, siswaId: e.target.value })}
              >
                <option value="">Pilih Siswa</option>
                {students.map((student) => (
                  <option key={student.id} value={student.id}>
                    {student.nama} ({student.nis})
                  </option>
                ))}
              </select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-kelas">Kelas</Label>
              <select
                id="edit-kelas"
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                value={formData.kelasId}
                onChange={(e) => setFormData({ ...formData, kelasId: e.target.value })}
              >
                <option value="">Pilih Kelas</option>
                {classes.map((kelas) => (
                  <option key={kelas.id} value={kelas.id}>
                    {kelas.namaKelas}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <DialogFooter>
            <Button type="submit" onClick={handleEdit} disabled={loading || !formData.siswaId || !formData.kelasId}>
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Menyimpan...
                </>
              ) : (
                "Simpan Perubahan"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
