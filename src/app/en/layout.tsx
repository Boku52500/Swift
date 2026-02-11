import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Swift Auto Import — Car Import from USA to Georgia",
  description:
    "Trusted partner for importing cars from the USA to Georgia. Bidding on Copart/IAAI, inland & ocean transport, customs clearance, and delivery.",
  alternates: {
    canonical: "/en",
    languages: {
      "x-default": "/",
      "ka-GE": "/",
      "en-US": "/en",
      "ru-RU": "/ru",
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    title: "Swift Auto Import — Car Import from USA to Georgia",
    description:
      "Trusted partner for importing cars from the USA to Georgia. Bidding on Copart/IAAI, inland & ocean transport, customs clearance, and delivery.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Swift Auto Import — Car Import from USA to Georgia",
    description:
      "Trusted partner for importing cars from the USA to Georgia. Bidding on Copart/IAAI, inland & ocean transport, customs clearance, and delivery.",
  },
  robots: { index: true, follow: true },
};

export default function EnLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
