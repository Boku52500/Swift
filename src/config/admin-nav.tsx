import {
  Users,
  Car,
  FileText,
  Warehouse,
  PackageOpen,
  CheckSquare,
  XSquare,
  UserPlus,
} from "lucide-react"

export const adminNav = [
  {
    title: "დილერები",
    href: "/swift-admin/dealers",
    icon: Users,
  },
  {
    title: "დილერის დამატება",
    href: "/swift-admin/dealers/new",
    icon: UserPlus,
  },
  {
    title: "ყველა მანქანა",
    href: "/swift-admin/cars",
    icon: Car,
  },
  {
    title: "პოპულარული მანქანები",
    href: "/swift-admin/popular-cars",
    icon: Car,
  },
  {
    title: "კატეგორიების სურათები",
    href: "/swift-admin/popular-categories",
    icon: Car,
  },
  {
    title: "ჩამოსული",
    href: "/swift-admin/arrived",
    icon: Car,
  },
  {
    title: "საწყობში არ მისული",
    href: "/swift-admin/not-in-warehouse",
    icon: Warehouse,
  },
  {
    title: "კონტეინერში ჩატვირთული",
    href: "/swift-admin/loaded",
    icon: PackageOpen,
  },
  {
    title: "ყველა ინვოისი",
    href: "/swift-admin/invoices",
    icon: FileText,
  },
  {
    title: "გადახდილი ინვოისი",
    href: "/swift-admin/paid-invoices",
    icon: CheckSquare,
  },
  {
    title: "გადაუხდელი ინვოისი",
    href: "/swift-admin/unpaid-invoices",
    icon: XSquare,
  },
]
