"use client"

import { Header } from "@/components/layout/header"
import { Sidebar } from "@/components/layout/sidebar"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

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

export default function StudentReportPage() {
  return (
    <div className="flex h-screen bg-neutral-50">
      <Sidebar items={studentNavItems} userRole="Siswa" />

      <div className="flex-1 flex flex-col overflow-hidden">
        <Header title="Rapor Siswa" userName="Ahmad Rizki" />

        <main className="flex-1 overflow-auto p-8">
          <div className="space-y-6">
            <Card>
              <h3 className="text-xl font-bold text-neutral-900 mb-6">Rapor Semester Ganjil 2024/2025</h3>
              <div className="space-y-4">
                <div className="p-4 bg-neutral-50 rounded-lg">
                  <p className="text-sm text-neutral-600">Nama Siswa</p>
                  <p className="font-semibold text-neutral-900">Ahmad Rizki Pratama</p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-neutral-50 rounded-lg">
                    <p className="text-sm text-neutral-600">Kelas</p>
                    <p className="font-semibold text-neutral-900">XII IPA 1</p>
                  </div>
                  <div className="p-4 bg-neutral-50 rounded-lg">
                    <p className="text-sm text-neutral-600">Tahun Ajaran</p>
                    <p className="font-semibold text-neutral-900">2024/2025</p>
                  </div>
                </div>
                <div className="p-4 bg-neutral-50 rounded-lg">
                  <p className="text-sm text-neutral-600">Rata-rata Nilai</p>
                  <p className="font-semibold text-neutral-900 text-2xl">88.5</p>
                </div>
                <div className="p-4 bg-neutral-50 rounded-lg">
                  <p className="text-sm text-neutral-600">Peringkat Kelas</p>
                  <p className="font-semibold text-neutral-900">5 dari 35 siswa</p>
                </div>
              </div>
              <div className="mt-6 flex gap-4">
                <Button className="bg-primary hover:bg-primary-dark">Download Rapor</Button>
                <Button variant="outline">Cetak</Button>
              </div>
            </Card>
          </div>
        </main>
      </div>
    </div>
  )
}
