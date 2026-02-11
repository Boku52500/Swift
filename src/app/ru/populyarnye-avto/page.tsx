import type { Metadata } from 'next'
import Script from 'next/script'
import Link from 'next/link'
import { siteConfig } from '@/lib/metadata'

export const metadata: Metadata = {
  title: 'Популярные авто – Swift Auto Import',
  description: 'Выберите ценовую категорию и изучите популярные авто с аукционов США: до $5k, $10k, $15k и $20k.',
  alternates: {
    canonical: `${siteConfig.url}/ru/populyarnye-avto`,
    languages: {
      'x-default': `${siteConfig.url}/popularuli-manqanebi`,
      'ka-GE': `${siteConfig.url}/popularuli-manqanebi`,
      'en-US': `${siteConfig.url}/en/popular-cars`,
      'ru-RU': `${siteConfig.url}/ru/populyarnye-avto`,
    },
  },
}

const categories = [
  { slug: 'under-5000', label: 'До $5,000', desc: 'Бюджет и эконом' },
  { slug: 'under-10000', label: 'До $10,000', desc: 'Баланс цена/качество' },
  { slug: 'under-15000', label: 'До $15,000', desc: 'Гибриды, седаны и кроссоверы' },
  { slug: 'under-20000', label: 'До $20,000', desc: 'Более новые года и богатые комплектации' },
]

export default function PopularCarsRuIndex() {
  return (
    <div className="min-h-screen bg-neutral-50">
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">Популярные авто</h1>
            <p className="text-neutral-600 text-lg">Выберите диапазон бюджета</p>
          </div>

          <div className="prose prose-neutral mx-auto mb-10">
            <h2>Авто по ценовым категориям</h2>
            <p>
              Выберите бюджет и посмотрите популярные модели с аукционов США (Copart, IAAI). Вы найдёте практичные седаны, гибриды и кроссоверы на разный бюджет.
            </p>
            <p>
              Для быстрой оценки all‑in воспользуйтесь нашим <Link href="/ru/kalkulyator-aukciona" className="text-red-600 hover:text-red-700">калькулятором аукциона</Link>
              {' '}или <Link href="/ru/kontakty" className="text-red-600 hover:text-red-700">свяжитесь с нами</Link>.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((c) => (
              <Link key={c.slug} href={`/ru/populyarnye-avto/${c.slug}`} className="block rounded-xl border border-neutral-200/80 bg-white p-6 hover:shadow-sm hover:border-red-200 transition-colors">
                <div className="text-2xl font-bold mb-2">{c.label}</div>
                <div className="text-sm text-neutral-600">{c.desc}</div>
              </Link>
            ))}
          </div>
        </div>
      </section>
      <Script
        id="breadcrumb-popular-cars-ru"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            itemListElement: [
              { '@type': 'ListItem', position: 1, name: 'Главная', item: `${siteConfig.url}/ru` },
              { '@type': 'ListItem', position: 2, name: 'Популярные авто', item: `${siteConfig.url}/ru/populyarnye-avto` },
            ],
          }),
        }}
      />
    </div>
  )
}
