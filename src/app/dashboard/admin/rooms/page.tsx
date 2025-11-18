"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

interface Room {
  id: string
  name: string
  capacity: number
  building: string
  floor: number
}

const initialRooms: Room[] = [
  { id: "1", name: "Ruang Kelas 1A", capacity: 35, building: "Gedung A", floor: 1 },
  { id: "2", name: "Ruang Kelas 1B", capacity: 33, building: "Gedung A", floor: 1 },
  { id: "3", name: "Ruang Kelas 2A", capacity: 34, building: "Gedung B", floor: 2 },
]

export default function RoomsManagementPage() {
  const [rooms, setRooms] = useState(initialRooms)
  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState({ name: "", capacity: "", building: "", floor: "" })
  const [editingId, setEditingId] = useState<string | null>(null)

  const handleAdd = () => {
    if (editingId) {
      setRooms(
        rooms.map((r) =>
          r.id === editingId
            ? {
                ...r,
                name: formData.name,
                capacity: Number(formData.capacity),
                building: formData.building,
                floor: Number(formData.floor),
              }
            : r,
        ),
      )
      setEditingId(null)
    } else {
      const newRoom: Room = {
        id: String(rooms.length + 1),
        name: formData.name,
        capacity: Number(formData.capacity),
        building: formData.building,
        floor: Number(formData.floor),
      }
      setRooms([...rooms, newRoom])
    }
    setFormData({ name: "", capacity: "", building: "", floor: "" })
    setShowForm(false)
  }

  const handleEdit = (room: Room) => {
    setFormData({
      name: room.name,
      capacity: String(room.capacity),
      building: room.building,
      floor: String(room.floor),
    })
    setEditingId(room.id)
    setShowForm(true)
  }

  const handleDelete = (id: string) => {
    setRooms(rooms.filter((r) => r.id !== id))
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
            setFormData({ name: "", capacity: "", building: "", floor: "" })
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
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="border-gray-300"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Kapasitas</label>
                <Input
                  type="number"
                  placeholder="35"
                  value={formData.capacity}
                  onChange={(e) => setFormData({ ...formData, capacity: e.target.value })}
                  className="border-gray-300"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Gedung</label>
                <Input
                  placeholder="Gedung A"
                  value={formData.building}
                  onChange={(e) => setFormData({ ...formData, building: e.target.value })}
                  className="border-gray-300"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Lantai</label>
                <Input
                  type="number"
                  placeholder="1"
                  value={formData.floor}
                  onChange={(e) => setFormData({ ...formData, floor: e.target.value })}
                  className="border-gray-300"
                />
              </div>
            </div>
            <Button onClick={handleAdd} className="w-full bg-red-600 hover:bg-red-700">
              {editingId ? "Update Ruangan" : "Tambah Ruangan"}
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
                  <h3 className="font-semibold text-gray-900">{room.name}</h3>
                  <p className="text-sm text-gray-600">
                    Gedung {room.building} - Lantai {room.floor}
                  </p>
                  <p className="text-sm text-red-600 font-medium mt-1">Kapasitas: {room.capacity} siswa</p>
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
