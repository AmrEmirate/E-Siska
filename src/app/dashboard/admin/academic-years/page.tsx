"use client"

import { useState, useEffect } from "react"
import { useTahunAjaran, type TahunAjaran } from "@/hooks/use-tahun-ajaran"
import { useToast } from "@/components/ui/use-toast"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Loader2, Plus, Calendar, CheckCircle2, BookOpen, Pencil, Trash2 } from "lucide-react"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,} from "@/components/ui/alert-dialog"

export default function AcademicYearsPage() {
  const { 
    data: years, 
    loading, 
    fetchTahunAjaran, 
    createTahunAjaran, 
    updateTahunAjaran, 
    deleteTahunAjaran,
    setActiveTahunAjaran 
  } = useTahunAjaran()
  
  const { toast } = useToast()
  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState({ 
    tahun: "", 
    semester: "Ganjil" as "Ganjil" | "Genap", 
    tanggalMulai: "", 
    tanggalSelesai: "" 
  })
  const [editingId, setEditingId] = useState<string | null>(null)

  useEffect(() => {
    fetchTahunAjaran()
  }, [fetchTahunAjaran])

  const handleAdd = async () => {
    // Validate tahun field is not empty
    if (!formData.tahun.trim()) {
      toast({
        title: "Validasi Gagal",
        description: "Tahun ajaran harus diisi",
        variant: "destructive",
      })
      return
    }

    if (editingId) {
      const success = await updateTahunAjaran(editingId, {
        ...formData,
        nama: `${formData.tahun} ${formData.semester}`
      })
      if (success) {
        setEditingId(null)
        setFormData({ tahun: "", semester: "Ganjil", tanggalMulai: "", tanggalSelesai: "" })
        setShowForm(false)
      }
    } else {
      const success = await createTahunAjaran({
        ...formData,
        nama: `${formData.tahun} ${formData.semester}`
      })
      if (success) {
        setFormData({ tahun: "", semester: "Ganjil", tanggalMulai: "", tanggalSelesai: "" })
        setShowForm(false)
      }
    }
  }

  const handleSetActive = async (id: string) => {
    await setActiveTahunAjaran(id)
  }

  const handleEdit = (year: TahunAjaran) => {
    setFormData({
      tahun: year.tahun,
      semester: year.semester,
      tanggalMulai: year.tanggalMulai,
      tanggalSelesai: year.tanggalSelesai,
    })
    setEditingId(year.id)
    setShowForm(true)
  }

  const handleDelete = async (id: string) => {
    await deleteTahunAjaran(id)
  }

  if (loading && years.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px]">
        <Loader2 className="animate-spin text-red-600 mb-4" size={40} />
        <p className="text-gray-500 font-medium">Memuat data tahun ajaran...</p>
      </div>
    )
  }

  return (
    <div className="p-8 space-y-8 bg-gray-50/50 min-h-screen">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Manajemen Tahun Ajaran</h1>
          <p className="text-gray-500 mt-2">Kelola tahun ajaran dan periode pembelajaran.</p>
        </div>
        <Button
          onClick={() => {
            setShowForm(!showForm)
            setEditingId(null)
            setFormData({ tahun: "", semester: "Ganjil", tanggalMulai: "", tanggalSelesai: "" })
          }}
          className="bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-600/20 transition-all hover:scale-105"
        >
          {showForm ? "Batal" : (
            <>
              <Plus className="w-4 h-4 mr-2" />
              Tambah Tahun Ajaran
            </>
          )}
        </Button>
      </div>

      {showForm && (
        <Card className="border-blue-100 shadow-lg animate-in slide-in-from-top-4 duration-200">
          <CardHeader className="bg-blue-50/50 border-b border-blue-100">
            <CardTitle className="text-blue-900">
              {editingId ? "Edit Tahun Ajaran" : "Tambah Tahun Ajaran Baru"}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6 pt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Tahun Ajaran</label>
                <Input
                  placeholder="Contoh: 2024/2025"
                  value={formData.tahun}
                  onChange={(e) => setFormData({ ...formData, tahun: e.target.value })}
                  className="border-gray-200 focus:border-blue-500"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Semester</label>
                <Select
                  value={formData.semester}
                  onValueChange={(value: "Ganjil" | "Genap") => setFormData({ ...formData, semester: value })}
                >
                  <SelectTrigger className="border-gray-200 focus:border-blue-500">
                    <SelectValue placeholder="Pilih Semester" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Ganjil">Ganjil</SelectItem>
                    <SelectItem value="Genap">Genap</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Tanggal Mulai</label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    type="date"
                    value={formData.tanggalMulai}
                    onChange={(e) => setFormData({ ...formData, tanggalMulai: e.target.value })}
                    className="pl-10 border-gray-200 focus:border-blue-500"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Tanggal Selesai</label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    type="date"
                    value={formData.tanggalSelesai}
                    onChange={(e) => setFormData({ ...formData, tanggalSelesai: e.target.value })}
                    className="pl-10 border-gray-200 focus:border-blue-500"
                  />
                </div>
              </div>
            </div>
            <div className="flex justify-end pt-2">
              <Button onClick={handleAdd} className="bg-blue-600 hover:bg-blue-700 min-w-[150px]" disabled={loading}>
                {loading ? (
                  <>
                    <Loader2 className="animate-spin mr-2" size={16} />
                    {editingId ? "Menyimpan..." : "Menambahkan..."}
                  </>
                ) : (
                  editingId ? "Simpan Perubahan" : "Simpan Data"
                )}
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {loading && years.length === 0 ? (
        <div className="grid gap-4">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="bg-white border border-gray-200 rounded-xl p-6 h-32 animate-pulse">
              <div className="flex justify-between">
                <div className="space-y-3 w-1/2">
                  <div className="h-6 w-2/3 bg-gray-200 rounded" />
                  <div className="h-4 w-1/2 bg-gray-200 rounded" />
                </div>
                <div className="h-10 w-32 bg-gray-200 rounded" />
              </div>
            </div>
          ))}
        </div>
      ) : years.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-xl border border-dashed border-gray-300">
          <div className="flex flex-col items-center justify-center gap-2">
            <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mb-2">
              <Calendar className="w-6 h-6 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900">Belum ada tahun ajaran</h3>
            <p className="text-gray-500">Mulai dengan menambahkan tahun ajaran baru.</p>
          </div>
        </div>
      ) : (
        <div className="grid gap-4">
          {years.map((year) => (
            <Card
              key={year.id}
              className={`group transition-all duration-200 ${
                year.isActive 
                  ? "border-blue-200 bg-blue-50/30 shadow-md" 
                  : "hover:border-blue-200 hover:shadow-md bg-white"
              }`}
            >
              <CardContent className="p-6">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center gap-3">
                      <h3 className="text-lg font-bold text-gray-900">
                        Tahun Ajaran {year.tahun}
                      </h3>
                      {year.isActive ? (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 border border-blue-200">
                          <CheckCircle2 className="w-3 h-3 mr-1" />
                          Aktif
                        </span>
                      ) : (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-600 border border-gray-200">
                          Tidak Aktif
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <span className="flex items-center gap-1">
                        <BookOpen className="w-4 h-4" />
                        Semester {year.semester}
                      </span>
                      <span className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {new Date(year.tanggalMulai).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })} - {new Date(year.tanggalSelesai).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 w-full sm:w-auto pt-4 sm:pt-0 border-t sm:border-t-0 border-gray-100 mt-4 sm:mt-0">
                    {!year.isActive && (
                      <Button 
                        onClick={() => handleSetActive(year.id)} 
                        variant="outline"
                        className="flex-1 sm:flex-none border-blue-200 text-blue-600 hover:bg-blue-50 hover:text-blue-700"
                        disabled={loading}
                      >
                        <CheckCircle2 className="w-4 h-4 mr-2" />
                        Aktifkan
                      </Button>
                    )}
                    
                    <div className="flex gap-1 ml-auto sm:ml-0">
                      <Button
                          onClick={() => handleEdit(year)}
                          variant="ghost"
                          size="icon"
                          className="h-9 w-9 hover:bg-blue-50 hover:text-blue-600"
                       >
                          <Pencil className="w-4 h-4" />
                      </Button>
                      
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-9 w-9 hover:bg-red-50 hover:text-red-600">
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Hapus Tahun Ajaran?</AlertDialogTitle>
                            <AlertDialogDescription>
                              Tindakan ini akan menghapus tahun ajaran <strong>{year.tahun} {year.semester}</strong>.
                              Data terkait mungkin akan terpengaruh.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Batal</AlertDialogCancel>
                            <AlertDialogAction onClick={() => handleDelete(year.id)} className="bg-red-600 hover:bg-red-700">
                              Hapus
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
