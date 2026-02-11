import type { Metadata } from 'next'
import Link from 'next/link'
import Script from 'next/script'
import { siteConfig } from '@/lib/metadata'
import { ContactSectionEn } from '@/components/sections/contact-en'
import { SocialMediaSectionEn } from '@/components/sections/social-media-en'
import { AutoImportHeroSectionEn } from '@/components/sections/avto-importi-hero-en'
import { ImportServicesSectionEn } from '@/components/sections/avto-importi-teqsti-en'
import { AutoDealerSchema } from '@/components/seo/auto-dealer-schema'

export const metadata: Metadata = {
  title: 'Car Import from USA to Georgia | Swift Auto',
  description: 'Full-cycle car import: selection, VIN checks, bidding, inland/ocean transport, customs clearance, and delivery in Tbilisi.',
  alternates: {
    canonical: `${siteConfig.url}/en/car-import`,
    languages: {
      'x-default': `${siteConfig.url}/avto-importi`,
      'ka-GE': `${siteConfig.url}/avto-importi`,
      'en-US': `${siteConfig.url}/en/car-import`,
      'ru-RU': `${siteConfig.url}/ru/import-avto`,
    },
  },
}

export default function CarImportEn() {
  const schema = AutoDealerSchema()
  return (
    <>
      <AutoImportHeroSectionEn />
      <ImportServicesSectionEn />
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="prose prose-neutral max-w-4xl mx-auto">
            <h2>What problems we solve — why trust us with end‑to‑end import</h2>
            <p>
              Importing a car from the USA is not just “buy and ship”. Each stage — from auction onboarding and legal checks
              to inland logistics, ocean container booking, and customs — has details that shape the final cost, timing, and risk.
              We run a standardised, transparent process with assigned responsibilities, status visibility, and scenario‑based budgets
              so you always know what happens next and why.
            </p>
            <ul>
              <li><strong>Save time</strong> — one team covers selection, bidding, logistics, and customs.</li>
              <li><strong>Optimise total cost</strong> — forecast platform fees, choose optimal port and container plan.</li>
              <li><strong>Reduce risk</strong> — deep VIN history checks, damage analysis, third‑party inspection on request.</li>
              <li><strong>Stay informed</strong> — 24/7 status, regular reporting, and on‑time documents.</li>
            </ul>

            <h2>Full service lifecycle — step by step</h2>
            <h3>1) Consultation and budget architecture</h3>
            <p>
              We capture your requirements: purpose, fuel type, year range, key options (AWD/4x4, third row, hybrid, safety packs)
              and constraints. We prepare conservative/market/aggressive budget scenarios with line items for platform fees,
              inland transport, ocean container shipping, and customs/registration.
            </p>
            <h3>2) Selection and pre‑checks</h3>
            <p>
              We shortlist candidates on Copart/IAAI and other sources, then evaluate VIN records, damage types, market value,
              and the quality/consistency of photos and descriptions. When needed, we arrange third‑party inspection at the yard and
              provide a written Risk/Opportunity summary for every vehicle.
            </p>
            <h3>3) Bidding strategy and purchase</h3>
            <p>
              We align limits and tactics (Pre‑bid/Live), assess competition and expected outcomes, and aim for the best total cost —
              not just the hammer price. After winning, we manage invoicing and documentation immediately to prevent delays.
            </p>
            <h3>4) Inland logistics and container shipping</h3>
            <p>
              We schedule yard‑to‑port transport and choose the port by geography and schedule. For ocean shipping we use containers —
              a predictable and protective option, especially for non‑running or high‑value lots. Movements are backed by photos and paperwork.
            </p>
            <h3>5) Customs and delivery in Georgia</h3>
            <p>
              We prepare the declaration, supervise customs, complete registration as needed, and hand over the vehicle on time.
              The final report includes all costs and documents, end‑to‑end.
            </p>

            <h2>Budget architecture — what makes the “all‑in” price</h2>
            <ul>
              <li><strong>Hammer price + platform fees</strong> — Buyer’s Premium, Internet Bid and other fixed/variable items.</li>
              <li><strong>Inland transport</strong> — state/distance/vehicle condition; possible yard handling.</li>
              <li><strong>Ocean container</strong> — season, port, size; shared vs dedicated planning.</li>
              <li><strong>Insurance</strong> — visual/engine/transmission coverage; optional extra coverage on request.</li>
              <li><strong>Customs/taxes</strong> — engine size, age, category, and local tariffs.</li>
              <li><strong>Registration/services</strong> — plates, inspection, optional installations.</li>
              <li><strong>Contingency 5–10%</strong> — for unforeseen factors (extra packing, storage, schedule shifts).</li>
            </ul>

            <h2>Risk management — how we prevent hidden costs</h2>
            <p>
              The major risks stem from incomplete history, mis‑assessed damage, logistics delays, and documentation errors.
              We add control points — third‑party inspections, photo discrepancy checks, pre‑confirmed bookings, and plan‑B routes —
              to keep outcomes predictable.
            </p>
            <ul>
              <li>VIN red flags and “blacklist” patterns in photos/records.</li>
              <li>Repair budget ranges by damage category and parts availability.</li>
              <li>Alternative container dates/ports in case of congestion.</li>
              <li>Pre‑validation of documents to avoid customs issues.</li>
            </ul>

            <h2>Scenarios — choose by your goal</h2>
            <h3>Budget daily driver</h3>
            <p>
              Focus on reliability and low running costs: mid‑age popular models with well‑documented histories and predictable parts.
            </p>
            <h3>Family/SUV</h3>
            <p>
              Emphasis on safety and space: AWD/4x4, third row, safety packages. Extra checks to exclude structural/suspension issues.
            </p>
            <h3>Enthusiast/Premium</h3>
            <p>
              Special configurations and lower mileage. Higher protection standards for logistics, detailed documentation and photo trail,
              and stricter container requirements.
            </p>

            <h2>Common mistakes — and how to avoid them</h2>
            <ul>
              <li>Focusing only on hammer price — ignoring platform/logistics in the all‑in total.</li>
              <li>Skimming VIN reports — missing events or poor‑quality rebuilds.</li>
              <li>Judging from low‑quality photos — we insist on adequate evidence.</li>
              <li>Overlooking customs paperwork — causing delays and extra fees.</li>
            </ul>

            <h2>Extended FAQ</h2>
            <h3>Can I reserve a specific brand/model?</h3>
            <p>
              Yes. We build a watchlist and provide alternatives by price, mileage, and condition. The decision follows your criteria
              so value is not lost while waiting.
            </p>
            <h3>How are contracts and payments structured?</h3>
            <p>
              Staged invoicing: auction/platform, inland, container, customs/registration. Every stage is documented and reported.
            </p>
            <h3>How reliable are the timelines?</h3>
            <p>
              Schedules depend on port congestion and seasonality. We maintain backup plans and live status updates to minimise
              unforeseen delays.
            </p>
          </div>
        </div>
      </section>
        <section id="content" className="py-12 bg-white">
          <div className="container mx-auto px-4">
            <div className="prose prose-neutral max-w-4xl mx-auto">
              <h2>Car import from the USA — full service</h2>
              <p>
                Swift Auto delivers end-to-end import service from the USA to Georgia. We help you choose the right model,
                verify condition and history, bid and purchase, manage inland and ocean transport, handle customs clearance,
                and hand over your vehicle safely in Tbilisi.
              </p>
              <h2>Why Swift Auto?</h2>
              <ul>
                <li>Expert bidding on Copart, IAAI, Manheim and other platforms</li>
                <li>Transparent pricing and detailed consultation</li>
                <li>Reliable logistics partners and on-time delivery</li>
              </ul>
              <h2>Typical import path</h2>
              <ol>
                <li>Requirements and budget</li>
                <li>Vehicle search and history-based evaluation</li>
                <li>Bidding and purchase at the best price</li>
                <li>Inland transport to port and ocean freight</li>
                <li>Customs/registration and final delivery</li>
              </ol>
              <p>
                For a quick fee estimate, use our{' '}
                <Link href="/en/auction-calculator" className="text-red-600 hover:text-red-700">auction calculator</Link>.
              </p>
            </div>
          </div>
        </section>

        <section className="py-12 bg-neutral-50">
          <div className="container mx-auto px-4">
            <div className="prose prose-neutral max-w-4xl mx-auto">
              <h2>Budget breakdown — what the total includes</h2>
              <ul>
                <li>Hammer price — the final lot price on the platform.</li>
                <li>Platform fees — Buyer’s Premium, Internet Bid, Gate/Storage as applicable.</li>
                <li>Documentation — Title processing/Release, Bill of Sale and related fees.</li>
                <li>Inland transport — delivery from yard to port (varies by state and distance).</li>
                <li>Ocean container — depends on port, season, and size.</li>                <li>Insurance — we include visual/engine/transmission coverage free of charge.</li>
                <li>Customs/Taxes — local tariffs and procedures.</li>
                <li>Registration/plates — local steps before delivery.</li>
              </ul>
              <h3>Timeline (typical)</h3>
              <ol>
                <li>Data collection & budgeting — 1–3 days</li>
                <li>Selection/Bidding — 3–10 days (depends on availability)</li>
                <li>Inland transport — 2–7 days</li>
                <li>Ocean container — 4–8 weeks</li>
                <li>Customs/Registration — 2–5 days</li>
              </ol>
              <h3>Glossary</h3>
              <ul>
                <li>Run & Drive — starts and moves on auction premises.</li>
                <li>Non-Runner — engine/transmission inoperable; container or special loading required.</li>
                <li>Salvage Title — damaged status; restoration/registration rules apply.</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="py-12 bg-neutral-50">
          <div className="container mx-auto px-4">
            <div className="prose prose-neutral max-w-4xl mx-auto">
              <h2>Frequently asked questions</h2>
              <details>
                <summary>How long does import take?</summary>
                <p>Typically 5–8 weeks depending on location and ocean schedule.</p>
              </details>
              <details>
                <summary>What guarantees do I have about condition?</summary>
                <p>We provide auction records, photo/video, and VIN history; professional inspection is available on request.</p>
              </details>
              <details>
                <summary>How much does transport cost?</summary>
                <p>It varies by size and state. Contact us and we will send a detailed analysis.</p>
              </details>
              <details>
                <summary>Container shipping options</summary>
                <p>Containers provide enhanced protection for high-value or non-running lots.</p>
              </details>
              <details>
                <summary>Can I get a pre-inspection?</summary>
                <p>Yes, we can arrange third-party inspection at auction premises upon agreement.</p>
              </details>
              <details>
                <summary>How do payments work?</summary>
                <p>Staged payments: auction amount/fees, inland transport, ocean freight, then customs.</p>
              </details>
            </div>
          </div>
        </section>

        <ContactSectionEn />
        <SocialMediaSectionEn />

        <Script
  id="auto-dealer-schema-en"
  type="application/ld+json"
  dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
