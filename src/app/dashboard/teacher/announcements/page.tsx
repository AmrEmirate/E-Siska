"use client";

import { useState, useEffect } from "react";
import { usePengumuman, type Pengumuman } from "@/hooks/use-pengumuman";
import { Loader2 } from "lucide-react";

export default function TeacherAnnouncementsPage() {
  const { data: announcements, loading, fetchPengumuman } = usePengumuman();
  const [filter, setFilter] = useState<"ALL" | "GURU" | "SEMUA">("ALL");

  useEffect(() => {
    fetchPengumuman();
  }, [fetchPengumuman]);

  const filteredAnnouncements = announcements.filter((ann) => {
    if (filter === "ALL")
      return ann.target === "GURU" || ann.target === "SEMUA";
    return ann.target === filter;
  });

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
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Pengumuman</h1>
        <p className="text-gray-600">Lihat pengumuman dari sekolah</p>
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
            onClick={() => setFilter("GURU")}
            className={`px-4 py-2 rounded-lg font-medium transition ${
              filter === "GURU"
                ? "bg-red-600 text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            Untuk Guru
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
              className="card p-6 hover:shadow-md transition"
            >
              <div className="flex justify-between items-start mb-2">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900">
                    {announcement.judul}
                  </h3>
                  <p className="text-sm text-gray-600 mt-2">
                    {announcement.isi}
                  </p>
                </div>
              </div>
              <div className="flex justify-between items-center mt-4 pt-4 border-t border-gray-200">
                <p className="text-xs text-gray-500">
                  Target: {announcement.target} •{" "}
                  {announcement.createdAt
                    ? new Date(announcement.createdAt).toLocaleDateString(
                        "id-ID"
                      )
                    : "-"}
                </p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
