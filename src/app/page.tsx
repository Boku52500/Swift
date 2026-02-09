import { HeroSection } from '@/components/sections/hero'
import { TrustSignalsSection } from '@/components/sections/trust-signals'
import { PartnersSection } from '@/components/sections/partners'
import { ServicesSection } from '@/components/sections/services'
import { ProcessSection } from '@/components/sections/process'
import { CarsShowcaseSection } from '@/components/sections/manqanebi-amerikidan-texti'
import { FAQSection } from '@/components/sections/faq'
import { BlogScrollSection } from '@/components/sections/blog-scroll'
import { ContactSection } from '@/components/sections/contact'
import { SocialMediaSection } from '@/components/sections/social-media'

export const revalidate = 1800


export default async function Home() {
  return (
    <>
      <HeroSection />
      <TrustSignalsSection />
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="prose prose-neutral max-w-4xl mx-auto">
            <h2>ავტო იმპორტი ამერიკიდან — როგორ გეხმარებით</h2>
            <p>
              Swift Auto Import არის სანდო პარტნიორი მანქანის იმპორტში ამერიკიდან საქართველოში. 
              გთავაზობთ სრულ ციკლს: მოდელის შერჩევა და VIN‑ისტორიის შემოწმება, ბიდინგი Copart/IAAI/Manheim პლატფორმებზე, 
              შიდა ტრანსპორტი პორტამდე, საზღვაო გადაზიდვა, საბაჟო პროცედურები და ჩაბარება. 
              თითოეულ ეტაპზე მოგაწვდით დეტალურ კოტირებას და პროგნოზს ვადებზე, რათა მიიღოთ რეალისტური All‑In ბიუჯეტი.
            </p>
            <p>
              ჩვენი მიზანია გამჭვირვალობა და პროგნოზირებადობა: დოკუმენტაცია მზადდება დროულად, სტატუსს გიზიარებთ პროცესის ყოველ ნაბიჯზე, 
              ხოლო საზღვაო დაზღვევა ჩვენთან უფასოა. საშუალო ვადაა 5–10 კვირა 
              ბიდინგიდან თბილისში მიღებამდე (ლოკაცია/პორტი/სეზონის მიხედვით იცვლება). დაგვიკავშირდით და მიიღეთ ინდივიდუალური 
              ანალიზი თქვენი ბიუჯეტისა და საჭიროებების მიხედვით.
            </p>
          </div>
          <div className="prose prose-neutral max-w-4xl mx-auto mt-6">
            <h3>ხშირად დასმული კითხვები</h3>
            <details>
              <summary>რა დრო სჭირდება ჩამოყვანას?</summary>
              <p>ტიპიურად 5–10 კვირა ბიდინგიდან თბილისში მიღებამდე — გავლენას ახდენს ლოკაცია, კონსოლიდაცია და სეზონი.</p>
            </details>
            <details>
              <summary>რისგან შედგება All‑In ბიუჯეტი?</summary>
              <p>აუქციონის ფასი + საკომისიოები + შიდა ტრანსპორტი (USA) + საზღვაო გადაზიდვა + პორტი + საქართველოში შიდა ტრანსპორტი + განბაჟება.</p>
            </details>
            <details>
              <summary>შეიძლება წინასწარი ინსპექცია?</summary>
              <p>დიახ. მაღალი ღირებულების/არასტანდარტული ზიანის შემთხვევაში ვაწყობთ მესამე მხარის ინსპექტირებას აუქციონის ტერიტორიაზე.</p>
            </details>
          </div>
        </div>
      </section>
      <CarsShowcaseSection />
      <PartnersSection />
      <ServicesSection />
      <ProcessSection />
      <BlogScrollSection />
      <FAQSection />
      <ContactSection />
      <SocialMediaSection />
    </>
  )
}
