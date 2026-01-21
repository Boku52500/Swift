import { Facebook, Instagram, Phone, Mail } from 'lucide-react'
import Link from 'next/link'

export function SocialMediaSection() {
  return (
    <section className="py-12 bg-neutral-900 text-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8">
          დაგვიკავშირდით სოციალურ ქსელებში
        </h2>
        
        <div className="flex flex-wrap justify-center gap-8">
          <Link 
            href="https://facebook.com/swiftautogeo" 
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 text-lg hover:text-red-500 transition-colors"
          >
            <Facebook className="w-6 h-6" />
            Swift Auto Import
          </Link>

          <Link 
            href="https://instagram.com/swiftautogeo"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 text-lg hover:text-red-500 transition-colors"
          >
            <Instagram className="w-6 h-6" />
            @swiftautogeo
          </Link>

          <Link 
            href="tel:+995577908080"
            className="flex items-center gap-3 text-lg hover:text-red-500 transition-colors"
          >
            <Phone className="w-6 h-6" />
            +995 577 90 80 80
          </Link>

          <Link 
            href="mailto:info@swiftauto.ge"
            className="flex items-center gap-3 text-lg hover:text-red-500 transition-colors"
          >
            <Mail className="w-6 h-6" />
            info@swiftauto.ge
          </Link>
        </div>

        <div className="mt-12 text-center text-neutral-400">
          <p>გამოგვყევით სოციალურ ქსელებში და მიიღეთ განახლებები:</p>
          <ul className="mt-4 space-y-2">
            <li>• ახალი მანქანები ამერიკის აუქციონებზე</li>
            <li>• სპეციალური შეთავაზებები ავტო იმპორტზე</li>
            <li>• მეორადი მანქანების საუკეთესო ვარიანტები</li>
            <li>• რჩევები და სიახლეები მანქანების ჩამოყვანაზე</li>
          </ul>
        </div>
      </div>
    </section>
  )
}
