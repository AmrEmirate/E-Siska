"use client"

import { Card } from "@/components/ui/card"
import { StatCard } from "@/components/ui/stat-card"
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts"

export function AdminDashboard() {
  const userStatsData = [
    { category: "Siswa", count: 450 },
    { category: "Guru", count: 35 },
    { category: "Wali Kelas", count: 12 },
    { category: "Admin", count: 3 },
  ]

  const systemActivityData = [
    { date: "Senin", logins: 120, uploads: 45 },
    { date: "Selasa", logins: 135, uploads: 52 },
    { date: "Rabu", logins: 128, uploads: 48 },
    { date: "Kamis", logins: 142, uploads: 58 },
    { date: "Jumat", logins: 155, uploads: 65 },
  ]

  const storageData = [
    { name: "Dokumen", value: 35, fill: "#1e3a8a" },
    { name: "Media", value: 45, fill: "#0f766e" },
    { name: "Backup", value: 20, fill: "#f59e0b" },
  ]

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-primary to-secondary text-white rounded-xl p-8">
        <h2 className="text-3xl font-bold mb-2">Dashboard Administrasi</h2>
        <p className="text-primary-light">Kelola sistem E-SISKA dan data sekolah</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard label="Total Siswa" value="450" icon="👥" color="bg-blue-100 text-blue-700" />
        <StatCard label="Total Guru" value="35" icon="👨‍🏫" color="bg-green-100 text-green-700" />
        <StatCard label="Total Kelas" value="15" icon="🏫" color="bg-purple-100 text-purple-700" />
        <StatCard label="Uptime Sistem" value="99.8%" icon="⚙️" color="bg-yellow-100 text-yellow-700" />
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* User Distribution */}
        <Card>
          <h3 className="text-xl font-bold text-neutral-900 mb-6">Distribusi Pengguna</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={userStatsData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="category" stroke="#6b7280" />
              <YAxis stroke="#6b7280" />
              <Tooltip contentStyle={{ backgroundColor: "#f9fafb", border: "1px solid #e5e7eb" }} />
              <Bar dataKey="count" fill="#0f766e" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Card>

        {/* System Activity */}
        <Card>
          <h3 className="text-xl font-bold text-neutral-900 mb-6">Aktivitas Sistem</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={systemActivityData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="date" stroke="#6b7280" />
              <YAxis stroke="#6b7280" />
              <Tooltip contentStyle={{ backgroundColor: "#f9fafb", border: "1px solid #e5e7eb" }} />
              <Legend />
              <Line type="monotone" dataKey="logins" stroke="#1e3a8a" strokeWidth={2} />
              <Line type="monotone" dataKey="uploads" stroke="#0f766e" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </Card>
      </div>

      {/* Management Sections */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Quick Actions */}
        <Card>
          <h3 className="text-xl font-bold text-neutral-900 mb-6">Aksi Cepat</h3>
          <div className="grid grid-cols-2 gap-4">
            {[
              { label: "Tambah Siswa", icon: "➕" },
              { label: "Tambah Guru", icon: "➕" },
              { label: "Kelola Kelas", icon: "⚙️" },
              { label: "Backup Data", icon: "💾" },
            ].map((item, idx) => (
              <button
                key={idx}
                className="p-4 bg-neutral-50 hover:bg-neutral-100 rounded-lg transition-colors text-center"
              >
                <div className="text-2xl mb-2">{item.icon}</div>
                <p className="text-sm font-medium text-neutral-900">{item.label}</p>
              </button>
            ))}
          </div>
        </Card>

        {/* Storage Usage */}
        <Card>
          <h3 className="text-xl font-bold text-neutral-900 mb-6">Penggunaan Penyimpanan</h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={storageData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={90}
                paddingAngle={2}
                dataKey="value"
              >
                {storageData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.fill} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
          <div className="mt-4 space-y-2 text-sm">
            {storageData.map((item, idx) => (
              <div key={idx} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.fill }}></div>
                  <span className="text-neutral-600">{item.name}</span>
                </div>
                <span className="font-semibold text-neutral-900">{item.value}%</span>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Recent Activities */}
      <Card>
        <h3 className="text-xl font-bold text-neutral-900 mb-6">Aktivitas Terbaru</h3>

        <div className="space-y-4">
          {[
            { action: "Tambah siswa baru: Ahmad Rizki", user: "Admin", time: "1 jam lalu" },
            { action: "Edit data guru: Budi Santoso", user: "Admin", time: "3 jam lalu" },
            { action: "Backup database otomatis", user: "Sistem", time: "5 jam lalu" },
            { action: "Update nilai semester: XII IPA 1", user: "Guru", time: "1 hari lalu" },
          ].map((item, idx) => (
            <div key={idx} className="p-4 bg-neutral-50 rounded-lg hover:bg-neutral-100 transition-colors">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <p className="font-medium text-neutral-900">{item.action}</p>
                  <p className="text-sm text-neutral-500 mt-1">Oleh: {item.user}</p>
                </div>
                <span className="text-xs text-neutral-500">{item.time}</span>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  )
}
