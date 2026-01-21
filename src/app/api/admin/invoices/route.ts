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
      return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 })
    }

    const url = new URL(req.url)
    const isPaidParam = url.searchParams.get("isPaid")
    let isPaidFilter: boolean | undefined
    if (isPaidParam === "true") isPaidFilter = true
    if (isPaidParam === "false") isPaidFilter = false

    const invoices = await (prisma as any).invoice.findMany({
      where: typeof isPaidFilter === "boolean" ? { isPaid: isPaidFilter } : undefined,
      include: {
        car: {
          include: {
            dealer: {
              select: {
                email: true,
                dealerProfile: true,
              },
            },
          },
        },
      },
      orderBy: { createdAt: "desc" },
    })

    const data = invoices.map((inv: any) => ({
      id: inv.id,
      fileUrl: inv.fileUrl,
      amount: typeof inv.amount === "object" && typeof inv.amount.toNumber === "function" ? inv.amount.toNumber() : Number(inv.amount),
      isPaid: inv.isPaid,
      createdAt: inv.createdAt,
      car: {
        name: [inv.car.make, inv.car.model, inv.car.year].filter(Boolean).join(" "),
        dealer: {
          email: inv.car.dealer.email,
          dealerProfile: inv.car.dealer.dealerProfile,
        },
      },
    }))

    return NextResponse.json(data)
  } catch (error) {
    console.error("[INVOICES_GET]", error)
    return NextResponse.json({ success: false, message: "Failed to fetch invoices", details: redactError(error) }, { status: 500 })
  }
}

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions)
    if (!session || session.user.role !== "ADMIN") {
      return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 })
    }

    if (!sameOriginAllowed(req, siteConfig.url)) {
      return NextResponse.json({ success: false, message: "Forbidden" }, { status: 403 })
    }

    const body = await req.json()
    const { carId, amount, isPaid = false, fileUrl } = body

    if (!carId || typeof amount !== "number" || !fileUrl) {
      return NextResponse.json({ success: false, message: "Missing required fields" }, { status: 400 })
    }

    const created = await (prisma as any).invoice.create({
      data: { carId, amount, isPaid: !!isPaid, fileUrl },
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
      id: created.id,
      fileUrl: created.fileUrl,
      amount: typeof created.amount === "object" && typeof created.amount.toNumber === "function" ? created.amount.toNumber() : Number(created.amount),
      isPaid: created.isPaid,
      createdAt: created.createdAt,
      car: {
        name: [created.car.make, created.car.model, created.car.year].filter(Boolean).join(" "),
        dealer: {
          email: created.car.dealer.email,
          dealerProfile: created.car.dealer.dealerProfile,
        },
      },
    }

    return NextResponse.json(response, { status: 201 })
  } catch (error) {
    console.error("[INVOICES_POST]", error)
    return NextResponse.json({ success: false, message: "Failed to create invoice", details: redactError(error) }, { status: 500 })
  }
}
