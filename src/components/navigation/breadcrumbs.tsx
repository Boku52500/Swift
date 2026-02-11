"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { blogPosts } from "@/data/blog"
import { blogPostsEn } from "@/data/blog-en"
import { blogPostsRu } from "@/data/blog-ru"
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

const LABELS_KA: Record<string, string> = {
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

const LABELS_EN: Record<string, string> = {
  "": "Home",
  blog: "Blog",
  contact: "Contact",
  "car-import": "Car Import",
  "us-auto-auctions": "US Auto Auctions",
  "cars-from-usa": "Cars from USA",
  "used-cars": "Used Cars",
  services: "Services",
  "become-a-dealer": "Become a Dealer",
  "auction-calculator": "Auction Calculator",
  "popular-cars": "Popular Cars",
  dealer: "Dealer",
  login: "Login",
  "under-5000": "Under $5,000",
  "under-10000": "Under $10,000",
  "under-15000": "Under $15,000",
  "under-20000": "Under $20,000",
}

const LABELS_RU: Record<string, string> = {
  "": "Главная",
  blog: "Блог",
  uslugi: "Услуги",
  "import-avto": "Импорт авто",
  "avto-iz-ssha": "Автомобили из США",
  "aukciony-ssha": "Аукционы США",
  "podderzhannye-avto": "Б/у автомобили",
  "populyarnye-avto": "Популярные авто",
  kontakty: "Контакты",
  "stat-dilerom": "Стать дилером",
  "kalkulyator-aukciona": "Калькулятор аукциона",
  contact: "Контакты",
  "car-import": "Импорт авто",
  "us-auto-auctions": "Аукционы США",
  "cars-from-usa": "Автомобили из США",
  "used-cars": "Б/у автомобили",
  services: "Услуги",
  "become-a-dealer": "Стать дилером",
  "auction-calculator": "Калькулятор аукциона",
  "popular-cars": "Популярные авто",
  dealer: "Дилер",
  login: "Войти",
  "under-5000": "До $5,000",
  "under-10000": "До $10,000",
  "under-15000": "До $15,000",
  "under-20000": "До $20,000",
}

export function Breadcrumbs() {
  const pathname = usePathname() || "/"
  const isEn = pathname.startsWith('/en')
  const isRu = pathname.startsWith('/ru')
  if ((!isEn && !isRu && pathname === "/") || (isEn && pathname === "/en") || (isRu && pathname === "/ru")) return null
  const disabledExact = new Set(["/swift-admin-login", "/dealer/login"])
  const disabledPrefixes = ["/dealer", "/swift-admin", "/api/auth"]
  if (disabledExact.has(pathname) || disabledPrefixes.some((p) => pathname.startsWith(p))) {
    return null
  }

  const rawSegments = pathname.split("?")[0].split("#")[0].split("/").filter(Boolean)
  const segments = (isEn || isRu) ? rawSegments.slice(1) : rawSegments

  const crumbs: Array<{ name: string; path: string }> = []
  // Home
  crumbs.push({ name: (isEn ? LABELS_EN[""] : isRu ? LABELS_RU[""] : LABELS_KA[""]) ?? (isEn ? 'Home' : isRu ? 'Главная' : 'მთავარი'), path: isEn ? "/en" : isRu ? "/ru" : "/" })

  let acc = isEn ? "/en" : isRu ? "/ru" : ""
  segments.forEach((seg, idx) => {
    acc += `/${seg}`
    const dict = isEn ? LABELS_EN : isRu ? LABELS_RU : LABELS_KA
    let name = dict[seg] || titleCase(seg)

    // Blog post title
    if (segments[0] === "blog" && idx === 1) {
      if (isEn) {
        const post = blogPostsEn.find((p) => p.slug === seg)
        if (post) name = post.title
      } else if (!isRu) {
        const post = blogPosts.find((p) => p.slug === seg)
        if (post) name = post.title
      } else {
        const post = blogPostsRu.find((p) => p.slug === seg)
        if (post) name = post.title
      }
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



