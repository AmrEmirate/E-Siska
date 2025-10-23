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

export default function HomeroomStudentsPage() {
  const students = [
    { id: "1", nis: "2024001", name: "Ahmad Rizki", status: "Aktif" },
    { id: "2", nis: "2024002", name: "Siti Nurhaliza", status: "Aktif" },
    { id: "3", nis: "2024003", name: "Budi Wijaya", status: "Aktif" },
    { id: "4", nis: "2024004", name: "Rina Kusuma", status: "Aktif" },
    { id: "5", nis: "2024005", name: "Doni Pratama", status: "Aktif" },
  ]

  return (
    <div className="flex h-screen bg-neutral-50">
      <Sidebar items={homeroomNavItems} userRole="Wali Kelas" />

      <div className="flex-1 flex flex-col overflow-hidden">
        <Header title="Daftar Siswa" userName="Wali Kelas 1" />

        <main className="flex-1 overflow-auto p-8">
          <div className="space-y-6">
            <Card>
              <h3 className="text-xl font-bold text-neutral-900 mb-6">Daftar Siswa Kelas XII IPA 1</h3>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-neutral-200">
                      <th className="text-left py-3 px-4 font-semibold text-neutral-700">No</th>
                      <th className="text-left py-3 px-4 font-semibold text-neutral-700">NIS</th>
                      <th className="text-left py-3 px-4 font-semibold text-neutral-700">Nama Siswa</th>
                      <th className="text-left py-3 px-4 font-semibold text-neutral-700">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {students.map((student, idx) => (
                      <tr key={student.id} className="border-b border-neutral-100 hover:bg-neutral-50">
                        <td className="py-3 px-4 text-neutral-900">{idx + 1}</td>
                        <td className="py-3 px-4 text-neutral-900">{student.nis}</td>
                        <td className="py-3 px-4 text-neutral-900">{student.name}</td>
                        <td className="py-3 px-4">
                          <span className="px-3 py-1 bg-green-100 text-green-700 text-sm rounded-full">
                            {student.status}
                          </span>
                        </td>
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
