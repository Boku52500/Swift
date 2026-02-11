import Image from 'next/image'
import Link from 'next/link'
import { TrustSignalsSectionEn } from '@/components/sections/trust-signals-en'
import { PartnersSectionEn } from '@/components/sections/partners-en'
import { PopularCarsShowcaseEn } from '@/components/sections/popular-cars-showcase-en'
import { ServicesSectionEn } from '@/components/sections/services-en-section'
import { ProcessSectionEn } from '@/components/sections/process-en'
import { BlogScrollSectionEn } from '@/components/sections/blog-scroll-en'
import { FAQSectionEn } from '@/components/sections/faq-en'
import { ContactSectionEn } from '@/components/sections/contact-en'
import { SocialMediaSectionEn } from '@/components/sections/social-media-en'
import { HowWeHelpSectionEn } from '@/components/sections/how-we-help-en'

export const revalidate = 1800

export default function HomeEn() {
  return (
    <>
      {/* Hero */}
      <section className="relative bg-neutral-900 text-white">
        <div className="absolute inset-0">
          <Image src="/images/hero.jpg" alt="Swift Auto Import - Ferrari in Container" fill priority quality={90} sizes="(max-width: 1024px) 100vw, 1920px" style={{ objectFit: 'cover', objectPosition: 'center' }} />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-transparent" />
        </div>
        <div className="relative container mx-auto px-4 py-24 md:py-32">
          <div className="max-w-3xl space-y-6">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold">Streamlined Car Import From The USA to Georgia</h1>
            <p className="text-lg md:text-xl text-neutral-200">Professional Service For US Auto Auctions (Copart/IAAI), Inland transport, Ocean Freight, Customs Clearance And Delivery. Transparent pricing and reliable timelines.</p>
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <a href="tel:+995577908080" className="inline-flex items-center justify-center rounded-md bg-red-600 hover:bg-red-700 px-6 py-3 text-white font-medium">Get a free consultation</a>
              <a href="#process" className="inline-flex items-center justify-center rounded-md bg-white/10 hover:bg-white/20 px-6 py-3 text-white font-medium">How it works</a>
            </div>
          </div>
        </div>
      </section>

      <TrustSignalsSectionEn />
      <HowWeHelpSectionEn />
      <PartnersSectionEn />
      <PopularCarsShowcaseEn />
      <ServicesSectionEn />
      <ProcessSectionEn />
      <BlogScrollSectionEn />
      <FAQSectionEn />
      <ContactSectionEn />
      <SocialMediaSectionEn />
    </>
  )
}
