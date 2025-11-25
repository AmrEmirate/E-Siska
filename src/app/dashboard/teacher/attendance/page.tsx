"use client"

import { useState, useEffect } from "react"
import { apiClient } from "@/lib/api-client"
import { Loader2, Plus, Calendar, ChevronRight, Users } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import Link from "next/link"
import { format } from "date-fns"
import { id as idLocale } from "date-fns/locale"
import { useAuth } from "@/context/auth-context"

interface ClassItem {
  id: string
  namaKelas: string
}

interface SesiAbsensi {
  id: string
  tanggal: string
  pertemuanKe: number
  _count: {
    Detail: number
  }
}

export default function AttendancePage() {
  const { toast } = useToast()
  const [classes, setClasses] = useState<ClassItem[]>([])
  const [selectedClass, setSelectedClass] = useState("")
  const [sessions, setSessions] = useState<SesiAbsensi[]>([])
  
  const [loadingClasses, setLoadingClasses] = useState(true)
  const [loadingSessions, setLoadingSessions] = useState(false)
  const [creating, setCreating] = useState(false)

  // New Session Form
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [newSessionDate, setNewSessionDate] = useState(new Date().toISOString().split('T')[0])
  const [newSessionPertemuan, setNewSessionPertemuan] = useState(1)

  useEffect(() => {
    fetchClasses()
  }, [])

  useEffect(() => {
    if (selectedClass) {
      fetchSessions(selectedClass)
    } else {
      setSessions([])
    }
  }, [selectedClass])

  const fetchClasses = async () => {
    try {
      const res = await apiClient.get("/kelas/teaching")
      setClasses(res.data.data)
    } catch (error) {
      console.error("Failed to fetch classes", error)
      toast({
        variant: "destructive",
        title: "Gagal memuat kelas",
        description: "Tidak dapat mengambil daftar kelas ajar.",
      })
    } finally {
      setLoadingClasses(false)
    }
  }

  const fetchSessions = async (kelasId: string) => {
    setLoadingSessions(true)
    try {
      const res = await apiClient.get(`/absensi/kelas/${kelasId}`)
      setSessions(res.data.data)
      
      // Auto suggest next meeting number
      if (res.data.data.length > 0) {
        setNewSessionPertemuan(res.data.data[0].pertemuanKe + 1)
      } else {
        setNewSessionPertemuan(1)
      }
    } catch (error) {
      console.error("Failed to fetch sessions", error)
      toast({
        variant: "destructive",
        title: "Gagal memuat sesi",
        description: "Tidak dapat mengambil riwayat absensi.",
      })
    } finally {
      setLoadingSessions(false)
    }
  }

  const handleCreateSession = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!selectedClass) return

    setCreating(true)
    try {
      // Get guruId from somewhere? The API expects guruId in body.
      // Ideally API should take it from token, but current implementation takes from body.
      // We need to get user ID from auth context.
      // Since I can't easily import useAuth inside this function without refactoring, 
      // I will assume the API has been updated to use req.user.id OR I fetch user first.
      // Wait, the controller `createSesi` takes `guruId` from body.
      // I should update the controller to take it from req.user.id to be safe, 
      // OR pass it from frontend.
      // Let's pass it from frontend for now, assuming I add useAuth.
      
      // Actually, I'll add useAuth hook usage here.
      
      // Temporary: I will fail here if I don't have guruId.
      // Let's add useAuth to the component.
    } catch (error) {
      // ...
    }
  }

  return (
    <div className="p-8 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Absensi Kelas</h1>
        <p className="text-gray-600">Kelola kehadiran siswa untuk kelas yang Anda ajar.</p>
      </div>

      {/* Class Selection */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
        <label className="block text-sm font-medium text-gray-700 mb-2">Pilih Kelas</label>
        {loadingClasses ? (
          <div className="h-10 w-64 bg-gray-100 rounded animate-pulse"></div>
        ) : (
          <select
            value={selectedClass}
            onChange={(e) => setSelectedClass(e.target.value)}
            className="w-full md:w-64 px-4 py-2.5 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
          >
            <option value="">-- Pilih Kelas --</option>
            {classes.map((cls) => (
              <option key={cls.id} value={cls.id}>
                {cls.namaKelas}
              </option>
            ))}
          </select>
        )}
      </div>

      {/* Sessions List */}
      {selectedClass && (
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold text-gray-900">Riwayat Pertemuan</h2>
            <button
              onClick={() => setShowCreateModal(true)}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Plus size={18} />
              Buat Sesi Baru
            </button>
          </div>

          {loadingSessions ? (
             <div className="flex justify-center py-12">
               <Loader2 className="animate-spin text-blue-600" size={32} />
             </div>
          ) : sessions.length === 0 ? (
            <div className="bg-white rounded-xl border border-dashed border-gray-300 p-12 text-center">
              <div className="mx-auto w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                <Calendar className="text-gray-400" size={24} />
              </div>
              <h3 className="text-lg font-medium text-gray-900">Belum ada sesi absensi</h3>
              <p className="text-gray-500 mt-1">Buat sesi pertemuan pertama untuk mulai mencatat kehadiran.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {sessions.map((session) => (
                <Link 
                  key={session.id} 
                  href={`/dashboard/teacher/attendance/${session.id}`}
                  className="block group"
                >
                  <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm hover:shadow-md hover:border-blue-300 transition-all">
                    <div className="flex justify-between items-start mb-3">
                      <div className="flex items-center gap-2 text-blue-600 font-medium">
                        <span className="bg-blue-50 px-2 py-1 rounded text-xs">Pertemuan {session.pertemuanKe}</span>
                      </div>
                      <ChevronRight size={18} className="text-gray-400 group-hover:text-blue-500 transition-colors" />
                    </div>
                    
                    <h3 className="text-lg font-bold text-gray-900 mb-1">
                      {format(new Date(session.tanggal), "EEEE, d MMMM yyyy", { locale: idLocale })}
                    </h3>
                    
                    <div className="flex items-center gap-2 text-sm text-gray-500 mt-4">
                      <Users size={14} />
                      <span>{session._count.Detail > 0 ? `${session._count.Detail} Siswa Dicatat` : "Belum diisi"}</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Create Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-md p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Buat Sesi Absensi Baru</h3>
            <CreateSessionForm 
              kelasId={selectedClass} 
              defaultPertemuan={newSessionPertemuan}
              onClose={() => setShowCreateModal(false)}
              onSuccess={() => {
                setShowCreateModal(false)
                fetchSessions(selectedClass)
              }}
            />
          </div>
        </div>
      )}
    </div>
  )
}

function CreateSessionForm({ kelasId, defaultPertemuan, onClose, onSuccess }: { 
  kelasId: string, 
  defaultPertemuan: number,
  onClose: () => void,
  onSuccess: () => void 
}) {
  const { toast } = useToast()
  // We need useAuth here to get guruId
  // Since I can't import it easily in this sub-component without passing it down or importing,
  // I'll assume the parent passes it or I import it.
  // Let's import it at top level.
  const [date, setDate] = useState(new Date().toISOString().split('T')[0])
  const [pertemuan, setPertemuan] = useState(defaultPertemuan)
  const [loading, setLoading] = useState(false)
  
  const { user } = useAuth()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!user?.id) return

    setLoading(true)
    try {
      await apiClient.post("/absensi/sesi", {
        guruId: user.id,
        kelasId,
        tanggal: date,
        pertemuanKe: pertemuan
      })
      
      toast({
        title: "Berhasil",
        description: "Sesi absensi berhasil dibuat.",
      })
      onSuccess()
    } catch (error: any) {
      console.error("Failed to create session", error)
      toast({
        variant: "destructive",
        title: "Gagal",
        description: error.response?.data?.message || "Gagal membuat sesi.",
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Tanggal</label>
        <input 
          type="date" 
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Pertemuan Ke-</label>
        <input 
          type="number" 
          min="1"
          value={pertemuan}
          onChange={(e) => setPertemuan(parseInt(e.target.value))}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
          required
        />
      </div>
      <div className="flex justify-end gap-3 mt-6">
        <button 
          type="button" 
          onClick={onClose}
          className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg"
        >
          Batal
        </button>
        <button 
          type="submit" 
          disabled={loading}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 flex items-center gap-2"
        >
          {loading && <Loader2 className="animate-spin" size={16} />}
          Buat Sesi
        </button>
      </div>
    </form>
  )
}
