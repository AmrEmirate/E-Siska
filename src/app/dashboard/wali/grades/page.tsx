"use client";
import { useState, useEffect } from "react";
import { useNilai } from "@/hooks/use-nilai";
import { usePenempatan } from "@/hooks/use-penempatan";
import { useCapaian } from "@/hooks/use-capaian";
import { Loader2, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
export default function WaliGradesPage() {
  const {
    data: nilaiData,
    loading: nilaiLoading,
    fetchNilaiByClass,
  } = useNilai();
  const { data: penempatanData, fetchPenempatan } = usePenempatan();
  const { fetchCapaianBySiswaId, loading: capaianLoading } = useCapaian();
  const [kelasId, setKelasId] = useState("");
  const [selectedStudent, setSelectedStudent] = useState<any>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [studentCapaian, setStudentCapaian] = useState<any[]>([]);
  const [studentGradesDetail, setStudentGradesDetail] = useState<any[]>([]);
  useEffect(() => {
    fetchPenempatan();
  }, [fetchPenempatan]);
  useEffect(() => {
    if (penempatanData.length > 0 && !kelasId) {
      const firstKelasId = penempatanData[0].kelasId;
      setKelasId(firstKelasId);
      fetchNilaiByClass(firstKelasId);
    }
  }, [penempatanData, kelasId, fetchNilaiByClass]);
  const studentGrades = nilaiData.reduce((acc: any[], nilai) => {
    const existing = acc.find((s) => s.siswaId === nilai.siswaId);
    if (existing) {
      existing.grades[nilai.komponenId] = nilai.nilai;
      existing.rawGrades.push(nilai);
    } else {
      acc.push({
        siswaId: nilai.siswaId,
        nisn: nilai.siswa?.nisn || "-",
        name: nilai.siswa?.nama || "-",
        grades: { [nilai.komponenId]: nilai.nilai },
        rawGrades: [nilai],
      });
    }
    return acc;
  }, []);
  const handleViewDetail = async (student: any) => {
    setSelectedStudent(student);
    setIsDetailOpen(true);
    const capaian = await fetchCapaianBySiswaId(student.siswaId);
    setStudentCapaian(capaian);
    const gradesByMapel = student.rawGrades.reduce((acc: any, curr: any) => {
      if (!acc[curr.mapelId]) {
        acc[curr.mapelId] = {
          mapelId: curr.mapelId,
          mapelName: curr.mapel?.namaMapel || "Unknown",
          nilai: [],
        };
      }
      acc[curr.mapelId].nilai.push(curr.nilai);
      return acc;
    }, {});
    setStudentGradesDetail(Object.values(gradesByMapel));
  };
  if (nilaiLoading && nilaiData.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px]">
        <Loader2 className="animate-spin text-blue-600 mb-4" size={40} />
        <p className="text-gray-500 font-medium">Memuat data nilai...</p>
      </div>
    );
  }
  return (
    <div className="p-8 space-y-8 bg-gray-50/50 min-h-screen">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight">
            Rekap Nilai Kelas
          </h1>
          <p className="text-gray-500 mt-2">
            Lihat ringkasan nilai dan capaian kompetensi siswa.
          </p>
        </div>
      </div>
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">Daftar Siswa</h2>
        </div>
        <div className="overflow-x-auto">
          {studentGrades.length === 0 ? (
            <div className="p-12 text-center text-gray-500">
              <p>Belum ada data nilai untuk kelas ini.</p>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow className="bg-gray-50/50">
                  <TableHead>NISN</TableHead>
                  <TableHead>Nama Siswa</TableHead>
                  <TableHead className="text-center">Rata-rata Nilai</TableHead>
                  <TableHead className="text-right">Aksi</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {studentGrades.map((student: any) => {
                  const grades = Object.values(student.grades) as number[];
                  const average =
                    grades.length > 0
                      ? grades.reduce((a, b) => a + b, 0) / grades.length
                      : 0;
                  return (
                    <TableRow
                      key={student.siswaId}
                      className="hover:bg-gray-50"
                    >
                      <TableCell className="font-medium">
                        {student.nisn}
                      </TableCell>
                      <TableCell>{student.name}</TableCell>
                      <TableCell className="text-center">
                        <Badge variant="secondary" className="font-bold">
                          {average.toFixed(2)}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleViewDetail(student)}
                        >
                          <Eye className="w-4 h-4 mr-2" />
                          Detail & Capaian
                        </Button>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          )}
        </div>
      </div>
      <Dialog open={isDetailOpen} onOpenChange={setIsDetailOpen}>
        <DialogContent className="sm:max-w-[800px] max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Detail Nilai & Capaian Kompetensi</DialogTitle>
            <DialogDescription>
              Siswa: <strong>{selectedStudent?.name}</strong> (
              {selectedStudent?.nisn})
            </DialogDescription>
          </DialogHeader>
          <div className="mt-4">
            {capaianLoading ? (
              <div className="flex justify-center py-8">
                <Loader2 className="animate-spin text-blue-600" />
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[200px]">Mata Pelajaran</TableHead>
                    <TableHead className="text-center w-[100px]">
                      Nilai Akhir
                    </TableHead>
                    <TableHead>Capaian Kompetensi</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {studentGradesDetail.map((detail: any, idx) => {
                    const mapelId = detail.mapelId;
                    const capaian = studentCapaian.find(
                      (c: any) => c.mapelId === mapelId
                    );
                    const avg =
                      detail.nilai.reduce((a: number, b: number) => a + b, 0) /
                      detail.nilai.length;
                    return (
                      <TableRow key={idx}>
                        <TableCell className="font-medium">
                          {detail.mapelName}
                        </TableCell>
                        <TableCell className="text-center font-bold">
                          {avg.toFixed(0)}
                        </TableCell>
                        <TableCell className="text-sm text-gray-600">
                          {capaian ? (
                            capaian.deskripsi
                          ) : (
                            <span className="text-gray-400 italic">
                              Belum diisi guru
                            </span>
                          )}
                        </TableCell>
                      </TableRow>
                    );
                  })}
                  {studentGradesDetail.length === 0 && (
                    <TableRow>
                      <TableCell
                        colSpan={3}
                        className="text-center py-8 text-gray-500"
                      >
                        Tidak ada data nilai detail.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
