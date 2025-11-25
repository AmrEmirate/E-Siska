"use client"

import { useState, useEffect } from "react"
import { usePenempatan, type Penempatan } from "@/hooks/use-penempatan"
import { useSiswa } from "@/hooks/use-siswa"
import { useKelas } from "@/hooks/use-kelas"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Loader2 } from "lucide-react"

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

  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState({
    siswaId: "",
    kelasId: "",
    tahunAjaranId: "",
  })
  const [editingId, setEditingId] = useState<string | null>(null)

  useEffect(() => {
    fetchPenempatan()
    fetchSiswa(1, 100) // Fetch all students for dropdown
    fetchKelas() // Fetch all classes for dropdown
  }, [fetchPenempatan, fetchSiswa, fetchKelas])

  const handleAdd = async () => {
    if (editingId) {
      const success = await updatePenempatan(editingId, formData)
      if (success) {
        setEditingId(null)
        setFormData({ siswaId: "", kelasId: "", tahunAjaranId: "" })
        setShowForm(false)
      }
    } else {
      const success = await createPenempatan(formData)
      if (success) {
        setFormData({ siswaId: "", kelasId: "", tahunAjaranId: "" })
        setShowForm(false)
      }
    }
  }

  const handleEdit = (placement: Penempatan) => {
    setFormData({
      siswaId: placement.siswaId,
      kelasId: placement.kelasId,
      tahunAjaranId: placement.tahunAjaranId || "",
    })
    setEditingId(placement.id)
    setShowForm(true)
  }

  const handleDelete = async (id: string) => {
    await deletePenempatan(id)
  }

  if (loading && placements.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px]">
        <Loader2 className="animate-spin text-red-600 mb-4" size={40} />
        <p className="text-gray-500 font-medium">Memuat data penempatan...</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Manajemen Penempatan Siswa</h1>
          <p className="text-gray-600 mt-1">Tempatkan siswa ke kelas</p>
        </div>
        <Button
          onClick={() => {
            setShowForm(!showForm)
            setEditingId(null)
            setFormData({ siswaId: "", kelasId: "", tahunAjaranId: "" })
          }}
          className="bg-red-600 hover:bg-red-700"
        >
          {showForm ? "Batal" : "+ Tambah Penempatan"}
        </Button>
      </div>

      {showForm && (
        <Card className="border-red-200 bg-red-50">
          <CardHeader>
            <CardTitle className="text-red-600">
              {editingId ? "Edit Penempatan" : "Tambah Penempatan Siswa"}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Siswa</label>
              <select
                className="flex h-10 w-full rounded-md border border-gray-300 bg-background px-3 py-2 text-sm"
                value={formData.siswaId}
                onChange={(e) => setFormData({ ...formData, siswaId: e.target.value })}
              >
                <option value="">Pilih Siswa</option>
                {students.map((student) => (
                  <option key={student.id} value={student.id}>
                    {student.nis} - {student.nama}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Kelas</label>
              <select
                className="flex h-10 w-full rounded-md border border-gray-300 bg-background px-3 py-2 text-sm"
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
            <Button onClick={handleAdd} className="w-full bg-red-600 hover:bg-red-700" disabled={loading}>
              {loading ? (
                <>
                  <Loader2 className="animate-spin mr-2" size={16} />
                  {editingId ? "Memperbarui..." : "Menambahkan..."}
                </>
              ) : (
                editingId ? "Update Penempatan" : "Tambah Penempatan"
              )}
            </Button>
          </CardContent>
        </Card>
      )}

      <div className="space-y-3">
        {placements.map((placement) => (
          <Card key={placement.id} className="hover:border-red-200 transition-colors">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-gray-600 font-medium">Siswa</p>
                      <p className="font-semibold text-gray-900">
                        {placement.siswa?.nama} ({placement.siswa?.nis})
                      </p>
                    </div>
                    <div>
                      <p className="text-gray-600 font-medium">Kelas</p>
                      <p className="font-semibold text-gray-900">{placement.kelas?.namaKelas}</p>
                    </div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button
                    onClick={() => handleEdit(placement)}
                    variant="outline"
                    className="border-red-200 text-red-600 hover:bg-red-50"
                  >
                    Edit
                  </Button>
                  <Button
                    onClick={() => handleDelete(placement.id)}
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
