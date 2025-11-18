"use client"

import { useState } from "react"

export default function WaliAttendancePage() {
  const [selectedClass] = useState("4A")

  const [students] = useState([
    { id: 1, nis: "123001", name: "Ahmad Rizki", hadir: 18, sakit: 1, izin: 1, alpa: 0 },
    { id: 2, nis: "123002", name: "Siti Nur Azizah", hadir: 20, sakit: 0, izin: 0, alpa: 0 },
    { id: 3, nis: "123003", name: "Budi Santoso", hadir: 17, sakit: 2, izin: 1, alpa: 0 },
  ])

  return (
    <div className="p-8">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Rekap Absensi Kelas</h1>
        <p className="text-gray-600">Lihat ringkasan kehadiran siswa</p>
      </div>

      <div className="card">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">Kelas {selectedClass}</h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">NIS</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">Nama Siswa</th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-700 uppercase">Hadir</th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-700 uppercase">Sakit</th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-700 uppercase">Izin</th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-700 uppercase">Alpa</th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-700 uppercase">Persentase</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {students.map((student) => {
                const total = student.hadir + student.sakit + student.izin + student.alpa
                const persentase = ((student.hadir / total) * 100).toFixed(1)
                return (
                  <tr key={student.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">{student.nis}</td>
                    <td className="px-6 py-4 text-sm text-gray-700">{student.name}</td>
                    <td className="px-6 py-4 text-center text-sm font-semibold text-green-600">{student.hadir}</td>
                    <td className="px-6 py-4 text-center text-sm font-semibold text-yellow-600">{student.sakit}</td>
                    <td className="px-6 py-4 text-center text-sm font-semibold text-blue-600">{student.izin}</td>
                    <td className="px-6 py-4 text-center text-sm font-semibold text-red-600">{student.alpa}</td>
                    <td className="px-6 py-4 text-center text-sm font-bold">{persentase}%</td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
