"use client"

import { useState, useCallback } from "react"
import { apiClient } from "@/lib/api-client"
import { useToast } from "@/components/ui/use-toast"

export interface User {
  id: string
  username: string
  email?: string
  role: "Admin" | "Guru" | "Siswa"
  profileImg?: string
}

export interface LoginCredentials {
  username: string
  password: string
}

export function useAuth() {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(false)
  const { toast } = useToast()

  const login = useCallback(
    async (credentials: LoginCredentials) => {
      setLoading(true)
      try {
        const response = await apiClient.post("/auth/signin", credentials)
        const { token, user } = response.data

        if (typeof window !== "undefined") {
          localStorage.setItem("token", token)
          localStorage.setItem("user", JSON.stringify(user))
        }

        setUser(user)
        toast({
          title: "Login Berhasil",
          description: `Selamat datang, ${user.username}!`,
        })
        return true
      } catch (error: any) {
        console.error("Login error:", error)
        toast({
          title: "Login Gagal",
          description: error.response?.data?.message || "Username atau password salah.",
          variant: "destructive",
        })
        return false
      } finally {
        setLoading(false)
      }
    },
    [toast]
  )

  const logout = useCallback(async () => {
    setLoading(true)
    try {
      await apiClient.post("/auth/signout")

      if (typeof window !== "undefined") {
        localStorage.removeItem("token")
        localStorage.removeItem("user")
      }

      setUser(null)
      toast({
        title: "Logout Berhasil",
        description: "Anda telah keluar dari sistem.",
      })

      if (typeof window !== "undefined") {
        window.location.href = "/login"
      }
      return true
    } catch (error) {
      console.error("Logout error:", error)
      toast({
        title: "Logout Gagal",
        description: "Terjadi kesalahan saat logout.",
        variant: "destructive",
      })
      return false
    } finally {
      setLoading(false)
    }
  }, [toast])

  const updateProfileImage = async (file: File) => {
    setLoading(true)
    try {
      const formData = new FormData()
      formData.append("img", file)

      const response = await apiClient.patch("/auth/profile-img", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })

      const updatedUser = response.data.user
      setUser(updatedUser)

      if (typeof window !== "undefined") {
        localStorage.setItem("user", JSON.stringify(updatedUser))
      }

      toast({
        title: "Berhasil",
        description: "Foto profil berhasil diperbarui.",
      })
      return true
    } catch (error) {
      console.error("Update profile image error:", error)
      toast({
        title: "Gagal",
        description: "Gagal memperbarui foto profil.",
        variant: "destructive",
      })
      return false
    } finally {
      setLoading(false)
    }
  }

  const getCurrentUser = useCallback(() => {
    if (typeof window !== "undefined") {
      const storedUser = localStorage.getItem("user")
      if (storedUser) {
        setUser(JSON.parse(storedUser))
      }
    }
  }, [])

  return {
    user,
    loading,
    login,
    logout,
    updateProfileImage,
    getCurrentUser,
  }
}
