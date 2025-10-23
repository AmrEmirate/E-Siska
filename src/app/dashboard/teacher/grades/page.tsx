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

export default function TeacherGradesPage() {
  const [selectedClass, setSelectedClass] = useState<string | null>(null)
  const [selectedSubject, setSelectedSubject] = useState<string | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [gradesData, setGradesData] = useState<Record<string, { uts: string; uas: string; tugas: string }>>({})

  const classes = ["XII IPA 1", "XII IPA 2", "XI IPA 1"]
  const subjects = ["Matematika", "Bahasa Indonesia", "Bahasa Inggris", "Fisika", "Kimia"]

  const classStudents: Record<string, Array<{ id: string; name: string }>> = {
    "XII IPA 1": [
      { id: "1", name: "Ahmad Rizki" },
      { id: "2", name: "Siti Nurhaliza" },
      { id: "3", name: "Budi Wijaya" },
    ],
    "XII IPA 2": [
      { id: "6", name: "Eka Putri" },
      { id: "7", name: "Fajar Ramadhan" },
    ],
    "XI IPA 1": [
      { id: "9", name: "Hendra Wijaya" },
      { id: "10", name: "Indah Lestari" },
    ],
  }

  const handleClassClick = (className: string) => {
    setSelectedClass(className)
  }

  const handleSubjectClick = (subject: string) => {
    setSelectedSubject(subject)
    setIsModalOpen(true)
  }

  const handleGradeChange = (studentId: string, field: "uts" | "uas" | "tugas", value: string) => {
    setGradesData((prev) => ({
      ...prev,
      [studentId]: {
        ...prev[studentId],
        [field]: value,
      },
    }))
  }

  const handleSaveGrades = () => {
    console.log("Grades saved:", gradesData)
    setIsModalOpen(false)
    setSelectedSubject(null)
    setGradesData({})
  }

  return (
    <div className="flex h-screen bg-neutral-50">
      <Sidebar items={teacherNavItems} userRole="Guru" />

      <div className="flex-1 flex flex-col overflow-hidden">
        <Header title="Input Nilai" userName="Budi Santoso" />

        <main className="flex-1 overflow-auto p-8">
          <div className="space-y-6">
            {!selectedClass ? (
              <>
                <h3 className="text-lg font-bold text-neutral-900">Pilih Kelas</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {classes.map((cls) => (
                    <Card
                      key={cls}
                      className="hover:shadow-lg transition-shadow cursor-pointer p-6"
                      onClick={() => handleClassClick(cls)}
                    >
                      <h4 className="text-lg font-bold text-neutral-900">{cls}</h4>
                      <p className="text-sm text-neutral-600 mt-2">Klik untuk input nilai</p>
                    </Card>
                  ))}
                </div>
              </>
            ) : (
              <>
                <div className="flex items-center gap-4">
                  <Button variant="outline" onClick={() => setSelectedClass(null)}>
                    Kembali
                  </Button>
                  <h3 className="text-lg font-bold text-neutral-900">Pilih Mata Pelajaran - {selectedClass}</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {subjects.map((subject) => (
                    <Card
                      key={subject}
                      className="hover:shadow-lg transition-shadow cursor-pointer p-6"
                      onClick={() => handleSubjectClick(subject)}
                    >
                      <h4 className="text-lg font-bold text-neutral-900">{subject}</h4>
                      <p className="text-sm text-neutral-600 mt-2">Klik untuk input nilai</p>
                    </Card>
                  ))}
                </div>
              </>
            )}
          </div>
        </main>
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false)
          setSelectedSubject(null)
          setGradesData({})
        }}
        title={`Input Nilai ${selectedClass} - ${selectedSubject}`}
      >
        <div className="space-y-4">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-neutral-200">
                  <th className="text-left py-3 px-4 font-semibold text-neutral-700">No</th>
                  <th className="text-left py-3 px-4 font-semibold text-neutral-700">Nama Siswa</th>
                  <th className="text-center py-3 px-4 font-semibold text-neutral-700">UTS</th>
                  <th className="text-center py-3 px-4 font-semibold text-neutral-700">UAS</th>
                  <th className="text-center py-3 px-4 font-semibold text-neutral-700">Tugas</th>
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
                          type="number"
                          min="0"
                          max="100"
                          value={gradesData[student.id]?.uts || ""}
                          onChange={(e) => handleGradeChange(student.id, "uts", e.target.value)}
                          className="w-16 px-2 py-1 border border-neutral-300 rounded text-center"
                        />
                      </td>
                      <td className="py-3 px-4 text-center">
                        <input
                          type="number"
                          min="0"
                          max="100"
                          value={gradesData[student.id]?.uas || ""}
                          onChange={(e) => handleGradeChange(student.id, "uas", e.target.value)}
                          className="w-16 px-2 py-1 border border-neutral-300 rounded text-center"
                        />
                      </td>
                      <td className="py-3 px-4 text-center">
                        <input
                          type="number"
                          min="0"
                          max="100"
                          value={gradesData[student.id]?.tugas || ""}
                          onChange={(e) => handleGradeChange(student.id, "tugas", e.target.value)}
                          className="w-16 px-2 py-1 border border-neutral-300 rounded text-center"
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
                setSelectedSubject(null)
                setGradesData({})
              }}
            >
              Batal
            </Button>
            <Button className="bg-primary hover:bg-primary-dark" onClick={handleSaveGrades}>
              Simpan Nilai
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  )
}
