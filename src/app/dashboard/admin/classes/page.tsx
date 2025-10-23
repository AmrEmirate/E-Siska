"use client"

import { Header } from "@/components/layout/header"
import { Sidebar } from "@/components/layout/sidebar"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Modal } from "@/components/common/modal"
import { useState } from "react"

const adminNavItems = [
  { label: "Dashboard", href: "/dashboard/admin", icon: "📊" },
  { label: "Kelola Siswa", href: "/dashboard/admin/students", icon: "👥" },
  { label: "Kelola Guru", href: "/dashboard/admin/teachers", icon: "👨‍🏫" },
  { label: "Kelola Kelas", href: "/dashboard/admin/classes", icon: "🏫" },
  { label: "Mata Pelajaran", href: "/dashboard/admin/subjects", icon: "📚" },
  { label: "Pengumuman", href: "/dashboard/admin/announcements", icon: "📢" },
  { label: "Dokumen", href: "/dashboard/admin/documents", icon: "📁" },
  { label: "Backup & Restore", href: "/dashboard/admin/backup", icon: "💾" },
]

interface Class {
  id: string
  name: string
  homeroom: string
  students: number
}

export default function AdminClassesPage() {
  const [classes, setClasses] = useState<Class[]>([
    { id: "1", name: "XII IPA 1", homeroom: "Budi Santoso", students: 35 },
    { id: "2", name: "XII IPA 2", homeroom: "Siti Rahayu", students: 33 },
    { id: "3", name: "XI IPA 1", homeroom: "Ahmad Suryanto", students: 36 },
  ])

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [formData, setFormData] = useState({ name: "", homeroom: "", students: "" })
  const [editingId, setEditingId] = useState<string | null>(null)

  const teachers = ["Budi Santoso", "Siti Rahayu", "Ahmad Suryanto"]

  const handleAddClass = () => {
    if (formData.name && formData.homeroom && formData.students) {
      if (editingId) {
        setClasses(
          classes.map((c) =>
            c.id === editingId ? { ...formData, id: editingId, students: Number.parseInt(formData.students) } : c,
          ),
        )
        setEditingId(null)
      } else {
        setClasses([
          ...classes,
          { ...formData, id: Date.now().toString(), students: Number.parseInt(formData.students) },
        ])
      }
      setFormData({ name: "", homeroom: "", students: "" })
      setIsModalOpen(false)
    }
  }

  const handleEditClass = (cls: Class) => {
    setFormData({ name: cls.name, homeroom: cls.homeroom, students: cls.students.toString() })
    setEditingId(cls.id)
    setIsModalOpen(true)
  }

  const handleDeleteClass = (id: string) => {
    setClasses(classes.filter((c) => c.id !== id))
  }

  return (
    <div className="flex h-screen bg-neutral-50">
      <Sidebar items={adminNavItems} userRole="Admin" />

      <div className="flex-1 flex flex-col overflow-hidden">
        <Header title="Kelola Kelas" userName="Admin Sekolah" />

        <main className="flex-1 overflow-auto p-8">
          <div className="space-y-6">
            <Button
              className="bg-primary hover:bg-primary-dark"
              onClick={() => {
                setFormData({ name: "", homeroom: "", students: "" })
                setEditingId(null)
                setIsModalOpen(true)
              }}
            >
              Tambah Kelas Baru
            </Button>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {classes.map((cls) => (
                <Card key={cls.id} className="hover:shadow-lg transition-shadow">
                  <h3 className="text-lg font-bold text-neutral-900 mb-4">{cls.name}</h3>
                  <div className="space-y-3 mb-4">
                    <div>
                      <p className="text-sm text-neutral-600">Jumlah Siswa</p>
                      <p className="text-2xl font-bold text-primary">{cls.students}</p>
                    </div>
                    <div>
                      <p className="text-sm text-neutral-600">Wali Kelas</p>
                      <p className="font-medium text-neutral-900">{cls.homeroom}</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1 bg-transparent"
                      onClick={() => handleEditClass(cls)}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1 bg-transparent"
                      onClick={() => handleDeleteClass(cls.id)}
                    >
                      Hapus
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </main>
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false)
          setEditingId(null)
          setFormData({ name: "", homeroom: "", students: "" })
        }}
        title={editingId ? "Edit Kelas" : "Tambah Kelas Baru"}
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-2">Nama Kelas</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-4 py-2 border border-neutral-300 rounded-lg"
              placeholder="Contoh: XII IPA 1"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-2">Wali Kelas</label>
            <select
              value={formData.homeroom}
              onChange={(e) => setFormData({ ...formData, homeroom: e.target.value })}
              className="w-full px-4 py-2 border border-neutral-300 rounded-lg"
            >
              <option value="">Pilih Wali Kelas</option>
              {teachers.map((teacher) => (
                <option key={teacher} value={teacher}>
                  {teacher}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-2">Jumlah Siswa</label>
            <input
              type="number"
              value={formData.students}
              onChange={(e) => setFormData({ ...formData, students: e.target.value })}
              className="w-full px-4 py-2 border border-neutral-300 rounded-lg"
              placeholder="Jumlah siswa"
            />
          </div>
          <div className="flex gap-3 justify-end mt-6">
            <Button
              variant="outline"
              onClick={() => {
                setIsModalOpen(false)
                setEditingId(null)
                setFormData({ name: "", homeroom: "", students: "" })
              }}
            >
              Batal
            </Button>
            <Button className="bg-primary hover:bg-primary-dark" onClick={handleAddClass}>
              {editingId ? "Update Kelas" : "Tambah Kelas"}
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  )
}
