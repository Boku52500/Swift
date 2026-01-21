"use client"

import { Car, Gavel, Ship, Clock, Shield, Users, ArrowRight } from 'lucide-react'
import Link from 'next/link'

const services = [
  {
    icon: Car,
    title: 'ავტო იმპორტი',
    description: 'წვდომა ამერიკის წამყვან ავტო აუქციონებზე, როგორიცაა Copart, IAAI, Manheim და Adesa. ავტომობილების ფართო არჩევანი დეტალური ისტორიით.',
    link: '/avto-importi'
  },
  {
    icon: Gavel,
    title: 'აუქციონზე დახმარება',
    description: 'პროფესიონალური ბიდინგის სტრატეგია, ავტომობილის მდგომარეობის შეფასება და ფასების ანალიზი საუკეთესო გარიგების უზრუნველსაყოფად.',
    link: '/amerikis-avto-auqcioni'
  },
  {
    icon: Ship,
    title: 'ტრანსპორტირება და განბაჟება',
    description: 'ტრანსპორტირების სერვისი საქართველოში სრული საბაჟო მომსახურებითა და დოკუმენტაციის მართვით.',
    link: '/manqanebi-amerikidan'
  },
  {
    icon: Clock,
    title: '24/7 მხარდაჭერა',
    description: 'მუდმივი კომუნიკაცია და დახმარება პროცესის ყველა ეტაპზე. მომსახურება ქართულ, ინგლისურ და რუსულ ენებზე.'
  },
  {
    icon: Shield,
    title: 'უსაფრთხო გარიგებები',
    description: 'დაცული და გამჭვირვალე გადახდის სისტემა, გარანტირებული მომსახურება და სრული ანგარიშვალდებულება.'
  },
  {
    icon: Users,
    title: 'პერსონალური მენეჯერი',
    description: 'თქვენი პირადი მრჩეველი, რომელიც დაგეხმარებათ სწორი არჩევანის გაკეთებაში და პროცესის მართვაში.'
  }
]

export default function ServicesPage() {
  return (
    <main>
      <section className="pt-32 pb-16 bg-gradient-to-b from-neutral-50 to-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              ჩვენი სერვისები
            </h1>
            <p className="text-xl text-neutral-600">
              სრული მომსახურება მანქანის შერჩევიდან ჩაბარებამდე
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div 
                key={index}
                className="group relative bg-white rounded-xl overflow-hidden hover:bg-neutral-50 transition-colors border border-neutral-200/50 hover:border-red-200"
              >
                <div className="p-8">
                  <div className="mb-6 inline-flex p-3 bg-red-50 rounded-lg text-red-600">
                    <service.icon className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">{service.title}</h3>
                  <p className="text-neutral-600 mb-6">{service.description}</p>
                  {service.link && (
                    <Link 
                      href={service.link}
                      className="inline-flex items-center text-red-600 hover:text-red-700 font-medium group-hover:translate-x-1 transition-transform"
                    >
                      დეტალურად
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
    </main>
  )
}
