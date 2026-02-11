import type { Metadata } from 'next'
import { AuctionCalculatorEn } from '@/components/calculator/auction-calculator-en'
import Script from 'next/script'
import { siteConfig } from '@/lib/metadata'

export const metadata: Metadata = {
  title: 'Auction Calculator | Copart & IAAI | Swift Auto',
  description: 'Estimate auction surcharges for Copart and IAAI to plan your total budget more accurately.',
  alternates: {
    canonical: `${siteConfig.url}/en/auction-calculator`,
    languages: {
      'x-default': `${siteConfig.url}/auqcionis-kalkulatori`,
      'ka-GE': `${siteConfig.url}/auqcionis-kalkulatori`,
      'en-US': `${siteConfig.url}/en/auction-calculator`,
      'ru-RU': `${siteConfig.url}/ru/kalkulyator-aukciona`,
    },
  },
}

export default function CalculatorEnPage() {
  return (
    <main>
      <section className="pt-32 pb-16 bg-neutral-50">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-bold text-center mb-12">Auction Fee Calculator</h1>
          <div className="max-w-3xl mx-auto">
            <AuctionCalculatorEn />
          </div>
        </div>
      </section>

      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="prose prose-neutral max-w-3xl mx-auto">
            <h2>How it works</h2>
            <p>
              The calculator helps you estimate Copart and IAAI surcharges to derive a more realistic total price. It covers Buyer’s
              Premium, documentation fees, and other standard charges so you can better plan your budget.
            </p>
            <h3>What’s included and what may vary</h3>
            <ul>
              <li>Local taxes and storage/gate fees may vary by location.</li>
              <li>Inland transport, ocean freight, and customs are separate and quoted individually.</li>
            </ul>
            <h3>Example</h3>
            <p>
              If the final hammer price is $8,500, the calculator applies the appropriate grid to estimate the total. Use it to plan your budget.
            </p>
          </div>
        </div>
      </section>
    </main>
  )
}
