"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react"

interface NavItem {
  label: string
  href: string
  icon: string
}

interface SidebarProps {
  items: NavItem[]
  userRole: string
}

export function Sidebar({ items, userRole }: SidebarProps) {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(true)

  return (
    <aside
      className={`${isOpen ? "w-64" : "w-20"} bg-primary text-white transition-all duration-300 min-h-screen flex flex-col shadow-lg`}
    >
      {/* Logo */}
      <div className="p-6 border-b border-primary-dark flex items-center justify-between">
        {isOpen && <span className="font-bold text-lg">E-SISKA</span>}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-1 hover:bg-primary-dark rounded transition-colors text-lg"
        >
          {isOpen ? "←" : "→"}
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2">
        {items.map((item) => {
          const isActive = pathname === item.href
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                isActive ? "bg-primary-light text-white" : "text-primary-light hover:bg-primary-dark"
              }`}
              title={!isOpen ? item.label : ""}
            >
              <span className="text-xl">{item.icon}</span>
              {isOpen && <span className="text-sm font-medium">{item.label}</span>}
            </Link>
          )
        })}
      </nav>

      {/* User Info */}
      <div className="p-4 border-t border-primary-dark">
        {isOpen && (
          <div className="text-sm">
            <p className="font-medium truncate">Pengguna</p>
            <p className="text-primary-light text-xs capitalize">{userRole}</p>
          </div>
        )}
      </div>
    </aside>
  )
}
