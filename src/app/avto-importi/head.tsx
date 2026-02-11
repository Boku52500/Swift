import { siteConfig } from '@/lib/metadata'

export default function Head() {
  const base = siteConfig.url
  const ka = `${base}/avto-importi`
  const en = `${base}/en/car-import`
  const ru = `${base}/ru/import-avto`
  return (
    <>
      <title>ავტო იმპორტი ამერიკიდან | სრული სერვისი | Swift Auto</title>
      <meta
        name="description"
        content="სრული სერვისი: შერჩევა, VIN შემოწმება, ბიდინგი Copart/IAAI-ზე, შიდა ლოჯისტიკა, კონტეინერი და განბაჟება საქართველოში."
      />
      <link rel="canonical" href={ka} />
      <link rel="alternate" hrefLang="x-default" href={ka} />
      <link rel="alternate" hrefLang="ka-GE" href={ka} />
      <link rel="alternate" hrefLang="en-US" href={en} />
      <link rel="alternate" hrefLang="ru-RU" href={ru} />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content={siteConfig.name} />
      <meta property="og:title" content="ავტო იმპორტი ამერიკიდან | სრული სერვისი | Swift Auto" />
      <meta property="og:description" content="სრული სერვისი: შერჩევა, VIN შემოწმება, ბიდინგი Copart/IAAI-ზე, შიდა ლოჯისტიკა, კონტეინერი და განბაჟება საქართველოში." />
      <meta property="og:url" content={ka} />
      <meta property="og:image" content={`${siteConfig.url}${siteConfig.ogImage}`} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content="ავტო იმპორტი ამერიკიდან | სრული სერვისი | Swift Auto" />
      <meta name="twitter:description" content="სრული სერვისი: შერჩევა, VIN შემოწმება, ბიდინგი Copart/IAAI-ზე, შიდა ლოჯისტიკა, კონტეინერი და განბაჟება საქართველოში." />
      <meta name="twitter:image" content={`${siteConfig.url}${siteConfig.ogImage}`} />
    </>
  )
}
