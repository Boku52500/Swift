import { Check, DollarSign, Car, ShieldCheck } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

const benefits = [
  {
    title: 'Lower prices',
    description: <>Buy cars at <Link href="/en/us-auto-auctions" className="text-red-600 hover:text-red-700">US auto auctions</Link> 30–40% cheaper</>,
    icon: DollarSign,
  },
  {
    title: 'Large selection',
    description: <>Choose from 150,000+ vehicles and use our <Link href="/en/car-import" className="text-red-600 hover:text-red-700">car import</Link> service</>,
    icon: Car,
  },
  {
    title: 'Transparent history',
    description: 'Full VIN history and detailed auction records for every car',
    icon: Check,
  },
  {
    title: 'Quality assurance',
    description: <>Experienced team in <Link href="/en/cars-from-usa" className="text-red-600 hover:text-red-700">transport from the USA</Link></>,
    icon: ShieldCheck,
  },
]

export function UsedCarsBenefitsSectionEn() {
  return (
    <section id="benefits" className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold mb-8">Why buy a used car from the USA?</h2>
            <div className="space-y-6">
              {benefits.map((benefit) => (
                <div key={benefit.title} className="flex gap-4">
                  <div className="flex-shrink-0">
                    <benefit.icon className="w-6 h-6 text-red-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">{benefit.title}</h3>
                    <p className="text-neutral-600">{benefit.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative h-[400px] rounded-lg overflow-hidden">
            <Image src="/images/engine.jpg" alt="Used cars from the USA" fill className="object-cover" />
          </div>
        </div>
      </div>
    </section>
  )
}
