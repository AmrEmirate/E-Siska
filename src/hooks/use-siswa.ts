"use client";

import { useState, useCallback } from "react";
import { apiClient } from "@/lib/api-client";
import { useToast } from "@/components/ui/use-toast";

export interface Siswa {
  id: string;
  nis: string;
  nisn?: string;
  nama: string;
  jenisKelamin: "L" | "P";
  tempatLahir?: string;
  tanggalLahir?: string;
  alamat?: string;
  namaAyah?: string;
  pekerjaanAyah?: string;
  namaIbu?: string;
  pekerjaanIbu?: string;
  alamatOrtu?: string;
  namaWali?: string;
  pekerjaanWali?: string;
  alamatWali?: string;
  noTelpOrtu?: string;
  status: "Aktif" | "Lulus" | "Keluar" | "Pindah";
  nik?: string;
  agama?: string;
  pendidikanSebelumnya?: string;
  rombelId?: string;
  rombel?: {
    id: string;
    nama: string;
  };
  createdAt?: string;
  updatedAt?: string;
}

interface PaginationMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export function useSiswa() {
  const [data, setData] = useState<Siswa[]>([]);
  const [meta, setMeta] = useState<PaginationMeta>({
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 0,
  });
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const fetchSiswa = useCallback(
    async (page = 1, limit = 10, search = "") => {
      setLoading(true);
      try {
        const params = new URLSearchParams({
          page: page.toString(),
          limit: limit.toString(),
        });
        if (search) params.append("search", search);

        const response = await apiClient.get(`/siswa?${params.toString()}`);

        // Assuming backend returns { data: [], meta: { ... } } or similar
        // Adjust based on actual response structure
        setData(response.data.data || []);
        setMeta(response.data.meta || { page, limit, total: 0, totalPages: 0 });
      } catch (error) {
        console.error("Error fetching siswa:", error);
        toast({
          title: "Gagal memuat data",
          description: "Terjadi kesalahan saat mengambil data siswa.",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    },
    [toast]
  );

  const createSiswa = async (siswaData: Partial<Siswa>) => {
    try {
      await apiClient.post("/siswa", siswaData);
      toast({
        title: "Berhasil",
        description: "Data siswa berhasil ditambahkan.",
      });
      fetchSiswa(meta.page, meta.limit);
      return true;
    } catch (error: any) {
      console.error("Error creating siswa:", error);
      const isConflict = error.response?.status === 409;
      toast({
        title: isConflict ? "Gagal: Data Duplikat" : "Gagal",
        description: isConflict
          ? "NIS atau Username sudah terdaftar. Mohon gunakan NIS yang berbeda."
          : "Gagal menambahkan data siswa.",
        variant: "destructive",
      });
      return false;
    }
  };

  const updateSiswa = async (id: string, siswaData: Partial<Siswa>) => {
    try {
      await apiClient.put(`/siswa/${id}`, siswaData);
      toast({
        title: "Berhasil",
        description: "Data siswa berhasil diperbarui.",
      });
      fetchSiswa(meta.page, meta.limit);
      return true;
    } catch (error) {
      console.error("Error updating siswa:", error);
      toast({
        title: "Gagal",
        description: "Gagal memperbarui data siswa.",
        variant: "destructive",
      });
      return false;
    }
  };

  const deleteSiswa = async (id: string) => {
    try {
      await apiClient.delete(`/siswa/${id}`);
      toast({
        title: "Berhasil",
        description: "Data siswa berhasil dihapus.",
      });
      fetchSiswa(meta.page, meta.limit);
      return true;
    } catch (error) {
      console.error("Error deleting siswa:", error);
      toast({
        title: "Gagal",
        description: "Gagal menghapus data siswa.",
        variant: "destructive",
      });
      return false;
    }
  };

  const fetchSiswaNoPagination = useCallback(
    async (params?: { kelasId?: string; search?: string }) => {
      // Fetch all students without pagination for dropdowns
      setLoading(true);
      try {
        const queryParams = new URLSearchParams();
        if (params?.kelasId) queryParams.append("kelasId", params.kelasId);
        if (params?.search) queryParams.append("search", params.search);
        queryParams.append("limit", "1000"); // Get all

        const response = await apiClient.get(
          `/siswa?${queryParams.toString()}`
        );
        setData(response.data.data || []);
      } catch (error) {
        console.error("Error fetching siswa:", error);
        toast({
          title: "Gagal memuat data",
          description: "Terjadi kesalahan saat mengambil data siswa.",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    },
    [toast]
  );

  return {
    data,
    meta,
    loading,
    fetchSiswa,
    fetchSiswaNoPagination,
    createSiswa,
    updateSiswa,
    deleteSiswa,
  };
}
