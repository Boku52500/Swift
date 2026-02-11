import Link from 'next/link'

const faqItems = [
  {
    question: 'How long does it take to import a car from the USA to Georgia?',
    answer: <>Typical end-to-end delivery is 45–60 days: processing after purchase (4–7 days), inland to port (4–7 days), and ocean freight (30–40 days). See <Link href="/en/us-auto-auctions" className="text-red-600 hover:text-red-700">US auto auctions</Link>.</>,
  },
  {
    question: 'What costs are involved in importing a car?',
    answer: <>Total includes hammer price, <Link href="/en/us-auto-auctions" className="text-red-600 hover:text-red-700">auction</Link> fees, inland/ocean transport, and customs (depends on year/engine). We provide a detailed quote before purchase.</>,
  },
  {
    question: 'Do you help with registration in Georgia?',
    answer: 'Yes, we provide full support for registration: paperwork, inspection scheduling, and registration with the Service Agency.',
  },
  {
    question: 'Which US auto auctions do you work with?',
    answer: <>We cover all leading platforms including Copart, IAAI, Manheim, and Adesa. Our team has access to thousands of vehicles and can <Link href="/en/cars-from-usa" className="text-red-600 hover:text-red-700">import US cars</Link> within your budget.</>,
  },
  {
    question: 'What types of vehicles can be imported to Georgia?',
    answer: <>Almost all types of <Link href="/en/cars-from-usa" className="text-red-600 hover:text-red-700">cars from the USA</Link> can be imported — SUVs, trucks, and motorcycles included — subject to local regulations on age/emissions. Our services: <Link href="/en/cars-from-usa" className="text-red-600 hover:text-red-700">cars from USA</Link> and <Link href="/en/used-cars" className="text-red-600 hover:text-red-700">used cars</Link> at great value.</>,
  },
]

export function FAQSectionEn() {
  return (
    <section id="faq" className="py-16">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-3xl font-bold mb-4">Frequently Asked Questions</h2>
          <p className="text-neutral-600">General questions about <Link href="/en/car-import" className="text-red-600 hover:text-red-700">car import</Link></p>
        </div>
        <div className="max-w-3xl mx-auto divide-y divide-neutral-100">
          {faqItems.map((item, i) => (
            <div key={i} className="py-6">
              <h3 className="text-lg font-semibold mb-2">{item.question}</h3>
              <p className="text-neutral-600">{item.answer}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
