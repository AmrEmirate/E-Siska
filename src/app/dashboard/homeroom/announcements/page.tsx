"use client"

import { Header } from "@/components/layout/header"
import { Sidebar } from "@/components/layout/sidebar"
import { Card } from "@/components/ui/card"

const homeroomNavItems = [
  { label: "Dashboard", href: "/dashboard/homeroom", icon: "📊" },
  { label: "Profil", href: "/dashboard/homeroom/profile", icon: "👤" },
  { label: "Kelas Saya", href: "/dashboard/homeroom/class", icon: "👥" },
  { label: "Siswa", href: "/dashboard/homeroom/students", icon: "📋" },
  { label: "Absensi", href: "/dashboard/homeroom/attendance", icon: "📋" },
  { label: "Nilai", href: "/dashboard/homeroom/grades", icon: "📈" },
  { label: "Pengumuman", href: "/dashboard/homeroom/announcements", icon: "📢" },
]

export default function HomeroomAnnouncementsPage() {
  const announcements = [
    { id: "1", title: "Pengumuman Penting", content: "Libur sekolah dimulai tanggal 1 November", date: "22 Okt 2024" },
    { id: "2", title: "Jadwal UTS", content: "UTS akan dilaksanakan mulai tanggal 5 November", date: "21 Okt 2024" },
    { id: "3", title: "Pengumpulan Tugas", content: "Tugas Matematika dikumpulkan hari Jumat", date: "20 Okt 2024" },
  ]

  return (
    <div className="flex h-screen bg-neutral-50">
      <Sidebar items={homeroomNavItems} userRole="Wali Kelas" />

      <div className="flex-1 flex flex-col overflow-hidden">
        <Header title="Pengumuman" userName="Wali Kelas 1" />

        <main className="flex-1 overflow-auto p-8">
          <div className="space-y-6">
            <Card>
              <h3 className="text-xl font-bold text-neutral-900 mb-6">Daftar Pengumuman</h3>
              <div className="space-y-4">
                {announcements.map((announcement) => (
                  <div
                    key={announcement.id}
                    className="p-4 bg-neutral-50 rounded-lg hover:bg-neutral-100 transition-colors"
                  >
                    <p className="font-bold text-neutral-900 text-lg">{announcement.title}</p>
                    <p className="text-sm text-neutral-500 mt-1">{announcement.date}</p>
                    <p className="text-neutral-700 mt-2">{announcement.content}</p>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </main>
      </div>
    </div>
  )
}
