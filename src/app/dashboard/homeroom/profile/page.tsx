"use client"

import { Header } from "@/components/layout/header"
import { Sidebar } from "@/components/layout/sidebar"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

const homeroomNavItems = [
  { label: "Dashboard", href: "/dashboard/homeroom", icon: "📊" },
  { label: "Profil", href: "/dashboard/homeroom/profile", icon: "👤" },
  { label: "Kelas Saya", href: "/dashboard/homeroom/class", icon: "👥" },
  { label: "Siswa", href: "/dashboard/homeroom/students", icon: "📋" },
  { label: "Absensi", href: "/dashboard/homeroom/attendance", icon: "📋" },
  { label: "Nilai", href: "/dashboard/homeroom/grades", icon: "📈" },
  { label: "Pengumuman", href: "/dashboard/homeroom/announcements", icon: "📢" },
]

export default function HomeroomProfilePage() {
  return (
    <div className="flex h-screen bg-neutral-50">
      <Sidebar items={homeroomNavItems} userRole="Wali Kelas" />

      <div className="flex-1 flex flex-col overflow-hidden">
        <Header title="Profil Wali Kelas" userName="Wali Kelas 1" />

        <main className="flex-1 overflow-auto p-8">
          <div className="space-y-6">
            {/* Profile Header */}
            <Card className="bg-gradient-to-r from-primary to-secondary text-white p-8">
              <div className="flex items-center gap-6">
                <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center text-4xl">👤</div>
                <div>
                  <h2 className="text-3xl font-bold">Wali Kelas 1</h2>
                  <p className="text-primary-light">NIP: 198904101234567893</p>
                </div>
              </div>
            </Card>

            {/* Personal Information */}
            <Card>
              <h3 className="text-xl font-bold text-neutral-900 mb-6">Informasi Pribadi</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="text-sm font-medium text-neutral-600">Nama Lengkap</label>
                  <p className="text-neutral-900 font-medium mt-1">Wali Kelas 1</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-neutral-600">Nomor Induk Pegawai</label>
                  <p className="text-neutral-900 font-medium mt-1">198904101234567893</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-neutral-600">Tempat Lahir</label>
                  <p className="text-neutral-900 font-medium mt-1">Jakarta</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-neutral-600">Tanggal Lahir</label>
                  <p className="text-neutral-900 font-medium mt-1">10 April 1989</p>
                </div>
              </div>
            </Card>

            {/* Class Information */}
            <Card>
              <h3 className="text-xl font-bold text-neutral-900 mb-6">Informasi Kelas</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="text-sm font-medium text-neutral-600">Kelas yang Diampu</label>
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
                  <label className="text-sm font-medium text-neutral-600">Status</label>
                  <p className="text-neutral-900 font-medium mt-1">Aktif</p>
                </div>
              </div>
            </Card>

            {/* Contact Information */}
            <Card>
              <h3 className="text-xl font-bold text-neutral-900 mb-6">Informasi Kontak</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="text-sm font-medium text-neutral-600">Nomor Telepon</label>
                  <p className="text-neutral-900 font-medium mt-1">+62 812-3456-7890</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-neutral-600">Alamat</label>
                  <p className="text-neutral-900 font-medium mt-1">Jl. Pendidikan No. 456, Jakarta</p>
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
