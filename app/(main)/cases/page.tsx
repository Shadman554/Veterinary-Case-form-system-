'use client'

import { useState } from 'react'
import { Search, SlidersHorizontal, Plus } from 'lucide-react'
import Link from 'next/link'

const ALL = [
  { id: 714, date: '27/06/2026', session: 'Morning', stray: true,  emoji: '🐱', name: 'Pumpkin',   species: 'Cat',   breed: '',            sex: 'M', age: '',       owner: 'Blind Dler',      phone: '07709 548 844', doctor: 'Dr. Tablo',  diagnosis: 'Herpes virus' },
  { id: 713, date: '26/06/2026', session: 'Night',   stray: false, emoji: '🦜', name: 'Kale',      species: 'Bird',  breed: 'Cocktail',    sex: 'F', age: '2y 6m',  owner: 'Ayman Muhsin',    phone: '0773 165 4545', doctor: '',           diagnosis: '' },
  { id: 712, date: '26/06/2026', session: 'Morning', stray: false, emoji: '🐶', name: 'Stray Dog', species: 'Dog',   breed: 'Local',       sex: 'F', age: '',       owner: 'Hezha Akram',     phone: '0770 505 5484', doctor: 'Dr. Shania', diagnosis: 'Femur oblique displaced fracture' },
  { id: 711, date: '26/06/2026', session: 'Morning', stray: false, emoji: '🐱', name: 'Leo',       species: 'Cat',   breed: 'Shirazi',     sex: 'M', age: '',       owner: 'Las Dyary',       phone: '0772 104 1919', doctor: 'Dr. Shania', diagnosis: 'Ocular allergy' },
  { id: 710, date: '26/06/2026', session: 'Morning', stray: false, emoji: '🐾', name: 'Nuqul',     species: 'Other', breed: 'Scottish',    sex: 'F', age: '1y 9m',  owner: '—',               phone: '',              doctor: 'Dr. Shania', diagnosis: 'Deworming' },
  { id: 709, date: '26/06/2026', session: 'Morning', stray: false, emoji: '🐱', name: 'Stray',     species: 'Cat',   breed: 'Local',       sex: 'M', age: '',       owner: 'Rayan Osman',     phone: '0751 502 0732', doctor: 'Dr. Shania', diagnosis: 'Herpes virus' },
  { id: 708, date: '26/06/2026', session: 'Morning', stray: false, emoji: '🐱', name: 'Lalo',      species: 'Cat',   breed: 'Persian',     sex: 'M', age: '',       owner: 'Malik Raza',      phone: '07501 849 121', doctor: 'Dr. Shania', diagnosis: 'Annual vaccination' },
  { id: 707, date: '26/06/2026', session: 'Morning', stray: true,  emoji: '🐱', name: 'Sura',      species: 'Cat',   breed: 'DSH',         sex: 'M', age: '',       owner: 'Sahand Muhammad', phone: '07728 501 845', doctor: 'Dr. Shania', diagnosis: 'Otitis externa' },
  { id: 706, date: '25/06/2026', session: 'Night',   stray: false, emoji: '🐱', name: 'Beso',      species: 'Cat',   breed: 'Mix British', sex: 'F', age: '1y 6m',  owner: 'Manal Mussa',     phone: '07765 129 530', doctor: 'Dr. Gyan',   diagnosis: 'Mild pneumonia' },
  { id: 705, date: '25/06/2026', session: 'Night',   stray: false, emoji: '🐱', name: 'Leo',       species: 'Cat',   breed: 'British',     sex: 'M', age: '',       owner: 'Banaz Hamid',     phone: '07507 178 408', doctor: 'Dr. Othman', diagnosis: '' },
  { id: 704, date: '25/06/2026', session: 'Morning', stray: true,  emoji: '🐱', name: 'Stray',     species: 'Cat',   breed: 'Local',       sex: 'M', age: '3y',     owner: 'Kak Hedi',        phone: '0770 220 1488', doctor: 'Dr. Othman', diagnosis: '' },
  { id: 703, date: '25/06/2026', session: 'Morning', stray: false, emoji: '🐱', name: 'Hermes',    species: 'Cat',   breed: 'Local',       sex: 'F', age: '',       owner: 'Saida Rahman',    phone: '0773 167 1603', doctor: 'Dr. Gullan', diagnosis: '' },
  { id: 702, date: '25/06/2026', session: 'Morning', stray: false, emoji: '🐱', name: 'Snowy',     species: 'Cat',   breed: 'British',     sex: 'F', age: '',       owner: 'Nour Hassan',     phone: '0770 300 1122', doctor: 'Dr. Tablo',  diagnosis: 'URI' },
]

const SESSION_COLOR: Record<string, string> = {
  Morning: 'bg-warning/10 text-warning',
  Night:   'bg-navy/10 text-navy',
}

