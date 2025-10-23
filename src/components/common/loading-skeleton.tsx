"use client"

export function LoadingSkeleton() {
  return (
    <div className="space-y-4 animate-pulse">
      {[...Array(3)].map((_, i) => (
        <div key={i} className="h-12 bg-neutral-200 rounded-lg" />
      ))}
    </div>
  )
}
