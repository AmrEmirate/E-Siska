"use client";

import { useState, useEffect, useRef } from "react";
import { apiClient } from "@/lib/api-client";
import { Loader2, Save, Printer, Lock, Unlock, ArrowLeft } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";
import Link from "next/link";
import { useAuth } from "@/context/auth-context";

interface RaporData {
  infoSiswa: {
    nama: string;
    nisn: string;
    kelas: string;
    tahunAjaran: string;
  };
  nilaiAkademik: {
    mapel: string;
    kkm: number;
    nilaiAkhir: number;
    predikat: string;
    deskripsi: string;
  }[];
  ekstrakurikuler: {
    nama: string;
    nilai: string;
    deskripsi: string;
  }[];
  ketidakhadiran: {
    sakit: number;
    izin: number;
    tanpaKeterangan: number;
  };
  catatanWaliKelas: string;
  dataKokurikuler: string;
  status: "DRAFT" | "FINAL";
  tanggalCetak: string;
}

export default function RaporDetailPage() {
  const { id: siswaId } = useParams();
  const router = useRouter();
  const { toast } = useToast();
  const { user } = useAuth();

  const [rapor, setRapor] = useState<RaporData | null>(null);
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState(false);

  const [catatan, setCatatan] = useState("");
  const [kokurikuler, setKokurikuler] = useState("");

  const [activeTahunAjaran, setActiveTahunAjaran] = useState<string>("");

  useEffect(() => {
    const fetchActiveYear = async () => {
      try {
        const res = await apiClient.get("/tahun-ajaran/active");
        setActiveTahunAjaran(res.data.data.id);
      } catch (error) {
        toast({
          variant: "destructive",
          title: "Error",
          description: "Gagal mengambil tahun ajaran aktif.",
        });
      }
    };
    fetchActiveYear();
  }, []);

  useEffect(() => {
    if (activeTahunAjaran && user?.id) {
      fetchRapor();
    }
  }, [siswaId, activeTahunAjaran, user?.id]);

  const fetchRapor = async () => {
    if (!activeTahunAjaran || !user?.id) return;

    setLoading(true);
    try {
      const res = await apiClient.post(`/rapor/siswa/${siswaId}/generate`, {
        guruId: user.id,
        tahunAjaranId: activeTahunAjaran,
      });
      const data = res.data.data;
      setRapor(data);
      setCatatan(data.catatanWaliKelas !== "-" ? data.catatanWaliKelas : "");
      setKokurikuler(data.dataKokurikuler !== "-" ? data.dataKokurikuler : "");
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Gagal memuat rapor",
        description: "Terjadi kesalahan saat mengambil data rapor siswa.",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSaveData = async () => {
    if (!activeTahunAjaran || !user?.id) return;
    setProcessing(true);
    try {
      await apiClient.put(`/rapor/siswa/${siswaId}`, {
        guruId: user.id,
        tahunAjaranId: activeTahunAjaran,
        catatan,
        kokurikuler,
      });
      toast({
        title: "Berhasil disimpan",
        description: "Catatan dan data kokurikuler berhasil diperbarui.",
      });
      fetchRapor();
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Gagal menyimpan",
        description: "Gagal menyimpan perubahan.",
      });
    } finally {
      setProcessing(false);
    }
  };

  const handleFinalize = async () => {
    if (!activeTahunAjaran || !user?.id) return;
    if (
      !confirm(
        "Apakah Anda yakin ingin memfinalisasi rapor ini? Data tidak dapat diubah setelah finalisasi."
      )
    )
      return;

    setProcessing(true);
    try {
      await apiClient.post(`/rapor/siswa/${siswaId}/finalize`, {
        guruId: user.id,
        tahunAjaranId: activeTahunAjaran,
      });
      toast({
        title: "Rapor Final",
        description: "Rapor berhasil difinalisasi.",
      });
      fetchRapor();
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Gagal finalisasi",
        description:
          "Pastikan semua data wajib (catatan & kokurikuler) sudah diisi.",
      });
    } finally {
      setProcessing(false);
    }
  };

  const handleDefinalize = async () => {
    if (!activeTahunAjaran || !user?.id) return;
    if (
      !confirm("Batalkan status finalisasi? Rapor akan kembali menjadi Draft.")
    )
      return;

    setProcessing(true);
    try {
      await apiClient.post(`/rapor/siswa/${siswaId}/definalize`, {
        guruId: user.id,
        tahunAjaranId: activeTahunAjaran,
      });
      toast({
        title: "Status Draft",
        description: "Rapor dikembalikan ke status Draft.",
      });
      fetchRapor();
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Gagal membatalkan finalisasi",
        description: "Terjadi kesalahan.",
      });
    } finally {
      setProcessing(false);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
        <Loader2 className="animate-spin text-blue-600 mb-4" size={40} />
        <p className="text-gray-500 font-medium">Menyiapkan rapor siswa...</p>
      </div>
    );
  }

  if (!rapor) return null;

  const isFinal = rapor.status === "FINAL";

  return (
    <div className="min-h-screen bg-gray-100 pb-20 print:bg-white print:pb-0">
      <div className="bg-white border-b border-gray-200 sticky top-0 z-20 print:hidden">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link
              href="/dashboard/homeroom/students"
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <ArrowLeft size={20} className="text-gray-600" />
            </Link>
            {!isFinal ? (
              <>
                <button
                  onClick={handleSaveData}
                  disabled={processing}
                  className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
                >
                  {processing ? (
                    <Loader2 className="animate-spin" size={16} />
                  ) : (
                    <Save size={16} />
                  )}
                  Simpan Draft
                </button>
                <button
                  onClick={handleFinalize}
                  disabled={processing}
                  className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-lg hover:bg-green-700"
                >
                  <Lock size={16} />
                  Finalisasi
                </button>
              </>
            ) : (
              <button
                onClick={handleDefinalize}
                disabled={processing}
                className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-red-600 bg-red-50 border border-red-200 rounded-lg hover:bg-red-100"
              >
                <Unlock size={16} />
                Buka Kunci (Edit)
              </button>
            )}

            <button
              onClick={handlePrint}
              className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 ml-2"
            >
              <Printer size={16} />
              Cetak Rapor
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-[210mm] mx-auto bg-white mt-8 shadow-lg print:shadow-none print:mt-0 p-[20mm] min-h-[297mm]">
        <div className="text-center border-b-2 border-gray-800 pb-6 mb-8">
          <h2 className="text-2xl font-bold uppercase tracking-wide mb-1">
            Laporan Hasil Belajar Siswa
          </h2>
          <h3 className="text-xl font-semibold text-gray-700">
            SMA Negeri Contoh Indonesia
          </h3>
          <p className="text-sm text-gray-500 mt-2">
            Jl. Pendidikan No. 1, Jakarta Selatan. Telp: (021) 1234567
          </p>
        </div>

        <div className="grid grid-cols-2 gap-x-12 gap-y-2 mb-8 text-sm">
          <div className="flex">
            <span className="w-32 font-medium text-gray-600">Nama Siswa</span>
            <span className="mr-2">:</span>
            <span className="font-semibold uppercase">
              {rapor.infoSiswa.nama}
            </span>
          </div>
          <div className="flex">
            <span className="w-32 font-medium text-gray-600">
              Kelas / Semester
            </span>
            <span className="mr-2">:</span>
          </div>
        </div>

        <div className="mb-8">
          <h4 className="font-bold text-lg mb-3 border-l-4 border-blue-600 pl-3">
            A. Nilai Akademik
          </h4>
          <table className="w-full border-collapse border border-gray-300 text-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="border border-gray-300 px-4 py-2 w-12 text-center">
                  No
                </th>
                <th className="border border-gray-300 px-4 py-2 text-left">
                  Mata Pelajaran
                </th>
                <th className="border border-gray-300 px-4 py-2 w-16 text-center">
                  KKM
                </th>
                <th className="border border-gray-300 px-4 py-2 w-16 text-center">
                  Nilai
                </th>
                <th className="border border-gray-300 px-4 py-2 w-16 text-center">
                  Predikat
                </th>
                <th className="border border-gray-300 px-4 py-2 text-left">
                  Deskripsi Capaian Kompetensi
                </th>
              </tr>
            </thead>
            <tbody>
              {rapor.nilaiAkademik.map((nilai, idx) => (
                <tr key={idx}>
                  <td className="border border-gray-300 px-4 py-2 text-center">
                    {idx + 1}
                  </td>
                  <td className="border border-gray-300 px-4 py-2 font-medium">
                    {nilai.mapel}
                  </td>
                  <td className="border border-gray-300 px-4 py-2 text-center text-gray-500">
                    {nilai.kkm}
                  </td>
                  <td className="border border-gray-300 px-4 py-2 text-center font-bold">
                    {nilai.nilaiAkhir}
                  </td>
                  <td className="border border-gray-300 px-4 py-2 text-center">
                    {nilai.predikat}
                  </td>
                  <td className="border border-gray-300 px-4 py-2 text-xs text-gray-600 leading-relaxed">
                    {nilai.deskripsi || "Belum ada deskripsi capaian."}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mb-8">
          <h4 className="font-bold text-lg mb-3 border-l-4 border-blue-600 pl-3">
            B. Ekstrakurikuler
          </h4>
          <table className="w-full border-collapse border border-gray-300 text-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="border border-gray-300 px-4 py-2 w-12 text-center">
                  No
                </th>
                <th className="border border-gray-300 px-4 py-2 text-left">
                  Kegiatan Ekstrakurikuler
                </th>
                <th className="border border-gray-300 px-4 py-2 w-24 text-center">
                  Predikat
                </th>
                <th className="border border-gray-300 px-4 py-2 text-left">
                  Keterangan
                </th>
              </tr>
            </thead>
            <tbody>
              {rapor.ekstrakurikuler.length > 0 ? (
                rapor.ekstrakurikuler.map((ekskul, idx) => (
                  <tr key={idx}>
                    <td className="border border-gray-300 px-4 py-2 text-center">
                      {idx + 1}
                    </td>
                    <td className="border border-gray-300 px-4 py-2 font-medium">
                      {ekskul.nama}
                    </td>
                    <td className="border border-gray-300 px-4 py-2 text-center">
                      {ekskul.nilai}
                    </td>
                    <td className="border border-gray-300 px-4 py-2 text-xs text-gray-600">
                      {ekskul.deskripsi}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={4}
                    className="border border-gray-300 px-4 py-4 text-center text-gray-500 italic"
                  >
                    Tidak mengikuti ekstrakurikuler
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="mb-8 w-1/2">
          <h4 className="font-bold text-lg mb-3 border-l-4 border-blue-600 pl-3">
            C. Ketidakhadiran
          </h4>
          <table className="w-full border-collapse border border-gray-300 text-sm">
            <tbody>
              <tr>
                <td className="border border-gray-300 px-4 py-2 w-40">Sakit</td>
                <td className="border border-gray-300 px-4 py-2 text-center font-medium">
                  {rapor.ketidakhadiran.sakit} hari
                </td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2">Izin</td>
                <td className="border border-gray-300 px-4 py-2 text-center font-medium">
                  {rapor.ketidakhadiran.izin} hari
                </td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2">
                  Tanpa Keterangan
                </td>
                <td className="border border-gray-300 px-4 py-2 text-center font-medium">
                  {rapor.ketidakhadiran.tanpaKeterangan} hari
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="mb-8 break-inside-avoid">
          <h4 className="font-bold text-lg mb-3 border-l-4 border-blue-600 pl-3">
            D. Catatan Wali Kelas
          </h4>
          {isFinal ? (
            <div className="border border-gray-300 rounded p-4 bg-gray-50 text-sm min-h-[80px]">
              {rapor.catatanWaliKelas}
            </div>
          ) : (
            <textarea
              value={catatan}
              onChange={(e) => setCatatan(e.target.value)}
              placeholder="Tuliskan catatan perkembangan siswa di sini..."
              className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-sm min-h-[100px] print:hidden"
            />
          )}

          {!isFinal && (
            <div className="hidden print:block border border-gray-300 rounded p-4 text-sm min-h-[80px]">
              {catatan ||
                "................................................................................................"}
            </div>
          )}
        </div>

        <div className="mb-12 break-inside-avoid">
          <h4 className="font-bold text-lg mb-3 border-l-4 border-blue-600 pl-3">
            E. Projek Penguatan Profil Pelajar Pancasila
          </h4>
          {isFinal ? (
            <div className="border border-gray-300 rounded p-4 bg-gray-50 text-sm min-h-[80px]">
              {rapor.dataKokurikuler}
            </div>
          ) : (
            <textarea
              value={kokurikuler}
              onChange={(e) => setKokurikuler(e.target.value)}
              placeholder="Deskripsi capaian projek P5..."
              className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-sm min-h-[100px] print:hidden"
            />
          )}
          {!isFinal && (
            <div className="hidden print:block border border-gray-300 rounded p-4 text-sm min-h-[80px]">
              {kokurikuler ||
                "................................................................................................"}
            </div>
          )}
        </div>

        <div className="flex justify-between text-center mt-16 break-inside-avoid">
          <div>
            <p className="mb-20">Orang Tua / Wali</p>
            <p className="font-bold underline">
              ( .................................... )
            </p>
          </div>
          <div>
            <p className="mb-20">
              Jakarta,{" "}
              {new Date().toLocaleDateString("id-ID", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
              <br />
              Wali Kelas
            </p>
            <p className="font-bold underline">( Nama Wali Kelas )</p>
            <p className="text-sm">NIP. ........................</p>
          </div>
        </div>
      </div>
    </div>
  );
}
