"use client"

import { siteConfig } from "@/lib/metadata"
import Image from "next/image"

export function AuthorBioRu() {
  return (
    <section className="mt-10 border-t pt-6">
      <div className="flex items-start gap-4">
        <div className="relative w-14 h-14 rounded-full overflow-hidden bg-neutral-100">
          <Image src="/images/menulogo.png" alt="Swift Auto Import" fill className="object-contain p-2" />
        </div>
        <div>
          <p className="text-sm text-neutral-600 mb-1">Автор</p>
          <h3 className="font-semibold">Swift Auto Import</h3>
          <p className="text-neutral-700 text-sm mt-1">
            Опыт ввоза автомобилей из США: аукционы, логистика, растаможка и полное сопровождение. Вопросы: {siteConfig.contact.phone} • {siteConfig.contact.email}
          </p>
        </div>
      </div>
    </section>
  )
}
