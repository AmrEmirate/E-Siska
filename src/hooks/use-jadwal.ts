"use client";
import { useState, useCallback, ReactNode, useRef } from "react";
import { apiClient } from "@/lib/api-client";
import { useToast } from "@/hooks/use-toast";
export interface Jadwal {
  id: string;
  kelasId: string;
  mapelId: string;
  guruId: string;
  ruanganId?: string;
  hari: "Senin" | "Selasa" | "Rabu" | "Kamis" | "Jumat" | "Sabtu";
  waktuMulai: string;
  waktuSelesai: string;
  tahunAjaranId?: string;
  kelas?: {
    id: string;
    namaKelas: string;
  };
  mapel?: {
    id: string;
    namaMapel: string;
  };
  guru?: {
    id: string;
    nama: string;
  };
  ruangan?: {
    id: string;
    namaRuangan: string;
  };
  createdAt?: string;
  updatedAt?: string;
}
export function useJadwal() {
  const [data, setData] = useState<Jadwal[]>([]);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const lastFetchArgs = useRef<{ kelasId?: string; guruId?: string }>({});
  const fetchJadwal = useCallback(
    async (kelasId?: string, guruId?: string, showLoading: boolean = true) => {
      if (showLoading) setLoading(true);
      if (kelasId !== undefined || guruId !== undefined) {
        lastFetchArgs.current = { kelasId, guruId };
      } else {
        kelasId = lastFetchArgs.current.kelasId;
        guruId = lastFetchArgs.current.guruId;
      }
      try {
        const params = new URLSearchParams();
        if (kelasId) params.append("kelasId", kelasId);
        if (guruId) params.append("guruId", guruId);
        const response = await apiClient.get(`/jadwal?${params.toString()}`);
        setData(response.data.data || []);
      } catch (error) {
        toast({
          title: "Gagal memuat data",
          description: "Terjadi kesalahan saat mengambil data jadwal.",
          variant: "destructive",
        });
      } finally {
        if (showLoading) setLoading(false);
      }
    },
    [toast]
  );
  const createJadwal = async (jadwalData: Partial<Jadwal>) => {
    const tempId = `temp-${Date.now()}`;
    const optimisticJadwal = {
      id: tempId,
      ...jadwalData,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    } as Jadwal;
    const previousData = [...data];
    setData((prev) => [...prev, optimisticJadwal]);
    try {
      await apiClient.post("/jadwal", jadwalData);
      toast({
        title: "Berhasil",
        description: "Data jadwal berhasil ditambahkan.",
      });
      fetchJadwal(undefined, undefined, false);
      return true;
    } catch (error: any) {
      setData(previousData);
      const errorMessage =
        error?.response?.data?.message || "Gagal menambahkan data jadwal.";
      toast({
        title: "Gagal",
        description: errorMessage,
        variant: "destructive",
      });
      return false;
    }
  };
  const updateJadwal = async (id: string, jadwalData: Partial<Jadwal>) => {
    const previousData = [...data];
    setData((prev) =>
      prev.map((item) => (item.id === id ? { ...item, ...jadwalData } : item))
    );
    try {
      await apiClient.put(`/jadwal/${id}`, jadwalData);
      toast({
        title: "Berhasil",
        description: "Data jadwal berhasil diperbarui.",
      });
      fetchJadwal(undefined, undefined, false);
      return true;
    } catch (error) {
      setData(previousData);
      toast({
        title: "Gagal",
        description: "Gagal memperbarui data jadwal.",
        variant: "destructive",
      });
      return false;
    }
  };
  const deleteJadwal = async (id: string) => {
    const previousData = [...data];
    setData((prev) => prev.filter((item) => item.id !== id));
    try {
      await apiClient.delete(`/jadwal/${id}`);
      toast({
        title: "Berhasil",
        description: "Data jadwal berhasil dihapus.",
      });
      fetchJadwal(undefined, undefined, false);
      return true;
    } catch (error) {
      setData(previousData);
      toast({
        title: "Gagal",
        description: "Gagal menghapus data jadwal.",
        variant: "destructive",
      });
      return false;
    }
  };
  const fetchJadwalByStudent = useCallback(
    async (siswaId: string) => {
      setLoading(true);
      try {
        const penempatanRes = await apiClient.get(
          `/penempatan?siswaId=${siswaId}`
        );
        const kelasId = penempatanRes.data.data[0]?.kelasId;
        if (kelasId) {
          await fetchJadwal(kelasId);
        }
      } catch (error) {
        setData([]);
      } finally {
        setLoading(false);
      }
    },
    [fetchJadwal]
  );
  return {
    data,
    loading,
    fetchJadwal,
    fetchJadwalByStudent,
    createJadwal,
    updateJadwal,
    deleteJadwal,
  };
}
