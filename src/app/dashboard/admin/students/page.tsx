"use client"

import { Header } from "@/components/layout/header"
import { Sidebar } from "@/components/layout/sidebar"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Modal } from "@/components/common/modal"
import { ConfirmationModal } from "@/components/common/confirmation-modal"
import { Toast } from "@/components/common/toast"
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

interface Student {
  id: string
  nis: string
  name: string
  class: string
  status: string
}

export default function AdminStudentsPage() {
  const [students, setStudents] = useState<Student[]>([
    { id: "1", nis: "2024001", name: "Ahmad Rizki", class: "XII IPA 1", status: "Aktif" },
    { id: "2", nis: "2024002", name: "Siti Nurhaliza", class: "XII IPA 1", status: "Aktif" },
    { id: "3", nis: "2024003", name: "Budi Wijaya", class: "XII IPA 2", status: "Aktif" },
  ])

  const [selectedClass, setSelectedClass] = useState<string | null>(null)
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [isClassModalOpen, setIsClassModalOpen] = useState(false)
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false)
  const [formData, setFormData] = useState({ nis: "", name: "", class: "", status: "Aktif" })
  const [editingId, setEditingId] = useState<string | null>(null)
  const [deleteId, setDeleteId] = useState<string | null>(null)
  const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const classes = ["XII IPA 1", "XII IPA 2", "XI IPA 1", "XI IPA 2"]
  const filteredStudents = selectedClass ? students.filter((s) => s.class === selectedClass) : students

  const handleAddStudent = async () => {
    if (formData.nis && formData.name && formData.class) {
      setIsLoading(true)
      setTimeout(() => {
        if (editingId) {
          setStudents(students.map((s) => (s.id === editingId ? { ...formData, id: editingId } : s)))
          setToast({ message: "Siswa berhasil diperbarui", type: "success" })
          setEditingId(null)
        } else {
          setStudents([...students, { ...formData, id: Date.now().toString() }])
          setToast({ message: "Siswa berhasil ditambahkan", type: "success" })
        }
        setFormData({ nis: "", name: "", class: "", status: "Aktif" })
        setIsAddModalOpen(false)
        setIsLoading(false)
      }, 500)
    }
  }

  const handleEditStudent = (student: Student) => {
    setFormData(student)
    setEditingId(student.id)
    setIsAddModalOpen(true)
  }

  const handleDeleteStudent = (id: string) => {
    setDeleteId(id)
    setIsDeleteConfirmOpen(true)
  }

  const confirmDelete = () => {
    setIsLoading(true)
    setTimeout(() => {
      setStudents(students.filter((s) => s.id !== deleteId))
      setToast({ message: "Siswa berhasil dihapus", type: "success" })
      setIsDeleteConfirmOpen(false)
      setDeleteId(null)
      setIsLoading(false)
    }, 500)
  }

  const handleClassClick = (className: string) => {
    setSelectedClass(className)
    setIsClassModalOpen(true)
  }

  return (
    <div className="flex h-screen bg-neutral-50">
      <Sidebar items={adminNavItems} userRole="Admin" />

      <div className="flex-1 flex flex-col overflow-hidden">
        <Header title="Kelola Siswa" userName="Admin Sekolah" />

        <main className="flex-1 overflow-auto p-8">
          <div className="space-y-6 animate-fade-in">
            <div className="flex gap-4">
              <Button
                className="bg-primary hover:bg-primary-dark hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
                onClick={() => {
                  setFormData({ nis: "", name: "", class: "", status: "Aktif" })
                  setEditingId(null)
                  setIsAddModalOpen(true)
                }}
              >
                + Tambah Siswa Baru
              </Button>
              <Button variant="outline" onClick={() => setSelectedClass(null)}>
                Lihat Semua Siswa
              </Button>
            </div>

            {selectedClass && (
              <div className="flex items-center gap-4 p-4 bg-blue-50 rounded-lg border border-blue-200 animate-fade-in-up">
                <h3 className="text-lg font-bold text-neutral-900">Filter: {selectedClass}</h3>
                <Button variant="outline" size="sm" onClick={() => setSelectedClass(null)}>
                  Hapus Filter
                </Button>
              </div>
            )}

            <Card>
              <h3 className="text-xl font-bold text-neutral-900 mb-6">Daftar Siswa</h3>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-neutral-200">
                      <th className="text-left py-3 px-4 font-semibold text-neutral-700">NIS</th>
                      <th className="text-left py-3 px-4 font-semibold text-neutral-700">Nama</th>
                      <th className="text-left py-3 px-4 font-semibold text-neutral-700">Kelas</th>
                      <th className="text-left py-3 px-4 font-semibold text-neutral-700">Status</th>
                      <th className="text-center py-3 px-4 font-semibold text-neutral-700">Aksi</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredStudents.map((student) => (
                      <tr
                        key={student.id}
                        className="border-b border-neutral-100 hover:bg-neutral-50 transition-colors"
                      >
                        <td className="py-3 px-4 text-neutral-900">{student.nis}</td>
                        <td className="py-3 px-4 text-neutral-900">{student.name}</td>
                        <td className="py-3 px-4 text-neutral-900">{student.class}</td>
                        <td className="py-3 px-4">
                          <span className="px-3 py-1 bg-green-100 text-green-700 text-sm rounded-full">
                            {student.status}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-center space-x-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleEditStudent(student)}
                            className="hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
                          >
                            Edit
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleDeleteStudent(student.id)}
                            className="hover:bg-red-50 hover:text-red-600"
                          >
                            Hapus
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>

            <Card>
              <h3 className="text-xl font-bold text-neutral-900 mb-6">Siswa per Kelas</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {classes.map((cls) => {
                  const count = students.filter((s) => s.class === cls).length
                  return (
                    <Card
                      key={cls}
                      className="hover:shadow-lg transition-shadow cursor-pointer p-4 hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
                      onClick={() => handleClassClick(cls)}
                    >
                      <h4 className="font-bold text-neutral-900">{cls}</h4>
                      <p className="text-2xl font-bold text-primary mt-2">{count}</p>
                      <p className="text-sm text-neutral-600">Siswa</p>
                    </Card>
                  )
                })}
              </div>
            </Card>
          </div>
        </main>
      </div>

      <Modal
        isOpen={isAddModalOpen}
        onClose={() => {
          setIsAddModalOpen(false)
          setEditingId(null)
          setFormData({ nis: "", name: "", class: "", status: "Aktif" })
        }}
        title={editingId ? "Edit Siswa" : "Tambah Siswa Baru"}
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-2">NIS</label>
            <input
              type="text"
              value={formData.nis}
              onChange={(e) => setFormData({ ...formData, nis: e.target.value })}
              className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="Nomor Induk Siswa"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-2">Nama</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="Nama Siswa"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-2">Kelas</label>
            <select
              value={formData.class}
              onChange={(e) => setFormData({ ...formData, class: e.target.value })}
              className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="">Pilih Kelas</option>
              {classes.map((cls) => (
                <option key={cls} value={cls}>
                  {cls}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-2">Status</label>
            <select
              value={formData.status}
              onChange={(e) => setFormData({ ...formData, status: e.target.value })}
              className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="Aktif">Aktif</option>
              <option value="Nonaktif">Nonaktif</option>
            </select>
          </div>
          <div className="flex gap-3 justify-end mt-6">
            <Button
              variant="outline"
              onClick={() => {
                setIsAddModalOpen(false)
                setEditingId(null)
                setFormData({ nis: "", name: "", class: "", status: "Aktif" })
              }}
              disabled={isLoading}
            >
              Batal
            </Button>
            <Button className="bg-primary hover:bg-primary-dark" onClick={handleAddStudent} disabled={isLoading}>
              {isLoading ? "Memproses..." : editingId ? "Update Siswa" : "Tambah Siswa"}
            </Button>
          </div>
        </div>
      </Modal>

      <Modal
        isOpen={isClassModalOpen}
        onClose={() => {
          setIsClassModalOpen(false)
          setSelectedClass(null)
        }}
        title={`Daftar Siswa - ${selectedClass}`}
      >
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-neutral-200">
                <th className="text-left py-3 px-4 font-semibold text-neutral-700">No</th>
                <th className="text-left py-3 px-4 font-semibold text-neutral-700">NIS</th>
                <th className="text-left py-3 px-4 font-semibold text-neutral-700">Nama</th>
                <th className="text-left py-3 px-4 font-semibold text-neutral-700">Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredStudents.map((student, idx) => (
                <tr key={student.id} className="border-b border-neutral-100 hover:bg-neutral-50">
                  <td className="py-3 px-4 text-neutral-900">{idx + 1}</td>
                  <td className="py-3 px-4 text-neutral-900">{student.nis}</td>
                  <td className="py-3 px-4 text-neutral-900">{student.name}</td>
                  <td className="py-3 px-4">
                    <span className="px-3 py-1 bg-green-100 text-green-700 text-sm rounded-full">{student.status}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Modal>

      <ConfirmationModal
        isOpen={isDeleteConfirmOpen}
        title="Hapus Siswa"
        message="Apakah Anda yakin ingin menghapus siswa ini? Tindakan ini tidak dapat dibatalkan."
        onConfirm={confirmDelete}
        onCancel={() => setIsDeleteConfirmOpen(false)}
        confirmText="Hapus"
        cancelText="Batal"
        isDangerous={true}
        isLoading={isLoading}
      />

      {toast && <Toast message={toast.message} type={toast.type} />}
    </div>
  )
}
