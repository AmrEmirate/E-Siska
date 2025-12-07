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
          className="form-select w-full md:w-64"
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
