"use client"

import { AuctionCalculator } from '@/components/calculator/auction-calculator'

export default function CalculatorPage() {
  return (
    <main>
      <section className="pt-32 pb-16 bg-neutral-50">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-bold text-center mb-12">
            აუქციონის დანამატის კალკულატორი
          </h1>
          <div className="max-w-3xl mx-auto">
            <AuctionCalculator />
          </div>
        </div>
      </section>
    </main>
  )
}
