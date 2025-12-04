"use client";

import { useState, useEffect } from "react";
import { useSiswa, type Siswa } from "@/hooks/use-siswa";
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
import { StudentForm } from "@/components/admin/students/student-form";
import { StudentTable } from "@/components/admin/students/student-table";

export default function StudentsManagementPage() {
  const {
    data: students,
    meta,
    loading,
    fetchSiswa,
    createSiswa,
    updateSiswa,
    deleteSiswa,
  } = useSiswa();
  const [search, setSearch] = useState("");
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);

  const [selectedStudent, setSelectedStudent] = useState<Siswa | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState<Partial<Siswa>>({
    nisn: "",
    nama: "",
    jenisKelamin: "L",
    agama: "Islam",
    tempatLahir: "",
    tanggalLahir: "",
    pendidikanSebelumnya: "",
    alamat: "",
    namaAyah: "",
    pekerjaanAyah: "",
    namaIbu: "",
    pekerjaanIbu: "",
    alamatOrtu: "",
    namaWali: "",
    pekerjaanWali: "",
    alamatWali: "",
    status: "Aktif",
  });

  useEffect(() => {
    fetchSiswa(1, 10, search);
  }, [fetchSiswa, search]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const resetForm = () => {
    setFormData({
      nisn: "",
      nama: "",
      jenisKelamin: "L",
      agama: "Islam",
      tempatLahir: "",
      tanggalLahir: "",
      pendidikanSebelumnya: "",
      alamat: "",
      namaAyah: "",
      pekerjaanAyah: "",
      namaIbu: "",
      pekerjaanIbu: "",
      alamatOrtu: "",
      namaWali: "",
      pekerjaanWali: "",
      alamatWali: "",
      status: "Aktif",
    });
    setSelectedStudent(null);
  };

  const validateForm = () => {
    if (
      !formData.nisn ||
      !formData.nama ||
      !formData.jenisKelamin ||
      !formData.agama
    ) {
      alert("Mohon lengkapi data wajib (NISN, Nama, Jenis Kelamin, Agama)");
      return false;
    }
    return true;
  };

  const handleAdd = async () => {
    if (!validateForm()) return;
    setIsSubmitting(true);
    const success = await createSiswa(formData);
    setIsSubmitting(false);
    if (success) {
      setIsAddOpen(false);
      resetForm();
    }
  };

  const handleEdit = async () => {
    if (!selectedStudent) return;
    if (!validateForm()) return;
    setIsSubmitting(true);
    const success = await updateSiswa(selectedStudent.id, formData);
    setIsSubmitting(false);
    if (success) {
      setIsEditOpen(false);
      resetForm();
    }
  };

  const openEdit = (student: Siswa) => {
    setSelectedStudent(student);
    setFormData({
      nisn: student.nisn,
      nama: student.nama,
      jenisKelamin: student.jenisKelamin,
      agama: student.agama,
      tempatLahir: student.tempatLahir,
      tanggalLahir: student.tanggalLahir
        ? new Date(student.tanggalLahir).toISOString().split("T")[0]
        : "",
      pendidikanSebelumnya: student.pendidikanSebelumnya,
      alamat: student.alamat,
      namaAyah: student.namaAyah,
      pekerjaanAyah: student.pekerjaanAyah,
      namaIbu: student.namaIbu,
      pekerjaanIbu: student.pekerjaanIbu,
      alamatOrtu: student.alamatOrtu,
      namaWali: student.namaWali,
      pekerjaanWali: student.pekerjaanWali,
      alamatWali: student.alamatWali,
      status: student.status,
    });
    setIsEditOpen(true);
  };

  return (
    <div className="p-8 space-y-8 bg-gray-50/50 min-h-screen">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight">
            Manajemen Siswa
          </h1>
          <p className="text-gray-500 mt-2">
            Kelola data, status, dan informasi siswa.
          </p>
        </div>
        <div className="flex gap-2">
          <ImportDialog
            title="Import Data Siswa"
            endpoint="/siswa/import"
            onSuccess={() => fetchSiswa(1, 10, search)}
            triggerLabel="Import Excel"
          />
          <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
            <DialogTrigger asChild>
              <Button
                className="bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-600/20 transition-all hover:scale-105"
                onClick={resetForm}
              >
                <Plus className="w-4 h-4 mr-2" />
                Tambah Siswa
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Tambah Siswa Baru</DialogTitle>
                <DialogDescription>
                  Masukkan informasi lengkap siswa baru di bawah ini.
                </DialogDescription>
              </DialogHeader>
              <StudentForm formData={formData} setFormData={setFormData} />
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
              placeholder="Cari berdasarkan NISN atau Nama..."
              className="pl-10 bg-white"
              value={search}
              onChange={handleSearch}
            />
          </div>
          <div className="text-sm text-gray-500">
            Total:{" "}
            <span className="font-semibold text-gray-900">
              {meta.total} Siswa
            </span>
          </div>
        </div>

        <StudentTable
          loading={loading}
          students={students}
          onEdit={openEdit}
          onDelete={deleteSiswa}
        />

        <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
          <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Edit Data Siswa</DialogTitle>
              <DialogDescription>
                Perbarui informasi siswa di bawah ini.
              </DialogDescription>
            </DialogHeader>
            <StudentForm formData={formData} setFormData={setFormData} />
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
    </div>
  );
}
