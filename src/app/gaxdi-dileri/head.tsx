import { siteConfig } from '@/lib/metadata'

export default function Head() {
  const base = siteConfig.url
  const ka = `${base}/gaxdi-dileri`
  const en = `${base}/en/become-a-dealer`
  const ru = `${base}/ru/stat-dilerom`
  return (
    <>
      <title>გახდი დილერი | პარტნიორობა | Swift Auto</title>
      <meta
        name="description"
        content="გახდი Swift Auto-ს დილერი: წვდომა აუქციონებზე, ტრენინგი, მარკეტინგული მხარდაჭერა და გამჭვირვალე პირობები."
      />
      <link rel="canonical" href={ka} />
      <link rel="alternate" hrefLang="x-default" href={ka} />
      <link rel="alternate" hrefLang="ka-GE" href={ka} />
      <link rel="alternate" hrefLang="en-US" href={en} />
      <link rel="alternate" hrefLang="ru-RU" href={ru} />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content={siteConfig.name} />
      <meta property="og:title" content="გახდი დილერი | პარტნიორობა | Swift Auto" />
      <meta property="og:description" content="გახდი Swift Auto-ს დილერი: წვდომა აუქციონებზე, ტრენინგი, მარკეტინგული მხარდაჭერა და გამჭვირვალე პირობები." />
      <meta property="og:url" content={ka} />
      <meta property="og:image" content={`${siteConfig.url}${siteConfig.ogImage}`} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content="გახდი დილერი | პარტნიორობა | Swift Auto" />
      <meta name="twitter:description" content="გახდი Swift Auto-ს დილერი: წვდომა აუქციონებზე, ტრენინგი, მარკეტინგული მხარდაჭერა და გამჭვირვალე პირობები." />
      <meta name="twitter:image" content={`${siteConfig.url}${siteConfig.ogImage}`} />
    </>
  )
}
