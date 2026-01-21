"use client"

import { InvoiceList } from "@/components/invoices/invoice-list"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import Link from "next/link"
import { useState, useEffect } from "react"

interface Invoice {
  id: string
  fileUrl: string
  amount: number
  isPaid: boolean
  createdAt: string
  car: {
    name: string
    dealer: {
      email: string
      dealerProfile: {
        companyName: string | null
      } | null
    }
  }
}

export default function InvoicesPage() {
  const [invoices, setInvoices] = useState<Invoice[]>([])
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchInvoices = async () => {
      try {
        const response = await fetch("/api/admin/invoices")
        if (!response.ok) throw new Error("Failed to fetch invoices")
        const data = await response.json()
        setInvoices(data)
      } catch (error) {
        setError("Failed to fetch invoices")
      } finally {
        setIsLoading(false)
      }
    }

    fetchInvoices()
  }, [])

  const handleMarkAsPaid = async (id: string) => {
    try {
      const response = await fetch(`/api/admin/invoices/${id}/pay`, {
        method: "PATCH",
      })

      if (!response.ok) throw new Error("Failed to mark invoice as paid")

      setInvoices(invoices.map(invoice => 
        invoice.id === id ? { ...invoice, isPaid: true } : invoice
      ))
    } catch (error) {
      setError("Failed to mark invoice as paid")
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
        <h1 className="text-2xl font-bold">ყველა ინვოისი</h1>
        <Button asChild>
          <Link href="/swift-admin/invoices/new">
            <Plus className="w-4 h-4 mr-2" />
            ინვოისის დამატება
          </Link>
        </Button>
      </div>
      
      <InvoiceList 
        invoices={invoices}
        onMarkAsPaid={handleMarkAsPaid}
        showMarkAsPaid={true}
      />
    </div>
  )
}