/>

<Script
  id="faq-schema-auto-import-en"
  type="application/ld+json"
  dangerouslySetInnerHTML={{
    __html: JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: [
        { '@type': 'Question', name: 'How long does import take?', acceptedAnswer: { '@type': 'Answer', text: 'Typically 5–8 weeks depending on location and ocean schedule.' } },
        { '@type': 'Question', name: 'What guarantees do I have about condition?', acceptedAnswer: { '@type': 'Answer', text: 'We provide auction records, photo/video, and VIN history; professional inspection is available on request.' } },
        { '@type': 'Question', name: 'How much does transport cost?', acceptedAnswer: { '@type': 'Answer', text: 'It varies by size and state. Contact us and we will send a detailed analysis.' } },
        { '@type': 'Question', name: 'Container shipping options', acceptedAnswer: { '@type': 'Answer', text: 'Containers provide enhanced protection for high-value or non-running lots.' } },
        { '@type': 'Question', name: 'Can I get a pre-inspection?', acceptedAnswer: { '@type': 'Answer', text: 'Yes, we can arrange third-party inspection at auction premises upon agreement.' } },
        { '@type': 'Question', name: 'How do payments work?', acceptedAnswer: { '@type': 'Answer', text: 'Staged payments: auction amount/fees, inland transport, ocean freight, then customs.' } }
      ]
    })
  }}
