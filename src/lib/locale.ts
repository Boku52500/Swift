import { blogPostsEn } from '@/data/blog-en'
import { blogPostsRu } from '@/data/blog-ru'

export type Locale = 'ka' | 'en' | 'ru'

export const LOCALE_TAG: Record<Locale, string> = {
  ka: 'ka-GE',
  en: 'en-US',
  ru: 'ru-RU',
}

// Static path mappings (without trailing slashes)
const kaToEn: Record<string, string> = {
  '': '',
  'amerikis-avto-auqcioni': 'us-auto-auctions',
  'manqanebi-amerikidan': 'cars-from-usa',
  'avto-importi': 'car-import',
  'meoradi-manqanebi': 'used-cars',
  'servisebi': 'services',
  'gaxdi-dileri': 'become-a-dealer',
  'auqcionis-kalkulatori': 'auction-calculator',
  'popularuli-manqanebi': 'popular-cars',
  'contact': 'contact',
  'blog': 'blog',
}

const enToKa: Record<string, string> = Object.fromEntries(
  Object.entries(kaToEn).map(([ka, en]) => [en, ka])
)

// RU transliterated slugs
const enToRu: Record<string, string> = {
  '': '',
  'services': 'uslugi',
  'car-import': 'import-avto',
  'cars-from-usa': 'avto-iz-ssha',
  'us-auto-auctions': 'aukciony-ssha',
  'used-cars': 'podderzhannye-avto',
  'popular-cars': 'populyarnye-avto',
  'contact': 'kontakty',
  'become-a-dealer': 'stat-dilerom',
  'auction-calculator': 'kalkulyator-aukciona',
  'blog': 'blog',
}

const ruToEn: Record<string, string> = Object.fromEntries(
  Object.entries(enToRu).map(([en, ru]) => [ru, en])
)

const kaToRu: Record<string, string> = {
  '': '',
  'amerikis-avto-auqcioni': 'aukciony-ssha',
  'manqanebi-amerikidan': 'avto-iz-ssha',
  'avto-importi': 'import-avto',
  'meoradi-manqanebi': 'podderzhannye-avto',
  'servisebi': 'uslugi',
  'gaxdi-dileri': 'stat-dilerom',
  'auqcionis-kalkulatori': 'kalkulyator-aukciona',
  'popularuli-manqanebi': 'populyarnye-avto',
  'contact': 'kontakty',
  'blog': 'blog',
}

const priceMapKaToEn: Record<string, string> = {
  '5000-mde': 'under-5000',
  '10000-mde': 'under-10000',
  '15000-mde': 'under-15000',
  '20000-mde': 'under-20000',
}
const priceMapEnToKa: Record<string, string> = Object.fromEntries(
  Object.entries(priceMapKaToEn).map(([ka, en]) => [en, ka])
)

