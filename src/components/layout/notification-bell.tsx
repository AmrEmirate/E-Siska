"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"

interface Notification {
  id: string
  title: string
  message: string
  time: string
  read: boolean
}

interface NotificationBellProps {
  notifications?: Notification[]
}

export function NotificationBell({ notifications = [] }: NotificationBellProps) {
  const [isOpen, setIsOpen] = useState(false)
  const unreadCount = notifications.filter((n) => !n.read).length

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 text-neutral-600 hover:bg-neutral-100 rounded-lg transition-colors"
      >
        <span className="text-xl">🔔</span>
        {unreadCount > 0 && (
          <span className="absolute top-0 right-0 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center font-bold">
            {unreadCount}
          </span>
        )}
      </button>

      {isOpen && (
        <Card className="absolute right-0 mt-2 w-80 max-h-96 overflow-y-auto z-50">
          <div className="p-4 border-b border-neutral-200">
            <h3 className="font-semibold text-neutral-900">Notifikasi</h3>
          </div>

          {notifications.length > 0 ? (
            <div className="divide-y divide-neutral-200">
              {notifications.map((notif) => (
                <div
                  key={notif.id}
                  className={`p-4 hover:bg-neutral-50 transition-colors cursor-pointer ${
                    !notif.read ? "bg-blue-50" : ""
                  }`}
                >
                  <p className="font-medium text-neutral-900">{notif.title}</p>
                  <p className="text-sm text-neutral-600 mt-1">{notif.message}</p>
                  <p className="text-xs text-neutral-500 mt-2">{notif.time}</p>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-8 text-center text-neutral-500">
              <p>Tidak ada notifikasi</p>
            </div>
          )}
        </Card>
      )}
    </div>
  )
}
