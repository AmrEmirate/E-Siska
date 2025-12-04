import Link from "next/link";
import { ChevronRight, Users } from "lucide-react";
import { format } from "date-fns";
import { id as idLocale } from "date-fns/locale";
import { SesiAbsensi } from "@/types/attendance";

interface SessionCardProps {
  session: SesiAbsensi;
}

export function SessionCard({ session }: SessionCardProps) {
  return (
    <Link
      href={`/dashboard/teacher/attendance/${session.id}`}
      className="block group"
    >
      <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm hover:shadow-md hover:border-blue-300 transition-all">
        <div className="flex justify-between items-start mb-3">
          <div className="flex items-center gap-2 text-blue-600 font-medium">
            <span className="bg-blue-50 px-2 py-1 rounded text-xs">
              Pertemuan {session.pertemuanKe}
            </span>
          </div>
          <ChevronRight
            size={18}
            className="text-gray-400 group-hover:text-blue-500 transition-colors"
          />
        </div>

        <h3 className="text-lg font-bold text-gray-900 mb-1">
          {format(new Date(session.tanggal), "EEEE, d MMMM yyyy", {
            locale: idLocale,
          })}
        </h3>

        <div className="flex items-center gap-2 text-sm text-gray-500 mt-4">
          <Users size={14} />
          <span>
            {session._count.Detail > 0
              ? `${session._count.Detail} Siswa Dicatat`
              : "Belum diisi"}
          </span>
        </div>
      </div>
    </Link>
  );
}
