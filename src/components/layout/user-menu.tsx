"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card } from "@/components/ui/card"

interface UserMenuProps {
  userName: string
  userRole: string
  userEmail?: string
}

export function UserMenu({ userName, userRole, userEmail }: UserMenuProps) {
  const [isOpen, setIsOpen] = useState(false)
  const router = useRouter()

  const handleLogout = () => {
    router.push("/")
  }

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-3 p-2 hover:bg-neutral-100 rounded-lg transition-colors"
      >
        <div className="w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center font-bold text-sm">
          {userName.charAt(0)}
        </div>
        <div className="text-right hidden sm:block">
          <p className="text-sm font-medium text-neutral-900">{userName}</p>
          <p className="text-xs text-neutral-500">{userRole}</p>
        </div>
      </button>

      {isOpen && (
        <Card className="absolute right-0 mt-2 w-64 z-50">
          <div className="p-4 border-b border-neutral-200">
            <p className="font-semibold text-neutral-900">{userName}</p>
            <p className="text-sm text-neutral-600">{userEmail || "user@example.com"}</p>
          </div>

          <div className="p-2">
            <button className="w-full text-left px-4 py-2 text-neutral-700 hover:bg-neutral-100 rounded transition-colors text-sm">
              Profil
            </button>
            <button className="w-full text-left px-4 py-2 text-neutral-700 hover:bg-neutral-100 rounded transition-colors text-sm">
              Pengaturan
            </button>
            <button className="w-full text-left px-4 py-2 text-neutral-700 hover:bg-neutral-100 rounded transition-colors text-sm">
              Bantuan
            </button>
          </div>

          <div className="p-2 border-t border-neutral-200">
            <button
              onClick={handleLogout}
              className="w-full text-left px-4 py-2 text-red-600 hover:bg-red-50 rounded transition-colors text-sm font-medium"
            >
              Keluar
            </button>
          </div>
        </Card>
      )}
    </div>
  )
}
