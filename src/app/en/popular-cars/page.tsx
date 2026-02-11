import type { Metadata } from 'next'
import Link from 'next/link'
import Script from 'next/script'
import { siteConfig } from '@/lib/metadata'

export const metadata: Metadata = {
  title: 'Popular Cars – Swift Auto Import',
  description: 'Choose a price category and explore popular cars from US auctions: under $5k, $10k, $15k, and $20k.',
  alternates: {
    canonical: `${siteConfig.url}/en/popular-cars`,
    languages: {
      'x-default': `${siteConfig.url}/popularuli-manqanebi`,
      'ka-GE': `${siteConfig.url}/popularuli-manqanebi`,
      'en-US': `${siteConfig.url}/en/popular-cars`,
      'ru-RU': `${siteConfig.url}/ru/populyarnye-avto`,
    },
  },
}

const categories = [
  { slug: 'under-5000', label: 'Under $5,000', desc: 'Budget and economy picks' },
  { slug: 'under-10000', label: 'Under $10,000', desc: 'Best price/quality balance' },
  { slug: 'under-15000', label: 'Under $15,000', desc: 'Hybrids, sedans and crossovers' },
  { slug: 'under-20000', label: 'Under $20,000', desc: 'Newer model years and rich trims' },
]

export default function PopularCarsEnIndex() {
  return (
    <div className="min-h-screen bg-neutral-50">
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">Popular Cars</h1>
            <p className="text-neutral-600 text-lg">Choose your budget range</p>
          </div>

          <div className="prose prose-neutral mx-auto mb-10">
            <h2>Cars by price category</h2>
            <p>
              Pick the budget range and see the most popular models from US auctions (Copart, IAAI).
              You will find practical sedans, hybrids and SUVs for different budgets.
            </p>
            <p>
              For a quick all‑in estimate including transport and customs,
              use our <Link href="/en/auction-calculator" className="text-red-600 hover:text-red-700">auction calculator</Link>
              {' '}or <Link href="/en/contact" className="text-red-600 hover:text-red-700">contact us</Link>.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((c) => (
              <Link key={c.slug} href={`/en/popular-cars/${c.slug}`} className="block rounded-xl border border-neutral-200/80 bg-white p-6 hover:shadow-sm hover:border-red-200 transition-colors">
                <div className="text-2xl font-bold mb-2">{c.label}</div>
                <div className="text-sm text-neutral-600">{c.desc}</div>
              </Link>
            ))}
          </div>

          <div className="prose prose-neutral mx-auto mt-12">
            <h2>Frequently asked questions</h2>
            <details>
              <summary>Which range should I choose?</summary>
              <p>$5k: budget urban cars; $10k–$15k: hybrids/crossovers; $20k: newer years and richer trims.</p>
            </details>
            <details>
              <summary>How long does import take?</summary>
              <p>Typically 5–10 weeks from bidding to delivery in Tbilisi — varies by season.</p>
            </details>
            <details>
              <summary>Can I get an all‑in quote?</summary>
              <p>Yes — send us a VIN/link, city and budget; you’ll receive a detailed quote within 15–60 minutes.</p>
            </details>
          </div>
        </div>
      </section>
    </div>
  )
}
