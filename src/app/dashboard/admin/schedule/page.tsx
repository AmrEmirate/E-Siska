"use client"

import { useState, useEffect } from "react"
import { useJadwal, type Jadwal } from "@/hooks/use-jadwal"
import { useKelas } from "@/hooks/use-kelas"
import { useGuru } from "@/hooks/use-guru"
import { useMapel } from "@/hooks/use-mapel"
import { useRuangan } from "@/hooks/use-ruangan"
import { useTahunAjaran } from "@/hooks/use-tahun-ajaran"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Label } from "@/components/ui/label"
import { Loader2, Plus, Pencil, Trash2, Calendar, Clock, MapPin, User, BookOpen } from "lucide-react"

export default function ScheduleManagementPage() {
  const {
    data: schedules,
    loading,
    fetchJadwal,
    createJadwal,
    updateJadwal,
    deleteJadwal,
  } = useJadwal()

  const { data: classes, fetchKelas } = useKelas()
  const { data: teachers, fetchGuru } = useGuru()
  const { data: subjects, fetchMapel } = useMapel()
  const { data: rooms, fetchRuangan } = useRuangan()
  const { data: academicYears, fetchTahunAjaran } = useTahunAjaran()

  const [isAddOpen, setIsAddOpen] = useState(false)
  const [isEditOpen, setIsEditOpen] = useState(false)
  const [formData, setFormData] = useState({
    kelasId: "",
    guruId: "",
    mapelId: "",
    ruanganId: "",
    hari: "",
    waktuMulai: "",
    waktuSelesai: "",
    tahunAjaranId: "",
  })
  const [selectedSchedule, setSelectedSchedule] = useState<Jadwal | null>(null)

  const days = ["Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"]

  useEffect(() => {
    fetchJadwal()
    fetchKelas()
    fetchGuru(1, 100)
    fetchMapel()
    fetchRuangan()
    fetchTahunAjaran()
  }, [fetchJadwal, fetchKelas, fetchGuru, fetchMapel, fetchRuangan, fetchTahunAjaran])

  const resetForm = () => {
    setFormData({
      kelasId: "",
      guruId: "",
      mapelId: "",
      ruanganId: "",
      hari: "",
      waktuMulai: "",
      waktuSelesai: "",
      tahunAjaranId: "",
    })
    setSelectedSchedule(null)
  }

  const handleAdd = async () => {
    // Validate tahunAjaranId is not empty
    if (!formData.tahunAjaranId) {
      alert("Tahun ajaran harus dipilih")
      return
    }

    const success = await createJadwal({
      ...formData,
      hari: formData.hari as "Senin" | "Selasa" | "Rabu" | "Kamis" | "Jumat" | "Sabtu",
    })
    if (success) {
      setIsAddOpen(false)
      resetForm()
    }
  }

  const handleEdit = async () => {
    if (!selectedSchedule) return
    const success = await updateJadwal(selectedSchedule.id, {
      ...formData,
      hari: formData.hari as "Senin" | "Selasa" | "Rabu" | "Kamis" | "Jumat" | "Sabtu",
    })
    if (success) {
      setIsEditOpen(false)
      resetForm()
    }
  }

  const openEdit = (schedule: Jadwal) => {
    setSelectedSchedule(schedule)
    setFormData({
      kelasId: schedule.kelasId,
      guruId: schedule.guruId,
      mapelId: schedule.mapelId,
      ruanganId: schedule.ruanganId || "",
      hari: schedule.hari,
      waktuMulai: schedule.waktuMulai,
      waktuSelesai: schedule.waktuSelesai,
      tahunAjaranId: schedule.tahunAjaranId || "", 
    })
    setIsEditOpen(true)
  }

  const activeYear = academicYears.find(y => y.isActive)

  // Auto-set active academic year when opening add modal
  useEffect(() => {
    if (isAddOpen && activeYear) {
      setFormData(prev => ({ ...prev, tahunAjaranId: activeYear.id }))
    }
  }, [isAddOpen, activeYear])

  return (
    <div className="p-8 space-y-8 bg-gray-50/50 min-h-screen">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Manajemen Jadwal</h1>
          <p className="text-gray-500 mt-2">Kelola jadwal pelajaran untuk setiap kelas.</p>
        </div>
        <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
          <DialogTrigger asChild>
            <Button className="bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-600/20 transition-all hover:scale-105" onClick={resetForm}>
              <Plus className="w-4 h-4 mr-2" />
              Tambah Jadwal
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Tambah Jadwal Baru</DialogTitle>
              <DialogDescription>
                Buat jadwal pelajaran baru untuk kelas tertentu.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-6 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="kelas">Kelas</Label>
                  <select
                    id="kelas"
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    value={formData.kelasId}
                    onChange={(e) => setFormData({ ...formData, kelasId: e.target.value })}
                  >
                    <option value="">Pilih Kelas</option>
                    {classes.map((c) => (
                      <option key={c.id} value={c.id}>{c.namaKelas}</option>
                    ))}
                  </select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="hari">Hari</Label>
                  <select
                    id="hari"
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    value={formData.hari}
                    onChange={(e) => setFormData({ ...formData, hari: e.target.value })}
                  >
                    <option value="">Pilih Hari</option>
                    {days.map((day) => (
                      <option key={day} value={day}>{day}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="tahunAjaran">Tahun Ajaran</Label>
                <select
                  id="tahunAjaran"
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  value={formData.tahunAjaranId}
                  onChange={(e) => setFormData({ ...formData, tahunAjaranId: e.target.value })}
                >
                  <option value="">Pilih Tahun Ajaran</option>
                  {academicYears.map((y) => (
                    <option key={y.id} value={y.id}>
                      {y.tahun} - {y.semester} {y.isActive ? "(Aktif)" : ""}
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="jamMulai">Jam Mulai</Label>
                  <Input
                    id="jamMulai"
                    type="time"
                    value={formData.waktuMulai}
                    onChange={(e) => setFormData({ ...formData, waktuMulai: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="jamSelesai">Jam Selesai</Label>
                  <Input
                    id="jamSelesai"
                    type="time"
                    value={formData.waktuSelesai}
                    onChange={(e) => setFormData({ ...formData, waktuSelesai: e.target.value })}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="mapel">Mata Pelajaran</Label>
                <select
                  id="mapel"
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  value={formData.mapelId}
                  onChange={(e) => setFormData({ ...formData, mapelId: e.target.value })}
                >
                  <option value="">Pilih Mata Pelajaran</option>
                  {subjects.map((m) => (
                    <option key={m.id} value={m.id}>{m.namaMapel}</option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="guru">Guru Pengajar</Label>
                  <select
                    id="guru"
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    value={formData.guruId}
                    onChange={(e) => setFormData({ ...formData, guruId: e.target.value })}
                  >
                    <option value="">Pilih Guru</option>
                    {teachers.map((t) => (
                      <option key={t.id} value={t.id}>{t.nama}</option>
                    ))}
                  </select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="ruangan">Ruangan</Label>
                  <select
                    id="ruangan"
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    value={formData.ruanganId}
                    onChange={(e) => setFormData({ ...formData, ruanganId: e.target.value })}
                  >
                    <option value="">Pilih Ruangan</option>
                    {rooms.map((r) => (
                      <option key={r.id} value={r.id}>{r.namaRuangan}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button type="submit" onClick={handleAdd} className="w-full sm:w-auto">Simpan Jadwal</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-6 border-b border-gray-200 flex flex-col sm:flex-row justify-between items-center gap-4 bg-gray-50/30">
          <div className="flex items-center gap-2">
            <Calendar className="w-5 h-5 text-blue-600" />
            <h2 className="text-lg font-semibold text-gray-900">Daftar Jadwal Pelajaran</h2>
          </div>
          <div className="text-sm text-gray-500">
            Total: <span className="font-semibold text-gray-900">{schedules.length} Jadwal</span>
          </div>
        </div>

        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="bg-gray-50/50 hover:bg-gray-50/50">
                <TableHead>Hari & Jam</TableHead>
                <TableHead>Kelas</TableHead>
                <TableHead>Mata Pelajaran</TableHead>
                <TableHead>Guru</TableHead>
                <TableHead>Ruangan</TableHead>
                <TableHead className="text-right">Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                [...Array(5)].map((_, i) => (
                  <TableRow key={i}>
                    <TableCell><div className="h-4 w-32 bg-gray-200 rounded animate-pulse" /></TableCell>
                    <TableCell><div className="h-4 w-20 bg-gray-200 rounded animate-pulse" /></TableCell>
                    <TableCell><div className="h-4 w-40 bg-gray-200 rounded animate-pulse" /></TableCell>
                    <TableCell><div className="h-4 w-32 bg-gray-200 rounded animate-pulse" /></TableCell>
                    <TableCell><div className="h-4 w-24 bg-gray-200 rounded animate-pulse" /></TableCell>
                    <TableCell><div className="h-8 w-8 bg-gray-200 rounded animate-pulse ml-auto" /></TableCell>
                  </TableRow>
                ))
              ) : schedules.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-12 text-gray-500">
                    <div className="flex flex-col items-center justify-center gap-2">
                      <Calendar className="w-8 h-8 text-gray-300" />
                      <p>Belum ada jadwal pelajaran</p>
                    </div>
                  </TableCell>
                </TableRow>
              ) : (
                schedules.map((schedule) => (
                  <TableRow key={schedule.id} className="hover:bg-gray-50 transition-colors">
                    <TableCell>
                      <div className="flex flex-col gap-1">
                        <span className="font-medium text-gray-900">{schedule.hari}</span>
                        <div className="flex items-center text-xs text-gray-500">
                          <Clock className="w-3 h-3 mr-1" />
                          {schedule.waktuMulai} - {schedule.waktuSelesai}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        {schedule.kelas?.namaKelas}
                      </span>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <BookOpen className="w-4 h-4 text-gray-400" />
                        <span className="font-medium text-gray-700">{schedule.mapel?.namaMapel}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <User className="w-4 h-4 text-gray-400" />
                        <span className="text-sm text-gray-600">{schedule.guru?.nama || "-"}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-gray-400" />
                        <span className="text-sm text-gray-600">{schedule.ruangan?.namaRuangan || "-"}</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-blue-50 hover:text-blue-600" onClick={() => openEdit(schedule)}>
                          <Pencil className="w-4 h-4" />
                        </Button>
                        
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-red-50 hover:text-red-600">
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Hapus Jadwal?</AlertDialogTitle>
                              <AlertDialogDescription>
                                Tindakan ini akan menghapus jadwal pelajaran ini secara permanen.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Batal</AlertDialogCancel>
                              <AlertDialogAction onClick={() => deleteJadwal(schedule.id)} className="bg-red-600 hover:bg-red-700">
                                Hapus
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* Edit Modal */}
      <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Edit Jadwal</DialogTitle>
            <DialogDescription>
              Perbarui informasi jadwal pelajaran.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-6 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="edit-kelas">Kelas</Label>
                  <select
                    id="edit-kelas"
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    value={formData.kelasId}
                    onChange={(e) => setFormData({ ...formData, kelasId: e.target.value })}
                  >
                    <option value="">Pilih Kelas</option>
                    {classes.map((c) => (
                      <option key={c.id} value={c.id}>{c.namaKelas}</option>
                    ))}
                  </select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-hari">Hari</Label>
                  <select
                    id="edit-hari"
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    value={formData.hari}
                    onChange={(e) => setFormData({ ...formData, hari: e.target.value })}
                  >
                    <option value="">Pilih Hari</option>
                    {days.map((day) => (
                      <option key={day} value={day}>{day}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="edit-waktuMulai">Jam Mulai</Label>
                  <Input
                    id="edit-waktuMulai"
                    type="time"
                    value={formData.waktuMulai}
                    onChange={(e) => setFormData({ ...formData, waktuMulai: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-waktuSelesai">Jam Selesai</Label>
                  <Input
                    id="edit-waktuSelesai"
                    type="time"
                    value={formData.waktuSelesai}
                    onChange={(e) => setFormData({ ...formData, waktuSelesai: e.target.value })}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="edit-mapel">Mata Pelajaran</Label>
                <select
                  id="edit-mapel"
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  value={formData.mapelId}
                  onChange={(e) => setFormData({ ...formData, mapelId: e.target.value })}
                >
                  <option value="">Pilih Mata Pelajaran</option>
                  {subjects.map((m) => (
                    <option key={m.id} value={m.id}>{m.namaMapel}</option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="edit-guru">Guru Pengajar</Label>
                  <select
                    id="edit-guru"
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    value={formData.guruId}
                    onChange={(e) => setFormData({ ...formData, guruId: e.target.value })}
                  >
                    <option value="">Pilih Guru</option>
                    {teachers.map((t) => (
                      <option key={t.id} value={t.id}>{t.nama}</option>
                    ))}
                  </select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-ruangan">Ruangan</Label>
                  <select
                    id="edit-ruangan"
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    value={formData.ruanganId}
                    onChange={(e) => setFormData({ ...formData, ruanganId: e.target.value })}
                  >
                    <option value="">Pilih Ruangan</option>
                    {rooms.map((r) => (
                      <option key={r.id} value={r.id}>{r.namaRuangan}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          <DialogFooter>
            <Button type="submit" onClick={handleEdit} className="w-full sm:w-auto">Simpan Perubahan</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
