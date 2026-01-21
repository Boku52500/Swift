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
import { FileText, Download, ArrowRight } from "lucide-react"
import Link from "next/link"

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

interface InvoiceListProps {
  invoices: Invoice[]
  onMarkAsPaid?: (id: string) => Promise<void>
  showMarkAsPaid?: boolean
}

export function InvoiceList({ 
  invoices,
  onMarkAsPaid,
  showMarkAsPaid = false
}: InvoiceListProps) {
  return (
    <div className="border border-neutral-700 rounded-lg">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>მანქანა</TableHead>
            <TableHead>დილერი</TableHead>
            <TableHead>თანხა</TableHead>
            <TableHead>თარიღი</TableHead>
            <TableHead>სტატუსი</TableHead>
            <TableHead className="text-right">მოქმედებები</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {invoices.map((invoice) => (
            <TableRow key={invoice.id}>
              <TableCell>{invoice.car.name}</TableCell>
              <TableCell>
                {invoice.car.dealer.dealerProfile?.companyName || invoice.car.dealer.email}
              </TableCell>
              <TableCell>${invoice.amount}</TableCell>
              <TableCell>{new Date(invoice.createdAt).toLocaleDateString()}</TableCell>
              <TableCell>
                {invoice.isPaid ? "გადახდილი" : "გადაუხდელი"}
              </TableCell>
              <TableCell className="text-right space-x-2">
                <Button
                  variant="ghost"
                  size="icon"
                  asChild
                >
                  <Link href={invoice.fileUrl} target="_blank">
                    <Download className="h-4 w-4" />
                  </Link>
                </Button>
                {showMarkAsPaid && !invoice.isPaid && onMarkAsPaid && (
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-green-500 hover:text-green-600"
                    onClick={() => onMarkAsPaid(invoice.id)}
                  >
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                )}
              </TableCell>
            </TableRow>
          ))}
          {invoices.length === 0 && (
            <TableRow>
              <TableCell colSpan={6} className="text-center py-4 text-neutral-500">
                ინვოისები არ მოიძებნა
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  )
}
