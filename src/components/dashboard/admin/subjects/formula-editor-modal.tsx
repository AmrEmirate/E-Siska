"use client";

import { useState, useEffect } from "react";
import { apiClient } from "@/lib/api-client";
import { X, Plus, Trash2, Calculator } from "lucide-react";

interface Component {
  id: string;
  namaKomponen: string;
  tipe: "INPUT" | "READ_ONLY";
  formula?: string;
  urutan: number;
}

interface Skema {
  id: string;
  mapelId: string;
  Komponen: Component[];
}

interface FormulaEditorModalProps {
  isOpen: boolean;
  onClose: () => void;
  mapelId: string;
  mapelName: string;
}

export function FormulaEditorModal({
  isOpen,
  onClose,
  mapelId,
  mapelName,
}: FormulaEditorModalProps) {
  const [skema, setSkema] = useState<Skema | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [newName, setNewName] = useState("");
  const [newType, setNewType] = useState<"INPUT" | "READ_ONLY">("INPUT");
  const [newFormula, setNewFormula] = useState("");
  const [newOrder, setNewOrder] = useState(1);

  useEffect(() => {
    if (isOpen && mapelId) {
      fetchSkema();
    }
  }, [isOpen, mapelId]);

  const fetchSkema = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await apiClient.get(`/skema/mapel/${mapelId}`);
      setSkema(response.data.data);

      if (response.data.data.Komponen.length > 0) {
        const lastOrder = Math.max(
          ...response.data.data.Komponen.map((c: Component) => c.urutan)
        );
        setNewOrder(lastOrder + 1);
      }
    } catch (err: any) {
      setError("Gagal memuat skema penilaian. Pastikan mapel sudah dibuat.");
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!skema) return;

    try {
      await apiClient.post(`/skema/${skema.id}/komponen`, {
        namaKomponen: newName,
        tipe: newType,
        formula: newType === "READ_ONLY" ? newFormula : undefined,
        urutan: Number(newOrder),
      });

      setNewName("");
      setNewFormula("");
      setNewOrder((prev) => prev + 1);
      fetchSkema();
    } catch (err: any) {
      alert(err.response?.data?.message || "Gagal menambah komponen");
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Yakin ingin menghapus komponen ini?")) return;

    try {
      await apiClient.delete(`/skema/komponen/${id}`);
      fetchSkema();
    } catch (err: any) {
      alert("Gagal menghapus komponen");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col">
        <div className="p-6 border-b border-gray-200 flex justify-between items-center bg-gray-50">
          <div>
            <h2 className="text-xl font-bold text-gray-900">Skema Penilaian</h2>
            <p className="text-sm text-gray-500">Mapel: {mapelName}</p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <X size={24} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6">
          {loading && <p className="text-center py-4">Memuat data...</p>}
          {error && <p className="text-center text-red-500 py-4">{error}</p>}

          {!loading && skema && (
            <div className="space-y-6">
              <div className="space-y-3">
                <h3 className="font-semibold text-gray-700">Daftar Komponen</h3>
                {skema.Komponen.length === 0 ? (
                  <p className="text-gray-400 italic text-sm">
                    Belum ada komponen penilaian.
                  </p>
                ) : (
                  <div className="bg-white border rounded-lg divide-y">
                    {skema.Komponen.map((comp) => (
                      <div
                        key={comp.id}
                        className="p-4 flex items-center justify-between hover:bg-gray-50"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-xs">
                            {comp.urutan}
                          </div>
                          <div>
                            <p className="font-medium text-gray-900">
                              {comp.namaKomponen}
                            </p>
                            <div className="flex gap-2 text-xs mt-1">
                              <span
                                className={`px-2 py-0.5 rounded-full ${
                                  comp.tipe === "INPUT"
                                    ? "bg-green-100 text-green-700"
                                    : "bg-purple-100 text-purple-700"
                                }`}
                              >
                                {comp.tipe}
                              </span>
                              {comp.formula && (
                                <span className="bg-gray-100 text-gray-600 px-2 py-0.5 rounded font-mono">
                                  {comp.formula}
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                        <button
                          onClick={() => handleDelete(comp.id)}
                          className="text-red-400 hover:text-red-600 p-2"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="bg-gray-50 p-5 rounded-xl border border-gray-200">
                <h3 className="font-semibold text-gray-700 mb-4 flex items-center gap-2">
                  <Plus size={18} /> Tambah Komponen Baru
                </h3>
                <form onSubmit={handleAdd} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1">
                        Nama Komponen
                      </label>
                      <input
                        type="text"
                        value={newName}
                        onChange={(e) => setNewName(e.target.value)}
                        placeholder="Contoh: Tugas 1"
                        className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1">
                        Urutan
                      </label>
                      <input
                        type="number"
                        value={newOrder}
                        onChange={(e) => setNewOrder(Number(e.target.value))}
                        className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">
                      Tipe Nilai
                    </label>
                    <div className="flex gap-4">
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio"
                          name="tipe"
                          checked={newType === "INPUT"}
                          onChange={() => setNewType("INPUT")}
                          className="text-blue-600"
                        />
                        <span className="text-sm">
                          Input Manual (Guru input angka)
                        </span>
                      </label>
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio"
                          name="tipe"
                          checked={newType === "READ_ONLY"}
                          onChange={() => setNewType("READ_ONLY")}
                          className="text-blue-600"
                        />
                        <span className="text-sm">
                          Hasil Kalkulasi (Otomatis dari rumus)
                        </span>
                      </label>
                    </div>
                  </div>

                  {newType === "READ_ONLY" && (
                    <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
                      <label className="block text-xs font-medium text-blue-800 mb-1 flex items-center gap-1">
                        <Calculator size={14} /> Formula / Rumus
                      </label>
                      <input
                        type="text"
                        value={newFormula}
                        onChange={(e) => setNewFormula(e.target.value)}
                        placeholder="Contoh: 0.4 * uts + 0.6 * uas"
                        className="w-full px-3 py-2 border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none font-mono text-sm"
                        required
                      />
                      <p className="text-xs text-blue-600 mt-2">
                        Gunakan nama komponen lain sebagai variabel. Contoh:{" "}
                        <code>mean(t1, t2)</code> atau{" "}
                        <code>(uts + uas) / 2</code>
                      </p>
                    </div>
                  )}

                  <button
                    type="submit"
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded-lg transition-colors"
                  >
                    Simpan Komponen
                  </button>
                </form>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
