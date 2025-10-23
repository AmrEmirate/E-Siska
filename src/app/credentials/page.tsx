import { DEFAULT_CREDENTIALS } from "@/lib/auth-credentials"
import Link from "next/link"

export default function CredentialsPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-neutral-50 to-neutral-100 p-4 py-12">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <Link href="/" className="text-primary hover:text-primary-dark font-medium mb-4 inline-block">
            ← Kembali ke Login
          </Link>
          <h1 className="text-4xl font-bold text-neutral-900 mb-2">Kredensial Login E-SISKA</h1>
          <p className="text-neutral-600">Daftar akun demo untuk setiap role pengguna</p>
        </div>

        {/* Credentials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Siswa */}
          <div className="bg-white rounded-xl shadow-lg border border-neutral-200 overflow-hidden">
            <div className="bg-blue-600 text-white p-4">
              <h2 className="text-2xl font-bold">👨‍🎓 Siswa</h2>
            </div>
            <div className="p-6 space-y-4">
              {DEFAULT_CREDENTIALS.siswa.map((user, idx) => (
                <div key={idx} className="border-b border-neutral-200 pb-4 last:border-b-0 last:pb-0">
                  <p className="font-semibold text-neutral-900">{user.name}</p>
                  <p className="text-sm text-neutral-600">NISN: {user.nisn}</p>
                  <div className="mt-2 bg-neutral-50 p-3 rounded-lg font-mono text-sm space-y-1">
                    <p>
                      <span className="text-neutral-600">Email:</span>{" "}
                      <span className="text-blue-600">{user.email}</span>
                    </p>
                    <p>
                      <span className="text-neutral-600">Password:</span>{" "}
                      <span className="text-blue-600">{user.password}</span>
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Guru */}
          <div className="bg-white rounded-xl shadow-lg border border-neutral-200 overflow-hidden">
            <div className="bg-green-600 text-white p-4">
              <h2 className="text-2xl font-bold">👨‍🏫 Guru</h2>
            </div>
            <div className="p-6 space-y-4">
              {DEFAULT_CREDENTIALS.guru.map((user, idx) => (
                <div key={idx} className="border-b border-neutral-200 pb-4 last:border-b-0 last:pb-0">
                  <p className="font-semibold text-neutral-900">{user.name}</p>
                  <p className="text-sm text-neutral-600">NIP: {user.nip}</p>
                  <div className="mt-2 bg-neutral-50 p-3 rounded-lg font-mono text-sm space-y-1">
                    <p>
                      <span className="text-neutral-600">Email:</span>{" "}
                      <span className="text-green-600">{user.email}</span>
                    </p>
                    <p>
                      <span className="text-neutral-600">Password:</span>{" "}
                      <span className="text-green-600">{user.password}</span>
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Wali Kelas */}
          <div className="bg-white rounded-xl shadow-lg border border-neutral-200 overflow-hidden">
            <div className="bg-purple-600 text-white p-4">
              <h2 className="text-2xl font-bold">👩‍💼 Wali Kelas</h2>
            </div>
            <div className="p-6 space-y-4">
              {DEFAULT_CREDENTIALS["wali-kelas"].map((user, idx) => (
                <div key={idx} className="border-b border-neutral-200 pb-4 last:border-b-0 last:pb-0">
                  <p className="font-semibold text-neutral-900">{user.name}</p>
                  <p className="text-sm text-neutral-600">NIP: {user.nip}</p>
                  <div className="mt-2 bg-neutral-50 p-3 rounded-lg font-mono text-sm space-y-1">
                    <p>
                      <span className="text-neutral-600">Email:</span>{" "}
                      <span className="text-purple-600">{user.email}</span>
                    </p>
                    <p>
                      <span className="text-neutral-600">Password:</span>{" "}
                      <span className="text-purple-600">{user.password}</span>
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Admin */}
          <div className="bg-white rounded-xl shadow-lg border border-neutral-200 overflow-hidden">
            <div className="bg-red-600 text-white p-4">
              <h2 className="text-2xl font-bold">🔐 Admin</h2>
            </div>
            <div className="p-6 space-y-4">
              {DEFAULT_CREDENTIALS.admin.map((user, idx) => (
                <div key={idx} className="border-b border-neutral-200 pb-4 last:border-b-0 last:pb-0">
                  <p className="font-semibold text-neutral-900">{user.name}</p>
                  <p className="text-sm text-neutral-600">NIP: {user.nip}</p>
                  <div className="mt-2 bg-neutral-50 p-3 rounded-lg font-mono text-sm space-y-1">
                    <p>
                      <span className="text-neutral-600">Email:</span>{" "}
                      <span className="text-red-600">{user.email}</span>
                    </p>
                    <p>
                      <span className="text-neutral-600">Password:</span>{" "}
                      <span className="text-red-600">{user.password}</span>
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Info Box */}
        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-xl p-6">
          <h3 className="font-bold text-blue-900 mb-2">ℹ️ Informasi Penting</h3>
          <ul className="text-blue-800 space-y-2 text-sm">
            <li>• Kredensial ini adalah akun demo untuk keperluan testing dan demonstrasi</li>
            <li>• Setiap role memiliki akses dan fitur yang berbeda sesuai dengan peran mereka</li>
            <li>• Gunakan email dan password yang sesuai dengan role yang ingin Anda akses</li>
            <li>• Untuk production, gunakan sistem autentikasi yang aman dengan database real</li>
          </ul>
        </div>

        {/* CTA Button */}
        <div className="mt-8 text-center">
          <Link
            href="/"
            className="inline-block px-8 py-3 bg-primary text-white rounded-lg font-semibold hover:bg-primary-dark transition-colors"
          >
            Kembali ke Login
          </Link>
        </div>
      </div>
    </main>
  )
}
