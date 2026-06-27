'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Plus } from 'lucide-react'
import { useCaseCtx } from '@/lib/case-context'

const tabs = [
  { label: 'New Case', href: '/' },
  { label: 'Cases', href: '/cases' },
  { label: 'Consent Form', href: '/consent' },
  { label: 'Follow Up', href: '/follow-up', badge: 45 },
  { label: 'Payment', href: '/payment' },
]

export function Topbar() {
  const { newCase } = useCaseCtx()
  const pathname = usePathname()

  return (
    <header className="sticky top-0 z-20 border-b border-border bg-surface/80 px-4 py-3 backdrop-blur-md sm:px-6">
      <div className="flex items-center gap-3">
        <nav className="flex items-center gap-1 overflow-x-auto scroll-thin">
          {tabs.map((t) => {
            const isActive = t.href === '/' ? pathname === '/' : pathname.startsWith(t.href)
            return (
              <Link
                key={t.label}
                href={t.href}
                className={`flex shrink-0 items-center gap-2 rounded-xl px-3.5 py-2 text-sm font-medium transition ${
                  isActive
                    ? 'bg-success/10 text-success'
                    : 'text-muted hover:bg-input hover:text-foreground'
                }`}
              >
                {t.label}
                {t.badge && (
                  <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-danger px-1.5 text-[11px] font-bold text-white">
                    {t.badge}
                  </span>
                )}
              </Link>
            )
          })}
        </nav>

        <button
          onClick={newCase}
          className="ml-auto flex h-11 items-center gap-2 rounded-xl bg-primary px-4 text-sm font-semibold text-white shadow-lg shadow-primary/25 transition hover:bg-primary-hover"
        >
          <Plus className="size-4" /> New Case
        </button>

        <button className="hidden h-11 items-center gap-2 rounded-xl border border-border bg-surface px-2 pr-3 text-sm font-medium sm:flex">
          <span className="flex size-7 items-center justify-center rounded-full bg-navy text-xs font-semibold text-white">DR</span>
          Doctor
        </button>
      </div>
    </header>
  )
}
