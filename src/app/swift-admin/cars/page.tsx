"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Edit, Trash, Plus } from "lucide-react"
import Link from "next/link"
import { useState, useEffect } from "react"

interface Car {
  id: string
  vin: string
  make: string
  model: string
  year: number
  lotNumber: string | null
  auction: string | null
  purchasePrice: number
  transportPrice: number
  buyer: string | null
  receiver: string | null
  location: string | null
  notes: string | null
  images: string[]
  status: string
  dealer: {
    email: string
    dealerProfile: {
      companyName: string | null
    } | null
  }
  transportInfo: {
    id: string
    pickupDate: string | null
    warehouseArrivalDate: string | null
    loadingDate: string | null
    dispatchDate: string | null
    arrivalDate: string | null
    reservationNumber: string | null
    containerNumber: string | null
    shiplineName: string | null
    trackingUrl: string | null
    status: string
  } | null
  invoices: Array<{
    id: string
    amount: number
    isPaid: boolean
    fileUrl: string
  }>
}

export default function CarsPage() {
  const [cars, setCars] = useState<Car[]>([])
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(true)
  const [name, setName] = useState("")
  const [vin, setVin] = useState("")
  const [lotNumber, setLotNumber] = useState("")

  const fetchCars = async (params?: { name?: string; vin?: string; lotNumber?: string }) => {
    try {
      const qs = new URLSearchParams()
      if (params?.name) qs.set("name", params.name)
      if (params?.vin) qs.set("vin", params.vin)
      if (params?.lotNumber) qs.set("lotNumber", params.lotNumber)
      const response = await fetch(`/api/admin/cars${qs.toString() ? `?${qs.toString()}` : ""}`)
      if (!response.ok) throw new Error("Failed to fetch cars")
      const data = await response.json()
      if (!data.success) {
        throw new Error(data.message || "Failed to fetch cars")
      }
      setCars(data.data)
    } catch (error) {
      setError("Failed to fetch cars")
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchCars()
  }, [])

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")
    await fetchCars({
      name: name || undefined,
      vin: vin || undefined,
      lotNumber: lotNumber || undefined,
    })
  }

  const handleClear = async () => {
    setName("")
    setVin("")
    setLotNumber("")
    setIsLoading(true)
    setError("")
    await fetchCars()
  }

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

  const handleMove = async (id: string, newStatus: string) => {
    try {
      const response = await fetch(`/api/admin/cars/${id}/status`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      })
      if (!response.ok) throw new Error("Failed to update car status")
      setCars((prev) => prev.map((c) => (c.id === id ? { ...c, status: newStatus } : c)))
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
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">ყველა მანქანა</h1>
        <Button asChild>
          <Link href="/swift-admin/cars/new">
            <Plus className="w-4 h-4 mr-2" />
            მანქანის დამატება
          </Link>
        </Button>
      </div>

      <form onSubmit={handleSearch} className="grid grid-cols-1 sm:grid-cols-4 gap-3">
        <Input placeholder="მანქანა (make/model/year)" value={name} onChange={(e) => setName(e.target.value)} />
        <Input placeholder="VIN" value={vin} onChange={(e) => setVin(e.target.value)} />
        <Input placeholder="ლოტის ნომერი" value={lotNumber} onChange={(e) => setLotNumber(e.target.value)} />
        <div className="flex gap-2">
          <Button type="submit" className="w-full sm:w-auto">ფილტრი</Button>
          <Button type="button" variant="outline" onClick={handleClear} className="w-full sm:w-auto">გასუფთავება</Button>
        </div>
      </form>

      <div className="border border-neutral-700 rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>მანქანა</TableHead>
              <TableHead>სურათები</TableHead>
              <TableHead>VIN</TableHead>
              <TableHead>შესყიდვის ფასი</TableHead>
              <TableHead>ტრანსპორტირების ფასი</TableHead>
              <TableHead>ლოტის ნომერი</TableHead>
              <TableHead>აუქციონი</TableHead>
              <TableHead>მყიდველი</TableHead>
              <TableHead>მიმღები</TableHead>
              <TableHead>მდებარეობა</TableHead>
              <TableHead>სტატუსი</TableHead>
              <TableHead>დილერი</TableHead>
              <TableHead className="text-right">მოქმედებები</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {cars.map((car) => (
              <TableRow key={car.id}>
                <TableCell>{car.make} {car.model} {car.year}</TableCell>
                <TableCell>
                  {Array.isArray(car.images) && car.images.length > 0 ? (
                    <div className="h-12 w-20 overflow-hidden rounded border border-neutral-200">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={car.images[0]} alt={`${car.make} ${car.model}`} className="h-full w-full object-cover" />
                    </div>
                  ) : (
                    <span className="text-neutral-400">-</span>
                  )}
                </TableCell>
                <TableCell>{car.vin}</TableCell>
                <TableCell>${car.purchasePrice.toFixed(2)}</TableCell>
                <TableCell>${car.transportPrice.toFixed(2)}</TableCell>
                <TableCell>{car.lotNumber || "-"}</TableCell>
                <TableCell>{car.auction || "-"}</TableCell>
                <TableCell>{car.buyer || "-"}</TableCell>
                <TableCell>{car.receiver || "-"}</TableCell>
                <TableCell>{car.location || "-"}</TableCell>
                <TableCell>{car.status}</TableCell>
                <TableCell>
                  {car.dealer.dealerProfile?.companyName || car.dealer.email}
                </TableCell>
                <TableCell className="text-right space-x-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    asChild
                  >
                    <Link href={`/swift-admin/cars/${car.id}`}>
                      <Edit className="h-4 w-4" />
                    </Link>
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-red-500 hover:text-red-600"
                    onClick={() => handleDelete(car.id)}
                  >
                    <Trash className="h-4 w-4" />
                  </Button>
                  <div className="inline-flex gap-1 align-middle">
                    <Button variant="outline" size="sm" onClick={() => handleMove(car.id, "ARRIVED")}>ჩამოსული</Button>
                    <Button variant="outline" size="sm" onClick={() => handleMove(car.id, "IN_TRANSIT")}>საწყობში არ მისული</Button>
                    <Button variant="outline" size="sm" onClick={() => handleMove(car.id, "SHIPPED")}>კონტეინერში ჩატვირთული</Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
