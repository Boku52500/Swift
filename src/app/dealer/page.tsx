"use client"

import Link from "next/link"
import { Card } from "@/components/ui/card"
import { Car, LayoutDashboard, PackageOpen, Warehouse, Container, CheckSquare } from "lucide-react"
import { useEffect, useState } from "react"
import { getDealerStats } from "@/app/actions/get-dealer-stats"

type Counters = {
  total: number
  byStatus: Record<string, number>
}

export default function DealerPage() {
  const [stats, setStats] = useState<Counters | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    const load = async () => {
      try {
        const res = await getDealerStats()
        if (!res.success) throw new Error(res.message)
        setStats(((res as any).data ?? { total: 0, byStatus: {} }) as Counters)
      } catch (e) {
        setError(e instanceof Error ? e.message : "Failed to load stats")
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [])

  const items = [
    { title: "ყველა მანქანა", href: "/dealer/cars", icon: Car, value: stats?.total ?? 0 },
    { title: "საწყობში არ მისული", href: "/dealer/not-in-warehouse", icon: Warehouse, value: stats?.byStatus?.IN_TRANSIT ?? 0 },
    { title: "კონტეინერში ჩატვირთული", href: "/dealer/loaded", icon: PackageOpen, value: stats?.byStatus?.SHIPPED ?? 0 },
    { title: "ჩამოსული", href: "/dealer/arrived", icon: CheckSquare, value: stats?.byStatus?.ARRIVED ?? 0 },
  ]

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold flex items-center gap-2">
        <LayoutDashboard className="h-5 w-5 text-red-600" /> სტატისტიკა
      </h2>

      {error && <p className="text-red-500 text-sm">{error}</p>}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4">
        {items.map((item) => {
          const Icon = item.icon
          return (
            <Link key={item.href} href={item.href}>
              <Card className="p-6 border border-red-200 bg-white hover:bg-red-50 transition-colors cursor-pointer rounded-lg shadow-sm hover:shadow-md">
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Icon className="h-5 w-5 text-red-600" />
                    <h3 className="font-medium text-red-700">{item.title}</h3>
                  </div>
                  <p className="text-3xl font-bold text-red-700">{loading ? "…" : item.value}</p>
                </div>
              </Card>
            </Link>
          )
        })}
      </div>
    </div>
  )
}
