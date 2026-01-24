"use client"

import { Button } from "@/components/ui/button"
import { signOut, useSession } from "next-auth/react"
import { dealerNav } from "@/config/dealer-nav"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useEffect, useState, useRef } from "react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
//
import { AuctionCalculator } from "@/components/calculator/auction-calculator"

import { Menu, X, Ship, Calculator, LogOut, FileText, CheckCircle } from "lucide-react"
export default function DealerLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { data: session } = useSession()
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const [calcOpen, setCalcOpen] = useState(false)
  const [mobileNavOpen, setMobileNavOpen] = useState(false)
  const [prices, setPrices] = useState<{ location: string; port: string; price: string }[]>([])
  const [selected, setSelected] = useState<string>("")
  const [query, setQuery] = useState("")
  const [showList, setShowList] = useState(false)
  const comboRef = useRef<HTMLDivElement | null>(null)
  const docsComboRef = useRef<HTMLDivElement | null>(null)
  const [docQuery, setDocQuery] = useState("")
  const [showDocList, setShowDocList] = useState(false)
  const [docsOpen, setDocsOpen] = useState(false)
  const [loadingDocs, setLoadingDocs] = useState(false)
  const [docItems, setDocItems] = useState<Array<{ id: string; title: string; express: string; regular: string }>>([])
  const [selectedDocId, setSelectedDocId] = useState<string>("")
  const norm = (s: string) => (s || "").trim()
  const selectedRow = prices.find((p) => norm(p.location) === norm(selected))
  const [transportMarkup, setTransportMarkup] = useState<number>(0)
  const parseNum = (s: string) => {
    const m = (s || "").replace(/[^0-9.]/g, "")
    const n = parseFloat(m)
    return isNaN(n) ? null : n
  }
  const toMoney = (n: number) => `$${n.toLocaleString(undefined, { maximumFractionDigits: 2 })}`

  const uniqueLocations = Array.from(
    new Set(prices.map((p) => norm(p.location)))
  )
    .filter(Boolean)
    .sort((a, b) => a.localeCompare(b))
  useEffect(() => {
    if (!open || prices.length) return
    ;(async () => {
      try {
        const res = await fetch("/api/prices")
        const data = await res.json()
        if (data?.success && Array.isArray(data.data)) {
          setPrices(data.data)
        }
      } catch {}
    })()
  }, [open, prices.length])

  useEffect(() => {
    if (!docsOpen || docItems.length) return
    ;(async () => {
      setLoadingDocs(true)
      try {
        const res = await fetch("/api/dealer/docs")
        const json = await res.json()
        if (res.ok && json?.success && Array.isArray(json.items)) {
          setDocItems(json.items as Array<{ id: string; title: string; express: string; regular: string }>)
        }
      } catch {}
      finally {
        setLoadingDocs(false)
      }
    })()
  }, [docsOpen, docItems.length, selectedDocId])

  // When opening docs dialog, start with no selection by default
  useEffect(() => {
    if (docsOpen) {
      setSelectedDocId("")
      setDocQuery("")
      setShowDocList(false)
    }
  }, [docsOpen])

  useEffect(() => {
    ;(async () => {
      try {
        const res = await fetch("/api/dealer/transport-markup", { cache: "no-store" })
        const data = await res.json()
        if (data?.success && typeof data.data?.transportMarkup === "number") {
          setTransportMarkup(data.data.transportMarkup)
        }
      } catch {}
    })()
  }, [])

  // Refresh markup whenever the Transport Prices dialog opens to ensure latest value
  useEffect(() => {
    if (!open) return
    ;(async () => {
      try {
        const res = await fetch("/api/dealer/transport-markup", { cache: "no-store" })
        const data = await res.json()
        if (data?.success && typeof data.data?.transportMarkup === "number") {
          setTransportMarkup(data.data.transportMarkup)
        }
      } catch {}
    })()
  }, [open])

  // Hide dropdown whenever the dialog closes
  useEffect(() => {
    if (!open) setShowList(false)
  }, [open])

  // Fallback: try loading prices on mount too, so options aren't empty
  useEffect(() => {
    if (prices.length) return
    ;(async () => {
      try {
        const res = await fetch("/api/prices")
        const data = await res.json()
        if (data?.success && Array.isArray(data.data)) {
          setPrices(data.data)
        }
      } catch {}
    })()
  }, [prices.length])
  
  // Close dropdown on outside click or Escape key
  useEffect(() => {
    const onDocMouseDown = (e: MouseEvent) => {
      if (comboRef.current && !comboRef.current.contains(e.target as Node)) {
        setShowList(false)
      }
      if (docsComboRef.current && !docsComboRef.current.contains(e.target as Node)) {
        setShowDocList(false)
      }
    }
    const onDocKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setShowList(false)
        setShowDocList(false)
      }
    }
    document.addEventListener("mousedown", onDocMouseDown)
    document.addEventListener("keydown", onDocKeyDown)
    return () => {
      document.removeEventListener("mousedown", onDocMouseDown)
      document.removeEventListener("keydown", onDocKeyDown)
    }
  }, [])
  
  // If not authenticated, show a blank layout
  if (!session?.user) {
    return <>{children}</>
  }

  return (
    <div className="flex h-screen bg-white">
      {/* Mobile overlay and off-canvas sidebar */}
      {mobileNavOpen && (
        <div
          className="fixed inset-0 z-40 bg-white/40 md:hidden"
          onClick={() => setMobileNavOpen(false)}
        />
      )}
      <div
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-neutral-200/80 flex flex-col shadow-sm md:hidden transform transition-transform ${mobileNavOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        <div className="h-16 flex items-center justify-between px-4 border-b border-neutral-200/80 bg-gradient-to-r from-red-700 to-red-800">
          <span className="text-base font-bold text-white">მენიუ</span>
          <button
            type="button"
            onClick={() => setMobileNavOpen(false)}
            className="inline-flex items-center justify-center rounded-md p-2 text-white/90 hover:text-white hover:bg-white/10 focus:outline-none"
            aria-label="დახურვა მენიუ"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        <nav className="flex-1 overflow-y-auto p-4 space-y-2">
          {dealerNav.map((item) => {
            const isActive = pathname === item.href
            const Icon = item.icon
            
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileNavOpen(false)}
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
      {/* Sidebar */}
      <div className="hidden md:flex w-64 bg-white border-r border-neutral-200/80 flex-col shadow-sm">
        <div className="h-16 flex items-center px-6 border-b border-neutral-200/80 bg-gradient-to-r from-red-700 to-red-800">
          <span className="text-xl font-bold text-white">დილერის პანელი</span>
        </div>
        <nav className="flex-1 overflow-y-auto p-4 space-y-2">
          {dealerNav.map((item) => {
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
        <header className="h-16 bg-white border-b border-neutral-200/80 flex items-center justify-between px-4 sm:px-6 shadow-sm">
          <div className="flex items-center gap-3">
            <button
              type="button"
              className="md:hidden inline-flex items-center justify-center rounded-md p-2 text-red-700 hover:bg-red-50 focus:outline-none"
              onClick={() => setMobileNavOpen(true)}
              aria-label="გახსნა მენიუ"
            >
              <Menu className="h-5 w-5" />
            </button>
            <span className="md:hidden text-base font-semibold text-red-700">დილერის პანელი</span>
          </div>
          <div className="flex items-center gap-2 sm:gap-3 flex-wrap justify-end">
            <Dialog open={open} onOpenChange={setOpen}>
              <DialogTrigger asChild>
                <Button aria-label="ტრანსპორტირების ფასი" variant="outline" size="icon" className="h-8 w-8 bg-white border-red-600 text-red-600 hover:bg-red-600 hover:text-white transition-colors gap-0 md:gap-2 md:h-12 md:w-auto md:px-4">
                  <Ship className="h-5 w-5 md:h-4 md:w-4" />
                  <span className="hidden md:inline">ტრანსპორტირების ფასი</span>
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[720px] p-4 sm:p-6 max-h-[80vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle className="text-lg font-semibold text-red-600 text-center mb-4">ტრანსპორტირების ფასი</DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <div className="text-sm font-medium text-red-600">ლოკაცია</div>
                    <div className="relative" ref={comboRef}>
                      <input
                        type="text"
                        value={query || selected}
                        onChange={(e) => {
                          setSelected("")
                          setQuery(e.target.value)
                          setShowList(true)
                        }}
                        onFocus={() => {
                          setShowList(true)
                        }}
                        onClick={() => setShowList(true)}
                        onKeyDown={(e) => {
                          if (e.key === "Escape") setShowList(false)
                        }}
                        placeholder="მოძებნეთ ან აირჩიეთ ლოკაცია"
                        className="w-full rounded-md border border-neutral-300 bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-red-200"
                      />
                      {showList && (
                        <div className="absolute z-[9999] mt-1 max-h-60 w-full overflow-auto rounded-md border border-neutral-200 bg-white p-1 shadow-md">
                          {uniqueLocations
                            .filter((loc) => loc.toLowerCase().includes(norm(query).toLowerCase()))
                            .map((loc) => (
                              <button
                                key={loc}
                                type="button"
                                onMouseDown={(e) => {
                                  e.preventDefault()
                                  e.stopPropagation()
                                  setSelected(loc)
                                  setQuery("")
                                  setShowList(false)
                                }}
                                className={`w-full rounded-sm px-2 py-2 text-left text-sm hover:bg-neutral-100 ${
                                  selected === loc ? "bg-neutral-100" : ""
                                }`}
                              >
                                {loc}
                              </button>
                            ))}
                          {uniqueLocations.filter((loc) => loc.toLowerCase().includes(norm(query).toLowerCase())).length === 0 && (
                            <div className="px-2 py-2 text-sm text-neutral-500">ლოკაცია ვერ მოიძებნა</div>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="text-sm font-medium text-red-600">ჩატვირთვის პორტი</div>
                    <input
                      type="text"
                      readOnly
                      value={selectedRow?.port || "-"}
                      placeholder="პორთი გამოჩნდება ლოკაციის არჩევის შემდეგ"
                      className="w-full rounded-md border border-neutral-300 bg-neutral-50 px-3 py-2 text-sm text-neutral-700"
                    />
                  </div>
                </div>

                <div className="mt-6 min-h-[180px]">
                  {selectedRow && (
                    <div className="rounded-xl border border-red-200 bg-red-50 p-6 text-sm space-y-3 shadow-sm">
                      <div className="text-base sm:text-lg font-semibold text-red-900 text-center">ფასი ფოთამდე:</div>
                      <div className="text-3xl sm:text-4xl font-extrabold text-red-600 text-center mt-1">
                        {(() => {
                          const base = parseNum(selectedRow.price)
                          return base !== null ? toMoney(base + (transportMarkup || 0)) : (selectedRow.price || "-")
                        })()}
                      </div>
                      <div className="text-sm text-neutral-600 text-center mt-3">მარშრუტი:</div>
                      <div className="text-sm text-neutral-800 text-center">{selected} → {selectedRow.port} → ფოთი</div>
                    </div>
                  )}
                </div>
              </DialogContent>
            </Dialog>

            <Dialog open={docsOpen} onOpenChange={setDocsOpen}>
              <DialogTrigger asChild>
                <Button aria-label="საბუთები" variant="outline" size="icon" className="h-8 w-8 bg-white border-red-600 text-red-600 hover:bg-red-600 hover:text-white transition-colors gap-0 md:gap-2 md:h-12 md:w-auto md:px-4">
                  <FileText className="h-5 w-5 md:h-4 md:w-4" />
                  <span className="hidden md:inline">საბუთები</span>
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[900px] p-4 sm:p-6 max-h-[85vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle className="text-lg font-semibold text-red-600 text-center mb-4">საბუთები</DialogTitle>
                </DialogHeader>
                {loadingDocs ? (
                  <div className="h-40 w-full rounded-lg bg-[linear-gradient(110deg,#ececec,45%,#f5f5f5,55%,#ececec)] bg-[length:200%_100%] animate-[shimmer_1.2s_infinite]" />
                ) : docItems.length ? (
                  <div className="border border-neutral-200 rounded-lg p-5 space-y-4 min-h-[460px]">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-end">
                      <div className="space-y-2">
                        <div className="text-sm font-medium text-red-600">აირჩიეთ საბუთი</div>
                        <div className="relative" ref={docsComboRef}>
                          <input
                            type="text"
                            value={docQuery || (docItems.find(i => i.id === selectedDocId)?.title || "")}
                            onChange={(e) => {
                              setSelectedDocId("")
                              setDocQuery(e.target.value)
                              setShowDocList(true)
                            }}
                            onFocus={() => setShowDocList(true)}
                            onClick={() => setShowDocList(true)}
                            onKeyDown={(e) => { if (e.key === 'Escape') setShowDocList(false) }}
                            placeholder="მოძებნეთ ან აირჩიეთ საბუთი"
                            className="w-full rounded-md border border-neutral-300 bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-red-200"
                          />
                          {showDocList && (
                            <div className="absolute z-[9999] top-full mt-1 max-h-60 w-full overflow-auto rounded-md border border-neutral-200 bg-white p-1 shadow-md">
                              {docItems
                                .filter((it) => (it.title || "").toLowerCase().includes((docQuery || "").toLowerCase()))
                                .map((it) => (
                                  <button
                                    key={it.id}
                                    type="button"
                                    onMouseDown={(e) => {
                                      e.preventDefault()
                                      e.stopPropagation()
                                      setSelectedDocId(it.id)
                                      setDocQuery("")
                                      setShowDocList(false)
                                    }}
                                    className={`w-full rounded-sm px-2 py-2 text-left text-sm hover:bg-neutral-100 ${selectedDocId === it.id ? 'bg-neutral-100' : ''}`}
                                  >
                                    {it.title}
                                  </button>
                                ))}
                              {docItems.filter((it) => (it.title || "").toLowerCase().includes((docQuery || "").toLowerCase())).length === 0 && (
                                <div className="px-2 py-2 text-sm text-neutral-500">საბუთი ვერ მოიძებნა</div>
                              )}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                    {(() => {
                      const current = docItems.find(i => i.id === selectedDocId)
                      if (!current) return (
                        <div className="min-h-[300px] flex items-center justify-center text-neutral-500 text-sm">აირჩიეთ საბუთი სიისგან</div>
                      )
                      const badge = (text: string) => {
                        const v = (text || "").toLowerCase().trim()
                        const vnorm = v.replace(/[^ა-ჰa-z0-9]+/g, "")
                        const ok = (
                          v.includes("უპრობლемо") ||
                          v.includes("უპრობლემოდ") ||
                          vnorm.includes("უპრობლემ") ||
                          v.includes("good") ||
                          v.includes("ok") ||
                          v.includes("yes")
                        )
                        const cl = ok ? "bg-green-100 text-green-800 border-green-200" : "bg-neutral-100 text-neutral-800 border-neutral-200"
                        return (
                          <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs border ${cl}`}>
                            {ok && <CheckCircle className="h-3 w-3" aria-hidden="true" />}
                            {text || "-"}
                          </span>
                        )
                      }
                      return (
                        <div className="p-4 border border-neutral-200 rounded-lg space-y-4 min-h-[300px]">
                          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                            <div className="text-sm font-medium text-red-700">საბუთი</div>
                            <div className="text-sm font-semibold text-neutral-900 text-right">{current.title}</div>
                          </div>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="p-3 rounded-md border border-red-100 bg-red-50">
                              <div className="text-xs font-medium text-red-700 mb-1">სასწრაფო (1 კვირა)</div>
                              <div>{badge(current.express)}</div>
                            </div>
                            <div className="p-3 rounded-md border border-neutral-200 bg-neutral-50">
                              <div className="text-xs font-medium text-neutral-700 mb-1">ჩვეულებრივ (2 კვირა)</div>
                              <div>{badge(current.regular)}</div>
                            </div>
                          </div>
                        </div>
                      )
                    })()}
                  </div>
                ) : (
                  <div className="text-neutral-500 text-sm">ფაილი ვერ ჩაიტვირთა</div>
                )}
              </DialogContent>
            </Dialog>

            <Dialog open={calcOpen} onOpenChange={setCalcOpen}>
              <DialogTrigger asChild>
                <Button aria-label="აუქციონის დანამატის კალკულატორი" variant="outline" size="icon" className="h-8 w-8 bg-white border-red-600 text-red-600 hover:bg-red-600 hover:text-white transition-colors gap-0 md:gap-2 md:h-12 md:w-auto md:px-4">
                  <Calculator className="h-5 w-5 md:h-4 md:w-4" />
                  <span className="hidden md:inline">აუქციონის დანამატის კალკულატორი</span>
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[720px] p-4 sm:p-6 max-h-[80vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle className="text-lg font-semibold text-red-600 text-center mb-4">აუქციონის დანამატის კალკულატორი</DialogTitle>
                </DialogHeader>
                <AuctionCalculator />
              </DialogContent>
            </Dialog>

            <Button 
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-neutral-600 hover:text-red-600 hover:bg-red-50 gap-0 md:gap-2 md:h-12 md:w-auto md:px-4"
              onClick={() => signOut({ callbackUrl: "/" })}
              aria-label="გასვლა"
            >
              <LogOut className="h-5 w-5 md:h-4 md:w-4" />
              <span className="hidden md:inline">გასვლა</span>
            </Button>
          </div>
        </header>

        <main className="flex-1 p-4 sm:p-6 overflow-auto bg-white">
          {children}
        </main>
      </div>
    </div>
  )
}
