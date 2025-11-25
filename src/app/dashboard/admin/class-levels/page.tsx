"use client"

import { useState, useEffect } from "react"
import { useTingkatan, type Tingkatan } from "@/hooks/use-tingkatan"
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
import { Loader2, Plus, Pencil, Trash2, Layers, GraduationCap } from "lucide-react"
import { Badge } from "@/components/ui/badge"

export default function ClassLevelsPage() {
  const { 
    data: levels, 
    loading, 
    fetchTingkatan, 
    createTingkatan, 
    updateTingkatan, 
    deleteTingkatan 
  } = useTingkatan()
  
  const [isAddOpen, setIsAddOpen] = useState(false)
  const [isEditOpen, setIsEditOpen] = useState(false)
  const [formData, setFormData] = useState({ namaTingkat: "", level: "", keterangan: "" })
  const [selectedLevel, setSelectedLevel] = useState<Tingkatan | null>(null)

  useEffect(() => {
    fetchTingkatan()
  }, [fetchTingkatan])

  const resetForm = () => {
    setFormData({ namaTingkat: "", level: "", keterangan: "" })
    setSelectedLevel(null)
  }

  const handleAdd = async () => {
    const success = await createTingkatan({
      ...formData,
      level: Number(formData.level)
    })
    if (success) {
      setIsAddOpen(false)
      resetForm()
    }
  }

  const handleEdit = async () => {
    if (!selectedLevel) return
    const success = await updateTingkatan(selectedLevel.id, {
      ...formData,
      level: Number(formData.level)
    })
    if (success) {
      setIsEditOpen(false)
      resetForm()
    }
  }

  const openEdit = (level: Tingkatan) => {
    setSelectedLevel(level)
    setFormData({ 
      namaTingkat: level.namaTingkat, 
      level: String(level.level), 
      keterangan: level.keterangan || "" 
    })
    setIsEditOpen(true)
  }

  const handleDelete = async (id: string) => {
    await deleteTingkatan(id)
  }

  return (
    <div className="p-8 space-y-8 bg-gray-50/50 min-h-screen">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Manajemen Tingkatan Kelas</h1>
          <p className="text-gray-500 mt-2">Kelola tingkatan dan jenjang kelas di sekolah.</p>
        </div>
        <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
          <DialogTrigger asChild>
            <Button className="bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-600/20 transition-all hover:scale-105" onClick={resetForm}>
              <Plus className="w-4 h-4 mr-2" />
              Tambah Tingkatan
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Tambah Tingkatan Baru</DialogTitle>
              <DialogDescription>
                Buat tingkatan kelas baru (contoh: Kelas 10, Kelas 11).
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-6 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="nama">Nama Tingkatan</Label>
                  <Input
                    id="nama"
                    placeholder="Contoh: Kelas 10"
                    value={formData.namaTingkat}
                    onChange={(e) => setFormData({ ...formData, namaTingkat: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="level">Nomor Level</Label>
                  <Input
                    id="level"
                    type="number"
                    placeholder="10"
                    value={formData.level}
                    onChange={(e) => setFormData({ ...formData, level: e.target.value })}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="keterangan">Deskripsi</Label>
                <Input
                  id="keterangan"
                  placeholder="Tingkat pertama sekolah menengah atas"
                  value={formData.keterangan}
                  onChange={(e) => setFormData({ ...formData, keterangan: e.target.value })}
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit" onClick={handleAdd} disabled={loading || !formData.namaTingkat || !formData.level}>
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
            <Layers className="w-5 h-5 text-blue-600" />
            <h2 className="text-lg font-semibold text-gray-900">Daftar Tingkatan</h2>
          </div>
          <div className="text-sm text-gray-500">
            Total: <span className="font-semibold text-gray-900">{levels.length} Tingkatan</span>
          </div>
        </div>

        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="bg-gray-50/50 hover:bg-gray-50/50">
                <TableHead>Level</TableHead>
                <TableHead>Nama Tingkatan</TableHead>
                <TableHead>Deskripsi</TableHead>
                <TableHead className="text-right">Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading && levels.length === 0 ? (
                [...Array(3)].map((_, i) => (
                  <TableRow key={i}>
                    <TableCell><div className="h-8 w-8 bg-gray-200 rounded animate-pulse" /></TableCell>
                    <TableCell><div className="h-4 w-32 bg-gray-200 rounded animate-pulse" /></TableCell>
                    <TableCell><div className="h-4 w-48 bg-gray-200 rounded animate-pulse" /></TableCell>
                    <TableCell><div className="h-8 w-8 bg-gray-200 rounded animate-pulse ml-auto" /></TableCell>
                  </TableRow>
                ))
              ) : levels.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={4} className="text-center py-12 text-gray-500">
                    <div className="flex flex-col items-center justify-center gap-2">
                      <GraduationCap className="w-8 h-8 text-gray-300" />
                      <p>Belum ada tingkatan kelas</p>
                    </div>
                  </TableCell>
                </TableRow>
              ) : (
                levels.map((level) => (
                  <TableRow key={level.id} className="hover:bg-gray-50 transition-colors">
                    <TableCell>
                      <div className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-100 text-blue-700 font-bold text-sm">
                        {level.level}
                      </div>
                    </TableCell>
                    <TableCell>
                      <span className="font-medium text-gray-900">{level.namaTingkat}</span>
                    </TableCell>
                    <TableCell>
                      <span className="text-gray-600">{level.keterangan || "-"}</span>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 hover:bg-blue-50 hover:text-blue-600"
                          onClick={() => openEdit(level)}
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
                              <AlertDialogTitle>Hapus Tingkatan?</AlertDialogTitle>
                              <AlertDialogDescription>
                                Tingkatan ini akan dihapus. Pastikan tidak ada kelas yang terhubung dengan tingkatan ini.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Batal</AlertDialogCancel>
                              <AlertDialogAction onClick={() => handleDelete(level.id)} className="bg-red-600 hover:bg-red-700">
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
            <DialogTitle>Edit Tingkatan</DialogTitle>
            <DialogDescription>
              Perbarui informasi tingkatan kelas.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-6 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="edit-nama">Nama Tingkatan</Label>
                <Input
                  id="edit-nama"
                  value={formData.namaTingkat}
                  onChange={(e) => setFormData({ ...formData, namaTingkat: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-level">Nomor Level</Label>
                <Input
                  id="edit-level"
                  type="number"
                  value={formData.level}
                  onChange={(e) => setFormData({ ...formData, level: e.target.value })}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-keterangan">Deskripsi</Label>
              <Input
                id="edit-keterangan"
                value={formData.keterangan}
                onChange={(e) => setFormData({ ...formData, keterangan: e.target.value })}
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit" onClick={handleEdit} disabled={loading || !formData.namaTingkat || !formData.level}>
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
