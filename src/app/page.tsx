"use client"

import { LoginForm } from "@/components/auth/login-form"

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-neutral-50 to-neutral-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-primary rounded-lg mb-4">
            <span className="text-2xl font-bold text-white">ES</span>
          </div>
          <h1 className="text-3xl font-bold text-neutral-900 mb-2">E-SISKA</h1>
          <p className="text-neutral-600">Sistem Informasi Sekolah</p>
        </div>

        {/* Auth Forms */}
        <div className="bg-white rounded-xl shadow-lg p-8 border border-neutral-200">
          <LoginForm />
        </div>

        {/* Footer */}
        <p className="text-center text-xs text-neutral-500 mt-6">
          © 2025 E-SISKA. Semua hak dilindungi.{" "}
          <a href="/credentials" className="text-primary hover:text-primary-dark font-medium">
            Lihat Kredensial Demo
          </a>
        </p>
      </div>
    </main>
  )
}
