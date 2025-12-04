"use client";

import { useState, useEffect } from "react";
import { apiClient } from "@/lib/api-client";
import { X } from "lucide-react";
import { FormulaComponentList } from "./formula-component-list";
import { FormulaComponentForm } from "./formula-component-form";

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
  const [nextOrder, setNextOrder] = useState(1);

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
        setNextOrder(lastOrder + 1);
      } else {
        setNextOrder(1);
      }
    } catch (err: any) {
      setError("Gagal memuat skema penilaian. Pastikan mapel sudah dibuat.");
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = async (data: {
    namaKomponen: string;
    tipe: "INPUT" | "READ_ONLY";
    formula: string;
    urutan: number;
  }) => {
    if (!skema) return;

    try {
      await apiClient.post(`/skema/${skema.id}/komponen`, {
        namaKomponen: data.namaKomponen,
        tipe: data.tipe,
        formula: data.tipe === "READ_ONLY" ? data.formula : undefined,
        urutan: Number(data.urutan),
      });

      setNextOrder((prev) => prev + 1);
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
                <FormulaComponentList
                  components={skema.Komponen}
                  onDelete={handleDelete}
                />
              </div>

              <FormulaComponentForm
                onSubmit={handleAdd}
                initialOrder={nextOrder}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
