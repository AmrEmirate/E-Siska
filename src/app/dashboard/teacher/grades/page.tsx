"use client";

import { useState, useEffect } from "react";
import { apiClient } from "@/lib/api-client";
import { useToast } from "@/components/ui/use-toast";
import { useAuth } from "@/context/auth-context";
import { useKelas } from "@/hooks/use-kelas";
import { useCapaian } from "@/hooks/use-capaian";
import { StudentGrade, Skema, ClassItem, SubjectItem } from "@/types/grading";
import { FilterSection } from "@/components/teacher/grades/filter-section";
import { GradingTable } from "@/components/teacher/grades/grading-table";

export default function GradesPage() {
  const { toast } = useToast();
  const { user } = useAuth();
  const { fetchTeachingClasses } = useKelas();
  const { saveCapaian } = useCapaian();

  const [classes, setClasses] = useState<ClassItem[]>([]);
  const [subjects, setSubjects] = useState<SubjectItem[]>([]);

  const [selectedClass, setSelectedClass] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("");
  const [selectedSubjectCategory, setSelectedSubjectCategory] =
    useState<string>("");

  const [skema, setSkema] = useState<Skema | null>(null);
  const [gradeData, setGradeData] = useState<StudentGrade[]>([]);
  const [capaianData, setCapaianData] = useState<Record<string, string>>({});

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
      const subject = subjects.find((s) => s.id === selectedSubject);
      if (subject) {
        setSelectedSubjectCategory(subject.kategori);
      }
      fetchGradesAndSkema();
    }
  }, [selectedClass, selectedSubject]);

  const fetchGradesAndSkema = async () => {
    setLoading(true);
    try {
      let currentSkema = null;
      try {
        const skemaRes = await apiClient.get(`/skema/mapel/${selectedSubject}`);
        currentSkema = skemaRes.data.data;
        setSkema(currentSkema);
      } catch (e) {
        setSkema(null);
      }

      const gradesRes = await apiClient.get(
        `/nilai/kelas/${selectedClass}/mapel/${selectedSubject}`
      );

      const rawGrades = gradesRes.data.data;
      setGradeData(rawGrades);

      const subject = subjects.find((s) => s.id === selectedSubject);
      if (subject?.kategori !== "EKSTRAKURIKULER") {
        const capaianRes = await apiClient.get(
          `/capaian?mapelId=${selectedSubject}`
        );
        const capaianMap: Record<string, string> = {};
        capaianRes.data.data.forEach((c: any) => {
          capaianMap[c.siswaId] = c.deskripsi;
        });
        setCapaianData(capaianMap);
      }
    } catch (error) {
      setGradeData([]);
      toast({
        variant: "destructive",
        title: "Gagal memuat nilai",
        description: "Tidak dapat mengambil data nilai.",
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
    const isEkskul = selectedSubjectCategory === "EKSTRAKURIKULER";

    setGradeData((prev) =>
      prev.map((student) => {
        if (student.siswaId === siswaId) {
          return {
            ...student,
            grades: {
              ...student.grades,
              [komponenId]: isEkskul
                ? value
                : value === ""
                ? 0
                : parseFloat(value),
            },
          };
        }
        return student;
      })
    );
  };

  const handleCapaianChange = (siswaId: string, value: string) => {
    setCapaianData((prev) => ({
      ...prev,
      [siswaId]: value,
    }));
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const isEkskul = selectedSubjectCategory === "EKSTRAKURIKULER";

      if (isEkskul) {
        if (!skema || skema.Komponen.length === 0) {
          throw new Error("Skema penilaian untuk Ekskul belum dibuat.");
        }

        const comp = skema.Komponen[0];
        const dataToSave = gradeData.map((student) => ({
          siswaId: student.siswaId,
          nilaiDeskripsi: student.grades[comp.id] as string,
          nilai: 0,
        }));

        await apiClient.post("/nilai", {
          guruId: user?.id,
          mapelId: selectedSubject,
          komponenId: comp.id,
          data: dataToSave,
        });
      } else {
        if (skema) {
          const inputComponents = skema.Komponen.filter(
            (c) => c.tipe === "INPUT"
          );
          for (const comp of inputComponents) {
            const dataToSave = gradeData.map((student) => ({
              siswaId: student.siswaId,
              nilai: Number(student.grades[comp.id]) || 0,
            }));

            await apiClient.post("/nilai", {
              guruId: user?.id,
              mapelId: selectedSubject,
              komponenId: comp.id,
              data: dataToSave,
            });
          }
        }

        const capaianPayload = Object.entries(capaianData).map(
          ([siswaId, deskripsi]) => ({
            siswaId,
            deskripsi,
          })
        );

        if (capaianPayload.length > 0) {
          await saveCapaian(user?.id || "", selectedSubject, capaianPayload);
        }
      }

      toast({
        title: "Berhasil disimpan",
        description: "Data berhasil diperbarui.",
      });
      fetchGradesAndSkema();
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Gagal menyimpan",
        description: error.message || "Terjadi kesalahan saat menyimpan.",
      });
    } finally {
      setSaving(false);
    }
  };

  const isEkskul = selectedSubjectCategory === "EKSTRAKURIKULER";

  return (
    <div className="p-4 sm:p-8 space-y-4 sm:space-y-6">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
          Input Nilai Siswa
        </h1>
        <p className="text-sm sm:text-base text-gray-600">
          {isEkskul
            ? "Input nilai deskripsi untuk Ekstrakurikuler."
            : "Input nilai angka dan capaian kompetensi."}
        </p>
      </div>

      <FilterSection
        classes={classes}
        subjects={subjects}
        selectedClass={selectedClass}
        selectedSubject={selectedSubject}
        onClassChange={setSelectedClass}
        onSubjectChange={setSelectedSubject}
      />

      {selectedClass && selectedSubject && (
        <GradingTable
          loading={loading}
          saving={saving}
          skema={skema}
          gradeData={gradeData}
          capaianData={capaianData}
          isEkskul={isEkskul}
          onGradeChange={handleGradeChange}
          onCapaianChange={handleCapaianChange}
          onSave={handleSave}
        />
      )}
    </div>
  );
}
