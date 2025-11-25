"use client"

import { useState, useCallback } from "react"
import { apiClient } from "@/lib/api-client"
import { useToast } from "@/components/ui/use-toast"

export interface TahunAjaran {
  id: string
  tahun: string
  semester: "Ganjil" | "Genap"
  tanggalMulai: string
  tanggalSelesai: string
  status: "Aktif" | "Nonaktif"
  isActive?: boolean
  createdAt?: string
  updatedAt?: string
}

export function useTahunAjaran() {
  const [data, setData] = useState<TahunAjaran[]>([])
  const [loading, setLoading] = useState(false)
  const { toast } = useToast()

  const fetchTahunAjaran = useCallback(async () => {
    setLoading(true)
    try {
      const response = await apiClient.get("/tahun-ajaran")
      setData(response.data.data || [])
    } catch (error) {
      console.error("Error fetching tahun ajaran:", error)
      toast({
        title: "Gagal memuat data",
        description: "Terjadi kesalahan saat mengambil data tahun ajaran.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }, [toast])

  const createTahunAjaran = async (tahunAjaranData: Partial<TahunAjaran>) => {
    try {
      await apiClient.post("/tahun-ajaran", tahunAjaranData)
      toast({
        title: "Berhasil",
        description: "Data tahun ajaran berhasil ditambahkan.",
      })
      fetchTahunAjaran()
      return true
    } catch (error) {
      console.error("Error creating tahun ajaran:", error)
      toast({
        title: "Gagal",
        description: "Gagal menambahkan data tahun ajaran.",
        variant: "destructive",
      })
      return false
    }
  }

  const updateTahunAjaran = async (id: string, tahunAjaranData: Partial<TahunAjaran>) => {
    try {
      await apiClient.put(`/tahun-ajaran/${id}`, tahunAjaranData)
      toast({
        title: "Berhasil",
        description: "Data tahun ajaran berhasil diperbarui.",
      })
      fetchTahunAjaran()
      return true
    } catch (error) {
      console.error("Error updating tahun ajaran:", error)
      toast({
        title: "Gagal",
        description: "Gagal memperbarui data tahun ajaran.",
        variant: "destructive",
      })
      return false
    }
  }

  const deleteTahunAjaran = async (id: string) => {
    try {
      await apiClient.delete(`/tahun-ajaran/${id}`)
      toast({
        title: "Berhasil",
        description: "Data tahun ajaran berhasil dihapus.",
      })
      fetchTahunAjaran()
      return true
    } catch (error) {
      console.error("Error deleting tahun ajaran:", error)
      toast({
        title: "Gagal",
        description: "Gagal menghapus data tahun ajaran.",
        variant: "destructive",
      })
      return false
    }
  }

  const setActiveTahunAjaran = async (id: string) => {
    try {
      await apiClient.patch(`/tahun-ajaran/${id}/active`)
      toast({
        title: "Berhasil",
        description: "Tahun ajaran aktif berhasil diubah.",
      })
      fetchTahunAjaran()
      return true
    } catch (error) {
      console.error("Error setting active tahun ajaran:", error)
      toast({
        title: "Gagal",
        description: "Gagal mengubah tahun ajaran aktif.",
        variant: "destructive",
      })
      return false
    }
  }

  return {
    data,
    loading,
    fetchTahunAjaran,
    createTahunAjaran,
    updateTahunAjaran,
    deleteTahunAjaran,
    setActiveTahunAjaran,
  }
}
