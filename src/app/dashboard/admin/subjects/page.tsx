"use client"

import { useState, useEffect } from "react"
import { apiClient } from "@/lib/api-client"
import { FormulaEditorModal } from "@/components/dashboard/admin/subjects/formula-editor-modal"
import { Settings, Trash2, Edit } from "lucide-react"

interface Subject {
  id: string
  namaMapel: string
  kategori: string
}

export default function SubjectsManagementPage() {
  const [subjects, setSubjects] = useState<Subject[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedMapel, setSelectedMapel] = useState<{ id: string; name: string } | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  useEffect(() => {
    fetchSubjects()
  }, [])

  const fetchSubjects = async () => {
    try {
      const response = await apiClient.get("/mapel")
      setSubjects(response.data.data)
    } catch (error) {
      console.error("Failed to fetch subjects:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm("Yakin ingin menghapus mata pelajaran ini?")) return
    try {
      await apiClient.delete(`/mapel/${id}`)
      fetchSubjects()
    } catch (error) {
      alert("Gagal menghapus mata pelajaran")
    }
  }

  const openFormulaEditor = (mapel: Subject) => {
    setSelectedMapel({ id: mapel.id, name: mapel.namaMapel })
    setIsModalOpen(true)
  }

  const categoryColors: Record<string, string> = {
    WAJIB: "bg-red-100 text-red-800",
    MUATAN_LOKAL: "bg-blue-100 text-blue-800",
    EKSTRAKURIKULER: "bg-green-100 text-green-800",
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
          <button className="btn-primary" onClick={() => alert("Fitur Tambah Mapel belum diimplementasikan di demo ini")}>
            + Tambah Mata Pelajaran
          </button>
        </div>

        <div className="overflow-x-auto">
          {loading ? (
            <p className="p-6 text-center text-gray-500">Memuat data...</p>
          ) : (
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">Mata Pelajaran</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">Kategori</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">Skema Penilaian</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {subjects.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="px-6 py-4 text-center text-gray-500">
                      Belum ada mata pelajaran.
                    </td>
                  </tr>
                ) : (
                  subjects.map((subject) => (
                    <tr key={subject.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 text-sm font-medium text-gray-900">{subject.namaMapel}</td>
                      <td className="px-6 py-4 text-sm">
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            categoryColors[subject.kategori] || "bg-gray-100 text-gray-800"
                          }`}
                        >
                          {subject.kategori}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm">
                        {subject.kategori !== "EKSTRAKURIKULER" ? (
                          <button
                            onClick={() => openFormulaEditor(subject)}
                            className="flex items-center gap-1 text-blue-600 hover:text-blue-900 font-medium"
                          >
                            <Settings size={16} /> Atur Skema
                          </button>
                        ) : (
                          <span className="text-gray-400 italic text-xs">Penilaian Deskriptif</span>
                        )}
                      </td>
                      <td className="px-6 py-4 text-sm space-x-2 flex items-center">
                        <button className="text-gray-600 hover:text-gray-900">
                          <Edit size={18} />
                        </button>
                        <button 
                          onClick={() => handleDelete(subject.id)}
                          className="text-red-600 hover:text-red-900"
                        >
                          <Trash2 size={18} />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          )}
        </div>
      </div>

      {selectedMapel && (
        <FormulaEditorModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          mapelId={selectedMapel.id}
          mapelName={selectedMapel.name}
        />
      )}
    </div>
  )
}
