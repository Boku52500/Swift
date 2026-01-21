import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { prisma } from "@/lib/prisma"
import { authOptions } from "@/lib/auth"

export async function GET() {
  try {
    const session = await getServerSession(authOptions)

    if (!session || session.user.role !== "DEALER") {
      return new NextResponse("Unauthorized", { status: 401 })
    }

    // Get all cars for this dealer
    const cars = await prisma.car.findMany({
      where: {
        dealerId: session.user.id
      }
    })

    // Calculate statistics
    const stats = {
      activeCars: cars.length,
      inTransit: cars.filter(car => car.status === "IN_TRANSIT").length,
      pending: cars.filter(car => car.status === "PENDING").length,
      completed: cars.filter(car => car.status === "DELIVERED").length,
      inContainer: cars.filter(car => car.status === "AT_PORT").length,
      unloadingProgress: 0, // This would need additional logic
      allActive: cars.filter(car => car.status !== "DELIVERED").length,
      totalPaid: 0, // This would need to be calculated from payments
      totalDue: 0, // This would need to be calculated from invoices
      invoiceBalance: 0, // This would need to be calculated from invoices
    }

    return NextResponse.json(stats)
  } catch (error) {
    console.error("[DEALER_DASHBOARD]", error)
    return new NextResponse("Internal error", { status: 500 })
  }
}
