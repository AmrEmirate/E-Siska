"use client";

import { useState, useCallback } from "react";
import { apiClient } from "@/lib/api-client";
import { useToast } from "@/components/ui/use-toast";

export interface Penugasan {
  id: string;
  guruId: string;
  kelasId: string;
  mapelId: string;
  tahunAjaranId: string;
  guru?: {
    id: string;
    nama: string;
    nip: string;
  };
  kelas?: {
    id: string;
    namaKelas: string;
  };
  mapel?: {
    id: string;
    namaMapel: string;
  };
  tahunAjaran?: {
    id: string;
    nama: string;
    isAktif?: boolean;
    isActive?: boolean;
  };
  createdAt?: string;
  updatedAt?: string;
}

export function usePenugasan() {
  const [data, setData] = useState<Penugasan[]>([]);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const fetchPenugasan = useCallback(
    async (guruId?: string, kelasId?: string) => {
      setLoading(true);
      try {
        const params = new URLSearchParams();
        if (guruId) params.append("guruId", guruId);
        if (kelasId) params.append("kelasId", kelasId);

        const response = await apiClient.get(
          `/penugasan-guru?${params.toString()}`
        );
        setData(response.data.data || []);
      } catch (error) {
        toast({
          title: "Gagal memuat data",
          description: "Terjadi kesalahan saat mengambil data penugasan guru.",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    },
    [toast]
  );

  const createPenugasan = async (penugasanData: Partial<Penugasan>) => {
    try {
      await apiClient.post("/penugasan-guru", penugasanData);
      toast({
        title: "Berhasil",
        description: "Data penugasan guru berhasil ditambahkan.",
      });
      fetchPenugasan();
      return true;
    } catch (error) {
      toast({
        title: "Gagal",
        description: "Gagal menambahkan data penugasan guru.",
        variant: "destructive",
      });
      return false;
    }
  };

  const updatePenugasan = async (
    id: string,
    penugasanData: Partial<Penugasan>
  ) => {
    try {
      await apiClient.put(`/penugasan-guru/${id}`, penugasanData);
      toast({
        title: "Berhasil",
        description: "Data penugasan guru berhasil diperbarui.",
      });
      fetchPenugasan();
      return true;
    } catch (error) {
      toast({
        title: "Gagal",
        description: "Gagal memperbarui data penugasan guru.",
        variant: "destructive",
      });
      return false;
    }
  };

  const deletePenugasan = async (id: string) => {
    try {
      await apiClient.delete(`/penugasan-guru/${id}`);
      toast({
        title: "Berhasil",
        description: "Data penugasan guru berhasil dihapus.",
      });
      fetchPenugasan();
      return true;
    } catch (error) {
      toast({
        title: "Gagal",
        description: "Gagal menghapus data penugasan guru.",
        variant: "destructive",
      });
      return false;
    }
  };

  return {
    data,
    loading,
    fetchPenugasan,
    createPenugasan,
    updatePenugasan,
    deletePenugasan,
  };
}
