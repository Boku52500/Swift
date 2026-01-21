import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

export async function DELETE(_req: Request, context: { params: any }) {
  try {
    const session = await getServerSession(authOptions)
    if (!session || session.user.role !== "ADMIN") {
      return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 })
    }

    // Unwrap params which may be a Promise in some runtimes
    const p = (context as any).params
    const resolved = p && typeof p.then === "function" ? await p : p
    const id = resolved?.id as string | undefined
    if (!id) {
      return NextResponse.json({ success: false, message: "Missing id" }, { status: 400 })
    }

    await prisma.popularCar.delete({ where: { id } })
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("[POPULAR_CAR_DELETE]", error)
    return NextResponse.json({ success: false, message: "Failed to delete popular car" }, { status: 500 })
  }
}

export async function PATCH(req: Request, context: { params: any }) {
  try {
    const session = await getServerSession(authOptions)
    if (!session || session.user.role !== "ADMIN") {
      return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 })
    }
    // Unwrap params which may be a Promise
    const p = (context as any).params
    const resolved = p && typeof p.then === "function" ? await p : p
    const id = resolved?.id as string | undefined
    if (!id) {
      return NextResponse.json({ success: false, message: "Missing id" }, { status: 400 })
    }

    const body = await req.json()
    const { name, year, price, category, imageUrl } = body || {}

    const updated = await prisma.popularCar.update({
      where: { id },
      data: {
        ...(name ? { name: String(name) } : {}),
        ...(year !== undefined ? { year: Number(year) } : {}),
        ...(price !== undefined ? { price: Number(price) } : {}),
        ...(category ? { category } : {}),
        ...(imageUrl !== undefined ? { imageUrl: imageUrl ? String(imageUrl) : null } : {}),
      },
    })

    return NextResponse.json({ success: true, data: updated })
  } catch (error) {
    console.error("[POPULAR_CAR_UPDATE]", error)
    return NextResponse.json({ success: false, message: "Failed to update popular car" }, { status: 500 })
  }
}
