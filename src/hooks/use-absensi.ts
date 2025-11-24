"use client"

import { useState, useCallback } from "react"
import { apiClient } from "@/lib/api-client"
import { useToast } from "@/components/ui/use-toast"

export interface Absensi {
  id: string
  siswaId: string
  kelasId: string
  tanggal: string
  status: "Hadir" | "Sakit" | "Izin" | "Alpha"
  keterangan?: string
  siswa?: {
    id: string
    nama: string
    nis: string
  }
  kelas?: {
    id: string
    namaKelas: string
  }
  createdAt?: string
  updatedAt?: string
}

export function useAbsensi() {
  const [data, setData] = useState<Absensi[]>([])
  const [loading, setLoading] = useState(false)
  const { toast } = useToast()

  const fetchAbsensi = useCallback(
    async (kelasId?: string, tanggal?: string, siswaId?: string) => {
      setLoading(true)
      try {
        const params = new URLSearchParams()
        if (kelasId) params.append("kelasId", kelasId)
        if (tanggal) params.append("tanggal", tanggal)
        if (siswaId) params.append("siswaId", siswaId)

        const response = await apiClient.get(`/absensi?${params.toString()}`)
        setData(response.data.data || [])
      } catch (error) {
        console.error("Error fetching absensi:", error)
        toast({
          title: "Gagal memuat data",
          description: "Terjadi kesalahan saat mengambil data absensi.",
          variant: "destructive",
        })
      } finally {
        setLoading(false)
      }
    },
    [toast]
  )

  const createAbsensi = async (absensiData: Partial<Absensi>) => {
    try {
      await apiClient.post("/absensi", absensiData)
      toast({
        title: "Berhasil",
        description: "Data absensi berhasil ditambahkan.",
      })
      fetchAbsensi()
      return true
    } catch (error) {
      console.error("Error creating absensi:", error)
      toast({
        title: "Gagal",
        description: "Gagal menambahkan data absensi.",
        variant: "destructive",
      })
      return false
    }
  }

  const updateAbsensi = async (id: string, absensiData: Partial<Absensi>) => {
    try {
      await apiClient.put(`/absensi/${id}`, absensiData)
      toast({
        title: "Berhasil",
        description: "Data absensi berhasil diperbarui.",
      })
      fetchAbsensi()
      return true
    } catch (error) {
      console.error("Error updating absensi:", error)
      toast({
        title: "Gagal",
        description: "Gagal memperbarui data absensi.",
        variant: "destructive",
      })
      return false
    }
  }

  return {
    data,
    loading,
    fetchAbsensi,
    createAbsensi,
    updateAbsensi,
  }
}
