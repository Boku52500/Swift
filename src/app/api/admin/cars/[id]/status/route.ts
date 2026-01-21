import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { CarStatus } from "@prisma/client"

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
    const { status } = await req.json()
    if (!status || !Object.values(CarStatus).includes(status)) {
      return NextResponse.json({ success: false, message: "Invalid status" }, { status: 400 })
    }

    const car = await prisma.car.update({
      where: { id },
      data: { status }
    })

    return NextResponse.json({ success: true, data: car })
  } catch (error) {
    console.error("[CAR_STATUS_PATCH]", error)
    return NextResponse.json({ success: false, message: "Failed to update status", details: error instanceof Error ? error.message : "Unknown error" }, { status: 500 })
  }
}
