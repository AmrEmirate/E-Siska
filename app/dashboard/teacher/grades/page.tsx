"use client"

import { useState } from "react"

export default function GradesPage() {
  const [selectedClass, setSelectedClass] = useState("4A")
  const [selectedSubject, setSelectedSubject] = useState("Matematika")

  const classes = ["4A", "4B", "5A", "5B"]
  const subjects = ["Matematika", "Bahasa Indonesia", "IPA"]

  const [gradeData] = useState([
    {
      id: 1,
      nis: "123001",
      name: "Ahmad Rizki",
      t1: 85,
      t2: 88,
      uts: 82,
      uas: 85,
      rataTask: 86.5,
      nilaiAkhir: 84.5,
      kompetensi: "Sangat Baik",
    },
    {
      id: 2,
      nis: "123002",
      name: "Siti Nur Azizah",
      t1: 90,
      t2: 92,
      uts: 88,
      uas: 91,
      rataTask: 91,
      nilaiAkhir: 90,
      kompetensi: "Sangat Baik",
    },
    {
      id: 3,
      nis: "123003",
      name: "Budi Santoso",
      t1: 75,
      t2: 78,
      uts: 76,
      uas: 80,
      rataTask: 76.5,
      nilaiAkhir: 77.5,
      kompetensi: "Baik",
    },
  ])

  return (
    <div className="p-8">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Manajemen Nilai & Kompetensi</h1>
        <p className="text-gray-600">Input nilai dan capaian kompetensi siswa</p>
      </div>

      {/* Filter Selection */}
      <div className="card p-6 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
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
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Pilih Mata Pelajaran</label>
            <select
              value={selectedSubject}
              onChange={(e) => setSelectedSubject(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
            >
              {subjects.map((subj) => (
                <option key={subj} value={subj}>
                  {subj}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Grade Table */}
      <div className="card">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">
            {selectedSubject} - Kelas {selectedClass}
          </h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">NIS</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">Nama Siswa</th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-700 uppercase">Tugas 1</th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-700 uppercase">Tugas 2</th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-700 uppercase">Rata-rata</th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-700 uppercase">UTS</th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-700 uppercase">UAS</th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-700 uppercase">Nilai Akhir</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">Kompetensi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {gradeData.map((student) => (
                <tr key={student.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">{student.nis}</td>
                  <td className="px-6 py-4 text-sm text-gray-700">{student.name}</td>
                  <td className="px-6 py-4 text-center">
                    <input
                      type="number"
                      defaultValue={student.t1}
                      className="w-12 px-2 py-1 border border-gray-300 rounded text-center text-sm"
                      min="0"
                      max="100"
                    />
                  </td>
                  <td className="px-6 py-4 text-center">
                    <input
                      type="number"
                      defaultValue={student.t2}
                      className="w-12 px-2 py-1 border border-gray-300 rounded text-center text-sm"
                      min="0"
                      max="100"
                    />
                  </td>
                  <td className="px-6 py-4 text-center text-sm font-medium text-gray-900 bg-gray-50">
                    {student.rataTask}
                  </td>
                  <td className="px-6 py-4 text-center">
                    <input
                      type="number"
                      defaultValue={student.uts}
                      className="w-12 px-2 py-1 border border-gray-300 rounded text-center text-sm"
                      min="0"
                      max="100"
                    />
                  </td>
                  <td className="px-6 py-4 text-center">
                    <input
                      type="number"
                      defaultValue={student.uas}
                      className="w-12 px-2 py-1 border border-gray-300 rounded text-center text-sm"
                      min="0"
                      max="100"
                    />
                  </td>
                  <td className="px-6 py-4 text-center text-sm font-bold text-red-600 bg-red-50">
                    {student.nilaiAkhir}
                  </td>
                  <td className="px-6 py-4">
                    <input
                      type="text"
                      defaultValue={student.kompetensi}
                      className="w-24 px-2 py-1 border border-gray-300 rounded text-sm"
                      placeholder="Capaian..."
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="p-6 border-t border-gray-200 flex justify-end">
          <button className="btn-primary">Simpan Nilai</button>
        </div>
      </div>
    </div>
  )
}
