import type { Metadata } from 'next'
import Link from 'next/link'
import { siteConfig } from '@/lib/metadata'

export const metadata: Metadata = {
  title: 'პოპულარული მანქანები – Swift Auto Import',
  description: 'აირჩიეთ ფასის კატეგორია და იხილეთ პოპულარული მანქანები ამერიკის აუქციონებიდან: $5,000-მდე, $10,000-მდე, $15,000-მდე და $20,000-მდე.',
  alternates: {
    canonical: `${siteConfig.url}/popularuli-manqanebi`,
  },
  openGraph: {
    type: 'website',
    url: `${siteConfig.url}/popularuli-manqanebi`,
    title: 'პოპულარული მანქანები – Swift Auto Import',
    description: 'აირჩიეთ ფასის კატეგორია და იხილეთ პოპულარული მანქანები ამერიკის აუქციონებიდან.',
  },
}

const categories = [
  { slug: '5000-mde', label: '$5,000-მდე', desc: 'ბიუჯეტური და ეკონომიური არჩევანი' },
  { slug: '10000-mde', label: '$10,000-მდე', desc: 'საუკეთესო თანაფარდობა ფასსა და ხარისხს შორის' },
  { slug: '15000-mde', label: '$15,000-მდე', desc: 'ჰიბრიდები, სედანები და ქროსოვერები' },
  { slug: '20000-mde', label: '$20,000-მდე', desc: 'ახალი წლოვანების მოდელები და მდიდარი კომპლექტაციები' },
]

export default function PopularuliIndexPage() {
  return (
    <div className="min-h-screen bg-neutral-50">
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">პოპულარული მანქანები</h1>
            <p className="text-neutral-600 text-lg">აირჩიეთ ფასის დიაპაზონი</p>
          </div>

          <div className="prose prose-neutral mx-auto mb-10">
            <h2>მანქანები ფასის კატეგორიებით</h2>
            <p>
              შეარჩიეთ თქვენთვის სასურველი ფასის დიაპაზონი და ნახეთ ყველაზე პოპულარული მოდელები
              ამერიკის აუქციონებიდან (Copart, IAAI). თითოეულ კატეგორიაში შეგხვდებათ
              პრაქტიკული სედანები, ჰიბრიდები და SUV-ები სხვადასხვა ბიუჯეტისთვის.
            </p>
            <p>
              თუ გჭირდებათ ზუსტი All‑In ბიუჯეტის გათვლა ტრანსპორტირებითა და განბაჟებით,
              გამოიყენეთ ჩვენი <Link href="/auqcionis-kalkulatori" className="text-red-600 hover:text-red-700">აუქციონის კალკულატორი</Link>
              ან <Link href="/contact" className="text-red-600 hover:text-red-700">დაგვიკავშირდით</Link>.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((c) => (
              <Link
                key={c.slug}
                href={`/popularuli-manqanebi/${c.slug}`}
                className="block rounded-xl border border-neutral-200/80 bg-white p-6 hover:shadow-sm hover:border-red-200 transition-colors"
              >
                <div className="text-2xl font-bold mb-2">{c.label}</div>
                <div className="text-sm text-neutral-600">{c.desc}</div>
              </Link>
            ))}
          </div>

          <div className="prose prose-neutral mx-auto mt-12">
            <h2>ხშირად დასმული კითხვები</h2>
            <details>
              <summary>რომელი დიაპაზონი შევარჩიო?</summary>
              <p>ბიუჯეტზე და საჭიროებებზეა დამოკიდებული: $5k-მდე — ეკონომიური ურბანული მოდელები, $10k–$15k — ჰიბრიდები/ქროსოვერები, $20k-მდე — ახალი წლოვანება და უკეთესი კომპლექტაციები.</p>
            </details>
            <details>
              <summary>რა დრო სჭირდება ჩამოყვანას?</summary>
              <p>სტანდარტულად 5–10 კვირა ბიდინგიდან თბილისში მიღებამდე — სეზონისა მიხედვით ცვალებადია.</p>
            </details>
            <details>
              <summary>შემიძლია მივიღო ზუსტი All‑In კოტირება?</summary>
              <p>დიახ — გამოგვიგზავნეთ VIN/ლინკი, ქალაქი და სასურველი ბიუჯეტი; 15–60 წუთში გამოგიგზავნით დეტალურ კოტირებას.</p>
            </details>
          </div>

          <div className="mt-12 text-center">
            <Link href="/contact" className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-red-600 text-white font-medium hover:bg-red-700 transition-colors">
              დაგვიკავშირდით კონსულტაციისთვის
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
