"use client"

import { useState, useCallback } from "react"
import { apiClient } from "@/lib/api-client"
import { useToast } from "@/components/ui/use-toast"

export interface Capaian {
  id: string
  siswaId: string
  mapelId: string
  capaian: string
  tahunAjaranId: string
  siswa?: {
    id: string
    nama: string
    nis: string
  }
  mapel?: {
    id: string
    namaMapel: string
  }
  createdAt?: string
  updatedAt?: string
}

export function useCapaian() {
  const [data, setData] = useState<Capaian[]>([])
  const [loading, setLoading] = useState(false)
  const { toast } = useToast()

  const fetchCapaian = useCallback(async (siswaId?: string, mapelId?: string) => {
    setLoading(true)
    try {
      const params = new URLSearchParams()
      if (siswaId) params.append("siswaId", siswaId)
      if (mapelId) params.append("mapelId", mapelId)

      const response = await apiClient.get(`/capaian?${params.toString()}`)
      setData(response.data.data || [])
    } catch (error) {
      console.error("Error fetching capaian:", error)
      toast({
        title: "Gagal memuat data",
        description: "Terjadi kesalahan saat mengambil data capaian kompetensi.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }, [toast])

  const createCapaian = async (capaianData: Partial<Capaian>) => {
    try {
      await apiClient.post("/capaian", capaianData)
      toast({
        title: "Berhasil",
        description: "Data capaian kompetensi berhasil ditambahkan.",
      })
      fetchCapaian()
      return true
    } catch (error) {
      console.error("Error creating capaian:", error)
      toast({
        title: "Gagal",
        description: "Gagal menambahkan data capaian kompetensi.",
        variant: "destructive",
      })
      return false
    }
  }

  const updateCapaian = async (id: string, capaianData: Partial<Capaian>) => {
    try {
      await apiClient.put(`/capaian/${id}`, capaianData)
      toast({
        title: "Berhasil",
        description: "Data capaian kompetensi berhasil diperbarui.",
      })
      fetchCapaian()
      return true
    } catch (error) {
      console.error("Error updating capaian:", error)
      toast({
        title: "Gagal",
        description: "Gagal memperbarui data capaian kompetensi.",
        variant: "destructive",
      })
      return false
    }
  }

  const deleteCapaian = async (id: string) => {
    try {
      await apiClient.delete(`/capaian/${id}`)
      toast({
        title: "Berhasil",
        description: "Data capaian kompetensi berhasil dihapus.",
      })
      fetchCapaian()
      return true
    } catch (error) {
      console.error("Error deleting capaian:", error)
      toast({
        title: "Gagal",
        description: "Gagal menghapus data capaian kompetensi.",
        variant: "destructive",
      })
      return false
    }
  }

  return {
    data,
    loading,
    fetchCapaian,
    createCapaian,
    updateCapaian,
    deleteCapaian,
  }
}
