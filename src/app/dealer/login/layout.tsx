import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'დილერის გვერდი - Swift Auto Import',
  description: 'შედით Swift Auto Import-ის დილერის პანელში. უსაფრთხო და სწრაფი წვდომა ინვენტარსა და განახლებებზე.',
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
