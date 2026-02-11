import Link from "next/link"
import Image from "next/image"
import type { Metadata } from "next"
import { prisma } from "@/lib/prisma"
import { siteConfig } from "@/lib/metadata"

export const revalidate = 1800

const categoryLabelsEn: Record<string, string> = {
  UNDER_5000: "Cars under $5,000",
  UNDER_10000: "Cars under $10,000",
  UNDER_15000: "Cars under $15,000",
  UNDER_20000: "Cars under $20,000",
}

// EN slug to category key
const slugToCategoryEn: Record<string, string> = {
  "under-5000": "UNDER_5000",
  "under-10000": "UNDER_10000",
  "under-15000": "UNDER_15000",
  "under-20000": "UNDER_20000",
}

// For hreflang alternates
const enToKaSlug: Record<string, string> = {
  "under-5000": "5000-mde",
  "under-10000": "10000-mde",
  "under-15000": "15000-mde",
  "under-20000": "20000-mde",
}

type PopularCar = {
  id: string
  name: string
  year: number
  price: number
  imageUrl?: string | null
}

async function getCars(category: string | undefined): Promise<PopularCar[]> {
  if (!category) return []
  const items = await prisma.popularCar.findMany({
    where: { category: category as any },
    orderBy: { createdAt: 'desc' },
  })
  return items as unknown as PopularCar[]
}

export async function generateMetadata({ params }: { params: Promise<{ category?: string }> | { category?: string } }): Promise<Metadata> {
  const p: any = params
  const resolved = p && typeof p.then === 'function' ? await p : p
  const raw = resolved?.category || ''
  const slug = decodeURIComponent(raw).trim().toLowerCase()
  const category = slugToCategoryEn[slug]
  if (!category) return {}
  const title = categoryLabelsEn[category]
  const kaSlug = enToKaSlug[slug]
  const canonical = `${siteConfig.url}/en/popular-cars/${slug}`
  return {
    title,
    description: `${title} — explore popular US auction models in this price range and plan a transparent all‑in budget (fees, inland, ocean container, customs).`,
    alternates: {
      canonical,
      languages: {
        'x-default': `${siteConfig.url}/popularuli-manqanebi/${kaSlug}`,
        'ka-GE': `${siteConfig.url}/popularuli-manqanebi/${kaSlug}`,
        'en-US': canonical,
        'ru-RU': `${siteConfig.url}/ru/populyarnye-avto/${slug}`,
      },
    },
    openGraph: { title, url: canonical },
    twitter: { title },
  }
}

export default async function CategoryEnPage({ params }: { params: Promise<{ category?: string }> | { category?: string } }) {
  const p: any = params
  const resolved = p && typeof p.then === 'function' ? await p : p
  const raw = resolved?.category || ''
  const slug = decodeURIComponent(raw).trim().toLowerCase()
  const category = slugToCategoryEn[slug]
  if (!category) return null
  const title = categoryLabelsEn[category] ?? 'Category'
  const cars = await getCars(category)

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-center mb-8">{title}</h1>
        {cars.length === 0 ? (
          <div className="text-center text-neutral-500">No cars in this category yet</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {cars.map((car) => (
              <div key={car.id} className="bg-white rounded-lg shadow-lg overflow-hidden">
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={car.imageUrl || '/images/engine.jpg'}
                    alt={`${car.name} — Year ${car.year}`}
                    width={640}
                    height={192}
                    loading="lazy"
                    quality={80}
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-lg">{car.name}</h3>
                  <p className="text-neutral-600">Year: {car.year}</p>
                  <p className="text-neutral-600">Price: ${car.price.toLocaleString('en-US')}</p>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="mt-12 text-center">
          <Link href="/en" className="text-red-600 hover:text-red-700 font-medium">Back to home</Link>
        </div>
      </div>
    </section>
  )
}
