import { CheckCircle2, TrendingUp, BadgeCheck, Users2, Building2, Handshake } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import Script from 'next/script'
import type { Metadata } from 'next'
import { siteConfig } from '@/lib/metadata'

export const metadata: Metadata = {
  title: 'Стать дилером | Swift Auto',
  description: 'Партнёрство с нами: доступ к аукционам США, поддержка платформы, логистика и маркетинг для роста бизнеса.',
  alternates: {
    canonical: `${siteConfig.url}/ru/stat-dilerom`,
    languages: {
      'x-default': `${siteConfig.url}/gaxdi-dileri`,
      'ka-GE': `${siteConfig.url}/gaxdi-dileri`,
      'en-US': `${siteConfig.url}/en/become-a-dealer`,
      'ru-RU': `${siteConfig.url}/ru/stat-dilerom`,
    },
  },
}

const benefits = [
  { icon: TrendingUp, title: 'Растущий рынок', description: 'Присоединяйтесь к развивающемуся рынку импорта авто и станьте нашим партнёром.' },
  { icon: BadgeCheck, title: 'Профессиональная поддержка', description: 'Полный доступ к нашей платформе и помощь экспертов.' },
  { icon: Users2, title: 'Сеть покупателей', description: 'Доступ к широкой сети клиентов и маркетинговая поддержка.' },
  { icon: Building2, title: 'Развитие бизнеса', description: 'Растите с нашим опытом и ресурсами.' },
  { icon: CheckCircle2, title: 'Прозрачные условия', description: 'Понятные и честные условия партнёрства с прозрачными расчётами.' },
  { icon: Handshake, title: 'Долгосрочное сотрудничество', description: 'Стабильность и совместный рост.' },
]

const steps = [
  { number: '01', title: 'Свяжитесь с нами', description: 'Заполните форму или позвоните для консультации' },
  { number: '02', title: 'Пройдите обучение', description: 'Освойте систему и процессы' },
  { number: '03', title: 'Подпишите договор', description: 'Начните сотрудничество на понятных условиях' },
]

export default function BecomeDealerRuPage() {
  return (
    <>
      <main>
        {/* Hero */}
        <section className="pt-32 pb-16 bg-gradient-to-b from-neutral-900 to-neutral-800 text-white">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">Станьте дилером Swift Auto</h1>
              <p className="text-xl text-neutral-200 mb-8">Начните успешный бизнес в импорте авто</p>
              <Button asChild size="lg" className="bg-red-600 hover:bg-red-700">
                <Link href="#contact">Начать</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Benefits */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Преимущества</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {benefits.map((b, i) => (
                <div key={i} className="p-6 bg-neutral-50 rounded-xl hover:shadow-lg transition-shadow">
                  <b.icon className="w-12 h-12 text-red-600 mb-4" />
                  <h3 className="text-xl font-semibold mb-3">{b.title}</h3>
                  <p className="text-neutral-600">{b.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* About */}
        <section className="py-16 bg-neutral-50">
          <div className="container mx-auto px-4">
            <div className="prose prose-neutral max-w-4xl mx-auto">
              <h2>Партнёрство со Swift Auto — строим рост</h2>
              <p>Наша программа помогает выстроить устойчивый бизнес в импорте авто: доступ к платформе, обучение, маркетинговая поддержка и надёжная логистика — чтобы вы быстрее выходили на сделки.</p>
              <h3>Что вы получаете</h3>
              <ul>
                <li>Доступ к Copart/IAAI и поддержка торгов</li>
                <li>Документированные процессы и прозрачные расчёты</li>
                <li>Маркетинговые материалы и лидогенерация</li>
              </ul>
              <p>Начните с бесплатной консультации и узнайте, как выйти на местный рынок быстрее.</p>
            </div>
          </div>
        </section>

        {/* Steps */}
        <section className="py-16 bg-neutral-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Как стать дилером</h2>
            <div className="max-ww-4xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {steps.map((s, i) => (
                  <div key={i} className="relative p-6 bg-white rounded-xl shadow-md">
                    <div className="text-4xl font-bold text-red-600/10 absolute top-4 right-4">{s.number}</div>
                    <h3 className="text-xl font-semibold mb-3">{s.title}</h3>
                    <p className="text-neutral-600">{s.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Contact */}
        <section id="contact" className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl font-bold mb-8">Начать сотрудничество</h2>
              <p className="text-xl text-neutral-600 mb-8">Свяжитесь с нами и узнайте условия</p>
              <div className="space-y-4">
                <Button asChild size="lg" className="w-full md:w-auto">
                  <Link href="tel:+995577908080" className="flex items-center justify-center gap-2">+995 577 90 80 80</Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="w-full md:w-auto">
                  <Link href="mailto:info@swiftauto.ge" className="flex items-center justify-center gap-2">info@swiftauto.ge</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Script id="breadcrumb-dealer-ru" type="application/ld+json" dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'BreadcrumbList',
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Главная', item: `${siteConfig.url}/ru` },
            { '@type': 'ListItem', position: 2, name: 'Стать дилером', item: `${siteConfig.url}/ru/stat-dilerom` },
          ],
        }),
      }} />
    </>
  )
}
