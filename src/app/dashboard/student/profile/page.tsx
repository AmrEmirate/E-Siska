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

export default function StudentProfilePage() {
  return (
    <div className="flex h-screen bg-neutral-50">
      <Sidebar items={studentNavItems} userRole="Siswa" />

      <div className="flex-1 flex flex-col overflow-hidden">
        <Header title="Profil Siswa" userName="Ahmad Rizki" />

        <main className="flex-1 overflow-auto p-8">
          <div className="space-y-6">
            {/* Profile Header */}
            <Card className="bg-gradient-to-r from-primary to-secondary text-white p-8">
              <div className="flex items-center gap-6">
                <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center text-4xl">👤</div>
                <div>
                  <h2 className="text-3xl font-bold">Ahmad Rizki</h2>
                  <p className="text-primary-light">NIS: 2024001</p>
                </div>
              </div>
            </Card>

            {/* Personal Information */}
            <Card>
              <h3 className="text-xl font-bold text-neutral-900 mb-6">Informasi Pribadi</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="text-sm font-medium text-neutral-600">Nama Lengkap</label>
                  <p className="text-neutral-900 font-medium mt-1">Ahmad Rizki Pratama</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-neutral-600">Nomor Induk Siswa</label>
                  <p className="text-neutral-900 font-medium mt-1">2024001</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-neutral-600">Tempat Lahir</label>
                  <p className="text-neutral-900 font-medium mt-1">Jakarta</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-neutral-600">Tanggal Lahir</label>
                  <p className="text-neutral-900 font-medium mt-1">15 Mei 2006</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-neutral-600">Jenis Kelamin</label>
                  <p className="text-neutral-900 font-medium mt-1">Laki-laki</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-neutral-600">Agama</label>
                  <p className="text-neutral-900 font-medium mt-1">Islam</p>
                </div>
              </div>
            </Card>

            {/* Academic Information */}
            <Card>
              <h3 className="text-xl font-bold text-neutral-900 mb-6">Informasi Akademik</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="text-sm font-medium text-neutral-600">Kelas</label>
                  <p className="text-neutral-900 font-medium mt-1">XII IPA 1</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-neutral-600">Wali Kelas</label>
                  <p className="text-neutral-900 font-medium mt-1">Ibu Siti Nurhaliza</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-neutral-600">Tahun Ajaran</label>
                  <p className="text-neutral-900 font-medium mt-1">2024/2025</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-neutral-600">Status</label>
                  <p className="text-neutral-900 font-medium mt-1">Aktif</p>
                </div>
              </div>
            </Card>

            {/* Contact Information - Removed email field */}
            <Card>
              <h3 className="text-xl font-bold text-neutral-900 mb-6">Informasi Kontak</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="text-sm font-medium text-neutral-600">Nomor Telepon</label>
                  <p className="text-neutral-900 font-medium mt-1">+62 812-3456-7890</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-neutral-600">Alamat</label>
                  <p className="text-neutral-900 font-medium mt-1">Jl. Merdeka No. 123, Jakarta</p>
                </div>
              </div>
            </Card>

            {/* Action Buttons */}
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
