'use client'

import { useState, useEffect } from 'react'
import { Topbar } from '@/components/topbar'
import { Plus, Archive, Save, Printer, CircleArrowRight, Clock, Pencil } from 'lucide-react'

interface ConsentForm {
  id: string
  ownerName: string
  patientName: string
  status: 'complete' | 'incomplete'
  createdAt: string
}

interface FormData {
  formNo: string
  ownerName: string
  ownerPhone: string
  patientName: string
  stray: boolean
  species: string[]
  ageYr: string
  ageMo: string
  gender: string
  weight: string
  microchip: string
  breed: string
  neutered: string
  vaccinated: string
  previousSurgery: string
  illness: string
  allergyAnesthesia: string
  fastingDuration: string
  doctor: string
  technician: string
  typeOfOperation: string
  anesthesiaDosage: string
  opTimeStart: string
  opTimeEnd: string
  labTestDeclined: boolean
  ownerSig: string
  doctorSig: string
}

const DEFAULT_FORM: FormData = {
  formNo: '', ownerName: '', ownerPhone: '', patientName: '', stray: false,
  species: [], ageYr: '', ageMo: '', gender: '', weight: '', microchip: '',
  breed: '', neutered: '', vaccinated: '', previousSurgery: '', illness: '',
  allergyAnesthesia: '', fastingDuration: '', doctor: '', technician: '',
  typeOfOperation: '', anesthesiaDosage: '', opTimeStart: '', opTimeEnd: '',
  labTestDeclined: false, ownerSig: '', doctorSig: '',
}

const DOCTORS = ['Gullan', 'Gyan', 'Othman', 'Shania', 'Tablo']
const TECHNICIANS = ['Halwest', 'Mohammed', 'Shadman']

