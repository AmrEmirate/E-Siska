"use client"

import { useState, useEffect } from "react"
import { useTahunAjaran, type TahunAjaran } from "@/hooks/use-tahun-ajaran"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Loader2 } from "lucide-react"

export default function AcademicYearsPage() {
  const { 
    data: years, 
    loading, 
    fetchTahunAjaran, 
    createTahunAjaran, 
    updateTahunAjaran, 
    deleteTahunAjaran,
    setActiveTahunAjaran 
  } = useTahunAjaran()
  
  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState({ 
    tahun: "", 
    semester: "Ganjil" as "Ganjil" | "Genap", 
    tanggalMulai: "", 
    tanggalSelesai: "" 
  })
  const [editingId, setEditingId] = useState<string | null>(null)

  useEffect(() => {
    fetchTahunAjaran()
  }, [fetchTahunAjaran])

  const handleAdd = async () => {
    if (editingId) {
      const success = await updateTahunAjaran(editingId, formData)
      if (success) {
        setEditingId(null)
        setFormData({ tahun: "", semester: "Ganjil", tanggalMulai: "", tanggalSelesai: "" })
        setShowForm(false)
      }
    } else {
      const success = await createTahunAjaran(formData)
      if (success) {
        setFormData({ tahun: "", semester: "Ganjil", tanggalMulai: "", tanggalSelesai: "" })
        setShowForm(false)
      }
    }
  }

  const handleSetActive = async (id: string) => {
    await setActiveTahunAjaran(id)
  }

  const handleEdit = (year: TahunAjaran) => {
    setFormData({
      tahun: year.tahun,
      semester: year.semester,
      tanggalMulai: year.tanggalMulai,
      tanggalSelesai: year.tanggalSelesai,
    })
    setEditingId(year.id)
    setShowForm(true)
  }

  const handleDelete = async (id: string) => {
    await deleteTahunAjaran(id)
  }

  if (loading && years.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px]">
        <Loader2 className="animate-spin text-red-600 mb-4" size={40} />
        <p className="text-gray-500 font-medium">Memuat data tahun ajaran...</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Manajemen Tahun Ajaran</h1>
          <p className="text-gray-600 mt-1">Kelola tahun ajaran dan periode pembelajaran</p>
        </div>
        <Button
          onClick={() => {
            setShowForm(!showForm)
            setEditingId(null)
            setFormData({ tahun: "", semester: "Ganjil", tanggalMulai: "", tanggalSelesai: "" })
          }}
          className="bg-red-600 hover:bg-red-700"
        >
          {showForm ? "Batal" : "+ Tambah Tahun"}
        </Button>
      </div>

      {showForm && (
        <Card className="border-red-200 bg-red-50">
          <CardHeader>
            <CardTitle className="text-red-600">
              {editingId ? "Edit Tahun Ajaran" : "Tambah Tahun Ajaran Baru"}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Tahun Ajaran</label>
              <Input
                placeholder="2024/2025"
                value={formData.tahun}
                onChange={(e) => setFormData({ ...formData, tahun: e.target.value })}
                className="border-gray-300"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Semester</label>
              <select
                className="flex h-10 w-full rounded-md border border-gray-300 bg-background px-3 py-2 text-sm"
                value={formData.semester}
                onChange={(e) => setFormData({ ...formData, semester: e.target.value as "Ganjil" | "Genap" })}
              >
                <option value="Ganjil">Ganjil</option>
                <option value="Genap">Genap</option>
              </select>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Tanggal Mulai</label>
                <Input
                  type="date"
                  value={formData.tanggalMulai}
                  onChange={(e) => setFormData({ ...formData, tanggalMulai: e.target.value })}
                  className="border-gray-300"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Tanggal Selesai</label>
                <Input
                  type="date"
                  value={formData.tanggalSelesai}
                  onChange={(e) => setFormData({ ...formData, tanggalSelesai: e.target.value })}
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
                editingId ? "Update Tahun Ajaran" : "Tambah Tahun Ajaran"
              )}
            </Button>
          </CardContent>
        </Card>
      )}

      <div className="space-y-4">
        {years.map((year) => (
          <Card
            key={year.id}
            className={`hover:border-red-200 transition-colors ${year.isActive ? "border-red-300 bg-red-50" : ""}`}
          >
            <CardContent className="pt-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3">
                    <h3 className="font-semibold text-gray-900">
                      Tahun Ajaran {year.tahun} - Semester {year.semester}
                    </h3>
                    {year.isActive && (
                      <span className="px-3 py-1 bg-red-600 text-white text-xs font-semibold rounded-full">Aktif</span>
                    )}
                  </div>
                  <p className="text-sm text-gray-500 mt-1">
                    {new Date(year.tanggalMulai).toLocaleDateString('id-ID')} - {new Date(year.tanggalSelesai).toLocaleDateString('id-ID')}
                  </p>
                </div>
                <div className="flex gap-2">
                  {!year.isActive && (
                    <Button 
                      onClick={() => handleSetActive(year.id)} 
                      className="bg-red-600 hover:bg-red-700"
                      disabled={loading}
                    >
                      Aktifkan
                    </Button>
                  )}
                  <Button
                    onClick={() => handleEdit(year)}
                    variant="outline"
                    className="border-red-200 text-red-600 hover:bg-red-50"
                  >
                    Edit
                  </Button>
                  <Button
                    onClick={() => handleDelete(year.id)}
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
