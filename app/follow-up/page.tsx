'use client'

import { CalendarCheck, CircleAlert, Clock, Calendar, PawPrint, User, Phone, Stethoscope, PhoneCall, FileText, SquareCheckBig, RefreshCw } from 'lucide-react'
import { Sidebar } from '@/components/sidebar'
import { Topbar } from '@/components/topbar'
import { Card } from '@/components/ui'

interface FUCase {
  name: string; species: string; breed: string; caseId: number
  owner: string; phone: string; doctor: string; diagnosis: string
  followUpDate: string; overdueDays: number
}

const OVERDUE: FUCase[] = [
  { name: 'Prxa',  species: 'Other', breed: 'Kurdish mix', caseId: 276, owner: 'Mzhda Fariq',   phone: '0770 144 6062', doctor: 'Dr. Othman', diagnosis: 'Spayd',                                       followUpDate: 'Thu, 28 May 2026', overdueDays: 30 },
  { name: 'Teto',  species: 'Cat',   breed: 'British',     caseId: 275, owner: 'Nada Shkur',    phone: '0773 800 2798', doctor: 'Dr. Othman', diagnosis: 'Bladder crystal',                              followUpDate: 'Thu, 28 May 2026', overdueDays: 30 },
  { name: 'Mario', species: 'Cat',   breed: 'Himalayan',   caseId: 249, owner: 'Shalaw Kawa',   phone: '07749 982 424', doctor: 'Dr. Othman', diagnosis: 'Start of pancreatitis',                        followUpDate: 'Fri, 29 May 2026', overdueDays: 29 },
  { name: 'Baran', species: 'Dog',   breed: 'Labrador',    caseId: 230, owner: 'Omar Salam',    phone: '07703 574 134', doctor: 'Dr. Shania', diagnosis: 'Suspected heart failure or blood parasite',    followUpDate: 'Sat, 30 May 2026', overdueDays: 28 },
  { name: 'Kiki',  species: 'Cat',   breed: 'Persian',     caseId: 220, owner: 'Layla Hassan',  phone: '0771 334 5566', doctor: 'Dr. Gullan', diagnosis: 'Post-op spay recovery',                        followUpDate: 'Mon, 1 Jun 2026',  overdueDays: 26 },
  { name: 'Rex',   species: 'Dog',   breed: 'German Shep', caseId: 215, owner: 'Ahmad Kareem',  phone: '0772 901 2233', doctor: 'Dr. Tablo',  diagnosis: 'Parvo treatment follow-up',                   followUpDate: 'Wed, 3 Jun 2026',  overdueDays: 24 },
]

const DUE_TODAY: FUCase[] = [
  { name: 'Luna',  species: 'Cat', breed: 'Siamese',         caseId: 310, owner: 'Sara Ahmed',  phone: '0773 456 7890', doctor: 'Dr. Shania', diagnosis: 'Respiratory infection', followUpDate: 'Today', overdueDays: 0 },
  { name: 'Buddy', species: 'Dog', breed: 'Golden Retriever', caseId: 308, owner: 'Kawa Ibrahim', phone: '0770 112 3344', doctor: 'Dr. Othman', diagnosis: 'Post-neutering check', followUpDate: 'Today', overdueDays: 0 },
]

const UPCOMING: FUCase[] = [
  { name: 'Mimi',  species: 'Cat', breed: 'Local',      caseId: 350, owner: 'Narin Aziz',  phone: '0771 667 8899', doctor: 'Dr. Gullan', diagnosis: 'Dental scaling recovery', followUpDate: 'Mon, 29 Jun 2026', overdueDays: -2 },
  { name: 'Rocky', species: 'Dog', breed: 'Rottweiler', caseId: 345, owner: 'Saman Hasan', phone: '0772 334 5566', doctor: 'Dr. Gyan',   diagnosis: 'Fracture plate follow-up', followUpDate: 'Tue, 30 Jun 2026', overdueDays: -3 },
]

function StatusBadge({ days }: { days: number }) {
  if (days > 0)  return <span className="rounded-full bg-danger-soft px-2 py-0.5 text-[11px] font-bold text-danger">{days}d overdue</span>
  if (days === 0) return <span className="rounded-full bg-warning-soft px-2 py-0.5 text-[11px] font-bold text-warning">Due today</span>
  return <span className="rounded-full bg-primary/10 px-2 py-0.5 text-[11px] font-bold text-primary">In {Math.abs(days)} days</span>
}

