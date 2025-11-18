"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

interface SchoolInfo {
  name: string
  address: string
  city: string
  province: string
  phone: string
  email: string
  headmaster: string
  npsn: string
  founded: string
}

const initialInfo: SchoolInfo = {
  name: "SDN Ciater 02",
  address: "Jalan Pendidikan No. 42",
  city: "Kota Tangerang Selatan",
  province: "Banten",
  phone: "(021) 5555-1234",
  email: "info@sdnciater02.sch.id",
  headmaster: "Drs. Budi Santoso, M.Pd",
  npsn: "20202020",
  founded: "2000",
}

export default function SchoolInfoPage() {
  const [info, setInfo] = useState(initialInfo)
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState(initialInfo)

  const handleEdit = () => {
    setIsEditing(true)
    setFormData(info)
  }

  const handleSave = () => {
    setInfo(formData)
    setIsEditing(false)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Data Profil Sekolah</h1>
          <p className="text-gray-600 mt-1">Kelola informasi profil dan identitas sekolah</p>
        </div>
        {!isEditing && (
          <Button onClick={handleEdit} className="bg-red-600 hover:bg-red-700">
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
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
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
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  className="border-gray-300"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Kota</label>
                  <Input
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    className="border-gray-300"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Provinsi</label>
                  <Input
                    value={formData.province}
                    onChange={(e) => setFormData({ ...formData, province: e.target.value })}
                    className="border-gray-300"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Telepon</label>
                  <Input
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
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
                    value={formData.headmaster}
                    onChange={(e) => setFormData({ ...formData, headmaster: e.target.value })}
                    className="border-gray-300"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Tahun Berdiri</label>
                  <Input
                    value={formData.founded}
                    onChange={(e) => setFormData({ ...formData, founded: e.target.value })}
                    className="border-gray-300"
                  />
                </div>
              </div>

              <div className="flex gap-2">
                <Button onClick={handleSave} className="bg-red-600 hover:bg-red-700">
                  Simpan Perubahan
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
                <p className="text-lg font-semibold text-gray-900 mt-1">{info.name}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600 font-medium">NPSN</p>
                <p className="text-lg font-semibold text-gray-900 mt-1">{info.npsn}</p>
              </div>
              <div className="col-span-2">
                <p className="text-sm text-gray-600 font-medium">Alamat</p>
                <p className="text-lg font-semibold text-gray-900 mt-1">{info.address}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600 font-medium">Kota</p>
                <p className="text-lg font-semibold text-gray-900 mt-1">{info.city}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600 font-medium">Provinsi</p>
                <p className="text-lg font-semibold text-gray-900 mt-1">{info.province}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600 font-medium">Telepon</p>
                <p className="text-lg font-semibold text-gray-900 mt-1">{info.phone}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600 font-medium">Email</p>
                <p className="text-lg font-semibold text-gray-900 mt-1">{info.email}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600 font-medium">Kepala Sekolah</p>
                <p className="text-lg font-semibold text-gray-900 mt-1">{info.headmaster}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600 font-medium">Tahun Berdiri</p>
                <p className="text-lg font-semibold text-gray-900 mt-1">{info.founded}</p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
