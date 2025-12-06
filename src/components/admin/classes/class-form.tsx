// src/components/admin/ClassForm.tsx

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { TeacherSearchCombobox } from "@/components/admin/teachers/teacher-search-combo-box";

import { Kelas } from "@/hooks/use-kelas";
import { Guru } from "@/hooks/use-guru";
import { Tingkatan } from "@/hooks/use-tingkatan";

interface ClassFormProps {
  formData: Partial<Kelas>;
  setFormData: (data: Partial<Kelas>) => void;
  levels: Tingkatan[];
  availableTeachers: Guru[];
}

export const ClassForm = ({
  formData,
  setFormData,
  levels,
  availableTeachers,
}: ClassFormProps) => {
  const handleWaliSelect = (teacherId: string) => {
    setFormData({ ...formData, waliKelasId: teacherId });
  };

  return (
    <div className="grid gap-6 py-4">
      <div className="space-y-2">
        <Label htmlFor="nama">Nama Kelas</Label>
        <Input
          id="nama"
          placeholder="Contoh: X IPA 1"
          value={formData.namaKelas || ""}
          onChange={(e) =>
            setFormData({ ...formData, namaKelas: e.target.value })
          }
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="tingkatan">Tingkatan</Label>
          <select
            id="tingkatan"
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            value={formData.tingkatanId || ""}
            onChange={(e) =>
              setFormData({ ...formData, tingkatanId: e.target.value })
            }
          >
            <option value="">Pilih Tingkatan</option>
            {levels.map((level) => (
              <option key={level.id} value={level.id}>
                {level.namaTingkat}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="wali">Wali Kelas</Label>
          <TeacherSearchCombobox
            teachers={availableTeachers}
            selectedTeacherId={formData.waliKelasId}
            onSelect={handleWaliSelect}
          />
        </div>
      </div>
    </div>
  );
};
