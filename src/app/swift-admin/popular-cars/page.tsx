"use client"

import { useEffect, useState } from "react"
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

type PopularCategory = "UNDER_5000" | "UNDER_10000" | "UNDER_15000" | "UNDER_20000"

const categoryOptions: { value: PopularCategory; label: string }[] = [
  { value: "UNDER_5000", label: "მანქანები 5000$-მდე" },
  { value: "UNDER_10000", label: "მანქანები 10000$-მდე" },
  { value: "UNDER_15000", label: "მანქანები 15000$-მდე" },
  { value: "UNDER_20000", label: "მანქანები 20000$-მდე" },
]

interface PopularCar {
  id: string
  name: string
  year: number
  price: number
  category: PopularCategory
  imageUrl?: string | null
}

export default function PopularCarsAdminPage() {
  const [items, setItems] = useState<PopularCar[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [status, setStatus] = useState("")
  const [submitting, setSubmitting] = useState(false)

  // form state
  const [name, setName] = useState("")
  const [year, setYear] = useState<number | "">("")
  const [price, setPrice] = useState<number | "">("")
  const [category, setCategory] = useState<PopularCategory>("UNDER_5000")
  const [imageFile, setImageFile] = useState<File | null>(null)

  const load = async () => {
    try {
      setLoading(true)
      const res = await fetch("/api/admin/popular-cars")
      if (!res.ok) throw new Error("Failed")
      const data = await res.json()
      if (!data.success) throw new Error(data.message || "Failed")
      setItems(data.data)
    } catch (e) {
      setError("ვერ ჩატვირთა სია")
    } finally {
      setLoading(false)
    }
  }

  // Upload helper for image files
  const uploadFile = async (file: File): Promise<string> => {
    const fd = new FormData()
    fd.append("files", file)
    const res = await fetch("/api/upload", { method: "POST", body: fd })
    const data = await res.json().catch(() => ({}))
    if (!res.ok || !data?.success) {
      const msg = (data && (data.message || data.error)) || `Upload failed (${res.status})`
      throw new Error(msg)
    }
    if (!Array.isArray(data.urls) || !data.urls[0]) throw new Error("Upload failed: empty response")
    return data.urls[0] as string
  }

  useEffect(() => { load() }, [])

  const onAdd = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setStatus("")
    setSubmitting(true)
    try {
      if (!imageFile) {
        throw new Error("სურათი აუცილებელია")
      }
      setStatus("სურათის ატვირთვა...")
      const uploadedUrl = await uploadFile(imageFile)
      setStatus("შენახვა...")
      const res = await fetch("/api/admin/popular-cars", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, year: Number(year), price: Number(price), category, ...(uploadedUrl ? { imageUrl: uploadedUrl } : {}) })
      })
      const data = await res.json().catch(() => ({}))
      if (!res.ok || !data?.success) {
        const msg = (data && (data.message || data.error)) || `Failed (${res.status})`
        throw new Error(msg)
      }
      setStatus("დაემატა ✅")
      setName("")
      setYear("")
      setPrice("")
      setCategory("UNDER_5000")
      setImageFile(null)
      await load()
    } catch (e) {
      setError(e instanceof Error ? e.message : "დამატება ვერ მოხერხდა")
    } finally {
      setSubmitting(false)
    }
  }

  const onDelete = async (id: string) => {
    if (!confirm("წაშლა?")) return
    setError("")
    try {
      const res = await fetch(`/api/admin/popular-cars/${id}`, { method: "DELETE" })
      const data = await res.json().catch(() => ({}))
      if (!res.ok || !data?.success) {
        const msg = (data && (data.message || data.error)) || `Failed (${res.status})`
        throw new Error(msg)
      }
      await load()
    } catch (e) {
      setError(e instanceof Error ? e.message : "წაშლა ვერ მოხერხდა")
    }
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">პოპულარული მანქანები</h1>

      <form onSubmit={onAdd} className="grid grid-cols-1 md:grid-cols-5 gap-3 p-4 border rounded-md">
        <Input placeholder="სახელი (მაგ: Toyota Camry)" value={name} onChange={(e) => setName(e.target.value)} required />
        <Input placeholder="წელი (მაგ: 2020)" value={year} onChange={(e) => setYear(e.target.value ? Number(e.target.value) : "")} required type="number" />
        <Input placeholder="ფასი (USD)" value={price} onChange={(e) => setPrice(e.target.value ? Number(e.target.value) : "")} required type="number" />
        <select className="border rounded px-3 py-2 text-sm" value={category} onChange={(e) => setCategory(e.target.value as PopularCategory)}>
          {categoryOptions.map((o) => (
            <option key={o.value} value={o.value}>{o.label}</option>
          ))}
        </select>
        <div className="flex gap-2">
          <input type="file" accept="image/*" onChange={(e) => setImageFile(e.target.files?.[0] || null)} className="block w-full text-sm" />
          <Button type="submit" disabled={submitting}>{submitting ? (status || "მუშავდება...") : "დამატება"}</Button>
        </div>
        {(error || status) && (
          <div className="md:col-span-5 text-sm">
            {error ? <div className="text-red-600">{error}</div> : null}
            {status && !error ? <div className="text-neutral-600">{status}</div> : null}
          </div>
        )}
      </form>

      {loading ? (
        <div>Loading...</div>
      ) : error ? (
        <div className="text-red-600">{error}</div>
      ) : (
        <div className="border rounded-md overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>სურათი</TableHead>
                <TableHead>სახელი</TableHead>
                <TableHead>წელი</TableHead>
                <TableHead>ფასი</TableHead>
                <TableHead>კატეგორია</TableHead>
                <TableHead className="text-right">მოქმედება</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {items.map((it) => (
                <TableRow key={it.id}>
                  <TableCell>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    {it.imageUrl ? (
                      <img src={it.imageUrl} alt={it.name} className="w-16 h-10 object-cover rounded" />
                    ) : (
                      <div className="w-16 h-10 bg-neutral-200 rounded" />
                    )}
                  </TableCell>
                  <TableCell>{it.name}</TableCell>
                  <TableCell>{it.year}</TableCell>
                  <TableCell>${it.price.toLocaleString()}</TableCell>
                  <TableCell>{categoryOptions.find(c => c.value === it.category)?.label || it.category}</TableCell>
                  <TableCell className="text-right">
                    <Button variant="destructive" onClick={() => onDelete(it.id)}>წაშლა</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  )
}
