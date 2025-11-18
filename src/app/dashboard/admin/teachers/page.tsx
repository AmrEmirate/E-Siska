"use client"

import { useState } from "react"

export default function TeachersManagementPage() {
  const [teachers] = useState([
    {
      id: 1,
      nip: "196512151990031001",
      name: "Ibu Siti Nurhasanah",
      email: "siti@sdnciater02.sch.id",
      class: "4A",
      subjects: "3",
    },
    {
      id: 2,
      nip: "196712121992031002",
      name: "Bapak Aris Suryanto",
      email: "aris@sdnciater02.sch.id",
      class: "4B",
      subjects: "4",
    },
    {
      id: 3,
      nip: "197008101995032003",
      name: "Ibu Dewi Lestari",
      email: "dewi@sdnciater02.sch.id",
      class: "5A",
      subjects: "5",
    },
  ])

  return (
    <div className="p-8">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Manajemen Guru</h1>
        <p className="text-gray-600">Kelola data dan penempatan guru</p>
      </div>

      <div className="card">
        <div className="p-6 border-b border-gray-200 flex justify-between items-center">
          <h2 className="text-xl font-semibold text-gray-900">Daftar Guru</h2>
          <button className="btn-primary">+ Tambah Guru</button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">NIP</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">Nama Guru</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">Email</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">Wali Kelas</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">Mata Pelajaran</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {teachers.map((teacher) => (
                <tr key={teacher.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">{teacher.nip}</td>
                  <td className="px-6 py-4 text-sm text-gray-700">{teacher.name}</td>
                  <td className="px-6 py-4 text-sm text-gray-700">{teacher.email}</td>
                  <td className="px-6 py-4 text-sm">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      {teacher.class}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-700">{teacher.subjects} Mapel</td>
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
