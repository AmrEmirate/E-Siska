"use client";

import type React from "react";

import { useAuth } from "@/context/auth-context";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Image from "next/image";
import { useToast } from "@/components/ui/use-toast";

export default function LoginPage() {
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const router = useRouter();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await login({ identifier, password });
      toast({
        title: "Login Berhasil",
        description: "Selamat datang kembali!",
      });
      router.push("/dashboard");
    } catch (err) {
      setError("Username atau password salah");
      toast({
        title: "Login Gagal",
        description: "Username atau password salah. Silakan coba lagi.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-red-500/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-md w-full">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-jfWqP0EvO9fLYgSZ0r4y1NyH1sKVaX.png"
              alt="E-Siska Logo"
              width={120}
              height={120}
              className="h-20 w-auto"
            />
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">E-Siska</h1>
          <p className="text-gray-300 text-sm">Sistem Informasi Akademik</p>
          <p className="text-gray-400 text-xs mt-1">SDN Ciater 02 Serpong</p>
        </div>

        <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-8 shadow-2xl">
          <h2 className="text-2xl font-bold text-white mb-6">Masuk</h2>

          {error && (
            <div className="mb-4 p-3 bg-red-500/20 border border-red-500/50 rounded-lg text-red-200 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="identifier"
                className="block text-sm font-medium text-gray-200 mb-2"
              >
                Username / Email / NISN
              </label>
              <input
                id="identifier"
                type="text"
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
                placeholder="Masukkan username atau NISN"
                className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition"
                disabled={loading}
                required
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-200 mb-2"
              >
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Masukkan password"
                className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition"
                disabled={loading}
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-2 px-4 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg transition-colors duration-200 disabled:opacity-50 mt-6"
            >
              {loading ? "Sedang masuk..." : "Masuk"}
            </button>
          </form>
        </div>

        <p className="text-center text-gray-400 text-xs mt-6">
          © 2025 SDN Ciater 02 Serpong. All rights reserved.
        </p>
      </div>
    </div>
  );
}
