import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { compare } from "bcryptjs"

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json()

    if (email !== "g.bokuchava22@gmail.com") {
      return new NextResponse("Invalid credentials", { status: 401 })
    }

    const admin = await prisma.user.findUnique({
      where: { email },
    })

    if (!admin || admin.role !== "ADMIN") {
      return new NextResponse("Invalid credentials", { status: 401 })
    }

    const isPasswordValid = await compare(password, admin.password)

    if (!isPasswordValid) {
      return new NextResponse("Invalid credentials", { status: 401 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("[ADMIN_LOGIN]", error)
    return new NextResponse("Internal error", { status: 500 })
  }
}
