export type BlogPostMetaRu = {
  slug: string
  kaSlug: string
  title: string
  excerpt: string
  date: string
  image: string
  keywords: string[]
}

export const blogPostsRu: BlogPostMetaRu[] = [
  {
    slug: 'skolko-stoit-vvezti-avto-iz-ssha-v-gruziyu',
    kaSlug: 'ra-ghirs-manqanis-chamoyvana-amerikidan-sakartveloshi',
    title: 'Сколько стоит привезти автомобиль из США в Грузию?',
    excerpt: 'Полная структура затрат: цена лота, сборы аукциона, внутренняя перевозка, морской фрахт (контейнер), портовые услуги, таможня, страхование и прочее.',
    date: '2026-02-07',
    image: '/images/blog/import-cost.jpg',
    keywords: ['ввоз авто Грузия', 'авто из США', 'растаможка', 'перевозка', 'Copart', 'IAAI', 'сборы аукциона', 'VIN']
  },
  {
    slug: 'kak-vybrat-pervyy-avtomobil-na-aukcionah-ssha',
    kaSlug: 'rogor-avarchiot-pirveli-manqana-amerikis-auqcionze',
    title: 'Как выбрать первый автомобиль на аукционах США',
    excerpt: 'Пошаговое руководство: проверка VIN, виды повреждений и тайтлов, бюджетирование, стратегия торгов, осмотр и контроль рисков.',
    date: '2026-01-04',
    image: '/images/blog/first-car.jpg',
    keywords: ['аукционы США', 'первое авто', 'VIN', 'торги', 'Copart', 'IAAI', 'title', 'осмотр']
  },
  {
    slug: 'samye-vygodnye-avtomobili-dlya-vvoza-v-gruziyu',
    kaSlug: 'romeli-manqanebi-aris-kvelaze-momgebiani-sakartveloshi',
    title: 'Самые выгодные автомобили для ввоза в Грузию',
    excerpt: 'Аналитика по сегментам: эконом, гибриды, кроссоверы/SUV, бизнес-седаны — что и почему сохраняет стоимость.',
    date: '2025-06-11',
    image: '/images/blog/profitable-cars.webp',
    keywords: ['выгодные авто', 'гибрид', 'SUV', 'эконом', 'рынок Грузии', 'ввоз авто']
  },
  {
    slug: 'copart-ili-iaai-kakoy-aukcion-luchshe-dlya-vvoza-avto',
    kaSlug: 'copart-tu-iaai-romeli-auqcioni-sjobs-manqanis-chamosakvanad',
    title: 'Copart или IAAI — какой аукцион лучше для ввоза авто?',
    excerpt: 'Две ведущие платформы: сравнение сборов, типов повреждений, форматов торгов, сроков доставки и проверенных практик.',
    date: '2025-05-17',
    image: '/images/blog/copart-vs-iaai.webp',
    keywords: ['Copart', 'IAAI', 'аукцион', 'торги', 'ввоз авто', 'перевозка']
  },
  {
    slug: 'rasprostranennye-oshibki-pri-vvoze-avtomobiley-iz-ssha',
    kaSlug: 'kvelaze-khshiri-shetsdomebi-manqanis-chamoyvanisas-amerikidan',
    title: 'Распространенные ошибки при ввозе автомобилей из США',
    excerpt: 'Как избежать лишних затрат: неверный бюджет, слабая проверка VIN, игнор страховки/доставки, задержки документов и др.',
    date: '2025-02-07',
    image: '/images/blog/common-mistakes.webp',
    keywords: ['ошибки', 'ввоз авто', 'США', 'страхование', 'доставка', 'таможня', 'VIN']
  },
]
