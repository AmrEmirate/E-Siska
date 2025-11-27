"use client";

import { useState, useEffect } from "react";
import { useSekolah, type Sekolah } from "@/hooks/use-sekolah";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Loader2,
  School,
  MapPin,
  Phone,
  Mail,
  Globe,
  User,
  Building2,
  Save,
} from "lucide-react";

export default function SchoolInfoPage() {
  const { data, loading, fetchSekolah, updateSekolah } = useSekolah();

  const [formData, setFormData] = useState<Partial<Sekolah>>({
    namaSekolah: "",
    npsn: "",
    alamat: "",
    noTelp: "",
    email: "",
    website: "",
    kepalaSekolah: "",
  });

  useEffect(() => {
    fetchSekolah();
  }, [fetchSekolah]);

  useEffect(() => {
    if (data) {
      setFormData({
        namaSekolah: data.namaSekolah || "",
        npsn: data.npsn || "",
        alamat: data.alamat || "",
        noTelp: data.noTelp || "",
        email: data.email || "",
        website: data.website || "",
        kepalaSekolah: data.kepalaSekolah || "",
      });
    }
  }, [data]);

  const handleSave = async () => {
    const success = await updateSekolah(formData);
    if (success) {
    }
  };

  if (loading && !data) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px]">
        <Loader2 className="animate-spin text-blue-600 mb-4" size={40} />
        <p className="text-gray-500 font-medium">Memuat data sekolah...</p>
      </div>
    );
  }

  return (
    <div className="p-8 space-y-8 bg-gray-50/50 min-h-screen">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight">
            Data Profil Sekolah
          </h1>
          <p className="text-gray-500 mt-2">
            Kelola informasi identitas dan kontak sekolah.
          </p>
        </div>
        <Button
          onClick={handleSave}
          className="bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-600/20 transition-all hover:scale-105"
          disabled={loading}
        >
          {loading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Menyimpan...
            </>
          ) : (
            <>
              <Save className="mr-2 h-4 w-4" />
              Simpan Perubahan
            </>
          )}
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <Card className="border-gray-200 shadow-sm">
            <CardHeader>
              <div className="flex items-center gap-2">
                <School className="w-5 h-5 text-blue-600" />
                <CardTitle>Identitas Sekolah</CardTitle>
              </div>
              <CardDescription>
                Informasi dasar mengenai sekolah.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="namaSekolah">Nama Sekolah</Label>
                  <div className="relative">
                    <Building2 className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                    <Input
                      id="namaSekolah"
                      className="pl-9"
                      placeholder="Contoh: SMA Negeri 1 Jakarta"
                      value={formData.namaSekolah}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          namaSekolah: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="npsn">NPSN</Label>
                  <Input
                    id="npsn"
                    placeholder="Nomor Pokok Sekolah Nasional"
                    value={formData.npsn}
                    onChange={(e) =>
                      setFormData({ ...formData, npsn: e.target.value })
                    }
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="kepalaSekolah">Kepala Sekolah</Label>
                <div className="relative">
                  <User className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                  <Input
                    id="kepalaSekolah"
                    className="pl-9"
                    placeholder="Nama Kepala Sekolah"
                    value={formData.kepalaSekolah}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        kepalaSekolah: e.target.value,
                      })
                    }
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-gray-200 shadow-sm">
            <CardHeader>
              <div className="flex items-center gap-2">
                <MapPin className="w-5 h-5 text-blue-600" />
                <CardTitle>Alamat & Lokasi</CardTitle>
              </div>
              <CardDescription>Alamat lengkap sekolah.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Label htmlFor="alamat">Alamat Lengkap</Label>
                <Input
                  id="alamat"
                  placeholder="Jalan, Kelurahan, Kecamatan, Kota/Kabupaten"
                  value={formData.alamat}
                  onChange={(e) =>
                    setFormData({ ...formData, alamat: e.target.value })
                  }
                />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card className="border-gray-200 shadow-sm h-full">
            <CardHeader>
              <div className="flex items-center gap-2">
                <Phone className="w-5 h-5 text-blue-600" />
                <CardTitle>Kontak & Media</CardTitle>
              </div>
              <CardDescription>
                Informasi kontak yang dapat dihubungi.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="noTelp">Nomor Telepon</Label>
                <div className="relative">
                  <Phone className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                  <Input
                    id="noTelp"
                    className="pl-9"
                    placeholder="021-xxxxxxx"
                    value={formData.noTelp}
                    onChange={(e) =>
                      setFormData({ ...formData, noTelp: e.target.value })
                    }
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                  <Input
                    id="email"
                    className="pl-9"
                    placeholder="sekolah@example.com"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="website">Website</Label>
                <div className="relative">
                  <Globe className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                  <Input
                    id="website"
                    className="pl-9"
                    placeholder="www.sekolah.sch.id"
                    value={formData.website}
                    onChange={(e) =>
                      setFormData({ ...formData, website: e.target.value })
                    }
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
