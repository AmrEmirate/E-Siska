"use client"

import { useAuth } from "@/context/auth-context"
import Link from "next/link"
import { usePathname } from "next/navigation"
import Image from "next/image"

export default function Sidebar() {
  const { user } = useAuth()
  const pathname = usePathname()

  const getMenuItems = (role: string | undefined) => {
    const commonItems = [{ href: "/dashboard", label: "Dashboard", icon: "📊" }]

    const roleMenus: Record<string, any[]> = {
      admin: [
        ...commonItems,
        { href: "/dashboard/admin/students", label: "Manajemen Siswa", icon: "👥" },
        { href: "/dashboard/admin/teachers", label: "Manajemen Guru", icon: "🎓" },
        { href: "/dashboard/admin/classes", label: "Manajemen Kelas", icon: "🏫" },
        { href: "/dashboard/admin/subjects", label: "Mata Pelajaran", icon: "📚" },
        { href: "/dashboard/admin/schedule", label: "Jadwal", icon: "📅" },
        { href: "/dashboard/admin/announcements", label: "Pengumuman", icon: "📢" },
        { href: "/dashboard/admin/documents", label: "Dokumen", icon: "📄" },
        { href: "/dashboard/admin/rooms", label: "Manajemen Ruangan", icon: "🏠" },
        { href: "/dashboard/admin/class-levels", label: "Tingkatan Kelas", icon: "📊" },
        { href: "/dashboard/admin/academic-years", label: "Tahun Ajaran", icon: "📅" },
        { href: "/dashboard/admin/teacher-assignment", label: "Penugasan Guru", icon: "👨‍🏫" },
        { href: "/dashboard/admin/student-placement", label: "Penempatan Siswa", icon: "📌" },
        { href: "/dashboard/admin/school-info", label: "Data Sekolah", icon: "🏢" },
      ],
      guru: [
        ...commonItems,
        { href: "/dashboard/teacher/grades", label: "Nilai & Kompetensi", icon: "📝" },
        { href: "/dashboard/teacher/attendance", label: "Absensi", icon: "✓" },
        { href: "/dashboard/teacher/schedule", label: "Jadwal Mengajar", icon: "📅" },
        { href: "/dashboard/teacher/announcements", label: "Pengumuman", icon: "📢" },
      ],
      wali_kelas: [
        ...commonItems,
        { href: "/dashboard/teacher/grades", label: "Nilai & Kompetensi", icon: "📝" },
        { href: "/dashboard/teacher/attendance", label: "Absensi", icon: "✓" },
        { href: "/dashboard/teacher/schedule", label: "Jadwal Mengajar", icon: "📅" },
        { href: "/dashboard/teacher/announcements", label: "Pengumuman", icon: "📢" },
        { href: "/dashboard/wali/grades", label: "Rekap Nilai", icon: "📊" },
        { href: "/dashboard/wali/attendance", label: "Rekap Absensi", icon: "✓" },
        { href: "/dashboard/wali/finalize-grades", label: "Finalisasi Rapor", icon: "🎖️" },
        { href: "/dashboard/wali/generate-report", label: "Cetak Rapor", icon: "🖨️" },
      ],
      siswa: [
        ...commonItems,
        { href: "/dashboard/student/attendance", label: "Absensi Saya", icon: "✓" },
        { href: "/dashboard/student/grades", label: "Nilai Saya", icon: "📝" },
        { href: "/dashboard/student/schedule", label: "Jadwal Pelajaran", icon: "📅" },
        { href: "/dashboard/student/announcements", label: "Pengumuman", icon: "📢" },
      ],
    }

    return roleMenus[role || ""] || commonItems
  }

  const menuItems = getMenuItems(user?.role)
  const isActive = (href: string) => {
    // Special handling for dashboard root - exact match only
    if (href === "/dashboard") {
      return pathname === "/dashboard"
    }
    // For other paths, check exact match or sub-paths
    return pathname === href || pathname.startsWith(href + "/")
  }

  return (
    <aside className="w-64 bg-white border-r border-gray-200 flex flex-col h-screen">
      {/* Logo */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center gap-2 mb-2">
          <Image
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-jfWqP0EvO9fLYgSZ0r4y1NyH1sKVaX.png"
            alt="E-Siska"
            width={40}
            height={40}
          />
          <div>
            <h1 className="font-bold text-gray-900">E-Siska</h1>
            <p className="text-xs text-gray-500">SDN Ciater 02</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-1">
        {menuItems.map((item) => (
          <Link key={item.href} href={item.href}>
            <span className={`sidebar-link ${isActive(item.href) ? "active" : ""}`}>
              <span className="text-xl">{item.icon}</span>
              <span className="font-medium">{item.label}</span>
            </span>
          </Link>
        ))}
      </nav>

      {/* Footer Info */}
      <div className="p-4 border-t border-gray-200 text-xs text-gray-500">
        <p className="font-semibold mb-1">Sekolah</p>
        <p>SDN Ciater 02</p>
        <p className="text-gray-400">Kota Tangerang Selatan</p>
      </div>
    </aside>
  )
}
