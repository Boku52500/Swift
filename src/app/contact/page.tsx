import { Metadata } from "next"
import { Phone, Mail, MapPin, Clock } from "lucide-react"
import { ContactSection } from "@/components/sections/contact"
import { siteConfig } from "@/lib/metadata"

export const metadata: Metadata = {
  title: "დაგვიკავშირდით - Swift Auto Import",
  description: "დაგვიკავშირდით კონსულტაციისთვის. ჩვენი გამოცდილი გუნდი დაგეხმარებათ მანქანის შერჩევაში და იმპორტში ამერიკიდან.",
  alternates: { canonical: `${siteConfig.url}/contact` },
}

export default function ContactPage() {
  return (
    <div className="min-h-screen pt-16">
      {/* Hero Section */}
      <section className="bg-neutral-900 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">დაგვიკავშირდით</h1>
            <p className="text-lg text-neutral-300">
              გაქვთ კითხვები? ჩვენი გუნდი მზადაა დაგეხმაროთ. დაგვიკავშირდით ნებისმიერ დროს.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 -mt-24">
            {/* Phone */}
            <div className="bg-white rounded-xl shadow-lg p-8">
              <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mb-6">
                <Phone className="w-6 h-6 text-red-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2">დაგვირეკეთ</h3>
              <p className="text-neutral-600 mb-4">ჩვენ ვართ ხელმისაწვდომი 24/7</p>
              <a 
                href={`tel:${siteConfig.contact.phone}`} 
                className="text-red-600 hover:text-red-700 font-medium"
              >
                {siteConfig.contact.phone}
              </a>
            </div>

            {/* Email */}
            <div className="bg-white rounded-xl shadow-lg p-8">
              <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mb-6">
                <Mail className="w-6 h-6 text-red-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2">მოგვწერეთ</h3>
              <p className="text-neutral-600 mb-4">მოგწერთ პასუხს რამდენიმე წუთში</p>
              <a 
                href={`mailto:${siteConfig.contact.email}`}
                className="text-red-600 hover:text-red-700 font-medium"
              >
                {siteConfig.contact.email}
              </a>
            </div>

            {/* Location */}
            <div className="bg-white rounded-xl shadow-lg p-8">
              <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mb-6">
                <MapPin className="w-6 h-6 text-red-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2">მისამართი</h3>
              <p className="text-neutral-600 mb-4">გვესტუმრეთ ოფისში</p>
              <p className="text-neutral-900">
                {siteConfig.location.city}, {siteConfig.location.country}
              </p>
            </div>

            {/* Hours */}
            <div className="bg-white rounded-xl shadow-lg p-8">
              <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mb-6">
                <Clock className="w-6 h-6 text-red-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2">სამუშაო საათები</h3>
              <p className="text-neutral-600 mb-4">ორშაბათი - შაბათი</p>
              <p className="text-neutral-900">10:00 - 19:00</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <ContactSection />
    </div>
  )
}
