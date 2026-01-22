import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { generateMetadata, siteConfig } from "@/lib/metadata";
import { LocalBusinessSchema } from "@/components/seo/schemas";
import { AuthProvider } from "@/components/providers/auth-provider";
import "./globals.css";

export const metadata = generateMetadata();

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ka" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://res.cloudinary.com" crossOrigin="anonymous" />
        <meta name="theme-color" content="#ef4444" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="icon" type="image/png" href="/images/favicon.png" />
        <link rel="shortcut icon" href="/images/favicon.png" />
        <link rel="manifest" href="/manifest.json" />
        <link rel="apple-touch-icon" href="/images/favicon.png" />
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
          <main className="flex-grow pt-16">{children}</main>
          <Footer />
          <LocalBusinessSchema />
        </AuthProvider>
      </body>
    </html>
  );
}
