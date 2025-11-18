"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

interface TeacherAssignment {
  id: string
  teacherId: string
  teacherName: string
  subjectId: string
  subjectName: string
  classId: string
  className: string
}

const initialAssignments: TeacherAssignment[] = [
  {
    id: "1",
    teacherId: "T001",
    teacherName: "Ibu Siti Nurhaliza",
    subjectId: "S001",
    subjectName: "Matematika",
    classId: "C1A",
    className: "Kelas 1A",
  },
  {
    id: "2",
    teacherId: "T002",
    teacherName: "Pak Ahmad Wijaya",
    subjectId: "S002",
    subjectName: "Bahasa Indonesia",
    classId: "C1B",
    className: "Kelas 1B",
  },
  {
    id: "3",
    teacherId: "T001",
    teacherName: "Ibu Siti Nurhaliza",
    subjectId: "S001",
    subjectName: "Matematika",
    classId: "C2A",
    className: "Kelas 2A",
  },
]

export default function TeacherAssignmentPage() {
  const [assignments, setAssignments] = useState(initialAssignments)
  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState({
    teacherId: "",
    teacherName: "",
    subjectId: "",
    subjectName: "",
    classId: "",
    className: "",
  })
  const [editingId, setEditingId] = useState<string | null>(null)

  const handleAdd = () => {
    if (editingId) {
      setAssignments(assignments.map((a) => (a.id === editingId ? { ...a, ...formData } : a)))
      setEditingId(null)
    } else {
      const newAssignment: TeacherAssignment = {
        id: String(assignments.length + 1),
        ...formData,
      }
      setAssignments([...assignments, newAssignment])
    }
    setFormData({ teacherId: "", teacherName: "", subjectId: "", subjectName: "", classId: "", className: "" })
    setShowForm(false)
  }

  const handleEdit = (assignment: TeacherAssignment) => {
    setFormData(assignment)
    setEditingId(assignment.id)
    setShowForm(true)
  }

  const handleDelete = (id: string) => {
    setAssignments(assignments.filter((a) => a.id !== id))
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
            setFormData({ teacherId: "", teacherName: "", subjectId: "", subjectName: "", classId: "", className: "" })
          }}
          className="bg-red-600 hover:bg-red-700"
        >
          {showForm ? "Batal" : "+ Tambah Penugasan"}
        </Button>
      </div>

      {showForm && (
        <Card className="border-red-200 bg-red-50">
          <CardHeader>
            <CardTitle className="text-red-600">{editingId ? "Edit Penugasan" : "Tambah Penugasan Guru"}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">ID Guru</label>
                <Input
                  placeholder="T001"
                  value={formData.teacherId}
                  onChange={(e) => setFormData({ ...formData, teacherId: e.target.value })}
                  className="border-gray-300"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nama Guru</label>
                <Input
                  placeholder="Ibu Siti Nurhaliza"
                  value={formData.teacherName}
                  onChange={(e) => setFormData({ ...formData, teacherName: e.target.value })}
                  className="border-gray-300"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">ID Mata Pelajaran</label>
                <Input
                  placeholder="S001"
                  value={formData.subjectId}
                  onChange={(e) => setFormData({ ...formData, subjectId: e.target.value })}
                  className="border-gray-300"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nama Mata Pelajaran</label>
                <Input
                  placeholder="Matematika"
                  value={formData.subjectName}
                  onChange={(e) => setFormData({ ...formData, subjectName: e.target.value })}
                  className="border-gray-300"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">ID Kelas</label>
                <Input
                  placeholder="C1A"
                  value={formData.classId}
                  onChange={(e) => setFormData({ ...formData, classId: e.target.value })}
                  className="border-gray-300"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nama Kelas</label>
                <Input
                  placeholder="Kelas 1A"
                  value={formData.className}
                  onChange={(e) => setFormData({ ...formData, className: e.target.value })}
                  className="border-gray-300"
                />
              </div>
            </div>
            <Button onClick={handleAdd} className="w-full bg-red-600 hover:bg-red-700">
              {editingId ? "Update Penugasan" : "Tambah Penugasan"}
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
                      <p className="font-semibold text-gray-900">{assignment.teacherName}</p>
                    </div>
                    <div>
                      <p className="text-gray-600 font-medium">Mata Pelajaran</p>
                      <p className="font-semibold text-gray-900">{assignment.subjectName}</p>
                    </div>
                    <div>
                      <p className="text-gray-600 font-medium">Kelas</p>
                      <p className="font-semibold text-gray-900">{assignment.className}</p>
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
