import { Label } from "@/components/ui/label";
import { Guru } from "@/hooks/use-guru";
import { Mapel } from "@/hooks/use-mapel";
import { Kelas } from "@/hooks/use-kelas";

interface AssignmentFormProps {
  formData: {
    guruId: string;
    kelasId: string;
    mapelId: string;
    tahunAjaranId: string;
  };
  setFormData: (data: any) => void;
  teachers: Guru[];
  subjects: Mapel[];
  classes: Kelas[];
}

export const AssignmentForm = ({
  formData,
  setFormData,
  teachers,
  subjects,
  classes,
}: AssignmentFormProps) => {
  return (
    <div className="grid gap-6 py-4">
      <div className="space-y-2">
        <Label htmlFor="guru">Guru</Label>
        <select
          id="guru"
          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          value={formData.guruId}
          onChange={(e) => setFormData({ ...formData, guruId: e.target.value })}
        >
          <option value="">Pilih Guru</option>
          {teachers.map((teacher) => (
            <option key={teacher.id} value={teacher.id}>
              {teacher.nama} ({teacher.nip})
            </option>
          ))}
        </select>
      </div>
      <div className="space-y-2">
        <Label htmlFor="mapel">Mata Pelajaran</Label>
        <select
          id="mapel"
          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          value={formData.mapelId}
          onChange={(e) =>
            setFormData({ ...formData, mapelId: e.target.value })
          }
        >
          <option value="">Pilih Mata Pelajaran</option>
          {subjects.map((subject) => (
            <option key={subject.id} value={subject.id}>
              {subject.namaMapel} ({subject.kategori})
            </option>
          ))}
        </select>
      </div>
      <div className="space-y-2">
        <Label htmlFor="kelas">Kelas</Label>
        <select
          id="kelas"
          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          value={formData.kelasId}
          onChange={(e) =>
            setFormData({ ...formData, kelasId: e.target.value })
          }
        >
          <option value="">Pilih Kelas</option>
          {classes.map((kelas) => (
            <option key={kelas.id} value={kelas.id}>
              {kelas.namaKelas}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};
