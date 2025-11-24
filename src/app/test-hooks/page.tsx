"use client"

import { useEffect, useState } from "react"
import { 
  useAuth, 
  useSiswa, 
  useGuru, 
  useKelas,
  useTingkatan,
  useMapel,
  useRuangan 
} from "@/hooks"

export default function TestHooksPage() {
  const [testResults, setTestResults] = useState<Record<string, any>>({})

  // Initialize hooks
  const siswa = useSiswa()
  const guru = useGuru()
  const kelas = useKelas()
  const tingkatan = useTingkatan()
  const mapel = useMapel()
  const ruangan = useRuangan()

  useEffect(() => {
    // Test fetching data
    const runTests = async () => {
      console.log("🧪 Testing hooks...")

      try {
        // Test Siswa
        await siswa.fetchSiswa(1, 5)
        setTestResults(prev => ({
          ...prev,
          siswa: { status: "✅", count: siswa.data.length, loading: siswa.loading }
        }))
      } catch (error) {
        setTestResults(prev => ({
          ...prev,
          siswa: { status: "❌", error: String(error) }
        }))
      }

      try {
        // Test Guru
        await guru.fetchGuru(1, 5)
        setTestResults(prev => ({
          ...prev,
          guru: { status: "✅", count: guru.data.length, loading: guru.loading }
        }))
      } catch (error) {
        setTestResults(prev => ({
          ...prev,
          guru: { status: "❌", error: String(error) }
        }))
      }

      try {
        // Test Kelas
        await kelas.fetchKelas()
        setTestResults(prev => ({
          ...prev,
          kelas: { status: "✅", count: kelas.data.length, loading: kelas.loading }
        }))
      } catch (error) {
        setTestResults(prev => ({
          ...prev,
          kelas: { status: "❌", error: String(error) }
        }))
      }

      try {
        // Test Tingkatan
        await tingkatan.fetchTingkatan()
        setTestResults(prev => ({
          ...prev,
          tingkatan: { status: "✅", count: tingkatan.data.length, loading: tingkatan.loading }
        }))
      } catch (error) {
        setTestResults(prev => ({
          ...prev,
          tingkatan: { status: "❌", error: String(error) }
        }))
      }

      try {
        // Test Mapel
        await mapel.fetchMapel()
        setTestResults(prev => ({
          ...prev,
          mapel: { status: "✅", count: mapel.data.length, loading: mapel.loading }
        }))
      } catch (error) {
        setTestResults(prev => ({
          ...prev,
          mapel: { status: "❌", error: String(error) }
        }))
      }

      try {
        // Test Ruangan
        await ruangan.fetchRuangan()
        setTestResults(prev => ({
          ...prev,
          ruangan: { status: "✅", count: ruangan.data.length, loading: ruangan.loading }
        }))
      } catch (error) {
        setTestResults(prev => ({
          ...prev,
          ruangan: { status: "❌", error: String(error) }
        }))
      }

      console.log("✅ Tests completed!")
    }

    runTests()
  }, []) // Run once on mount

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">🧪 Hooks Integration Test</h1>
        
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Configuration</h2>
          <div className="space-y-2 text-sm font-mono">
            <p>API URL: {process.env.NEXT_PUBLIC_API_URL || "http://localhost:8181"}</p>
            <p>Environment: {process.env.NODE_ENV}</p>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Test Results</h2>
          <div className="space-y-3">
            {Object.entries(testResults).map(([hook, result]) => (
              <div key={hook} className="flex items-center justify-between p-3 bg-gray-50 rounded">
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">{result.status}</span>
                  <span className="font-medium capitalize">{hook}</span>
                </div>
                <div className="text-sm text-gray-600">
                  {result.error ? (
                    <span className="text-red-600">{result.error}</span>
                  ) : (
                    <span>
                      {result.count} items | Loading: {result.loading ? "Yes" : "No"}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Siswa Data Sample</h2>
          {siswa.loading ? (
            <p className="text-gray-500">Loading...</p>
          ) : siswa.data.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">NIS</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Nama</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {siswa.data.slice(0, 5).map((s) => (
                    <tr key={s.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">{s.nis}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">{s.nama}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">{s.status}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="text-gray-500">No data available</p>
          )}
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Guru Data Sample</h2>
          {guru.loading ? (
            <p className="text-gray-500">Loading...</p>
          ) : guru.data.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">NIP</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Nama</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {guru.data.slice(0, 5).map((g) => (
                    <tr key={g.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">{g.nip}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">{g.nama}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">{g.status}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="text-gray-500">No data available</p>
          )}
        </div>

        <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <p className="text-sm text-blue-800">
            <strong>✨ Tips:</strong> Check the browser console for detailed logs. 
            Open Network tab in DevTools to see API requests.
          </p>
        </div>
      </div>
    </div>
  )
}
