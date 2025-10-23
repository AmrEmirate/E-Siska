"use client"

import { Header } from "@/components/layout/header"
import { Sidebar } from "@/components/layout/sidebar"
import { Card } from "@/components/ui/card"

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

export default function StudentAnnouncementsPage() {
  const announcements = [
    {
      title: "Pengumuman Ujian Akhir Semester",
      date: "22 Okt 2024",
      priority: "high",
      content: "Ujian Akhir Semester akan dilaksanakan pada tanggal 1-15 Desember 2024...",
    },
    {
      title: "Libur Hari Raya Idul Adha",
      date: "20 Okt 2024",
      priority: "normal",
      content: "Sekolah akan libur pada tanggal 16-17 Juni 2024 untuk memperingati Hari Raya Idul Adha...",
    },
    {
      title: "Perbaikan Nilai Tersedia",
      date: "18 Okt 2024",
      priority: "normal",
      content: "Kesempatan perbaikan nilai untuk siswa yang belum mencapai KKM telah dibuka...",
    },
    {
      title: "Pengumuman Kegiatan Ekstrakurikuler",
      date: "15 Okt 2024",
      priority: "normal",
      content: "Pendaftaran ekstrakurikuler tahun ajaran 2024/2025 telah dibuka...",
    },
  ]

  return (
    <div className="flex h-screen bg-neutral-50">
      <Sidebar items={studentNavItems} userRole="Siswa" />

      <div className="flex-1 flex flex-col overflow-hidden">
        <Header title="Pengumuman" userName="Ahmad Rizki" />

        <main className="flex-1 overflow-auto p-8">
          <div className="space-y-4">
            {announcements.map((announcement, idx) => (
              <Card key={idx} className="hover:shadow-lg transition-shadow cursor-pointer">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-bold text-neutral-900">{announcement.title}</h3>
                      {announcement.priority === "high" && (
                        <span className="px-3 py-1 bg-red-100 text-red-700 text-xs font-medium rounded-full">
                          Penting
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-neutral-500 mb-3">{announcement.date}</p>
                    <p className="text-neutral-700">{announcement.content}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </main>
      </div>
    </div>
  )
}
