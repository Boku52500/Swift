"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useState, useEffect } from "react"
import { useRouter, useParams } from "next/navigation"

interface Car {
  id: string
  vin: string
  make: string
  model: string
  year: number
  transportPrice: number
  buyer: string | null
  receiver: string | null
  dealerId: string
  status: string
  images: string[]
  invoices?: { id: string; amount: number; isPaid: boolean; fileUrl: string }[]
  transportInfo: {
    pickupDate: string | null
    warehouseArrivalDate: string | null
    loadingDate: string | null
    dispatchDate: string | null
    arrivalDate: string | null
    reservationNumber: string | null
    containerNumber: string | null
    shiplineName: string | null
    trackingUrl: string | null
  } | null
}

interface Dealer {
  id: string
  email: string
  dealerProfile: {
    companyName: string | null
  } | null
}

export default function EditCarPage() {
  const router = useRouter()
  const routeParams = useParams()
  const id = Array.isArray(routeParams?.id) ? routeParams?.id[0] : (routeParams?.id as string)
  const [car, setCar] = useState<Car | null>(null)
  const [dealers, setDealers] = useState<Dealer[]>([])
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [status, setStatus] = useState<string>("PENDING")
  const [invoices, setInvoices] = useState<{ amount: string; isPaid: boolean; file?: File }[]>([])
  const [files, setFiles] = useState<File[]>([])
  const [previews, setPreviews] = useState<string[]>([])
  const [existingImages, setExistingImages] = useState<string[]>([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [carResponse, dealersResponse] = await Promise.all([
          fetch(`/api/admin/cars/${id}`),
          fetch("/api/admin/dealers")
        ])

        if (!carResponse.ok) throw new Error("Failed to fetch car")
        if (!dealersResponse.ok) throw new Error("Failed to fetch dealers")

        const [carRes, dealersRes] = await Promise.all([
          carResponse.json(),
          dealersResponse.json()
        ])

        if (!carRes.success) throw new Error(carRes.message || "Failed to fetch car")
        if (!dealersRes.success) throw new Error(dealersRes.message || "Failed to fetch dealers")

        setCar(carRes.data)
        setExistingImages(Array.isArray(carRes.data.images) ? carRes.data.images : [])
        setStatus(carRes.data.status || "PENDING")
        setDealers(Array.isArray(dealersRes.data) ? dealersRes.data : [])
      } catch (error) {
        setError("Failed to fetch data")
      }
    }

    if (id) {
      fetchData()
    }
  }, [id])

  // Build/revoke preview URLs on image file selection changes
  useEffect(() => {
    const urls = files.map((f) => URL.createObjectURL(f))
    setPreviews(urls)
    return () => {
      urls.forEach((u) => URL.revokeObjectURL(u))
    }
  }, [files])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError("")
    setIsLoading(true)

    const formData = new FormData(e.currentTarget)

    // Upload selected image files first (if any) to get URLs
    let uploadedUrls: string[] = []
    try {
      if (files.length > 0) {
        const fd = new FormData()
        for (const f of files) fd.append("files", f)
        const upRes = await fetch("/api/upload", { method: "POST", body: fd })
        if (!upRes.ok) throw new Error("Failed to upload images")
        const upJson = await upRes.json()
        if (!upJson.success) throw new Error(upJson.message || "Failed to upload images")
        uploadedUrls = Array.isArray(upJson.urls) ? upJson.urls : []
      }
    } catch (err) {
      setIsLoading(false)
      setError(err instanceof Error ? err.message : "Failed to upload images")
      return
    }

    // Upload any new invoice files first
    let invoiceFileUrls: string[] = []
    const invoiceFiles = invoices.map((inv) => inv.file).filter(Boolean) as File[]
    try {
      if (invoiceFiles.length > 0) {
        const fdInv = new FormData()
        for (const f of invoiceFiles) fdInv.append("files", f)
        const upRes = await fetch("/api/upload", { method: "POST", body: fdInv })
        if (!upRes.ok) throw new Error("Failed to upload invoices")
        const upJson = await upRes.json()
        if (!upJson.success) throw new Error(upJson.message || "Failed to upload invoices")
        invoiceFileUrls = Array.isArray(upJson.urls) ? upJson.urls : []
      }
    } catch (err) {
      setIsLoading(false)
      setError(err instanceof Error ? err.message : "Failed to upload invoices")
      return
    }

    const invoicesPayload = invoices.map((inv) => ({
      amount: parseFloat(inv.amount || "0"),
      isPaid: !!inv.isPaid,
      fileUrl: inv.file ? invoiceFileUrls.shift() || "" : "",
    })).filter((i) => i.amount > 0 && i.fileUrl)

    const data = {
      vin: formData.get("vin") as string,
      make: formData.get("make") as string,
      model: formData.get("model") as string,
      year: formData.get("year") ? parseInt(formData.get("year") as string) : undefined,
      transportPrice: parseFloat(formData.get("transportPrice") as string),
      dealerId: formData.get("dealerId") as string,
      buyer: formData.get("buyer") as string || null,
      receiver: formData.get("receiver") as string || null,
      images: [...existingImages, ...uploadedUrls],
      status,
      invoices: invoicesPayload,
      transportInfo: {
        pickupDate: formData.get("pickupDate") as string || null,
        warehouseArrivalDate: formData.get("warehouseArrivalDate") as string || null,
        loadingDate: formData.get("loadingDate") as string || null,
        dispatchDate: formData.get("dispatchDate") as string || null,
        arrivalDate: formData.get("arrivalDate") as string || null,
        reservationNumber: formData.get("reservationNumber") as string || null,
        containerNumber: formData.get("containerNumber") as string || null,
        shiplineName: formData.get("shiplineName") as string || null,
        trackingUrl: formData.get("trackingUrl") as string || null,
      }
    }

    try {
      const response = await fetch(`/api/admin/cars/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })

      if (!response.ok) {
        throw new Error("Failed to update car")
      }

      router.push("/swift-admin/cars")
      router.refresh()
    } catch (error) {
      setError("Failed to update car")
    } finally {
      setIsLoading(false)
    }
  }

  if (!id || !car) {
    return <div>Loading...</div>
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold">მანქანის რედაქტირება</h1>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="make">მარკა</Label>
            <Input
              id="make"
              name="make"
              required
              defaultValue={car.make}
              className="bg-neutral-800 border-neutral-700"
            />
          </div>

        

          <div className="space-y-2">
            <Label htmlFor="model">მოდელი</Label>
            <Input
              id="model"
              name="model"
              required
              defaultValue={car.model}
              className="bg-neutral-800 border-neutral-700"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="year">წელი</Label>
            <Input
              id="year"
              name="year"
              type="number"
              min="1900"
              max="2100"
              required
              defaultValue={car.year}
              className="bg-neutral-800 border-neutral-700"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="transportPrice">ტრანსპორტირების ფასი</Label>
          <Input
            id="transportPrice"
            name="transportPrice"
            type="number"
            step="0.01"
            required
            defaultValue={car.transportPrice}
            className="bg-neutral-800 border-neutral-700"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="status">სტატუსი</Label>
          <Select value={status} onValueChange={setStatus}>
            <SelectTrigger className="bg-neutral-800 border-neutral-700">
              <SelectValue placeholder="აირჩიეთ სტატუსი" />
            </SelectTrigger>
            <SelectContent className="bg-neutral-800 border-neutral-700 max-h-60">
              <SelectItem value="PENDING">მოლოდინში</SelectItem>
              <SelectItem value="AT_AUCTION">აუქციონზე</SelectItem>
              <SelectItem value="IN_TRANSIT">გზაში</SelectItem>
              <SelectItem value="AT_PORT">პორტში</SelectItem>
              <SelectItem value="SHIPPED">გაგზავნილი</SelectItem>
              <SelectItem value="ARRIVED">ჩამოსული</SelectItem>
              <SelectItem value="DELIVERED">მიწოდებული</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="dealerId">დილერი</Label>
          <input type="hidden" name="dealerId" value={car.dealerId} />
          <Select value={car.dealerId} onValueChange={(v) => setCar(prev => prev ? { ...prev, dealerId: v } : prev)} required>
            <SelectTrigger className="bg-neutral-800 border-neutral-700">
              <SelectValue placeholder="აირჩიეთ დილერი" />
            </SelectTrigger>
            <SelectContent>
              {dealers.map((dealer) => (
                <SelectItem key={dealer.id} value={dealer.id}>
                  {dealer.dealerProfile?.companyName || dealer.email}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="buyer">მყიდველი</Label>
          <Input
            id="buyer"
            name="buyer"
            defaultValue={car.buyer || ""}
            className="bg-neutral-800 border-neutral-700"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="receiver">მიმღები</Label>
          <Input
            id="receiver"
            name="receiver"
            defaultValue={car.receiver || ""}
            className="bg-neutral-800 border-neutral-700"
          />
        </div>

        {/* Match New Car page: show location and notes before images */}
        <div className="space-y-2">
          <Label htmlFor="location">მდებარეობა</Label>
          <Input
            id="location"
            name="location"
            defaultValue={car.location || ""}
            className="bg-neutral-800 border-neutral-700"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="notes">შენიშვნები</Label>
          <Input
            id="notes"
            name="notes"
            defaultValue={car.notes || ""}
            className="bg-neutral-800 border-neutral-700"
          />
        </div>

        {/* Existing images grid with remove buttons (positioned before invoices, like New Car page) */}
        <div className="space-y-2">
          <Label>არსებული სურათები</Label>
          {existingImages.length === 0 ? (
            <p className="text-sm text-neutral-500">სურათები დამატებული არ არის</p>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {existingImages.map((url, idx) => (
                <div key={url + idx} className="border border-neutral-700 rounded p-2">
                  <div className="aspect-video overflow-hidden rounded bg-neutral-800">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={url} alt={`image-${idx}`} className="w-full h-full object-cover" />
                  </div>
                  <div className="mt-2 flex items-center justify-end">
                    <Button
                      type="button"
                      variant="ghost"
                      className="text-red-500 hover:text-red-600"
                      onClick={() => setExistingImages((prev) => prev.filter((_, i) => i !== idx))}
                    >
                      მოცილება
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* New images upload */}
        <div className="space-y-2">
          <Label>ფაილების ატვირთვა</Label>
          <Input
            id="file-upload"
            type="file"
            multiple
            accept="image/*"
            onChange={(e) => {
              const fl = e.currentTarget.files
              setFiles((prev) => prev.concat(fl ? Array.from(fl) : []))
            }}
          />
          {files.length > 0 && (
            <div className="mt-2 grid grid-cols-2 sm:grid-cols-3 gap-3">
              {files.map((file, idx) => (
                <div key={idx} className="border border-neutral-700 rounded p-2">
                  <div className="aspect-video overflow-hidden rounded bg-neutral-800">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={previews[idx]} alt={file.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="mt-2 flex items-center justify-between gap-2 text-xs text-neutral-400">
                    <span className="truncate" title={file.name}>{file.name}</span>
                    <Button
                      type="button"
                      variant="ghost"
                      className="text-red-400 hover:text-red-500"
                      onClick={() => setFiles((prev) => prev.filter((_, i) => i !== idx))}
                    >
                      Remove
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <Label>ინვოისები</Label>
          </div>
          {car.invoices && car.invoices.length > 0 && (
            <div className="space-y-2">
              {car.invoices.map((inv) => (
                <div key={inv.id} className="flex items-center justify-between rounded border border-neutral-800 p-2">
                  <div className="space-y-0.5">
                    <p className="text-sm">რაოდენობა: ${'{'}inv.amount.toFixed(2){'}'}</p>
                    <p className="text-xs text-neutral-500">სტატუსი: {inv.isPaid ? "გადახდილი" : "გადაუხდელი"}</p>
                  </div>
                  <a href={inv.fileUrl} target="_blank" rel="noreferrer" className="text-sm text-blue-400 hover:underline">გახსნა</a>
                </div>
              ))}
            </div>
          )}
          <div className="flex items-center justify-between mt-2">
            <Label>ახალი ინვოისების დამატება</Label>
            <Button
              type="button"
              variant="ghost"
              onClick={() => setInvoices((prev) => [...prev, { amount: "", isPaid: false }])}
            >
              დამატება
            </Button>
          </div>
          {invoices.length === 0 && (
            <p className="text-sm text-neutral-500">ახალი ინვოისები არჩეული არ არის</p>
          )}
          {invoices.map((inv, idx) => (
            <div key={idx} className="grid grid-cols-2 md:grid-cols-4 gap-3 items-end border border-neutral-800 rounded p-3">
              <div className="space-y-2">
                <Label>თანხა</Label>
                <Input
                  type="number"
                  step="0.01"
                  value={inv.amount}
                  onChange={(e) => setInvoices((prev) => prev.map((p, i) => i === idx ? { ...p, amount: e.target.value } : p))}
                  className="bg-neutral-800 border-neutral-700"
                />
              </div>
              <div className="space-y-2">
                <Label>ფაილი</Label>
                <Input
                  type="file"
                  accept="application/pdf,image/*"
                  onChange={(e) => {
                    const f = e.currentTarget.files?.[0]
                    setInvoices((prev) => prev.map((p, i) => i === idx ? { ...p, file: f } : p))
                  }}
                  className="bg-neutral-800 border-neutral-700"
                />
              </div>
              <div className="space-y-2">
                <Label>სტატუსი</Label>
                <Select value={inv.isPaid ? "PAID" : "UNPAID"} onValueChange={(v) => setInvoices((prev) => prev.map((p, i) => i === idx ? { ...p, isPaid: v === "PAID" } : p))}>
                  <SelectTrigger className="bg-neutral-800 border-neutral-700">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-neutral-800 border-neutral-700">
                    <SelectItem value="UNPAID">გადაუხდელი</SelectItem>
                    <SelectItem value="PAID">გადახდილი</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex md:justify-end">
                <Button
                  type="button"
                  variant="ghost"
                  className="text-red-400 hover:text-red-500"
                  onClick={() => setInvoices((prev) => prev.filter((_, i) => i !== idx))}
                >
                  მოცილება
                </Button>
              </div>
            </div>
          ))}
        </div>

        <div className="border-t border-neutral-700 pt-4 mt-6">
          <h2 className="text-lg font-semibold mb-4">ტრანსპორტირების ინფორმაცია</h2>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="pickupDate">აყვანის თარიღი</Label>
              <Input
                id="pickupDate"
                name="pickupDate"
                type="date"
                defaultValue={car.transportInfo?.pickupDate?.split("T")[0] || ""}
                className="bg-neutral-800 border-neutral-700"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="warehouseArrivalDate">საწყობში მისვლის თარიღი</Label>
              <Input
                id="warehouseArrivalDate"
                name="warehouseArrivalDate"
                type="date"
                defaultValue={car.transportInfo?.warehouseArrivalDate?.split("T")[0] || ""}
                className="bg-neutral-800 border-neutral-700"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="loadingDate">ჩატვირთვის თარიღი</Label>
              <Input
                id="loadingDate"
                name="loadingDate"
                type="date"
                defaultValue={car.transportInfo?.loadingDate?.split("T")[0] || ""}
                className="bg-neutral-800 border-neutral-700"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="dispatchDate">გამოგზავნის თარიღი</Label>
              <Input
                id="dispatchDate"
                name="dispatchDate"
                type="date"
                defaultValue={car.transportInfo?.dispatchDate?.split("T")[0] || ""}
                className="bg-neutral-800 border-neutral-700"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="arrivalDate">ჩამოსვლის თარიღი</Label>
              <Input
                id="arrivalDate"
                name="arrivalDate"
                type="date"
                defaultValue={car.transportInfo?.arrivalDate?.split("T")[0] || ""}
                className="bg-neutral-800 border-neutral-700"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="reservationNumber">ჯავშნის ნომერი</Label>
              <Input
                id="reservationNumber"
                name="reservationNumber"
                defaultValue={car.transportInfo?.reservationNumber || ""}
                className="bg-neutral-800 border-neutral-700"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="containerNumber">კონტეინერის ნომერი</Label>
              <Input
                id="containerNumber"
                name="containerNumber"
                defaultValue={car.transportInfo?.containerNumber || ""}
                className="bg-neutral-800 border-neutral-700"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="shiplineName">Shipline Name</Label>
              <Input
                id="shiplineName"
                name="shiplineName"
                defaultValue={car.transportInfo?.shiplineName || ""}
                className="bg-neutral-800 border-neutral-700"
              />
            </div>

            <div className="col-span-2 space-y-2">
              <Label htmlFor="trackingUrl">თრექინგის ბმული</Label>
              <Input
                id="trackingUrl"
                name="trackingUrl"
                type="url"
                defaultValue={car.transportInfo?.trackingUrl || ""}
                className="bg-neutral-800 border-neutral-700"
              />
            </div>
          </div>
        </div>

        {error && (
          <p className="text-sm text-red-500">{error}</p>
        )}

        <Button
          type="submit"
          className="w-full"
          disabled={isLoading}
        >
          {isLoading ? "განახლება..." : "განახლება"}
        </Button>
      </form>
    </div>
  )
}
