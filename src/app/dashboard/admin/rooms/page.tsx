"use client"

import { useState, useEffect } from "react"
import { useRuangan, type Ruangan } from "@/hooks/use-ruangan"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Loader2 } from "lucide-react"

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
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Manajemen Ruangan Kelas</h1>
          <p className="text-gray-600 mt-1">Kelola data ruangan dan kapasitas kelas</p>
        </div>
        <Button
          onClick={() => {
            setShowForm(!showForm)
            setEditingId(null)
            setFormData({ namaRuangan: "", kapasitas: "", lokasi: "", keterangan: "" })
          }}
          className="bg-red-600 hover:bg-red-700"
        >
          {showForm ? "Batal" : "+ Tambah Ruangan"}
        </Button>
      </div>

      {showForm && (
        <Card className="border-red-200 bg-red-50">
          <CardHeader>
            <CardTitle className="text-red-600">{editingId ? "Edit Ruangan" : "Tambah Ruangan Baru"}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nama Ruangan</label>
                <Input
                  placeholder="Ruang Kelas 1A"
                  value={formData.namaRuangan}
                  onChange={(e) => setFormData({ ...formData, namaRuangan: e.target.value })}
                  className="border-gray-300"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Kapasitas</label>
                <Input
                  type="number"
                  placeholder="35"
                  value={formData.kapasitas}
                  onChange={(e) => setFormData({ ...formData, kapasitas: e.target.value })}
                  className="border-gray-300"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Lokasi</label>
                <Input
                  placeholder="Gedung A - Lantai 1"
                  value={formData.lokasi}
                  onChange={(e) => setFormData({ ...formData, lokasi: e.target.value })}
                  className="border-gray-300"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Keterangan</label>
                <Input
                  placeholder="Keterangan tambahan"
                  value={formData.keterangan}
                  onChange={(e) => setFormData({ ...formData, keterangan: e.target.value })}
                  className="border-gray-300"
                />
              </div>
            </div>
            <Button onClick={handleAdd} className="w-full bg-red-600 hover:bg-red-700" disabled={loading}>
              {loading ? (
                <>
                  <Loader2 className="animate-spin mr-2" size={16} />
                  {editingId ? "Memperbarui..." : "Menambahkan..."}
                </>
              ) : (
                editingId ? "Update Ruangan" : "Tambah Ruangan"
              )}
            </Button>
          </CardContent>
        </Card>
      )}

      <div className="grid gap-4">
        {rooms.map((room) => (
          <Card key={room.id} className="hover:border-red-200 transition-colors">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold text-gray-900">{room.namaRuangan}</h3>
                  <p className="text-sm text-gray-600">
                    {room.lokasi || "Lokasi tidak tersedia"}
                  </p>
                  <p className="text-sm text-red-600 font-medium mt-1">Kapasitas: {room.kapasitas} siswa</p>
                  {room.keterangan && (
                    <p className="text-sm text-gray-500 mt-1">{room.keterangan}</p>
                  )}
                </div>
                <div className="flex gap-2">
                  <Button
                    onClick={() => handleEdit(room)}
                    variant="outline"
                    className="border-red-200 text-red-600 hover:bg-red-50"
                  >
                    Edit
                  </Button>
                  <Button
                    onClick={() => handleDelete(room.id)}
                    variant="destructive"
                    className="bg-red-600 hover:bg-red-700"
                    disabled={loading}
                  >
                    Hapus
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
