"use client";

import { useState, useCallback } from "react";
import { apiClient } from "@/lib/api-client";
import { useToast } from "@/components/ui/use-toast";

export interface Kelas {
  id: string;
  namaKelas: string;
  tingkatanId: string;
  waliKelasId?: string;
  tingkatan?: {
    id: string;
    namaTingkat: string;
  };
  waliKelas?: {
    id: string;
    nama: string;
  };
  _count?: {
    Penempatan: number;
  };
  createdAt?: string;
  updatedAt?: string;
}

export function useKelas() {
  const [data, setData] = useState<Kelas[]>([]);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const fetchKelas = useCallback(
    async (showLoading = true) => {
      if (showLoading) setLoading(true);
      try {
        const response = await apiClient.get("/kelas");
        setData(response.data.data || []);
      } catch (error) {
        toast({
          title: "Gagal memuat data",
          description: "Terjadi kesalahan saat mengambil data kelas.",
          variant: "destructive",
        });
      } finally {
        if (showLoading) setLoading(false);
      }
    },
    [toast]
  );

  const createKelas = async (kelasData: Partial<Kelas>) => {
    // Optimistic Update
    const tempId = `temp-${Date.now()}`;
    const newItem: Kelas = {
      id: tempId,
      namaKelas: kelasData.namaKelas || "",
      tingkatanId: kelasData.tingkatanId || "",
      waliKelasId: kelasData.waliKelasId,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      ...kelasData,
    } as Kelas;

    const previousData = [...data];
    setData((prev) => [newItem, ...prev]);

    try {
      await apiClient.post("/kelas", kelasData);
      toast({
        title: "Berhasil",
        description: "Data kelas berhasil ditambahkan.",
      });
      fetchKelas(false);
      return true;
    } catch (error: any) {
      // Revert on failure
      setData(previousData);
      const isConflict = error?.response?.status === 409;
      toast({
        title: isConflict ? "Konflik Data" : "Gagal",
        description: isConflict
          ? "Wali kelas yang dipilih sudah terdaftar di kelas lain."
          : "Gagal menambahkan data kelas.",
        variant: "destructive",
      });
      return false;
    }
  };

  const updateKelas = async (id: string, kelasData: Partial<Kelas>) => {
    // Optimistic Update
    const previousData = [...data];
    setData((prev) =>
      prev.map((item) => (item.id === id ? { ...item, ...kelasData } : item))
    );

    try {
      await apiClient.put(`/kelas/${id}`, kelasData);
      toast({
        title: "Berhasil",
        description: "Data kelas berhasil diperbarui.",
      });
      fetchKelas(false);
      return true;
    } catch (error) {
      // Revert on failure
      setData(previousData);
      toast({
        title: "Gagal",
        description: "Gagal memperbarui data kelas.",
        variant: "destructive",
      });
      return false;
    }
  };

  const deleteKelas = async (id: string) => {
    // Optimistic Update
    const previousData = [...data];
    setData((prev) => prev.filter((item) => item.id !== id));

    try {
      await apiClient.delete(`/kelas/${id}`);
      toast({
        title: "Berhasil",
        description: "Data kelas berhasil dihapus.",
      });
      fetchKelas(false);
      return true;
    } catch (error) {
      // Revert on failure
      setData(previousData);
      toast({
        title: "Gagal",
        description: "Gagal menghapus data kelas.",
        variant: "destructive",
      });
      return false;
    }
  };

  return {
    data,
    loading,
    fetchKelas,
    createKelas,
    updateKelas,
    deleteKelas,
    fetchTeachingClasses: useCallback(async () => {
      setLoading(true);
      try {
        const response = await apiClient.get("/kelas/teaching");
        return response.data.data || [];
      } catch (error) {
        toast({
          title: "Gagal memuat data",
          description: "Terjadi kesalahan saat mengambil data kelas ajar.",
          variant: "destructive",
        });
        return [];
      } finally {
        setLoading(false);
      }
    }, [toast]),
  };
}
