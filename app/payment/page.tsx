'use client'

import { Topbar } from '@/components/topbar'
import { CreditCard } from 'lucide-react'

export default function PaymentPage() {
  return (
    <div className="flex h-screen flex-col overflow-hidden bg-background">
      <Topbar />
      <div className="flex flex-1 items-center justify-center" style={{ background: 'rgb(232,236,239)' }}>
        <div style={{ textAlign: 'center', color: 'rgb(107,114,128)' }}>
          <CreditCard style={{ width: 48, height: 48, margin: '0 auto 12px', color: 'rgb(156,163,175)' }} />
          <div style={{ fontSize: 18, fontWeight: 700, color: 'rgb(55,65,81)', marginBottom: 6 }}>Payment</div>
          <div style={{ fontSize: 14 }}>Coming soon</div>
        </div>
      </div>
    </div>
  )
}
