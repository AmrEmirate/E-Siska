"use client";

import { useState, useEffect } from "react";
import { useDokumen, type Dokumen } from "@/hooks/use-dokumen";
import { Button } from "@/components/ui/button";
import { Upload } from "lucide-react";
import { DocumentForm } from "@/components/admin/documents/document-form";
import { DocumentList } from "@/components/admin/documents/document-list";

export default function DocumentsManagementPage() {
  const {
    data: documents,
    loading,
    fetchDokumen,
    uploadDokumen,
    deleteDokumen,
  } = useDokumen();

  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    fetchDokumen();
  }, [fetchDokumen]);

  const handleUpload = async (data: {
    namaDokumen: string;
    jenisDokumen: string;
    file: File;
  }) => {
    setUploading(true);
    const success = await uploadDokumen(data.file, {
      namaDokumen: data.namaDokumen,
      jenisDokumen: data.jenisDokumen,
    });
    setUploading(false);

    if (success) {
      setIsUploadOpen(false);
    }
  };

  const handleDelete = async (id: string) => {
    await deleteDokumen(id);
  };

  const handleDownload = (doc: Dokumen) => {
    if (doc.urlDokumen) {
      window.open(doc.urlDokumen, "_blank");
    }
  };

  return (
    <div className="p-8 space-y-8 bg-gray-50/50 min-h-screen">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight">
            Manajemen Dokumen
          </h1>
          <p className="text-gray-500 mt-2">
            Kelola dan bagikan dokumen penting sekolah.
          </p>
        </div>
        <Button
          className="bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-600/20 transition-all hover:scale-105"
          onClick={() => setIsUploadOpen(true)}
        >
          <Upload className="w-4 h-4 mr-2" />
          Unggah Dokumen
        </Button>
      </div>

      <DocumentList
        documents={documents}
        loading={loading}
        onDelete={handleDelete}
        onDownload={handleDownload}
      />

      <DocumentForm
        isOpen={isUploadOpen}
        onOpenChange={setIsUploadOpen}
        onSubmit={handleUpload}
        loading={uploading}
      />
    </div>
  );
}
