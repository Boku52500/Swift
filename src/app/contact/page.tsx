import { Metadata } from "next"
import { Phone, Mail, MapPin, Clock } from "lucide-react"
import { ContactSection } from "@/components/sections/contact"
import { siteConfig } from "@/lib/metadata"
import Script from "next/script"

export const metadata: Metadata = {
  title: "დაგვიკავშირდით - Swift Auto Import",
  description: "დაგვიკავშირდით კონსულტაციისთვის. ჩვენი გამოცდილი გუნდი დაგეხმარებათ მანქანის შერჩევაში და იმპორტში ამერიკიდან.",
  alternates: { 
    canonical: `${siteConfig.url}/contact`,
    languages: {
      'x-default': `${siteConfig.url}/contact`,
      'ka-GE': `${siteConfig.url}/contact`,
      'en-US': `${siteConfig.url}/en/contact`,
      'ru-RU': `${siteConfig.url}/ru/kontakty`,
    }
  },
}

export default function ContactPage() {
  return (
    <div className="min-h-screen">
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

      <section className="py-10 bg-white">
        <div className="container mx-auto px-4">
          <div className="prose prose-neutral max-w-3xl mx-auto">
            <h2>როგორ გვეკონტაქტოთ და რას უნდა ელოდოთ</h2>
            <p>
              Swift Auto Import პასუხობს შეტყობინებებს სწრაფად — სამუშაო საათებში ჩვეულებრივ 15–60 წუთში. 
              ვემსახურებით მთელ საქართველოს (თბილისი/რეგიონები) და ვსაუბრობთ ქართულ, ინგლისურ და რუსულ ენებზე. 
              რომ მოვამზადოთ ზუსტი All‑In კოტირება, სასურველია მოგვწეროთ VIN/ლოტის ლინკი, სასურველი ბიუჯეტი და თქვენი ქალაქი.
            </p>
            <p>
              კონსულტაცია მოიცავს Copart/IAAI საკომისიოებს, შიდა/საზღვაო ტრანსპორტს, 
              სავარაუდო ვადებს (ტიპურად 5–10 კვირა) და დოკუმენტებს. ჩვენი მიზანია გამჭვირვალობა და პროგნოზირებადობა.
            </p>
            <h3>ხშირად დასმული კითხვები</h3>
            <details>
              <summary>რა დროში ვიღებ პასუხს?</summary>
              <p>სამუშაო საათებში 15–60 წუთში; იშვიათ შემთხვევებში კითხვებს ვპასუხობთ მომდევნო სამუშაო დღეს.</p>
            </details>
            <details>
              <summary>რა ინფორმაცია გამოვგზავნო?</summary>
              <p>VIN/ლინკი, სასურველი ბიუჯეტი, ქალაქი და პრიორიტეტები (ეკონომია/ქროსოვერი/ჰიბრიდი და სხვ.).</p>
            </details>
            <details>
              <summary>კონფიდენციურობა როგორია?</summary>
              <p>ინფორმაცია გამოიყენება მხოლოდ კოტირებისა და კომუნიკაციისთვის და არ გადაეცემა მესამე პირებს მარკეტინგის მიზნით.</p>
            </details>
          </div>
        </div>
      </section>


      

      {/* Contact Form Section */}
      <ContactSection />


                  
            
          
      
    
      
      
    </div>
  )
}
