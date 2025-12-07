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
import { Siswa } from "@/hooks/use-siswa";
import { useIsMobile } from "@/components/ui/use-mobile";

interface StudentTableProps {
  loading: boolean;
  students: Siswa[];
  onEdit: (student: Siswa) => void;
  onDelete: (id: string) => void;
}

// Mobile Card Component
const StudentCard = ({
  student,
  onEdit,
  onDelete,
}: {
  student: Siswa;
  onEdit: (student: Siswa) => void;
  onDelete: (id: string) => void;
}) => (
  <div className="bg-white border border-gray-200 rounded-lg p-4 space-y-3">
    <div className="flex items-start justify-between">
      <div className="min-w-0 flex-1">
        <h3 className="font-semibold text-gray-900 truncate">{student.nama}</h3>
        <p className="text-sm text-gray-500 font-mono">{student.nisn}</p>
      </div>
      <div className="flex items-center gap-1 ml-2">
        <span
          className={`inline-flex items-center justify-center w-7 h-7 rounded-full text-xs font-medium ${
            student.jenisKelamin === "L"
              ? "bg-blue-100 text-blue-700"
              : "bg-pink-100 text-pink-700"
          }`}
        >
          {student.jenisKelamin}
        </span>
      </div>
    </div>

    <div className="flex items-center justify-between pt-2 border-t border-gray-100">
      <span
        className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border ${
          student.status === "Aktif"
            ? "bg-green-50 text-green-700 border-green-100"
            : "bg-gray-100 text-gray-700 border-gray-200"
        }`}
      >
        <span
          className={`w-1.5 h-1.5 rounded-full mr-1.5 ${
            student.status === "Aktif" ? "bg-green-500" : "bg-gray-500"
          }`}
        />
        {student.status}
      </span>

      <div className="flex gap-1">
        <Button
          variant="ghost"
          size="icon"
          className="h-9 w-9 hover:bg-blue-50 hover:text-blue-600"
          onClick={() => onEdit(student)}
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
          <AlertDialogContent className="mx-4 max-w-[calc(100vw-2rem)]">
            <AlertDialogHeader>
              <AlertDialogTitle>Hapus Data Siswa?</AlertDialogTitle>
              <AlertDialogDescription>
                Tindakan ini akan menghapus data siswa{" "}
                <strong>{student.nama}</strong> secara permanen. Akun pengguna
                terkait juga akan dihapus.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter className="flex-col sm:flex-row gap-2">
              <AlertDialogCancel className="mt-0">Batal</AlertDialogCancel>
              <AlertDialogAction
                onClick={() => onDelete(student.id)}
                className="bg-red-600 hover:bg-red-700"
              >
                Hapus Permanen
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  </div>
);

// Loading skeleton for mobile cards
const CardSkeleton = () => (
  <div className="bg-white border border-gray-200 rounded-lg p-4 space-y-3 animate-pulse">
    <div className="flex items-start justify-between">
      <div className="space-y-2 flex-1">
        <div className="h-4 w-32 bg-gray-200 rounded" />
        <div className="h-3 w-24 bg-gray-200 rounded" />
      </div>
      <div className="h-7 w-7 bg-gray-200 rounded-full" />
    </div>
    <div className="flex items-center justify-between pt-2 border-t border-gray-100">
      <div className="h-6 w-16 bg-gray-200 rounded-full" />
      <div className="flex gap-1">
        <div className="h-9 w-9 bg-gray-200 rounded" />
        <div className="h-9 w-9 bg-gray-200 rounded" />
      </div>
    </div>
  </div>
);

export const StudentTable = ({
  loading,
  students,
  onEdit,
  onDelete,
}: StudentTableProps) => {
  const isMobile = useIsMobile();

  // Mobile view - Card layout
  if (isMobile) {
    return (
      <div className="p-4 space-y-3">
        {loading ? (
          [...Array(5)].map((_, i) => <CardSkeleton key={i} />)
        ) : students.length === 0 ? (
          <div className="text-center py-12 text-gray-500">
            <div className="flex flex-col items-center justify-center gap-2">
              <Search className="w-8 h-8 text-gray-300" />
              <p>Tidak ada data siswa yang ditemukan</p>
            </div>
          </div>
        ) : (
          students.map((student) => (
            <StudentCard
              key={student.id}
              student={student}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          ))
        )}
      </div>
    );
  }

  // Desktop view - Table layout
  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow className="bg-gray-50/50 hover:bg-gray-50/50">
            <TableHead className="w-[150px]">NISN</TableHead>
            <TableHead>Nama Siswa</TableHead>
            <TableHead>L/P</TableHead>
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
                  <div className="h-4 w-40 bg-gray-200 rounded animate-pulse" />
                </TableCell>
                <TableCell>
                  <div className="h-4 w-8 bg-gray-200 rounded animate-pulse" />
                </TableCell>
                <TableCell>
                  <div className="h-4 w-16 bg-gray-200 rounded animate-pulse" />
                </TableCell>
                <TableCell>
                  <div className="h-8 w-8 bg-gray-200 rounded animate-pulse ml-auto" />
                </TableCell>
              </TableRow>
            ))
          ) : students.length === 0 ? (
            <TableRow>
              <TableCell
                colSpan={5}
                className="text-center py-12 text-gray-500"
              >
                <div className="flex flex-col items-center justify-center gap-2">
                  <Search className="w-8 h-8 text-gray-300" />
                  <p>Tidak ada data siswa yang ditemukan</p>
                </div>
              </TableCell>
            </TableRow>
          ) : (
            students.map((student) => (
              <TableRow
                key={student.id}
                className="hover:bg-gray-50 transition-colors"
              >
                <TableCell className="font-medium font-mono text-gray-600">
                  {student.nisn}
                </TableCell>
                <TableCell>
                  <div className="font-medium text-gray-900">
                    {student.nama}
                  </div>
                </TableCell>
                <TableCell>
                  <span
                    className={`inline-flex items-center justify-center w-6 h-6 rounded-full text-xs font-medium ${
                      student.jenisKelamin === "L"
                        ? "bg-blue-100 text-blue-700"
                        : "bg-pink-100 text-pink-700"
                    }`}
                  >
                    {student.jenisKelamin}
                  </span>
                </TableCell>
                <TableCell>
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${
                      student.status === "Aktif"
                        ? "bg-green-50 text-green-700 border-green-100"
                        : "bg-gray-100 text-gray-700 border-gray-200"
                    }`}
                  >
                    <span
                      className={`w-1.5 h-1.5 rounded-full mr-1.5 ${
                        student.status === "Aktif"
                          ? "bg-green-500"
                          : "bg-gray-500"
                      }`}
                    />
                    {student.status}
                  </span>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 hover:bg-blue-50 hover:text-blue-600"
                      onClick={() => onEdit(student)}
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
                          <AlertDialogTitle>Hapus Data Siswa?</AlertDialogTitle>
                          <AlertDialogDescription>
                            Tindakan ini akan menghapus data siswa{" "}
                            <strong>{student.nama}</strong> secara permanen.
                            Akun pengguna terkait juga akan dihapus.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Batal</AlertDialogCancel>
                          <AlertDialogAction
                            onClick={() => onDelete(student.id)}
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
