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

export default function HomeroomGradesPage() {
  const gradesData = [
    { name: "Ahmad Rizki", matematika: 85, bahasaIndonesia: 88, bahasaInggris: 82, fisika: 86, kimia: 84 },
    { name: "Siti Nurhaliza", matematika: 92, bahasaIndonesia: 90, bahasaInggris: 89, fisika: 91, kimia: 93 },
    { name: "Budi Wijaya", matematika: 78, bahasaIndonesia: 80, bahasaInggris: 75, fisika: 79, kimia: 77 },
    { name: "Rina Kusuma", matematika: 88, bahasaIndonesia: 87, bahasaInggris: 86, fisika: 89, kimia: 88 },
    { name: "Doni Pratama", matematika: 82, bahasaIndonesia: 84, bahasaInggris: 81, fisika: 83, kimia: 82 },
  ]

  return (
    <div className="flex h-screen bg-neutral-50">
      <Sidebar items={homeroomNavItems} userRole="Wali Kelas" />

      <div className="flex-1 flex flex-col overflow-hidden">
        <Header title="Laporan Nilai Kelas" userName="Wali Kelas 1" />

        <main className="flex-1 overflow-auto p-8">
          <div className="space-y-6">
            <Card>
              <h3 className="text-xl font-bold text-neutral-900 mb-6">Nilai Siswa Kelas XII IPA 1</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-neutral-200">
                      <th className="text-left py-3 px-4 font-semibold text-neutral-700">Nama Siswa</th>
                      <th className="text-center py-3 px-4 font-semibold text-neutral-700">Matematika</th>
                      <th className="text-center py-3 px-4 font-semibold text-neutral-700">B. Indonesia</th>
                      <th className="text-center py-3 px-4 font-semibold text-neutral-700">B. Inggris</th>
                      <th className="text-center py-3 px-4 font-semibold text-neutral-700">Fisika</th>
                      <th className="text-center py-3 px-4 font-semibold text-neutral-700">Kimia</th>
                      <th className="text-center py-3 px-4 font-semibold text-neutral-700">Rata-rata</th>
                    </tr>
                  </thead>
                  <tbody>
                    {gradesData.map((student, idx) => {
                      const average = Math.round(
                        (student.matematika +
                          student.bahasaIndonesia +
                          student.bahasaInggris +
                          student.fisika +
                          student.kimia) /
                          5,
                      )
                      return (
                        <tr key={idx} className="border-b border-neutral-100 hover:bg-neutral-50">
                          <td className="py-3 px-4 text-neutral-900">{student.name}</td>
                          <td className="py-3 px-4 text-center text-neutral-900">{student.matematika}</td>
                          <td className="py-3 px-4 text-center text-neutral-900">{student.bahasaIndonesia}</td>
                          <td className="py-3 px-4 text-center text-neutral-900">{student.bahasaInggris}</td>
                          <td className="py-3 px-4 text-center text-neutral-900">{student.fisika}</td>
                          <td className="py-3 px-4 text-center text-neutral-900">{student.kimia}</td>
                          <td className="py-3 px-4 text-center font-bold text-primary">{average}</td>
                        </tr>
                      )
                    })}
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
