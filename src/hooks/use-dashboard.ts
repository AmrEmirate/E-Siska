"use client"

import { useState, useEffect } from "react"
import { apiClient } from "@/lib/api-client"

interface DashboardStats {
  totalSiswa: number
  totalGuru: number
  totalKelas: number
  tahunAjaran: string
  loading: boolean
  error: string | null
}

export function useDashboardStats() {
  const [stats, setStats] = useState<DashboardStats>({
    totalSiswa: 0,
    totalGuru: 0,
    totalKelas: 0,
    tahunAjaran: "-",
    loading: true,
    error: null,
  })

  useEffect(() => {
    const fetchStats = async () => {
      try {
        // Fetch Siswa Count
        const siswaRes = await apiClient.get("/siswa?limit=1")
        const totalSiswa = siswaRes.data.meta?.total || siswaRes.data.total || 0

        // Fetch Guru Count
        const guruRes = await apiClient.get("/guru?limit=1")
        const totalGuru = guruRes.data.meta?.total || guruRes.data.total || 0

        // Fetch Tahun Ajaran (Active)
        const taRes = await apiClient.get("/tahun-ajaran")
        const activeTa = taRes.data.data?.find((ta: any) => ta.aktif) || taRes.data.data?.[0]
        const tahunAjaran = activeTa ? activeTa.nama : "-"

        // Fetch Kelas Count (If endpoint exists, otherwise mock or 0)
        // Currently KelasRouter doesn't have getAll, so we'll keep it 0 or try to fetch if added
        let totalKelas = 0
        try {
            // Attempt to fetch if it exists in future or if I missed it, 
            // but for now we know it's likely missing based on router file.
            // We can try to fetch and catch error to be safe.
            // const kelasRes = await apiClient.get("/kelas")
            // totalKelas = kelasRes.data.meta?.total || 0
        } catch (e) {
            console.log("Kelas endpoint not available")
        }

        setStats({
          totalSiswa,
          totalGuru,
          totalKelas,
          tahunAjaran,
          loading: false,
          error: null,
        })
      } catch (err) {
        console.error("Error fetching dashboard stats:", err)
        setStats((prev) => ({
          ...prev,
          loading: false,
          error: "Gagal memuat data dashboard",
        }))
      }
    }

    fetchStats()
  }, [])

  return stats
}
