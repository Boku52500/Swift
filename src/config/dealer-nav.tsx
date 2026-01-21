import {
  LayoutDashboard,
  Car,
  Warehouse,
  PackageOpen,
  FileText,
  CheckSquare,
  XSquare,
} from "lucide-react"

export const dealerNav = [
  {
    title: "მთავარი",
    href: "/dealer",
    icon: LayoutDashboard,
    showStats: true
  },
  {
    title: "ყველა მანქანა",
    href: "/dealer/cars",
    icon: Car,
    showStats: false
  },
  {
    title: "ჩამოსული",
    href: "/dealer/arrived",
    icon: Car,
    showStats: false
  },
  {
    title: "საწყობში არ მისული",
    href: "/dealer/not-in-warehouse",
    icon: Warehouse,
    showStats: false
  },
  {
    title: "კონტეინერში ჩატვირთული",
    href: "/dealer/loaded",
    icon: PackageOpen,
    showStats: false
  },
  {
    title: "ყველა ინვოისი",
    href: "/dealer/invoices",
    icon: FileText,
    showStats: false
  },
  {
    title: "გადახდილი ინვოისი",
    href: "/dealer/paid-invoices",
    icon: CheckSquare,
    showStats: false
  },
  {
    title: "გადაუხდელი ინვოისი",
    href: "/dealer/unpaid-invoices",
    icon: XSquare,
    showStats: false
  },
]
