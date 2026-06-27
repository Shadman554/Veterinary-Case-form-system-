'use client'

import { useState } from 'react'
import { User, PawPrint, Stethoscope, ShieldCheck, PenLine, Cat, Dog, Bird, Rabbit, Printer, Save, CircleArrowRight } from 'lucide-react'
import { Section, Field, inputClasses } from '@/components/ui'

/* ── Reuse exact same pill pattern as case-form.tsx ── */
function Pills({
  options,
  value,
  onChange,
}: {
  options: string[]
  value: string
  onChange: (v: string) => void
}) {
  return (
    <div className="flex flex-wrap gap-2">
      {options.map((o) => (
        <button
          key={o}
          type="button"
          onClick={() => onChange(value === o ? '' : o)}
          className={`flex items-center gap-2 rounded-xl border px-4 py-2.5 text-sm font-medium transition ${
            value === o
              ? 'border-primary bg-primary/10 text-primary'
              : 'border-border bg-input text-muted hover:border-primary/40 hover:text-foreground'
          }`}
        >
          {o}
        </button>
      ))}
    </div>
  )
}

function YesNo({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  return (
    <div className="flex rounded-xl border border-border bg-input p-1">
      {['Yes', 'No'].map((v) => (
        <button
          key={v}
          type="button"
          onClick={() => onChange(v)}
          className={`flex-1 rounded-lg py-2 text-sm font-medium transition ${
            value === v ? 'bg-surface text-primary shadow-sm' : 'text-muted'
          }`}
        >
          {v}
        </button>
      ))}
    </div>
  )
}

interface FD {
  formNo: string
  ownerName: string; ownerPhone: string; ownerAddress: string
  patientName: string; stray: boolean; species: string; breed: string
  microchip: string; ageYr: string; ageMo: string; gender: string
  weight: string; neutered: string; vaccinated: string
  typeOfOperation: string; doctor: string; technician: string
  anesthesiaDosage: string; fastingDuration: string
  opTimeStart: string; opTimeEnd: string
  previousSurgery: string; illness: string; allergyAnesthesia: string
  labTestDeclined: boolean
}

const BLANK: FD = {
  formNo: '', ownerName: '', ownerPhone: '', ownerAddress: '',
  patientName: '', stray: false, species: '', breed: '', microchip: '',
  ageYr: '', ageMo: '', gender: '', weight: '',
  neutered: '', vaccinated: '',
  typeOfOperation: '', doctor: '', technician: '',
  anesthesiaDosage: '', fastingDuration: '',
  opTimeStart: '', opTimeEnd: '',
  previousSurgery: '', illness: '', allergyAnesthesia: '',
  labTestDeclined: false,
}

export default function ConsentPage() {
  const [fd, setFd] = useState<FD>({ ...BLANK })

  function set<K extends keyof FD>(k: K, v: FD[K]) {
    setFd((p) => ({ ...p, [k]: v }))
  }

  const today = new Date()
  const dateStr = `${String(today.getDate()).padStart(2, '0')}/${String(today.getMonth() + 1).padStart(2, '0')}/${today.getFullYear()}`

  return (
    <main className="scroll-thin flex-1 overflow-y-auto">
      <div className="mx-auto max-w-2xl space-y-5 px-4 pb-10 pt-5 sm:px-6">

        {/* Action bar */}
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div>
            <h1 className="text-xl font-bold text-foreground">Consent Form</h1>
            <p className="mt-0.5 text-sm text-muted">{dateStr}</p>
          </div>
          <div className="flex items-center gap-2">
            <button className="flex h-10 items-center gap-2 rounded-xl border border-primary/40 bg-primary/10 px-4 text-sm font-semibold text-primary transition hover:bg-primary/20">
              <CircleArrowRight className="size-4" /> Post-Surgery Case
            </button>
            <button onClick={() => window.print()} className="flex h-10 items-center gap-2 rounded-xl border border-border bg-surface px-4 text-sm font-medium text-muted transition hover:bg-input">
              <Printer className="size-4" /> Print
            </button>
            <button className="flex h-10 items-center gap-2 rounded-xl bg-primary px-4 text-sm font-semibold text-white shadow shadow-primary/20 transition hover:bg-primary-hover">
              <Save className="size-4" /> Save
            </button>
          </div>
        </div>

        {/* 1. Owner Details */}
        <Section title="Owner Details" icon={User} accent="primary">
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Owner Name" required>
              <input
                className={inputClasses}
                placeholder="Full name"
                value={fd.ownerName}
                onChange={(e) => set('ownerName', e.target.value)}
              />
            </Field>
            <Field label="Contact Info">
              <input
                className={inputClasses}
                placeholder="07XX XXX XXXX"
                value={fd.ownerPhone}
                onChange={(e) => set('ownerPhone', e.target.value)}
              />
            </Field>
            <Field label="Address" className="col-span-full">
              <input
                className={inputClasses}
                placeholder="City, district, street"
                value={fd.ownerAddress}
                onChange={(e) => set('ownerAddress', e.target.value)}
              />
            </Field>
          </div>
        </Section>

        {/* 2. Patient Details */}
        <Section title="Patient Details" icon={PawPrint} accent="success">
          <div className="space-y-5">
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              <Field label="Patient Name" required>
                <input
                  className={inputClasses}
                  placeholder="Pet name"
                  value={fd.patientName}
                  onChange={(e) => set('patientName', e.target.value)}
                />
              </Field>
              <Field label="Breed">
                <input
                  className={inputClasses}
                  placeholder="e.g. Persian, Labrador"
                  value={fd.breed}
                  onChange={(e) => set('breed', e.target.value)}
                />
              </Field>
              <Field label="Microchip No.">
                <input
                  className={inputClasses}
                  placeholder="Chip ID (optional)"
                  value={fd.microchip}
                  onChange={(e) => set('microchip', e.target.value)}
                />
              </Field>
            </div>

            {/* Species pills */}
            <div>
              <p className="mb-2 text-xs font-medium text-muted">Species</p>
              <div className="flex flex-wrap gap-2">
                {[
                  { label: 'Cat', icon: Cat },
                  { label: 'Dog', icon: Dog },
                  { label: 'Bird', icon: Bird },
                  { label: 'Other', icon: Rabbit },
                ].map(({ label, icon: Icon }) => {
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
                      <Icon className="size-4" />
                      {label}
                    </button>
                  )
                })}
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <Field label="Age">
                <div className="flex gap-2">
                  <input
                    className={inputClasses}
                    placeholder="0"
                    type="number"
                    value={fd.ageYr}
                    onChange={(e) => set('ageYr', e.target.value)}
                  />
                  <div className="flex rounded-xl border border-border bg-input p-1">
                    {['Yr', 'Mo'].map((u) => (
                      <button
                        key={u}
                        type="button"
                        className="rounded-lg px-3 text-xs font-medium text-muted"
                      >
                        {u}
                      </button>
                    ))}
                  </div>
                </div>
              </Field>

              <Field label="Weight">
                <div className="relative">
                  <input
                    className={inputClasses}
                    placeholder="0.0"
                    type="number"
                    value={fd.weight}
                    onChange={(e) => set('weight', e.target.value)}
                  />
                  <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs font-medium text-faint">Kg</span>
                </div>
              </Field>

              <Field label="Gender">
                <div className="flex rounded-xl border border-border bg-input p-1">
                  {['Male', 'Female'].map((g) => (
                    <button
                      key={g}
                      type="button"
                      onClick={() => set('gender', g)}
                      className={`flex-1 rounded-lg py-2 text-sm font-medium transition ${
                        fd.gender === g ? 'bg-surface text-primary shadow-sm' : 'text-muted'
                      }`}
                    >
                      {g}
                    </button>
                  ))}
                </div>
              </Field>

              <div className="flex items-end">
                <label className="flex h-11 w-full cursor-pointer items-center gap-2 rounded-xl border border-border bg-input px-3.5 text-sm font-medium text-muted">
                  <input
                    type="checkbox"
                    className="size-4 accent-primary"
                    checked={fd.stray}
                    onChange={(e) => set('stray', e.target.checked)}
                  />
                  Stray animal
                </label>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Neutered / Spayed">
                <YesNo value={fd.neutered} onChange={(v) => set('neutered', v)} />
              </Field>
              <Field label="Vaccinated">
                <YesNo value={fd.vaccinated} onChange={(v) => set('vaccinated', v)} />
              </Field>
            </div>
          </div>
        </Section>

        {/* 3. Medical History */}
        <Section title="Medical History" icon={PenLine} accent="primary">
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Previous Surgeries / Illnesses">
              <textarea
                rows={3}
                className={`${inputClasses} h-auto resize-none py-3`}
                placeholder="List any previous surgeries, illnesses..."
                value={fd.previousSurgery}
                onChange={(e) => set('previousSurgery', e.target.value)}
              />
            </Field>
            <Field label="Drug / Anesthesia Allergies">
              <textarea
                rows={3}
                className={`${inputClasses} h-auto resize-none py-3`}
                placeholder="Any known drug or anesthesia allergies..."
                value={fd.allergyAnesthesia}
                onChange={(e) => set('allergyAnesthesia', e.target.value)}
              />
            </Field>
          </div>
        </Section>

        {/* 4. Surgery Details */}
        <Section title="Surgery Details" icon={Stethoscope} accent="navy">
          <div className="space-y-5">
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="By Dr.">
                <select
                  className={inputClasses}
                  value={fd.doctor}
                  onChange={(e) => set('doctor', e.target.value)}
                >
                  <option value="">— Select Doctor —</option>
                  <option>Gullan</option>
                  <option>Gyan</option>
                  <option>Othman</option>
                  <option>Shania</option>
                  <option>Tablo</option>
                </select>
              </Field>
              <Field label="By Technician">
                <select
                  className={inputClasses}
                  value={fd.technician}
                  onChange={(e) => set('technician', e.target.value)}
                >
                  <option value="">— Select Technician —</option>
                  <option>Halwest</option>
                  <option>Mohammed</option>
                  <option>Shadman</option>
                </select>
              </Field>
            </div>

            <Field label="Type of Operation" required>
              <input
                className={inputClasses}
                placeholder="Describe the procedure..."
                value={fd.typeOfOperation}
                onChange={(e) => set('typeOfOperation', e.target.value)}
              />
            </Field>

            <div className="grid gap-4 sm:grid-cols-3">
              <Field label="Anaesthesia Dosage">
                <input
                  className={inputClasses}
                  placeholder="e.g. 0.3× Kg"
                  value={fd.anesthesiaDosage}
                  onChange={(e) => set('anesthesiaDosage', e.target.value)}
                />
              </Field>
              <Field label="Fasting Duration">
                <input
                  className={inputClasses}
                  placeholder="e.g. 10 hrs"
                  value={fd.fastingDuration}
                  onChange={(e) => set('fastingDuration', e.target.value)}
                />
              </Field>
              <Field label="Operation Time">
                <div className="flex items-center gap-1.5">
                  <input
                    className="h-11 w-full rounded-xl border border-border bg-input px-3 text-center text-sm outline-none focus:border-primary focus:ring-4 focus:ring-primary/10"
                    placeholder="Start"
                    value={fd.opTimeStart}
                    onChange={(e) => set('opTimeStart', e.target.value)}
                  />
                  <span className="shrink-0 text-xs text-faint">→</span>
                  <input
                    className="h-11 w-full rounded-xl border border-border bg-input px-3 text-center text-sm outline-none focus:border-primary focus:ring-4 focus:ring-primary/10"
                    placeholder="End"
                    value={fd.opTimeEnd}
                    onChange={(e) => set('opTimeEnd', e.target.value)}
                  />
                </div>
              </Field>
            </div>
          </div>
        </Section>

        {/* 5. Consent Agreement */}
        <Section title="Consent Agreement" icon={ShieldCheck} accent="warning">
          <div className="space-y-4">
            {/* Kurdish */}
            <div className="rounded-xl border border-success/20 bg-success/5 p-4">
              <p className="text-right text-[13px] leading-loose text-foreground" dir="rtl">
                من وەک خاوەنی ئەم ئاژەڵەی کە لەم فۆرمەدا ناو و زانیاریەکانی نوسراوە، وە لە خوارەوەی ئەم لاپەڕەیە ناو ئیمزای خۆم کردووە، ڕەزامەندی خۆم دەدەم بە ستافی نەخۆشخانەی ڤێتیرنەری ڕۆیاڵ، بۆ ئەنجامدانی نەشتەرگەری لەژێر هۆشبەری گشتی (بنج عام) و کاری پێویست بۆ ئاژەڵەکەم.
                <br /><br />
                وە هەروەها من ڕوونکردنەوەی تەواوم پێدراوە سەبارەت بە نەشتەرگەریەکە و هۆکاری ئەنجامدانی نەشتەرگەریەکە و ئەو مەترسیانەی کە لەوانەیە بەهۆی ئەم نەشتەرگەریە یاخود هۆشبڕی گشتی توشی ئاژەڵەکەم ببێت.
              </p>
            </div>

            {/* English */}
            <div className="rounded-xl border border-border bg-input p-4">
              <p className="text-[13px] leading-relaxed text-foreground">
                I, as the owner of the animal whose name and information are written on this form, and signed at the bottom of this page, give my consent to the staff of the Royal Veterinary Hospital, to perform surgery under general anesthesia and any necessary procedures for my animal.
                <br /><br />
                I have also been given a full explanation of the surgery, the reason for the surgery and the risks that may result from this surgery or general anesthesia, including (sensitivity to general anesthesia, death, bleeding, infection, slow wound healing, severe pain, behavioral changes).
              </p>
            </div>

            {/* Arabic */}
            <div className="rounded-xl border border-border bg-surface p-4">
              <p className="text-right text-[13px] leading-loose text-foreground" dir="rtl">
                أنا، باعتباري مالك الحيوان الذي كتب اسمه ومعلوماته في هذا النموذج، ووقعت في أسفل هذه الصفحة، أمنح موافقتي لموظفي المستشفى البيطري رۆیاڵ، لإجراء عملية جراحية تحت التخدير العام وأي إجراءات ضرورية لحيواني.
              </p>
            </div>

            {/* Lab declined */}
            <label className="flex cursor-pointer items-start gap-3 rounded-xl border border-border bg-input px-4 py-3">
              <input
                type="checkbox"
                checked={fd.labTestDeclined}
                onChange={(e) => set('labTestDeclined', e.target.checked)}
                className="mt-0.5 size-4 cursor-pointer accent-success"
              />
              <span className="text-[13px] leading-relaxed text-foreground" dir="rtl">
                لەسەر ڕەزامەندی خۆی نەیویستوە پشکنینی تاقیگەیی بۆ بکرێت
                <span className="ml-2 text-muted not-italic" dir="ltr">(Owner declined lab test)</span>
              </span>
            </label>
          </div>
        </Section>

        {/* 6. Signatures */}
        <Section title="Signatures" icon={PenLine} accent="navy">
          <div className="grid gap-6 sm:grid-cols-2">
            {["Owner's Signature", "Doctor's Signature"].map((label) => (
              <div key={label}>
                <div className="flex h-28 w-full cursor-pointer flex-col items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-border bg-input text-muted transition hover:border-success/50 hover:text-success">
                  <PenLine className="size-6" />
                  <span className="text-sm font-medium">Tap to sign</span>
                </div>
                <p className="mt-2 text-sm font-semibold text-foreground">{label}</p>
              </div>
            ))}
          </div>
        </Section>

      </div>
    </main>
  )
}
