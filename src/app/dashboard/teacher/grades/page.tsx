"use client";

import { useState, useEffect } from "react";
import { apiClient } from "@/lib/api-client";
import { Loader2, Save, AlertCircle } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useAuth } from "@/context/auth-context";
import { useKelas } from "@/hooks/use-kelas";

interface StudentGrade {
  siswaId: string;
  nisn: string;
  nama: string;
  grades: Record<string, number>;
}

interface GradingComponent {
  id: string;
  namaKomponen: string;
  tipe: "INPUT" | "READ_ONLY";
  formula?: string;
  urutan: number;
}

interface Skema {
  id: string;
  Komponen: GradingComponent[];
}

interface ClassItem {
  id: string;
  name: string;
}

interface SubjectItem {
  id: string;
  namaMapel: string;
}

export default function GradesPage() {
  const { toast } = useToast();
  const { user } = useAuth();
  const { fetchTeachingClasses } = useKelas();
  const [classes, setClasses] = useState<ClassItem[]>([]);
  const [subjects, setSubjects] = useState<SubjectItem[]>([]);

  const [selectedClass, setSelectedClass] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("");

  const [skema, setSkema] = useState<Skema | null>(null);
  const [gradeData, setGradeData] = useState<StudentGrade[]>([]);

  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const fetchInitData = async () => {
      try {
        const teachingClasses = await fetchTeachingClasses();
        setClasses(
          teachingClasses.map((c: any) => ({ id: c.id, name: c.namaKelas }))
        );

        const subjectsRes = await apiClient.get("/mapel");
        setSubjects(subjectsRes.data.data);
      } catch (error) {
        toast({
          variant: "destructive",
          title: "Gagal memuat data",
          description:
            "Terjadi kesalahan saat mengambil data kelas atau mata pelajaran.",
        });
      }
    };
    fetchInitData();
  }, []);

  useEffect(() => {
    if (selectedClass && selectedSubject) {
      fetchGradesAndSkema();
    }
  }, [selectedClass, selectedSubject]);

  const fetchGradesAndSkema = async () => {
    setLoading(true);
    try {
      const skemaRes = await apiClient.get(`/skema/mapel/${selectedSubject}`);
      setSkema(skemaRes.data.data);

      const gradesRes = await apiClient.get(
        `/nilai/kelas/${selectedClass}/mapel/${selectedSubject}`
      );
      setGradeData(gradesRes.data.data);
    } catch (error) {
      setSkema(null);
      setGradeData([]);
      toast({
        variant: "destructive",
        title: "Gagal memuat nilai",
        description: "Tidak dapat mengambil data nilai atau skema penilaian.",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleGradeChange = (
    siswaId: string,
    komponenId: string,
    value: string
  ) => {
    if (value === "") {
      setGradeData((prev) =>
        prev.map((student) => {
          if (student.siswaId === siswaId) {
            const newGrades = { ...student.grades };
            delete newGrades[komponenId];
            return { ...student, grades: newGrades };
          }
          return student;
        })
      );
      return;
    }

    const numValue = parseFloat(value);

    if (isNaN(numValue) || numValue < 0 || numValue > 100) {
      return;
    }

    setGradeData((prev) =>
      prev.map((student) => {
        if (student.siswaId === siswaId) {
          return {
            ...student,
            grades: {
              ...student.grades,
              [komponenId]: numValue,
            },
          };
        }
        return student;
      })
    );
  };

  const handleSave = async () => {
    if (!skema) return;
    setSaving(true);
    try {
      const inputComponents = skema.Komponen.filter((c) => c.tipe === "INPUT");

      for (const comp of inputComponents) {
        const dataToSave = gradeData.map((student) => ({
          siswaId: student.siswaId,
          nilai: student.grades[comp.id] || 0,
        }));

        await apiClient.post("/nilai", {
          guruId: user?.id,
          mapelId: selectedSubject,
          komponenId: comp.id,
          data: dataToSave,
        });
      }

      toast({
        title: "Berhasil disimpan",
        description: "Nilai siswa telah berhasil diperbarui.",
      });
      fetchGradesAndSkema();
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Gagal menyimpan",
        description: "Terjadi kesalahan saat menyimpan nilai.",
      });
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="p-8 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Input Nilai Siswa
        </h1>
        <p className="text-gray-600">
          Pilih kelas dan mata pelajaran untuk mulai mengisi nilai.
        </p>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">
              Pilih Kelas
            </label>
            <select
              value={selectedClass}
              onChange={(e) => setSelectedClass(e.target.value)}
              className="w-full px-4 py-2.5 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
            >
              <option value="">-- Pilih Kelas --</option>
              {classes.map((cls) => (
                <option key={cls.id} value={cls.id}>
                  {cls.name}
                </option>
              ))}
            </select>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">
              Pilih Mata Pelajaran
            </label>
            <select
              value={selectedSubject}
              onChange={(e) => setSelectedSubject(e.target.value)}
              className="w-full px-4 py-2.5 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
            >
              <option value="">-- Pilih Mapel --</option>
              {subjects.map((subj) => (
                <option key={subj.id} value={subj.id}>
                  {subj.namaMapel}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {selectedClass && selectedSubject && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="p-6 border-b border-gray-200 flex justify-between items-center bg-gray-50/50">
            <div>
              <h2 className="text-xl font-semibold text-gray-900">
                Lembar Penilaian
              </h2>
              <p className="text-sm text-gray-500 mt-1">
                Pastikan semua nilai terisi dengan benar sebelum menyimpan.
              </p>
            </div>
            <button
              onClick={handleSave}
              disabled={saving || loading || !skema}
              className="inline-flex items-center justify-center gap-2 px-6 py-2.5 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 focus:ring-4 focus:ring-blue-100 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
              {saving ? (
                <Loader2 className="animate-spin" size={18} />
              ) : (
                <Save size={18} />
              )}
              Simpan Perubahan
            </button>
          </div>

          <div className="overflow-x-auto">
            {loading ? (
              <div className="flex flex-col items-center justify-center py-20 text-gray-500">
                <Loader2
                  className="animate-spin mb-4 text-blue-600"
                  size={40}
                />
                <p className="font-medium">Memuat data nilai...</p>
              </div>
            ) : !skema ? (
              <div className="p-8">
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle>Skema Tidak Ditemukan</AlertTitle>
                  <AlertDescription>
                    Skema penilaian belum dibuat untuk mata pelajaran ini.
                    Silakan hubungi Admin untuk membuat skema penilaian terlebih
                    dahulu.
                  </AlertDescription>
                </Alert>
              </div>
            ) : (
              <table className="w-full text-sm text-left">
                <thead className="bg-gray-50 text-gray-700 border-b border-gray-200 font-semibold uppercase tracking-wider">
                  <tr>
                    <th className="px-6 py-4 sticky left-0 bg-gray-50 z-10 w-24">
                      NISN
                    </th>
                    <th className="px-6 py-4 sticky left-[96px] bg-gray-50 z-10 min-w-[200px]">
                      Nama Siswa
                    </th>
                    {skema.Komponen.sort((a, b) => a.urutan - b.urutan).map(
                      (comp) => (
                        <th
                          key={comp.id}
                          className="px-6 py-4 text-center min-w-[140px]"
                        >
                          <div className="flex flex-col items-center gap-1">
                            <span>{comp.namaKomponen}</span>
                            <span
                              className={`text-[10px] px-2 py-0.5 rounded-full ${
                                comp.tipe === "READ_ONLY"
                                  ? "bg-gray-200 text-gray-600"
                                  : "bg-blue-100 text-blue-700"
                              }`}
                            >
                              {comp.tipe === "READ_ONLY" ? "Otomatis" : "Input"}
                            </span>
                          </div>
                        </th>
                      )
                    )}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {gradeData.length === 0 ? (
                    <tr>
                      <td
                        colSpan={2 + skema.Komponen.length}
                        className="px-6 py-12 text-center text-gray-500"
                      >
                        <div className="flex flex-col items-center justify-center">
                          <div className="bg-gray-100 p-4 rounded-full mb-3">
                            <AlertCircle className="h-8 w-8 text-gray-400" />
                          </div>
                          <p className="text-lg font-medium text-gray-900">
                            Belum ada siswa
                          </p>
                          <p className="text-sm text-gray-500">
                            Tidak ada siswa yang terdaftar di kelas ini.
                          </p>
                        </div>
                      </td>
                    </tr>
                  ) : (
                    gradeData.map((student) => (
                      <tr
                        key={student.siswaId}
                        className="hover:bg-gray-50 transition-colors"
                      >
                        <td className="px-6 py-4 font-medium text-gray-900 sticky left-0 bg-white">
                          {student.nisn}
                        </td>
                        <td className="px-6 py-4 text-gray-700 sticky left-[96px] bg-white">
                          {student.nama}
                        </td>
                        {skema.Komponen.sort((a, b) => a.urutan - b.urutan).map(
                          (comp) => (
                            <td
                              key={comp.id}
                              className={`px-4 py-3 text-center ${
                                comp.tipe === "READ_ONLY" ? "bg-gray-50/50" : ""
                              }`}
                            >
                              {comp.tipe === "INPUT" ? (
                                <div className="relative flex justify-center group">
                                  <input
                                    type="number"
                                    value={student.grades[comp.id] ?? ""}
                                    onChange={(e) =>
                                      handleGradeChange(
                                        student.siswaId,
                                        comp.id,
                                        e.target.value
                                      )
                                    }
                                    className="w-24 px-3 py-2 border border-gray-300 rounded-md text-center focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all hover:border-gray-400"
                                    placeholder="0-100"
                                    min="0"
                                    max="100"
                                  />
                                </div>
                              ) : (
                                <span className="font-bold text-gray-700">
                                  {student.grades[comp.id] !== undefined
                                    ? student.grades[comp.id].toFixed(2)
                                    : "-"}
                                </span>
                              )}
                            </td>
                          )
                        )}
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
