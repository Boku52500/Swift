import { NextResponse } from "next/server"
import { promises as fs } from "fs"
import path from "path"

export const runtime = "nodejs"
export const dynamic = "force-dynamic"

export async function GET() {
  try {
    let uploadDir = path.join(process.cwd(), "public", "uploads")
    try {
      await fs.mkdir(uploadDir, { recursive: true })
    } catch {}
    if (!uploadDir.replace(/\\/g, "/").includes("swift-auto-import/public/uploads")) {
      const fallbackProject = path.join(
        process.env.USERPROFILE || process.env.HOME || "",
        "OneDrive",
        "Desktop",
        "Swift Site",
        "swift-auto-import"
      )
      uploadDir = path.join(fallbackProject, "public", "uploads")
      await fs.mkdir(uploadDir, { recursive: true })
    }

    const entries = await fs.readdir(uploadDir, { withFileTypes: true })
    const files = entries
      .filter((e) => e.isFile())
      .map((e) => e.name)
      .filter((n) => n.toLowerCase().endsWith(".xlsx"))

    return NextResponse.json({ success: true, files })
  } catch (e) {
    return NextResponse.json({ success: false, files: [], message: "Failed to list uploads" }, { status: 500 })
  }
}
