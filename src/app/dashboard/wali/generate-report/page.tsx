"use client";

import { useState, useEffect } from "react";
import { useRapor } from "@/hooks/use-rapor";
import { useSiswa } from "@/hooks/use-siswa";
import { useTahunAjaran } from "@/hooks/use-tahun-ajaran";
import { usePenempatan } from "@/hooks/use-penempatan";
import { Loader2 } from "lucide-react";

export default function GenerateReportPage() {
  const { generateRapor, downloadRapor, loading } = useRapor();
  const { data: students, fetchSiswaNoPagination } = useSiswa();
  const { data: tahunAjaran, fetchTahunAjaran } = useTahunAjaran();
  const { data: penempatanData, fetchPenempatan } = usePenempatan();

  const [selectedStudent, setSelectedStudent] = useState("");
  const [kelasId, setKelasId] = useState("");
  const [format, setFormat] = useState<"PDF" | "EXCEL">("PDF");

  useEffect(() => {
    fetchPenempatan();
    fetchTahunAjaran();
  }, [fetchPenempatan, fetchTahunAjaran]);

  useEffect(() => {
    if (penempatanData.length > 0 && !kelasId) {
      const firstKelasId = penempatanData[0].kelasId;
      setKelasId(firstKelasId);
      fetchSiswaNoPagination({ kelasId: firstKelasId });
    }
  }, [penempatanData, kelasId, fetchSiswaNoPagination]);

  useEffect(() => {
    if (students.length > 0 && !selectedStudent) {
      setSelectedStudent(students[0].id);
    }
  }, [students, selectedStudent]);

  const selectedStudentData = students.find((s) => s.id === selectedStudent);
  const activeTahunAjaran = tahunAjaran.find((ta) => ta.status === "Aktif");

  const handleGenerate = async () => {
    if (!selectedStudent || !activeTahunAjaran) {
      alert("Pilih siswa dan tahun ajaran aktif harus tersedia");
      return;
    }
    const rapor = await generateRapor(selectedStudent, activeTahunAjaran.id);
    if (rapor?.id) {
      await downloadRapor(rapor.id);
    }
  };

  return (
    <div className="p-8">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Generate Rapor
        </h1>
        <p className="text-gray-600">
          Cetak rapor siswa yang sudah difinalisasi
        </p>
      </div>

      <div className="card p-6 mb-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">
          Pilih Siswa
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Nama Siswa
            </label>
            <select
              value={selectedStudent}
              onChange={(e) => setSelectedStudent(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
            >
              {students.length === 0 ? (
                <option value="">Tidak ada siswa</option>
              ) : (
                students.map((student) => (
                  <option key={student.id} value={student.id}>
                    {student.nama}
                  </option>
                ))
              )}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Format Output
            </label>
            <select
              value={format}
              onChange={(e) => setFormat(e.target.value as "PDF" | "EXCEL")}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
            >
              <option value="PDF">PDF</option>
              <option value="EXCEL">Excel</option>
            </select>
          </div>
        </div>
      </div>

      {selectedStudentData && (
        <div className="card p-8 mb-6">
          <div className="text-center mb-6 pb-6 border-b-2 border-gray-200">
            <h2 className="text-2xl font-bold text-gray-900">RAPOR SISWA</h2>
            <p className="text-sm text-gray-600">SDN Ciater 02 Serpong</p>
          </div>

          <div className="space-y-4 mb-6">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-600">Nama Siswa</p>
                <p className="font-semibold text-gray-900">
                  {selectedStudentData.nama}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600">NIS</p>
                <p className="font-semibold text-gray-900">
                  {selectedStudentData.nis}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Tahun Ajaran</p>
                <p className="font-semibold text-gray-900">
                  {activeTahunAjaran?.tahun || "-"}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Semester</p>
                <p className="font-semibold text-gray-900">
                  {activeTahunAjaran?.semester || "-"}
                </p>
              </div>
            </div>
          </div>

          <div className="mb-6">
            <h3 className="font-semibold text-gray-900 mb-3">Preview Rapor</h3>
            <p className="text-sm text-gray-500 italic">
              Data nilai akan dimuat dari sistem saat rapor di-generate.
            </p>
          </div>
        </div>
      )}

      <div className="flex gap-3 justify-end">
        <button
          onClick={handleGenerate}
          disabled={loading || !selectedStudent || !activeTahunAjaran}
          className="btn-primary flex items-center gap-2 disabled:opacity-50"
        >
          {loading && <Loader2 className="animate-spin" size={16} />}
          Generate {format}
        </button>
      </div>
    </div>
  );
}
