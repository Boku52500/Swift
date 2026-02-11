import { CheckCircle2, TrendingUp, BadgeCheck, Users2, Building2, Handshake } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import Script from 'next/script'
import type { Metadata } from 'next'
import { siteConfig } from '@/lib/metadata'

export const metadata: Metadata = {
  title: 'Become a Dealer | Swift Auto',
  description: 'Partner with us: access US auctions, platform support, logistics, and marketing to grow your car import business.',
  alternates: {
    canonical: `${siteConfig.url}/en/become-a-dealer`,
    languages: {
      'x-default': `${siteConfig.url}/gaxdi-dileri`,
      'ka-GE': `${siteConfig.url}/gaxdi-dileri`,
      'en-US': `${siteConfig.url}/en/become-a-dealer`,
      'ru-RU': `${siteConfig.url}/ru/stat-dilerom`,
    },
  },
}

const benefits = [
  { icon: TrendingUp, title: 'Growing market', description: 'Join the fast-growing car import market and become our partner.' },
  { icon: BadgeCheck, title: 'Professional support', description: 'Full access to our platform with expert assistance.' },
  { icon: Users2, title: 'Buyer network', description: 'Access to a broad network of buyers and marketing support.' },
  { icon: Building2, title: 'Business development', description: 'Grow your business leveraging our experience and resources.' },
  { icon: CheckCircle2, title: 'Transparent terms', description: 'Clear and fair partnership terms with transparent settlement.' },
  { icon: Handshake, title: 'Long-term cooperation', description: 'Sustainable partnership and joint growth opportunities.' },
]

const steps = [
  { number: '01', title: 'Contact us', description: 'Fill out the form or call for consultation' },
  { number: '02', title: 'Get training', description: 'Learn our system and business processes' },
  { number: '03', title: 'Sign agreement', description: 'Start cooperation on clear terms' },
]

export default function BecomeDealerEnPage() {
  return (
    <>
      <main>
        {/* Hero */}
        <section className="pt-32 pb-16 bg-gradient-to-b from-neutral-900 to-neutral-800 text-white">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">Become a Swift Auto Dealer</h1>
              <p className="text-xl text-neutral-200 mb-8">Start a successful business in car import</p>
              <Button asChild size="lg" className="bg-red-600 hover:bg-red-700">
                <Link href="#contact">Get started</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Benefits */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Benefits</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {benefits.map((b, i) => (
                <div key={i} className="p-6 bg-neutral-50 rounded-xl hover:shadow-lg transition-shadow">
                  <b.icon className="w-12 h-12 text-red-600 mb-4" />
                  <h3 className="text-xl font-semibold mb-3">{b.title}</h3>
                  <p className="text-neutral-600">{b.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* About */}
        <section className="py-16 bg-neutral-50">
          <div className="container mx-auto px-4">
            <div className="prose prose-neutral max-w-4xl mx-auto">
              <h2>Partner with Swift Auto — build for growth</h2>
              <p>Our dealership program helps you build a sustainable business in car imports. You’ll get platform access, training, marketing support, and reliable logistics — so you can start closing deals faster.</p>
              <h3>What you get</h3>
              <ul>
                <li>Access to Copart/IAAI with expert bidding support</li>
                <li>Fully documented processes and transparent settlement</li>
                <li>Marketing materials and lead generation support</li>
              </ul>
              <p>Start with a free consultation and learn how we can kickstart your presence in the local market.</p>
            </div>
          </div>
        </section>

        {/* Steps */}
        <section className="py-16 bg-neutral-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">How to become a dealer</h2>
            <div className="max-w-4xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {steps.map((s, i) => (
                  <div key={i} className="relative p-6 bg-white rounded-xl shadow-md">
                    <div className="text-4xl font-bold text-red-600/10 absolute top-4 right-4">{s.number}</div>
                    <h3 className="text-xl font-semibold mb-3">{s.title}</h3>
                    <p className="text-neutral-600">{s.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Contact */}
        <section id="contact" className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl font-bold mb-8">Start a partnership</h2>
              <p className="text-xl text-neutral-600 mb-8">Contact us and learn about dealer terms</p>
              <div className="space-y-4">
                <Button asChild size="lg" className="w-full md:w-auto">
                  <Link href="tel:+995577908080" className="flex items-center justify-center gap-2">+995 577 90 80 80</Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="w-full md:w-auto">
                  <Link href="mailto:info@swiftauto.ge" className="flex items-center justify-center gap-2">info@swiftauto.ge</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Script id="breadcrumb-dealer-en" type="application/ld+json" dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'BreadcrumbList',
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Home', item: `${siteConfig.url}/en` },
            { '@type': 'ListItem', position: 2, name: 'Become a Dealer', item: `${siteConfig.url}/en/become-a-dealer` },
          ],
        }),
      }} />
    </>
  )
}
