import { siteConfig } from '@/lib/metadata'

export default function Head() {
  const base = siteConfig.url
  const ka = `${base}/amerikis-avto-auqcioni`
  const en = `${base}/en/us-auto-auctions`
  const ru = `${base}/ru/aukciony-ssha`
  return (
    <>
      <title>ამერიკის ავტო აუქციონი | Copart & IAAI | Swift Auto</title>
      <meta
        name="description"
        content="ავტომობილის შეძენა ამერიკის აუქციონებზე (Copart/IAAI) პროფესიონალური მხარდაჭერით — შერჩევა, ბიდინგი, შიდა ლოჯისტიკა, კონტეინერი და განბაჟება საქართველოში."
      />
      <link rel="canonical" href={ka} />
      <link rel="alternate" hrefLang="x-default" href={ka} />
      <link rel="alternate" hrefLang="ka-GE" href={ka} />
      <link rel="alternate" hrefLang="en-US" href={en} />
      <link rel="alternate" hrefLang="ru-RU" href={ru} />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content={siteConfig.name} />
      <meta property="og:title" content="ამერიკის ავტო აუქციონი | Copart & IAAI | Swift Auto" />
      <meta property="og:description" content="ავტომობილის შეძენა ამერიკის აუქციონებზე (Copart/IAAI) პროფესიონალური მხარდაჭერით — შერჩევა, ბიდინგი, შიდა ლოჯისტიკა, კონტეინერი და განბაჟება საქართველოში." />
      <meta property="og:url" content={ka} />
      <meta property="og:image" content={`${siteConfig.url}${siteConfig.ogImage}`} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content="ამერიკის ავტო აუქციონი | Copart & IAAI | Swift Auto" />
      <meta name="twitter:description" content="ავტომობილის შეძენა ამერიკის აუქციონებზე (Copart/IAAI) პროფესიონალური მხარდაჭერით — შერჩევა, ბიდინგი, შიდა ლოჯისტიკა, კონტეინერი და განბაჟება საქართველოში." />
      <meta name="twitter:image" content={`${siteConfig.url}${siteConfig.ogImage}`} />
    </>
  )
}
