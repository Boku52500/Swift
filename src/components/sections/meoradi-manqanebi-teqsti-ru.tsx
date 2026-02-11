import { Check, DollarSign, Car, ShieldCheck } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

const benefits = [
  {
    title: 'Низкие цены',
    description: <>Покупайте на <Link href="/ru/aukciony-ssha" className="text-red-600 hover:text-red-700">аукционах США</Link> автомобили на 30–40% дешевле</>,
    icon: DollarSign,
  },
  {
    title: 'Большой выбор',
    description: <>Выбирайте из 150,000+ авто и используйте наш сервис <Link href="/ru/import-avto" className="text-red-600 hover:text-red-700">импорта авто</Link></>,
    icon: Car,
  },
  {
    title: 'Прозрачная история',
    description: 'Полная VIN‑история и детальные записи аукциона по каждому авто',
    icon: Check,
  },
  {
    title: 'Гарантия качества',
    description: <>Опытная команда в <Link href="/ru/avto-iz-ssha" className="text-red-600 hover:text-red-700">доставке авто из США</Link></>,
    icon: ShieldCheck,
  },
]

export function UsedCarsBenefitsSectionRu() {
  return (
    <section id="benefits" className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold mb-8">Почему стоит покупать б/у авто из США?</h2>
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
            <Image src="/images/engine.jpg" alt="Б/у автомобили из США" fill className="object-cover" />
          </div>
        </div>
      </div>
    </section>
  )
}
