"use client"

import type { ReactNode } from "react"
import { Sidebar } from "./sidebar"
import { Header } from "./header"

interface NavItem {
  label: string
  href: string
  icon: string
}

interface DashboardLayoutProps {
  children: ReactNode
  navItems: NavItem[]
  title: string
  userName: string
  userRole: string
  notifications?: Array<{ id: string; title: string; message: string; time: string; read: boolean }>
}

export function DashboardLayout({
  children,
  navItems,
  title,
  userName,
  userRole,
  notifications = [],
}: DashboardLayoutProps) {
  return (
    <div className="flex h-screen bg-neutral-50">
      <Sidebar items={navItems} userRole={userRole} />

      <div className="flex-1 flex flex-col overflow-hidden">
        <Header title={title} userName={userName} userRole={userRole} notifications={notifications} />

        <main className="flex-1 overflow-auto p-8">{children}</main>
      </div>
    </div>
  )
}
