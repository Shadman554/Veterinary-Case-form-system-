'use client'

import { useState } from 'react'
import {
  User,
  PawPrint,
  Activity,
  HeartPulse,
  FlaskConical,
  Pill,
  Stethoscope,
  ImagePlus,
  Camera,
  Upload,
  CalendarClock,
  NotebookPen,
  Cat,
  Dog,
  Bird,
  Rabbit,
  Thermometer,
} from 'lucide-react'
import { Section, Field, inputClasses } from './ui'

/* ---------- interactive helpers ---------- */
function Pills({
  options,
  value,
  onChange,
}: {
  options: { label: string; icon?: typeof Cat }[]
  value: string
  onChange: (v: string) => void
}) {
  return (
    <div className="flex flex-wrap gap-2">
      {options.map((o) => {
        const Icon = o.icon
        const active = value === o.label
        return (
          <button
            key={o.label}
            type="button"
            onClick={() => onChange(o.label)}
            className={`flex items-center gap-2 rounded-xl border px-4 py-2.5 text-sm font-medium transition ${
              active
                ? 'border-primary bg-primary/10 text-primary'
                : 'border-border bg-input text-muted hover:border-primary/40 hover:text-foreground'
            }`}
          >
            {Icon && <Icon className="size-4" />}
            {o.label}
          </button>
        )
      })}
    </div>
  )
}

function CheckChip({
  label,
  checked,
  onToggle,
}: {
  label: string
  checked: boolean
  onToggle: () => void
}) {
  return (
    <button
      type="button"
      onClick={onToggle}
      className={`flex items-center gap-2 rounded-xl border px-3.5 py-2.5 text-sm font-medium transition ${
        checked
          ? 'border-success bg-success/10 text-success'
          : 'border-border bg-input text-muted hover:border-success/40 hover:text-foreground'
      }`}
    >
      <span
        className={`flex size-4 items-center justify-center rounded-md border transition ${
          checked ? 'border-success bg-success text-white' : 'border-faint'
        }`}
      >
        {checked && (
          <svg viewBox="0 0 12 12" className="size-3" fill="none">
            <path
              d="M2.5 6.2l2.2 2.2 4.8-4.8"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        )}
      </span>
      {label}
    </button>
  )
}

function useMulti(initial: string[] = []) {
  const [set, setSet] = useState<Set<string>>(new Set(initial))
  const toggle = (v: string) =>
    setSet((prev) => {
      const next = new Set(prev)
      next.has(v) ? next.delete(v) : next.add(v)
      return next
    })
  return { has: (v: string) => set.has(v), toggle }
}

