import { MetadataRoute } from 'next'
import { siteConfig } from '@/lib/metadata'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: [
          '/',
          '/amerikis-avto-auqcioni',
          '/manqanebi-amerikidan',
          '/avto-importi',
          '/meoradi-manqanebi',
          '/servisebi',
          '/gaxdi-dileri',
          '/auqcionis-kalkulatori',
          '/contact',
          '/popularuli-manqanebi',
          '/popularuli-manqanebi/*'
        ],
        disallow: [
          '/private/',
          '/api/',
          '/uploads/',
          // keep JSON accessible (manifests, feeds)
        ]
      },
      {
        userAgent: 'GPTBot',
        disallow: ['/']
      }
    ],
    sitemap: `${siteConfig.url}/sitemap.xml`,
    host: siteConfig.url
  }
}
