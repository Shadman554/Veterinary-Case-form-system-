'use client'

import { createContext, useContext, useState, useCallback, type ReactNode } from 'react'

export type CaseStatus = 'Incomplete' | 'Saved'

export interface CaseData {
  caseNumber: number | null
  status: CaseStatus
  date: string
  time: string
  ownerName: string
  contactInfo: string
  address: string
  patientName: string
  breed: string
  microchip: string
  species: string
  age: string
  ageUnit: string
  weight: string
  gender: string
  stray: boolean
  neutered: string
  vaccinated: string
  reasonForVisit: string
  history: string
  temperature: string
  heartRate: string
  respRate: string
  mentation: string
  respiratory: Set<string>
  weightBcs: Set<string>
  doctor: string
  tech: string
  labs: Set<string>
  prescription: string
  diagnosis: string
  followUpDate: string
  caseNotes: string
}

export interface SavedCaseEntry {
  id: number
  patientName: string
  status: CaseStatus
  time: string
  data: CaseData
}

const initialData = (): CaseData => ({
  caseNumber: null,
  status: 'Incomplete',
  date: todayStr(),
  time: nowStr(),
  ownerName: '',
  contactInfo: '',
  address: '',
  patientName: '',
  breed: '',
  microchip: '',
  species: 'Dog',
  age: '',
  ageUnit: 'Year',
  weight: '',
  gender: 'Male',
  stray: false,
  neutered: 'No',
  vaccinated: 'Yes',
  reasonForVisit: '',
  history: '',
  temperature: '',
  heartRate: '',
  respRate: '',
  mentation: 'BAR/QAR',
  respiratory: new Set(['Appear normal']),
  weightBcs: new Set<string>(),
  doctor: '',
  tech: '',
  labs: new Set(['CBC (Complete Blood Count)']),
  prescription: '',
  diagnosis: '',
  followUpDate: '',
  caseNotes: '',
})

function todayStr() {
  const d = new Date()
  return `${String(d.getDate()).padStart(2, '0')} / ${String(d.getMonth() + 1).padStart(2, '0')} / ${d.getFullYear()}`
}

function nowStr() {
  const d = new Date()
  const h = d.getHours()
  const m = String(d.getMinutes()).padStart(2, '0')
  const ampm = h >= 12 ? 'PM' : 'AM'
  const h12 = h % 12 || 12
  return `${h12}:${m} ${ampm}`
}

let caseCounter = 714

interface CaseCtx {
  form: CaseData
  setField: <K extends keyof CaseData>(key: K, value: CaseData[K]) => void
  toggleSet: (key: 'respiratory' | 'labs' | 'weightBcs', value: string) => void
  savedCases: SavedCaseEntry[]
  saveCase: () => void
  loadCase: (entry: SavedCaseEntry) => void
  newCase: () => void
}

const CaseContext = createContext<CaseCtx | null>(null)

export function CaseProvider({ children }: { children: ReactNode }) {
  const [form, setForm] = useState<CaseData>(initialData)
  const [savedCases, setSavedCases] = useState<SavedCaseEntry[]>([
    {
      id: 714,
      patientName: 'pumpkin',
      status: 'Saved',
      time: 'tap to open',
      data: { ...initialData(), caseNumber: 714, patientName: 'pumpkin', status: 'Saved' },
    },
    {
      id: 713,
      patientName: 'Blind dler',
      status: 'Incomplete',
      time: 'just now',
      data: { ...initialData(), caseNumber: 713, patientName: 'Blind dler', status: 'Incomplete' },
    },
    {
      id: 712,
      patientName: 'Milo',
      status: 'Saved',
      time: '2h ago',
      data: { ...initialData(), caseNumber: 712, patientName: 'Milo', status: 'Saved' },
    },
    {
      id: 711,
      patientName: 'Luna',
      status: 'Saved',
      time: '4h ago',
      data: { ...initialData(), caseNumber: 711, patientName: 'Luna', status: 'Saved' },
    },
    {
      id: 710,
      patientName: 'Rocky',
      status: 'Incomplete',
      time: 'today',
      data: { ...initialData(), caseNumber: 710, patientName: 'Rocky', status: 'Incomplete' },
    },
  ])

  const setField = useCallback(<K extends keyof CaseData>(key: K, value: CaseData[K]) => {
    setForm((prev) => ({ ...prev, [key]: value }))
  }, [])

  const toggleSet = useCallback((key: 'respiratory' | 'labs' | 'weightBcs', value: string) => {
    setForm((prev) => {
      const next = new Set(prev[key])
      next.has(value) ? next.delete(value) : next.add(value)
      return { ...prev, [key]: next }
    })
  }, [])

  const saveCase = useCallback(() => {
    setForm((prev) => {
      const isNew = prev.caseNumber === null
      const id = isNew ? ++caseCounter : prev.caseNumber!
      const saved: CaseData = { ...prev, caseNumber: id, status: 'Saved' }

      setSavedCases((cases) => {
        const filtered = cases.filter((c) => c.id !== id)
        return [
          {
            id,
            patientName: saved.patientName || `Case #${id}`,
            status: 'Saved',
            time: 'just now',
            data: saved,
          },
          ...filtered,
        ]
      })

      return saved
    })
  }, [])

  const loadCase = useCallback((entry: SavedCaseEntry) => {
    setForm({ ...entry.data, date: todayStr(), time: nowStr() })
  }, [])

  const newCase = useCallback(() => {
    caseCounter++
    setForm({ ...initialData(), date: todayStr(), time: nowStr() })
  }, [])

  return (
    <CaseContext.Provider value={{ form, setField, toggleSet, savedCases, saveCase, loadCase, newCase }}>
      {children}
    </CaseContext.Provider>
  )
}

export function useCaseCtx() {
  const ctx = useContext(CaseContext)
  if (!ctx) throw new Error('useCaseCtx must be used inside CaseProvider')
  return ctx
}
