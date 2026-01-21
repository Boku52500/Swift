"use client"

import { Button } from "@/components/ui/button"
import { signOut, useSession } from "next-auth/react"
import { adminNav } from "@/config/admin-nav"
import Link from "next/link"
import { usePathname } from "next/navigation"

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { data: session } = useSession()
  const pathname = usePathname()
  
  // If not authenticated, show a blank layout
  if (!session?.user) {
    return <>{children}</>
  }

  return (
    <div className="flex h-screen bg-white">
      {/* Sidebar */}
      <div className="w-64 bg-white border-r border-neutral-200/80 shadow-sm">
        <div className="h-16 flex items-center px-6 border-b border-neutral-200/80 bg-gradient-to-r from-red-700 to-red-800">
          <span className="text-xl font-bold text-white">Admin Panel</span>
        </div>
        <nav className="flex-1 overflow-y-auto p-4 space-y-2">
          {adminNav.map((item) => {
            const isActive = pathname === item.href
            const Icon = item.icon
            
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-colors ${isActive 
                  ? "bg-red-600 text-white font-medium" 
                  : "text-neutral-600 hover:text-red-600 hover:bg-red-50"}`}
              >
                <Icon className="h-4 w-4" />
                <span>{item.title}</span>
              </Link>
            )
          })}
        </nav>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col">
        <header className="h-16 bg-white border-b border-neutral-200/80 flex items-center justify-end px-6 shadow-sm">
          <Button 
            variant="ghost" 
            onClick={() => signOut({ callbackUrl: "/" })}
            className="text-neutral-600 hover:text-red-600 hover:bg-red-50"
          >
            Sign Out
          </Button>
        </header>

        <main className="admin-scope flex-1 p-6 overflow-auto bg-white text-neutral-900">
          {children}
        </main>
      </div>
    </div>
  )
}
