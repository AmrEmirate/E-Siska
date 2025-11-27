"use client";

import { useState, useEffect } from "react";
import { useNilai } from "@/hooks/use-nilai";
import { usePenempatan } from "@/hooks/use-penempatan";
import { Loader2 } from "lucide-react";

export default function WaliGradesPage() {
  const { data: nilaiData, loading, fetchNilaiByClass } = useNilai();
  const { data: penempatanData, fetchPenempatan } = usePenempatan();
  const [kelasId, setKelasId] = useState("");

  useEffect(() => {
    fetchPenempatan();
  }, [fetchPenempatan]);

  useEffect(() => {
    if (penempatanData.length > 0 && !kelasId) {
      const firstKelasId = penempatanData[0].kelasId;
      setKelasId(firstKelasId);
      fetchNilaiByClass(firstKelasId);
    }
  }, [penempatanData, kelasId, fetchNilaiByClass]);

  const studentGrades = nilaiData.reduce((acc: any[], nilai) => {
    const existing = acc.find((s) => s.siswaId === nilai.siswaId);
    if (existing) {
      existing.grades[nilai.komponenId] = nilai.nilai;
    } else {
      acc.push({
        siswaId: nilai.siswaId,
        nis: nilai.siswa?.nis || "-",
        name: nilai.siswa?.nama || "-",
        grades: { [nilai.komponenId]: nilai.nilai },
      });
    }
    return acc;
  }, []);

  if (loading && nilaiData.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px]">
        <Loader2 className="animate-spin text-red-600 mb-4" size={40} />
        <p className="text-gray-500 font-medium">Memuat data nilai...</p>
      </div>
    );
  }

  return (
    <div className="p-8">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Rekap Nilai Kelas
        </h1>
        <p className="text-gray-600">
          Lihat ringkasan nilai siswa di kelas bimbingan
        </p>
      </div>

      <div className="card">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">Rekap Nilai</h2>
        </div>

        <div className="overflow-x-auto">
          {studentGrades.length === 0 ? (
            <div className="p-8 text-center text-gray-500">
              Belum ada data nilai untuk kelas ini.
            </div>
          ) : (
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">
                    NIS
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">
                    Nama Siswa
                  </th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-700 uppercase">
                    Rata-rata
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {studentGrades.map((student: any) => {
                  const grades = Object.values(student.grades) as number[];
                  const average =
                    grades.length > 0
                      ? grades.reduce((a, b) => a + b, 0) / grades.length
                      : 0;
                  return (
                    <tr key={student.siswaId} className="hover:bg-gray-50">
                      <td className="px-6 py-4 text-sm font-medium text-gray-900">
                        {student.nis}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-700">
                        {student.name}
                      </td>
                      <td className="px-6 py-4 text-center text-sm font-bold bg-red-50 text-red-600">
                        {average.toFixed(2)}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}
