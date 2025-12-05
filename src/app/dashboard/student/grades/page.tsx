"use client";

import { useState, useEffect } from "react";
import { apiClient } from "@/lib/api-client";
import { Loader2, ArrowLeft, BookOpen } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import Link from "next/link";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface GradeComponent {
  komponen: string;
  tipe: string;
  nilai: number;
  guru: string;
}

interface SubjectGrades {
  mapel: string;
  kategori: string;
  components: GradeComponent[];
}

export default function StudentGradesPage() {
  const { toast } = useToast();
  const [grades, setGrades] = useState<SubjectGrades[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchGrades();
  }, []);

  const fetchGrades = async () => {
    try {
      const res = await apiClient.get("/nilai/me");
      setGrades(res.data.data);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Gagal memuat nilai",
        description: "Tidak dapat mengambil data nilai.",
      });
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <Loader2 className="animate-spin text-blue-600 mb-4" size={40} />
        <p className="text-gray-500 font-medium">Memuat data nilai...</p>
      </div>
    );
  }

  return (
    <div className="p-8 max-w-5xl mx-auto space-y-6">
      <div className="flex items-center gap-4 mb-6">
        <Link
          href="/dashboard/student"
          className="p-2 hover:bg-gray-100 rounded-full transition-colors"
        >
          <ArrowLeft size={24} className="text-gray-600" />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Nilai Akademik</h1>
          <p className="text-gray-600">
            Daftar nilai tugas, ulangan, dan ujian per mata pelajaran.
          </p>
        </div>
      </div>

      {grades.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-xl border border-dashed border-gray-300">
          <BookOpen className="mx-auto text-gray-300 mb-3" size={48} />
          <h3 className="text-lg font-medium text-gray-900">Belum ada nilai</h3>
          <p className="text-gray-500">Nilai belum tersedia untuk saat ini.</p>
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <Accordion type="single" collapsible className="w-full">
            {grades.map((subject, idx) => (
              <AccordionItem key={idx} value={`item-${idx}`}>
                <AccordionTrigger className="px-6 py-4 hover:bg-gray-50">
                  <div className="flex items-center gap-4 text-left">
                    <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center text-blue-600 font-bold">
                      {subject.mapel.substring(0, 2).toUpperCase()}
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900">
                        {subject.mapel}
                      </div>
                      <div className="text-xs text-gray-500">
                        {subject.kategori}
                      </div>
                    </div>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-6 pt-2">
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left">
                      <thead className="bg-gray-50 text-gray-700 border-b border-gray-200">
                        <tr>
                          <th className="px-4 py-3 font-medium">
                            Komponen Nilai
                          </th>
                          <th className="px-4 py-3 font-medium">Tipe</th>
                          <th className="px-4 py-3 font-medium">
                            Guru Pengampu
                          </th>
                          <th className="px-4 py-3 font-medium text-right">
                            Nilai
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-100">
                        {subject.components.map((comp, cIdx) => (
                          <tr key={cIdx}>
                            <td className="px-4 py-3 font-medium text-gray-900">
                              {comp.komponen}
                            </td>
                            <td className="px-4 py-3">
                              <span
                                className={`px-2 py-1 rounded text-xs font-medium ${
                                  comp.tipe === "INPUT"
                                    ? "bg-green-100 text-green-700"
                                    : "bg-gray-100 text-gray-600"
                                }`}
                              >
                                {comp.tipe}
                              </span>
                            </td>
                            <td className="px-4 py-3 text-gray-500">
                              {comp.guru}
                            </td>
                            <td className="px-4 py-3 text-right font-bold text-gray-900">
                              {comp.nilai}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      )}
    </div>
  );
}
