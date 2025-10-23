"use client"

import { Header } from "@/components/layout/header"
import { Sidebar } from "@/components/layout/sidebar"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
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

export default function TeacherAttendancePage() {
  const [selectedClass, setSelectedClass] = useState<string | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [attendanceData, setAttendanceData] = useState<Record<string, string>>({})

  const classes = ["XII IPA 1", "XII IPA 2", "XI IPA 1"]

  const classStudents: Record<string, Array<{ id: string; name: string }>> = {
    "XII IPA 1": [
      { id: "1", name: "Ahmad Rizki" },
      { id: "2", name: "Siti Nurhaliza" },
      { id: "3", name: "Budi Wijaya" },
      { id: "4", name: "Rina Kusuma" },
      { id: "5", name: "Doni Pratama" },
    ],
    "XII IPA 2": [
      { id: "6", name: "Eka Putri" },
      { id: "7", name: "Fajar Ramadhan" },
      { id: "8", name: "Gita Sari" },
    ],
    "XI IPA 1": [
      { id: "9", name: "Hendra Wijaya" },
      { id: "10", name: "Indah Lestari" },
    ],
  }

  const handleClassClick = (className: string) => {
    setSelectedClass(className)
    setIsModalOpen(true)
  }

  const handleAttendanceChange = (studentId: string, status: string) => {
    setAttendanceData((prev) => ({
      ...prev,
      [studentId]: status,
    }))
  }

  const handleSaveAttendance = () => {
    console.log("Attendance saved:", attendanceData)
    setIsModalOpen(false)
    setSelectedClass(null)
    setAttendanceData({})
  }

  return (
    <div className="flex h-screen bg-neutral-50">
      <Sidebar items={teacherNavItems} userRole="Guru" />

      <div className="flex-1 flex flex-col overflow-hidden">
        <Header title="Kelola Absensi" userName="Budi Santoso" />

        <main className="flex-1 overflow-auto p-8">
          <div className="space-y-6">
            <h3 className="text-lg font-bold text-neutral-900">Pilih Kelas untuk Input Absensi</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {classes.map((cls) => (
                <Card
                  key={cls}
                  className="hover:shadow-lg transition-shadow cursor-pointer p-6"
                  onClick={() => handleClassClick(cls)}
                >
                  <h4 className="text-lg font-bold text-neutral-900">{cls}</h4>
                  <p className="text-sm text-neutral-600 mt-2">Klik untuk input absensi</p>
                </Card>
              ))}
            </div>
          </div>
        </main>
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false)
          setSelectedClass(null)
          setAttendanceData({})
        }}
        title={`Input Absensi - ${selectedClass}`}
      >
        <div className="space-y-4">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-neutral-200">
                  <th className="text-left py-3 px-4 font-semibold text-neutral-700">No</th>
                  <th className="text-left py-3 px-4 font-semibold text-neutral-700">Nama Siswa</th>
                  <th className="text-center py-3 px-4 font-semibold text-neutral-700">Hadir</th>
                  <th className="text-center py-3 px-4 font-semibold text-neutral-700">Sakit</th>
                  <th className="text-center py-3 px-4 font-semibold text-neutral-700">Izin</th>
                  <th className="text-center py-3 px-4 font-semibold text-neutral-700">Alfa</th>
                </tr>
              </thead>
              <tbody>
                {selectedClass &&
                  classStudents[selectedClass]?.map((student, idx) => (
                    <tr key={student.id} className="border-b border-neutral-100 hover:bg-neutral-50">
                      <td className="py-3 px-4 text-neutral-900">{idx + 1}</td>
                      <td className="py-3 px-4 text-neutral-900">{student.name}</td>
                      <td className="py-3 px-4 text-center">
                        <input
                          type="radio"
                          name={`attendance-${student.id}`}
                          value="hadir"
                          onChange={(e) => handleAttendanceChange(student.id, e.target.value)}
                          className="w-4 h-4"
                        />
                      </td>
                      <td className="py-3 px-4 text-center">
                        <input
                          type="radio"
                          name={`attendance-${student.id}`}
                          value="sakit"
                          onChange={(e) => handleAttendanceChange(student.id, e.target.value)}
                          className="w-4 h-4"
                        />
                      </td>
                      <td className="py-3 px-4 text-center">
                        <input
                          type="radio"
                          name={`attendance-${student.id}`}
                          value="izin"
                          onChange={(e) => handleAttendanceChange(student.id, e.target.value)}
                          className="w-4 h-4"
                        />
                      </td>
                      <td className="py-3 px-4 text-center">
                        <input
                          type="radio"
                          name={`attendance-${student.id}`}
                          value="alfa"
                          onChange={(e) => handleAttendanceChange(student.id, e.target.value)}
                          className="w-4 h-4"
                        />
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
          <div className="flex gap-3 justify-end mt-6">
            <Button
              variant="outline"
              onClick={() => {
                setIsModalOpen(false)
                setSelectedClass(null)
                setAttendanceData({})
              }}
            >
              Batal
            </Button>
            <Button className="bg-primary hover:bg-primary-dark" onClick={handleSaveAttendance}>
              Simpan Absensi
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  )
}
