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

export default function HomeroomClassPage() {
  return (
    <div className="flex h-screen bg-neutral-50">
      <Sidebar items={homeroomNavItems} userRole="Wali Kelas" />

      <div className="flex-1 flex flex-col overflow-hidden">
        <Header title="Kelas Saya" userName="Wali Kelas 1" />

        <main className="flex-1 overflow-auto p-8">
          <div className="space-y-6">
            <Card>
              <h3 className="text-xl font-bold text-neutral-900 mb-6">Informasi Kelas XII IPA 1</h3>
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
                  <label className="text-sm font-medium text-neutral-600">Ruang Kelas</label>
                  <p className="text-neutral-900 font-medium mt-1">Ruang 12</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-neutral-600">Tahun Ajaran</label>
                  <p className="text-neutral-900 font-medium mt-1">2024/2025</p>
                </div>
              </div>
            </Card>

            <Card>
              <h3 className="text-xl font-bold text-neutral-900 mb-6">Jadwal Pelajaran</h3>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-neutral-200">
                      <th className="text-left py-3 px-4 font-semibold text-neutral-700">Hari</th>
                      <th className="text-left py-3 px-4 font-semibold text-neutral-700">Jam</th>
                      <th className="text-left py-3 px-4 font-semibold text-neutral-700">Mata Pelajaran</th>
                      <th className="text-left py-3 px-4 font-semibold text-neutral-700">Guru</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { hari: "Senin", jam: "07:00-08:30", mapel: "Matematika", guru: "Budi Santoso" },
                      { hari: "Senin", jam: "08:30-10:00", mapel: "Fisika", guru: "Ahmad Suryanto" },
                      { hari: "Selasa", jam: "07:00-08:30", mapel: "Bahasa Indonesia", guru: "Siti Rahayu" },
                      { hari: "Selasa", jam: "08:30-10:00", mapel: "Kimia", guru: "Budi Santoso" },
                    ].map((item, idx) => (
                      <tr key={idx} className="border-b border-neutral-100 hover:bg-neutral-50">
                        <td className="py-3 px-4 text-neutral-900">{item.hari}</td>
                        <td className="py-3 px-4 text-neutral-900">{item.jam}</td>
                        <td className="py-3 px-4 text-neutral-900">{item.mapel}</td>
                        <td className="py-3 px-4 text-neutral-900">{item.guru}</td>
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
