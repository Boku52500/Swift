import { NextResponse } from 'next/server'
import { siteConfig } from '@/lib/metadata'
import { blogPosts } from '@/data/blog'

export const revalidate = 1800

export async function GET() {
  const host = siteConfig.url.replace(/\/$/, '')
  const urls = blogPosts.map(p => {
    const loc = `${host}/blog/${encodeURIComponent(p.slug)}`
    const imgUrl = p.image.startsWith('http') ? p.image : `${host}${p.image}`
    const title = p.title
    return `  <url>\n    <loc>${loc}</loc>\n    <image:image>\n      <image:loc>${imgUrl}</image:loc>\n      <image:title><![CDATA[${title}]]></image:title>\n    </image:image>\n  </url>`
  }).join('\n')

  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">\n${urls}\n</urlset>`

  return new NextResponse(xml, { headers: { 'Content-Type': 'application/xml; charset=utf-8', 'Cache-Control': 'public, max-age=1800' } })
}
