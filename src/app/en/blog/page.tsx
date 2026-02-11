import Link from "next/link"
import Image from "next/image"
import type { Metadata } from "next"
import { blogPostsEn } from "@/data/blog-en"
import { siteConfig } from "@/lib/metadata"

export const metadata: Metadata = {
  title: "Blog - Swift Auto Import",
  description:
    "Guides on importing cars from the USA to Georgia: Copart/IAAI auctions, bidding strategies, shipping, timelines, customs, and best practices.",
  alternates: {
    canonical: `${siteConfig.url}/en/blog`,
    languages: {
      "x-default": `${siteConfig.url}/blog`,
      "ka-GE": `${siteConfig.url}/blog`,
      "en-US": `${siteConfig.url}/en/blog`,
      "ru-RU": `${siteConfig.url}/ru/blog`,
    },
  },
  robots: { index: true, follow: true },
  openGraph: {
    type: "website",
    url: `${siteConfig.url}/en/blog`,
    title: "Blog - Swift Auto Import",
    description:
      "Guides on importing cars from the USA to Georgia: Copart/IAAI auctions, bidding strategies, shipping, timelines, customs, and best practices.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Blog - Swift Auto Import",
    description:
      "Guides on importing cars from the USA to Georgia: Copart/IAAI auctions, bidding strategies, shipping, timelines, customs, and best practices.",
  },
}

const formatDate = (s: string): string => {
  const parts = s.split("-")
  if (parts.length !== 3) return s
  const [y, m, d] = parts
  return `${d}.${m}.${y}`
}

export default function BlogIndexEnPage() {
  return (
    <div className="min-h-screen bg-neutral-50">
      <section className="py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-bold mb-8 text-center">Blog</h1>
          <div className="prose prose-neutral max-w-3xl mb-8 mx-auto text-center">
            <h2>What we cover</h2>
            <p>
              Practical guides to importing cars from the USA: Copart/IAAI auctions, bidding strategies, 
              shipping (inland and ocean), timelines and fees, customs and documentation. All articles are
              tailored to the Georgian market so you can make informed decisions and avoid extra costs.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {blogPostsEn.map((p) => (
              <Link
                key={p.slug}
                href={`/en/blog/${p.slug}`}
                className="group bg-white rounded-xl border border-neutral-200/70 shadow-sm hover:shadow-md transition-shadow overflow-hidden"
              >
                <div className="h-48 overflow-hidden bg-neutral-100">
                  <Image
                    src={p.image}
                    alt={p.title}
                    width={640}
                    height={256}
                    loading="lazy"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-5">
                  <div className="text-xs text-neutral-500 mb-2">{formatDate(p.date)}</div>
                  <h2 className="font-semibold text-lg mb-2 line-clamp-2">{p.title}</h2>
                  <p className="text-neutral-600 line-clamp-3">{p.excerpt}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
