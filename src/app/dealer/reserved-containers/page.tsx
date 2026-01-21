"use client"

import { CarList } from "@/components/cars/car-list"
import { useEffect, useState } from "react"
import { getCars } from "@/app/actions/get-cars"
import { CarStatus } from "@prisma/client"
import type { CarData } from "@/types/car"

export default function ReservedContainersPage() {
  const [cars, setCars] = useState<CarData[]>([])
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const load = async () => {
      try {
        const res = await getCars(CarStatus.AT_PORT)
        if (!res.success) throw new Error(res.message)
        const data = res.data ?? []
        setCars(Array.isArray(data) ? data : [])
      } catch (e) {
        setError(e instanceof Error ? e.message : "Failed to load cars")
      } finally {
        setIsLoading(false)
      }
    }
    load()
  }, [])

  if (isLoading) return <div>Loading...</div>
  if (error) return <div className="text-red-500">{error}</div>

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">დაჯავშნილი კონტეინერი</h1>
      <CarList cars={cars} />
    </div>
  )
}
