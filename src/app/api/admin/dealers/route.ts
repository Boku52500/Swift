import { NextResponse } from "next/server"
import { hash } from "bcryptjs"
import { prisma } from "@/lib/prisma"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"

// GET /api/admin/dealers - List all dealers
export async function GET() {
  try {
    const session = await getServerSession(authOptions)

    if (!session || session.user.role !== "ADMIN") {
      return NextResponse.json({
        success: false,
        message: "Unauthorized"
      }, { status: 401 })
    }

    const dealers = await prisma.user.findMany({
      where: { role: "DEALER" },
      include: {
        dealerProfile: true,
        cars: {
          select: {
            id: true
          }
        }
      },
      orderBy: { createdAt: "desc" }
    })

    const formattedDealers = dealers.map(dealer => ({
      id: dealer.id,
      email: dealer.email,
      dealerProfile: {
        companyName: dealer.dealerProfile?.companyName ?? null,
        phone: dealer.dealerProfile?.phone ?? null,
        address: dealer.dealerProfile?.address ?? null,
      }
    }))

    return NextResponse.json({
      success: true,
      data: formattedDealers
    })
  } catch (error) {
    console.error("[DEALERS_GET]", error)
    return NextResponse.json({
      success: false,
      message: "Failed to fetch dealers",
      details: error instanceof Error ? error.message : "Unknown error"
    }, { status: 500 })
  }
}

// POST /api/admin/dealers - Create a new dealer
export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions)

    if (!session || session.user.role !== "ADMIN") {
      return NextResponse.json({
        success: false,
        message: "Unauthorized"
      }, { status: 401 })
    }

    const body = await req.json()
    const { name, email, password, companyName, phone, address } = body

    if (!email || !password) {
      return NextResponse.json({ message: "Email and password are required" }, { status: 400 })
    }

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    })

    if (existingUser) {
      return NextResponse.json({ message: "Email already in use" }, { status: 400 })
    }

    const hashedPassword = await hash(password, 12)

    // Create user and dealer profile in a transaction
    const user = await prisma.$transaction(async (tx) => {
      const user = await tx.user.create({
        data: {
          name,
          email,
          password: hashedPassword,
          role: "DEALER",
        },
      })

      await tx.dealer.create({
        data: {
          userId: user.id,
          companyName,
          phone,
          address,
        },
      })

      return user
    })

    return NextResponse.json({
      success: true,
      data: {
        id: user.id,
        email: user.email,
        dealerProfile: {
          companyName: null
        }
      }
    })
  } catch (error) {
    console.error("[DEALER_CREATE]", error)
    return NextResponse.json({
      success: false,
      message: "Failed to create dealer",
      details: error instanceof Error ? error.message : "Unknown error"
    }, { status: 500 })
  }
}
