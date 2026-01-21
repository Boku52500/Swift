"use client"

import { Button } from '@/components/ui/button'
import Image from 'next/image'
import { Phone, ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { useEffect, useState } from 'react'

export function HeroSection() {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 1024)
    }
    
    // Initial check
    handleResize()
    
    // Add event listener
    window.addEventListener('resize', handleResize)
    
    // Cleanup
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <section className="relative bg-neutral-900 text-white">
      <div className="absolute inset-0">
        <Image
          src={isMobile ? '/images/mobile.jpg' : '/images/hero.jpg'}
          alt="Swift Auto Import - Ferrari in Container"
          fill
          priority
          quality={90}
          placeholder="blur"
          blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/4gHYSUNDX1BST0ZJTEUAAQEAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAH4AABAAEAAAAAAAAAAAAAAAAAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAACRyWFlaAAABFAAAABRnWFlaAAABKAAAABRiWFlaAAABPAAAABR3dHB0AAABUAAAABRyVFJDAAABZAAAAChnVFJDAAABZAAAAChiVFJDAAABZAAAAChjcHJ0AAABjAAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEJYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9YWVogAAAAAAAA9tYAAQAAAADTLXBhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACAAAAAcAEcAbwBvAGcAbABlACAASQBuAGMALgAgADIAMAAxADb/2wBDABQODxIPDRQSEBIXFRQdHx4eHRseHh8jIyEjIScjIyIjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyP/2wBDAR0XFx8eHx4jIyMeHiMmIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyP/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAb/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="
          sizes="(max-width: 1024px) 100vw, 1920px"
          style={{
            objectFit: 'cover',
            objectPosition: 'center'
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-transparent" />
      </div>
      
      <div className="relative container mx-auto px-4 py-24 md:py-32">
        <div className="max-w-3xl space-y-6">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold">
            გამარტივებული <Link href="/avto-importi" className="hover:text-red-400">ავტო იმპორტი</Link> ამერიკიდან საქართველოში
          </h1>
          
          <p className="text-lg md:text-xl text-neutral-200">
            <Link href="/amerikis-avto-auqcioni" className="hover:text-red-400">ამერიკის ავტო აუქციონებზე</Link> პროფესიონალური მომსახურება. გთავაზობთ <Link href="/meoradi-manqanebi" className="hover:text-red-400">მეორადი მანქანების</Link> დიდ არჩევანს და <Link href="/manqanebi-amerikidan" className="hover:text-red-400">მანქანების ჩამოყვანას ამერიკიდან</Link>. ჩამოიყვანეთ თქვენი ოცნების მანქანა დღესვე.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <Button asChild size="lg">
              <Link href="#contact" className="flex items-center gap-2">
                <Phone className="w-5 h-5" />
                მიიღეთ უფასო კონსულტაცია
              </Link>
            </Button>
            
            <Button variant="secondary" size="lg" asChild>
              <Link href="#process" className="flex items-center gap-2">
                როგორ მუშაობს
                <ArrowRight className="w-5 h-5" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
