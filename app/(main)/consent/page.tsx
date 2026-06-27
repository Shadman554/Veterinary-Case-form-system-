'use client'

import { useState, useId, useEffect } from 'react'
import { User, PawPrint, Stethoscope, ShieldCheck, PenLine, Cat, Dog, Bird, Rabbit, Printer, Save, CircleArrowRight, Hash } from 'lucide-react'
import { Section, Field, inputClasses } from '@/components/ui'

/* ── Exact same toggle pattern as case-form.tsx ── */
function SegToggle({ options, value, onChange }: { options: string[]; value: string; onChange: (v: string) => void }) {
  return (
    <div className="flex rounded-xl border border-border bg-input p-1">
      {options.map((o) => (
        <button
          key={o}
          type="button"
          onClick={() => onChange(o)}
          className={`flex-1 rounded-lg py-2 text-sm font-medium transition ${
            value === o ? 'bg-surface text-primary shadow-sm' : 'text-muted hover:text-foreground'
          }`}
        >
          {o}
        </button>
      ))}
    </div>
  )
}

interface FD {
  formNo: string
  ownerName: string; ownerPhone: string; ownerAddress: string
  patientName: string; stray: boolean; species: string; breed: string
  microchip: string; age: string; ageUnit: string; gender: string
  weight: string; neutered: string; vaccinated: string
  typeOfOperation: string; doctor: string; technician: string
  anesthesiaDosage: string; fastingDuration: string
  opTimeStart: string; opTimeEnd: string
  previousHistory: string; allergyAnesthesia: string
  labTestDeclined: boolean
}

const BLANK: FD = {
  formNo: '', ownerName: '', ownerPhone: '', ownerAddress: '',
  patientName: '', stray: false, species: '', breed: '', microchip: '',
  age: '', ageUnit: 'Year', gender: '', weight: '',
  neutered: '', vaccinated: '',
  typeOfOperation: '', doctor: '', technician: '',
  anesthesiaDosage: '', fastingDuration: '', opTimeStart: '', opTimeEnd: '',
  previousHistory: '', allergyAnesthesia: '',
  labTestDeclined: false,
}

