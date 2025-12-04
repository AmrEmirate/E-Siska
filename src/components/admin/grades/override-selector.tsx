import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface OverrideSelectorProps {
  years: any[];
  classes: any[];
  placements: any[];
  selectedYear: string;
  setSelectedYear: (value: string) => void;
  selectedClass: string;
  setSelectedClass: (value: string) => void;
  selectedStudent: string;
  setSelectedStudent: (value: string) => void;
}

export const OverrideSelector = ({
  years,
  classes,
  placements,
  selectedYear,
  setSelectedYear,
  selectedClass,
  setSelectedClass,
  selectedStudent,
  setSelectedStudent,
}: OverrideSelectorProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Pilih Data</CardTitle>
      </CardHeader>
      <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="text-sm font-medium mb-2 block">Tahun Ajaran</label>
          <Select value={selectedYear} onValueChange={setSelectedYear}>
            <SelectTrigger>
              <SelectValue placeholder="Pilih Tahun Ajaran" />
            </SelectTrigger>
            <SelectContent>
              {years.map((year) => (
                <SelectItem key={year.id} value={year.id}>
                  {year.nama}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <label className="text-sm font-medium mb-2 block">Kelas</label>
          <Select value={selectedClass} onValueChange={setSelectedClass}>
            <SelectTrigger>
              <SelectValue placeholder="Pilih Kelas" />
            </SelectTrigger>
            <SelectContent>
              {classes.map((cls) => (
                <SelectItem key={cls.id} value={cls.id}>
                  {cls.namaKelas}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <label className="text-sm font-medium mb-2 block">Siswa</label>
          <Select
            value={selectedStudent}
            onValueChange={setSelectedStudent}
            disabled={!selectedClass || !selectedYear}
          >
            <SelectTrigger>
              <SelectValue placeholder="Pilih Siswa" />
            </SelectTrigger>
            <SelectContent>
              {placements.map((p) => (
                <SelectItem key={p.siswaId} value={p.siswaId}>
                  {p.siswa?.nama} ({p.siswa?.nisn})
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </CardContent>
    </Card>
  );
};
