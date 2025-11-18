"use client"

import { useState } from "react"

export default function ClassesManagementPage() {
  const [classes] = useState([
    { id: 1, name: "4A", level: "Kelas 4", capacity: 30, students: 28, teacher: "Ibu Siti" },
    { id: 2, name: "4B", level: "Kelas 4", capacity: 30, students: 27, teacher: "Bapak Aris" },
    { id: 3, name: "5A", level: "Kelas 5", capacity: 32, students: 31, teacher: "Ibu Dewi" },
    { id: 4, name: "5B", level: "Kelas 5", capacity: 32, students: 29, teacher: "Bapak Ahmad" },
  ])

  return (
    <div className="p-8">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Manajemen Kelas</h1>
        <p className="text-gray-600">Kelola data kelas dan penempatan siswa</p>
      </div>

      <div className="card">
        <div className="p-6 border-b border-gray-200 flex justify-between items-center">
          <h2 className="text-xl font-semibold text-gray-900">Daftar Kelas</h2>
          <button className="btn-primary">+ Tambah Kelas</button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-6">
          {classes.map((cls) => (
            <div key={cls.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h3 className="text-xl font-bold text-gray-900">{cls.name}</h3>
                  <p className="text-sm text-gray-600">{cls.level}</p>
                </div>
                <div className="flex gap-2">
                  <button className="text-blue-600 hover:text-blue-900 text-sm">Edit</button>
                  <button className="text-red-600 hover:text-red-900 text-sm">Hapus</button>
                </div>
              </div>

              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Siswa:</span>
                  <span className="font-semibold text-gray-900">
                    {cls.students}/{cls.capacity}
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-red-600 h-2 rounded-full"
                    style={{ width: `${(cls.students / cls.capacity) * 100}%` }}
                  />
                </div>
                <div className="flex justify-between pt-2">
                  <span className="text-gray-600">Wali Kelas:</span>
                  <span className="font-medium text-gray-900">{cls.teacher}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
