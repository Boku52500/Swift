import { NextResponse, type NextRequest } from "next/server"
import { getServerSession } from "next-auth"
import { prisma } from "@/lib/prisma"
import { authOptions } from "@/lib/auth"

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions)

    if (!session || session.user.role !== "ADMIN") {
      return new NextResponse("Unauthorized", { status: 401 })
    }

    const stats = await req.json()
    const { id } = await params

    // Update or create dealer stats
    const updatedStats = await prisma.dealerStats.upsert({
      where: {
        dealerId: id
      },
      update: {
        totalCars: stats.totalCars,
        arrivedCars: stats.arrivedCars,
        notInWarehouse: stats.notInWarehouse,
        reservedContainer: stats.reservedContainer,
        loadedInContainer: stats.loadedInContainer,
        unloadedCars: stats.unloadedCars,
        totalInvoices: stats.totalInvoices,
        paidInvoices: stats.paidInvoices,
        unpaidInvoices: stats.unpaidInvoices,
        invoiceBalance: stats.invoiceBalance,
      },
      create: {
        dealerId: id,
        totalCars: stats.totalCars,
        arrivedCars: stats.arrivedCars,
        notInWarehouse: stats.notInWarehouse,
        reservedContainer: stats.reservedContainer,
        loadedInContainer: stats.loadedInContainer,
        unloadedCars: stats.unloadedCars,
        totalInvoices: stats.totalInvoices,
        paidInvoices: stats.paidInvoices,
        unpaidInvoices: stats.unpaidInvoices,
        invoiceBalance: stats.invoiceBalance,
      },
    })

    return NextResponse.json(updatedStats)
  } catch (error) {
    console.error("[DEALER_STATS_UPDATE]", error)
    return new NextResponse("Internal error", { status: 500 })
  }
}
