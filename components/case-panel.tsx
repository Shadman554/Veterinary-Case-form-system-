import { Save, Printer, FlaskConical, PawPrint, FileCheck, CreditCard, Search, Plus } from 'lucide-react'
import { Card } from '@/components/ui'

const cases = [
  { id: 714, name: 'pumpkin', status: 'Saved', time: 'tap to open', color: 'bg-purple-500' },
  { id: 713, name: 'Blind dler', status: 'Incomplete', time: 'just now', color: 'bg-orange-400' },
  { id: 712, name: 'Milo', status: 'Saved', time: '2h ago', color: 'bg-emerald-500' },
  { id: 711, name: 'Luna', status: 'Saved', time: '4h ago', color: 'bg-sky-500' },
  { id: 710, name: 'Rocky', status: 'Incomplete', time: 'today', color: 'bg-rose-500' },
]

export function CasePanel() {
  return (
    <div className="flex w-72 shrink-0 flex-col gap-4 py-5 pr-5">
      {/* Action buttons */}
      <Card className="overflow-hidden">
        {/* Save Case */}
        <div className="p-3">
          <button
            type="button"
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-primary py-3 text-sm font-semibold text-white shadow-md shadow-primary/30 transition hover:bg-primary-hover active:scale-[.98]"
          >
            <Save className="size-4" />
            Save Case
          </button>
        </div>

        {/* Print / Animal row */}
        <div className="grid grid-cols-3 gap-px border-t border-border bg-border">
          <ActionIconBtn icon={Printer} label="Print Form" />
          <ActionIconBtn icon={FlaskConical} label="Print Lab" />
          <ActionIconBtn icon={PawPrint} label="Print Animal" />
        </div>

        {/* Consent / Payment row */}
        <div className="grid grid-cols-2 gap-px border-t border-border bg-border">
          <ActionLabelBtn icon={FileCheck} label="Consent" />
          <ActionLabelBtn icon={CreditCard} label="Payment" />
        </div>
      </Card>

      {/* Case Forms list */}
      <Card className="flex flex-1 flex-col overflow-hidden">
        <div className="flex items-center justify-between border-b border-border px-4 py-3">
          <span className="text-[13px] font-semibold text-foreground">Case Forms</span>
          <button
            type="button"
            className="flex size-6 items-center justify-center rounded-md text-muted transition hover:bg-input hover:text-foreground"
          >
            <Plus className="size-4" />
          </button>
        </div>

        {/* Search */}
        <div className="border-b border-border px-3 py-2">
          <div className="flex items-center gap-2 rounded-lg bg-input px-3 py-2">
            <Search className="size-3.5 shrink-0 text-faint" />
            <input
              type="text"
              placeholder="Search cases..."
              className="w-full bg-transparent text-xs text-foreground placeholder:text-faint outline-none"
            />
          </div>
        </div>

        {/* List */}
        <div className="scroll-thin flex-1 overflow-y-auto">
          {cases.map((c) => (
            <button
              key={c.id}
              type="button"
              className="flex w-full items-center gap-3 border-b border-border px-4 py-3 text-left transition hover:bg-input last:border-0"
            >
              <span
                className={`flex size-8 shrink-0 items-center justify-center rounded-full ${c.color} text-xs font-bold text-white`}
              >
                {c.name[0].toUpperCase()}
              </span>
              <div className="min-w-0 flex-1">
                <div className="flex items-baseline justify-between gap-1">
                  <span className="truncate text-[13px] font-medium text-foreground">
                    {c.name}
                  </span>
                  <span className="shrink-0 text-[11px] text-faint">#{c.id}</span>
                </div>
                <div className="flex items-center gap-1 mt-0.5">
                  <span
                    className={`text-[11px] font-medium ${
                      c.status === 'Saved' ? 'text-success' : 'text-warning'
                    }`}
                  >
                    {c.status}
                  </span>
                  <span className="text-[11px] text-faint">· {c.time}</span>
                </div>
              </div>
            </button>
          ))}
        </div>
      </Card>
    </div>
  )
}

function ActionIconBtn({ icon: Icon, label }: { icon: React.ElementType; label: string }) {
  return (
    <button
      type="button"
      className="flex flex-col items-center gap-1.5 bg-surface py-3 text-center transition hover:bg-input active:scale-[.97]"
    >
      <Icon className="size-5 text-muted" />
      <span className="text-[11px] font-medium text-muted">{label}</span>
    </button>
  )
}

function ActionLabelBtn({ icon: Icon, label }: { icon: React.ElementType; label: string }) {
  return (
    <button
      type="button"
      className="flex items-center justify-center gap-2 bg-surface py-3 text-center transition hover:bg-input active:scale-[.97]"
    >
      <Icon className="size-4 text-muted" />
      <span className="text-[13px] font-medium text-muted">{label}</span>
    </button>
  )
}