export default function ConsentPage() {
  const [forms, setForms] = useState<ConsentForm[]>([
    { id: '1', ownerName: 'No owner yet', patientName: 'New Form', status: 'incomplete', createdAt: 'just now' },
  ])
  const [activeId, setActiveId] = useState('1')
  const [formData, setFormData] = useState<FormData>({ ...DEFAULT_FORM })
  const [dateStr, setDateStr] = useState('')
  const [timeStr, setTimeStr] = useState('')

  useEffect(() => {
    const now = new Date()
    setDateStr(now.toLocaleDateString('en-GB'))
    setTimeStr(now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }))
  }, [])

  function newForm() {
    const id = String(Date.now())
    setForms((prev) => [{ id, ownerName: 'No owner yet', patientName: 'New Form', status: 'incomplete', createdAt: 'just now' }, ...prev])
    setActiveId(id)
    setFormData({ ...DEFAULT_FORM })
  }

  function set(field: keyof FormData, value: string | boolean | string[]) {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  function toggleSpecies(s: string) {
    setFormData((prev) => ({
      ...prev,
      species: prev.species.includes(s) ? prev.species.filter((x) => x !== s) : [...prev.species, s],
    }))
  }

  const frow: React.CSSProperties = { display: 'flex', alignItems: 'center', borderBottom: '1px solid rgb(240,242,245)', padding: '4px 0', minHeight: 44 }
  const label: React.CSSProperties = { minWidth: 120, maxWidth: 120, fontSize: 13, color: 'rgb(107,114,128)', fontWeight: 600, paddingRight: 8, flexShrink: 0 }
  const labelWide: React.CSSProperties = { ...label, minWidth: 160, maxWidth: 160 }
  const input: React.CSSProperties = { background: 'transparent', borderTop: 'none', borderLeft: 'none', borderRight: 'none', borderBottom: '1.5px solid rgb(208,213,221)', outline: 'none', fontSize: 15, fontFamily: 'inherit', padding: '6px 4px', flex: 1, minWidth: 0, color: 'rgb(26,26,46)' }
  const radioBox: React.CSSProperties = { display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: 22, height: 22, border: '2px solid rgb(156,163,175)', borderRadius: '50%', background: 'white', flexShrink: 0 }
  const checkBox: React.CSSProperties = { display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: 22, height: 22, border: '2px solid rgb(156,163,175)', borderRadius: 4, background: 'white', flexShrink: 0 }

  function Radio({ name, value, current, onChange }: { name: string; value: string; current: string; onChange: (v: string) => void }) {
    const checked = current === value
    return (
      <label style={{ display: 'flex', alignItems: 'center', gap: 6, cursor: 'pointer', fontSize: 14, userSelect: 'none', color: 'rgb(55,65,81)', minHeight: 44 }}>
        <span onClick={() => onChange(value)} style={{ ...radioBox, border: checked ? '2px solid rgb(29,114,60)' : '2px solid rgb(156,163,175)', background: checked ? 'rgb(29,114,60)' : 'white' }}>
          {checked && <span style={{ width: 8, height: 8, borderRadius: '50%', background: 'white', display: 'block' }} />}
        </span>
        {value}
      </label>
    )
  }

  function Checkbox({ value, checked, onChange, label: lbl }: { value: string; checked: boolean; onChange: () => void; label: string }) {
    return (
      <label style={{ display: 'flex', alignItems: 'center', gap: 6, cursor: 'pointer', fontSize: 14, userSelect: 'none', color: 'rgb(55,65,81)', minHeight: 44 }}>
        <span onClick={onChange} style={{ ...checkBox, border: checked ? '2px solid rgb(29,114,60)' : '2px solid rgb(156,163,175)', background: checked ? 'rgb(29,114,60)' : 'white' }}>
          {checked && <span style={{ color: 'white', fontSize: 14, fontWeight: 700, lineHeight: 1 }}>✓</span>}
        </span>
        {lbl}
      </label>
    )
  }

  return (
    <div className="flex h-screen flex-col overflow-hidden bg-background">
      <Topbar />
      <div className="flex flex-1 overflow-hidden" style={{ background: 'rgb(232,236,239)', fontFamily: '"Segoe UI", Arial, sans-serif' }}>

        {/* Sidebar */}
        <div style={{ width: 260, minHeight: '100%', background: 'white', borderRight: '1px solid rgb(229,231,235)', boxShadow: 'rgba(0,0,0,0.07) 2px 0px 12px', display: 'flex', flexDirection: 'column', overflowHidden: 'hidden', flexShrink: 0 } as React.CSSProperties}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 14px 12px', borderBottom: '1px solid rgb(240,242,245)', flexShrink: 0 }}>
            <span style={{ fontSize: 13, fontWeight: 800, textTransform: 'uppercase', letterSpacing: 0.8, color: 'rgb(20,93,46)' }}>Consent Forms</span>
            <button onClick={newForm} title="New consent form" style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'rgb(29,114,60)', padding: 8, borderRadius: 6, display: 'flex', alignItems: 'center', justifyContent: 'center', minWidth: 36, minHeight: 36 }}>
              <Plus style={{ width: 18, height: 18 }} />
            </button>
          </div>
          <div style={{ flex: 1, overflowY: 'auto', padding: '4px 8px 12px', display: 'flex', flexDirection: 'column' }}>
            {forms.map((f) => (
              <div
                key={f.id}
                onClick={() => setActiveId(f.id)}
                style={{ background: activeId === f.id ? 'rgb(237,248,241)' : 'transparent', border: activeId === f.id ? '1.5px solid rgb(29,114,60)' : '1.5px solid transparent', borderRadius: 8, marginBottom: 6, cursor: 'pointer', padding: '12px 10px', position: 'relative' }}
              >
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: 8 }}>
                  <Clock style={{ width: 18, height: 18, color: '#9ca3af', marginTop: 2, flexShrink: 0 }} />
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: 14, fontWeight: 700, color: 'rgb(26,26,46)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{f.patientName}</div>
                    <div style={{ fontSize: 12, color: 'rgb(107,114,128)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', marginTop: 2 }}>{f.ownerName}</div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 5, marginTop: 4 }}>
                      <span style={{ fontSize: 11, color: 'rgb(156,163,175)' }}>{f.status === 'complete' ? 'Complete' : 'Incomplete'}</span>
                      <span style={{ fontSize: 11, color: 'rgb(196,201,212)', marginLeft: 'auto' }}>{f.createdAt}</span>
                    </div>
                  </div>
                  <button title="Archive" style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'rgb(209,213,219)', padding: 5, borderRadius: 4, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Archive style={{ width: 14, height: 14 }} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Main form area */}
        <div className="flex-1 overflow-y-auto" style={{ padding: 16, minWidth: 0 }}>
          {/* Action bar */}
          <div style={{ maxWidth: 900, margin: '0 auto 12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
            <button onClick={newForm} style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '10px 18px', fontSize: 14, fontWeight: 600, border: '1.5px solid rgb(29,114,60)', borderRadius: 8, background: 'rgb(29,114,60)', color: 'white', cursor: 'pointer', minHeight: 44 }}>
              <Plus style={{ width: 16, height: 16 }} /> New Form
            </button>
            <div style={{ position: 'relative', flex: 1, maxWidth: 360 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, background: 'white', border: '1px solid rgb(208,213,221)', borderRadius: 8, padding: '8px 12px', boxShadow: 'rgba(0,0,0,0.07) 0px 1px 3px' }}>
                <input placeholder="Search by patient, owner, or contact..." type="text" style={{ border: 'none', outline: 'none', fontSize: 15, flex: 1, color: 'rgb(26,26,46)', background: 'transparent' }} />
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <button style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '10px 18px', fontSize: 14, fontWeight: 600, border: '1.5px solid rgb(59,130,246)', borderRadius: 8, background: 'white', color: 'rgb(59,130,246)', cursor: 'pointer', minHeight: 44 }}>
                <CircleArrowRight style={{ width: 16, height: 16 }} /> Create Post-Surgery Case
              </button>
              <button onClick={() => window.print()} style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '10px 18px', fontSize: 14, fontWeight: 500, border: '1.5px solid rgb(29,114,60)', borderRadius: 8, background: 'white', color: 'rgb(29,114,60)', cursor: 'pointer', minHeight: 44 }}>
                <Printer style={{ width: 16, height: 16 }} /> Print Form
              </button>
              <button style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '10px 20px', fontSize: 14, fontWeight: 700, borderRadius: 8, background: 'rgb(29,114,60)', color: 'white', border: 'none', cursor: 'pointer', minHeight: 44 }}>
                <Save style={{ width: 16, height: 16 }} /> Save Form
              </button>
            </div>
          </div>

          {/* Form document */}
          <div style={{ maxWidth: 900, margin: '0 auto', background: 'white', fontFamily: '"Segoe UI", Arial, sans-serif', boxShadow: 'rgba(0,0,0,0.13) 0px 4px 24px', borderRadius: 2, overflow: 'hidden' }}>

            {/* Header */}
            <div style={{ borderTop: '5px solid rgb(29,114,60)', background: 'white', padding: '12px 20px 10px', display: 'grid', gridTemplateColumns: '1fr auto 1fr', alignItems: 'center', gap: 12, borderBottom: '2px solid rgb(29,114,60)' }}>
              <div>
                <div style={{ fontSize: 10, fontWeight: 700, textTransform: 'uppercase', color: 'rgb(156,163,175)', letterSpacing: 1, marginBottom: 3 }}>Form No.</div>
                <input value={formData.formNo} onChange={(e) => set('formNo', e.target.value)} placeholder="_ _ _ _" style={{ fontSize: 22, fontWeight: 900, color: 'rgb(26,26,46)', letterSpacing: 1, background: 'transparent', border: 'none', outline: 'none', width: '100%', fontFamily: 'inherit' }} />
              </div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <div style={{ fontSize: 18, fontWeight: 900, color: 'rgb(29,114,60)', textAlign: 'center' }}>🏥 Royal Vet</div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, justifyContent: 'flex-end', marginBottom: 6 }}>
                  <span style={{ fontSize: 11.5, fontWeight: 700, color: 'rgb(85,85,85)' }}>Date :</span>
                  <span style={{ fontSize: 13, fontWeight: 600, color: 'rgb(26,26,46)', background: 'rgb(249,250,251)', border: '1px solid rgb(208,213,221)', borderRadius: 4, padding: '2px 10px', minWidth: 100, textAlign: 'center', display: 'inline-block' }}>{dateStr}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, justifyContent: 'flex-end' }}>
                  <span style={{ fontSize: 11.5, fontWeight: 700, color: 'rgb(85,85,85)' }}>Time :</span>
                  <span style={{ fontSize: 13, fontWeight: 600, color: 'rgb(26,26,46)', background: 'rgb(249,250,251)', border: '1px solid rgb(208,213,221)', borderRadius: 4, padding: '2px 10px', minWidth: 80, textAlign: 'center', display: 'inline-block' }}>{timeStr}</span>
                </div>
              </div>
            </div>

            {/* Title bar */}
            <div style={{ background: 'linear-gradient(90deg, rgb(29,114,60) 0%, rgb(39,134,74) 100%)', padding: '10px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span style={{ fontSize: 16, fontWeight: 900, textTransform: 'uppercase', color: 'white', letterSpacing: 2 }}>Consent Form</span>
              <span style={{ fontSize: 13, fontWeight: 600, color: 'rgba(255,255,255,0.9)' }}>فۆرمی رەزامەندی نەشتەرگەری</span>
            </div>

            {/* Pet / Owner Info */}
            <div style={{ borderBottom: '1px solid rgb(229,231,235)' }}>
              <div style={{ background: 'linear-gradient(90deg, rgb(29,114,60) 0%, rgb(39,134,74) 100%)', padding: '8px 20px' }}>
                <span style={{ fontSize: 13, fontWeight: 800, textTransform: 'uppercase', color: 'white', letterSpacing: 1.5 }}>Pet / Owner Information</span>
              </div>
              <div style={{ padding: '10px 20px 4px' }}>
                {/* Owner Name */}
                <div style={frow}>
                  <span style={label}>Owner Name</span>
                  <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: 6 }}>
                    <input value={formData.ownerName} onChange={(e) => set('ownerName', e.target.value)} style={input} />
                  </div>
                </div>
                {/* Phone */}
                <div style={frow}>
                  <span style={label}>Phone</span>
                  <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: 6 }}>
                    <input value={formData.ownerPhone} onChange={(e) => set('ownerPhone', e.target.value)} type="tel" style={input} />
                  </div>
                </div>
                {/* Patient Name */}
                <div style={frow}>
                  <span style={label}>Patient Name</span>
                  <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: 6 }}>
                    <input value={formData.patientName} onChange={(e) => set('patientName', e.target.value)} style={input} />
                    <button
                      onClick={() => set('stray', !formData.stray)}
                      style={{ display: 'inline-flex', alignItems: 'center', gap: 4, padding: '4px 10px', fontSize: 12, fontWeight: 700, background: formData.stray ? 'rgb(255,251,235)' : 'white', color: formData.stray ? 'rgb(245,158,11)' : 'rgb(156,163,175)', border: `1.5px solid ${formData.stray ? 'rgb(253,230,138)' : 'rgb(209,213,219)'}`, borderRadius: 6, cursor: 'pointer', whiteSpace: 'nowrap' }}
                    >
                      Stray
                    </button>
                  </div>
                </div>
                {/* Species */}
                <div style={frow}>
                  <span style={label}>Species</span>
                  <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: 6 }}>
                    <div style={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                      {['Cat', 'Dog', 'Bird', 'Others'].map((s) => (
                        <Checkbox key={s} value={s} checked={formData.species.includes(s)} onChange={() => toggleSpecies(s)} label={s} />
                      ))}
                    </div>
                  </div>
                </div>
                {/* Age */}
                <div style={frow}>
                  <span style={label}>Age</span>
                  <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: 6 }}>
                    <input min={0} type="number" value={formData.ageYr} onChange={(e) => set('ageYr', e.target.value)} style={{ width: 42, background: 'transparent', border: 'none', borderBottom: '1.5px solid rgb(208,213,221)', outline: 'none', fontSize: 15, fontFamily: 'inherit', padding: '6px 4px', textAlign: 'center', color: 'rgb(26,26,46)' }} />
                    <span style={{ fontSize: 12, color: 'rgb(107,114,128)' }}>Yr</span>
                    <input min={0} max={11} type="number" value={formData.ageMo} onChange={(e) => set('ageMo', e.target.value)} style={{ width: 42, background: 'transparent', border: 'none', borderBottom: '1.5px solid rgb(208,213,221)', outline: 'none', fontSize: 15, fontFamily: 'inherit', padding: '6px 4px', textAlign: 'center', color: 'rgb(26,26,46)' }} />
                    <span style={{ fontSize: 12, color: 'rgb(107,114,128)' }}>Mo</span>
                  </div>
                </div>
                {/* Gender */}
                <div style={frow}>
                  <span style={label}>Gender</span>
                  <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: 6 }}>
                    <div style={{ display: 'flex', gap: 12 }}>
                      <Radio name="gender" value="Male" current={formData.gender} onChange={(v) => set('gender', v)} />
                      <Radio name="gender" value="Female" current={formData.gender} onChange={(v) => set('gender', v)} />
                    </div>
                  </div>
                </div>
                {/* Weight */}
                <div style={frow}>
                  <span style={label}>Weight</span>
                  <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: 6 }}>
                    <input min={0} step={0.1} type="number" value={formData.weight} onChange={(e) => set('weight', e.target.value)} style={{ width: 60, background: 'transparent', border: 'none', borderBottom: '1.5px solid rgb(208,213,221)', outline: 'none', fontSize: 15, fontFamily: 'inherit', padding: '6px 4px', textAlign: 'center', color: 'rgb(26,26,46)' }} />
                    <span style={{ fontSize: 12, color: 'rgb(107,114,128)' }}>Kg</span>
                  </div>
                </div>
                {/* Microchip */}
                <div style={frow}>
                  <span style={label}>Microchip No.</span>
                  <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: 6 }}>
                    <input placeholder="Optional" value={formData.microchip} onChange={(e) => set('microchip', e.target.value)} style={input} />
                  </div>
                </div>
                {/* Breed */}
                <div style={frow}>
                  <span style={label}>Breed</span>
                  <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: 6 }}>
                    <input value={formData.breed} onChange={(e) => set('breed', e.target.value)} style={input} />
                  </div>
                </div>
                {/* Neutered */}
                <div style={frow}>
                  <span style={label}>Neutered / Spayed</span>
                  <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: 6 }}>
                    <div style={{ display: 'flex', gap: 12 }}>
                      <Radio name="neutered" value="Yes" current={formData.neutered} onChange={(v) => set('neutered', v)} />
                      <Radio name="neutered" value="No" current={formData.neutered} onChange={(v) => set('neutered', v)} />
                    </div>
                  </div>
                </div>
                {/* Vaccinated */}
                <div style={frow}>
                  <span style={label}>Vaccinated</span>
                  <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: 6 }}>
                    <div style={{ display: 'flex', gap: 12 }}>
                      <Radio name="vaccinated" value="Yes" current={formData.vaccinated} onChange={(v) => set('vaccinated', v)} />
                      <Radio name="vaccinated" value="No" current={formData.vaccinated} onChange={(v) => set('vaccinated', v)} />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Medical & Procedure Details */}
            <div style={{ borderBottom: '1px solid rgb(229,231,235)' }}>
              <div style={{ display: 'flex', alignItems: 'center', background: 'linear-gradient(90deg, rgb(237,248,241) 0%, rgb(240,250,244) 100%)', borderBottom: '1px solid rgb(184,216,194)', padding: '8px 20px' }}>
                <span style={{ fontSize: 13, fontWeight: 800, textTransform: 'uppercase', letterSpacing: 0.8, color: 'rgb(20,93,46)' }}>Medical &amp; Procedure Details</span>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1px 1fr' }}>
                <div style={{ padding: '10px 16px 10px 20px' }}>
                  {[
                    { field: 'previousSurgery' as keyof FormData, lbl: 'Previous Surgery', placeholder: '' },
                    { field: 'illness' as keyof FormData, lbl: 'Illness', placeholder: '' },
                    { field: 'allergyAnesthesia' as keyof FormData, lbl: 'Allergy for Anesthesia', placeholder: '' },
                    { field: 'fastingDuration' as keyof FormData, lbl: 'Fasting Duration', placeholder: 'e.g. 10 hrs' },
                  ].map(({ field, lbl, placeholder }) => (
                    <div key={field} style={frow}>
                      <span style={labelWide}>{lbl}</span>
                      <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: 6 }}>
                        <input placeholder={placeholder} value={formData[field] as string} onChange={(e) => set(field, e.target.value)} style={input} />
                      </div>
                    </div>
                  ))}
                  {/* Doctor */}
                  <div style={frow}>
                    <span style={labelWide}>Doctor</span>
                    <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: 6 }}>
                      <select value={formData.doctor} onChange={(e) => set('doctor', e.target.value)} style={{ flex: 1, background: 'transparent', border: 'none', borderBottom: '1.5px solid rgb(208,213,221)', outline: 'none', fontSize: 15, fontFamily: 'inherit', padding: '6px 4px', cursor: 'pointer' }}>
                        <option value="">— Select Doctor —</option>
                        {DOCTORS.map((d) => <option key={d} value={d}>{d}</option>)}
                      </select>
                    </div>
                  </div>
                  {/* Technician */}
                  <div style={frow}>
                    <span style={labelWide}>Technician</span>
                    <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: 6 }}>
                      <select value={formData.technician} onChange={(e) => set('technician', e.target.value)} style={{ flex: 1, background: 'transparent', border: 'none', borderBottom: '1.5px solid rgb(208,213,221)', outline: 'none', fontSize: 15, fontFamily: 'inherit', padding: '6px 4px', cursor: 'pointer' }}>
                        <option value="">— Select Technician —</option>
                        {TECHNICIANS.map((t) => <option key={t} value={t}>{t}</option>)}
                      </select>
                    </div>
                  </div>
                </div>
                <div style={{ background: 'rgb(229,231,235)' }} />
                <div style={{ padding: '10px 20px 10px 16px' }}>
                  <div style={frow}>
                    <span style={{ ...label, minWidth: 150, maxWidth: 150 }}>Type of Operation</span>
                    <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: 6 }}>
                      <input value={formData.typeOfOperation} onChange={(e) => set('typeOfOperation', e.target.value)} style={input} />
                    </div>
                  </div>
                  <div style={frow}>
                    <span style={{ ...label, minWidth: 150, maxWidth: 150 }}>Anaesthesia Dosage</span>
                    <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: 6 }}>
                      <input placeholder="e.g. 0.3x Kg" value={formData.anesthesiaDosage} onChange={(e) => set('anesthesiaDosage', e.target.value)} style={input} />
                    </div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', borderBottom: '1px solid rgb(240,242,245)', padding: '4px 0', minHeight: 44, gap: 12 }}>
                    <span style={{ fontSize: 13, color: 'rgb(107,114,128)', fontWeight: 600, flexShrink: 0, minWidth: 150 }}>Operation Time</span>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <span style={{ fontSize: 12, color: 'rgb(156,163,175)' }}>Start</span>
                      <input type="text" value={formData.opTimeStart} onChange={(e) => set('opTimeStart', e.target.value)} style={{ width: 70, background: 'transparent', border: 'none', borderBottom: '1.5px solid rgb(208,213,221)', outline: 'none', fontSize: 15, fontFamily: 'inherit', padding: '6px 4px', textAlign: 'center', color: 'rgb(26,26,46)' }} />
                      <span style={{ fontSize: 12, color: 'rgb(156,163,175)' }}>End</span>
                      <input type="text" value={formData.opTimeEnd} onChange={(e) => set('opTimeEnd', e.target.value)} style={{ width: 70, background: 'transparent', border: 'none', borderBottom: '1.5px solid rgb(208,213,221)', outline: 'none', fontSize: 15, fontFamily: 'inherit', padding: '6px 4px', textAlign: 'center', color: 'rgb(26,26,46)' }} />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Consent Agreement */}
            <div style={{ borderBottom: '1px solid rgb(229,231,235)' }}>
              <div style={{ display: 'flex', alignItems: 'center', background: 'linear-gradient(90deg, rgb(237,248,241) 0%, rgb(240,250,244) 100%)', borderBottom: '1px solid rgb(184,216,194)', padding: '8px 20px' }}>
                <span style={{ fontSize: 13, fontWeight: 800, textTransform: 'uppercase', letterSpacing: 0.8, color: 'rgb(20,93,46)' }}>Consent Agreement</span>
              </div>
              <div style={{ padding: '14px 20px', display: 'flex', flexDirection: 'column', gap: 10 }}>
                <div style={{ background: 'rgb(237,248,241)', borderRadius: 6, padding: '12px 16px', border: '1px solid rgb(184,216,194)' }}>
                  <p style={{ fontSize: 13, lineHeight: 2, textAlign: 'right', direction: 'rtl', margin: 0, color: 'rgb(26,26,46)' }}>
                    من وەک خاوەنی ئەم ئاژەڵەی کە لەم فۆرمەدا ناو و زانیاریەکانی نوسراوە، وە لە خوارەوەی ئەم لاپەڕەیە ناو ئیمزای خۆم کردووە، ڕەزامەندی خۆم دەدەم بە ستافی نەخۆشخانەی ڤێتیرنەری ڕۆیاڵ، بۆ ئەنجامدانی نەشتەرگەری لەژێر هۆشبەری گشتی (بنج عام) و کاری پێویست بۆ ئاژەڵەکەم.
                  </p>
                  <p style={{ fontSize: 13, lineHeight: 2, textAlign: 'right', direction: 'rtl', margin: '8px 0 0', color: 'rgb(26,26,46)' }}>
                    وە هەروەها من ڕوونکردنەوەی تەواوم پێدراوە سەبارەت بە نەشتەرگەریەکە و هۆکاری ئەنجامدانی نەشتەرگەریەکە و ئەو مەترسیانەی کە لەوانەیە بەهۆی ئەم نەشتەرگەریە یاخود هۆشبڕی گشتی توشی ئاژەڵەکەم ببێت، لەوانە (هەستیاری بە هۆشبڕی گشتی، مردن، خوێن بەربوون، هەوکردن و درەنگ چاکبوونەوەی برین، ئازاری زۆر، گۆڕانی ڕەفتار)
                  </p>
                </div>
                <div style={{ padding: '4px 2px' }}>
                  <p style={{ fontSize: 13, lineHeight: 1.85, margin: 0, color: 'rgb(26,26,46)' }}>
                    I, as the owner of the animal whose name and information are written on this form, and signed at the bottom of this page, give my consent to the staff of the Royal Veterinary Hospital, to perform surgery under general anesthesia.
                  </p>
                  <p style={{ fontSize: 13, lineHeight: 1.85, margin: '8px 0 0', color: 'rgb(26,26,46)' }}>
                    I have also been given a full explanation of the surgery, the reason for the surgery and the risks that may result from this surgery or general anesthesia, including (sensitivity to general anesthesia — death, bleeding, infection and slow wound healing, severe pain, behavioral changes).
                  </p>
                </div>
                <div style={{ background: 'rgb(250,250,250)', borderRadius: 6, padding: '12px 16px', border: '1px solid rgb(229,231,235)' }}>
                  <p style={{ fontSize: 13, lineHeight: 2, textAlign: 'right', direction: 'rtl', margin: 0, color: 'rgb(26,26,46)' }}>
                    أنا، باعتباري مالك الحيوان الذي كتب اسمه ومعلوماته في هذا النموذج، ووقعت في أسفل هذه الصفحة، أمنح موافقتي لموظفي المستشفى البيطري رۆیاڵ، لإجراء عملية جراحية تحت التخدير العام.
                  </p>
                  <p style={{ fontSize: 13, lineHeight: 2, textAlign: 'right', direction: 'rtl', margin: '8px 0 0', color: 'rgb(26,26,46)' }}>
                    كما تم إعطائي شرح كامل عن العملية الجراحية وسبب إجراء العملية والمخاطر التي قد تنتج عن هذه العملية أو التخدير العام ومنها (الحساسية للتخدير العام، الوفاة، النزيف، العدوى وبطء التئام الجروح، الألم الشديد، التغيرات السلوكية).
                  </p>
                </div>
              </div>
            </div>

            {/* Lab test declined */}
            <div style={{ padding: '10px 20px 16px' }}>
              <label style={{ display: 'flex', alignItems: 'flex-start', gap: 10, cursor: 'pointer', userSelect: 'none' }}>
                <input
                  type="checkbox"
                  checked={formData.labTestDeclined}
                  onChange={(e) => set('labTestDeclined', e.target.checked)}
                  style={{ marginTop: 3, width: 17, height: 17, accentColor: 'rgb(29,114,60)', flexShrink: 0, cursor: 'pointer' }}
                />
                <span style={{ fontSize: 14, lineHeight: 1.75, direction: 'rtl', color: 'rgb(26,26,46)' }}>لەسەر ڕەزامەندی خۆی نەیویستوە پشکنینی تاقیگەیی بۆ بکرێت</span>
              </label>
            </div>

            {/* Signatures */}
            <div>
              <div style={{ display: 'flex', alignItems: 'center', background: 'linear-gradient(90deg, rgb(237,248,241) 0%, rgb(240,250,244) 100%)', borderBottom: '1px solid rgb(184,216,194)', padding: '8px 20px' }}>
                <span style={{ fontSize: 13, fontWeight: 800, textTransform: 'uppercase', letterSpacing: 0.8, color: 'rgb(20,93,46)' }}>Signatures</span>
              </div>
              <div style={{ padding: '20px 20px 28px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 32 }}>
                {[
                  { key: 'ownerSig', title: "Owner's Signature", arabic: 'إمضاء صاحب الحيوان' },
                  { key: 'doctorSig', title: "Doctor's Signature", arabic: 'إمضاء الطبيب' },
                ].map(({ key, title, arabic }) => (
                  <div key={key} style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                    <button style={{ width: '100%', minHeight: 72, border: '2px dashed rgb(209,213,219)', borderRadius: 10, background: 'rgb(250,250,250)', cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 6, padding: 10 }}>
                      <Pencil style={{ width: 28, height: 28, color: 'hsl(142,60%,28%)' }} />
                      <span style={{ fontSize: 13, color: 'rgb(107,114,128)', fontWeight: 600 }}>Tap to Sign</span>
                    </button>
                    <div>
                      <div style={{ fontSize: 13, fontWeight: 700, color: 'rgb(55,65,81)' }}>{title}</div>
                      <div style={{ fontSize: 11, color: 'rgb(156,163,175)' }}>{arabic}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Footer bar */}
            <div style={{ background: 'rgb(29,114,60)', height: 6 }} />
          </div>
        </div>
      </div>
    </div>
  )
}
