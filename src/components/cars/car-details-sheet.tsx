"use client"

import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import type { CarData } from "@/types/car"

function formatCurrency(n?: number) {
  if (typeof n !== "number" || Number.isNaN(n)) return "-"
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 2 }).format(n)
}

export function CarDetailsSheet({ car }: { car: CarData }) {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" className="h-8 px-3">ნახვა</Button>
      </SheetTrigger>
      <SheetContent side="right" className="sm:max-w-xl overflow-y-auto">
        <SheetHeader>
          <SheetTitle>{car.name}</SheetTitle>
        </SheetHeader>

        <div className="space-y-6 mt-4">
          {/* ფოტოები */}
          <div className="space-y-2">
            <h3 className="font-medium">ფოტოები</h3>
            {car.images?.length ? (
              <div className="grid grid-cols-2 gap-2">
                {car.images.map((src, i) => (
                  <a key={i} href={src} target="_blank" rel="noreferrer" className="block">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={src} alt={`${car.name}-${i}`} className="w-full aspect-video object-cover rounded border border-neutral-800 hover:opacity-90 transition cursor-zoom-in" />
                  </a>
                ))}
              </div>
            ) : (
              <p className="text-sm text-neutral-500">ფოტოები არ არის</p>
            )}
          </div>

          {/* მანქანის ღირებულება */}
          <div>
            <h3 className="font-medium">მანქანის ღირებულება</h3>
            <p className="text-sm text-neutral-300">{formatCurrency(car.purchasePrice)}</p>
          </div>

          {/* ტრანსპორტირების ფასი */}
          <div>
            <h3 className="font-medium">ტრანსპორტირების ფასი</h3>
            <p className="text-sm text-neutral-300">{formatCurrency(car.transportPrice)}</p>
          </div>

          {/* მყიდველი / მიმღები */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h3 className="font-medium">მყიდველი</h3>
              <p className="text-sm text-neutral-300">{car.buyer || "-"}</p>
            </div>
            <div>
              <h3 className="font-medium">მიმღები</h3>
              <p className="text-sm text-neutral-300">{car.receiver || "-"}</p>
            </div>
          </div>

          {/* ინვოისები */}
          <div className="space-y-2">
            <h3 className="font-medium">ინვოისები</h3>
            {car.invoices?.length ? (
              <div className="space-y-2">
                {car.invoices.map((inv) => (
                  <div key={inv.id} className="flex items-center justify-between rounded border border-neutral-800 p-2">
                    <div className="space-y-0.5">
                      <p className="text-sm">რაოდენობა: {formatCurrency(inv.amount)}</p>
                      <p className="text-xs text-neutral-500">სტატუსი: {inv.isPaid ? "გადახდილი" : "გადაუხდელი"}</p>
                    </div>
                    <a href={inv.fileUrl} target="_blank" rel="noreferrer" className="text-sm text-blue-400 hover:underline">გახსნა</a>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-neutral-500">ინვოისები არ არის</p>
            )}
          </div>

          {/* ტრანსპორტირება */}
          <div className="space-y-2">
            <h3 className="font-medium">ტრანსპორტირება</h3>
            {car.transportInfo ? (
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div><span className="text-neutral-500">Pickup:</span> {car.transportInfo.pickupDate ? new Date(car.transportInfo.pickupDate).toLocaleDateString() : "-"}</div>
                <div><span className="text-neutral-500">Warehouse:</span> {car.transportInfo.warehouseArrivalDate ? new Date(car.transportInfo.warehouseArrivalDate).toLocaleDateString() : "-"}</div>
                <div><span className="text-neutral-500">Loading:</span> {car.transportInfo.loadingDate ? new Date(car.transportInfo.loadingDate).toLocaleDateString() : "-"}</div>
                <div><span className="text-neutral-500">Dispatch:</span> {car.transportInfo.dispatchDate ? new Date(car.transportInfo.dispatchDate).toLocaleDateString() : "-"}</div>
                <div><span className="text-neutral-500">Arrival:</span> {car.transportInfo.arrivalDate ? new Date(car.transportInfo.arrivalDate).toLocaleDateString() : "-"}</div>
                <div><span className="text-neutral-500">Reservation #:</span> {car.transportInfo.reservationNumber || "-"}</div>
                <div><span className="text-neutral-500">Container #:</span> {car.transportInfo.containerNumber || "-"}</div>
                <div><span className="text-neutral-500">Shipline:</span> {car.transportInfo.shiplineName || "-"}</div>
                <div className="col-span-2"><span className="text-neutral-500">Tracking:</span> {car.transportInfo.trackingUrl ? (<a className="text-blue-400 hover:underline" target="_blank" rel="noreferrer" href={car.transportInfo.trackingUrl}>Open</a>) : "-"}</div>
              </div>
            ) : (
              <p className="text-sm text-neutral-500">ტრანსპორტირების ინფორმაცია არ არის</p>
            )}
          </div>

          {/* სტატუსი */}
          <div>
            <h3 className="font-medium">სტატუსი</h3>
            <p className="text-sm text-neutral-300">{car.status}</p>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}
