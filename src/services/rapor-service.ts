import { apiClient } from "@/lib/api-client";
export const raporService = {
  async getAll(params?: URLSearchParams) {
    const response = await apiClient.get(`/rapor?${params?.toString() || ""}`);
    return response.data.data || [];
  },
  async getBySiswaId(siswaId: string) {
    const response = await apiClient.get(`/rapor/siswa/${siswaId}`);
    return response.data.data || [];
  },
  async generate(siswaId: string, tahunAjaranId: string) {
    const response = await apiClient.post(`/rapor/siswa/${siswaId}/generate`, {
      tahunAjaranId,
    });
    return response.data;
  },
  async downloadPDF(siswaId: string, tahunAjaranId: string) {
    const response = await apiClient.get(
      `/rapor/siswa/${siswaId}/download-pdf?tahunAjaranId=${tahunAjaranId}`,
      {
        responseType: "blob",
      }
    );
    return response.data;
  },
  async overrideNilai(
    siswaId: string,
    mapelId: string,
    tahunAjaranId: string,
    nilaiAkhir: number
  ) {
    await apiClient.post(`/rapor/siswa/${siswaId}/override`, {
      mapelId,
      tahunAjaranId,
      nilaiAkhir,
    });
  },
  async updateData(
    siswaId: string,
    tahunAjaranId: string,
    catatan: string,
    kokurikuler: string
  ) {
    await apiClient.put(`/rapor/siswa/${siswaId}`, {
      tahunAjaranId,
      catatan,
      kokurikuler,
    });
  },
  async finalize(siswaId: string, tahunAjaranId: string) {
    await apiClient.post(`/rapor/siswa/${siswaId}/finalize`, {
      tahunAjaranId,
    });
  },
  async definalize(siswaId: string, tahunAjaranId: string) {
    await apiClient.post(`/rapor/siswa/${siswaId}/definalize`, {
      tahunAjaranId,
    });
  },
  async downloadLegacy(id: string) {
    const response = await apiClient.get(` /rapor/${id}/download`, {
      responseType: "blob",
    });
    return response.data;
  },
};
