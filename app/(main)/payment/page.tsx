import { CreditCard } from 'lucide-react'

export default function PaymentPage() {
  return (
    <main className="flex flex-1 items-center justify-center">
      <div className="text-center">
        <CreditCard className="mx-auto mb-3 size-12 text-faint" />
        <div className="text-lg font-bold text-foreground">Payment</div>
        <div className="mt-1 text-sm text-muted">Coming soon</div>
      </div>
    </main>
  )
}
