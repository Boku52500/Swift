import type { Metadata } from "next"
import { Phone, Mail, MapPin, Clock } from "lucide-react"
import { ContactSectionEn } from "@/components/sections/contact-en"
import { siteConfig } from "@/lib/metadata"

export const metadata: Metadata = {
  title: "Contact Us - Swift Auto Import",
  description: "Get in touch for a consultation. Our experienced team will help you select and import a car from the USA.",
  alternates: { 
    canonical: `${siteConfig.url}/en/contact`,
    languages: {
      'x-default': `${siteConfig.url}/contact`,
      'ka-GE': `${siteConfig.url}/contact`,
      'en-US': `${siteConfig.url}/en/contact`,
      'ru-RU': `${siteConfig.url}/ru/kontakty`,
    }
  },
}

export default function ContactEnPage() {
  return (
    <div className="min-h-screen">
      <section className="bg-neutral-900 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Contact Us</h1>
            <p className="text-lg text-neutral-300">Have questions? Our team is ready to help — contact us anytime.</p>
          </div>
        </div>
      </section>

      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 -mt-24">
            <div className="bg-white rounded-xl shadow-lg p-8">
              <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mb-6">
                <Phone className="w-6 h-6 text-red-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Call us</h3>
              <p className="text-neutral-600 mb-4">Available 24/7</p>
              <a href={`tel:${siteConfig.contact.phone}`} className="text-red-600 hover:text-red-700 font-medium">{siteConfig.contact.phone}</a>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-8">
              <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mb-6">
                <Mail className="w-6 h-6 text-red-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Email</h3>
              <p className="text-neutral-600 mb-4">We usually reply in minutes</p>
              <a href={`mailto:${siteConfig.contact.email}`} className="text-red-600 hover:text-red-700 font-medium">{siteConfig.contact.email}</a>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-8">
              <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mb-6">
                <MapPin className="w-6 h-6 text-red-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Address</h3>
              <p className="text-neutral-600 mb-4">Visit our office</p>
              <p className="text-neutral-900">{siteConfig.location.city}, {siteConfig.location.country}</p>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-8">
              <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mb-6">
                <Clock className="w-6 h-6 text-red-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Hours</h3>
              <p className="text-neutral-600 mb-4">Monday - Saturday</p>
              <p className="text-neutral-900">10:00 - 19:00</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-10 bg-white">
        <div className="container mx-auto px-4">
          <div className="prose prose-neutral max-w-3xl mx-auto">
            <h2>How to contact us and what to expect</h2>
            <p>
              Swift Auto Import replies quickly — typically within 15–60 minutes during business hours. We serve all of Georgia and
              speak Georgian, English, and Russian. To prepare an accurate all‑in quote, please send a VIN/lot link, budget, and your city.
            </p>
            <p>
              The consultation covers Copart/IAAI fees, inland/ocean transport, typical timelines (usually 5–10 weeks), and documentation.
              Our goal is transparency and predictability.
            </p>
            <h3>Frequently asked questions</h3>
            <details>
              <summary>When will I get a response?</summary>
              <p>Within 15–60 minutes during business hours; occasionally next business day.</p>
            </details>
            <details>
              <summary>What info should I send?</summary>
              <p>VIN/link, target budget, city, and preferences (economy/SUV/hybrid, etc.).</p>
            </details>
            <details>
              <summary>How is my data handled?</summary>
              <p>We use it only to prepare quotes and communicate; it is not shared with third parties for marketing.</p>
            </details>
          </div>
        </div>
      </section>

      

      <ContactSectionEn />
    </div>
  )
}