function CaseCard({ c }: { c: FUCase }) {
  return (
    <Card>
      <div
        className={`border-l-4 ${
          c.overdueDays > 0 ? 'border-danger' : c.overdueDays === 0 ? 'border-warning' : 'border-primary'
        } rounded-2xl`}
      >
        <div className="grid grid-cols-[1fr_auto] gap-4 p-5">
          <div className="min-w-0">
            {/* Top row */}
            <div className="mb-3 flex flex-wrap items-center gap-2">
              <PawPrint className="size-4 shrink-0 text-success" />
              <span className="text-[15px] font-bold text-foreground">{c.name}</span>
              <span className="rounded-full bg-success/10 px-2.5 py-0.5 text-xs font-medium text-success">
                {c.species}{c.breed ? ` · ${c.breed}` : ''}
              </span>
              <span className="text-xs text-faint">Case #{c.caseId}</span>
              <StatusBadge days={c.overdueDays} />
            </div>

            {/* Meta */}
            <div className="mb-3 flex flex-wrap gap-x-5 gap-y-1">
              <span className="flex items-center gap-1.5 text-sm text-muted">
                <User className="size-3.5 text-faint" />{c.owner}
              </span>
              <a href={`tel:${c.phone}`} className="flex items-center gap-1.5 text-sm font-medium text-primary">
                <Phone className="size-3.5" />{c.phone}
              </a>
              <span className="flex items-center gap-1.5 text-sm text-muted">
                <Stethoscope className="size-3.5 text-faint" />{c.doctor}
              </span>
            </div>

            {/* Diagnosis */}
            <div className="mb-4 rounded-lg bg-input px-3 py-2 text-xs text-muted">
              <span className="font-semibold text-foreground">Diagnosis: </span>{c.diagnosis}
            </div>

            {/* Actions */}
            <div className="flex flex-wrap gap-2">
              <a
                href={`tel:${c.phone}`}
                className="flex items-center gap-1.5 rounded-xl border border-primary/30 bg-primary/10 px-3.5 py-2 text-xs font-semibold text-primary transition hover:bg-primary/20"
              >
                <PhoneCall className="size-3.5" /> Call Owner
              </a>
              <button className="flex items-center gap-1.5 rounded-xl border border-primary/30 bg-primary/10 px-3.5 py-2 text-xs font-semibold text-primary transition hover:bg-primary/20">
                <FileText className="size-3.5" /> Open Case
              </button>
              <button className="flex items-center gap-1.5 rounded-xl border border-success/30 bg-success/10 px-3.5 py-2 text-xs font-semibold text-success transition hover:bg-success/20">
                <SquareCheckBig className="size-3.5" /> Mark Done
              </button>
            </div>
          </div>

          {/* Date badge */}
          <div
            className={`flex flex-col items-center justify-center rounded-xl px-4 py-3 text-center ${
              c.overdueDays > 0
                ? 'bg-danger-soft text-danger'
                : c.overdueDays === 0
                ? 'bg-warning-soft text-warning'
                : 'bg-primary/10 text-primary'
            }`}
          >
            <div className="mb-1 text-[10px] font-bold uppercase tracking-wider opacity-70">Follow Up</div>
            <div className="text-sm font-bold leading-snug">{c.followUpDate}</div>
          </div>
        </div>
      </div>
    </Card>
  )
}

function SectionHeader({ icon: Icon, label, count, color }: { icon: typeof CircleAlert; label: string; count: number; color: string }) {
  return (
    <div className="mb-3 flex items-center gap-2">
      <Icon className={`size-4 ${color}`} />
      <span className={`text-xs font-bold uppercase tracking-widest ${color}`}>{label}</span>
      <span className={`rounded-full px-2.5 py-0.5 text-xs font-bold ${
        label === 'OVERDUE' ? 'bg-danger-soft text-danger' :
        label === 'DUE TODAY' ? 'bg-warning-soft text-warning' :
        'bg-primary/10 text-primary'
      }`}>{count}</span>
    </div>
  )
}

export default function FollowUpPage() {
  return (
    <div className="flex h-screen overflow-hidden bg-background">
      <Sidebar />
      <div className="flex min-w-0 flex-1 flex-col">
        <Topbar />

        <main className="scroll-thin flex-1 overflow-y-auto px-6 py-6">
          {/* Page header */}
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h1 className="flex items-center gap-2 text-xl font-bold text-foreground">
                <CalendarCheck className="size-5 text-success" /> Follow Up
              </h1>
              <p className="mt-0.5 text-sm text-muted">
                Cases requiring a follow-up — {OVERDUE.length + DUE_TODAY.length + UPCOMING.length} total
              </p>
            </div>
            <button className="flex h-10 items-center gap-2 rounded-xl border border-border bg-surface px-4 text-sm font-medium text-muted transition hover:bg-input">
              <RefreshCw className="size-4" /> Refresh
            </button>
          </div>

          {/* Overdue */}
          <div className="mb-6">
            <SectionHeader icon={CircleAlert} label="OVERDUE" count={OVERDUE.length} color="text-danger" />
            <div className="space-y-2">{OVERDUE.map((c) => <CaseCard key={c.caseId} c={c} />)}</div>
          </div>

          {/* Due today */}
          <div className="mb-6">
            <SectionHeader icon={Clock} label="DUE TODAY" count={DUE_TODAY.length} color="text-warning" />
            <div className="space-y-2">{DUE_TODAY.map((c) => <CaseCard key={c.caseId} c={c} />)}</div>
          </div>

          {/* Upcoming */}
          <div className="mb-6">
            <SectionHeader icon={Calendar} label="UPCOMING" count={UPCOMING.length} color="text-primary" />
            <div className="space-y-2">{UPCOMING.map((c) => <CaseCard key={c.caseId} c={c} />)}</div>
          </div>
        </main>
      </div>
    </div>
  )
}
