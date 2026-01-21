"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import Image from "next/image"

type PopularCategory = "UNDER_5000" | "UNDER_10000" | "UNDER_15000" | "UNDER_20000"

const categoryOptions: { value: PopularCategory; label: string }[] = [
  { value: "UNDER_5000", label: "მანქანები 5000$-მდე" },
  { value: "UNDER_10000", label: "მანქანები 10000$-მდე" },
  { value: "UNDER_15000", label: "მანქანები 15000$-მდე" },
  { value: "UNDER_20000", label: "მანქანები 20000$-მდე" },
]

export default function PopularCategoriesPage() {
  const [covers, setCovers] = useState<Record<PopularCategory, string | null>>({
    UNDER_5000: null,
    UNDER_10000: null,
    UNDER_15000: null,
    UNDER_20000: null,
  })
  const [coverFiles, setCoverFiles] = useState<Record<PopularCategory, File | null>>({
    UNDER_5000: null,
    UNDER_10000: null,
    UNDER_15000: null,
    UNDER_20000: null,
  })
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(true)

  const load = async () => {
    try {
      setLoading(true)
      const res = await fetch("/api/admin/popular-categories")
      if (!res.ok) throw new Error("Failed categories")
      const data = await res.json()
      if (!data.success) throw new Error(data.message || "Failed categories")
      const nextCovers: Record<PopularCategory, string | null> = {
        UNDER_5000: null,
        UNDER_10000: null,
        UNDER_15000: null,
        UNDER_20000: null,
      }
      for (const c of data.data as Array<{ category: PopularCategory; imageUrl: string | null }>) {
        nextCovers[c.category] = c.imageUrl ?? null
      }
      setCovers(nextCovers)
    } catch (e) {
      setError("ვერ ჩატვირთა კატეგორიები")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { load() }, [])

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

  const saveCover = async (cat: PopularCategory) => {
    try {
      setError("")
      let image = covers[cat]
      const file = coverFiles[cat]
      if (file) image = await uploadFile(file)
      const res = await fetch("/api/admin/popular-categories", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ category: cat, imageUrl: image })
      })
      const data = await res.json().catch(() => ({}))
      if (!res.ok || !data?.success) {
        const msg = (data && (data.message || data.error)) || `Save failed (${res.status})`
        throw new Error(msg)
      }
      setCovers(prev => ({ ...prev, [cat]: data.data.imageUrl ?? null }))
      setCoverFiles(prev => ({ ...prev, [cat]: null }))
    } catch (e) {
      setError(e instanceof Error ? e.message : "კატეგორიის სურათის შენახვა ვერ მოხერხდა")
    }
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">პოპულარული კატეგორიების სურათები</h1>
      {loading ? (
        <div>Loading...</div>
      ) : error ? (
        <div className="text-red-600">{error}</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {categoryOptions.map((opt) => (
            <div key={opt.value} className="border rounded-md overflow-hidden">
              <div className="relative h-40 bg-neutral-100">
                {covers[opt.value] ? (
                  <Image src={covers[opt.value] as string} alt={opt.label} fill className="object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-neutral-400 text-sm">სურათი არ არის</div>
                )}
              </div>
              <div className="p-3 space-y-2">
                <div className="text-sm font-medium">{opt.label}</div>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setCoverFiles(prev => ({ ...prev, [opt.value]: e.target.files?.[0] || null }))}
                  className="block w-full text-sm"
                />
                <div className="flex gap-2">
                  <Button type="button" variant="outline" onClick={() => saveCover(opt.value)}>შენახვა</Button>
                  <Button type="button" variant="ghost" onClick={() => { setCoverFiles(prev => ({ ...prev, [opt.value]: null })); setCovers(prev => ({ ...prev, [opt.value]: null })) }}>გასუფთავება</Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
