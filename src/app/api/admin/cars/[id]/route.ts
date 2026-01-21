import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { sameOriginAllowed, redactError } from "@/lib/security"
import { siteConfig } from "@/lib/metadata"

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions)
    if (!session || session.user.role !== "ADMIN") {
      return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 })
    }

    const { id } = await params

    const car = await prisma.car.findUnique({
      where: { id },
      include: {
        dealer: { select: { email: true, dealerProfile: true } },
        transportInfo: true,
        invoices: { select: { id: true, amount: true, isPaid: true, fileUrl: true } }
      }
    } as any)

    if (!car) {
      return NextResponse.json({ success: false, message: "Car not found" }, { status: 404 })
    }

    return NextResponse.json({ success: true, data: car })
  } catch (error) {
    console.error("[CAR_GET]", error)
    return NextResponse.json({ success: false, message: "Failed to fetch car", details: redactError(error) }, { status: 500 })
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions)
    if (!session || session.user.role !== "ADMIN") {
      return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 })
    }

    if (!sameOriginAllowed(req, siteConfig.url)) {
      return NextResponse.json({ success: false, message: "Forbidden" }, { status: 403 })
    }

    const { id } = await params
    const body = await req.json()
    const {
      vin,
      make,
      model,
      year,
      lotNumber,
      auction,
      purchasePrice,
      transportPrice,
      dealerId,
      buyer,
      receiver,
      location,
      notes,
      images,
      transportInfo,
      status: inputStatus,
      invoices: invoiceItems = [],
    } = body

    // Basic validation
    if (vin && typeof vin !== "string") return NextResponse.json({ success: false, message: "Invalid vin" }, { status: 400 })
    if (make && typeof make !== "string") return NextResponse.json({ success: false, message: "Invalid make" }, { status: 400 })
    if (model && typeof model !== "string") return NextResponse.json({ success: false, message: "Invalid model" }, { status: 400 })
    if (year && (!Number.isInteger(year) || year < 1900 || year > 2100)) return NextResponse.json({ success: false, message: "Invalid year" }, { status: 400 })
    if (purchasePrice && typeof purchasePrice !== "number") return NextResponse.json({ success: false, message: "Invalid purchasePrice" }, { status: 400 })
    if (transportPrice && typeof transportPrice !== "number") return NextResponse.json({ success: false, message: "Invalid transportPrice" }, { status: 400 })

    const allowedStatuses = new Set(["PENDING","AT_AUCTION","IN_TRANSIT","AT_PORT","SHIPPED","ARRIVED","DELIVERED"])
    const nextStatus = (typeof inputStatus === "string" && allowedStatuses.has(inputStatus)) ? inputStatus : undefined

    await prisma.car.update({
      where: { id },
      data: ({
        vin,
        make,
        model,
        year,
        lotNumber,
        auction,
        purchasePrice,
        transportPrice,
        dealerId,
        buyer,
        receiver,
        location,
        notes,
        ...(Array.isArray(images) ? { images } : {}),
        ...(nextStatus ? { status: nextStatus } : {}),
      }) as any,
    })

    // Upsert transport info if provided
    if (transportInfo && typeof transportInfo === "object") {
      await (prisma as any).transportInfo.upsert({
        where: { carId: id },
        update: {
          pickupDate: transportInfo.pickupDate ? new Date(transportInfo.pickupDate) : null,
          warehouseArrivalDate: transportInfo.warehouseArrivalDate ? new Date(transportInfo.warehouseArrivalDate) : null,
          loadingDate: transportInfo.loadingDate ? new Date(transportInfo.loadingDate) : null,
          dispatchDate: transportInfo.dispatchDate ? new Date(transportInfo.dispatchDate) : null,
          arrivalDate: transportInfo.arrivalDate ? new Date(transportInfo.arrivalDate) : null,
          reservationNumber: transportInfo.reservationNumber ?? null,
          containerNumber: transportInfo.containerNumber ?? null,
          shiplineName: transportInfo.shiplineName ?? null,
          trackingUrl: transportInfo.trackingUrl ?? null,
        },
        create: {
          car: { connect: { id } },
          pickupDate: transportInfo.pickupDate ? new Date(transportInfo.pickupDate) : null,
          warehouseArrivalDate: transportInfo.warehouseArrivalDate ? new Date(transportInfo.warehouseArrivalDate) : null,
          loadingDate: transportInfo.loadingDate ? new Date(transportInfo.loadingDate) : null,
          dispatchDate: transportInfo.dispatchDate ? new Date(transportInfo.dispatchDate) : null,
          arrivalDate: transportInfo.arrivalDate ? new Date(transportInfo.arrivalDate) : null,
          reservationNumber: transportInfo.reservationNumber ?? null,
          containerNumber: transportInfo.containerNumber ?? null,
          shiplineName: transportInfo.shiplineName ?? null,
          trackingUrl: transportInfo.trackingUrl ?? null,
        }
      })
    }

    // Append invoices if provided
    if (Array.isArray(invoiceItems) && invoiceItems.length > 0) {
      const toCreate = invoiceItems
        .filter((i: any) => i && typeof i.amount === "number" && i.fileUrl)
        .map((i: any) => ({ carId: id, amount: i.amount, isPaid: !!i.isPaid, fileUrl: i.fileUrl }))
      if (toCreate.length > 0) {
        await (prisma as any).invoice.createMany({ data: toCreate })
      }
    }

    const car = await prisma.car.findUnique({
      where: { id },
      include: {
        dealer: { select: { email: true, dealerProfile: true } },
        transportInfo: true,
        invoices: { select: { id: true, amount: true, isPaid: true, fileUrl: true } },
      }
    } as any)

    return NextResponse.json({ success: true, data: car })
  } catch (error) {
    console.error("[CAR_PATCH]", error)
    return NextResponse.json({ success: false, message: "Failed to update car", details: redactError(error) }, { status: 500 })
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions)
    if (!session || session.user.role !== "ADMIN") {
      return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 })
    }

    if (!sameOriginAllowed(req, siteConfig.url)) {
      return NextResponse.json({ success: false, message: "Forbidden" }, { status: 403 })
    }

    const { id } = await params

    await prisma.$transaction([
      prisma.invoice.deleteMany({ where: { carId: id } }),
      prisma.transportInfo.deleteMany({ where: { carId: id } }),
      prisma.car.delete({ where: { id } }),
    ])

    return NextResponse.json({ success: true, message: "Car deleted" })
  } catch (error) {
    console.error("[CAR_DELETE]", error)
    return NextResponse.json({ success: false, message: "Failed to delete car", details: redactError(error) }, { status: 500 })
  }
}
