import { PhoneCall, FileText, CheckCheck, RefreshCw, Clock4 } from 'lucide-react'

interface FUCase {
  name: string; species: string; breed: string; caseId: number
  owner: string; phone: string; doctor: string; diagnosis: string
  followUpDate: string; daysLabel: string; urgency: 'overdue' | 'today' | 'upcoming'
}

const OVERDUE: FUCase[] = [
  { name: 'Prxa',  species: 'Other', breed: 'Kurdish mix',     caseId: 276, owner: 'Mzhda Fariq',  phone: '0770 144 6062', doctor: 'Dr. Othman', diagnosis: 'Spayd',                                    followUpDate: '28 May 2026', daysLabel: '30 days overdue', urgency: 'overdue' },
  { name: 'Teto',  species: 'Cat',   breed: 'British',         caseId: 275, owner: 'Nada Shkur',   phone: '0773 800 2798', doctor: 'Dr. Othman', diagnosis: 'Bladder crystal',                           followUpDate: '28 May 2026', daysLabel: '30 days overdue', urgency: 'overdue' },
  { name: 'Mario', species: 'Cat',   breed: 'Himalayan',       caseId: 249, owner: 'Shalaw Kawa',  phone: '07749 982 424', doctor: 'Dr. Othman', diagnosis: 'Start of pancreatitis',                     followUpDate: '29 May 2026', daysLabel: '29 days overdue', urgency: 'overdue' },
  { name: 'Baran', species: 'Dog',   breed: 'Labrador',        caseId: 230, owner: 'Omar Salam',   phone: '07703 574 134', doctor: 'Dr. Shania', diagnosis: 'Suspected heart failure or blood parasite', followUpDate: '30 May 2026', daysLabel: '28 days overdue', urgency: 'overdue' },
  { name: 'Kiki',  species: 'Cat',   breed: 'Persian',         caseId: 220, owner: 'Layla Hassan', phone: '0771 334 5566', doctor: 'Dr. Gullan', diagnosis: 'Post-op spay recovery',                    followUpDate: '1 Jun 2026',  daysLabel: '26 days overdue', urgency: 'overdue' },
  { name: 'Rex',   species: 'Dog',   breed: 'German Shepherd', caseId: 215, owner: 'Ahmad Kareem', phone: '0772 901 2233', doctor: 'Dr. Tablo',  diagnosis: 'Parvo treatment follow-up',                followUpDate: '3 Jun 2026',  daysLabel: '24 days overdue', urgency: 'overdue' },
]
const DUE_TODAY: FUCase[] = [
  { name: 'Luna',  species: 'Cat', breed: 'Siamese',          caseId: 310, owner: 'Sara Ahmed',   phone: '0773 456 7890', doctor: 'Dr. Shania', diagnosis: 'Respiratory infection', followUpDate: 'Today', daysLabel: 'Due today', urgency: 'today' },
  { name: 'Buddy', species: 'Dog', breed: 'Golden Retriever', caseId: 308, owner: 'Kawa Ibrahim', phone: '0770 112 3344', doctor: 'Dr. Othman', diagnosis: 'Post-neutering check',  followUpDate: 'Today', daysLabel: 'Due today', urgency: 'today' },
]
const UPCOMING: FUCase[] = [
  { name: 'Mimi',  species: 'Cat', breed: 'Local',      caseId: 350, owner: 'Narin Aziz',  phone: '0771 667 8899', doctor: 'Dr. Gullan', diagnosis: 'Dental scaling recovery', followUpDate: '29 Jun 2026', daysLabel: 'In 2 days', urgency: 'upcoming' },
  { name: 'Rocky', species: 'Dog', breed: 'Rottweiler', caseId: 345, owner: 'Saman Hasan', phone: '0772 334 5566', doctor: 'Dr. Gyan',   diagnosis: 'Fracture plate follow-up', followUpDate: '30 Jun 2026', daysLabel: 'In 3 days', urgency: 'upcoming' },
]

const URGENCY_STYLES = {
  overdue:  { dot: 'bg-danger',  tag: 'bg-danger-soft text-danger',  date: 'text-danger',   border: 'border-l-danger'  },
  today:    { dot: 'bg-warning', tag: 'bg-warning-soft text-warning', date: 'text-warning',  border: 'border-l-warning' },
  upcoming: { dot: 'bg-primary', tag: 'bg-primary/10 text-primary',   date: 'text-primary',  border: 'border-l-primary' },
}

