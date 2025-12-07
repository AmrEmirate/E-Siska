"use client";

import type React from "react";
import { createContext, useContext, useState, useEffect } from "react";
import { apiClient } from "@/lib/api-client";

export type UserRole = "admin" | "guru" | "wali_kelas" | "siswa";

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  nisn?: string;
  nip?: string;
  guruId?: string;
  siswaId?: string;
  schoolName?: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (credentials: {
    identifier: string;
    password: string;
  }) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser =
      typeof window !== "undefined" ? localStorage.getItem("user") : null;
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);

      if (
        parsedUser.role &&
        !["admin", "guru", "siswa", "wali_kelas"].includes(parsedUser.role)
      ) {
        parsedUser.role = parsedUser.role.toLowerCase();
      }
      setUser(parsedUser);
    }
    setLoading(false);
  }, []);

  const login = async (credentials: {
    identifier: string;
    password: string;
  }) => {
    setLoading(true);
    try {
      const response = await apiClient.post("/auth/signin", {
        username: credentials.identifier,
        password: credentials.password,
      });

      const { token, ...userData } = response.data.data;

      const userToStore: User = {
        id: userData.id,
        name: userData.nama || userData.username,
        email: userData.email || "",
        role: userData.isWaliKelas
          ? "wali_kelas"
          : (userData.role.toLowerCase() as UserRole),
        nisn: userData.nisn,
        nip: userData.nip,
        guruId: userData.guruId,
        siswaId: userData.siswaId,
        schoolName: "SDN Ciater 02 Serpong",
      };

      setUser(userToStore);
      localStorage.setItem("user", JSON.stringify(userToStore));
      localStorage.setItem("token", token);
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  };

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
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
};
