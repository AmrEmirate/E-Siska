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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Loader2 } from "lucide-react";

interface SubjectFormProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  formData: {
    namaMapel: string;
    kategori: string;
  };
  setFormData: (data: any) => void;
  onSubmit: () => void;
  loading: boolean;
  isSubmitting: boolean;
  editingId: string | null;
}

export const SubjectForm = ({
  isOpen,
  onOpenChange,
  formData,
  setFormData,
  onSubmit,
  loading,
  isSubmitting,
  editingId,
}: SubjectFormProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px] bg-white">
        <DialogHeader>
          <DialogTitle>
            {editingId ? "Edit Mata Pelajaran" : "Tambah Mata Pelajaran"}
          </DialogTitle>
          <DialogDescription>
            {editingId
              ? "Perbarui informasi mata pelajaran."
              : "Tambahkan mata pelajaran baru ke dalam kurikulum."}
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
                <SelectItem value="EKSTRAKURIKULER">Ekstrakurikuler</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <DialogFooter>
          <Button
            type="submit"
            onClick={onSubmit}
            disabled={loading || isSubmitting || !formData.namaMapel}
          >
            {loading || isSubmitting ? (
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