/* ---------- main form ---------- */
export function CaseForm() {
  const [species, setSpecies] = useState('Dog')
  const [gender, setGender] = useState('Male')
  const [ageUnit, setAgeUnit] = useState('Year')
  const [neutered, setNeutered] = useState('No')
  const [vaccinated, setVaccinated] = useState('Yes')
  const [mentation, setMentation] = useState('BAR/QAR')

  const respiratory = useMulti(['Appear normal'])
  const labs = useMulti(['CBC (Complete Blood Count)'])

  const respiratoryOptions = [
    'Appear normal',
    'Rapid Breathing',
    'Nasal discharge',
    'Breathing Difficulty',
    'Congestion',
    'Coughing',
    'Abnormal sound',
  ]
  const labOptions = [
    'CBC (Complete Blood Count)',
    'Biochemistry',
    'Urine Analyser',
    'X-Ray',
    'Sonar',
    'Viral Test',
    'Skin Test',
    'ESR',
    'Fecal Sample',
    'Fluid Therapy',
  ]

  return (
    <div className="space-y-5">
      {/* Owner details */}
      <Section title="Owner Details" icon={User} accent="primary">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <Field label="Owner Name" required>
            <input className={inputClasses} placeholder="Full name" />
          </Field>
          <Field label="Contact Info">
            <input className={inputClasses} placeholder="07XX XXX XXXX" />
          </Field>
          <Field label="Address">
            <input className={inputClasses} placeholder="City, district, street" />
          </Field>
        </div>
      </Section>

      {/* Photos & uploads */}
      <Section title="Animal Photos & X-Ray / PDF" icon={ImagePlus} accent="navy">
        <div className="grid gap-4 sm:grid-cols-2">
          <button
            type="button"
            className="flex h-32 flex-col items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-border bg-input text-muted transition hover:border-primary/50 hover:text-primary"
          >
            <Camera className="size-7" />
            <span className="text-sm font-medium">Capture</span>
          </button>
          <button
            type="button"
            className="flex h-32 flex-col items-center justify-center gap-1 rounded-2xl border-2 border-dashed border-border bg-input text-muted transition hover:border-primary/50 hover:text-primary"
          >
            <Upload className="size-7" />
            <span className="text-sm font-medium">Upload / PDF</span>
            <span className="text-xs text-faint">or drag &amp; drop</span>
          </button>
        </div>
      </Section>

      {/* Patient details */}
      <Section title="Patient Details" icon={PawPrint} accent="success">
        <div className="space-y-5">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <Field label="Patient Name" required>
              <input className={inputClasses} placeholder="Pet name" />
            </Field>
            <Field label="Breed">
              <input className={inputClasses} placeholder="e.g. Persian, Labrador" />
            </Field>
            <Field label="Microchip No.">
              <input className={inputClasses} placeholder="Chip ID" />
            </Field>
          </div>

          <div>
            <p className="mb-2 text-xs font-medium text-muted">Species</p>
            <Pills
              value={species}
              onChange={setSpecies}
              options={[
                { label: 'Cat', icon: Cat },
                { label: 'Dog', icon: Dog },
                { label: 'Bird', icon: Bird },
                { label: 'Other', icon: Rabbit },
              ]}
            />
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <Field label="Age">
              <div className="flex gap-2">
                <input className={inputClasses} placeholder="0" type="number" />
                <div className="flex rounded-xl border border-border bg-input p-1">
                  {['Year', 'Month'].map((u) => (
                    <button
                      key={u}
                      type="button"
                      onClick={() => setAgeUnit(u)}
                      className={`rounded-lg px-3 text-xs font-medium transition ${
                        ageUnit === u
                          ? 'bg-surface text-primary shadow-sm'
                          : 'text-muted'
                      }`}
                    >
                      {u === 'Year' ? 'Yr' : 'Mo'}
                    </button>
                  ))}
                </div>
              </div>
            </Field>
            <Field label="Weight">
              <div className="relative">
                <input className={inputClasses} placeholder="0.0" type="number" />
                <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs font-medium text-faint">
                  Kg
                </span>
              </div>
            </Field>
            <Field label="Gender">
              <div className="flex rounded-xl border border-border bg-input p-1">
                {['Male', 'Female'].map((g) => (
                  <button
                    key={g}
                    type="button"
                    onClick={() => setGender(g)}
                    className={`flex-1 rounded-lg py-2 text-sm font-medium transition ${
                      gender === g ? 'bg-surface text-primary shadow-sm' : 'text-muted'
                    }`}
                  >
                    {g}
                  </button>
                ))}
              </div>
            </Field>
            <div className="flex items-end">
              <label className="flex h-11 w-full cursor-pointer items-center gap-2 rounded-xl border border-border bg-input px-3.5 text-sm font-medium text-muted">
                <input type="checkbox" className="size-4 accent-primary" />
                Stray animal
              </label>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Neutered / Spayed">
              <div className="flex rounded-xl border border-border bg-input p-1">
                {['Yes', 'No'].map((v) => (
                  <button
                    key={v}
                    type="button"
                    onClick={() => setNeutered(v)}
                    className={`flex-1 rounded-lg py-2 text-sm font-medium transition ${
                      neutered === v ? 'bg-surface text-primary shadow-sm' : 'text-muted'
                    }`}
                  >
                    {v}
                  </button>
                ))}
              </div>
            </Field>
            <Field label="Vaccinated">
              <div className="flex rounded-xl border border-border bg-input p-1">
                {['Yes', 'No'].map((v) => (
                  <button
                    key={v}
                    type="button"
                    onClick={() => setVaccinated(v)}
                    className={`flex-1 rounded-lg py-2 text-sm font-medium transition ${
                      vaccinated === v ? 'bg-surface text-primary shadow-sm' : 'text-muted'
                    }`}
                  >
                    {v}
                  </button>
                ))}
              </div>
            </Field>
          </div>
        </div>
      </Section>

      {/* Reason + history */}
      <Section title="Reason For Visit & History" icon={NotebookPen} accent="primary">
        <div className="grid gap-4 lg:grid-cols-2">
          <Field label="Reason For Visit" required>
            <textarea
              rows={4}
              className={`${inputClasses} h-auto resize-none py-3`}
              placeholder="Describe the reason for this visit..."
            />
          </Field>
          <Field label="Previous Illnesses, Surgeries, Allergies or Health Issues">
            <textarea
              rows={4}
              className={`${inputClasses} h-auto resize-none py-3`}
              placeholder="Previous illnesses, surgeries, drug allergies..."
            />
          </Field>
        </div>
      </Section>

      {/* Vital signs */}
      <Section title="Vital Signs" icon={HeartPulse} accent="warning">
        <div className="grid gap-4 sm:grid-cols-3">
          <Field label="Temperature">
            <div className="relative">
              <Thermometer className="absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-faint" />
              <input className={`${inputClasses} pl-10`} placeholder="°C" />
            </div>
          </Field>
          <Field label="Heart Rate">
            <input className={inputClasses} placeholder="bpm" />
          </Field>
          <Field label="Resp. Rate">
            <input className={inputClasses} placeholder="brpm" />
          </Field>
        </div>
      </Section>

      {/* Physical examination */}
      <Section title="Physical Examination" icon={Activity} accent="primary">
        <div className="space-y-5">
          <div>
            <p className="mb-2 text-xs font-medium text-muted">Mentation / Attitude</p>
            <Pills
              value={mentation}
              onChange={setMentation}
              options={[
                { label: 'BAR/QAR' },
                { label: 'Aggressive' },
                { label: 'Depressed' },
                { label: 'Anxious/Fearful' },
              ]}
            />
          </div>
          <div>
            <p className="mb-2 text-xs font-medium text-muted">Respiratory / Lungs</p>
            <div className="flex flex-wrap gap-2">
              {respiratoryOptions.map((o) => (
                <CheckChip
                  key={o}
                  label={o}
                  checked={respiratory.has(o)}
                  onToggle={() => respiratory.toggle(o)}
                />
              ))}
            </div>
          </div>
        </div>
      </Section>

      {/* Examined by */}
      <Section title="Examined By" icon={Stethoscope} accent="navy">
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="By Dr.">
            <select className={inputClasses}>
              <option>— Select Doctor —</option>
              <option>Gullan</option>
              <option>Gyan</option>
              <option>Othman</option>
              <option>Shania</option>
              <option>Tablo</option>
            </select>
          </Field>
          <Field label="By Tech.">
            <select className={inputClasses}>
              <option>— Select Technician —</option>
              <option>Halwest</option>
              <option>Mohammed</option>
              <option>Shadman</option>
            </select>
          </Field>
        </div>
      </Section>

      {/* Laboratory */}
      <Section title="Laboratory Examinations" icon={FlaskConical} accent="success">
        <div className="space-y-5">
          <div className="flex flex-wrap gap-2">
            {labOptions.map((o) => (
              <CheckChip
                key={o}
                label={o}
                checked={labs.has(o)}
                onToggle={() => labs.toggle(o)}
              />
            ))}
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <UploadTile label="CBC Result Image / PDF" />
            <UploadTile label="Biochemistry Result Image / PDF" />
          </div>
        </div>
      </Section>

      {/* Prescription */}
      <Section title="Prescription" icon={Pill} accent="primary">
        <Field label="Day 1">
          <textarea
            rows={4}
            className={`${inputClasses} h-auto resize-none py-3`}
            placeholder="Day 1 prescription..."
          />
        </Field>
      </Section>

      {/* Diagnosis + follow up + notes */}
      <Section title="Diagnosis, Follow Up & Notes" icon={CalendarClock} accent="warning">
        <div className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Suspect Diagnosis">
              <input className={inputClasses} placeholder="Enter suspected diagnosis..." />
            </Field>
            <Field label="Follow Up Next Visit">
              <input type="date" className={inputClasses} />
            </Field>
          </div>
          <Field label="Case Notes">
            <textarea
              rows={3}
              className={`${inputClasses} h-auto resize-none py-3`}
              placeholder="Write any extra case notes, doctor observations, or free-text details..."
            />
          </Field>
        </div>
      </Section>
    </div>
  )
}

function UploadTile({ label }: { label: string }) {
  return (
    <button
      type="button"
      className="flex h-28 flex-col items-center justify-center gap-1.5 rounded-2xl border-2 border-dashed border-border bg-input text-muted transition hover:border-success/50 hover:text-success"
    >
      <Upload className="size-6" />
      <span className="px-4 text-center text-xs font-medium">{label}</span>
    </button>
  )
}
