"use client"

import Link from 'next/link'
import { Phone, Mail, MapPin } from 'lucide-react'
import { usePathname } from 'next/navigation'
import Image from 'next/image'

export function Footer() {
  const pathname = usePathname() || '/'
  const isEn = pathname.startsWith('/en')
  const isRu = pathname.startsWith('/ru')
  const { getAlternatePath } = require('@/lib/locale')
  const navHref = (kaPath: string) => (isEn ? getAlternatePath(`/${kaPath}`, 'en') : isRu ? getAlternatePath(`/${kaPath}`, 'ru') : `/${kaPath}`)
  const t = {
    company: 'Swift Auto Import',
    tagline: isEn ? 'Your trusted auto importer in Georgia' : isRu ? 'Ваш надежный автоимпортер в Грузии' : 'შენი სანდო ავტო იმპორტიორი საქართველოში',
    mainServices: isEn ? 'Main Services' : isRu ? 'Основные услуги' : 'ძირითადი სერვისები',
    auctions: isEn ? 'US Auto Auctions' : isRu ? 'Аукционы США' : 'ამერიკის ავტო აუქციონი',
    carsFromUsa: isEn ? 'Cars from USA' : isRu ? 'Автомобили из США' : 'მანქანები ამერიკიდან',
    import: isEn ? 'Car Import' : isRu ? 'Импорт авто' : 'ავტო იმპორტი',
    usedCars: isEn ? 'Used Cars' : isRu ? 'Б/у автомобили' : 'მეორადი მანქანები',
    moreLinks: isEn ? 'More Links' : isRu ? 'Дополнительные ссылки' : 'დამატებითი ბმულები',
    howItWorks: isEn ? 'How it works' : isRu ? 'Как это работает' : 'როგორ მუშაობს',
    faq: isEn ? 'Frequently Asked Questions' : isRu ? 'Часто задаваемые вопросы' : 'ხშირად დასმული კითხვები',
    contactUs: isEn ? 'Contact us' : isRu ? 'Свяжитесь с нами' : 'დაგვიკავშირდით',
    phone: '+995 577 90 80 80',
    email: 'info@swiftauto.ge',
    location: isEn ? 'Tbilisi, Georgia' : isRu ? 'Тбилиси, Грузия' : 'Tbilisi, Georgia',
  }
  return (
    <footer className="bg-neutral-900 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold">{t.company}</h3>
            <p className="text-neutral-400">{t.tagline}</p>
            <div className="pt-2 flex items-center gap-1.5">
              <Link
                href={getAlternatePath(pathname, 'ka')}
                aria-label="ქართული"
                title="ქართული"
                className={`text-xl ${(!isEn && !isRu) ? '' : 'opacity-60 hover:opacity-100'}`}
              >
                <Image src="/images/georgia.png" alt="ქართული" width={20} height={14} className="rounded-sm object-cover" />
              </Link>
              <Link
                href={getAlternatePath(pathname, 'en')}
                aria-label="English"
                title="English"
                className={`text-xl ${isEn ? '' : 'opacity-60 hover:opacity-100'}`}
              >
                <Image src="/images/usa.png" alt="English" width={20} height={14} className="rounded-sm object-cover" />
              </Link>
              <Link
                href={getAlternatePath(pathname, 'ru')}
                aria-label="Русский"
                title="Русский"
                className={`text-xl ${isRu ? '' : 'opacity-60 hover:opacity-100'}`}
              >
                <Image src="/images/russia.png" alt="Русский" width={20} height={14} className="rounded-sm object-cover" />
              </Link>
            </div>
          </div>

          {/* Main Services */}
          <div>
            <h4 className="font-semibold mb-4">{t.mainServices}</h4>
            <ul className="space-y-2">
              <li>
                <Link href={navHref('amerikis-avto-auqcioni')} className="text-neutral-400 hover:text-white">
                  {t.auctions}
                </Link>
              </li>
              <li>
                <Link href={navHref('manqanebi-amerikidan')} className="text-neutral-400 hover:text-white">
                  {t.carsFromUsa}
                </Link>
              </li>
              <li>
                <Link href={navHref('avto-importi')} className="text-neutral-400 hover:text-white">
                  {t.import}
                </Link>
              </li>
              <li>
                <Link href={navHref('meoradi-manqanebi')} className="text-neutral-400 hover:text-white">
                  {t.usedCars}
                </Link>
              </li>
            </ul>
          </div>

          {/* Additional Links */}
          <div>
            <h4 className="font-semibold mb-4">{t.moreLinks}</h4>
            <ul className="space-y-2">
              <li>
                <Link href={isEn ? '/en#process' : isRu ? '/ru#process' : '/#process'} className="text-neutral-400 hover:text-white">
                  {t.howItWorks}
                </Link>
              </li>
              <li>
                <Link href={isEn ? '/en#faq' : isRu ? '/ru#faq' : '/#faq'} className="text-neutral-400 hover:text-white">
                  {t.faq}
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold mb-4">{t.contactUs}</h4>
            <ul className="space-y-2">
              <li className="flex items-center gap-2 text-neutral-400">
                <Phone className="w-4 h-4" />
                <a href="tel:+995577908080" className="hover:text-white">
                  {t.phone}
                </a>
              </li>
              <li className="flex items-center gap-2 text-neutral-400">
                <Mail className="w-4 h-4" />
                <a href="mailto:info@swiftautoimport.ge" className="hover:text-white">
                  {t.email}
                </a>
              </li>
              <li className="flex items-center gap-2 text-neutral-400">
                <MapPin className="w-4 h-4" />
                <span>{t.location}</span>
              </li>
            </ul>
          </div>
        </div>

      </div>
    </footer>
  )
}
