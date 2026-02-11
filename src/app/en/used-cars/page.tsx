import type { Metadata } from 'next'
import Link from 'next/link'
import Script from 'next/script'
import { siteConfig } from '@/lib/metadata'
import { ContactSectionEn } from '@/components/sections/contact-en'
import { SocialMediaSectionEn } from '@/components/sections/social-media-en'
import { UsedCarsHeroSectionEn } from '@/components/sections/meoradi-manqanebi-hero-en'
import { UsedCarsBenefitsSectionEn } from '@/components/sections/meoradi-manqanebi-teqsti-en'
import { AutoDealerSchema } from '@/components/seo/auto-dealer-schema'

export const metadata: Metadata = {
  title: 'Used Cars from USA | Best Value | Swift Auto',
  description: 'Buy used cars from US auctions with transparent history and best price. We handle checks, bidding, logistics, and customs.',
  alternates: {
    canonical: `${siteConfig.url}/en/used-cars`,
    languages: {
      'x-default': `${siteConfig.url}/meoradi-manqanebi`,
      'ka-GE': `${siteConfig.url}/meoradi-manqanebi`,
      'en-US': `${siteConfig.url}/en/used-cars`,
      'ru-RU': `${siteConfig.url}/ru/podderzhannye-avto`,
    },
  },
}

