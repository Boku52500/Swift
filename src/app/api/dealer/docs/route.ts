import { NextResponse } from "next/server"
import { promises as fs } from "fs"
import path from "path"

export const runtime = "nodejs"
export const dynamic = "force-dynamic"

function normalizeHeader(s: string) {
  return (s || "").toLowerCase().replace(/\s+/g, " ")
}

async function readWorkbookBytes(): Promise<Uint8Array | null> {
  try {
    let uploadDir = path.join(process.cwd(), "public", "uploads")
    try { await fs.mkdir(uploadDir, { recursive: true }) } catch {}
    if (!uploadDir.replace(/\\/g, "/").includes("swift-auto-import/public/uploads")) {
      const fallbackProject = path.join(
        process.env.USERPROFILE || process.env.HOME || "",
        "OneDrive",
        "Desktop",
        "Swift Site",
        "swift-auto-import"
      )
      uploadDir = path.join(fallbackProject, "public", "uploads")
      try { await fs.mkdir(uploadDir, { recursive: true }) } catch {}
    }
    const entries = await fs.readdir(uploadDir, { withFileTypes: true })
    // Look for exact name first
    let target = entries.find(e => e.isFile() && e.name.toLowerCase() === "საბუთები.xlsx")?.name
    // Fallback: any file whose name contains 'საბუთ'
    if (!target) target = entries.find(e => e.isFile() && e.name.toLowerCase().includes("საბუთ"))?.name
    if (!target) return null
    const buf = await fs.readFile(path.join(uploadDir, target))
    return new Uint8Array(buf)
  } catch {
    return null
  }
}

export async function GET() {
  try {
    const bytes = await readWorkbookBytes()
    if (!bytes) return NextResponse.json({ success: false, message: "Excel file not found" }, { status: 404 })

    // Dynamic import on server
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const XLSX = require("xlsx")
    const wb = XLSX.read(bytes, { type: "array" }) as any

    const items: Array<{ id: string; title: string; express: string; regular: string }> = []
    const meta: Array<{ sheet: string; headers: string[]; mapped: { titleIdx: number; expressIdx: number; regularIdx: number } }> = []

    const wantedTitle = ["საბუთ", "document", "title"]
    const wantedExpress = ["სასწრაფ", "1 კვირ", "express"]
    const wantedRegular = ["ჩვეულ", "2 კვირ", "regular"]

    const sheetNames: string[] = Array.isArray(wb.SheetNames) ? wb.SheetNames : []
    for (const sheetName of sheetNames) {
      const ws = wb.Sheets[sheetName]
      if (!ws) continue
      const rows = XLSX.utils.sheet_to_json(ws, { header: 1 }) as any[][]
      if (!rows || !rows.length) continue
      // find first non-empty row as headers
      let headerRow: any[] | null = null
      for (const r of rows) {
        if (Array.isArray(r) && r.some((c: any) => String(c ?? "").trim() !== "")) {
          headerRow = r
          break
        }
      }
      if (!headerRow) continue
      const headers = headerRow.map((x: any) => String(x ?? "").trim())
      const normHeaders = headers.map(normalizeHeader)

      const findIdx = (preds: string[]) => {
        for (let i = 0; i < normHeaders.length; i++) {
          const h = normHeaders[i]
          if (preds.some(p => h.includes(normalizeHeader(p)))) return i
        }
        return -1
      }
      const titleIdx = findIdx(wantedTitle)
      const expressIdx = findIdx(wantedExpress)
      const regularIdx = findIdx(wantedRegular)
      meta.push({ sheet: sheetName, headers, mapped: { titleIdx, expressIdx, regularIdx } })
      if (titleIdx < 0) continue

      // start from the row after headerRow
      const startIndex = rows.indexOf(headerRow) + 1
      for (let i = startIndex; i < rows.length; i++) {
        const r = rows[i] || []
        const title = String(r[titleIdx] ?? "").trim()
        if (!title) continue
        const express = String(r[expressIdx] ?? "").trim()
        const regular = String(r[regularIdx] ?? "").trim()
        items.push({ id: title, title, express, regular })
      }
    }

    // De-duplicate by title
    const seen = new Set<string>()
    const uniq: typeof items = []
    for (const it of items) {
      if (seen.has(it.id)) continue
      seen.add(it.id)
      uniq.push(it)
    }

    return NextResponse.json({ success: true, items: uniq, meta })
  } catch (e: any) {
    return NextResponse.json({ success: false, message: e?.message || "Failed to parse" }, { status: 500 })
  }
}
