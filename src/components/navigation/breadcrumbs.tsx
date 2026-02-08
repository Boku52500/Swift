"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { blogPosts } from "@/data/blog"
import { BreadcrumbSchema } from "@/components/seo/schemas"

function titleCase(s: string) {
  try {
    if (!s) return s
    const decoded = decodeURIComponent(s.replace(/-/g, " "))
    return decoded
  } catch {
    return s
  }
}

const LABELS: Record<string, string> = {
  "": "მთავარი",
  blog: "ბლოგი",
  contact: "კონტაქტი",
  "avto-importi": "ავტო იმპორტი",
  "amerikis-avto-auqcioni": "ამერიკის ავტო აუქციონი",
  "manqanebi-amerikidan": "მანქანები ამერიკიდან",
  "meoradi-manqanebi": "მეორადი მანქანები",
  servisebi: "სერვისები",
  "gaxdi-dileri": "გახდი დილერი",
  "auqcionis-kalkulatori": "აუქციონის კალკულატორი",
  "popularuli-manqanebi": "პოპულარული მანქანები",
  dealer: "დილერი",
  login: "შესვლა",
  "5000-mde": "$5,000-მდე",
  "10000-mde": "$10,000-მდე",
  "15000-mde": "$15,000-მდე",
  "20000-mde": "$20,000-მდე",
}

export function Breadcrumbs() {
  const pathname = usePathname() || "/"
  if (pathname === "/") return null
  const disabledExact = new Set(["/swift-admin-login", "/dealer/login"])
  const disabledPrefixes = ["/dealer", "/swift-admin", "/api/auth"]
  if (disabledExact.has(pathname) || disabledPrefixes.some((p) => pathname.startsWith(p))) {
    return null
  }

  const segments = pathname.split("?")[0].split("#")[0].split("/").filter(Boolean)

  const crumbs: Array<{ name: string; path: string }> = []
  // Home
  crumbs.push({ name: LABELS[""] ?? "მთავარი", path: "/" })

  let acc = ""
  segments.forEach((seg, idx) => {
    acc += `/${seg}`
    let name = LABELS[seg] || titleCase(seg)

    // Blog post title
    if (segments[0] === "blog" && idx === 1) {
      const post = blogPosts.find((p) => p.slug === seg)
      if (post) name = post.title
    }

    crumbs.push({ name, path: acc })
  })

  return (
    <div className="relative z-40 bg-white/90 backdrop-blur supports-[backdrop-filter]:bg-white/70 border-b border-neutral-100/70">
      <nav aria-label="Breadcrumb" className="container mx-auto px-4 py-2">
        <ol className="flex items-center gap-2 text-sm text-neutral-500 leading-tight">
          {crumbs.map((c, i) => {
            const isLast = i === crumbs.length - 1
            return (
              <li key={c.path} className="flex items-center gap-2">
                {isLast ? (
                  <span aria-current="page" className="text-neutral-700">
                    {c.name}
                  </span>
                ) : (
                  <Link href={c.path} className="hover:text-neutral-700">
                    {c.name}
                  </Link>
                )}
                {!isLast && <span className="text-neutral-400">/</span>}
              </li>
            )
          })}
        </ol>
        {/* JSON-LD breadcrumb schema matching the visible trail */}
        <BreadcrumbSchema items={crumbs.map((c) => ({ name: c.name, path: c.path }))} />
      </nav>
    </div>
  )
}
