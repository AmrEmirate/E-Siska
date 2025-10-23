"use client"

import type React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { validateCredentials } from "@/lib/auth-credentials"

export function LoginForm() {
  const router = useRouter()
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [showForgotPassword, setShowForgotPassword] = useState(false)
  const [forgotEmail, setForgotEmail] = useState("")
  const [forgotSuccess, setForgotSuccess] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    const user = validateCredentials(username, password)

    if (!user) {
      setError("Username atau kata sandi salah")
      setIsLoading(false)
      return
    }

    setTimeout(() => {
      const routes: Record<string, string> = {
        siswa: "/dashboard/student",
        guru: "/dashboard/teacher",
        "wali-kelas": "/dashboard/homeroom",
        admin: "/dashboard/admin",
      }
      router.push(routes[user.role] || "/dashboard/student")
      setIsLoading(false)
    }, 1000)
  }

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    setTimeout(() => {
      setForgotSuccess(true)
      setIsLoading(false)
      setTimeout(() => {
        setShowForgotPassword(false)
        setForgotSuccess(false)
        setForgotEmail("")
      }, 2000)
    }, 1000)
  }

  if (showForgotPassword) {
    return (
      <form onSubmit={handleForgotPassword} className="space-y-4">
        <h2 className="text-2xl font-bold text-neutral-900 mb-6">Lupa Kata Sandi</h2>
        <p className="text-neutral-600 text-sm mb-4">Masukkan email Anda untuk menerima link reset kata sandi</p>

        <div>
          <label className="block text-sm font-medium text-neutral-700 mb-2">Email</label>
          <input
            type="email"
            value={forgotEmail}
            onChange={(e) => setForgotEmail(e.target.value)}
            placeholder="nama@sekolah.ac.id"
            className="input-field"
            required
          />
        </div>

        {forgotSuccess && (
          <div className="p-3 bg-green-50 border border-green-200 rounded-lg text-green-700 text-sm">
            Link reset telah dikirim ke email Anda
          </div>
        )}

        <div className="flex gap-3">
          <button
            type="submit"
            disabled={isLoading}
            className="flex-1 btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? "Mengirim..." : "Kirim Link Reset"}
          </button>
          <button type="button" onClick={() => setShowForgotPassword(false)} className="flex-1 btn-secondary">
            Kembali
          </button>
        </div>
      </form>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h2 className="text-2xl font-bold text-neutral-900 mb-6">Masuk</h2>

      {/* Username */}
      <div>
        <label className="block text-sm font-medium text-neutral-700 mb-2">Username</label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="nama@sekolah.ac.id"
          className="input-field"
          required
        />
      </div>

      {/* Password */}
      <div>
        <label className="block text-sm font-medium text-neutral-700 mb-2">Kata Sandi</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="••••••••"
          className="input-field"
          required
        />
      </div>

      {error && <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">{error}</div>}

      {/* Forgot Password Link */}
      <div className="text-right">
        <button
          type="button"
          onClick={() => setShowForgotPassword(true)}
          className="text-primary hover:text-primary-dark font-medium text-sm"
        >
          Lupa kata sandi?
        </button>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isLoading}
        className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isLoading ? "Memproses..." : "Masuk"}
      </button>
    </form>
  )
}
