import type React from "react"
import { Inter } from "next/font/google"
import "../styles/globals.css"
import { AuthProvider } from "@/context/auth-context"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "E-Siska - Sistem Informasi Akademik SDN CIATER 02",
  description: "Platform manajemen akademik dan administrasi sekolah",
    generator: 'v0.app'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="id">
      <body className={inter.className}>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  )
}
