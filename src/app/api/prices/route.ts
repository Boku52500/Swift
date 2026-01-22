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

// --- Parsing helpers (tolerant to header naming and spacing) ---
function normalizeHeaderLabel(h: any): string {
  const s = String(h ?? "").toLowerCase().trim()
  // Drop punctuation/whitespace to allow fuzzy includes matching in Georgian/English
  return s.replace(/[^a-z0-9ა-ჰ]+/g, "")
}

function parseWorksheet(ws: XLSX.WorkSheet): Array<{ location: string; port: string; price: string }> {
  // Try object rows first
  const objRows = XLSX.utils.sheet_to_json(ws, { defval: "", raw: true }) as any[]
  if (Array.isArray(objRows) && objRows.length) {
    const headers = Object.keys(objRows[0] || {})
    const normHeaders = headers.map(normalizeHeaderLabel)
    const headerTokens = (tokens: string[]) => (h: string) => tokens.some(t => h.includes(t))
    const findIdx = (pred: (h: string) => boolean) => normHeaders.findIndex(pred)

    const locIdx = findIdx(headerTokens(["ლოკ", "location", "loc", "city", "state"]))
    const portIdx = findIdx(headerTokens(["პორტ", "port", "loading", "ჩატვირთვის"]))
    const priceIdx = findIdx(headerTokens(["ფას", "price", "cost", "usd"]))

    const byIndex = (row: any, idx: number) => {
      if (idx < 0) return ""
      const key = headers[idx]
      return String(row[key] ?? "").toString().trim()
    }

    let data = objRows.map((r) => ({
      location: byIndex(r, locIdx),
      port: byIndex(r, portIdx),
      price: byIndex(r, priceIdx),
    })).filter(r => r.location || r.port || r.price)

    // If indices not found, fall back to AOA below
    if (data.length) return data
  }

  // Fallback: AOA parsing with tolerant header detection
  const rows = XLSX.utils.sheet_to_json<string[]>(ws, { header: 1, defval: "" }) as string[][]
  if (!Array.isArray(rows) || rows.length === 0) return []
  const headers = (rows[0] || []).map((h) => String(h ?? ""))
  const normHeaders = headers.map(normalizeHeaderLabel)
  const headerTokens = (tokens: string[]) => (h: string) => tokens.some(t => h.includes(t))
  const findIdx = (pred: (h: string) => boolean) => normHeaders.findIndex(pred)

  let locIdx = findIdx(headerTokens(["ლოკ", "location", "loc", "city", "state"]))
  let portIdx = findIdx(headerTokens(["პორტ", "port", "loading", "ჩატვირთვის"]))
  let priceIdx = findIdx(headerTokens(["ფას", "price", "cost", "usd"]))
  const foundByHeader = (locIdx >= 0) || (portIdx >= 0) || (priceIdx >= 0)

  // If still not found, attempt positional heuristic (first three non-empty columns)
  if (locIdx < 0 || portIdx < 0 || priceIdx < 0) {
    const firstDataRow = rows[1] || []
    const nonEmptyIdxs = firstDataRow.map((v, i) => ({ i, v: String(v || "").trim() })).filter(x => x.v).map(x => x.i)
    if (nonEmptyIdxs.length >= 3) {
      locIdx = locIdx >= 0 ? locIdx : nonEmptyIdxs[0]
      portIdx = portIdx >= 0 ? portIdx : nonEmptyIdxs[1]
      priceIdx = priceIdx >= 0 ? priceIdx : nonEmptyIdxs[2]
    }
  }

  // If we found header indices by header tokens, skip first row as header. Otherwise treat first row as data.
  const start = foundByHeader && rows.length > 1 ? 1 : 0
  const data = rows.slice(start).map((r) => ({
    location: locIdx >= 0 ? String(r[locIdx] || "").trim() : "",
    port: portIdx >= 0 ? String(r[portIdx] || "").trim() : "",
    price: priceIdx >= 0 ? String(r[priceIdx] || "").toString().trim() : "",
  })).filter(r => r.location || r.port || r.price)

  return data
}

function parsePricesBuffer(buf: Buffer): Array<{ location: string; port: string; price: string }> {
  const wb = XLSX.read(buf, { type: "buffer" })
  const sheetNames = Array.isArray(wb.SheetNames) ? wb.SheetNames : []
  const out: Array<{ location: string; port: string; price: string }> = []
  for (const sn of sheetNames) {
    const ws = wb.Sheets[sn]
    if (!ws) continue
    const rows = parseWorksheet(ws)
    for (const r of rows) out.push(r)
  }
  return out
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
            const data = parsePricesBuffer(Buffer.from(ab))
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
    const data = parsePricesBuffer(fileBuffer)

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
