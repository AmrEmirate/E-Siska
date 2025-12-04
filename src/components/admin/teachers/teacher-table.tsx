import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
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
import { Pencil, Trash2, Search } from "lucide-react";
import { Guru } from "@/hooks/use-guru";

interface TeacherTableProps {
  loading: boolean;
  teachers: Guru[];
  onEdit: (teacher: Guru) => void;
  onDelete: (id: string) => void;
}

export const TeacherTable = ({
  loading,
  teachers,
  onEdit,
  onDelete,
}: TeacherTableProps) => {
  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow className="bg-gray-50/50 hover:bg-gray-50/50">
            <TableHead className="w-[150px]">NIP</TableHead>
            <TableHead>Nama Guru</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Wali Kelas</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Aksi</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {loading ? (
            [...Array(5)].map((_, i) => (
              <TableRow key={i}>
                <TableCell>
                  <div className="h-4 w-24 bg-gray-200 rounded animate-pulse" />
                </TableCell>
                <TableCell>
                  <div className="h-4 w-32 bg-gray-200 rounded animate-pulse" />
                </TableCell>
                <TableCell>
                  <div className="h-4 w-40 bg-gray-200 rounded animate-pulse" />
                </TableCell>
                <TableCell>
                  <div className="h-4 w-20 bg-gray-200 rounded animate-pulse" />
                </TableCell>
                <TableCell>
                  <div className="h-4 w-16 bg-gray-200 rounded animate-pulse" />
                </TableCell>
                <TableCell>
                  <div className="h-8 w-8 bg-gray-200 rounded animate-pulse ml-auto" />
                </TableCell>
              </TableRow>
            ))
          ) : teachers.length === 0 ? (
            <TableRow>
              <TableCell
                colSpan={6}
                className="text-center py-12 text-gray-500"
              >
                <div className="flex flex-col items-center justify-center gap-2">
                  <Search className="w-8 h-8 text-gray-300" />
                  <p>Tidak ada data guru yang ditemukan</p>
                </div>
              </TableCell>
            </TableRow>
          ) : (
            teachers.map((teacher) => (
              <TableRow
                key={teacher.id}
                className="hover:bg-gray-50 transition-colors"
              >
                <TableCell className="font-medium font-mono text-gray-600">
                  {teacher.nip}
                </TableCell>
                <TableCell>
                  <div className="font-medium text-gray-900">
                    {teacher.nama}
                  </div>
                  <div className="text-xs text-gray-500">
                    {teacher.jenisKelamin === "L" ? "Laki-laki" : "Perempuan"}
                  </div>
                </TableCell>
                <TableCell className="text-gray-600">
                  {teacher.email || "-"}
                </TableCell>
                <TableCell>
                  {teacher.waliKelas ? (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-50 text-blue-700 border border-blue-100">
                      {teacher.waliKelas.namaKelas}
                    </span>
                  ) : (
                    <span className="text-gray-400 text-sm">-</span>
                  )}
                </TableCell>
                <TableCell>
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${
                      teacher.isAktif
                        ? "bg-green-50 text-green-700 border-green-100"
                        : "bg-gray-100 text-gray-700 border-gray-200"
                    }`}
                  >
                    <span
                      className={`w-1.5 h-1.5 rounded-full mr-1.5 ${
                        teacher.isAktif ? "bg-green-500" : "bg-gray-500"
                      }`}
                    />
                    {teacher.isAktif ? "Aktif" : "Non Aktif"}
                  </span>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 hover:bg-blue-50 hover:text-blue-600"
                      onClick={() => onEdit(teacher)}
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
                          <AlertDialogTitle>Hapus Data Guru?</AlertDialogTitle>
                          <AlertDialogDescription>
                            Tindakan ini akan menghapus data guru{" "}
                            <strong>{teacher.nama}</strong> secara permanen.
                            Akun pengguna terkait juga akan dihapus.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Batal</AlertDialogCancel>
                          <AlertDialogAction
                            onClick={() => onDelete(teacher.id)}
                            className="bg-red-600 hover:bg-red-700"
                          >
                            Hapus Permanen
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};
