"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

interface ClassLevel {
  id: string
  name: string
  level: number
  description: string
}

const initialLevels: ClassLevel[] = [
  { id: "1", name: "Kelas 1", level: 1, description: "Tingkat Kelas Satu" },
  { id: "2", name: "Kelas 2", level: 2, description: "Tingkat Kelas Dua" },
  { id: "3", name: "Kelas 3", level: 3, description: "Tingkat Kelas Tiga" },
  { id: "4", name: "Kelas 4", level: 4, description: "Tingkat Kelas Empat" },
  { id: "5", name: "Kelas 5", level: 5, description: "Tingkat Kelas Lima" },
  { id: "6", name: "Kelas 6", level: 6, description: "Tingkat Kelas Enam" },
]

export default function ClassLevelsPage() {
  const [levels, setLevels] = useState(initialLevels)
  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState({ name: "", level: "", description: "" })
  const [editingId, setEditingId] = useState<string | null>(null)

  const handleAdd = () => {
    if (editingId) {
      setLevels(
        levels.map((l) =>
          l.id === editingId
            ? { ...l, name: formData.name, level: Number(formData.level), description: formData.description }
            : l,
        ),
      )
      setEditingId(null)
    } else {
      const newLevel: ClassLevel = {
        id: String(levels.length + 1),
        name: formData.name,
        level: Number(formData.level),
        description: formData.description,
      }
      setLevels([...levels, newLevel])
    }
    setFormData({ name: "", level: "", description: "" })
    setShowForm(false)
  }

  const handleEdit = (level: ClassLevel) => {
    setFormData({ name: level.name, level: String(level.level), description: level.description })
    setEditingId(level.id)
    setShowForm(true)
  }

  const handleDelete = (id: string) => {
    setLevels(levels.filter((l) => l.id !== id))
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
            setFormData({ name: "", level: "", description: "" })
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
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
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
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="border-gray-300"
              />
            </div>
            <Button onClick={handleAdd} className="w-full bg-red-600 hover:bg-red-700">
              {editingId ? "Update Tingkatan" : "Tambah Tingkatan"}
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
                  <h3 className="font-semibold text-gray-900">{level.name}</h3>
                  <p className="text-sm text-gray-600">{level.description}</p>
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
