"use client"

import { useState } from "react"

export default function AttendancePage() {
  const [selectedClass, setSelectedClass] = useState("4A")
  const [meeting, setMeeting] = useState("")
  const [meetingDate, setMeetingDate] = useState("")
  const [showForm, setShowForm] = useState(false)

  const classes = ["4A", "4B", "5A", "5B"]

  const [meetings] = useState([
    { id: 1, name: "Pertemuan ke-1", date: "01 Nov 2024" },
    { id: 2, name: "Pertemuan ke-2", date: "02 Nov 2024" },
  ])

  const [studentList] = useState([
    { id: 1, nis: "123001", name: "Ahmad Rizki", attendance: "Hadir" },
    { id: 2, nis: "123002", name: "Siti Nur Azizah", attendance: "Hadir" },
    { id: 3, nis: "123003", name: "Budi Santoso", attendance: "Sakit" },
  ])

  return (
    <div className="p-8">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Manajemen Absensi</h1>
        <p className="text-gray-600">Input dan kelola data kehadiran siswa</p>
      </div>

      {/* Class Selection */}
      <div className="card p-6 mb-6">
        <div className="flex justify-between items-center">
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-2">Pilih Kelas</label>
            <select
              value={selectedClass}
              onChange={(e) => setSelectedClass(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
            >
              {classes.map((cls) => (
                <option key={cls} value={cls}>
                  {cls}
                </option>
              ))}
            </select>
          </div>
          <button onClick={() => setShowForm(!showForm)} className="btn-primary ml-4 mt-6">
            + Buat Pertemuan
          </button>
        </div>

        {/* Create Meeting Form */}
        {showForm && (
          <div className="mt-6 p-4 border-t border-gray-200 pt-6">
            <h3 className="font-semibold text-gray-900 mb-4">Buat Pertemuan Baru</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Nama Pertemuan (misal: Pertemuan ke-1)"
                value={meeting}
                onChange={(e) => setMeeting(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
              />
              <input
                type="date"
                value={meetingDate}
                onChange={(e) => setMeetingDate(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
              />
            </div>
            <button className="btn-primary mt-4">Simpan Pertemuan</button>
          </div>
        )}
      </div>

      {/* Recent Meetings */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        {meetings.map((meet) => (
          <div key={meet.id} className="card p-4 cursor-pointer hover:shadow-md transition">
            <p className="font-semibold text-gray-900">{meet.name}</p>
            <p className="text-sm text-gray-600">{meet.date}</p>
            <button className="text-blue-600 hover:text-blue-900 text-sm mt-2">Edit Absensi →</button>
          </div>
        ))}
      </div>

      {/* Attendance Input */}
      <div className="card">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">Input Absensi - Pertemuan ke-1</h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">NIS</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">Nama Siswa</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">Kehadiran</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {studentList.map((student) => (
                <tr key={student.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">{student.nis}</td>
                  <td className="px-6 py-4 text-sm text-gray-700">{student.name}</td>
                  <td className="px-6 py-4 text-sm">
                    <select
                      defaultValue={student.attendance}
                      className="px-3 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    >
                      <option value="Hadir">Hadir</option>
                      <option value="Sakit">Sakit</option>
                      <option value="Izin">Izin</option>
                      <option value="Alpa">Alpa</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="p-6 border-t border-gray-200 flex justify-end">
          <button className="btn-primary">Simpan Absensi</button>
        </div>
      </div>
    </div>
  )
}
