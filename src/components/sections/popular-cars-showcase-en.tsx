"use client"

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'

type CategoryItem = {
  key: string
  title: string
  imageUrl: string | null
}

type ApiCategory = {
  key: string
  imageUrl?: string | null
  title?: string // ignored for EN to preserve English labels
}

export function PopularCarsShowcaseEn() {
  const fallback: CategoryItem[] = [
    { key: 'UNDER_5000', title: 'Under $5,000', imageUrl: null },
    { key: 'UNDER_10000', title: 'Under $10,000', imageUrl: null },
    { key: 'UNDER_15000', title: 'Under $15,000', imageUrl: null },
    { key: 'UNDER_20000', title: 'Under $20,000', imageUrl: null },
  ]
  const keyToSlug: Record<string, string> = {
    UNDER_5000: 'under-5000',
    UNDER_10000: 'under-10000',
    UNDER_15000: 'under-15000',
    UNDER_20000: 'under-20000',
  }
  const [cats, setCats] = useState<CategoryItem[]>(fallback)
  const [fetching, setFetching] = useState(true)
  const [imgLoaded, setImgLoaded] = useState<Record<string, boolean>>({})
  const versionRef = useRef(Date.now())

  useEffect(() => {
    let mounted = true
    ;(async () => {
      try {
        const res = await fetch(`/api/popular-categories?ts=${Date.now()}` as string, { cache: 'no-store' })
        if (!mounted) return
        if (res.ok) {
          const data = await res.json()
          if (data?.success && Array.isArray(data.data)) {
            const byKey = new Map<string, CategoryItem>(fallback.map(c => [c.key, c]))
            for (const item of data.data as ApiCategory[]) {
              if (!item?.key) continue
              const prev = byKey.get(item.key) || { key: item.key, title: '', imageUrl: null }
              // Preserve English titles; only take imageUrl from API
              byKey.set(item.key, { ...prev, imageUrl: item.imageUrl ?? prev.imageUrl })
            }
            setCats(Array.from(byKey.values()))
          }
        }
      } catch {} finally { setFetching(false) }
    })()
    return () => { mounted = false }
  }, [])

  return (
    <section id="cars" className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-4">Popular cars from the USA</h2>
        <p className="text-neutral-600 text-center mb-12 max-w-2xl mx-auto">
          We offer a large selection of <Link href="/en/used-cars" className="text-red-600 hover:text-red-700">used cars</Link> from
          {' '}<Link href="/en/us-auto-auctions" className="text-red-600 hover:text-red-700">US auto auctions</Link>. All‑in prices include
          {' '}<Link href="/en/car-import" className="text-red-600 hover:text-red-700">car import</Link> costs.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {cats.map((c) => (
            <Link key={c.key} href={`/en/popular-cars/${keyToSlug[c.key]}`} className="group block">
              <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                <div className="relative h-48 overflow-hidden">
                  <div className={`absolute inset-0 ${
                    fetching || !c.imageUrl || !imgLoaded[c.key]
                      ? 'bg-[linear-gradient(110deg,#ececec,45%,#f5f5f5,55%,#ececec)] bg-[length:200%_100%] animate-[shimmer_1.2s_infinite]'
                      : 'hidden'
                  }`} />
                  {c.imageUrl && (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={(() => {
                        const origin = typeof window !== 'undefined' ? window.location.origin : ''
                        const absolute = c.imageUrl!.startsWith('http') ? c.imageUrl! : `${origin}${c.imageUrl!}`
                        return `${absolute}?v=${versionRef.current}`
                      })()}
                      alt={c.title}
                      onLoad={() => setImgLoaded((m) => ({ ...m, [c.key]: true }))}
                      className={`w-full h-full object-cover transition-transform duration-300 group-hover:scale-105 ${imgLoaded[c.key] ? 'opacity-100' : 'opacity-0'}`}
                    />
                  )}
                  <div className="absolute inset-0 bg-black/30" />
                  <div className="absolute bottom-0 left-0 right-0 p-4 text-white font-semibold text-center">{c.title}</div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-12 text-center space-y-4">
          <p className="text-neutral-600">Learn more about our <Link href="/en/car-import" className="text-red-600 hover:text-red-700">car import</Link> services</p>
          <Link href="#contact" className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-red-600 text-white font-medium hover:bg-red-700 transition-colors">Get details</Link>
        </div>
      </div>
    </section>
  )
}
