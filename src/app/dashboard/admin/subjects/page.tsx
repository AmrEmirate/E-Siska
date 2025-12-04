"use client";

import { useState, useEffect } from "react";
import { useMapel, type Mapel } from "@/hooks/use-mapel";
import { FormulaEditorModal } from "@/components/dashboard/admin/subjects/formula-editor-modal";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { SubjectForm } from "@/components/admin/subjects/subject-form";
import { SubjectList } from "@/components/admin/subjects/subject-list";

export default function SubjectsManagementPage() {
  const {
    data: subjects,
    loading,
    fetchMapel,
    createMapel,
    updateMapel,
    deleteMapel,
  } = useMapel();

  const [selectedMapel, setSelectedMapel] = useState<{
    id: string;
    name: string;
  } | null>(null);
  const [isFormulaModalOpen, setIsFormulaModalOpen] = useState(false);

  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [formData, setFormData] = useState({
    namaMapel: "",
    kategori: "WAJIB",
  });
  const [editingId, setEditingId] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchMapel(searchTerm);
  }, [fetchMapel, searchTerm]);

  const resetForm = () => {
    setFormData({ namaMapel: "", kategori: "WAJIB" });
    setEditingId(null);
  };

  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateForm = () => {
    if (!formData.namaMapel || !formData.kategori) {
      alert("Mohon lengkapi data wajib (Nama Mapel, Kategori)");
      return false;
    }
    return true;
  };

  const handleAdd = async () => {
    if (!validateForm()) return;
    setIsSubmitting(true);
    const success = await createMapel(formData);
    setIsSubmitting(false);
    if (success) {
      setIsAddOpen(false);
      resetForm();
    }
  };

  const handleEdit = async () => {
    if (!editingId) return;
    if (!validateForm()) return;
    setIsSubmitting(true);
    const success = await updateMapel(editingId, formData);
    setIsSubmitting(false);
    if (success) {
      setIsEditOpen(false);
      resetForm();
    }
  };

  const openEdit = (mapel: Mapel) => {
    setFormData({
      namaMapel: mapel.namaMapel,
      kategori: (mapel as any).kategori || "WAJIB",
    });
    setEditingId(mapel.id);
    setIsEditOpen(true);
  };

  const handleDelete = async (id: string) => {
    await deleteMapel(id);
  };

  const openFormulaEditor = (mapel: Mapel) => {
    setSelectedMapel({ id: mapel.id, name: mapel.namaMapel });
    setIsFormulaModalOpen(true);
  };

  return (
    <div className="p-8 space-y-8 bg-gray-50/50 min-h-screen">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight">
            Manajemen Mata Pelajaran
          </h1>
          <p className="text-gray-500 mt-2">
            Kelola mata pelajaran dan skema penilaian.
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
          Tambah Mapel
        </Button>
      </div>

      <SubjectList
        subjects={subjects}
        loading={loading}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        onEdit={openEdit}
        onDelete={handleDelete}
        onOpenFormula={openFormulaEditor}
      />

      <SubjectForm
        isOpen={isAddOpen}
        onOpenChange={setIsAddOpen}
        formData={formData}
        setFormData={setFormData}
        onSubmit={handleAdd}
        loading={loading}
        isSubmitting={isSubmitting}
        editingId={null}
      />

      <SubjectForm
        isOpen={isEditOpen}
        onOpenChange={setIsEditOpen}
        formData={formData}
        setFormData={setFormData}
        onSubmit={handleEdit}
        loading={loading}
        isSubmitting={isSubmitting}
        editingId={editingId}
      />

      {selectedMapel && (
        <FormulaEditorModal
          isOpen={isFormulaModalOpen}
          onClose={() => setIsFormulaModalOpen(false)}
          mapelId={selectedMapel.id}
          mapelName={selectedMapel.name}
        />
      )}
    </div>
  );
}
