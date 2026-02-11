import type { Metadata } from 'next'
import Link from 'next/link'
import Script from 'next/script'
import { siteConfig } from '@/lib/metadata'
import { ContactSectionRu } from '@/components/sections/contact-ru'
import { SocialMediaSectionRu } from '@/components/sections/social-media-ru'
import { CarsFromAmericaHeroSectionRu } from '@/components/sections/manqanebi-amerikidan-hero-ru'
import { PopularCarsShowcaseRu } from '@/components/sections/popular-cars-showcase-ru'
import { AutoDealerSchema } from '@/components/seo/auto-dealer-schema'

export const metadata: Metadata = {
  title: 'Автомобили из США | Импорт и доставка | Swift Auto',
  description: 'Подберём авто с прозрачной историей, проведём торги на Copart/IAAI, организуем доставку и таможню — выдача в Грузии.',
  alternates: {
    canonical: `${siteConfig.url}/ru/avto-iz-ssha`,
    languages: {
      'x-default': `${siteConfig.url}/manqanebi-amerikidan`,
      'ka-GE': `${siteConfig.url}/manqanebi-amerikidan`,
      'en-US': `${siteConfig.url}/en/cars-from-usa`,
      'ru-RU': `${siteConfig.url}/ru/avto-iz-ssha`,
    },
  },
}

