import { NextResponse } from "next/server"
import { promises as fs } from "fs"
import path from "path"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { siteConfig } from "@/lib/metadata"

export const runtime = "nodejs"
export const dynamic = "force-dynamic"

// Simple in-memory rate limiter (best-effort for serverless)
const RATE_WINDOW_MS = 5 * 60 * 1000
const RATE_MAX = 20
const rateBucket = new Map<string, { count: number; resetAt: number }>()

function getClientIP(req: Request): string {
  const xfwd = req.headers.get("x-forwarded-for")
  if (xfwd) return xfwd.split(",")[0].trim()
  return req.headers.get("x-real-ip") || "unknown"
}

function checkRateLimit(ip: string): boolean {
  const now = Date.now()
  let entry = rateBucket.get(ip)
  if (!entry || entry.resetAt <= now) {
    entry = { count: 0, resetAt: now + RATE_WINDOW_MS }
    rateBucket.set(ip, entry)
  }
  entry.count += 1
  return entry.count <= RATE_MAX
}

function initCloudinary(): any | null {
  try {
    const hasUrl = !!process.env.CLOUDINARY_URL
    const hasLegacy = !!(process.env.CLOUD_NAME && process.env.CLOUDINARY_API_KEY && process.env.CLOUDINARY_API_SECRET)
    if (!hasUrl && !hasLegacy) return null
    const c = require('cloudinary').v2
    if (hasUrl) {
      c.config({ secure: true })
    } else {
      c.config({
        cloud_name: process.env.CLOUD_NAME,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_API_SECRET,
        secure: true,
      })
    }
    return c
  } catch (e) {
    console.warn('[UPLOAD] Cloudinary init failed, using local storage:', (e as Error)?.message)
    return null
  }
}

const cloudinary: any = initCloudinary()

export async function POST(req: Request) {
  try {
    // CSRF origin check (allow same-origin; allow empty for non-browser clients)
    const baseUrl = siteConfig.url
    const origin = req.headers.get("origin") || ""
    const referer = req.headers.get("referer") || ""
    const host = req.headers.get("host") || ""
    const isAllowed = (u: string) => {
      try {
        const parsed = new URL(u)
        if (u.startsWith(baseUrl)) return true
        if (parsed.host === host) return true
        const hostH = (host.split(":")[0] || "").toLowerCase()
        const uH = parsed.hostname.toLowerCase()
        const devHosts = new Set(["localhost", "127.0.0.1"]) 
        if (devHosts.has(hostH) && devHosts.has(uH)) return true
        return false
      } catch {
        return false
      }
    }
    if (process.env.NODE_ENV !== "production") {
      // Be permissive in development
    } else if ((origin && !isAllowed(origin)) || (referer && !isAllowed(referer))) {
      return NextResponse.json({ success: false, message: "Forbidden" }, { status: 403 })
    }

    // Basic rate limit per-IP
    const ip = getClientIP(req)
    if (!checkRateLimit(ip)) {
      return NextResponse.json({ success: false, message: "Too many requests" }, { status: 429 })
    }

    const session = await getServerSession(authOptions)
    if (!session || !session.user || (session.user.role !== "ADMIN" && session.user.role !== "DEALER")) {
      return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 })
    }

    // In production Cloudinary must be configured; do not fall back to local FS
    if (process.env.NODE_ENV === "production" && !cloudinary) {
      return NextResponse.json({ success: false, message: "Upload service not configured. Set CLOUDINARY_URL or Cloudinary credentials." }, { status: 500 })
    }

    const form = await req.formData()
    let files: File[] = []
    const many = form.getAll("files")
    if (many && many.length) {
      files = many.filter((f): f is File => f instanceof File)
    }
    const single = form.get("file")
    if ((!files || files.length === 0) && single && single instanceof File) {
      files = [single]
    }

    if (!files || files.length === 0) {
      return NextResponse.json({ success: false, message: "No files uploaded" }, { status: 400 })
    }

    const MAX_FILES = 15
    const MAX_FILE_SIZE = 20 * 1024 * 1024 // 20MB
    const ALLOWED_TYPES = new Set([
      "image/jpeg",
      "image/png",
      "image/webp",
      "image/gif",
      "image/avif",
      "image/heic",
      "image/heif",
      "application/pdf",
    ]) // extended types (SVG excluded)
    if (files.length > MAX_FILES) {
      return NextResponse.json({ success: false, message: `Too many files. Max ${MAX_FILES}` }, { status: 400 })
    }

    // Compute a stable upload directory (development only)
    let uploadDir = path.join(process.cwd(), "public", "uploads")
    try {
      await fs.mkdir(uploadDir, { recursive: true })
    } catch {
      // ignore, try fallback
    }
    // If the resolved dir isn't under the actual project, fall back to the known project path.
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

    const urls: string[] = []

    let totalBytes = 0
    for (const file of files) {
      if (!(file instanceof File)) continue
      const fileType = (file.type || "").toLowerCase()
      const byMime = fileType.startsWith("image/")
      const fname = (file as any).name || ""
      const ext = fname ? ("." + fname.split(".").pop()!.toLowerCase()) : ""
      const allowedExt = new Set([".jpg",".jpeg",".png",".webp",".gif",".avif",".heic",".heif"]) // SVG excluded
      const byExt = ext ? allowedExt.has(ext) : false
      if (!(byMime || (fileType && ALLOWED_TYPES.has(fileType)) || byExt)) {
        return NextResponse.json({ success: false, message: `Unsupported file type: ${fileType || ext || "unknown"}` }, { status: 400 })
      }
      if (typeof file.size === "number" && file.size > MAX_FILE_SIZE) {
        return NextResponse.json({ success: false, message: `File too large. Max ${(MAX_FILE_SIZE/1024/1024)|0}MB` }, { status: 400 })
      }
      totalBytes += typeof file.size === "number" ? file.size : 0
      if (totalBytes > MAX_FILES * MAX_FILE_SIZE) {
        return NextResponse.json({ success: false, message: "Payload too large" }, { status: 413 })
      }
      const bytes = await file.arrayBuffer()
      const buffer = Buffer.from(bytes)

      if (cloudinary) {
        const uploadedUrl = await new Promise<string>((resolve, reject) => {
          const stream = cloudinary.uploader.upload_stream(
            { folder: "uploads", resource_type: "auto" },
            (error: unknown, result: { secure_url?: string } | undefined) => {
              if (error || !result || !result.secure_url) return reject(error || new Error("Upload failed"))
              return resolve(result.secure_url)
            }
          )
          stream.end(buffer)
        })
        urls.push(uploadedUrl)
      } else {
        if (process.env.NODE_ENV === "production") {
          return NextResponse.json({ success: false, message: "Upload service not available" }, { status: 500 })
        }
        const safeName = (file.name || "file").replace(/[^a-zA-Z0-9_.-]/g, "_")
        const filename = `${Date.now()}_${Math.random().toString(36).slice(2)}_${safeName}`
        const filepath = path.join(uploadDir, filename)
        await fs.writeFile(filepath, buffer)
        urls.push(`/uploads/${filename}`)
      }
    }

    return NextResponse.json({ success: true, urls })
  } catch (error: any) {
    console.error("[UPLOAD_ERROR]", error)
    return NextResponse.json({ success: false, message: `Upload failed: ${error?.message || error}` }, { status: 500 })
  }
}
