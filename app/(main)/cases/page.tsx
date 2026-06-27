'use client'

import { useState } from 'react'
import { Search, Calendar, SlidersHorizontal, User, Phone, Stethoscope, AlertTriangle } from 'lucide-react'
import { Card } from '@/components/ui'

const CASES = [
  { id: 714, date: '27/06/2026', session: 'Morning', stray: true,  emoji: '🐱', name: 'Pumpkin',   species: 'Cat',   breed: '',            sex: 'Male',   age: '',       owner: 'Blind Dler',      phone: '07709 548 844', doctor: 'Dr. Tablo',  diagnosis: 'Herpes virus' },
  { id: 713, date: '26/06/2026', session: 'Night',   stray: false, emoji: '🦜', name: 'Kale',      species: 'Bird',  breed: 'Cocktail',    sex: 'Female', age: '2y 6m',  owner: 'Ayman Muhsin',    phone: '0773 165 4545', doctor: '',           diagnosis: '—' },
  { id: 712, date: '26/06/2026', session: 'Morning', stray: false, emoji: '🐶', name: 'Stray Dog', species: 'Dog',   breed: 'Local',       sex: 'Female', age: '',       owner: 'Hezha Akram',     phone: '0770 505 5484', doctor: 'Dr. Shania', diagnosis: 'Femur oblique displaced fracture' },
  { id: 711, date: '26/06/2026', session: 'Morning', stray: false, emoji: '🐱', name: 'Leo',       species: 'Cat',   breed: 'Shirazi',     sex: 'Male',   age: '',       owner: 'Las Dyary',       phone: '0772 104 1919', doctor: 'Dr. Shania', diagnosis: 'Ocular allergy' },
  { id: 710, date: '26/06/2026', session: 'Morning', stray: false, emoji: '🐾', name: 'Nuqul',     species: 'Other', breed: 'Scottish',    sex: 'Female', age: '1y 9m',  owner: '—',               phone: '',              doctor: 'Dr. Shania', diagnosis: 'Deworming' },
  { id: 709, date: '26/06/2026', session: 'Morning', stray: false, emoji: '🐱', name: 'Stray',     species: 'Cat',   breed: 'Local',       sex: 'Male',   age: '',       owner: 'Rayan Osman',     phone: '0751 502 0732', doctor: 'Dr. Shania', diagnosis: 'Herpes virus' },
  { id: 708, date: '26/06/2026', session: 'Morning', stray: false, emoji: '🐱', name: 'Lalo',      species: 'Cat',   breed: 'Persian',     sex: 'Male',   age: '',       owner: 'Malik Raza',      phone: '07501 849 121', doctor: 'Dr. Shania', diagnosis: 'Annual vaccination' },
  { id: 707, date: '26/06/2026', session: 'Morning', stray: true,  emoji: '🐱', name: 'Sura',      species: 'Cat',   breed: 'DSH',         sex: 'Male',   age: '',       owner: 'Sahand Muhammad', phone: '07728 501 845', doctor: 'Dr. Shania', diagnosis: 'Otitis externa' },
  { id: 706, date: '25/06/2026', session: 'Night',   stray: false, emoji: '🐱', name: 'Beso',      species: 'Cat',   breed: 'Mix British', sex: 'Female', age: '1y 6m',  owner: 'Manal Mussa',     phone: '07765 129 530', doctor: 'Dr. Gyan',   diagnosis: 'Mild pneumonia' },
  { id: 705, date: '25/06/2026', session: 'Night',   stray: false, emoji: '🐱', name: 'Leo',       species: 'Cat',   breed: 'British',     sex: 'Male',   age: '',       owner: 'Banaz Hamid',     phone: '07507 178 408', doctor: 'Dr. Othman', diagnosis: '—' },
  { id: 704, date: '25/06/2026', session: 'Morning', stray: true,  emoji: '🐱', name: 'Stray',     species: 'Cat',   breed: 'Local',       sex: 'Male',   age: '3y',     owner: 'Kak Hedi',        phone: '0770 220 1488', doctor: 'Dr. Othman', diagnosis: '—' },
  { id: 703, date: '25/06/2026', session: 'Morning', stray: false, emoji: '🐱', name: 'Hermes',    species: 'Cat',   breed: 'Local',       sex: 'Female', age: '',       owner: 'Saida Rahman',    phone: '0773 167 1603', doctor: 'Dr. Gullan', diagnosis: '—' },
  { id: 702, date: '25/06/2026', session: 'Morning', stray: false, emoji: '🐱', name: 'Snowy',     species: 'Cat',   breed: 'British',     sex: 'Female', age: '',       owner: 'Nour Hassan',     phone: '0770 300 1122', doctor: 'Dr. Tablo',  diagnosis: 'URI' },
]

