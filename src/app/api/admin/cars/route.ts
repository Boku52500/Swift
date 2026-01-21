import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { sameOriginAllowed, redactError } from "@/lib/security"
import { siteConfig } from "@/lib/metadata"

export async function GET(req: Request) {
  try {
    const session = await getServerSession(authOptions)
    if (!session || session.user.role !== "ADMIN") {
      return NextResponse.json({ 
        success: false,
        message: "Unauthorized" 
      }, { status: 401 })
    }

    // Get query parameters
    const url = new URL(req.url)
    const status = url.searchParams.get("status")
    const transportStatus = url.searchParams.get("transportStatus")
    const dealerId = url.searchParams.get("dealerId")
    const vin = url.searchParams.get("vin")
    const lotNumber = url.searchParams.get("lotNumber")
    const name = url.searchParams.get("name")

    // Build where clause
    const where: any = {}
    if (status) {
      where.status = status
    }
    if (dealerId) {
      where.dealerId = dealerId
    }
    if (vin) {
      where.vin = { contains: vin, mode: "insensitive" }
    }
    if (lotNumber) {
      where.lotNumber = { contains: lotNumber, mode: "insensitive" }
    }
    if (name) {
      const or: any[] = [
        { make: { contains: name, mode: "insensitive" } },
        { model: { contains: name, mode: "insensitive" } },
      ]
      const yr = Number(name)
      if (Number.isFinite(yr)) {
        or.push({ year: yr })
      }
      where.OR = or
    }

    // Optional filter by transport status (related one-to-one)
    if (transportStatus) {
      where.transportInfo = { is: { status: transportStatus as any } }
    }

    const cars = await prisma.car.findMany({
      where,
      include: {
        dealer: {
          select: {
            email: true,
            dealerProfile: true
          }
        },
        transportInfo: true,
        invoices: {
          select: {
            id: true,
            amount: true,
            isPaid: true,
            fileUrl: true
          }
        }
      },
      orderBy: {
        createdAt: "desc"
      }
    })

    return NextResponse.json({
      success: true,
      data: cars
    })
  } catch (error) {
    console.error("[CARS_GET]", error)
    return NextResponse.json({ 
      success: false,
      message: "Failed to fetch cars",
      details: redactError(error)
    }, { status: 500 })
  }
}

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions)
    if (!session || session.user.role !== "ADMIN") {
      return NextResponse.json({ 
        success: false,
        message: "Unauthorized" 
      }, { status: 401 })
    }

    if (!sameOriginAllowed(req, siteConfig.url)) {
      return NextResponse.json({ success: false, message: "Forbidden" }, { status: 403 })
    }

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
      images = [],
      status: inputStatus,
      invoices: invoiceItems = [],
    } = body

    const yearNum = Number(year)
    const purchasePriceNum = Number(purchasePrice)
    const transportPriceNum = Number(transportPrice)

    if (
      !vin ||
      !make ||
      !model ||
      !dealerId ||
      !Number.isFinite(yearNum) ||
      !Number.isFinite(purchasePriceNum) ||
      !Number.isFinite(transportPriceNum)
    ) {
      return NextResponse.json({ 
        success: false,
        message: "Missing required fields" 
      }, { status: 400 })
    }

    // Create base car first
    const transportInfoInput = (body as any).transportInfo
    const allowedStatuses = new Set(["PENDING","AT_AUCTION","IN_TRANSIT","AT_PORT","SHIPPED","ARRIVED","DELIVERED"])
    const status = typeof inputStatus === "string" && allowedStatuses.has(inputStatus) ? inputStatus : "PENDING"
    const createdCar = await prisma.car.create({
      data: ({
        vin,
        make,
        model,
        year: yearNum,
        lotNumber,
        auction,
        purchasePrice: purchasePriceNum,
        transportPrice: transportPriceNum,
        dealer: { connect: { id: dealerId } },
        buyer,
        receiver,
        location,
        notes,
        images,
        status,
      }) as any,
    })

    // Optionally create initial transport info
    if (transportInfoInput && typeof transportInfoInput === "object") {
      await (prisma as any).transportInfo.create({
        data: {
          carId: createdCar.id,
          pickupDate: transportInfoInput.pickupDate ? new Date(transportInfoInput.pickupDate) : null,
          warehouseArrivalDate: transportInfoInput.warehouseArrivalDate ? new Date(transportInfoInput.warehouseArrivalDate) : null,
          loadingDate: transportInfoInput.loadingDate ? new Date(transportInfoInput.loadingDate) : null,
          dispatchDate: transportInfoInput.dispatchDate ? new Date(transportInfoInput.dispatchDate) : null,
          arrivalDate: transportInfoInput.arrivalDate ? new Date(transportInfoInput.arrivalDate) : null,
          reservationNumber: transportInfoInput.reservationNumber ?? null,
          containerNumber: transportInfoInput.containerNumber ?? null,
          shiplineName: transportInfoInput.shiplineName ?? null,
          trackingUrl: transportInfoInput.trackingUrl ?? null,
          status: "PENDING"
        }
      })
    }

    // Create invoices if provided
    if (Array.isArray(invoiceItems) && invoiceItems.length > 0) {
      const toCreate = invoiceItems
        .filter((i: any) => i && typeof i.amount === "number" && i.fileUrl)
        .map((i: any) => ({ carId: createdCar.id, amount: i.amount, isPaid: !!i.isPaid, fileUrl: i.fileUrl }))
      if (toCreate.length > 0) {
        await (prisma as any).invoice.createMany({ data: toCreate })
      }
    }

    // Reload with includes for response
    const car = await prisma.car.findUnique({
      where: { id: createdCar.id },
      include: {
        dealer: { include: { dealerProfile: true } },
        transportInfo: true,
        invoices: { select: { id: true, amount: true, isPaid: true, fileUrl: true } },
      }
    })

    return NextResponse.json({
      success: true,
      data: car
    })
  } catch (error: any) {
    console.error("[CAR_CREATE]", error)
    const code = (error && error.code) || (error && error.meta && error.meta.cause)
    if (code === 'P2002') {
      return NextResponse.json({ success: false, message: 'VIN already exists' }, { status: 409 })
    }
    if (code === 'P2025' || (error && /Record to delete does not exist|An operation failed because it depends on/.test(String(error.message || '')))) {
      return NextResponse.json({ success: false, message: 'Dealer not found' }, { status: 400 })
    }
    if (code === 'P2003') {
      return NextResponse.json({ success: false, message: 'Invalid dealer reference' }, { status: 400 })
    }
    return NextResponse.json({ 
      success: false,
      message: "Failed to create car",
      details: redactError(error)
    }, { status: 500 })
  }
}
