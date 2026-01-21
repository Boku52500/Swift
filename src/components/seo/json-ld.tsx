import { ReactNode } from 'react'

interface FAQItem {
  question: string
  answer: string | ReactNode
}

interface BusinessInfo {
  name: string
  description: string
  telephone: string
  address: {
    streetAddress: string
    addressLocality: string
    addressRegion: string
    addressCountry: string
  }
  geo: {
    latitude: number
    longitude: number
  }
  openingHours: string[]
  url: string
}

export function LocalBusinessSchema({ business }: { business: BusinessInfo }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "AutoDealer",
    ...business,
    address: {
      "@type": "PostalAddress",
      ...business.address,
    },
    geo: {
      "@type": "GeoCoordinates",
      ...business.geo,
    },
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

export function FAQSchema({ items }: { items: FAQItem[] }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: typeof item.answer === 'string' ? item.answer : 'Please visit our website for the detailed answer.',
      },
    })),
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}
