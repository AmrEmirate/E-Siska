import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, Upload, FileText } from "lucide-react";
import { useState } from "react";

interface DocumentFormProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: {
    namaDokumen: string;
    jenisDokumen: string;
    file: File;
  }) => Promise<void>;
  loading: boolean;
}

export const DocumentForm = ({
  isOpen,
  onOpenChange,
  onSubmit,
  loading,
}: DocumentFormProps) => {
  const [formData, setFormData] = useState({
    namaDokumen: "",
    jenisDokumen: "Umum",
    file: null as File | null,
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData({ ...formData, file: e.target.files[0] });
    }
  };

  const handleSubmit = async () => {
    if (!formData.file || !formData.namaDokumen) return;

    await onSubmit({
      namaDokumen: formData.namaDokumen,
      jenisDokumen: formData.jenisDokumen,
      file: formData.file,
    });

    setFormData({
      namaDokumen: "",
      jenisDokumen: "Umum",
      file: null,
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Unggah Dokumen Baru</DialogTitle>
          <DialogDescription>
            Pilih file dokumen yang ingin diunggah ke sistem.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-6 py-4">
          <div className="space-y-2">
            <Label htmlFor="nama">Nama Dokumen</Label>
            <Input
              id="nama"
              placeholder="Contoh: Jadwal Pelajaran 2024"
              value={formData.namaDokumen}
              onChange={(e) =>
                setFormData({ ...formData, namaDokumen: e.target.value })
              }
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="jenis">Jenis Dokumen</Label>
            <select
              id="jenis"
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              value={formData.jenisDokumen}
              onChange={(e) =>
                setFormData({ ...formData, jenisDokumen: e.target.value })
              }
            >
              <option value="Umum">Umum</option>
              <option value="Akademik">Akademik</option>
              <option value="Administrasi">Administrasi</option>
              <option value="Lainnya">Lainnya</option>
            </select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="file">File Dokumen</Label>
            <div className="flex items-center justify-center w-full">
              <label
                htmlFor="file-upload"
                className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 border-gray-300 transition-colors"
              >
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <Upload className="w-8 h-8 mb-3 text-gray-400" />
                  <p className="mb-2 text-sm text-gray-500">
                    <span className="font-semibold">Klik untuk upload</span>{" "}
                    atau drag and drop
                  </p>
                  <p className="text-xs text-gray-500">
                    PDF, DOCX, XLSX (MAX. 10MB)
                  </p>
                </div>
                <input
                  id="file-upload"
                  type="file"
                  className="hidden"
                  onChange={handleFileChange}
                />
              </label>
            </div>
            {formData.file && (
              <div className="text-sm text-blue-600 flex items-center gap-2 mt-2 bg-blue-50 p-2 rounded">
                <FileText className="w-4 h-4" />
                {formData.file.name}
              </div>
            )}
          </div>
        </div>
        <DialogFooter>
          <Button
            type="submit"
            onClick={handleSubmit}
            disabled={loading || !formData.file || !formData.namaDokumen}
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Mengunggah...
              </>
            ) : (
              "Unggah"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
