"use client"

import { useState, useEffect } from "react"
import { usePengumuman, type Pengumuman } from "@/hooks/use-pengumuman"
import { Loader2 } from "lucide-react"

export default function AnnouncementsManagementPage() {
  const {
    data: announcements,
    loading,
    fetchPengumuman,
    createPengumuman,
    updatePengumuman,
    deletePengumuman,
  } = usePengumuman()

  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState({
    judul: "",
    isi: "",
    target: "SEMUA" as "SEMUA" | "SISWA" | "GURU",
  })
  const [editingId, setEditingId] = useState<string | null>(null)

  useEffect(() => {
    fetchPengumuman()
  }, [fetchPengumuman])

  const handleSubmit = async () => {
    if (editingId) {
      const success = await updatePengumuman(editingId, formData)
      if (success) resetForm()
    } else {
      const success = await createPengumuman(formData)
      if (success) resetForm()
    }
  }

  const resetForm = () => {
    setFormData({ judul: "", isi: "", target: "SEMUA" })
    setEditingId(null)
    setShowForm(false)
  }

  const handleEdit = (announcement: Pengumuman) => {
    setFormData({
      judul: announcement.judul,
      isi: announcement.isi,
      target: announcement.target,
    })
    setEditingId(announcement.id)
    setShowForm(true)
  }

  const handleDelete = async (id: string) => {
    await deletePengumuman(id)
  }

  if (loading && announcements.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px]">
        <Loader2 className="animate-spin text-red-600 mb-4" size={40} />
        <p className="text-gray-500 font-medium">Memuat pengumuman...</p>
      </div>
    )
  }

  return (
    <div className="p-8">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Manajemen Pengumuman</h1>
        <p className="text-gray-600">Kelola pengumuman untuk guru dan siswa</p>
      </div>

      <div className="card">
        <div className="p-6 border-b border-gray-200 flex justify-between items-center">
          <h2 className="text-xl font-semibold text-gray-900">Daftar Pengumuman</h2>
          <button
            className="btn-primary"
            onClick={() => {
              setShowForm(!showForm)
              if (showForm) resetForm()
            }}
          >
            {showForm ? "Batal" : "+ Buat Pengumuman"}
          </button>
        </div>

        {showForm && (
          <div className="p-6 bg-red-50 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-red-600 mb-4">
              {editingId ? "Edit Pengumuman" : "Buat Pengumuman Baru"}
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Judul</label>
                <input
                  type="text"
                  className="flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm"
                  value={formData.judul}
                  onChange={(e) => setFormData({ ...formData, judul: e.target.value })}
                  placeholder="Judul pengumuman"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Isi Pengumuman</label>
                <textarea
                  className="flex w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm"
                  rows={4}
                  value={formData.isi}
                  onChange={(e) => setFormData({ ...formData, isi: e.target.value })}
                  placeholder="Isi pengumuman..."
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Target</label>
                <select
                  className="flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm"
                  value={formData.target}
                  onChange={(e) => setFormData({ ...formData, target: e.target.value as any })}
                >
                  <option value="SEMUA">Semua</option>
                  <option value="SISWA">Siswa</option>
                  <option value="GURU">Guru</option>
                </select>
              </div>
              <button
                className="w-full bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 disabled:opacity-50"
                onClick={handleSubmit}
                disabled={loading}
              >
                {loading ? "Menyimpan..." : editingId ? "Update Pengumuman" : "Buat Pengumuman"}
              </button>
            </div>
          </div>
        )}

        <div className="divide-y divide-gray-200">
          {announcements.length === 0 ? (
            <div className="p-6 text-center text-gray-500">Belum ada pengumuman.</div>
          ) : (
            announcements.map((announcement) => (
              <div key={announcement.id} className="p-6 hover:bg-gray-50 transition">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{announcement.judul}</h3>
                    <p className="text-sm text-gray-600 mt-1">
                      {announcement.isi.length > 100
                        ? announcement.isi.substring(0, 100) + "..."
                        : announcement.isi}
                    </p>
                  </div>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    {announcement.target}
                  </span>
                </div>
                <div className="flex justify-between items-center mt-4">
                  <p className="text-xs text-gray-500">
                    {announcement.createdAt ? new Date(announcement.createdAt).toLocaleDateString("id-ID") : "-"}
                  </p>
                  <div className="space-x-2">
                    <button
                      className="text-blue-600 hover:text-blue-900 text-sm"
                      onClick={() => handleEdit(announcement)}
                    >
                      Edit
                    </button>
                    <button
                      className="text-red-600 hover:text-red-900 text-sm"
                      onClick={() => handleDelete(announcement.id)}
                    >
                      Hapus
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}
