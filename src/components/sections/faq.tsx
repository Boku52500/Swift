import { FAQSchema } from '@/components/seo/json-ld'
import Link from 'next/link'

const faqItems = [
  {
    question: 'რა დრო სჭირდება მანქანის ჩამოყვანას ამერიკიდან საქართველოში?',
    answer: <>ჩვენი <Link href="/avto-importi" className="text-red-600 hover:text-red-700">ავტო იმპორტის</Link> ვადა შეძენიდან საქართველოში მიწოდებამდე არის საშუალოდ 45-60 დღე. ეს მოიცავს <Link href="/amerikis-avto-auqcioni" className="text-red-600 hover:text-red-700">ამერიკის ავტო აუქციონიდან</Link> შეძენილი მანქანის დამუშავებას (4-7 დღე), სახმელეთო ტრანსპორტირებას პორტამდე (4-7 დღე) და საზღვაო გადაზიდვას (30-40 დღე).</>,
  },
  {
    question: 'რა ხარჯები ახლავს ავტომობილის იმპორტს?',
    answer: <>საერთო ღირებულება მოიცავს ავტომობილის ფასს, <Link href="/amerikis-avto-auqcioni" className="text-red-600 hover:text-red-700">ამერიკის ავტო აუქციონის</Link> საკომისიოებს, ტრანსპორტირების ხარჯებს და საბაჟოს (განბაჟების) გადასახადს (რომელიც დამოკიდებულია ავტომობილის წლოვანებასა და ძრავის მოცულობაზე). შეძენამდე ჩვენ გთავაზობთ ხარჯების დეტალურ ფაქტურას.</>,
  },
  {
    question: 'გეხმარებით თუ არა ავტომობილის რეგისტრაციის საკითხებში საქართველოში?',
    answer: 'დიახ, ჩვენ გთავაზობთ სრულ სერვისს ავტომობილის რეგისტრაციასთან არსებულ საკითხებში საქართველოში. ეს მოიცავს დოკუმენტების მომზადებას, ტექნიკური ინსპექციის ორგანიზებას და რეგისტრაციას სერვისის სააგენტოში.',
  },
  {
    question: 'რომელ ამერიკის ავტო აუქციონებთან თანამშრომლობთ?',
    answer: <><Link href="/amerikis-avto-auqcioni" className="text-red-600 hover:text-red-700">ამერიკის ავტო აუქციონებიდან</Link> ჩვენთვის ყველა წამყვანი პლატფორმა ხელმისაწვდომია, მათ შორის Copart, IAAI, Manheim და Adesa. ჩვენი ექსპერტთა გუნდი ფლობს წვდომას ათასობით ავტომობილზე და შეუძლიათ <Link href="/manqanebi-amerikidan" className="text-red-600 hover:text-red-700">მანქანების ჩამოყვანა ამერიკიდან</Link> თქვენი ბიუჯეტის გათვალისწინებით.</>,
  },
  {
    question: 'რა ტიპის ავტომობილების იმპორტია შესაძლებელი საქართველოში?',
    answer: <>საქართველოში შესაძლებელია თითქმის ყველა ტიპის <Link href="/manqanebi-amerikidan" className="text-red-600 hover:text-red-700">მანქანების ჩამოყვანა ამერიკიდან</Link>. ჩამოგვყავს SUV-ები, სატვირთო მანქანები და მოტოციკლები. თუმცა, ავტომობილები უნდა აკმაყოფილებდეს საქართველოს <Link href="/avto-importi" className="text-red-600 hover:text-red-700">ავტო იმპორტის</Link> რეგულაციებს ასაკისა და გამოყოფილი აირის სტანდარტების მიხედვით. ჩვენი სერვისებია: <Link href="/manqanebi-amerikidan" className="text-red-600 hover:text-red-700">მანქანების ჩამოყვანა ამერიკიდან</Link> და <Link href="/meoradi-manqanebi" className="text-red-600 hover:text-red-700">მეორადი მანქანების ყიდვა</Link> ხელმისაწვდომი პირობებით.</>,
  },
]

export function FAQSection() {
  return (
    <section id="faq" className="py-16">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-3xl font-bold mb-4">
            ხშირად დასმული კითხვები
          </h2>
          <p className="text-neutral-600">
            ზოგადი კითხვები <Link href="/avto-importi" className="text-red-600 hover:text-red-700">ავტო იმპორტის</Link> შესახებ
          </p>
        </div>

        <div className="max-w-3xl mx-auto divide-y divide-neutral-100">
          {faqItems.map((item, index) => (
            <div key={index} className="py-6">
              <h3 className="text-lg font-semibold mb-2">
                {item.question}
              </h3>
              <p className="text-neutral-600">
                {item.answer}
              </p>
            </div>
          ))}
        </div>

        {/* FAQ Schema */}
        <FAQSchema items={faqItems} />
      </div>
    </section>
  )
}
