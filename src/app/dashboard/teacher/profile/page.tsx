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

export default function TeacherProfilePage() {
  return (
    <div className="flex h-screen bg-neutral-50">
      <Sidebar items={teacherNavItems} userRole="Guru" />

      <div className="flex-1 flex flex-col overflow-hidden">
        <Header title="Profil Guru" userName="Budi Santoso" />

        <main className="flex-1 overflow-auto p-8">
          <div className="space-y-6">
            <Card className="bg-gradient-to-r from-primary to-secondary text-white p-8">
              <div className="flex items-center gap-6">
                <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center text-4xl">👨‍🏫</div>
                <div>
                  <h2 className="text-3xl font-bold">Budi Santoso</h2>
                  <p className="text-primary-light">NIP: 198505151234567890</p>
                </div>
              </div>
            </Card>

            <Card>
              <h3 className="text-xl font-bold text-neutral-900 mb-6">Informasi Pribadi</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="text-sm font-medium text-neutral-600">Nama Lengkap</label>
                  <p className="text-neutral-900 font-medium mt-1">Budi Santoso, S.Pd</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-neutral-600">NIP</label>
                  <p className="text-neutral-900 font-medium mt-1">198505151234567890</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-neutral-600">Mata Pelajaran</label>
                  <p className="text-neutral-900 font-medium mt-1">Matematika</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-neutral-600">Status</label>
                  <p className="text-neutral-900 font-medium mt-1">Aktif</p>
                </div>
              </div>
            </Card>

            <Card>
              <h3 className="text-xl font-bold text-neutral-900 mb-6">Informasi Kontak</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="text-sm font-medium text-neutral-600">Email</label>
                  <p className="text-neutral-900 font-medium mt-1">budi.santoso@sekolah.ac.id</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-neutral-600">Nomor Telepon</label>
                  <p className="text-neutral-900 font-medium mt-1">+62 812-3456-7890</p>
                </div>
              </div>
            </Card>

            <div className="flex gap-4">
              <Button className="bg-primary hover:bg-primary-dark">Edit Profil</Button>
              <Button variant="outline">Ubah Password</Button>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
