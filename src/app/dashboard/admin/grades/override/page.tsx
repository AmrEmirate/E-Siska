"use client";
import { useState, useEffect } from "react";
import { useKelas } from "@/hooks/use-kelas";
import { usePenempatan } from "@/hooks/use-penempatan";
import { useTahunAjaran } from "@/hooks/use-tahun-ajaran";
import { useRapor } from "@/hooks/use-rapor";
import { useMapel } from "@/hooks/use-mapel";
import { useToast } from "@/components/ui/use-toast";
import { OverrideSelector } from "@/components/admin/grades/override-selector";
import { OverrideTable } from "@/components/admin/grades/override-table";
export default function AdminGradeOverridePage() {
  const { data: classes, fetchKelas } = useKelas();
  const { data: years, fetchTahunAjaran } = useTahunAjaran();
  const { data: placements, fetchPenempatan } = usePenempatan();
  const {
    data: rapors,
    fetchRaporBySiswaId,
    overrideNilai,
    loading: raporLoading,
  } = useRapor();
  const { data: mapels, fetchMapel } = useMapel();
  const { toast } = useToast();
  const [selectedClass, setSelectedClass] = useState("");
  const [selectedYear, setSelectedYear] = useState("");
  const [selectedStudent, setSelectedStudent] = useState("");
  const [grades, setGrades] = useState<Record<string, number>>({});
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    fetchKelas();
    fetchTahunAjaran();
    fetchMapel();
  }, [fetchKelas, fetchTahunAjaran, fetchMapel]);
  useEffect(() => {
    if (selectedClass && selectedYear) {
      fetchPenempatan(selectedClass, selectedYear);
    }
  }, [selectedClass, selectedYear, fetchPenempatan]);
  useEffect(() => {
    if (selectedStudent && selectedYear) {
      fetchRaporBySiswaId(selectedStudent, selectedYear);
    }
  }, [selectedStudent, selectedYear, fetchRaporBySiswaId]);
  const currentRapor = rapors.find((r) => r.tahunAjaranId === selectedYear);
  const handleGradeChange = (mapelId: string, value: string) => {
    const numValue = parseFloat(value);
    if (!isNaN(numValue)) {
      setGrades((prev) => ({ ...prev, [mapelId]: numValue }));
    }
  };
  const handleSave = async (mapelId: string) => {
    if (!selectedStudent || !selectedYear) return;
    const grade = grades[mapelId];
    if (grade === undefined) return;
    if (grade < 0 || grade > 100) {
      toast({
        title: "Error",
        description: "Nilai harus antara 0 dan 100",
        variant: "destructive",
      });
      return;
    }
    setLoading(true);
    const success = await overrideNilai(
      selectedStudent,
      mapelId,
      selectedYear,
      grade
    );
    setLoading(false);
    if (success) {
      fetchRaporBySiswaId(selectedStudent, selectedYear);
    }
  };
  return (
    <div className="p-8 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Override Nilai Rapor
        </h1>
        <p className="text-gray-600">
          Ubah nilai akhir rapor siswa secara manual.
        </p>
      </div>
      <OverrideSelector
        years={years}
        classes={classes}
        placements={placements}
        selectedYear={selectedYear}
        setSelectedYear={setSelectedYear}
        selectedClass={selectedClass}
        setSelectedClass={setSelectedClass}
        selectedStudent={selectedStudent}
        setSelectedStudent={setSelectedStudent}
      />
      {selectedStudent && selectedYear && (
        <OverrideTable
          loading={loading}
          raporLoading={raporLoading}
          currentRapor={currentRapor}
          mapels={mapels}
          grades={grades}
          handleGradeChange={handleGradeChange}
          handleSave={handleSave}
        />
      )}
    </div>
  );
}
