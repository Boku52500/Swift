import type { Metadata } from 'next'
import Link from 'next/link'
import Script from 'next/script'
import { siteConfig } from '@/lib/metadata'
import { ContactSectionEn } from '@/components/sections/contact-en'
import { SocialMediaSectionEn } from '@/components/sections/social-media-en'
import { CarsFromAmericaHeroSectionEn } from '@/components/sections/manqanebi-amerikidan-hero-en'
import { PopularCarsShowcaseEn } from '@/components/sections/popular-cars-showcase-en'
import { AutoDealerSchema } from '@/components/seo/auto-dealer-schema'

export const metadata: Metadata = {
  title: 'Cars from USA | Import and Delivery | Swift Auto',
  description: 'We help you select US cars with verified history, bid on Copart/IAAI, arrange transport and customs, and deliver in Georgia.',
  alternates: {
    canonical: `${siteConfig.url}/en/cars-from-usa`,
    languages: {
      'x-default': `${siteConfig.url}/manqanebi-amerikidan`,
      'ka-GE': `${siteConfig.url}/manqanebi-amerikidan`,
      'en-US': `${siteConfig.url}/en/cars-from-usa`,
      'ru-RU': `${siteConfig.url}/ru/avto-iz-ssha`,
    },
  },
}

export default function CarsFromUsaEn() {
  const schema = AutoDealerSchema()
  return (
    <>
      <CarsFromAmericaHeroSectionEn />
      <PopularCarsShowcaseEn />

      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="prose prose-neutral max-w-4xl mx-auto">
            <h2>How we select the right US vehicle for you</h2>
            <p>
              The right purchase starts with a clear picture of your goals, constraints and must‑have options. We translate your
              brief into a criteria matrix (engine size and type, drivetrain, year range, mileage, safety packages, trim priorities)
              and search Copart/IAAI and complementary sources accordingly. Every candidate is evaluated beyond photos: VIN records,
              market value, damage types and the internal consistency of evidence.
            </p>
            <ul>
              <li>VIN history — incidents, ownership changes, service and recall events where available.</li>
              <li>Photo forensics — body/suspension indicators and “red flags” that often predict hidden costs.</li>
              <li>Comparable sales — realistic ranges for similar models and configurations.</li>
              <li>Parts availability — typical weak points and repair pathways per model.</li>
            </ul>

            <h2>Comparing candidates and building a bidding plan</h2>
            <p>
              We compile a short‑list table and score each lot by condition, expected risk, future value and all‑in budget.
              The bidding plan includes conservative/market/aggressive caps so the final cost remains optimal and predictable.
            </p>
            <ol>
              <li>Conservative cap — minimum‑risk scenario and safe stop price.</li>
              <li>Market cap — tuned to typical activity on the specific platform and category.</li>
              <li>Aggressive cap — for rare configurations where timing matters, agreed in advance.</li>
            </ol>

            <h2>Budget models — by use case</h2>
            <p>
              For different purposes we prepare budget templates that separate platform fees, inland transport, ocean container,
              insurance, customs/registration and contingency. This gives you a realistic picture before you commit.
            </p>
            <ul>
              <li><strong>City sedan</strong> — low maintenance, economical running costs, easy parts.</li>
              <li><strong>Family SUV</strong> — safety and space, AWD/4x4 where needed; structural/suspension diligence.</li>
              <li><strong>Hybrid/EV</strong> — battery diagnostics and model‑specific risk factors.</li>
              <li><strong>Premium</strong> — lower mileage, complete documentation trail, protected logistics.</li>
            </ul>

            <h2>Container shipping and inland logistics</h2>
            <p>
              We schedule yard‑to‑port delivery based on geography and throughput. For the ocean leg we use containers —
              the right choice for non‑running or higher‑value vehicles and whenever predictability and protection matter most.
              Movements are documented with photos and paperwork end‑to‑end.
            </p>

            <h2>Risk management and documentation</h2>
            <ul>
              <li>Cross‑check VIN records against photos and descriptions.</li>
              <li>Independent inspection available on request.</li>
              <li>Pre‑bookings with plan‑B dates in case of congestion.</li>
              <li>Pre‑validation of customs paperwork to prevent delays.</li>
            </ul>

            <h2>What we need from you to start fast</h2>
            <p>
              The clearer the brief, the faster we can find the right car. Helpful inputs: intended use, year/mileage ranges,
              fuel and drivetrain preferences, safety/space requirements (third row, AWD/4x4), styling preferences, and a
              conservative‑to‑stretch budget window.
            </p>
          </div>
        </div>
      </section>

      <section id="content" className="py-12 bg-white">
          <div className="container mx-auto px-4">
            <div className="prose prose-neutral max-w-4xl mx-auto">
              <h2>Cars from the USA — how we work</h2>
              <p>
                We help you select a US vehicle with a reliable history and documentation, run bidding, manage inland transport,
ocean container shipping, and customs in Georgia. The process is transparent and predictable — we provide detailed consultation at each step.              </p>
              <h2>Advantages</h2>
              <ul>
                <li>Large selection from Copart/IAAI auctions</li>
                <li>VIN history and thorough condition checks</li>
                <li>Reliable logistics and on-time delivery</li>
              </ul>
              <h2>Steps</h2>
              <ol>
                <li>Consultation and budget</li>
                <li>Selection/Evaluation and bidding</li>
<li>Transport to port and ocean container</li>
                <li>Customs clearance and delivery</li>
              </ol>
              <p>
                For fee estimates use our{' '}
                <Link href="/en/auction-calculator" className="text-red-600 hover:text-red-700">auction calculator</Link>{' '}
                and see more details on the{' '}
                <Link href="/en/car-import" className="text-red-600 hover:text-red-700">car import</Link> page.
              </p>
            </div>
          </div>
        </section>

      <section className="py-12 bg-neutral-50">
          <div className="container mx-auto px-4">
            <div className="prose prose-neutral max-w-4xl mx-auto">
              <h2>Cost structure and transport types</h2>
              <ul>
                <li>Hammer price — winning amount on auction.</li>
                <li>Auction fees — Buyer’s Premium, Internet Bid, Gate/Storage as needed.</li>
                <li>Inland transport — yard to port delivery by state and distance.</li>
<li>Ocean container — predictable schedules, clear budgeting, and added protection.</li>
<li>Customs and registration — under local regulations and tariffs.</li>
              </ul>
<h3>Container shipping — when to use it?</h3>
         <p>
                Containers are used for high‑value or non‑running lots and add protection.
              </p>
              <h3>Documents</h3>
              <ul>
                <li>Title (Clean/Salvage/Rebuilt) — affects registration eligibility.</li>
                <li>Bill of Sale — ownership transfer document.</li>
                <li>Export Release — permission to export from port.</li>
              </ul>
              <h3>Timelines — typical</h3>
              <ol>
                <li>Selection/Bidding — 3–10 days</li>
                <li>Inland to port — 2–7 days</li>
<li>Ocean container — 4–8 weeks</li>          
<li>Customs/Delivery — 2–5 days</li>
              </ol>
            </div>
          </div>
      </section>

      <section className="py-12 bg-neutral-50">
          <div className="container mx-auto px-4">
            <div className="prose prose-neutral max-w-4xl mx-auto">
              <h2>Frequently asked questions</h2>
              <details>
                <summary>How do you check vehicle history?</summary>
                <p>We use official VIN services and auction records. Third‑party inspection is available when needed.</p>
              </details>
              <details>
                <summary>How long does shipping take?</summary>
                <p>Typically 4–8 weeks depending on port and season.</p>
              </details>
              <details>
                <summary>Can bidding strategy be adjusted?</summary>
                <p>We choose the bidding strategy by budget and risk tolerance to reach an optimal price.</p>
              </details>
              <details>
                <summary>Container shipping — when to use it?</summary>
<p>Containers provide extra protection for non‑runners and higher‑value lots and help keep schedules predictable.</p>
              </details>
              <details>
                <summary>Can I arrange pre‑inspection?</summary>
                <p>Yes. We can organize third‑party inspection at the auction yard upon agreement.</p>
              </details>
              <details>
                <summary>How are payments made?</summary>
                <p>In stages: auction fees, inland transport, ocean container, then customs/registration.</p>
              </details>
            </div>
          </div>
      </section>

      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="prose prose-neutral max-w-4xl mx-auto">
            <h2>Why cars from the USA make sense in Georgia</h2>
            <p>
              US‑market vehicles combine rich configurations, proven maintenance culture, and transparent auction records. For many buyers in Georgia,
              this brings better value compared to local inventory — especially when the process is handled end‑to‑end with clear budgeting and a
              container shipping plan.
            </p>
            <ul>
              <li>Richer trims and safety packages than typical EU imports of the same year.</li>
              <li>Wide choice across sedans, SUVs, trucks, hybrids and EVs.</li>
              <li>Predictable logistics using ocean containers and pre‑booked schedules.</li>
              <li>Full ownership trail via titles and auction documentation.</li>
            </ul>

            <h3>Who it’s for — buyer profiles</h3>
            <ul>
              <li><strong>Budget‑minded daily driver</strong> — compact sedan or crossover with low running costs.</li>
              <li><strong>Family upgrader</strong> — mid‑size SUV with ADAS, AWD, and 3‑row options.</li>
              <li><strong>Efficiency seeker</strong> — hybrid/plug‑in/EV with verified battery health.</li>
              <li><strong>Premium enthusiast</strong> — clean history, lower mileage, and protected logistics.</li>
            </ul>

            <h2>Complete cost breakdown — example budgets</h2>
            <p>
              We build a transparent budget that separates auction hammer price and fees, inland transport, ocean container, insurance, customs/registration,
              and a sensible contingency. Here are typical ranges (illustrative; contact us for an itemized quote for your case):
            </p>
            <h3>City sedan</h3>
            <ul>
              <li>Hammer + fees — determined by model/year/condition.</li>
              <li>Inland transport — distance and state dependent.</li>
              <li>Ocean container — by port, season, and size.</li>
              <li>Insurance — visual/engine/transmission coverage available.</li>
              <li>Customs/registration — per local rules.</li>
            </ul>
            <h3>Family SUV</h3>
            <p>Focus on safety features, AWD, and structural checks; budget similar line items with slightly higher logistics and duties.</p>
            <h3>Hybrid/EV</h3>
            <p>Battery diagnostics (mileage, age, service history); inland handling and container loading can differ for EVs.</p>
            <h3>Premium/Performance</h3>
            <p>Stricter condition thresholds and documentation; we recommend container loading with additional tie‑down and protection.</p>

            <h2>Risk mitigation — how we keep outcomes predictable</h2>
            <ul>
              <li>Title status verification (Clean/Salvage/Rebuilt) and registration implications.</li>
              <li>VIN vs photos consistency checks to avoid hidden damage narratives.</li>
              <li>Damage taxonomy understanding (front/rear, flood, frame, hail) and cost impact.</li>
              <li>Storage/gate fee control with rapid post‑win dispatch.</li>
              <li>Container booking windows and backup options during peak seasons.</li>
              <li>Pre‑validation of customs paperwork to prevent hold‑ups.</li>
            </ul>

            <h2>Bidding strategy — conservative to aggressive</h2>
            <p>
              After short‑listing, we agree on three caps (conservative/market/aggressive) and use platform‑specific tactics (pre‑bid vs live, proxy rules,
              and incremental steps) so you never exceed the planned all‑in budget.
            </p>

            <h2>Common scenarios and mistakes</h2>
            <ul>
              <li>Chasing a rare trim without adjusting the cap — solved by setting realistic ranges up front.</li>
              <li>Underestimating inland distances — solved with early lane quotes by state/route.</li>
              <li>Ignoring storage windows — we dispatch quickly to avoid avoidable fees.</li>
              <li>Assuming any cosmetic damage is trivial — we price structural and suspension risks properly.</li>
            </ul>

            <h2>Pre‑purchase checklist</h2>
            <ul>
              <li>Define use case (daily, family, work, premium) and must‑have features.</li>
              <li>Set a budget window and agree caps before bidding.</li>
              <li>Confirm documentation targets (title type, records) and insurance need.</li>
              <li>Decide on delivery timing and container schedule flexibility.</li>
            </ul>

            <h2>After‑arrival checklist</h2>
            <ul>
              <li>Document handover, photos, and verification of VIN against paperwork.</li>
              <li>Basic service items (fluids, filters, tires) and alignment checks.</li>
              <li>Registration/plates and any planned detailing or repairs.</li>
            </ul>

            <h2>Ready to start? Get a clear plan today</h2>
            <p>
              Use the{' '}
              <Link href="/en/auction-calculator" className="text-red-600 hover:text-red-700">auction calculator</Link>{' '}
              to estimate fees, read more about our{' '}
              <Link href="/en/car-import" className="text-red-600 hover:text-red-700">car import</Link>{' '}
              and{' '}
              <Link href="/en/us-auto-auctions" className="text-red-600 hover:text-red-700">US auto auctions</Link>{' '}
              services, and browse{' '}
              <Link href="/en/popular-cars" className="text-red-600 hover:text-red-700">popular cars</Link>{' '}
              to refine your short‑list. We’ll turn your brief into a transparent budget and a predictable container shipping schedule.
            </p>
          </div>
        </div>
      </section>

      <section className="py-12 bg-neutral-50">
        <div className="container mx-auto px-4">
          <div className="prose prose-neutral max-w-4xl mx-auto">
            <h2>FAQ — extended details</h2>
            <details>
              <summary>What affects inland transport cost?</summary>
              <p>Origin state, route availability, vehicle condition (running vs non‑running), and seasonality.</p>
            </details>
            <details>
              <summary>Why use a container for the ocean leg?</summary>
              <p>Predictable schedules and extra protection for higher‑value or non‑running vehicles; easier planning around port congestion.</p>
            </details>
            <details>
              <summary>Can you help with parts sourcing?</summary>
              <p>Yes — we can advise typical weak points and parts availability for popular US models.</p>
            </details>
            <details>
              <summary>Do you offer inspection?</summary>
              <p>We can arrange third‑party inspection at the auction yard upon agreement.</p>
            </details>
          </div>
        </div>
      </section>

      <ContactSectionEn />
      <SocialMediaSectionEn />

      <Script
  id="auto-dealer-schema-cars-usa-en"
  type="application/ld+json"
  dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
/>

<Script
  id="faq-schema-cars-usa-en"
  type="application/ld+json"
  dangerouslySetInnerHTML={{
    __html: JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: [
        { '@type': 'Question', name: 'How do you check vehicle history?', acceptedAnswer: { '@type': 'Answer', text: 'We use official VIN services and auction records. Third‑party inspection is available when needed.' } },
        { '@type': 'Question', name: 'How long does shipping take?', acceptedAnswer: { '@type': 'Answer', text: 'Typically 4–8 weeks depending on port and season.' } },
        { '@type': 'Question', name: 'Can bidding strategy be adjusted?', acceptedAnswer: { '@type': 'Answer', text: 'We choose the bidding strategy by budget and risk tolerance to reach an optimal price.' } },
        { '@type': 'Question', name: 'Container shipping — when to use it?', acceptedAnswer: { '@type': 'Answer', text: 'Use containers for non‑runners and higher‑value vehicles or when you want predictable schedules and added protection.' } },
        { '@type': 'Question', name: 'Can I arrange pre‑inspection?', acceptedAnswer: { '@type': 'Answer', text: 'Yes. We can organize third‑party inspection at the auction yard upon agreement.' } },
        { '@type': 'Question', name: 'How are payments made?', acceptedAnswer: { '@type': 'Answer', text: 'In stages: auction fees, inland transport, ocean container, then customs/registration.' } }
      ]
    })
  }}
/>

<Script
  id="howto-cars-usa-en"
  type="application/ld+json"
  dangerouslySetInnerHTML={{
    __html: JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'HowTo',
      name: 'Cars from USA — step by step',
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

      <Script id="breadcrumb-cars-from-usa-en" type="application/ld+json" dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'BreadcrumbList',
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Home', item: `${siteConfig.url}/en` },
            { '@type': 'ListItem', position: 2, name: 'Cars from USA', item: `${siteConfig.url}/en/cars-from-usa` },
          ],
        }),
      }} />
    </>
  )
}
