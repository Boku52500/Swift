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

    const items = await prisma.popularCategoryConfig.findMany()
    return NextResponse.json({ success: true, data: items })
  } catch (error) {
    console.error("[POPULAR_CATEGORIES_ADMIN_GET]", error)
    return NextResponse.json({ success: false, message: "Failed to fetch categories" }, { status: 500 })
  }
}

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions)
    if (!session || session.user.role !== "ADMIN") {
      return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 })
    }

    const body = await req.json()
    const { category, imageUrl } = body || {}
    const allowed = new Set(["UNDER_5000","UNDER_10000","UNDER_15000","UNDER_20000"]) as Set<string>
    if (!category || !allowed.has(String(category))) {
      return NextResponse.json({ success: false, message: "Invalid category" }, { status: 400 })
    }

    const upserted = await prisma.popularCategoryConfig.upsert({
      where: { category },
      create: { category, imageUrl: imageUrl || null },
      update: { imageUrl: imageUrl || null },
    })

    return NextResponse.json({ success: true, data: upserted })
  } catch (error) {
    console.error("[POPULAR_CATEGORY_UPSERT]", error)
    return NextResponse.json({ success: false, message: "Failed to save category" }, { status: 500 })
  }
}
