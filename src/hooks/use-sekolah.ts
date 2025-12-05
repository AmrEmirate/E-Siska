"use client";

import { useState, useCallback } from "react";
import { apiClient } from "@/lib/api-client";
import { useToast } from "@/hooks/use-toast";

export interface Sekolah {
  id: string;
  namaSekolah: string;
  npsn?: string;
  alamat?: string;
  noTelp?: string;
  email?: string;
  website?: string;
  kepalaSekolah?: string;
  logo?: string;
  createdAt?: string;
  updatedAt?: string;
}

export function useSekolah() {
  const [data, setData] = useState<Sekolah | null>(null);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const fetchSekolah = useCallback(async () => {
    setLoading(true);
    try {
      const response = await apiClient.get("/sekolah");
      setData(response.data.data || null);
    } catch (error) {
      toast({
        title: "Gagal memuat data",
        description: "Terjadi kesalahan saat mengambil data sekolah.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  }, [toast]);

  const updateSekolah = async (sekolahData: Partial<Sekolah>) => {
    try {
      await apiClient.put("/sekolah", sekolahData);
      toast({
        title: "Berhasil",
        description: "Data sekolah berhasil diperbarui.",
      });
      fetchSekolah();
      return true;
    } catch (error) {
      toast({
        title: "Gagal",
        description: "Gagal memperbarui data sekolah.",
        variant: "destructive",
      });
      return false;
    }
  };

  return {
    data,
    loading,
    fetchSekolah,
    updateSekolah,
  };
}
