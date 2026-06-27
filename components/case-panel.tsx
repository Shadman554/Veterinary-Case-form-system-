'use client'

import { useState } from 'react'
import { Save, Printer, FlaskConical, PawPrint, FileCheck, CreditCard, Search, Plus, CheckCircle2 } from 'lucide-react'
import { Card } from '@/components/ui'
import { useCaseCtx, type SavedCaseEntry } from '@/lib/case-context'

const avatarColors: Record<string, string> = {
  p: 'bg-purple-500', b: 'bg-orange-400', m: 'bg-emerald-500',
  l: 'bg-sky-500', r: 'bg-rose-500', a: 'bg-violet-500',
  s: 'bg-teal-500', d: 'bg-amber-500', g: 'bg-pink-500',
}
function avatarColor(name: string) {
  const key = name[0]?.toLowerCase() ?? 'a'
  return avatarColors[key] ?? 'bg-primary'
}

export function CasePanel() {
  const { form, savedCases, saveCase, loadCase, newCase } = useCaseCtx()
  const [search, setSearch] = useState('')
  const [saved, setSaved] = useState(false)

  const filtered = savedCases.filter((c) =>
    c.patientName.toLowerCase().includes(search.toLowerCase())
  )

  function handleSave() {
    saveCase()
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  function handlePrint(section: 'form' | 'lab' | 'animal') {
    const map = { form: 'print-form', lab: 'print-lab', animal: 'print-animal' }
    document.body.setAttribute('data-print', map[section])
    window.print()
    document.body.removeAttribute('data-print')
  }

  return (
    <div className="flex w-72 shrink-0 flex-col gap-4 py-5 pr-5">
      {/* Action buttons */}
      <Card className="overflow-hidden">
        <div className="p-3">
          <button
            type="button"
            onClick={handleSave}
            className={`flex w-full items-center justify-center gap-2 rounded-xl py-3 text-sm font-semibold text-white shadow-md transition active:scale-[.98] ${
              saved
                ? 'bg-success shadow-success/30'
                : 'bg-primary shadow-primary/30 hover:bg-primary-hover'
            }`}
          >
            {saved ? (
              <><CheckCircle2 className="size-4" /> Saved!</>
            ) : (
              <><Save className="size-4" /> Save Case</>
            )}
          </button>
        </div>

        <div className="grid grid-cols-3 gap-px border-t border-border bg-border">
          <ActionIconBtn icon={Printer} label="Print Form" onClick={() => handlePrint('form')} />
          <ActionIconBtn icon={FlaskConical} label="Print Lab" onClick={() => handlePrint('lab')} />
          <ActionIconBtn icon={PawPrint} label="Print Animal" onClick={() => handlePrint('animal')} />
        </div>

        <div className="grid grid-cols-2 gap-px border-t border-border bg-border">
          <ActionLabelBtn icon={FileCheck} label="Consent" onClick={() => alert('Consent form — coming soon')} />
          <ActionLabelBtn icon={CreditCard} label="Payment" onClick={() => alert('Payment — coming soon')} />
        </div>
      </Card>

      {/* Case Forms list */}
      <Card className="flex flex-1 flex-col overflow-hidden">
        <div className="flex items-center justify-between border-b border-border px-4 py-3">
          <span className="text-[13px] font-semibold text-foreground">Case Forms</span>
          <button
            type="button"
            onClick={newCase}
            title="New Case"
            className="flex size-6 items-center justify-center rounded-md text-muted transition hover:bg-input hover:text-foreground"
          >
            <Plus className="size-4" />
          </button>
        </div>

        <div className="border-b border-border px-3 py-2">
          <div className="flex items-center gap-2 rounded-lg bg-input px-3 py-2">
            <Search className="size-3.5 shrink-0 text-faint" />
            <input
              type="text"
              placeholder="Search cases..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-transparent text-xs text-foreground placeholder:text-faint outline-none"
            />
          </div>
        </div>

        <div className="scroll-thin flex-1 overflow-y-auto">
          {filtered.length === 0 && (
            <p className="py-6 text-center text-xs text-faint">No cases found</p>
          )}
          {filtered.map((c) => (
            <CaseRow
              key={c.id}
              entry={c}
              active={form.caseNumber === c.id}
              onSelect={() => loadCase(c)}
            />
          ))}
        </div>
      </Card>
    </div>
  )
}

function CaseRow({
  entry, active, onSelect,
}: {
  entry: SavedCaseEntry
  active: boolean
  onSelect: () => void
}) {
  return (
    <button
      type="button"
      onClick={onSelect}
      className={`flex w-full items-center gap-3 border-b border-border px-4 py-3 text-left transition last:border-0 ${
        active ? 'bg-primary/5' : 'hover:bg-input'
      }`}
    >
      <span
        className={`flex size-8 shrink-0 items-center justify-center rounded-full ${avatarColor(entry.patientName)} text-xs font-bold text-white`}
      >
        {entry.patientName[0]?.toUpperCase() ?? '?'}
      </span>
      <div className="min-w-0 flex-1">
        <div className="flex items-baseline justify-between gap-1">
          <span className="truncate text-[13px] font-medium text-foreground">{entry.patientName}</span>
          <span className="shrink-0 text-[11px] text-faint">#{entry.id}</span>
        </div>
        <div className="mt-0.5 flex items-center gap-1">
          <span className={`text-[11px] font-medium ${entry.status === 'Saved' ? 'text-success' : 'text-warning'}`}>
            {entry.status}
          </span>
          <span className="text-[11px] text-faint">· {entry.time}</span>
        </div>
      </div>
    </button>
  )
}

function ActionIconBtn({ icon: Icon, label, onClick }: { icon: React.ElementType; label: string; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex flex-col items-center gap-1.5 bg-surface py-3 text-center transition hover:bg-input active:scale-[.97]"
    >
      <Icon className="size-5 text-muted" />
      <span className="text-[11px] font-medium text-muted">{label}</span>
    </button>
  )
}

function ActionLabelBtn({ icon: Icon, label, onClick }: { icon: React.ElementType; label: string; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex items-center justify-center gap-2 bg-surface py-3 text-center transition hover:bg-input active:scale-[.97]"
    >
      <Icon className="size-4 text-muted" />
      <span className="text-[13px] font-medium text-muted">{label}</span>
    </button>
  )
}
