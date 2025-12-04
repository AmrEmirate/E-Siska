"use client";

import { useState, useEffect } from "react";
import { apiClient } from "@/lib/api-client";
import { useToast } from "@/components/ui/use-toast";
import { FileText, Download, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Document {
  id: string;
  judul: string;
  urlFile: string;
  createdAt: string;
}

export default function TeacherDocumentsPage() {
  const { toast } = useToast();
  const [documents, setDocuments] = useState<Document[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDocuments();
  }, []);

  const fetchDocuments = async () => {
    try {
      const response = await apiClient.get("/dokumen");
      setDocuments(response.data.data || []);
    } catch (error) {
      toast({
        title: "Gagal memuat dokumen",
        description: "Tidak dapat mengambil daftar dokumen.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = (doc: Document) => {
    window.open(doc.urlFile, "_blank");
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px]">
        <Loader2 className="animate-spin text-blue-600 mb-4" size={40} />
        <p className="text-gray-500 font-medium">Memuat dokumen...</p>
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-8 space-y-6">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
          Dokumen Sekolah
        </h1>
        <p className="text-sm sm:text-base text-gray-500 mt-2">
          Unduh dokumen yang dibagikan oleh sekolah.
        </p>
      </div>

      {documents.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-xl border border-dashed border-gray-300">
          <FileText className="w-12 h-12 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900">
            Belum ada dokumen
          </h3>
          <p className="text-gray-500">
            Dokumen akan muncul setelah diunggah oleh Admin.
          </p>
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {documents.map((doc) => (
            <div
              key={doc.id}
              className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-all"
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600 flex-shrink-0">
                  <FileText size={24} />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-gray-900 truncate">
                    {doc.judul}
                  </h3>
                  <p className="text-xs text-gray-400 mt-2">
                    {new Date(doc.createdAt).toLocaleDateString("id-ID")}
                  </p>
                </div>
              </div>
              <Button
                onClick={() => handleDownload(doc)}
                className="w-full mt-4"
                variant="outline"
              >
                <Download className="w-4 h-4 mr-2" />
                Unduh
              </Button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
