import { Car, Gavel, Ship } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

const services = [
  {
    icon: Car,
    title: 'ავტო იმპორტი',
    description: 'წვდომა ამერიკის წამყვან ავტო აუქციონებზე, როგორიცაა Copart, IAAI, Manheim და Adesa. ავტომობილების ფართო არჩევანი დეტალური ისტორით.',
    link: '/services',
  },
  {
    icon: Gavel,
    title: 'აუქციონში დახმარება',
    description: 'პროფესიონალური ბიდინგის სტრატეგია, ავტომობილის მდგომარეობის შეფასება და ფასების ანალიზი საუკეთესო გარიგების უზრუნველსაყოფად.',
    link: '/services',
  },
  {
    icon: Ship,
    title: 'ტრანსპორტირება და საბაჟო მომსახურება',
    description: 'ტრანსპორტირების სერვისი საქართველოში სრული საბაჟო მომსახურებითა და დოკუმენტაციის მართვით.',
    link: '/services',
  },
]

export function ServicesSection() {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-3xl font-bold mb-4">
            ჩვენი სერვისები
          </h2>
          <p className="text-neutral-600">
            თქვენზე მორგებული ავტომობილების იმპორტის სრულყოფილი მომსახურება
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className="flex flex-col p-6 bg-white rounded-lg shadow-sm border border-neutral-100"
            >
              <div className="p-3 bg-red-50 rounded-full w-fit">
                <service.icon className="w-6 h-6 text-red-600" />
              </div>
              
              <h3 className="text-xl font-semibold mt-4 mb-2">
                {service.title}
              </h3>
              
              <p className="text-neutral-600 flex-grow">
                {service.description}
              </p>
              
              <Button variant="ghost" className="mt-4 w-fit" asChild>
                <Link href={service.link}>
                  გაიგეთ მეტი
                </Link>
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
