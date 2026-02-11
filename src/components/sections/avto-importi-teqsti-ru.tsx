import { Truck, DollarSign, FileCheck, ShieldCheck } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

const services = [
  {
    icon: DollarSign,
    title: 'Подбор и покупка авто',
    description: <>Поможем выбрать <Link href="/ru/podderzhannye-avto" className="text-red-600 hover:text-red-700">б/у автомобиль</Link> и купить его на <Link href="/ru/aukciony-ssha" className="text-red-600 hover:text-red-700">аукционах США</Link>.</>,
    price: 'Комиссия: 0%'
  },
  {
    icon: Truck,
    title: 'Доставка',
    description: <>Организуем <Link href="/ru/avto-iz-ssha" className="text-red-600 hover:text-red-700">доставку из США</Link> с полной страховкой и GPS‑трекером.</>,
    price: 'От $1,500'
  },
  {
    icon: FileCheck,
    title: 'Таможня',
    description: 'Полное таможенное оформление, подготовка документов и регистрация в Грузии.',
    price: '0% + пошлины'
  },
  {
    icon: ShieldCheck,
    title: 'Гарантия и поддержка',
    description: 'Поддержка 24/7 на всех этапах. Прозрачные отчёты и документация.',
    price: 'Включено'
  }
]

export function ImportServicesSectionRu() {
  return (
    <section id="services" className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-4">
          Полный сервис импорта авто
        </h2>
        <p className="text-neutral-600 text-center mb-12 max-w-2xl mx-auto">
          Мы предлагаем <Link href="/ru/avto-iz-ssha" className="text-red-600 hover:text-red-700">доставку авто из США</Link> «под ключ» — от подбора до регистрации
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
              Узнать больше
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
