import Link from 'next/link'

const faqItems = [
  {
    question: 'Сколько времени занимает ввоз авто из США в Грузию?',
    answer: <>Обычно 45–60 дней: оформление после покупки (4–7 дней), доставка до порта (4–7 дней), морской фрахт (30–40 дней). Подробнее: <Link href="/ru/aukciony-ssha" className="text-red-600 hover:text-red-700">аукционы США</Link>.</>,
  },
  {
    question: 'Какие затраты входят в итоговую стоимость?',
    answer: <>Итог включает цену лота, сборы <Link href="/ru/aukciony-ssha" className="text-red-600 hover:text-red-700">аукциона</Link>, внутреннюю/морскую перевозку и таможню (зависит от года/двигателя). Перед покупкой даём подробную смету.</>,
  },
  {
    question: 'Поможете с регистрацией в Грузии?',
    answer: 'Да, помогаем с документами, техосмотром и регистрацией в службе агентства.',
  },
  {
    question: 'С какими аукционами США вы работаете?',
    answer: <>Работаем со всеми ведущими площадками: Copart, IAAI, Manheim, Adesa. У нас доступ к тысячам лотов — <Link href="/ru/avto-iz-ssha" className="text-red-600 hover:text-red-700">авто из США</Link> под ваш бюджет.</>,
  },
  {
    question: 'Какие типы авто можно ввезти в Грузию?',
    answer: <>Почти все типы <Link href="/ru/avto-iz-ssha" className="text-red-600 hover:text-red-700">авто из США</Link> — кроссоверы, пикапы, мотоциклы — с учётом местных правил по возрасту/экостандартам. См. <Link href="/ru/podderzhannye-avto" className="text-red-600 hover:text-red-700">б/у авто</Link>.</>,
  },
]

export function FAQSectionRu() {
  return (
    <section id="faq" className="py-16">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-3xl font-bold mb-4">Частые вопросы</h2>
          <p className="text-neutral-600">Общие вопросы об <Link href="/ru/import-avto" className="text-red-600 hover:text-red-700">импорте авто</Link></p>
        </div>
        <div className="max-w-3xl mx-auto divide-y divide-neutral-100">
          {faqItems.map((item, i) => (
            <div key={i} className="py-6">
              <h3 className="text-lg font-semibold mb-2">{item.question}</h3>
              <p className="text-neutral-600">{item.answer}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