function CaseRow({ c }: { c: FUCase }) {
  const s = URGENCY_STYLES[c.urgency]
  return (
    <div className={`flex items-stretch gap-0 border-b border-border last:border-0`}>
      {/* Urgency stripe */}
      <div className={`w-1 shrink-0 rounded-l-none ${s.dot === 'bg-danger' ? 'bg-danger' : s.dot === 'bg-warning' ? 'bg-warning' : 'bg-primary'}`} />

      <div className="flex flex-1 items-center gap-4 px-4 py-3.5">
        {/* Animal name + meta */}
        <div className="min-w-[140px]">
          <div className="flex items-center gap-2">
            <span className="text-[13px] font-bold text-foreground">{c.name}</span>
            <span className={`rounded px-1.5 py-0.5 text-[9px] font-bold uppercase ${s.tag}`}>{c.daysLabel}</span>
          </div>
          <div className="mt-0.5 text-xs text-muted">{c.species}{c.breed ? ` · ${c.breed}` : ''} · #{c.caseId}</div>
        </div>

        {/* Owner + doctor */}
        <div className="hidden min-w-[160px] sm:block">
          <div className="text-[13px] font-medium text-foreground">{c.owner}</div>
          <div className="mt-0.5 flex items-center gap-2 text-xs text-muted">
            <span>{c.phone}</span>
            <span className="text-border">·</span>
            <span className="text-success">{c.doctor}</span>
          </div>
        </div>

        {/* Diagnosis */}
        <div className="flex-1 truncate text-xs text-muted">
          <span className="font-medium text-foreground">Dx: </span>{c.diagnosis}
        </div>

        {/* Date */}
        <div className={`hidden shrink-0 text-right text-xs font-semibold lg:block ${s.date}`}>
          {c.followUpDate}
        </div>

        {/* Actions */}
        <div className="flex shrink-0 items-center gap-1.5">
          <a href={`tel:${c.phone}`} title="Call owner" className="flex size-8 items-center justify-center rounded-lg border border-primary/25 bg-primary/10 text-primary transition hover:bg-primary/20">
            <PhoneCall className="size-3.5" />
          </a>
          <button title="Open case" className="flex size-8 items-center justify-center rounded-lg border border-border bg-surface text-muted transition hover:bg-input">
            <FileText className="size-3.5" />
          </button>
          <button title="Mark done" className="flex size-8 items-center justify-center rounded-lg border border-success/25 bg-success/10 text-success transition hover:bg-success/20">
            <CheckCheck className="size-3.5" />
          </button>
        </div>
      </div>
    </div>
  )
}

function Group({ label, count, cases, color }: { label: string; count: number; cases: FUCase[]; color: string }) {
  return (
    <div>
      <div className="mb-2 flex items-center gap-2.5">
        <span className={`h-2 w-2 rounded-full ${color}`} />
        <span className="text-[11px] font-bold uppercase tracking-widest text-foreground">{label}</span>
        <span className="text-[11px] text-faint">{count}</span>
        <div className="h-px flex-1 bg-border" />
      </div>
      <div className="overflow-hidden rounded-2xl border border-border bg-surface shadow-[0_1px_2px_rgba(15,23,42,0.04)]">
        {cases.map((c) => <CaseRow key={c.caseId} c={c} />)}
      </div>
    </div>
  )
}

export default function FollowUpPage() {
  return (
    <main className="scroll-thin flex-1 overflow-y-auto">
      {/* Header */}
      <div className="sticky top-0 z-10 border-b border-border bg-surface/80 backdrop-blur-sm">
        <div className="flex items-center justify-between px-6 py-3">
          <div className="flex items-center gap-3">
            <Clock4 className="size-4 text-success" />
            <span className="text-sm font-semibold text-foreground">Follow Up</span>
            <span className="rounded-full bg-danger px-2 py-0.5 text-[11px] font-bold text-white">
              {OVERDUE.length} overdue
            </span>
          </div>
          <button className="flex h-8 items-center gap-1.5 rounded-lg border border-border bg-surface px-3 text-xs font-medium text-muted transition hover:bg-input">
            <RefreshCw className="size-3" /> Refresh
          </button>
        </div>
      </div>

      <div className="space-y-6 px-6 py-5">
        {/* Page title */}
        <div className="flex items-baseline gap-3">
          <h1 className="text-[22px] font-bold tracking-tight text-foreground">Follow-up Queue</h1>
          <span className="text-sm text-faint">{OVERDUE.length + DUE_TODAY.length + UPCOMING.length} total</span>
        </div>

        <Group label="Overdue" count={OVERDUE.length}   cases={OVERDUE}   color="bg-danger" />
        <Group label="Due today" count={DUE_TODAY.length} cases={DUE_TODAY} color="bg-warning" />
        <Group label="Upcoming" count={UPCOMING.length} cases={UPCOMING}  color="bg-primary" />
      </div>
    </main>
  )
}
