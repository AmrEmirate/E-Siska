"use client"

import { useState, useCallback } from "react"
import { apiClient } from "@/lib/api-client"
import { useToast } from "@/components/ui/use-toast"

export interface Skema {
  id: string
  namaSkema: string
  bobot?: number
  createdAt?: string
  updatedAt?: string
}

export function useSkema() {
  const [data, setData] = useState<Skema[]>([])
  const [loading, setLoading] = useState(false)
  const { toast } = useToast()

  const fetchSkema = useCallback(async () => {
    setLoading(true)
    try {
      const response = await apiClient.get("/skema")
      setData(response.data.data || [])
    } catch (error) {
      console.error("Error fetching skema:", error)
      toast({
        title: "Gagal memuat data",
        description: "Terjadi kesalahan saat mengambil data skema penilaian.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }, [toast])

  const createSkema = async (skemaData: Partial<Skema>) => {
    try {
      await apiClient.post("/skema", skemaData)
      toast({
        title: "Berhasil",
        description: "Data skema penilaian berhasil ditambahkan.",
      })
      fetchSkema()
      return true
    } catch (error) {
      console.error("Error creating skema:", error)
      toast({
        title: "Gagal",
        description: "Gagal menambahkan data skema penilaian.",
        variant: "destructive",
      })
      return false
    }
  }

  const updateSkema = async (id: string, skemaData: Partial<Skema>) => {
    try {
      await apiClient.put(`/skema/${id}`, skemaData)
      toast({
        title: "Berhasil",
        description: "Data skema penilaian berhasil diperbarui.",
      })
      fetchSkema()
      return true
    } catch (error) {
      console.error("Error updating skema:", error)
      toast({
        title: "Gagal",
        description: "Gagal memperbarui data skema penilaian.",
        variant: "destructive",
      })
      return false
    }
  }

  const deleteSkema = async (id: string) => {
    try {
      await apiClient.delete(`/skema/${id}`)
      toast({
        title: "Berhasil",
        description: "Data skema penilaian berhasil dihapus.",
      })
      fetchSkema()
      return true
    } catch (error) {
      console.error("Error deleting skema:", error)
      toast({
        title: "Gagal",
        description: "Gagal menghapus data skema penilaian.",
        variant: "destructive",
      })
      return false
    }
  }

  return {
    data,
    loading,
    fetchSkema,
    createSkema,
    updateSkema,
    deleteSkema,
  }
}
