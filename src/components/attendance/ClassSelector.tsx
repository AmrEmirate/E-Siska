import { ClassItem } from "@/types/attendance";

interface ClassSelectorProps {
  classes: ClassItem[];
  selectedClass: string;
  onClassChange: (classId: string) => void;
  loading?: boolean;
}

export function ClassSelector({
  classes,
  selectedClass,
  onClassChange,
  loading = false,
}: ClassSelectorProps) {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Pilih Kelas
      </label>
      {loading ? (
        <div className="h-10 w-64 bg-gray-100 rounded animate-pulse"></div>
      ) : (
        <select
          value={selectedClass}
          onChange={(e) => onClassChange(e.target.value)}
          className="w-full md:w-64 px-4 py-2.5 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
        >
          <option value="">-- Pilih Kelas --</option>
          {classes.map((cls) => (
            <option key={cls.id} value={cls.id}>
              {cls.namaKelas}
            </option>
          ))}
        </select>
      )}
    </div>
  );
}
