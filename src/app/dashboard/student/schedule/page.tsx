"use client";

import { useState, useEffect } from "react";
import { useJadwal, type Jadwal } from "@/hooks/use-jadwal";
import { useAuth } from "@/context/auth-context";
import { Loader2 } from "lucide-react";

export default function StudentSchedulePage() {
  const { user } = useAuth();
  const { data: schedules, loading, fetchJadwalByStudent } = useJadwal();

  useEffect(() => {
    if (user?.id) {
      fetchJadwalByStudent(user.id);
    }
  }, [user?.id, fetchJadwalByStudent]);

  const days = ["Senin", "Selasa", "Rabu", "Kamis", "Jumat"];
  const uniqueDays = days.filter((day) =>
    schedules.some((s) => s.hari === day)
  );

  const getSubjectColor = (subject: string) => {
    if (subject.includes("Istirahat"))
      return "bg-yellow-100 border-yellow-300 text-yellow-900";
    if (subject.includes("Upacara"))
      return "bg-red-100 border-red-300 text-red-900";
    return "bg-blue-100 border-blue-300 text-blue-900";
  };

  if (loading && schedules.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px]">
        <Loader2 className="animate-spin text-red-600 mb-4" size={40} />
        <p className="text-gray-500 font-medium">Memuat jadwal...</p>
      </div>
    );
  }

  return (
    <div className="p-8">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Jadwal Pelajaran
        </h1>
        <p className="text-gray-600">Lihat jadwal pelajaran harian Anda</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 mb-8">
        {uniqueDays.map((day) => (
          <div key={day} className="card">
            <div className="p-4 bg-red-50 border-b border-red-200">
              <h3 className="font-bold text-gray-900 text-center">{day}</h3>
            </div>
            <div className="p-4 space-y-2">
              {schedules
                .filter((s) => s.hari === day)
                .sort((a, b) => a.waktuMulai.localeCompare(b.waktuMulai))
                .map((item) => (
                  <div
                    key={item.id}
                    className={`p-3 rounded border-2 ${getSubjectColor(
                      item.mapel?.namaMapel || ""
                    )}`}
                  >
                    <p className="text-xs font-semibold">
                      {item.waktuMulai} - {item.waktuSelesai}
                    </p>
                    <p className="text-sm font-bold">{item.mapel?.namaMapel}</p>
                    {item.ruangan?.namaRuangan && (
                      <p className="text-xs mt-1">{item.ruangan.namaRuangan}</p>
                    )}
                  </div>
                ))}
            </div>
          </div>
        ))}
      </div>

      <div className="card">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">
            Jadwal Lengkap
          </h2>
        </div>

        <div className="overflow-x-auto">
          {schedules.length === 0 ? (
            <div className="p-8 text-center text-gray-500">
              Belum ada jadwal.
            </div>
          ) : (
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">
                    Hari
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">
                    Jam
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">
                    Mata Pelajaran
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">
                    Guru
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">
                    Ruangan
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {schedules
                  .sort((a, b) => {
                    const dayOrder = {
                      Senin: 0,
                      Selasa: 1,
                      Rabu: 2,
                      Kamis: 3,
                      Jumat: 4,
                    };
                    const dayDiff =
                      dayOrder[a.hari as keyof typeof dayOrder] -
                      dayOrder[b.hari as keyof typeof dayOrder];
                    if (dayDiff !== 0) return dayDiff;
                    return a.waktuMulai.localeCompare(b.waktuMulai);
                  })
                  .map((item) => (
                    <tr key={item.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 text-sm font-medium text-gray-900">
                        {item.hari}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-700">
                        {item.waktuMulai} - {item.waktuSelesai}
                      </td>
                      <td className="px-6 py-4 text-sm font-medium text-gray-900">
                        {item.mapel?.namaMapel}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-700">
                        {item.guru?.nama || "-"}
                      </td>
                      <td className="px-6 py-4 text-sm">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                          {item.ruangan?.namaRuangan || "-"}
                        </span>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}
