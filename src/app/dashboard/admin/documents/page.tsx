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

interface Document {
  id: string
  name: string
  size: string
  uploadDate: string
}

export default function AdminDocumentsPage() {
  const [documents, setDocuments] = useState<Document[]>([
    { id: "1", name: "Panduan Sistem", size: "2.5 MB", uploadDate: "22 Okt 2024" },
    { id: "2", name: "Kebijakan Sekolah", size: "1.8 MB", uploadDate: "21 Okt 2024" },
    { id: "3", name: "Kalender Akademik", size: "0.9 MB", uploadDate: "20 Okt 2024" },
  ])

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [fileName, setFileName] = useState("")

  const handleUploadDocument = () => {
    if (fileName) {
      const today = new Date().toLocaleDateString("id-ID", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      })
      setDocuments([...documents, { id: Date.now().toString(), name: fileName, size: "0 MB", uploadDate: today }])
      setFileName("")
      setIsModalOpen(false)
    }
  }

  const handleDeleteDocument = (id: string) => {
    setDocuments(documents.filter((d) => d.id !== id))
  }

  const handleDownloadDocument = (name: string) => {
    console.log("Downloading:", name)
    // Simulate download
    alert(`File ${name} sedang diunduh...`)
  }

  return (
    <div className="flex h-screen bg-neutral-50">
      <Sidebar items={adminNavItems} userRole="Admin" />

      <div className="flex-1 flex flex-col overflow-hidden">
        <Header title="Dokumen" userName="Admin Sekolah" />

        <main className="flex-1 overflow-auto p-8">
          <div className="space-y-6">
            <Button
              className="bg-primary hover:bg-primary-dark"
              onClick={() => {
                setFileName("")
                setIsModalOpen(true)
              }}
            >
              Upload Dokumen
            </Button>

            <Card>
              <h3 className="text-xl font-bold text-neutral-900 mb-6">Daftar Dokumen</h3>
              <div className="space-y-4">
                {documents.map((doc) => (
                  <div
                    key={doc.id}
                    className="flex items-center justify-between p-4 bg-neutral-50 rounded-lg hover:bg-neutral-100 transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center text-2xl">
                        📄
                      </div>
                      <div>
                        <p className="font-medium text-neutral-900">{doc.name}</p>
                        <p className="text-sm text-neutral-500">
                          {doc.size} • {doc.uploadDate}
                        </p>
                      </div>
                    </div>
                    <div className="space-x-2">
                      <Button variant="outline" size="sm" onClick={() => handleDownloadDocument(doc.name)}>
                        Download
                      </Button>
                      <Button variant="outline" size="sm" onClick={() => handleDeleteDocument(doc.id)}>
                        Hapus
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </main>
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false)
          setFileName("")
        }}
        title="Upload Dokumen"
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-2">Nama Dokumen</label>
            <input
              type="text"
              value={fileName}
              onChange={(e) => setFileName(e.target.value)}
              className="w-full px-4 py-2 border border-neutral-300 rounded-lg"
              placeholder="Nama dokumen"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-2">File</label>
            <div className="border-2 border-dashed border-neutral-300 rounded-lg p-8 text-center hover:border-primary transition-colors cursor-pointer">
              <p className="text-neutral-600">Klik atau drag file ke sini</p>
              <p className="text-sm text-neutral-500 mt-1">Format: PDF, DOC, DOCX, XLS, XLSX</p>
              <input type="file" className="hidden" />
            </div>
          </div>
          <div className="flex gap-3 justify-end mt-6">
            <Button
              variant="outline"
              onClick={() => {
                setIsModalOpen(false)
                setFileName("")
              }}
            >
              Batal
            </Button>
            <Button className="bg-primary hover:bg-primary-dark" onClick={handleUploadDocument}>
              Upload
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  )
}