/>

<Script
  id="howto-auto-import-en"
  type="application/ld+json"
  dangerouslySetInnerHTML={{
    __html: JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'HowTo',
      name: 'Car import from the USA — step by step',
      description: 'Selection, VIN checks, bidding, inland logistics, ocean container and customs in Georgia.',
      totalTime: 'P5W',
      step: [
        { '@type': 'HowToStep', name: 'Consultation', text: 'Define requirements and budget.' },
        { '@type': 'HowToStep', name: 'Selection', text: 'Filter candidates, analyze photos and VIN history.' },
        { '@type': 'HowToStep', name: 'Bidding', text: 'Participate with an agreed limit (Pre‑bid/Live).' },
        { '@type': 'HowToStep', name: 'Inland transport', text: 'Deliver the lot from yard to port.' },
        { '@type': 'HowToStep', name: 'Ocean container', text: 'Book container per schedule and budget.' },
        { '@type': 'HowToStep', name: 'Customs', text: 'Customs procedures and registration in Georgia.' },
        { '@type': 'HowToStep', name: 'Delivery', text: 'Vehicle handover with documents.' }
      ]
    })
  }}
/>



      <Script id="breadcrumb-car-import-en" type="application/ld+json" dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'BreadcrumbList',
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Home', item: `${siteConfig.url}/en` },
            { '@type': 'ListItem', position: 2, name: 'Car Import', item: `${siteConfig.url}/en/car-import` },
          ],
        }),
      }} />
    </>
  )
}
