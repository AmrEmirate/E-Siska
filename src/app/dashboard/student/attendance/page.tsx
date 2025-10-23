"use client"

import { Header } from "@/components/layout/header"
import { Sidebar } from "@/components/layout/sidebar"
import { Card } from "@/components/ui/card"
import { StatCard } from "@/components/ui/stat-card"
import { useState } from "react"

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

export default function StudentAttendancePage() {
  const [selectedSubject, setSelectedSubject] = useState("Matematika")

  const subjects = ["Matematika", "Bahasa Indonesia", "Bahasa Inggris", "Fisika", "Kimia"]

  const attendanceData = [
    { date: "22 Okt 2024", subject: "Matematika", status: "Hadir", time: "07:15", note: "-" },
    { date: "21 Okt 2024", subject: "Matematika", status: "Hadir", time: "07:20", note: "-" },
    { date: "20 Okt 2024", subject: "Bahasa Indonesia", status: "Sakit", time: "-", note: "Demam" },
    { date: "19 Okt 2024", subject: "Matematika", status: "Hadir", time: "07:10", note: "-" },
    { date: "18 Okt 2024", subject: "Fisika", status: "Izin", time: "-", note: "Acara Keluarga" },
  ]

  const filteredData = attendanceData.filter((item) => item.subject === selectedSubject)

  return (
    <div className="flex h-screen bg-neutral-50">
      <Sidebar items={studentNavItems} userRole="Siswa" />

      <div className="flex-1 flex flex-col overflow-hidden">
        <Header title="Data Absensi" userName="Ahmad Rizki" />

        <main className="flex-1 overflow-auto p-8">
          <div className="space-y-6">
            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <StatCard label="Hadir" value="95" icon="✓" color="bg-green-100 text-green-700" />
              <StatCard label="Sakit" value="3" icon="🤒" color="bg-yellow-100 text-yellow-700" />
              <StatCard label="Izin" value="2" icon="📝" color="bg-blue-100 text-blue-700" />
              <StatCard label="Alfa" value="0" icon="✗" color="bg-red-100 text-red-700" />
            </div>

            {/* Subject Filter - Added subject filter for attendance per subject */}
            <Card>
              <h3 className="text-lg font-bold text-neutral-900 mb-4">Filter Mata Pelajaran</h3>
              <div className="flex flex-wrap gap-2">
                {subjects.map((subject) => (
                  <button
                    key={subject}
                    onClick={() => setSelectedSubject(subject)}
                    className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                      selectedSubject === subject
                        ? "bg-primary text-white"
                        : "bg-neutral-200 text-neutral-700 hover:bg-neutral-300"
                    }`}
                  >
                    {subject}
                  </button>
                ))}
              </div>
            </Card>

            {/* Attendance Table */}
            <Card>
              <h3 className="text-xl font-bold text-neutral-900 mb-6">Riwayat Absensi - {selectedSubject}</h3>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-neutral-200">
                      <th className="text-left py-3 px-4 font-semibold text-neutral-700">Tanggal</th>
                      <th className="text-left py-3 px-4 font-semibold text-neutral-700">Status</th>
                      <th className="text-left py-3 px-4 font-semibold text-neutral-700">Jam Masuk</th>
                      <th className="text-left py-3 px-4 font-semibold text-neutral-700">Keterangan</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredData.map((item, idx) => (
                      <tr key={idx} className="border-b border-neutral-100 hover:bg-neutral-50">
                        <td className="py-3 px-4 text-neutral-900">{item.date}</td>
                        <td className="py-3 px-4">
                          <span
                            className={`px-3 py-1 rounded-full text-sm font-medium ${
                              item.status === "Hadir"
                                ? "bg-green-100 text-green-700"
                                : item.status === "Sakit"
                                  ? "bg-yellow-100 text-yellow-700"
                                  : "bg-blue-100 text-blue-700"
                            }`}
                          >
                            {item.status}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-neutral-900">{item.time}</td>
                        <td className="py-3 px-4 text-neutral-600">{item.note}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          </div>
        </main>
      </div>
    </div>
  )
}
