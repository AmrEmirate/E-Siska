 import { Button } from "@/components/ui/button";
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

interface PlacementFormProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  formData: {
    siswaId: string;
    kelasId: string;
    tahunAjaranId: string;
  };
  setFormData: (data: any) => void;
  onSubmit: () => void;
  loading: boolean;
  isSubmitting: boolean;
  editingId: string | null;
  students: any[];
  classes: any[];
  academicYears: any[];
}

export const PlacementForm = ({
  isOpen,
  onOpenChange,
  formData,
  setFormData,
  onSubmit,
  loading,
  isSubmitting,
  editingId,
  students,
  classes,
  academicYears,
}: PlacementFormProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px] bg-white">
        <DialogHeader>
          <DialogTitle>
            {editingId ? "Pindahkan Siswa" : "Tempatkan Siswa"}
          </DialogTitle>
          <DialogDescription>
            {editingId
              ? "Pindahkan siswa ke kelas lain."
              : "Tempatkan siswa ke dalam kelas untuk tahun ajaran tertentu."}
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-6 py-4">
          <div className="space-y-2">
            <Label htmlFor="siswa">Siswa</Label>
            <Select
              value={formData.siswaId}
              onValueChange={(value) =>
                setFormData({ ...formData, siswaId: value })
              }
              disabled={!!editingId}
            >
              <SelectTrigger>
                <SelectValue placeholder="Pilih Siswa" />
              </SelectTrigger>
              <SelectContent>
                {students.map((student) => (
                  <SelectItem key={student.id} value={student.id}>
                    {student.nama} ({student.nisn})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="kelas">Kelas Tujuan</Label>
            <Select
              value={formData.kelasId}
              onValueChange={(value) =>
                setFormData({ ...formData, kelasId: value })
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Pilih Kelas" />
              </SelectTrigger>
              <SelectContent>
                {classes.map((kelas) => (
                  <SelectItem key={kelas.id} value={kelas.id}>
                    {kelas.namaKelas} - {kelas.tingkat}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="tahunAjaran">Tahun Ajaran</Label>
            <Select
              value={formData.tahunAjaranId}
              onValueChange={(value) =>
                setFormData({ ...formData, tahunAjaranId: value })
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Pilih Tahun Ajaran" />
              </SelectTrigger>
              <SelectContent>
                {academicYears.map((ta) => (
                  <SelectItem key={ta.id} value={ta.id}>
                    {ta.tahun} - {ta.semester} {ta.isActive ? "(Aktif)" : ""}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        <DialogFooter>
          <Button
            type="submit"
            onClick={onSubmit}
            disabled={loading || isSubmitting}
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
