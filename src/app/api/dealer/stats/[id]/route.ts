import { NextResponse, type NextRequest } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user?.id) {
      return new NextResponse("Unauthorized", { status: 401 })
    }

    const { id } = await params

    // Only allow dealers to access their own stats
    if (session.user.role !== "DEALER" || session.user.id !== id) {
      return new NextResponse("Unauthorized", { status: 401 })
    }

    // For now, return default stats
    return NextResponse.json({
      totalCars: 0,
      arrivedCars: 0,
      notInWarehouse: 0,
      reservedContainer: 0,
      loadedInContainer: 0,
      unloadedCars: 0,
      totalInvoices: 0,
      paidInvoices: 0,
      unpaidInvoices: 0,
      invoiceBalance: 0
    })
  } catch (error) {
    console.error("[DEALER_STATS_GET]", error)
    return new NextResponse("Internal error", { status: 500 })
  }
}
