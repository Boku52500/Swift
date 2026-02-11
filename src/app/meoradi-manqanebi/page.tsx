"use client"

import { UsedCarsHeroSection } from '@/components/sections/meoradi-manqanebi-hero'
import { UsedCarsBenefitsSection } from '@/components/sections/meoradi-manqanebi-teqsti'
import { CarsShowcaseSection } from '@/components/sections/manqanebi-amerikidan-texti'
import { ContactSection } from '@/components/sections/contact'
import { SocialMediaSection } from '@/components/sections/social-media'
import { AutoDealerSchema } from '@/components/seo/auto-dealer-schema'
import Script from 'next/script'


export default function UsedCars() {
  const schema = AutoDealerSchema()

  return (
    <>
      <main>
        <UsedCarsHeroSection />
        <UsedCarsBenefitsSection />
        <CarsShowcaseSection />
        <section className="py-12 bg-white">
          <div className="container mx-auto px-4">
            <div className="prose prose-neutral max-w-4xl mx-auto">
              <h2>მეორადი მანქანები ამერიკიდან — ხელსაყრელი არჩევანი</h2>
              <p>
                ამერიკული აუქციონები გვაძლევს შესაძლებლობას შევიძინოთ მეორადი მანქანები გამჭვირვალე ისტორიით
                და კონკურენტულ ფასად. Swift Auto უზრუნველყოფს ავტომობილის შემოწმებას, ბიდინგს,
                ტრანსპორტირებასა და განბაჟებას, რათა მიიღოთ საუკეთესო შეთავაზება თქვენი ბიუჯეტისთვის.
              </p>
              <h3>რატომ მეორადი?</h3>
              <ul>
                <li>საუკეთესო თანაფარდობა ფასსა და ხარისხს შორის</li>
                <li>დიდი არჩევანი სხვადასხვა გამოშვების წლებისა და კომფიგურაციების მიხედვით</li>
                <li>სანდო დოკუმენტები და VIN-ისტორია</li>
              </ul>
              <h3>როგორ ავირიდოთ რისკები</h3>
              <ul>
                <li>VIN-ისტორიისა და აუქციონის ჩანაწერების სიღრმისეული შემოწმება</li>
                <li>დაზიანების ტიპისა და შეკეთების ბიუჯეტის წინასწარი შეფასება</li>
                <li>ბიდინგის ჭკვიანური სტრატეგია და სარეზერვო ბიუჯეტი</li>
              </ul>
            </div>
          </div>
        </section>
        <section className="py-12 bg-neutral-50">
          <div className="container mx-auto px-4">
            <div className="prose prose-neutral max-w-4xl mx-auto">
              <h2>ღირებულების გაყოფა — რა უნდა გაითვალისწინოთ</h2>
              <ul>
                <li>ლოტის ფასი (Hammer Price) და აუქციონის საკომისიოები (Buyer’s Premium, Internet Bid).</li>
                <li>შიდა ტრანსპორტი — აუქციონიდან პორტამდე, დამოკიდებულია მანძილსა და შტატზე.</li>
                <li>კონტეინერი — პროგნოზირებადი გრაფიკები, გამჭვირვალე ბიუჯეტი და დამატებითი დაცვა.</li>
                <li>საბაჟო გადასახადები და რეგისტრაცია საქართველოში.</li>
                <li>სარეზერვო ბიუჯეტი — 5-10% გაუთვალისწინებელი ხარჯებისთვის.</li>
              </ul>

              <h3>ვადები — საშუალო ქრონოლოგია</h3>
              <ol>
                <li>შერჩევა და ბიდინგი — 3-10 დღე</li>
                <li>შიდა ტრანსპორტი — 2-7 დღე</li>
                <li>კონტეინერი — 4-8 კვირა</li>
                <li>განბაჟება/ჩაბარება — 2-5 დღე</li>
              </ol>
              <h3>გლოსარიუმი</h3>
              <ul>
                <li>Run & Drive — იქოქება და დადის აუქციონის ტერიტორიაზე.</li>
                <li>Non-Runner — მოძრაობის უნარი არ აქვს; საჭირო ხდება სპეციალური დატვირთვა ან კონტეინერი.</li>
                <li>Buy It Now — ფიქსირებული ფასით სწრაფი შეძენა.</li>
              </ul>
            </div>
          </div>
        </section>
        <section className="py-12 bg-neutral-50">
          <div className="container mx-auto px-4">
            <div className="prose prose-neutral max-w-4xl mx-auto">
              <h2>ხშირად დასმული კითხვები</h2>
              <details>
                <summary>რა არის საუკეთესო გარბენი/წელი ფასისა და ხარისხისთვის?</summary>
                <p>ხშირად ოპტიმალური არის 5-8 წლის ავტომობილები საშუალო გარბენით; კონკრეტული არჩევანი დამოკიდებულია ბრენდსა და მოდელზე.</p>
              </details>
              <details>
                <summary>შეიძლება დაზიანებული ავტომობილის აღდგენა საქართველოში?</summary>
                <p>დიახ, ვთანამშრომლობთ სანდო სერვისებთან და ვადგენთ რეალისტურ ბიუჯეტს აღდგენისთვის.</p>
              </details>
              <details>
                <summary>როგორ ხდება გადახდა?</summary>
                <p>გადახდა ხდება ეტაპობრივად: აუქციონის საფასური, შიდა ტრანსპორტი, კონტეინერი და საბაჟო/რეგისტრაცია.</p>
              </details>
              <details>
                <summary>რა განსხვავებაა Clean და Salvage Title-ს შორის?</summary>
                <p>Clean ნიშნავს შეუზღუდავ რეგისტრაციას; Salvage — დაზიანებულის სტატუსი, რომელიც საჭიროებს აღდგენასა და შემდგომ რეგისტრაციას წესებით.</p>
              </details>
              <details>
                <summary>შეიძლება VIN შემოწმება და წინასწარი ინსპექცია?</summary>
                <p>დიახ, VIN-ისტორიას ვამოწმებთ ოფიციალურ სერვისებში და შესაძლებელია მესამე მხარის ინსპექტირება აუქციონის ტერიტორიაზე.</p>
              </details>
              <details>
                <summary>როგორ დავგეგმო საერთო ბიუჯეტი?</summary>
                <p>გაითვალისწინეთ: ლოტის ფასი + საკომისიოები + შიდა ტრანსპორტი + კონტეინერი + საბაჟო/რეგისტრაცია + 5-10% სარეზერვო.</p>
              </details>
            </div>
          </div>
        </section>
        <section className="py-12 bg-white">
          <div className="container mx-auto px-4">
            <div className="prose prose-neutral max-w-4xl mx-auto">
              <h2>რატომ მეორადი მანქანები ამერიკიდან — კარგი გადაწყვეტილება საქართველოში</h2>
              <p>
                ამერიკული აუქციონები აერთიანებს მანქანებს მრავალფეროვანი კომპლექტაციებით, გამჭვირვალე ჩანაწერებით და კონკურენტულ ფასებით. 
                წინასწარ განსაზღვრული ბიუჯეტით და კონტეინერის გრაფიკის დაგეგმვით, საბოლოო ღირებულება ხშირად უკეთესია, ვიდრე 
                ადგილობრივად — თან უკეთესი უსაფრთხოების/კომფორტის თვალსაზრისით.
              </p>
              <ul>
                <li>ფართო არჩევანი სედანებში, SUV-ებში, ჰიბრიდებსა და ელექტრო მანქანებში.</li>
                <li>პროგნოზირებადი ვადები კონტეინერის წინასწარი ჯავშნით.</li>
                <li>დოკუმენტაციის გამჭვირვალობა — Title და აუქციონის ჩანაწერები.</li>
              </ul>

              <h3>ვისთვისაა — მყიდველის პროფილები</h3>
              <ul>
                <li><strong>ყოველდღიური მოხმარება</strong> — ეკონომიური სედანი/ქროსოვერი დაბალი ხარჯებით.</li>
                <li><strong>ოჯახი</strong> — საშუალო ზომის SUV ADAS-ით და AWD საჭიროებისამებრ.</li>
                <li><strong>ეფექტურობა</strong> — ჰიბრიდი/ელექტრომობილი ბატარეის გამართული მდგომარეობით.</li>
                <li><strong>პრემიუმ</strong> — მცირე გარბენი, სრული დოკუმენტაცია და დაცული ლოჯისტიკა.</li>
              </ul>

              <h2>როგორ ვმართავთ რისკებს</h2>
              <ul>
                <li>VIN-რეპორტებისა და ფოტო/აღწერის თანხვედრის სიღრმისეული შემოწმება.</li>
                <li>დაზიანებების ტიპების და აღდგენის ბიუჯეტის წინასწარი შეფასება.</li>
                <li>Storage/Gate მინიმიზაცია — სწრაფი გატანა მოგების თანავე.</li>
                <li>კონტეინერის ბუქინგის ფანჯრები და Plan‑B.</li>
                <li>საბაჟო დოკუმენტების წინასწარი ვალიდაცია შეფერხებების თავიდან ასაცილებლად.</li>
              </ul>

              <h2>ჩეკ-ლისტები</h2>
              <h3>შესყიდვამდე</h3>
              <ul>
                <li>მიზანი (ყოველდღიური/ოჯახი/პრემიუმ) და აუცილებელი ფუნქციები.</li>
                <li>ბიუჯეტის დიაპაზონი და შეთანხმებული ლიმიტები ბიდინგისთვის.</li>
                <li>სასურველი Title, აუქციონის ჩანაწერები და დაზღვევის საჭიროება.</li>
              </ul>
              <h3>ჩამოსვლის შემდეგ</h3>
              <ul>
                <li>VIN-ის დადასტურება დოკუმენტებითა და ფოტოებით.</li>
                <li>საბაზისო სერვისი (სითხეები, ფილტრები, საბურავები).</li>
                <li>რეგისტრაცია/ნომრები საქართველოში.</li>
              </ul>

              <h2>მზად ხართ? — დაიწყეთ გამჭვირვალე გეგმით</h2>
              <p>
                გამოთვალეთ საკომისიოები ჩვენს <a href="/auqcionis-kalkulatori" className="text-red-600 hover:text-red-700">აუქციონის კალკულატორში</a>,
                წაიკითხეთ მეტი <a href="/manqanebi-amerikidan" className="text-red-600 hover:text-red-700">მანქანები ამერიკიდან</a> და 
                <a href="/amerikis-avto-auqcioni" className="text-red-600 hover:text-red-700">ამერიკის აუქციონები</a> გვერდებზე — 
                ჩვენ მოვამზადებთ დეტალურ ბიუჯეტს და გრაფიკს თქვენი საჭიროებების მიხედვით.
              </p>
            </div>
          </div>
        </section>
        <ContactSection />
        <SocialMediaSection />
      </main>
      <Script
        id="auto-dealer-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <Script
        id="faq-schema-used-cars"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: [
              {
                '@type': 'Question',
                name: 'რა არის საუკეთესო გარბენი/წელი ფასისა და ხარისხისთვის?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'ხშირად ოპტიმალური არის 5-8 წლის ავტომობილები საშუალო გარბენით; არჩევანი დამოკიდებულია კონკრეტულ მოდელზე.',
                },
              },
              {
                '@type': 'Question',
                name: 'შეიძლება დაზიანებული ავტომობილის აღდგენა საქართველოში?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'დიახ, ვთანამშრომლობთ სანდო სერვისებთან; წინასწარ ვადგენთ რეალისტურ ბიუჯეტსა და ვადებს.',
                },
              },
              {
                '@type': 'Question',
                name: 'როგორ ხდება გადახდა?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'გადახდა ხდება ეტაპობრივად — აუქციონის საფასური, შიდა ტრანსპორტი, კონტეინერი და საბაჟო/რეგისტრაცია.',
                },
              },
              {
                '@type': 'Question',
                name: 'რა განსხვავებაა Clean და Salvage Title-ს შორის?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Clean ნიშნავს შეუზღუდავ რეგისტრაციას; Salvage — დაზიანებულის სტატუსი, რომელიც მოითხოვს აღდგენას და წესების დაცვას.',
                },
              },
              {
                '@type': 'Question',
                name: 'შეიძლება VIN შემოწმება და წინასწარი ინსპექცია?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'დიახ, VIN-ისტორია მოწმდება ოფიციალურ სერვისებში; შესაძლებელია მესამე მხარის ინსპექტირება აუქციონის ტერიტორიაზე.',
                },
              },
              {
                '@type': 'Question',
                name: 'როგორ დავგეგმო საერთო ბიუჯეტი?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'ლოტის ფასი + საკომისიოები + შიდა ტრანსპორტი + კონტეინერი + საბაჟო/რეგისტრაცია + 5-10% სარეზერვო ბუფერი.',
                },
              },
            ],
          }),
        }}
      />
      <Script
        id="howto-used-cars"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'HowTo',
            name: 'მეორადი მანქანის შეძენა ამერიკის აუქციონზე — ნაბიჯ-ნაბიჯ',
            description: 'შერჩევა, VIN შემოწმება, ბიდინგი, ტრანსპორტირება და რეგისტრაცია საქართველოში.',
            totalTime: 'P5W',
            step: [
              { '@type': 'HowToStep', name: 'კონსულტაცია', text: 'ბიუჯეტის განსაზღვრა და მოთხოვნების ჩამოყალიბება.' },
              { '@type': 'HowToStep', name: 'შერჩევა', text: 'ფილტრები/ფოტოები/VIN-ისტორია.' },
              { '@type': 'HowToStep', name: 'ბიდინგი', text: 'შეთანხმებული ლიმიტით მონაწილეობა Pre-bid/Live რეჟიმში.' },
              { '@type': 'HowToStep', name: 'ტრანსპორტირება', text: 'შიდა ტრანსპორტი პორტამდე, შემდეგ კონტეინერი.' },
              
              { '@type': 'HowToStep', name: 'საბაჟო', text: 'განბაჟება და რეგისტრაცია საქართველოს წესებით.' },
              { '@type': 'HowToStep', name: 'ჩაბარება', text: 'ავტომობილის ჩაბარება დოკუმენტებთან ერთად.' },
            ],
          }),
        }}
      />
      <Script
        id="breadcrumb-used-cars"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            itemListElement: [
              { '@type': 'ListItem', position: 1, name: 'მთავარი', item: 'https://swiftauto.ge/' },
              { '@type': 'ListItem', position: 2, name: 'მეორადი მანქანები', item: 'https://swiftauto.ge/meoradi-manqanebi' },
            ],
          }),
        }}
      />
    </>
  )
}
