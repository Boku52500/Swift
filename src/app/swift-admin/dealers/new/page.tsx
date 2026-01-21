"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useState } from "react"
import { useRouter } from "next/navigation"

export default function NewDealerPage() {
  const router = useRouter()
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError("")
    setIsLoading(true)

    const formData = new FormData(e.currentTarget)
    const data = {
      name: formData.get("email") as string, // Use email as name for now
      email: formData.get("email") as string,
      password: formData.get("password") as string,
      companyName: formData.get("companyName") as string || undefined,
      phone: formData.get("phone") as string || undefined,
      address: formData.get("address") as string || undefined,
    }

    try {
      const response = await fetch("/api/admin/dealers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })

      if (!response.ok) {
        const data = await response.json().catch(() => null)
        throw new Error(data?.message || "Failed to create dealer")
      }

      router.push("/swift-admin/dealers")
      router.refresh()
    } catch (error) {
      setError(error instanceof Error ? error.message : "Failed to create dealer")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold">დილერის დამატება</h1>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            name="email"
            type="email"
            required
            className="bg-neutral-800 border-neutral-700"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            name="password"
            type="password"
            required
            className="bg-neutral-800 border-neutral-700"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="companyName">კომპანიის სახელი</Label>
          <Input
            id="companyName"
            name="companyName"
            className="bg-neutral-800 border-neutral-700"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="phone">ტელეფონი</Label>
          <Input
            id="phone"
            name="phone"
            type="tel"
            className="bg-neutral-800 border-neutral-700"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="address">მისამართი</Label>
          <Input
            id="address"
            name="address"
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
          {isLoading ? "დილერის დამატება..." : "დილერის დამატება"}
        </Button>
      </form>
    </div>
  )
}
