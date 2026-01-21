"use client"

import { Button } from '@/components/ui/button'
import Image from 'next/image'
import { Phone, ArrowRight } from 'lucide-react'
import Link from 'next/link'

export function CarsFromAmericaHeroSection() {
  return (
    <section className="relative bg-neutral-900 text-white">
      <div className="absolute inset-0">
        <Image
          src="/images/vette.jpg"
          alt="მანქანები ამერიკიდან - Swift Auto Import"
          fill
          priority
          quality={90}
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-transparent" />
      </div>
      
      <div className="relative container mx-auto px-4 py-24 md:py-32">
        <div className="max-w-3xl space-y-6">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold">
            მანქანები ამერიკიდან
          </h1>
          <p className="text-xl md:text-2xl text-neutral-200">
            დიდი არჩევანი, საუკეთესო ფასები და უსაფრთხო ტრანსპორტირება საქართველოში
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button asChild size="lg">
              <Link href="#contact" className="gap-2">
                <Phone className="w-5 h-5" />
                უფასო კონსულტაცია
              </Link>
            </Button>
            
          </div>
        </div>
      </div>
    </section>
  )
}
