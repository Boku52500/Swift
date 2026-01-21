import { Check, DollarSign, Car, ShieldCheck } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

const benefits = [
  {
    title: 'დაბალი ფასები',
    description: <>შეიძინეთ <Link href="/amerikis-avto-auqcioni" className="text-red-600 hover:text-red-700">ამერიკის ავტო აუქციონებზე</Link> მანქანები 30-40%-ით იაფად</>,
    icon: DollarSign
  },
  {
    title: 'დიდი არჩევანი',
    description: <>შეარჩიეთ 150,000+ მანქანა და გამოიყენეთ ჩვენი <Link href="/avto-importi" className="text-red-600 hover:text-red-700">ავტო იმპორტის</Link> სერვისი</>,
    icon: Car
  },
  {
    title: 'გამჭვირვალე ისტორია',
    description: 'სრული Carfax ისტორია და დეტალური ინფორმაცია ყველა მანქანაზე',
    icon: Check
  },
  {
    title: 'ხარისხის გარანტია',
    description: <>გამოცდილი გუნდი <Link href="/manqanebi-amerikidan" className="text-red-600 hover:text-red-700">მანქანების ჩამოყვანაში ამერიკიდან</Link></>,
    icon: ShieldCheck
  }
]

export function UsedCarsBenefitsSection() {
  return (
    <section id="benefits" className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold mb-8">
              რატომ უნდა იყიდოთ მეორადი მანქანა ამერიკიდან?
            </h2>
            
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
            <Image
              src="/images/engine.jpg"
              alt="მეორადი მანქანები ამერიკიდან"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
