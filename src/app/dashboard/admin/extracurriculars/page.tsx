"use client";

import { useState, useEffect } from "react";
import { useMapel, type Mapel } from "@/hooks/use-mapel";
import { Button } from "@/components/ui/button";
import { Plus, Search, Edit, Trash2, Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

export default function ExtracurricularsPage() {
  const {
    data: allMapel,
    loading,
    fetchMapel,
    createMapel,
    updateMapel,
    deleteMapel,
  } = useMapel();

  const [searchTerm, setSearchTerm] = useState("");
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [formData, setFormData] = useState({ namaMapel: "" });
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    fetchMapel();
  }, [fetchMapel]);

  const extracurriculars = allMapel.filter(
    (m: any) => m.kategori === "EKSTRAKURIKULER"
  );

  const filteredData = extracurriculars.filter((item: Mapel) =>
    item.namaMapel.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const resetForm = () => {
    setFormData({ namaMapel: "" });
    setEditingId(null);
  };

  const handleAdd = async () => {
    if (!formData.namaMapel.trim()) {
      alert("Mohon isi nama ekstrakurikuler");
      return;
    }
    setIsSubmitting(true);
    const success = await createMapel({
      namaMapel: formData.namaMapel,
      kategori: "EKSTRAKURIKULER",
    });
    setIsSubmitting(false);
    if (success) {
      setIsAddOpen(false);
      resetForm();
    }
  };

  const handleEdit = async () => {
    if (!editingId || !formData.namaMapel.trim()) return;
    setIsSubmitting(true);
    const success = await updateMapel(editingId, {
      namaMapel: formData.namaMapel,
      kategori: "EKSTRAKURIKULER",
    });
    setIsSubmitting(false);
    if (success) {
      setIsEditOpen(false);
      resetForm();
    }
  };

  const openEdit = (item: Mapel) => {
    setFormData({ namaMapel: item.namaMapel });
    setEditingId(item.id);
    setIsEditOpen(true);
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    await deleteMapel(deleteId);
    setDeleteId(null);
  };

  return (
    <div className="p-8 space-y-8 bg-gray-50/50 min-h-screen">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight">
            Manajemen Ekstrakurikuler
          </h1>
          <p className="text-gray-500 mt-2">
            Kelola daftar kegiatan ekstrakurikuler sekolah.
          </p>
        </div>
        <Button
          className="bg-green-600 hover:bg-green-700 text-white shadow-lg"
          onClick={() => {
            resetForm();
            setIsAddOpen(true);
          }}
        >
          <Plus className="w-4 h-4 mr-2" />
          Tambah Ekskul
        </Button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Cari ekstrakurikuler..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          {loading ? (
            <div className="flex justify-center items-center py-12">
              <Loader2 className="animate-spin text-green-600" size={32} />
            </div>
          ) : filteredData.length === 0 ? (
            <div className="p-12 text-center text-gray-500">
              {searchTerm
                ? "Tidak ada ekstrakurikuler yang sesuai."
                : "Belum ada data ekstrakurikuler."}
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow className="bg-gray-50/50">
                  <TableHead className="w-16">No</TableHead>
                  <TableHead>Nama Ekstrakurikuler</TableHead>
                  <TableHead className="text-right w-32">Aksi</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredData.map((item: Mapel, idx: number) => (
                  <TableRow key={item.id} className="hover:bg-gray-50">
                    <TableCell className="font-medium">{idx + 1}</TableCell>
                    <TableCell className="font-medium">
                      {item.namaMapel}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => openEdit(item)}
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="text-red-600 hover:text-red-700"
                          onClick={() => setDeleteId(item.id)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </div>
      </div>

      <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Tambah Ekstrakurikuler</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <label className="block text-sm font-medium mb-2">
              Nama Ekstrakurikuler
            </label>
            <Input
              value={formData.namaMapel}
              onChange={(e) => setFormData({ namaMapel: e.target.value })}
              placeholder="Contoh: Pramuka, Futsal, Tari"
            />
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddOpen(false)}>
              Batal
            </Button>
            <Button onClick={handleAdd} disabled={isSubmitting}>
              {isSubmitting && (
                <Loader2 className="animate-spin mr-2 w-4 h-4" />
              )}
              Simpan
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Ekstrakurikuler</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <label className="block text-sm font-medium mb-2">
              Nama Ekstrakurikuler
            </label>
            <Input
              value={formData.namaMapel}
              onChange={(e) => setFormData({ namaMapel: e.target.value })}
            />
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditOpen(false)}>
              Batal
            </Button>
            <Button onClick={handleEdit} disabled={isSubmitting}>
              {isSubmitting && (
                <Loader2 className="animate-spin mr-2 w-4 h-4" />
              )}
              Update
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <AlertDialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Hapus Ekstrakurikuler?</AlertDialogTitle>
            <AlertDialogDescription>
              Tindakan ini tidak dapat dibatalkan. Data ekstrakurikuler akan
              dihapus secara permanen.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Batal</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className="bg-red-600 hover:bg-red-700"
            >
              Hapus
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
