import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, Save } from "lucide-react";

interface OverrideTableProps {
  loading: boolean;
  raporLoading: boolean;
  currentRapor: any;
  mapels: any[];
  grades: Record<string, number>;
  handleGradeChange: (mapelId: string, value: string) => void;
  handleSave: (mapelId: string) => void;
}

export const OverrideTable = ({
  loading,
  raporLoading,
  currentRapor,
  mapels,
  grades,
  handleGradeChange,
  handleSave,
}: OverrideTableProps) => {
  const getExistingGrade = (mapelId: string) => {
    if (!currentRapor?.NilaiRaporAkhir) return null;
    const nilai = currentRapor.NilaiRaporAkhir.find(
      (n: any) => n.mapelId === mapelId
    );
    return nilai ? nilai.nilaiAkhir : null;
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Daftar Nilai</CardTitle>
      </CardHeader>
      <CardContent>
        {raporLoading ? (
          <div className="flex justify-center p-8">
            <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
          </div>
        ) : !currentRapor ? (
          <div className="text-center p-8 text-gray-500">
            Data rapor belum tersedia atau belum difinalisasi untuk siswa ini.
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Mata Pelajaran</TableHead>
                <TableHead>Kategori</TableHead>
                <TableHead>Nilai Saat Ini</TableHead>
                <TableHead>Nilai Baru</TableHead>
                <TableHead>Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mapels.map((mapel) => {
                const existingGrade = getExistingGrade(mapel.id);
                const isOverridden = currentRapor.NilaiRaporAkhir?.find(
                  (n: any) => n.mapelId === mapel.id
                )?.isOverride;

                return (
                  <TableRow key={mapel.id}>
                    <TableCell className="font-medium">
                      {mapel.namaMapel}
                    </TableCell>
                    <TableCell>{mapel.kategori}</TableCell>
                    <TableCell>
                      {existingGrade !== null ? (
                        <span
                          className={
                            isOverridden ? "text-orange-600 font-bold" : ""
                          }
                        >
                          {existingGrade} {isOverridden && "(Overridden)"}
                        </span>
                      ) : (
                        "-"
                      )}
                    </TableCell>
                    <TableCell>
                      <Input
                        type="number"
                        min="0"
                        max="100"
                        className="w-24"
                        placeholder={existingGrade?.toString() || "0"}
                        onChange={(e) =>
                          handleGradeChange(mapel.id, e.target.value)
                        }
                      />
                    </TableCell>
                    <TableCell>
                      <Button
                        size="sm"
                        onClick={() => handleSave(mapel.id)}
                        disabled={loading || grades[mapel.id] === undefined}
                      >
                        {loading ? (
                          <Loader2 className="h-4 w-4 animate-spin" />
                        ) : (
                          <Save className="h-4 w-4 mr-1" />
                        )}
                        Simpan
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        )}
      </CardContent>
    </Card>
  );
};
