"use server"

import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { CarStatus } from "@prisma/client"

function toNum(v: any): number | undefined {
  if (v == null) return undefined
  try {
    if (typeof v === "object" && typeof (v as any).toNumber === "function") {
      return (v as any).toNumber()
    }
    const n = Number(v)
    return Number.isFinite(n) ? n : undefined
  } catch {
    return undefined
  }
}

export async function getCars(
  status?: CarStatus,
  dealerId?: string,
  filters?: { name?: string; vin?: string; lotNumber?: string }
) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return {
        success: false,
        message: "Unauthorized"
      }
    }

    // Build where clause
    const where: any = {}
    
    // If dealer is viewing, only show their cars
    if (session.user.role === "DEALER") {
      where.dealerId = session.user.id
    }
    
    // Add status filter if provided
    if (status) {
      where.status = status
    }
    
    // Add dealer filter if admin is filtering by dealer
    if (session.user.role === "ADMIN" && dealerId) {
      where.dealerId = dealerId
    }

    if (filters?.vin) {
      where.vin = { contains: filters.vin, mode: "insensitive" }
    }
    if (filters?.lotNumber) {
      where.lotNumber = { contains: filters.lotNumber, mode: "insensitive" }
    }
    if (filters?.name) {
      const or: any[] = [
        { make: { contains: filters.name, mode: "insensitive" } },
        { model: { contains: filters.name, mode: "insensitive" } },
      ]
      const yr = Number(filters.name)
      if (Number.isFinite(yr)) {
        or.push({ year: yr })
      }
      where.OR = or
    }

    const cars = await prisma.car.findMany({
      where,
      include: {
        dealer: {
          include: {
            dealerProfile: true
          }
        },
        transportInfo: true,
        invoices: true
      },
      orderBy: {
        createdAt: "desc"
      }
    })

    // Add computed display name for UI compatibility
    const formattedCars = cars.map((c: any) => ({
      ...c,
      name: [c.make, c.model, c.year].filter(Boolean).join(" "),
      purchasePrice: toNum(c.purchasePrice),
      transportPrice: toNum(c.transportPrice),
      invoices: (c.invoices || []).map((inv: any) => ({
        ...inv,
        amount: toNum(inv.amount),
      })),
    }))

    return {
      success: true,
      data: formattedCars
    }
  } catch (error) {
    console.error("[GET_CARS]", error)
    return {
      success: false,
      message: "Failed to fetch cars",
      details: error instanceof Error ? error.message : "Unknown error"
    }
  }
}
