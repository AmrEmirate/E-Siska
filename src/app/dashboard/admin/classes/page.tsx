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
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Label } from "@/components/ui/label";
import { Pencil, Trash2, Plus, Users, Search } from "lucide-react";

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
    fetchGuru(1, 100); // Fetch all teachers for dropdown
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
            <div className="grid gap-6 py-4">
              <div className="space-y-2">
                <Label htmlFor="nama">Nama Kelas</Label>
                <Input
                  id="nama"
                  placeholder="Contoh: X IPA 1"
                  value={formData.namaKelas}
                  onChange={(e) =>
                    setFormData({ ...formData, namaKelas: e.target.value })
                  }
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="tingkatan">Tingkatan</Label>
                  <select
                    id="tingkatan"
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    value={formData.tingkatanId}
                    onChange={(e) =>
                      setFormData({ ...formData, tingkatanId: e.target.value })
                    }
                  >
                    <option value="">Pilih Tingkatan</option>
                    {levels.map((level) => (
                      <option key={level.id} value={level.id}>
                        {level.namaTingkat}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="wali">Wali Kelas</Label>
                  <select
                    id="wali"
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    value={formData.waliKelasId}
                    onChange={(e) =>
                      setFormData({ ...formData, waliKelasId: e.target.value })
                    }
                  >
                    <option value="">Pilih Wali Kelas</option>
                    {getAvailableTeachers().map((teacher) => (
                      <option key={teacher.id} value={teacher.id}>
                        {teacher.nama}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
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

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="bg-white border border-gray-200 rounded-xl p-6 h-48 animate-pulse"
            >
              <div className="h-6 w-1/3 bg-gray-200 rounded mb-4" />
              <div className="h-4 w-1/2 bg-gray-200 rounded mb-8" />
              <div className="h-4 w-full bg-gray-200 rounded mt-auto" />
            </div>
          ))}
        </div>
      ) : classes.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-xl border border-dashed border-gray-300">
          <div className="flex flex-col items-center justify-center gap-2">
            <Users className="w-12 h-12 text-gray-300" />
            <h3 className="text-lg font-medium text-gray-900">
              Belum ada data kelas
            </h3>
            <p className="text-gray-500">
              Mulai dengan menambahkan kelas baru.
            </p>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {classes.map((cls) => (
            <div
              key={cls.id}
              className="group bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg hover:border-blue-200 transition-all duration-200 relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity flex gap-1">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 hover:bg-blue-50 hover:text-blue-600"
                  onClick={() => openEdit(cls)}
                >
                  <Pencil className="w-4 h-4" />
                </Button>

                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 hover:bg-red-50 hover:text-red-600"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Hapus Kelas?</AlertDialogTitle>
                      <AlertDialogDescription>
                        Tindakan ini akan menghapus kelas{" "}
                        <strong>{cls.namaKelas}</strong>. Pastikan tidak ada
                        siswa yang terdaftar di kelas ini sebelum menghapus.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Batal</AlertDialogCancel>
                      <AlertDialogAction
                        onClick={() => deleteKelas(cls.id)}
                        className="bg-red-600 hover:bg-red-700"
                      >
                        Hapus
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>

              <div className="mb-6">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="text-2xl font-bold text-gray-900">
                    {cls.namaKelas}
                  </h3>
                  <span className="px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-600 border border-gray-200">
                    {cls.tingkatan?.namaTingkat || "N/A"}
                  </span>
                </div>
                <p className="text-sm text-gray-500">Tahun Ajaran Aktif</p>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-blue-50/50 rounded-lg border border-blue-100">
                  <div className="flex items-center text-blue-700">
                    <Users className="w-4 h-4 mr-2" />
                    <span className="text-sm font-medium">Total Siswa</span>
                  </div>
                  <span className="text-lg font-bold text-blue-700">
                    {cls._count?.Penempatan || 0}
                  </span>
                </div>

                <div className="pt-4 border-t border-gray-100">
                  <p className="text-xs text-gray-500 uppercase tracking-wide font-medium mb-2">
                    Wali Kelas
                  </p>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 font-medium text-xs">
                      {cls.waliKelas?.nama ? cls.waliKelas.nama.charAt(0) : "?"}
                    </div>
                    <p className="text-sm font-medium text-gray-900 truncate flex-1">
                      {cls.waliKelas?.nama || "Belum ditentukan"}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Edit Data Kelas</DialogTitle>
            <DialogDescription>
              Perbarui informasi kelas di bawah ini.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-6 py-4">
            <div className="space-y-2">
              <Label htmlFor="edit-nama">Nama Kelas</Label>
              <Input
                id="edit-nama"
                value={formData.namaKelas}
                onChange={(e) =>
                  setFormData({ ...formData, namaKelas: e.target.value })
                }
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="edit-tingkatan">Tingkatan</Label>
                <select
                  id="edit-tingkatan"
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  value={formData.tingkatanId}
                  onChange={(e) =>
                    setFormData({ ...formData, tingkatanId: e.target.value })
                  }
                >
                  <option value="">Pilih Tingkatan</option>
                  {levels.map((level) => (
                    <option key={level.id} value={level.id}>
                      {level.namaTingkat}
                    </option>
                  ))}
                </select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-wali">Wali Kelas</Label>
                <select
                  id="edit-wali"
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  value={formData.waliKelasId}
                  onChange={(e) =>
                    setFormData({ ...formData, waliKelasId: e.target.value })
                  }
                >
                  <option value="">Pilih Wali Kelas</option>
                  {getAvailableTeachers(selectedClass?.waliKelasId).map(
                    (teacher) => (
                      <option key={teacher.id} value={teacher.id}>
                        {teacher.nama}
                      </option>
                    )
                  )}
                </select>
              </div>
            </div>
          </div>
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
