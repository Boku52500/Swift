import Image from 'next/image'

const partners = [
  { name: 'Arkas Line', logo: '/partners/arkas.png' },
  { name: 'COSCO', logo: '/partners/cosco.png' },
  { name: 'Hapag-Lloyd', logo: '/partners/hapag.webp' },
  { name: 'Maersk', logo: '/partners/maersk.png' },
  { name: 'MSC', logo: '/partners/msc.png' },
  { name: 'Ocean Network Express', logo: '/partners/one.png' },
  { name: 'Turkon Line', logo: '/partners/turkon.png' },
  { name: 'ZIM', logo: '/partners/zim.png' }
]

export function PartnersSection() {
  return (
    <section className="py-8 sm:py-12 md:py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold mb-2 sm:mb-4">
            ჩვენი პარტნიორები
          </h2>
          <p className="text-neutral-600">
            მსოფლიოს წამყვანი გადამზიდი კომპანიები
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 sm:gap-6 md:gap-8 items-center justify-items-center max-w-5xl mx-auto px-2 sm:px-4">
          {partners.map((partner) => (
            <div 
              key={partner.name}
              className="w-full h-16 sm:h-20 md:h-24 relative flex items-center justify-center group px-2 sm:px-4"
            >
              <div className="relative w-full h-full transition-transform duration-300 group-hover:scale-110">
                <Image
                  src={partner.logo}
                  alt={`${partner.name} Logo`}
                  fill
                  className="object-contain filter grayscale hover:grayscale-0 transition-all duration-300"
                  sizes="(max-width: 640px) 120px, (max-width: 768px) 160px, 200px"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
