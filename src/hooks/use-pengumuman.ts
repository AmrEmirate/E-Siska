"use client"

import { useState, useCallback } from "react"
import { apiClient } from "@/lib/api-client"
import { useToast } from "@/components/ui/use-toast"

export interface Pengumuman {
  id: string
  judul: string
  isi: string
  tanggalPublish: string
  author?: string
  createdAt?: string
  updatedAt?: string
}

export function usePengumuman() {
  const [data, setData] = useState<Pengumuman[]>([])
  const [loading, setLoading] = useState(false)
  const { toast } = useToast()

  const fetchPengumuman = useCallback(async () => {
    setLoading(true)
    try {
      const response = await apiClient.get("/pengumuman")
      setData(response.data.data || [])
    } catch (error) {
      console.error("Error fetching pengumuman:", error)
      toast({
        title: "Gagal memuat data",
        description: "Terjadi kesalahan saat mengambil data pengumuman.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }, [toast])

  const createPengumuman = async (pengumumanData: Partial<Pengumuman>) => {
    try {
      await apiClient.post("/pengumuman", pengumumanData)
      toast({
        title: "Berhasil",
        description: "Pengumuman berhasil ditambahkan.",
      })
      fetchPengumuman()
      return true
    } catch (error) {
      console.error("Error creating pengumuman:", error)
      toast({
        title: "Gagal",
        description: "Gagal menambahkan pengumuman.",
        variant: "destructive",
      })
      return false
    }
  }

  const updatePengumuman = async (id: string, pengumumanData: Partial<Pengumuman>) => {
    try {
      await apiClient.put(`/pengumuman/${id}`, pengumumanData)
      toast({
        title: "Berhasil",
        description: "Pengumuman berhasil diperbarui.",
      })
      fetchPengumuman()
      return true
    } catch (error) {
      console.error("Error updating pengumuman:", error)
      toast({
        title: "Gagal",
        description: "Gagal memperbarui pengumuman.",
        variant: "destructive",
      })
      return false
    }
  }

  const deletePengumuman = async (id: string) => {
    try {
      await apiClient.delete(`/pengumuman/${id}`)
      toast({
        title: "Berhasil",
        description: "Pengumuman berhasil dihapus.",
      })
      fetchPengumuman()
      return true
    } catch (error) {
      console.error("Error deleting pengumuman:", error)
      toast({
        title: "Gagal",
        description: "Gagal menghapus pengumuman.",
        variant: "destructive",
      })
      return false
    }
  }

  return {
    data,
    loading,
    fetchPengumuman,
    createPengumuman,
    updatePengumuman,
    deletePengumuman,
  }
}
