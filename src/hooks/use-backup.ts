"use client";
import { useState } from "react";
import { apiClient } from "@/lib/api-client";
import { useToast } from "@/components/ui/use-toast";
export function useBackup() {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const downloadBackup = async () => {
    setLoading(true);
    try {
      const response = await apiClient.get("/backup/download", {
        responseType: "blob",
      });
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      const fileName = `backup-e-siska-${new Date()
        .toISOString()
        .replace(/[:.]/g, "-")}.json`;
      link.setAttribute("download", fileName);
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
      toast({
        title: "Berhasil",
        description: "Backup database berhasil diunduh.",
      });
      return true;
    } catch (error) {
      toast({
        title: "Gagal",
        description: "Gagal mengunduh backup database.",
        variant: "destructive",
      });
      return false;
    } finally {
      setLoading(false);
    }
  };
  const restoreBackup = async (file: File) => {
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);
      await apiClient.post("/backup/restore", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      toast({
        title: "Berhasil",
        description: "Database berhasil di-restore.",
      });
      return true;
    } catch (error) {
      toast({
        title: "Gagal",
        description: "Gagal restore database. Pastikan file valid.",
        variant: "destructive",
      });
      return false;
    } finally {
      setLoading(false);
    }
  };
  return {
    loading,
    downloadBackup,
    restoreBackup,
  };
}
