"use client"

import { useState, useCallback } from "react"
import { apiClient } from "@/lib/api-client"
import { useToast } from "@/components/ui/use-toast"

export interface Nilai {
  id: string
  siswaId: string
  mapelId: string
  skemaId: string
  tahunAjaranId: string
  nilai: number
  keterangan?: string
  siswa?: {
    id: string
    nama: string
    nis: string
  }
  mapel?: {
    id: string
    namaMapel: string
  }
  skema?: {
    id: string
    namaSkema: string
  }
  createdAt?: string
  updatedAt?: string
}

export function useNilai() {
  const [data, setData] = useState<Nilai[]>([])
  const [loading, setLoading] = useState(false)
  const { toast } = useToast()

  const fetchNilai = useCallback(
    async (siswaId?: string, mapelId?: string, tahunAjaranId?: string) => {
      setLoading(true)
      try {
        const params = new URLSearchParams()
        if (siswaId) params.append("siswaId", siswaId)
        if (mapelId) params.append("mapelId", mapelId)
        if (tahunAjaranId) params.append("tahunAjaranId", tahunAjaranId)

        const response = await apiClient.get(`/nilai?${params.toString()}`)
        setData(response.data.data || [])
      } catch (error) {
        console.error("Error fetching nilai:", error)
        toast({
          title: "Gagal memuat data",
          description: "Terjadi kesalahan saat mengambil data nilai.",
          variant: "destructive",
        })
      } finally {
        setLoading(false)
      }
    },
    [toast]
  )

  const createNilai = async (nilaiData: Partial<Nilai>) => {
    try {
      await apiClient.post("/nilai", nilaiData)
      toast({
        title: "Berhasil",
        description: "Data nilai berhasil ditambahkan.",
      })
      fetchNilai()
      return true
    } catch (error) {
      console.error("Error creating nilai:", error)
      toast({
        title: "Gagal",
        description: "Gagal menambahkan data nilai.",
        variant: "destructive",
      })
      return false
    }
  }

  const updateNilai = async (id: string, nilaiData: Partial<Nilai>) => {
    try {
      await apiClient.put(`/nilai/${id}`, nilaiData)
      toast({
        title: "Berhasil",
        description: "Data nilai berhasil diperbarui.",
      })
      fetchNilai()
      return true
    } catch (error) {
      console.error("Error updating nilai:", error)
      toast({
        title: "Gagal",
        description: "Gagal memperbarui data nilai.",
        variant: "destructive",
      })
      return false
    }
  }

  const deleteNilai = async (id: string) => {
    try {
      await apiClient.delete(`/nilai/${id}`)
      toast({
        title: "Berhasil",
        description: "Data nilai berhasil dihapus.",
      })
      fetchNilai()
      return true
    } catch (error) {
      console.error("Error deleting nilai:", error)
      toast({
        title: "Gagal",
        description: "Gagal menghapus data nilai.",
        variant: "destructive",
      })
      return false
    }
  }

  return {
    data,
    loading,
    fetchNilai,
    createNilai,
    updateNilai,
    deleteNilai,
  }
}
