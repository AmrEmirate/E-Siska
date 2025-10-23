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

export default function StudentGradesPage() {
  const grades = [
    { subject: "Matematika", uts: 92, uas: 90, tugas: 88, average: 90 },
    { subject: "Fisika", uts: 85, uas: 87, tugas: 84, average: 85 },
    { subject: "Kimia", uts: 88, uas: 89, tugas: 87, average: 88 },
    { subject: "Biologi", uts: 90, uas: 91, tugas: 89, average: 90 },
    { subject: "Bahasa Indonesia", uts: 88, uas: 86, tugas: 90, average: 88 },
    { subject: "Bahasa Inggris", uts: 85, uas: 84, tugas: 86, average: 85 },
  ]

  return (
    <div className="flex h-screen bg-neutral-50">
      <Sidebar items={studentNavItems} userRole="Siswa" />

      <div className="flex-1 flex flex-col overflow-hidden">
        <Header title="Data Nilai" userName="Ahmad Rizki" />

        <main className="flex-1 overflow-auto p-8">
          <div className="space-y-6">
            <Card>
              <h3 className="text-xl font-bold text-neutral-900 mb-6">Nilai Semester Ganjil 2024/2025</h3>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-neutral-200">
                      <th className="text-left py-3 px-4 font-semibold text-neutral-700">Mata Pelajaran</th>
                      <th className="text-center py-3 px-4 font-semibold text-neutral-700">UTS</th>
                      <th className="text-center py-3 px-4 font-semibold text-neutral-700">UAS</th>
                      <th className="text-center py-3 px-4 font-semibold text-neutral-700">Tugas</th>
                      <th className="text-center py-3 px-4 font-semibold text-neutral-700">Rata-rata</th>
                    </tr>
                  </thead>
                  <tbody>
                    {grades.map((grade, idx) => (
                      <tr key={idx} className="border-b border-neutral-100 hover:bg-neutral-50">
                        <td className="py-3 px-4 text-neutral-900 font-medium">{grade.subject}</td>
                        <td className="py-3 px-4 text-center text-neutral-900">{grade.uts}</td>
                        <td className="py-3 px-4 text-center text-neutral-900">{grade.uas}</td>
                        <td className="py-3 px-4 text-center text-neutral-900">{grade.tugas}</td>
                        <td className="py-3 px-4 text-center">
                          <span className="px-3 py-1 bg-primary text-white rounded-full font-semibold text-sm">
                            {grade.average}
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
