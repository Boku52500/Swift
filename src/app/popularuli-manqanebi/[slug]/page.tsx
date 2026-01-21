import Link from "next/link"
import { notFound } from "next/navigation"
import { Metadata } from "next"
import { siteConfig } from "@/lib/metadata"
import { DollarSign, Calendar, Car } from "lucide-react"
import { prisma } from "@/lib/prisma"

export const revalidate = 1800

const priceRanges: Record<string, { min: number; max: number }> = {
  'UNDER_5000': { min: 0, max: 5000 },
  'UNDER_10000': { min: 5000, max: 10000 },
  'UNDER_15000': { min: 10000, max: 15000 },
  'UNDER_20000': { min: 15000, max: 20000 },
}

const slugToCategory: Record<string, string> = {
  '5000-mde': 'UNDER_5000',
  '10000-mde': 'UNDER_10000',
  '15000-mde': 'UNDER_15000',
  '20000-mde': 'UNDER_20000',
}

const categoryLabels: Record<string, string> = {
  UNDER_5000: "მანქანები 5000$-მდე",
  UNDER_10000: "მანქანები 10000$-მდე",
  UNDER_15000: "მანქანები 15000$-მდე",
  UNDER_20000: "მანქანები 20000$-მდე",
}

export async function generateMetadata({ params }: { params: Promise<{ slug?: string }> | { slug?: string } }): Promise<Metadata> {
  const p: any = params
  const resolved = p && typeof p.then === "function" ? await p : p
  const raw = resolved?.slug || ""
  const slug = decodeURIComponent(raw).trim().toLowerCase()
  const category = slugToCategory[slug]
  if (!category) return {}

  const title = categoryLabels[category]
  const range = priceRanges[category]
  const description = `${title} - დაათვალიერეთ ${range.min > 0 ? `${range.min.toLocaleString()}-დან ` : ""}${range.max.toLocaleString()}-მდე ფასის მანქანები. მანქანების იმპორტი ამერიკიდან საუკეთესო პირობებით.`

  return {
    title,
    description,
    alternates: {
      canonical: `${siteConfig.url}/popularuli-manqanebi/${slug}`,
    },
    openGraph: {
      title,
      description,
      type: 'website',
      url: `${siteConfig.url}/popularuli-manqanebi/${slug}`,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
  }
}

type PopularCar = {
  id: string
  name: string
  year: number
  price: number
  imageUrl?: string | null
}

function getStats(cars: PopularCar[]) {
  if (!cars.length) return null
  return {
    count: cars.length,
    avgPrice: Math.round(cars.reduce((sum, car) => sum + car.price, 0) / cars.length),
    avgYear: Math.round(cars.reduce((sum, car) => sum + car.year, 0) / cars.length),
    minPrice: Math.min(...cars.map(car => car.price)),
    maxPrice: Math.max(...cars.map(car => car.price)),
    minYear: Math.min(...cars.map(car => car.year)),
    maxYear: Math.max(...cars.map(car => car.year)),
  }
}

async function getCars(category: string | undefined): Promise<PopularCar[]> {
  if (!category) return []
  const items = await prisma.popularCar.findMany({
    where: { category: category as any },
    orderBy: { createdAt: 'desc' },
  })
  return items as unknown as PopularCar[]
}

export default async function CategoryPage({ params }: { params: Promise<{ slug?: string }> | { slug?: string } }) {
  const p: any = (params as any)
  const resolved = p && typeof p.then === "function" ? await p : p
  const raw = resolved?.slug || ""
  const slug = decodeURIComponent(raw).trim().toLowerCase()
  const category = slugToCategory[slug]

  if (!category) return notFound()

  const title = categoryLabels[category] ?? "კატეგორია"
  const cars = await getCars(category)
  const stats = getStats(cars)
  const range = priceRanges[category]

  return (
    <div className="min-h-screen bg-neutral-50">

      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">{title}</h1>
            <p className="text-neutral-600 text-lg">
              დაათვალიერეთ {range.min > 0 ? `${range.min.toLocaleString()}-დან ` : ""}{range.max.toLocaleString()}-მდე ფასის მანქანები
            </p>
          </div>

          {stats && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
              <div className="bg-white rounded-xl shadow-sm border border-neutral-200/80 p-6">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-red-100 rounded-lg">
                    <Car className="w-6 h-6 text-red-600" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold">{stats.count}</div>
                    <div className="text-sm text-neutral-600">ხელმისაწვდომი მანქანა</div>
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-xl shadow-sm border border-neutral-200/80 p-6">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-red-100 rounded-lg">
                    <DollarSign className="w-6 h-6 text-red-600" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold">{stats.avgPrice.toLocaleString()}</div>
                    <div className="text-sm text-neutral-600">საშუალო ფასი</div>
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-xl shadow-sm border border-neutral-200/80 p-6">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-red-100 rounded-lg">
                    <Calendar className="w-6 h-6 text-red-600" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold">{stats.avgYear}</div>
                    <div className="text-sm text-neutral-600">საშუალო წელი</div>
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-xl shadow-sm border border-neutral-200/80 p-6">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-red-100 rounded-lg">
                    <DollarSign className="w-6 h-6 text-red-600" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold">{stats.minPrice.toLocaleString()}</div>
                    <div className="text-sm text-neutral-600">მინიმალური ფასი</div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {cars.length === 0 ? (
            <div className="text-center py-12">
              <div className="max-w-md mx-auto">
                <div className="text-neutral-400 mb-4">ამ კატეგორიაში ჯერ მანქანები არ არის</div>
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-red-600 text-white font-medium hover:bg-red-700 transition-colors"
                >
                  დაგვიკავშირდით
                </Link>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {cars.map((car) => (
                <div key={car.id} className="bg-white rounded-xl shadow-sm border border-neutral-200/80 overflow-hidden hover:shadow-md transition-shadow">
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={car.imageUrl || '/images/engine.jpg'}
                      alt={car.name}
                      width={640}
                      height={192}
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-lg mb-2">{car.name}</h3>
                    <div className="flex items-center gap-4 text-sm">
                      <div className="flex items-center gap-1.5">
                        <Calendar className="w-4 h-4 text-neutral-400" />
                        <span>{car.year}</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-red-600 font-medium">
                        <DollarSign className="w-4 h-4" />
                        <span>{car.price.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="mt-12 text-center space-y-2">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-red-600 text-white font-medium hover:bg-red-700 transition-colors"
            >
              დაგვიკავშირდით კონსულტაციისთვის
            </Link>
            <div>
              <Link href="/" className="text-red-600 hover:text-red-700 font-medium">
                მთავარზე დაბრუნება
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Rich text content for SEO */}
      <section className="py-12 bg-white border-t border-neutral-200">
        <div className="container mx-auto px-4">
          <div className="prose prose-neutral mx-auto">
            <h2>მანქანების იმპორტი ამერიკიდან - {title}</h2>
            <p>
              Swift Auto Import გთავაზობთ {range.min > 0 ? `${range.min.toLocaleString()}-დან ` : ""}{range.max.toLocaleString()}-მდე ფასის მანქანებს
              პირდაპირ ამერიკის აუქციონებიდან. ჩვენი გამოცდილი გუნდი დაგეხმარებათ საუკეთესო არჩევანის გაკეთებაში თქვენი ბიუჯეტის ფარგლებში.
            </p>
            {stats && (
              <>
                <p>
                  ამ კატეგორიაში ხელმისაწვდომია {stats.count} მანქანა, საშუალო ფასით {stats.avgPrice.toLocaleString()}.
                  მანქანების გამოშვების წლები მერყეობს {stats.minYear}-დან {stats.maxYear}-მდე, ხოლო ფასები {stats.minPrice.toLocaleString()}-დან
                  {stats.maxPrice.toLocaleString()}-მდე.
                </p>
                <h3>რატომ უნდა აირჩიოთ ეს ფასის კატეგორია?</h3>
                <ul>
                  <li>მრავალფეროვანი არჩევანი სხვადასხვა მოდელებს შორის</li>
                  <li>ოპტიმალური თანაფარდობა ფასსა და ხარისხს შორის</li>
                  <li>სრული მხარდაჭერა დოკუმენტაციის მომზადებაში</li>
                  <li>უსაფრთხო და გამჭვირვალე გარიგება</li>
                </ul>
              </>
            )}
            <p>
              დაგვიკავშირდით კონსულტაციისთვის და ჩვენი გამოცდილი გუნდი დაგეხმარებათ იდეალური მანქანის შერჩევაში თქვენი მოთხოვნების
              გათვალისწინებით.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
