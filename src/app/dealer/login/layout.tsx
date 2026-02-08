import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'დილერის შესვლა | Dealer Login | Swift Auto',
  description: 'ავტორიზაცია Swift Auto-ს დილერებისთვის. შედით დილერის პანელში უსაფრთხოდ და სწრაფად.',
  alternates: { canonical: '/dealer/login' },
  robots: {
    index: false,
    follow: false,
    googleBot: { index: false, follow: false },
  },
}

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
