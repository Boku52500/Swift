import { siteConfig } from '@/lib/metadata'

export default function Head() {
  const base = siteConfig.url
  const ka = `${base}/manqanebi-amerikidan`
  const en = `${base}/en/cars-from-usa`
  const ru = `${base}/ru/avto-iz-ssha`
  return (
    <>
      <title>მანქანები ამერიკიდან | იმპორტი და ჩაბარება | Swift Auto</title>
      <meta
        name="description"
        content="ვარჩევთ სანდო ისტორიით მანქანებს აშშ-დან, ვახორციელებთ ბიდინგს Copart/IAAI-ზე, ვმართავთ შიდა ლოჯისტიკას, კონტეინერს და განბაჟებას საქართველოში."
      />
      <link rel="canonical" href={ka} />
      <link rel="alternate" hrefLang="x-default" href={ka} />
      <link rel="alternate" hrefLang="ka-GE" href={ka} />
      <link rel="alternate" hrefLang="en-US" href={en} />
      <link rel="alternate" hrefLang="ru-RU" href={ru} />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content={siteConfig.name} />
      <meta property="og:title" content="მანქანები ამერიკიდან | იმპორტი და ჩაბარება | Swift Auto" />
      <meta property="og:description" content="ვარჩევთ სანდო ისტორიით მანქანებს აშშ-დან, ვახორციელებთ ბიდინგს Copart/IAAI-ზე, ვმართავთ შიდა ლოჯისტიკას, კონტეინერს და განბაჟებას საქართველოში." />
      <meta property="og:url" content={ka} />
      <meta property="og:image" content={`${siteConfig.url}${siteConfig.ogImage}`} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content="მანქანები ამერიკიდან | იმპორტი და ჩაბარება | Swift Auto" />
      <meta name="twitter:description" content="ვარჩევთ სანდო ისტორიით მანქანებს აშშ-დან, ვახორციელებთ ბიდინგს Copart/IAAI-ზე, ვმართავთ შიდა ლოჯისტიკას, კონტეინერს და განბაჟებას საქართველოში." />
      <meta name="twitter:image" content={`${siteConfig.url}${siteConfig.ogImage}`} />
    </>
  )
}
