"use client"

import Link from 'next/link'
import { Phone, Menu, ChevronDown } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { useSession } from 'next-auth/react'
import { useState } from 'react'
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from '@/components/ui/dropdown-menu'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'

export function Header() {
  const pathname = usePathname() || '/'
  const { data: session } = useSession()
  const [mobileOpen, setMobileOpen] = useState(false)
  const isEn = pathname.startsWith('/en')
  const isRu = pathname.startsWith('/ru')

  const t = {
    services: isEn ? 'Services' : isRu ? 'Услуги' : 'სერვისები',
    calculator: isEn ? 'Calculator' : isRu ? 'Калькулятор' : 'კალკულატორი',
    becomeDealer: isEn ? 'Become a Dealer' : isRu ? 'Стать дилером' : 'გახდი დილერი',
    info: isEn ? 'Information' : isRu ? 'Информация' : 'ინფორმაცია',
    auctions: isEn ? 'US Auto Auctions' : isRu ? 'Аукционы США' : 'ამერიკის ავტო აუქციონი',
    carsFromUsa: isEn ? 'Cars from USA' : isRu ? 'Авто из США' : 'მანქანები ამერიკიდან',
    import: isEn ? 'Car Import' : isRu ? 'Импорт авто' : 'ავტო იმპორტი',
    usedCars: isEn ? 'Used Cars' : isRu ? 'Б/у автомобили' : 'მეორადი მანქანები',
    blog: isEn ? 'Blog' : isRu ? 'Блог' : 'ბლოგი',
    contact: isEn ? 'Contact' : isRu ? 'Контакты' : 'კონტაქტი',
    dealerPage: isEn ? 'Dealer Portal' : isRu ? 'Портал дилера' : 'დილერის გვერდი',
    menu: isEn ? 'Menu' : isRu ? 'Меню' : 'მენიუ',
  }

  // Lazy import to avoid SSR mismatch; keep inside component
  const { getAlternatePath } = require('@/lib/locale')

  const navHref = (kaPath: string) => {
    if (isEn) return getAlternatePath(`/${kaPath}`, 'en')
    if (isRu) return getAlternatePath(`/${kaPath}`, 'ru')
    return `/${kaPath}`
  }

  

  const handleLogoClick = (e: React.MouseEvent) => {
    const home = isEn ? '/en' : isRu ? '/ru' : '/'
    if (pathname === home) {
      e.preventDefault()
      window.scrollTo({ top: 0, behavior: 'smooth' })
    } else {
      return true
    }
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <nav className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex-1 xl:flex-none flex justify-center xl:justify-start">
          <Link 
            href={isEn ? '/en' : isRu ? '/ru' : '/'} 
            className="relative w-[160px] md:w-[190px] lg:w-[230px] h-[60px] cursor-pointer"
            onClick={handleLogoClick}
            prefetch={true}
          >
            <Image
              src="/images/menulogo.png"
              alt="Swift Auto Import Logo"
              fill
              className="object-contain"
              priority
            />
          </Link>
        </div>

        {/* Desktop Navigation (only from xl) */}
        <div className="hidden xl:flex items-center xl:space-x-8 lg:space-x-6 md:space-x-2">
          <Link 
            href={navHref('servisebi')} 
            className="hidden lg:inline text-neutral-600 hover:text-neutral-900 whitespace-nowrap lg:text-sm xl:text-base"
          >
            {t.services}
          </Link>

          <Link 
            href={navHref('auqcionis-kalkulatori')} 
            className="hidden lg:inline text-neutral-600 hover:text-neutral-900 whitespace-nowrap lg:text-sm xl:text-base"
          >
            {t.calculator}
          </Link>

          <Link 
            href={navHref('gaxdi-dileri')} 
            className="hidden lg:inline text-neutral-600 hover:text-neutral-900 whitespace-nowrap lg:text-sm xl:text-base"
          >
            {t.becomeDealer}
          </Link>

          
          <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center gap-1 text-neutral-600 hover:text-neutral-900 whitespace-nowrap md:text-xs lg:text-sm xl:text-base">
              {t.info}
              <ChevronDown className="w-3 h-3 lg:w-4 lg:h-4" />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem asChild>
                <Link href={navHref('amerikis-avto-auqcioni')} className="w-full">
                  {t.auctions}
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href={navHref('manqanebi-amerikidan')} className="w-full">
                  {t.carsFromUsa}
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href={navHref('avto-importi')} className="w-full">
                  {t.import}
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href={navHref('meoradi-manqanebi')} className="w-full">
                  {t.usedCars}
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href={navHref('blog')} className="w-full">
                  {t.blog}
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <Link 
            href={navHref('contact')} 
            className="hidden lg:inline text-neutral-600 hover:text-neutral-900 whitespace-nowrap lg:text-sm xl:text-base"
          >
            {t.contact}
          </Link>

          <div className="hidden lg:flex items-center gap-1.5 shrink-0">
            <Link
              href={getAlternatePath(pathname, 'ka')}
              aria-label="ქართული"
              title="ქართული"
              className={`text-xl ${(!isEn && !isRu) ? '' : 'opacity-60 hover:opacity-100'}`}
            >
              <Image src="/images/georgia.png" alt="ქართული" width={20} height={14} className="rounded-sm object-cover" />
            </Link>
            <Link
              href={getAlternatePath(pathname, 'en')}
              aria-label="English"
              title="English"
              className={`text-xl ${isEn ? '' : 'opacity-60 hover:opacity-100'}`}
            >
              <Image src="/images/usa.png" alt="English" width={20} height={14} className="rounded-sm object-cover" />
            </Link>
            <Link
              href={getAlternatePath(pathname, 'ru')}
              aria-label="Русский"
              title="Русский"
              className={`text-xl ${isRu ? '' : 'opacity-60 hover:opacity-100'}`}
            >
              <Image src="/images/russia.png" alt="Русский" width={20} height={14} className="rounded-sm object-cover" />
            </Link>
          </div>

          <Button asChild variant="default" className="hidden lg:inline-flex">
            <Link href={session?.user ? "/dealer" : "/dealer/login"} className="whitespace-nowrap">
              {t.dealerPage}
            </Link>
          </Button>

          

          <Button asChild variant="default" size="sm" className="hidden lg:inline-flex">
            <Link href="tel:+995577908080" className="flex items-center gap-2 whitespace-nowrap">
              <Phone className="w-4 h-4" />
              <span className="hidden lg:inline">+995 577 90 80 80</span>
            </Link>
          </Button>
        </div>

        

        {/* Mobile Menu */}
        <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="xl:hidden" aria-label={t.menu}>
              <Menu className="w-5 h-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[300px] sm:w-[400px]">
            <SheetHeader>
              <SheetTitle className="text-center text-lg font-bold">
                {t.menu}
              </SheetTitle>
            </SheetHeader>
            <div className="mt-8 space-y-6">
              <div className="space-y-4">
                <Link 
                  href={navHref('servisebi')} 
                  className="block py-2 px-4 hover:bg-neutral-100 rounded-md"
                  onClick={() => setMobileOpen(false)}
                >
                  {t.services}
                </Link>

                <Link 
                  href={navHref('auqcionis-kalkulatori')} 
                  className="block py-2 px-4 hover:bg-neutral-100 rounded-md"
                  onClick={() => setMobileOpen(false)}
                >
                  {t.calculator}
                </Link>

                <Link 
                  href={navHref('gaxdi-dileri')} 
                  className="block py-2 px-4 hover:bg-neutral-100 rounded-md"
                  onClick={() => setMobileOpen(false)}
                >
                  {t.becomeDealer}
                </Link>

                
                <DropdownMenu>
                  <DropdownMenuTrigger className="flex items-center gap-1 text-neutral-600 hover:text-neutral-900 w-full py-2 px-4 justify-between">
                    {t.info}
                    <ChevronDown className="w-4 h-4" />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-[calc(100vw-3rem)] sm:w-[368px]">
                    <DropdownMenuItem asChild>
                      <Link href={navHref('amerikis-avto-auqcioni')} className="w-full" onClick={() => setMobileOpen(false)}>
                        {t.auctions}
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href={navHref('manqanebi-amerikidan')} className="w-full" onClick={() => setMobileOpen(false)}>
                        {t.carsFromUsa}
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href={navHref('avto-importi')} className="w-full" onClick={() => setMobileOpen(false)}>
                        {t.import}
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href={navHref('meoradi-manqanebi')} className="w-full" onClick={() => setMobileOpen(false)}>
                        {t.usedCars}
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href={navHref('blog')} className="w-full" onClick={() => setMobileOpen(false)}>
                        {t.blog}
                      </Link>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>

                <Link 
                  href={navHref('contact')} 
                  className="block py-2 px-4 hover:bg-neutral-100 rounded-md"
                  onClick={() => setMobileOpen(false)}
                >
                  {t.contact}
                </Link>

              </div>
              <div className="flex items-center gap-1.5 justify-center">
                <Link
                  href={getAlternatePath(pathname, 'ka')}
                  aria-label="ქართული"
                  title="ქართული"
                  onClick={() => setMobileOpen(false)}
                  className={`text-xl ${(!isEn && !isRu) ? '' : 'opacity-60 hover:opacity-100'}`}
                >
                  <Image src="/images/georgia.png" alt="ქართული" width={20} height={14} className="rounded-sm object-cover" />
                </Link>
                <Link
                  href={getAlternatePath(pathname, 'en')}
                  aria-label="English"
                  title="English"
                  onClick={() => setMobileOpen(false)}
                  className={`text-xl ${isEn ? '' : 'opacity-60 hover:opacity-100'}`}
                >
                  <Image src="/images/usa.png" alt="English" width={20} height={14} className="rounded-sm object-cover" />
                </Link>
                <Link
                  href={getAlternatePath(pathname, 'ru')}
                  aria-label="Русский"
                  title="Русский"
                  onClick={() => setMobileOpen(false)}
                  className={`text-xl ${isRu ? '' : 'opacity-60 hover:opacity-100'}`}
                >
                  <Image src="/images/russia.png" alt="Русский" width={20} height={14} className="rounded-sm object-cover" />
                </Link>
              </div>
              <div className="pt-4 border-t space-y-4">
                <Button asChild variant="default" size="lg" className="w-full">
                  <Link href={session?.user ? "/dealer" : "/dealer/login"} onClick={() => setMobileOpen(false)}>
                    {t.dealerPage}
                  </Link>
                </Button>
                <Button asChild variant="default" size="lg" className="w-full">
                  <Link href="tel:+995577908080" className="flex items-center justify-center gap-2" onClick={() => setMobileOpen(false)}>
                    <Phone className="w-4 h-4" />
                    +995 577 90 80 80
                  </Link>
                </Button>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </nav>
    </header>
  )
}
