import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET() {
  try {
    const user = await prisma.user.findUnique({
      where: { email: "dealer@test.com" },
      include: {
        dealerProfile: true
      }
    })

    if (!user) {
      return NextResponse.json({ exists: false })
    }

    return NextResponse.json({
      exists: true,
      email: user.email,
      role: user.role,
      hasProfile: !!user.dealerProfile
    })
  } catch (error) {
    console.error("[CHECK_TEST_DEALER]", error)
    return new NextResponse("Internal error", { status: 500 })
  }
}
