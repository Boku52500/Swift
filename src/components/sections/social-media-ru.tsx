import { Facebook, Instagram, Phone, Mail } from 'lucide-react'
import Link from 'next/link'

export function SocialMediaSectionRu() {
  return (
    <section className="py-12 bg-neutral-900 text-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8">Мы на связи</h2>
        <div className="flex flex-wrap justify-center gap-8">
          <Link href="https://facebook.com/swiftautogeo" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-lg hover:text-red-500 transition-colors">
            <Facebook className="w-6 h-6" />
            Swift Auto Import
          </Link>
          <Link href="https://instagram.com/swiftautogeo" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-lg hover:text-red-500 transition-colors">
            <Instagram className="w-6 h-6" />
            @swiftautogeo
          </Link>
          <Link href="tel:+995577908080" className="flex items-center gap-3 text-lg hover:text-red-500 transition-colors">
            <Phone className="w-6 h-6" />
            +995 577 90 80 80
          </Link>
          <Link href="mailto:info@swiftauto.ge" className="flex items-center gap-3 text-lg hover:text-red-500 transition-colors">
            <Mail className="w-6 h-6" />
            info@swiftauto.ge
          </Link>
        </div>
        <div className="mt-12 text-center text-neutral-400">
          <p>Подписывайтесь на обновления:</p>
          <ul className="mt-4 space-y-2">
            <li>• Новые авто на аукционах США</li>
            <li>• Специальные условия импорта</li>
            <li>• Лучшие предложения б/у авто</li>
            <li>• Советы и новости по ввозу авто</li>
          </ul>
        </div>
      </div>
    </section>
  )
}
