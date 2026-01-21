import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions)
    if (!session || session.user.role !== "ADMIN") {
      return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 })
    }

    const { id } = await params
    if (!id) {
      return NextResponse.json({ success: false, message: "Missing invoice id" }, { status: 400 })
    }

    const updated = await (prisma as any).invoice.update({
      where: { id },
      data: { isPaid: true },
      include: {
        car: {
          include: {
            dealer: {
              select: { email: true, dealerProfile: true },
            },
          },
        },
      },
    }) as any

    const response = {
      id: updated.id,
      fileUrl: updated.fileUrl,
      amount: typeof updated.amount === "object" && typeof updated.amount.toNumber === "function" ? updated.amount.toNumber() : Number(updated.amount),
      isPaid: updated.isPaid,
      createdAt: updated.createdAt,
      car: {
        name: [updated.car.make, updated.car.model, updated.car.year].filter(Boolean).join(" "),
        dealer: {
          email: updated.car.dealer.email,
          dealerProfile: updated.car.dealer.dealerProfile,
        },
      },
    }

    return NextResponse.json(response)
  } catch (error) {
    console.error("[INVOICE_PAY_PATCH]", error)
    return NextResponse.json({ success: false, message: "Failed to mark invoice as paid" }, { status: 500 })
  }
}
