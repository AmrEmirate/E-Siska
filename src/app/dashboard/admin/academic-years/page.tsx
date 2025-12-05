"use client";

import { useState, useEffect } from "react";
import { useTahunAjaran, type TahunAjaran } from "@/hooks/use-tahun-ajaran";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { AcademicYearForm } from "@/components/admin/academic-years/academic-year-form";
import { AcademicYearList } from "@/components/admin/academic-years/academic-year-list";

export default function AcademicYearsPage() {
  const {
    data: years,
    loading,
    fetchTahunAjaran,
    createTahunAjaran,
    updateTahunAjaran,
    deleteTahunAjaran,
    setActiveTahunAjaran,
  } = useTahunAjaran();

  const { toast } = useToast();
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    tahun: "",
  });
  const [editingId, setEditingId] = useState<string | null>(null);

  useEffect(() => {
    fetchTahunAjaran();
  }, [fetchTahunAjaran]);

  const handleAdd = async () => {
    if (!formData.tahun.trim()) {
      toast({
        title: "Validasi Gagal",
        description: "Tahun ajaran harus diisi",
        variant: "destructive",
      });
      return;
    }

    if (editingId) {
      const success = await updateTahunAjaran(editingId, {
        nama: formData.tahun,
      });
      if (success) {
        setEditingId(null);
        setFormData({ tahun: "" });
        setShowForm(false);
      }
    } else {
      const success = await createTahunAjaran({
        nama: formData.tahun,
      });
      if (success) {
        setFormData({ tahun: "" });
        setShowForm(false);
      }
    }
  };

  const handleSetActive = async (id: string) => {
    await setActiveTahunAjaran(id);
  };

  const handleEdit = (year: TahunAjaran) => {
    setFormData({
      tahun: year.nama,
    });
    setEditingId(year.id);
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    await deleteTahunAjaran(id);
  };

  return (
    <div className="p-4 sm:p-8 space-y-8 bg-gray-50/50 min-h-screen">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight">
            Manajemen Tahun Ajaran
          </h1>
          <p className="text-gray-500 mt-2">
            Kelola tahun ajaran dan periode pembelajaran.
          </p>
        </div>
        <Button
          onClick={() => {
            setShowForm(!showForm);
            setEditingId(null);
            setFormData({ tahun: "" });
          }}
          className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-600/20 transition-all hover:scale-105"
        >
          {showForm ? (
            "Batal"
          ) : (
            <>
              <Plus className="w-4 h-4 mr-2" />
              Tambah Tahun Ajaran
            </>
          )}
        </Button>
      </div>

      {showForm && (
        <AcademicYearForm
          formData={formData}
          setFormData={setFormData}
          onSubmit={handleAdd}
          loading={loading}
          editingId={editingId}
        />
      )}

      <AcademicYearList
        years={years}
        loading={loading}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onSetActive={handleSetActive}
      />
    </div>
  );
}
