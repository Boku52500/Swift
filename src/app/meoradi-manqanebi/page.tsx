"use client"

import { UsedCarsHeroSection } from '@/components/sections/meoradi-manqanebi-hero'
import { UsedCarsBenefitsSection } from '@/components/sections/meoradi-manqanebi-teqsti'
import { CarsShowcaseSection } from '@/components/sections/manqanebi-amerikidan-texti'
import { ContactSection } from '@/components/sections/contact'
import { SocialMediaSection } from '@/components/sections/social-media'
import { AutoDealerSchema } from '@/components/seo/auto-dealer-schema'
import Script from 'next/script'


export default function UsedCars() {
  const schema = AutoDealerSchema()

  return (
    <>
      <main>
        <UsedCarsHeroSection />
        <UsedCarsBenefitsSection />
        <CarsShowcaseSection />
        <ContactSection />
        <SocialMediaSection />
      </main>
      <Script
        id="auto-dealer-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
    </>
  )
}
