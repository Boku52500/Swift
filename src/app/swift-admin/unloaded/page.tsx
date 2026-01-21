"use client"

import { CarList } from "@/components/cars/car-list"
import { useState, useEffect } from "react"

interface Car {
  id: string
  name: string
  transportPrice: number
  buyer: string | null
  receiver: string | null
  status: string
  dealerId: string
  dealer: {
    email: string
    dealerProfile: {
      companyName: string | null
    } | null
  }
}

export default function UnloadedCarsPage() {
  const [cars, setCars] = useState<Car[]>([])
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const response = await fetch("/api/admin/cars?status=UNLOADED")
        if (!response.ok) throw new Error("Failed to fetch cars")
        const data = await response.json()
        setCars(data)
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

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (error) {
    return <div className="text-red-500">{error}</div>
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">ჩაუტვირთავი მანქანები</h1>
      
      <CarList 
        cars={cars}
        onDelete={handleDelete}
      />
    </div>
  )
}
