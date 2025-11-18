"use client"

import { useState } from "react"

export default function StudentAnnouncementsPage() {
  const [announcements] = useState([
    {
      id: 1,
      title: "Pengumuman Libur Akhir Tahun",
      content:
        "Libur akhir tahun akan dimulai tanggal 15 Desember 2024. Siswa dihimbau untuk memanfaatkan waktu libur dengan sebaik-baiknya untuk beristirahat dan belajar di rumah.",
      date: "01 Nov 2024",
      priority: "Penting",
    },
    {
      id: 2,
      title: "Jadwal UTS Semester 1",
      content:
        "Ujian Tengah Semester akan dilaksanakan mulai minggu depan. Siswa dimohon untuk mempersiapkan diri dengan belajar giat. Silakan hubungi guru apabila ada hal yang kurang jelas.",
      date: "25 Okt 2024",
      priority: "Penting",
    },
    {
      id: 3,
      title: "Pertemuan Orang Tua Siswa",
      content:
        "Pertemuan orang tua siswa akan dilaksanakan pada tanggal 10 Desember 2024 di aula sekolah. Dimohon kehadiran orang tua untuk mendiskusikan perkembangan siswa.",
      date: "20 Okt 2024",
      priority: "Normal",
    },
    {
      id: 4,
      title: "Ekstrakurikuler Baru: Robotika",
      content:
        "Sekolah membuka ekstrakurikuler baru yaitu Robotika. Pendaftaran dibuka hingga 30 Oktober. Silakan datang ke ruang TIK untuk informasi lebih lanjut.",
      date: "15 Okt 2024",
      priority: "Normal",
    },
  ])

  const getPriorityColor = (priority: string) => {
    return priority === "Penting"
      ? "bg-red-100 text-red-800 border-l-4 border-red-500"
      : "bg-blue-100 text-blue-800 border-l-4 border-blue-500"
  }

  return (
    <div className="p-8">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Pengumuman Sekolah</h1>
        <p className="text-gray-600">Lihat semua pengumuman dari sekolah</p>
      </div>

      <div className="space-y-4">
        {announcements.map((announcement) => (
          <div key={announcement.id} className={`card p-6 ${getPriorityColor(announcement.priority)}`}>
            <div className="flex justify-between items-start mb-3">
              <div>
                <h3 className="text-lg font-bold">{announcement.title}</h3>
                <span className="inline-block mt-2 text-xs font-semibold px-2 py-1 bg-white/50 rounded">
                  {announcement.priority}
                </span>
              </div>
              <p className="text-xs text-gray-600">{announcement.date}</p>
            </div>
            <p className="text-sm leading-relaxed mt-3">{announcement.content}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
