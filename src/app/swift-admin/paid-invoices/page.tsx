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

export default function PaidInvoicesPage() {
  const [invoices, setInvoices] = useState<Invoice[]>([])
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchInvoices = async () => {
      try {
        const response = await fetch("/api/admin/invoices?isPaid=true")
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

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (error) {
    return <div className="text-red-500">{error}</div>
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">გადახდილი ინვოისები</h1>
      
      <InvoiceList invoices={invoices} />
    </div>
  )
}
