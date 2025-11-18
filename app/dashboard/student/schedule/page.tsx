"use client"

import { useState } from "react"

export default function StudentSchedulePage() {
  const [schedule] = useState([
    { day: "Senin", time: "07:30", subject: "Upacara", teacher: "-", room: "Lapangan" },
    { day: "Senin", time: "08:00", subject: "Matematika", teacher: "Bapak Aris", room: "4A" },
    { day: "Senin", time: "09:00", subject: "Bahasa Indonesia", teacher: "Ibu Siti", room: "4A" },
    { day: "Senin", time: "10:00", subject: "IPA", teacher: "Bapak Ahmad", room: "Lab IPA" },
    { day: "Senin", time: "11:00", subject: "Istirahat", teacher: "-", room: "Kantin" },
    { day: "Selasa", time: "07:30", subject: "Bahasa Indonesia", teacher: "Ibu Siti", room: "4A" },
    { day: "Selasa", time: "08:30", subject: "Matematika", teacher: "Bapak Aris", room: "4A" },
    { day: "Selasa", time: "09:30", subject: "IPS", teacher: "Bapak Bambang", room: "4A" },
    { day: "Rabu", time: "07:30", subject: "IPA", teacher: "Bapak Ahmad", room: "Lab IPA" },
    { day: "Rabu", time: "09:00", subject: "Bahasa Inggris", teacher: "Ibu Dina", room: "4A" },
  ])

  const days = ["Senin", "Selasa", "Rabu", "Kamis", "Jumat"]
  const uniqueDays = Array.from(new Set(schedule.map((s) => s.day)))

  const getSubjectColor = (subject: string) => {
    if (subject.includes("Istirahat")) return "bg-yellow-100 border-yellow-300 text-yellow-900"
    if (subject.includes("Upacara")) return "bg-red-100 border-red-300 text-red-900"
    return "bg-blue-100 border-blue-300 text-blue-900"
  }

  return (
    <div className="p-8">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Jadwal Pelajaran</h1>
        <p className="text-gray-600">Lihat jadwal pelajaran harian Anda</p>
      </div>

      {/* Daily View */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 mb-8">
        {uniqueDays.map((day) => (
          <div key={day} className="card">
            <div className="p-4 bg-red-50 border-b border-red-200">
              <h3 className="font-bold text-gray-900 text-center">{day}</h3>
            </div>
            <div className="p-4 space-y-2">
              {schedule
                .filter((s) => s.day === day)
                .map((item, idx) => (
                  <div key={idx} className={`p-3 rounded border-2 ${getSubjectColor(item.subject)}`}>
                    <p className="text-xs font-semibold">{item.time}</p>
                    <p className="text-sm font-bold">{item.subject}</p>
                    {item.room !== "Kantin" && item.room !== "Lapangan" && <p className="text-xs mt-1">{item.room}</p>}
                  </div>
                ))}
            </div>
          </div>
        ))}
      </div>

      {/* Detailed List */}
      <div className="card">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">Jadwal Lengkap</h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">Hari</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">Jam</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">Mata Pelajaran</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">Guru</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">Ruangan</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {schedule.map((item, idx) => (
                <tr key={idx} className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">{item.day}</td>
                  <td className="px-6 py-4 text-sm text-gray-700">{item.time}</td>
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">{item.subject}</td>
                  <td className="px-6 py-4 text-sm text-gray-700">{item.teacher}</td>
                  <td className="px-6 py-4 text-sm">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                      {item.room}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
