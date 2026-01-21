import { MetadataRoute } from 'next'
import { siteConfig } from '@/lib/metadata'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = siteConfig.url
  const lastMod = new Date()

  const routes = [
    { url: '', priority: 1.0 },
    { url: 'amerikis-avto-auqcioni', priority: 0.9 },
    { url: 'manqanebi-amerikidan', priority: 0.9 },
    { url: 'avto-importi', priority: 0.9 },
    { url: 'meoradi-manqanebi', priority: 0.9 },
    { url: 'calculator', priority: 0.8 },
    { url: 'services', priority: 0.8 },
    { url: 'become-dealer', priority: 0.7 },
    { url: 'contact', priority: 0.8 },
    { url: 'popularuli-manqanebi/5000-mde', priority: 0.9 },
    { url: 'popularuli-manqanebi/10000-mde', priority: 0.9 },
    { url: 'popularuli-manqanebi/15000-mde', priority: 0.9 },
    { url: 'popularuli-manqanebi/20000-mde', priority: 0.9 },
  ]

  return routes.map(route => ({
    url: `${baseUrl}${route.url ? `/${route.url}` : ''}`,
    lastModified: lastMod,
    changeFrequency: 'daily',
    priority: route.priority,
  }))
}
