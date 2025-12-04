import { useState, useEffect } from "react";
import { Plus, Calculator } from "lucide-react";

interface FormulaComponentFormProps {
  onSubmit: (data: {
    namaKomponen: string;
    tipe: "INPUT" | "READ_ONLY";
    formula: string;
    urutan: number;
  }) => Promise<void>;
  initialOrder: number;
}

export const FormulaComponentForm = ({
  onSubmit,
  initialOrder,
}: FormulaComponentFormProps) => {
  const [newName, setNewName] = useState("");
  const [newType, setNewType] = useState<"INPUT" | "READ_ONLY">("INPUT");
  const [newFormula, setNewFormula] = useState("");
  const [newOrder, setNewOrder] = useState(initialOrder);

  useEffect(() => {
    setNewOrder(initialOrder);
  }, [initialOrder]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSubmit({
      namaKomponen: newName,
      tipe: newType,
      formula: newFormula,
      urutan: newOrder,
    });
    setNewName("");
    setNewFormula("");
  };

  return (
    <div className="bg-gray-50 p-5 rounded-xl border border-gray-200">
      <h3 className="font-semibold text-gray-700 mb-4 flex items-center gap-2">
        <Plus size={18} /> Tambah Komponen Baru
      </h3>
      <form onSubmit={handleSubmit} className="space-y-4">
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
              <span className="text-sm">Input Manual (Guru input angka)</span>
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
              <code>mean(t1, t2)</code> atau <code>(uts + uas) / 2</code>
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
  );
};
