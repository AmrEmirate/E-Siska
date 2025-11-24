"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"
import { apiClient } from "@/lib/api-client"

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
      const response = await apiClient.post("/auth/signin", {
        username: credentials.identifier,
        password: credentials.password,
      })

      const { token, ...userData } = response.data.data

      // Map backend user data to frontend User interface if necessary
      // Assuming backend returns fields that match or we map them here
      const userToStore: User = {
        id: userData.id,
        name: userData.nama || userData.username, // Fallback if name is not present
        email: userData.email || "",
        role: userData.role,
        nis: userData.nis,
        nip: userData.nip,
        schoolName: "SDN Ciater 02 Serpong", // Hardcoded for now as it might not be in response
      }

      setUser(userToStore)
      localStorage.setItem("user", JSON.stringify(userToStore))
      localStorage.setItem("token", token)

      console.log("Login successful for user:", userToStore.name)
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
