import type React from "react"
import { Inter, Merriweather } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })
const merriweather = Merriweather({
  subsets: ["latin"],
  weight: ["400", "700"],
})

export const metadata = {
  title: "E-SISKA - Sistem Informasi Sekolah",
  description: "Portal akademik untuk mengelola data siswa, absensi, nilai, dan administrasi sekolah",
    generator: 'v0.app'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="id">
      <body className={`${inter.className} ${merriweather.className}`}>{children}</body>
    </html>
  )
}
