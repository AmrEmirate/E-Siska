"use client"

import { useState } from "react"

export default function StudentsManagementPage() {
  const [students] = useState([
    { id: 1, nis: "123001", name: "Ahmad Rizki", class: "4A", status: "Aktif" },
    { id: 2, nis: "123002", name: "Siti Nur Azizah", class: "4A", status: "Aktif" },
    { id: 3, nis: "123003", name: "Budi Santoso", class: "4B", status: "Aktif" },
  ])

  return (
    <div className="p-8">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Manajemen Siswa</h1>
        <p className="text-gray-600">Kelola data siswa sekolah</p>
      </div>

      <div className="card">
        <div className="p-6 border-b border-gray-200 flex justify-between items-center">
          <h2 className="text-xl font-semibold text-gray-900">Daftar Siswa</h2>
          <button className="btn-primary">+ Tambah Siswa</button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">NIS</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">Nama Siswa</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">Kelas</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {students.map((student) => (
                <tr key={student.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">{student.nis}</td>
                  <td className="px-6 py-4 text-sm text-gray-700">{student.name}</td>
                  <td className="px-6 py-4 text-sm text-gray-700">{student.class}</td>
                  <td className="px-6 py-4 text-sm">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      {student.status}
                    </span>
                  </td>
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
