import type { Metadata } from 'next'
import Link from 'next/link'
import Script from 'next/script'
import Image from 'next/image'
import { Shield, Search, DollarSign, Clock } from 'lucide-react'
import { siteConfig } from '@/lib/metadata'
import { ContactSectionRu } from '@/components/sections/contact-ru'
import { SocialMediaSectionRu } from '@/components/sections/social-media-ru'
import { AutoDealerSchema } from '@/components/seo/auto-dealer-schema'

export const metadata: Metadata = {
  title: 'Аукционы США | Copart & IAAI | Swift Auto',
  description: 'Покупка авто на аукционах США с экспертной поддержкой. ✓ Copart ✓ IAAI ✓ Прозрачный процесс от торгов до выдачи в Грузии.',
  alternates: {
    canonical: `${siteConfig.url}/ru/aukciony-ssha`,
    languages: {
      'x-default': `${siteConfig.url}/amerikis-avto-auqcioni`,
      'ka-GE': `${siteConfig.url}/amerikis-avto-auqcioni`,
      'en-US': `${siteConfig.url}/en/us-auto-auctions`,
      'ru-RU': `${siteConfig.url}/ru/aukciony-ssha`,
    },
  },
}

export default function UsAutoAuctionsRuPage() {
  const schema = AutoDealerSchema()
  return (
    <>
      <main>
        {/* Hero */}
        <section className="relative bg-neutral-900 text-white">
          <div className="absolute inset-0">
            <Image src="/images/auto-auqcioni-hero.jpg" alt="Аукционы США - Copart & IAAI" fill priority quality={90} sizes="(max-width: 1024px) 100vw, 1920px" className="object-cover" />
            <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-transparent" />
          </div>
          <div className="relative container mx-auto px-4 py-24 md:py-32">
            <div className="max-w-3xl space-y-6">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold">Аукционы США</h1>
              <p className="text-xl md:text-2xl text-neutral-200">Доступ к Copart и IAAI. Лучшая цена с профессиональной поддержкой.</p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="#contact" className="inline-flex items-center justify-center rounded-md bg-red-600 hover:bg-red-700 px-6 py-3 text-white font-medium">Связаться</Link>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Почему выбрать наш аукционный сервис</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="text-center space-y-4">
                <div className="w-16 h-16 mx-auto bg-red-100 rounded-full flex items-center justify-center">
                  <Search className="w-8 h-8 text-red-600" />
                </div>
                <h3 className="text-xl font-semibold">Доступ ко всем аукционам</h3>
                <p className="text-neutral-600">
                  Доступ к <Link href="/ru/aukciony-ssha" className="text-red-600 hover:text-red-700">аукционам США</Link>, включая Copart и IAAI
                </p>
              </div>

              <div className="text-center space-y-4">
                <div className="w-16 h-16 mx-auto bg-red-100 rounded-full flex items-center justify-center">
                  <DollarSign className="w-8 h-8 text-red-600" />
                </div>
                <h3 className="text-xl font-semibold">Лучшие цены</h3>
                <p className="text-neutral-600">
                  <Link href="/ru/podderzhannye-avto" className="text-red-600 hover:text-red-700">Б/у автомобили</Link> по оптимальной цене с профессиональными торгами
                </p>
              </div>

              <div className="text-center space-y-4">
                <div className="w-16 h-16 mx-auto bg-red-100 rounded-full flex items-center justify-center">
                  <Shield className="w-8 h-8 text-red-600" />
                </div>
                <h3 className="text-xl font-semibold">Безопасные сделки</h3>
                <p className="text-neutral-600">
                  Прозрачность и страховка операций через наш сервис <Link href="/ru/import-avto" className="text-red-600 hover:text-red-700">импорта авто</Link>
                </p>
              </div>

              <div className="text-center space-y-4">
                <div className="w-16 h-16 mx-auto bg-red-100 rounded-full flex items-center justify-center">
                  <Clock className="w-8 h-8 text-red-600" />
                </div>
                <h3 className="text-xl font-semibold">Быстрый сервис</h3>
                <p className="text-neutral-600">
                  <Link href="/ru/avto-iz-ssha" className="text-red-600 hover:text-red-700">Доставка из США</Link> с поддержкой 24/7
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-12 bg-white">
          <div className="container mx-auto px-4">
            <div className="prose prose-neutral max-w-4xl mx-auto">
              <h2>Как это работает</h2>
              <p>
                Swift Auto Import помогает выгодно покупать авто на Copart и IAAI и безопасно доставлять их в Грузию. Мы ведём полный цикл: проверки и подбор, торги, внутренняя логистика, контейнер, таможня и выдача в Тбилиси.
              </p>
              <h3>Почему аукционы?</h3>
              <ul>
                <li>Широкий выбор и прозрачная история VIN</li>
                <li>Конкурентные цены на открытых торгах</li>
                <li>Полная документальная прозрачность</li>
              </ul>
              <h3>Пошаговый план</h3>
              <ol>
                <li>Консультация и бюджет</li>
                <li>Подбор и оценка</li>
                <li>Торги и покупка</li>
                <li>Внутренняя доставка и контейнер</li>
                <li>Таможня в Грузии и выдача</li>
              </ol>
              <p>
                Хотите увидеть весь процесс импорта? Перейдите в раздел <Link href="/ru/import-avto" className="text-red-600 hover:text-red-700">Импорт авто</Link>.
              </p>
            </div>
          </div>
        </section>

        <section className="py-12 bg-neutral-50">
          <div className="container mx-auto px-4">
            <div className="prose prose-neutral max-w-4xl mx-auto">
              <h2>Состав расходов и типы торгов</h2>
              <ul>
                <li>Hammer price — цена продажи + сборы платформы</li>
                <li>Buyer’s Premium/Internet Bid — стандартные сборы</li>
                <li>Gate/Storage — по локациям</li>
                <li>Внутренняя доставка — от стоянки до порта</li>
                <li>Контейнер — предсказуемые сроки/бюджет/защита</li>
                <li>Таможня и регистрация — по местным правилам</li>
              </ul>
              <h3>Документы и соответствие</h3>
              <ul>
                <li>Типы тайтлов — Clean/Salvage/Rebuilt: по‑разному влияют на регистрацию/стоимость</li>
                <li>Bill of Sale, Export Release — для экспорта и подтверждения собственности</li>
              </ul>
              <h3>Стратегия торгов</h3>
              <ul>
                <li>Лимит ставок — учитывайте сборы платформ</li>
                <li>Pre-bid vs Live — активность/конкуренция</li>
                <li>Buy It Now — быстро, по справедливой цене</li>
              </ul>
              <h3>Типичные сроки</h3>
              <ol>
                <li>Подбор/Торги — 3–10 дней</li>
                <li>Внутренняя доставка — 2–7 дней</li>
                <li>Контейнер — 4–8 недель</li>
                <li>Таможня/Регистрация — 2–5 дней</li>
              </ol>
            </div>
          </div>
        </section>

        <section className="py-12 bg-neutral-50">
          <div className="container mx-auto px-4">
            <div className="prose prose-neutral max-w-4xl mx-auto">
              <h2>Частые вопросы</h2>
              <details>
                <summary>Сколько длится процесс?</summary>
                <p>Обычно 4–8 недель в зависимости от локации и графика контейнеров.</p>
              </details>
              <details>
                <summary>Можно ли покупать битые авто?</summary>
                <p>Да. Мы оцениваем состояние и риски как по Run & Drive, так и по Salvage.</p>
              </details>
              <details>
                <summary>Как считается итоговый бюджет?</summary>
                <p>Hammer + сборы платформ + внутренняя доставка + контейнер + таможня. См. наш <Link href="/ru/kalkulyator-aukciona" className="text-red-600 hover:text-red-700">калькулятор аукциона</Link>.</p>
              </details>
            </div>
          </div>
        </section>

        <section className="py-12 bg-white">
          <div className="container mx-auto px-4">
            <div className="prose prose-neutral max-w-4xl mx-auto">
              <h2>Глубокий гид — как подготовиться к торгам</h2>
              <p>
                Успех на аукционах начинается с чёткого сценария использования, дисциплины в бюджете и тщательных проверок. Определяем
                must‑have опции (пакеты безопасности, привод, пробег), фиксируем жёсткий лимит с учётом всех сборов платформы и
                сверяем VIN‑историю, фото и аукционные записи, чтобы избежать скрытых рисков.
              </p>
              <h3>Что анализируем в фото и записях</h3>
              <ul>
                <li>Зазоры панелей, совпадение окраса, признаки flood/hail/theft recovery.</li>
                <li>Крепления/лонжероны/подрамники, бамперы, элементы днища.</li>
                <li>Салон, подушки безопасности, запахи, следы воды.</li>
                <li>Косвенные признаки по ДВС/КПП — подтёки/пена/маскировка дефектов.</li>
                <li>Соответствие статуса Run & Drive/Non‑Runner описанию.</li>
              </ul>

              <h3>Стратегии торгов</h3>
              <ul>
                <li>Pre‑bid — оцениваем интерес; не раскрываем максимум заранее.</li>
                <li>Live — строго держимся согласованного лимита (включая все сборы).</li>
                <li>Buy It Now — только при объективно честной цене и дефиците времени.</li>
                <li>Тип продавца — институциональные/ликвидаторы обычно предсказуемее.</li>
              </ul>

              <h3>Управление рисками</h3>
              <ul>
                <li>Независимая инспекция для дорогих лотов.</li>
                <li>Снижение Gate/Storage — быстрый вывоз и предварительное бронирование контейнера.</li>
                <li>Проверка документов (Title/Bill of Sale/Export Release) до отправки.</li>
              </ul>

              <h3>Примеры бюджета (структура)</h3>
              <p>
                Hammer Price + Buyer’s Premium/Internet Bid + Gate/Storage (если есть) + внутренняя доставка + контейнер + таможня/регистрация + 5–10% резерв.
                Для детальной оценки используйте наш <Link href="/ru/kalkulyator-aukciona" className="text-red-600 hover:text-red-700">калькулятор аукциона</Link>.
              </p>

              <h3>Профили покупателей</h3>
              <ul>
                <li><strong>Ежедневная эксплуатация</strong> — экономичный седан/кроссовер; контейнер для предсказуемых сроков.</li>
                <li><strong>Семья</strong> — 5–7 мест, ADAS, при необходимости AWD; защищённая доставка в контейнере.</li>
                <li><strong>Премиум</strong> — малый пробег, строгие критерии состояния; контейнер обязателен.</li>
                <li><strong>EV/Гибрид</strong> — диагностика батареи; температурные режимы в пути.</li>
              </ul>

              <h3>Чек‑лист перед торгами</h3>
              <ul>
                <li>Полные VIN‑проверки (Carfax/Autocheck или эквивалент) + анализ фото.</li>
                <li>Жёсткий бюджетный лимит с учётом всех сборов.</li>
                <li>Предварительное бронирование контейнера и согласование внутренней логистики.</li>
                <li>Учёт потенциальных сборов на стоянке/в порту (Gate/Storage).</li>
              </ul>

              <h3>Следующий шаг</h3>
              <p>
                Перейдите в разделы <Link href="/ru/avto-iz-ssha" className="text-red-600 hover:text-red-700">Авто из США</Link> и
                <Link href="/ru/podderzhannye-avto" className="text-red-600 hover:text-red-700"> Б/у автомобили</Link>, затем свяжитесь с нами —
                подготовим план торгов, график контейнера и прозрачный бюджет под ваши цели.
              </p>
            </div>
          </div>
        </section>

        <section className="py-12 bg-neutral-50">
          <div className="container mx-auto px-4">
            <div className="prose prose-neutral max-w-4xl mx-auto">
              <h2>Частые ошибки и как их избежать</h2>
              <ul>
                <li>Эмоциональные Live‑ставки — держим дисциплину и заранее согласованный лимит.</li>
                <li>Несоответствие документов — заранее проверяем требования по Title/Export Release.</li>
                <li>Задержки логистики — бронируем слот контейнера заранее и синхронизируем внутреннюю доставку.</li>
                <li>Пропуск инспекции — для дорогих лотов организуем независимую проверку.</li>
              </ul>
              <h3>Нужна консультация?</h3>
              <p>
                Напишите нам — бесплатно подготовим план торгов, график контейнера и прозрачный бюджет по этапам.
              </p>
            </div>
          </div>
        </section>

        <section className="py-12 bg-white">
          <div className="container mx-auto px-4">
            <div className="prose prose-neutral max-w-4xl mx-auto">
              <h2>Платформы — глубокое сравнение Copart vs IAAI</h2>
              <p>
                Обе платформы работают по прозрачным правилам и с VIN‑записями, но различаются категориями, типами площадок,
                структурой комиссий и режимами торгов. У Copart чаще встречаются лоты «Run & Drive»; IAAI даёт более стабильные цены
                в ряде локаций. «Buy It Now» уместен при объективно честной цене — фактор времени критичен.
              </p>
              <ul>
                <li>Документация — Title/Bill of Sale/Export Release: сроки зависят от локации.</li>
                <li>Тип продавца — дилеры/финансовые компании чаще предсказуемее управляют рисками.</li>
                <li>Режимы торгов — Pre‑bid/Live; корректный лимит учитывает все сборы платформ и внутреннюю доставку.</li>
                <li>On‑Approval — подтверждение продавца может потребоваться для финальной цены.</li>
              </ul>

              <h2>Процесс загрузки — упаковка, погрузка, мониторинг</h2>
              <p>
                Слот контейнера планируем заранее, чтобы получить предсказуемые сроки и снизить Gate/Storage. До погрузки делаем фото/видео,
                при необходимости усиливаем креплениями (straps, bracing) для снижения рисков в пути. После загрузки делимся трекингом.
              </p>
              <ol>
                <li>Бронирование — по графику.</li>
                <li>Синхронизация внутренней доставки — со стоянки в порт вовремя.</li>
                <li>Погрузка и фиксация — по протоколам безопасности.</li>
                <li>Трекинг — делимся прогрессом.</li>
              </ol>

              <h2>Безопасность и страховка</h2>
              <p>
                Для дорогих лотов предлагаем расширенную страховку и, при необходимости, независимую инспекцию. Документы проверяем до
                отправки, чтобы избежать задержек на таможне. По контейнеру обеспечиваем прозрачность — фото, трекинг и ETA заранее.
              </p>

              <h2>Примеры бюджета — три сценария</h2>
              <ul>
                <li><strong>Эконом</strong> — компактный седан/кроссовер, базовое оснащение; акцент на более низкий Hammer.</li>
                <li><strong>Средний</strong> — семейный SUV с пакетами безопасности (ADAS), малый пробег; баланс цены и комфорта.</li>
                <li><strong>Премиум</strong> — меньший пробег, строгая инспекция; контейнер рекомендуем для максимальной защиты.</li>
              </ul>
              <p>
                Во всех сценариях структура такова: цена аукциона + сборы платформы + Gate/Storage (по локации) + внутренняя доставка +
                контейнер + таможня/регистрация + 5–10% резерв. Для расчёта воспользуйтесь
                {' '}<Link href="/ru/kalkulyator-aukciona" className="text-red-600 hover:text-red-700">калькулятором аукциона</Link>.
              </p>

              <h2>Вопросы дилеру</h2>
              <ul>
                <li>Когда был последний сервис и есть ли записи?</li>
                <li>Есть ли по фото/записям признаки воды/града/угонного прошлого?</li>
                <li>Возможна ли независимая предынспекция?</li>
                <li>Какая ориентировочная цена/сроки по внутренней доставке с этой площадки?</li>
                <li>Какой порт/график контейнера оптимален для текущего периода?</li>
              </ul>

              <h2>Следующие шаги</h2>
              <p>
                Перейдите в разделы <Link href="/ru/avto-iz-ssha" className="text-red-600 hover:text-red-700">Авто из США</Link>,
                {' '}<Link href="/ru/podderzhannye-avto" className="text-red-600 hover:text-red-700">Б/у автомобили</Link>
                {' '}и <Link href="/ru/import-avto" className="text-red-600 hover:text-red-700">Импорт авто</Link>; далее свяжитесь с нами — согласуем бюджет,
                стратегию торгов и график контейнера под ваши цели.
              </p>
            </div>
          </div>
        </section>

        <section className="py-12 bg-white">
          <div className="container mx-auto px-4">
            <div className="prose prose-neutral max-w-4xl mx-auto">
              <h2>Категории, статусы и поля лота</h2>
              <p>
                Корректная интерпретация терминов важна. «Run & Drive» — авто запускается и едет по площадке; «Engine Start Program/Starts» —
                двигатель запускается, но авто не движется; «Stationary/Non‑Runner» — не движется и требует спецпогрузки или контейнера.
                Обращайте внимание на: Primary/Secondary Damage, Keys: Yes/No, Odometer: Actual/Not Actual/Exempt.
              </p>
              <h3>VIN‑декодинг и источники истории</h3>
              <ul>
                <li>VIN‑декодер — базовая комплектация/двигатель/трансмиссия.</li>
                <li>Проверка истории — Carfax/Autocheck.</li>
                <li>Сравнение фото/записей — соответствие описанию.</li>
              </ul>

              <h2>Таможня и регистрация в Грузии — практический гид</h2>
              <ol>
                <li>Получение документов — Title/Bill of Sale/Export Release и инвойс.</li>
                <li>Расчёт пошлин — предварительным калькулятором.</li>
                <li>Таможенное оформление — по правилам и срокам.</li>
                <li>Регистрация — техосмотр и номера при необходимости.</li>
              </ol>
              <p>
                Планируем шаги заранее, чтобы по прибытии контейнера минимизировать задержки и лишние расходы.
              </p>

              <h2>Нюансы выбора — как избежать лишних рисков</h2>
              <ul>
                <li>Для одной модели сравните несколько локаций/аукционов для бенчмарка цен.</li>
                <li>Ищите старые фото/объявления по тому же VIN в интернете.</li>
                <li>Не повышайте лимит в Live эмоционально — если максимум задан, держитесь его.</li>
              </ul>
            </div>
          </div>
        </section>

        <ContactSectionRu />
        <SocialMediaSectionRu />
      </main>

      <Script id="auto-dealer-schema-auction-ru" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />

      <Script id="faq-schema-auction-ru" type="application/ld+json" dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          mainEntity: [
            { '@type': 'Question', name: 'Сколько длится процесс?', acceptedAnswer: { '@type': 'Answer', text: 'Обычно 4–8 недель в зависимости от локации и графика контейнеров.' } },
            { '@type': 'Question', name: 'Можно ли покупать битые авто?', acceptedAnswer: { '@type': 'Answer', text: 'Да. Оцениваем состояние и риски как по Run & Drive, так и по Salvage.' } },
            { '@type': 'Question', name: 'Как считается итоговый бюджет?', acceptedAnswer: { '@type': 'Answer', text: 'Hammer + сборы платформ + внутренняя доставка + контейнер + таможня.' } },
            { '@type': 'Question', name: 'Copart vs IAAI — в чём разница?', acceptedAnswer: { '@type': 'Answer', text: 'Обе платформы надёжны с VIN‑записями; различаются категории и режимы торгов (Pre‑bid/Live/Buy It Now).' } },
            { '@type': 'Question', name: 'Какие документы я получу после покупки?', acceptedAnswer: { '@type': 'Answer', text: 'Title/Bill of Sale, Export Release и транспортные документы — все этапы документируются.' } },
            { '@type': 'Question', name: 'Когда нужен контейнер?', acceptedAnswer: { '@type': 'Answer', text: 'Для неподвижных (Non‑Runner) и более дорогих лотов; для дополнительной защиты и предсказуемых сроков.' } },
            { '@type': 'Question', name: 'Сколько занимает бронирование слота контейнера?', acceptedAnswer: { '@type': 'Answer', text: 'Обычно от нескольких дней до недели; в пиковые сезоны рекомендуем бронировать заранее.' } },
            { '@type': 'Question', name: 'Можно ли организовать независимую инспекцию на площадке?', acceptedAnswer: { '@type': 'Answer', text: 'Да, по согласованию организуем инспекцию для ценных или специфических лотов.' } },
            { '@type': 'Question', name: 'Как проходят платежи по этапам?', acceptedAnswer: { '@type': 'Answer', text: 'Поэтапно: аукционные платежи/комиссии, внутренняя доставка, контейнер, таможня/регистрация.' } }
          ]
        })
      }} />

      <Script id="howto-auction-ru" type="application/ld+json" dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'HowTo',
          name: 'Покупка на аукционах США — шаг за шагом',
          description: 'Аккаунт, подбор, проверки, торги, внутренняя логистика, контейнер и таможня в Грузии.',
          totalTime: 'P4W',
          step: [
            { '@type': 'HowToStep', name: 'Консультация/Бюджет', text: 'Определяем бюджет и учитываем сборы платформ.' },
            { '@type': 'HowToStep', name: 'Подбор/Проверки', text: 'История VIN, фото, аукционные записи.' },
            { '@type': 'HowToStep', name: 'Торги', text: 'Pre‑bid/Live в согласованных лимитах.' },
            { '@type': 'HowToStep', name: 'Счёт/Оплата', text: 'Оплатить инвойс в установленный срок.' },
            { '@type': 'HowToStep', name: 'Логистика', text: 'Внутренняя доставка до порта и контейнер.' },
            { '@type': 'HowToStep', name: 'Таможня/Выдача', text: 'Таможенное оформление и передача в Грузии.' }
          ]
        })
      }} />

      <Script id="breadcrumb-auction-ru" type="application/ld+json" dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'BreadcrumbList',
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Главная', item: `${siteConfig.url}/ru` },
            { '@type': 'ListItem', position: 2, name: 'Аукционы США', item: `${siteConfig.url}/ru/aukciony-ssha` },
          ],
        }),
      }} />
    </>
  )
}
