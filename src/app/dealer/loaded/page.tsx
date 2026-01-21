"use client"

import { useEffect, useState } from "react"
import { getCars } from "@/app/actions/get-cars"
import { CarStatus } from "@prisma/client"
import type { CarData } from "@/types/car"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { FileText, Truck, Search, X, Image } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"

export default function LoadedPage() {
  const [cars, setCars] = useState<CarData[]>([])
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(true)
  const [name, setName] = useState("")
  const [vin, setVin] = useState("")
  const [lotNumber, setLotNumber] = useState("")

  useEffect(() => {
    const load = async () => {
      try {
        const res = await getCars(CarStatus.SHIPPED)
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

  const handleSearch = async (e?: React.FormEvent) => {
    if (e) e.preventDefault()
    setIsLoading(true)
    setError("")
    try {
      const res = await getCars(CarStatus.SHIPPED, undefined, {
        name: name || undefined,
        vin: vin || undefined,
        lotNumber: lotNumber || undefined,
      })
      if (!res.success) throw new Error(res.message)
      const data = res.data ?? []
      setCars(Array.isArray(data) ? data : [])
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to load cars")
    } finally {
      setIsLoading(false)
    }
  }

  const handleClear = async () => {
    setName("")
    setVin("")
    setLotNumber("")
    await handleSearch()
  }

  if (isLoading) return <div>Loading...</div>
  if (error) return <div className="text-red-500">{error}</div>

  const Currency = ({ value }: { value?: number }) => (
    <span>{typeof value === "number" ? `$${value.toFixed(2)}` : "-"}</span>
  )

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">კონტეინერში ჩატვირთული</h1>

      <form onSubmit={handleSearch} className="grid grid-cols-1 sm:grid-cols-4 gap-3">
        <Input placeholder="მანქანა (make/model/year)" value={name} onChange={(e) => setName(e.target.value)} />
        <Input placeholder="VIN კოდი" value={vin} onChange={(e) => setVin(e.target.value)} />
        <Input placeholder="ლოტის ნომერი" value={lotNumber} onChange={(e) => setLotNumber(e.target.value)} />
        <div className="flex gap-2">
          <Button type="submit" className="w-full sm:w-auto bg-red-600 hover:bg-red-700 text-white">
            <Search className="w-4 h-4 mr-2" />
            ფილტრი
          </Button>
          <Button type="button" variant="outline" onClick={handleClear} className="w-full sm:w-auto border-red-600 text-red-600 hover:bg-red-50">
            <X className="w-4 h-4 mr-2" />
            გასუფთავება
          </Button>
        </div>
      </form>

      <div className="border border-neutral-200 rounded-lg overflow-hidden shadow-sm">
        <Table>
          <TableHeader className="bg-neutral-50 hover:bg-neutral-100">
            <TableRow>
              <TableHead className="font-semibold">მანქანა</TableHead>
              <TableHead className="font-semibold">VIN კოდი</TableHead>
              <TableHead className="font-semibold">ლოტის ნომერი</TableHead>
              <TableHead className="font-semibold">ფოტოები</TableHead>
              <TableHead className="font-semibold">მანქანის ღირებულება</TableHead>
              <TableHead className="font-semibold">ტრანსპორტირების ფასი</TableHead>
              <TableHead className="font-semibold">მყიდველი</TableHead>
              <TableHead className="font-semibold">მიმღები</TableHead>
              <TableHead className="font-semibold">ინვოისები</TableHead>
              <TableHead className="font-semibold">ტრანსპორტირება</TableHead>
              <TableHead className="font-semibold">სტატუსი</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {cars.map((car) => (
              <TableRow key={car.id} className="hover:bg-neutral-50 transition-colors">
                <TableCell>{car.name || "-"}</TableCell>
                <TableCell>{car.vin || "-"}</TableCell>
                <TableCell>{car.lotNumber || "-"}</TableCell>
                <TableCell>
                  {car.images && car.images.length > 0 ? (
                    <Sheet>
                      <SheetTrigger asChild>
                        <button className="block">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img src={car.images[0]} alt={`${car.name}-main`} className="h-14 w-20 object-cover rounded-md border border-neutral-200 hover:opacity-90 transition cursor-zoom-in shadow-sm" />
                        </button>
                      </SheetTrigger>
                      <SheetContent side="right" className="sm:max-w-xl overflow-y-auto">
                        <SheetHeader>
                          <SheetTitle>ფოტოები</SheetTitle>
                        </SheetHeader>
                        <div className="mt-4 grid grid-cols-2 gap-2">
                          {car.images.map((src, i) => (
                            <a key={i} href={src} target="_blank" rel="noreferrer" className="block">
                              {/* eslint-disable-next-line @next/next/no-img-element */}
                              <img src={src} alt={`${car.name}-${i}`} className="w-full aspect-video object-cover rounded-md border border-neutral-200 hover:opacity-90 transition cursor-zoom-in shadow-sm" />
                            </a>
                          ))}
                        </div>
                      </SheetContent>
                    </Sheet>
                  ) : (
                    <div className="h-14 w-20 rounded-md bg-neutral-100 border border-neutral-200 flex items-center justify-center text-xs text-neutral-500 shadow-sm">
                      <Image className="w-4 h-4 mr-1" />
                      No image
                    </div>
                  )}
                </TableCell>
                <TableCell><Currency value={car.purchasePrice} /></TableCell>
                <TableCell><Currency value={car.transportPrice} /></TableCell>
                <TableCell>{car.buyer || "-"}</TableCell>
                <TableCell>{car.receiver || "-"}</TableCell>
                <TableCell>
                  <Sheet>
                    <SheetTrigger asChild>
                      <Button variant="outline" size="sm" className="border-red-600 text-red-600 hover:bg-red-50">
                        <FileText className="w-4 h-4 mr-2" />
                        გახსნა
                      </Button>
                    </SheetTrigger>
                    <SheetContent side="right" className="sm:max-w-md overflow-y-auto">
                      <SheetHeader>
                        <SheetTitle>ინვოისები</SheetTitle>
                      </SheetHeader>
                      <div className="mt-4 space-y-2">
                        {car.invoices?.length ? car.invoices.map((inv) => (
                          <div key={inv.id} className="flex items-center justify-between rounded-md border border-neutral-200 p-3 shadow-sm hover:bg-neutral-50 transition-colors">
                            <div className="space-y-0.5 text-sm">
                              <div>რაოდენობა: <Currency value={inv.amount} /></div>
                              <div className="text-xs text-neutral-500">სტატუსი: {inv.isPaid ? "გადახდილი" : "გადაუხდელი"}</div>
                            </div>
                            <a href={inv.fileUrl} target="_blank" rel="noreferrer" className="text-sm text-red-600 hover:text-red-700 flex items-center gap-1">
                              <FileText className="w-4 h-4" />
                              გახსნა
                            </a>
                          </div>
                        )) : (
                          <p className="text-sm text-neutral-500">ინვოისები არ არის</p>
                        )}
                      </div>
                    </SheetContent>
                  </Sheet>
                </TableCell>
                <TableCell>
                  <Sheet>
                    <SheetTrigger asChild>
                      <Button variant="outline" size="sm" className="border-red-600 text-red-600 hover:bg-red-50">
                        <Truck className="w-4 h-4 mr-2" />
                        გახსნა
                      </Button>
                    </SheetTrigger>
                    <SheetContent side="right" className="sm:max-w-md overflow-y-auto">
                      <SheetHeader>
                        <SheetTitle>ტრანსპორტირება</SheetTitle>
                      </SheetHeader>
                      <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
                        <div><span className="text-neutral-500">Pickup:</span> {car.transportInfo?.pickupDate ? new Date(car.transportInfo.pickupDate).toLocaleDateString() : "-"}</div>
                        <div><span className="text-neutral-500">Warehouse:</span> {car.transportInfo?.warehouseArrivalDate ? new Date(car.transportInfo.warehouseArrivalDate).toLocaleDateString() : "-"}</div>
                        <div><span className="text-neutral-500">Loading:</span> {car.transportInfo?.loadingDate ? new Date(car.transportInfo.loadingDate).toLocaleDateString() : "-"}</div>
                        <div><span className="text-neutral-500">Dispatch:</span> {car.transportInfo?.dispatchDate ? new Date(car.transportInfo.dispatchDate).toLocaleDateString() : "-"}</div>
                        <div><span className="text-neutral-500">Arrival:</span> {car.transportInfo?.arrivalDate ? new Date(car.transportInfo.arrivalDate).toLocaleDateString() : "-"}</div>
                        <div><span className="text-neutral-500">Reservation #:</span> {car.transportInfo?.reservationNumber || "-"}</div>
                        <div><span className="text-neutral-500">Container #:</span> {car.transportInfo?.containerNumber || "-"}</div>
                        <div><span className="text-neutral-500">Shipline:</span> {car.transportInfo?.shiplineName || "-"}</div>
                        <div className="col-span-2"><span className="text-neutral-500">Tracking:</span> {car.transportInfo?.trackingUrl ? (<a className="text-blue-400 hover:underline" target="_blank" rel="noreferrer" href={car.transportInfo.trackingUrl}>Open</a>) : "-"}</div>
                      </div>
                    </SheetContent>
                  </Sheet>
                </TableCell>
                <TableCell>
                  {(() => {
                    switch (car.status) {
                      case "PENDING":
                        return "მოლოდინში"
                      case "AT_AUCTION":
                        return "აუქციონზე"
                      case "IN_TRANSIT":
                        return "გზაში"
                      case "AT_PORT":
                        return "პორტში"
                      case "SHIPPED":
                        return "გაგზავნილი"
                      case "ARRIVED":
                        return "ჩამოსული"
                      case "DELIVERED":
                        return "მიწოდებული"
                      default:
                        return car.status
                    }
                  })()}
                </TableCell>
              </TableRow>
            ))}
            {cars.length === 0 && (
              <TableRow>
                <TableCell colSpan={11} className="text-center py-8 text-neutral-500">
                  მანქანები არ მოიძებნა
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
