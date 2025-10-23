"use client"

import type { ReactNode } from "react"
import { Card } from "@/components/ui/card"

interface Column {
  key: string
  label: string
  render?: (value: any, row: any) => ReactNode
}

interface DataTableProps {
  columns: Column[]
  data: any[]
  title?: string
  loading?: boolean
}

export function DataTable({ columns, data, title, loading }: DataTableProps) {
  if (loading) {
    return (
      <Card>
        {title && <h3 className="text-xl font-bold text-neutral-900 mb-6">{title}</h3>}
        <div className="flex items-center justify-center py-12">
          <div className="text-neutral-500">Memuat data...</div>
        </div>
      </Card>
    )
  }

  return (
    <Card>
      {title && <h3 className="text-xl font-bold text-neutral-900 mb-6">{title}</h3>}

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-neutral-200">
              {columns.map((col) => (
                <th key={col.key} className="px-4 py-3 text-left text-sm font-semibold text-neutral-900">
                  {col.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.length > 0 ? (
              data.map((row, idx) => (
                <tr key={idx} className="border-b border-neutral-100 hover:bg-neutral-50 transition-colors">
                  {columns.map((col) => (
                    <td key={col.key} className="px-4 py-3 text-sm text-neutral-700">
                      {col.render ? col.render(row[col.key], row) : row[col.key]}
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={columns.length} className="px-4 py-8 text-center text-neutral-500">
                  Tidak ada data
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </Card>
  )
}
