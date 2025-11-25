"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { apiClient } from "@/lib/api-client"
import { Loader2, Save, ArrowLeft, CheckCircle2, XCircle, HelpCircle, Clock } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import Link from "next/link"
import { format } from "date-fns"
import { id as idLocale } from "date-fns/locale"

interface StudentAttendance {
  siswaId: string
  nama: string
  nis: string
  status: "HADIR" | "SAKIT" | "IZIN" | "ALPHA" | null
  keterangan?: string
}

interface SessionDetail {
  id: string
  tanggal: string
  pertemuanKe: number
  kelas: {
    namaKelas: string
  }
  students: StudentAttendance[]
}

export default function AttendanceDetailPage() {
  const { sesiId } = useParams()
  const router = useRouter()
  const { toast } = useToast()
  
  const [session, setSession] = useState<SessionDetail | null>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)

  // Local state for edits
  const [attendanceData, setAttendanceData] = useState<StudentAttendance[]>([])

  useEffect(() => {
    fetchSessionDetail()
  }, [sesiId])

  const fetchSessionDetail = async () => {
    setLoading(true)
    try {
      const res = await apiClient.get(`/absensi/sesi/${sesiId}`)
      const data = res.data.data
      setSession(data)
      
      // Initialize attendance data with default HADIR if null
      // Or keep null to force user to select? 
      // Let's default to HADIR for easier input if it's null.
      const initializedStudents = data.students.map((s: StudentAttendance) => ({
        ...s,
        status: s.status || "HADIR" 
      }))
      setAttendanceData(initializedStudents)
    } catch (error) {
      console.error("Failed to fetch session detail", error)
      toast({
        variant: "destructive",
        title: "Gagal memuat sesi",
        description: "Tidak dapat mengambil data sesi absensi.",
      })
    } finally {
      setLoading(false)
    }
  }

  const handleStatusChange = (siswaId: string, status: "HADIR" | "SAKIT" | "IZIN" | "ALPHA") => {
    setAttendanceData(prev => prev.map(s => 
      s.siswaId === siswaId ? { ...s, status } : s
    ))
  }

  const handleSave = async () => {
    setSaving(true)
    try {
      const payload = {
        data: attendanceData.map(s => ({
          siswaId: s.siswaId,
          status: s.status
        }))
      }

      await apiClient.post(`/absensi/sesi/${sesiId}/detail`, payload)
      
      toast({
        title: "Berhasil disimpan",
        description: "Data absensi berhasil diperbarui.",
      })
      
      // Refresh data
      fetchSessionDetail()
    } catch (error) {
      console.error("Failed to save attendance", error)
      toast({
        variant: "destructive",
        title: "Gagal menyimpan",
        description: "Terjadi kesalahan saat menyimpan data absensi.",
      })
    } finally {
      setSaving(false)
    }
  }

  const getStatusColor = (status: string | null) => {
    switch (status) {
      case "HADIR": return "bg-green-100 text-green-700 border-green-200"
      case "SAKIT": return "bg-yellow-100 text-yellow-700 border-yellow-200"
      case "IZIN": return "bg-blue-100 text-blue-700 border-blue-200"
      case "ALPHA": return "bg-red-100 text-red-700 border-red-200"
      default: return "bg-gray-100 text-gray-500 border-gray-200"
    }
  }

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <Loader2 className="animate-spin text-blue-600 mb-4" size={40} />
        <p className="text-gray-500 font-medium">Memuat data absensi...</p>
      </div>
    )
  }

  if (!session) return null

  return (
    <div className="p-8 max-w-5xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4 mb-6">
        <Link href="/dashboard/teacher/attendance" className="p-2 hover:bg-gray-100 rounded-full transition-colors">
          <ArrowLeft size={24} className="text-gray-600" />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Input Absensi</h1>
          <p className="text-gray-600">
            {session.kelas.namaKelas} • Pertemuan {session.pertemuanKe} • {format(new Date(session.tanggal), "d MMMM yyyy", { locale: idLocale })}
          </p>
        </div>
        <div className="ml-auto">
          <button
            onClick={handleSave}
            disabled={saving}
            className="flex items-center gap-2 px-6 py-2.5 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-all shadow-sm"
          >
            {saving ? <Loader2 className="animate-spin" size={18} /> : <Save size={18} />}
            Simpan Absensi
          </button>
        </div>
      </div>

      {/* Stats Summary */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        <div className="bg-green-50 p-4 rounded-xl border border-green-100">
          <div className="text-green-600 text-sm font-medium mb-1">Hadir</div>
          <div className="text-2xl font-bold text-green-700">
            {attendanceData.filter(s => s.status === "HADIR").length}
          </div>
        </div>
        <div className="bg-yellow-50 p-4 rounded-xl border border-yellow-100">
          <div className="text-yellow-600 text-sm font-medium mb-1">Sakit</div>
          <div className="text-2xl font-bold text-yellow-700">
            {attendanceData.filter(s => s.status === "SAKIT").length}
          </div>
        </div>
        <div className="bg-blue-50 p-4 rounded-xl border border-blue-100">
          <div className="text-blue-600 text-sm font-medium mb-1">Izin</div>
          <div className="text-2xl font-bold text-blue-700">
            {attendanceData.filter(s => s.status === "IZIN").length}
          </div>
        </div>
        <div className="bg-red-50 p-4 rounded-xl border border-red-100">
          <div className="text-red-600 text-sm font-medium mb-1">Alpha</div>
          <div className="text-2xl font-bold text-red-700">
            {attendanceData.filter(s => s.status === "ALPHA").length}
          </div>
        </div>
      </div>

      {/* Student List */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <table className="w-full text-sm text-left">
          <thead className="bg-gray-50 text-gray-700 border-b border-gray-200 font-semibold uppercase tracking-wider">
            <tr>
              <th className="px-6 py-4 w-16">No</th>
              <th className="px-6 py-4">Nama Siswa</th>
              <th className="px-6 py-4 text-center">Status Kehadiran</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 bg-white">
            {attendanceData.map((student, idx) => (
              <tr key={student.siswaId} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 text-gray-500">{idx + 1}</td>
                <td className="px-6 py-4">
                  <div className="font-medium text-gray-900">{student.nama}</div>
                  <div className="text-xs text-gray-500">{student.nis}</div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex justify-center gap-2">
                    <StatusButton 
                      active={student.status === "HADIR"} 
                      type="HADIR" 
                      onClick={() => handleStatusChange(student.siswaId, "HADIR")} 
                    />
                    <StatusButton 
                      active={student.status === "SAKIT"} 
                      type="SAKIT" 
                      onClick={() => handleStatusChange(student.siswaId, "SAKIT")} 
                    />
                    <StatusButton 
                      active={student.status === "IZIN"} 
                      type="IZIN" 
                      onClick={() => handleStatusChange(student.siswaId, "IZIN")} 
                    />
                    <StatusButton 
                      active={student.status === "ALPHA"} 
                      type="ALPHA" 
                      onClick={() => handleStatusChange(student.siswaId, "ALPHA")} 
                    />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

function StatusButton({ active, type, onClick }: { active: boolean, type: string, onClick: () => void }) {
  const getStyle = () => {
    if (!active) return "bg-white border-gray-200 text-gray-500 hover:bg-gray-50"
    
    switch (type) {
      case "HADIR": return "bg-green-600 border-green-600 text-white ring-2 ring-green-100"
      case "SAKIT": return "bg-yellow-500 border-yellow-500 text-white ring-2 ring-yellow-100"
      case "IZIN": return "bg-blue-600 border-blue-600 text-white ring-2 ring-blue-100"
      case "ALPHA": return "bg-red-600 border-red-600 text-white ring-2 ring-red-100"
      default: return ""
    }
  }

  const getLabel = () => {
    switch (type) {
      case "HADIR": return "H"
      case "SAKIT": return "S"
      case "IZIN": return "I"
      case "ALPHA": return "A"
      default: return "?"
    }
  }

  const getIcon = () => {
    switch (type) {
      case "HADIR": return <CheckCircle2 size={16} />
      case "SAKIT": return <HelpCircle size={16} />
      case "IZIN": return <Clock size={16} />
      case "ALPHA": return <XCircle size={16} />
      default: return null
    }
  }

  return (
    <button
      onClick={onClick}
      className={`w-10 h-10 rounded-lg border flex items-center justify-center transition-all font-bold ${getStyle()}`}
      title={type}
    >
      {getLabel()}
    </button>
  )
}
