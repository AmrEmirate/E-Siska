"use client"

import { Header } from "@/components/layout/header"
import { Sidebar } from "@/components/layout/sidebar"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

const teacherNavItems = [
  { label: "Dashboard", href: "/dashboard/teacher", icon: "📊" },
  { label: "Profil", href: "/dashboard/teacher/profile", icon: "👤" },
  { label: "Kelas Saya", href: "/dashboard/teacher/classes", icon: "👥" },
  { label: "Absensi", href: "/dashboard/teacher/attendance", icon: "📋" },
  { label: "Input Nilai", href: "/dashboard/teacher/grades", icon: "📝" },
  { label: "Jadwal Mengajar", href: "/dashboard/teacher/schedule", icon: "📅" },
  { label: "Pengumuman", href: "/dashboard/teacher/announcements", icon: "📢" },
]

export default function TeacherAnnouncementsPage() {
  return (
    <div className="flex h-screen bg-neutral-50">
      <Sidebar items={teacherNavItems} userRole="Guru" />

      <div className="flex-1 flex flex-col overflow-hidden">
        <Header title="Pengumuman" userName="Budi Santoso" />

        <main className="flex-1 overflow-auto p-8">
          <div className="space-y-6">
            <Button className="bg-primary hover:bg-primary-dark">Buat Pengumuman Baru</Button>

            <Card>
              <h3 className="text-xl font-bold text-neutral-900 mb-6">Pengumuman Saya</h3>
              <div className="space-y-4">
                {[
                  { title: "Pengumuman Ujian Akhir Semester", date: "22 Okt 2024" },
                  { title: "Perbaikan Nilai Tersedia", date: "18 Okt 2024" },
                ].map((item, idx) => (
                  <div key={idx} className="p-4 bg-neutral-50 rounded-lg hover:bg-neutral-100 transition-colors">
                    <p className="font-medium text-neutral-900">{item.title}</p>
                    <p className="text-sm text-neutral-500 mt-1">{item.date}</p>
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
