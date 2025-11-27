"use client";

import { useState, useCallback } from "react";
import { apiClient } from "@/lib/api-client";
import { useToast } from "@/components/ui/use-toast";

export interface Backup {
  id: string;
  fileName: string;
  fileSize: number;
  createdAt: string;
}

export function useBackup() {
  const [data, setData] = useState<Backup[]>([]);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const fetchBackups = useCallback(async () => {
    setLoading(true);
    try {
      const response = await apiClient.get("/backup");
      setData(response.data.data || []);
    } catch (error) {
      toast({
        title: "Gagal memuat data",
        description: "Terjadi kesalahan saat mengambil data backup.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  }, [toast]);

  const createBackup = async () => {
    setLoading(true);
    try {
      await apiClient.post("/backup");
      toast({
        title: "Berhasil",
        description: "Backup database berhasil dibuat.",
      });
      fetchBackups();
      return true;
    } catch (error) {
      toast({
        title: "Gagal",
        description: "Gagal membuat backup database.",
        variant: "destructive",
      });
      return false;
    } finally {
      setLoading(false);
    }
  };

  const restoreBackup = async (id: string) => {
    setLoading(true);
    try {
      await apiClient.post(`/backup/${id}/restore`);
      toast({
        title: "Berhasil",
        description: "Database berhasil di-restore.",
      });
      return true;
    } catch (error) {
      toast({
        title: "Gagal",
        description: "Gagal restore database.",
        variant: "destructive",
      });
      return false;
    } finally {
      setLoading(false);
    }
  };

  return {
    data,
    loading,
    fetchBackups,
    createBackup,
    restoreBackup,
  };
}
