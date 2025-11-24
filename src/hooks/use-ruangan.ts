"use client"

import { useState, useCallback } from "react"
import { apiClient } from "@/lib/api-client"
import { useToast } from "@/components/ui/use-toast"

export interface Ruangan {
  id: string
  namaRuangan: string
  kapasitas?: number
  createdAt?: string
  updatedAt?: string
}

export function useRuangan() {
  const [data, setData] = useState<Ruangan[]>([])
  const [loading, setLoading] = useState(false)
  const { toast } = useToast()

  const fetchRuangan = useCallback(async () => {
    setLoading(true)
    try {
      const response = await apiClient.get("/ruangan")
      setData(response.data.data || [])
    } catch (error) {
      console.error("Error fetching ruangan:", error)
      toast({
        title: "Gagal memuat data",
        description: "Terjadi kesalahan saat mengambil data ruangan.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }, [toast])

  const createRuangan = async (ruanganData: Partial<Ruangan>) => {
    try {
      await apiClient.post("/ruangan", ruanganData)
      toast({
        title: "Berhasil",
        description: "Data ruangan berhasil ditambahkan.",
      })
      fetchRuangan()
      return true
    } catch (error) {
      console.error("Error creating ruangan:", error)
      toast({
        title: "Gagal",
        description: "Gagal menambahkan data ruangan.",
        variant: "destructive",
      })
      return false
    }
  }

  const updateRuangan = async (id: string, ruanganData: Partial<Ruangan>) => {
    try {
      await apiClient.put(`/ruangan/${id}`, ruanganData)
      toast({
        title: "Berhasil",
        description: "Data ruangan berhasil diperbarui.",
      })
      fetchRuangan()
      return true
    } catch (error) {
      console.error("Error updating ruangan:", error)
      toast({
        title: "Gagal",
        description: "Gagal memperbarui data ruangan.",
        variant: "destructive",
      })
      return false
    }
  }

  const deleteRuangan = async (id: string) => {
    try {
      await apiClient.delete(`/ruangan/${id}`)
      toast({
        title: "Berhasil",
        description: "Data ruangan berhasil dihapus.",
      })
      fetchRuangan()
      return true
    } catch (error) {
      console.error("Error deleting ruangan:", error)
      toast({
        title: "Gagal",
        description: "Gagal menghapus data ruangan.",
        variant: "destructive",
      })
      return false
    }
  }

  return {
    data,
    loading,
    fetchRuangan,
    createRuangan,
    updateRuangan,
    deleteRuangan,
  }
}
