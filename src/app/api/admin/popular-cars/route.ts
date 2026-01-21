import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

export async function GET() {
  try {
    const session = await getServerSession(authOptions)
    if (!session || session.user.role !== "ADMIN") {
      return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 })
    }

    const items = await prisma.popularCar.findMany({
      orderBy: { createdAt: "desc" }
    })

    return NextResponse.json({ success: true, data: items })
  } catch (error) {
    console.error("[POPULAR_CARS_ADMIN_GET]", error)
    return NextResponse.json({ success: false, message: "Failed to fetch popular cars" }, { status: 500 })
  }
}

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions)
    if (!session || session.user.role !== "ADMIN") {
      return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 })
    }

    const body = await req.json()
    const { name, year, price, category, imageUrl } = body || {}

    if (!name || !year || !price || !category) {
      return NextResponse.json({ success: false, message: "Missing required fields" }, { status: 400 })
    }

    const created = await prisma.popularCar.create({
      data: {
        name: String(name),
        year: Number(year),
        price: Number(price),
        category,
        imageUrl: imageUrl ? String(imageUrl) : null,
      },
    })

    return NextResponse.json({ success: true, data: created })
  } catch (error) {
    console.error("[POPULAR_CAR_CREATE]", error)
    return NextResponse.json({ success: false, message: "Failed to create popular car" }, { status: 500 })
  }
}
