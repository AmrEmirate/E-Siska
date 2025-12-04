import { Loader2, Plus, Calendar } from "lucide-react";
import { SesiAbsensi } from "@/types/attendance";
import { SessionCard } from "./SessionCard";

interface SessionListProps {
  sessions: SesiAbsensi[];
  loading: boolean;
  onCreateClick: () => void;
}

export function SessionList({
  sessions,
  loading,
  onCreateClick,
}: SessionListProps) {
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-gray-900">
          Riwayat Pertemuan
        </h2>
        <button
          onClick={onCreateClick}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus size={18} />
          Buat Sesi Baru
        </button>
      </div>

      {loading ? (
        <div className="flex justify-center py-12">
          <Loader2 className="animate-spin text-blue-600" size={32} />
        </div>
      ) : sessions.length === 0 ? (
        <div className="bg-white rounded-xl border border-dashed border-gray-300 p-12 text-center">
          <div className="mx-auto w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mb-4">
            <Calendar className="text-gray-400" size={24} />
          </div>
          <h3 className="text-lg font-medium text-gray-900">
            Belum ada sesi absensi
          </h3>
          <p className="text-gray-500 mt-1">
            Buat sesi pertemuan pertama untuk mulai mencatat kehadiran.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[...sessions]
            .sort((a, b) => a.pertemuanKe - b.pertemuanKe)
            .map((session) => (
              <SessionCard key={session.id} session={session} />
            ))}
        </div>
      )}
    </div>
  );
}
