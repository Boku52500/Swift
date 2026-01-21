import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

const allowed = new Set(["UNDER_5000","UNDER_10000","UNDER_15000","UNDER_20000"]) as Set<string>

export async function GET(_req: Request, context: { params: any }) {
  try {
    const p = (context as any).params
    const resolved = p && typeof p.then === "function" ? await p : p
    const raw = resolved?.category ?? ""
    const cat = decodeURIComponent(String(raw)).trim().toUpperCase()
    if (!allowed.has(cat)) {
      return NextResponse.json({ success: false, message: "Invalid category" }, { status: 400 })
    }

    const items = await prisma.popularCar.findMany({
      where: { category: cat as any },
      orderBy: { createdAt: "desc" },
    })

    return NextResponse.json({ success: true, data: items })
  } catch (error) {
    return NextResponse.json({ success: false, message: "Failed to fetch" }, { status: 500 })
  }
}
