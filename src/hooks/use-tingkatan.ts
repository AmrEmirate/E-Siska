"use client";

import { useState, useCallback } from "react";
import { apiClient } from "@/lib/api-client";
import { useToast } from "@/components/ui/use-toast";

export interface Tingkatan {
  id: string;
  namaTingkat: string;
  level: number;
  keterangan?: string;
  createdAt?: string;
  updatedAt?: string;
}

export function useTingkatan() {
  const [data, setData] = useState<Tingkatan[]>([]);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const fetchTingkatan = useCallback(async () => {
    setLoading(true);
    try {
      const response = await apiClient.get("/tingkatan");
      setData(response.data.data || []);
    } catch (error) {
      toast({
        title: "Gagal memuat data",
        description: "Terjadi kesalahan saat mengambil data tingkatan.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  }, [toast]);

  const createTingkatan = async (tingkatanData: Partial<Tingkatan>) => {
    try {
      await apiClient.post("/tingkatan", tingkatanData);
      toast({
        title: "Berhasil",
        description: "Data tingkatan berhasil ditambahkan.",
      });
      fetchTingkatan();
      return true;
    } catch (error) {
      toast({
        title: "Gagal",
        description: "Gagal menambahkan data tingkatan.",
        variant: "destructive",
      });
      return false;
    }
  };

  const updateTingkatan = async (
    id: string,
    tingkatanData: Partial<Tingkatan>
  ) => {
    try {
      await apiClient.put(`/tingkatan/${id}`, tingkatanData);
      toast({
        title: "Berhasil",
        description: "Data tingkatan berhasil diperbarui.",
      });
      fetchTingkatan();
      return true;
    } catch (error) {
      toast({
        title: "Gagal",
        description: "Gagal memperbarui data tingkatan.",
        variant: "destructive",
      });
      return false;
    }
  };

  const deleteTingkatan = async (id: string) => {
    try {
      await apiClient.delete(`/tingkatan/${id}`);
      toast({
        title: "Berhasil",
        description: "Data tingkatan berhasil dihapus.",
      });
      fetchTingkatan();
      return true;
    } catch (error) {
      toast({
        title: "Gagal",
        description: "Gagal menghapus data tingkatan.",
        variant: "destructive",
      });
      return false;
    }
  };

  return {
    data,
    loading,
    fetchTingkatan,
    createTingkatan,
    updateTingkatan,
    deleteTingkatan,
  };
}
