'use client'

import { useState } from 'react'
import { Topbar } from '@/components/topbar'
import { Search, Calendar, Funnel } from 'lucide-react'

const CASES = [
  { id: 714, date: '27/06/2026', session: 'Morning', stray: true, emoji: '🐱', name: 'pumpkin', species: 'Cat', breed: '', sex: 'Male', age: '', owner: 'Blind dler', phone: '07709548844', doctor: 'Dr. Tablo', diagnosis: 'Herpes virus' },
  { id: 713, date: '26/06/2026', session: 'Night', stray: false, emoji: '🦜', name: 'kale', species: 'Bird', breed: 'Cocktail', sex: 'Female', age: '2y 6m', owner: 'Ayman muhsin', phone: '0773 165 4545', doctor: '', diagnosis: '—' },
  { id: 712, date: '26/06/2026', session: 'Morning', stray: false, emoji: '🐶', name: 'stray dog', species: 'Dog', breed: 'local', sex: 'Female', age: '', owner: 'hezha akram', phone: '0770 505 5484', doctor: 'Dr. Shania', diagnosis: 'Femur oblique displaced fracture' },
  { id: 711, date: '26/06/2026', session: 'Morning', stray: false, emoji: '🐱', name: 'leo', species: 'Cat', breed: 'sherazi', sex: 'Male', age: '', owner: 'Las dyary', phone: '0772 104 1919', doctor: 'Dr. Shania', diagnosis: 'Ocular allergy' },
  { id: 710, date: '26/06/2026', session: 'Morning', stray: false, emoji: '🐾', name: 'nuqul', species: 'Other', breed: 'scotish', sex: 'Female', age: '1y 9m', owner: '—', phone: '', doctor: 'Dr. Shania', diagnosis: 'Deworming' },
  { id: 709, date: '26/06/2026', session: 'Morning', stray: false, emoji: '🐱', name: 'stray', species: 'Cat', breed: 'Local', sex: 'Male', age: '', owner: 'Rayan osman', phone: '0751 502 0732', doctor: 'Dr. Shania', diagnosis: 'Herpes virus' },
  { id: 708, date: '26/06/2026', session: 'Morning', stray: false, emoji: '🐱', name: 'lalo', species: 'Cat', breed: 'persian', sex: 'Male', age: '', owner: 'Malik Raza', phone: '07501849121', doctor: 'Dr. Shania', diagnosis: 'Annual vaccination' },
  { id: 707, date: '26/06/2026', session: 'Morning', stray: true, emoji: '🐱', name: 'Sura', species: 'Cat', breed: 'DSH', sex: 'Male', age: '', owner: 'Sahand muhamad', phone: '07728501845', doctor: 'Dr. Shania', diagnosis: 'Otitis externa' },
  { id: 706, date: '25/06/2026', session: 'Night', stray: false, emoji: '🐱', name: 'beso', species: 'Cat', breed: 'Mix British', sex: 'Female', age: '1y 6m', owner: 'Manal mussa', phone: '07765129530', doctor: 'Dr. Gyan', diagnosis: 'MILD PNEUMONIA' },
  { id: 705, date: '25/06/2026', session: 'Night', stray: false, emoji: '🐱', name: 'leo', species: 'Cat', breed: 'british', sex: 'Male', age: '', owner: 'Banaz hamid', phone: '07507178408', doctor: 'Dr. Othman', diagnosis: '—' },
  { id: 704, date: '25/06/2026', session: 'Morning', stray: true, emoji: '🐱', name: 'stray', species: 'Cat', breed: 'local', sex: 'Male', age: '3y 0m', owner: 'Kak hedi', phone: '0770 220 1488', doctor: 'Dr. Othman', diagnosis: '—' },
  { id: 703, date: '25/06/2026', session: 'Morning', stray: false, emoji: '🐱', name: 'Hermes', species: 'Cat', breed: 'local', sex: 'Female', age: '', owner: 'SAIDA rahman', phone: '0773 167 1603', doctor: 'Dr. Gullan', diagnosis: '—', followUp: '25/07/2026' },
  { id: 702, date: '25/06/2026', session: 'Morning', stray: false, emoji: '🐱', name: 'Snowy', species: 'Cat', breed: 'british', sex: 'Female', age: '', owner: 'Nour hassan', phone: '0770 300 1122', doctor: 'Dr. Tablo', diagnosis: 'URI' },
]

