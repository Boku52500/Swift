import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

const categoryOrder: Array<"UNDER_5000"|"UNDER_10000"|"UNDER_15000"|"UNDER_20000"> = [
  "UNDER_5000","UNDER_10000","UNDER_15000","UNDER_20000"
]

const categoryLabels: Record<string, string> = {
  UNDER_5000: "მანქანები 5000$-მდე",
  UNDER_10000: "მანქანები 10000$-მდე",
  UNDER_15000: "მანქანები 15000$-მდე",
  UNDER_20000: "მანქანები 20000$-მდე",
}

export async function GET() {
  try {
    const items = await prisma.popularCar.findMany({
      orderBy: { createdAt: "desc" },
    })

    const grouped = categoryOrder.map((key) => ({
      key,
      title: categoryLabels[key],
      items: items.filter(i => i.category === key)
    }))

    return NextResponse.json({ success: true, data: grouped })
  } catch (error) {
    return NextResponse.json({ success: false, message: "Failed to fetch popular cars" }, { status: 500 })
  }
}
