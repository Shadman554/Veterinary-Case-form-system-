import type { ReactNode } from 'react'
import { ChevronDown, type LucideIcon } from 'lucide-react'

/* ---------- Card ---------- */
export function Card({
  children,
  className = '',
}: {
  children: ReactNode
  className?: string
}) {
  return (
    <div
      className={`rounded-2xl border border-border bg-surface shadow-[0_1px_2px_rgba(15,23,42,0.04),0_8px_24px_-12px_rgba(15,23,42,0.10)] ${className}`}
    >
      {children}
    </div>
  )
}

/* ---------- Section card with header ---------- */
export function Section({
  title,
  icon: Icon,
  accent = 'primary',
  action,
  children,
}: {
  title: string
  icon: LucideIcon
  accent?: 'primary' | 'success' | 'warning' | 'navy'
  action?: ReactNode
  children: ReactNode
}) {
  const accents: Record<string, string> = {
    primary: 'bg-primary/10 text-primary',
    success: 'bg-success/10 text-success',
    warning: 'bg-warning/10 text-warning',
    navy: 'bg-navy/10 text-navy',
  }
  return (
    <Card>
      <div className="flex items-center justify-between gap-3 border-b border-border px-5 py-4">
        <div className="flex items-center gap-3">
          <span
            className={`flex size-9 items-center justify-center rounded-xl ${accents[accent]}`}
          >
            <Icon className="size-[18px]" />
          </span>
          <h2 className="text-[15px] font-semibold text-foreground">{title}</h2>
        </div>
        {action}
      </div>
      <div className="p-5">{children}</div>
    </Card>
  )
}

/* ---------- Field wrapper ---------- */
export function Field({
  label,
  required,
  children,
  className = '',
}: {
  label: string
  required?: boolean
  children: ReactNode
  className?: string
}) {
  return (
    <label className={`flex flex-col gap-1.5 ${className}`}>
      <span className="text-xs font-medium text-muted">
        {label}
        {required && <span className="text-danger"> *</span>}
      </span>
      {children}
    </label>
  )
}

export const inputClasses =
  'h-11 w-full rounded-xl border border-border bg-input px-3.5 text-sm text-foreground placeholder:text-faint outline-none transition focus:border-primary focus:bg-surface focus:ring-4 focus:ring-primary/10'
