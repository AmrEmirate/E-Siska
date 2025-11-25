"use client"

import { useState, useEffect } from "react"
import { useDokumen, type Dokumen } from "@/hooks/use-dokumen"
import { Loader2 } from "lucide-react"

export default function DocumentsManagementPage() {
  const { data: documents, loading, fetchDokumen, uploadDokumen, deleteDokumen } = useDokumen()

  const [uploading, setUploading] = useState(false)

  useEffect(() => {
    fetchDokumen()
  }, [fetchDokumen])

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setUploading(true)
    await uploadDokumen(file)
    setUploading(false)
    // Reset input
    e.target.value = ""
  }

  const handleDelete = async (id: string) => {
    if (confirm("Yakin ingin menghapus dokumen ini?")) {
      await deleteDokumen(id)
    }
  }

  const handleDownload = (doc: Dokumen) => {
    if (doc.url) {
      window.open(doc.url, "_blank")
    }
  }

  if (loading && documents.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px]">
        <Loader2 className="animate-spin text-red-600 mb-4" size={40} />
        <p className="text-gray-500 font-medium">Memuat dokumen...</p>
      </div>
    )
  }

  return (
    <div className="p-8">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Manajemen Dokumen</h1>
        <p className="text-gray-600">Kelola dokumen sekolah yang dapat diunduh</p>
      </div>

      <div className="card">
        <div className="p-6 border-b border-gray-200 flex justify-between items-center">
          <h2 className="text-xl font-semibold text-gray-900">Daftar Dokumen</h2>
          <label className="btn-primary cursor-pointer">
            {uploading ? (
              <>
                <Loader2 className="inline-block animate-spin mr-2" size={16} />
                Mengunggah...
              </>
            ) : (
              "+ Unggah Dokumen"
            )}
            <input type="file" className="hidden" onChange={handleFileUpload} disabled={uploading} />
          </label>
        </div>

        <div className="overflow-x-auto">
          {loading && documents.length === 0 ? (
            <p className="p-6 text-center text-gray-500">Memuat data...</p>
          ) : (
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
                {documents.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="px-6 py-4 text-center text-gray-500">
                      Belum ada dokumen.
                    </td>
                  </tr>
                ) : (
                  documents.map((doc) => (
                    <tr key={doc.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 text-sm font-medium text-gray-900">{doc.namaDokumen}</td>
                      <td className="px-6 py-4 text-sm">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                          {doc.tipe || "FILE"}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-700">
                        {doc.ukuran ? `${(doc.ukuran / 1024 / 1024).toFixed(2)} MB` : "-"}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-700">
                        {doc.createdAt ? new Date(doc.createdAt).toLocaleDateString("id-ID") : "-"}
                      </td>
                      <td className="px-6 py-4 text-sm space-x-2">
                        <button className="text-blue-600 hover:text-blue-900" onClick={() => handleDownload(doc)}>
                          Unduh
                        </button>
                        <button className="text-red-600 hover:text-red-900" onClick={() => handleDelete(doc.id)}>
                          Hapus
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
    </div>
  )
}
