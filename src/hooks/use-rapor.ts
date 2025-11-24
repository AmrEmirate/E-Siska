"use client"

import { useState, useCallback } from "react"
import { apiClient } from "@/lib/api-client"
import { useToast } from "@/components/ui/use-toast"

export interface Rapor {
  id: string
  siswaId: string
  tahunAjaranId: string
  urlFile?: string
  siswa?: {
    id: string
    nama: string
    nis: string
  }
  tahunAjaran?: {
    id: string
    tahun: string
    semester: string
  }
  createdAt?: string
  updatedAt?: string
}

export function useRapor() {
  const [data, setData] = useState<Rapor[]>([])
  const [loading, setLoading] = useState(false)
  const { toast } = useToast()

  const fetchRapor = useCallback(async (siswaId?: string, tahunAjaranId?: string) => {
    setLoading(true)
    try {
      const params = new URLSearchParams()
      if (siswaId) params.append("siswaId", siswaId)
      if (tahunAjaranId) params.append("tahunAjaranId", tahunAjaranId)

      const response = await apiClient.get(`/rapor?${params.toString()}`)
      setData(response.data.data || [])
    } catch (error) {
      console.error("Error fetching rapor:", error)
      toast({
        title: "Gagal memuat data",
        description: "Terjadi kesalahan saat mengambil data rapor.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }, [toast])

  const generateRapor = async (siswaId: string, tahunAjaranId: string) => {
    setLoading(true)
    try {
      const response = await apiClient.post("/rapor/generate", {
        siswaId,
        tahunAjaranId,
      })
      toast({
        title: "Berhasil",
        description: "Rapor berhasil digenerate.",
      })
      fetchRapor()
      return response.data
    } catch (error) {
      console.error("Error generating rapor:", error)
      toast({
        title: "Gagal",
        description: "Gagal generate rapor.",
        variant: "destructive",
      })
      return null
    } finally {
      setLoading(false)
    }
  }

  const downloadRapor = async (id: string) => {
    try {
      const response = await apiClient.get(`/rapor/${id}/download`, {
        responseType: "blob",
      })

      // Create download link
      const url = window.URL.createObjectURL(new Blob([response.data]))
      const link = document.createElement("a")
      link.href = url
      link.setAttribute("download", `rapor_${id}.pdf`)
      document.body.appendChild(link)
      link.click()
      link.remove()

      toast({
        title: "Berhasil",
        description: "Rapor berhasil didownload.",
      })
      return true
    } catch (error) {
      console.error("Error downloading rapor:", error)
      toast({
        title: "Gagal",
        description: "Gagal mendownload rapor.",
        variant: "destructive",
      })
      return false
    }
  }

  return {
    data,
    loading,
    fetchRapor,
    generateRapor,
    downloadRapor,
  }
}
