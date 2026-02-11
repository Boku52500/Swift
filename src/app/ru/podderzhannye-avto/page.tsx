import type { Metadata } from 'next'
import Link from 'next/link'
import Script from 'next/script'
import { siteConfig } from '@/lib/metadata'
import { ContactSectionRu } from '@/components/sections/contact-ru'
import { SocialMediaSectionRu } from '@/components/sections/social-media-ru'
import { UsedCarsHeroSectionRu } from '@/components/sections/meoradi-manqanebi-hero-ru'
import { UsedCarsBenefitsSectionRu } from '@/components/sections/meoradi-manqanebi-teqsti-ru'
import { AutoDealerSchema } from '@/components/seo/auto-dealer-schema'

export const metadata: Metadata = {
  title: 'Б/у автомобили из США | Выгодно | Swift Auto',
  description: 'Покупка б/у авто с аукционов США с прозрачной историей и лучшей ценой. Проверки, торги, логистика и таможня — всё под ключ.',
  alternates: {
    canonical: `${siteConfig.url}/ru/podderzhannye-avto`,
    languages: {
      'x-default': `${siteConfig.url}/meoradi-manqanebi`,
      'ka-GE': `${siteConfig.url}/meoradi-manqanebi`,
      'en-US': `${siteConfig.url}/en/used-cars`,
      'ru-RU': `${siteConfig.url}/ru/podderzhannye-avto`,
    },
  },
}

