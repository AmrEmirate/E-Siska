"use client";

import { useState, useCallback } from "react";
import { apiClient } from "@/lib/api-client";
import { useToast } from "@/components/ui/use-toast";

export interface Dokumen {
  id: string;
  namaDokumen: string;
  jenisDokumen: string;
  urlDokumen: string;
  uploadedBy?: string;
  createdAt?: string;
  updatedAt?: string;
}

export function useDokumen() {
  const [data, setData] = useState<Dokumen[]>([]);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const fetchDokumen = useCallback(async () => {
    setLoading(true);
    try {
      const response = await apiClient.get("/dokumen");
      setData(response.data.data || []);
    } catch (error) {
      toast({
        title: "Gagal memuat data",
        description: "Terjadi kesalahan saat mengambil data dokumen.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  }, [toast]);

  const uploadDokumen = async (file: File, metadata: Partial<Dokumen>) => {
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);
      if (metadata.namaDokumen)
        formData.append("namaDokumen", metadata.namaDokumen);
      if (metadata.jenisDokumen)
        formData.append("jenisDokumen", metadata.jenisDokumen);

      await apiClient.post("/dokumen", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      toast({
        title: "Berhasil",
        description: "Dokumen berhasil diupload.",
      });
      fetchDokumen();
      return true;
    } catch (error) {
      toast({
        title: "Gagal",
        description: "Gagal mengupload dokumen.",
        variant: "destructive",
      });
      return false;
    } finally {
      setLoading(false);
    }
  };

  const deleteDokumen = async (id: string) => {
    try {
      await apiClient.delete(`/dokumen/${id}`);
      toast({
        title: "Berhasil",
        description: "Dokumen berhasil dihapus.",
      });
      fetchDokumen();
      return true;
    } catch (error) {
      toast({
        title: "Gagal",
        description: "Gagal menghapus dokumen.",
        variant: "destructive",
      });
      return false;
    }
  };

  return {
    data,
    loading,
    fetchDokumen,
    uploadDokumen,
    deleteDokumen,
  };
}
