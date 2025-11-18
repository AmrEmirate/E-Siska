"use client"

import { useState } from "react"

export default function SubjectsManagementPage() {
  const [subjects] = useState([
    { id: 1, name: "Matematika", category: "Wajib", type: "Kuantitatif", teacher: "Bapak Aris" },
    { id: 2, name: "Bahasa Indonesia", category: "Wajib", type: "Kuantitatif", teacher: "Ibu Siti" },
    { id: 3, name: "IPA", category: "Wajib", type: "Kuantitatif", teacher: "Bapak Ahmad" },
    { id: 4, name: "Olahraga", category: "Muatan Lokal", type: "Kuantitatif", teacher: "Bapak Rudi" },
    { id: 5, name: "Komputer", category: "Ekstrakurikuler", type: "Kualitatif", teacher: "Bapak Bambang" },
  ])

  const categoryColors: Record<string, string> = {
    Wajib: "bg-red-100 text-red-800",
    "Muatan Lokal": "bg-blue-100 text-blue-800",
    Ekstrakurikuler: "bg-green-100 text-green-800",
  }

  const typeColors: Record<string, string> = {
    Kuantitatif: "bg-purple-100 text-purple-800",
    Kualitatif: "bg-orange-100 text-orange-800",
  }

  return (
    <div className="p-8">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Manajemen Mata Pelajaran</h1>
        <p className="text-gray-600">Kelola mata pelajaran dan skema penilaian</p>
      </div>

      <div className="card">
        <div className="p-6 border-b border-gray-200 flex justify-between items-center">
          <h2 className="text-xl font-semibold text-gray-900">Daftar Mata Pelajaran</h2>
          <button className="btn-primary">+ Tambah Mata Pelajaran</button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">Mata Pelajaran</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">Kategori</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">Tipe Penilaian</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">Guru Pengampu</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {subjects.map((subject) => (
                <tr key={subject.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">{subject.name}</td>
                  <td className="px-6 py-4 text-sm">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${categoryColors[subject.category]}`}
                    >
                      {subject.category}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${typeColors[subject.type]}`}
                    >
                      {subject.type}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-700">{subject.teacher}</td>
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
