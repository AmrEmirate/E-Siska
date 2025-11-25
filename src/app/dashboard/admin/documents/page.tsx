"use client"

import { useState, useEffect } from "react"
import { useDokumen, type Dokumen } from "@/hooks/use-dokumen"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Label } from "@/components/ui/label"
import { Loader2, Plus, Trash2, FileText, Download, Upload, File } from "lucide-react"
import { Badge } from "@/components/ui/badge"

export default function DocumentsManagementPage() {
  const { data: documents, loading, fetchDokumen, uploadDokumen, deleteDokumen } = useDokumen()

  const [isUploadOpen, setIsUploadOpen] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [formData, setFormData] = useState({
    namaDokumen: "",
    jenisDokumen: "Umum",
    file: null as File | null,
  })

  useEffect(() => {
    fetchDokumen()
  }, [fetchDokumen])

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData({ ...formData, file: e.target.files[0] })
    }
  }

  const handleUpload = async () => {
    if (!formData.file || !formData.namaDokumen) return

    setUploading(true)
    const success = await uploadDokumen(formData.file, {
      namaDokumen: formData.namaDokumen,
      jenisDokumen: formData.jenisDokumen,
    })
    setUploading(false)

    if (success) {
      setIsUploadOpen(false)
      setFormData({
        namaDokumen: "",
        jenisDokumen: "Umum",
        file: null,
      })
    }
  }

  const handleDelete = async (id: string) => {
    await deleteDokumen(id)
  }

  const handleDownload = (doc: Dokumen) => {
    if (doc.urlDokumen) {
      window.open(doc.urlDokumen, "_blank")
    }
  }

  return (
    <div className="p-8 space-y-8 bg-gray-50/50 min-h-screen">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Manajemen Dokumen</h1>
          <p className="text-gray-500 mt-2">Kelola dan bagikan dokumen penting sekolah.</p>
        </div>
        <Dialog open={isUploadOpen} onOpenChange={setIsUploadOpen}>
          <DialogTrigger asChild>
            <Button className="bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-600/20 transition-all hover:scale-105">
              <Upload className="w-4 h-4 mr-2" />
              Unggah Dokumen
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Unggah Dokumen Baru</DialogTitle>
              <DialogDescription>
                Pilih file dokumen yang ingin diunggah ke sistem.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-6 py-4">
              <div className="space-y-2">
                <Label htmlFor="nama">Nama Dokumen</Label>
                <Input
                  id="nama"
                  placeholder="Contoh: Jadwal Pelajaran 2024"
                  value={formData.namaDokumen}
                  onChange={(e) => setFormData({ ...formData, namaDokumen: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="jenis">Jenis Dokumen</Label>
                <select
                  id="jenis"
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  value={formData.jenisDokumen}
                  onChange={(e) => setFormData({ ...formData, jenisDokumen: e.target.value })}
                >
                  <option value="Umum">Umum</option>
                  <option value="Akademik">Akademik</option>
                  <option value="Administrasi">Administrasi</option>
                  <option value="Lainnya">Lainnya</option>
                </select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="file">File Dokumen</Label>
                <div className="flex items-center justify-center w-full">
                  <label
                    htmlFor="file-upload"
                    className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 border-gray-300 transition-colors"
                  >
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <Upload className="w-8 h-8 mb-3 text-gray-400" />
                      <p className="mb-2 text-sm text-gray-500">
                        <span className="font-semibold">Klik untuk upload</span> atau drag and drop
                      </p>
                      <p className="text-xs text-gray-500">PDF, DOCX, XLSX (MAX. 10MB)</p>
                    </div>
                    <input id="file-upload" type="file" className="hidden" onChange={handleFileChange} />
                  </label>
                </div>
                {formData.file && (
                  <div className="text-sm text-blue-600 flex items-center gap-2 mt-2 bg-blue-50 p-2 rounded">
                    <FileText className="w-4 h-4" />
                    {formData.file.name}
                  </div>
                )}
              </div>
            </div>
            <DialogFooter>
              <Button type="submit" onClick={handleUpload} disabled={uploading || !formData.file || !formData.namaDokumen}>
                {uploading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Mengunggah...
                  </>
                ) : (
                  "Unggah"
                )}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-6 border-b border-gray-200 flex flex-col sm:flex-row justify-between items-center gap-4 bg-gray-50/30">
          <div className="flex items-center gap-2">
            <File className="w-5 h-5 text-blue-600" />
            <h2 className="text-lg font-semibold text-gray-900">Daftar Dokumen</h2>
          </div>
          <div className="text-sm text-gray-500">
            Total: <span className="font-semibold text-gray-900">{documents.length} Dokumen</span>
          </div>
        </div>

        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="bg-gray-50/50 hover:bg-gray-50/50">
                <TableHead>Nama Dokumen</TableHead>
                <TableHead>Jenis</TableHead>
                <TableHead>Tanggal Unggah</TableHead>
                <TableHead className="text-right">Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading && documents.length === 0 ? (
                [...Array(3)].map((_, i) => (
                  <TableRow key={i}>
                    <TableCell><div className="h-4 w-48 bg-gray-200 rounded animate-pulse" /></TableCell>
                    <TableCell><div className="h-4 w-24 bg-gray-200 rounded animate-pulse" /></TableCell>
                    <TableCell><div className="h-4 w-32 bg-gray-200 rounded animate-pulse" /></TableCell>
                    <TableCell><div className="h-8 w-8 bg-gray-200 rounded animate-pulse ml-auto" /></TableCell>
                  </TableRow>
                ))
              ) : documents.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={4} className="text-center py-12 text-gray-500">
                    <div className="flex flex-col items-center justify-center gap-2">
                      <FileText className="w-8 h-8 text-gray-300" />
                      <p>Belum ada dokumen yang diunggah</p>
                    </div>
                  </TableCell>
                </TableRow>
              ) : (
                documents.map((doc) => (
                  <TableRow key={doc.id} className="hover:bg-gray-50 transition-colors">
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-blue-50 rounded-lg text-blue-600">
                          <FileText className="w-5 h-5" />
                        </div>
                        <span className="font-medium text-gray-900">{doc.namaDokumen}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="secondary" className="bg-gray-100 text-gray-700 hover:bg-gray-200">
                        {doc.jenisDokumen}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <span className="text-sm text-gray-500">
                        {doc.createdAt ? new Date(doc.createdAt).toLocaleDateString("id-ID", {
                          day: 'numeric',
                          month: 'long',
                          year: 'numeric'
                        }) : "-"}
                      </span>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 hover:bg-blue-50 hover:text-blue-600"
                          onClick={() => handleDownload(doc)}
                          title="Unduh"
                        >
                          <Download className="w-4 h-4" />
                        </Button>
                        
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-red-50 hover:text-red-600">
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Hapus Dokumen?</AlertDialogTitle>
                              <AlertDialogDescription>
                                Dokumen ini akan dihapus secara permanen dan tidak dapat dikembalikan.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Batal</AlertDialogCancel>
                              <AlertDialogAction onClick={() => handleDelete(doc.id)} className="bg-red-600 hover:bg-red-700">
                                Hapus
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  )
}
