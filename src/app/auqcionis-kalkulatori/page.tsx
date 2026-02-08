"use client"

import { AuctionCalculator } from '@/components/calculator/auction-calculator'
import Script from 'next/script'

export default function CalculatorPage() {
  return (
    <main>
      <section className="pt-32 pb-16 bg-neutral-50">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-bold text-center mb-12">
            აუქციონის დანამატის კალკულატორი
          </h1>
          <div className="max-w-3xl mx-auto">
            <AuctionCalculator />
          </div>
        </div>
      </section>

      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="prose prose-neutral max-w-3xl mx-auto">
            <h2>როგორ მუშაობს კალკულატორი</h2>
            <p>
              კალკულატორი გეხმარებათ წინასწარ გამოთვალოთ Copart და IAAI აუქციონების საკომისიოები
              ავტომობილის სავარაუდო საბოლოო ფასის მისაღებად. სისტემა ითვალისწინებს მყიდველის
              საკომისიოს (Buyer’s Premium), დოკუმენტაციის საფასურს და სხვა
              სტანდარტულ ფიქსირებულ ხარჯებს, რის შედეგადაც მიიღებთ უფრო რეალისტურ ბიუჯეტს.
            </p>
            <h3>რა შედის და რა შეიძლება განსხვავდებოდეს</h3>
            <ul>
              <li>ადგილობრივი გადასახადები და <em>storage/gate</em> გადასახადები შესაძლოა ლოკაციაზე იყოს დამოკიდებული.</li>
              <li>ტრანსპორტირება, საზღვაო გადაზიდვა და განბაჟება ცალკე ითვლება.</li>
            </ul>
            <h3>გამოთვლის მაგალითი</h3>
            <p>
              თუ ავტომობილის საბოლოო ფასი არის 8,500$, კალკულატორი ავტომატურად გამოიყენებს შესაბამის
              საკომისიო ცხრილს და დაგითვლით სავარაუდო ჯამურ თანხას. ეს დაგეხმარებათ თქვენი საბოლოო
              ბიუჯეტის განსაზღვრაში.
            </p>
          </div>
        </div>
      </section>

      <section className="py-12 bg-neutral-50">
        <div className="container mx-auto px-4">
          <div className="prose prose-neutral max-w-3xl mx-auto">
            <h2>ხშირად დასმული კითხვები</h2>
            <details>
              <summary>რამდენად ზუსტია კალკულატორის შედეგები?</summary>
              <p>
                ჩვენ ვიყენებთ Copart/IAAI-ის სტანდარტულ საკომისიო გრიდს. საბოლოო თანხა შეიძლება
                ოდნავ განსხვავდებოდეს ლოკაციისა და დამატებითი ადგილობრივი გადასახადების მიხედვით.
              </p>
            </details>
            <details>
              <summary>კალკულატორი ითვალისწინებს ტრანსპორტირებას და განბაჟებას?</summary>
              <p>
                არა. ეს ხარჯები გამოითვლება ინდივიდუალურად ავტომობილის მდებარეობის, ზომისა და
                გეზის მიხედვით. დაგვიკავშირდით ზუსტი ფასის მისაღებად.
              </p>
            </details>
            <details>
              <summary>რომელი ლოკაცია ავირჩიო?</summary>
              <p>
                როგორც წესი, პორტთან ახლოს მდებარე აუქციონები ამცირებს გრუნტის ტრანსპორტის ხარჯს.
                ჩვენი გუნდი შეგირჩევთ ოპტიმალურ ვარიანტს დროისა და ბიუჯეტის გათვალისწინებით.
              </p>
            </details>
          </div>
        </div>
      </section>

      <Script
        id="faq-schema-auction-calculator"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: [
              {
                '@type': 'Question',
                name: 'რამდენად ზუსტია კალკულატორის შედეგები?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text:
                    'ვიყენებთ Copart/IAAI-ის ოფიციალურ საკომისიო ცხრილებს. მცირე სხვაობა შეიძლება იყოს ლოკაციის დამატებითი გადასახადების მიხედვით.',
                },
              },
              {
                '@type': 'Question',
                name: 'მოიცავს თუ არა კალკულატორი ტრანსპორტირებას და განბაჟებას?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text:
                    'კალკულატორი ფარავს მხოლოდ აუქციონის საკომისიოებს. ტრანსპორტირება/საზღვაო გადაზიდვა/განბაჟება ითვლება ინდივიდუალურად.',
                },
              },
              {
                '@type': 'Question',
                name: 'რომელი ლოკაცია ავირჩიო?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text:
                    'პორტთან ახლოს მდებარე ლოკაციები ამცირებს გრუნტის ტრანსპორტს. ჩვენი გუნდი დაგეხმარებათ საუკეთესო ვარიანტის შერჩევაში.',
                },
              },
            ],
          }),
        }}
      />
    </main>
  )
}
