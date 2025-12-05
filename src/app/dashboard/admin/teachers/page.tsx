"use client";

import { useState, useEffect } from "react";
import { useGuru, type Guru } from "@/hooks/use-guru";
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
import { ImportDialog } from "@/components/import-dialog";
import { TeacherForm } from "@/components/admin/teachers/teacher-form";
import { TeacherTable } from "@/components/admin/teachers/teacher-table";

export default function TeachersManagementPage() {
  const {
    data: teachers,
    meta,
    loading,
    fetchGuru,
    createGuru,
    updateGuru,
    deleteGuru,
  } = useGuru();
  const [search, setSearch] = useState("");
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);

  const [selectedTeacher, setSelectedTeacher] = useState<Guru | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState<Partial<Guru>>({
    nip: "",
    nama: "",
    email: "",
    jenisKelamin: "L",
    agama: "Islam",
    tempatLahir: "",
    tanggalLahir: "",
    noTelp: "",
    nik: "",
    nuptk: "",
    statusKepegawaian: "PNS",
    alamat: "",
    isAktif: true,
  });

  useEffect(() => {
    fetchGuru(1, 10, search);
  }, [fetchGuru, search]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const resetForm = () => {
    setFormData({
      nip: "",
      nama: "",
      email: "",
      jenisKelamin: "L",
      agama: "Islam",
      tempatLahir: "",
      tanggalLahir: "",
      noTelp: "",
      nik: "",
      nuptk: "",
      statusKepegawaian: "PNS",
      alamat: "",
      isAktif: true,
    });
    setSelectedTeacher(null);
  };

  const validateForm = () => {
    if (
      !formData.nip ||
      !formData.nama ||
      !formData.jenisKelamin ||
      !formData.agama
    ) {
      alert("Mohon lengkapi data wajib (NIP, Nama, Jenis Kelamin, Agama)");
      return false;
    }
    return true;
  };

  const handleAdd = async () => {
    if (!validateForm()) return;
    setIsSubmitting(true);
    const success = await createGuru(formData);
    setIsSubmitting(false);
    if (success) {
      setIsAddOpen(false);
      resetForm();
    }
  };

  const handleEdit = async () => {
    if (!selectedTeacher) return;
    if (!validateForm()) return;
    setIsSubmitting(true);
    const success = await updateGuru(selectedTeacher.id, formData);
    setIsSubmitting(false);
    if (success) {
      setIsEditOpen(false);
      resetForm();
    }
  };

  const openEdit = (teacher: Guru) => {
    setSelectedTeacher(teacher);
    setFormData({
      nip: teacher.nip,
      nama: teacher.nama,
      email: teacher.email,
      jenisKelamin: teacher.jenisKelamin,
      agama: teacher.agama,
      tempatLahir: teacher.tempatLahir,
      tanggalLahir: teacher.tanggalLahir
        ? new Date(teacher.tanggalLahir).toISOString().split("T")[0]
        : "",
      noTelp: teacher.noTelp,
      nik: teacher.nik,
      nuptk: teacher.nuptk,
      statusKepegawaian: teacher.statusKepegawaian,
      alamat: teacher.alamat,
      isAktif: teacher.isAktif,
    });
    setIsEditOpen(true);
  };

  return (
    <div className="p-4 sm:p-8 space-y-6 sm:space-y-8 bg-gray-50/50 min-h-screen">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight">
            Manajemen Guru
          </h1>
          <p className="text-sm sm:text-base text-gray-500 mt-2">
            Kelola data, status, dan penugasan guru.
          </p>
        </div>
        <div className="flex gap-2">
          <ImportDialog
            title="Import Data Guru"
            endpoint="/guru/import"
            onSuccess={() => fetchGuru(1, 10, search)}
            triggerLabel="Import Excel"
            formatInfo={{
              columns: [
                { name: "NIP", required: true, description: "Nomor Induk Pegawai (wajib)" },
                { name: "Nama", required: true, description: "Nama lengkap guru" },
                { name: "Email", required: false, description: "Alamat email" },
                { name: "Jenis Kelamin", required: false, description: "L (Laki-laki) atau P (Perempuan)" },
                { name: "Agama", required: false, description: "Islam, Kristen, Katolik, Hindu, Buddha, Konghucu" },
                { name: "No Telp", required: false, description: "Nomor telepon" },
                { name: "Status Kepegawaian", required: false, description: "PNS, Honorer, dll" },
              ]
            }}
          />
          <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
            <DialogTrigger asChild>
              <Button
                className="bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-600/20 transition-all hover:scale-105"
                onClick={resetForm}
              >
                <Plus className="w-4 h-4 mr-2" />
                Tambah Guru
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Tambah Guru Baru</DialogTitle>
                <DialogDescription>
                  Masukkan informasi lengkap guru baru di bawah ini.
                </DialogDescription>
              </DialogHeader>
              <TeacherForm formData={formData} setFormData={setFormData} />
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
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-6 border-b border-gray-200 flex flex-col sm:flex-row justify-between items-center gap-4 bg-gray-50/30">
          <div className="relative w-full sm:max-w-sm">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Cari berdasarkan NIP atau Nama..."
              className="pl-10 bg-white"
              value={search}
              onChange={handleSearch}
            />
          </div>
          <div className="text-sm text-gray-500">
            Total:{" "}
            <span className="font-semibold text-gray-900">
              {meta.total} Guru
            </span>
          </div>
        </div>

        <TeacherTable
          loading={loading}
          teachers={teachers}
          onEdit={openEdit}
          onDelete={deleteGuru}
        />

        <div className="p-4 border-t border-gray-200 flex justify-between items-center bg-gray-50/30">
          <div className="text-sm text-gray-500">
            Halaman {meta.page} dari {meta.totalPages || 1}
          </div>
          <div className="space-x-2">
            <Button
              variant="outline"
              size="sm"
              disabled={meta.page === 1}
              onClick={() => fetchGuru(meta.page - 1, meta.limit, search)}
              className="bg-white"
            >
              Sebelumnya
            </Button>
            <Button
              variant="outline"
              size="sm"
              disabled={meta.page >= meta.totalPages}
              onClick={() => fetchGuru(meta.page + 1, meta.limit, search)}
              className="bg-white"
            >
              Selanjutnya
            </Button>
          </div>
        </div>
      </div>

      <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
        <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Edit Data Guru</DialogTitle>
            <DialogDescription>
              Perbarui informasi guru di bawah ini.
            </DialogDescription>
          </DialogHeader>
          <TeacherForm formData={formData} setFormData={setFormData} isEdit />
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
