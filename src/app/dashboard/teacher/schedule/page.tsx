"use client"

import { Header } from "@/components/layout/header"
import { Sidebar } from "@/components/layout/sidebar"
import { Card } from "@/components/ui/card"

const teacherNavItems = [
  { label: "Dashboard", href: "/dashboard/teacher", icon: "📊" },
  { label: "Profil", href: "/dashboard/teacher/profile", icon: "👤" },
  { label: "Kelas Saya", href: "/dashboard/teacher/classes", icon: "👥" },
  { label: "Absensi", href: "/dashboard/teacher/attendance", icon: "📋" },
  { label: "Input Nilai", href: "/dashboard/teacher/grades", icon: "📝" },
  { label: "Jadwal Mengajar", href: "/dashboard/teacher/schedule", icon: "📅" },
  { label: "Pengumuman", href: "/dashboard/teacher/announcements", icon: "📢" },
]

export default function TeacherSchedulePage() {
  const schedule = [
    {
      day: "Senin",
      classes: [
        { time: "07:00-08:30", class: "XII IPA 1", room: "Ruang 12" },
        { time: "08:30-10:00", class: "XII IPA 2", room: "Ruang 13" },
      ],
    },
    {
      day: "Selasa",
      classes: [
        { time: "07:00-08:30", class: "XI IPA 1", room: "Ruang 5" },
        { time: "10:15-11:45", class: "XII IPA 1", room: "Ruang 12" },
      ],
    },
  ]

  return (
    <div className="flex h-screen bg-neutral-50">
      <Sidebar items={teacherNavItems} userRole="Guru" />

      <div className="flex-1 flex flex-col overflow-hidden">
        <Header title="Jadwal Mengajar" userName="Budi Santoso" />

        <main className="flex-1 overflow-auto p-8">
          <div className="space-y-6">
            {schedule.map((day, idx) => (
              <Card key={idx}>
                <h3 className="text-xl font-bold text-neutral-900 mb-6">{day.day}</h3>
                <div className="space-y-3">
                  {day.classes.map((cls, clsIdx) => (
                    <div key={clsIdx} className="flex items-start gap-4 p-4 bg-neutral-50 rounded-lg">
                      <div className="flex-shrink-0 w-24 text-center">
                        <p className="font-semibold text-primary">{cls.time}</p>
                      </div>
                      <div className="flex-1">
                        <p className="font-semibold text-neutral-900">{cls.class}</p>
                        <p className="text-sm text-neutral-600">{cls.room}</p>
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
