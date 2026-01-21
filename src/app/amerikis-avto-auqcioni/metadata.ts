import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'ამერიკის ავტო აუქციონი | Copart & IAAI | Swift Auto',
  description: 'მანქანების შეძენა ამერიკის აუქციონებზე საუკეთესო ფასად. ✓ Copart ✓ IAAI ✓ პროფესიონალური დახმარება',
  keywords: 'ამერიკის ავტო აუქციონი, Copart, IAAI, აუქციონის მანქანები, ავტო აუქციონი',
  alternates: {
    canonical: '/amerikis-avto-auqcioni'
  },
  openGraph: {
    title: 'ამერიკის ავტო აუქციონი | Copart & IAAI',
    description: 'მანქანების შეძენა ამერიკის აუქციონებზე საუკეთესო ფასად',
    type: 'website',
    locale: 'ka_GE',
    images: [{
      url: '/images/auto-auqcioni-hero.jpg',
      width: 1200,
      height: 630,
      alt: 'ამერიკის ავტო აუქციონი'
    }]
  }
}
