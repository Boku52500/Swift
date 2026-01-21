import { NextResponse, type NextRequest } from "next/server"
import { prisma } from "@/lib/prisma"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { hash } from "bcryptjs"
import { sameOriginAllowed, redactError } from "@/lib/security"
import { siteConfig } from "@/lib/metadata"

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions)

    if (!session || session.user.role !== "ADMIN") {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
    }

    if (!sameOriginAllowed(req, siteConfig.url)) {
      return NextResponse.json({ success: false, message: "Forbidden" }, { status: 403 })
    }

    const { id } = await params
    const body = await req.json()
    const { email, password, companyName, phone, address, transportMarkup } = body

    // Check if user exists and is a dealer
    const existingUser = await prisma.user.findUnique({
      where: { id },
      include: { dealerProfile: true }
    })

    if (!existingUser || existingUser.role !== "DEALER") {
      return NextResponse.json({ message: "Dealer not found" }, { status: 404 })
    }

    // Check if email is taken by another user
    if (email !== existingUser.email) {
      const emailTaken = await prisma.user.findUnique({
        where: { email }
      })

      if (emailTaken) {
        return NextResponse.json({ message: "Email already taken" }, { status: 400 })
      }
    }

    // Update user and dealer profile in a transaction
    const updatedUser = await prisma.$transaction(async (tx) => {
      // Update user
      const userData: any = { email }
      if (password) {
        userData.password = await hash(password, 12)
      }

      const user = await tx.user.update({
        where: { id },
        data: userData
      })

      // Update dealer profile
      await tx.dealer.update({
        where: { userId: id },
        data: {
          companyName,
          phone,
          address,
          ...(typeof transportMarkup !== "undefined"
            ? { transportMarkup: typeof transportMarkup === "number" ? transportMarkup : parseFloat(String(transportMarkup)) || 0 }
            : {})
        }
      })

      return user
    })

    return NextResponse.json({
      success: true,
      message: "Dealer updated successfully",
      data: {
        id: updatedUser.id,
        email: updatedUser.email
      }
    })
  } catch (error) {
    console.error("[DEALER_UPDATE]", error)
    return NextResponse.json({ 
      message: "Failed to update dealer",
      details: redactError(error)
    }, { status: 500 })
  }
}

export const dynamic = "force-dynamic"

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<Record<string, string>> }
) {
  try {
    const { id: userId } = await params
    if (!userId) {
      return NextResponse.json({ 
        success: false,
        message: "Invalid dealer ID" 
      }, { status: 400 })
    }

    // Check authorization
    const session = await getServerSession(authOptions)
    if (!session || session.user.role !== "ADMIN") {
      return NextResponse.json({ 
        success: false,
        message: "Unauthorized" 
      }, { status: 401 })
    }

    if (!sameOriginAllowed(req, (siteConfig as any).url)) {
      return NextResponse.json({ success: false, message: "Forbidden" }, { status: 403 })
    }

    // Find the user and check role
    const user = await prisma.user.findFirst({
      where: { 
        id: userId,
        role: "DEALER"
      },
      include: {
        dealerProfile: true
      }
    })

    if (!user || !user.dealerProfile) {
      return NextResponse.json({ 
        success: false,
        message: "Dealer not found" 
      }, { status: 404 })
    }

    // Delete everything in a transaction (dependent records first)
    try {
      await prisma.$transaction([
        // Delete invoices for all cars of this dealer
        prisma.invoice.deleteMany({
          where: { car: { dealerId: userId } }
        }),
        // Delete transport info for all cars of this dealer
        prisma.transportInfo.deleteMany({
          where: { car: { dealerId: userId } }
        }),
        // Delete cars
        prisma.car.deleteMany({
          where: { dealerId: userId }
        }),
        // Delete dealer profile
        prisma.dealer.delete({
          where: { userId: userId }
        }),
        // Finally delete user
        prisma.user.delete({
          where: { id: userId }
        })
      ])

      return NextResponse.json({ 
        success: true,
        message: "Dealer deleted successfully" 
      }, { status: 200 })
    } catch (txError) {
      console.error("[DEALER_DELETE_TRANSACTION]", txError)
      return NextResponse.json({ 
        success: false,
        message: "Failed to delete dealer",
        details: redactError(txError)
      }, { status: 500 })
    }

  } catch (error) {
    console.error("[DEALER_DELETE]", error)
    return NextResponse.json({ 
      success: false,
      message: "Failed to delete dealer",
      details: redactError(error)
    }, { status: 500 })
  }
}
