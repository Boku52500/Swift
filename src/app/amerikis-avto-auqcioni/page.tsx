"use client"

import { AuctionHeroSection } from '@/components/sections/amerikis-avto-auqcioni-hero'
import { AuctionFeaturesSection } from '@/components/sections/amerikis-avto-auqcioni-teqsti'
import { ContactSection } from '@/components/sections/contact'
import { SocialMediaSection } from '@/components/sections/social-media'
import { AutoDealerSchema } from '@/components/seo/auto-dealer-schema'
import Script from 'next/script'

export default function AmericanAutoAuction() {
  const schema = AutoDealerSchema()

  return (
    <>
      <main>
        <AuctionHeroSection />
        <AuctionFeaturesSection />
        <section className="py-12 bg-white">
          <div className="container mx-auto px-4">
            <div className="prose prose-neutral max-w-4xl mx-auto">
              <h2>ამერიკის ავტო აუქციონი — როგორ მუშაობს</h2>
              <p>
                Swift Auto Import გეხმარებათ ამერიკის ავტო აუქციონებზე — Copart და IAAI —
                საუკეთესო ფასად შეიძინოთ სასურველი ავტომობილი და უსაფრთხოდ ჩამოიყვანოთ საქართველოში.
                ჩვენ ვმუშაობთ სრულ ციკლზე: ავტომობილის შერჩევა და წინა-შემოწმება, ბიდინგი,
                გადაზიდვა, განბაჟება და ჩაბარება.
              </p>
              <h3>რატომ აუქციონი?</h3>
              <ul>
                <li>დიდი არჩევანი და გამჭვირვალე ისტორია</li>
                <li>საუკეთესო ფასები კონკურენტულ ბიდინგში</li>
                <li>სრულად დოკუმენტირებული პროცესები</li>
              </ul>
              <h3>გეგმა ნაბიჯ-ნაბიჯ</h3>
              <ol>
                <li>კონსულტაცია და ბიუჯეტის განსაზღვრა</li>
                <li>ავტომობილის შერჩევა და დეტალური შეფასება</li>
                <li>ბიდინგი აუქციონზე და შეძენა</li>
                <li>შიდა ტრანსპორტირება პორტამდე და საზღვაო გადაზიდვა</li>
                <li>განბაჟება საქართველოში და ავტომობილის ჩაბარება</li>
              </ol>
              <p>
                გინდათ გაიგოთ სრული იმპორტის პროცესი? ეწვიეთ გვერდს
                {' '}<a href="/avto-importi">ავტო იმპორტი</a>.
              </p>
            </div>
          </div>
        </section>
        <section className="py-12 bg-neutral-50">
          <div className="container mx-auto px-4">
            <div className="prose prose-neutral max-w-4xl mx-auto">
              <h2>ღირებულების სტრუქტურა და აუქციონის ტიპები</h2>
              <ul>
                <li>Hammer Price — აუქციონზე მოგების ფასი, რომელსაც ემატება საკომისიო.</li>
                <li>Buyer’s Premium/Internet Bid — პლატფორმის სტანდარტული საფასურები.</li>
                <li>Gate/Storage — პორტირების/შენახვის შესაძლო გადასახადები ლოკაციის მიხედვით.</li>
                <li>შიდა ტრანსპორტი — აუქციონის ეზოდან პორტამდე.</li>
                <li>საზღვაო გადაზიდვა — RORO ან კონტეინერი (ბიუჯეტი/ვადები/დაცულობა).</li>
                <li>საბაჟო და რეგისტრაცია — ადგილობრივი წესების შესაბამისად.</li>
              </ul>
              <h3>Copart vs IAAI — რა განსხვავებაა</h3>
              <p>
                ორივე პლატფორმა სანდოა და გვაძლევს VIN-ჩანაწერებს. განსხვავდება კატეგორიები (Run & Drive/Salvage),
                კრიტერიუმები და ბიდინგის რეჟიმები (Pre-bid/Live Auction/Buy It Now). ვირჩევთ ოპტიმალურს მიზნის მიხედვით.
              </p>
              <h3>დოკუმენტები და შესაბამისობა</h3>
              <ul>
                <li>Title ტიპები — Clean/Salvage/Rebuilt: არ აქვს გავლენა რეგისტრაციაზე და ღირებულებაზე.</li>
                <li>Bill of Sale, Export Release — საჭიროებს ექსპორტისა და მფლობელობის დადასტურებას.</li>
              </ul>
              <h3>ბიდინგის სტრატეგია</h3>
              <ul>
                <li>ბიდის ლიმიტი — მაქსიმუმის განსაზღვრა საკომისიოს ჩათვლით.</li>
                <li>Pre-bid vs Live — აქტივობის/კონკურენციის შეფასება.</li>
                <li>Buy It Now — სწრაფი შესყიდვა ბაზრის შეფასებით.</li>
              </ul>
              <h3>ვადები (საშუალო)</h3>
              <ol>
                <li>შერჩევა/ბიდინგი — 3-10 დღე</li>
                <li>შიდა ტრანსპორტი — 2-7 დღე</li>
                <li>საზღვაო გადაზიდვა — 4-8 კვირა</li>
                <li>განბაჟება/რეგისტრაცია — 2-5 დღე</li>
              </ol>
              <h3>გლოსარიუმი</h3>
              <ul>
                <li>Run & Drive — მანქანა იქოქება და დადის.</li>
                <li>Enhanced Vehicles — დაცული/გაუმჯობესებული პირობებით გასაყიდი ლოტები.</li>
                <li>On-Approval — გაყიდვის დადასტურება სელერის მხრიდან აუცილებელია.</li>
              </ul>
            </div>
          </div>
        </section>
        <section className="py-12 bg-neutral-50">
          <div className="container mx-auto px-4">
            <div className="prose prose-neutral max-w-4xl mx-auto">
              <h2>ხშირად დასმული კითხვები</h2>
              <details>
                <summary>რამდენ ხანს გრძელდება პროცესი?</summary>
                <p>საშუალოდ 4-8 კვირა ლოკაციისა და გადაზიდვის გრაფიკის მიხედვით.</p>
              </details>
              <details>
                <summary>შეიძლება დაზიანებული ავტომობილის შეძენა?</summary>
                <p>დიახ, შესაძლებელია როგორც დაუზიანებელი, ისე დაზიანებული ავტომობილების შეძენა — ვიძლევით შეფასებას და რისკების განმარტებას.</p>
              </details>
              <details>
                <summary>როგორ განისაზღვრება საბოლოო ბიუჯეტი?</summary>
                <p>საბოლოო ბიუჯეტია: აუქციონის ფასი, საკომისიოები, შიდა ტრანსპორტი, საზღვაო გადაზიდვა და განბაჟება. იხილეთ
                  {' '}<a href="/auqcionis-kalkulatori">კალკულატორი</a> საკომისიოზე.
                </p>
              </details>
              <details>
                <summary>რა განსხვავებაა Copart-სა და IAAI-ს შორის?</summary>
                <p>ორივე პლატფორმა სანდოა; განსხვავდება კატეგორიები, წესები და ბიდინგის რეჟიმები. ვირჩევთ მიზნისა და ბიუჯეტის მიხედვით.</p>
              </details>
              <details>
                <summary>Pre-bid, Live და Buy It Now — რომელი სჯობს?</summary>
                <p>Pre-bid გვიჩვენებს ინტერესს, Live არის კონკურენტული, Buy It Now — სწრაფი გარიგებისთვის, თუ ფასი ობექტურია.</p>
              </details>
              <details>
                <summary>რა დოკუმენტებს მივიღებ ყიდვის შემდეგ?</summary>
                <p>Title/Bill of Sale, Export Release და სატრანსპორტო დოკუმენტები — ყველა ეტაპი დოკუმენტირდება.</p>
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
        id="faq-schema-american-auctions"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: [
              {
                '@type': 'Question',
                name: 'რამდენ ხანს გრძელდება პროცესი?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'საშუალოდ 4-8 კვირა ლოკაციისა და გადაზიდვის გრაფიკის მიხედვით.',
                },
              },
              {
                '@type': 'Question',
                name: 'შეიძლება დაზიანებული ავტომობილის შეძენა?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'დიახ. გთავაზობთ მდგომარეობის შეფასებას და რისკების განმარტებას როგორც რან-და-დრაივ, ისე დაზიანებულ მოდელებზე.',
                },
              },
              {
                '@type': 'Question',
                name: 'როგორ განისაზღვრება საბოლოო ბიუჯეტი?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'საბოლოო თანხა შედგება შემდეგი ფასების ჯამით: აუქციონის ფასი + საკომისიო + საზღვაო გადაზიდვა + განბაჟება.',
                },
              },
              {
                '@type': 'Question',
                name: 'რა განსხვავებაა Copart-სა და IAAI-ს შორის?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'ორივე სანდო პლატფორმაა; განსხვავდება კატეგორიები, წესები და ბიდინგის რეჟიმები (Pre-bid/Live/Buy It Now).',
                },
              },
              {
                '@type': 'Question',
                name: 'Pre-bid, Live და Buy It Now — რომელი ჯობს?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Pre-bid ასახავს ინტერესს, Live არის კონკურენტული პროცესის კულმინაცია, Buy It Now — სწრაფი გარიგება ობექტურ ფასად.',
                },
              },
              {
                '@type': 'Question',
                name: 'რა დოკუმენტები მივიღებ ყიდვის შემდეგ?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Title/Bill of Sale/Export Release და სატრანსპორტო დოკუმენტები — ეტაპობრივად გადმოგეცემათ.'
                },
              },
            ],
          }),
        }}
      />
      <Script
        id="howto-auction-process"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'HowTo',
            name: 'შეძენა ამერიკის ავტო აუქციონზე — ნაბიჯ-ნაბიჯ',
            description: 'ანგარიშის მზადება, შერჩევა, ბიდინგი, გადაზიდვა და განბაჟება.',
            totalTime: 'P4W',
            step: [
              { '@type': 'HowToStep', name: 'კონსულტაცია/ბიუჯეტი', text: 'განსაზღვრეთ თანხა, ჩათვალეთ საკომისიოები.' },
              { '@type': 'HowToStep', name: 'შერჩევა/შემოწმება', text: 'VIN-ისტორია, ფოტოები, აუქციონის ჩანაწერები.' },
              { '@type': 'HowToStep', name: 'ბიდინგი', text: 'Pre-bid/Live ბიდი შეთანხმებულ ლიმიტში.' },
              { '@type': 'HowToStep', name: 'ინვოისი/გადახდა', text: 'ინვოისის დაფარვა მითითებულ ვადაში.' },
              { '@type': 'HowToStep', name: 'ტრანსპორტირება', text: 'ლოტის მიტანა პორტზე და საზღვაო გადაზიდვა.' },
              { '@type': 'HowToStep', name: 'საბაჟო/ჩაბარება', text: 'განბაჟება საქართველოში და ჩაბარება.' },
            ],
          }),
        }}
      />
      <Script
        id="breadcrumb-auction"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            itemListElement: [
              { '@type': 'ListItem', position: 1, name: 'მთავარი', item: 'https://swiftauto.ge/' },
              { '@type': 'ListItem', position: 2, name: 'ამერიკის ავტო აუქციონი', item: 'https://swiftauto.ge/amerikis-avto-auqcioni' },
            ],
          }),
        }}
      />
    </>
  )
}
