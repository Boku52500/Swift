"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useState } from "react"

export default function AdminLoginPage() {
  const router = useRouter()
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError("")
    setIsLoading(true)

    const formData = new FormData(e.currentTarget)
    const email = formData.get("email") as string
    const password = formData.get("password") as string

    try {
      // First verify admin credentials
      const adminCheck = await fetch("/api/auth/admin-login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
      })

      if (!adminCheck.ok) {
        setError("Invalid credentials")
        return
      }

      // If admin check passes, proceed with sign in
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
        callbackUrl: "/swift-admin"
      })

      if (result?.error) {
        setError("Authentication failed")
        return
      }

      router.push("/swift-admin")
      router.refresh()
    } catch (error) {
      setError("An error occurred")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-neutral-900">
      <div className="w-full max-w-md p-8 bg-neutral-800 rounded-xl shadow-xl">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-white mb-2">Admin Access</h1>
          <p className="text-neutral-400">Secure administrative login</p>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="email" className="text-neutral-200">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              required
              className="bg-neutral-700 border-neutral-600 text-white placeholder:text-neutral-500"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password" className="text-neutral-200">Password</Label>
            <Input
              id="password"
              name="password"
              type="password"
              required
              className="bg-neutral-700 border-neutral-600 text-white placeholder:text-neutral-500"
            />
          </div>
          {error && (
            <p className="text-sm text-red-400 text-center">{error}</p>
          )}
          <Button
            type="submit"
            className="w-full bg-red-600 hover:bg-red-700 text-white"
            disabled={isLoading}
          >
            {isLoading ? "Authenticating..." : "Login"}
          </Button>
        </form>
      </div>
    </div>
  )
}
