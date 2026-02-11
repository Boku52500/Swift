import { Truck, DollarSign, FileCheck, ShieldCheck } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

const services = [
  {
    icon: DollarSign,
    title: 'Vehicle selection and purchase',
    description: <>We help with <Link href="/en/used-cars" className="text-red-600 hover:text-red-700">used car</Link> selection and buying at <Link href="/en/us-auto-auctions" className="text-red-600 hover:text-red-700">US auto auctions</Link>.</>,
    price: 'Fee: 0%'
  },
  {
    icon: Truck,
    title: 'Transport',
    description: <><Link href="/en/cars-from-usa" className="text-red-600 hover:text-red-700">Transport from the USA</Link> with full insurance and GPS tracking.</>,
    price: 'From $1,500'
  },
  {
    icon: FileCheck,
    title: 'Customs clearance',
    description: 'Full customs brokerage, paperwork and registration in Georgia.',
    price: 'Fee: 0% + duty'
  },
  {
    icon: ShieldCheck,
    title: 'Warranty and support',
    description: '24/7 support at every step. Transparent reporting and documentation.',
    price: 'Included'
  }
]

export function ImportServicesSectionEn() {
  return (
    <section id="services" className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-4">
          Full car import service
        </h2>
        <p className="text-neutral-600 text-center mb-12 max-w-2xl mx-auto">
          We offer <Link href="/en/cars-from-usa" className="text-red-600 hover:text-red-700">car transport from the USA</Link> as a full service — from vehicle selection to registration
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {services.map((service) => (
            <div key={service.title} className="bg-white rounded-lg shadow-lg p-6">
              <service.icon className="w-12 h-12 text-red-600 mb-4" />
              <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
              <p className="text-neutral-600 mb-4">{service.description}</p>
              <p className="text-sm font-medium text-red-600">{service.price}</p>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Button asChild size="lg">
            <Link href="#contact">
              Contact our team
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
