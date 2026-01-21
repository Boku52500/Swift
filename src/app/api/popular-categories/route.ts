import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

const categoryOrder = [
  "UNDER_5000",
  "UNDER_10000",
  "UNDER_15000",
  "UNDER_20000",
] as const

const categoryLabels: Record<(typeof categoryOrder)[number], string> = {
  UNDER_5000: "მანქანები 5000$-მდე",
  UNDER_10000: "მანქანები 10000$-მდე",
  UNDER_15000: "მანქანები 15000$-მდე",
  UNDER_20000: "მანქანები 20000$-მდე",
}

export async function GET() {
  try {
    const configs = await prisma.popularCategoryConfig.findMany()
    const map = new Map(configs.map(c => [c.category, c.imageUrl ?? null]))

    const data = categoryOrder.map((key) => ({
      key,
      title: categoryLabels[key],
      imageUrl: map.get(key) || null,
    }))

    return NextResponse.json({ success: true, data })
  } catch (error) {
    return NextResponse.json({ success: false, message: "Failed to fetch categories" }, { status: 500 })
  }
}
