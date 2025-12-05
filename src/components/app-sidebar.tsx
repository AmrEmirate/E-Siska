"use client";
import { useAuth } from "@/context/auth-context";
import { usePathname } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";

export function AppSidebar() {
  const { user } = useAuth();
  const pathname = usePathname();

  const getMenuItems = (role: string | undefined) => {
    const commonItems = [
      { href: "/dashboard", label: "Dashboard", icon: "🏠" },
    ];

    const roleMenus: Record<string, any[]> = {
      admin: [
        ...commonItems,
        { href: "/dashboard/admin/students", label: "Manajemen Siswa", icon: "👨‍🎓" },
        { href: "/dashboard/admin/teachers", label: "Manajemen Guru", icon: "👨‍🏫" },
        { href: "/dashboard/admin/classes", label: "Manajemen Kelas", icon: "🏫" },
        { href: "/dashboard/admin/subjects", label: "Mata Pelajaran", icon: "📚" },
        { href: "/dashboard/admin/extracurriculars", label: "Ekstrakurikuler", icon: "⚽" },
        { href: "/dashboard/admin/schedule", label: "Jadwal", icon: "📅" },
        { href: "/dashboard/admin/grades/override", label: "Override Nilai", icon: "✏️" },
        { href: "/dashboard/admin/announcements", label: "Pengumuman", icon: "📢" },
        { href: "/dashboard/admin/documents", label: "Dokumen", icon: "📄" },
        { href: "/dashboard/admin/rooms", label: "Manajemen Ruangan", icon: "🚪" },
        { href: "/dashboard/admin/class-levels", label: "Tingkatan Kelas", icon: "📊" },
        { href: "/dashboard/admin/academic-years", label: "Tahun Ajaran", icon: "📆" },
        { href: "/dashboard/admin/teacher-assignment", label: "Penugasan Guru", icon: "👨‍🏫" },
        { href: "/dashboard/admin/student-placement", label: "Penempatan Siswa", icon: "🎯" },
        { href: "/dashboard/admin/school-info", label: "Data Sekolah", icon: "🏫" },
        { href: "/dashboard/admin/backup", label: "Backup & Restore", icon: "💾" },
      ],
      guru: [
        ...commonItems,
        { href: "/dashboard/teacher/grades", label: "Nilai & Kompetensi", icon: "📝" },
        { href: "/dashboard/teacher/attendance", label: "Absensi", icon: "✅" },
        { href: "/dashboard/teacher/schedule", label: "Jadwal Mengajar", icon: "📅" },
        { href: "/dashboard/teacher/announcements", label: "Pengumuman", icon: "📢" },
        { href: "/dashboard/teacher/documents", label: "Dokumen", icon: "📄" },
      ],
      wali_kelas: [
        ...commonItems,
        { href: "/dashboard/teacher/grades", label: "Nilai & Kompetensi", icon: "📝" },
        { href: "/dashboard/teacher/attendance", label: "Absensi", icon: "✅" },
        { href: "/dashboard/teacher/schedule", label: "Jadwal Mengajar", icon: "📅" },
        { href: "/dashboard/teacher/announcements", label: "Pengumuman", icon: "📢" },
        { href: "/dashboard/wali/students", label: "Data Siswa", icon: "👨‍🎓" },
        { href: "/dashboard/wali/grades", label: "Rekap Nilai", icon: "📊" },
        { href: "/dashboard/wali/attendance", label: "Rekap Absensi", icon: "✅" },
        { href: "/dashboard/wali/ekskul-grades", label: "Nilai Ekskul", icon: "⚽" },
        { href: "/dashboard/wali/finalize-grades", label: "Finalisasi Rapor", icon: "📋" },
        { href: "/dashboard/wali/generate-report", label: "Cetak Rapor", icon: "🖨️" },
        { href: "/dashboard/teacher/documents", label: "Dokumen", icon: "📄" },
      ],
      siswa: [
        ...commonItems,
        { href: "/dashboard/student/attendance", label: "Absensi Saya", icon: "✅" },
        { href: "/dashboard/student/grades", label: "Nilai Saya", icon: "📝" },
        { href: "/dashboard/student/schedule", label: "Jadwal Pelajaran", icon: "📅" },
        { href: "/dashboard/student/announcements", label: "Pengumuman", icon: "📢" },
        { href: "/dashboard/student/documents", label: "Dokumen", icon: "📄" },
      ],
    };

    return roleMenus[role || ""] || commonItems;
  };

  const menuItems = getMenuItems(user?.role);

  const isActive = (href: string) => {
    if (href === "/dashboard") {
      return pathname === "/dashboard";
    }
    return pathname === href || pathname.startsWith(href + "/");
  };

  return (
    <Sidebar collapsible="icon" className="bg-white border-r border-gray-200">
      <SidebarHeader className="p-6 border-b border-gray-200 group-data-[collapsible=icon]:p-2">
        <div className="flex items-center gap-2">
          <Image
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-jfWqP0EvO9fLYgSZ0r4y1NyH1sKVaX.png"
            alt="E-Siska"
            width={40}
            height={40}
            className="shrink-0"
          />
          <div className="flex flex-col leading-none group-data-[collapsible=icon]:hidden">
            <h1 className="font-bold text-gray-900 text-base">E-Siska</h1>
            <p className="text-xs text-gray-500">SDN Ciater 02</p>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent className="p-3 group-data-[collapsible=icon]:p-0">
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu className="gap-2">
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.href}>
                  <SidebarMenuButton
                    asChild
                    isActive={isActive(item.href)}
                    tooltip={item.label}
                    size="lg"
                    className="hover:bg-gray-100 data-[active=true]:bg-red-600 data-[active=true]:text-white data-[active=true]:hover:bg-red-700 transition-all rounded-lg"
                  >
                    <Link href={item.href}>
                      <span className="text-xl">{item.icon}</span>
                      <span className="font-medium">{item.label}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="p-0">
        <div className="p-4 border-t border-gray-200 text-xs text-gray-500 group-data-[collapsible=icon]:hidden">
          <p className="font-semibold mb-1">Sekolah</p>
          <p>SDN Ciater 02</p>
          <p className="text-gray-400">Kota Tangerang Selatan</p>
        </div>
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  );
}
