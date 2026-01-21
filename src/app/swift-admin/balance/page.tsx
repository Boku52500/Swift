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
import { useState, useEffect } from "react"

interface DealerBalance {
  id: string
  email: string
  dealerProfile: {
    companyName: string | null
  } | null
  dealerStats: {
    totalInvoices: number
    paidInvoices: number
    unpaidInvoices: number
    invoiceBalance: number
  }
}

export default function BalancePage() {
  const [dealers, setDealers] = useState<DealerBalance[]>([])
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchDealers = async () => {
      try {
        const response = await fetch("/api/admin/dealers/balance")
        if (!response.ok) throw new Error("Failed to fetch dealers")
        const data = await response.json()
        setDealers(data)
      } catch (error) {
        setError("Failed to fetch dealers")
      } finally {
        setIsLoading(false)
      }
    }

    fetchDealers()
  }, [])

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (error) {
    return <div className="text-red-500">{error}</div>
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">დილერების ბალანსი</h1>
      
      <div className="border border-neutral-700 rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>დილერი</TableHead>
              <TableHead>სულ ინვოისები</TableHead>
              <TableHead>გადახდილი</TableHead>
              <TableHead>გადაუხდელი</TableHead>
              <TableHead className="text-right">ბალანსი</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {dealers.map((dealer) => (
              <TableRow key={dealer.id}>
                <TableCell>
                  {dealer.dealerProfile?.companyName || dealer.email}
                </TableCell>
                <TableCell>{dealer.dealerStats.totalInvoices}</TableCell>
                <TableCell>{dealer.dealerStats.paidInvoices}</TableCell>
                <TableCell>{dealer.dealerStats.unpaidInvoices}</TableCell>
                <TableCell className="text-right">
                  <span className={dealer.dealerStats.invoiceBalance < 0 ? "text-red-500" : "text-green-500"}>
                    ${Math.abs(dealer.dealerStats.invoiceBalance).toFixed(2)}
                  </span>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
