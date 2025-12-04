import { Trash2 } from "lucide-react";

interface Component {
  id: string;
  namaKomponen: string;
  tipe: "INPUT" | "READ_ONLY";
  formula?: string;
  urutan: number;
}

interface FormulaComponentListProps {
  components: Component[];
  onDelete: (id: string) => void;
}

export const FormulaComponentList = ({
  components,
  onDelete,
}: FormulaComponentListProps) => {
  if (components.length === 0) {
    return (
      <p className="text-gray-400 italic text-sm">
        Belum ada komponen penilaian.
      </p>
    );
  }

  return (
    <div className="bg-white border rounded-lg divide-y">
      {components.map((comp) => (
        <div
          key={comp.id}
          className="p-4 flex items-center justify-between hover:bg-gray-50"
        >
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-xs">
              {comp.urutan}
            </div>
            <div>
              <p className="font-medium text-gray-900">{comp.namaKomponen}</p>
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
            onClick={() => onDelete(comp.id)}
            className="text-red-400 hover:text-red-600 p-2"
          >
            <Trash2 size={18} />
          </button>
        </div>
      ))}
    </div>
  );
};
