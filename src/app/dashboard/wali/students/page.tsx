"use client";

import { useEffect, useState } from "react";
import { usePenempatan } from "@/hooks/use-penempatan";
import { useTahunAjaran } from "@/hooks/use-tahun-ajaran";
import { Loader2, User, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

export default function WaliStudentListPage() {
  const { data: penempatanData, fetchPenempatan, loading } = usePenempatan();
  const { data: tahunAjaran, fetchTahunAjaran } = useTahunAjaran();
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchTahunAjaran();
    fetchPenempatan();
  }, [fetchTahunAjaran, fetchPenempatan]);

  const activeYear = tahunAjaran.find((t) => t.status === "Aktif");

  const filteredStudents = penempatanData.filter(
    (p) =>
      p.siswa?.nama.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.siswa?.nisn.includes(searchTerm)
  );

  return (
    <div className="p-8 space-y-8 bg-gray-50/50 min-h-screen">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight">
            Data Siswa Bimbingan
          </h1>
          <p className="text-gray-500 mt-2">
            Daftar siswa di kelas Anda untuk Tahun Ajaran{" "}
            {activeYear?.tahun || "-"}.
          </p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-6 border-b border-gray-200 flex flex-col sm:flex-row justify-between items-center gap-4 bg-gray-50/30">
          <div className="relative w-full sm:max-w-sm">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Cari siswa (Nama / NISN)..."
              className="pl-10 bg-white"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="text-sm text-gray-500">
            Total:{" "}
            <span className="font-semibold text-gray-900">
              {filteredStudents.length} Siswa
            </span>
          </div>
        </div>

        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="bg-gray-50/50 hover:bg-gray-50/50">
                <TableHead>NISN</TableHead>
                <TableHead>Nama Lengkap</TableHead>
                <TableHead>Jenis Kelamin</TableHead>
                <TableHead>Kelas</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading && penempatanData.length === 0 ? (
                [...Array(5)].map((_, i) => (
                  <TableRow key={i}>
                    <TableCell>
                      <div className="h-4 w-24 bg-gray-200 rounded animate-pulse" />
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
                      <div className="h-4 w-20 bg-gray-200 rounded animate-pulse" />
                    </TableCell>
                  </TableRow>
                ))
              ) : filteredStudents.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={5}
                    className="text-center py-12 text-gray-500"
                  >
                    <div className="flex flex-col items-center justify-center gap-2">
                      <User className="w-8 h-8 text-gray-300" />
                      <p>Tidak ada data siswa ditemukan</p>
                    </div>
                  </TableCell>
                </TableRow>
              ) : (
                filteredStudents.map((p) => (
                  <TableRow
                    key={p.id}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <TableCell className="font-medium">
                      {p.siswa?.nisn || "-"}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-xs">
                          {p.siswa?.nama.charAt(0) || "?"}
                        </div>
                        {p.siswa?.nama || "-"}
                      </div>
                    </TableCell>
                    <TableCell>
                      {p.siswa?.jenisKelamin === "L"
                        ? "Laki-laki"
                        : "Perempuan"}
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant="outline"
                        className="bg-blue-50 text-blue-700 border-blue-200"
                      >
                        {p.kelas?.namaKelas || "-"}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant="secondary"
                        className="bg-green-100 text-green-700"
                      >
                        Aktif
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}
