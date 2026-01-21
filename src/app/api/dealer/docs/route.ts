import { NextResponse } from "next/server"
import { promises as fs } from "fs"
import path from "path"
import { redactError } from "@/lib/security"

export const runtime = "nodejs"
export const dynamic = "force-dynamic"

function normalizeHeader(s: string) {
  return (s || "").toLowerCase().replace(/\s+/g, " ")
}

const MAX_EXCEL_BYTES = 10 * 1024 * 1024 // 10MB
const CACHE_TTL_MS = 10 * 60 * 1000 // 10 minutes
type ParsedDocs = { items: Array<{ id: string; title: string; express: string; regular: string }>; meta: Array<{ sheet: string; headers: string[]; mapped: { titleIdx: number; expressIdx: number; regularIdx: number } }> }
const parsedCache = new Map<string, { ts: number; value: ParsedDocs }>()

function getAllowedHosts(reqHost?: string | null): Set<string> {
  const defaults = ["swiftautoimport.ge", "res.cloudinary.com"]
  const envList = (process.env.DOCS_REMOTE_ALLOW_HOSTS || "")
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

async function readWorkbookBytes(origin?: string | null, reqHost?: string | null): Promise<Uint8Array | null> {
  try {
    // Prefer remote file if provided (works on Vercel without local FS persistence)
    const remoteUrl = process.env.DOCS_EXCEL_URL || process.env.DOCS_FILE_URL
    if (remoteUrl) {
      const allowed = getAllowedHosts(reqHost)
      if (!isHostAllowed(remoteUrl, allowed)) {
        return null
      }
      const res = await fetchWithTimeout(remoteUrl, 8000)
      if (!res.ok) return null
      const clen = Number(res.headers.get("content-length") || "0")
      if (clen && clen > MAX_EXCEL_BYTES) return null
      const ab = await res.arrayBuffer()
      if (ab.byteLength > MAX_EXCEL_BYTES) return null
      return new Uint8Array(ab)
    }

    // Try fetching the static file served from the site origin (works on Vercel if file is under /public/uploads)
    if (origin) {
      try {
        const candidate = new URL("/uploads/საბუთები.xlsx", origin).toString()
        const res2 = await fetchWithTimeout(candidate, 5000)
        if (res2.ok) {
          const ab2 = await res2.arrayBuffer()
          return new Uint8Array(ab2)
        }
      } catch {}
    }

    // Fallback to reading from the repository's public/uploads directory
    const uploadDir = path.join(process.cwd(), "public", "uploads")
    const entries = await fs.readdir(uploadDir, { withFileTypes: true }).catch(() => [])
    if (!entries || !entries.length) return null
    // Look for exact name first
    let target = entries.find(e => e.isFile() && e.name.toLowerCase() === "საბუთები.xlsx")?.name
    // Fallback: any file whose name contains 'საბუთ'
    if (!target) target = entries.find(e => e.isFile() && e.name.toLowerCase().includes("საბუთ"))?.name
    // Fallback: any .xlsx file
    if (!target) target = entries.find(e => e.isFile() && e.name.toLowerCase().endsWith(".xlsx"))?.name
    if (!target) return null
    const buf = await fs.readFile(path.join(uploadDir, target))
    return new Uint8Array(buf)
  } catch {
    return null
  }
}

export async function GET(req: Request) {
  try {
    const { origin, host } = new URL(req.url) as any

    const remote = process.env.DOCS_EXCEL_URL || process.env.DOCS_FILE_URL || ""
    const cacheKey = remote ? `remote:${remote}` : `origin:${origin}`
    const now = Date.now()
    const cached = parsedCache.get(cacheKey)
    if (cached && (now - cached.ts) < CACHE_TTL_MS) {
      return NextResponse.json({ success: true, ...cached.value })
    }

    const bytes = await readWorkbookBytes(origin, host)
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

    const payload: ParsedDocs = { items: uniq, meta }
    parsedCache.set(cacheKey, { ts: now, value: payload })
    return NextResponse.json({ success: true, ...payload })
  } catch (e: any) {
    return NextResponse.json({ success: false, message: "Failed to parse", details: redactError(e) }, { status: 500 })
  }
}
