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
  SidebarGroupLabel,
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
      { href: "/dashboard", label: "Dashboard", icon: "📊" },
    ];

    const roleMenus: Record<string, any[]> = {
      admin: [
        ...commonItems,
        {
          href: "/dashboard/admin/students",
          label: "Manajemen Siswa",
          icon: "👥",
        },
        {
          href: "/dashboard/admin/teachers",
          label: "Manajemen Guru",
          icon: "🎓",
        },
        {
          href: "/dashboard/admin/classes",
          label: "Manajemen Kelas",
          icon: "🏫",
        },
        {
          href: "/dashboard/admin/subjects",
          label: "Mata Pelajaran",
          icon: "📚",
        },
        { href: "/dashboard/admin/schedule", label: "Jadwal", icon: "📅" },
        {
          href: "/dashboard/admin/announcements",
          label: "Pengumuman",
          icon: "📢",
        },
        { href: "/dashboard/admin/documents", label: "Dokumen", icon: "📄" },
        {
          href: "/dashboard/admin/rooms",
          label: "Manajemen Ruangan",
          icon: "🏠",
        },
        {
          href: "/dashboard/admin/class-levels",
          label: "Tingkatan Kelas",
          icon: "📊",
        },
        {
          href: "/dashboard/admin/academic-years",
          label: "Tahun Ajaran",
          icon: "📅",
        },
        {
          href: "/dashboard/admin/teacher-assignment",
          label: "Penugasan Guru",
          icon: "👨‍🏫",
        },
        {
          href: "/dashboard/admin/student-placement",
          label: "Penempatan Siswa",
          icon: "📌",
        },
        {
          href: "/dashboard/admin/school-info",
          label: "Data Sekolah",
          icon: "🏢",
        },
      ],
      guru: [
        ...commonItems,
        {
          href: "/dashboard/teacher/grades",
          label: "Nilai & Kompetensi",
          icon: "📝",
        },
        { href: "/dashboard/teacher/attendance", label: "Absensi", icon: "✓" },
        {
          href: "/dashboard/teacher/schedule",
          label: "Jadwal Mengajar",
          icon: "📅",
        },
        {
          href: "/dashboard/teacher/announcements",
          label: "Pengumuman",
          icon: "📢",
        },
      ],
      wali_kelas: [
        ...commonItems,
        {
          href: "/dashboard/teacher/grades",
          label: "Nilai & Kompetensi",
          icon: "📝",
        },
        { href: "/dashboard/teacher/attendance", label: "Absensi", icon: "✓" },
        {
          href: "/dashboard/teacher/schedule",
          label: "Jadwal Mengajar",
          icon: "📅",
        },
        {
          href: "/dashboard/teacher/announcements",
          label: "Pengumuman",
          icon: "📢",
        },
        { href: "/dashboard/wali/grades", label: "Rekap Nilai", icon: "📊" },
        {
          href: "/dashboard/wali/attendance",
          label: "Rekap Absensi",
          icon: "✓",
        },
        {
          href: "/dashboard/wali/finalize-grades",
          label: "Finalisasi Rapor",
          icon: "🎖️",
        },
        {
          href: "/dashboard/wali/generate-report",
          label: "Cetak Rapor",
          icon: "🖨️",
        },
      ],
      siswa: [
        ...commonItems,
        {
          href: "/dashboard/student/attendance",
          label: "Absensi Saya",
          icon: "✓",
        },
        { href: "/dashboard/student/grades", label: "Nilai Saya", icon: "📝" },
        {
          href: "/dashboard/student/schedule",
          label: "Jadwal Pelajaran",
          icon: "📅",
        },
        {
          href: "/dashboard/student/announcements",
          label: "Pengumuman",
          icon: "📢",
        },
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
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <div className="flex items-center gap-2 p-2">
          <Image
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-jfWqP0EvO9fLYgSZ0r4y1NyH1sKVaX.png"
            alt="E-Siska"
            width={32}
            height={32}
            className="shrink-0"
          />
          <div className="flex flex-col gap-0.5 leading-none group-data-[collapsible=icon]:hidden">
            <span className="font-bold text-gray-900">E-Siska</span>
            <span className="text-xs text-gray-500">SDN Ciater 02</span>
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Menu</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.href}>
                  <SidebarMenuButton
                    asChild
                    isActive={isActive(item.href)}
                    tooltip={item.label}
                  >
                    <Link href={item.href}>
                      <span className="text-lg">{item.icon}</span>
                      <span>{item.label}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <div className="p-4 text-xs text-gray-500 group-data-[collapsible=icon]:hidden">
          <p className="font-semibold mb-1">Sekolah</p>
          <p>SDN Ciater 02</p>
          <p className="text-gray-400">Kota Tangerang Selatan</p>
        </div>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
