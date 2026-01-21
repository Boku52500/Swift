import { Truck, DollarSign, FileCheck, ShieldCheck } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

const services = [
  {
    icon: DollarSign,
    title: 'მანქანის შერჩევა და შეძენა',
    description: <>დაგეხმარებით <Link href="/meoradi-manqanebi" className="text-red-600 hover:text-red-700">მეორადი მანქანების</Link> შერჩევაში <Link href="/amerikis-avto-auqcioni" className="text-red-600 hover:text-red-700">ამერიკის ავტო აუქციონებზე</Link>.</>,
    price: 'საკომისიო: 0%'
  },
  {
    icon: Truck,
    title: 'გადაზიდვა',
    description: <><Link href="/manqanebi-amerikidan" className="text-red-600 hover:text-red-700">მანქანების ტრანსპორტირება ამერიკიდან</Link> სრული დაზღვევით და GPS თვალთვალით.</>,
    price: 'ფასი: $1,500-დან'
  },
  {
    icon: FileCheck,
    title: 'განბაჟება',
    description: 'სრული საბაჟო მომსახურება, დოკუმენტაციის მომზადება და რეგისტრაცია საქართველოში.',
    price: 'ფასი: 0% + გადასახადი'
  },
  {
    icon: ShieldCheck,
    title: 'გარანტია და მხარდაჭერა',
    description: '24/7 მხარდაჭერა პროცესის ყველა ეტაპზე. გამჭვირვალე ანგარიშგება და დოკუმენტაცია.',
    price: 'უფასო სერვისი'
  }
]

export function ImportServicesSection() {
  return (
    <section id="services" className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-4">
          სრული ავტო იმპორტის სერვისი
        </h2>
        <p className="text-neutral-600 text-center mb-12 max-w-2xl mx-auto">
          გთავაზობთ <Link href="/manqanebi-amerikidan" className="text-red-600 hover:text-red-700">მანქანების ჩამოყვანას ამერიკიდან</Link> სრულ მომსახურებას მანქანის შერჩევიდან რეგისტრაციამდე
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
              გაიგეთ მეტი
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
