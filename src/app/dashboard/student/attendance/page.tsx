"use client"

import { useState, useEffect } from "react"
import { useAbsensi } from "@/hooks/use-absensi"
import { useAuth } from "@/context/auth-context"
import { Loader2 } from "lucide-react"

export default function StudentAttendancePage() {
  const { user } = useAuth()
  const { data: attendanceRecords, loading, stats, fetchAbsensiByStudent } = useAbsensi()

  useEffect(() => {
    if (user?.id) {
      fetchAbsensiByStudent(user.id)
    }
  }, [user?.id, fetchAbsensiByStudent])

  if (loading && attendanceRecords.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px]">
        <Loader2 className="animate-spin text-red-600 mb-4" size={40} />
        <p className="text-gray-500 font-medium">Memuat data absensi...</p>
      </div>
    )
  }

  return (
    <div className="p-8">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Absensi Saya</h1>
        <p className="text-gray-600">Lihat rekam jejak kehadiran Anda</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div className="card p-6">
          <p className="text-gray-600 text-sm">Total Hadir</p>
          <p className="text-3xl font-bold text-green-600 mt-2">{stats?.hadir || 0}</p>
        </div>
        <div className="card p-6">
          <p className="text-gray-600 text-sm">Sakit</p>
          <p className="text-3xl font-bold text-yellow-600 mt-2">{stats?.sakit || 0}</p>
        </div>
        <div className="card p-6">
          <p className="text-gray-600 text-sm">Izin</p>
          <p className="text-3xl font-bold text-blue-600 mt-2">{stats?.izin || 0}</p>
        </div>
        <div className="card p-6">
          <p className="text-gray-600 text-sm">Persentase</p>
          <p className="text-3xl font-bold text-red-600 mt-2">
            {stats?.total ? Math.round((stats.hadir / stats.total) * 100) : 0}%
          </p>
        </div>
      </div>

      <div className="card">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">Riwayat Absensi</h2>
        </div>
        <div className="overflow-x-auto">
          {attendanceRecords.length === 0 ? (
            <div className="p-8 text-center text-gray-500">Belum ada data absensi.</div>
          ) : (
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">Tanggal</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">Hari</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {attendanceRecords
                  .sort((a, b) => new Date(b.tanggal).getTime() - new Date(a.tanggal).getTime())
                  .map((record) => (
                    <tr key={record.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 text-sm font-medium text-gray-900">
                        {new Date(record.tanggal).toLocaleDateString("id-ID")}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-700">
                        {new Date(record.tanggal).toLocaleDateString("id-ID", { weekday: "long" })}
                      </td>
                      <td className="px-6 py-4 text-sm">
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            record.status === "HADIR"
                              ? "bg-green-100 text-green-800"
                              : record.status === "SAKIT"
                                ? "bg-yellow-100 text-yellow-800"
                                : record.status === "IZIN"
                                  ? "bg-blue-100 text-blue-800"
                                  : "bg-red-100 text-red-800"
                          }`}
                        >
                          {record.status}
                        </span>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  )
}
