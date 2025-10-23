"use client"

import { Header } from "@/components/layout/header"
import { Sidebar } from "@/components/layout/sidebar"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

const adminNavItems = [
  { label: "Dashboard", href: "/dashboard/admin", icon: "📊" },
  { label: "Kelola Siswa", href: "/dashboard/admin/students", icon: "👥" },
  { label: "Kelola Guru", href: "/dashboard/admin/teachers", icon: "👨‍🏫" },
  { label: "Kelola Kelas", href: "/dashboard/admin/classes", icon: "🏫" },
  { label: "Mata Pelajaran", href: "/dashboard/admin/subjects", icon: "📚" },
  { label: "Pengumuman", href: "/dashboard/admin/announcements", icon: "📢" },
  { label: "Dokumen", href: "/dashboard/admin/documents", icon: "📁" },
  { label: "Backup & Restore", href: "/dashboard/admin/backup", icon: "💾" },
]

export default function AdminBackupPage() {
  return (
    <div className="flex h-screen bg-neutral-50">
      <Sidebar items={adminNavItems} userRole="Admin" />

      <div className="flex-1 flex flex-col overflow-hidden">
        <Header title="Backup & Restore" userName="Admin Sekolah" />

        <main className="flex-1 overflow-auto p-8">
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <h3 className="text-xl font-bold text-neutral-900 mb-4">Buat Backup</h3>
                <p className="text-neutral-600 mb-4">Buat backup data sistem untuk keamanan data</p>
                <Button className="bg-primary hover:bg-primary-dark w-full">Buat Backup Sekarang</Button>
              </Card>

              <Card>
                <h3 className="text-xl font-bold text-neutral-900 mb-4">Restore Data</h3>
                <p className="text-neutral-600 mb-4">Pulihkan data dari backup sebelumnya</p>
                <Button variant="outline" className="w-full bg-transparent">
                  Pilih File Backup
                </Button>
              </Card>
            </div>

            <Card>
              <h3 className="text-xl font-bold text-neutral-900 mb-6">Riwayat Backup</h3>
              <div className="space-y-3">
                {[1, 2, 3].map((item) => (
                  <div key={item} className="flex items-center justify-between p-4 bg-neutral-50 rounded-lg">
                    <div>
                      <p className="font-medium text-neutral-900">Backup {item}</p>
                      <p className="text-sm text-neutral-500">22 Okt 2024 - 10:30 AM</p>
                    </div>
                    <Button variant="outline" size="sm">
                      Download
                    </Button>
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
