"use client"

import { useState } from "react"

export default function ScheduleManagementPage() {
  const [schedule] = useState([
    {
      id: 1,
      class: "4A",
      subject: "Matematika",
      teacher: "Bapak Aris",
      day: "Senin",
      time: "07:30 - 08:30",
      room: "4A",
    },
    {
      id: 2,
      class: "4A",
      subject: "Bahasa Indonesia",
      teacher: "Ibu Siti",
      day: "Senin",
      time: "08:30 - 09:30",
      room: "4A",
    },
    {
      id: 3,
      class: "4B",
      subject: "Matematika",
      teacher: "Bapak Aris",
      day: "Senin",
      time: "10:00 - 11:00",
      room: "4B",
    },
  ])

  const days = ["Senin", "Selasa", "Rabu", "Kamis", "Jumat"]

  return (
    <div className="p-8">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Manajemen Jadwal</h1>
        <p className="text-gray-600">Kelola jadwal pengajaran guru dan kelas</p>
      </div>

      <div className="card">
        <div className="p-6 border-b border-gray-200 flex justify-between items-center">
          <h2 className="text-xl font-semibold text-gray-900">Jadwal Pengajaran</h2>
          <button className="btn-primary">+ Tambah Jadwal</button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">Kelas</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">Mata Pelajaran</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">Guru</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">Hari</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">Jam</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">Ruangan</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {schedule.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">{item.class}</td>
                  <td className="px-6 py-4 text-sm text-gray-700">{item.subject}</td>
                  <td className="px-6 py-4 text-sm text-gray-700">{item.teacher}</td>
                  <td className="px-6 py-4 text-sm">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800">
                      {item.day}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-700">{item.time}</td>
                  <td className="px-6 py-4 text-sm text-gray-700">{item.room}</td>
                  <td className="px-6 py-4 text-sm space-x-2">
                    <button className="text-blue-600 hover:text-blue-900">Edit</button>
                    <button className="text-red-600 hover:text-red-900">Hapus</button>
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