export default function CasesPage() {
  const [search, setSearch] = useState('')

  const filtered = CASES.filter((c) => {
    const q = search.toLowerCase()
    return (
      c.name.toLowerCase().includes(q) ||
      c.owner.toLowerCase().includes(q) ||
      c.phone.includes(q) ||
      String(c.id).includes(q)
    )
  })

  return (
    <div className="flex h-screen flex-col overflow-hidden bg-background">
      <Topbar />
      <div className="flex-1 overflow-y-auto" style={{ background: 'rgb(232,236,239)', fontFamily: '"Segoe UI", Arial, sans-serif' }}>
        {/* Green header */}
        <div style={{ background: 'linear-gradient(135deg, rgb(29,114,60), rgb(20,93,46))', padding: '18px 24px 16px' }}>
          <div style={{ maxWidth: 980, margin: '0 auto' }}>
            <div style={{ fontSize: 20, fontWeight: 800, color: 'white', letterSpacing: 0.3, marginBottom: 14 }}>Cases</div>
            <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', alignItems: 'center' }}>
              <div style={{ flex: '1 1 260px', position: 'relative' }}>
                <Search style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: 'rgb(156,163,175)', pointerEvents: 'none', width: 16, height: 16 }} />
                <input
                  placeholder="Search patient, owner, contact or case #…"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  style={{ width: '100%', boxSizing: 'border-box', padding: '10px 12px 10px 38px', fontSize: 14, border: 'none', borderRadius: 8, outline: 'none', background: 'rgba(255,255,255,0.95)', color: 'rgb(26,26,46)' }}
                />
              </div>
              <button style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '10px 16px', fontSize: 13, fontWeight: 600, background: 'rgba(255,255,255,0.15)', border: '1.5px solid rgba(255,255,255,0.4)', borderRadius: 8, color: 'white', cursor: 'pointer', whiteSpace: 'nowrap' }}>
                <Calendar style={{ width: 14, height: 14 }} /> Date
              </button>
              <button style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '10px 16px', fontSize: 13, fontWeight: 600, background: 'rgba(255,255,255,0.15)', border: '1.5px solid rgba(255,255,255,0.4)', borderRadius: 8, color: 'white', cursor: 'pointer', whiteSpace: 'nowrap' }}>
                <Funnel style={{ width: 14, height: 14 }} /> Filters
              </button>
            </div>
          </div>
        </div>

        {/* Count */}
        <div style={{ maxWidth: 980, margin: '0 auto', padding: '10px 16px 0', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span style={{ fontSize: 12, color: 'rgb(107,114,128)', fontWeight: 600 }}>{filtered.length} cases found</span>
        </div>

        {/* Case list */}
        <div style={{ maxWidth: 980, margin: '0 auto', padding: '10px 16px 32px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {filtered.map((c) => (
              <button
                key={c.id}
                style={{ display: 'grid', gridTemplateColumns: '96px 1fr 1fr 1fr', gap: '0 14px', alignItems: 'center', textAlign: 'left', width: '100%', background: 'white', border: '1px solid rgb(208,213,221)', borderRadius: 10, padding: '12px 16px', cursor: 'pointer', boxShadow: 'rgba(0,0,0,0.06) 0px 1px 3px', transition: 'box-shadow 0.15s, border-color 0.15s', fontFamily: 'inherit' }}
              >
                {/* Col 1: ID, date, session, stray */}
                <div>
                  <div style={{ fontSize: 13, fontWeight: 800, color: 'rgb(29,114,60)' }}>#{c.id}</div>
                  <div style={{ fontSize: 11, color: 'rgb(107,114,128)', marginTop: 1 }}>{c.date}</div>
                  <div style={{ fontSize: 10, color: 'rgb(156,163,175)', marginTop: 1 }}>{c.session}</div>
                  {c.stray && (
                    <div style={{ fontSize: 10, fontWeight: 700, color: 'rgb(245,158,11)', marginTop: 3, background: 'rgb(255,251,235)', borderRadius: 4, padding: '1px 5px', display: 'inline-block', border: '1px solid rgb(253,230,138)' }}>STRAY</div>
                  )}
                </div>
                {/* Col 2: Patient */}
                <div>
                  <div style={{ fontSize: 14, fontWeight: 700, color: 'rgb(17,17,17)', display: 'flex', alignItems: 'center', gap: 5 }}>
                    <span style={{ fontSize: 16 }}>{c.emoji}</span>
                    <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{c.name}</span>
                  </div>
                  <div style={{ fontSize: 12, color: 'rgb(107,114,128)', marginTop: 2 }}>{c.species}{c.breed ? ` · ${c.breed}` : ''}</div>
                  {(c.sex || c.age) && <div style={{ fontSize: 11, color: 'rgb(156,163,175)', marginTop: 1 }}>{[c.sex, c.age].filter(Boolean).join(' · ')}</div>}
                </div>
                {/* Col 3: Owner */}
                <div>
                  <div style={{ fontSize: 13, fontWeight: 600, color: 'rgb(55,65,81)' }}>{c.owner}</div>
                  {c.phone && <div style={{ fontSize: 11, color: 'rgb(156,163,175)', marginTop: 2 }}>{c.phone}</div>}
                  {c.doctor && <div style={{ fontSize: 11, color: 'rgb(29,114,60)', fontWeight: 600, marginTop: 3 }}>{c.doctor}</div>}
                </div>
                {/* Col 4: Diagnosis */}
                <div>
                  <div style={{ fontSize: 12, color: 'rgb(55,65,81)', lineHeight: 1.4, marginBottom: 4 }}>{c.diagnosis}</div>
                  {(c as any).followUp && (
                    <span style={{ fontSize: 10, color: 'rgb(107,114,128)', marginTop: 2, display: 'block' }}>📅 Follow-up: {(c as any).followUp}</span>
                  )}
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
