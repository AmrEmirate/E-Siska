"use client"

import { useState, useCallback } from "react"
import { apiClient } from "@/lib/api-client"
import { useToast } from "@/components/ui/use-toast"

export interface Jadwal {
  id: string
  kelasId: string
  mapelId: string
  guruId: string
  ruanganId?: string
  hari: "Senin" | "Selasa" | "Rabu" | "Kamis" | "Jumat" | "Sabtu"
  waktuMulai: string
  waktuSelesai: string
  tahunAjaranId?: string
  kelas?: {
    id: string
    namaKelas: string
  }
  mapel?: {
    id: string
    namaMapel: string
  }
  guru?: {
    id: string
    nama: string
  }
  ruangan?: {
    id: string
    namaRuangan: string
  }
  createdAt?: string
  updatedAt?: string
}

export function useJadwal() {
  const [data, setData] = useState<Jadwal[]>([])
  const [loading, setLoading] = useState(false)
  const { toast } = useToast()

  const fetchJadwal = useCallback(async (kelasId?: string, guruId?: string) => {
    setLoading(true)
    try {
      const params = new URLSearchParams()
      if (kelasId) params.append("kelasId", kelasId)
      if (guruId) params.append("guruId", guruId)

      const response = await apiClient.get(`/jadwal?${params.toString()}`)
      setData(response.data.data || [])
    } catch (error) {
      console.error("Error fetching jadwal:", error)
      toast({
        title: "Gagal memuat data",
        description: "Terjadi kesalahan saat mengambil data jadwal.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }, [toast])

  const createJadwal = async (jadwalData: Partial<Jadwal>) => {
    try {
      await apiClient.post("/jadwal", jadwalData)
      toast({
        title: "Berhasil",
        description: "Data jadwal berhasil ditambahkan.",
      })
      fetchJadwal()
      return true
    } catch (error: any) {
      console.error("Error creating jadwal:", error)
      
      // Extract error message from backend response
      const errorMessage = error?.response?.data?.message || "Gagal menambahkan data jadwal."
      
      toast({
        title: "Gagal",
        description: errorMessage,
        variant: "destructive",
      })
      return false
    }
  }

  const updateJadwal = async (id: string, jadwalData: Partial<Jadwal>) => {
    try {
      await apiClient.put(`/jadwal/${id}`, jadwalData)
      toast({
        title: "Berhasil",
        description: "Data jadwal berhasil diperbarui.",
      })
      fetchJadwal()
      return true
    } catch (error) {
      console.error("Error updating jadwal:", error)
      toast({
        title: "Gagal",
        description: "Gagal memperbarui data jadwal.",
        variant: "destructive",
      })
      return false
    }
  }

  const deleteJadwal = async (id: string) => {
    try {
      await apiClient.delete(`/jadwal/${id}`)
      toast({
        title: "Berhasil",
        description: "Data jadwal berhasil dihapus.",
      })
      fetchJadwal()
      return true
    } catch (error) {
      console.error("Error deleting jadwal:", error)
      toast({
        title: "Gagal",
        description: "Gagal menghapus data jadwal.",
        variant: "destructive",
      })
      return false
    }
  }

  const fetchJadwalByStudent = useCallback(async (siswaId: string) => {
    // Fetch student's class first, then get jadwal for that class
    setLoading(true)
    try {
      const penempatanRes = await apiClient.get(`/penempatan?siswaId=${siswaId}`)
      const kelasId = penempatanRes.data.data[0]?.kelasId
      if (kelasId) {
        await fetchJadwal(kelasId)
      }
    } catch (error) {
      console.error("Error fetching student jadwal:", error)
      setData([])
    } finally {
      setLoading(false)
    }
  }, [fetchJadwal])

  return {
    data,
    loading,
    fetchJadwal,
    fetchJadwalByStudent,
    createJadwal,
    updateJadwal,
    deleteJadwal,
  }
}
