"use client"

import { useState } from "react"

export default function DocumentsManagementPage() {
  const [documents] = useState([
    { id: 1, name: "Panduan Penilaian 2024", type: "PDF", size: "2.5 MB", uploadDate: "01 Nov 2024" },
    { id: 2, name: "Template Rapor", type: "XLSX", size: "1.2 MB", uploadDate: "30 Okt 2024" },
    { id: 3, name: "Kalender Akademik", type: "PDF", size: "0.8 MB", uploadDate: "28 Okt 2024" },
  ])

  return (
    <div className="p-8">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Manajemen Dokumen</h1>
        <p className="text-gray-600">Kelola dokumen sekolah yang dapat diunduh</p>
      </div>

      <div className="card">
        <div className="p-6 border-b border-gray-200 flex justify-between items-center">
          <h2 className="text-xl font-semibold text-gray-900">Daftar Dokumen</h2>
          <button className="btn-primary">+ Unggah Dokumen</button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">Nama Dokumen</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">Tipe</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">Ukuran</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">Tanggal Unggah</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {documents.map((doc) => (
                <tr key={doc.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">{doc.name}</td>
                  <td className="px-6 py-4 text-sm">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                      {doc.type}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-700">{doc.size}</td>
                  <td className="px-6 py-4 text-sm text-gray-700">{doc.uploadDate}</td>
                  <td className="px-6 py-4 text-sm space-x-2">
                    <button className="text-blue-600 hover:text-blue-900">Unduh</button>
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
