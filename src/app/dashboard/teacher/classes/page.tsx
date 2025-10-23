"use client"

import { Header } from "@/components/layout/header"
import { Sidebar } from "@/components/layout/sidebar"
import { Card } from "@/components/ui/card"
import { Modal } from "@/components/common/modal"
import { useState } from "react"

const teacherNavItems = [
  { label: "Dashboard", href: "/dashboard/teacher", icon: "📊" },
  { label: "Profil", href: "/dashboard/teacher/profile", icon: "👤" },
  { label: "Kelas Saya", href: "/dashboard/teacher/classes", icon: "👥" },
  { label: "Absensi", href: "/dashboard/teacher/attendance", icon: "📋" },
  { label: "Input Nilai", href: "/dashboard/teacher/grades", icon: "📝" },
  { label: "Jadwal Mengajar", href: "/dashboard/teacher/schedule", icon: "📅" },
  { label: "Pengumuman", href: "/dashboard/teacher/announcements", icon: "📢" },
]

export default function TeacherClassesPage() {
  const [selectedClass, setSelectedClass] = useState<string | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const classes = [
    { name: "XII IPA 1", students: 35, average: 87.5 },
    { name: "XII IPA 2", students: 33, average: 85.2 },
    { name: "XI IPA 1", students: 36, average: 82.8 },
  ]

  const classStudents: Record<string, Array<{ id: string; name: string; nisn: string }>> = {
    "XII IPA 1": [
      { id: "1", name: "Ahmad Rizki", nisn: "0012345678" },
      { id: "2", name: "Siti Nurhaliza", nisn: "0012345679" },
      { id: "3", name: "Budi Wijaya", nisn: "0012345680" },
      { id: "4", name: "Rina Kusuma", nisn: "0012345681" },
      { id: "5", name: "Doni Pratama", nisn: "0012345682" },
    ],
    "XII IPA 2": [
      { id: "6", name: "Eka Putri", nisn: "0012345683" },
      { id: "7", name: "Fajar Ramadhan", nisn: "0012345684" },
      { id: "8", name: "Gita Sari", nisn: "0012345685" },
    ],
    "XI IPA 1": [
      { id: "9", name: "Hendra Wijaya", nisn: "0012345686" },
      { id: "10", name: "Indah Lestari", nisn: "0012345687" },
    ],
  }

  const handleClassClick = (className: string) => {
    setSelectedClass(className)
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setSelectedClass(null)
  }

  return (
    <div className="flex h-screen bg-neutral-50">
      <Sidebar items={teacherNavItems} userRole="Guru" />

      <div className="flex-1 flex flex-col overflow-hidden">
        <Header title="Kelas Saya" userName="Budi Santoso" />

        <main className="flex-1 overflow-auto p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {classes.map((cls, idx) => (
              <Card
                key={idx}
                className="hover:shadow-lg transition-shadow cursor-pointer"
                onClick={() => handleClassClick(cls.name)}
              >
                <h3 className="text-xl font-bold text-neutral-900 mb-4">{cls.name}</h3>
                <div className="space-y-3">
                  <div>
                    <p className="text-sm text-neutral-600">Jumlah Siswa</p>
                    <p className="text-2xl font-bold text-primary">{cls.students}</p>
                  </div>
                  <div>
                    <p className="text-sm text-neutral-600">Rata-rata Nilai</p>
                    <p className="text-2xl font-bold text-secondary">{cls.average}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </main>
      </div>

      <Modal isOpen={isModalOpen} onClose={handleCloseModal} title={`Daftar Siswa - ${selectedClass}`}>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-neutral-200">
                <th className="text-left py-3 px-4 font-semibold text-neutral-700">No</th>
                <th className="text-left py-3 px-4 font-semibold text-neutral-700">Nama Siswa</th>
                <th className="text-left py-3 px-4 font-semibold text-neutral-700">NISN</th>
              </tr>
            </thead>
            <tbody>
              {selectedClass &&
                classStudents[selectedClass]?.map((student, idx) => (
                  <tr key={student.id} className="border-b border-neutral-100 hover:bg-neutral-50">
                    <td className="py-3 px-4 text-neutral-900">{idx + 1}</td>
                    <td className="py-3 px-4 text-neutral-900">{student.name}</td>
                    <td className="py-3 px-4 text-neutral-900">{student.nisn}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </Modal>
    </div>
  )
}
