"use client";

import { useState, useEffect } from "react";
import { apiClient } from "@/lib/api-client";

interface DashboardStats {
  totalSiswa: number;
  totalGuru: number;
  totalKelas: number;
  tahunAjaran: string;
  loading: boolean;
  error: string | null;
}

export function useDashboardStats() {
  const [stats, setStats] = useState<DashboardStats>({
    totalSiswa: 0,
    totalGuru: 0,
    totalKelas: 0,
    tahunAjaran: "-",
    loading: true,
    error: null,
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const siswaRes = await apiClient.get("/siswa?limit=1");
        const totalSiswa =
          siswaRes.data.pagination?.total ||
          siswaRes.data.meta?.total ||
          siswaRes.data.total ||
          0;

        const guruRes = await apiClient.get("/guru?limit=1");
        const totalGuru =
          guruRes.data.pagination?.total ||
          guruRes.data.meta?.total ||
          guruRes.data.total ||
          0;

        const taRes = await apiClient.get("/tahun-ajaran");
        const activeTa =
          taRes.data.data?.find((ta: any) => ta.isAktif || ta.isActive) ||
          taRes.data.data?.[0];
        const tahunAjaran = activeTa ? activeTa.nama : "-";

        let totalKelas = 0;
        try {
          const kelasRes = await apiClient.get("/kelas");
          if (Array.isArray(kelasRes.data.data)) {
            totalKelas = kelasRes.data.data.length;
          }
        } catch (e) {
          console.error("Error fetching kelas stats:", e);
        }

        setStats({
          totalSiswa,
          totalGuru,
          totalKelas,
          tahunAjaran,
          loading: false,
          error: null,
        });
      } catch (err) {
        setStats((prev) => ({
          ...prev,
          loading: false,
          error: "Gagal memuat data dashboard",
        }));
      }
    };

    fetchStats();
  }, []);

  return stats;
}
