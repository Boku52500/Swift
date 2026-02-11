import type { Metadata } from 'next'
import Link from 'next/link'
import Script from 'next/script'
import Image from 'next/image'
import { Shield, Search, DollarSign, Clock } from 'lucide-react'
import { siteConfig } from '@/lib/metadata'
import { ContactSectionEn } from '@/components/sections/contact-en'
import { SocialMediaSectionEn } from '@/components/sections/social-media-en'
import { AutoDealerSchema } from '@/components/seo/auto-dealer-schema'

export const metadata: Metadata = {
  title: 'US Auto Auctions | Copart & IAAI | Swift Auto',
  description: 'Buy cars at US auto auctions with expert support. ✓ Copart ✓ IAAI ✓ Transparent process from bidding to delivery in Georgia.',
  keywords: ['US auto auctions', 'Copart', 'IAAI', 'auction cars', 'Georgia', 'car import'],
  alternates: {
    canonical: `${siteConfig.url}/en/us-auto-auctions`,
    languages: {
      'x-default': `${siteConfig.url}/amerikis-avto-auqcioni`,
      'ka-GE': `${siteConfig.url}/amerikis-avto-auqcioni`,
      'en-US': `${siteConfig.url}/en/us-auto-auctions`,
      'ru-RU': `${siteConfig.url}/ru/aukciony-ssha`,
    },
  },
}

