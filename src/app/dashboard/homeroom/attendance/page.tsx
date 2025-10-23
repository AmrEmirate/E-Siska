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

export default function HomeroomAttendancePage() {
  const attendanceStats = [
    { name: "Ahmad Rizki", hadir: 95, sakit: 2, izin: 1, alfa: 0 },
    { name: "Siti Nurhaliza", hadir: 98, sakit: 1, izin: 0, alfa: 0 },
    { name: "Budi Wijaya", hadir: 92, sakit: 3, izin: 2, alfa: 1 },
    { name: "Rina Kusuma", hadir: 96, sakit: 2, izin: 1, alfa: 0 },
    { name: "Doni Pratama", hadir: 94, sakit: 2, izin: 2, alfa: 0 },
  ]

  return (
    <div className="flex h-screen bg-neutral-50">
      <Sidebar items={homeroomNavItems} userRole="Wali Kelas" />

      <div className="flex-1 flex flex-col overflow-hidden">
        <Header title="Laporan Absensi Kelas" userName="Wali Kelas 1" />

        <main className="flex-1 overflow-auto p-8">
          <div className="space-y-6">
            {/* Overall Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <StatCard label="Total Hadir" value="475" icon="✓" color="bg-green-100 text-green-700" />
              <StatCard label="Total Sakit" value="10" icon="🤒" color="bg-yellow-100 text-yellow-700" />
              <StatCard label="Total Izin" value="6" icon="📝" color="bg-blue-100 text-blue-700" />
              <StatCard label="Total Alfa" value="1" icon="✗" color="bg-red-100 text-red-700" />
            </div>

            {/* Attendance Details */}
            <Card>
              <h3 className="text-xl font-bold text-neutral-900 mb-6">Detail Absensi Siswa</h3>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-neutral-200">
                      <th className="text-left py-3 px-4 font-semibold text-neutral-700">Nama Siswa</th>
                      <th className="text-center py-3 px-4 font-semibold text-neutral-700">Hadir</th>
                      <th className="text-center py-3 px-4 font-semibold text-neutral-700">Sakit</th>
                      <th className="text-center py-3 px-4 font-semibold text-neutral-700">Izin</th>
                      <th className="text-center py-3 px-4 font-semibold text-neutral-700">Alfa</th>
                    </tr>
                  </thead>
                  <tbody>
                    {attendanceStats.map((student, idx) => (
                      <tr key={idx} className="border-b border-neutral-100 hover:bg-neutral-50">
                        <td className="py-3 px-4 text-neutral-900">{student.name}</td>
                        <td className="py-3 px-4 text-center text-green-700 font-medium">{student.hadir}</td>
                        <td className="py-3 px-4 text-center text-yellow-700 font-medium">{student.sakit}</td>
                        <td className="py-3 px-4 text-center text-blue-700 font-medium">{student.izin}</td>
                        <td className="py-3 px-4 text-center text-red-700 font-medium">{student.alfa}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          </div>
        </main>
      </div>
    </div>
  )
}