export default function UsedCarsRu() {
  const schema = AutoDealerSchema()
  return (
    <>
      <UsedCarsHeroSectionRu />
      <UsedCarsBenefitsSectionRu />
      <section id="content" className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="prose prose-neutral max-w-4xl mx-auto">
            <h2>Б/у авто из США — разумный выбор</h2>
            <p>
              Аукционы США предлагают автомобили с проверяемой историей по выгодным ценам. Swift Auto помогает проверять, торговаться,
              организует доставку и таможню — чтобы вы получили лучшую сделку под ваш бюджет.
            </p>
            <h2>Почему б/у?</h2>
            <ul>
              <li>Лучшее соотношение цена/качество</li>
              <li>Большой выбор годов и комплектаций</li>
              <li>Надёжные документы и история VIN</li>
            </ul>
            <h2>Как снизить риски</h2>
            <ul>
              <li>Глубокая проверка VIN и аукционных записей</li>
              <li>Оценка типов повреждений и бюджета ремонта заранее</li>
              <li>Дисциплина на торгах и резерв</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="py-12 bg-neutral-50">
        <div className="container mx-auto px-4">
          <div className="prose prose-neutral max-w-4xl mx-auto">
            <h2>Бюджет — ключевые статьи</h2>
            <ul>
              <li>Hammer price и сборы аукциона (Buyer’s Premium, Internet Bid)</li>
              <li>Внутренняя доставка до порта</li>
              <li>Морская перевозка — контейнер</li>
              <li>Таможенные платежи и регистрация в Грузии</li>
              <li>Резерв — 5–10% на непредвиденные</li>
            </ul>
            <h3>Сроки — типично</h3>
            <ol>
              <li>Подбор и торги — 3–10 дней</li>
              <li>Внутренняя доставка — 2–7 дней</li>
              <li>Контейнер — 4–8 недель</li>
              <li>Таможня/Выдача — 2–5 дней</li>
            </ol>
            <h3>Глоссарий</h3>
            <ul>
              <li>Run & Drive — заводится и едет на площадке</li>
              <li>Non‑Runner — неподвижен; нужен контейнер/спецпогрузка</li>
              <li>Buy It Now — покупка по фиксированной цене</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="py-12 bg-neutral-50">
        <div className="container mx-auto px-4">
          <div className="prose prose-neutral max-w-4xl mx-auto">
            <h2>Частые вопросы</h2>
            <details>
              <summary>Какой пробег/год оптимальны?</summary>
              <p>Часто оптимальны авто 5–8 лет со средним пробегом; зависит от марки/модели.</p>
            </details>
            <details>
              <summary>Можно ли восстановить повреждённые авто в Грузии?</summary>
              <p>Да, у нас есть проверённые партнёры, а бюджет восстановления планируем заранее.</p>
            </details>
            <details>
              <summary>Как проходят платежи?</summary>
              <p>Поэтапно: аукционные платежи, внутренняя доставка, контейнер, затем таможня/регистрация.</p>
            </details>
            <details>
              <summary>Clean vs Salvage Title?</summary>
              <p>Clean — без ограничений; Salvage — требуется восстановление и соблюдение правил.</p>
            </details>
          </div>
        </div>
      </section>

      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="prose prose-neutral max-w-4xl mx-auto">
            <h2>Почему б/у авто из США — выгодно для Грузии</h2>
            <p>
              Американские аукционы дают широкий выбор комплектаций, прозрачные записи и конкурентные цены. При грамотной проверке
              и контейнерной доставке итоговая стоимость часто оказывается ниже, чем на локальном рынке, при лучшем оснащении.
            </p>
            <ul>
              <li>Более богатые опции безопасности и комфорта.</li>
              <li>Большая линейка кузовов и силовых установок (включая гибриды/EV).</li>
              <li>Предсказуемость сроков благодаря контейнерам и заранее забронированным слотам.</li>
              <li>Понятная документальная история (Title, аукционные отчёты).</li>
            </ul>

            <h3>Кому подходит — профили</h3>
            <ul>
              <li><strong>Ежедневная эксплуатация</strong> — экономичный седан/кроссовер.</li>
              <li><strong>Семья</strong> — среднеразмерный SUV с ADAS и AWD.</li>
              <li><strong>Гибрид/EV</strong> — акцент на диагностике батареи.</li>
              <li><strong>Премиум</strong> — небольшой пробег, строгие критерии состояния и защита в контейнере.</li>
            </ul>

            <h2>Как мы снижаем риски</h2>
            <ul>
              <li>Сверяем VIN‑отчёты с фото и описанием.</li>
              <li>Оцениваем типы повреждений и бюджет восстановлений заранее.</li>
              <li>Управляем сборами хранения/гейта быстрой отправкой после выигрыша.</li>
              <li>Бронируем контейнеры с планом‑B на пиковые сезоны.</li>
              <li>Проверяем таможенные бумаги до прибытия.</li>
            </ul>

            <h2>Чек‑листы</h2>
            <h3>До покупки</h3>
            <ul>
              <li>Цели и требования (ежедневно/семья/премиум) и обязательные опции.</li>
              <li>Бюджетный коридор и лимиты для торгов.</li>
              <li>Целевые документы (тип Title) и страховка.</li>
            </ul>
            <h3>После прибытия</h3>
            <ul>
              <li>Сверка VIN с документами, фотофиксация.</li>
              <li>Базовое ТО и развал‑схождение.</li>
              <li>Регистрация и номера в Грузии.</li>
            </ul>

            <h2>Готовы начать?</h2>
            <p>
              Рассчитайте сборы в{' '}
              <Link href="/ru/kalkulyator-aukciona" className="text-red-600 hover:text-red-700">калькуляторе аукциона</Link>,
              изучите{' '}
              <Link href="/ru/avto-iz-ssha" className="text-red-600 hover:text-red-700">автомобили из США</Link>{' '}
              и{' '}
              <Link href="/ru/aukciony-ssha" className="text-red-600 hover:text-red-700">аукционы США</Link> — мы подготовим прозрачный бюджет и график контейнера.
            </p>
          </div>
        </div>
      </section>

      <ContactSectionRu />
      <SocialMediaSectionRu />

      <Script id="auto-dealer-schema-used-cars-ru" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />

      <Script id="faq-schema-used-cars-ru" type="application/ld+json" dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          mainEntity: [
            { '@type': 'Question', name: 'Какой пробег/год оптимальны?', acceptedAnswer: { '@type': 'Answer', text: 'Часто оптимальны авто 5–8 лет со средним пробегом; зависит от марки/модели.' } },
            { '@type': 'Question', name: 'Можно ли восстановить повреждённые авто в Грузии?', acceptedAnswer: { '@type': 'Answer', text: 'Да, у нас есть проверённые партнёры и план реалистичного бюджета/сроков.' } },
            { '@type': 'Question', name: 'Как проходят платежи?', acceptedAnswer: { '@type': 'Answer', text: 'Поэтапно: аукционные платежи, внутренняя доставка, контейнер, затем таможня/регистрация.' } },
            { '@type': 'Question', name: 'Clean vs Salvage Title?', acceptedAnswer: { '@type': 'Answer', text: 'Clean — регистрация без ограничений; Salvage — требуется восстановление и соблюдение правил.' } },
            { '@type': 'Question', name: 'VIN‑проверка и предосмотр?', acceptedAnswer: { '@type': 'Answer', text: 'Проверяем VIN по официальным сервисам; возможна независимая инспекция на площадке.' } },
            { '@type': 'Question', name: 'Как спланировать общий бюджет?', acceptedAnswer: { '@type': 'Answer', text: 'Учитывайте: hammer + комиссии + внутренняя доставка + контейнер + таможня/регистрация + 5–10% резерв.' } }
          ]
        })
      }} />

      <Script id="howto-used-cars-ru" type="application/ld+json" dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'HowTo',
          name: 'Покупка б/у авто на аукционе США — шаг за шагом',
          description: 'Подбор, VIN‑проверки, торги, внутренняя логистика, контейнер и регистрация в Грузии.',
          totalTime: 'P5W',
          step: [
            { '@type': 'HowToStep', name: 'Консультация', text: 'Определяем бюджет и требования.' },
            { '@type': 'HowToStep', name: 'Подбор', text: 'Фильтры, анализ фото, проверка VIN.' },
            { '@type': 'HowToStep', name: 'Торги', text: 'Участвуем в рамках согласованных лимитов (Pre‑bid/Live).' },
            { '@type': 'HowToStep', name: 'Внутренняя доставка', text: 'Перевозка лота со стоянки до порта.' },
            { '@type': 'HowToStep', name: 'Контейнер', text: 'Бронирование контейнера по графику и бюджету.' },
            { '@type': 'HowToStep', name: 'Таможня/Регистрация', text: 'Процедуры и постановка на учёт в Грузии.' },
            { '@type': 'HowToStep', name: 'Выдача', text: 'Передача автомобиля с документами.' }
          ]
        })
      }} />

      <Script id="breadcrumb-used-cars-ru" type="application/ld+json" dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'BreadcrumbList',
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Главная', item: `${siteConfig.url}/ru` },
            { '@type': 'ListItem', position: 2, name: 'Б/у автомобили', item: `${siteConfig.url}/ru/podderzhannye-avto` },
          ],
        }),
      }} />
    </>
  )
}
