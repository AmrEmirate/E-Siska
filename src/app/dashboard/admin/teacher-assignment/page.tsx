"use client"

import { useState, useEffect } from "react"
import { usePenugasan, type Penugasan } from "@/hooks/use-penugasan"
import { useGuru } from "@/hooks/use-guru"
import { useKelas } from "@/hooks/use-kelas"
import { useMapel } from "@/hooks/use-mapel"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Loader2 } from "lucide-react"

export default function TeacherAssignmentPage() {
  const {
    data: assignments,
    loading,
    fetchPenugasan,
    createPenugasan,
    updatePenugasan,
    deletePenugasan,
  } = usePenugasan()

  const { data: teachers, fetchGuru } = useGuru()
  const { data: classes, fetchKelas } = useKelas()
  const { data: subjects, fetchMapel } = useMapel()

  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState({
    guruId: "",
    kelasId: "",
    mapelId: "",
    tahunAjaranId: "",
  })
  const [editingId, setEditingId] = useState<string | null>(null)

  useEffect(() => {
    fetchPenugasan()
    fetchGuru(1, 100) // Fetch all teachers
    fetchKelas() // Fetch all classes
    fetchMapel() // Fetch all subjects
  }, [fetchPenugasan, fetchGuru, fetchKelas, fetchMapel])

  const handleAdd = async () => {
    if (editingId) {
      const success = await updatePenugasan(editingId, formData)
      if (success) {
        setEditingId(null)
        setFormData({ guruId: "", kelasId: "", mapelId: "", tahunAjaranId: "" })
        setShowForm(false)
      }
    } else {
      const success = await createPenugasan(formData)
      if (success) {
        setFormData({ guruId: "", kelasId: "", mapelId: "", tahunAjaranId: "" })
        setShowForm(false)
      }
    }
  }

  const handleEdit = (assignment: Penugasan) => {
    setFormData({
      guruId: assignment.guruId,
      kelasId: assignment.kelasId,
      mapelId: assignment.mapelId,
      tahunAjaranId: assignment.tahunAjaranId || "",
    })
    setEditingId(assignment.id)
    setShowForm(true)
  }

  const handleDelete = async (id: string) => {
    await deletePenugasan(id)
  }

  if (loading && assignments.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px]">
        <Loader2 className="animate-spin text-red-600 mb-4" size={40} />
        <p className="text-gray-500 font-medium">Memuat data penugasan...</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Manajemen Penugasan Guru</h1>
          <p className="text-gray-600 mt-1">Tentukan guru pengampu untuk setiap mata pelajaran dan kelas</p>
        </div>
        <Button
          onClick={() => {
            setShowForm(!showForm)
            setEditingId(null)
            setFormData({ guruId: "", kelasId: "", mapelId: "", tahunAjaranId: "" })
          }}
          className="bg-red-600 hover:bg-red-700"
        >
          {showForm ? "Batal" : "+ Tambah Penugasan"}
        </Button>
      </div>

      {showForm && (
        <Card className="border-red-200 bg-red-50">
          <CardHeader>
            <CardTitle className="text-red-600">
              {editingId ? "Edit Penugasan" : "Tambah Penugasan Guru"}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Guru</label>
              <select
                className="flex h-10 w-full rounded-md border border-gray-300 bg-background px-3 py-2 text-sm"
                value={formData.guruId}
                onChange={(e) => setFormData({ ...formData, guruId: e.target.value })}
              >
                <option value="">Pilih Guru</option>
                {teachers.map((teacher) => (
                  <option key={teacher.id} value={teacher.id}>
                    {teacher.nip} - {teacher.nama}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Mata Pelajaran</label>
              <select
                className="flex h-10 w-full rounded-md border border-gray-300 bg-background px-3 py-2 text-sm"
                value={formData.mapelId}
                onChange={(e) => setFormData({ ...formData, mapelId: e.target.value })}
              >
                <option value="">Pilih Mata Pelajaran</option>
                {subjects.map((subject) => (
                  <option key={subject.id} value={subject.id}>
                    {subject.namaMapel} ({subject.kategori})
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
                editingId ? "Update Penugasan" : "Tambah Penugasan"
              )}
            </Button>
          </CardContent>
        </Card>
      )}

      <div className="space-y-3">
        {assignments.map((assignment) => (
          <Card key={assignment.id} className="hover:border-red-200 transition-colors">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="grid grid-cols-3 gap-4 text-sm">
                    <div>
                      <p className="text-gray-600 font-medium">Guru</p>
                      <p className="font-semibold text-gray-900">{assignment.guru?.nama}</p>
                    </div>
                    <div>
                      <p className="text-gray-600 font-medium">Mata Pelajaran</p>
                      <p className="font-semibold text-gray-900">{assignment.mapel?.namaMapel}</p>
                    </div>
                    <div>
                      <p className="text-gray-600 font-medium">Kelas</p>
                      <p className="font-semibold text-gray-900">{assignment.kelas?.namaKelas}</p>
                    </div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button
                    onClick={() => handleEdit(assignment)}
                    variant="outline"
                    className="border-red-200 text-red-600 hover:bg-red-50"
                  >
                    Edit
                  </Button>
                  <Button
                    onClick={() => handleDelete(assignment.id)}
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
