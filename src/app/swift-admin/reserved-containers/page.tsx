"use client"

import { CarList } from "@/components/cars/car-list"
import { useState, useEffect } from "react"
import type { CarData } from "@/types/car"
import { CarStatus } from "@prisma/client"

export default function ReservedContainersPage() {
  const [cars, setCars] = useState<CarData[]>([])
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(true)

  const toNum = (v: any): number => {
    try {
      if (v == null) return 0
      if (typeof v === "object" && typeof (v as any).toNumber === "function") return (v as any).toNumber()
      const n = Number(v)
      return Number.isFinite(n) ? n : 0
    } catch {
      return 0
    }
  }

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const response = await fetch("/api/admin/cars?transportStatus=CONTAINER_RESERVED")
        if (!response.ok) throw new Error("Failed to fetch cars")
        const json = await response.json()
        if (!json?.success) throw new Error(json?.message || "Failed to fetch cars")
        const raw = Array.isArray(json.data) ? json.data : []
        const formatted: CarData[] = raw.map((c: any) => ({
          ...c,
          name: [c.make, c.model, c.year].filter(Boolean).join(" "),
          purchasePrice: toNum(c.purchasePrice),
          transportPrice: toNum(c.transportPrice),
          invoices: Array.isArray(c.invoices) ? c.invoices.map((inv: any) => ({
            ...inv,
            amount: toNum(inv.amount)
          })) : [],
          transportInfo: c.transportInfo as any,
        }))
        setCars(formatted)
      } catch (error) {
        setError("Failed to fetch cars")
      } finally {
        setIsLoading(false)
      }
    }

    fetchCars()
  }, [])

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this car?")) return

    try {
      const response = await fetch(`/api/admin/cars/${id}`, {
        method: "DELETE",
      })

      if (!response.ok) throw new Error("Failed to delete car")

      setCars(cars.filter(car => car.id !== id))
    } catch (error) {
      setError("Failed to delete car")
    }
  }

  const handleMove = async (id: string, newStatus: CarStatus) => {
    try {
      const response = await fetch(`/api/admin/cars/${id}/status`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      })

      if (!response.ok) throw new Error("Failed to update car status")

      setCars(cars.filter(car => car.id !== id))
    } catch (error) {
      setError("Failed to update car status")
    }
  }

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (error) {
    return <div className="text-red-500">{error}</div>
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">დაჯავშნილი კონტეინერები</h1>
      
      <CarList 
        cars={cars}
        onDelete={handleDelete}
      />
    </div>
  )
}
