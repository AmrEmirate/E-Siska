"use client"

import { useAuth } from "@/context/auth-context"
import { useDashboardStats } from "@/hooks/use-dashboard"

export default function DashboardPage() {
  const { user } = useAuth()
  const { totalSiswa, totalGuru, totalKelas, tahunAjaran, loading } = useDashboardStats()

  return (
    <div className="p-8">
      <div className="max-w-7xl">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Selamat Datang, {user?.name}! 👋</h1>
          <p className="text-gray-600">Kelola data akademik dan administrasi sekolah dengan mudah</p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="card p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">Total Siswa</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">
                  {loading ? "..." : totalSiswa}
                </p>
              </div>
              <span className="text-4xl">👥</span>
            </div>
          </div>

          <div className="card p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">Total Guru</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">
                  {loading ? "..." : totalGuru}
                </p>
              </div>
              <span className="text-4xl">🎓</span>
            </div>
          </div>

          <div className="card p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">Total Kelas</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">
                  {loading ? "..." : totalKelas}
                </p>
              </div>
              <span className="text-4xl">🏫</span>
            </div>
          </div>

          <div className="card p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">Tahun Ajaran</p>
                <p className="text-3xl font-bold text-red-600 mt-2">
                  {loading ? "..." : tahunAjaran}
                </p>
              </div>
              <span className="text-4xl">📅</span>
            </div>
          </div>
        </div>

        {/* Features Preview */}
        <div className="card p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Fitur Utama</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="p-4 bg-red-50 rounded-lg border border-red-200">
              <p className="text-lg font-semibold text-red-900">📊 Manajemen Data</p>
              <p className="text-sm text-red-700 mt-1">Kelola data siswa, guru, dan kelas dengan efisien</p>
            </div>
            <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
              <p className="text-lg font-semibold text-blue-900">📝 Nilai & Absensi</p>
              <p className="text-sm text-blue-700 mt-1">Input dan pantau nilai serta kehadiran siswa</p>
            </div>
            <div className="p-4 bg-green-50 rounded-lg border border-green-200">
              <p className="text-lg font-semibold text-green-900">📄 Rapor Digital</p>
              <p className="text-sm text-green-700 mt-1">Generate dan cetak rapor siswa dengan mudah</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
