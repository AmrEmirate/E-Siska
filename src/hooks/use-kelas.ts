"use client";
import { useState, useCallback } from "react";
import { apiClient } from "@/lib/api-client";
import { useToast } from "@/hooks/use-toast";
import { getErrorMessage, getErrorTitle } from "@/lib/error-utils";
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
    async (search: string = "", showLoading: boolean = true) => {
      if (showLoading) setLoading(true);
      try {
        const params = new URLSearchParams();
        if (search) params.append("search", search);
        const response = await apiClient.get(`/kelas?${params.toString()}`);
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
        variant: "success",
      });
      fetchKelas("", false);
      return true;
    } catch (error: any) {
      setData(previousData);
      toast({
        title: getErrorTitle(error),
        description: getErrorMessage(error, "Gagal menambahkan data kelas."),
        variant: "destructive",
      });
      return false;
    }
  };
  const updateKelas = async (id: string, kelasData: Partial<Kelas>) => {
    const previousData = [...data];
    setData((prev) =>
      prev.map((item) => (item.id === id ? { ...item, ...kelasData } : item))
    );
    try {
      await apiClient.put(`/kelas/${id}`, kelasData);
      toast({
        title: "Berhasil",
        description: "Data kelas berhasil diperbarui.",
        variant: "success",
      });
      fetchKelas("", false);
      return true;
    } catch (error: any) {
      setData(previousData);
      toast({
        title: getErrorTitle(error),
        description: getErrorMessage(error, "Gagal memperbarui data kelas."),
        variant: "destructive",
      });
      return false;
    }
  };
  const deleteKelas = async (id: string) => {
    const previousData = [...data];
    setData((prev) => prev.filter((item) => item.id !== id));
    try {
      await apiClient.delete(`/kelas/${id}`);
      toast({
        title: "Berhasil",
        description: "Data kelas berhasil dihapus.",
        variant: "success",
      });
      fetchKelas("", false);
      return true;
    } catch (error: any) {
      setData(previousData);
      toast({
        title: getErrorTitle(error),
        description: getErrorMessage(error, "Gagal menghapus data kelas."),
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
