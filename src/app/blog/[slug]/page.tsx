import { notFound } from 'next/navigation'
import { Metadata } from 'next'
import Script from 'next/script'
import Image from 'next/image'
import Link from 'next/link'
import path from 'node:path'
import fs from 'node:fs/promises'
import { siteConfig } from '@/lib/metadata'
import { blogPosts } from '@/data/blog'
import { blogPostsEn } from '@/data/blog-en'
import { blogBodies } from '@/data/blog-bodies'
import { blogPostsRu } from '@/data/blog-ru'
import { AuthorBio } from '@/components/blog/author-bio'

export const revalidate = 1800

// Deterministic date formatting to avoid SSR/CSR locale mismatches
const formatDate = (s: string): string => {
  const parts = s.split('-')
  if (parts.length !== 3) return s
  const [y, m, d] = parts
  return `${d}.${m}.${y}`
}

function getPost(slug: string) {
  const s = (slug || '').trim().toLowerCase()
  return blogPosts.find(p => p.slug === s)
}

export async function generateMetadata({ params }: { params: Promise<{ slug?: string }> | { slug?: string } }): Promise<Metadata> {
  const p: any = params as any
  const resolved = p && typeof p.then === 'function' ? await p : p
  const raw = resolved?.slug || ''
  const slug = decodeURIComponent(raw)
  const post = getPost(slug)
  if (!post) return {}

  const isCost = post.slug === 'ra-ghirs-manqanis-chamoyvana-amerikidan-sakartveloshi'
  const titleTag = `${post.title} – Swift Auto Import`
  const description = isCost
    ? 'დეტალური გზამკვლევი ფასებზე: აუქციონის საკომისიოები, შიდა/საზღვაო ტრანსპორტი, პორტი, განბაჟება, დაზღვევა. მიიღეთ ზუსტი All‑In გამოთვლა.'
    : post.excerpt

  return {
    title: titleTag ,
    description,
    alternates: {
      canonical: `${siteConfig.url}/blog/${post.slug}`,
      languages: (() => {
        const map: Record<string, string> = {
          'x-default': `${siteConfig.url}/blog/${post.slug}`,
          'ka-GE': `${siteConfig.url}/blog/${post.slug}`,
        }
        const pairEn = blogPostsEn.find(p => p.kaSlug === post.slug)
        if (pairEn) {
          map['en-US'] = `${siteConfig.url}/en/blog/${pairEn.slug}`
        }
        const pairRu = blogPostsRu.find(p => p.kaSlug === post.slug)
        if (pairRu) {
          map['ru-RU'] = `${siteConfig.url}/ru/blog/${pairRu.slug}`
        }
        return map
      })(),
    },
    openGraph: {
      type: 'article',
      url: `${siteConfig.url}/blog/${post.slug}`,
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

export default async function BlogPostPage({ params }: { params: Promise<{ slug?: string }> | { slug?: string } }) {
  const p: any = params as any
  const resolved = p && typeof p.then === 'function' ? await p : p
  const raw = resolved?.slug || ''
  const slug = decodeURIComponent(raw)
  const post = getPost(slug)
  if (!post) return notFound()
  const isCostLocal = post.slug === 'ra-ghirs-manqanis-chamoyvana-amerikidan-sakartveloshi'

  // Try to load long-form HTML content from filesystem first
  let content: string[] = []
  try {
    const baseDir = path.join(process.cwd(), 'src', 'content', 'blog')
    const candidates = [
      path.join(baseDir, `${post.slug}.full.html`),
      path.join(baseDir, `${post.slug}.html`),
    ]
    for (const fp of candidates) {
      try {
        const html = await fs.readFile(fp, 'utf8')
        if (html && html.trim().length > 0) {
          const replaced = html
            .replace(/%%PHONE%%/g, siteConfig.contact.phone)
            .replace(/%%EMAIL%%/g, siteConfig.contact.email)
            .replace(/%%SITE_URL%%/g, siteConfig.url)
          const sanitized = slug === 'ra-ghirs-manqanis-chamoyvana-amerikidan-sakartveloshi'
            ? replaced.replace(/<h2 id="searches">[\s\S]*?<\/p>\s*/i, '')
            : replaced
          content = [sanitized]
          break
        }
      } catch {}
    }
  } catch {}
  if (content.length === 0) {
    content = blogBodies[post.slug] ?? []
  }

  const text = content.join(' ')
  const words = (text.match(/\S+/g) || []).length
  const readingTime = Math.max(1, Math.ceil(words / 180)) // ~180 wpm

  const descriptionLocal = isCostLocal
    ? 'დეტალური გზამკვლევი ფასებზე: აუქციონის საკომისიოები, შიდა/საზღვაო ტრანსპორტი, პორტი, განბაჟება, დაზღვევა. მიიღეთ ზუსტი All‑In გამოთვლა.'
    : post.excerpt

  return (
    <div className="min-h-screen bg-neutral-50">
      <section className="py-10">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="mb-6">
            <div className="text-xs text-neutral-500 mb-2">
              {formatDate(post.date)} • {readingTime} წუთის კითხვა
            </div>
            <h1 className="text-3xl md:text-4xl font-bold mb-4">{post.title}</h1>
            <p className="text-neutral-700 text-lg">{post.excerpt}</p>
          </div>

          {isCostLocal && (
            <section className="mb-6 rounded-lg border border-neutral-200 bg-white p-4">
              <h3 className="text-base font-semibold mb-2">მოკლე რჩევები (Key takeaways)</h3>
              <ul className="list-disc pl-5 text-sm text-neutral-700 space-y-1">
                <li>All‑In ბიუჯეტი შედგება აუქციონის ფასის, საკომისიოების, შიდა/საზღვაო ტრანსპორტის, პორტისა და განბაჟებისგან.</li>
                <li>ჩვეულებრივი ვადაა 5–10 კვირა ბიდინგიდან თბილისში მიღებამდე.</li>
                <li>ზუსტი თანხები იცვლება ლოტის მდებარეობით, სეზონითა და დოკუმენტაციით.</li>
                <li>ზუსტი კოტირებისთვის გამოიყენეთ აუქციონის კალკულატორი ან გამოგვიგზავნეთ VIN.</li>
              </ul>
            </section>
          )}

          <div className="rounded-xl overflow-hidden bg-neutral-100 mb-8">
            <Image src={post.image} alt={post.title} width={1200} height={630} priority sizes="(max-width: 768px) 100vw, 1200px" className="w-full h-auto object-cover" />
          </div>

          <article className="prose prose-neutral max-w-none">
            {content.map((html, idx) => (
              <div key={idx} dangerouslySetInnerHTML={{ __html: html }} />
            ))}
          </article>
          {isCostLocal && (
            <>
              <section className="mt-8 bg-amber-50 border border-amber-200 text-amber-900 rounded-lg p-4">
                <p className="text-sm">
                  შენიშვნა: წარმოდგენილი დიაპაზონები ილუსტრაციულია. საბოლოო All‑In ბიუჯეტი დამოკიდებულია ლოტის ლოკაციაზე,
                  დოკუმენტაციაზე, სეზონურობაზე და მოქმედ სამართლებრივ წესებზე. ზუსტი კოტირებისთვის გამოგვიგზავნეთ VIN/ლინკი.
                </p>
              </section>
              <section className="mt-10 border-t pt-6">
                <h2 className="text-xl font-semibold mb-4">ხშირად დასმული კითხვები</h2>
                <div className="space-y-4 text-neutral-800">
                  <div>
                    <p className="font-medium">რა შედის All‑In ბიუჯეტში?</p>
                    <p className="text-neutral-700">აუქციონის ფასი, საკომისიოები, Yard → Port შიდა გადაზიდვა, საზღვაო გადაზიდვა, პორტი, საქართველოში შიდა ტრანსპორტი, განბაჟება და მცირე ბუფერი.</p>
                  </div>
                  <div>
                    <p className="font-medium">რა დრო სჭირდება ჩამოყვანას?</p>
                    <p className="text-neutral-700">ტიპურად 5–10 კვირა ბიდინგიდან თბილისში მიღებამდე.</p>
                  </div>
                  <div>
                    <p className="font-medium">როგორ მივიღო ზუსტი კოტირება?</p>
                    <p className="text-neutral-700">გამოგზავნეთ VIN/ლინკი და ქალაქი — 15–60 წუთში მიიღებთ ინდივიდუალურ კოტირებას. ასევე იხილეთ <Link href="/auqcionis-kalkulatori" className="text-red-600 hover:text-red-700 underline">აუქციონის კალკულატორი</Link>.</p>
                  </div>
                  <div>
                    <p className="font-medium">Container თუ Ro‑Ro?</p>
                    <p className="text-neutral-700">საქართველოში უმეტესად კონტეინერი სტაბილურია; არჩევანი ხდება ლოტის ზომა/ბიუჯეტი/ვადების მიხედვით.</p>
                  </div>
                </div>
              </section>
              <Script
                id="faq-schema-cost"
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                  __html: JSON.stringify({
                    '@context': 'https://schema.org',
                    '@type': 'FAQPage',
                    mainEntity: [
                      { '@type': 'Question', name: 'რა შედის All‑In ბიუჯეტში?', acceptedAnswer: { '@type': 'Answer', text: 'აუქციონის ფასი, საკომისიოები, Yard → Port შიდა გადაზიდვა, საზღვაო გადაზიდვა, პორტი, საქართველოში შიდა ტრანსპორტი, განბაჟება და მცირე ბუფერი.' } },
                      { '@type': 'Question', name: 'რა დრო სჭირდება ჩამოყვანას?', acceptedAnswer: { '@type': 'Answer', text: 'ტიპურად 5–10 კვირა ბიდინგიდან თბილისში მიღებამდე.' } },
                      { '@type': 'Question', name: 'როგორ მივიღო ზუსტი კოტირება?', acceptedAnswer: { '@type': 'Answer', text: 'გამოგზავნეთ VIN/ლინკი და ქალაქი — 15–60 წუთში მიიღებთ ინდივიდუალურ კოტირებას. ასევე იხილეთ აუქციონის კალკულატორი.' } },
                      { '@type': 'Question', name: 'Container თუ Ro‑Ro?', acceptedAnswer: { '@type': 'Answer', text: 'საქართველოში უმეტესად კონტეინერი სტაბილურია; არჩევანი ხდება ლოტის ზომა/ბიუჯეტი/ვადების მიხედვით.' } },
                    ],
                  }),
                }}
              />
            </>
          )}

          <section className="mt-10 border-t pt-6">
            <h2 className="text-xl font-semibold mb-4">მსგავსი სტატიები</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {blogPosts.filter(p => p.slug !== post.slug).slice(0, 4).map(p => (
                <Link key={p.slug} href={`/blog/${p.slug}`} className="block p-4 rounded-lg border hover:bg-neutral-50">
                  <p className="text-sm text-neutral-500 mb-1">{formatDate(p.date)}</p>
                  <p className="font-medium">{p.title}</p>
                </Link>
              ))}
            </div>
          </section>

          <AuthorBio />
          
        </div>
      </section>

      

      <Script
        id="article-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Article',
            headline: post.title,
            description: descriptionLocal,
            mainEntityOfPage: `${siteConfig.url}/blog/${post.slug}`,
            image: [post.image],
            author: [{ '@type': 'Organization', name: 'Swift Auto Import' }],
            publisher: { '@type': 'Organization', name: 'Swift Auto Import', logo: { '@type': 'ImageObject', url: `${siteConfig.url}/images/menulogo.png` } },
            datePublished: post.date,
            dateModified: post.date,
            inLanguage: 'ka-GE',
            keywords: (post.keywords || []).join(', '),
            wordCount: words,
            timeRequired: `PT${readingTime}M`,
          }),
        }}
      />
    </div>
  )
}
