"use client"

import { useState } from "react"

export default function AnnouncementsManagementPage() {
  const [announcements] = useState([
    {
      id: 1,
      title: "Pengumuman Libur Akhir Tahun",
      content: "Libur akhir tahun akan dimulai tanggal...",
      date: "01 Nov 2024",
      status: "Aktif",
    },
    {
      id: 2,
      title: "Jadwal UTS Semester 1",
      content: "UTS akan dilaksanakan dimulai...",
      date: "25 Okt 2024",
      status: "Aktif",
    },
    {
      id: 3,
      title: "Pertemuan Orang Tua Siswa",
      content: "Pertemuan orang tua akan dilaksanakan...",
      date: "20 Okt 2024",
      status: "Aktif",
    },
  ])

  return (
    <div className="p-8">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Manajemen Pengumuman</h1>
        <p className="text-gray-600">Kelola pengumuman untuk guru dan siswa</p>
      </div>

      <div className="card">
        <div className="p-6 border-b border-gray-200 flex justify-between items-center">
          <h2 className="text-xl font-semibold text-gray-900">Daftar Pengumuman</h2>
          <button className="btn-primary">+ Buat Pengumuman</button>
        </div>

        <div className="divide-y divide-gray-200">
          {announcements.map((announcement) => (
            <div key={announcement.id} className="p-6 hover:bg-gray-50 transition">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{announcement.title}</h3>
                  <p className="text-sm text-gray-600 mt-1">{announcement.content.substring(0, 80)}...</p>
                </div>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                  {announcement.status}
                </span>
              </div>
              <div className="flex justify-between items-center mt-4">
                <p className="text-xs text-gray-500">{announcement.date}</p>
                <div className="space-x-2">
                  <button className="text-blue-600 hover:text-blue-900 text-sm">Edit</button>
                  <button className="text-red-600 hover:text-red-900 text-sm">Hapus</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
