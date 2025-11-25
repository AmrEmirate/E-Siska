"use client"

import { useState, useEffect } from "react"
import { useRuangan, type Ruangan } from "@/hooks/use-ruangan"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Loader2, Plus, Pencil, Trash2 } from "lucide-react"
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

export default function RoomsManagementPage() {
  const { 
    data: rooms, 
    loading, 
    fetchRuangan, 
    createRuangan, 
    updateRuangan, 
    deleteRuangan 
  } = useRuangan()
  
  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState({ namaRuangan: "", kapasitas: "", lokasi: "", keterangan: "" })
  const [editingId, setEditingId] = useState<string | null>(null)

  useEffect(() => {
    fetchRuangan()
  }, [fetchRuangan])

  const handleAdd = async () => {
    if (editingId) {
      const success = await updateRuangan(editingId, {
        ...formData,
        kapasitas: Number(formData.kapasitas)
      })
      if (success) {
        setEditingId(null)
        setFormData({ namaRuangan: "", kapasitas: "", lokasi: "", keterangan: "" })
        setShowForm(false)
      }
    } else {
      const success = await createRuangan({
        ...formData,
        kapasitas: Number(formData.kapasitas)
      })
      if (success) {
        setFormData({ namaRuangan: "", kapasitas: "", lokasi: "", keterangan: "" })
        setShowForm(false)
      }
    }
  }

  const handleEdit = (room: Ruangan) => {
    setFormData({
      namaRuangan: room.namaRuangan,
      kapasitas: String(room.kapasitas),
      lokasi: room.lokasi || "",
      keterangan: room.keterangan || "",
    })
    setEditingId(room.id)
    setShowForm(true)
  }

  const handleDelete = async (id: string) => {
    await deleteRuangan(id)
  }

  if (loading && rooms.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px]">
        <Loader2 className="animate-spin text-red-600 mb-4" size={40} />
        <p className="text-gray-500 font-medium">Memuat data ruangan...</p>
      </div>
    )
  }

  return (
    <div className="p-8 space-y-8 bg-gray-50/50 min-h-screen">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Manajemen Ruangan</h1>
          <p className="text-gray-500 mt-2">Kelola data ruangan dan kapasitas kelas.</p>
        </div>
        <Button
          onClick={() => {
            setShowForm(!showForm)
            setEditingId(null)
            setFormData({ namaRuangan: "", kapasitas: "", lokasi: "", keterangan: "" })
          }}
          className="bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-600/20 transition-all hover:scale-105"
        >
          {showForm ? "Batal" : (
            <>
              <Plus className="w-4 h-4 mr-2" />
              Tambah Ruangan
            </>
          )}
        </Button>
      </div>

      {showForm && (
        <Card className="border-blue-100 shadow-lg animate-in slide-in-from-top-4 duration-200">
          <CardHeader className="bg-blue-50/50 border-b border-blue-100">
            <CardTitle className="text-blue-900">{editingId ? "Edit Ruangan" : "Tambah Ruangan Baru"}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6 pt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Nama Ruangan</label>
                <Input
                  placeholder="Contoh: Ruang Kelas 1A"
                  value={formData.namaRuangan}
                  onChange={(e) => setFormData({ ...formData, namaRuangan: e.target.value })}
                  className="border-gray-200 focus:border-blue-500"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Kapasitas (Siswa)</label>
                <Input
                  type="number"
                  placeholder="Contoh: 35"
                  value={formData.kapasitas}
                  onChange={(e) => setFormData({ ...formData, kapasitas: e.target.value })}
                  className="border-gray-200 focus:border-blue-500"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Lokasi</label>
                <Input
                  placeholder="Contoh: Gedung A - Lantai 1"
                  value={formData.lokasi}
                  onChange={(e) => setFormData({ ...formData, lokasi: e.target.value })}
                  className="border-gray-200 focus:border-blue-500"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Keterangan</label>
                <Input
                  placeholder="Keterangan tambahan (opsional)"
                  value={formData.keterangan}
                  onChange={(e) => setFormData({ ...formData, keterangan: e.target.value })}
                  className="border-gray-200 focus:border-blue-500"
                />
              </div>
            </div>
            <div className="flex justify-end pt-2">
              <Button onClick={handleAdd} className="bg-blue-600 hover:bg-blue-700 min-w-[150px]" disabled={loading}>
                {loading ? (
                  <>
                    <Loader2 className="animate-spin mr-2" size={16} />
                    {editingId ? "Menyimpan..." : "Menambahkan..."}
                  </>
                ) : (
                  editingId ? "Simpan Perubahan" : "Simpan Data"
                )}
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {loading && rooms.length === 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="bg-white border border-gray-200 rounded-xl p-6 h-40 animate-pulse">
              <div className="h-6 w-1/3 bg-gray-200 rounded mb-4" />
              <div className="h-4 w-1/2 bg-gray-200 rounded mb-2" />
              <div className="h-4 w-1/4 bg-gray-200 rounded" />
            </div>
          ))}
        </div>
      ) : rooms.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-xl border border-dashed border-gray-300">
          <div className="flex flex-col items-center justify-center gap-2">
            <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mb-2">
              <Plus className="w-6 h-6 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900">Belum ada data ruangan</h3>
            <p className="text-gray-500">Mulai dengan menambahkan ruangan baru.</p>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {rooms.map((room) => (
            <Card key={room.id} className="group hover:shadow-lg hover:border-blue-200 transition-all duration-200 relative overflow-hidden">
              <CardContent className="pt-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-1">{room.namaRuangan}</h3>
                    <div className="flex items-center text-sm text-gray-500">
                      <span className="bg-gray-100 px-2 py-0.5 rounded text-xs font-medium text-gray-600">
                        {room.lokasi || "Lokasi tidak set"}
                      </span>
                    </div>
                  </div>
                  <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Button
                      onClick={() => handleEdit(room)}
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 hover:bg-blue-50 hover:text-blue-600"
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
                          <AlertDialogTitle>Hapus Ruangan?</AlertDialogTitle>
                          <AlertDialogDescription>
                            Tindakan ini akan menghapus ruangan <strong>{room.namaRuangan}</strong> secara permanen.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Batal</AlertDialogCancel>
                          <AlertDialogAction onClick={() => handleDelete(room.id)} className="bg-red-600 hover:bg-red-700">
                            Hapus
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-100">
                    <span className="text-sm text-gray-600">Kapasitas</span>
                    <span className="font-semibold text-gray-900">{room.kapasitas} Siswa</span>
                  </div>
                  
                  {room.keterangan && (
                    <div className="text-sm text-gray-500 italic border-l-2 border-gray-200 pl-3 py-1">
                      "{room.keterangan}"
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
