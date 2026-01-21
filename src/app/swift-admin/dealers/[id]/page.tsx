import { prisma } from "@/lib/prisma"
import { EditDealerForm } from "@/components/dealers/edit-dealer-form"

async function getDealerData(id: string) {
  const user = await prisma.user.findFirst({
    where: {
      id: id,
      role: "DEALER"
    },
    include: {
      dealerProfile: true
    }
  })

  if (!user) return null

  return {
    id: user.id,
    email: user.email,
    companyName: user.dealerProfile?.companyName ?? null,
    phone: user.dealerProfile?.phone ?? null,
    address: user.dealerProfile?.address ?? null,
    transportMarkup: (user.dealerProfile as any)?.transportMarkup ?? 0
  }
}

export default async function EditDealerPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const dealer = await getDealerData(id)

  if (!dealer) {
    return <div>Dealer not found</div>
  }

  return <EditDealerForm initialData={dealer} />
}
