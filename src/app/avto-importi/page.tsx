"use client"

import { AutoImportHeroSection } from '@/components/sections/avto-importi-hero'
import { ImportServicesSection } from '@/components/sections/avto-importi-teqsti'
import { ContactSection } from '@/components/sections/contact'
import { SocialMediaSection } from '@/components/sections/social-media'
import { AutoDealerSchema } from '@/components/seo/auto-dealer-schema'
import Script from 'next/script'


export default function AutoImport() {
  const schema = AutoDealerSchema()

  return (
    <>
      <main>
        <AutoImportHeroSection />
        <ImportServicesSection />
        <section className="py-12 bg-white">
          <div className="container mx-auto px-4">
            <div className="prose prose-neutral max-w-4xl mx-auto">
              <h2>ავტო იმპორტი ამერიკიდან — სრული სერვისი</h2>
              <p>
                Swift Auto უზრუნველყოფს ავტომობილის იმპორტის სრულ მომსახურებას ამერიკიდან საქართველოში.
                გეხმარებით მოდელის შერჩევაში, მდგომარეობის შეფასებაში, ბიდინგში, ტრანსპორტირებასა და
                განბაჟებაში — სანამ ავტომობილს უსაფრთხოდ ჩაგაბარებთ.
              </p>
              <h3>რატომ Swift Auto?</h3>
              <ul>
                <li>ექსპერტული ბიდინგი Copart IAAI Manheim და უამრავ სხვა აუქციონებზე</li>
                <li>გამჭვირვალე ფასები და დეტალური კონსულტაცია</li>
                <li>სანდო ლოჯისტიკური პარტნიორები და დროული ჩაბარება</li>
              </ul>
              <h3>ავტო იმპორტის სტანდარტული გზა</h3>
              <ol>
                <li>საჭიროებების განხილვა და ბიუჯეტის განსაზღვრა</li>
                <li>ავტომობილის მოძიება და შეფასება ისტორიის მიხედვით</li>
                <li>ბიდინგი და შეძენა საუკეთესო ფასად</li>
                <li>შიდა ტრანსპორტი პორტამდე და საზღვაო გადაზიდვა</li>
                <li>განბაჟება/რეგისტრაცია და ჩაბარება</li>
              </ol>
              <p>
                საკომისიოების სწრაფი შეფასებისთვის გამოიყენეთ ჩვენი
                {' '}<a href="/auqcionis-kalkulatori">აუქციონის კალკულატორი</a>.
              </p>
            </div>
          </div>
        </section>
        <section className="py-12 bg-neutral-50">
          <div className="container mx-auto px-4">
            <div className="prose prose-neutral max-w-4xl mx-auto">
              <h2>ღირებულების გაყოფა — რას მოიცავს ბიუჯეტი</h2>
              <ul>
                <li>აუქციონის ფასი (Hammer Price) — ლოტის საბოლოო შეძენის თანხა.</li>
                <li>აუქციონის საკომისიოები — Buyer’s Premium, Internet Bid Fee, Gate/Storage საჭიროებისამებრ.</li>
                <li>დოკუმენტაცია — Title პროცესინგი/Release, Bill of Sale და შესაბამისი გადასახადები.</li>
                <li>შიდა ტრანსპორტი — ლოტიდან პორტამდე მიწოდება (დამოკიდებულია შტატსა და მანძილზე).</li>
                <li>საზღვაო გადაზიდვა — RORO ან კონტეინერი (ტარიფი დამოკიდებულია პორტზე, სეზონზე, ზომაზე).</li>
                <li>დაზღვევა — გთავაზობთ ვიზუალის, ძრავისა და ტრანსმისიის დაზღვევას სრულიად უფასოდ.</li>
                <li>განბაჟება/დასაბეგრი ღირებულება — ადგილობრივი ტარიფები და საბაჟო ფორმალობები.</li>
                <li>რეგისტრაცია/პლატები — საბოლოო ჩაბარებამდე საჭირო ადგილობრივი ხარჯები.</li>
              </ul>
              <h3>ქრონოლოგია და ვადები (საშუალო)</h3>
              <ol>
                <li>მონაცემების შეგროვება და ბიუჯეტირება — 1-3 დღე</li>
                <li>შერჩევა/ბიდინგი — 3-10 დღე (ლოტის ხელმისაწვდომობის მიხედვით)</li>
                <li>შიდა ტრანსპორტი — 2-7 დღე</li>
                <li>ზღვის გადაზიდვა — 4-8 კვირა პორტიდან გამომდინარე</li>
                <li>განბაჟება/რეგისტრაცია — 2-5 დღე</li>
              </ol>
              <h3>გლოსარიუმი</h3>
              <ul>
                <li>Run & Drive — ავტომობილი იქოქება და მოძრაობს აუქციონის ტერიტორიაზე.</li>
                <li>Non-Runner — ძრავა/ტრანსმისია არ მუშაობს; საჭიროა კონტეინერი ან სპეციალური დატვირთვა.</li>
                <li>Salvage Title — დაზიანებულის სტატუსი; შესაძლებელია აღდგენა/რეგისტრაცია წესების შესაბამისად.</li>
              </ul>
            </div>
          </div>
        </section>
        <section className="py-12 bg-neutral-50">
          <div className="container mx-auto px-4">
            <div className="prose prose-neutral max-w-4xl mx-auto">
              <h2>ხშირად დასმული კითხვები</h2>
              <details>
                <summary>რამდენ ხანს გრძელდება ავტომობილის ჩამოყვანა?</summary>
                <p>საშუალოდ 5-8 კვირა, დამოკიდებულია ლოკაციაზე და საზღვაო გრაფიკზე.</p>
              </details>
              <details>
                <summary>რა გარანტია მაქვს მანქანის მდგომარეობაზე?</summary>
                <p>გაწვდით აუქციონის ანგარიშებს, ფოტოს/ვიდეოს, ასევე VIN-ისტორიას. ვაკეთებთ პროფესიონალურ ინსპექციას საჭიროებისამებრ.</p>
              </details>
              <details>
                <summary>რა ღირს ტრანსპორტირება?</summary>
                <p>ფასი განსხვავდება ზომისა და შტატის მიხედვით. დაგვიკავშირდით და გამოგიგზავნით დეტალურ ანალიზს.</p>
              </details>
              <details>
                <summary>რა განსხვავებაა RORO-სა და კონტეინერს შორის?</summary>
                <p>RORO სწრაფი და ეკონომიურია მოსიარულე მანქანებისთვის; კონტეინერი უსაფრთხოა ძვირადღირებული/არამოსიარულე ლოტებისთვის.</p>
              </details>
              <details>
                <summary>შეიძლება წინასწარი ინსპექცია?</summary>
                <p>დიახ, შესაძლებელია აუქციონის ტერიტორიაზე მესამე მხარის ინსპექტირების ორგანიზება წინასწარი დათვალიერებისთვის.</p>
              </details>
              <details>
                <summary>როგორ ხდება გადახდა?</summary>
                <p>გადახდა ეტაპობრივად: აუქციონის თანხა/საკომისიოები, შიდა ტრანსპორტი, საზღვაო გადაზიდვა და საბოლოოდ განბაჟება.</p>
              </details>
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
        id="faq-schema-auto-import"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: [
              {
                '@type': 'Question',
                name: 'რამდენ ხანი სჭირდება ავტომობილის ჩამოყვანას?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'საშუალოდ 5-8 კვირა, ლოკაციიდან და გადაზიდვის გრაფიკიდან გამომდინარე.',
                },
              },
              {
                '@type': 'Question',
                name: 'რა გარანტია მაქვს მანქანის მდგომარეობაზე?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'გაწვდით აუქციონის დეტალებს, ფოტო/ვიდეო მასალას და VIN-ისტორიას; ინსპექცია შესაძლებელია მოთხოვნით.',
                },
              },
              {
                '@type': 'Question',
                name: 'რამდენი ჯდება ტრანსპორტირება და განბაჟება?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'ფასი დამოკიდებულია ავტომობილის ზომაზე/წონაზე და სეზონურობაზე; დეტალური კოტირებისთვის დაგვიკავშირდით.',
                },
              },
              {
                '@type': 'Question',
                name: 'რა განსხვავებაა RORO-სა და კონტეინერს შორის?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'RORO უფრო სწრაფი/ეკონომიურია მოსიარულე მანქანებისთვის; კონტეინერი უსაფრთხოა ძვირადღირებული ან არამოსიარულე ლოტებისთვის.',
                },
              },
              {
                '@type': 'Question',
                name: 'შეიძლება წინასწარი ინსპექცია?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'დიახ, ორგანიზება შესაძლებელია მესამე მხარის მიერ აუქციონის ტერიტორიაზე შეთანხმებით.',
                },
              },
              {
                '@type': 'Question',
                name: 'როგორ ხდება გადახდა?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'გადახდა იყოფა ეტაპებად: აუქციონის საფასური/საკომისიოები, შიდა ტრანსპორტი, საზღვაო გადაზიდვა, განბაჟება/რეგისტრაცია.',
                },
              },
            ],
          }),
        }}
      />
      <Script
        id="howto-auto-import"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'HowTo',
            name: 'ავტო იმპორტი ამერიკიდან — ნაბიჯ-ნაბიჯ',
            description: 'როგორ ხდება ავტომობილის შერჩევა, ბიდინგი, გადაზიდვა და განბაჟება საქართველოში.',
            totalTime: 'P5W',
            step: [
              { '@type': 'HowToStep', name: 'კონსულტაცია', text: 'საჭიროებების გააზრება და ბიუჯეტის განსაზღვრა.' },
              { '@type': 'HowToStep', name: 'შერჩევა', text: 'VIN-ისტორიის შემოწმება და ტექნიკური ანალიზი.' },
              { '@type': 'HowToStep', name: 'ბიდინგი', text: 'აუქციონზე მონაწილეობა განსაზღვრული ლიმიტით.' },
              { '@type': 'HowToStep', name: 'შიდა ტრანსპორტი', text: 'ლოტის მიწოდება პორტამდე.' },
              { '@type': 'HowToStep', name: 'ზღვის გადაზიდვა', text: 'RORO ან კონტეინერი — ვადების/ბიუჯეტის მიხედვით.' },
              { '@type': 'HowToStep', name: 'განბაჟება', text: 'საბაჟო პროცედურები და რეგისტრაცია.' },
              { '@type': 'HowToStep', name: 'ჩაბარება', text: 'ავტომობილის გადაცემა ყველა დოკუმენტთან ერთად.' },
            ],
          }),
        }}
      />
      <Script
        id="breadcrumb-auto-import"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            itemListElement: [
              { '@type': 'ListItem', position: 1, name: 'მთავარი', item: 'https://swiftauto.ge/' },
              { '@type': 'ListItem', position: 2, name: 'ავტო იმპორტი', item: 'https://swiftauto.ge/avto-importi' },
            ],
          }),
        }}
      />
    </>
  )
}
