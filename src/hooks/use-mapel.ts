"use client";

import { useState, useCallback, ReactNode } from "react";
import { apiClient } from "@/lib/api-client";
import { useToast } from "@/components/ui/use-toast";

export interface Mapel {
  kategori: ReactNode;
  id: string;
  namaMapel: string;
  kodeMapel?: string;
  createdAt?: string;
  updatedAt?: string;
}

export function useMapel() {
  const [data, setData] = useState<Mapel[]>([]);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const fetchMapel = useCallback(async () => {
    setLoading(true);
    try {
      const response = await apiClient.get("/mapel");
      setData(response.data.data || []);
    } catch (error) {
      toast({
        title: "Gagal memuat data",
        description: "Terjadi kesalahan saat mengambil data mata pelajaran.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  }, [toast]);

  const createMapel = async (mapelData: Partial<Mapel>) => {
    try {
      await apiClient.post("/mapel", mapelData);
      toast({
        title: "Berhasil",
        description: "Data mata pelajaran berhasil ditambahkan.",
      });
      fetchMapel();
      return true;
    } catch (error) {
      toast({
        title: "Gagal",
        description: "Gagal menambahkan data mata pelajaran.",
        variant: "destructive",
      });
      return false;
    }
  };

  const updateMapel = async (id: string, mapelData: Partial<Mapel>) => {
    try {
      await apiClient.put(`/mapel/${id}`, mapelData);
      toast({
        title: "Berhasil",
        description: "Data mata pelajaran berhasil diperbarui.",
      });
      fetchMapel();
      return true;
    } catch (error) {
      toast({
        title: "Gagal",
        description: "Gagal memperbarui data mata pelajaran.",
        variant: "destructive",
      });
      return false;
    }
  };

  const deleteMapel = async (id: string) => {
    try {
      await apiClient.delete(`/mapel/${id}`);
      toast({
        title: "Berhasil",
        description: "Data mata pelajaran berhasil dihapus.",
      });
      fetchMapel();
      return true;
    } catch (error) {
      toast({
        title: "Gagal",
        description: "Gagal menghapus data mata pelajaran.",
        variant: "destructive",
      });
      return false;
    }
  };

  return {
    data,
    loading,
    fetchMapel,
    createMapel,
    updateMapel,
    deleteMapel,
  };
}
