import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Swift Auto Import — Импорт авто из США в Грузию",
  description:
    "Надёжный партнёр по ввозу автомобилей из США в Грузию. Торги на Copart/IAAI, внутренняя перевозка и морской фрахт, растаможка и доставка.",
  alternates: {
    canonical: "/ru",
    languages: {
      "x-default": "/",
      "ka-GE": "/",
      "en-US": "/en",
      "ru-RU": "/ru",
    },
  },
  openGraph: {
    type: "website",
    locale: "ru_RU",
    title: "Swift Auto Import — Импорт авто из США в Грузию",
    description:
      "Надёжный партнёр по ввозу автомобилей из США в Грузию. Торги на Copart/IAAI, внутренняя перевозка и морской фрахт, растаможка и доставка.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Swift Auto Import — Импорт авто из США в Грузию",
    description:
      "Надёжный партнёр по ввозу автомобилей из США в Грузию. Торги на Copart/IAAI, внутренняя перевозка и морской фрахт, растаможка и доставка.",
  },
  robots: { index: true, follow: true },
}

export default function RuLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
