"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  CheckCircle,
  AlertCircle,
  Edit,
  Lock,
  Unlock,
  Loader2,
} from "lucide-react";

export interface StudentStatus {
  id: string;
  nisn: string;
  name: string;
  status: "DRAFT" | "FINAL" | "BELUM_ADA";
  raporId?: string;
  catatan?: string;
  kokurikuler?: string;
}

interface StudentTableProps {
  students: StudentStatus[];
  loading: boolean;
  onEdit: (student: StudentStatus) => void;
  onFinalize: (student: StudentStatus) => void;
  onDefinalize: (student: StudentStatus) => void;
}

export function StudentTable({
  students,
  loading,
  onEdit,
  onFinalize,
  onDefinalize,
}: StudentTableProps) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      <div className="p-6 border-b border-gray-200 flex flex-col sm:flex-row justify-between items-center gap-4 bg-gray-50/30">
        <div className="text-sm text-gray-500">
          Total Siswa:{" "}
          <span className="font-semibold text-gray-900">{students.length}</span>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">
                NISN
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">
                Nama Siswa
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">
                Status Rapor
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">
                Kelengkapan Data
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-700 uppercase">
                Aksi
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {students.map((student) => (
              <tr
                key={student.id}
                className="hover:bg-gray-50 transition-colors"
              >
                <td className="px-6 py-4 text-sm font-medium text-gray-900">
                  {student.nisn}
                </td>
                <td className="px-6 py-4 text-sm text-gray-700">
                  {student.name}
                </td>
                <td className="px-6 py-4 text-sm">
                  <Badge
                    variant={
                      student.status === "FINAL"
                        ? "default"
                        : student.status === "DRAFT"
                        ? "secondary"
                        : "outline"
                    }
                    className={
                      student.status === "FINAL"
                        ? "bg-green-100 text-green-800 hover:bg-green-100"
                        : student.status === "DRAFT"
                        ? "bg-yellow-100 text-yellow-800 hover:bg-yellow-100"
                        : "text-gray-500"
                    }
                  >
                    {student.status === "FINAL" ? (
                      <>
                        <Lock className="w-3 h-3 mr-1" /> Final
                      </>
                    ) : student.status === "DRAFT" ? (
                      <>
                        <Unlock className="w-3 h-3 mr-1" /> Draft
                      </>
                    ) : (
                      "Belum Ada"
                    )}
                  </Badge>
                </td>
                <td className="px-6 py-4 text-sm">
                  <div className="flex items-center gap-2">
                    {student.catatan && student.kokurikuler ? (
                      <span className="text-green-600 flex items-center text-xs font-medium">
                        <CheckCircle className="w-3 h-3 mr-1" /> Lengkap
                      </span>
                    ) : (
                      <span className="text-red-500 flex items-center text-xs font-medium">
                        <AlertCircle className="w-3 h-3 mr-1" /> Belum Lengkap
                      </span>
                    )}
                  </div>
                </td>
                <td className="px-6 py-4 text-sm text-right space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onEdit(student)}
                    disabled={student.status === "FINAL" || loading}
                    className="h-8"
                  >
                    <Edit className="w-3.5 h-3.5 mr-1" /> Data
                  </Button>

                  {student.status === "FINAL" ? (
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => onDefinalize(student)}
                      disabled={loading}
                      className="h-8"
                    >
                      <Unlock className="w-3.5 h-3.5 mr-1" /> Buka
                    </Button>
                  ) : (
                    <Button
                      className="bg-green-600 hover:bg-green-700 text-white h-8"
                      size="sm"
                      onClick={() => onFinalize(student)}
                      disabled={loading || student.status === "BELUM_ADA"}
                    >
                      <Lock className="w-3.5 h-3.5 mr-1" /> Finalisasi
                    </Button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
