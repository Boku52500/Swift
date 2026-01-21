import { Prisma, CarStatus } from "@prisma/client"

export type CarData = {
  id: string
  name: string
  vin: string | null
  lotNumber: string | null
  images: string[]
  purchasePrice: number
  transportPrice: number
  buyer: string | null
  receiver: string | null
  status: CarStatus
  dealerId: string
  dealer: {
    email: string
    dealerProfile: {
      companyName: string | null
    } | null
  }
  transportInfo: {
    id: string
    pickupDate: Date | null
    warehouseArrivalDate: Date | null
    loadingDate: Date | null
    dispatchDate: Date | null
    arrivalDate: Date | null
    reservationNumber: string | null
    containerNumber: string | null
    shiplineName: string | null
    trackingUrl: string | null
  } | null
  invoices: {
    id: string
    amount: number
    isPaid: boolean
    fileUrl: string
  }[]
}
