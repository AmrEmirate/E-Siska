"use client"

import { useState } from "react"

export default function WaliGradesPage() {
  const [selectedClass] = useState("4A")

  const [students] = useState([
    {
      id: 1,
      nis: "123001",
      name: "Ahmad Rizki",
      matematika: 84.5,
      bahasaIndonesia: 90,
      ipa: 82,
      rataRata: 85.5,
    },
    {
      id: 2,
      nis: "123002",
      name: "Siti Nur Azizah",
      matematika: 90,
      bahasaIndonesia: 91,
      ipa: 88,
      rataRata: 89.7,
    },
    {
      id: 3,
      nis: "123003",
      name: "Budi Santoso",
      matematika: 77.5,
      bahasaIndonesia: 80,
      ipa: 76,
      rataRata: 77.8,
    },
  ])

  return (
    <div className="p-8">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Rekap Nilai Kelas</h1>
        <p className="text-gray-600">Lihat ringkasan nilai siswa di kelas bimbingan</p>
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
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-700 uppercase">Matematika</th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-700 uppercase">B. Indonesia</th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-700 uppercase">IPA</th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-700 uppercase">Rata-rata</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {students.map((student) => (
                <tr key={student.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">{student.nis}</td>
                  <td className="px-6 py-4 text-sm text-gray-700">{student.name}</td>
                  <td className="px-6 py-4 text-center text-sm font-semibold text-gray-900">{student.matematika}</td>
                  <td className="px-6 py-4 text-center text-sm font-semibold text-gray-900">
                    {student.bahasaIndonesia}
                  </td>
                  <td className="px-6 py-4 text-center text-sm font-semibold text-gray-900">{student.ipa}</td>
                  <td className="px-6 py-4 text-center text-sm font-bold bg-red-50 text-red-600">{student.rataRata}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
