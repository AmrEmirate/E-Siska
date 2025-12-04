"use client";

import { useState, useEffect } from "react";
import { useJadwal, type Jadwal } from "@/hooks/use-jadwal";
import { useKelas } from "@/hooks/use-kelas";
import { useGuru } from "@/hooks/use-guru";
import { useMapel } from "@/hooks/use-mapel";
import { useRuangan } from "@/hooks/use-ruangan";
import { useTahunAjaran } from "@/hooks/use-tahun-ajaran";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { ScheduleForm } from "@/components/admin/schedule/schedule-form";
import { ScheduleList } from "@/components/admin/schedule/schedule-list";

export default function ScheduleManagementPage() {
  const {
    data: schedules,
    loading,
    fetchJadwal,
    createJadwal,
    updateJadwal,
    deleteJadwal,
  } = useJadwal();

  const { data: classes, fetchKelas } = useKelas();
  const { data: teachers, fetchGuru } = useGuru();
  const { data: subjects, fetchMapel } = useMapel();
  const { data: rooms, fetchRuangan } = useRuangan();
  const { data: academicYears, fetchTahunAjaran } = useTahunAjaran();

  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [formData, setFormData] = useState({
    kelasId: "",
    guruId: "",
    mapelId: "",
    ruanganId: "",
    hari: "",
    waktuMulai: "",
    waktuSelesai: "",
    tahunAjaranId: "",
  });
  const [selectedSchedule, setSelectedSchedule] = useState<Jadwal | null>(null);

  const days = ["Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];

  useEffect(() => {
    fetchJadwal();
    fetchKelas();
    fetchGuru(1, 100);
    fetchMapel();
    fetchRuangan();
    fetchTahunAjaran();
  }, [
    fetchJadwal,
    fetchKelas,
    fetchGuru,
    fetchMapel,
    fetchRuangan,
    fetchTahunAjaran,
  ]);

  const resetForm = () => {
    setFormData({
      kelasId: "",
      guruId: "",
      mapelId: "",
      ruanganId: "",
      hari: "",
      waktuMulai: "",
      waktuSelesai: "",
      tahunAjaranId: "",
    });
    setSelectedSchedule(null);
  };

  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateForm = () => {
    if (
      !formData.kelasId ||
      !formData.guruId ||
      !formData.mapelId ||
      !formData.hari ||
      !formData.waktuMulai ||
      !formData.waktuSelesai ||
      !formData.tahunAjaranId
    ) {
      alert("Mohon lengkapi semua data wajib!");
      return false;
    }
    return true;
  };

  const handleAdd = async () => {
    if (!validateForm()) return;

    setIsSubmitting(true);
    const success = await createJadwal({
      ...formData,
      hari: formData.hari as
        | "Senin"
        | "Selasa"
        | "Rabu"
        | "Kamis"
        | "Jumat"
        | "Sabtu",
    });
    setIsSubmitting(false);
    if (success) {
      setIsAddOpen(false);
      resetForm();
    }
  };

  const handleEdit = async () => {
    if (!selectedSchedule) return;
    if (!validateForm()) return;

    setIsSubmitting(true);
    const success = await updateJadwal(selectedSchedule.id, {
      ...formData,
      hari: formData.hari as
        | "Senin"
        | "Selasa"
        | "Rabu"
        | "Kamis"
        | "Jumat"
        | "Sabtu",
    });
    setIsSubmitting(false);
    if (success) {
      setIsEditOpen(false);
      resetForm();
    }
  };

  const openEdit = (schedule: Jadwal) => {
    setSelectedSchedule(schedule);
    setFormData({
      kelasId: schedule.kelasId,
      guruId: schedule.guruId,
      mapelId: schedule.mapelId,
      ruanganId: schedule.ruanganId || "",
      hari: schedule.hari,
      waktuMulai: schedule.waktuMulai,
      waktuSelesai: schedule.waktuSelesai,
      tahunAjaranId: schedule.tahunAjaranId || "",
    });
    setIsEditOpen(true);
  };

  const activeYear = academicYears.find((y) => y.isActive);

  useEffect(() => {
    if (isAddOpen && activeYear) {
      setFormData((prev) => ({ ...prev, tahunAjaranId: activeYear.id }));
    }
  }, [isAddOpen, activeYear]);

  return (
    <div className="p-8 space-y-8 bg-gray-50/50 min-h-screen">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight">
            Manajemen Jadwal
          </h1>
          <p className="text-gray-500 mt-2">
            Kelola jadwal pelajaran untuk setiap kelas.
          </p>
        </div>
        <Button
          className="bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-600/20 transition-all hover:scale-105"
          onClick={() => {
            resetForm();
            setIsAddOpen(true);
          }}
        >
          <Plus className="w-4 h-4 mr-2" />
          Tambah Jadwal
        </Button>
      </div>

      <ScheduleList
        schedules={schedules}
        loading={loading}
        onEdit={openEdit}
        onDelete={deleteJadwal}
      />

      <ScheduleForm
        isOpen={isAddOpen}
        onOpenChange={setIsAddOpen}
        formData={formData}
        setFormData={setFormData}
        onSubmit={handleAdd}
        isSubmitting={isSubmitting}
        editingId={null}
        classes={classes}
        teachers={teachers}
        subjects={subjects}
        rooms={rooms}
        academicYears={academicYears}
        days={days}
      />

      <ScheduleForm
        isOpen={isEditOpen}
        onOpenChange={setIsEditOpen}
        formData={formData}
        setFormData={setFormData}
        onSubmit={handleEdit}
        isSubmitting={isSubmitting}
        editingId={selectedSchedule?.id || null}
        classes={classes}
        teachers={teachers}
        subjects={subjects}
        rooms={rooms}
        academicYears={academicYears}
        days={days}
      />
    </div>
  );
}
