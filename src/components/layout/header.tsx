"use client"

import Link from 'next/link'
import { Phone, Menu, ChevronDown, X } from 'lucide-react'
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
  const pathname = usePathname()
  const { data: session } = useSession()
  const [mobileOpen, setMobileOpen] = useState(false)

  const handleLogoClick = (e: React.MouseEvent) => {
    if (pathname === '/') {
      e.preventDefault()
      window.scrollTo({ top: 0, behavior: 'smooth' })
    } else {
      // If we're not on the homepage, let the Link component handle navigation
      return true
    }
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <nav className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex-1 flex justify-center md:justify-start">
          <Link 
            href="/" 
            className="relative w-[250px] h-[60px] cursor-pointer"
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

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8">
          <Link 
            href="/servisebi" 
            className="text-neutral-600 hover:text-neutral-900"
          >
            სერვისები
          </Link>

          <Link 
            href="/auqcionis-kalkulatori" 
            className="text-neutral-600 hover:text-neutral-900"
          >
            დარიცხვის კალკულატორი
          </Link>

          <Link 
            href="/gaxdi-dileri" 
            className="text-neutral-600 hover:text-neutral-900"
          >
            გახდი დილერი
          </Link>

          
          <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center gap-1 text-neutral-600 hover:text-neutral-900">
              ინფორმაცია
              <ChevronDown className="w-4 h-4" />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem asChild>
                <Link href="/amerikis-avto-auqcioni" className="w-full">
                  ამერიკის ავტო აუქციონი
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/manqanebi-amerikidan" className="w-full">
                  მანქანები ამერიკიდან
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/avto-importi" className="w-full">
                  ავტო იმპორტი
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/meoradi-manqanebi" className="w-full">
                  მეორადი მანქანები
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <Link 
            href="/contact" 
            className="text-neutral-600 hover:text-neutral-900"
          >
            კონტაქტი
          </Link>

          <Button asChild variant="default">
            <Link href={session?.user ? "/dealer" : "/dealer/login"}>
              დილერის გვერდი
            </Link>
          </Button>

          <Button asChild variant="default" size="sm">
            <Link href="tel:+995577908080" className="flex items-center gap-2">
              <Phone className="w-4 h-4" />
              +995 577 90 80 80
            </Link>
          </Button>
        </div>

        {/* Mobile Menu */}
        <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="md:hidden" aria-label="მობილური მენიუ">
              <Menu className="w-5 h-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[300px] sm:w-[400px]">
            <SheetHeader>
              <SheetTitle className="text-center text-lg font-bold">
                მენიუ
              </SheetTitle>
            </SheetHeader>
            <div className="mt-8 space-y-6">
              <div className="space-y-4">
                <Link 
                  href="/servisebi" 
                  className="block py-2 px-4 hover:bg-neutral-100 rounded-md"
                  onClick={() => setMobileOpen(false)}
                >
                  სერვისები
                </Link>

                <Link 
                  href="/auqcionis-kalkulatori" 
                  className="block py-2 px-4 hover:bg-neutral-100 rounded-md"
                  onClick={() => setMobileOpen(false)}
                >
                  დარიცხვის კალკულატორი
                </Link>

                <Link 
                  href="/gaxdi-dileri" 
                  className="block py-2 px-4 hover:bg-neutral-100 rounded-md"
                  onClick={() => setMobileOpen(false)}
                >
                  გახდი დილერი
                </Link>

                
                <DropdownMenu>
                  <DropdownMenuTrigger className="flex items-center gap-1 text-neutral-600 hover:text-neutral-900 w-full py-2 px-4 justify-between">
                    ინფორმაცია
                    <ChevronDown className="w-4 h-4" />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-[calc(100vw-3rem)] sm:w-[368px]">
                    <DropdownMenuItem asChild>
                      <Link href="/amerikis-avto-auqcioni" className="w-full" onClick={() => setMobileOpen(false)}>
                        ამერიკის ავტო აუქციონი
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/manqanebi-amerikidan" className="w-full" onClick={() => setMobileOpen(false)}>
                        მანქანები ამერიკიდან
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/avto-importi" className="w-full" onClick={() => setMobileOpen(false)}>
                        ავტო იმპორტი
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/meoradi-manqanebi" className="w-full" onClick={() => setMobileOpen(false)}>
                        მეორადი მანქანები
                      </Link>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>

                <Link 
                  href="/contact" 
                  className="block py-2 px-4 hover:bg-neutral-100 rounded-md"
                  onClick={() => setMobileOpen(false)}
                >
                  კონტაქტი
                </Link>

              </div>
              <div className="pt-4 border-t space-y-4">
                <Button asChild variant="default" size="lg" className="w-full">
                  <Link href={session?.user ? "/dealer" : "/dealer/login"} onClick={() => setMobileOpen(false)}>
                    დილერის გვერდი
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
