"use client"

import { useState, useEffect } from "react"
import { useTingkatan, type Tingkatan } from "@/hooks/use-tingkatan"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Loader2 } from "lucide-react"

export default function ClassLevelsPage() {
  const { 
    data: levels, 
    loading, 
    fetchTingkatan, 
    createTingkatan, 
    updateTingkatan, 
    deleteTingkatan 
  } = useTingkatan()
  
  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState({ namaTingkat: "", level: "", keterangan: "" })
  const [editingId, setEditingId] = useState<string | null>(null)

  useEffect(() => {
    fetchTingkatan()
  }, [fetchTingkatan])

  const handleAdd = async () => {
    if (editingId) {
      const success = await updateTingkatan(editingId, {
        ...formData,
        level: Number(formData.level)
      })
      if (success) {
        setEditingId(null)
        setFormData({ namaTingkat: "", level: "", keterangan: "" })
        setShowForm(false)
      }
    } else {
      const success = await createTingkatan({
        ...formData,
        level: Number(formData.level)
      })
      if (success) {
        setFormData({ namaTingkat: "", level: "", keterangan: "" })
        setShowForm(false)
      }
    }
  }

  const handleEdit = (level: Tingkatan) => {
    setFormData({ 
      namaTingkat: level.namaTingkat, 
      level: String(level.level), 
      keterangan: level.keterangan || "" 
    })
    setEditingId(level.id)
    setShowForm(true)
  }

  const handleDelete = async (id: string) => {
    await deleteTingkatan(id)
  }

  if (loading && levels.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px]">
        <Loader2 className="animate-spin text-red-600 mb-4" size={40} />
        <p className="text-gray-500 font-medium">Memuat data tingkatan...</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Manajemen Tingkatan Kelas</h1>
          <p className="text-gray-600 mt-1">Kelola tingkatan dan jenjang kelas di sekolah</p>
        </div>
        <Button
          onClick={() => {
            setShowForm(!showForm)
            setEditingId(null)
            setFormData({ namaTingkat: "", level: "", keterangan: "" })
          }}
          className="bg-red-600 hover:bg-red-700"
        >
          {showForm ? "Batal" : "+ Tambah Tingkatan"}
        </Button>
      </div>

      {showForm && (
        <Card className="border-red-200 bg-red-50">
          <CardHeader>
            <CardTitle className="text-red-600">{editingId ? "Edit Tingkatan" : "Tambah Tingkatan Baru"}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nama Tingkatan</label>
                <Input
                  placeholder="Kelas 1"
                  value={formData.namaTingkat}
                  onChange={(e) => setFormData({ ...formData, namaTingkat: e.target.value })}
                  className="border-gray-300"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nomor Level</label>
                <Input
                  type="number"
                  placeholder="1"
                  value={formData.level}
                  onChange={(e) => setFormData({ ...formData, level: e.target.value })}
                  className="border-gray-300"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Deskripsi</label>
              <Input
                placeholder="Tingkat Kelas Satu"
                value={formData.keterangan}
                onChange={(e) => setFormData({ ...formData, keterangan: e.target.value })}
                className="border-gray-300"
              />
            </div>
            <Button onClick={handleAdd} className="w-full bg-red-600 hover:bg-red-700" disabled={loading}>
              {loading ? (
                <>
                  <Loader2 className="animate-spin mr-2" size={16} />
                  {editingId ? "Memperbarui..." : "Menambahkan..."}
                </>
              ) : (
                editingId ? "Update Tingkatan" : "Tambah Tingkatan"
              )}
            </Button>
          </CardContent>
        </Card>
      )}

      <div className="grid grid-cols-2 gap-4">
        {levels.map((level) => (
          <Card key={level.id} className="hover:border-red-200 transition-colors">
            <CardContent className="pt-6">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-semibold text-gray-900">{level.namaTingkat}</h3>
                  <p className="text-sm text-gray-600">{level.keterangan || "-"}</p>
                  <p className="text-sm text-red-600 font-medium mt-2">Level: {level.level}</p>
                </div>
                <div className="flex gap-2">
                  <Button
                    onClick={() => handleEdit(level)}
                    variant="outline"
                    className="border-red-200 text-red-600 hover:bg-red-50"
                  >
                    Edit
                  </Button>
                  <Button
                    onClick={() => handleDelete(level.id)}
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
