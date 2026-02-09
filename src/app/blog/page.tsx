import Link from 'next/link'
import Script from 'next/script'
import Image from 'next/image'
import { Metadata } from 'next'
import { blogPosts } from '@/data/blog'
import { siteConfig } from '@/lib/metadata'

export const metadata: Metadata = {
  title: 'ბლოგი - Swift Auto Import',
  description: 'მანქანის იმპორტი ამერიკიდან, Copart/IAAI აუქციონები, ტრანსპორტირება, განბაჟება და საუკეთესო პრაქტიკები — ჩვენი დეტალური ბლოგ სტატიები.',
  alternates: { canonical: `${siteConfig.url}/blog`, languages: { 'x-default': `${siteConfig.url}/blog`, 'ka-GE': `${siteConfig.url}/blog` } },
  robots: { index: true, follow: true },
  openGraph: {
    type: 'website',
    url: `${siteConfig.url}/blog`,
    title: 'ბლოგი - Swift Auto Import',
    description: 'მანქანის იმპორტი ამერიკიდან, Copart/IAAI აუქციონები, ტრანსპორტირება, განბაჟება და საუკეთესო პრაქტიკები — ჩვენი დეტალური ბლოგ სტატიები.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ბლოგი - Swift Auto Import',
    description: 'მანქანის იმპორტი ამერიკიდან, Copart/IAAI აუქციონები, ტრანსპორტირება, განბაჟება და საუკეთესო პრაქტიკები — ჩვენი დეტალური ბლოგ სტატიები.',
  },
}

// Deterministic date formatting to avoid SSR/CSR locale mismatches
const formatDate = (s: string): string => {
  const parts = s.split('-')
  if (parts.length !== 3) return s
  const [y, m, d] = parts
  return `${d}.${m}.${y}`
}

export default function BlogIndexPage() {
  return (
    <div className="min-h-screen bg-neutral-50">
      <section className="py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-bold mb-8 text-center">ბლოგი</h1>
          <div className="prose prose-neutral max-w-3xl mb-8 mx-auto text-center">
            <h2>რას განვიხილავთ</h2>
            <p>
              აქ იპოვით პრაქტიკულ გზამკვლევებს მანქანის იმპორტზე ამერიკიდან: Copart/IAAI აუქციონები, ბიდინგის სტრატეგიები,
              ტრანსპორტირება/კონტეინერი, ვადები და საკომისიოები, საბაჟო და დოკუმენტაცია. ყველა სტატია დაწერილია
              ქართულ ბაზარზე მორგებული მაგალითებით და რეალური პროცესებით, რათა მიიღოთ სწორი გადაწყვეტილება
              და თავიდან აიცილოთ ზედმეტი ხარჯი.
            </p>
            <p>
              სწრაფი გამოთვლისთვის გამოიყენეთ ჩვენი{' '}
              <Link href="/auqcionis-kalkulatori" className="text-red-600 hover:text-red-700">აუქციონის კალკულატორი</Link>{' '}
              ან{' '}
              <Link href="/contact" className="text-red-600 hover:text-red-700">დაგვიკავშირდით</Link>{' '}
              და 15–60 წუთში მიიღებთ ინდივიდუალურ კოტირებას.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {blogPosts.map((p) => (
              <Link key={p.slug} href={`/blog/${p.slug}`} className="group bg-white rounded-xl border border-neutral-200/70 shadow-sm hover:shadow-md transition-shadow overflow-hidden">
                <div className="h-48 overflow-hidden bg-neutral-100">
                  <Image src={p.image} alt={p.title} width={640} height={256} loading="lazy" sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw" className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-300" />
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
