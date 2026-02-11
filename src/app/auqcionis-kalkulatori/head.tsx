import { siteConfig } from '@/lib/metadata'

export default function Head() {
  const base = siteConfig.url
  const ka = `${base}/auqcionis-kalkulatori`
  const en = `${base}/en/auction-calculator`
  const ru = `${base}/ru/kalkulyator-aukciona`
  return (
    <>
      <title>აუქციონის კალკულატორი | Copart/IAAI საკომისიოები | Swift Auto</title>
      <meta
        name="description"
        content="გამოთვალეთ Copart და IAAI აუქციონის საკომისიოები წინასწარ. მიიღეთ უფრო ზუსტი All‑In ბიუჯეტი მანქანის იმპორტისთვის."
      />
      <link rel="canonical" href={ka} />
      <link rel="alternate" hrefLang="x-default" href={ka} />
      <link rel="alternate" hrefLang="ka-GE" href={ka} />
      <link rel="alternate" hrefLang="en-US" href={en} />
      <link rel="alternate" hrefLang="ru-RU" href={ru} />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content={siteConfig.name} />
      <meta property="og:title" content="აუქციონის კალკულატორი | Copart/IAAI საკომისიოები | Swift Auto" />
      <meta property="og:description" content="გამოთვალეთ Copart და IAAI აუქციონის საკომისიოები წინასწარ. მიიღეთ უფრო ზუსტი All‑In ბიუჯეტი მანქანის იმპორტისთვის." />
      <meta property="og:url" content={ka} />
      <meta property="og:image" content={`${siteConfig.url}${siteConfig.ogImage}`} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content="აუქციონის კალკულატორი | Copart/IAAI საკომისიოები | Swift Auto" />
      <meta name="twitter:description" content="გამოთვალეთ Copart და IAAI აუქციონის საკომისიოები წინასწარ. მიიღეთ უფრო ზუსტი All‑In ბიუჯეტი მანქანის იმპორტისთვის." />
      <meta name="twitter:image" content={`${siteConfig.url}${siteConfig.ogImage}`} />
    </>
  )
}
