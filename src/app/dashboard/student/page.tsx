"use client";

import { useAuth } from "@/context/auth-context";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen, GraduationCap, Calendar, FileText } from "lucide-react";
import Link from "next/link";

export default function StudentDashboard() {
  const { user } = useAuth();

  return (
    <div className="p-8 space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">
          Selamat Datang, {user?.name}
        </h1>
        <p className="text-gray-600 mt-2">
          Pantau perkembangan akademikmu di sini.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <DashboardCard
          title="Lihat Nilai"
          icon={<BookOpen className="text-blue-600" size={24} />}
          description="Cek nilai tugas dan ujian"
          href="/dashboard/student/grades"
          color="bg-blue-50 border-blue-100"
        />
        <DashboardCard
          title="Rapor Saya"
          icon={<GraduationCap className="text-purple-600" size={24} />}
          description="Lihat hasil belajar per semester"
          href="/dashboard/student/rapor"
          color="bg-purple-50 border-purple-100"
        />
        <DashboardCard
          title="Jadwal Pelajaran"
          icon={<Calendar className="text-green-600" size={24} />}
          description="Cek jadwal kelas hari ini"
          href="#"
          color="bg-green-50 border-green-100"
        />
        <DashboardCard
          title="Pengumuman"
          icon={<FileText className="text-orange-600" size={24} />}
          description="Informasi penting sekolah"
          href="#"
          color="bg-orange-50 border-orange-100"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle>Pengumuman Terbaru</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="p-4 bg-gray-50 rounded-lg border border-gray-100">
                <h3 className="font-semibold text-gray-900">
                  Ujian Tengah Semester
                </h3>
                <p className="text-sm text-gray-500 mt-1">
                  Jadwal UTS akan dimulai pada tanggal 10 Desember 2024.
                </p>
                <div className="mt-2 text-xs text-gray-400">
                  2 hari yang lalu
                </div>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg border border-gray-100">
                <h3 className="font-semibold text-gray-900">Libur Nasional</h3>
                <p className="text-sm text-gray-500 mt-1">
                  Sekolah libur pada tanggal 25 Desember 2024.
                </p>
                <div className="mt-2 text-xs text-gray-400">
                  5 hari yang lalu
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Status Kehadiran</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-center h-48 text-gray-500">
              Fitur kehadiran akan segera hadir.
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function DashboardCard({
  title,
  icon,
  description,
  href,
  color,
}: {
  title: string;
  icon: React.ReactNode;
  description: string;
  href: string;
  color: string;
}) {
  return (
    <Link href={href} className="block group">
      <div
        className={`p-6 rounded-xl border transition-all hover:shadow-md ${color}`}
      >
        <div className="flex items-start justify-between mb-4">
          <div className="p-3 bg-white rounded-lg shadow-sm">{icon}</div>
        </div>
        <h3 className="text-lg font-bold text-gray-900 mb-1 group-hover:text-blue-600 transition-colors">
          {title}
        </h3>
        <p className="text-sm text-gray-600">{description}</p>
      </div>
    </Link>
  );
}
