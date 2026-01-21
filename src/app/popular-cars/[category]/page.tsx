import Link from "next/link"
import { Metadata } from "next"
import { prisma } from "@/lib/prisma"
import { siteConfig } from "@/lib/metadata"

export const revalidate = 1800

const categoryLabels: Record<string, string> = {
  UNDER_5000: "მანქანები 5000$-მდე",
  UNDER_10000: "მანქანები 10000$-მდე",
  UNDER_15000: "მანქანები 15000$-მდე",
  UNDER_20000: "მანქანები 20000$-მდე",
}

type PopularCar = {
  id: string
  name: string
  year: number
  price: number
  imageUrl?: string | null
}

const categoryToSlug: Record<string, string> = {
  UNDER_5000: '5000-mde',
  UNDER_10000: '10000-mde',
  UNDER_15000: '15000-mde',
  UNDER_20000: '20000-mde',
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
  const category = decodeURIComponent(raw).trim().toUpperCase()
  const title = categoryLabels[category] ?? 'კატეგორია'
  const geSlug = categoryToSlug[category]
  const canonical = geSlug ? `${siteConfig.url}/popularuli-manqanebi/${geSlug}` : `${siteConfig.url}/popular-cars/${raw}`
  return {
    title,
    description: title,
    alternates: { canonical },
    openGraph: { title, url: canonical },
    twitter: { title },
  }
}

export default async function CategoryPage({ params }: { params: Promise<{ category?: string }> | { category?: string } }) {
  const p: any = (params as any)
  const resolved = p && typeof p.then === "function" ? await p : p
  const raw = resolved?.category || ""
  const category = decodeURIComponent(raw).trim().toUpperCase()
  const title = categoryLabels[category] ?? "კატეგორია"
  const cars = await getCars(category)

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-center mb-8">{title}</h1>
        {cars.length === 0 ? (
          <div className="text-center text-neutral-500">ამ კატეგორიაში ჯერ მანქანები არ არის</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {cars.map((car) => (
              <div key={car.id} className="bg-white rounded-lg shadow-lg overflow-hidden">
                <div className="relative h-48 overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={car.imageUrl || '/images/engine.jpg'}
                    alt={car.name}
                    width={640}
                    height={192}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-lg">{car.name}</h3>
                  <p className="text-neutral-600">წელი: {car.year}</p>
                  <p className="text-neutral-600">ფასი: ${'{'}car.price.toLocaleString(){'}'}</p>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="mt-12 text-center">
          <Link href="/" className="text-red-600 hover:text-red-700 font-medium">მთავარზე დაბრუნება</Link>
        </div>
      </div>
    </section>
  )
}
