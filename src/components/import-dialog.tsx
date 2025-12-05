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
import { Upload, FileSpreadsheet, Loader2, AlertCircle, CheckCircle, Info } from "lucide-react";

interface ImportDialogProps {
  title: string;
  endpoint: string;
  onSuccess: () => void;
  triggerLabel?: string;
  formatInfo?: {
    columns: { name: string; required: boolean; description: string }[];
  };
}

export function ImportDialog({
  title,
  endpoint,
  onSuccess,
  triggerLabel = "Import",
  formatInfo,
}: ImportDialogProps) {
  const [open, setOpen] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{
    success: number;
    failed: number;
    errors: string[];
  } | null>(null);
  const { toast } = useToast();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      setResult(null);
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
    setResult(null);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await api.post(endpoint, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      const data = response.data.data;
      setResult({
        success: data.successCount || 0,
        failed: data.errorCount || 0,
        errors: data.errors || [],
      });

      if (data.successCount > 0) {
        toast({
          title: "Import Selesai",
          description: `Berhasil: ${data.successCount}, Gagal: ${data.errorCount}`,
        });
        onSuccess();
      } else if (data.errorCount > 0) {
        toast({
          variant: "destructive",
          title: "Import Gagal",
          description: `Semua data gagal diimport. Lihat detail error di bawah.`,
        });
      }
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

  const resetDialog = () => {
    setFile(null);
    setResult(null);
  };

  return (
    <Dialog open={open} onOpenChange={(isOpen) => {
      setOpen(isOpen);
      if (!isOpen) resetDialog();
    }}>
      <DialogTrigger asChild>
        <Button variant="outline" className="gap-2">
          <Upload className="h-4 w-4" />
          {triggerLabel}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px] max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>
            Upload file Excel (.xlsx) atau CSV untuk import data massal.
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          {/* Format Info Box */}
          {formatInfo && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="flex items-center gap-2 text-blue-700 font-medium mb-2">
                <Info className="h-4 w-4" />
                Format Kolom yang Diharapkan:
              </div>
              <div className="space-y-1 text-sm">
                {formatInfo.columns.map((col, idx) => (
                  <div key={idx} className="flex items-start gap-2">
                    <span className={`font-mono px-1 rounded ${col.required ? 'bg-red-100 text-red-700' : 'bg-gray-100 text-gray-600'}`}>
                      {col.name}
                    </span>
                    <span className="text-gray-600">- {col.description}</span>
                    {col.required && <span className="text-red-500 text-xs">(wajib)</span>}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* File Input */}
          <div className="grid w-full items-center gap-1.5">
            <Label htmlFor="file">File Excel/CSV</Label>
            <Input
              id="file"
              type="file"
              accept=".xlsx, .xls, .csv"
              onChange={handleFileChange}
            />
          </div>

          {/* Selected File */}
          {file && (
            <div className="flex items-center gap-2 p-3 bg-green-50 text-green-700 rounded-md text-sm">
              <FileSpreadsheet className="h-4 w-4" />
              <span className="truncate">{file.name}</span>
            </div>
          )}

          {/* Result Summary */}
          {result && (
            <div className="space-y-3">
              <div className="flex gap-4">
                <div className="flex items-center gap-2 text-green-600">
                  <CheckCircle className="h-4 w-4" />
                  <span className="font-medium">{result.success} Berhasil</span>
                </div>
                <div className="flex items-center gap-2 text-red-600">
                  <AlertCircle className="h-4 w-4" />
                  <span className="font-medium">{result.failed} Gagal</span>
                </div>
              </div>

              {/* Error List */}
              {result.errors.length > 0 && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                  <div className="text-red-700 font-medium text-sm mb-2">Detail Error:</div>
                  <ul className="text-sm text-red-600 space-y-1 max-h-32 overflow-y-auto">
                    {result.errors.map((err, idx) => (
                      <li key={idx} className="flex items-start gap-1">
                        <span className="text-red-400">•</span>
                        <span>{err}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}
        </div>

        <DialogFooter className="gap-2">
          <Button variant="outline" onClick={() => setOpen(false)}>
            {result ? "Tutup" : "Batal"}
          </Button>
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
