"use client";
import { useState } from "react";
import { useBackup } from "@/hooks/use-backup";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
import {
  Download,
  Upload,
  AlertTriangle,
  Loader2,
  FileJson,
} from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
export default function BackupPage() {
  const { loading, downloadBackup, restoreBackup } = useBackup();
  const [restoreFile, setRestoreFile] = useState<File | null>(null);
  const [isRestoreDialogOpen, setIsRestoreDialogOpen] = useState(false);
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setRestoreFile(e.target.files[0]);
    }
  };
  const handleRestore = async () => {
    if (!restoreFile) return;
    const success = await restoreBackup(restoreFile);
    if (success) {
      setIsRestoreDialogOpen(false);
      setRestoreFile(null);
    }
  };
  return (
    <div className="p-8 space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Backup & Restore Database
        </h1>
        <p className="text-gray-600">
          Kelola cadangan data sistem untuk keamanan dan pemulihan.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Download className="w-5 h-5 text-green-600" />
              Backup Data
            </CardTitle>
            <CardDescription>
              Unduh seluruh data database dalam format JSON. File ini dapat
              digunakan untuk memulihkan sistem jika terjadi masalah.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <Alert className="bg-green-50 border-green-200">
                <FileJson className="h-4 w-4 text-green-600" />
                <AlertTitle className="text-green-800">Informasi</AlertTitle>
                <AlertDescription className="text-green-700">
                  Proses backup akan mengunduh file JSON berisi semua data:
                  User, Siswa, Guru, Kelas, Nilai, dll.
                </AlertDescription>
              </Alert>
              <Button
                onClick={downloadBackup}
                disabled={loading}
                className="w-full bg-green-600 hover:bg-green-700 text-white"
              >
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Memproses...
                  </>
                ) : (
                  <>
                    <Download className="mr-2 h-4 w-4" />
                    Download Backup (.json)
                  </>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>
        {}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Upload className="w-5 h-5 text-red-600" />
              Restore Data
            </CardTitle>
            <CardDescription>
              Pulihkan database dari file backup yang sebelumnya diunduh.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <Alert variant="destructive">
                <AlertTriangle className="h-4 w-4" />
                <AlertTitle>Peringatan Penting</AlertTitle>
                <AlertDescription>
                  Proses restore akan <strong>MENGHAPUS SEMUA DATA</strong> yang
                  ada saat ini dan menggantinya dengan data dari file backup.
                  Tindakan ini tidak dapat dibatalkan.
                </AlertDescription>
              </Alert>
              <div className="space-y-2">
                <Label htmlFor="backup-file">Pilih File Backup (.json)</Label>
                <Input
                  id="backup-file"
                  type="file"
                  accept=".json"
                  onChange={handleFileChange}
                  disabled={loading}
                />
              </div>
              <AlertDialog
                open={isRestoreDialogOpen}
                onOpenChange={setIsRestoreDialogOpen}
              >
                <AlertDialogTrigger asChild>
                  <Button
                    disabled={!restoreFile || loading}
                    variant="destructive"
                    className="w-full"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Memproses...
                      </>
                    ) : (
                      <>
                        <Upload className="mr-2 h-4 w-4" />
                        Restore Database
                      </>
                    )}
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>
                      Apakah Anda yakin ingin melakukan Restore?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                      Tindakan ini akan menghapus seluruh data yang ada di
                      database saat ini dan menggantinya dengan data dari file{" "}
                      <strong>{restoreFile?.name}</strong>. Data yang sudah
                      dihapus tidak dapat dikembalikan.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Batal</AlertDialogCancel>
                    <AlertDialogAction
                      onClick={handleRestore}
                      className="bg-red-600 hover:bg-red-700"
                    >
                      Ya, Restore Database
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
