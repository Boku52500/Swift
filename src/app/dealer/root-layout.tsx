import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { redirect } from "next/navigation"

export default async function DealerRootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await getServerSession(authOptions)

  // Require auth and DEALER role
  if (!session?.user || session.user.role !== "DEALER") {
    redirect("/dealer/login")
  }

  return children
}
