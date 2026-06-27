'use client'

import { Topbar } from '@/components/topbar'
import { CalendarCheck, CircleAlert, RefreshCw, PawPrint, User, Phone, Stethoscope, PhoneCall, FileText, SquareCheckBig } from 'lucide-react'

const OVERDUE = [
  { name: 'prxa', species: 'Other', breed: 'Kurdish mix', caseId: 276, owner: 'Mzhda fariq', phone: '0770 144 6062', doctor: 'Dr. Othman', diagnosis: 'spayd', followUpDate: 'Thu, 28 May 2026', overdueDays: 30 },
  { name: 'teto', species: 'Cat', breed: 'British', caseId: 275, owner: 'Nada shkur', phone: '0773 800 2798', doctor: 'Dr. Othman', diagnosis: 'Bladder crystal', followUpDate: 'Thu, 28 May 2026', overdueDays: 30 },
  { name: 'mario', species: 'Cat', breed: 'himalayan', caseId: 249, owner: 'Shalaw kawa', phone: '07749982424', doctor: 'Dr. Othman', diagnosis: 'Start of pancreatitis', followUpDate: 'Fri, 29 May 2026', overdueDays: 29 },
  { name: 'baran', species: 'Dog', breed: 'Labrador', caseId: 230, owner: 'Omar Salam', phone: '07703574134', doctor: 'Dr. Shania', diagnosis: 'I suspected heart failure, or blood parasite', followUpDate: 'Sat, 30 May 2026', overdueDays: 28 },
  { name: 'kiki', species: 'Cat', breed: 'Persian', caseId: 220, owner: 'Layla Hassan', phone: '0771 334 5566', doctor: 'Dr. Gullan', diagnosis: 'Post-op spay recovery', followUpDate: 'Mon, 1 Jun 2026', overdueDays: 26 },
  { name: 'rex', species: 'Dog', breed: 'German Shepherd', caseId: 215, owner: 'Ahmad Kareem', phone: '0772 901 2233', doctor: 'Dr. Tablo', diagnosis: 'Parvo treatment follow-up', followUpDate: 'Wed, 3 Jun 2026', overdueDays: 24 },
]

const DUE_TODAY = [
  { name: 'luna', species: 'Cat', breed: 'Siamese', caseId: 310, owner: 'Sara Ahmed', phone: '0773 456 7890', doctor: 'Dr. Shania', diagnosis: 'Respiratory infection', followUpDate: 'Today', overdueDays: 0 },
  { name: 'buddy', species: 'Dog', breed: 'Golden Retriever', caseId: 308, owner: 'Kawa Ibrahim', phone: '0770 112 3344', doctor: 'Dr. Othman', diagnosis: 'Post-neutering check', followUpDate: 'Today', overdueDays: 0 },
]

const UPCOMING = [
  { name: 'mimi', species: 'Cat', breed: 'local', caseId: 350, owner: 'Narin Aziz', phone: '0771 667 8899', doctor: 'Dr. Gullan', diagnosis: 'Dental scaling recovery', followUpDate: 'Mon, 29 Jun 2026', overdueDays: -2 },
  { name: 'rocky', species: 'Dog', breed: 'Rottweiler', caseId: 345, owner: 'Saman Hasan', phone: '0772 334 5566', doctor: 'Dr. Gyan', diagnosis: 'Fracture plate follow-up', followUpDate: 'Tue, 30 Jun 2026', overdueDays: -3 },
]

interface FollowUpCase {
  name: string
  species: string
  breed: string
  caseId: number
  owner: string
  phone: string
  doctor: string
  diagnosis: string
  followUpDate: string
  overdueDays: number
}

