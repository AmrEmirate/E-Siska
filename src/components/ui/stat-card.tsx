interface StatCardProps {
  label: string
  value: string | number
  icon: string
  color: string
}

export function StatCard({ label, value, icon, color }: StatCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-neutral-200 p-6 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-neutral-600 font-medium">{label}</p>
          <p className="text-3xl font-bold text-neutral-900 mt-2">{value}</p>
        </div>
        <div className={`text-3xl p-3 rounded-lg ${color}`}>{icon}</div>
      </div>
    </div>
  )
}
