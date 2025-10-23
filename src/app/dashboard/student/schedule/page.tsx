"use client"

import { Header } from "@/components/layout/header"
import { Sidebar } from "@/components/layout/sidebar"
import { Card } from "@/components/ui/card"

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

export default function StudentSchedulePage() {
  const schedule = [
    {
      day: "Senin",
      classes: [
        { time: "07:00-08:30", subject: "Matematika", room: "Ruang 12", teacher: "Pak Budi" },
        { time: "08:30-10:00", subject: "Fisika", room: "Lab 1", teacher: "Ibu Siti" },
        { time: "10:15-11:45", subject: "Bahasa Inggris", room: "Ruang 8", teacher: "Pak Ahmad" },
      ],
    },
    {
      day: "Selasa",
      classes: [
        { time: "07:00-08:30", subject: "Kimia", room: "Lab 2", teacher: "Ibu Rina" },
        { time: "08:30-10:00", subject: "Biologi", room: "Ruang 5", teacher: "Pak Hendra" },
        { time: "10:15-11:45", subject: "Sejarah", room: "Ruang 10", teacher: "Ibu Dewi" },
      ],
    },
    {
      day: "Rabu",
      classes: [
        { time: "07:00-08:30", subject: "Bahasa Indonesia", room: "Ruang 3", teacher: "Ibu Sari" },
        { time: "08:30-10:00", subject: "Matematika", room: "Ruang 12", teacher: "Pak Budi" },
        { time: "10:15-11:45", subject: "Olahraga", room: "Lapangan", teacher: "Pak Rudi" },
      ],
    },
  ]

  return (
    <div className="flex h-screen bg-neutral-50">
      <Sidebar items={studentNavItems} userRole="Siswa" />

      <div className="flex-1 flex flex-col overflow-hidden">
        <Header title="Jadwal Pelajaran" userName="Ahmad Rizki" />

        <main className="flex-1 overflow-auto p-8">
          <div className="space-y-6">
            {schedule.map((day, dayIdx) => (
              <Card key={dayIdx}>
                <h3 className="text-xl font-bold text-neutral-900 mb-6">{day.day}</h3>
                <div className="space-y-3">
                  {day.classes.map((cls, clsIdx) => (
                    <div
                      key={clsIdx}
                      className="flex items-start gap-4 p-4 bg-neutral-50 rounded-lg hover:bg-neutral-100 transition-colors"
                    >
                      <div className="flex-shrink-0 w-20 text-center">
                        <p className="font-semibold text-primary">{cls.time}</p>
                      </div>
                      <div className="flex-1">
                        <p className="font-semibold text-neutral-900">{cls.subject}</p>
                        <p className="text-sm text-neutral-600">
                          {cls.room} • {cls.teacher}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            ))}
          </div>
        </main>
      </div>
    </div>
  )
}