export default function CarsFromUsaRu() {
  const schema = AutoDealerSchema()
  return (
    <>
      <CarsFromAmericaHeroSectionRu />
      <PopularCarsShowcaseRu />

      <section id="content" className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="prose prose-neutral max-w-4xl mx-auto">
            <h2>Автомобили из США — как мы работаем</h2>
            <p>
              Мы помогаем выбрать автомобиль с надёжной историей и документами, проводим торги, организуем внутреннюю доставку и контейнерную перевозку,
              оформляем таможню и торжественно выдаём автомобиль в Тбилиси.
            </p>
            <h2>Преимущества</h2>
            <ul>
              <li>Широкий выбор с аукционов Copart/IAAI</li>
              <li>Проверка VIN и тщательная оценка состояния</li>
              <li>Надёжная логистика и соблюдение сроков</li>
            </ul>
            <h2>Шаги</h2>
            <ol>
              <li>Консультация и бюджет</li>
              <li>Подбор/оценка и торги</li>
              <li>Доставка до порта и контейнерная перевозка</li>
              <li>Таможня и выдача</li>
            </ol>
            <p>
              Для оценки сборов используйте наш{' '}
              <Link href="/ru/kalkulyator-aukciona" className="text-red-600 hover:text-red-700">калькулятор аукциона</Link>{' '}
              и подробнее смотрите раздел{' '}
              <Link href="/ru/import-avto" className="text-red-600 hover:text-red-700">импорт авто</Link>.
            </p>
          </div>
        </div>
      </section>

      <section className="py-12 bg-neutral-50">
        <div className="container mx-auto px-4">
          <div className="prose prose-neutral max-w-4xl mx-auto">
            <h2>Структура расходов и виды доставки</h2>
            <ul>
              <li>Hammer price — выигрышная цена на аукционе.</li>
              <li>Сборы платформ — Buyer’s Premium, Internet Bid, Gate/Storage.</li>
              <li>Внутренняя доставка — от стоянки до порта.</li>
              <li>Морская перевозка — контейнер.</li>
              <li>Таможня и регистрация — по местным правилам.</li>
            </ul>
            <h3>Контейнерная перевозка — когда использовать?</h3>
            <p>
              Контейнер подходит для дорогих автомобилей, редких комплектаций и машин «не на ходу»: обеспечивает дополнительную защиту и предсказуемые сроки.
            </p>
            <h3>Документы</h3>
            <ul>
              <li>Title (Clean/Salvage/Rebuilt) — влияет на регистрацию.</li>
              <li>Bill of Sale — документ передачи собственности.</li>
              <li>Export Release — разрешение на экспорт из порта.</li>
            </ul>
            <h3>Сроки — типично</h3>
            <ol>
              <li>Подбор/торги — 3–10 дней</li>
              <li>Внутренняя доставка — 2–7 дней</li>
              <li>Контейнер — 4–8 недель</li>
              <li>Таможня/Выдача — 2–5 дней</li>
            </ol>
          </div>
        </div>
      </section>

      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="prose prose-neutral max-w-4xl mx-auto">
            <h2>Почему автомобили из США — разумный выбор</h2>
            <p>
              Американский рынок предлагает широкую комплектацию, прозрачные записи аукционов и развитую культуру обслуживания.
              Для покупателей в Грузии это часто означает лучшую ценность при правильной организации процесса — с понятным бюджетом
              и контейнерной доставкой по предсказуемому графику.
            </p>
            <ul>
              <li>Богатые опции безопасности и комфорта по сравнению с типичными европейскими аналогами того же года.</li>
              <li>Широкий выбор: седаны, кроссоверы и внедорожники, пикапы, гибриды и электромобили.</li>
              <li>Логистика в контейнере — защита и планируемость сроков.</li>
              <li>Полный след собственников и документов через Title и записи аукциона.</li>
            </ul>

            <h3>Кому подходит — профили покупателей</h3>
            <ul>
              <li><strong>Ежедневная езда с экономией</strong> — компактный седан/кроссовер с низкими расходами.</li>
              <li><strong>Семья</strong> — среднеразмерный SUV с системами безопасности, AWD и 3‑м рядом при необходимости.</li>
              <li><strong>Эффективность</strong> — гибрид/Plug‑in/EV с проверенной батареей.</li>
              <li><strong>Премиум</strong> — небольшой пробег, подтверждённая история, усиленная защита при перевозке.</li>
            </ul>

            <h2>Подробный бюджет — ориентиры</h2>
            <p>
              Мы разделяем бюджет на лоты и комиссии аукциона, внутреннюю доставку, контейнер, страхование, таможню/регистрацию и резерв.
              Ниже — типовые статьи (уточняйте расчёт под ваш случай):
            </p>
            <h3>Городской седан</h3>
            <ul>
              <li>Hammer + комиссии — зависит от модели/года/состояния.</li>
              <li>Внутренняя доставка — по штату и расстоянию.</li>
              <li>Контейнер — по порту, сезону и размеру.</li>
              <li>Страхование — покрытие визуальных/ДВС/трансмиссии опционально.</li>
              <li>Таможня/регистрация — по местным правилам.</li>
            </ul>
            <h3>Семейный SUV</h3>
            <p>Упор на безопасность, AWD и проверку силовой структуры; логистика/пошлины обычно выше, чем у седана.</p>
            <h3>Гибрид/EV</h3>
            <p>Диагностика батареи (пробег/возраст/сервис); нюансы погрузки/транспортировки в контейнере.</p>
            <h3>Премиум</h3>
            <p>Строгие критерии состояния, полный пакет документов; рекомендуем контейнер с усиленной фиксацией и защитой.</p>

            <h2>Управление рисками</h2>
            <ul>
              <li>Проверка статуса Title (Clean/Salvage/Rebuilt) и регистрационных последствий.</li>
              <li>Сверка VIN‑отчётов с фото и описанием.</li>
              <li>Понимание типов повреждений (перед/зад, подтопление, рама, град) и их влияния на бюджет.</li>
              <li>Контроль Storage/Gate через оперативную отгрузку после выигрыша.</li>
              <li>Окна бронирования контейнера и план‑B в высокий сезон.</li>
              <li>Предвалидация таможенных бумаг до прибытия.</li>
            </ul>

            <h2>Стратегия торгов — от консервативной до агрессивной</h2>
            <p>
              После short‑list согласуем три лимита (консервативный/рыночный/агрессивный) и тактику по платформе (pre‑bid vs live,
              шаги повышения), чтобы не выходить за запланированный all‑in бюджет.
            </p>

            <h2>Типичные сценарии и ошибки</h2>
            <ul>
              <li>Редкая комплектация без корректировки лимита — решается реалистичным диапазоном заранее.</li>
              <li>Недооценка расстояний по штатам — считаем маршруты и ставки заранее.</li>
              <li>Пропуск сроков хранения — быстрая отправка снижает лишние сборы.</li>
              <li>Недооценка скрытых повреждений — учитываем конструкцию и подвеску в смете.</li>
            </ul>

            <h2>Чек‑лист до покупки</h2>
            <ul>
              <li>Определите задачу (ежедневно, семья, работа, премиум) и ключевые опции.</li>
              <li>Задайте бюджетный коридор и согласуйте лимиты до торгов.</li>
              <li>Согласуйте целевые документы (тип Title, записи) и необходимость страховки.</li>
              <li>Уточните пожелания по срокам и гибкость графика контейнера.</li>
            </ul>

            <h2>Чек‑лист после прибытия</h2>
            <ul>
              <li>Передача документов, фото и сверка VIN с бумагами.</li>
              <li>Базовое ТО (жидкости, фильтры, шины) и развал‑схождение.</li>
              <li>Регистрация/номера и, при желании, детейлинг/ремонт.</li>
            </ul>

            <h2>Готовы начать?</h2>
            <p>
              Воспользуйтесь{' '}
              <Link href="/ru/kalkulyator-aukciona" className="text-red-600 hover:text-red-700">калькулятором аукциона</Link>{' '}
              для оценки сборов, изучите{' '}
              <Link href="/ru/import-avto" className="text-red-600 hover:text-red-700">импорт авто</Link>{' '}
              и{' '}
              <Link href="/ru/aukciony-ssha" className="text-red-600 hover:text-red-700">аукционы США</Link>{' '}
              и посмотрите{' '}
              <Link href="/ru/populyarnye-avto" className="text-red-600 hover:text-red-700">популярные авто</Link>{' '}
              чтобы уточнить shortlist. Мы подготовим прозрачный бюджет и график контейнерной доставки.
            </p>
          </div>
        </div>
      </section>

      <section className="py-12 bg-neutral-50">
        <div className="container mx-auto px-4">
          <div className="prose prose-neutral max-w-4xl mx-auto">
            <h2>Расширенный FAQ</h2>
            <details>
              <summary>Что влияет на стоимость внутренней доставки?</summary>
              <p>Штат отправки, маршруты, состояние авто (на ходу/не на ходу) и сезонность.</p>
            </details>
            <details>
              <summary>Почему лучше контейнер на океанском плече?</summary>
              <p>Предсказуемые графики и защита для дорогих или «не на ходу» авто; облегчает планирование при перегрузе портов.</p>
            </details>
            <details>
              <summary>Поможете с подбором запчастей?</summary>
              <p>Да, подскажем типовые слабые места и доступность деталей по популярным моделям США.</p>
            </details>
            <details>
              <summary>Есть ли услуга инспекции?</summary>
              <p>Возможна независимая инспекция на площадке аукциона по договорённости.</p>
            </details>
          </div>
        </div>
      </section>

      <ContactSectionRu />
      <SocialMediaSectionRu />

      <Script
        id="auto-dealer-schema-cars-usa-ru"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      <Script
        id="faq-schema-cars-usa-ru"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: [
              { '@type': 'Question', name: 'Сколько длится доставка?', acceptedAnswer: { '@type': 'Answer', text: 'Обычно 4–8 недель в зависимости от порта и сезона.' } },
              { '@type': 'Question', name: 'Как проверяется история автомобиля?', acceptedAnswer: { '@type': 'Answer', text: 'Мы используем официальные VIN‑сервисы и записи аукциона; по запросу доступна независимая инспекция.' } },
              { '@type': 'Question', name: 'Когда лучше использовать контейнер?', acceptedAnswer: { '@type': 'Answer', text: 'Для дорогих авто, редких комплектаций и машин «не на ходу» — предсказуемые сроки и дополнительная защита.' } },
              { '@type': 'Question', name: 'Можно ли скорректировать стратегию торгов?', acceptedAnswer: { '@type': 'Answer', text: 'Мы согласуем лимиты и стратегию под ваш бюджет и допустимые риски, чтобы получить оптимальную цену.' } },
              { '@type': 'Question', name: 'Можно ли организовать предосмотр?', acceptedAnswer: { '@type': 'Answer', text: 'Да, по договорённости можем организовать независимую инспекцию на площадке аукциона.' } },
              { '@type': 'Question', name: 'Как формируются платежи?', acceptedAnswer: { '@type': 'Answer', text: 'По этапам: сумма и сборы аукциона, внутренняя доставка, контейнер, затем таможня/регистрация.' } }
            ]
          })
        }}
      />

      <Script
        id="howto-cars-usa-ru"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'HowTo',
            name: 'Импорт авто из США — пошагово',
            description: 'Подбор, VIN‑проверки, торги, внутренняя логистика, контейнер и таможня в Грузии.',
            totalTime: 'P5W',
            step: [
              { '@type': 'HowToStep', name: 'Консультация', text: 'Определяем требования и бюджет.' },
              { '@type': 'HowToStep', name: 'Подбор', text: 'Фильтруем кандидатов, анализ фото и история VIN.' },
              { '@type': 'HowToStep', name: 'Торги', text: 'Участвуем с согласованным лимитом (Pre‑bid/Live).' },
              { '@type': 'HowToStep', name: 'Внутренняя доставка', text: 'Доставка лота со стоянки до порта.' },
              { '@type': 'HowToStep', name: 'Контейнер', text: 'Бронирование контейнера по графику и бюджету.' },
              { '@type': 'HowToStep', name: 'Таможня', text: 'Таможенные процедуры и регистрация в Грузии.' },
              { '@type': 'HowToStep', name: 'Выдача', text: 'Передача автомобиля с документами.' }
            ]
          })
        }}
      />

      <Script id="breadcrumb-cars-from-usa-ru" type="application/ld+json" dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'BreadcrumbList',
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Главная', item: `${siteConfig.url}/ru` },
            { '@type': 'ListItem', position: 2, name: 'Автомобили из США', item: `${siteConfig.url}/ru/avto-iz-ssha` },
          ],
        }),
      }} />
    </>
  )
}
