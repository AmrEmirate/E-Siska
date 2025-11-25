"use client"

import { useState, useEffect } from "react"
import { apiClient } from "@/lib/api-client"
import { Loader2, ArrowLeft, Printer, FileText, AlertCircle } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import Link from "next/link"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

interface RaporItem {
  id: string
  tahunAjaran: {
    nama: string
    semester: string
  }
  kelas: {
    namaKelas: string
  }
  waliKelas: {
    nama: string
  }
  isFinalisasi: boolean
}

export default function StudentRaporPage() {
  const { toast } = useToast()
  const [rapors, setRapors] = useState<RaporItem[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchRapors()
  }, [])

  const fetchRapors = async () => {
    try {
      const res = await apiClient.get("/rapor/me")
      setRapors(res.data.data)
    } catch (error) {
      console.error("Failed to fetch rapors", error)
      toast({
        variant: "destructive",
        title: "Gagal memuat rapor",
        description: "Tidak dapat mengambil data rapor.",
      })
    } finally {
      setLoading(false)
    }
  }

  const handlePrint = (raporId: string) => {
    // In a real app, this would open a PDF or a print-friendly page
    // For now, we can redirect to the same print page used by teachers but for students?
    // Or just show a toast.
    // Let's assume we reuse the teacher's print page but adapted for student view?
    // Actually, the teacher print page is `/dashboard/homeroom/students/[id]/rapor/print`.
    // We might need a student-accessible print route.
    // For simplicity, I'll just show a toast "Fitur cetak sedang dikembangkan".
    toast({
      title: "Fitur Cetak",
      description: "Fitur cetak PDF akan segera tersedia.",
    })
  }

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <Loader2 className="animate-spin text-blue-600 mb-4" size={40} />
        <p className="text-gray-500 font-medium">Memuat data rapor...</p>
      </div>
    )
  }

  return (
    <div className="p-8 max-w-5xl mx-auto space-y-6">
      <div className="flex items-center gap-4 mb-6">
        <Link href="/dashboard/student" className="p-2 hover:bg-gray-100 rounded-full transition-colors">
          <ArrowLeft size={24} className="text-gray-600" />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Rapor Hasil Belajar</h1>
          <p className="text-gray-600">Arsip rapor semester yang telah difinalisasi.</p>
        </div>
      </div>

      {rapors.length === 0 ? (
        <div className="space-y-4">
          <Alert>
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Belum ada rapor</AlertTitle>
            <AlertDescription>
              Belum ada rapor yang diterbitkan untuk Anda saat ini. Rapor akan muncul setelah difinalisasi oleh Wali Kelas.
            </AlertDescription>
          </Alert>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {rapors.map((rapor) => (
            <div key={rapor.id} className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-all">
              <div className="flex justify-between items-start mb-4">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center text-purple-600">
                  <FileText size={24} />
                </div>
                <button 
                  onClick={() => handlePrint(rapor.id)}
                  className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-full transition-colors"
                  title="Cetak Rapor"
                >
                  <Printer size={20} />
                </button>
              </div>
              
              <h3 className="text-lg font-bold text-gray-900 mb-1">
                {rapor.tahunAjaran.nama} - {rapor.tahunAjaran.semester}
              </h3>
              
              <div className="space-y-2 mt-4 text-sm text-gray-600">
                <div className="flex justify-between">
                  <span>Kelas</span>
                  <span className="font-medium text-gray-900">{rapor.kelas.namaKelas}</span>
                </div>
                <div className="flex justify-between">
                  <span>Wali Kelas</span>
                  <span className="font-medium text-gray-900">{rapor.waliKelas.nama}</span>
                </div>
                <div className="flex justify-between">
                  <span>Status</span>
                  <span className="px-2 py-0.5 bg-green-100 text-green-700 rounded text-xs font-medium">
                    Diterbitkan
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
