import { HeroSection } from '@/components/sections/hero'
import { TrustSignalsSection } from '@/components/sections/trust-signals'
import { PartnersSection } from '@/components/sections/partners'
import { ServicesSection } from '@/components/sections/services'
import { ProcessSection } from '@/components/sections/process'
import { CarsShowcaseSection } from '@/components/sections/manqanebi-amerikidan-texti'
import { FAQSection } from '@/components/sections/faq'
import { ContactSection } from '@/components/sections/contact'
import { SocialMediaSection } from '@/components/sections/social-media'

export const revalidate = 1800


export default async function Home() {
  return (
    <>
      <HeroSection />
      <TrustSignalsSection />
      <CarsShowcaseSection />
      <PartnersSection />
      <ServicesSection />
      <ProcessSection />
      <FAQSection />
      <ContactSection />
      <SocialMediaSection />
    </>
  )
}
