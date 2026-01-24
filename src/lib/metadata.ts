import { Metadata } from 'next'
import { translations } from './i18n'

export const siteConfig = {
  name: 'Swift Auto Import',
  url: 'https://swiftauto.ge',
  ogImage: '/images/hero.jpg',
  description: translations.meta.description,
  links: {
    facebook: 'https://facebook.com/swiftautogeo',
    instagram: 'https://instagram.com/swiftautogeo',
  },
  location: {
    city: 'თბილისი',
    country: 'საქართველო',
    latitude: '41.7151',
    longitude: '44.8271'
  },
  contact: {
    phone: '+995 577 90 80 80',
    email: 'info@swiftauto.ge'
  }
}

export function generateMetadata(): Metadata {
  return {
    title: translations.meta.title,
    description: translations.meta.description,
    keywords: translations.meta.keywords,
    metadataBase: new URL(siteConfig.url),
    alternates: {
      languages: {
        'ka-GE': '/',
      },
    },
    authors: [{ name: 'Swift Auto Import' }],
    publisher: 'Swift Auto Import',
    creator: 'Swift Auto Import',
    formatDetection: {
      telephone: true,
      date: true,
      address: true,
      email: true,
    },
    openGraph: {
      type: 'website',
      locale: 'ka_GE',
      url: siteConfig.url,
      title: translations.meta.title,
      description: translations.meta.description,
      siteName: siteConfig.name,
      images: [
        {
          url: siteConfig.ogImage,
          width: 1200,
          height: 630,
          alt: siteConfig.name,
          type: 'image/jpeg',
        },
      ],
      phoneNumbers: [siteConfig.contact.phone],
      emails: [siteConfig.contact.email],
      countryName: siteConfig.location.country,
    },
    twitter: {
      card: 'summary_large_image',
      title: translations.meta.title,
      description: translations.meta.description,
      images: [siteConfig.ogImage],
      site: '@swiftautoimport',
      creator: '@swiftautoimport',
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  }
}
