import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { hash } from "bcryptjs"

export async function GET() {
  try {
    const hashedPassword = await hash("testpassword", 10)

    const user = await prisma.user.upsert({
      where: { email: "dealer@test.com" },
      update: {},
      create: {
        email: "dealer@test.com",
        name: "Test Dealer",
        password: hashedPassword,
        role: "DEALER",
        dealerProfile: {
          create: {
            companyName: "Test Company",
          }
        }
      }
    })

    return NextResponse.json({ 
      message: "Test dealer created",
      email: "dealer@test.com",
      password: "testpassword"
    })
  } catch (error) {
    console.error("[CREATE_TEST_DEALER]", error)
    return new NextResponse("Internal error", { status: 500 })
  }
}
