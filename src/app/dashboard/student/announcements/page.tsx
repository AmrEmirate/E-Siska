"use client";
import { useState, useEffect } from "react";
import { usePengumuman, type Pengumuman } from "@/hooks/use-pengumuman";
import { Loader2 } from "lucide-react";
export default function StudentAnnouncementsPage() {
  const { data: announcements, loading, fetchPengumuman } = usePengumuman();
  const [filter, setFilter] = useState<"ALL" | "SISWA" | "SEMUA">("ALL");
  useEffect(() => {
    fetchPengumuman();
  }, [fetchPengumuman]);
  const filteredAnnouncements = announcements.filter((ann) => {
    if (filter === "ALL")
      return ann.target === "SISWA" || ann.target === "SEMUA";
    return ann.target === filter;
  });
  const getPriorityColor = (targetLevel: string) => {
    return targetLevel === "SEMUA"
      ? "bg-red-100 text-red-800 border-l-4 border-red-500"
      : "bg-blue-100 text-blue-800 border-l-4 border-blue-500";
  };
  if (loading && announcements.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px]">
        <Loader2 className="animate-spin text-red-600 mb-4" size={40} />
        <p className="text-gray-500 font-medium">Memuat pengumuman...</p>
      </div>
    );
  }
  return (
    <div className="p-8">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Pengumuman Sekolah
        </h1>
        <p className="text-gray-600">Lihat semua pengumuman dari sekolah</p>
      </div>
      <div className="mb-6">
        <div className="flex gap-2">
          <button
            onClick={() => setFilter("ALL")}
            className={`px-4 py-2 rounded-lg font-medium transition ${
              filter === "ALL"
                ? "bg-red-600 text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            Semua
          </button>
          <button
            onClick={() => setFilter("SISWA")}
            className={`px-4 py-2 rounded-lg font-medium transition ${
              filter === "SISWA"
                ? "bg-red-600 text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            Untuk Siswa
          </button>
        </div>
      </div>
      <div className="space-y-4">
        {filteredAnnouncements.length === 0 ? (
          <div className="card p-12 text-center text-gray-500">
            Belum ada pengumuman.
          </div>
        ) : (
          filteredAnnouncements.map((announcement) => (
            <div
              key={announcement.id}
              className={`card p-6 ${getPriorityColor(announcement.target)}`}
            >
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h3 className="text-lg font-bold">{announcement.judul}</h3>
                  <span className="inline-block mt-2 text-xs font-semibold px-2 py-1 bg-white/50 rounded">
                    {announcement.target}
                  </span>
                </div>
                <p className="text-xs text-gray-600">
                  {announcement.createdAt
                    ? new Date(announcement.createdAt).toLocaleDateString(
                        "id-ID"
                      )
                    : "-"}
                </p>
              </div>
              <p className="text-sm leading-relaxed mt-3">
                {announcement.konten}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
