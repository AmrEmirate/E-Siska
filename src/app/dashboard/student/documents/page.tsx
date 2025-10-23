"use client"

import { Header } from "@/components/layout/header"
import { Sidebar } from "@/components/layout/sidebar"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

const studentNavItems = [
  { label: "Dashboard", href: "/dashboard/student", icon: "📊" },
  { label: "Profil", href: "/dashboard/student/profile", icon: "👤" },
  { label: "Absensi", href: "/dashboard/student/attendance", icon: "📋" },
  { label: "Jadwal", href: "/dashboard/student/schedule", icon: "📅" },
  { label: "Nilai", href: "/dashboard/student/grades", icon: "📈" },
  { label: "Rapor", href: "/dashboard/student/report", icon: "📄" },
  { label: "Pengumuman", href: "/dashboard/student/announcements", icon: "📢" },
  { label: "Dokumen", href: "/dashboard/student/documents", icon: "📁" },
]

export default function StudentDocumentsPage() {
  const documents = [
    { name: "Surat Keterangan Aktif Siswa", date: "20 Okt 2024", type: "PDF", size: "245 KB" },
    { name: "Transkrip Nilai Semester 1", date: "15 Okt 2024", type: "PDF", size: "156 KB" },
    { name: "Sertifikat Kelulusan", date: "10 Okt 2024", type: "PDF", size: "512 KB" },
    { name: "Kartu Pelajar Digital", date: "05 Okt 2024", type: "PDF", size: "89 KB" },
  ]

  return (
    <div className="flex h-screen bg-neutral-50">
      <Sidebar items={studentNavItems} userRole="Siswa" />

      <div className="flex-1 flex flex-col overflow-hidden">
        <Header title="Dokumen" userName="Ahmad Rizki" />

        <main className="flex-1 overflow-auto p-8">
          <div className="space-y-4">
            {documents.map((doc, idx) => (
              <Card key={idx} className="flex items-center justify-between p-4 hover:bg-neutral-50 transition-colors">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center text-2xl">📄</div>
                  <div>
                    <p className="font-semibold text-neutral-900">{doc.name}</p>
                    <p className="text-sm text-neutral-500">
                      {doc.date} • {doc.size}
                    </p>
                  </div>
                </div>
                <Button variant="outline" size="sm">
                  Download
                </Button>
              </Card>
            ))}
          </div>
        </main>
      </div>
    </div>
  )
}