export default function CasesPage() {
  const [search, setSearch] = useState('')

  const filtered = ALL.filter((c) => {
    const q = search.toLowerCase()
    return !q || [c.name, c.owner, c.phone, String(c.id), c.diagnosis].some((v) => v.toLowerCase().includes(q))
  })

  // Group by date
  const grouped: { date: string; rows: typeof ALL }[] = []
  for (const c of filtered) {
    const last = grouped[grouped.length - 1]
    if (last && last.date === c.date) last.rows.push(c)
    else grouped.push({ date: c.date, rows: [c] })
  }

  return (
    <main className="scroll-thin flex-1 overflow-y-auto">
      {/* Top bar */}
      <div className="sticky top-0 z-10 border-b border-border bg-surface/80 backdrop-blur-sm">
        <div className="flex items-center gap-2 px-6 py-3">
          <div className="relative flex-1">
            <Search className="pointer-events-none absolute left-3 top-1/2 size-[15px] -translate-y-1/2 text-faint" />
            <input
              placeholder="Search by name, owner, phone, case #…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="h-9 w-full rounded-lg border border-border bg-input pl-9 pr-3 text-sm text-foreground outline-none placeholder:text-faint transition focus:border-primary focus:bg-surface focus:ring-2 focus:ring-primary/10"
            />
          </div>
          <button className="flex h-9 items-center gap-1.5 rounded-lg border border-border bg-surface px-3 text-xs font-medium text-muted transition hover:bg-input">
            <SlidersHorizontal className="size-3.5" /> Filter
          </button>
          <Link href="/" className="flex h-9 items-center gap-1.5 rounded-lg bg-success px-3 text-xs font-semibold text-white shadow-sm shadow-success/25 transition hover:bg-success/90">
            <Plus className="size-3.5" /> New Case
          </Link>
        </div>
      </div>

      <div className="px-6 py-5">
        {/* Stats row */}
        <div className="mb-5 flex items-baseline gap-3">
          <h1 className="text-[22px] font-bold tracking-tight text-foreground">Cases</h1>
          <span className="text-sm text-faint">{filtered.length} records</span>
        </div>

        {/* Date-grouped list */}
        <div className="space-y-5">
          {grouped.map(({ date, rows }) => (
            <div key={date}>
              {/* Date header */}
              <div className="mb-2 flex items-center gap-3">
                <span className="text-[11px] font-bold uppercase tracking-widest text-faint">{date}</span>
                <div className="h-px flex-1 bg-border" />
                <span className="text-[11px] text-faint">{rows.length} case{rows.length !== 1 ? 's' : ''}</span>
              </div>

              {/* Cases for this date */}
              <div className="overflow-hidden rounded-2xl border border-border bg-surface shadow-[0_1px_2px_rgba(15,23,42,0.04)]">
                {rows.map((c, i) => (
                  <button
                    key={c.id}
                    type="button"
                    className={`group grid w-full grid-cols-[64px_36px_1fr_1fr_1fr] items-center gap-0 text-left transition hover:bg-input/60 ${
                      i !== rows.length - 1 ? 'border-b border-border' : ''
                    }`}
                  >
                    {/* Case # */}
                    <div className="px-4 py-3.5">
                      <div className="text-[13px] font-bold text-success">#{c.id}</div>
                      <span className={`mt-1 inline-block rounded px-1.5 py-0.5 text-[9px] font-bold ${SESSION_COLOR[c.session]}`}>
                        {c.session === 'Morning' ? 'AM' : 'PM'}
                      </span>
                    </div>

                    {/* Emoji */}
                    <div className="py-3.5 text-lg leading-none">{c.emoji}</div>

                    {/* Patient */}
                    <div className="py-3.5 pr-4">
                      <div className="flex items-center gap-2">
                        <span className="text-[13px] font-semibold text-foreground">{c.name}</span>
                        {c.stray && (
                          <span className="rounded px-1.5 py-0.5 text-[9px] font-bold uppercase bg-warning/15 text-warning">Stray</span>
                        )}
                      </div>
                      <div className="mt-0.5 text-xs text-muted">
                        {c.species}{c.breed ? ` · ${c.breed}` : ''}{c.sex ? ` · ${c.sex}` : ''}{c.age ? ` · ${c.age}` : ''}
                      </div>
                    </div>

                    {/* Owner */}
                    <div className="border-l border-border/60 py-3.5 pl-4 pr-4">
                      <div className="text-[13px] font-medium text-foreground">{c.owner}</div>
                      {c.phone && <div className="mt-0.5 text-xs text-muted">{c.phone}</div>}
                      {c.doctor && <div className="mt-0.5 text-xs font-medium text-success">{c.doctor}</div>}
                    </div>

                    {/* Diagnosis */}
                    <div className="border-l border-border/60 py-3.5 pl-4 pr-5">
                      {c.diagnosis ? (
                        <span className="text-[13px] text-foreground">{c.diagnosis}</span>
                      ) : (
                        <span className="text-xs text-faint italic">No diagnosis recorded</span>
                      )}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  )
}
