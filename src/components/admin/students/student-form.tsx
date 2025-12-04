import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Siswa } from "@/hooks/use-siswa";

interface StudentFormProps {
  formData: Partial<Siswa>;
  setFormData: (data: Partial<Siswa>) => void;
}

export const StudentForm = ({ formData, setFormData }: StudentFormProps) => (
  <div className="grid gap-6 py-4">
    <div className="space-y-2">
      <Label htmlFor="nisn">NISN</Label>
      <Input
        id="nisn"
        value={formData.nisn}
        onChange={(e) => setFormData({ ...formData, nisn: e.target.value })}
        placeholder="Masukkan NISN"
      />
    </div>

    <div className="space-y-2">
      <Label htmlFor="nama">Nama Peserta Didik</Label>
      <Input
        id="nama"
        value={formData.nama}
        onChange={(e) => setFormData({ ...formData, nama: e.target.value })}
      />
    </div>

    <div className="grid grid-cols-2 gap-4">
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
          onChange={(e) => setFormData({ ...formData, agama: e.target.value })}
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

    <div className="grid grid-cols-2 gap-4">
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
      <Label htmlFor="pendidikanSebelumnya">Pendidikan Sebelumnya</Label>
      <Input
        id="pendidikanSebelumnya"
        value={formData.pendidikanSebelumnya}
        onChange={(e) =>
          setFormData({ ...formData, pendidikanSebelumnya: e.target.value })
        }
      />
    </div>

    <div className="space-y-2">
      <Label htmlFor="alamat">Alamat Peserta Didik</Label>
      <Textarea
        id="alamat"
        value={formData.alamat}
        onChange={(e) => setFormData({ ...formData, alamat: e.target.value })}
      />
    </div>

    <div className="grid grid-cols-2 gap-4">
      <div className="space-y-2">
        <Label htmlFor="namaAyah">Nama Ayah Peserta Didik</Label>
        <Input
          id="namaAyah"
          value={formData.namaAyah}
          onChange={(e) =>
            setFormData({ ...formData, namaAyah: e.target.value })
          }
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="pekerjaanAyah">Pekerjaan</Label>
        <Input
          id="pekerjaanAyah"
          value={formData.pekerjaanAyah}
          onChange={(e) =>
            setFormData({ ...formData, pekerjaanAyah: e.target.value })
          }
        />
      </div>
    </div>

    <div className="grid grid-cols-2 gap-4">
      <div className="space-y-2">
        <Label htmlFor="namaIbu">Nama Ibu Peserta Didik</Label>
        <Input
          id="namaIbu"
          value={formData.namaIbu}
          onChange={(e) =>
            setFormData({ ...formData, namaIbu: e.target.value })
          }
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="pekerjaanIbu">Pekerjaan</Label>
        <Input
          id="pekerjaanIbu"
          value={formData.pekerjaanIbu}
          onChange={(e) =>
            setFormData({ ...formData, pekerjaanIbu: e.target.value })
          }
        />
      </div>
    </div>

    <div className="space-y-2">
      <Label htmlFor="alamatOrtu">Alamat Orang Tua Peserta Didik</Label>
      <Textarea
        id="alamatOrtu"
        value={formData.alamatOrtu}
        onChange={(e) =>
          setFormData({ ...formData, alamatOrtu: e.target.value })
        }
      />
    </div>

    <div className="grid grid-cols-2 gap-4">
      <div className="space-y-2">
        <Label htmlFor="namaWali">Nama Wali Peserta Didik</Label>
        <Input
          id="namaWali"
          value={formData.namaWali}
          onChange={(e) =>
            setFormData({ ...formData, namaWali: e.target.value })
          }
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="pekerjaanWali">Pekerjaan</Label>
        <Input
          id="pekerjaanWali"
          value={formData.pekerjaanWali}
          onChange={(e) =>
            setFormData({ ...formData, pekerjaanWali: e.target.value })
          }
        />
      </div>
    </div>

    <div className="space-y-2">
      <Label htmlFor="alamatWali">Alamat Wali Peserta Didik</Label>
      <Textarea
        id="alamatWali"
        value={formData.alamatWali}
        onChange={(e) =>
          setFormData({ ...formData, alamatWali: e.target.value })
        }
      />
    </div>

    <div className="space-y-2">
      <Label htmlFor="status">Status</Label>
      <select
        id="status"
        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
        value={formData.status}
        onChange={(e) =>
          setFormData({ ...formData, status: e.target.value as any })
        }
      >
        <option value="Aktif">Aktif</option>
        <option value="Non Aktif">Non Aktif</option>
        <option value="Lulus">Lulus</option>
        <option value="Keluar">Keluar</option>
        <option value="Pindah">Pindah</option>
      </select>
    </div>
  </div>
);
