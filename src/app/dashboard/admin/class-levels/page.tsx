"use client";

import { useState, useEffect } from "react";
import { useTingkatan, type Tingkatan } from "@/hooks/use-tingkatan";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { ClassLevelForm } from "@/components/admin/class-levels/class-level-form";
import { ClassLevelList } from "@/components/admin/class-levels/class-level-list";

export default function ClassLevelsPage() {
  const {
    data: levels,
    loading,
    fetchTingkatan,
    createTingkatan,
    updateTingkatan,
    deleteTingkatan,
  } = useTingkatan();

  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [formData, setFormData] = useState({
    namaTingkat: "",
    level: "",
    keterangan: "",
  });
  const [selectedLevel, setSelectedLevel] = useState<Tingkatan | null>(null);

  useEffect(() => {
    fetchTingkatan();
  }, [fetchTingkatan]);

  const resetForm = () => {
    setFormData({ namaTingkat: "", level: "", keterangan: "" });
    setSelectedLevel(null);
  };

  const handleAdd = async () => {
    const success = await createTingkatan({
      ...formData,
      level: Number(formData.level),
    });
    if (success) {
      setIsAddOpen(false);
      resetForm();
    }
  };

  const handleEdit = async () => {
    if (!selectedLevel) return;
    const success = await updateTingkatan(selectedLevel.id, {
      ...formData,
      level: Number(formData.level),
    });
    if (success) {
      setIsEditOpen(false);
      resetForm();
    }
  };

  const openEdit = (level: Tingkatan) => {
    setSelectedLevel(level);
    setFormData({
      namaTingkat: level.namaTingkat,
      level: String(level.level),
      keterangan: level.keterangan || "",
    });
    setIsEditOpen(true);
  };

  return (
    <div className="p-8 space-y-8 bg-gray-50/50 min-h-screen">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight">
            Manajemen Tingkatan Kelas
          </h1>
          <p className="text-gray-500 mt-2">
            Kelola tingkatan dan jenjang kelas di sekolah.
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
          Tambah Tingkatan
        </Button>
      </div>

      <ClassLevelList
        levels={levels}
        loading={loading}
        onEdit={openEdit}
        onDelete={deleteTingkatan}
      />

      <ClassLevelForm
        isOpen={isAddOpen}
        onOpenChange={setIsAddOpen}
        formData={formData}
        setFormData={setFormData}
        onSubmit={handleAdd}
        loading={loading}
        editingId={null}
      />

      <ClassLevelForm
        isOpen={isEditOpen}
        onOpenChange={setIsEditOpen}
        formData={formData}
        setFormData={setFormData}
        onSubmit={handleEdit}
        loading={loading}
        editingId={selectedLevel?.id || null}
      />
    </div>
  );
}
