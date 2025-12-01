"use client";

import { useState, useCallback } from "react";
import { apiClient } from "@/lib/api-client";
import { useToast } from "@/components/ui/use-toast";

export interface NilaiEkskul {
  id: string;
  siswaId: string;
  namaEkskul: string;
  nilai: string;
  tahunAjaranId: string;
  keterangan?: string;
  siswa?: {
    id: string;
    nama: string;
    nisn: string;
  };
  tahunAjaran?: {
    id: string;
    tahun: string;
    semester: string;
  };
  createdAt?: string;
  updatedAt?: string;
}

export function useEkskul() {
  const [data, setData] = useState<NilaiEkskul[]>([]);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const fetchEkskul = useCallback(
    async (siswaId?: string) => {
      setLoading(true);
      try {
        const params = new URLSearchParams();
        if (siswaId) params.append("siswaId", siswaId);

        const response = await apiClient.get(
          `/nilai-ekskul?${params.toString()}`
        );
        setData(response.data.data || []);
      } catch (error) {
        toast({
          title: "Gagal memuat data",
          description:
            "Terjadi kesalahan saat mengambil data nilai ekstrakurikuler.",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    },
    [toast]
  );

  const createEkskul = async (ekskulData: Partial<NilaiEkskul>) => {
    try {
      await apiClient.post("/nilai-ekskul", ekskulData);
      toast({
        title: "Berhasil",
        description: "Data nilai ekstrakurikuler berhasil ditambahkan.",
      });
      fetchEkskul();
      return true;
    } catch (error) {
      toast({
        title: "Gagal",
        description: "Gagal menambahkan data nilai ekstrakurikuler.",
        variant: "destructive",
      });
      return false;
    }
  };

  const updateEkskul = async (id: string, ekskulData: Partial<NilaiEkskul>) => {
    try {
      await apiClient.put(`/nilai-ekskul/${id}`, ekskulData);
      toast({
        title: "Berhasil",
        description: "Data nilai ekstrakurikuler berhasil diperbarui.",
      });
      fetchEkskul();
      return true;
    } catch (error) {
      toast({
        title: "Gagal",
        description: "Gagal memperbarui data nilai ekstrakurikuler.",
        variant: "destructive",
      });
      return false;
    }
  };

  const deleteEkskul = async (id: string) => {
    try {
      await apiClient.delete(`/nilai-ekskul/${id}`);
      toast({
        title: "Berhasil",
        description: "Data nilai ekstrakurikuler berhasil dihapus.",
      });
      fetchEkskul();
      return true;
    } catch (error) {
      toast({
        title: "Gagal",
        description: "Gagal menghapus data nilai ekstrakurikuler.",
        variant: "destructive",
      });
      return false;
    }
  };

  return {
    data,
    loading,
    fetchEkskul,
    createEkskul,
    updateEkskul,
    deleteEkskul,
  };
}
