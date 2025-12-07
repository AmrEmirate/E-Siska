"use client";

import { Loader2, AlertCircle, Save } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Skema, StudentGrade } from "@/types/grading";
import { useIsMobile } from "@/components/ui/use-mobile";

interface GradingTableProps {
  loading: boolean;
  saving: boolean;
  skema: Skema | null;
  gradeData: StudentGrade[];
  capaianData: Record<string, string>;
  isEkskul: boolean;
  onGradeChange: (siswaId: string, komponenId: string, value: string) => void;
  onCapaianChange: (siswaId: string, value: string) => void;
  onSave: () => void;
}

// Mobile Card Component for each student
function StudentGradeCard({
  student,
  skema,
  capaianData,
  isEkskul,
  onGradeChange,
  onCapaianChange,
}: {
  student: StudentGrade;
  skema: Skema | null;
  capaianData: Record<string, string>;
  isEkskul: boolean;
  onGradeChange: (siswaId: string, komponenId: string, value: string) => void;
  onCapaianChange: (siswaId: string, value: string) => void;
}) {
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4 space-y-4">
      {/* Student Info */}
      <div className="border-b border-gray-100 pb-3">
        <h3 className="font-semibold text-gray-900">{student.nama}</h3>
        <p className="text-sm text-gray-500 font-mono">{student.nisn}</p>
      </div>

      {/* Grade Inputs */}
      {isEkskul ? (
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">
            Deskripsi / Nilai
          </label>
          <input
            type="text"
            value={
              skema?.Komponen[0]
                ? (student.grades[skema.Komponen[0].id] as string) || ""
                : ""
            }
            onChange={(e) =>
              skema?.Komponen[0] &&
              onGradeChange(
                student.siswaId,
                skema.Komponen[0].id,
                e.target.value
              )
            }
            className="form-input"
            placeholder="Contoh: Sangat Baik, Aktif..."
          />
        </div>
      ) : (
        <>
          {/* Grade Components */}
          <div className="grid grid-cols-2 gap-3">
            {skema?.Komponen.sort((a, b) => a.urutan - b.urutan).map((comp) => (
              <div key={comp.id} className="space-y-1">
                <label className="text-xs font-medium text-gray-600 flex items-center gap-1">
                  {comp.namaKomponen}
                  <span
                    className={`text-[10px] px-1.5 py-0.5 rounded-full ${
                      comp.tipe === "READ_ONLY"
                        ? "bg-gray-200 text-gray-600"
                        : "bg-blue-100 text-blue-700"
                    }`}
                  >
                    {comp.tipe === "READ_ONLY" ? "Auto" : "Input"}
                  </span>
                </label>
                {comp.tipe === "INPUT" ? (
                  <input
                    type="number"
                    value={student.grades[comp.id] ?? ""}
                    onChange={(e) =>
                      onGradeChange(student.siswaId, comp.id, e.target.value)
                    }
                    className="form-input text-center"
                    placeholder="0-100"
                    min="0"
                    max="100"
                  />
                ) : (
                  <div className="form-input bg-gray-50 text-center font-bold text-gray-700">
                    {student.grades[comp.id] !== undefined
                      ? Number(student.grades[comp.id]).toFixed(2)
                      : "-"}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Capaian Kompetensi */}
          <div className="space-y-2 pt-2 border-t border-gray-100">
            <label className="text-sm font-medium text-gray-700">
              Capaian Kompetensi
            </label>
            <textarea
              value={capaianData[student.siswaId] || ""}
              onChange={(e) => onCapaianChange(student.siswaId, e.target.value)}
              className="form-input min-h-[80px]"
              rows={2}
              placeholder="Deskripsi capaian kompetensi..."
            />
          </div>
        </>
      )}
    </div>
  );
}

export function GradingTable({
  loading,
  saving,
  skema,
  gradeData,
  capaianData,
  isEkskul,
  onGradeChange,
  onCapaianChange,
  onSave,
}: GradingTableProps) {
  const isMobile = useIsMobile();

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-gray-500">
        <Loader2 className="animate-spin mb-4 text-blue-600" size={40} />
        <p className="font-medium">Memuat data nilai...</p>
      </div>
    );
  }

  if (!skema && !isEkskul) {
    return (
      <div className="p-4 sm:p-8">
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Skema Tidak Ditemukan</AlertTitle>
          <AlertDescription>
            Skema penilaian belum dibuat untuk mata pelajaran ini.
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      {/* Header with Save Button */}
      <div className="p-4 sm:p-6 border-b border-gray-200 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-gray-50/50">
        <div>
          <h2 className="text-lg sm:text-xl font-semibold text-gray-900">
            Lembar Penilaian
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            {isEkskul
              ? "Isi deskripsi perkembangan siswa."
              : "Isi nilai angka dan capaian kompetensi."}
          </p>
        </div>
        <button
          onClick={onSave}
          disabled={saving || (!skema && !isEkskul)}
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 sm:px-6 py-2.5 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 focus:ring-4 focus:ring-blue-100 disabled:opacity-50 disabled:cursor-not-allowed transition-all min-h-[44px]"
        >
          {saving ? (
            <Loader2 className="animate-spin" size={18} />
          ) : (
            <Save size={18} />
          )}
          <span className="hidden sm:inline">Simpan Perubahan</span>
          <span className="sm:hidden">Simpan</span>
        </button>
      </div>

      {/* Mobile: Card View */}
      {isMobile ? (
        <div className="p-4 space-y-4">
          {gradeData.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              <p className="text-lg font-medium text-gray-900">
                Belum ada siswa
              </p>
            </div>
          ) : (
            gradeData.map((student) => (
              <StudentGradeCard
                key={student.siswaId}
                student={student}
                skema={skema}
                capaianData={capaianData}
                isEkskul={isEkskul}
                onGradeChange={onGradeChange}
                onCapaianChange={onCapaianChange}
              />
            ))
          )}
        </div>
      ) : (
        /* Desktop: Table View */
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-gray-50 text-gray-700 border-b border-gray-200 font-semibold uppercase tracking-wider">
              <tr>
                <th className="px-4 py-4 w-24">NISN</th>
                <th className="px-4 py-4 min-w-[180px]">Nama Siswa</th>

                {isEkskul ? (
                  <th className="px-4 py-4 text-center">Deskripsi / Nilai</th>
                ) : (
                  <>
                    {skema?.Komponen.sort((a, b) => a.urutan - b.urutan).map(
                      (comp) => (
                        <th
                          key={comp.id}
                          className="px-4 py-4 text-center min-w-[120px]"
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
                    <th className="px-4 py-4 text-center min-w-[250px]">
                      Capaian Kompetensi
                    </th>
                  </>
                )}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
              {gradeData.length === 0 ? (
                <tr>
                  <td
                    colSpan={
                      isEkskul ? 3 : 2 + (skema?.Komponen.length || 0) + 1
                    }
                    className="px-4 py-12 text-center text-gray-500"
                  >
                    <div className="flex flex-col items-center justify-center">
                      <p className="text-lg font-medium text-gray-900">
                        Belum ada siswa
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
                    <td className="px-4 py-4 font-medium text-gray-900 font-mono">
                      {student.nisn}
                    </td>
                    <td className="px-4 py-4 text-gray-700">{student.nama}</td>

                    {isEkskul ? (
                      <td className="px-4 py-3 text-center">
                        <input
                          type="text"
                          value={
                            skema?.Komponen[0]
                              ? (student.grades[
                                  skema.Komponen[0].id
                                ] as string) || ""
                              : ""
                          }
                          onChange={(e) =>
                            skema?.Komponen[0] &&
                            onGradeChange(
                              student.siswaId,
                              skema.Komponen[0].id,
                              e.target.value
                            )
                          }
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
                          placeholder="Contoh: Sangat Baik, Aktif..."
                        />
                      </td>
                    ) : (
                      <>
                        {skema?.Komponen.sort(
                          (a, b) => a.urutan - b.urutan
                        ).map((comp) => (
                          <td
                            key={comp.id}
                            className={`px-4 py-3 text-center ${
                              comp.tipe === "READ_ONLY" ? "bg-gray-50/50" : ""
                            }`}
                          >
                            {comp.tipe === "INPUT" ? (
                              <div className="relative flex justify-center">
                                <input
                                  type="number"
                                  value={student.grades[comp.id] ?? ""}
                                  onChange={(e) =>
                                    onGradeChange(
                                      student.siswaId,
                                      comp.id,
                                      e.target.value
                                    )
                                  }
                                  className="w-20 px-3 py-2 border border-gray-300 rounded-md text-center focus:ring-2 focus:ring-blue-500 outline-none"
                                  placeholder="0-100"
                                  min="0"
                                  max="100"
                                />
                              </div>
                            ) : (
                              <span className="font-bold text-gray-700">
                                {student.grades[comp.id] !== undefined
                                  ? Number(student.grades[comp.id]).toFixed(2)
                                  : "-"}
                              </span>
                            )}
                          </td>
                        ))}
                        <td className="px-4 py-3">
                          <textarea
                            value={capaianData[student.siswaId] || ""}
                            onChange={(e) =>
                              onCapaianChange(student.siswaId, e.target.value)
                            }
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 outline-none text-sm"
                            rows={2}
                            placeholder="Deskripsi capaian kompetensi..."
                          />
                        </td>
                      </>
                    )}
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