export default function UsAutoAuctionsPage() {
  const schema = AutoDealerSchema()
  return (
    <>
      <main>
        {/* Hero */}
        <section className="relative bg-neutral-900 text-white">
          <div className="absolute inset-0">
            <Image src="/images/auto-auqcioni-hero.jpg" alt="US Auto Auctions - Copart & IAAI" fill priority quality={90} sizes="(max-width: 1024px) 100vw, 1920px" className="object-cover" />
            <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-transparent" />
          </div>
          <div className="relative container mx-auto px-4 py-24 md:py-32">
            <div className="max-w-3xl space-y-6">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold">US Auto Auctions</h1>
              <p className="text-xl md:text-2xl text-neutral-200">Access to Copart and IAAI. Get the best prices with professional support.</p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="#contact" className="inline-flex items-center justify-center rounded-md bg-red-600 hover:bg-red-700 px-6 py-3 text-white font-medium">Contact us</Link>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Why choose our auction service</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="text-center space-y-4">
                <div className="w-16 h-16 mx-auto bg-red-100 rounded-full flex items-center justify-center">
                  <Search className="w-8 h-8 text-red-600" />
                </div>
                <h3 className="text-xl font-semibold">Access to all auctions</h3>
                <p className="text-neutral-600">
                  Access to <Link href="/en/us-auto-auctions" className="text-red-600 hover:text-red-700">US auto auctions</Link>, including Copart and IAAI
                </p>
              </div>

              <div className="text-center space-y-4">
                <div className="w-16 h-16 mx-auto bg-red-100 rounded-full flex items-center justify-center">
                  <DollarSign className="w-8 h-8 text-red-600" />
                </div>
                <h3 className="text-xl font-semibold">Best prices</h3>
                <p className="text-neutral-600">
                  <Link href="/en/used-cars" className="text-red-600 hover:text-red-700">Used cars</Link> at optimal value with professional bidding
                </p>
              </div>

              <div className="text-center space-y-4">
                <div className="w-16 h-16 mx-auto bg-red-100 rounded-full flex items-center justify-center">
                  <Shield className="w-8 h-8 text-red-600" />
                </div>
                <h3 className="text-xl font-semibold">Safe transactions</h3>
                <p className="text-neutral-600">
                  Full transparency and insured operations through our <Link href="/en/car-import" className="text-red-600 hover:text-red-700">car import</Link> service
                </p>
              </div>

              <div className="text-center space-y-4">
                <div className="w-16 h-16 mx-auto bg-red-100 rounded-full flex items-center justify-center">
                  <Clock className="w-8 h-8 text-red-600" />
                </div>
                <h3 className="text-xl font-semibold">Fast service</h3>
                <p className="text-neutral-600">
                  <Link href="/en/cars-from-usa" className="text-red-600 hover:text-red-700">Transport from the USA</Link> with 24/7 support
                </p>
              </div>
            </div>
          </div>
        </section>

        

        <section className="py-12 bg-white">
          <div className="container mx-auto px-4">
            <div className="prose prose-neutral max-w-4xl mx-auto">
              <h2>How it works</h2>
              <p>
                Swift Auto Import helps you buy cars at US auto auctions — Copart and IAAI — at the best value and ship them safely to Georgia. We run the full cycle: pre-checks and selection, bidding, inland transport, ocean container, customs, and delivery in Tbilisi.
              </p>
              <h3>Why auctions?</h3>
              <ul>
                <li>Wide selection with transparent VIN history</li>
                <li>Competitive prices in open bidding</li>
                <li>Fully documented processes</li>
              </ul>
              <h3>Step-by-step plan</h3>
              <ol>
                <li>Consultation and budget</li>
                <li>Vehicle selection and evaluation</li>
                <li>Bidding and purchase</li>
                <li>Inland transport to port and ocean container</li>
                <li>Customs clearance in Georgia and delivery</li>
              </ol>
              <p>
                Want to see the full import process? Visit <Link href="/en/car-import" className="text-red-600 hover:text-red-700">Car Import</Link>.
              </p>
            </div>
          </div>
        </section>

        <section className="py-12 bg-neutral-50">
          <div className="container mx-auto px-4">
            <div className="prose prose-neutral max-w-4xl mx-auto">
              <h2>Costs and auction types</h2>
              <ul>
                <li>Hammer price — auction winning price, plus platform fees.</li>
                <li>Buyer’s Premium/Internet Bid — standard platform fees.</li>
                <li>Gate/Storage — may apply depending on location.</li>
                <li>Inland transport — from the yard to the port.</li>
                <li>Ocean container — predictable schedules and added protection.</li>
                <li>Customs & registration — by local rules.</li>
              </ul>
              <h3>Copart vs IAAI — differences</h3>
              <p>Both platforms are reliable with VIN records. Categories and bidding modes differ (Pre-bid/Live/Buy It Now). We choose the optimal path.</p>
              <h3>Documents & compliance</h3>
              <ul>
                <li>Title types — Clean/Salvage/Rebuilt: affect registration and value differently.</li>
                <li>Bill of Sale, Export Release — documents for export and ownership.</li>
              </ul>
              <h3>Bidding strategy</h3>
              <ul>
                <li>Bid limit — define the max including platform fees.</li>
                <li>Pre-bid vs Live — understand activity/competition.</li>
                <li>Buy It Now — fast purchase at a fair market price.</li>
              </ul>
              <h3>Typical timelines</h3>
              <ol>
                <li>Selection/Bidding — 3–10 days</li>
                <li>Inland transport — 2–7 days</li>
                <li>Ocean container — 4–8 weeks</li>
                <li>Customs/Registration — 2–5 days</li>
              </ol>
              <h3>Glossary</h3>
              <ul>
                <li>Run & Drive — vehicle starts and moves.</li>
                <li>Enhanced Vehicles — lots prepared/secured by the platform.</li>
                <li>On-Approval — seller must confirm the sale.</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="py-12 bg-neutral-50">
          <div className="container mx-auto px-4">
            <div className="prose prose-neutral max-w-4xl mx-auto">
              <h2>Frequently asked questions</h2>
              <details>
                <summary>How long does the process take?</summary>
                <p>Typically 4–8 weeks depending on location and ocean container schedules.</p>
              </details>
              <details>
                <summary>Can I buy damaged cars?</summary>
                <p>Yes. We assess condition and explain risks for both Run & Drive and Salvage lots.</p>
              </details>
              <details>
                <summary>How is the final budget calculated?</summary>
                <p>Hammer price + platform fees + inland transport + ocean container + customs. See our <Link href="/en/auction-calculator" className="text-red-600 hover:text-red-700">auction calculator</Link>.</p>
              </details>
            </div>
          </div>
        </section>

        <section className="py-12 bg-white">
          <div className="container mx-auto px-4">
            <div className="prose prose-neutral max-w-4xl mx-auto">
              <h2>Deep guide — how to prepare for auctions</h2>
              <p>
                Success at auctions starts with a clear use case, a disciplined budget, and rigorous checks. We define must‑haves (safety packages,
                drivetrain, mileage), set a hard cap including all platform fees, and cross‑check VIN history, photos and auction records to avoid
                hidden risks.
              </p>
              <h3>What we analyze in photos and records</h3>
              <ul>
                <li>Panel gaps, paint match, flood/hail/theft recovery indicators.</li>
                <li>Frame / structural mounts, rails, bumpers and underbody hints.</li>
                <li>Interior condition, airbags status, odors, traces of water.</li>
                <li>Engine/transmission clues — leaks/foam/masking agents.</li>
                <li>Run & Drive vs Non‑Runner consistency with the description.</li>
              </ul>

              <h3>Bidding strategies</h3>
              <ul>
                <li>Pre‑bid — gauge interest; do not reveal the true max early.</li>
                <li>Live — stick to the agreed cap (includes all fees); no emotion.</li>
                <li>Buy It Now — use only when price is objectively fair and time matters.</li>
                <li>Seller type — institutional sellers/liquidators are often more predictable.</li>
              </ul>

              <h3>Risk management</h3>
              <ul>
                <li>Independent inspection for higher‑value lots.</li>
                <li>Gate/Storage mitigation — rapid pickup and pre‑booked containers.</li>
                <li>Documents (Title/Bill of Sale/Export Release) verified before transit.</li>
              </ul>

              <h3>Budget examples (structure)</h3>
              <p>
                Final bid + platform fees + Gate/Storage (if any) + inland transport + ocean container + customs/registration + 5–10% contingency.
                Run a detailed estimate in our <Link href="/en/auction-calculator" className="text-red-600 hover:text-red-700">auction calculator</Link>.
              </p>

              <h3>Buyer personas</h3>
              <ul>
                <li><strong>Daily driver</strong> — economical sedan/crossover, container for predictable timelines.</li>
                <li><strong>Family</strong> — 5–7 seats, ADAS, AWD where needed; protected transit in a container.</li>
                <li><strong>Premium</strong> — low mileage, strict condition criteria; container is a must.</li>
                <li><strong>EV/Hybrid</strong> — battery health diagnostics; temperature considerations in transit.</li>
              </ul>

              <h3>Pre‑bid checklist</h3>
              <ul>
                <li>Full VIN checks (Carfax/Autocheck or equivalent) + photo analysis.</li>
                <li>Hard budget cap including all platform fees.</li>
                <li>Container schedule pre‑booked and inland logistics aligned.</li>
                <li>Consider potential yard/port fees (Gate/Storage).</li>
              </ul>

              <h3>Next step</h3>
              <p>
                Visit <Link href="/en/cars-from-usa" className="text-red-600 hover:text-red-700">Cars from USA</Link> and
                <Link href="/en/used-cars" className="text-red-600 hover:text-red-700"> Used Cars</Link>, then contact us — we’ll shape the bidding plan,
                container schedule and a transparent budget for your goals.
              </p>
            </div>
          </div>
        </section>

        

        <section className="py-12 bg-neutral-50">
          <div className="container mx-auto px-4">
            <div className="prose prose-neutral max-w-4xl mx-auto">
              <h2>Common mistakes and how to avoid them</h2>
              <ul>
                <li>Emotional Live bidding — we maintain discipline and a pre‑agreed cap.</li>
                <li>Document mismatch — we pre‑check Title/Export Release requirements.</li>
                <li>Logistics delays — we pre‑book container slots and sync inland transport.</li>
                <li>Skipping inspections — for higher‑value lots we arrange independent checks.</li>
              </ul>
              <h3>Need advice?</h3>
              <p>
                Message us now to get a free consultation — we’ll build a bidding plan, container schedule and a transparent full budget.
              </p>
            </div>
          </div>
        </section>

        <section className="py-12 bg-white">
          <div className="container mx-auto px-4">
            <div className="prose prose-neutral max-w-4xl mx-auto">
              <h2>Platform deep comparison — Copart vs IAAI in detail</h2>
              <p>
                Both platforms operate with transparent rules and VIN records, but differ by categories, yard types, fee structures and
                bidding modes. Copart often has more Run & Drive inventory; IAAI can be more stable in some locations. Buy It Now can be
                attractive when the listed price is objectively fair — timing is key.
              </p>
              <ul>
                <li>Documentation — Title/Bill of Sale/Export Release: timelines vary by location.</li>
                <li>Seller type — dealers/finance companies often manage risks more predictably.</li>
                <li>Bidding modes — Pre‑bid/Live; the correct cap includes all platform fees and inland transport.</li>
                <li>On‑Approval — seller confirmation may be required to finalize price.</li>
              </ul>

              <h2>Loading process — packing, loading, monitoring</h2>
              <p>
                We plan container bookings in advance to secure predictable timelines and reduce Gate/Storage fees. Before loading we take
                photo/video evidence; we add extra securing (straps, bracing) when needed to minimize transit risk. Tracking data is
                shared once loaded.
              </p>
              <ol>
                <li>Booking — per schedule.</li>
                <li>Inland sync — yard to port on time.</li>
                <li>Loading & securing — by safety protocol.</li>
                <li>Tracking — progress shared with you.</li>
              </ol>

              <h2>Safety and insurance</h2>
              <p>
                For higher‑value lots we offer extended insurance and, where useful, independent inspections. Documents are verified before
                transit to avoid customs delays. Container operations are transparent — photos, tracking and an ETA upfront.
              </p>

              <h2>Budget examples — three scenarios</h2>
              <ul>
                <li><strong>Economy</strong> — compact sedan/crossover, essential equipment; focus on a lower hammer price.</li>
                <li><strong>Mid</strong> — family SUV with safety suites (ADAS), low mileage; balance price/comfort.</li>
                <li><strong>Premium</strong> — lower mileage, stricter inspection; container is recommended for max protection.</li>
              </ul>
              <p>
                In all scenarios the structure is: auction price + platform fees + Gate/Storage (location‑dependent) + inland transport +
                ocean container + customs/registration + 5–10% contingency. For a detailed estimate see our
                {' '}<Link href="/en/auction-calculator" className="text-red-600 hover:text-red-700">auction calculator</Link>.
              </p>

              <h2>Questions to ask a dealer</h2>
              <ul>
                <li>When was the last service and are there records?</li>
                <li>Any signs of water/hail/theft in photos/records?</li>
                <li>Is third‑party pre‑inspection possible?</li>
                <li>Estimated price/timeline for inland transport from this yard?</li>
                <li>Which port/container schedule is optimal for this period?</li>
              </ul>

              <h2>Next steps</h2>
              <p>
                Visit <Link href="/en/cars-from-usa" className="text-red-600 hover:text-red-700">Cars from USA</Link>,
                {' '}<Link href="/en/used-cars" className="text-red-600 hover:text-red-700">Used Cars</Link>
                {' '}and <Link href="/en/car-import" className="text-red-600 hover:text-red-700">Car Import</Link>; then contact us to align the budget,
                bidding strategy and a container schedule for your goals.
              </p>
            </div>
          </div>
        </section>

        <section className="py-12 bg-white">
          <div className="container mx-auto px-4">
            <div className="prose prose-neutral max-w-4xl mx-auto">
              <h2>Categories, statuses and lot fields</h2>
              <p>
                Correct interpretation of platform terms is essential. “Run & Drive” means the vehicle starts and moves in the yard;
                “Engine Start Program/Starts” — engine starts but does not move; “Stationary/Non‑Runner” — does not move and requires
                special loading or a container. Pay attention to: Primary/Secondary Damage, Keys: Yes/No, Odometer: Actual/Not Actual/Exempt.
              </p>
              <h3>VIN decoding and history sources</h3>
              <ul>
                <li>VIN decoder — equipment/engine/transmission basics.</li>
                <li>History checks — Carfax/Autocheck.</li>
                <li>Compare photos/records — ensure description consistency.</li>
              </ul>

              <h2>Customs and registration in Georgia — practical guide</h2>
              <ol>
                <li>Receive docs — Title/Bill of Sale/Export Release and invoice.</li>
                <li>Estimate duties — with a preliminary calculator.</li>
                <li>Customs clearance — per rules and timelines.</li>
                <li>Registration — technical inspection and plates where required.</li>
              </ol>
              <p>
                We plan each step in advance so that once the container arrives we minimize delays and extra costs.
              </p>

              <h2>Selection nuances — how to avoid extra risk</h2>
              <ul>
                <li>For the same model, compare several locations/auctions to benchmark prices.</li>
                <li>Search older photos/listings online for the same VIN.</li>
                <li>Do not raise your Live cap emotionally — once a max is set, stick to it.</li>
              </ul>
            </div>
          </div>
        </section>

        <ContactSectionEn />
        <SocialMediaSectionEn />
      </main>

      <Script id="auto-dealer-schema-auction-en" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />

      <Script id="faq-schema-auction-en" type="application/ld+json" dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          mainEntity: [
            { '@type': 'Question', name: 'How long does the process take?', acceptedAnswer: { '@type': 'Answer', text: 'Typically 4–8 weeks depending on location and ocean container schedules.' } },
            { '@type': 'Question', name: 'Can I buy damaged cars?', acceptedAnswer: { '@type': 'Answer', text: 'Yes. We assess condition and explain risks for both Run & Drive and Salvage lots.' } },
            { '@type': 'Question', name: 'How is the final budget calculated?', acceptedAnswer: { '@type': 'Answer', text: 'Hammer + platform fees + inland transport + ocean container + customs.' } },
            { '@type': 'Question', name: 'Copart vs IAAI — differences?', acceptedAnswer: { '@type': 'Answer', text: 'Both are reliable with VIN records; categories and bidding modes differ (Pre‑bid/Live/Buy It Now).' } },
            { '@type': 'Question', name: 'What documents will I receive after purchase?', acceptedAnswer: { '@type': 'Answer', text: 'Title/Bill of Sale, Export Release and transport docs — all steps are documented.' } },
            { '@type': 'Question', name: 'When is a container advisable?', acceptedAnswer: { '@type': 'Answer', text: 'For non‑runner or higher‑value lots; for added protection and predictable timelines.' } },
            { '@type': 'Question', name: 'How long to book a container slot?', acceptedAnswer: { '@type': 'Answer', text: 'Usually a few days to a week; pre‑booking recommended in peak seasons.' } },
            { '@type': 'Question', name: 'Can we arrange third‑party inspection at the yard?', acceptedAnswer: { '@type': 'Answer', text: 'Yes, we can organize an independent inspection for high‑value or specific lots.' } },
            { '@type': 'Question', name: 'How are payments staged?', acceptedAnswer: { '@type': 'Answer', text: 'Staged: auction fees/commissions, inland transport, ocean container, customs/registration.' } }
          ]
        })
      }} />

      <Script id="howto-auction-en" type="application/ld+json" dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'HowTo',
          name: 'Buying at US auto auctions — step by step',
          description: 'Account prep, selection, bidding, inland logistics, ocean container, and customs/hand‑off in Georgia.',
          totalTime: 'P4W',
          step: [
            { '@type': 'HowToStep', name: 'Consultation/Budget', text: 'Define budget and include platform fees.' },
            { '@type': 'HowToStep', name: 'Selection/Checks', text: 'VIN history, photos, and auction records.' },
            { '@type': 'HowToStep', name: 'Bidding', text: 'Pre‑bid/Live within agreed limits.' },
            { '@type': 'HowToStep', name: 'Invoice/Payment', text: 'Settle invoice within the deadline.' },
            { '@type': 'HowToStep', name: 'Transport', text: 'Inland to port and ocean container.' },
            { '@type': 'HowToStep', name: 'Customs/Delivery', text: 'Customs in Georgia and hand‑off.' }
          ]
        })
      }} />

      <Script id="breadcrumb-auction-en" type="application/ld+json" dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'BreadcrumbList',
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Home', item: `${siteConfig.url}/en` },
            { '@type': 'ListItem', position: 2, name: 'US Auto Auctions', item: `${siteConfig.url}/en/us-auto-auctions` },
          ],
        }),
      }} />
    </>
  )
}
