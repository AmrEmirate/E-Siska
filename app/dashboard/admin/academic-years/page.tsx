"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

interface AcademicYear {
  id: string
  name: string
  startYear: number
  endYear: number
  isActive: boolean
  startDate: string
  endDate: string
}

const initialYears: AcademicYear[] = [
  {
    id: "1",
    name: "Tahun Ajaran 2023/2024",
    startYear: 2023,
    endYear: 2024,
    isActive: false,
    startDate: "2023-07-01",
    endDate: "2024-06-30",
  },
  {
    id: "2",
    name: "Tahun Ajaran 2024/2025",
    startYear: 2024,
    endYear: 2025,
    isActive: true,
    startDate: "2024-07-01",
    endDate: "2025-06-30",
  },
]

export default function AcademicYearsPage() {
  const [years, setYears] = useState(initialYears)
  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState({ name: "", startYear: "", endYear: "", startDate: "", endDate: "" })
  const [editingId, setEditingId] = useState<string | null>(null)

  const handleAdd = () => {
    if (editingId) {
      setYears(
        years.map((y) =>
          y.id === editingId
            ? {
                ...y,
                name: formData.name,
                startYear: Number(formData.startYear),
                endYear: Number(formData.endYear),
                startDate: formData.startDate,
                endDate: formData.endDate,
              }
            : y,
        ),
      )
      setEditingId(null)
    } else {
      const newYear: AcademicYear = {
        id: String(years.length + 1),
        name: formData.name,
        startYear: Number(formData.startYear),
        endYear: Number(formData.endYear),
        isActive: false,
        startDate: formData.startDate,
        endDate: formData.endDate,
      }
      setYears([...years, newYear])
    }
    setFormData({ name: "", startYear: "", endYear: "", startDate: "", endDate: "" })
    setShowForm(false)
  }

  const handleSetActive = (id: string) => {
    setYears(years.map((y) => ({ ...y, isActive: y.id === id })))
  }

  const handleEdit = (year: AcademicYear) => {
    setFormData({
      name: year.name,
      startYear: String(year.startYear),
      endYear: String(year.endYear),
      startDate: year.startDate,
      endDate: year.endDate,
    })
    setEditingId(year.id)
    setShowForm(true)
  }

  const handleDelete = (id: string) => {
    setYears(years.filter((y) => y.id !== id))
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
            setFormData({ name: "", startYear: "", endYear: "", startDate: "", endDate: "" })
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
              <label className="block text-sm font-medium text-gray-700 mb-1">Nama Tahun Ajaran</label>
              <Input
                placeholder="Tahun Ajaran 2024/2025"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="border-gray-300"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Tahun Mulai</label>
                <Input
                  type="number"
                  placeholder="2024"
                  value={formData.startYear}
                  onChange={(e) => setFormData({ ...formData, startYear: e.target.value })}
                  className="border-gray-300"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Tahun Akhir</label>
                <Input
                  type="number"
                  placeholder="2025"
                  value={formData.endYear}
                  onChange={(e) => setFormData({ ...formData, endYear: e.target.value })}
                  className="border-gray-300"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Tanggal Mulai</label>
                <Input
                  type="date"
                  value={formData.startDate}
                  onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                  className="border-gray-300"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Tanggal Akhir</label>
                <Input
                  type="date"
                  value={formData.endDate}
                  onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                  className="border-gray-300"
                />
              </div>
            </div>
            <Button onClick={handleAdd} className="w-full bg-red-600 hover:bg-red-700">
              {editingId ? "Update Tahun Ajaran" : "Tambah Tahun Ajaran"}
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
                    <h3 className="font-semibold text-gray-900">{year.name}</h3>
                    {year.isActive && (
                      <span className="px-3 py-1 bg-red-600 text-white text-xs font-semibold rounded-full">Aktif</span>
                    )}
                  </div>
                  <p className="text-sm text-gray-600 mt-1">
                    {year.startYear}/{year.endYear}
                  </p>
                  <p className="text-sm text-gray-500">
                    {year.startDate} - {year.endDate}
                  </p>
                </div>
                <div className="flex gap-2">
                  {!year.isActive && (
                    <Button onClick={() => handleSetActive(year.id)} className="bg-red-600 hover:bg-red-700">
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