export function getAlternatePath(pathname: string, to: Locale): string {
  const clean = (pathname || '/').split('?')[0].split('#')[0]
  const segments = clean.split('/').filter(Boolean)

  const isEn = segments[0] === 'en'
  const isRu = segments[0] === 'ru'
  const from: Locale = isEn ? 'en' : isRu ? 'ru' : 'ka'
  if (from === to) return clean

  // Blog index
  if (!isEn && !isRu && clean === '/blog' && to === 'en') return '/en/blog'
  if (!isEn && !isRu && clean === '/blog' && to === 'ru') return '/ru/blog'
  if (isEn && clean === '/en/blog' && to === 'ka') return '/blog'
  if (isEn && clean === '/en/blog' && to === 'ru') return '/ru/blog'
  if (isRu && clean === '/ru/blog' && to === 'ka') return '/blog'
  if (isRu && clean === '/ru/blog' && to === 'en') return '/en/blog'

  // Blog post
  if (!isEn && !isRu && segments[0] === 'blog' && segments[1]) {
    const kaSlug = segments[1]
    if (to === 'en') {
      const en = blogPostsEn.find((p) => p.kaSlug === kaSlug)
      if (en) return `/en/blog/${en.slug}`
    }
    if (to === 'ru') {
      const ru = blogPostsRu.find((p) => p.kaSlug === kaSlug)
      if (ru) return `/ru/blog/${ru.slug}`
    }
  }
  if (isEn && segments[1] === 'blog' && segments[2]) {
    const enSlug = segments[2]
    const pair = blogPostsEn.find((p) => p.slug === enSlug)
    if (to === 'ka' && pair) return `/blog/${pair.kaSlug}`
    if (to === 'ru') {
      if (pair) {
        const ru = blogPostsRu.find((r) => r.kaSlug === pair.kaSlug)
        if (ru) return `/ru/blog/${ru.slug}`
      }
      return '/ru/blog'
    }
  }
  if (isRu && segments[1] === 'blog' && segments[2]) {
    const ruSlug = segments[2]
    const pair = blogPostsRu.find((p) => p.slug === ruSlug)
    if (to === 'ka' && pair) return `/blog/${pair.kaSlug}`
    if (to === 'en') {
      if (pair) {
        const en = blogPostsEn.find((e) => e.kaSlug === pair.kaSlug)
        if (en) return `/en/blog/${en.slug}`
      }
      return '/en/blog'
    }
  }

  // Popular cars subroutes (RU uses 'populyarnye-avto')
  if (!isEn && !isRu && segments[0] === 'popularuli-manqanebi' && segments[1]) {
    const mapped = priceMapKaToEn[segments[1]]
    if (mapped && to === 'en') return `/en/popular-cars/${mapped}`
    if (mapped && to === 'ru') return `/ru/populyarnye-avto/${mapped}`
  }
  if (isEn && segments[1] === 'popular-cars' && segments[2]) {
    const mapped = priceMapEnToKa[segments[2]]
    if (to === 'ka' && mapped) return `/popularuli-manqanebi/${mapped}`
    if (to === 'ru') return `/ru/populyarnye-avto/${segments[2]}`
  }
  if (isRu && segments[1] === 'populyarnye-avto' && segments[2]) {
    const ruSlug = segments[2]
    const mapped = priceMapEnToKa[ruSlug]
    if (to === 'ka' && mapped) return `/popularuli-manqanebi/${mapped}`
    if (to === 'en') return `/en/popular-cars/${ruSlug}`
  }

  // Static top-level pages
  if (!isEn && !isRu) {
    const head = segments[0] || ''
    const mappedEn = kaToEn[head]
    const mappedRu = kaToRu[head]
    if (to === 'en') {
      if (head === undefined || head === '') return '/en'
      if (mappedEn !== undefined) {
        const tail = segments.slice(1).join('/')
        return `/en/${[mappedEn, tail].filter(Boolean).join('/')}`.replace(/\/$/, '')
      }
      return '/en'
    }
    if (to === 'ru') {
      if (head === undefined || head === '') return '/ru'
      if (mappedRu !== undefined) {
        const tail = segments.slice(1).join('/')
        return `/ru/${[mappedRu, tail].filter(Boolean).join('/')}`.replace(/\/$/, '')
      }
      return '/ru'
    }
  } else {
    const head = segments[1] || ''
    if (isEn) {
      if (!head) return to === 'ka' ? '/' : '/ru'
      const mapped = enToKa[head]
      if (to === 'ka' && mapped !== undefined) {
        const tail = segments.slice(2).join('/')
        return `/${[mapped, tail].filter(Boolean).join('/')}`.replace(/\/$/, '') || '/'
      }
      if (to === 'ru') {
        const ruHead = enToRu[head] ?? head
        const tail = segments.slice(2).join('/')
        return `/ru/${[ruHead, tail].filter(Boolean).join('/')}`.replace(/\/$/, '') || '/ru'
      }
      return '/'
    }
    if (isRu) {
      if (!head) return to === 'ka' ? '/' : '/en'
      const mappedEnHead = ruToEn[head] ?? head
      if (to === 'ka') {
        const kaMapped = enToKa[mappedEnHead]
        if (kaMapped !== undefined) {
          const tail = segments.slice(2).join('/')
          return `/${[kaMapped, tail].filter(Boolean).join('/')}`.replace(/\/$/, '') || '/'
        }
        return '/'
      }
      if (to === 'en') {
        const tail = segments.slice(2).join('/')
        return `/en/${[mappedEnHead, tail].filter(Boolean).join('/')}`.replace(/\/$/, '') || '/en'
      }
      return '/'
    }
  }
  // Fallback: if no mapping matched, return the cleaned path
  return clean
}
