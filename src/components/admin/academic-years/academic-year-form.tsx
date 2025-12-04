import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, Calendar } from "lucide-react";

interface AcademicYearFormProps {
  formData: {
    tahun: string;
    semester: "Ganjil" | "Genap";
    tanggalMulai: string;
    tanggalSelesai: string;
  };
  setFormData: (data: any) => void;
  onSubmit: () => void;
  loading: boolean;
  editingId: string | null;
}

export const AcademicYearForm = ({
  formData,
  setFormData,
  onSubmit,
  loading,
  editingId,
}: AcademicYearFormProps) => {
  return (
    <Card className="border-blue-100 shadow-lg animate-in slide-in-from-top-4 duration-200">
      <CardHeader className="bg-blue-50/50 border-b border-blue-100">
        <CardTitle className="text-blue-900">
          {editingId ? "Edit Tahun Ajaran" : "Tambah Tahun Ajaran Baru"}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6 pt-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">
              Tahun Ajaran
            </label>
            <Input
              placeholder="Contoh: 2024/2025"
              value={formData.tahun}
              onChange={(e) =>
                setFormData({ ...formData, tahun: e.target.value })
              }
              className="border-gray-200 focus:border-blue-500"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">
              Semester
            </label>
            <Select
              value={formData.semester}
              onValueChange={(value: "Ganjil" | "Genap") =>
                setFormData({ ...formData, semester: value })
              }
            >
              <SelectTrigger className="border-gray-200 focus:border-blue-500">
                <SelectValue placeholder="Pilih Semester" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Ganjil">Ganjil</SelectItem>
                <SelectItem value="Genap">Genap</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">
              Tanggal Mulai
            </label>
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                type="date"
                value={formData.tanggalMulai}
                onChange={(e) =>
                  setFormData({ ...formData, tanggalMulai: e.target.value })
                }
                className="pl-10 border-gray-200 focus:border-blue-500"
              />
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">
              Tanggal Selesai
            </label>
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                type="date"
                value={formData.tanggalSelesai}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    tanggalSelesai: e.target.value,
                  })
                }
                className="pl-10 border-gray-200 focus:border-blue-500"
              />
            </div>
          </div>
        </div>
        <div className="flex justify-end pt-2">
          <Button
            onClick={onSubmit}
            className="bg-blue-600 hover:bg-blue-700 min-w-[150px]"
            disabled={loading}
          >
            {loading ? (
              <>
                <Loader2 className="animate-spin mr-2" size={16} />
                {editingId ? "Menyimpan..." : "Menambahkan..."}
              </>
            ) : editingId ? (
              "Simpan Perubahan"
            ) : (
              "Simpan Data"
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
