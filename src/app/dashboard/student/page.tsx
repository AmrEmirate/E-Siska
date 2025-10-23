"use client"

import { Header } from "@/components/layout/header"
import { Sidebar } from "@/components/layout/sidebar"
import { StudentDashboard } from "@/components/dashboard/student-dashboard"

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

export default function StudentPage() {
  return (
    <div className="flex h-screen bg-neutral-50">
      <Sidebar items={studentNavItems} userRole="Siswa" />

      <div className="flex-1 flex flex-col overflow-hidden">
        <Header title="Dashboard Siswa" userName="Ahmad Rizki" />

        <main className="flex-1 overflow-auto p-8">
          <StudentDashboard />
        </main>
      </div>
    </div>
  )
}
