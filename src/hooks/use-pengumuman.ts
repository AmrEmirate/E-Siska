"use client";
import { useState, useCallback, ReactNode } from "react";
import { apiClient } from "@/lib/api-client";
import { useToast } from "@/components/ui/use-toast";
export interface Pengumuman {
  id: string;
  judul: string;
  konten: string;
  target: "SEMUA" | "SISWA" | "GURU";
  tanggalPublish: string;
  author?: string;
  createdAt?: string;
  updatedAt?: string;
}
export function usePengumuman() {
  const [data, setData] = useState<Pengumuman[]>([]);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const fetchPengumuman = useCallback(
    async (search: string = "", showLoading: boolean = true) => {
      if (showLoading) setLoading(true);
      try {
        const params = new URLSearchParams();
        if (search) params.append("search", search);
        const response = await apiClient.get(
          `/pengumuman?${params.toString()}`
        );
        setData(response.data.data || []);
      } catch (error) {
        toast({
          title: "Gagal memuat data",
          description: "Terjadi kesalahan saat mengambil data pengumuman.",
          variant: "destructive",
        });
      } finally {
        if (showLoading) setLoading(false);
      }
    },
    [toast]
  );
  const createPengumuman = async (pengumumanData: Partial<Pengumuman>) => {
    const tempId = `temp-${Date.now()}`;
    const newItem: Pengumuman = {
      id: tempId,
      judul: pengumumanData.judul || "",
      konten: pengumumanData.konten || "",
      target: pengumumanData.target || "SEMUA",
      tanggalPublish: new Date().toISOString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      ...pengumumanData,
    } as Pengumuman;
    const previousData = [...data];
    setData((prev) => [newItem, ...prev]);
    try {
      await apiClient.post("/pengumuman", pengumumanData);
      toast({
        title: "Berhasil",
        description: "Pengumuman berhasil ditambahkan.",
      });
      fetchPengumuman("", false);
      return true;
    } catch (error) {
      setData(previousData);
      toast({
        title: "Gagal",
        description: "Gagal menambahkan pengumuman.",
        variant: "destructive",
      });
      return false;
    }
  };
  const updatePengumuman = async (
    id: string,
    pengumumanData: Partial<Pengumuman>
  ) => {
    const previousData = [...data];
    setData((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, ...pengumumanData } : item
      )
    );
    try {
      await apiClient.put(`/pengumuman/${id}`, pengumumanData);
      toast({
        title: "Berhasil",
        description: "Pengumuman berhasil diperbarui.",
      });
      fetchPengumuman("", false);
      return true;
    } catch (error) {
      setData(previousData);
      toast({
        title: "Gagal",
        description: "Gagal memperbarui pengumuman.",
        variant: "destructive",
      });
      return false;
    }
  };
  const deletePengumuman = async (id: string) => {
    const previousData = [...data];
    setData((prev) => prev.filter((item) => item.id !== id));
    try {
      await apiClient.delete(`/pengumuman/${id}`);
      toast({
        title: "Berhasil",
        description: "Pengumuman berhasil dihapus.",
      });
      fetchPengumuman("", false);
      return true;
    } catch (error) {
      setData(previousData);
      toast({
        title: "Gagal",
        description: "Gagal menghapus pengumuman.",
        variant: "destructive",
      });
      return false;
    }
  };
  return {
    data,
    loading,
    fetchPengumuman,
    createPengumuman,
    updatePengumuman,
    deletePengumuman,
  };
}
