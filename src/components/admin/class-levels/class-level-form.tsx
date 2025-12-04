import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Loader2 } from "lucide-react";

interface ClassLevelFormProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  formData: {
    namaTingkat: string;
    level: string;
    keterangan: string;
  };
  setFormData: (data: any) => void;
  onSubmit: () => void;
  loading: boolean;
  editingId: string | null;
}

export const ClassLevelForm = ({
  isOpen,
  onOpenChange,
  formData,
  setFormData,
  onSubmit,
  loading,
  editingId,
}: ClassLevelFormProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>
            {editingId ? "Edit Tingkatan" : "Tambah Tingkatan Baru"}
          </DialogTitle>
          <DialogDescription>
            {editingId
              ? "Perbarui informasi tingkatan kelas."
              : "Buat tingkatan kelas baru (contoh: Kelas 10, Kelas 11)."}
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-6 py-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="nama">Nama Tingkatan</Label>
              <Input
                id="nama"
                placeholder="Contoh: Kelas 10"
                value={formData.namaTingkat}
                onChange={(e) =>
                  setFormData({ ...formData, namaTingkat: e.target.value })
                }
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="level">Nomor Level</Label>
              <Input
                id="level"
                type="number"
                placeholder="10"
                value={formData.level}
                onChange={(e) =>
                  setFormData({ ...formData, level: e.target.value })
                }
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="keterangan">Deskripsi</Label>
            <Input
              id="keterangan"
              placeholder="Tingkat pertama sekolah menengah atas"
              value={formData.keterangan}
              onChange={(e) =>
                setFormData({ ...formData, keterangan: e.target.value })
              }
            />
          </div>
        </div>
        <DialogFooter>
          <Button
            type="submit"
            onClick={onSubmit}
            disabled={loading || !formData.namaTingkat || !formData.level}
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Menyimpan...
              </>
            ) : editingId ? (
              "Simpan Perubahan"
            ) : (
              "Simpan"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
