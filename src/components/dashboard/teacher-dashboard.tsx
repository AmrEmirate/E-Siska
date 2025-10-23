"use client"

import { Card } from "@/components/ui/card"
import { StatCard } from "@/components/ui/stat-card"
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

export function TeacherDashboard() {
  const classPerformanceData = [
    { class: "XII IPA 1", avgScore: 85, students: 32 },
    { class: "XII IPA 2", avgScore: 82, students: 31 },
    { class: "XI IPA 1", avgScore: 88, students: 33 },
    { class: "XI IPA 2", avgScore: 80, students: 32 },
  ]

  const attendanceTrendData = [
    { week: "Minggu 1", attendance: 92 },
    { week: "Minggu 2", attendance: 94 },
    { week: "Minggu 3", attendance: 89 },
    { week: "Minggu 4", attendance: 96 },
  ]

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-primary to-secondary text-white rounded-xl p-8">
        <h2 className="text-3xl font-bold mb-2">Selamat Datang, Budi Santoso!</h2>
        <p className="text-primary-light">Mengajar: Matematika | Status: Aktif</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard label="Total Siswa" value="128" icon="👥" color="bg-blue-100 text-blue-700" />
        <StatCard label="Kelas Aktif" value="4" icon="🏫" color="bg-green-100 text-green-700" />
        <StatCard label="Tugas Belum Dinilai" value="12" icon="📝" color="bg-yellow-100 text-yellow-700" />
        <StatCard label="Rata-rata Kelas" value="84" icon="📊" color="bg-purple-100 text-purple-700" />
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Class Performance */}
        <Card>
          <h3 className="text-xl font-bold text-neutral-900 mb-6">Performa Kelas</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={classPerformanceData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="class" stroke="#6b7280" />
              <YAxis stroke="#6b7280" />
              <Tooltip contentStyle={{ backgroundColor: "#f9fafb", border: "1px solid #e5e7eb" }} />
              <Bar dataKey="avgScore" fill="#0f766e" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Card>

        {/* Attendance Trend */}
        <Card>
          <h3 className="text-xl font-bold text-neutral-900 mb-6">Tren Kehadiran</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={attendanceTrendData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="week" stroke="#6b7280" />
              <YAxis stroke="#6b7280" />
              <Tooltip contentStyle={{ backgroundColor: "#f9fafb", border: "1px solid #e5e7eb" }} />
              <Line type="monotone" dataKey="attendance" stroke="#1e3a8a" strokeWidth={2} dot={{ fill: "#1e3a8a" }} />
            </LineChart>
          </ResponsiveContainer>
        </Card>
      </div>

      {/* Classes Overview */}
      <Card>
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-neutral-900">Kelas Saya</h3>
          <a href="#" className="text-primary hover:text-primary-dark text-sm font-medium">
            Kelola Semua →
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            { name: "XII IPA 1", students: 32, status: "Aktif", avgScore: 85 },
            { name: "XII IPA 2", students: 31, status: "Aktif", avgScore: 82 },
            { name: "XI IPA 1", students: 33, status: "Aktif", avgScore: 88 },
            { name: "XI IPA 2", students: 32, status: "Aktif", avgScore: 80 },
          ].map((item, idx) => (
            <div
              key={idx}
              className="p-4 bg-neutral-50 rounded-lg hover:bg-neutral-100 transition-colors cursor-pointer"
            >
              <div className="flex items-start justify-between mb-3">
                <div>
                  <p className="font-semibold text-neutral-900">{item.name}</p>
                  <p className="text-sm text-neutral-500">{item.students} Siswa</p>
                </div>
                <span className="px-2 py-1 bg-green-100 text-green-700 text-xs font-medium rounded">{item.status}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-neutral-600">Rata-rata:</span>
                <span className="font-bold text-primary">{item.avgScore}</span>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Pending Tasks */}
      <Card>
        <h3 className="text-xl font-bold text-neutral-900 mb-6">Tugas Menunggu</h3>

        <div className="space-y-4">
          {[
            { task: "Nilai UTS XII IPA 1", dueDate: "23 Okt 2024", priority: "high" },
            { task: "Input Nilai Tugas XI IPA 2", dueDate: "24 Okt 2024", priority: "normal" },
            { task: "Verifikasi Absensi Bulan Okt", dueDate: "25 Okt 2024", priority: "normal" },
          ].map((item, idx) => (
            <div
              key={idx}
              className="p-4 bg-neutral-50 rounded-lg hover:bg-neutral-100 transition-colors cursor-pointer"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <p className="font-medium text-neutral-900">{item.task}</p>
                  <p className="text-sm text-neutral-500 mt-1">Deadline: {item.dueDate}</p>
                </div>
                {item.priority === "high" && (
                  <span className="px-3 py-1 bg-red-100 text-red-700 text-xs font-medium rounded-full">Penting</span>
                )}
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  )
}
