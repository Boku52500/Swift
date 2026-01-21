"use client"

import { AutoImportHeroSection } from '@/components/sections/avto-importi-hero'
import { ImportServicesSection } from '@/components/sections/avto-importi-teqsti'
import { ContactSection } from '@/components/sections/contact'
import { SocialMediaSection } from '@/components/sections/social-media'
import { AutoDealerSchema } from '@/components/seo/auto-dealer-schema'
import Script from 'next/script'


export default function AutoImport() {
  const schema = AutoDealerSchema()

  return (
    <>
      <main>
        <AutoImportHeroSection />
        <ImportServicesSection />
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
