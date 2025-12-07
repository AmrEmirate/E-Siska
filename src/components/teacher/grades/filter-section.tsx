"use client";

import { ClassItem, SubjectItem } from "@/types/grading";

interface FilterSectionProps {
  classes: ClassItem[];
  subjects: SubjectItem[];
  selectedClass: string;
  selectedSubject: string;
  onClassChange: (value: string) => void;
  onSubjectChange: (value: string) => void;
}

export function FilterSection({
  classes,
  subjects,
  selectedClass,
  selectedSubject,
  onClassChange,
  onSubjectChange,
}: FilterSectionProps) {
  return (
    <div className="bg-white p-4 sm:p-6 rounded-xl shadow-sm border border-gray-200">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">
            Pilih Kelas
          </label>
          <select
            value={selectedClass}
            onChange={(e) => onClassChange(e.target.value)}
            className="form-select"
          >
            <option value="">-- Pilih Kelas --</option>
            {classes.map((cls) => (
              <option key={cls.id} value={cls.id}>
                {cls.name}
              </option>
            ))}
          </select>
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">
            Pilih Mata Pelajaran
          </label>
          <select
            value={selectedSubject}
            onChange={(e) => onSubjectChange(e.target.value)}
            className="form-select"
          >
            <option value="">-- Pilih Mapel --</option>
            {subjects.map((subj) => (
              <option key={subj.id} value={subj.id}>
                {subj.namaMapel}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}
