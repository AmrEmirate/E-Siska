"use client";

import { useState, useEffect } from "react";
import { usePenempatan, type Penempatan } from "@/hooks/use-penempatan";
import { useSiswa } from "@/hooks/use-siswa";
import { useKelas } from "@/hooks/use-kelas";
import { useTahunAjaran } from "@/hooks/use-tahun-ajaran";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { PlacementForm } from "@/components/admin/student-placement/placement-form";
import { PlacementList } from "@/components/admin/student-placement/placement-list";

export default function StudentPlacementPage() {
  const {
    data: placements,
    loading,
    fetchPenempatan,
    createPenempatan,
    updatePenempatan,
    deletePenempatan,
  } = usePenempatan();

  const { data: students, fetchSiswa } = useSiswa();
  const { data: classes, fetchKelas } = useKelas();
  const { data: academicYears, fetchTahunAjaran } = useTahunAjaran();

  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [formData, setFormData] = useState({
    siswaId: "",
    kelasId: "",
    tahunAjaranId: "",
  });
  const [selectedPlacement, setSelectedPlacement] = useState<Penempatan | null>(
    null
  );
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchPenempatan();
    fetchSiswa(1, 100);
    fetchKelas();
    fetchTahunAjaran();
  }, [fetchPenempatan, fetchSiswa, fetchKelas, fetchTahunAjaran]);

  const resetForm = () => {
    setFormData({
      siswaId: "",
      kelasId: "",
      tahunAjaranId: "",
    });
    setSelectedPlacement(null);
  };

  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateForm = () => {
    if (!formData.siswaId || !formData.kelasId || !formData.tahunAjaranId) {
      alert("Mohon lengkapi semua data wajib!");
      return false;
    }
    return true;
  };

  const handleAdd = async () => {
    if (!validateForm()) return;

    setIsSubmitting(true);
    const success = await createPenempatan(formData);
    setIsSubmitting(false);
    if (success) {
      setIsAddOpen(false);
      resetForm();
    }
  };

  const handleEdit = async () => {
    if (!selectedPlacement) return;
    if (!validateForm()) return;

    setIsSubmitting(true);
    const success = await updatePenempatan(selectedPlacement.id, formData);
    setIsSubmitting(false);
    if (success) {
      setIsEditOpen(false);
      resetForm();
    }
  };

  const openEdit = (placement: Penempatan) => {
    setSelectedPlacement(placement);
    setFormData({
      siswaId: placement.siswaId,
      kelasId: placement.kelasId,
      tahunAjaranId: placement.tahunAjaranId,
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
            Penempatan Siswa
          </h1>
          <p className="text-gray-500 mt-2">
            Atur penempatan siswa ke dalam kelas.
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
          Tempatkan Siswa
        </Button>
      </div>

      <PlacementList
        placements={placements}
        loading={loading}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        onEdit={openEdit}
        onDelete={deletePenempatan}
      />

      <PlacementForm
        isOpen={isAddOpen}
        onOpenChange={setIsAddOpen}
        formData={formData}
        setFormData={setFormData}
        onSubmit={handleAdd}
        loading={loading}
        isSubmitting={isSubmitting}
        editingId={null}
        students={students}
        classes={classes}
        academicYears={academicYears}
      />

      <PlacementForm
        isOpen={isEditOpen}
        onOpenChange={setIsEditOpen}
        formData={formData}
        setFormData={setFormData}
        onSubmit={handleEdit}
        loading={loading}
        isSubmitting={isSubmitting}
        editingId={selectedPlacement?.id || null}
        students={students}
        classes={classes}
        academicYears={academicYears}
      />
    </div>
  );
}
