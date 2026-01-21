"use server"

import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { CarStatus } from "@prisma/client"

export async function getDealerStats() {
  try {
    const session = await getServerSession(authOptions)
    if (!session || session.user.role !== "DEALER") {
      return { success: false, message: "Unauthorized" }
    }

    const dealerId = session.user.id

    const [total, pending, atAuction, inTransit, atPort, shipped, arrived, delivered] = await Promise.all([
      prisma.car.count({ where: { dealerId } }),
      prisma.car.count({ where: { dealerId, status: CarStatus.PENDING } }),
      prisma.car.count({ where: { dealerId, status: CarStatus.AT_AUCTION } }),
      prisma.car.count({ where: { dealerId, status: CarStatus.IN_TRANSIT } }),
      prisma.car.count({ where: { dealerId, status: CarStatus.AT_PORT } }),
      prisma.car.count({ where: { dealerId, status: CarStatus.SHIPPED } }),
      prisma.car.count({ where: { dealerId, status: CarStatus.ARRIVED } }),
      prisma.car.count({ where: { dealerId, status: CarStatus.DELIVERED } }),
    ])

    return {
      success: true,
      data: {
        total,
        byStatus: {
          PENDING: pending,
          AT_AUCTION: atAuction,
          IN_TRANSIT: inTransit,
          AT_PORT: atPort,
          SHIPPED: shipped,
          ARRIVED: arrived,
          DELIVERED: delivered,
        },
      },
    }
  } catch (error) {
    console.error("[GET_DEALER_STATS]", error)
    return { success: false, message: "Failed to load dealer stats" }
  }
}
