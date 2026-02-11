import type { Metadata } from "next"
import Script from "next/script"
import { Phone, Mail, MapPin, Clock } from "lucide-react"
import { ContactSectionRu } from "@/components/sections/contact-ru"
import { siteConfig } from "@/lib/metadata"

export const metadata: Metadata = {
  title: "Контакты - Swift Auto Import",
  description: "Свяжитесь с нами для консультации. Поможем выбрать и ввезти авто из США.",
  alternates: { 
    canonical: `${siteConfig.url}/ru/kontakty`,
    languages: {
      'x-default': `${siteConfig.url}/contact`,
      'ka-GE': `${siteConfig.url}/contact`,
      'en-US': `${siteConfig.url}/en/contact`,
      'ru-RU': `${siteConfig.url}/ru/kontakty`,
    }
  },
}

export default function ContactRuPage() {
  return (
    <div className="min-h-screen">
      <section className="bg-neutral-900 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Контакты</h1>
            <p className="text-lg text-neutral-300">Есть вопросы? Мы на связи — напишите или позвоните.</p>
          </div>
        </div>
      </section>

      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 -mt-24">
            <div className="bg-white rounded-xl shadow-lg p-8">
              <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mb-6">
                <Phone className="w-6 h-6 text-red-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Телефон</h3>
              <p className="text-neutral-600 mb-4">Круглосуточно</p>
              <a href={`tel:${siteConfig.contact.phone}`} className="text-red-600 hover:text-red-700 font-medium">{siteConfig.contact.phone}</a>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-8">
              <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mb-6">
                <Mail className="w-6 h-6 text-red-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Email</h3>
              <p className="text-neutral-600 mb-4">Обычно отвечаем за минуты</p>
              <a href={`mailto:${siteConfig.contact.email}`} className="text-red-600 hover:text-red-700 font-medium">{siteConfig.contact.email}</a>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-8">
              <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mb-6">
                <MapPin className="w-6 h-6 text-red-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Адрес</h3>
              <p className="text-neutral-600 mb-4">Посетите наш офис</p>
              <p className="text-neutral-900">{siteConfig.location.city}, {siteConfig.location.country}</p>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-8">
              <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mb-6">
                <Clock className="w-6 h-6 text-red-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Часы работы</h3>
              <p className="text-neutral-600 mb-4">Понедельник - Суббота</p>
              <p className="text-neutral-900">10:00 - 19:00</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-10 bg-white">
        <div className="container mx-auto px-4">
          <div className="prose prose-neutral max-w-3xl mx-auto">
            <h2>Как связаться и что ожидать</h2>
            <p>
              Swift Auto Import отвечает быстро — обычно в течение 15–60 минут в рабочие часы. Работаем по всей Грузии и
              говорим на грузинском, английском и русском. Для точного all‑in расчёта пришлите VIN/ссылку, бюджет и ваш город.
            </p>
            <p>
              Консультация покрывает сборы Copart/IAAI, внутреннюю/морскую доставку, типичные сроки (обычно 5–10 недель) и документы.
              Наша цель — прозрачность и предсказуемость.
            </p>
          </div>
        </div>
      </section>

      <ContactSectionRu />
      <Script
        id="breadcrumb-contact-ru"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            itemListElement: [
              { '@type': 'ListItem', position: 1, name: 'Главная', item: `${siteConfig.url}/ru` },
              { '@type': 'ListItem', position: 2, name: 'Контакты', item: `${siteConfig.url}/ru/kontakty` },
            ],
          }),
        }}
      />
    </div>
  )
}
