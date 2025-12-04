import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
import { Search, BookOpen, Settings, Info, Pencil, Trash2 } from "lucide-react";
import { Mapel } from "@/hooks/use-mapel";

interface SubjectListProps {
  subjects: Mapel[];
  loading: boolean;
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  onEdit: (subject: Mapel) => void;
  onDelete: (id: string) => void;
  onOpenFormula: (subject: Mapel) => void;
}

export const SubjectList = ({
  subjects,
  loading,
  searchTerm,
  setSearchTerm,
  onEdit,
  onDelete,
  onOpenFormula,
}: SubjectListProps) => {
  const filteredSubjects = subjects;

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      <div className="p-6 border-b border-gray-200 flex flex-col sm:flex-row justify-between items-center gap-4 bg-gray-50/30">
        <div className="relative w-full sm:max-w-sm">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            placeholder="Cari mata pelajaran..."
            className="pl-10 bg-white"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="text-sm text-gray-500">
          Total:{" "}
          <span className="font-semibold text-gray-900">
            {filteredSubjects.length} Mapel
          </span>
        </div>
      </div>

      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="bg-gray-50/50 hover:bg-gray-50/50">
              <TableHead className="w-[300px]">Mata Pelajaran</TableHead>
              <TableHead>Kategori</TableHead>
              <TableHead>Skema Penilaian</TableHead>
              <TableHead className="text-right">Aksi</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading && subjects.length === 0 ? (
              [...Array(5)].map((_, i) => (
                <TableRow key={i}>
                  <TableCell>
                    <div className="h-4 w-40 bg-gray-200 rounded animate-pulse" />
                  </TableCell>
                  <TableCell>
                    <div className="h-4 w-24 bg-gray-200 rounded animate-pulse" />
                  </TableCell>
                  <TableCell>
                    <div className="h-4 w-32 bg-gray-200 rounded animate-pulse" />
                  </TableCell>
                  <TableCell>
                    <div className="h-8 w-8 bg-gray-200 rounded animate-pulse ml-auto" />
                  </TableCell>
                </TableRow>
              ))
            ) : filteredSubjects.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={4}
                  className="text-center py-12 text-gray-500"
                >
                  <div className="flex flex-col items-center justify-center gap-2">
                    <BookOpen className="w-8 h-8 text-gray-300" />
                    <p>Belum ada mata pelajaran</p>
                  </div>
                </TableCell>
              </TableRow>
            ) : (
              filteredSubjects.map((subject) => {
                const kategori = (subject as any).kategori || "WAJIB";

                return (
                  <TableRow
                    key={subject.id}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <TableCell className="font-medium text-gray-900">
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold ${
                            kategori === "WAJIB"
                              ? "bg-red-100 text-red-700"
                              : kategori === "MUATAN_LOKAL"
                              ? "bg-blue-100 text-blue-700"
                              : "bg-green-100 text-green-700"
                          }`}
                        >
                          {subject.namaMapel.substring(0, 2).toUpperCase()}
                        </div>
                        {subject.namaMapel}
                      </div>
                    </TableCell>
                    <TableCell>
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${
                          kategori === "WAJIB"
                            ? "bg-red-50 text-red-700 border-red-100"
                            : kategori === "MUATAN_LOKAL"
                            ? "bg-blue-50 text-blue-700 border-blue-100"
                            : "bg-green-50 text-green-700 border-green-100"
                        }`}
                      >
                        {kategori.replace("_", " ")}
                      </span>
                    </TableCell>
                    <TableCell>
                      {kategori !== "EKSTRAKURIKULER" ? (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => onOpenFormula(subject)}
                          className="h-8 text-blue-600 border-blue-200 hover:bg-blue-50 hover:text-blue-700"
                        >
                          <Settings className="w-3.5 h-3.5 mr-2" />
                          Atur Skema
                        </Button>
                      ) : (
                        <span className="text-gray-400 italic text-xs flex items-center gap-1">
                          <Info className="w-3 h-3" />
                          Penilaian Deskriptif
                        </span>
                      )}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 hover:bg-blue-50 hover:text-blue-600"
                          onClick={() => onEdit(subject)}
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
                              <AlertDialogTitle>
                                Hapus Mata Pelajaran?
                              </AlertDialogTitle>
                              <AlertDialogDescription>
                                Tindakan ini akan menghapus mata pelajaran{" "}
                                <strong>{subject.namaMapel}</strong>. Data nilai
                                terkait mungkin juga akan terhapus.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Batal</AlertDialogCancel>
                              <AlertDialogAction
                                onClick={() => onDelete(subject.id)}
                                className="bg-red-600 hover:bg-red-700"
                              >
                                Hapus
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};
