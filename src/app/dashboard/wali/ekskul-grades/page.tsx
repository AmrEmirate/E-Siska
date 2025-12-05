"use client";

import { useState, useEffect, useCallback } from "react";
import { usePenempatan } from "@/hooks/use-penempatan";
import { useMapel } from "@/hooks/use-mapel";
import { useTahunAjaran } from "@/hooks/use-tahun-ajaran";
import { apiClient } from "@/lib/api-client";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface EkskulGrade {
  siswaId: string;
  ekskulId: string;
  nilai: string;
  keterangan: string;
}

export default function WaliEkskulGradesPage() {
  const {
    data: penempatanData,
    fetchPenempatan,
    loading: penempatanLoading,
  } = usePenempatan();
  const { data: allMapel, fetchMapel } = useMapel();
  const { data: tahunAjaran, fetchTahunAjaran } = useTahunAjaran();
  const { toast } = useToast();

  const [grades, setGrades] = useState<Record<string, EkskulGrade>>({});
  const [saving, setSaving] = useState(false);
  const [activeYearId, setActiveYearId] = useState<string | null>(null);

  useEffect(() => {
    fetchPenempatan();
    fetchMapel();
    fetchTahunAjaran();
  }, [fetchPenempatan, fetchMapel, fetchTahunAjaran]);

  useEffect(() => {
    const active = tahunAjaran.find((t) => t.isAktif || t.isActive);
    if (active) setActiveYearId(active.id);
  }, [tahunAjaran]);

  const extracurriculars = allMapel.filter(
    (m: any) => m.kategori === "EKSTRAKURIKULER"
  );

  const students = penempatanData.map((p) => ({
    id: p.siswaId,
    nama: p.siswa?.nama || "-",
    nisn: p.siswa?.nisn || "-",
  }));

  const handleGradeChange = (
    siswaId: string,
    ekskulId: string,
    field: "nilai" | "keterangan",
    value: string
  ) => {
    const key = `${siswaId}-${ekskulId}`;
    setGrades((prev) => ({
      ...prev,
      [key]: {
        ...prev[key],
        siswaId,
        ekskulId,
        [field]: value,
      },
    }));
  };

  const handleSave = async () => {
    if (!activeYearId) {
      toast({
        title: "Error",
        description: "Tahun ajaran aktif tidak ditemukan.",
        variant: "destructive",
      });
      return;
    }

    setSaving(true);
    try {
      const gradeEntries = Object.values(grades).filter(
        (g) => g.nilai || g.keterangan
      );

      for (const entry of gradeEntries) {
        await apiClient.post("/nilai-ekskul", {
          siswaId: entry.siswaId,
          namaEkskul: extracurriculars.find((e: any) => e.id === entry.ekskulId)
            ?.namaMapel,
          nilai: entry.nilai,
          tahunAjaranId: activeYearId,
          keterangan: entry.keterangan,
        });
      }

      toast({
        title: "Berhasil",
        description: "Nilai ekstrakurikuler berhasil disimpan.",
      });
    } catch (error) {
      toast({
        title: "Gagal",
        description: "Gagal menyimpan nilai ekstrakurikuler.",
        variant: "destructive",
      });
    } finally {
      setSaving(false);
    }
  };

  if (penempatanLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px]">
        <Loader2 className="animate-spin text-green-600 mb-4" size={40} />
        <p className="text-gray-500 font-medium">Memuat data...</p>
      </div>
    );
  }

  return (
    <div className="p-8 space-y-8 bg-gray-50/50 min-h-screen">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight">
            Nilai Ekstrakurikuler
          </h1>
          <p className="text-gray-500 mt-2">
            Input nilai ekstrakurikuler untuk siswa di kelas Anda.
          </p>
        </div>
        <Button
          className="bg-green-600 hover:bg-green-700 text-white"
          onClick={handleSave}
          disabled={saving}
        >
          {saving && <Loader2 className="animate-spin mr-2 w-4 h-4" />}
          <Save className="w-4 h-4 mr-2" />
          Simpan Nilai
        </Button>
      </div>

      {extracurriculars.length === 0 ? (
        <div className="bg-white rounded-xl p-12 text-center text-gray-500 border">
          Belum ada data ekstrakurikuler. Hubungi admin untuk menambahkan.
        </div>
      ) : students.length === 0 ? (
        <div className="bg-white rounded-xl p-12 text-center text-gray-500 border">
          Anda tidak memiliki siswa di kelas bimbingan.
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-gray-50/50">
                  <TableHead className="w-16">No</TableHead>
                  <TableHead>NISN</TableHead>
                  <TableHead>Nama Siswa</TableHead>
                  <TableHead>Ekstrakurikuler</TableHead>
                  <TableHead className="w-32">Nilai/Predikat</TableHead>
                  <TableHead>Keterangan</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {students.map((student, idx) => (
                  <TableRow key={student.id} className="hover:bg-gray-50">
                    <TableCell className="font-medium">{idx + 1}</TableCell>
                    <TableCell>{student.nisn}</TableCell>
                    <TableCell className="font-medium">
                      {student.nama}
                    </TableCell>
                    <TableCell>
                      <Select
                        onValueChange={(val) => {
                          const key = `${student.id}-${val}`;
                          if (!grades[key]) {
                            setGrades((prev) => ({
                              ...prev,
                              [key]: {
                                siswaId: student.id,
                                ekskulId: val,
                                nilai: "",
                                keterangan: "",
                              },
                            }));
                          }
                        }}
                      >
                        <SelectTrigger className="w-48">
                          <SelectValue placeholder="Pilih Ekskul" />
                        </SelectTrigger>
                        <SelectContent>
                          {extracurriculars.map((ekskul: any) => (
                            <SelectItem key={ekskul.id} value={ekskul.id}>
                              {ekskul.namaMapel}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </TableCell>
                    <TableCell>
                      <Select
                        onValueChange={(val) => {
                          const currentEkskul = Object.keys(grades).find((k) =>
                            k.startsWith(`${student.id}-`)
                          );
                          if (currentEkskul) {
                            const ekskulId = currentEkskul.split("-")[1];
                            handleGradeChange(
                              student.id,
                              ekskulId,
                              "nilai",
                              val
                            );
                          }
                        }}
                      >
                        <SelectTrigger className="w-24">
                          <SelectValue placeholder="Nilai" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="A">A</SelectItem>
                          <SelectItem value="B">B</SelectItem>
                          <SelectItem value="C">C</SelectItem>
                          <SelectItem value="D">D</SelectItem>
                        </SelectContent>
                      </Select>
                    </TableCell>
                    <TableCell>
                      <Input
                        placeholder="Keterangan (opsional)"
                        className="w-full"
                        onChange={(e) => {
                          const currentEkskul = Object.keys(grades).find((k) =>
                            k.startsWith(`${student.id}-`)
                          );
                          if (currentEkskul) {
                            const ekskulId = currentEkskul.split("-")[1];
                            handleGradeChange(
                              student.id,
                              ekskulId,
                              "keterangan",
                              e.target.value
                            );
                          }
                        }}
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      )}
    </div>
  );
}
