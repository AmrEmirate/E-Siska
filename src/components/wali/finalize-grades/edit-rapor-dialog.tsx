"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Loader2 } from "lucide-react";
import { StudentStatus } from "./student-table";

interface EditRaporDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  student: StudentStatus | null;
  formData: {
    catatan: string;
    kokurikuler: string;
  };
  setFormData: (data: { catatan: string; kokurikuler: string }) => void;
  onSave: () => void;
  isSubmitting: boolean;
}

export function EditRaporDialog({
  isOpen,
  onOpenChange,
  student,
  formData,
  setFormData,
  onSave,
  isSubmitting,
}: EditRaporDialogProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Lengkapi Data Rapor</DialogTitle>
          <DialogDescription>
            Isi catatan wali kelas dan data kokurikuler untuk{" "}
            <strong>{student?.name}</strong>.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="catatan">Catatan Wali Kelas</Label>
            <Textarea
              id="catatan"
              placeholder="Contoh: Tingkatkan terus prestasimu..."
              value={formData.catatan}
              onChange={(e) =>
                setFormData({ ...formData, catatan: e.target.value })
              }
              rows={3}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="kokurikuler">Data Kokurikuler / Prestasi</Label>
            <Textarea
              id="kokurikuler"
              placeholder="Contoh: Juara 1 Lomba Membaca Puisi..."
              value={formData.kokurikuler}
              onChange={(e) =>
                setFormData({ ...formData, kokurikuler: e.target.value })
              }
              rows={3}
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Batal
          </Button>
          <Button
            onClick={onSave}
            disabled={
              isSubmitting || !formData.catatan || !formData.kokurikuler
            }
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Menyimpan...
              </>
            ) : (
              "Simpan"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
