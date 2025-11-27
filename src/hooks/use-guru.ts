"use client";

import { useState, useCallback } from "react";
import { apiClient } from "@/lib/api-client";
import { useToast } from "@/components/ui/use-toast";

export interface Guru {
  id: string;
  nip: string;
  nama: string;
  email: string;
  jenisKelamin: "L" | "P";
  tempatLahir?: string;
  tanggalLahir?: string;
  alamat?: string;
  noTelp?: string;
  statusKepegawaian?: string;
  isAktif?: boolean;
  agama?: string;
  nik?: string;
  nuptk?: string;
  waliKelas?: {
    id: string;
    namaKelas: string;
  };
  createdAt?: string;
  updatedAt?: string;
  username?: string;
  passwordDefault?: string;
}

interface PaginationMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export function useGuru() {
  const [data, setData] = useState<Guru[]>([]);
  const [meta, setMeta] = useState<PaginationMeta>({
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 0,
  });
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const fetchGuru = useCallback(
    async (page = 1, limit = 10, search = "") => {
      setLoading(true);
      try {
        const params = new URLSearchParams({
          page: page.toString(),
          limit: limit.toString(),
        });
        if (search) params.append("search", search);

        const response = await apiClient.get(`/guru?${params.toString()}`);

        setData(response.data.data || []);
        setMeta(response.data.meta || { page, limit, total: 0, totalPages: 0 });
      } catch (error) {
        toast({
          title: "Gagal memuat data",
          description: "Terjadi kesalahan saat mengambil data guru.",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    },
    [toast]
  );

  const createGuru = async (guruData: Partial<Guru>) => {
    try {
      await apiClient.post("/guru", guruData);
      toast({
        title: "Berhasil",
        description: "Data guru berhasil ditambahkan.",
      });
      fetchGuru(meta.page, meta.limit);
      return true;
    } catch (error) {
      toast({
        title: "Gagal",
        description: "Gagal menambahkan data guru.",
        variant: "destructive",
      });
      return false;
    }
  };

  const updateGuru = async (id: string, guruData: Partial<Guru>) => {
    try {
      await apiClient.put(`/guru/${id}`, guruData);
      toast({
        title: "Berhasil",
        description: "Data guru berhasil diperbarui.",
      });
      fetchGuru(meta.page, meta.limit);
      return true;
    } catch (error) {
      toast({
        title: "Gagal",
        description: "Gagal memperbarui data guru.",
        variant: "destructive",
      });
      return false;
    }
  };

  const deleteGuru = async (id: string) => {
    try {
      await apiClient.delete(`/guru/${id}`);
      toast({
        title: "Berhasil",
        description: "Data guru berhasil dihapus.",
      });
      fetchGuru(meta.page, meta.limit);
      return true;
    } catch (error) {
      toast({
        title: "Gagal",
        description: "Gagal menghapus data guru.",
        variant: "destructive",
      });
      return false;
    }
  };

  return {
    data,
    meta,
    loading,
    fetchGuru,
    createGuru,
    updateGuru,
    deleteGuru,
  };
}
