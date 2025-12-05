"use client";
import { useState, useCallback } from "react";
import { useToast } from "@/hooks/use-toast";
import { raporService } from "@/services/rapor-service";
import { Rapor } from "@/types/rapor";
export function useRapor() {
  const [data, setData] = useState<Rapor[]>([]);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const fetchRapor = useCallback(
    async (siswaId?: string, tahunAjaranId?: string) => {
      setLoading(true);
      try {
        const params = new URLSearchParams();
        if (siswaId) params.append("siswaId", siswaId);
        if (tahunAjaranId) params.append("tahunAjaranId", tahunAjaranId);
        const result = await raporService.getAll(params);
        setData(result);
      } catch (error) {
        toast({
          title: "Gagal memuat data",
          description: "Terjadi kesalahan saat mengambil data rapor.",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    },
    [toast]
  );
  const generateRapor = async (siswaId: string, tahunAjaranId: string) => {
    setLoading(true);
    try {
      const result = await raporService.generate(siswaId, tahunAjaranId);
      toast({
        title: "Berhasil",
        description: "Rapor berhasil digenerate.",
      });
      fetchRapor();
      return result;
    } catch (error) {
      toast({
        title: "Gagal",
        description: "Gagal generate rapor.",
        variant: "destructive",
      });
      return null;
    } finally {
      setLoading(false);
    }
  };
  const downloadRaporPDF = async (siswaId: string, tahunAjaranId: string) => {
    setLoading(true);
    try {
      const blob = await raporService.downloadPDF(siswaId, tahunAjaranId);
      const url = window.URL.createObjectURL(new Blob([blob]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `rapor-${siswaId}.pdf`);
      document.body.appendChild(link);
      link.click();
      link.remove();
      toast({
        title: "Berhasil",
        description: "Rapor PDF berhasil didownload.",
      });
      return true;
    } catch (error) {
      toast({
        title: "Gagal",
        description: "Gagal mendownload rapor PDF.",
        variant: "destructive",
      });
      return false;
    } finally {
      setLoading(false);
    }
  };
  const downloadRapor = async (id: string) => {
    try {
      const blob = await raporService.downloadLegacy(id);
      const url = window.URL.createObjectURL(new Blob([blob]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `rapor_${id}.pdf`);
      document.body.appendChild(link);
      link.click();
      link.remove();
      toast({
        title: "Berhasil",
        description: "Rapor berhasil didownload.",
      });
      return true;
    } catch (error) {
      toast({
        title: "Gagal",
        description: "Gagal mendownload rapor.",
        variant: "destructive",
      });
      return false;
    }
  };
  const fetchRaporBySiswaId = useCallback(
    async (siswaId: string, tahunAjaranId?: string) => {
      setLoading(true);
      try {
        const allRapors = await raporService.getBySiswaId(siswaId);
        if (tahunAjaranId) {
          setData(
            allRapors.filter((r: Rapor) => r.tahunAjaranId === tahunAjaranId)
          );
        } else {
          setData(allRapors);
        }
      } catch (error) {
        toast({
          title: "Gagal memuat data",
          description: "Terjadi kesalahan saat mengambil data rapor siswa.",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    },
    [toast]
  );
  const overrideNilai = async (
    siswaId: string,
    mapelId: string,
    tahunAjaranId: string,
    nilaiAkhir: number
  ) => {
    setLoading(true);
    try {
      await raporService.overrideNilai(
        siswaId,
        mapelId,
        tahunAjaranId,
        nilaiAkhir
      );
      toast({
        title: "Berhasil",
        description: "Nilai berhasil di-override.",
      });
      return true;
    } catch (error) {
      toast({
        title: "Gagal",
        description: "Gagal override nilai.",
        variant: "destructive",
      });
      return false;
    } finally {
      setLoading(false);
    }
  };
  const updateDataRapor = async (
    siswaId: string,
    tahunAjaranId: string,
    catatan: string,
    kokurikuler: string
  ) => {
    setLoading(true);
    try {
      await raporService.updateData(
        siswaId,
        tahunAjaranId,
        catatan,
        kokurikuler
      );
      toast({
        title: "Berhasil",
        description: "Data rapor berhasil diperbarui.",
      });
      return true;
    } catch (error) {
      toast({
        title: "Gagal",
        description: "Gagal memperbarui data rapor.",
        variant: "destructive",
      });
      return false;
    } finally {
      setLoading(false);
    }
  };
  const finalizeRapor = async (siswaId: string, tahunAjaranId: string) => {
    setLoading(true);
    try {
      await raporService.finalize(siswaId, tahunAjaranId);
      toast({
        title: "Berhasil",
        description: "Rapor berhasil difinalisasi.",
      });
      return true;
    } catch (error) {
      toast({
        title: "Gagal",
        description: "Gagal finalisasi rapor.",
        variant: "destructive",
      });
      return false;
    } finally {
      setLoading(false);
    }
  };
  const definalizeRapor = async (siswaId: string, tahunAjaranId: string) => {
    setLoading(true);
    try {
      await raporService.definalize(siswaId, tahunAjaranId);
      toast({
        title: "Berhasil",
        description: "Rapor berhasil didefinalisasi.",
      });
      return true;
    } catch (error) {
      toast({
        title: "Gagal",
        description: "Gagal definalisasi rapor.",
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
    fetchRapor,
    fetchRaporBySiswaId,
    generateRapor,
    downloadRapor,
    downloadRaporPDF,
    overrideNilai,
    updateDataRapor,
    finalizeRapor,
    definalizeRapor,
  };
}
