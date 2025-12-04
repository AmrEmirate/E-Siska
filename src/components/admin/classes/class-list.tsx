import { Button } from "@/components/ui/button";
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
import { Pencil, Trash2, Users } from "lucide-react";
import { Kelas } from "@/hooks/use-kelas";

interface ClassListProps {
  loading: boolean;
  classes: Kelas[];
  onEdit: (cls: Kelas) => void;
  onDelete: (id: string) => void;
}

export const ClassList = ({
  loading,
  classes,
  onEdit,
  onDelete,
}: ClassListProps) => {
  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="bg-white border border-gray-200 rounded-xl p-6 h-48 animate-pulse"
          >
            <div className="h-6 w-1/3 bg-gray-200 rounded mb-4" />
            <div className="h-4 w-1/2 bg-gray-200 rounded mb-8" />
            <div className="h-4 w-full bg-gray-200 rounded mt-auto" />
          </div>
        ))}
      </div>
    );
  }

  if (classes.length === 0) {
    return (
      <div className="text-center py-16 bg-white rounded-xl border border-dashed border-gray-300">
        <div className="flex flex-col items-center justify-center gap-2">
          <Users className="w-12 h-12 text-gray-300" />
          <h3 className="text-lg font-medium text-gray-900">
            Belum ada data kelas
          </h3>
          <p className="text-gray-500">Mulai dengan menambahkan kelas baru.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {classes.map((cls) => (
        <div
          key={cls.id}
          className="group bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg hover:border-blue-200 transition-all duration-200 relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity flex gap-1">
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 hover:bg-blue-50 hover:text-blue-600"
              onClick={() => onEdit(cls)}
            >
              <Pencil className="w-4 h-4" />
            </Button>

            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 hover:bg-red-50 hover:text-red-600"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Hapus Kelas?</AlertDialogTitle>
                  <AlertDialogDescription>
                    Tindakan ini akan menghapus kelas{" "}
                    <strong>{cls.namaKelas}</strong>. Pastikan tidak ada siswa
                    yang terdaftar di kelas ini sebelum menghapus.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Batal</AlertDialogCancel>
                  <AlertDialogAction
                    onClick={() => onDelete(cls.id)}
                    className="bg-red-600 hover:bg-red-700"
                  >
                    Hapus
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>

          <div className="mb-6">
            <div className="flex items-center gap-2 mb-1">
              <h3 className="text-2xl font-bold text-gray-900">
                {cls.namaKelas}
              </h3>
              <span className="px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-600 border border-gray-200">
                {cls.tingkatan?.namaTingkat || "N/A"}
              </span>
            </div>
            <p className="text-sm text-gray-500">Tahun Ajaran Aktif</p>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-blue-50/50 rounded-lg border border-blue-100">
              <div className="flex items-center text-blue-700">
                <Users className="w-4 h-4 mr-2" />
                <span className="text-sm font-medium">Total Siswa</span>
              </div>
              <span className="text-lg font-bold text-blue-700">
                {cls._count?.Penempatan || 0}
              </span>
            </div>

            <div className="pt-4 border-t border-gray-100">
              <p className="text-xs text-gray-500 uppercase tracking-wide font-medium mb-2">
                Wali Kelas
              </p>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 font-medium text-xs">
                  {cls.waliKelas?.nama ? cls.waliKelas.nama.charAt(0) : "?"}
                </div>
                <p className="text-sm font-medium text-gray-900 truncate flex-1">
                  {cls.waliKelas?.nama || "Belum ditentukan"}
                </p>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
