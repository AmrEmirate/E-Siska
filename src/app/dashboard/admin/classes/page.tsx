"use client";
import { useState, useEffect } from "react";
import { useKelas, type Kelas } from "@/hooks/use-kelas";
import { useGuru } from "@/hooks/use-guru";
import { useTingkatan } from "@/hooks/use-tingkatan";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Plus, Search } from "lucide-react";
import { ClassForm } from "@/components/admin/classes/class-form";
import { ClassList } from "@/components/admin/classes/class-list";
export default function ClassesManagementPage() {
  const {
    data: classes,
    loading,
    fetchKelas,
    createKelas,
    updateKelas,
    deleteKelas,
  } = useKelas();
  const { data: teachers, fetchGuru } = useGuru();
  const { data: levels, fetchTingkatan } = useTingkatan();
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [selectedClass, setSelectedClass] = useState<Kelas | null>(null);
  const [formData, setFormData] = useState<Partial<Kelas>>({
    namaKelas: "",
    tingkatanId: "",
    waliKelasId: "",
  });
  const [searchTerm, setSearchTerm] = useState("");
  useEffect(() => {
    fetchKelas(searchTerm);
    fetchGuru(1, 100);
    fetchTingkatan();
  }, [fetchKelas, fetchGuru, fetchTingkatan, searchTerm]);
  const resetForm = () => {
    setFormData({
      namaKelas: "",
      tingkatanId: "",
      waliKelasId: "",
    });
    setSelectedClass(null);
  };
  const [isSubmitting, setIsSubmitting] = useState(false);
  const validateForm = () => {
    if (!formData.namaKelas || !formData.tingkatanId) {
      alert("Mohon lengkapi data wajib (Nama Kelas, Tingkatan)");
      return false;
    }
    return true;
  };
  const handleAdd = async () => {
    if (!validateForm()) return;
    setIsSubmitting(true);
    const success = await createKelas(formData);
    setIsSubmitting(false);
    if (success) {
      setIsAddOpen(false);
      resetForm();
    }
  };
  const handleEdit = async () => {
    if (!selectedClass) return;
    if (!validateForm()) return;
    setIsSubmitting(true);
    const success = await updateKelas(selectedClass.id, formData);
    setIsSubmitting(false);
    if (success) {
      setIsEditOpen(false);
      resetForm();
    }
  };
  const openEdit = (cls: Kelas) => {
    setSelectedClass(cls);
    setFormData({
      namaKelas: cls.namaKelas,
      tingkatanId: cls.tingkatanId,
      waliKelasId: cls.waliKelasId || "",
    });
    setIsEditOpen(true);
  };
  const usedTeacherIds = classes
    .map((c) => c.waliKelasId)
    .filter((id): id is string => !!id);
  const getAvailableTeachers = (currentTeacherId?: string) => {
    return teachers.filter(
      (teacher) =>
        !usedTeacherIds.includes(teacher.id) || teacher.id === currentTeacherId
    );
  };
  return (
    <div className="p-8 space-y-8 bg-gray-50/50 min-h-screen">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight">
            Manajemen Kelas
          </h1>
          <p className="text-gray-500 mt-2">
            Kelola data kelas dan penempatan siswa.
          </p>
        </div>
        <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
          <DialogTrigger asChild>
            <Button
              className="bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-600/20 transition-all hover:scale-105"
              onClick={resetForm}
            >
              <Plus className="w-4 h-4 mr-2" />
              Tambah Kelas
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Tambah Kelas Baru</DialogTitle>
              <DialogDescription>
                Buat kelas baru dan tentukan wali kelasnya.
              </DialogDescription>
            </DialogHeader>
            <ClassForm
              formData={formData}
              setFormData={setFormData}
              levels={levels}
              availableTeachers={getAvailableTeachers()}
            />
            <DialogFooter>
              <Button
                type="submit"
                onClick={handleAdd}
                className="w-full sm:w-auto"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Menyimpan..." : "Simpan Data"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-4 flex items-center gap-4 bg-gray-50/30">
          <div className="relative w-full sm:max-w-sm">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Cari kelas..."
              className="pl-10 bg-white"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </div>
      <ClassList
        loading={loading}
        classes={classes}
        onEdit={openEdit}
        onDelete={deleteKelas}
      />
      <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Edit Data Kelas</DialogTitle>
            <DialogDescription>
              Perbarui informasi kelas di bawah ini.
            </DialogDescription>
          </DialogHeader>
          <ClassForm
            formData={formData}
            setFormData={setFormData}
            levels={levels}
            availableTeachers={getAvailableTeachers(selectedClass?.waliKelasId)}
          />
          <DialogFooter>
            <Button
              type="submit"
              onClick={handleEdit}
              className="w-full sm:w-auto"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Menyimpan..." : "Simpan Perubahan"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
