"use client";
import { useState, useEffect, useCallback } from "react";
import { usePenempatan } from "@/hooks/use-penempatan";
import { useRapor } from "@/hooks/use-rapor";
import { useTahunAjaran } from "@/hooks/use-tahun-ajaran";
import { useToast } from "@/components/ui/use-toast";
import { apiClient } from "@/lib/api-client";
import { Loader2 } from "lucide-react";
import { StudentTable, StudentStatus } from "./finalize-grades/student-table";
import { EditRaporDialog } from "./finalize-grades/edit-rapor-dialog";
export default function FinalizeGradesPage() {
  const {
    data: penempatanData,
    fetchPenempatan,
    loading: penempatanLoading,
  } = usePenempatan();
  const {
    updateDataRapor,
    finalizeRapor,
    definalizeRapor,
    loading: raporLoading,
  } = useRapor();
  const { data: tahunAjaran, fetchTahunAjaran } = useTahunAjaran();
  const { toast } = useToast();
  const [students, setStudents] = useState<StudentStatus[]>([]);
  const [loadingStatus, setLoadingStatus] = useState(false);
  const [activeYearId, setActiveYearId] = useState<string | null>(null);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState<StudentStatus | null>(
    null
  );
  const [formData, setFormData] = useState({
    catatan: "",
    kokurikuler: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  useEffect(() => {
    fetchTahunAjaran();
    fetchPenempatan();
  }, [fetchTahunAjaran, fetchPenempatan]);
  useEffect(() => {
    const active = tahunAjaran.find((t) => t.status === "Aktif");
    if (active) {
      setActiveYearId(active.id);
    }
  }, [tahunAjaran]);
  const fetchStudentStatuses = useCallback(async () => {
    if (!activeYearId || penempatanData.length === 0) return;
    setLoadingStatus(true);
    const statuses: StudentStatus[] = [];
    for (const p of penempatanData) {
      try {
        const response = await apiClient.get(`/rapor/siswa/${p.siswaId}`);
        const allRapors = response.data.data || [];
        const currentRapor = allRapors.find(
          (r: any) => r.tahunAjaranId === activeYearId
        );
        statuses.push({
          id: p.siswaId,
          nisn: p.siswa?.nisn || "-",
          name: p.siswa?.nama || "Unknown",
          status: currentRapor
            ? currentRapor.isFinalisasi
              ? "FINAL"
              : "DRAFT"
            : "BELUM_ADA",
          raporId: currentRapor?.id,
          catatan: currentRapor?.catatanWaliKelas,
          kokurikuler: currentRapor?.dataKokurikuler,
        });
      } catch (e) {
        statuses.push({
          id: p.siswaId,
          nisn: p.siswa?.nisn || "-",
          name: p.siswa?.nama || "Unknown",
          status: "BELUM_ADA",
        });
      }
    }
    setStudents(statuses);
    setLoadingStatus(false);
  }, [activeYearId, penempatanData]);
  useEffect(() => {
    if (activeYearId && penempatanData.length > 0) {
      fetchStudentStatuses();
    }
  }, [activeYearId, penempatanData, fetchStudentStatuses]);
  const handleEdit = (student: StudentStatus) => {
    setSelectedStudent(student);
    setFormData({
      catatan: student.catatan || "",
      kokurikuler: student.kokurikuler || "",
    });
    setIsEditOpen(true);
  };
  const handleSaveData = async () => {
    if (!selectedStudent || !activeYearId) return;
    setIsSubmitting(true);
    const success = await updateDataRapor(
      selectedStudent.id,
      activeYearId,
      formData.catatan,
      formData.kokurikuler
    );
    setIsSubmitting(false);
    if (success) {
      setIsEditOpen(false);
      fetchStudentStatuses();
    }
  };
  const handleFinalize = async (student: StudentStatus) => {
    if (!activeYearId) return;
    if (!student.catatan || !student.kokurikuler) {
      toast({
        title: "Data Belum Lengkap",
        description:
          "Harap isi Catatan Wali Kelas dan Data Kokurikuler terlebih dahulu.",
        variant: "destructive",
      });
      return;
    }
    if (
      confirm(
        `Finalisasi rapor untuk ${student.name}? Data tidak dapat diubah setelah ini.`
      )
    ) {
      const success = await finalizeRapor(student.id, activeYearId);
      if (success) fetchStudentStatuses();
    }
  };
  const handleDefinalize = async (student: StudentStatus) => {
    if (!activeYearId) return;
    if (confirm(`Batalkan finalisasi rapor untuk ${student.name}?`)) {
      const success = await definalizeRapor(student.id, activeYearId);
      if (success) fetchStudentStatuses();
    }
  };
  if (penempatanLoading || loadingStatus) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px]">
        <Loader2 className="animate-spin text-blue-600 mb-4" size={40} />
        <p className="text-gray-500 font-medium">Memuat data siswa...</p>
      </div>
    );
  }
  return (
    <div className="p-8 space-y-8 bg-gray-50/50 min-h-screen">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight">
            Finalisasi Nilai Rapor
          </h1>
          <p className="text-gray-500 mt-2">
            Kelola data rapor, catatan wali kelas, dan finalisasi nilai.
          </p>
        </div>
      </div>
      <StudentTable
        students={students}
        loading={raporLoading}
        onEdit={handleEdit}
        onFinalize={handleFinalize}
        onDefinalize={handleDefinalize}
      />
      <EditRaporDialog
        isOpen={isEditOpen}
        onOpenChange={setIsEditOpen}
        student={selectedStudent}
        formData={formData}
        setFormData={setFormData}
        onSave={handleSaveData}
        isSubmitting={isSubmitting}
      />
    </div>
  );
}
