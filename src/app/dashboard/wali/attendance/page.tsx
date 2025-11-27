"use client";

import { useState, useEffect } from "react";
import { useAbsensi } from "@/hooks/use-absensi";
import { usePenempatan } from "@/hooks/use-penempatan";
import { Loader2 } from "lucide-react";

export default function WaliAttendancePage() {
  const { data: absensiData, loading, fetchAbsensi } = useAbsensi();
  const { data: penempatanData, fetchPenempatan } = usePenempatan();
  const [kelasId, setKelasId] = useState("");

  useEffect(() => {
    fetchPenempatan();
  }, [fetchPenempatan]);

  useEffect(() => {
    if (penempatanData.length > 0 && !kelasId) {
      const firstKelasId = penempatanData[0].kelasId;
      setKelasId(firstKelasId);
      fetchAbsensi(firstKelasId);
    }
  }, [penempatanData, kelasId, fetchAbsensi]);

  const studentAttendance = absensiData.reduce((acc: any[], absen) => {
    const existing = acc.find((s) => s.siswaId === absen.siswaId);
    if (existing) {
      existing.records.push(absen);
      if (absen.status === "HADIR") existing.hadir++;
      if (absen.status === "SAKIT") existing.sakit++;
      if (absen.status === "IZIN") existing.izin++;
      if (absen.status === "ALPHA") existing.alpa++;
    } else {
      const record = {
        siswaId: absen.siswaId,
        nis: absen.siswa?.nis || "-",
        name: absen.siswa?.nama || "-",
        hadir: absen.status === "HADIR" ? 1 : 0,
        sakit: absen.status === "SAKIT" ? 1 : 0,
        izin: absen.status === "IZIN" ? 1 : 0,
        alpa: absen.status === "ALPHA" ? 1 : 0,
        records: [absen],
      };
      acc.push(record);
    }
    return acc;
  }, []);

  if (loading && absensiData.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px]">
        <Loader2 className="animate-spin text-red-600 mb-4" size={40} />
        <p className="text-gray-500 font-medium">Memuat data absensi...</p>
      </div>
    );
  }

  return (
    <div className="p-8">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Rekap Absensi Kelas
        </h1>
        <p className="text-gray-600">Lihat ringkasan kehadiran siswa</p>
      </div>

      <div className="card">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">Rekap Absensi</h2>
        </div>

        <div className="overflow-x-auto">
          {studentAttendance.length === 0 ? (
            <div className="p-8 text-center text-gray-500">
              Belum ada data absensi.
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
                    Hadir
                  </th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-700 uppercase">
                    Sakit
                  </th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-700 uppercase">
                    Izin
                  </th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-700 uppercase">
                    Alpa
                  </th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-700 uppercase">
                    Persentase
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {studentAttendance.map((student: any) => {
                  const total =
                    student.hadir + student.sakit + student.izin + student.alpa;
                  const persentase =
                    total > 0
                      ? ((student.hadir / total) * 100).toFixed(1)
                      : "0.0";
                  return (
                    <tr key={student.siswaId} className="hover:bg-gray-50">
                      <td className="px-6 py-4 text-sm font-medium text-gray-900">
                        {student.nis}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-700">
                        {student.name}
                      </td>
                      <td className="px-6 py-4 text-center text-sm font-semibold text-green-600">
                        {student.hadir}
                      </td>
                      <td className="px-6 py-4 text-center text-sm font-semibold text-yellow-600">
                        {student.sakit}
                      </td>
                      <td className="px-6 py-4 text-center text-sm font-semibold text-blue-600">
                        {student.izin}
                      </td>
                      <td className="px-6 py-4 text-center text-sm font-semibold text-red-600">
                        {student.alpa}
                      </td>
                      <td className="px-6 py-4 text-center text-sm font-bold">
                        {persentase}%
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
