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

interface Teacher {
  id: string
  nip: string
  name: string
  subject: string
  status: string
}

export default function AdminTeachersPage() {
  const [teachers, setTeachers] = useState<Teacher[]>([
    { id: "1", nip: "198505151234567890", name: "Budi Santoso", subject: "Matematika", status: "Aktif" },
    { id: "2", nip: "198607201234567891", name: "Siti Rahayu", subject: "Bahasa Indonesia", status: "Aktif" },
    { id: "3", nip: "198803151234567892", name: "Ahmad Suryanto", subject: "Fisika", status: "Aktif" },
  ])

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [formData, setFormData] = useState({ nip: "", name: "", subject: "", status: "Aktif" })
  const [editingId, setEditingId] = useState<string | null>(null)

  const subjects = ["Matematika", "Bahasa Indonesia", "Bahasa Inggris", "Fisika", "Kimia", "Biologi"]

  const handleAddTeacher = () => {
    if (formData.nip && formData.name && formData.subject) {
      if (editingId) {
        setTeachers(teachers.map((t) => (t.id === editingId ? { ...formData, id: editingId } : t)))
        setEditingId(null)
      } else {
        setTeachers([...teachers, { ...formData, id: Date.now().toString() }])
      }
      setFormData({ nip: "", name: "", subject: "", status: "Aktif" })
      setIsModalOpen(false)
    }
  }

  const handleEditTeacher = (teacher: Teacher) => {
    setFormData(teacher)
    setEditingId(teacher.id)
    setIsModalOpen(true)
  }

  const handleDeleteTeacher = (id: string) => {
    setTeachers(teachers.filter((t) => t.id !== id))
  }

  return (
    <div className="flex h-screen bg-neutral-50">
      <Sidebar items={adminNavItems} userRole="Admin" />

      <div className="flex-1 flex flex-col overflow-hidden">
        <Header title="Kelola Guru" userName="Admin Sekolah" />

        <main className="flex-1 overflow-auto p-8">
          <div className="space-y-6">
            <Button
              className="bg-primary hover:bg-primary-dark"
              onClick={() => {
                setFormData({ nip: "", name: "", subject: "", status: "Aktif" })
                setEditingId(null)
                setIsModalOpen(true)
              }}
            >
              Tambah Guru Baru
            </Button>

            <Card>
              <h3 className="text-xl font-bold text-neutral-900 mb-6">Daftar Guru</h3>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-neutral-200">
                      <th className="text-left py-3 px-4 font-semibold text-neutral-700">NIP</th>
                      <th className="text-left py-3 px-4 font-semibold text-neutral-700">Nama</th>
                      <th className="text-left py-3 px-4 font-semibold text-neutral-700">Mata Pelajaran</th>
                      <th className="text-left py-3 px-4 font-semibold text-neutral-700">Status</th>
                      <th className="text-center py-3 px-4 font-semibold text-neutral-700">Aksi</th>
                    </tr>
                  </thead>
                  <tbody>
                    {teachers.map((teacher) => (
                      <tr key={teacher.id} className="border-b border-neutral-100 hover:bg-neutral-50">
                        <td className="py-3 px-4 text-neutral-900">{teacher.nip}</td>
                        <td className="py-3 px-4 text-neutral-900">{teacher.name}</td>
                        <td className="py-3 px-4 text-neutral-900">{teacher.subject}</td>
                        <td className="py-3 px-4">
                          <span className="px-3 py-1 bg-green-100 text-green-700 text-sm rounded-full">
                            {teacher.status}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-center space-x-2">
                          <Button variant="outline" size="sm" onClick={() => handleEditTeacher(teacher)}>
                            Edit
                          </Button>
                          <Button variant="outline" size="sm" onClick={() => handleDeleteTeacher(teacher.id)}>
                            Hapus
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          </div>
        </main>
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false)
          setEditingId(null)
          setFormData({ nip: "", name: "", subject: "", status: "Aktif" })
        }}
        title={editingId ? "Edit Guru" : "Tambah Guru Baru"}
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-2">NIP</label>
            <input
              type="text"
              value={formData.nip}
              onChange={(e) => setFormData({ ...formData, nip: e.target.value })}
              className="w-full px-4 py-2 border border-neutral-300 rounded-lg"
              placeholder="Nomor Induk Pegawai"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-2">Nama</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-4 py-2 border border-neutral-300 rounded-lg"
              placeholder="Nama Guru"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-2">Mata Pelajaran</label>
            <select
              value={formData.subject}
              onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
              className="w-full px-4 py-2 border border-neutral-300 rounded-lg"
            >
              <option value="">Pilih Mata Pelajaran</option>
              {subjects.map((subj) => (
                <option key={subj} value={subj}>
                  {subj}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-2">Status</label>
            <select
              value={formData.status}
              onChange={(e) => setFormData({ ...formData, status: e.target.value })}
              className="w-full px-4 py-2 border border-neutral-300 rounded-lg"
            >
              <option value="Aktif">Aktif</option>
              <option value="Nonaktif">Nonaktif</option>
            </select>
          </div>
          <div className="flex gap-3 justify-end mt-6">
            <Button
              variant="outline"
              onClick={() => {
                setIsModalOpen(false)
                setEditingId(null)
                setFormData({ nip: "", name: "", subject: "", status: "Aktif" })
              }}
            >
              Batal
            </Button>
            <Button className="bg-primary hover:bg-primary-dark" onClick={handleAddTeacher}>
              {editingId ? "Update Guru" : "Tambah Guru"}
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  )
}
