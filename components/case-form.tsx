'use client'

import {
  User, PawPrint, Activity, HeartPulse, FlaskConical, Pill,
  Stethoscope, ImagePlus, Camera, Upload, CalendarClock,
  NotebookPen, Cat, Dog, Bird, Rabbit, Thermometer,
} from 'lucide-react'
import { Section, Field, inputClasses } from './ui'
import { useCaseCtx } from '@/lib/case-context'

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
  label, checked, onToggle,
}: {
  label: string; checked: boolean; onToggle: () => void
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
            <path d="M2.5 6.2l2.2 2.2 4.8-4.8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        )}
      </span>
      {label}
    </button>
  )
}

const respiratoryOptions = [
  'Appear normal', 'Nasal discharge', 'Congestion', 'Abnormal sound',
  'Rapid Breathing', 'Breathing Difficulty', 'Coughing', 'Other',
]

const weightBcsOptions = ['Ideal Weight', 'Overweight', 'Underweight']
const labOptions = [
  'CBC (Complete Blood Count)', 'Biochemistry', 'Urine Analyser', 'X-Ray',
  'Sonar', 'Viral Test', 'Skin Test', 'ESR', 'Fecal Sample', 'Fluid Therapy',
]

export function CaseForm() {
  const { form, setField, toggleSet } = useCaseCtx()

  return (
    <div className="space-y-5">

      {/* Owner details */}
      <Section title="Owner Details" icon={User} accent="primary">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <Field label="Owner Name" required>
            <input
              className={inputClasses}
              placeholder="Full name"
              value={form.ownerName}
              onChange={(e) => setField('ownerName', e.target.value)}
            />
          </Field>
          <Field label="Contact Info">
            <input
              className={inputClasses}
              placeholder="07XX XXX XXXX"
              value={form.contactInfo}
              onChange={(e) => setField('contactInfo', e.target.value)}
            />
          </Field>
          <Field label="Address">
            <input
              className={inputClasses}
              placeholder="City, district, street"
              value={form.address}
              onChange={(e) => setField('address', e.target.value)}
            />
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
          <label className="flex h-32 cursor-pointer flex-col items-center justify-center gap-1 rounded-2xl border-2 border-dashed border-border bg-input text-muted transition hover:border-primary/50 hover:text-primary">
            <Upload className="size-7" />
            <span className="text-sm font-medium">Upload / PDF</span>
            <span className="text-xs text-faint">or drag &amp; drop</span>
            <input type="file" accept="image/*,.pdf" className="sr-only" />
          </label>
        </div>
      </Section>

      {/* Patient details */}
      <Section title="Patient Details" icon={PawPrint} accent="success">
        <div className="space-y-5">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <Field label="Patient Name" required>
              <input
                className={inputClasses}
                placeholder="Pet name"
                value={form.patientName}
                onChange={(e) => setField('patientName', e.target.value)}
              />
            </Field>
            <Field label="Breed">
              <input
                className={inputClasses}
                placeholder="e.g. Persian, Labrador"
                value={form.breed}
                onChange={(e) => setField('breed', e.target.value)}
              />
            </Field>
            <Field label="Microchip No.">
              <input
                className={inputClasses}
                placeholder="Chip ID"
                value={form.microchip}
                onChange={(e) => setField('microchip', e.target.value)}
              />
            </Field>
          </div>

          <div>
            <p className="mb-2 text-xs font-medium text-muted">Species</p>
            <Pills
              value={form.species}
              onChange={(v) => setField('species', v)}
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
                <input
                  className={inputClasses}
                  placeholder="0"
                  type="number"
                  value={form.age}
                  onChange={(e) => setField('age', e.target.value)}
                />
                <div className="flex rounded-xl border border-border bg-input p-1">
                  {['Year', 'Month'].map((u) => (
                    <button
                      key={u}
                      type="button"
                      onClick={() => setField('ageUnit', u)}
                      className={`rounded-lg px-3 text-xs font-medium transition ${
                        form.ageUnit === u ? 'bg-surface text-primary shadow-sm' : 'text-muted'
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
                <input
                  className={inputClasses}
                  placeholder="0.0"
                  type="number"
                  value={form.weight}
                  onChange={(e) => setField('weight', e.target.value)}
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
                    onClick={() => setField('gender', g)}
                    className={`flex-1 rounded-lg py-2 text-sm font-medium transition ${
                      form.gender === g ? 'bg-surface text-primary shadow-sm' : 'text-muted'
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
                  checked={form.stray}
                  onChange={(e) => setField('stray', e.target.checked)}
                />
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
                    onClick={() => setField('neutered', v)}
                    className={`flex-1 rounded-lg py-2 text-sm font-medium transition ${
                      form.neutered === v ? 'bg-surface text-primary shadow-sm' : 'text-muted'
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
                    onClick={() => setField('vaccinated', v)}
                    className={`flex-1 rounded-lg py-2 text-sm font-medium transition ${
                      form.vaccinated === v ? 'bg-surface text-primary shadow-sm' : 'text-muted'
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
              value={form.reasonForVisit}
              onChange={(e) => setField('reasonForVisit', e.target.value)}
            />
          </Field>
          <Field label="Previous Illnesses, Surgeries, Allergies or Health Issues">
            <textarea
              rows={4}
              className={`${inputClasses} h-auto resize-none py-3`}
              placeholder="Previous illnesses, surgeries, drug allergies..."
              value={form.history}
              onChange={(e) => setField('history', e.target.value)}
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
              <input
                className={`${inputClasses} pl-10`}
                placeholder="°C"
                value={form.temperature}
                onChange={(e) => setField('temperature', e.target.value)}
              />
            </div>
          </Field>
          <Field label="Heart Rate">
            <input
              className={inputClasses}
              placeholder="bpm"
              value={form.heartRate}
              onChange={(e) => setField('heartRate', e.target.value)}
            />
          </Field>
          <Field label="Resp. Rate">
            <input
              className={inputClasses}
              placeholder="brpm"
              value={form.respRate}
              onChange={(e) => setField('respRate', e.target.value)}
            />
          </Field>
        </div>
      </Section>

      {/* Physical examination */}
      <Section title="Physical Examination" icon={Activity} accent="primary">
        <div className="space-y-5">
          <div>
            <p className="mb-2 text-xs font-medium text-muted">Mentation / Attitude</p>
            <Pills
              value={form.mentation}
              onChange={(v) => setField('mentation', v)}
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
                  checked={form.respiratory.has(o)}
                  onToggle={() => toggleSet('respiratory', o)}
                />
              ))}
            </div>
          </div>

          <div>
            <p className="mb-2 text-xs font-medium text-muted">Weight / BCS</p>
            <div className="flex flex-wrap gap-2">
              {weightBcsOptions.map((o) => (
                <CheckChip
                  key={o}
                  label={o}
                  checked={form.weightBcs.has(o)}
                  onToggle={() => toggleSet('weightBcs', o)}
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
            <select
              className={inputClasses}
              value={form.doctor}
              onChange={(e) => setField('doctor', e.target.value)}
            >
              <option value="">— Select Doctor —</option>
              <option>Gullan</option>
              <option>Gyan</option>
              <option>Othman</option>
              <option>Shania</option>
              <option>Tablo</option>
            </select>
          </Field>
          <Field label="By Tech.">
            <select
              className={inputClasses}
              value={form.tech}
              onChange={(e) => setField('tech', e.target.value)}
            >
              <option value="">— Select Technician —</option>
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
                checked={form.labs.has(o)}
                onToggle={() => toggleSet('labs', o)}
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
            value={form.prescription}
            onChange={(e) => setField('prescription', e.target.value)}
          />
        </Field>
      </Section>

      {/* Diagnosis + follow up + notes */}
      <Section title="Diagnosis, Follow Up & Notes" icon={CalendarClock} accent="warning">
        <div className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Suspect Diagnosis">
              <input
                className={inputClasses}
                placeholder="Enter suspected diagnosis..."
                value={form.diagnosis}
                onChange={(e) => setField('diagnosis', e.target.value)}
              />
            </Field>
            <Field label="Follow Up Next Visit">
              <input
                type="date"
                className={inputClasses}
                value={form.followUpDate}
                onChange={(e) => setField('followUpDate', e.target.value)}
              />
            </Field>
          </div>
          <Field label="Case Notes">
            <textarea
              rows={3}
              className={`${inputClasses} h-auto resize-none py-3`}
              placeholder="Write any extra case notes, doctor observations, or free-text details..."
              value={form.caseNotes}
              onChange={(e) => setField('caseNotes', e.target.value)}
            />
          </Field>
        </div>
      </Section>
    </div>
  )
}

function UploadTile({ label }: { label: string }) {
  return (
    <label className="flex h-28 cursor-pointer flex-col items-center justify-center gap-1.5 rounded-2xl border-2 border-dashed border-border bg-input text-muted transition hover:border-success/50 hover:text-success">
      <Upload className="size-6" />
      <span className="px-4 text-center text-xs font-medium">{label}</span>
      <input type="file" accept="image/*,.pdf" className="sr-only" />
    </label>
  )
}