export default function UsedCarsEn() {
  const schema = AutoDealerSchema()
  return (
    <>
      <UsedCarsHeroSectionEn />
      <UsedCarsBenefitsSectionEn />
        <section id="content" className="py-12 bg-white">
          <div className="container mx-auto px-4">
            <div className="prose prose-neutral max-w-4xl mx-auto">
              <h2>Used cars from the USA — a smart choice</h2>
              <p>
                US auctions offer used cars with transparent history at competitive prices. Swift Auto checks vehicles, bids for you,
                manages transport and customs, to help you get the best deal for your budget.
              </p>
              <h2>Why used?</h2>
              <ul>
                <li>Best price‑quality balance</li>
                <li>Large selection across years and trims</li>
                <li>Trusted documents and VIN history</li>
              </ul>
              <h2>How to reduce risks</h2>
              <ul>
                <li>Deep checks of VIN history and auction records</li>
                <li>Estimate damage types and repair budget in advance</li>
                <li>Smart bidding strategy and a contingency reserve</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="py-12 bg-neutral-50">
          <div className="container mx-auto px-4">
            <div className="prose prose-neutral max-w-4xl mx-auto">
              <h2>Budget breakdown — key items</h2>
              <ul>
                <li>Hammer price and auction fees (Buyer’s Premium, Internet Bid)</li>
                <li>Inland transport from the auction yard to port</li>
                <li>Ocean container — predictable schedules and added protection</li>
                <li>Customs duties and registration in Georgia</li>
                <li>Contingency — 5–10% for unforeseen costs</li>
              </ul>
              <h3>Timeline — typical</h3>
              <ol>
                <li>Selection & bidding — 3–10 days</li>
                <li>Inland transport — 2–7 days</li>
                <li>Ocean container — 4–8 weeks</li>
                <li>Customs/Delivery — 2–5 days</li>
              </ol>
              <h3>Glossary</h3>
              <ul>
                <li>Run & Drive — starts and moves on the yard.</li>
                <li>Non‑Runner — no engine/transmission function; needs container or special loading.</li>
                <li>Buy It Now — fixed price quick purchase.</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="py-12 bg-neutral-50">
          <div className="container mx-auto px-4">
            <div className="prose prose-neutral max-w-4xl mx-auto">
              <h2>Frequently asked questions</h2>
              <details>
                <summary>What mileage/year gives the best value?</summary>
                <p>Often 5–8‑year cars with average mileage are optimal; the exact choice depends on brand/model.</p>
              </details>
              <details>
                <summary>Can damaged cars be restored in Georgia?</summary>
                <p>Yes, we partner with trusted services and plan a realistic budget for restoration.</p>
              </details>
              <details>
                <summary>How are payments handled?</summary>
                <p>Staged: auction fees, inland transport, ocean container, then customs/registration.</p>
              </details>
              <details>
                <summary>Clean vs Salvage Title?</summary>
                <p>Clean allows unrestricted registration; Salvage requires restoration and compliance.</p>
              </details>
              <details>
                <summary>VIN checks and pre‑inspection?</summary>
                <p>We verify VIN via official services and can organize third‑party inspection at the auction yard.</p>
              </details>
              <details>
                <summary>How to plan overall budget?</summary>
                <p>Consider: hammer price + fees + inland + ocean container + customs/registration + 5–10% contingency.</p>
              </details>
            </div>
          </div>
        </section>
        <section className="py-12 bg-white">
          <div className="container mx-auto px-4">
            <div className="prose prose-neutral max-w-4xl mx-auto">
              <h2>Why used cars from the USA — a great fit for Georgia</h2>
              <p>
                US auctions combine rich trims, transparent records and competitive pricing. With a defined budget and an
                ocean container schedule, total value often beats local options — with better safety/comfort packages.
              </p>
              <ul>
                <li>Richer trims and safety packages.</li>
                <li>Wide choice across sedans, SUVs, hybrids and EVs.</li>
                <li>Predictable timelines via pre‑booked ocean containers.</li>
                <li>Documented history — Title and auction records.</li>
              </ul>

              <h3>Who it's for — buyer profiles</h3>
              <ul>
                <li><strong>Daily use</strong> — economical sedan/crossover with low running costs.</li>
                <li><strong>Family</strong> — midsize SUV with ADAS and AWD if needed.</li>
                <li><strong>Efficiency</strong> — hybrid/EV with a verified battery state.</li>
                <li><strong>Premium</strong> — low mileage, full documents and protected logistics in container.</li>
              </ul>

              <h2>How we mitigate risks</h2>
              <ul>
                <li>Deep VIN reports and cross‑check with photos/description.</li>
                <li>Estimate damage types and restoration budgets in advance.</li>
                <li>Minimize storage/gate — quick dispatch right after win.</li>
                <li>Book container windows with a Plan‑B for peak seasons.</li>
                <li>Pre‑validate customs documents to avoid delays.</li>
              </ul>

              <h2>Checklists</h2>
              <h3>Before purchase</h3>
              <ul>
                <li>Use case (daily/family/premium) and must‑have features.</li>
                <li>Budget range and bidding caps.</li>
                <li>Target Title type, auction records and insurance, if needed.</li>
              </ul>
              <h3>After arrival</h3>
              <ul>
                <li>Verify VIN vs. documents and photos.</li>
                <li>Basic service (fluids, filters, tires) and alignment.</li>
                <li>Registration/plates in Georgia.</li>
              </ul>

              <h2>Ready to start?</h2>
              <p>
                Estimate fees in our{' '}
                <Link href="/en/auction-calculator" className="text-red-600 hover:text-red-700">auction calculator</Link>,
                learn more on{' '}
                <Link href="/en/cars-from-usa" className="text-red-600 hover:text-red-700">cars from the USA</Link>{' '}
                and{' '}
                <Link href="/en/us-auto-auctions" className="text-red-600 hover:text-red-700">US auto auctions</Link>
                {' '}— we’ll prepare a detailed budget and ocean container schedule tailored to your needs.
              </p>
            </div>
          </div>
        </section>

        <ContactSectionEn />
        <SocialMediaSectionEn />

      <Script id="auto-dealer-schema-used-cars-en" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />

      <Script id="faq-schema-used-cars-en" type="application/ld+json" dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          mainEntity: [
            { '@type': 'Question', name: 'What mileage/year gives the best value?', acceptedAnswer: { '@type': 'Answer', text: 'Often 5–8‑year cars with average mileage are optimal; the exact choice depends on brand/model.' } },
            { '@type': 'Question', name: 'Can damaged cars be restored in Georgia?', acceptedAnswer: { '@type': 'Answer', text: 'Yes, we partner with trusted services and plan a realistic budget for restoration.' } },
            { '@type': 'Question', name: 'How are payments handled?', acceptedAnswer: { '@type': 'Answer', text: 'Staged: auction fees, inland transport, ocean container, then customs/registration.' } },
            { '@type': 'Question', name: 'Clean vs Salvage Title?', acceptedAnswer: { '@type': 'Answer', text: 'Clean allows unrestricted registration; Salvage requires restoration and compliance.' } },
            { '@type': 'Question', name: 'VIN checks and pre‑inspection?', acceptedAnswer: { '@type': 'Answer', text: 'We verify VIN via official services and can organize third‑party inspection at the auction yard.' } },
            { '@type': 'Question', name: 'How to plan overall budget?', acceptedAnswer: { '@type': 'Answer', text: 'Consider: hammer price + fees + inland + ocean container + customs/registration + 5–10% contingency.' } }
          ]
        })
      }} />

      <Script id="howto-used-cars-en" type="application/ld+json" dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'HowTo',
          name: 'Buying a used car from US auctions — step by step',
          description: 'Selection, VIN checks, bidding, inland logistics, ocean container and registration in Georgia.',
          totalTime: 'P5W',
          step: [
            { '@type': 'HowToStep', name: 'Consultation', text: 'Define budget, use case, and must‑haves.' },
            { '@type': 'HowToStep', name: 'Selection', text: 'Filter, analyze photos, and check VIN history.' },
            { '@type': 'HowToStep', name: 'Bidding', text: 'Participate within agreed caps (Pre‑bid/Live).' },
            { '@type': 'HowToStep', name: 'Inland transport', text: 'Move the lot from yard to port.' },
            { '@type': 'HowToStep', name: 'Ocean container', text: 'Book per schedule and budget.' },
            { '@type': 'HowToStep', name: 'Customs/Registration', text: 'Complete procedures and register in Georgia.' },
            { '@type': 'HowToStep', name: 'Delivery', text: 'Handover with documents.' }
          ]
        })
      }} />

      <Script id="breadcrumb-used-cars-en" type="application/ld+json" dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'BreadcrumbList',
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Home', item: `${siteConfig.url}/en` },
            { '@type': 'ListItem', position: 2, name: 'Used Cars', item: `${siteConfig.url}/en/used-cars` },
          ],
        }),
      }} />
    </>
  )
}
