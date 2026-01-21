"use client"

import { InvoiceList } from "@/components/invoices/invoice-list"
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

export default function UnpaidInvoicesPage() {
  const [invoices, setInvoices] = useState<Invoice[]>([])
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchInvoices = async () => {
      try {
        const response = await fetch("/api/admin/invoices?isPaid=false")
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

      setInvoices(invoices.filter(invoice => invoice.id !== id))
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
      <h1 className="text-2xl font-bold">გადაუხდელი ინვოისები</h1>
      
      <InvoiceList 
        invoices={invoices}
        onMarkAsPaid={handleMarkAsPaid}
        showMarkAsPaid={true}
      />
    </div>
  )
}
