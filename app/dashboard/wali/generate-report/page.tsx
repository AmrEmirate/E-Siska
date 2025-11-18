"use client"

import { useState } from "react"

export default function GenerateReportPage() {
  const [selectedStudent, setSelectedStudent] = useState("123001")
  const [students] = useState([
    { id: "123001", name: "Ahmad Rizki" },
    { id: "123002", name: "Siti Nur Azizah" },
    { id: "123003", name: "Budi Santoso" },
  ])

  return (
    <div className="p-8">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Generate Rapor</h1>
        <p className="text-gray-600">Cetak rapor siswa yang sudah difinalisasi</p>
      </div>

      {/* Generate Options */}
      <div className="card p-6 mb-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Pilih Siswa</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Nama Siswa</label>
            <select
              value={selectedStudent}
              onChange={(e) => setSelectedStudent(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
            >
              {students.map((student) => (
                <option key={student.id} value={student.id}>
                  {student.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Format Output</label>
            <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent">
              <option>PDF</option>
              <option>Excel</option>
            </select>
          </div>
        </div>
      </div>

      {/* Preview */}
      <div className="card p-8 mb-6">
        <div className="text-center mb-6 pb-6 border-b-2 border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900">RAPOR SISWA</h2>
          <p className="text-sm text-gray-600">SDN Ciater 02 Serpong</p>
        </div>

        <div className="space-y-4 mb-6">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-600">Nama Siswa</p>
              <p className="font-semibold text-gray-900">{students.find((s) => s.id === selectedStudent)?.name}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">NIS</p>
              <p className="font-semibold text-gray-900">{selectedStudent}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Kelas</p>
              <p className="font-semibold text-gray-900">4A</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Semester</p>
              <p className="font-semibold text-gray-900">1 / Tahun Ajaran 2024/2025</p>
            </div>
          </div>
        </div>

        <div className="mb-6">
          <h3 className="font-semibold text-gray-900 mb-3">Nilai Mata Pelajaran</h3>
          <table className="w-full text-sm border border-gray-300">
            <thead className="bg-gray-100">
              <tr>
                <th className="border border-gray-300 px-3 py-2 text-left">Mata Pelajaran</th>
                <th className="border border-gray-300 px-3 py-2 text-center w-20">Nilai</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-gray-300 px-3 py-2">Matematika</td>
                <td className="border border-gray-300 px-3 py-2 text-center">84.5</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-3 py-2">Bahasa Indonesia</td>
                <td className="border border-gray-300 px-3 py-2 text-center">90</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-3 py-2">IPA</td>
                <td className="border border-gray-300 px-3 py-2 text-center">82</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="mb-6">
          <h3 className="font-semibold text-gray-900 mb-2">Catatan Wali Kelas</h3>
          <p className="text-sm text-gray-700 bg-gray-50 p-3 rounded">
            Siswa menunjukkan prestasi yang baik dalam pembelajaran. Diharapkan terus meningkatkan motivasi belajar.
          </p>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-3 justify-end">
        <button className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 font-medium">
          Preview
        </button>
        <button className="btn-primary">Generate PDF</button>
      </div>
    </div>
  )
}
