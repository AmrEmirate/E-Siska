"use client"

import type React from "react"

import { useState } from "react"

export function RegisterForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    nisn: "",
  })
  const [isLoading, setIsLoading] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate registration
    setTimeout(() => {
      setIsLoading(false)
      alert("Pendaftaran berhasil! Silakan login.")
    }, 1000)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h2 className="text-2xl font-bold text-neutral-900 mb-6">Daftar Akun Baru</h2>

      {/* Name */}
      <div>
        <label className="block text-sm font-medium text-neutral-700 mb-2">Nama Lengkap</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Nama Anda"
          className="input-field"
          required
        />
      </div>

      {/* NISN */}
      <div>
        <label className="block text-sm font-medium text-neutral-700 mb-2">NISN (Nomor Induk Siswa Nasional)</label>
        <input
          type="text"
          name="nisn"
          value={formData.nisn}
          onChange={handleChange}
          placeholder="10 digit NISN"
          className="input-field"
          required
        />
      </div>

      {/* Email */}
      <div>
        <label className="block text-sm font-medium text-neutral-700 mb-2">Email</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
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
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="••••••••"
          className="input-field"
          required
        />
      </div>

      {/* Confirm Password */}
      <div>
        <label className="block text-sm font-medium text-neutral-700 mb-2">Konfirmasi Kata Sandi</label>
        <input
          type="password"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleChange}
          placeholder="••••••••"
          className="input-field"
          required
        />
      </div>

      {/* Terms */}
      <label className="flex items-start gap-2 cursor-pointer">
        <input type="checkbox" className="w-4 h-4 rounded border-neutral-300 mt-1" required />
        <span className="text-sm text-neutral-600">Saya setuju dengan syarat dan ketentuan penggunaan E-SISKA</span>
      </label>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isLoading}
        className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isLoading ? "Memproses..." : "Daftar"}
      </button>
    </form>
  )
}
