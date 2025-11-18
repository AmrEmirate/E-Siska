"use client"

import { useState } from "react"

export default function TeacherAnnouncementsPage() {
  const [announcements] = useState([
    {
      id: 1,
      title: "Pengumuman Libur Akhir Tahun",
      content: "Libur akhir tahun akan dimulai tanggal 15 Desember 2024...",
      date: "01 Nov 2024",
      from: "Admin",
    },
    {
      id: 2,
      title: "Jadwal UTS Semester 1",
      content: "UTS akan dilaksanakan dimulai minggu depan...",
      date: "25 Okt 2024",
      from: "Admin",
    },
    {
      id: 3,
      title: "Pertemuan Guru Rutin",
      content: "Pertemuan rutin guru akan diadakan setiap hari Jumat...",
      date: "20 Okt 2024",
      from: "Admin",
    },
  ])

  return (
    <div className="p-8">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Pengumuman</h1>
        <p className="text-gray-600">Lihat pengumuman dari sekolah</p>
      </div>

      <div className="space-y-4">
        {announcements.map((announcement) => (
          <div key={announcement.id} className="card p-6 hover:shadow-md transition">
            <div className="flex justify-between items-start mb-2">
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-900">{announcement.title}</h3>
                <p className="text-sm text-gray-600 mt-2">{announcement.content}</p>
              </div>
            </div>
            <div className="flex justify-between items-center mt-4 pt-4 border-t border-gray-200">
              <p className="text-xs text-gray-500">
                Dari: {announcement.from} • {announcement.date}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
