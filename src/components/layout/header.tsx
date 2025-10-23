"use client"

import { NotificationBell } from "./notification-bell"
import { UserMenu } from "./user-menu"

interface HeaderProps {
  title: string
  userName: string
  userRole?: string
  notifications?: Array<{ id: string; title: string; message: string; time: string; read: boolean }>
}

export function Header({ title, userName, userRole = "Pengguna", notifications = [] }: HeaderProps) {
  return (
    <header className="bg-white border-b border-neutral-200 px-8 py-4 flex items-center justify-between">
      <h1 className="text-2xl font-bold text-neutral-900">{title}</h1>

      <div className="flex items-center gap-6">
        <NotificationBell notifications={notifications} />
        <UserMenu userName={userName} userRole={userRole} />
      </div>
    </header>
  )
}
