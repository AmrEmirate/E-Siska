"use client"

import { useState, useEffect } from "react"

interface ToastProps {
  message: string
  type: "success" | "error" | "info" | "warning"
  duration?: number
}

export function Toast({ message, type, duration = 3000 }: ToastProps) {
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(false), duration)
    return () => clearTimeout(timer)
  }, [duration])

  if (!isVisible) return null

  const colors = {
    success: "bg-green-500 text-white",
    error: "bg-red-500 text-white",
    info: "bg-blue-500 text-white",
    warning: "bg-yellow-500 text-white",
  }

  const icons = {
    success: "✓",
    error: "✕",
    info: "ℹ",
    warning: "⚠",
  }

  return (
    <div
      className={`fixed bottom-4 right-4 ${colors[type]} px-6 py-3 rounded-lg shadow-lg animate-fade-in-up z-50 flex items-center gap-3`}
    >
      <span className="text-lg font-bold">{icons[type]}</span>
      <span>{message}</span>
    </div>
  )
}
