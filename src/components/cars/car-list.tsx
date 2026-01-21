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
import { Edit, Trash, ArrowRight } from "lucide-react"
import Link from "next/link"

import type { CarData } from "@/types/car"
import { CarStatus } from "@prisma/client"

interface CarListProps {
  cars: CarData[]
  onDelete?: (id: string) => Promise<void>
  onMove?: (id: string, newStatus: CarStatus) => Promise<void>
  showMoveAction?: boolean
  targetStatus?: CarStatus
  showActions?: boolean
  showDealer?: boolean
  editLinkBase?: string
}

export function CarList({ 
  cars, 
  onDelete, 
  onMove,
  showMoveAction = false,
  targetStatus,
  showActions = true,
  showDealer = true,
  editLinkBase = "/swift-admin/cars",
}: CarListProps) {
  const colCount = 7 /* base columns without dealer/actions: photo, name, vin, price, buyer, receiver, status */
    + (showDealer ? 1 : 0)
    + (showActions ? 1 : 0)
  return (
    <div className="border border-neutral-700 rounded-lg">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ფოტო</TableHead>
            <TableHead>მანქანა</TableHead>
            <TableHead>VIN</TableHead>
            <TableHead>ტრანსპორტირების ფასი</TableHead>
            <TableHead>მყიდველი</TableHead>
            <TableHead>მიმღები</TableHead>
            <TableHead>სტატუსი</TableHead>
            {showDealer && <TableHead>დილერი</TableHead>}
            {showActions && <TableHead className="text-right">მოქმედებები</TableHead>}
          </TableRow>
        </TableHeader>
        <TableBody>
          {cars.map((car) => (
            <TableRow key={car.id}>
              <TableCell>
                {car.images && car.images.length > 0 ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={car.images[0]}
                    alt={car.name}
                    className="h-14 w-20 object-cover rounded border border-neutral-700"
                  />
                ) : (
                  <div className="h-14 w-20 rounded bg-neutral-800 border border-neutral-700 flex items-center justify-center text-xs text-neutral-500">
                    No image
                  </div>
                )}
              </TableCell>
              <TableCell>{car.name}</TableCell>
              <TableCell>{car.vin || "-"}</TableCell>
              <TableCell>${car.transportPrice.toFixed(2)}</TableCell>
              <TableCell>{car.buyer || "-"}</TableCell>
              <TableCell>{car.receiver || "-"}</TableCell>
              <TableCell>
                {(() => {
                  switch (car.status) {
                    case "PENDING":
                      return "მოლოდინში"
                    case "AT_AUCTION":
                      return "აუქციონზე"
                    case "IN_TRANSIT":
                      return "გზაში"
                    case "AT_PORT":
                      return "პორტში"
                    case "SHIPPED":
                      return "გაგზავნილი"
                    case "ARRIVED":
                      return "ჩამოსული"
                    case "DELIVERED":
                      return "მიწოდებული"
                    default:
                      return car.status
                  }
                })()}
              </TableCell>
              {showDealer && (
                <TableCell>
                  {car.dealer.dealerProfile?.companyName || car.dealer.email}
                </TableCell>
              )}
              {showActions && (
                <TableCell className="text-right space-x-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    asChild
                  >
                    <Link href={`${editLinkBase}/${car.id}`}>
                      <Edit className="h-4 w-4" />
                    </Link>
                  </Button>
                  {onDelete && (
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-red-500 hover:text-red-600"
                      onClick={() => onDelete(car.id)}
                    >
                      <Trash className="h-4 w-4" />
                    </Button>
                  )}
                  {showMoveAction && onMove && targetStatus && (
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-blue-500 hover:text-blue-600"
                      onClick={() => onMove(car.id, targetStatus)}
                    >
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  )}
                </TableCell>
              )}
            </TableRow>
          ))}
          {cars.length === 0 && (
            <TableRow>
              <TableCell colSpan={colCount} className="text-center py-4 text-neutral-500">
                მანქანები არ მოიძებნა
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  )
}
