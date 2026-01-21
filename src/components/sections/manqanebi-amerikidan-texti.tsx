"use client"

import { useEffect, useRef, useState } from 'react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

type CategoryItem = {
  key: string
  title: string
  imageUrl: string | null
}

export function CarsShowcaseSection() {
  const fallback: CategoryItem[] = [
    { key: 'UNDER_5000', title: 'მანქანები 5000$-მდე', imageUrl: null },
    { key: 'UNDER_10000', title: 'მანქანები 10000$-მდე', imageUrl: null },
    { key: 'UNDER_15000', title: 'მანქანები 15000$-მდე', imageUrl: null },
    { key: 'UNDER_20000', title: 'მანქანები 20000$-მდე', imageUrl: null },
  ]
  const keyToSlug: Record<string, string> = {
    UNDER_5000: '5000-mde',
    UNDER_10000: '10000-mde',
    UNDER_15000: '15000-mde',
    UNDER_20000: '20000-mde',
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
            for (const item of data.data as CategoryItem[]) {
              byKey.set(item.key, { ...byKey.get(item.key)!, ...item })
            }
            setCats(Array.from(byKey.values()))
          }
        }
      } catch {
        // ignore and keep fallback
      } finally { setFetching(false) }
    })()
    return () => { mounted = false }
  }, [])

  return (
    <section id="cars" className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-4">
          პოპულარული მანქანები ამერიკიდან
        </h2>
        <p className="text-neutral-600 text-center mb-12 max-w-2xl mx-auto">
          გთავაზობთ <Link href="/meoradi-manqanebi" className="text-red-600 hover:text-red-700">მეორადი მანქანების</Link> დიდ არჩევანს <Link href="/amerikis-avto-auqcioni" className="text-red-600 hover:text-red-700">ამერიკის ავტო აუქციონებიდან</Link>. ფასები მოიცავს <Link href="/avto-importi" className="text-red-600 hover:text-red-700">ავტო იმპორტის</Link> ყველა ხარჯს.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {cats.map((c) => (
            <Link key={c.key} href={`/popularuli-manqanebi/${keyToSlug[c.key]}`} className="group block">
              <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                <div className="relative h-48 overflow-hidden">
                  {/* Loader/placeholder layer */}
                  <div className={`absolute inset-0 ${
                    fetching || !c.imageUrl || !imgLoaded[c.key]
                      ? 'bg-[linear-gradient(110deg,#ececec,45%,#f5f5f5,55%,#ececec)] bg-[length:200%_100%] animate-[shimmer_1.2s_infinite]' 
                      : 'hidden'
                  }`} />

                  {/* Real image (only when available) */}
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

                  {/* dark overlay and title */}
                  <div className="absolute inset-0 bg-black/30" />
                  <div className="absolute bottom-0 left-0 right-0 p-4 text-white font-semibold text-center">
                    {c.title}
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-12 text-center space-y-4">
          <p className="text-neutral-600">
            გაიგეთ მეტი <Link href="/avto-importi" className="text-red-600 hover:text-red-700">ავტო იმპორტის</Link> სერვისების შესახებ
          </p>
          <Button asChild size="lg">
            <Link href="#contact">
              მიიღეთ დეტალური ინფორმაცია
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
