"use client";

import { useState, useEffect } from "react";
import { useGuru, type Guru } from "@/hooks/use-guru";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
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
import { Pencil, Trash2, Plus, Search } from "lucide-react";
import { Switch } from "@/components/ui/switch";

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

  const [formData, setFormData] = useState<Partial<Guru>>({
    nip: "",
    nama: "",
    email: "",
    jenisKelamin: "L",
    username: "",
    passwordDefault: "",
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
      username: "",
      passwordDefault: "",
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

  const handleAdd = async () => {
    const success = await createGuru(formData);
    if (success) {
      setIsAddOpen(false);
      resetForm();
    }
  };

  const handleEdit = async () => {
    if (!selectedTeacher) return;
    const success = await updateGuru(selectedTeacher.id, formData);
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
      username: teacher.username,
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

  const TeacherForm = ({ isEdit = false }: { isEdit?: boolean }) => (
    <div className="grid gap-6 py-4">
      <div className="space-y-2">
        <Label htmlFor="nama">Nama Lengkap dengan Gelar</Label>
        <Input
          id="nama"
          placeholder="Nama Guru"
          value={formData.nama}
          onChange={(e) => setFormData({ ...formData, nama: e.target.value })}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="jk">Jenis Kelamin</Label>
          <select
            id="jk"
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            value={formData.jenisKelamin}
            onChange={(e) =>
              setFormData({
                ...formData,
                jenisKelamin: e.target.value as "L" | "P",
              })
            }
          >
            <option value="L">Laki-laki</option>
            <option value="P">Perempuan</option>
          </select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="agama">Agama</Label>
          <select
            id="agama"
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            value={formData.agama}
            onChange={(e) =>
              setFormData({ ...formData, agama: e.target.value })
            }
          >
            <option value="Islam">Islam</option>
            <option value="Kristen">Kristen</option>
            <option value="Katolik">Katolik</option>
            <option value="Hindu">Hindu</option>
            <option value="Buddha">Buddha</option>
            <option value="Konghucu">Konghucu</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="tempatLahir">Tempat Lahir</Label>
          <Input
            id="tempatLahir"
            value={formData.tempatLahir}
            onChange={(e) =>
              setFormData({ ...formData, tempatLahir: e.target.value })
            }
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="tanggalLahir">Tanggal Lahir</Label>
          <Input
            id="tanggalLahir"
            type="date"
            value={formData.tanggalLahir}
            onChange={(e) =>
              setFormData({ ...formData, tanggalLahir: e.target.value })
            }
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="noTelp">No. Telepon</Label>
        <Input
          id="noTelp"
          value={formData.noTelp}
          onChange={(e) => setFormData({ ...formData, noTelp: e.target.value })}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          placeholder="guru@sekolah.sch.id"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="nik">NIK</Label>
        <Input
          id="nik"
          value={formData.nik}
          onChange={(e) => setFormData({ ...formData, nik: e.target.value })}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="nuptk">NUPTK</Label>
        <Input
          id="nuptk"
          value={formData.nuptk}
          onChange={(e) => setFormData({ ...formData, nuptk: e.target.value })}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="nip">NIP</Label>
        <Input
          id="nip"
          placeholder="19xxxxxxxx"
          value={formData.nip}
          onChange={(e) => {
            const val = e.target.value;
            setFormData({
              ...formData,
              nip: val,
              username: !isEdit ? val : formData.username,
            });
          }}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="statusKepegawaian">Status Pegawai</Label>
        <select
          id="statusKepegawaian"
          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          value={formData.statusKepegawaian}
          onChange={(e) =>
            setFormData({ ...formData, statusKepegawaian: e.target.value })
          }
        >
          <option value="PNS">PNS</option>
          <option value="Honorer">Honorer</option>
          <option value="GTY">GTY</option>
          <option value="GTT">GTT</option>
        </select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="alamat">Alamat</Label>
        <Textarea
          id="alamat"
          value={formData.alamat}
          onChange={(e) => setFormData({ ...formData, alamat: e.target.value })}
        />
      </div>

      <div className="space-y-2">
        <Label>Status</Label>
        <div className="flex items-center space-x-2">
          <Switch
            checked={formData.isAktif}
            onCheckedChange={(checked) =>
              setFormData({ ...formData, isAktif: checked })
            }
          />
          <Label>{formData.isAktif ? "Aktif" : "Non Aktif"}</Label>
        </div>
      </div>

      {!isEdit && (
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="username">Username Login</Label>
            <Input
              id="username"
              value={formData.username}
              onChange={(e) =>
                setFormData({ ...formData, username: e.target.value })
              }
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="passwordDefault">Password Default</Label>
            <Input
              id="passwordDefault"
              type="password"
              placeholder="Minimal 6 karakter"
              value={formData.passwordDefault}
              onChange={(e) =>
                setFormData({ ...formData, passwordDefault: e.target.value })
              }
            />
          </div>
        </div>
      )}
    </div>
  );

  return (
    <div className="p-8 space-y-8 bg-gray-50/50 min-h-screen">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight">
            Manajemen Guru
          </h1>
          <p className="text-gray-500 mt-2">
            Kelola data, status, dan penugasan guru.
          </p>
        </div>
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
            <TeacherForm />
            <DialogFooter>
              <Button
                type="submit"
                onClick={handleAdd}
                className="w-full sm:w-auto"
              >
                Simpan Data
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
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

        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="bg-gray-50/50 hover:bg-gray-50/50">
                <TableHead className="w-[150px]">NIP</TableHead>
                <TableHead>Nama Guru</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Wali Kelas</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                [...Array(5)].map((_, i) => (
                  <TableRow key={i}>
                    <TableCell>
                      <div className="h-4 w-24 bg-gray-200 rounded animate-pulse" />
                    </TableCell>
                    <TableCell>
                      <div className="h-4 w-32 bg-gray-200 rounded animate-pulse" />
                    </TableCell>
                    <TableCell>
                      <div className="h-4 w-40 bg-gray-200 rounded animate-pulse" />
                    </TableCell>
                    <TableCell>
                      <div className="h-4 w-20 bg-gray-200 rounded animate-pulse" />
                    </TableCell>
                    <TableCell>
                      <div className="h-4 w-16 bg-gray-200 rounded animate-pulse" />
                    </TableCell>
                    <TableCell>
                      <div className="h-8 w-8 bg-gray-200 rounded animate-pulse ml-auto" />
                    </TableCell>
                  </TableRow>
                ))
              ) : teachers.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={6}
                    className="text-center py-12 text-gray-500"
                  >
                    <div className="flex flex-col items-center justify-center gap-2">
                      <Search className="w-8 h-8 text-gray-300" />
                      <p>Tidak ada data guru yang ditemukan</p>
                    </div>
                  </TableCell>
                </TableRow>
              ) : (
                teachers.map((teacher) => (
                  <TableRow
                    key={teacher.id}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <TableCell className="font-medium font-mono text-gray-600">
                      {teacher.nip}
                    </TableCell>
                    <TableCell>
                      <div className="font-medium text-gray-900">
                        {teacher.nama}
                      </div>
                      <div className="text-xs text-gray-500">
                        {teacher.jenisKelamin === "L"
                          ? "Laki-laki"
                          : "Perempuan"}
                      </div>
                    </TableCell>
                    <TableCell className="text-gray-600">
                      {teacher.email || "-"}
                    </TableCell>
                    <TableCell>
                      {teacher.waliKelas ? (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-50 text-blue-700 border border-blue-100">
                          {teacher.waliKelas.namaKelas}
                        </span>
                      ) : (
                        <span className="text-gray-400 text-sm">-</span>
                      )}
                    </TableCell>
                    <TableCell>
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${
                          teacher.isAktif
                            ? "bg-green-50 text-green-700 border-green-100"
                            : "bg-gray-100 text-gray-700 border-gray-200"
                        }`}
                      >
                        <span
                          className={`w-1.5 h-1.5 rounded-full mr-1.5 ${
                            teacher.isAktif ? "bg-green-500" : "bg-gray-500"
                          }`}
                        />
                        {teacher.isAktif ? "Aktif" : "Non Aktif"}
                      </span>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 hover:bg-blue-50 hover:text-blue-600"
                          onClick={() => openEdit(teacher)}
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
                              <AlertDialogTitle>
                                Hapus Data Guru?
                              </AlertDialogTitle>
                              <AlertDialogDescription>
                                Tindakan ini akan menghapus data guru{" "}
                                <strong>{teacher.nama}</strong> secara permanen.
                                Akun pengguna terkait juga akan dihapus.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Batal</AlertDialogCancel>
                              <AlertDialogAction
                                onClick={() => deleteGuru(teacher.id)}
                                className="bg-red-600 hover:bg-red-700"
                              >
                                Hapus Permanen
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>

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
          <TeacherForm isEdit />
          <DialogFooter>
            <Button
              type="submit"
              onClick={handleEdit}
              className="w-full sm:w-auto"
            >
              Simpan Perubahan
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