function CaseCard({ c, borderColor, bgColor, textColor }: { c: FollowUpCase; borderColor: string; bgColor: string; textColor: string }) {
  return (
    <div style={{ background: 'white', borderRadius: 9, boxShadow: 'rgba(0,0,0,0.07) 0px 2px 10px', borderLeft: `4px solid ${borderColor}`, overflow: 'hidden' }}>
      <div style={{ padding: '14px 18px', display: 'grid', gridTemplateColumns: '1fr auto', gap: 12, alignItems: 'start' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
            <PawPrint style={{ width: 15, height: 15, color: 'hsl(142,60%,28%)' }} />
            <span style={{ fontSize: 15, fontWeight: 800, color: 'rgb(26,26,46)' }}>{c.name}</span>
            <span style={{ fontSize: 11.5, background: 'rgb(240,253,244)', color: 'rgb(29,114,60)', borderRadius: 20, padding: '1px 9px', fontWeight: 600 }}>{c.species}{c.breed ? ` · ${c.breed}` : ''}</span>
            <span style={{ fontSize: 11, color: 'rgb(156,163,175)', marginLeft: 2 }}>Case #{c.caseId}</span>
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px 20px', marginBottom: 8 }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: 12.5, color: 'rgb(55,65,81)' }}>
              <User style={{ width: 12, height: 12, color: '#9ca3af' }} /> {c.owner}
            </span>
            <a href={`tel:${c.phone}`} style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: 12.5, color: 'rgb(29,78,216)', textDecoration: 'none', fontWeight: 600 }}>
              <Phone style={{ width: 12, height: 12, color: '#1d4ed8' }} /> {c.phone}
            </a>
            <span style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: 12.5, color: 'rgb(55,65,81)' }}>
              <Stethoscope style={{ width: 12, height: 12, color: '#9ca3af' }} /> {c.doctor}
            </span>
          </div>
          <div style={{ fontSize: 11.5, color: 'rgb(107,114,128)', background: 'rgb(249,250,251)', borderRadius: 5, padding: '5px 10px' }}>
            <strong style={{ color: 'rgb(55,65,81)' }}>Diagnosis:</strong> {c.diagnosis}
          </div>
          <div style={{ display: 'flex', gap: 8, marginTop: 12, flexWrap: 'wrap' }}>
            <a href={`tel:${c.phone}`} style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '7px 14px', fontSize: 12.5, fontWeight: 700, background: 'rgb(239,246,255)', color: 'rgb(29,78,216)', border: '1.5px solid rgb(191,219,254)', borderRadius: 7, textDecoration: 'none', cursor: 'pointer' }}>
              <PhoneCall style={{ width: 13, height: 13 }} /> Call Owner
            </a>
            <button style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '7px 14px', fontSize: 12.5, fontWeight: 700, background: 'rgb(239,246,255)', color: 'rgb(29,78,216)', border: '1.5px solid rgb(191,219,254)', borderRadius: 7, cursor: 'pointer' }}>
              <FileText style={{ width: 13, height: 13 }} /> Open Case
            </button>
            <button style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '7px 14px', fontSize: 12.5, fontWeight: 700, background: 'rgb(240,253,244)', color: 'rgb(29,114,60)', border: '1.5px solid rgb(187,247,208)', borderRadius: 7, cursor: 'pointer' }}>
              <SquareCheckBig style={{ width: 13, height: 13 }} /> Mark Done
            </button>
          </div>
        </div>
        <div style={{ textAlign: 'center', background: bgColor, border: `1px solid ${borderColor}33`, borderRadius: 8, padding: '10px 16px', minWidth: 120 }}>
          <div style={{ fontSize: 10, fontWeight: 700, color: textColor, textTransform: 'uppercase', letterSpacing: 0.8, marginBottom: 4 }}>Follow Up</div>
          <div style={{ fontSize: 13, fontWeight: 800, color: textColor }}>{c.followUpDate}</div>
          {c.overdueDays > 0 && (
            <div style={{ fontSize: 11, color: textColor, marginTop: 3, fontWeight: 600 }}>{c.overdueDays} days overdue</div>
          )}
          {c.overdueDays === 0 && (
            <div style={{ fontSize: 11, color: textColor, marginTop: 3, fontWeight: 600 }}>Due today</div>
          )}
          {c.overdueDays < 0 && (
            <div style={{ fontSize: 11, color: textColor, marginTop: 3, fontWeight: 600 }}>In {Math.abs(c.overdueDays)} days</div>
          )}
        </div>
      </div>
    </div>
  )
}

