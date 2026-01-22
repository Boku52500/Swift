"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { signIn } from "next-auth/react"
import { useRouter, useSearchParams } from "next/navigation"
import { useState, Suspense } from "react"

function ErrorBanner() {
  const searchParams = useSearchParams()
  const error = searchParams.get("error")
  if (!error) return null
  return (
    <p className="mt-4 text-sm text-red-600">არასწორი მონაცემები</p>
  )
}

export default function DealerLoginPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [formError, setFormError] = useState<string | null>(null)
  const router = useRouter()

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setIsLoading(true)
    setFormError(null)

    try {
      const formData = new FormData(e.currentTarget)
      const res = await signIn("credentials", {
        email: formData.get("email"),
        password: formData.get("password"),
        callbackUrl: "/dealer",
        redirect: false,
      })

      if (res?.ok && res.url) {
        // Cookies are set before this resolves; safe to client-navigate
        router.replace(res.url)
        return
      }
      if (!res?.ok) {
        setFormError("არასწორი მონაცემები")
      }
    } catch (error) {
      console.error("Login error:", error)
      setFormError("დროებითი შეცდომა, სცადეთ ისევ")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-neutral-50">
      <div className="w-full max-w-md p-8 bg-white rounded-xl shadow-lg">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold mb-2">დილერის გვერდი</h1>
          <p className="text-neutral-600">გთხოვთ შეიყვანოთ თქვენი მონაცემები</p>
          <Suspense fallback={null}>
            <ErrorBanner />
          </Suspense>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="email">ელ. ფოსტა</Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="თქვენი ელ. ფოსტა"
              required
              disabled={isLoading}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">პაროლი</Label>
            <Input
              id="password"
              name="password"
              type="password"
              placeholder="თქვენი პაროლი"
              required
              disabled={isLoading}
            />
          </div>

          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? "შესვლა..." : "შესვლა"}
          </Button>
          {formError && (
            <p className="mt-2 text-sm text-red-600">{formError}</p>
          )}
        </form>
      </div>
    </div>
  )
}
