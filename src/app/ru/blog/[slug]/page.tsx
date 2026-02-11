import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import Script from 'next/script'
import Image from 'next/image'
import Link from 'next/link'
import path from 'node:path'
import fs from 'node:fs/promises'
import { siteConfig } from '@/lib/metadata'
import { blogPostsRu } from '@/data/blog-ru'
import { blogPostsEn } from '@/data/blog-en'
import { AuthorBioRu } from '@/components/blog/author-bio-ru'

export const revalidate = 1800

const formatDate = (s: string): string => {
  const parts = s.split('-')
  if (parts.length !== 3) return s
  const [y, m, d] = parts
  return `${d}.${m}.${y}`
}

function getPost(slug: string) {
  const s = (slug || '').trim().toLowerCase()
  return blogPostsRu.find((p) => p.slug === s)
}

export async function generateMetadata({ params }: { params: Promise<{ slug?: string }> | { slug?: string } }): Promise<Metadata> {
  const p: any = params as any
  const resolved = p && typeof p.then === 'function' ? await p : p
  const raw = resolved?.slug || ''
  const slug = decodeURIComponent(raw)
  const post = getPost(slug)
  if (!post) return {}

  const titleTag = `${post.title} – Swift Auto Import`
  const description = post.excerpt
  const enPair = blogPostsEn.find((p) => p.kaSlug === post.kaSlug)

  return {
    title: titleTag,
    description,
    alternates: {
      canonical: `${siteConfig.url}/ru/blog/${post.slug}`,
      languages: {
        'x-default': `${siteConfig.url}/blog/${post.kaSlug}`,
        'ka-GE': `${siteConfig.url}/blog/${post.kaSlug}`,
        ...(enPair ? { 'en-US': `${siteConfig.url}/en/blog/${enPair.slug}` } : {}),
        'ru-RU': `${siteConfig.url}/ru/blog/${post.slug}`,
      },
    },
    openGraph: {
      type: 'article',
      url: `${siteConfig.url}/ru/blog/${post.slug}`,
      title: post.title,
      description,
      images: [{ url: post.image }],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description,
      images: [post.image],
    },
    keywords: post.keywords,
  }
}

export default async function BlogPostRuPage({ params }: { params: Promise<{ slug?: string }> | { slug?: string } }) {
  const p: any = params as any
  const resolved = p && typeof p.then === 'function' ? await p : p
  const raw = resolved?.slug || ''
  const slug = decodeURIComponent(raw)
  const post = getPost(slug)
  if (!post) return notFound()

  // Try to load long-form HTML content from filesystem first (Russian)
  let content: string[] = []
  try {
    const baseDir = path.join(process.cwd(), 'src', 'content', 'blog-ru')
    const enPair = blogPostsEn.find((p) => p.kaSlug === post.kaSlug)
    const candidates = [
      path.join(baseDir, `${post.slug}.full.html`),
      path.join(baseDir, `${post.slug}.html`),
      ...(enPair ? [
        path.join(baseDir, `${enPair.slug}.full.html`),
        path.join(baseDir, `${enPair.slug}.html`),
      ] : []),
    ]
    for (const fp of candidates) {
      try {
        const html = await fs.readFile(fp, 'utf8')
        if (html && html.trim().length > 0) {
          // Replace tokens and normalize internal RU blog links from legacy EN slugs to new RU slugs
          let replaced = html
            .replace(/%%PHONE%%/g, siteConfig.contact.phone)
            .replace(/%%EMAIL%%/g, siteConfig.contact.email)
            .replace(/%%SITE_URL%%/g, siteConfig.url)

          // Build EN->RU slug map using shared kaSlug
          const enToRu: Record<string, string> = {}
          for (const en of blogPostsEn) {
            const ru = blogPostsRu.find(r => r.kaSlug === en.kaSlug)
            if (ru) enToRu[en.slug] = ru.slug
          }
          // Rewrite hrefs that reference old EN slugs to new RU slugs (with or without anchors)
          for (const [enSlug, ruSlug] of Object.entries(enToRu)) {
            replaced = replaced
              .replaceAll(`href="/ru/blog/${enSlug}"`, `href="/ru/blog/${ruSlug}"`)
              .replaceAll(`href='/ru/blog/${enSlug}'`, `href='/ru/blog/${ruSlug}'`)
              .replaceAll(`href="/ru/blog/${enSlug}#`, `href="/ru/blog/${ruSlug}#`)
              .replaceAll(`href='/ru/blog/${enSlug}#`, `href='/ru/blog/${ruSlug}#`)
          }
          content = [replaced]
          break
        }
      } catch {}
    }
  } catch {}
  if (content.length === 0) {
    content = [
      `<p>${post.excerpt}</p>`,
    ]
  }

  const text = content.join(' ')
  const words = (text.match(/\S+/g) || []).length
  const readingTime = Math.max(1, Math.ceil(words / 180))

  return (
    <div className="min-h-screen bg-neutral-50">
      <section className="py-10">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="mb-6">
            <div className="text-xs text-neutral-500 mb-2">{formatDate(post.date)} • {readingTime} мин. чтения</div>
            <h1 className="text-3xl md:text-4xl font-bold mb-4">{post.title}</h1>
            <p className="text-neutral-700 text-lg">{post.excerpt}</p>
          </div>

          <div className="rounded-xl overflow-hidden bg-neutral-100 mb-8">
            <Image src={post.image} alt={post.title} width={1200} height={630} priority sizes="(max-width: 768px) 100vw, 1200px" className="w-full h-auto object-cover" />
          </div>

          <article className="prose prose-neutral max-w-none">
            {content.map((html, idx) => (
              <div key={idx} dangerouslySetInnerHTML={{ __html: html }} />
            ))}
          </article>

          <section className="mt-10 border-t pt-6">
            <h2 className="text-xl font-semibold mb-4">Похожие статьи</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {blogPostsRu.filter(p => p.slug !== post.slug).slice(0, 4).map(p => (
                <Link key={p.slug} href={`/ru/blog/${p.slug}`} className="block p-4 rounded-lg border hover:bg-neutral-50">
                  <p className="text-sm text-neutral-500 mb-1">{formatDate(p.date)}</p>
                  <p className="font-medium">{p.title}</p>
                </Link>
              ))}
            </div>
          </section>

          <AuthorBioRu />
        </div>
      </section>

      <Script
        id="article-schema-ru"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Article',
            headline: post.title,
            description: post.excerpt,
            mainEntityOfPage: `${siteConfig.url}/ru/blog/${post.slug}`,
            image: [post.image],
            author: [{ '@type': 'Organization', name: 'Swift Auto Import' }],
            publisher: { '@type': 'Organization', name: 'Swift Auto Import', logo: { '@type': 'ImageObject', url: `${siteConfig.url}/images/menulogo.png` } },
            datePublished: post.date,
            dateModified: post.date,
            inLanguage: 'ru-RU',
            keywords: (post.keywords || []).join(', '),
            wordCount: words,
            timeRequired: `PT${readingTime}M`,
          }),
        }}
      />
      <Script
        id="breadcrumb-blog-post-ru"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            itemListElement: [
              { '@type': 'ListItem', position: 1, name: 'Главная', item: `${siteConfig.url}/ru` },
              { '@type': 'ListItem', position: 2, name: 'Блог', item: `${siteConfig.url}/ru/blog` },
              { '@type': 'ListItem', position: 3, name: post.title, item: `${siteConfig.url}/ru/blog/${post.slug}` },
            ],
          }),
        }}
      />
    </div>
  )
}