export default function ConsentPage() {
  const [fd, setFd] = useState<FD>({ ...BLANK })
  const labId = useId()

  function set<K extends keyof FD>(k: K, v: FD[K]) {
    setFd((p) => ({ ...p, [k]: v }))
  }

  const [dateStr, setDateStr] = useState('')
  const [timeStr, setTimeStr] = useState('')
  useEffect(() => {
    const now = new Date()
    setDateStr(`${String(now.getDate()).padStart(2, '0')}/${String(now.getMonth() + 1).padStart(2, '0')}/${now.getFullYear()}`)
    setTimeStr(now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }))
  }, [])

  return (
    <main className="scroll-thin flex-1 overflow-y-auto">
      <div className="mx-auto max-w-2xl px-4 pb-12 pt-5 sm:px-6">

        {/* ── Document header ── */}
        <div className="mb-6 overflow-hidden rounded-2xl border border-border bg-surface shadow-[0_1px_2px_rgba(15,23,42,0.04),0_8px_24px_-12px_rgba(15,23,42,0.10)]">
          {/* Dark top band */}
          <div className="flex items-center justify-between bg-navy px-5 py-4">
            <div className="flex items-center gap-3">
              <span className="flex size-9 items-center justify-center rounded-xl bg-success text-lg">🏥</span>
              <div>
                <div className="text-sm font-bold text-white">Royal Veterinary Hospital</div>
                <div className="text-[11px] text-white/50">Surgery Consent Form · فۆرمی رەزامەندی نەشتەرگەری</div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-[11px] text-white/40">Date / Time</div>
              <div className="text-xs font-semibold text-white">{dateStr} · {timeStr}</div>
            </div>
          </div>

          {/* Form no + actions */}
          <div className="flex items-center gap-4 border-t border-border px-5 py-3">
            <div className="flex items-center gap-2">
              <Hash className="size-4 text-faint" />
              <input
                value={fd.formNo}
                onChange={(e) => set('formNo', e.target.value)}
                placeholder="Form No."
                className="w-28 bg-transparent text-sm font-semibold text-foreground outline-none placeholder:font-normal placeholder:text-faint"
              />
            </div>
            <div className="ml-auto flex items-center gap-2">
              <button className="flex h-8 items-center gap-1.5 rounded-lg border border-primary/30 bg-primary/10 px-3 text-xs font-semibold text-primary transition hover:bg-primary/20">
                <CircleArrowRight className="size-3.5" /> Post-Surgery
              </button>
              <button onClick={() => window.print()} className="flex h-8 items-center gap-1.5 rounded-lg border border-border px-3 text-xs font-medium text-muted transition hover:bg-input">
                <Printer className="size-3.5" /> Print
              </button>
              <button className="flex h-8 items-center gap-1.5 rounded-lg bg-primary px-3 text-xs font-semibold text-white shadow-sm shadow-primary/25 transition hover:bg-primary-hover">
                <Save className="size-3.5" /> Save Form
              </button>
            </div>
          </div>
        </div>

        {/* ── Sections ── */}
        <div className="space-y-5">

          {/* 1. Owner */}
          <Section title="Owner Details" icon={User} accent="primary">
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Owner Name" required>
                <input className={inputClasses} placeholder="Full name" value={fd.ownerName} onChange={(e) => set('ownerName', e.target.value)} />
              </Field>
              <Field label="Contact Info">
                <input className={inputClasses} placeholder="07XX XXX XXXX" value={fd.ownerPhone} onChange={(e) => set('ownerPhone', e.target.value)} />
              </Field>
              <Field label="Address" className="col-span-full">
                <input className={inputClasses} placeholder="City, district, street" value={fd.ownerAddress} onChange={(e) => set('ownerAddress', e.target.value)} />
              </Field>
            </div>
          </Section>

          {/* 2. Patient */}
          <Section title="Patient Details" icon={PawPrint} accent="success">
            <div className="space-y-5">
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                <Field label="Patient Name" required>
                  <input className={inputClasses} placeholder="Pet name" value={fd.patientName} onChange={(e) => set('patientName', e.target.value)} />
                </Field>
                <Field label="Breed">
                  <input className={inputClasses} placeholder="e.g. Persian, Labrador" value={fd.breed} onChange={(e) => set('breed', e.target.value)} />
                </Field>
                <Field label="Microchip No.">
                  <input className={inputClasses} placeholder="Chip ID" value={fd.microchip} onChange={(e) => set('microchip', e.target.value)} />
                </Field>
              </div>

              <div>
                <p className="mb-2 text-xs font-medium text-muted">Species</p>
                <div className="flex flex-wrap gap-2">
                  {([['Cat', Cat], ['Dog', Dog], ['Bird', Bird], ['Other', Rabbit]] as const).map(([label, Icon]) => {
                    const active = fd.species === label
                    return (
                      <button
                        key={label}
                        type="button"
                        onClick={() => set('species', active ? '' : label)}
                        className={`flex items-center gap-2 rounded-xl border px-4 py-2.5 text-sm font-medium transition ${
                          active
                            ? 'border-primary bg-primary/10 text-primary'
                            : 'border-border bg-input text-muted hover:border-primary/40 hover:text-foreground'
                        }`}
                      >
                        <Icon className="size-4" />{label}
                      </button>
                    )
                  })}
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                <Field label="Age">
                  <div className="flex gap-2">
                    <input className={inputClasses} placeholder="0" type="number" value={fd.age} onChange={(e) => set('age', e.target.value)} />
                    <div className="flex rounded-xl border border-border bg-input p-1">
                      {['Yr', 'Mo'].map((u) => (
                        <button key={u} type="button" onClick={() => set('ageUnit', u === 'Yr' ? 'Year' : 'Month')}
                          className={`rounded-lg px-3 text-xs font-medium transition ${fd.ageUnit === (u === 'Yr' ? 'Year' : 'Month') ? 'bg-surface text-primary shadow-sm' : 'text-muted'}`}>
                          {u}
                        </button>
                      ))}
                    </div>
                  </div>
                </Field>

                <Field label="Weight">
                  <div className="relative">
                    <input className={inputClasses} placeholder="0.0" type="number" value={fd.weight} onChange={(e) => set('weight', e.target.value)} />
                    <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs font-medium text-faint">Kg</span>
                  </div>
                </Field>

                <Field label="Gender">
                  <SegToggle options={['Male', 'Female']} value={fd.gender} onChange={(v) => set('gender', v)} />
                </Field>

                <div className="flex items-end">
                  <label className="flex h-11 w-full cursor-pointer items-center gap-2 rounded-xl border border-border bg-input px-3.5 text-sm font-medium text-muted">
                    <input type="checkbox" className="size-4 accent-primary" checked={fd.stray} onChange={(e) => set('stray', e.target.checked)} />
                    Stray
                  </label>
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="Neutered / Spayed">
                  <SegToggle options={['Yes', 'No']} value={fd.neutered} onChange={(v) => set('neutered', v)} />
                </Field>
                <Field label="Vaccinated">
                  <SegToggle options={['Yes', 'No']} value={fd.vaccinated} onChange={(v) => set('vaccinated', v)} />
                </Field>
              </div>
            </div>
          </Section>

          {/* 3. Medical History */}
          <Section title="Previous History & Allergies" icon={PenLine} accent="primary">
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Previous Surgeries / Illnesses">
                <textarea rows={3} className={`${inputClasses} h-auto resize-none py-3`}
                  placeholder="Previous surgeries, illnesses, drug history..."
                  value={fd.previousHistory} onChange={(e) => set('previousHistory', e.target.value)} />
              </Field>
              <Field label="Drug / Anesthesia Allergies">
                <textarea rows={3} className={`${inputClasses} h-auto resize-none py-3`}
                  placeholder="Any known allergies..."
                  value={fd.allergyAnesthesia} onChange={(e) => set('allergyAnesthesia', e.target.value)} />
              </Field>
            </div>
          </Section>

          {/* 4. Surgery */}
          <Section title="Surgery Details" icon={Stethoscope} accent="navy">
            <div className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="By Dr.">
                  <select className={inputClasses} value={fd.doctor} onChange={(e) => set('doctor', e.target.value)}>
                    <option value="">— Select Doctor —</option>
                    {['Gullan', 'Gyan', 'Othman', 'Shania', 'Tablo'].map((d) => <option key={d}>{d}</option>)}
                  </select>
                </Field>
                <Field label="By Technician">
                  <select className={inputClasses} value={fd.technician} onChange={(e) => set('technician', e.target.value)}>
                    <option value="">— Select Technician —</option>
                    {['Halwest', 'Mohammed', 'Shadman'].map((t) => <option key={t}>{t}</option>)}
                  </select>
                </Field>
              </div>
              <Field label="Type of Operation" required>
                <input className={inputClasses} placeholder="Describe the procedure…" value={fd.typeOfOperation} onChange={(e) => set('typeOfOperation', e.target.value)} />
              </Field>
              <div className="grid gap-4 sm:grid-cols-3">
                <Field label="Anaesthesia Dosage">
                  <input className={inputClasses} placeholder="e.g. 0.3× Kg" value={fd.anesthesiaDosage} onChange={(e) => set('anesthesiaDosage', e.target.value)} />
                </Field>
                <Field label="Fasting Duration">
                  <input className={inputClasses} placeholder="e.g. 10 hrs" value={fd.fastingDuration} onChange={(e) => set('fastingDuration', e.target.value)} />
                </Field>
                <Field label="Operation Time">
                  <div className="flex gap-2">
                    <input className={`${inputClasses} text-center`} placeholder="Start" value={fd.opTimeStart} onChange={(e) => set('opTimeStart', e.target.value)} />
                    <input className={`${inputClasses} text-center`} placeholder="End" value={fd.opTimeEnd} onChange={(e) => set('opTimeEnd', e.target.value)} />
                  </div>
                </Field>
              </div>
            </div>
          </Section>

          {/* 5. Consent */}
          <Section title="Consent Agreement" icon={ShieldCheck} accent="warning">
            <div className="space-y-3">
              <div className="rounded-xl border border-success/20 bg-success/5 px-4 py-3.5">
                <p className="text-right text-[12.5px] leading-7 text-foreground" dir="rtl">
                  من وەک خاوەنی ئەم ئاژەڵەی کە لەم فۆرمەدا ناو و زانیاریەکانی نوسراوە، ڕەزامەندی خۆم دەدەم بە ستافی نەخۆشخانەی ڤێتیرنەری ڕۆیاڵ، بۆ ئەنجامدانی نەشتەرگەری لەژێر هۆشبەری گشتی و کاری پێویست بۆ ئاژەڵەکەم. وە هەروەها ڕوونکردنەوەی تەواوم پێدراوە سەبارەت بە مەترسیەکانی نەشتەرگەریەکە.
                </p>
              </div>
              <div className="rounded-xl border border-border bg-input px-4 py-3.5">
                <p className="text-[12.5px] leading-6 text-foreground">
                  I, as the owner of the animal named on this form, give my consent to the staff of Royal Veterinary Hospital to perform surgery under general anesthesia and any necessary procedures. I have been fully informed of the surgery, its reason, and the associated risks including sensitivity to anesthesia, bleeding, infection, and post-operative complications.
                </p>
              </div>
              <div className="rounded-xl border border-border bg-surface px-4 py-3.5">
                <p className="text-right text-[12.5px] leading-6 text-foreground" dir="rtl">
                  أنا، باعتباري مالك الحيوان المذكور في هذا النموذج، أمنح موافقتي لموظفي المستشفى البيطري رۆیاڵ لإجراء العملية الجراحية تحت التخدير العام وأي إجراءات ضرورية، وقد أُبلغت بجميع المخاطر المحتملة.
                </p>
              </div>
              <label htmlFor={labId} className="flex cursor-pointer items-start gap-3 rounded-xl border border-border bg-input px-4 py-3">
                <input id={labId} type="checkbox" checked={fd.labTestDeclined}
                  onChange={(e) => set('labTestDeclined', e.target.checked)}
                  className="mt-0.5 size-4 cursor-pointer accent-success" />
                <span className="text-[12.5px] leading-relaxed text-foreground" dir="rtl">
                  لەسەر ڕەزامەندی خۆی نەیویستوە پشکنینی تاقیگەیی بۆ بکرێت
                  <span className="ml-2 text-xs text-muted not-italic" dir="ltr">· Owner declined lab test</span>
                </span>
              </label>
            </div>
          </Section>

          {/* 6. Signatures */}
          <Section title="Signatures" icon={PenLine} accent="navy">
            <div className="grid gap-5 sm:grid-cols-2">
              {[
                { label: "Owner's Signature", sub: 'إمضاء صاحب الحيوان' },
                { label: "Doctor's Signature", sub: 'إمضاء الطبيب' },
              ].map(({ label, sub }) => (
                <div key={label}>
                  <button className="flex h-24 w-full flex-col items-center justify-center gap-1.5 rounded-2xl border-2 border-dashed border-border bg-input text-muted transition hover:border-success/50 hover:bg-success/5 hover:text-success">
                    <PenLine className="size-5" />
                    <span className="text-xs font-medium">Tap to sign</span>
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
      </div>
    </main>
  )
}
