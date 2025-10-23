"use client"

import { Header } from "@/components/layout/header"
import { Sidebar } from "@/components/layout/sidebar"
import { Card } from "@/components/ui/card"
import { StatCard } from "@/components/ui/stat-card"

const homeroomNavItems = [
  { label: "Dashboard", href: "/dashboard/homeroom", icon: "📊" },
  { label: "Profil", href: "/dashboard/homeroom/profile", icon: "👤" },
  { label: "Kelas Saya", href: "/dashboard/homeroom/class", icon: "👥" },
  { label: "Siswa", href: "/dashboard/homeroom/students", icon: "📋" },
  { label: "Absensi", href: "/dashboard/homeroom/attendance", icon: "📋" },
  { label: "Nilai", href: "/dashboard/homeroom/grades", icon: "📈" },
  { label: "Pengumuman", href: "/dashboard/homeroom/announcements", icon: "📢" },
]

export default function HomeroomDashboardPage() {
  return (
    <div className="flex h-screen bg-neutral-50">
      <Sidebar items={homeroomNavItems} userRole="Wali Kelas" />

      <div className="flex-1 flex flex-col overflow-hidden">
        <Header title="Dashboard Wali Kelas" userName="Wali Kelas 1" />

        <main className="flex-1 overflow-auto p-8">
          <div className="space-y-6">
            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <StatCard label="Total Siswa" value="35" icon="👥" color="bg-blue-100 text-blue-700" />
              <StatCard label="Hadir Hari Ini" value="33" icon="✓" color="bg-green-100 text-green-700" />
              <StatCard label="Rata-rata Nilai" value="85.5" icon="📈" color="bg-purple-100 text-purple-700" />
              <StatCard label="Pengumuman" value="5" icon="📢" color="bg-orange-100 text-orange-700" />
            </div>

            {/* Class Info */}
            <Card>
              <h3 className="text-xl font-bold text-neutral-900 mb-6">Informasi Kelas</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="text-sm font-medium text-neutral-600">Nama Kelas</label>
                  <p className="text-neutral-900 font-medium mt-1">XII IPA 1</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-neutral-600">Jumlah Siswa</label>
                  <p className="text-neutral-900 font-medium mt-1">35 Siswa</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-neutral-600">Tahun Ajaran</label>
                  <p className="text-neutral-900 font-medium mt-1">2024/2025</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-neutral-600">Ruang Kelas</label>
                  <p className="text-neutral-900 font-medium mt-1">Ruang 12</p>
                </div>
              </div>
            </Card>

            {/* Recent Activities */}
            <Card>
              <h3 className="text-xl font-bold text-neutral-900 mb-6">Aktivitas Terbaru</h3>
              <div className="space-y-4">
                {[
                  { activity: "Input nilai Matematika", date: "22 Okt 2024" },
                  { activity: "Absensi kelas XII IPA 1", date: "21 Okt 2024" },
                  { activity: "Pengumuman untuk siswa", date: "20 Okt 2024" },
                ].map((item, idx) => (
                  <div key={idx} className="flex justify-between items-center p-3 bg-neutral-50 rounded-lg">
                    <p className="text-neutral-900">{item.activity}</p>
                    <p className="text-sm text-neutral-500">{item.date}</p>
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
