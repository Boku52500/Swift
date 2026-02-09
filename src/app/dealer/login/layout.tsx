import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'დილერის გვერდი - Swift Auto Import',
  description: 'შედით Swift Auto Import-ის დილერის პანელში. უსაფრთხო და სწრაფი წვდომა ინვენტარსა და განახლებებზე.',
  alternates: { canonical: '/dealer/login' },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
}

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
