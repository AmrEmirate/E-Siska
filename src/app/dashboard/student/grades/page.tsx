"use client"

import { useState } from "react"

export default function StudentGradesPage() {
  const [grades] = useState([
    {
      id: 1,
      subject: "Matematika",
      category: "Wajib",
      components: [
        { name: "Tugas 1", value: 85 },
        { name: "Tugas 2", value: 88 },
        { name: "Rata-rata Tugas", value: 86.5 },
        { name: "UTS", value: 82 },
        { name: "UAS", value: 85 },
      ],
      nilaiAkhir: 84.5,
      kompetensi: "Sangat Baik",
    },
    {
      id: 2,
      subject: "Bahasa Indonesia",
      category: "Wajib",
      components: [
        { name: "Tugas 1", value: 90 },
        { name: "Tugas 2", value: 92 },
        { name: "Rata-rata Tugas", value: 91 },
        { name: "UTS", value: 88 },
        { name: "UAS", value: 91 },
      ],
      nilaiAkhir: 90,
      kompetensi: "Sangat Baik",
    },
    {
      id: 3,
      subject: "Olahraga",
      category: "Ekstrakurikuler",
      components: [],
      nilaiAkhir: null,
      kompetensi: "Aktif berpartisipasi, menunjukkan kemajuan yang baik dalam pembelajaran",
    },
  ])

  const getKompetensiColor = (kompetensi: string) => {
    if (kompetensi.includes("Sangat Baik")) return "bg-green-100 text-green-800"
    if (kompetensi.includes("Baik")) return "bg-blue-100 text-blue-800"
    if (kompetensi.includes("Cukup")) return "bg-yellow-100 text-yellow-800"
    return "bg-gray-100 text-gray-800"
  }

  return (
    <div className="p-8">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Nilai Saya</h1>
        <p className="text-gray-600">Lihat nilai dan capaian kompetensi per mata pelajaran</p>
      </div>

      <div className="space-y-6">
        {grades.map((grade) => (
          <div key={grade.id} className="card overflow-hidden">
            {/* Header */}
            <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-red-50 to-orange-50">
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">{grade.subject}</h2>
                  <p className="text-sm text-gray-600 mt-1">{grade.category}</p>
                </div>
                {grade.nilaiAkhir && (
                  <div className="text-right">
                    <p className="text-xs text-gray-600">Nilai Akhir</p>
                    <p className="text-3xl font-bold text-red-600">{grade.nilaiAkhir}</p>
                  </div>
                )}
              </div>
            </div>

            {/* Content */}
            <div className="p-6">
              {grade.components.length > 0 ? (
                // Kuantitatif
                <>
                  <div className="mb-6">
                    <h3 className="font-semibold text-gray-900 mb-4">Komponen Nilai</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {grade.components.map((comp, idx) => (
                        <div
                          key={idx}
                          className="p-4 bg-gray-50 rounded-lg border border-gray-200 flex justify-between items-center"
                        >
                          <span className="text-gray-700">{comp.name}</span>
                          <span className="font-semibold text-gray-900 bg-white px-3 py-1 rounded">{comp.value}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-6 border-t border-gray-200">
                    <h3 className="font-semibold text-gray-900 mb-3">Capaian Kompetensi</h3>
                    <p className="text-gray-700 leading-relaxed">{grade.kompetensi}</p>
                  </div>
                </>
              ) : (
                // Kualitatif
                <div>
                  <h3 className="font-semibold text-gray-900 mb-3">Deskripsi</h3>
                  <p className="text-gray-700 leading-relaxed mb-4">{grade.kompetensi}</p>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Summary Card */}
      <div className="mt-8 card p-6">
        <h3 className="font-semibold text-gray-900 mb-4">Ringkasan</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 bg-red-50 rounded-lg border border-red-200">
            <p className="text-sm text-gray-600">Rata-rata Nilai</p>
            <p className="text-2xl font-bold text-red-600 mt-2">87.5</p>
          </div>
          <div className="p-4 bg-green-50 rounded-lg border border-green-200">
            <p className="text-sm text-gray-600">Prestasi Tertinggi</p>
            <p className="text-lg font-semibold text-green-800 mt-2">Bahasa Indonesia (90)</p>
          </div>
          <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
            <p className="text-sm text-gray-600">Total Mata Pelajaran</p>
            <p className="text-2xl font-bold text-blue-600 mt-2">{grades.length}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
