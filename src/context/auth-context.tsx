"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"

export type UserRole = "admin" | "guru" | "wali_kelas" | "siswa"

export interface User {
  id: string
  name: string
  email: string
  role: UserRole
  nis?: string
  nip?: string
  schoolName?: string
}

interface AuthContextType {
  user: User | null
  loading: boolean
  login: (credentials: { identifier: string; password: string }) => Promise<void>
  logout: () => void
  isAuthenticated: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

const mockUsers: Record<string, { password: string; user: User }> = {
  admin: {
    password: "password123",
    user: {
      id: "1",
      name: "Admin Sekolah",
      email: "admin@sdn-ciater02.sch.id",
      role: "admin",
      nip: "123456789",
      schoolName: "SDN Ciater 02 Serpong",
    },
  },
  guru01: {
    password: "password123",
    user: {
      id: "2",
      name: "Guru Matematika",
      email: "guru01@sdn-ciater02.sch.id",
      role: "guru",
      nip: "987654321",
      schoolName: "SDN Ciater 02 Serpong",
    },
  },
  wali01: {
    password: "password123",
    user: {
      id: "3",
      name: "Wali Kelas 5A",
      email: "wali01@sdn-ciater02.sch.id",
      role: "wali_kelas",
      nip: "555666777",
      schoolName: "SDN Ciater 02 Serpong",
    },
  },
  siswa001: {
    password: "password123",
    user: {
      id: "4",
      name: "Siswa Budi",
      email: "siswa001@sdn-ciater02.sch.id",
      role: "siswa",
      nis: "12345678",
      schoolName: "SDN Ciater 02 Serpong",
    },
  },
}

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Check if user is already logged in (from localStorage or session)
    const storedUser = typeof window !== "undefined" ? localStorage.getItem("user") : null
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
    setLoading(false)
  }, [])

  const login = async (credentials: { identifier: string; password: string }) => {
    setLoading(true)
    try {
      // Simulate API call with mock authentication
      const mockUser = mockUsers[credentials.identifier]

      if (!mockUser) {
        throw new Error("Username tidak ditemukan")
      }

      if (mockUser.password !== credentials.password) {
        throw new Error("Password salah")
      }

      const userData: User = mockUser.user
      const token = `mock-token-${Date.now()}`

      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 500))

      setUser(userData)
      localStorage.setItem("user", JSON.stringify(userData))
      localStorage.setItem("token", token)

      console.log("Login successful for user:", userData.name, "with role:", userData.role)
    } catch (error) {
      console.error("Login failed:", error)
      throw error
    } finally {
      setLoading(false)
    }
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("user")
    localStorage.removeItem("token")
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        logout,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within AuthProvider")
  }
  return context
}
