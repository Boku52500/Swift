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
import { useRouter } from "next/navigation"

interface Dealer {
  id: string
  email: string
  dealerProfile: {
    companyName: string | null
  } | null
}

export default function NewCarPage() {
  const router = useRouter()
  const [dealers, setDealers] = useState<Dealer[]>([])
  const [dealerId, setDealerId] = useState<string>("")
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [imageUrls, setImageUrls] = useState<string[]>([""])
  const [files, setFiles] = useState<File[]>([])
  const [previews, setPreviews] = useState<string[]>([])
  const [status, setStatus] = useState<string>("PENDING")
  const [invoices, setInvoices] = useState<{ amount: string; isPaid: boolean; file?: File }[]>([])

  useEffect(() => {
    const fetchDealers = async () => {
      try {
        const response = await fetch("/api/admin/dealers")
        if (!response.ok) throw new Error("Failed to fetch dealers")
        const data = await response.json()
        if (!data.success) {
          throw new Error(data.message || "Failed to fetch dealers")
        }
        setDealers(data.data)
      } catch (error) {
        setError("Failed to fetch dealers")
      }
    }

    fetchDealers()
  }, [])

  // Build/revoke preview URLs on file selection changes
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

    // Upload invoice files (if any)
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

    // Build invoices payload preserving order
    const invoicesPayload = invoices.map((inv, idx) => ({
      amount: parseFloat(inv.amount || "0"),
      isPaid: !!inv.isPaid,
      fileUrl: inv.file ? invoiceFileUrls.shift() || "" : "",
    })).filter((i) => i.amount > 0 && i.fileUrl)

    const data = {
      name: formData.get("name") as string,
      transportPrice: parseFloat(formData.get("transportPrice") as string),
      dealerId: formData.get("dealerId") as string,
      buyer: formData.get("buyer") as string || null,
      receiver: formData.get("receiver") as string || null,
      images: uploadedUrls,
      status,
      vin: formData.get("vin") as string,
      make: formData.get("make") as string,
      model: formData.get("model") as string,
      year: parseInt(formData.get("year") as string),
      lotNumber: formData.get("lotNumber") as string || null,
      auction: formData.get("auction") as string || null,
      purchasePrice: parseFloat(formData.get("purchasePrice") as string),
      location: formData.get("location") as string || null,
      notes: formData.get("notes") as string || null,
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
      const response = await fetch("/api/admin/cars", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })

      if (!response.ok) {
        const j = await response.json().catch(() => ({}))
        const msg = (j && (j.message || j.error || j.details)) || `Failed to create car (${response.status})`
        throw new Error(msg)
      }

      router.push("/swift-admin/cars")
      router.refresh()
    } catch (error) {
      setError(error instanceof Error ? error.message : "Failed to create car")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold">მანქანის დამატება</h1>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="vin">VIN</Label>
            <Input
              id="vin"
              name="vin"
              required
              className="bg-neutral-800 border-neutral-700"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="make">მარკა</Label>
            <Input
              id="make"
              name="make"
              required
              className="bg-neutral-800 border-neutral-700"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="model">მოდელი</Label>
            <Input
              id="model"
              name="model"
              required
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
              max="2024"
              required
              className="bg-neutral-800 border-neutral-700"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="lotNumber">ლოტის ნომერი</Label>
            <Input
              id="lotNumber"
              name="lotNumber"
              className="bg-neutral-800 border-neutral-700"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="auction">აუქციონი</Label>
            <Input
              id="auction"
              name="auction"
              className="bg-neutral-800 border-neutral-700"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="purchasePrice">შესყიდვის ფასი</Label>
            <Input
              id="purchasePrice"
              name="purchasePrice"
              type="number"
              step="0.01"
              required
              className="bg-neutral-800 border-neutral-700"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="transportPrice">ტრანსპორტირების ფასი</Label>
            <Input
              id="transportPrice"
              name="transportPrice"
              type="number"
              step="0.01"
              required
              className="bg-neutral-800 border-neutral-700"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="dealerId">დილერი</Label>
          <input type="hidden" name="dealerId" value={dealerId} />
          <Select value={dealerId} onValueChange={setDealerId} required>
            <SelectTrigger className="bg-neutral-800 border-neutral-700">
              <SelectValue placeholder="აირჩიეთ დილერი" />
            </SelectTrigger>
            <SelectContent className="bg-neutral-800 border-neutral-700 max-h-60">
              {dealers.length > 0 ? (
                dealers.map((dealer) => (
                  <SelectItem 
                    key={dealer.id} 
                    value={dealer.id}
                    className="hover:bg-neutral-700"
                  >
                    {dealer.dealerProfile?.companyName || dealer.email}
                  </SelectItem>
                ))
              ) : (
                <SelectItem 
                  value="loading" 
                  disabled 
                  className="text-neutral-500"
                >
                  დილერები არ მოიძებნა
                </SelectItem>
              )}
            </SelectContent>
          </Select>
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

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="buyer">მყიდველი</Label>
            <Input
              id="buyer"
              name="buyer"
              className="bg-neutral-800 border-neutral-700"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="receiver">მიმღები</Label>
            <Input
              id="receiver"
              name="receiver"
              className="bg-neutral-800 border-neutral-700"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="location">მდებარეობა</Label>
          <Input
            id="location"
            name="location"
            className="bg-neutral-800 border-neutral-700"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="notes">შენიშვნები</Label>
          <Input
            id="notes"
            name="notes"
            className="bg-neutral-800 border-neutral-700"
          />
        </div>

        <div className="space-y-2">
          <Label>ფაილების ატვირთვა</Label>
          <Input
            id="file-upload"
            type="file"
            multiple
            accept="image/*"
            className="bg-neutral-800 border-neutral-700"
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
            <Button
              type="button"
              variant="ghost"
              onClick={() => setInvoices((prev) => [...prev, { amount: "", isPaid: false }])}
            >
              ინვოისის დამატება
            </Button>
          </div>
          {invoices.length === 0 && (
            <p className="text-sm text-neutral-500">ინვოისები არ არის დამატებული</p>
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

        {false && (
          <div className="space-y-2">
            <Label>სურათები</Label>
            {imageUrls.map((url, idx) => (
              <div className="flex gap-2" key={idx}>
                <Input
                  name="images"
                  placeholder="https://example.com/image.jpg"
                  value={url}
                  onChange={(e) => {
                    const v = e.target.value
                    setImageUrls((prev) => prev.map((u, i) => (i === idx ? v : u)))
                  }}
                  className="bg-neutral-800 border-neutral-700 flex-1"
                />
                <Button
                  type="button"
                  variant="ghost"
                  onClick={() => setImageUrls((prev) => prev.filter((_, i) => i !== idx))}
                  disabled={imageUrls.length === 1}
                >
                  Remove
                </Button>
              </div>
            ))}
            <Button
              type="button"
              variant="ghost"
              onClick={() => setImageUrls((prev) => [...prev, ""])}
            >
              სურათის დამატება
            </Button>
          </div>
        )}

        <div className="border-t border-neutral-700 pt-4 mt-6">
          <h2 className="text-lg font-semibold mb-4">ტრანსპორტირების ინფორმაცია</h2>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="pickupDate">აყვანის თარიღი</Label>
              <Input
                id="pickupDate"
                name="pickupDate"
                type="date"
                className="bg-neutral-800 border-neutral-700"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="warehouseArrivalDate">საწყობში მისვლის თარიღი</Label>
              <Input
                id="warehouseArrivalDate"
                name="warehouseArrivalDate"
                type="date"
                className="bg-neutral-800 border-neutral-700"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="loadingDate">ჩატვირთვის თარიღი</Label>
              <Input
                id="loadingDate"
                name="loadingDate"
                type="date"
                className="bg-neutral-800 border-neutral-700"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="dispatchDate">გამოგზავნის თარიღი</Label>
              <Input
                id="dispatchDate"
                name="dispatchDate"
                type="date"
                className="bg-neutral-800 border-neutral-700"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="arrivalDate">ჩამოსვლის თარიღი</Label>
              <Input
                id="arrivalDate"
                name="arrivalDate"
                type="date"
                className="bg-neutral-800 border-neutral-700"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="reservationNumber">ჯავშნის ნომერი</Label>
              <Input
                id="reservationNumber"
                name="reservationNumber"
                className="bg-neutral-800 border-neutral-700"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="containerNumber">კონტეინერის ნომერი</Label>
              <Input
                id="containerNumber"
                name="containerNumber"
                className="bg-neutral-800 border-neutral-700"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="shiplineName">Shipline Name</Label>
              <Input
                id="shiplineName"
                name="shiplineName"
                className="bg-neutral-800 border-neutral-700"
              />
            </div>

            <div className="col-span-2 space-y-2">
              <Label htmlFor="trackingUrl">თრექინგის ბმული</Label>
              <Input
                id="trackingUrl"
                name="trackingUrl"
                type="url"
                className="bg-neutral-800 border-neutral-700"
              />
            </div>
          </div>
        </div>

        {/* TODO: Add image upload functionality */}

        {error && (
          <p className="text-sm text-red-500">{error}</p>
        )}

        <Button
          type="submit"
          className="w-full"
          disabled={isLoading}
        >
          {isLoading ? "მანქანის დამატება..." : "მანქანის დამატება"}
        </Button>
      </form>
    </div>
  )
}
