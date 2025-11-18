"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

interface StudentPlacement {
  id: string
  nisn: string
  studentName: string
  classId: string
  className: string
  roomId: string
  roomName: string
  waliKelasId: string
  waliKelasName: string
}

const initialPlacements: StudentPlacement[] = [
  {
    id: "1",
    nisn: "0001",
    studentName: "Ahmad Rizki Pratama",
    classId: "C1A",
    className: "Kelas 1A",
    roomId: "R101",
    roomName: "Ruang Kelas 1A",
    waliKelasId: "T001",
    waliKelasName: "Ibu Siti Nurhaliza",
  },
  {
    id: "2",
    nisn: "0002",
    studentName: "Budi Santoso",
    classId: "C1A",
    className: "Kelas 1A",
    roomId: "R101",
    roomName: "Ruang Kelas 1A",
    waliKelasId: "T001",
    waliKelasName: "Ibu Siti Nurhaliza",
  },
  {
    id: "3",
    nisn: "0003",
    studentName: "Citra Dewi",
    classId: "C1B",
    className: "Kelas 1B",
    roomId: "R102",
    roomName: "Ruang Kelas 1B",
    waliKelasId: "T002",
    waliKelasName: "Pak Ahmad Wijaya",
  },
]

export default function StudentPlacementPage() {
  const [placements, setPlacements] = useState(initialPlacements)
  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState({
    nisn: "",
    studentName: "",
    classId: "",
    className: "",
    roomId: "",
    roomName: "",
    waliKelasId: "",
    waliKelasName: "",
  })
  const [editingId, setEditingId] = useState<string | null>(null)

  const handleAdd = () => {
    if (editingId) {
      setPlacements(placements.map((p) => (p.id === editingId ? { ...p, ...formData } : p)))
      setEditingId(null)
    } else {
      const newPlacement: StudentPlacement = {
        id: String(placements.length + 1),
        ...formData,
      }
      setPlacements([...placements, newPlacement])
    }
    setFormData({
      nisn: "",
      studentName: "",
      classId: "",
      className: "",
      roomId: "",
      roomName: "",
      waliKelasId: "",
      waliKelasName: "",
    })
    setShowForm(false)
  }

  const handleEdit = (placement: StudentPlacement) => {
    setFormData(placement)
    setEditingId(placement.id)
    setShowForm(true)
  }

  const handleDelete = (id: string) => {
    setPlacements(placements.filter((p) => p.id !== id))
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Manajemen Penempatan Siswa</h1>
          <p className="text-gray-600 mt-1">Tempatkan siswa ke kelas dan ruangan, tentukan wali kelas</p>
        </div>
        <Button
          onClick={() => {
            setShowForm(!showForm)
            setEditingId(null)
            setFormData({
              nisn: "",
              studentName: "",
              classId: "",
              className: "",
              roomId: "",
              roomName: "",
              waliKelasId: "",
              waliKelasName: "",
            })
          }}
          className="bg-red-600 hover:bg-red-700"
        >
          {showForm ? "Batal" : "+ Tambah Penempatan"}
        </Button>
      </div>

      {showForm && (
        <Card className="border-red-200 bg-red-50">
          <CardHeader>
            <CardTitle className="text-red-600">{editingId ? "Edit Penempatan" : "Tambah Penempatan Siswa"}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">NISN</label>
                <Input
                  placeholder="0001"
                  value={formData.nisn}
                  onChange={(e) => setFormData({ ...formData, nisn: e.target.value })}
                  className="border-gray-300"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nama Siswa</label>
                <Input
                  placeholder="Ahmad Rizki Pratama"
                  value={formData.studentName}
                  onChange={(e) => setFormData({ ...formData, studentName: e.target.value })}
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
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">ID Ruangan</label>
                <Input
                  placeholder="R101"
                  value={formData.roomId}
                  onChange={(e) => setFormData({ ...formData, roomId: e.target.value })}
                  className="border-gray-300"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nama Ruangan</label>
                <Input
                  placeholder="Ruang Kelas 1A"
                  value={formData.roomName}
                  onChange={(e) => setFormData({ ...formData, roomName: e.target.value })}
                  className="border-gray-300"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">ID Wali Kelas</label>
                <Input
                  placeholder="T001"
                  value={formData.waliKelasId}
                  onChange={(e) => setFormData({ ...formData, waliKelasId: e.target.value })}
                  className="border-gray-300"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nama Wali Kelas</label>
                <Input
                  placeholder="Ibu Siti Nurhaliza"
                  value={formData.waliKelasName}
                  onChange={(e) => setFormData({ ...formData, waliKelasName: e.target.value })}
                  className="border-gray-300"
                />
              </div>
            </div>
            <Button onClick={handleAdd} className="w-full bg-red-600 hover:bg-red-700">
              {editingId ? "Update Penempatan" : "Tambah Penempatan"}
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
                        {placement.studentName} ({placement.nisn})
                      </p>
                    </div>
                    <div>
                      <p className="text-gray-600 font-medium">Kelas</p>
                      <p className="font-semibold text-gray-900">{placement.className}</p>
                    </div>
                    <div>
                      <p className="text-gray-600 font-medium">Ruangan</p>
                      <p className="font-semibold text-gray-900">{placement.roomName}</p>
                    </div>
                    <div>
                      <p className="text-gray-600 font-medium">Wali Kelas</p>
                      <p className="font-semibold text-gray-900">{placement.waliKelasName}</p>
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
