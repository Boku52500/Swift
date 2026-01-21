import { Shield, Search, DollarSign, Clock } from 'lucide-react'
import Link from 'next/link'

export function AuctionFeaturesSection() {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">
          რატომ უნდა აირჩიოთ ჩვენი აუქციონის სერვისი
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="text-center space-y-4">
            <div className="w-16 h-16 mx-auto bg-red-100 rounded-full flex items-center justify-center">
              <Search className="w-8 h-8 text-red-600" />
            </div>
            <h3 className="text-xl font-semibold">წვდომა ყველა აუქციონზე</h3>
            <p className="text-neutral-600">
              წვდომა <Link href="/amerikis-avto-auqcioni" className="text-red-600 hover:text-red-700">ამერიკის ავტო აუქციონებზე</Link>, მათ შორის Copart და IAAI პლატფორმებზე
            </p>
          </div>
          
          <div className="text-center space-y-4">
            <div className="w-16 h-16 mx-auto bg-red-100 rounded-full flex items-center justify-center">
              <DollarSign className="w-8 h-8 text-red-600" />
            </div>
            <h3 className="text-xl font-semibold">საუკეთესო ფასები</h3>
            <p className="text-neutral-600">
              <Link href="/meoradi-manqanebi" className="text-red-600 hover:text-red-700">მეორადი მანქანების</Link> შეძენა საუკეთესო ფასად პროფესიონალური ბიდინგის მეშვეობით
            </p>
          </div>
          
          <div className="text-center space-y-4">
            <div className="w-16 h-16 mx-auto bg-red-100 rounded-full flex items-center justify-center">
              <Shield className="w-8 h-8 text-red-600" />
            </div>
            <h3 className="text-xl font-semibold">უსაფრთხო გარიგება</h3>
            <p className="text-neutral-600">
              <Link href="/avto-importi" className="text-red-600 hover:text-red-700">ავტო იმპორტის</Link> სრული გამჭვირვალობა და დაზღვეული ტრანზაქციები
            </p>
          </div>
          
          <div className="text-center space-y-4">
            <div className="w-16 h-16 mx-auto bg-red-100 rounded-full flex items-center justify-center">
              <Clock className="w-8 h-8 text-red-600" />
            </div>
            <h3 className="text-xl font-semibold">სწრაფი მომსახურება</h3>
            <p className="text-neutral-600">
              <Link href="/manqanebi-amerikidan" className="text-red-600 hover:text-red-700">მანქანების ჩამოყვანა ამერიკიდან</Link> 24/7 მხარდაჭერით
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
