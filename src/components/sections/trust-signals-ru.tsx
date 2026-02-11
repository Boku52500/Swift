import { Clock, Shield, Trophy, Users } from 'lucide-react'

const trustSignals = [
  { icon: Trophy, title: '5+ лет опыта', description: '1000+ авто успешно ввезено из США в Грузию' },
  { icon: Shield, title: 'Полная прозрачность', description: 'Отслеживайте авто от аукциона до выдачи' },
  { icon: Clock, title: 'Быстрая доставка', description: 'Типичный срок из США: 45–60 дней' },
  { icon: Users, title: 'Поддержка', description: 'Помощь 24/7 по всем вопросам' },
]

export function TrustSignalsSectionRu() {
  return (
    <section className="pt-16 pb-8 bg-neutral-50">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {trustSignals.map((signal, index) => (
            <div key={index} className="flex flex-col items-center text-center space-y-4 p-6 bg-white rounded-lg shadow-sm">
              <div className="p-3 bg-red-50 rounded-full">
                <signal.icon className="w-6 h-6 text-red-600" />
              </div>
              <h3 className="text-lg font-semibold text-neutral-900">{signal.title}</h3>
              <p className="text-neutral-600">{signal.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
