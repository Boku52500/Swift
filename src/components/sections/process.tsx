import { Search, Gavel, Ship, FileCheck, Car } from 'lucide-react'
import { translations } from '@/lib/i18n'

const steps = [
  {
    icon: Search,
    title: translations.process.steps.choose.title,
    description: translations.process.steps.choose.description,
  },
  {
    icon: Gavel,
    title: translations.process.steps.bid.title,
    description: translations.process.steps.bid.description,
  },
  {
    icon: Ship,
    title: translations.process.steps.ship.title,
    description: translations.process.steps.ship.description,
  },
  {
    icon: FileCheck,
    title: translations.process.steps.customs.title,
    description: translations.process.steps.customs.description,
  },
  {
    icon: Car,
    title: translations.process.steps.delivery.title,
    description: translations.process.steps.delivery.description,
  },
]

export function ProcessSection() {
  return (
    <section id="process" className="py-16 bg-neutral-50">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-3xl font-bold mb-4">
            {translations.process.title}
          </h2>
          <p className="text-neutral-600">
            {translations.process.subtitle}
          </p>
        </div>

        <div className="relative">
          {/* Process Steps */}
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-8">
            {steps.map((step, index) => (
              <div
                key={index}
                className="flex flex-col items-center text-center space-y-4"
              >
                <div className="relative">
                  <div className="w-16 h-16 bg-white rounded-full shadow-sm flex items-center justify-center border border-neutral-100">
                    <step.icon className="w-8 h-8 text-red-600" />
                  </div>
                  <div className="absolute top-1/2 left-full w-full h-0.5 bg-red-200 -translate-y-1/2 hidden lg:block">
                    {index < steps.length - 1 && (
                      <div className="absolute right-0 w-2 h-2 bg-red-600 rounded-full -translate-y-1/2" />
                    )}
                  </div>
                </div>

                <h3 className="font-semibold">
                  {step.title}
                </h3>
                
                <p className="text-sm text-neutral-600">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
