import { NextResponse } from "next/server"
import path from "path"
import fs from "fs"
import * as XLSX from "xlsx"

export const runtime = "nodejs"
export const dynamic = "force-dynamic"

export async function GET() {
  try {
    const uploadsDir = path.join(process.cwd(), "public", "uploads")
    const preferred = path.join(uploadsDir, "ფასები საიტისთვის.xlsx")
    let filePath = preferred
    if (!fs.existsSync(filePath)) {
      // Try to find any .xlsx in uploads as a fallback
      if (!fs.existsSync(uploadsDir)) {
        return NextResponse.json({ success: false, message: `Uploads directory not found: ${uploadsDir}` }, { status: 404 })
      }
      const files = fs.readdirSync(uploadsDir).filter((f) => f.toLowerCase().endsWith(".xlsx"))
      if (files.length === 0) {
        return NextResponse.json({ success: false, message: `No .xlsx files found in ${uploadsDir}` }, { status: 404 })
      }
      filePath = path.join(uploadsDir, files[0])
    }

    // Read via fs to avoid path access quirks on Windows/OneDrive and unicode filenames
    let fileBuffer: Buffer
    try {
      fileBuffer = fs.readFileSync(filePath)
    } catch (err: any) {
      return NextResponse.json({ success: false, message: `Cannot access file ${filePath}: ${err?.message || err}` }, { status: 500 })
    }
    const wb = XLSX.read(fileBuffer, { type: "buffer" })
    const sheetName = wb.SheetNames[0]
    if (!sheetName) {
      return NextResponse.json({ success: true, data: [] })
    }

    const ws = wb.Sheets[sheetName]
    // First try: object mapping (works like our CLI script)
    const objRows = XLSX.utils.sheet_to_json(ws, { defval: "", raw: true }) as any[]
    let data = objRows.map((r) => ({
      location: (r["ლოკაცია"] ?? r["location"] ?? "").toString().trim(),
      port: (r["ჩატვირთვის პორტი"] ?? r["ჩატვირთვისპორტი"] ?? r["port"] ?? r["loading port"] ?? "").toString().trim(),
      price: (r["ფასი"] ?? r["price"] ?? "").toString().trim(),
    })).filter((r) => r.location || r.port || r.price)

    // Fallback: AOA with header tolerance if object mapping yields empty
    if (!data.length) {
      const rows = XLSX.utils.sheet_to_json<string[]>(ws, { header: 1, defval: "" }) as string[][]
      if (!rows.length) {
        return NextResponse.json({ success: true, data: [] })
      }
      const headers = (rows[0] || []).map((h) => String(h || "").trim().toLowerCase())
      const findCol = (candidates: string[]) => {
        const idx = headers.findIndex((h) => candidates.some((c) => h === c || h.replace(/\s+/g, "") === c.replace(/\s+/g, "")))
        return idx >= 0 ? idx : -1
      }
      const locIdx = findCol(["ლოკაცია", "location"]) 
      const portIdx = findCol(["ჩატვირთვის პორტი", "ჩატვირთვისპორტი", "port", "loading port"]) 
      const priceIdx = findCol(["ფასი", "price"]) 

      data = rows.slice(1).map((r) => ({
        location: locIdx >= 0 ? String(r[locIdx] || "").trim() : "",
        port: portIdx >= 0 ? String(r[portIdx] || "").trim() : "",
        price: priceIdx >= 0 ? String(r[priceIdx] || "").toString().trim() : "",
      })).filter((r) => r.location || r.port || r.price)
    }

    return NextResponse.json({ success: true, data })
  } catch (e: any) {
    return NextResponse.json({ success: false, message: e?.message || "Failed to read price list" }, { status: 500 })
  }
}
