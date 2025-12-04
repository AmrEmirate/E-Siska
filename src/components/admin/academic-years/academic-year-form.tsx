import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2 } from "lucide-react";

interface AcademicYearFormProps {
  formData: {
    tahun: string;
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
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">
            Tahun Ajaran
          </label>
          <Input
            placeholder="Contoh: 2024/2025 Ganjil"
            value={formData.tahun}
            onChange={(e) =>
              setFormData({ ...formData, tahun: e.target.value })
            }
            className="border-gray-200 focus:border-blue-500"
          />
          <p className="text-xs text-gray-500">
            Format: Tahun/Tahun Semester (contoh: 2024/2025 Ganjil)
          </p>
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
