"use client"

import { AuctionHeroSection } from '@/components/sections/amerikis-avto-auqcioni-hero'
import { AuctionFeaturesSection } from '@/components/sections/amerikis-avto-auqcioni-teqsti'
import { ContactSection } from '@/components/sections/contact'
import { SocialMediaSection } from '@/components/sections/social-media'
import { AutoDealerSchema } from '@/components/seo/auto-dealer-schema'
import Script from 'next/script'

export default function AmericanAutoAuction() {
  const schema = AutoDealerSchema()

  return (
    <>
      <main>
        <AuctionHeroSection />
        <AuctionFeaturesSection />
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
