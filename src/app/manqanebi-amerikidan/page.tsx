"use client"

import { CarsFromAmericaHeroSection } from '@/components/sections/manqanebi-amerikidan-hero'
import { CarsShowcaseSection } from '@/components/sections/manqanebi-amerikidan-texti'
import { ProcessSection } from '@/components/sections/process'
import { ContactSection } from '@/components/sections/contact'
import { SocialMediaSection } from '@/components/sections/social-media'
import { AutoDealerSchema } from '@/components/seo/auto-dealer-schema'
import Script from 'next/script'


export default function CarsFromAmerica() {
  const schema = AutoDealerSchema()

  return (
    <>
      <main>
        <CarsFromAmericaHeroSection />
        <CarsShowcaseSection />
        <ProcessSection />
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
