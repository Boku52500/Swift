import { siteConfig } from '@/lib/metadata'

interface BreadcrumbItem {
  name: string
  path: string
}

export const BreadcrumbSchema = ({ items }: { items: BreadcrumbItem[] }) => {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": `${siteConfig.url}${item.path}`
    }))
  }
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
}

export const LocalBusinessSchema = () => {
  const schema = {
    "@context": "https://schema.org",
    "@type": "AutoDealer",
    "name": siteConfig.name,
    "image": `${siteConfig.url}${siteConfig.ogImage}`,
    "url": siteConfig.url,
    "telephone": siteConfig.contact.phone,
    "email": siteConfig.contact.email,
    "contactPoint": [
      {
        "@type": "ContactPoint",
        "telephone": siteConfig.contact.phone,
        "email": siteConfig.contact.email,
        "contactType": "customer support",
        "areaServed": "GE",
        "availableLanguage": ["ka-GE"]
      }
    ],
    "address": {
      "@type": "PostalAddress",
      "addressLocality": siteConfig.location.city,
      "addressCountry": siteConfig.location.country
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": siteConfig.location.latitude,
      "longitude": siteConfig.location.longitude
    },
    "sameAs": [
      siteConfig.links.facebook,
      siteConfig.links.instagram
    ]
  }
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
}

export const WebsiteSchema = () => {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "url": siteConfig.url,
    "name": siteConfig.name,
    "potentialAction": {
      "@type": "SearchAction",
      "target": `https://www.google.com/search?q=site:${new URL(siteConfig.url).host}+{search_term_string}`,
      "query-input": "required name=search_term_string"
    }
  }
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
}

export const PersonSchema = () => {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Swift Auto Import Team",
    "worksFor": {
      "@type": "Organization",
      "name": siteConfig.name,
      "url": siteConfig.url
    },
    "sameAs": [
      siteConfig.links.facebook,
      siteConfig.links.instagram
    ],
    "knowsLanguage": ["ka-GE"]
  }
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
}

export const ServiceSchema = ({ services }: { services: Array<{ title: string; description: string }> }) => {
  const schema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "itemListElement": services.map((service, index) => ({
      "@type": "Service",
      "position": index + 1,
      "name": service.title,
      "description": service.description,
      "provider": {
        "@type": "Organization",
        "name": siteConfig.name,
        "url": siteConfig.url,
        "sameAs": [siteConfig.links.facebook, siteConfig.links.instagram]
      }
    }))
  }
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
}

export const FAQSchema = ({ questions }: { questions: Array<{ question: string; answer: string }> }) => {
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": questions.map(q => ({
      "@type": "Question",
      "name": q.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": q.answer
      }
    }))
  }
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
}

export const CalculatorSchema = () => {
  const schema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "აუქციონის დანამატის კალკულატორი",
    "applicationCategory": "BusinessApplication",
    "operatingSystem": "Any",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    }
  }
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
}
