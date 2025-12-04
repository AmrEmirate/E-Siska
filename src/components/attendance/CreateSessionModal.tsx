import { useState } from "react";
import { Loader2 } from "lucide-react";
import { useAuth } from "@/context/auth-context";
import { useAbsensi } from "@/hooks/use-absensi";

interface CreateSessionModalProps {
  isOpen: boolean;
  kelasId: string;
  defaultPertemuan: number;
  onClose: () => void;
  onSuccess: () => void;
}

export function CreateSessionModal({
  isOpen,
  kelasId,
  defaultPertemuan,
  onClose,
  onSuccess,
}: CreateSessionModalProps) {
  const { createSession } = useAbsensi();
  const { user } = useAuth();

  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [pertemuan, setPertemuan] = useState(defaultPertemuan);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user?.id) return;

    setLoading(true);
    const success = await createSession({
      guruId: user.id,
      kelasId,
      tanggal: date,
      pertemuanKe: pertemuan,
    });

    if (success) {
      onSuccess();
    }
    setLoading(false);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-md p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-4">
          Buat Sesi Absensi Baru
        </h3>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Tanggal
            </label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Pertemuan Ke-
            </label>
            <input
              type="number"
              min="1"
              value={pertemuan}
              onChange={(e) => setPertemuan(parseInt(e.target.value))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              required
            />
          </div>

          <div className="flex justify-end gap-3 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg"
            >
              Batal
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 flex items-center gap-2"
            >
              {loading && <Loader2 className="animate-spin" size={16} />}
              Buat Sesi
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
