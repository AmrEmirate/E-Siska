"use client";

import { useAuth } from "@/context/auth-context";
import { useDashboardStats } from "@/hooks/use-dashboard";

export default function DashboardPage() {
  const { user } = useAuth();
  const { totalSiswa, totalGuru, totalKelas, tahunAjaran, loading } =
    useDashboardStats();

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl">
        <div className="mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-1 sm:mb-2">
            Selamat Datang, {user?.name}! 👋
          </h1>
          <p className="text-sm sm:text-base text-gray-600">
            Kelola data akademik dan administrasi sekolah dengan mudah
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6 mb-6 sm:mb-8">
          <div className="card p-4 sm:p-6">
            <div className="flex items-center justify-between">
              <div className="min-w-0 flex-1">
                <p className="text-gray-600 text-xs sm:text-sm font-medium">
                  Total Siswa
                </p>
                <p className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 mt-1 sm:mt-2">
                  {loading ? "..." : totalSiswa}
                </p>
              </div>
              <span className="text-2xl sm:text-3xl lg:text-4xl flex-shrink-0">
                👥
              </span>
            </div>
          </div>

          <div className="card p-4 sm:p-6">
            <div className="flex items-center justify-between">
              <div className="min-w-0 flex-1">
                <p className="text-gray-600 text-xs sm:text-sm font-medium">
                  Total Guru
                </p>
                <p className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 mt-1 sm:mt-2">
                  {loading ? "..." : totalGuru}
                </p>
              </div>
              <span className="text-2xl sm:text-3xl lg:text-4xl flex-shrink-0">
                🎓
              </span>
            </div>
          </div>

          <div className="card p-4 sm:p-6">
            <div className="flex items-center justify-between">
              <div className="min-w-0 flex-1">
                <p className="text-gray-600 text-xs sm:text-sm font-medium">
                  Total Kelas
                </p>
                <p className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 mt-1 sm:mt-2">
                  {loading ? "..." : totalKelas}
                </p>
              </div>
              <span className="text-2xl sm:text-3xl lg:text-4xl flex-shrink-0">
                🏫
              </span>
            </div>
          </div>

          <div className="card p-4 sm:p-6">
            <div className="flex items-center justify-between">
              <div className="min-w-0 flex-1">
                <p className="text-gray-600 text-xs sm:text-sm font-medium">
                  Tahun Ajaran
                </p>
                <p className="text-lg sm:text-2xl lg:text-3xl font-bold text-red-600 mt-1 sm:mt-2 truncate">
                  {loading ? "..." : tahunAjaran}
                </p>
              </div>
              <span className="text-2xl sm:text-3xl lg:text-4xl flex-shrink-0">
                📅
              </span>
            </div>
          </div>
        </div>

        <div className="card p-4 sm:p-6 lg:p-8">
          <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 mb-4 sm:mb-6">
            Fitur Utama
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 lg:gap-6">
            <div className="p-3 sm:p-4 bg-red-50 rounded-lg border border-red-200">
              <p className="text-base sm:text-lg font-semibold text-red-900">
                📊 Manajemen Data
              </p>
              <p className="text-xs sm:text-sm text-red-700 mt-1">
                Kelola data siswa, guru, dan kelas dengan efisien
              </p>
            </div>
            <div className="p-3 sm:p-4 bg-blue-50 rounded-lg border border-blue-200">
              <p className="text-base sm:text-lg font-semibold text-blue-900">
                📝 Nilai & Absensi
              </p>
              <p className="text-xs sm:text-sm text-blue-700 mt-1">
                Input dan pantau nilai serta kehadiran siswa
              </p>
            </div>
            <div className="p-3 sm:p-4 bg-green-50 rounded-lg border border-green-200">
              <p className="text-base sm:text-lg font-semibold text-green-900">
                📄 Rapor Digital
              </p>
              <p className="text-xs sm:text-sm text-green-700 mt-1">
                Generate dan cetak rapor siswa dengan mudah
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
