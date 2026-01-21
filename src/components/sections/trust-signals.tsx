import { Clock, Shield, Trophy, Users } from 'lucide-react'

const trustSignals = [
  {
    icon: Trophy,
    title: '5+ წლიანი გამოცდილება',
    description: '1000+ წარმატებით ჩამოყვანილი მანქანა ამერიკიდან საქართველოში',
  },
  {
    icon: Shield,
    title: 'სრული გამჭვირვალობა',
    description: 'თვალი ადევნეთ თქვენს ავტომობილს აუქციონიდან საბოლოო მიწოდებამდე რეალურ დროში',
  },
  {
    icon: Clock,
    title: 'სწრაფი მიწოდება',
    description: 'ამერიკიდან საშუალო მიწოდების ვადა: 45–60 დღე',
  },
  {
    icon: Users,
    title: 'მომხმარებელთა მხარდაჭერა',
    description: '24/7 დახმარება ნებისმიერ საკითხში',
  },
]

export function TrustSignalsSection() {
  return (
    <section className="py-16 bg-neutral-50">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {trustSignals.map((signal, index) => (
            <div
              key={index}
              className="flex flex-col items-center text-center space-y-4 p-6 bg-white rounded-lg shadow-sm"
            >
              <div className="p-3 bg-red-50 rounded-full">
                <signal.icon className="w-6 h-6 text-red-600" />
              </div>
              <h3 className="text-lg font-semibold text-neutral-900">
                {signal.title}
              </h3>
              <p className="text-neutral-600">
                {signal.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