export default function CasesPage() {
  const [search, setSearch] = useState('')

  const filtered = CASES.filter((c) => {
    const q = search.toLowerCase()
    return (
      c.name.toLowerCase().includes(q) ||
      c.owner.toLowerCase().includes(q) ||
      c.phone.includes(q) ||
      String(c.id).includes(q) ||
      c.diagnosis.toLowerCase().includes(q)
    )
  })

  return (
    <main className="scroll-thin flex-1 overflow-y-auto px-6 py-6">
      {/* Page header + search */}
      <div className="mb-5 flex flex-wrap items-center gap-3">
        <div>
          <h1 className="text-xl font-bold text-foreground">Cases</h1>
          <p className="mt-0.5 text-sm text-muted">{filtered.length} cases found</p>
        </div>

        <div className="relative ml-auto w-full max-w-sm">
          <Search className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-faint" />
          <input
            placeholder="Search patient, owner, contact or case #…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="h-11 w-full rounded-xl border border-border bg-surface pl-10 pr-3 text-sm outline-none transition focus:border-primary focus:ring-4 focus:ring-primary/10"
          />
        </div>

        <button className="flex h-11 items-center gap-2 rounded-xl border border-border bg-surface px-4 text-sm font-medium text-muted transition hover:bg-input">
          <Calendar className="size-4" /> Date
        </button>
        <button className="flex h-11 items-center gap-2 rounded-xl border border-border bg-surface px-4 text-sm font-medium text-muted transition hover:bg-input">
          <SlidersHorizontal className="size-4" /> Filters
        </button>
      </div>

      {/* Case rows */}
      <div className="space-y-2">
        {filtered.map((c) => (
          <Card key={c.id}>
            <button
              type="button"
              className="grid w-full grid-cols-[88px_1fr_1fr_1fr] items-start gap-4 px-5 py-4 text-left transition hover:bg-input/40"
            >
              {/* ID + date */}
              <div>
                <div className="text-sm font-bold text-success">#{c.id}</div>
                <div className="mt-0.5 text-xs text-muted">{c.date}</div>
                <div className="text-xs text-faint">{c.session}</div>
                {c.stray && (
                  <span className="mt-2 inline-flex items-center gap-1 rounded-md border border-warning/30 bg-warning-soft px-1.5 py-0.5 text-[10px] font-bold text-warning">
                    <AlertTriangle className="size-2.5" /> STRAY
                  </span>
                )}
              </div>

              {/* Patient */}
              <div className="min-w-0">
                <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
                  <span className="text-base">{c.emoji}</span>
                  <span className="truncate capitalize">{c.name}</span>
                </div>
                <div className="mt-0.5 text-xs text-muted">{c.species}{c.breed ? ` · ${c.breed}` : ''}</div>
                {(c.sex || c.age) && (
                  <div className="text-xs text-faint">{[c.sex, c.age].filter(Boolean).join(' · ')}</div>
                )}
              </div>

              {/* Owner */}
              <div className="min-w-0">
                <div className="flex items-center gap-1.5 text-sm font-medium text-foreground">
                  <User className="size-3.5 shrink-0 text-faint" />
                  <span className="truncate">{c.owner}</span>
                </div>
                {c.phone && (
                  <div className="mt-0.5 flex items-center gap-1.5 text-xs text-muted">
                    <Phone className="size-3 shrink-0 text-faint" />{c.phone}
                  </div>
                )}
                {c.doctor && (
                  <div className="mt-0.5 flex items-center gap-1.5 text-xs font-medium text-success">
                    <Stethoscope className="size-3 shrink-0" />{c.doctor}
                  </div>
                )}
              </div>

              {/* Diagnosis */}
              <div className="min-w-0 text-sm text-foreground">{c.diagnosis}</div>
            </button>
          </Card>
        ))}
      </div>
    </main>
  )
}
