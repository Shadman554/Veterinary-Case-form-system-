'use client'

import { useState, useEffect } from 'react'
import { Plus, Archive, Save, Printer, CircleArrowRight, Clock, PenLine } from 'lucide-react'
import { Sidebar } from '@/components/sidebar'
import { Topbar } from '@/components/topbar'
import { Card, Section, Field, inputClasses } from '@/components/ui'
import { FileText, PawPrint, Stethoscope, ShieldCheck } from 'lucide-react'

interface ConsentForm { id: string; ownerName: string; patientName: string; status: 'complete' | 'incomplete'; createdAt: string }

interface FormData {
  formNo: string; ownerName: string; ownerPhone: string; patientName: string; stray: boolean
  species: string[]; ageYr: string; ageMo: string; gender: string; weight: string
  microchip: string; breed: string; neutered: string; vaccinated: string
  previousSurgery: string; illness: string; allergyAnesthesia: string; fastingDuration: string
  doctor: string; technician: string; typeOfOperation: string; anesthesiaDosage: string
  opTimeStart: string; opTimeEnd: string; labTestDeclined: boolean
}

const BLANK: FormData = {
  formNo: '', ownerName: '', ownerPhone: '', patientName: '', stray: false,
  species: [], ageYr: '', ageMo: '', gender: '', weight: '', microchip: '', breed: '',
  neutered: '', vaccinated: '', previousSurgery: '', illness: '', allergyAnesthesia: '',
  fastingDuration: '', doctor: '', technician: '', typeOfOperation: '', anesthesiaDosage: '',
  opTimeStart: '', opTimeEnd: '', labTestDeclined: false,
}

const DOCTORS = ['Gullan', 'Gyan', 'Othman', 'Shania', 'Tablo']
const TECHNICIANS = ['Halwest', 'Mohammed', 'Shadman']

