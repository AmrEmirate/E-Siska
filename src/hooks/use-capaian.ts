"use client";

import { useState } from "react";
import { apiClient } from "@/lib/api-client";
import { useToast } from "@/hooks/use-toast";

export interface CapaianItem {
  id: string;
  siswaId: string;
  mapelId: string;
  deskripsi: string;
}

export function useCapaian() {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const saveCapaian = async (
    guruId: string,
    mapelId: string,
    data: { siswaId: string; deskripsi: string }[]
  ) => {
    setLoading(true);
    try {
      await apiClient.post("/capaian", {
        guruId,
        mapelId,
        data,
      });

      toast({
        title: "Berhasil",
        description: "Capaian kompetensi berhasil disimpan.",
      });
      return true;
    } catch (error) {
      toast({
        title: "Gagal",
        description: "Gagal menyimpan capaian kompetensi.",
        variant: "destructive",
      });
      return false;
    } finally {
      setLoading(false);
    }
  };

  const fetchCapaianBySiswaId = async (siswaId: string) => {
    setLoading(true);
    try {
      const response = await apiClient.get(`/capaian/siswa/${siswaId}`);
      return response.data.data;
    } catch (error) {
      toast({
        title: "Gagal",
        description: "Gagal mengambil data capaian kompetensi.",
        variant: "destructive",
      });
      return [];
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    saveCapaian,
    fetchCapaianBySiswaId,
  };
}
