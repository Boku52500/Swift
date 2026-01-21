"use client"

import { useEffect, useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

interface CarOption {
  id: string
  name: string
}

export default function NewInvoicePage() {
  const [cars, setCars] = useState<CarOption[]>([])
  const [carId, setCarId] = useState("")
  const [amount, setAmount] = useState("")
  const [isPaid, setIsPaid] = useState(false)
  const [file, setFile] = useState<File | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const res = await fetch("/api/admin/cars")
        if (!res.ok) throw new Error("Failed to fetch cars")
        const data = await res.json()
        if (!data.success) throw new Error(data.message || "Failed to fetch cars")
        const options: CarOption[] = (data.data || []).map((c: any) => ({
          id: c.id,
          name: [c.make, c.model, c.year].filter(Boolean).join(" "),
        }))
        setCars(options)
      } catch (e) {
        setError(e instanceof Error ? e.message : "Failed to load cars")
      }
    }
    fetchCars()
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setSuccess("")
    if (!carId) { setError("აირჩიეთ მანქანა"); return }
    const amt = Number(amount)
    if (!Number.isFinite(amt) || amt <= 0) { setError("შეიყვანეთ თანხა"); return }
    if (!file) { setError("ატვირთეთ ფაილი"); return }
    setLoading(true)
    try {
      const fd = new FormData()
      fd.append("file", file)
      const up = await fetch("/api/upload", { method: "POST", body: fd })
      const upData = await up.json().catch(() => ({}))
      if (!up.ok || !upData?.success) {
        const msg = (upData && (upData.message || upData.error)) || `Failed to upload file (${up.status})`
        throw new Error(msg)
      }
      const fileUrl: string | undefined = Array.isArray(upData.urls) ? upData.urls[0] : upData.url
      if (!fileUrl) throw new Error("Upload failed: empty response")

      const resp = await fetch("/api/admin/invoices", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ carId, amount: amt, isPaid, fileUrl })
      })
      if (!resp.ok) {
        const d = await resp.json().catch(() => ({}))
        const msg = (d && (d.message || d.error)) || `Failed to create invoice (${resp.status})`
        throw new Error(msg)
      }
      setSuccess("ინვოისი დამატებულია")
      setCarId("")
      setAmount("")
      setIsPaid(false)
      setFile(null)
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to create invoice")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">ინვოისის დამატება</h1>

      {error && <p className="text-red-500 text-sm">{error}</p>}
      {success && <p className="text-green-500 text-sm">{success}</p>}

      <form onSubmit={handleSubmit} className="space-y-4 max-w-xl">
        <div className="space-y-2">
          <label className="text-sm">მანქანა</label>
          <select
            className="h-10 w-full rounded-md border border-neutral-800 bg-neutral-950 px-3 text-sm"
            value={carId}
            onChange={(e) => setCarId(e.target.value)}
          >
            <option value="">— აირჩიეთ —</option>
            {cars.map((c) => (
              <option key={c.id} value={c.id}>{c.name}</option>
            ))}
          </select>
        </div>

        <div className="space-y-2">
          <label className="text-sm">თანხა</label>
          <Input type="number" step="0.01" value={amount} onChange={(e) => setAmount(e.target.value)} />
        </div>

        <div className="flex items-center gap-2">
          <input id="isPaid" type="checkbox" checked={isPaid} onChange={(e) => setIsPaid(e.target.checked)} />
          <label htmlFor="isPaid" className="text-sm">გადახდილი</label>
        </div>

        <div className="space-y-2">
          <label className="text-sm">ფაილი</label>
          <input type="file" accept="application/pdf,image/*" onChange={(e) => setFile(e.target.files?.[0] ?? null)} />
        </div>

        <Button type="submit" disabled={loading}>{loading ? "იტვირთება..." : "დამატება"}</Button>
      </form>
    </div>
  )
}
