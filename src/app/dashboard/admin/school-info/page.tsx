"use client"

import { useState, useEffect } from "react"
import { useSekolah, type Sekolah } from "@/hooks/use-sekolah"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Loader2 } from "lucide-react"

export default function SchoolInfoPage() {
  const { data, loading, fetchSekolah, updateSekolah } = useSekolah()

  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState<Partial<Sekolah>>({
    namaSekolah: "",
    npsn: "",
    alamat: "",
    kota: "",
    provinsi: "",
    telepon: "",
    email: "",
    kepalaSekolah: "",
    tahunBerdiri: "",
  })

  useEffect(() => {
    fetchSekolah()
  }, [fetchSekolah])

  useEffect(() => {
    if (data) {
      setFormData({
        namaSekolah: data.namaSekolah || "",
        npsn: data.npsn || "",
        alamat: data.alamat || "",
        kota: data.kota || "",
        provinsi: data.provinsi || "",
        telepon: data.telepon || "",
        email: data.email || "",
        kepalaSekolah: data.kepalaSekolah || "",
        tahunBerdiri: data.tahunBerdiri || "",
      })
    }
  }, [data])

  const handleSave = async () => {
    if (data?.id) {
      const success = await updateSekolah(data.id, formData)
      if (success) {
        setIsEditing(false)
      }
    }
  }

  if (loading && !data) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px]">
        <Loader2 className="animate-spin text-red-600 mb-4" size={40} />
        <p className="text-gray-500 font-medium">Memuat data sekolah...</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Data Profil Sekolah</h1>
          <p className="text-gray-600 mt-1">Kelola informasi profil dan identitas sekolah</p>
        </div>
        {!isEditing && (
          <Button onClick={() => setIsEditing(true)} className="bg-red-600 hover:bg-red-700">
            Edit Profil
          </Button>
        )}
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-red-600">Informasi Sekolah</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {isEditing ? (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Nama Sekolah</label>
                  <Input
                    value={formData.namaSekolah}
                    onChange={(e) => setFormData({ ...formData, namaSekolah: e.target.value })}
                    className="border-gray-300"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">NPSN</label>
                  <Input
                    value={formData.npsn}
                    onChange={(e) => setFormData({ ...formData, npsn: e.target.value })}
                    className="border-gray-300"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Alamat</label>
                <Input
                  value={formData.alamat}
                  onChange={(e) => setFormData({ ...formData, alamat: e.target.value })}
                  className="border-gray-300"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Kota</label>
                  <Input
                    value={formData.kota}
                    onChange={(e) => setFormData({ ...formData, kota: e.target.value })}
                    className="border-gray-300"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Provinsi</label>
                  <Input
                    value={formData.provinsi}
                    onChange={(e) => setFormData({ ...formData, provinsi: e.target.value })}
                    className="border-gray-300"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Telepon</label>
                  <Input
                    value={formData.telepon}
                    onChange={(e) => setFormData({ ...formData, telepon: e.target.value })}
                    className="border-gray-300"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <Input
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="border-gray-300"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Kepala Sekolah</label>
                  <Input
                    value={formData.kepalaSekolah}
                    onChange={(e) => setFormData({ ...formData, kepalaSekolah: e.target.value })}
                    className="border-gray-300"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Tahun Berdiri</label>
                  <Input
                    value={formData.tahunBerdiri}
                    onChange={(e) => setFormData({ ...formData, tahunBerdiri: e.target.value })}
                    className="border-gray-300"
                  />
                </div>
              </div>

              <div className="flex gap-2">
                <Button onClick={handleSave} className="bg-red-600 hover:bg-red-700" disabled={loading}>
                  {loading ? (
                    <>
                      <Loader2 className="animate-spin mr-2" size={16} />
                      Menyimpan...
                    </>
                  ) : (
                    "Simpan Perubahan"
                  )}
                </Button>
                <Button onClick={() => setIsEditing(false)} variant="outline" className="border-gray-300">
                  Batal
                </Button>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-6">
              <div>
                <p className="text-sm text-gray-600 font-medium">Nama Sekolah</p>
                <p className="text-lg font-semibold text-gray-900 mt-1">{data?.namaSekolah || "-"}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600 font-medium">NPSN</p>
                <p className="text-lg font-semibold text-gray-900 mt-1">{data?.npsn || "-"}</p>
              </div>
              <div className="col-span-2">
                <p className="text-sm text-gray-600 font-medium">Alamat</p>
                <p className="text-lg font-semibold text-gray-900 mt-1">{data?.alamat || "-"}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600 font-medium">Kota</p>
                <p className="text-lg font-semibold text-gray-900 mt-1">{data?.kota || "-"}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600 font-medium">Provinsi</p>
                <p className="text-lg font-semibold text-gray-900 mt-1">{data?.provinsi || "-"}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600 font-medium">Telepon</p>
                <p className="text-lg font-semibold text-gray-900 mt-1">{data?.telepon || "-"}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600 font-medium">Email</p>
                <p className="text-lg font-semibold text-gray-900 mt-1">{data?.email || "-"}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600 font-medium">Kepala Sekolah</p>
                <p className="text-lg font-semibold text-gray-900 mt-1">{data?.kepalaSekolah || "-"}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600 font-medium">Tahun Berdiri</p>
                <p className="text-lg font-semibold text-gray-900 mt-1">{data?.tahunBerdiri || "-"}</p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
