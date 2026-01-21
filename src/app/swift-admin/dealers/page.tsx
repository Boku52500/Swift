"use client"

import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Edit, Trash } from "lucide-react"
import Link from "next/link"
import { useState, useEffect } from "react"

interface Dealer {
  id: string
  email: string
  dealerProfile: {
    companyName: string | null
    phone: string | null
    address: string | null
  } | null
}

export default function DealersPage() {
  const [dealers, setDealers] = useState<Dealer[]>([])
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(true)

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
      } finally {
        setIsLoading(false)
      }
    }

    fetchDealers()
  }, [])

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this dealer? This will also delete all their cars and data.")) return

    try {
      // Import the server action dynamically to avoid issues with "use server"
      const { deleteDealer } = await import("@/app/actions/delete-dealer")
      const result = await deleteDealer(id)

      if (!result.success) {
        throw new Error(result.message)
      }

      // Remove the dealer from the list
      setDealers(dealers.filter(dealer => dealer.id !== id))
      
      // Clear any existing errors
      setError("") 
    } catch (error) {
      console.error("Delete error:", error)
      setError(error instanceof Error ? error.message : "Failed to delete dealer")
    }
  }

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (error) {
    return <div className="text-red-500">{error}</div>
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">დილერები</h1>
        <Button asChild>
          <Link href="/swift-admin/dealers/new">
            დილერის დამატება
          </Link>
        </Button>
      </div>

      <div className="border border-neutral-700 rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Email</TableHead>
              <TableHead>კომპანია</TableHead>
              <TableHead>ტელეფონი</TableHead>
              <TableHead>მისამართი</TableHead>
              <TableHead className="text-right">მოქმედებები</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {dealers.map((dealer) => (
              <TableRow key={dealer.id}>
                <TableCell>{dealer.email}</TableCell>
                <TableCell>{dealer.dealerProfile?.companyName || "-"}</TableCell>
                <TableCell>{dealer.dealerProfile?.phone || "-"}</TableCell>
                <TableCell>{dealer.dealerProfile?.address || "-"}</TableCell>
                <TableCell className="text-right space-x-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    asChild
                  >
                    <Link href={`/swift-admin/dealers/${dealer.id}`}>
                      <Edit className="h-4 w-4" />
                    </Link>
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-red-500 hover:text-red-600"
                    onClick={() => handleDelete(dealer.id)}
                  >
                    <Trash className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
