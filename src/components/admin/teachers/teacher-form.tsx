import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Guru } from "@/hooks/use-guru";

interface TeacherFormProps {
  formData: Partial<Guru>;
  setFormData: (data: Partial<Guru>) => void;
  isEdit?: boolean;
}

export const TeacherForm = ({
  formData,
  setFormData,
  isEdit = false,
}: TeacherFormProps) => {
  const handleNumberInput = (
    field: keyof Guru,
    value: string,
    maxLength?: number
  ) => {
    const numericValue = value.replace(/\D/g, "");
    const finalValue = maxLength
      ? numericValue.slice(0, maxLength)
      : numericValue;
    setFormData({ ...formData, [field]: finalValue });
  };

  const nipError =
    formData.nip && formData.nip.length !== 18
      ? "NIP harus tepat 18 digit"
      : "";
  const nikError =
    formData.nik && formData.nik.length !== 16
      ? "NIK harus tepat 16 digit"
      : "";
  const nuptkError =
    formData.nuptk && formData.nuptk.length !== 16
      ? "NUPTK harus tepat 16 digit"
      : "";

  return (
    <div className="grid gap-6 py-4">
      <div className="space-y-2">
        <Label htmlFor="nama">Nama Lengkap dengan Gelar</Label>
        <Input
          id="nama"
          placeholder="Nama Guru"
          value={formData.nama}
          onChange={(e) => setFormData({ ...formData, nama: e.target.value })}
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="jk">Jenis Kelamin</Label>
          <select
            id="jk"
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            value={formData.jenisKelamin}
            onChange={(e) =>
              setFormData({
                ...formData,
                jenisKelamin: e.target.value as "L" | "P",
              })
            }
          >
            <option value="L">Laki-laki</option>
            <option value="P">Perempuan</option>
          </select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="agama">Agama</Label>
          <select
            id="agama"
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            value={formData.agama}
            onChange={(e) =>
              setFormData({ ...formData, agama: e.target.value })
            }
          >
            <option value="Islam">Islam</option>
            <option value="Kristen">Kristen</option>
            <option value="Katolik">Katolik</option>
            <option value="Hindu">Hindu</option>
            <option value="Buddha">Buddha</option>
            <option value="Konghucu">Konghucu</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="tempatLahir">Tempat Lahir</Label>
          <Input
            id="tempatLahir"
            value={formData.tempatLahir}
            onChange={(e) =>
              setFormData({ ...formData, tempatLahir: e.target.value })
            }
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="tanggalLahir">Tanggal Lahir</Label>
          <Input
            id="tanggalLahir"
            type="date"
            value={formData.tanggalLahir}
            onChange={(e) =>
              setFormData({ ...formData, tanggalLahir: e.target.value })
            }
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="noTelp">No. Telepon</Label>
        <Input
          id="noTelp"
          value={formData.noTelp}
          onChange={(e) => setFormData({ ...formData, noTelp: e.target.value })}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          placeholder="guru@sekolah.sch.id"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="nik">NIK (16 digit)</Label>
        <Input
          id="nik"
          value={formData.nik}
          onChange={(e) => handleNumberInput("nik", e.target.value, 16)}
          placeholder="Masukkan 16 digit NIK"
          maxLength={16}
        />
        {nikError && <p className="text-xs text-red-500">{nikError}</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="nuptk">NUPTK (16 digit)</Label>
        <Input
          id="nuptk"
          value={formData.nuptk}
          onChange={(e) => handleNumberInput("nuptk", e.target.value, 16)}
          placeholder="Masukkan 16 digit NUPTK"
          maxLength={16}
        />
        {nuptkError && <p className="text-xs text-red-500">{nuptkError}</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="nip">NIP (18 digit)</Label>
        <Input
          id="nip"
          placeholder="Masukkan 18 digit NIP"
          value={formData.nip}
          onChange={(e) => handleNumberInput("nip", e.target.value, 18)}
          maxLength={18}
        />
        {nipError && <p className="text-xs text-red-500">{nipError}</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="statusKepegawaian">Status Pegawai</Label>
        <select
          id="statusKepegawaian"
          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          value={formData.statusKepegawaian}
          onChange={(e) =>
            setFormData({ ...formData, statusKepegawaian: e.target.value })
          }
        >
          <option value="PNS">PNS</option>
          <option value="Honorer">Honorer</option>
          <option value="GTY">GTY</option>
          <option value="GTT">GTT</option>
        </select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="alamat">Alamat</Label>
        <Textarea
          id="alamat"
          value={formData.alamat}
          onChange={(e) => setFormData({ ...formData, alamat: e.target.value })}
        />
      </div>

      <div className="space-y-2">
        <Label>Status</Label>
        <div className="flex items-center space-x-2">
          <Switch
            checked={formData.isAktif}
            onCheckedChange={(checked) =>
              setFormData({ ...formData, isAktif: checked })
            }
          />
          <Label>{formData.isAktif ? "Aktif" : "Non Aktif"}</Label>
        </div>
      </div>
    </div>
  );
};
