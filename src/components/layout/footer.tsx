import Link from 'next/link'
import { Phone, Mail, MapPin } from 'lucide-react'

export function Footer() {
  return (
    <footer className="bg-neutral-900 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold">Swift Auto Import</h3>
            <p className="text-neutral-400">
              შენი სანდო ავტო იმპორტიორი საქართველოში
            </p>
          </div>

          {/* Main Services */}
          <div>
            <h4 className="font-semibold mb-4">ძირითადი სერვისები</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/amerikis-avto-auqcioni" className="text-neutral-400 hover:text-white">
                  ამერიკის ავტო აუქციონი
                </Link>
              </li>
              <li>
                <Link href="/manqanebi-amerikidan" className="text-neutral-400 hover:text-white">
                  მანქანები ამერიკიდან
                </Link>
              </li>
              <li>
                <Link href="/avto-importi" className="text-neutral-400 hover:text-white">
                  ავტო იმპორტი
                </Link>
              </li>
              <li>
                <Link href="/meoradi-manqanebi" className="text-neutral-400 hover:text-white">
                  მეორადი მანქანები
                </Link>
              </li>
            </ul>
          </div>

          {/* Additional Links */}
          <div>
            <h4 className="font-semibold mb-4">დამატებითი ბმულები</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/#process" className="text-neutral-400 hover:text-white">
                  როგორ მუშაობს
                </Link>
              </li>
              <li>
                <Link href="/#faq" className="text-neutral-400 hover:text-white">
                  ხშირად დასმული კითხვები
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold mb-4">დაგვიკავშირდით</h4>
            <ul className="space-y-2">
              <li className="flex items-center gap-2 text-neutral-400">
                <Phone className="w-4 h-4" />
                <a href="tel:+995577908080" className="hover:text-white">
                  +995 577 90 80 80
                </a>
              </li>
              <li className="flex items-center gap-2 text-neutral-400">
                <Mail className="w-4 h-4" />
                <a href="mailto:info@swiftautoimport.ge" className="hover:text-white">
                  info@swiftauto.ge
                </a>
              </li>
              <li className="flex items-center gap-2 text-neutral-400">
                <MapPin className="w-4 h-4" />
                <span>Tbilisi, Georgia</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-neutral-800 text-center text-neutral-400">
          <p>&copy; {new Date().getFullYear()} Swift Auto Import. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
