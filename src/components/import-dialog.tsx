"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { apiClient as api } from "@/lib/api-client";
import { Upload, FileSpreadsheet, Loader2 } from "lucide-react";

interface ImportDialogProps {
  title: string;
  endpoint: string;
  onSuccess: () => void;
  triggerLabel?: string;
}

export function ImportDialog({
  title,
  endpoint,
  onSuccess,
  triggerLabel = "Import",
}: ImportDialogProps) {
  const [open, setOpen] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!file) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Silakan pilih file terlebih dahulu",
      });
      return;
    }

    setLoading(true);
    const formData = new FormData();
    formData.append("file", file);

    try {
      await api.post(endpoint, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      toast({
        title: "Berhasil",
        description: "Data berhasil diimport",
      });

      setOpen(false);
      setFile(null);
      onSuccess();
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Gagal",
        description: error.response?.data?.message || "Gagal mengimport data",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="gap-2">
          <Upload className="h-4 w-4" />
          {triggerLabel}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>
            Upload file Excel (.xlsx) atau CSV untuk import data massal.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="file">File Excel/CSV</Label>
            <Input
              id="file"
              type="file"
              accept=".xlsx, .xls, .csv"
              onChange={handleFileChange}
            />
          </div>
          {file && (
            <div className="flex items-center gap-2 p-3 bg-green-50 text-green-700 rounded-md text-sm">
              <FileSpreadsheet className="h-4 w-4" />
              <span className="truncate">{file.name}</span>
            </div>
          )}
        </div>
        <DialogFooter>
          <Button
            type="submit"
            onClick={handleUpload}
            disabled={!file || loading}
          >
            {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Upload
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
