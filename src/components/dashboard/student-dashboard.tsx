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
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts"

export function StudentDashboard() {
  // Sample data for charts
  const gradesTrendData = [
    { month: "Agu", score: 82 },
    { month: "Sep", score: 85 },
    { month: "Okt", score: 87 },
    { month: "Nov", score: 89 },
    { month: "Des", score: 91 },
  ]

  const subjectScoresData = [
    { subject: "Matematika", score: 92 },
    { subject: "Fisika", score: 85 },
    { subject: "Kimia", score: 88 },
    { subject: "Biologi", score: 90 },
  ]

  const attendanceData = [
    { name: "Hadir", value: 95, fill: "#059669" },
    { name: "Sakit", value: 3, fill: "#f59e0b" },
    { name: "Izin", value: 2, fill: "#3b82f6" },
  ]

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-primary to-secondary text-white rounded-xl p-8">
        <h2 className="text-3xl font-bold mb-2">Selamat Datang, Ahmad Rizki!</h2>
        <p className="text-primary-light">Kelas: XII IPA 1 | Wali Kelas: Ibu Siti Nurhaliza</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard label="Kehadiran" value="95%" icon="📊" color="bg-blue-100 text-blue-700" />
        <StatCard label="Rata-rata Nilai" value="87" icon="📈" color="bg-green-100 text-green-700" />
        <StatCard label="Tugas Tertunda" value="2" icon="⏰" color="bg-yellow-100 text-yellow-700" />
        <StatCard label="Pengumuman Baru" value="5" icon="📢" color="bg-purple-100 text-purple-700" />
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Grades Trend */}
        <Card>
          <h3 className="text-xl font-bold text-neutral-900 mb-6">Tren Nilai</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={gradesTrendData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="month" stroke="#6b7280" />
              <YAxis stroke="#6b7280" />
              <Tooltip contentStyle={{ backgroundColor: "#f9fafb", border: "1px solid #e5e7eb" }} />
              <Line type="monotone" dataKey="score" stroke="#1e3a8a" strokeWidth={2} dot={{ fill: "#1e3a8a" }} />
            </LineChart>
          </ResponsiveContainer>
        </Card>

        {/* Subject Scores */}
        <Card>
          <h3 className="text-xl font-bold text-neutral-900 mb-6">Nilai Per Mata Pelajaran</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={subjectScoresData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="subject" stroke="#6b7280" />
              <YAxis stroke="#6b7280" />
              <Tooltip contentStyle={{ backgroundColor: "#f9fafb", border: "1px solid #e5e7eb" }} />
              <Bar dataKey="score" fill="#0f766e" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Card>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Grades */}
        <Card className="lg:col-span-2">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-neutral-900">Nilai Terbaru</h3>
            <a href="#" className="text-primary hover:text-primary-dark text-sm font-medium">
              Lihat Semua →
            </a>
          </div>

          <div className="space-y-4">
            {[
              { subject: "Matematika", score: 92, date: "20 Okt 2024" },
              { subject: "Bahasa Indonesia", score: 88, date: "18 Okt 2024" },
              { subject: "Fisika", score: 85, date: "15 Okt 2024" },
            ].map((item, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between p-4 bg-neutral-50 rounded-lg hover:bg-neutral-100 transition-colors"
              >
                <div>
                  <p className="font-medium text-neutral-900">{item.subject}</p>
                  <p className="text-sm text-neutral-500">{item.date}</p>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-primary">{item.score}</p>
                  <p className="text-xs text-neutral-500">Nilai</p>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Attendance Pie Chart */}
        <Card>
          <h3 className="text-xl font-bold text-neutral-900 mb-6">Statistik Kehadiran</h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={attendanceData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={90}
                paddingAngle={2}
                dataKey="value"
              >
                {attendanceData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.fill} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
          <div className="mt-4 space-y-2 text-sm">
            {attendanceData.map((item, idx) => (
              <div key={idx} className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.fill }}></div>
                <span className="text-neutral-600">
                  {item.name}: {item.value}%
                </span>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Schedule Today */}
      <Card>
        <h3 className="text-xl font-bold text-neutral-900 mb-6">Jadwal Hari Ini</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { time: "07:00 - 08:30", subject: "Matematika", room: "Ruang 12", teacher: "Pak Budi" },
            { time: "08:30 - 10:00", subject: "Fisika", room: "Lab 1", teacher: "Ibu Siti" },
            { time: "10:15 - 11:45", subject: "Bahasa Inggris", room: "Ruang 8", teacher: "Pak Ahmad" },
          ].map((item, idx) => (
            <div key={idx} className="border-l-4 border-primary pl-4 py-3 bg-neutral-50 rounded-r-lg">
              <p className="text-sm font-medium text-neutral-500">{item.time}</p>
              <p className="font-semibold text-neutral-900 mt-1">{item.subject}</p>
              <p className="text-sm text-neutral-600">{item.room}</p>
              <p className="text-xs text-neutral-500 mt-1">{item.teacher}</p>
            </div>
          ))}
        </div>
      </Card>

      {/* Announcements */}
      <Card>
        <h3 className="text-xl font-bold text-neutral-900 mb-6">Pengumuman Terbaru</h3>

        <div className="space-y-4">
          {[
            { title: "Pengumuman Ujian Akhir Semester", date: "22 Okt 2024", priority: "high" },
            { title: "Libur Hari Raya Idul Adha", date: "20 Okt 2024", priority: "normal" },
            { title: "Perbaikan Nilai Tersedia", date: "18 Okt 2024", priority: "normal" },
          ].map((item, idx) => (
            <div
              key={idx}
              className="p-4 bg-neutral-50 rounded-lg hover:bg-neutral-100 transition-colors cursor-pointer"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <p className="font-medium text-neutral-900">{item.title}</p>
                  <p className="text-sm text-neutral-500 mt-1">{item.date}</p>
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
