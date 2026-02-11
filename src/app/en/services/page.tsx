import { Car, Gavel, Ship, Clock, Shield, Users, ArrowRight } from 'lucide-react'
import Link from 'next/link'
import type { Metadata } from 'next'
import { siteConfig } from '@/lib/metadata'
import { ServiceSchema } from '@/components/seo/schemas'

export const metadata: Metadata = {
  title: 'Services | Swift Auto Import',
  description: 'Full services from car selection and bidding to transport, customs clearance, and delivery in Georgia.',
  alternates: {
    canonical: `${siteConfig.url}/en/services`,
    languages: {
      'x-default': `${siteConfig.url}/servisebi`,
      'ka-GE': `${siteConfig.url}/servisebi`,
      'en-US': `${siteConfig.url}/en/services`,
      'ru-RU': `${siteConfig.url}/ru/uslugi`,
    },
  },
}

const services = [
  {
    icon: Car,
    title: 'Car Import',
    description: 'Access to leading US auctions like Copart, IAAI, Manheim and Adesa. Wide selection with transparent history.',
    link: '/en/car-import'
  },
  {
    icon: Gavel,
    title: 'Auction Support',
    description: 'Professional bidding strategies, condition evaluation, and price analysis to secure the best deal.',
    link: '/en/us-auto-auctions'
  },
  {
    icon: Ship,
    title: 'Transport & Customs',
    description: 'Inland transport in Georgia with full customs support and documentation handling.',
    link: '/en/cars-from-usa'
  },
  {
    icon: Clock,
    title: '24/7 Support',
    description: 'Constant communication and assistance at every step. Service available in Georgian, English and Russian.'
  },
  {
    icon: Shield,
    title: 'Secure Transactions',
    description: 'Protected and transparent payment process, guaranteed service, and full accountability.'
  },
  {
    icon: Users,
    title: 'Personal Manager',
    description: 'Your dedicated advisor to help you choose wisely and manage the process.'
  }
]

export default function ServicesEnPage() {
  return (
    <main>
      <section className="pt-32 pb-16 bg-gradient-to-b from-neutral-50 to-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Our Services</h1>
            <p className="text-xl text-neutral-600">End-to-end service from selection to delivery</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div key={index} className="group relative bg-white rounded-xl overflow-hidden hover:bg-neutral-50 transition-colors border border-neutral-200/50 hover:border-red-200">
                <div className="p-8">
                  <div className="mb-6 inline-flex p-3 bg-red-50 rounded-lg text-red-600">
                    <service.icon className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">{service.title}</h3>
                  <p className="text-neutral-600 mb-6">{service.description}</p>
                  {service.link && (
                    <Link href={service.link} className="inline-flex items-center text-red-600 hover:text-red-700 font-medium group-hover:translate-x-1 transition-transform">
                      Explore {service.title}
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Link>
                  )}
                </div>
                <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-red-50 via-red-50/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            ))}
          </div>
        </div>
      </section>
      <ServiceSchema services={services.map(s => ({ title: s.title, description: s.description }))} />
    </main>
  )
}
