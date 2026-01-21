"use server"

import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache"

export async function deleteDealer(dealerId: string) {
  try {
    const session = await getServerSession(authOptions)
    if (!session || session.user.role !== "ADMIN") {
      return {
        success: false,
        message: "Unauthorized"
      }
    }

    // Find the user and check role
    const user = await prisma.user.findFirst({
      where: { 
        id: dealerId,
        role: "DEALER"
      },
      include: {
        dealerProfile: true
      }
    })

    if (!user || !user.dealerProfile) {
      return {
        success: false,
        message: "Dealer not found"
      }
    }

    // Delete everything in a transaction (dependent records first)
    await prisma.$transaction([
      // Delete invoices for all cars of this dealer
      prisma.invoice.deleteMany({
        where: { car: { dealerId } }
      }),
      // Delete transport info for all cars of this dealer
      prisma.transportInfo.deleteMany({
        where: { car: { dealerId } }
      }),
      // Delete cars
      prisma.car.deleteMany({
        where: { dealerId }
      }),
      // Delete dealer profile
      prisma.dealer.delete({
        where: { id: user.dealerProfile.id }
      }),
      // Finally delete user
      prisma.user.delete({
        where: { id: dealerId }
      })
    ])

    revalidatePath("/swift-admin/dealers")

    return {
      success: true,
      message: "Dealer deleted successfully"
    }
  } catch (error) {
    console.error("[DELETE_DEALER]", error)
    return {
      success: false,
      message: "Failed to delete dealer",
      details: error instanceof Error ? error.message : "Unknown error"
    }
  }
}
