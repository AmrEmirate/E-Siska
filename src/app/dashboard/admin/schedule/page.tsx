"use client"

import { useState, useEffect } from "react"
import { useJadwal, type Jadwal } from "@/hooks/use-jadwal"
import { useKelas } from "@/hooks/use-kelas"
import { useGuru } from "@/hooks/use-guru"
import { useMapel } from "@/hooks/use-mapel"
import { useRuangan } from "@/hooks/use-ruangan"
import { Loader2 } from "lucide-react"

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

  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState({
    kelasId: "",
    guruId: "",
    mapelId: "",
    ruanganId: "",
    hari: "",
    jamMulai: "",
    jamSelesai: "",
    tahunAjaranId: "",
  })
  const [editingId, setEditingId] = useState<string | null>(null)

  const days = ["Senin", "Selasa", "Rabu", "Kamis", "Jumat"]

  useEffect(() => {
    fetchJadwal()
    fetchKelas()
    fetchGuru(1, 100)
    fetchMapel()
    fetchRuangan()
  }, [fetchJadwal, fetchKelas, fetchGuru, fetchMapel, fetchRuangan])

  const handleAdd = async () => {
    if (editingId) {
      const success = await updateJadwal(editingId, formData)
      if (success) {
        resetForm()
      }
    } else {
      const success = await createJadwal(formData)
      if (success) {
        resetForm()
      }
    }
  }

  const resetForm = () => {
    setEditingId(null)
    setFormData({
      kelasId: "",
      guruId: "",
      mapelId: "",
      ruanganId: "",
      hari: "",
      jamMulai: "",
      jamSelesai: "",
      tahunAjaranId: "",
    })
    setShowForm(false)
  }

  const handleEdit = (schedule: Jadwal) => {
    setFormData({
      kelasId: schedule.kelasId,
      guruId: schedule.guruId || "",
      mapelId: schedule.mapelId,
      ruanganId: schedule.ruanganId || "",
      hari: schedule.hari,
      jamMulai: schedule.jamMulai,
      jamSelesai: schedule.jamSelesai,
      tahunAjaranId: schedule.tahunAjaranId || "",
    })
    setEditingId(schedule.id)
    setShowForm(true)
  }

  const handleDelete = async (id: string) => {
    await deleteJadwal(id)
  }

  if (loading && schedules.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px]">
        <Loader2 className="animate-spin text-red-600 mb-4" size={40} />
        <p className="text-gray-500 font-medium">Memuat jadwal...</p>
      </div>
    )
  }

  return (
    <div className="p-8">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Manajemen Jadwal</h1>
        <p className="text-gray-600">Kelola jadwal pengajaran guru dan kelas</p>
      </div>

      <div className="card">
        <div className="p-6 border-b border-gray-200 flex justify-between items-center">
          <h2 className="text-xl font-semibold text-gray-900">Jadwal Pengajaran</h2>
          <button
            className="btn-primary"
            onClick={() => {
              setShowForm(!showForm)
              if (showForm) resetForm()
            }}
          >
            {showForm ? "Batal" : "+ Tambah Jadwal"}
          </button>
        </div>

        {showForm && (
          <div className="p-6 bg-red-50 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-red-600 mb-4">
              {editingId ? "Edit Jadwal" : "Tambah Jadwal Baru"}
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Kelas</label>
                <select
                  className="flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm"
                  value={formData.kelasId}
                  onChange={(e) => setFormData({ ...formData, kelasId: e.target.value })}
                >
                  <option value="">Pilih Kelas</option>
                  {classes.map((kelas) => (
                    <option key={kelas.id} value={kelas.id}>
                      {kelas.namaKelas}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Mata Pelajaran</label>
                <select
                  className="flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm"
                  value={formData.mapelId}
                  onChange={(e) => setFormData({ ...formData, mapelId: e.target.value })}
                >
                  <option value="">Pilih Mata Pelajaran</option>
                  {subjects.map((subject) => (
                    <option key={subject.id} value={subject.id}>
                      {subject.namaMapel}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Guru</label>
                <select
                  className="flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm"
                  value={formData.guruId}
                  onChange={(e) => setFormData({ ...formData, guruId: e.target.value })}
                >
                  <option value="">Pilih Guru</option>
                  {teachers.map((teacher) => (
                    <option key={teacher.id} value={teacher.id}>
                      {teacher.nama}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Hari</label>
                <select
                  className="flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm"
                  value={formData.hari}
                  onChange={(e) => setFormData({ ...formData, hari: e.target.value })}
                >
                  <option value="">Pilih Hari</option>
                  {days.map((day) => (
                    <option key={day} value={day}>
                      {day}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Jam Mulai</label>
                <input
                  type="time"
                  className="flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm"
                  value={formData.jamMulai}
                  onChange={(e) => setFormData({ ...formData, jamMulai: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Jam Selesai</label>
                <input
                  type="time"
                  className="flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm"
                  value={formData.jamSelesai}
                  onChange={(e) => setFormData({ ...formData, jamSelesai: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Ruangan</label>
                <select
                  className="flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm"
                  value={formData.ruanganId}
                  onChange={(e) => setFormData({ ...formData, ruanganId: e.target.value })}
                >
                  <option value="">Pilih Ruangan</option>
                  {rooms.map((room) => (
                    <option key={room.id} value={room.id}>
                      {room.namaRuangan}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <button
              className="mt-4 w-full bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 disabled:opacity-50"
              onClick={handleAdd}
              disabled={loading}
            >
              {loading ? "Menyimpan..." : editingId ? "Update Jadwal" : "Tambah Jadwal"}
            </button>
          </div>
        )}

        <div className="overflow-x-auto">
          {loading && schedules.length === 0 ? (
            <p className="p-6 text-center text-gray-500">Memuat data...</p>
          ) : (
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">Kelas</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">Mata Pelajaran</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">Guru</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">Hari</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">Jam</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">Ruangan</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {schedules.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="px-6 py-4 text-center text-gray-500">
                      Belum ada jadwal.
                    </td>
                  </tr>
                ) : (
                  schedules.map((item) => (
                    <tr key={item.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 text-sm font-medium text-gray-900">{item.kelas?.namaKelas}</td>
                      <td className="px-6 py-4 text-sm text-gray-700">{item.mapel?.namaMapel}</td>
                      <td className="px-6 py-4 text-sm text-gray-700">{item.guru?.nama || "-"}</td>
                      <td className="px-6 py-4 text-sm">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800">
                          {item.hari}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-700">
                        {item.jamMulai} - {item.jamSelesai}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-700">{item.ruangan?.namaRuangan || "-"}</td>
                      <td className="px-6 py-4 text-sm space-x-2">
                        <button className="text-blue-600 hover:text-blue-900" onClick={() => handleEdit(item)}>
                          Edit
                        </button>
                        <button className="text-red-600 hover:text-red-900" onClick={() => handleDelete(item.id)}>
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
