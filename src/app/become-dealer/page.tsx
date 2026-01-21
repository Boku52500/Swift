"use client"

import { CheckCircle2, TrendingUp, BadgeCheck, Users2, Building2, Handshake } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

const benefits = [
  {
    icon: TrendingUp,
    title: 'მზარდი ბიზნესი',
    description: 'შემოუერთდით სწრაფად მზარდ ავტო იმპორტის ბაზარს და გახდით ჩვენი პარტნიორი.'
  },
  {
    icon: BadgeCheck,
    title: 'პროფესიონალური მხარდაჭერა',
    description: 'მიიღეთ სრული წვდომა ჩვენს პლატფორმაზე და ისარგებლეთ ექსპერტების დახმარებით.'
  },
  {
    icon: Users2,
    title: 'მომხმარებელთა ბაზა',
    description: 'წვდომა მყიდველების ფართო ქსელთან და მარკეტინგული მხარდაჭერა.'
  },
  {
    icon: Building2,
    title: 'ბიზნესის განვითარება',
    description: 'გაზარდეთ თქვენი ბიზნესი ჩვენი გამოცდილებისა და რესურსების გამოყენებით.'
  },
  {
    icon: CheckCircle2,
    title: 'გამჭვირვალე პირობები',
    description: 'მკაფიო და სამართლიანი პარტნიორობის პირობები, გამჭვირვალე ანგარიშსწორება.'
  },
  {
    icon: Handshake,
    title: 'მუდმივი თანამშრომლობა',
    description: 'გრძელვადიანი პარტნიორობა და ერთობლივი ზრდის შესაძლებლობები.'
  }
]

const steps = [
  {
    number: '01',
    title: 'დაგვიკავშირდით',
    description: 'შეავსეთ განაცხადი ან დაგვირეკეთ კონსულტაციისთვის'
  },
  {
    number: '02',
    title: 'გაიარეთ ტრენინგი',
    description: 'გაეცანით ჩვენს სისტემას და ბიზნეს პროცესებს'
  },
  {
    number: '03',
    title: 'გააფორმეთ ხელშეკრულება',
    description: 'დაიწყეთ თანამშრომლობა მკაფიო პირობებით'
  }
]

export default function BecomeDealerPage() {
  return (
    <main>
      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-gradient-to-b from-neutral-900 to-neutral-800 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              გახდი Swift Auto-ს დილერი
            </h1>
            <p className="text-xl text-neutral-200 mb-8">
              დაიწყეთ წარმატებული ბიზნესი ავტომობილების იმპორტის სფეროში
            </p>
            <Button asChild size="lg" className="bg-red-600 hover:bg-red-700">
              <Link href="#contact">
                დაიწყე ახლავე
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            უპირატესობები
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <div 
                key={index}
                className="p-6 bg-neutral-50 rounded-xl hover:shadow-lg transition-shadow"
              >
                <benefit.icon className="w-12 h-12 text-red-600 mb-4" />
                <h3 className="text-xl font-semibold mb-3">{benefit.title}</h3>
                <p className="text-neutral-600">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Steps Section */}
      <section className="py-16 bg-neutral-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            როგორ გახდეთ დილერი
          </h2>
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {steps.map((step, index) => (
                <div 
                  key={index}
                  className="relative p-6 bg-white rounded-xl shadow-md"
                >
                  <div className="text-4xl font-bold text-red-600/10 absolute top-4 right-4">
                    {step.number}
                  </div>
                  <h3 className="text-xl font-semibold mb-3">{step.title}</h3>
                  <p className="text-neutral-600">{step.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-8">
              დაიწყეთ თანამშრომლობა
            </h2>
            <p className="text-xl text-neutral-600 mb-8">
              დაგვიკავშირდით და გაიგეთ მეტი დილერობის პირობების შესახებ
            </p>
            <div className="space-y-4">
              <Button asChild size="lg" className="w-full md:w-auto">
                <Link href="tel:+995577908080" className="flex items-center justify-center gap-2">
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
                  </svg>
                  +995 577 90 80 80
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="w-full md:w-auto">
                <Link href="mailto:info@swiftauto.ge" className="flex items-center justify-center gap-2">
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                    <polyline points="22,6 12,13 2,6"/>
                  </svg>
                  info@swiftauto.ge
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
