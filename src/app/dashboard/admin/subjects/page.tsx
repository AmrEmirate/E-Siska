"use client";

import { useState, useEffect } from "react";
import { useMapel, type Mapel } from "@/hooks/use-mapel";
import { FormulaEditorModal } from "@/components/dashboard/admin/subjects/formula-editor-modal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
import {
  Settings,
  Trash2,
  Edit,
  Plus,
  Search,
  BookOpen,
  Info,
  Loader2,
  Pencil,
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

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
    fetchMapel();
  }, [fetchMapel]);

  const filteredSubjects = subjects.filter((subject) =>
    subject.namaMapel.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const resetForm = () => {
    setFormData({ namaMapel: "", kategori: "WAJIB" });
    setEditingId(null);
  };

  const handleAdd = async () => {
    const success = await createMapel(formData);
    if (success) {
      setIsAddOpen(false);
      resetForm();
    }
  };

  const handleEdit = async () => {
    if (!editingId) return;
    const success = await updateMapel(editingId, formData);
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
        <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
          <DialogTrigger asChild>
            <Button
              className="bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-600/20 transition-all hover:scale-105"
              onClick={resetForm}
            >
              <Plus className="w-4 h-4 mr-2" />
              Tambah Mapel
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px] bg-white">
            <DialogHeader>
              <DialogTitle>Tambah Mata Pelajaran</DialogTitle>
              <DialogDescription>
                Tambahkan mata pelajaran baru ke dalam kurikulum.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-6 py-4">
              <div className="space-y-2">
                <Label htmlFor="nama">Nama Mata Pelajaran</Label>
                <Input
                  id="nama"
                  placeholder="Contoh: Matematika"
                  value={formData.namaMapel}
                  onChange={(e) =>
                    setFormData({ ...formData, namaMapel: e.target.value })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="kategori">Kategori</Label>
                <Select
                  value={formData.kategori}
                  onValueChange={(value) =>
                    setFormData({ ...formData, kategori: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Pilih Kategori" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="WAJIB">Wajib</SelectItem>
                    <SelectItem value="MUATAN_LOKAL">Muatan Lokal</SelectItem>
                    <SelectItem value="EKSTRAKURIKULER">
                      Ekstrakurikuler
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <Button
                type="submit"
                onClick={handleAdd}
                disabled={loading || !formData.namaMapel}
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
          <div className="relative w-full sm:max-w-sm">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Cari mata pelajaran..."
              className="pl-10 bg-white"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="text-sm text-gray-500">
            Total:{" "}
            <span className="font-semibold text-gray-900">
              {filteredSubjects.length} Mapel
            </span>
          </div>
        </div>

        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="bg-gray-50/50 hover:bg-gray-50/50">
                <TableHead className="w-[300px]">Mata Pelajaran</TableHead>
                <TableHead>Kategori</TableHead>
                <TableHead>Skema Penilaian</TableHead>
                <TableHead className="text-right">Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading && subjects.length === 0 ? (
                [...Array(5)].map((_, i) => (
                  <TableRow key={i}>
                    <TableCell>
                      <div className="h-4 w-40 bg-gray-200 rounded animate-pulse" />
                    </TableCell>
                    <TableCell>
                      <div className="h-4 w-24 bg-gray-200 rounded animate-pulse" />
                    </TableCell>
                    <TableCell>
                      <div className="h-4 w-32 bg-gray-200 rounded animate-pulse" />
                    </TableCell>
                    <TableCell>
                      <div className="h-8 w-8 bg-gray-200 rounded animate-pulse ml-auto" />
                    </TableCell>
                  </TableRow>
                ))
              ) : filteredSubjects.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={4}
                    className="text-center py-12 text-gray-500"
                  >
                    <div className="flex flex-col items-center justify-center gap-2">
                      <BookOpen className="w-8 h-8 text-gray-300" />
                      <p>Belum ada mata pelajaran</p>
                    </div>
                  </TableCell>
                </TableRow>
              ) : (
                filteredSubjects.map((subject) => {
                  const kategori = (subject as any).kategori || "WAJIB";

                  return (
                    <TableRow
                      key={subject.id}
                      className="hover:bg-gray-50 transition-colors"
                    >
                      <TableCell className="font-medium text-gray-900">
                        <div className="flex items-center gap-3">
                          <div
                            className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold ${
                              kategori === "WAJIB"
                                ? "bg-red-100 text-red-700"
                                : kategori === "MUATAN_LOKAL"
                                ? "bg-blue-100 text-blue-700"
                                : "bg-green-100 text-green-700"
                            }`}
                          >
                            {subject.namaMapel.substring(0, 2).toUpperCase()}
                          </div>
                          {subject.namaMapel}
                        </div>
                      </TableCell>
                      <TableCell>
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${
                            kategori === "WAJIB"
                              ? "bg-red-50 text-red-700 border-red-100"
                              : kategori === "MUATAN_LOKAL"
                              ? "bg-blue-50 text-blue-700 border-blue-100"
                              : "bg-green-50 text-green-700 border-green-100"
                          }`}
                        >
                          {kategori.replace("_", " ")}
                        </span>
                      </TableCell>
                      <TableCell>
                        {kategori !== "EKSTRAKURIKULER" ? (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => openFormulaEditor(subject)}
                            className="h-8 text-blue-600 border-blue-200 hover:bg-blue-50 hover:text-blue-700"
                          >
                            <Settings className="w-3.5 h-3.5 mr-2" />
                            Atur Skema
                          </Button>
                        ) : (
                          <span className="text-gray-400 italic text-xs flex items-center gap-1">
                            <Info className="w-3 h-3" />
                            Penilaian Deskriptif
                          </span>
                        )}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 hover:bg-blue-50 hover:text-blue-600"
                            onClick={() => openEdit(subject)}
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
                                  Hapus Mata Pelajaran?
                                </AlertDialogTitle>
                                <AlertDialogDescription>
                                  Tindakan ini akan menghapus mata pelajaran{" "}
                                  <strong>{subject.namaMapel}</strong>. Data
                                  nilai terkait mungkin juga akan terhapus.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>Batal</AlertDialogCancel>
                                <AlertDialogAction
                                  onClick={() => handleDelete(subject.id)}
                                  className="bg-red-600 hover:bg-red-700"
                                >
                                  Hapus
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })
              )}
            </TableBody>
          </Table>
        </div>
      </div>

      <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
        <DialogContent className="sm:max-w-[500px] bg-white">
          <DialogHeader>
            <DialogTitle>Edit Mata Pelajaran</DialogTitle>
            <DialogDescription>
              Perbarui informasi mata pelajaran.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-6 py-4">
            <div className="space-y-2">
              <Label htmlFor="edit-nama">Nama Mata Pelajaran</Label>
              <Input
                id="edit-nama"
                value={formData.namaMapel}
                onChange={(e) =>
                  setFormData({ ...formData, namaMapel: e.target.value })
                }
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-kategori">Kategori</Label>
              <Select
                value={formData.kategori}
                onValueChange={(value) =>
                  setFormData({ ...formData, kategori: value })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Pilih Kategori" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="WAJIB">Wajib</SelectItem>
                  <SelectItem value="MUATAN_LOKAL">Muatan Lokal</SelectItem>
                  <SelectItem value="EKSTRAKURIKULER">
                    Ekstrakurikuler
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button
              type="submit"
              onClick={handleEdit}
              disabled={loading || !formData.namaMapel}
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
