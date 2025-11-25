"use client"

import { useState, useEffect } from "react"
import { apiClient } from "@/lib/api-client"
import { Loader2, User, FileText, AlertCircle } from "lucide-react"
import Link from "next/link"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

interface Student {
  id: string
  nis: string
  nama: string
}

interface ClassData {
  id: string
  namaKelas: string
  tingkatan: {
    namaTingkatan: string
  }
  Penempatan: {
    siswa: Student
  }[]
}

export default function HomeroomStudentsPage() {
  const [classData, setClassData] = useState<ClassData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchMyClass = async () => {
      try {
        const res = await apiClient.get("/kelas/my-class")
        setClassData(res.data.data)
      } catch (err: any) {
        console.error("Failed to fetch class", err)
        if (err.response?.status === 404) {
          setError("Anda belum ditugaskan sebagai Wali Kelas untuk kelas manapun.")
        } else {
          setError("Gagal memuat data kelas. Silakan coba lagi nanti.")
        }
      } finally {
        setLoading(false)
      }
    }
    fetchMyClass()
  }, [])

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px]">
        <Loader2 className="animate-spin text-blue-600 mb-4" size={40} />
        <p className="text-gray-500 font-medium">Memuat data kelas...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="p-8">
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Akses Ditolak</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      </div>
    )
  }

  if (!classData) return null

  return (
    <div className="p-8 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Wali Kelas: {classData.namaKelas}</h1>
        <p className="text-gray-600">Kelola rapor siswa di kelas Anda.</p>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-6 border-b border-gray-200 bg-gray-50/50">
          <h2 className="text-xl font-semibold text-gray-900">Daftar Siswa</h2>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-gray-50 text-gray-700 border-b border-gray-200 font-semibold uppercase tracking-wider">
              <tr>
                <th className="px-6 py-4 w-24">No</th>
                <th className="px-6 py-4 w-32">NIS</th>
                <th className="px-6 py-4">Nama Siswa</th>
                <th className="px-6 py-4 text-center w-40">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
              {classData.Penempatan.length === 0 ? (
                <tr>
                  <td colSpan={4} className="px-6 py-12 text-center text-gray-500">
                    Belum ada siswa di kelas ini.
                  </td>
                </tr>
              ) : (
                classData.Penempatan.map((p, index) => (
                  <tr key={p.siswa.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 text-gray-500">{index + 1}</td>
                    <td className="px-6 py-4 font-medium text-gray-900">{p.siswa.nis}</td>
                    <td className="px-6 py-4 text-gray-700">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                          <User size={16} />
                        </div>
                        {p.siswa.nama}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <Link 
                        href={`/dashboard/homeroom/students/${p.siswa.id}/rapor`}
                        className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 hover:text-blue-600 hover:border-blue-300 transition-all shadow-sm"
                      >
                        <FileText size={16} />
                        Lihat Rapor
                      </Link>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
