import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { generateMetadata, siteConfig } from "@/lib/metadata";
import { LocalBusinessSchema, WebsiteSchema, PersonSchema } from "@/components/seo/schemas";
import { AuthProvider } from "@/components/providers/auth-provider";
import { Breadcrumbs } from "@/components/navigation/breadcrumbs";
import { headers } from "next/headers";
import "./globals.css";

export const metadata = generateMetadata();

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const hdrs = await headers()
  const loc = hdrs.get('x-locale') || 'ka'
  const htmlLang = loc === 'en' ? 'en' : loc === 'ru' ? 'ru' : 'ka'
  return (
    <html lang={htmlLang} className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://res.cloudinary.com" crossOrigin="anonymous" />
        <meta name="theme-color" content="#ef4444" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="format-detection" content="telephone=yes" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="msapplication-tap-highlight" content="no" />
        <meta name="msapplication-TileColor" content="#ef4444" />
      </head>
      <body
        className="antialiased min-h-screen flex flex-col font-bpg bg-white text-neutral-900"
      >
        <AuthProvider>
          <Header />
          <main className="flex-grow pt-16">
            <Breadcrumbs />
            {children}
          </main>
          <Footer />
          <WebsiteSchema />
          <LocalBusinessSchema />
          <PersonSchema />
        </AuthProvider>
      </body>
    </html>
  );
}
