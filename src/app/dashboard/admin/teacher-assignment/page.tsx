"use client";

import { useState, useEffect } from "react";
import { usePenugasan, type Penugasan } from "@/hooks/use-penugasan";
import { useGuru } from "@/hooks/use-guru";
import { useKelas } from "@/hooks/use-kelas";
import { useMapel } from "@/hooks/use-mapel";
import { useTahunAjaran } from "@/hooks/use-tahun-ajaran";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Loader2, Plus, School } from "lucide-react";
import { AssignmentForm } from "@/components/admin/teacher-assignment/assignment-form";
import { AssignmentTable } from "@/components/admin/teacher-assignment/assignment-table";

export default function TeacherAssignmentPage() {
  const {
    data: assignments,
    loading,
    fetchPenugasan,
    createPenugasan,
    updatePenugasan,
    deletePenugasan,
  } = usePenugasan();

  const { data: teachers, fetchGuru } = useGuru();
  const { data: classes, fetchKelas } = useKelas();
  const { data: subjects, fetchMapel } = useMapel();
  const { data: academicYears, fetchTahunAjaran } = useTahunAjaran();

  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [formData, setFormData] = useState({
    guruId: "",
    kelasId: "",
    mapelId: "",
    tahunAjaranId: "",
  });
  const [selectedAssignment, setSelectedAssignment] =
    useState<Penugasan | null>(null);

  useEffect(() => {
    fetchPenugasan();
    fetchGuru(1, 100);
    fetchKelas();
    fetchMapel();
    fetchTahunAjaran();
  }, [fetchPenugasan, fetchGuru, fetchKelas, fetchMapel, fetchTahunAjaran]);

  const activeYear = academicYears.find((y) => y.isActive);

  useEffect(() => {
    if (isAddOpen && activeYear) {
      setFormData((prev) => ({ ...prev, tahunAjaranId: activeYear.id }));
    }
  }, [isAddOpen, activeYear]);

  const resetForm = () => {
    setFormData({
      guruId: "",
      kelasId: "",
      mapelId: "",
      tahunAjaranId: activeYear?.id || "",
    });
    setSelectedAssignment(null);
  };

  const handleAdd = async () => {
    const success = await createPenugasan(formData);
    if (success) {
      setIsAddOpen(false);
      resetForm();
    }
  };

  const handleEdit = async () => {
    if (!selectedAssignment) return;
    const success = await updatePenugasan(selectedAssignment.id, formData);
    if (success) {
      setIsEditOpen(false);
      resetForm();
    }
  };

  const openEdit = (assignment: Penugasan) => {
    setSelectedAssignment(assignment);
    setFormData({
      guruId: assignment.guruId,
      kelasId: assignment.kelasId,
      mapelId: assignment.mapelId,
      tahunAjaranId: assignment.tahunAjaranId || activeYear?.id || "",
    });
    setIsEditOpen(true);
  };

  const handleDelete = async (id: string) => {
    await deletePenugasan(id);
  };

  return (
    <div className="p-8 space-y-8 bg-gray-50/50 min-h-screen">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight">
            Manajemen Penugasan Guru
          </h1>
          <p className="text-gray-500 mt-2">
            Tentukan guru pengampu untuk setiap mata pelajaran dan kelas.
          </p>
        </div>
        <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
          <DialogTrigger asChild>
            <Button
              className="bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-600/20 transition-all hover:scale-105"
              onClick={resetForm}
            >
              <Plus className="w-4 h-4 mr-2" />
              Tambah Penugasan
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Tambah Penugasan Guru</DialogTitle>
              <DialogDescription>
                Tetapkan guru untuk mengajar mata pelajaran di kelas tertentu.
              </DialogDescription>
            </DialogHeader>
            <AssignmentForm
              formData={formData}
              setFormData={setFormData}
              teachers={teachers}
              subjects={subjects}
              classes={classes}
            />
            <DialogFooter>
              <Button
                type="submit"
                onClick={handleAdd}
                disabled={
                  loading ||
                  !formData.guruId ||
                  !formData.mapelId ||
                  !formData.kelasId
                }
              >
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Menyimpan...
                  </>
                ) : (
                  "Simpan"
                )}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-6 border-b border-gray-200 flex flex-col sm:flex-row justify-between items-center gap-4 bg-gray-50/30">
          <div className="flex items-center gap-2">
            <School className="w-5 h-5 text-blue-600" />
            <h2 className="text-lg font-semibold text-gray-900">
              Daftar Penugasan
            </h2>
          </div>
          <div className="text-sm text-gray-500">
            Total:{" "}
            <span className="font-semibold text-gray-900">
              {assignments.length} Penugasan
            </span>
          </div>
        </div>

        <AssignmentTable
          loading={loading}
          assignments={assignments}
          onEdit={openEdit}
          onDelete={handleDelete}
        />
      </div>

      <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Edit Penugasan</DialogTitle>
            <DialogDescription>
              Perbarui informasi penugasan guru.
            </DialogDescription>
          </DialogHeader>
          <AssignmentForm
            formData={formData}
            setFormData={setFormData}
            teachers={teachers}
            subjects={subjects}
            classes={classes}
          />
          <DialogFooter>
            <Button
              type="submit"
              onClick={handleEdit}
              disabled={
                loading ||
                !formData.guruId ||
                !formData.mapelId ||
                !formData.kelasId
              }
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Menyimpan...
                </>
              ) : (
                "Simpan Perubahan"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
