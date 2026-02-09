import { MetadataRoute } from 'next'
import { siteConfig } from '@/lib/metadata'
import { blogPosts } from '@/data/blog'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = siteConfig.url
  const lastMod = new Date()

  const staticRoutes = [
    { url: '', priority: 1.0 },
    { url: 'amerikis-avto-auqcioni', priority: 0.9 },
    { url: 'manqanebi-amerikidan', priority: 0.9 },
    { url: 'avto-importi', priority: 0.9 },
    { url: 'meoradi-manqanebi', priority: 0.9 },
    { url: 'auqcionis-kalkulatori', priority: 0.8 },
    { url: 'servisebi', priority: 0.8 },
    { url: 'gaxdi-dileri', priority: 0.7 },
    { url: 'dealer/login', priority: 0.5 },
    { url: 'contact', priority: 0.6 },
    { url: 'popularuli-manqanebi', priority: 0.9 },
    { url: 'popularuli-manqanebi/5000-mde', priority: 0.9 },
    { url: 'popularuli-manqanebi/10000-mde', priority: 0.9 },
    { url: 'popularuli-manqanebi/15000-mde', priority: 0.9 },
    { url: 'popularuli-manqanebi/20000-mde', priority: 0.9 },
    { url: 'blog', priority: 0.8 },
  ]

  const blogRoutes = (blogPosts || []).map((p) => ({
    url: `blog/${p.slug}`,
    priority: 0.7,
    lastModified: new Date(p.date),
    changeFrequency: 'weekly' as const,
  }))

  const all = [
    ...staticRoutes.map(route => ({
      url: `${baseUrl}${route.url ? `/${route.url}` : ''}`,
      lastModified: lastMod,
      changeFrequency: 'daily' as const,
      priority: route.priority,
    })),
    ...blogRoutes.map(route => ({
      url: `${baseUrl}/${route.url}`,
      lastModified: route.lastModified,
      changeFrequency: route.changeFrequency,
      priority: route.priority,
    })),
  ]

  return all
}
