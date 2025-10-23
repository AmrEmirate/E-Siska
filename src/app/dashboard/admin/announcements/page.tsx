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

interface Announcement {
  id: string
  title: string
  content: string
  date: string
}

export default function AdminAnnouncementsPage() {
  const [announcements, setAnnouncements] = useState<Announcement[]>([
    { id: "1", title: "Pengumuman 1", content: "Isi pengumuman 1", date: "22 Okt 2024" },
    { id: "2", title: "Pengumuman 2", content: "Isi pengumuman 2", date: "21 Okt 2024" },
    { id: "3", title: "Pengumuman 3", content: "Isi pengumuman 3", date: "20 Okt 2024" },
  ])

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false)
  const [formData, setFormData] = useState({ title: "", content: "" })
  const [editingId, setEditingId] = useState<string | null>(null)
  const [deleteId, setDeleteId] = useState<string | null>(null)
  const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const handleAddAnnouncement = async () => {
    if (formData.title && formData.content) {
      setIsLoading(true)
      setTimeout(() => {
        const today = new Date().toLocaleDateString("id-ID", {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
        })

        if (editingId) {
          setAnnouncements(
            announcements.map((a) => (a.id === editingId ? { ...formData, id: editingId, date: today } : a)),
          )
          setToast({ message: "Pengumuman berhasil diperbarui", type: "success" })
          setEditingId(null)
        } else {
          setAnnouncements([...announcements, { ...formData, id: Date.now().toString(), date: today }])
          setToast({ message: "Pengumuman berhasil dibuat", type: "success" })
        }
        setFormData({ title: "", content: "" })
        setIsModalOpen(false)
        setIsLoading(false)
      }, 500)
    }
  }

  const handleEditAnnouncement = (announcement: Announcement) => {
    setFormData({ title: announcement.title, content: announcement.content })
    setEditingId(announcement.id)
    setIsModalOpen(true)
  }

  const handleDeleteAnnouncement = (id: string) => {
    setDeleteId(id)
    setIsDeleteConfirmOpen(true)
  }

  const confirmDelete = () => {
    setIsLoading(true)
    setTimeout(() => {
      setAnnouncements(announcements.filter((a) => a.id !== deleteId))
      setToast({ message: "Pengumuman berhasil dihapus", type: "success" })
      setIsDeleteConfirmOpen(false)
      setDeleteId(null)
      setIsLoading(false)
    }, 500)
  }

  return (
    <div className="flex h-screen bg-neutral-50">
      <Sidebar items={adminNavItems} userRole="Admin" />

      <div className="flex-1 flex flex-col overflow-hidden">
        <Header title="Pengumuman" userName="Admin Sekolah" />

        <main className="flex-1 overflow-auto p-8">
          <div className="space-y-6 animate-fade-in">
            <Button
              className="bg-primary hover:bg-primary-dark hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
              onClick={() => {
                setFormData({ title: "", content: "" })
                setEditingId(null)
                setIsModalOpen(true)
              }}
            >
              + Buat Pengumuman Baru
            </Button>

            <Card>
              <h3 className="text-xl font-bold text-neutral-900 mb-6">Daftar Pengumuman</h3>
              <div className="space-y-4">
                {announcements.length === 0 ? (
                  <div className="text-center py-8 text-neutral-500">
                    <p>Belum ada pengumuman</p>
                  </div>
                ) : (
                  announcements.map((announcement) => (
                    <div
                      key={announcement.id}
                      className="p-4 bg-neutral-50 rounded-lg hover:bg-neutral-100 transition-colors animate-fade-in-up"
                    >
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <p className="font-bold text-neutral-900 text-lg">{announcement.title}</p>
                          <p className="text-sm text-neutral-500 mt-1">{announcement.date}</p>
                        </div>
                        <div className="space-x-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleEditAnnouncement(announcement)}
                            className="hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
                          >
                            Edit
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleDeleteAnnouncement(announcement.id)}
                            className="hover:bg-red-50 hover:text-red-600"
                          >
                            Hapus
                          </Button>
                        </div>
                      </div>
                      <p className="text-neutral-700 mt-2">{announcement.content}</p>
                    </div>
                  ))
                )}
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
          setFormData({ title: "", content: "" })
        }}
        title={editingId ? "Edit Pengumuman" : "Buat Pengumuman Baru"}
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-2">Judul</label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="Judul pengumuman"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-2">Isi Pengumuman</label>
            <textarea
              value={formData.content}
              onChange={(e) => setFormData({ ...formData, content: e.target.value })}
              className="w-full px-4 py-2 border border-neutral-300 rounded-lg h-32 focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="Isi pengumuman"
            />
          </div>
          <div className="flex gap-3 justify-end mt-6">
            <Button
              variant="outline"
              onClick={() => {
                setIsModalOpen(false)
                setEditingId(null)
                setFormData({ title: "", content: "" })
              }}
              disabled={isLoading}
            >
              Batal
            </Button>
            <Button className="bg-primary hover:bg-primary-dark" onClick={handleAddAnnouncement} disabled={isLoading}>
              {isLoading ? "Memproses..." : editingId ? "Update Pengumuman" : "Buat Pengumuman"}
            </Button>
          </div>
        </div>
      </Modal>

      <ConfirmationModal
        isOpen={isDeleteConfirmOpen}
        title="Hapus Pengumuman"
        message="Apakah Anda yakin ingin menghapus pengumuman ini?"
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
