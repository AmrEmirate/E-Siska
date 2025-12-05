"use client";
import { useState } from "react";
import { apiClient } from "@/lib/api-client";
import { useToast } from "@/hooks/use-toast";
export function useBackup() {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const downloadBackup = async () => {
    setLoading(true);
    try {
      toast({
        title: "Memproses...",
        description: "Sedang menyiapkan backup database...",
      });
      
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
        title: "? Backup Berhasil!",
        description: `File ${fileName} berhasil diunduh.`,
        className: "bg-green-50 border-green-200",
      });
      return true;
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || 
        "Gagal mengunduh backup database.";
      toast({
        title: "? Backup Gagal",
        description: errorMessage,
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
      
      toast({
        title: "Memproses...",
        description: "Sedang me-restore database, mohon tunggu...",
      });
      
      await apiClient.post("/backup/restore", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        timeout: 300000, // 5 minute timeout for large restores
      });
      
      toast({
        title: "? Restore Berhasil!",
        description: "Database berhasil di-restore. Halaman akan di-refresh.",
        className: "bg-green-50 border-green-200",
      });
      
      // Refresh page after 2 seconds to show new data
      setTimeout(() => {
        window.location.reload();
      }, 2000);
      
      return true;
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || 
        "Gagal restore database. Pastikan file backup valid.";
      toast({
        title: "? Restore Gagal",
        description: errorMessage,
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
