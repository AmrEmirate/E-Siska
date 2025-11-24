"use client"

import { useState, useCallback } from "react"
import { apiClient } from "@/lib/api-client"
import { useToast } from "@/components/ui/use-toast"

export interface Penempatan {
  id: string
  siswaId: string
  kelasId: string
  tahunAjaranId: string
  siswa?: {
    id: string
    nama: string
    nis: string
  }
  kelas?: {
    id: string
    namaKelas: string
  }
  tahunAjaran?: {
    id: string
    tahun: string
    semester: string
  }
  createdAt?: string
  updatedAt?: string
}

export function usePenempatan() {
  const [data, setData] = useState<Penempatan[]>([])
  const [loading, setLoading] = useState(false)
  const { toast } = useToast()

  const fetchPenempatan = useCallback(async (kelasId?: string, tahunAjaranId?: string) => {
    setLoading(true)
    try {
      const params = new URLSearchParams()
      if (kelasId) params.append("kelasId", kelasId)
      if (tahunAjaranId) params.append("tahunAjaranId", tahunAjaranId)

      const response = await apiClient.get(`/penempatan?${params.toString()}`)
      setData(response.data.data || [])
    } catch (error) {
      console.error("Error fetching penempatan:", error)
      toast({
        title: "Gagal memuat data",
        description: "Terjadi kesalahan saat mengambil data penempatan siswa.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }, [toast])

  const createPenempatan = async (penempatanData: Partial<Penempatan>) => {
    try {
      await apiClient.post("/penempatan", penempatanData)
      toast({
        title: "Berhasil",
        description: "Data penempatan siswa berhasil ditambahkan.",
      })
      fetchPenempatan()
      return true
    } catch (error) {
      console.error("Error creating penempatan:", error)
      toast({
        title: "Gagal",
        description: "Gagal menambahkan data penempatan siswa.",
        variant: "destructive",
      })
      return false
    }
  }

  const updatePenempatan = async (id: string, penempatanData: Partial<Penempatan>) => {
    try {
      await apiClient.put(`/penempatan/${id}`, penempatanData)
      toast({
        title: "Berhasil",
        description: "Data penempatan siswa berhasil diperbarui.",
      })
      fetchPenempatan()
      return true
    } catch (error) {
      console.error("Error updating penempatan:", error)
      toast({
        title: "Gagal",
        description: "Gagal memperbarui data penempatan siswa.",
        variant: "destructive",
      })
      return false
    }
  }

  const deletePenempatan = async (id: string) => {
    try {
      await apiClient.delete(`/penempatan/${id}`)
      toast({
        title: "Berhasil",
        description: "Data penempatan siswa berhasil dihapus.",
      })
      fetchPenempatan()
      return true
    } catch (error) {
      console.error("Error deleting penempatan:", error)
      toast({
        title: "Gagal",
        description: "Gagal menghapus data penempatan siswa.",
        variant: "destructive",
      })
      return false
    }
  }

  return {
    data,
    loading,
    fetchPenempatan,
    createPenempatan,
    updatePenempatan,
    deletePenempatan,
  }
}
