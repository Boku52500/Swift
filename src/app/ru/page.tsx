import Image from 'next/image'
import { TrustSignalsSectionRu } from '@/components/sections/trust-signals-ru'
import { PartnersSectionRu } from '@/components/sections/partners-ru'
import { PopularCarsShowcaseRu } from '@/components/sections/popular-cars-showcase-ru'
import { ServicesSectionRu } from '@/components/sections/services-ru-section'
import { ProcessSectionRu } from '@/components/sections/process-ru'
import { BlogScrollSectionRu } from '@/components/sections/blog-scroll-ru'
import { FAQSectionRu } from '@/components/sections/faq-ru'
import { ContactSectionRu } from '@/components/sections/contact-ru'
import { SocialMediaSectionRu } from '@/components/sections/social-media-ru'
import { HowWeHelpSectionRu } from '@/components/sections/how-we-help-ru'

export const revalidate = 1800

export default function HomeRu() {
  return (
    <>
      {/* Hero */}
      <section className="relative bg-neutral-900 text-white">
        <div className="absolute inset-0">
          <Image src="/images/hero.jpg" alt="Swift Auto Import - Ferrari в контейнере" fill priority quality={90} sizes="(max-width: 1024px) 100vw, 1920px" style={{ objectFit: 'cover', objectPosition: 'center' }} />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-transparent" />
        </div>
        <div className="relative container mx-auto px-4 py-24 md:py-32">
          <div className="max-w-3xl space-y-6">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold">Импорт автомобилей из США в Грузию — без лишних забот</h1>
            <p className="text-lg md:text-xl text-neutral-200">Профессиональный сервис для аукционов США (Copart/IAAI), внутренняя перевозка, морской фрахт, растаможка и выдача. Прозрачные цены и предсказуемые сроки.</p>
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <a href="tel:+995577908080" className="inline-flex items-center justify-center rounded-md bg-red-600 hover:bg-red-700 px-6 py-3 text-white font-medium">Получить бесплатную консультацию</a>
              <a href="#process" className="inline-flex items-center justify-center rounded-md bg-white/10 hover:bg-white/20 px-6 py-3 text-white font-medium">Как это работает</a>
            </div>
          </div>
        </div>
      </section>

      <TrustSignalsSectionRu />
      <HowWeHelpSectionRu />
      <PartnersSectionRu />
      <PopularCarsShowcaseRu />
      <ServicesSectionRu />
      <ProcessSectionRu />
      <BlogScrollSectionRu />
      <FAQSectionRu />
      <ContactSectionRu />
      <SocialMediaSectionRu />
    </>
  )
}
