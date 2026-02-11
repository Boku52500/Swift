import type { Metadata } from 'next'
import { AuctionCalculatorRu } from '@/components/calculator/auction-calculator-ru'
import Script from 'next/script'
import { siteConfig } from '@/lib/metadata'

export const metadata: Metadata = {
  title: 'Калькулятор сборов аукциона | Copart & IAAI | Swift Auto',
  description: 'Оцените сборы аукционов Copart и IAAI, чтобы точнее планировать общий бюджет.',
  alternates: {
    canonical: `${siteConfig.url}/ru/kalkulyator-aukciona`,
    languages: {
      'x-default': `${siteConfig.url}/auqcionis-kalkulatori`,
      'ka-GE': `${siteConfig.url}/auqcionis-kalkulatori`,
      'en-US': `${siteConfig.url}/en/auction-calculator`,
      'ru-RU': `${siteConfig.url}/ru/kalkulyator-aukciona`,
    },
  },
}

export default function CalculatorRuPage() {
  return (
    <main>
      <section className="pt-32 pb-16 bg-neutral-50">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-bold text-center mb-12">Калькулятор сборов аукциона</h1>
          <div className="max-w-3xl mx-auto">
            <AuctionCalculatorRu />
          </div>
        </div>
      </section>

      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="prose prose-neutral max-w-3xl mx-auto">
            <h2>Как это работает</h2>
            <p>
              Калькулятор помогает оценить дополнительные сборы Copart и IAAI, чтобы получить более реалистичную итоговую стоимость. Учитываются Buyer’s
              Premium, сборы за документы и другие стандартные платежи.
            </p>
            <h3>Что включено и что может отличаться</h3>
            <ul>
              <li>Местные налоги и Storage/Gate могут отличаться по локациям.</li>
              <li>Внутренняя доставка, морской фрахт и таможня считаются отдельно.</li>
            </ul>
            <h3>Пример</h3>
            <p>
              При hammer price $8,500 калькулятор применит соответствующую сетку для оценки общей суммы. Используйте его для планирования бюджета.
            </p>
          </div>
        </div>
      </section>

      <Script id="breadcrumb-calculator-ru" type="application/ld+json" dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'BreadcrumbList',
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Главная', item: `${siteConfig.url}/ru` },
            { '@type': 'ListItem', position: 2, name: 'Калькулятор аукциона', item: `${siteConfig.url}/ru/kalkulyator-aukciona` },
          ],
        }),
      }} />
    </main>
  )
}
