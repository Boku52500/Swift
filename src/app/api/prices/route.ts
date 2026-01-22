import { NextResponse } from "next/server"
import path from "path"
import fs from "fs"
import * as XLSX from "xlsx"
import { isDev } from "@/lib/security"

export const runtime = "nodejs"
export const dynamic = "force-dynamic"

const DEV_FALLBACK = [
  { location: "Atlanta, GA", port: "Savannah, GA", price: "$950" },
  { location: "Los Angeles, CA", port: "Los Angeles, CA", price: "$1200" },
  { location: "Chicago, IL", port: "New York, NY", price: "$1100" },
  { location: "Dallas, TX", port: "Houston, TX", price: "$1000" },
  { location: "Miami, FL", port: "Miami, FL", price: "$800" },
]

const MAX_EXCEL_BYTES = 10 * 1024 * 1024 // 10MB

function getAllowedHosts(reqHost?: string | null): Set<string> {
  const defaults = ["swiftautoimport.ge", "res.cloudinary.com"]
  const envList = (process.env.PRICES_REMOTE_ALLOW_HOSTS || "")
    .split(",")
    .map(s => s.trim().toLowerCase())
    .filter(Boolean)
  const hostOnly = (reqHost || "").toLowerCase().split(":" )[0]
  return new Set([hostOnly, ...defaults, ...envList])
}

function isHostAllowed(u: string, allowed: Set<string>): boolean {
  try {
    const h = new URL(u).hostname.toLowerCase()
    return allowed.has(h)
  } catch {
    return false
  }
}

async function fetchWithTimeout(url: string, ms: number): Promise<Response> {
  const c = new AbortController()
  const t = setTimeout(() => c.abort(), ms)
  try {
    return await fetch(url, { signal: c.signal })
  } finally {
    clearTimeout(t)
  }
}

export async function GET(req: Request) {
  try {
    // 1) Prefer remote Excel if configured (works on Vercel)
    const { host } = new URL(req.url) as any
    const remote = process.env.PRICES_EXCEL_URL || process.env.PRICES_FILE_URL || ""
    if (remote) {
      const allowed = getAllowedHosts(host)
      if (isHostAllowed(remote, allowed)) {
        const res = await fetchWithTimeout(remote, 8000)
        if (res.ok) {
          const clen = Number(res.headers.get("content-length") || "0")
          if (clen && clen > MAX_EXCEL_BYTES) {
            if (!isDev()) return NextResponse.json({ success: false, message: "Remote file too large" }, { status: 413 })
          }
          const ab = await res.arrayBuffer()
          if (ab.byteLength && ab.byteLength <= MAX_EXCEL_BYTES) {
            const wb = XLSX.read(Buffer.from(ab), { type: "buffer" })
            const sheetName = wb.SheetNames[0]
            if (!sheetName) {
              if (isDev()) return NextResponse.json({ success: true, data: DEV_FALLBACK })
              return NextResponse.json({ success: true, data: [] })
            }
            const ws = wb.Sheets[sheetName]
            const objRows = XLSX.utils.sheet_to_json(ws, { defval: "", raw: true }) as any[]
            let data = objRows.map((r) => ({
              location: (r["ლოკაცია"] ?? r["location"] ?? "").toString().trim(),
              port: (r["ჩატვირთვის პორტი"] ?? r["ჩატვირთვისპორტი"] ?? r["port"] ?? r["loading port"] ?? "").toString().trim(),
              price: (r["ფასი"] ?? r["price"] ?? "").toString().trim(),
            })).filter((r) => r.location || r.port || r.price)

            if (!data.length) {
              const rows = XLSX.utils.sheet_to_json<string[]>(ws, { header: 1, defval: "" }) as string[][]
              if (!rows.length) {
                if (isDev()) return NextResponse.json({ success: true, data: DEV_FALLBACK })
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

            if (!data.length && isDev()) {
              return NextResponse.json({ success: true, data: DEV_FALLBACK })
            }
            return NextResponse.json({ success: true, data })
          }
        }
      }
    }

    // 2) Local file under /public/uploads (primarily for local/dev)
    const uploadsDir = path.join(process.cwd(), "public", "uploads")
    const preferred = path.join(uploadsDir, "ფასები საიტისთვის.xlsx")
    let filePath = preferred
    if (!fs.existsSync(filePath)) {
      // Try to find any .xlsx in uploads as a fallback
      if (!fs.existsSync(uploadsDir)) {
        if (isDev()) {
          return NextResponse.json({ success: true, data: DEV_FALLBACK })
        }
        return NextResponse.json({ success: false, message: `Uploads directory not found: ${uploadsDir}` }, { status: 404 })
      }
      const files = fs.readdirSync(uploadsDir).filter((f) => f.toLowerCase().endsWith(".xlsx"))
      if (files.length === 0) {
        if (isDev()) {
          return NextResponse.json({ success: true, data: DEV_FALLBACK })
        }
        return NextResponse.json({ success: false, message: `No .xlsx files found in ${uploadsDir}` }, { status: 404 })
      }
      filePath = path.join(uploadsDir, files[0])
    }

    // Read via fs to avoid path access quirks on Windows/OneDrive and unicode filenames
    let fileBuffer: Buffer
    try {
      fileBuffer = fs.readFileSync(filePath)
    } catch (err: any) {
      if (isDev()) {
        return NextResponse.json({ success: true, data: DEV_FALLBACK })
      }
      return NextResponse.json({ success: false, message: `Cannot access file ${filePath}: ${err?.message || err}` }, { status: 500 })
    }
    const wb = XLSX.read(fileBuffer, { type: "buffer" })
    const sheetName = wb.SheetNames[0]
    if (!sheetName) {
      if (isDev()) {
        return NextResponse.json({ success: true, data: DEV_FALLBACK })
      }
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
        if (isDev()) {
          return NextResponse.json({ success: true, data: DEV_FALLBACK })
        }
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

    if (!data.length && isDev()) {
      return NextResponse.json({ success: true, data: DEV_FALLBACK })
    }

    return NextResponse.json({ success: true, data })
  } catch (e: any) {
    if (isDev()) {
      return NextResponse.json({ success: true, data: DEV_FALLBACK })
    }
    return NextResponse.json({ success: false, message: e?.message || "Failed to read price list" }, { status: 500 })
  }
}
