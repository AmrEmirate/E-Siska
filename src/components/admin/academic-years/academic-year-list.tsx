import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
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
  CheckCircle2,
  BookOpen,
  Calendar,
  Pencil,
  Trash2,
  Loader2,
} from "lucide-react";
import { TahunAjaran } from "@/hooks/use-tahun-ajaran";

interface AcademicYearListProps {
  years: TahunAjaran[];
  loading: boolean;
  onEdit: (year: TahunAjaran) => void;
  onDelete: (id: string) => void;
  onSetActive: (id: string) => void;
}

export const AcademicYearList = ({
  years,
  loading,
  onEdit,
  onDelete,
  onSetActive,
}: AcademicYearListProps) => {
  if (loading && years.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px]">
        <Loader2 className="animate-spin text-red-600 mb-4" size={40} />
        <p className="text-gray-500 font-medium">Memuat data tahun ajaran...</p>
      </div>
    );
  }

  if (years.length === 0) {
    return (
      <div className="text-center py-16 bg-white rounded-xl border border-dashed border-gray-300">
        <div className="flex flex-col items-center justify-center gap-2">
          <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mb-2">
            <Calendar className="w-6 h-6 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900">
            Belum ada tahun ajaran
          </h3>
          <p className="text-gray-500">
            Mulai dengan menambahkan tahun ajaran baru.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="grid gap-4">
      {years.map((year) => (
        <Card
          key={year.id}
          className={`group transition-all duration-200 ${
            year.isActive
              ? "border-blue-200 bg-blue-50/30 shadow-md"
              : "hover:border-blue-200 hover:shadow-md bg-white"
          }`}
        >
          <CardContent className="p-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex-1 space-y-1">
                <div className="flex items-center gap-3">
                  <h3 className="text-lg font-bold text-gray-900">
                    Tahun Ajaran {year.tahun}
                  </h3>
                  {year.isActive ? (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 border border-blue-200">
                      <CheckCircle2 className="w-3 h-3 mr-1" />
                      Aktif
                    </span>
                  ) : (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-600 border border-gray-200">
                      Tidak Aktif
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-4 text-sm text-gray-500">
                  <span className="flex items-center gap-1">
                    <BookOpen className="w-4 h-4" />
                    Semester {year.semester}
                  </span>
                  <span className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    {new Date(year.tanggalMulai).toLocaleDateString("id-ID", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}{" "}
                    -{" "}
                    {new Date(year.tanggalSelesai).toLocaleDateString("id-ID", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto pt-4 sm:pt-0 border-t sm:border-t-0 border-gray-100 mt-4 sm:mt-0">
                {!year.isActive && (
                  <Button
                    onClick={() => onSetActive(year.id)}
                    variant="outline"
                    className="flex-1 sm:flex-none border-blue-200 text-blue-600 hover:bg-blue-50 hover:text-blue-700"
                    disabled={loading}
                  >
                    <CheckCircle2 className="w-4 h-4 mr-2" />
                    Aktifkan
                  </Button>
                )}

                <div className="flex gap-1 ml-auto sm:ml-0">
                  <Button
                    onClick={() => onEdit(year)}
                    variant="ghost"
                    size="icon"
                    className="h-9 w-9 hover:bg-blue-50 hover:text-blue-600"
                  >
                    <Pencil className="w-4 h-4" />
                  </Button>

                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-9 w-9 hover:bg-red-50 hover:text-red-600"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Hapus Tahun Ajaran?</AlertDialogTitle>
                        <AlertDialogDescription>
                          Tindakan ini akan menghapus tahun ajaran{" "}
                          <strong>
                            {year.tahun} {year.semester}
                          </strong>
                          . Data terkait mungkin akan terpengaruh.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Batal</AlertDialogCancel>
                        <AlertDialogAction
                          onClick={() => onDelete(year.id)}
                          className="bg-red-600 hover:bg-red-700"
                        >
                          Hapus
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
