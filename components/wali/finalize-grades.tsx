"use client"

import { useState } from "react"

export default function FinalizeGradesPage() {
  const [students] = useState([
    { id: 1, nis: "123001", name: "Ahmad Rizki", status: "Siap Finalisasi" },
    { id: 2, nis: "123002", name: "Siti Nur Azizah", status: "Siap Finalisasi" },
    { id: 3, nis: "123003", name: "Budi Santoso", status: "Belum Lengkap" },
  ])

  const [classNotes, setClassNotes] = useState("")

  return (
    <div className="p-8">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Finalisasi Nilai Rapor</h1>
        <p className="text-gray-600">Kunci nilai siswa sebelum cetak rapor</p>
      </div>

      {/* Class Notes */}
      <div className="card p-6 mb-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Catatan Wali Kelas</h2>
        <textarea
          value={classNotes}
          onChange={(e) => setClassNotes(e.target.value)}
          placeholder="Masukkan catatan umum untuk kelas..."
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
          rows={4}
        />
      </div>

      {/* Checklist */}
      <div className="card p-6 mb-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Checklist Sebelum Finalisasi</h2>
        <div className="space-y-3">
          <label className="flex items-center gap-3 cursor-pointer">
            <input type="checkbox" className="w-5 h-5 text-red-600" />
            <span className="text-gray-700">Semua nilai guru sudah diinput</span>
          </label>
          <label className="flex items-center gap-3 cursor-pointer">
            <input type="checkbox" className="w-5 h-5 text-red-600" />
            <span className="text-gray-700">Capaian kompetensi sudah diisi</span>
          </label>
          <label className="flex items-center gap-3 cursor-pointer">
            <input type="checkbox" className="w-5 h-5 text-red-600" />
            <span className="text-gray-700">Data kokurikuler sudah lengkap</span>
          </label>
          <label className="flex items-center gap-3 cursor-pointer">
            <input type="checkbox" className="w-5 h-5 text-red-600" />
            <span className="text-gray-700">Catatan wali kelas sudah ditulis</span>
          </label>
        </div>
      </div>

      {/* Student List */}
      <div className="card">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">Status Siswa</h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">NIS</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">Nama Siswa</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {students.map((student) => (
                <tr key={student.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">{student.nis}</td>
                  <td className="px-6 py-4 text-sm text-gray-700">{student.name}</td>
                  <td className="px-6 py-4 text-sm">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        student.status === "Siap Finalisasi"
                          ? "bg-green-100 text-green-800"
                          : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {student.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm space-x-2">
                    <button className="text-blue-600 hover:text-blue-900">Review</button>
                    {student.status === "Siap Finalisasi" && (
                      <button className="text-green-600 hover:text-green-900">Finalisasi</button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="p-6 border-t border-gray-200 flex justify-end gap-3">
          <button className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50">Batal</button>
          <button className="btn-primary">Finalisasi Semua</button>
        </div>
      </div>
    </div>
  )
}
