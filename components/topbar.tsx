'use client'

import { Search, Bell, ChevronDown, Plus, SlidersHorizontal } from 'lucide-react'

const tabs = [
  { label: 'New Case', active: true },
  { label: 'Cases' },
  { label: 'Consent Form' },
  { label: 'Follow Up', badge: 45 },
  { label: 'Payment' },
]

export function Topbar() {
  return (
    <header className="sticky top-0 z-20 border-b border-border bg-surface/80 px-4 py-3 backdrop-blur-md sm:px-6">
      <div className="flex items-center gap-3">
        {/* Tabs */}
        <nav className="flex items-center gap-1 overflow-x-auto scroll-thin">
          {tabs.map((t) => (
            <button
              key={t.label}
              className={`flex shrink-0 items-center gap-2 rounded-xl px-3.5 py-2 text-sm font-medium transition ${
                t.active
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
            </button>
          ))}
        </nav>

        {/* Search */}
        <div className="relative ml-auto hidden max-w-md flex-1 md:block">
          <Search className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-faint" />
          <input
            placeholder="Search by patient, owner, or contact..."
            className="h-11 w-full rounded-xl border border-border bg-input pl-10 pr-3 text-sm outline-none transition focus:border-primary focus:bg-surface focus:ring-4 focus:ring-primary/10"
          />
        </div>

        <button className="flex size-11 items-center justify-center rounded-xl border border-border bg-surface text-muted transition hover:bg-input">
          <SlidersHorizontal className="size-[18px]" />
        </button>
        <button className="relative flex size-11 items-center justify-center rounded-xl border border-border bg-surface text-muted transition hover:bg-input">
          <Bell className="size-[18px]" />
          <span className="absolute right-2.5 top-2.5 size-2 rounded-full bg-danger" />
        </button>

        <button className="flex h-11 items-center gap-2 rounded-xl bg-primary px-4 text-sm font-semibold text-white shadow-lg shadow-primary/25 transition hover:bg-primary-hover">
          <Plus className="size-4" /> New Case
        </button>

        <button className="hidden h-11 items-center gap-2 rounded-xl border border-border bg-surface px-2 pr-3 text-sm font-medium sm:flex">
          <span className="flex size-7 items-center justify-center rounded-full bg-navy text-xs font-semibold text-white">
            DR
          </span>
          Doctor
          <ChevronDown className="size-4 text-faint" />
        </button>
      </div>
    </header>
  )
}
