"use client"

import { useState, useEffect } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

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
  status: string
  dealer: {
    email: string
    dealerProfile: { companyName: string | null } | null
  }
}

export default function LoadedCarsPage() {
  const [cars, setCars] = useState<Car[]>([])
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(true)
  const [name, setName] = useState("")
  const [vin, setVin] = useState("")
  const [lotNumber, setLotNumber] = useState("")

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const response = await fetch("/api/admin/cars?status=SHIPPED")
        if (!response.ok) throw new Error("Failed to fetch cars")
        const data = await response.json()
        if (!data.success) throw new Error(data.message || "Failed to fetch cars")
        setCars(Array.isArray(data.data) ? data.data : [])
      } catch (error) {
        setError("Failed to fetch cars")
      } finally {
        setIsLoading(false)
      }
    }

    fetchCars()
  }, [])

  const fetchWithFilters = async (params?: { name?: string; vin?: string; lotNumber?: string }) => {
    const qs = new URLSearchParams({ status: "SHIPPED" })
    if (params?.name) qs.set("name", params.name)
    if (params?.vin) qs.set("vin", params.vin)
    if (params?.lotNumber) qs.set("lotNumber", params.lotNumber)
    const response = await fetch(`/api/admin/cars?${qs.toString()}`)
    if (!response.ok) throw new Error("Failed to fetch cars")
    const data = await response.json()
    if (!data.success) throw new Error(data.message || "Failed to fetch cars")
    setCars(Array.isArray(data.data) ? data.data : [])
  }

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")
    try {
      await fetchWithFilters({
        name: name || undefined,
        vin: vin || undefined,
        lotNumber: lotNumber || undefined,
      })
    } catch (error) {
      setError("Failed to fetch cars")
    } finally {
      setIsLoading(false)
    }
  }

  const handleClear = async () => {
    setName("")
    setVin("")
    setLotNumber("")
    setIsLoading(true)
    setError("")
    try {
      await fetchWithFilters()
    } finally {
      setIsLoading(false)
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
      <h1 className="text-2xl font-bold">კონტეინერში ჩატვირთული მანქანები</h1>

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
            </TableRow>
          </TableHeader>
          <TableBody>
            {cars.map((car) => (
              <TableRow key={car.id}>
                <TableCell>{car.make} {car.model} {car.year}</TableCell>
                <TableCell>{car.vin}</TableCell>
                <TableCell>${car.purchasePrice.toFixed(2)}</TableCell>
                <TableCell>${car.transportPrice.toFixed(2)}</TableCell>
                <TableCell>{car.lotNumber || "-"}</TableCell>
                <TableCell>{car.auction || "-"}</TableCell>
                <TableCell>{car.buyer || "-"}</TableCell>
                <TableCell>{car.receiver || "-"}</TableCell>
                <TableCell>{car.location || "-"}</TableCell>
                <TableCell>{car.status}</TableCell>
                <TableCell>{car.dealer.dealerProfile?.companyName || car.dealer.email}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
