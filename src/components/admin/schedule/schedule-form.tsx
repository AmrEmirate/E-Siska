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

interface ScheduleFormProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  formData: {
    kelasId: string;
    guruId: string;
    mapelId: string;
    ruanganId: string;
    hari: string;
    waktuMulai: string;
    waktuSelesai: string;
    tahunAjaranId: string;
  };
  setFormData: (data: any) => void;
  onSubmit: () => void;
  isSubmitting: boolean;
  editingId: string | null;
  classes: any[];
  teachers: any[];
  subjects: any[];
  rooms: any[];
  academicYears: any[];
  days: string[];
}

export const ScheduleForm = ({
  isOpen,
  onOpenChange,
  formData,
  setFormData,
  onSubmit,
  isSubmitting,
  editingId,
  classes,
  teachers,
  subjects,
  rooms,
  academicYears,
  days,
}: ScheduleFormProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>
            {editingId ? "Edit Jadwal" : "Tambah Jadwal Baru"}
          </DialogTitle>
          <DialogDescription>
            {editingId
              ? "Perbarui informasi jadwal pelajaran."
              : "Buat jadwal pelajaran baru untuk kelas tertentu."}
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-6 py-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="kelas">Kelas</Label>
              <select
                id="kelas"
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                value={formData.kelasId}
                onChange={(e) =>
                  setFormData({ ...formData, kelasId: e.target.value })
                }
              >
                <option value="">Pilih Kelas</option>
                {classes.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.namaKelas}
                  </option>
                ))}
              </select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="hari">Hari</Label>
              <select
                id="hari"
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                value={formData.hari}
                onChange={(e) =>
                  setFormData({ ...formData, hari: e.target.value })
                }
              >
                <option value="">Pilih Hari</option>
                {days.map((day) => (
                  <option key={day} value={day}>
                    {day}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="tahunAjaran">Tahun Ajaran</Label>
            <select
              id="tahunAjaran"
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              value={formData.tahunAjaranId}
              onChange={(e) =>
                setFormData({ ...formData, tahunAjaranId: e.target.value })
              }
            >
              <option value="">Pilih Tahun Ajaran</option>
              {academicYears.map((y) => (
                <option key={y.id} value={y.id}>
                  {y.tahun} - {y.semester} {y.isActive ? "(Aktif)" : ""}
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="jamMulai">Jam Mulai</Label>
              <Input
                id="jamMulai"
                type="time"
                value={formData.waktuMulai}
                onChange={(e) =>
                  setFormData({ ...formData, waktuMulai: e.target.value })
                }
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="jamSelesai">Jam Selesai</Label>
              <Input
                id="jamSelesai"
                type="time"
                value={formData.waktuSelesai}
                onChange={(e) =>
                  setFormData({ ...formData, waktuSelesai: e.target.value })
                }
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="mapel">Mata Pelajaran</Label>
            <select
              id="mapel"
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              value={formData.mapelId}
              onChange={(e) =>
                setFormData({ ...formData, mapelId: e.target.value })
              }
            >
              <option value="">Pilih Mata Pelajaran</option>
              {subjects.map((m) => (
                <option key={m.id} value={m.id}>
                  {m.namaMapel}
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="guru">Guru Pengajar</Label>
              <select
                id="guru"
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                value={formData.guruId}
                onChange={(e) =>
                  setFormData({ ...formData, guruId: e.target.value })
                }
              >
                <option value="">Pilih Guru</option>
                {teachers.map((t) => (
                  <option key={t.id} value={t.id}>
                    {t.nama}
                  </option>
                ))}
              </select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="ruangan">Ruangan</Label>
              <select
                id="ruangan"
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                value={formData.ruanganId}
                onChange={(e) =>
                  setFormData({ ...formData, ruanganId: e.target.value })
                }
              >
                <option value="">Pilih Ruangan</option>
                {rooms.map((r) => (
                  <option key={r.id} value={r.id}>
                    {r.namaRuangan}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button
            type="submit"
            onClick={onSubmit}
            className="w-full sm:w-auto"
            disabled={isSubmitting}
          >
            {isSubmitting
              ? "Menyimpan..."
              : editingId
              ? "Simpan Perubahan"
              : "Simpan Jadwal"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
