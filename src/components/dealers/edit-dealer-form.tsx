"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useState } from "react"
import { useRouter } from "next/navigation"

interface DealerData {
  id: string
  email: string
  companyName: string | null
  phone: string | null
  address: string | null
  transportMarkup?: number | null
}

export function EditDealerForm({ initialData }: { initialData: DealerData }) {
  const router = useRouter()
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError("")
    setIsLoading(true)

    const formData = new FormData(e.currentTarget)
    const data = {
      email: formData.get("email") as string,
      password: formData.get("password") as string || undefined,
      companyName: formData.get("companyName") as string,
      phone: formData.get("phone") as string,
      address: formData.get("address") as string,
      transportMarkup: (() => {
        const v = formData.get("transportMarkup") as string
        const n = parseFloat(v)
        return isNaN(n) ? 0 : n
      })(),
    }

    try {
      const response = await fetch(`/api/admin/dealers/${initialData.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })

      if (!response.ok) {
        throw new Error("Failed to update dealer")
      }

      router.push("/swift-admin/dealers")
      router.refresh()
    } catch (error) {
      setError("Failed to update dealer")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold">დილერის რედაქტირება</h1>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            name="email"
            type="email"
            required
            defaultValue={initialData.email}
            className="bg-neutral-800 border-neutral-700"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="transportMarkup">ტრანსპორტირების დანამატი ($)</Label>
          <Input
            id="transportMarkup"
            name="transportMarkup"
            type="number"
            step="1"
            defaultValue={typeof initialData.transportMarkup === "number" ? String(initialData.transportMarkup) : "0"}
            className="bg-neutral-800 border-neutral-700"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="password">New Password (leave blank to keep current)</Label>
          <Input
            id="password"
            name="password"
            type="password"
            className="bg-neutral-800 border-neutral-700"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="companyName">კომპანიის სახელი</Label>
          <Input
            id="companyName"
            name="companyName"
            defaultValue={initialData.companyName || ""}
            className="bg-neutral-800 border-neutral-700"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="phone">ტელეფონი</Label>
          <Input
            id="phone"
            name="phone"
            type="tel"
            defaultValue={initialData.phone || ""}
            className="bg-neutral-800 border-neutral-700"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="address">მისამართი</Label>
          <Input
            id="address"
            name="address"
            defaultValue={initialData.address || ""}
            className="bg-neutral-800 border-neutral-700"
          />
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
