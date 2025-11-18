"use client"

import { useState } from "react"

export default function TeacherSchedulePage() {
  const [schedule] = useState([
    { id: 1, class: "4A", subject: "Matematika", day: "Senin", time: "07:30 - 08:30", room: "4A" },
    { id: 2, class: "4A", subject: "Matematika", day: "Rabu", time: "10:00 - 11:00", room: "4A" },
    { id: 3, class: "4B", subject: "Matematika", day: "Senin", time: "10:00 - 11:00", room: "4B" },
    { id: 4, class: "5A", subject: "Matematika", day: "Selasa", time: "07:30 - 08:30", room: "5A" },
  ])

  const days = ["Senin", "Selasa", "Rabu", "Kamis", "Jumat"]

  return (
    <div className="p-8">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Jadwal Mengajar</h1>
        <p className="text-gray-600">Lihat jadwal mengajar Anda</p>
      </div>

      {/* Schedule Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 mb-8">
        {days.map((day) => (
          <div key={day} className="card p-4">
            <h3 className="font-semibold text-gray-900 mb-3 text-center">{day}</h3>
            <div className="space-y-3">
              {schedule
                .filter((s) => s.day === day)
                .map((s) => (
                  <div key={s.id} className="bg-red-50 border border-red-200 rounded p-2">
                    <p className="text-sm font-medium text-gray-900">{s.subject}</p>
                    <p className="text-xs text-gray-600">Kelas {s.class}</p>
                    <p className="text-xs text-red-600 font-semibold">{s.time}</p>
                  </div>
                ))}
            </div>
          </div>
        ))}
      </div>

      {/* Full List */}
      <div className="card">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">Daftar Lengkap Jadwal</h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">Mata Pelajaran</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">Kelas</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">Hari</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">Jam</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">Ruangan</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {schedule.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">{item.subject}</td>
                  <td className="px-6 py-4 text-sm text-gray-700">{item.class}</td>
                  <td className="px-6 py-4 text-sm">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800">
                      {item.day}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-700">{item.time}</td>
                  <td className="px-6 py-4 text-sm text-gray-700">{item.room}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
