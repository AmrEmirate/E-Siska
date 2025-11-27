"use client";

import { useAuth } from "@/context/auth-context";
import { useRouter } from "next/navigation";

export default function Header() {
  const { user, logout } = useAuth();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  const getRoleLabel = (role: string) => {
    const labels: Record<string, string> = {
      admin: "Administrator",
      guru: "Guru",
      wali_kelas: "Wali Kelas",
      siswa: "Siswa",
    };
    return labels[role] || role;
  };

  return (
    <header className="bg-white border-b border-gray-200 px-6 py-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            {user?.name || "User"}
          </h1>
          <p className="text-sm text-gray-500">
            {getRoleLabel(user?.role || "")}
          </p>
        </div>

        <div className="flex items-center gap-4">
          <button
            onClick={handleLogout}
            className="px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-50 rounded-lg transition"
          >
            Keluar
          </button>
        </div>
      </div>
    </header>
  );
}
