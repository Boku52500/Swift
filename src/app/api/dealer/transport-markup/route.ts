import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

export const dynamic = "force-dynamic"

export async function GET() {
  try {
    const session = await getServerSession(authOptions)
    const noStoreHeaders = { "Cache-Control": "no-store, must-revalidate", "Vary": "Cookie" }
    if (!session || session.user.role !== "DEALER") {
      return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401, headers: noStoreHeaders })
    }

    // Use broad fetch and loose typing to avoid TS issues before migration is applied
    const dealer: any = await prisma.dealer.findUnique({
      where: { userId: session.user.id },
    })

    const transportMarkup = typeof dealer?.transportMarkup === "number" ? dealer.transportMarkup : 0
    return NextResponse.json({ success: true, data: { transportMarkup } }, { headers: noStoreHeaders })
  } catch (error) {
    console.error("[DEALER_TRANSPORT_MARKUP_GET]", error)
    return NextResponse.json({ success: false, message: "Failed to load transport markup" }, { status: 500, headers: { "Cache-Control": "no-store, must-revalidate", "Vary": "Cookie" } })
  }
}