export default function FollowUpPage() {
  const total = OVERDUE.length + DUE_TODAY.length + UPCOMING.length

  return (
    <div className="flex h-screen flex-col overflow-hidden bg-background">
      <Topbar />
      <div className="flex-1 overflow-y-auto" style={{ background: 'rgb(232,236,239)', padding: '20px 16px', fontFamily: '"Segoe UI", Arial, sans-serif' }}>
        <div style={{ maxWidth: 960, margin: '0 auto' }}>
          {/* Header */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
            <div>
              <h1 style={{ fontSize: 22, fontWeight: 900, color: 'rgb(29,114,60)', margin: 0, letterSpacing: 0.5, display: 'flex', alignItems: 'center', gap: 8 }}>
                <CalendarCheck style={{ width: 22, height: 22 }} /> Follow Up
              </h1>
              <p style={{ fontSize: 12.5, color: 'rgb(107,114,128)', margin: '4px 0 0' }}>Cases that require a follow-up visit — {total} total</p>
            </div>
            <button style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '8px 16px', fontSize: 13, fontWeight: 700, background: 'white', color: 'rgb(55,65,81)', border: '1px solid rgb(209,213,219)', borderRadius: 7, cursor: 'pointer' }}>
              <RefreshCw style={{ width: 14, height: 14 }} /> Refresh
            </button>
          </div>

          {/* Overdue section */}
          <div style={{ marginBottom: 20 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
              <CircleAlert style={{ width: 16, height: 16, color: '#b91c1c' }} />
              <span style={{ fontSize: 13, fontWeight: 800, color: 'rgb(185,28,28)', textTransform: 'uppercase', letterSpacing: 0.8 }}>Overdue</span>
              <span style={{ fontSize: 12, background: 'rgb(254,242,242)', color: 'rgb(185,28,28)', border: '1px solid rgba(185,28,28,0.133)', borderRadius: 20, padding: '1px 10px', fontWeight: 700 }}>{OVERDUE.length}</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {OVERDUE.map((c) => (
                <CaseCard key={c.caseId} c={c} borderColor="rgb(185,28,28)" bgColor="rgb(254,242,242)" textColor="rgb(185,28,28)" />
              ))}
            </div>
          </div>

          {/* Due Today section */}
          <div style={{ marginBottom: 20 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
              <CalendarCheck style={{ width: 16, height: 16, color: '#d97706' }} />
              <span style={{ fontSize: 13, fontWeight: 800, color: 'rgb(217,119,6)', textTransform: 'uppercase', letterSpacing: 0.8 }}>Due Today</span>
              <span style={{ fontSize: 12, background: 'rgb(255,251,235)', color: 'rgb(217,119,6)', border: '1px solid rgba(217,119,6,0.2)', borderRadius: 20, padding: '1px 10px', fontWeight: 700 }}>{DUE_TODAY.length}</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {DUE_TODAY.map((c) => (
                <CaseCard key={c.caseId} c={c} borderColor="rgb(217,119,6)" bgColor="rgb(255,251,235)" textColor="rgb(217,119,6)" />
              ))}
            </div>
          </div>

          {/* Upcoming section */}
          <div style={{ marginBottom: 20 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
              <CalendarCheck style={{ width: 16, height: 16, color: '#1d72b8' }} />
              <span style={{ fontSize: 13, fontWeight: 800, color: 'rgb(29,114,184)', textTransform: 'uppercase', letterSpacing: 0.8 }}>Upcoming</span>
              <span style={{ fontSize: 12, background: 'rgb(239,246,255)', color: 'rgb(29,114,184)', border: '1px solid rgba(29,114,184,0.2)', borderRadius: 20, padding: '1px 10px', fontWeight: 700 }}>{UPCOMING.length}</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {UPCOMING.map((c) => (
                <CaseCard key={c.caseId} c={c} borderColor="rgb(29,114,184)" bgColor="rgb(239,246,255)" textColor="rgb(29,114,184)" />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
