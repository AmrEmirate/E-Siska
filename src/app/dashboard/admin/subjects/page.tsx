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

interface Subject {
  id: string
  code: string
  name: string
  sks: number
}

export default function AdminSubjectsPage() {
  const [subjects, setSubjects] = useState<Subject[]>([
    { id: "1", code: "MP001", name: "Matematika", sks: 3 },
    { id: "2", code: "MP002", name: "Fisika", sks: 3 },
    { id: "3", code: "MP003", name: "Kimia", sks: 3 },
    { id: "4", code: "MP004", name: "Biologi", sks: 3 },
    { id: "5", code: "MP005", name: "Bahasa Indonesia", sks: 2 },
  ])

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [formData, setFormData] = useState({ code: "", name: "", sks: "" })
  const [editingId, setEditingId] = useState<string | null>(null)

  const handleAddSubject = () => {
    if (formData.code && formData.name && formData.sks) {
      if (editingId) {
        setSubjects(
          subjects.map((s) =>
            s.id === editingId ? { ...formData, id: editingId, sks: Number.parseInt(formData.sks) } : s,
          ),
        )
        setEditingId(null)
      } else {
        setSubjects([...subjects, { ...formData, id: Date.now().toString(), sks: Number.parseInt(formData.sks) }])
      }
      setFormData({ code: "", name: "", sks: "" })
      setIsModalOpen(false)
    }
  }

  const handleEditSubject = (subject: Subject) => {
    setFormData({ code: subject.code, name: subject.name, sks: subject.sks.toString() })
    setEditingId(subject.id)
    setIsModalOpen(true)
  }

  const handleDeleteSubject = (id: string) => {
    setSubjects(subjects.filter((s) => s.id !== id))
  }

  return (
    <div className="flex h-screen bg-neutral-50">
      <Sidebar items={adminNavItems} userRole="Admin" />

      <div className="flex-1 flex flex-col overflow-hidden">
        <Header title="Mata Pelajaran" userName="Admin Sekolah" />

        <main className="flex-1 overflow-auto p-8">
          <div className="space-y-6">
            <Button
              className="bg-primary hover:bg-primary-dark"
              onClick={() => {
                setFormData({ code: "", name: "", sks: "" })
                setEditingId(null)
                setIsModalOpen(true)
              }}
            >
              Tambah Mata Pelajaran
            </Button>

            <Card>
              <h3 className="text-xl font-bold text-neutral-900 mb-6">Daftar Mata Pelajaran</h3>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-neutral-200">
                      <th className="text-left py-3 px-4 font-semibold text-neutral-700">Kode</th>
                      <th className="text-left py-3 px-4 font-semibold text-neutral-700">Nama Mata Pelajaran</th>
                      <th className="text-left py-3 px-4 font-semibold text-neutral-700">SKS</th>
                      <th className="text-center py-3 px-4 font-semibold text-neutral-700">Aksi</th>
                    </tr>
                  </thead>
                  <tbody>
                    {subjects.map((subject) => (
                      <tr key={subject.id} className="border-b border-neutral-100 hover:bg-neutral-50">
                        <td className="py-3 px-4 text-neutral-900">{subject.code}</td>
                        <td className="py-3 px-4 text-neutral-900">{subject.name}</td>
                        <td className="py-3 px-4 text-neutral-900">{subject.sks}</td>
                        <td className="py-3 px-4 text-center space-x-2">
                          <Button variant="outline" size="sm" onClick={() => handleEditSubject(subject)}>
                            Edit
                          </Button>
                          <Button variant="outline" size="sm" onClick={() => handleDeleteSubject(subject.id)}>
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
          setFormData({ code: "", name: "", sks: "" })
        }}
        title={editingId ? "Edit Mata Pelajaran" : "Tambah Mata Pelajaran"}
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-2">Kode</label>
            <input
              type="text"
              value={formData.code}
              onChange={(e) => setFormData({ ...formData, code: e.target.value })}
              className="w-full px-4 py-2 border border-neutral-300 rounded-lg"
              placeholder="Contoh: MP001"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-2">Nama Mata Pelajaran</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-4 py-2 border border-neutral-300 rounded-lg"
              placeholder="Nama mata pelajaran"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-2">SKS</label>
            <input
              type="number"
              value={formData.sks}
              onChange={(e) => setFormData({ ...formData, sks: e.target.value })}
              className="w-full px-4 py-2 border border-neutral-300 rounded-lg"
              placeholder="Jumlah SKS"
            />
          </div>
          <div className="flex gap-3 justify-end mt-6">
            <Button
              variant="outline"
              onClick={() => {
                setIsModalOpen(false)
                setEditingId(null)
                setFormData({ code: "", name: "", sks: "" })
              }}
            >
              Batal
            </Button>
            <Button className="bg-primary hover:bg-primary-dark" onClick={handleAddSubject}>
              {editingId ? "Update Mata Pelajaran" : "Tambah Mata Pelajaran"}
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  )
}
