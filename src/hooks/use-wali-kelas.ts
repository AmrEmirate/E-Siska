"use client"

import { useState, useCallback } from "react"
import { apiClient } from "@/lib/api-client"
import { useToast } from "@/components/ui/use-toast"

export interface WaliKelas {
  id: string
  guruId: string
  kelasId: string
  tahunAjaranId: string
  guru?: {
    id: string
    nama: string
    nip: string
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

export function useWaliKelas() {
  const [data, setData] = useState<WaliKelas[]>([])
  const [loading, setLoading] = useState(false)
  const { toast } = useToast()

  const fetchWaliKelas = useCallback(async (guruId?: string, kelasId?: string) => {
    setLoading(true)
    try {
      const params = new URLSearchParams()
      if (guruId) params.append("guruId", guruId)
      if (kelasId) params.append("kelasId", kelasId)

      const response = await apiClient.get(`/wali-kelas?${params.toString()}`)
      setData(response.data.data || [])
    } catch (error) {
      console.error("Error fetching wali kelas:", error)
      toast({
        title: "Gagal memuat data",
        description: "Terjadi kesalahan saat mengambil data wali kelas.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }, [toast])

  const assignWaliKelas = async (waliKelasData: Partial<WaliKelas>) => {
    try {
      await apiClient.post("/wali-kelas", waliKelasData)
      toast({
        title: "Berhasil",
        description: "Wali kelas berhasil ditugaskan.",
      })
      fetchWaliKelas()
      return true
    } catch (error) {
      console.error("Error assigning wali kelas:", error)
      toast({
        title: "Gagal",
        description: "Gagal menugaskan wali kelas.",
        variant: "destructive",
      })
      return false
    }
  }

  const updateWaliKelas = async (id: string, waliKelasData: Partial<WaliKelas>) => {
    try {
      await apiClient.put(`/wali-kelas/${id}`, waliKelasData)
      toast({
        title: "Berhasil",
        description: "Data wali kelas berhasil diperbarui.",
      })
      fetchWaliKelas()
      return true
    } catch (error) {
      console.error("Error updating wali kelas:", error)
      toast({
        title: "Gagal",
        description: "Gagal memperbarui data wali kelas.",
        variant: "destructive",
      })
      return false
    }
  }

  const deleteWaliKelas = async (id: string) => {
    try {
      await apiClient.delete(`/wali-kelas/${id}`)
      toast({
        title: "Berhasil",
        description: "Penugasan wali kelas berhasil dihapus.",
      })
      fetchWaliKelas()
      return true
    } catch (error) {
      console.error("Error deleting wali kelas:", error)
      toast({
        title: "Gagal",
        description: "Gagal menghapus penugasan wali kelas.",
        variant: "destructive",
      })
      return false
    }
  }

  return {
    data,
    loading,
    fetchWaliKelas,
    assignWaliKelas,
    updateWaliKelas,
    deleteWaliKelas,
  }
}
