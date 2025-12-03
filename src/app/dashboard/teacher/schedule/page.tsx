"use client";

import { useState, useEffect } from "react";
import { useJadwal, type Jadwal } from "@/hooks/use-jadwal";
import { useAuth } from "@/context/auth-context";
import { Loader2 } from "lucide-react";

export default function TeacherSchedulePage() {
  const { user } = useAuth();
  const { data: schedules, loading, fetchJadwal } = useJadwal();

  useEffect(() => {
    if (user?.id) {
      fetchJadwal(undefined, user.id);
    }
  }, [user?.id, fetchJadwal]);

  const days = ["Senin", "Selasa", "Rabu", "Kamis", "Jumat"];

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
          Jadwal Mengajar
        </h1>
        <p className="text-gray-600">Lihat jadwal mengajar Anda</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 mb-8">
        {days.map((day) => (
          <div key={day} className="card p-4">
            <h3 className="font-semibold text-gray-900 mb-3 text-center">
              {day}
            </h3>
            <div className="space-y-3">
              {schedules
                .filter((s) => s.hari === day)
                .sort((a, b) => a.waktuMulai.localeCompare(b.waktuMulai))
                .map((s) => (
                  <div
                    key={s.id}
                    className="bg-red-50 border border-red-200 rounded p-2"
                  >
                    <p className="text-sm font-medium text-gray-900">
                      {s.mapel?.namaMapel}
                    </p>
                    <p className="text-xs text-gray-600">
                      Kelas {s.kelas?.namaKelas}
                    </p>
                    <p className="text-xs text-red-600 font-semibold">
                      {s.waktuMulai} - {s.waktuSelesai}
                    </p>
                  </div>
                ))}
            </div>
          </div>
        ))}
      </div>

      <div className="card">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">
            Daftar Lengkap Jadwal
          </h2>
        </div>

        <div className="overflow-x-auto">
          {schedules.length === 0 ? (
            <div className="p-8 text-center text-gray-500">
              Belum ada jadwal mengajar.
            </div>
          ) : (
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">
                    Mata Pelajaran
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">
                    Kelas
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">
                    Hari
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">
                    Jam
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
                        {item.mapel?.namaMapel}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-700">
                        {item.kelas?.namaKelas}
                      </td>
                      <td className="px-6 py-4 text-sm">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800">
                          {item.hari}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-700">
                        {item.waktuMulai} - {item.waktuSelesai}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-700">
                        {item.ruangan?.namaRuangan || "-"}
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