/* ── small reusable pill toggle ── */
function PillToggle({ label, active, onClick }: { label: string; active: boolean; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-xl border px-4 py-2.5 text-sm font-medium transition ${
        active
          ? 'border-primary bg-primary/10 text-primary'
          : 'border-border bg-input text-muted hover:border-primary/30 hover:text-foreground'
      }`}
    >
      {label}
    </button>
  )
}

function CheckPill({ label, checked, onToggle }: { label: string; checked: boolean; onToggle: () => void }) {
  return (
    <button
      type="button"
      onClick={onToggle}
      className={`flex items-center gap-2 rounded-xl border px-4 py-2.5 text-sm font-medium transition ${
        checked
          ? 'border-success bg-success/10 text-success'
          : 'border-border bg-input text-muted hover:border-success/30 hover:text-foreground'
      }`}
    >
      <span className={`flex size-4 items-center justify-center rounded-md border transition ${checked ? 'border-success bg-success text-white' : 'border-faint'}`}>
        {checked && (
          <svg viewBox="0 0 12 12" className="size-3" fill="none">
            <path d="M2.5 6.2l2.2 2.2 4.8-4.8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        )}
      </span>
      {label}
    </button>
  )
}

export default function ConsentPage() {
  const [forms, setForms] = useState<ConsentForm[]>([
    { id: '1', ownerName: 'No owner yet', patientName: 'New Form', status: 'incomplete', createdAt: 'just now' },
  ])
  const [activeId, setActiveId] = useState('1')
  const [fd, setFd] = useState<FormData>({ ...BLANK })
  const [dateStr, setDateStr] = useState('')
  const [timeStr, setTimeStr] = useState('')

  useEffect(() => {
    const now = new Date()
    setDateStr(now.toLocaleDateString('en-GB'))
    setTimeStr(now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }))
  }, [])

  function newForm() {
    const id = String(Date.now())
    setForms((p) => [{ id, ownerName: 'No owner yet', patientName: 'New Form', status: 'incomplete', createdAt: 'just now' }, ...p])
    setActiveId(id)
    setFd({ ...BLANK })
  }

  function set<K extends keyof FormData>(k: K, v: FormData[K]) { setFd((p) => ({ ...p, [k]: v })) }

  function toggleSpecies(s: string) {
    setFd((p) => ({ ...p, species: p.species.includes(s) ? p.species.filter((x) => x !== s) : [...p.species, s] }))
  }

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      <Sidebar />
      <div className="flex min-w-0 flex-1 flex-col">
        <Topbar />

        <div className="flex min-h-0 flex-1 overflow-hidden">
          {/* Left panel — form list */}
          <aside className="scroll-thin flex w-64 shrink-0 flex-col overflow-y-auto border-r border-border bg-surface">
            <div className="flex items-center justify-between border-b border-border px-4 py-3">
              <span className="text-[13px] font-bold uppercase tracking-wider text-success">Consent Forms</span>
              <button onClick={newForm} title="New form" className="flex size-8 items-center justify-center rounded-lg text-muted transition hover:bg-input hover:text-foreground">
                <Plus className="size-4" />
              </button>
            </div>

            <div className="flex-1 space-y-1 p-2">
              {forms.map((f) => (
                <button
                  key={f.id}
                  onClick={() => setActiveId(f.id)}
                  className={`flex w-full items-start gap-2.5 rounded-xl p-3 text-left transition ${
                    activeId === f.id ? 'bg-success/10 ring-1 ring-success/30' : 'hover:bg-input'
                  }`}
                >
                  <Clock className="mt-0.5 size-4 shrink-0 text-faint" />
                  <div className="min-w-0 flex-1">
                    <div className="truncate text-sm font-semibold text-foreground">{f.patientName}</div>
                    <div className="truncate text-xs text-muted">{f.ownerName}</div>
                    <div className="mt-1 flex items-center justify-between">
                      <span className={`text-[11px] font-medium ${f.status === 'complete' ? 'text-success' : 'text-faint'}`}>
                        {f.status === 'complete' ? 'Complete' : 'Incomplete'}
                      </span>
                      <span className="text-[11px] text-faint">{f.createdAt}</span>
                    </div>
                  </div>
                  <button onClick={(e) => e.stopPropagation()} className="mt-0.5 rounded p-0.5 text-faint hover:text-muted">
                    <Archive className="size-3.5" />
                  </button>
                </button>
              ))}
            </div>
          </aside>

          {/* Main form area */}
          <main className="scroll-thin min-w-0 flex-1 overflow-y-auto">
            <div className="mx-auto max-w-3xl space-y-4 px-6 py-6">
              {/* Action bar */}
              <div className="flex flex-wrap items-center gap-2">
                <button onClick={newForm} className="flex h-10 items-center gap-2 rounded-xl bg-success px-4 text-sm font-semibold text-white shadow shadow-success/20 transition hover:bg-success/90">
                  <Plus className="size-4" /> New Form
                </button>
                <div className="flex-1" />
                <button className="flex h-10 items-center gap-2 rounded-xl border border-primary/40 bg-primary/10 px-4 text-sm font-semibold text-primary transition hover:bg-primary/20">
                  <CircleArrowRight className="size-4" /> Post-Surgery Case
                </button>
                <button onClick={() => window.print()} className="flex h-10 items-center gap-2 rounded-xl border border-border bg-surface px-4 text-sm font-medium text-muted transition hover:bg-input">
                  <Printer className="size-4" /> Print
                </button>
                <button className="flex h-10 items-center gap-2 rounded-xl bg-primary px-4 text-sm font-semibold text-white shadow shadow-primary/20 transition hover:bg-primary-hover">
                  <Save className="size-4" /> Save Form
                </button>
              </div>

              {/* Form header card */}
              <Card>
                <div className="flex items-center justify-between border-b border-border px-5 py-4">
                  <div>
                    <div className="text-[11px] font-semibold uppercase tracking-wider text-faint">Form No.</div>
                    <input
                      value={fd.formNo}
                      onChange={(e) => set('formNo', e.target.value)}
                      placeholder="_ _ _ _"
                      className="mt-0.5 w-28 bg-transparent text-2xl font-black text-foreground outline-none placeholder:text-faint"
                    />
                  </div>
                  <div className="text-center">
                    <div className="text-sm font-bold text-success">🏥 Royal Vet Hospital</div>
                    <div className="mt-0.5 text-xs font-bold uppercase tracking-widest text-muted">Consent Form</div>
                    <div className="mt-0.5 text-xs text-faint">فۆرمی رەزامەندی نەشتەرگەری</div>
                  </div>
                  <div className="text-right text-sm">
                    <div className="flex items-center justify-end gap-2 text-muted">
                      <span className="text-xs font-semibold">Date:</span>
                      <span className="rounded-lg border border-border bg-input px-3 py-1 text-sm font-medium text-foreground">{dateStr}</span>
                    </div>
                    <div className="mt-1.5 flex items-center justify-end gap-2 text-muted">
                      <span className="text-xs font-semibold">Time:</span>
                      <span className="rounded-lg border border-border bg-input px-3 py-1 text-sm font-medium text-foreground">{timeStr}</span>
                    </div>
                  </div>
                </div>
              </Card>

              {/* Pet / Owner Info */}
              <Section title="Pet / Owner Information" icon={PawPrint} accent="success">
                <div className="grid grid-cols-2 gap-4">
                  <Field label="Owner Name" required>
                    <input value={fd.ownerName} onChange={(e) => set('ownerName', e.target.value)} className={inputClasses} />
                  </Field>
                  <Field label="Phone">
                    <input value={fd.ownerPhone} onChange={(e) => set('ownerPhone', e.target.value)} type="tel" className={inputClasses} />
                  </Field>
                  <Field label="Patient Name" required className="col-span-2">
                    <div className="flex gap-2">
                      <input value={fd.patientName} onChange={(e) => set('patientName', e.target.value)} className={`${inputClasses} flex-1`} />
                      <button
                        type="button"
                        onClick={() => set('stray', !fd.stray)}
                        className={`shrink-0 rounded-xl border px-4 text-sm font-semibold transition ${
                          fd.stray
                            ? 'border-warning bg-warning-soft text-warning'
                            : 'border-border bg-input text-muted hover:border-warning/40 hover:text-warning'
                        }`}
                      >
                        Stray
                      </button>
                    </div>
                  </Field>
                  <Field label="Species" className="col-span-2">
                    <div className="flex flex-wrap gap-2">
                      {['Cat', 'Dog', 'Bird', 'Others'].map((s) => (
                        <CheckPill key={s} label={s} checked={fd.species.includes(s)} onToggle={() => toggleSpecies(s)} />
                      ))}
                    </div>
                  </Field>
                  <Field label="Age">
                    <div className="flex items-center gap-2">
                      <input min={0} type="number" value={fd.ageYr} onChange={(e) => set('ageYr', e.target.value)} className="h-11 w-20 rounded-xl border border-border bg-input px-3 text-center text-sm outline-none focus:border-primary focus:ring-4 focus:ring-primary/10" />
                      <span className="text-sm text-muted">Yr</span>
                      <input min={0} max={11} type="number" value={fd.ageMo} onChange={(e) => set('ageMo', e.target.value)} className="h-11 w-20 rounded-xl border border-border bg-input px-3 text-center text-sm outline-none focus:border-primary focus:ring-4 focus:ring-primary/10" />
                      <span className="text-sm text-muted">Mo</span>
                    </div>
                  </Field>
                  <Field label="Gender">
                    <div className="flex gap-3">
                      {['Male', 'Female'].map((g) => (
                        <PillToggle key={g} label={g} active={fd.gender === g} onClick={() => set('gender', g)} />
                      ))}
                    </div>
                  </Field>
                  <Field label="Weight">
                    <div className="flex items-center gap-2">
                      <input min={0} step={0.1} type="number" value={fd.weight} onChange={(e) => set('weight', e.target.value)} className="h-11 w-24 rounded-xl border border-border bg-input px-3 text-center text-sm outline-none focus:border-primary focus:ring-4 focus:ring-primary/10" />
                      <span className="text-sm text-muted">Kg</span>
                    </div>
                  </Field>
                  <Field label="Microchip No.">
                    <input placeholder="Optional" value={fd.microchip} onChange={(e) => set('microchip', e.target.value)} className={inputClasses} />
                  </Field>
                  <Field label="Breed" className="col-span-2">
                    <input value={fd.breed} onChange={(e) => set('breed', e.target.value)} className={inputClasses} />
                  </Field>
                  <Field label="Neutered / Spayed">
                    <div className="flex gap-3">
                      {['Yes', 'No'].map((v) => (
                        <PillToggle key={v} label={v} active={fd.neutered === v} onClick={() => set('neutered', v)} />
                      ))}
                    </div>
                  </Field>
                  <Field label="Vaccinated">
                    <div className="flex gap-3">
                      {['Yes', 'No'].map((v) => (
                        <PillToggle key={v} label={v} active={fd.vaccinated === v} onClick={() => set('vaccinated', v)} />
                      ))}
                    </div>
                  </Field>
                </div>
              </Section>

              {/* Medical & Procedure Details */}
              <Section title="Medical & Procedure Details" icon={Stethoscope} accent="primary">
                <div className="grid grid-cols-2 gap-4">
                  <Field label="Previous Surgery">
                    <input value={fd.previousSurgery} onChange={(e) => set('previousSurgery', e.target.value)} className={inputClasses} />
                  </Field>
                  <Field label="Illness">
                    <input value={fd.illness} onChange={(e) => set('illness', e.target.value)} className={inputClasses} />
                  </Field>
                  <Field label="Allergy for Anesthesia">
                    <input value={fd.allergyAnesthesia} onChange={(e) => set('allergyAnesthesia', e.target.value)} className={inputClasses} />
                  </Field>
                  <Field label="Fasting Duration">
                    <input placeholder="e.g. 10 hrs" value={fd.fastingDuration} onChange={(e) => set('fastingDuration', e.target.value)} className={inputClasses} />
                  </Field>
                  <Field label="Doctor">
                    <select value={fd.doctor} onChange={(e) => set('doctor', e.target.value)} className={inputClasses}>
                      <option value="">— Select Doctor —</option>
                      {DOCTORS.map((d) => <option key={d} value={d}>{d}</option>)}
                    </select>
                  </Field>
                  <Field label="Technician">
                    <select value={fd.technician} onChange={(e) => set('technician', e.target.value)} className={inputClasses}>
                      <option value="">— Select Technician —</option>
                      {TECHNICIANS.map((t) => <option key={t} value={t}>{t}</option>)}
                    </select>
                  </Field>
                  <Field label="Type of Operation" className="col-span-2">
                    <input value={fd.typeOfOperation} onChange={(e) => set('typeOfOperation', e.target.value)} className={inputClasses} />
                  </Field>
                  <Field label="Anaesthesia Dosage">
                    <input placeholder="e.g. 0.3x Kg" value={fd.anesthesiaDosage} onChange={(e) => set('anesthesiaDosage', e.target.value)} className={inputClasses} />
                  </Field>
                  <Field label="Operation Time">
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-faint">Start</span>
                      <input type="text" value={fd.opTimeStart} onChange={(e) => set('opTimeStart', e.target.value)} className="h-11 w-24 rounded-xl border border-border bg-input px-3 text-center text-sm outline-none focus:border-primary focus:ring-4 focus:ring-primary/10" />
                      <span className="text-xs text-faint">End</span>
                      <input type="text" value={fd.opTimeEnd} onChange={(e) => set('opTimeEnd', e.target.value)} className="h-11 w-24 rounded-xl border border-border bg-input px-3 text-center text-sm outline-none focus:border-primary focus:ring-4 focus:ring-primary/10" />
                    </div>
                  </Field>
                </div>
              </Section>

              {/* Consent Agreement */}
              <Section title="Consent Agreement" icon={ShieldCheck} accent="warning">
                <div className="space-y-4">
                  <div className="rounded-xl border border-success/20 bg-success/5 p-4">
                    <p className="text-right text-sm leading-loose text-foreground" dir="rtl">
                      من وەک خاوەنی ئەم ئاژەڵەی کە لەم فۆرمەدا ناو و زانیاریەکانی نوسراوە، وە لە خوارەوەی ئەم لاپەڕەیە ناو ئیمزای خۆم کردووە، ڕەزامەندی خۆم دەدەم بە ستافی نەخۆشخانەی ڤێتیرنەری ڕۆیاڵ، بۆ ئەنجامدانی نەشتەرگەری لەژێر هۆشبەری گشتی (بنج عام) و کاری پێویست بۆ ئاژەڵەکەم.
                    </p>
                    <p className="mt-3 text-right text-sm leading-loose text-foreground" dir="rtl">
                      وە هەروەها من ڕوونکردنەوەی تەواوم پێدراوە سەبارەت بە نەشتەرگەریەکە و هۆکاری ئەنجامدانی نەشتەرگەریەکە و ئەو مەترسیانەی کە لەوانەیە بەهۆی ئەم نەشتەرگەریە یاخود هۆشبڕی گشتی توشی ئاژەڵەکەم ببێت.
                    </p>
                  </div>
                  <div className="rounded-xl border border-border bg-input p-4">
                    <p className="text-sm leading-relaxed text-foreground">
                      I, as the owner of the animal whose name and information are written on this form, and signed at the bottom of this page, give my consent to the staff of the Royal Veterinary Hospital, to perform surgery under general anesthesia.
                    </p>
                    <p className="mt-3 text-sm leading-relaxed text-foreground">
                      I have also been given a full explanation of the surgery, the reason for the surgery and the risks that may result, including (sensitivity to general anesthesia, death, bleeding, infection, slow wound healing, severe pain, behavioral changes).
                    </p>
                  </div>
                  <div className="rounded-xl border border-border bg-surface p-4">
                    <p className="text-right text-sm leading-loose text-foreground" dir="rtl">
                      أنا، باعتباري مالك الحيوان الذي كتب اسمه ومعلوماته في هذا النموذج، ووقعت في أسفل هذه الصفحة، أمنح موافقتي لموظفي المستشفى البيطري رۆیاڵ، لإجراء عملية جراحية تحت التخدير العام.
                    </p>
                  </div>
                  <label className="flex cursor-pointer items-start gap-3">
                    <input
                      type="checkbox"
                      checked={fd.labTestDeclined}
                      onChange={(e) => set('labTestDeclined', e.target.checked)}
                      className="mt-1 size-4 cursor-pointer accent-success"
                    />
                    <span className="text-sm leading-relaxed text-foreground" dir="rtl">
                      لەسەر ڕەزامەندی خۆی نەیویستوە پشکنینی تاقیگەیی بۆ بکرێت
                    </span>
                  </label>
                </div>
              </Section>

              {/* Signatures */}
              <Section title="Signatures" icon={PenLine} accent="navy">
                <div className="grid grid-cols-2 gap-6">
                  {[
                    { label: "Owner's Signature", sub: 'إمضاء صاحب الحيوان' },
                    { label: "Doctor's Signature", sub: 'إمضاء الطبيب' },
                  ].map(({ label, sub }) => (
                    <div key={label}>
                      <button className="flex w-full cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed border-border bg-input py-8 transition hover:border-success/40 hover:bg-success/5">
                        <PenLine className="size-7 text-success/50" />
                        <span className="text-sm font-medium text-muted">Tap to Sign</span>
                      </button>
                      <div className="mt-2">
                        <div className="text-sm font-semibold text-foreground">{label}</div>
                        <div className="text-xs text-faint">{sub}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </Section>
            </div>
          </main>
        </div>
      </div>
    </div>
  )
}
