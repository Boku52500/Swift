"use client"

import { CarsFromAmericaHeroSection } from '@/components/sections/manqanebi-amerikidan-hero'
import { CarsShowcaseSection } from '@/components/sections/manqanebi-amerikidan-texti'
import { ProcessSection } from '@/components/sections/process'
import { ContactSection } from '@/components/sections/contact'
import { SocialMediaSection } from '@/components/sections/social-media'
import { AutoDealerSchema } from '@/components/seo/auto-dealer-schema'
import Script from 'next/script'


export default function CarsFromAmerica() {
  const schema = AutoDealerSchema()

  return (
    <>
      <main>
        <CarsFromAmericaHeroSection />
        <CarsShowcaseSection />
        <section className="py-12 bg-white">
          <div className="container mx-auto px-4">
            <div className="prose prose-neutral max-w-4xl mx-auto">
              <h2>მანქანები ამერიკიდან — როგორ ვმუშაობთ</h2>
              <p>
                ჩვენ გეხმარებით შეარჩიოთ ამერიკული ავტომობილი სანდო ისტორიითა და დოკუმენტაციით, განვახორციელებთ
                ბიდინგს, შიდა ტრანსპორტს, საზღვაო გადაზიდვას და განბაჟებას საქართველოში. პროცესი არის
                გამჭვირვალე და პროგნოზირებადი — იღებთ დეტალურ კონსულტაციას ყოველ ეტაპზე.
              </p>
              <h3>უპირატესობები</h3>
              <ul>
                <li>დიდი არჩევანი Copart/IAAI აუქციონებიდან</li>
                <li>VIN-ისტორია და პირობების დეტალური შეფასება</li>
                <li>სანდო ლოჯისტიკა და დროული ჩაბარება</li>
              </ul>
              <h3>ნაბიჯები</h3>
              <ol>
                <li>კონსულტაცია და ბიუჯეტის განსაზღვრა</li>
                <li>შერჩევა/შეფასება და ბიდინგი</li>
                <li>ტრანსპორტირება პორტამდე და საზღვაო გადაზიდვა</li>
                <li>განბაჟება და ჩაბარება</li>
              </ol>
              <p>
                საკომისიოების წინასწარი გათვლისთვის გამოიყენეთ ჩვენი
                {' '}<a href="/auqcionis-kalkulatori">აუქციონის კალკულატორი</a> და მეტი დეტალისთვის იხილეთ
                {' '}<a href="/avto-importi">ავტო იმპორტის</a> გვერდი.
              </p>
            </div>
          </div>
        </section>
        <section className="py-12 bg-neutral-50">
          <div className="container mx-auto px-4">
            <div className="prose prose-neutral max-w-4xl mx-auto">
              <h2>ღირებულების სტრუქტურა და ტრანსპორტის ტიპები</h2>
              <ul>
                <li>Hammer Price — აუქციონზე მოგებული ფასი (ლოტის თვითღირებულება).</li>
                <li>აუქციონის საკომისიოები — Buyer’s Premium, Internet Bid, Gate/Storage საჭიროებისამებრ.</li>
                <li>შიდა ტრანსპორტი — აუქციონის ეზოდან პორტამდე მიწოდება შტატისა და მანძილის მიხედვით.</li>
                <li>ზღვის გადაზიდვა — RORO ან კონტეინერი; ვადები/ბიუჯეტი/დაცულობა განსხვავდება.</li>
                <li>საბაჟო და რეგისტრაცია — ადგილობრივი რეგულაციებისა და ტარიფების გათვალისწინებით.</li>
              </ul>
              <h3>RORO თუ კონტეინერი?</h3>
              <p>
                RORO მიზანშეწონილია დაქოქვადი მანქანებისთვის — ხშირად იგი უფრო იაფი და სწრაფია. კონტეინერს
                არჩევენ ძვირადღირებულ ან არა-დაქოქვად (Non-Runner) ლოტებზე და იგი უზრუნველყოფს დამატებით დაცვას.
              </p>
              <h3>დოკუმენტები</h3>
              <ul>
                <li>Title (Clean/Salvage/Rebuilt) — განსაზღვრავს რეგისტრაციის შესაძლებლობას.</li>
                <li>Bill of Sale — საკუთრების გადაცემის დადასტურება.</li>
                <li>Export Release — ლოტის პორტიდან ექსპორტის ნებართვა.</li>
              </ul>
              <h3>ვადები — საშუალო ქრონოლოგია</h3>
              <ol>
                <li>შერჩევა/ბიდინგი — 3-10 დღე</li>
                <li>შიდა ტრანსპორტი პორტამდე — 2-7 დღე</li>
                <li>საზღვაო გადაზიდვა — 4-8 კვირა</li>
                <li>განბაჟება/ჩაბარება — 2-5 დღე</li>
              </ol>
              <h3>გლოსარიუმი</h3>
              <ul>
                <li>Run & Drive — ავტომობილი მოძრაობს აუქციონის ტერიტორიაზე.</li>
                <li>Non-Runner — ძრავა/ტრანსმისია არ მუშაობს; საჭიროა სპეციალური დატვირთვა ან კონტეინერი.</li>
                <li>Salvage Title — დაზიანებულის სტატუსი; შესაძლებელია აღდგენა შესაბამისი წესებით.</li>
              </ul>
            </div>
          </div>
        </section>
        <section className="py-12 bg-neutral-50">
          <div className="container mx-auto px-4">
            <div className="prose prose-neutral max-w-4xl mx-auto">
              <h2>ხშირად დასმული კითხვები</h2>
              <details>
                <summary>როგორ შევამოწმოთ ავტომობილის ისტორია?</summary>
                <p>ვიყენებთ ოფიციალურ წყაროებს (VIN-სერვისებს) და აუქციონის ჩანაწერებს. საჭიროებისამებრ ხელმისაწვდომია ინსპექცია.</p>
              </details>
              <details>
                <summary>რამდენ ხანს სჭირდება გადაზიდვას?</summary>
                <p>საშუალოდ 4-8 კვირა, პორტისა და სეზონის მიხედვით.</p>
              </details>
              <details>
                <summary>შეიძლება ფინანსური დათმობები ბიდინგისას?</summary>
                <p>ვირჩევთ ბიდის სტრატეგიას ბიუჯეტისა და რისკების გათვალისწინებით, რათა მივიღოთ ოპტიმალური ფასი.</p>
              </details>
              <details>
                <summary>რა განსხვავებაა RORO-სა და კონტეინერს შორის?</summary>
                <p>RORO უფრო სწრაფი და იაფია მოსიარულე მანქანებისთვის; კონტეინერი უსაფრთხოა არამოსიარულე/ძვირადღირებული ლოტებისთვის.</p>
              </details>
              <details>
                <summary>შეიძლება წინასწარი ინსპექცია ადგილზე?</summary>
                <p>დიახ, შესაძლებელია მესამე მხარის ინსპექტირების ორგანიზება აუქციონის ტერიტორიაზე შეთანხმებით.</p>
              </details>
              <details>
                <summary>როგორ ხდება გადახდა?</summary>
                <p>გადახდა ეტაპობრივად: აუქციონის საფასური/საკომისიოები, შიდა ტრანსპორტი, საზღვაო გადაზიდვა და საბაჟო.</p>
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
        id="faq-schema-cars-from-usa"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: [
              {
                '@type': 'Question',
                name: 'როგორ შევამოწმოთ ავტომობილის ისტორია?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'VIN-და აუქციონის ჩანაწერებით ვამოწმებთ მდგომარეობას; ინსპექცია შესაძლებელია მოთხოვნით.',
                },
              },
              {
                '@type': 'Question',
                name: 'რამდენ ხანს სჭირდება გადაზიდვას?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'ჩვეულებრივ 4-8 კვირა, პორტისა და სეზონის მიხედვით.',
                },
              },
              {
                '@type': 'Question',
                name: 'შეიძლება ფინანსური დათმობები ბიდინგისას?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'ვირჩევთ ბიდის სტრატეგიას ბიუჯეტის და რისკების გათვალისწინებით, რათა მივაღწიოთ ოპტიმალურ ფასს.',
                },
              },
              {
                '@type': 'Question',
                name: 'რა განსხვავებაა RORO-სა და კონტეინერს შორის?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'RORO მიზანშეწონილია მოსიარულე მანქანებისთვის; კონტეინერი — დამატებითი დაცვა არამოსიარულე/ძვირადღირებული ლოტებისთვის.',
                },
              },
              {
                '@type': 'Question',
                name: 'შეიძლება წინასწარი ინსპექცია ადგილზე?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'დიახ, შესაძლებელია მესამე მხარის ინსპექტირების ორგანიზება აუქციონის ტერიტორიაზე შეთანხმებით.',
                },
              },
              {
                '@type': 'Question',
                name: 'როგორ ხდება გადახდა?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'გადახდა ხდება ეტაპობრივად — აუქციონის საფასური/საკომისიოები, შიდა ტრანსპორტი, საზღვაო გადაზიდვა, საბაჟო/რეგისტრაცია.',
                },
              },
            ],
          }),
        }}
      />
      <Script
        id="howto-cars-from-usa"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'HowTo',
            name: 'მანქანები ამერიკიდან — ნაბიჯ-ნაბიჯ',
            description: 'შერჩევა, ბიდინგი, შიდა ტრანსპორტი, საზღვაო გადაზიდვა და ჩაბარება.',
            totalTime: 'P5W',
            step: [
              { '@type': 'HowToStep', name: 'კონსულტაცია', text: 'ბიუჯეტის განსაზღვრა და მოთხოვნების ჩამოყალიბება.' },
              { '@type': 'HowToStep', name: 'შერჩევა', text: 'VIN-ისტორიის შემოწმება და ფოტოების ანალიზი.' },
              { '@type': 'HowToStep', name: 'ბიდინგი', text: 'მონაწილეობა აუქციონზე შეთანხმებულ ლიმიტში.' },
              { '@type': 'HowToStep', name: 'ტრანსპორტირება', text: 'ლოტის მიტანა პორტზე და RORO/კონტეინერი.' },
              { '@type': 'HowToStep', name: 'საბაჟო', text: 'განბაჟება და რეგისტრაცია საქართველოში.' },
              { '@type': 'HowToStep', name: 'ჩაბარება', text: 'ავტომობილის გადაცემა ყველა დოკუმენტთან ერთად.' },
            ],
          }),
        }}
      />
      <Script
        id="breadcrumb-cars-from-usa"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            itemListElement: [
              { '@type': 'ListItem', position: 1, name: 'მთავარი', item: 'https://swiftauto.ge/' },
              { '@type': 'ListItem', position: 2, name: 'მანქანები ამერიკიდან', item: 'https://swiftauto.ge/manqanebi-amerikidan' },
            ],
          }),
        }}
      />
    </>
  )
}
