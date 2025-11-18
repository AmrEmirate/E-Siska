"use client"

export default function StudentAttendancePage() {
  const attendanceData = [
    { date: "01 Nov 2024", status: "Hadir", day: "Jumat" },
    { date: "30 Oct 2024", status: "Hadir", day: "Rabu" },
    { date: "29 Oct 2024", status: "Sakit", day: "Selasa" },
    { date: "28 Oct 2024", status: "Hadir", day: "Senin" },
  ]

  return (
    <div className="p-8">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Absensi Saya</h1>
        <p className="text-gray-600">Lihat rekam jejak kehadiran Anda</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div className="card p-6">
          <p className="text-gray-600 text-sm">Total Hadir</p>
          <p className="text-3xl font-bold text-green-600 mt-2">142</p>
        </div>
        <div className="card p-6">
          <p className="text-gray-600 text-sm">Sakit</p>
          <p className="text-3xl font-bold text-yellow-600 mt-2">3</p>
        </div>
        <div className="card p-6">
          <p className="text-gray-600 text-sm">Izin</p>
          <p className="text-3xl font-bold text-blue-600 mt-2">2</p>
        </div>
        <div className="card p-6">
          <p className="text-gray-600 text-sm">Persentase</p>
          <p className="text-3xl font-bold text-red-600 mt-2">97%</p>
        </div>
      </div>

      <div className="card">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">Riwayat Absensi</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">Tanggal</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">Hari</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {attendanceData.map((record, idx) => (
                <tr key={idx} className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">{record.date}</td>
                  <td className="px-6 py-4 text-sm text-gray-700">{record.day}</td>
                  <td className="px-6 py-4 text-sm">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        record.status === "Hadir"
                          ? "bg-green-100 text-green-800"
                          : record.status === "Sakit"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-blue-100 text-blue-800"
                      }`}
                    >
                      {record.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
