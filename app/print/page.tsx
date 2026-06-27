'use client'

import { useEffect, useState } from 'react'
import type { CaseData } from '@/lib/case-context'

const DEMO: CaseData = {
  caseNumber: 715,
  status: 'Saved',
  date: '',
  time: '',
  ownerName: 'Mohammed Ali',
  contactInfo: '0770 089 3434',
  address: 'Sulaymaniyah, Iraq',
  patientName: 'Luna',
  breed: 'Persian',
  microchip: 'MC-00124578',
  species: 'Cat',
  age: '3',
  ageUnit: 'Year',
  weight: '4.2',
  gender: 'Female',
  stray: false,
  neutered: 'Yes',
  vaccinated: 'Yes',
  reasonForVisit: 'Routine check-up and vaccination booster.',
  history: 'No known previous illnesses.',
  temperature: '38.5',
  heartRate: '140',
  respRate: '24',
  mentation: 'BAR/QAR',
  respiratory: new Set(['Appear normal']),
  weightBcs: new Set(['Ideal Weight']),
  doctor: 'Gullan',
  tech: 'Halwest',
  labs: new Set(['CBC (Complete Blood Count)', 'Biochemistry']),
  prescription: 'Amoxicillin 50mg — 1 tablet twice daily for 7 days.',
  diagnosis: 'Upper respiratory tract infection (mild)',
  followUpDate: '2026-07-10',
  caseNotes: 'Patient is calm and cooperative. Owner advised on diet and hydration.',
}

function parse(raw: string | null): CaseData | null {
  if (!raw) return DEMO
  try {
    const obj = JSON.parse(raw)
    obj.respiratory = new Set(obj.respiratory ?? [])
    obj.weightBcs = new Set(obj.weightBcs ?? [])
    obj.labs = new Set(obj.labs ?? [])
    return obj as CaseData
  } catch {
    return DEMO
  }
}

export default function PrintPage() {
  const [data, setData] = useState<CaseData>(DEMO)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    const raw = localStorage.getItem('rv_print_case')
    setData(parse(raw) ?? DEMO)
    setReady(true)
  }, [])

  useEffect(() => {
    if (!ready) return
    const t = setTimeout(() => window.print(), 600)
    return () => clearTimeout(t)
  }, [ready])

  const checked = (v: boolean) => v ? '☑' : '☐'
  const setChecked = (s: Set<string>, v: string) => s.has(v) ? '☑' : '☐'

  const today = new Date()
  const dateStr = `${String(today.getDate()).padStart(2,'0')}/${String(today.getMonth()+1).padStart(2,'0')}/${today.getFullYear()}`
  const h = today.getHours(), m = today.getMinutes()
  const timeStr = `${h%12||12}:${String(m).padStart(2,'0')} ${h>=12?'PM':'AM'}`

  return (
    <div id="print-root">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');

        * { margin: 0; padding: 0; box-sizing: border-box; }

        body {
          font-family: 'Inter', 'Segoe UI', Arial, sans-serif;
          background: #f3f4f6;
          color: #111827;
          font-size: 9.5pt;
          line-height: 1.4;
        }

        #print-root {
          display: flex;
          justify-content: center;
          padding: 20px;
        }

        .page {
          width: 210mm;
          min-height: 297mm;
          background: white;
          box-shadow: 0 4px 32px rgba(0,0,0,0.12);
          display: flex;
          flex-direction: column;
        }

        /* ─── Header ─── */
        .header {
          background: #0f172a;
          color: white;
          padding: 16px 24px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 16px;
        }
        .header-brand {
          display: flex;
          align-items: center;
          gap: 12px;
        }
        .header-logo {
          width: 42px;
          height: 42px;
          background: #22c55e;
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 18pt;
          font-weight: 800;
        }
        .header-name { font-size: 16pt; font-weight: 700; letter-spacing: -0.3px; }
        .header-sub  { font-size: 8pt; color: rgba(255,255,255,0.55); margin-top: 2px; }
        .header-meta { text-align: right; }
        .header-case { font-size: 18pt; font-weight: 800; color: #22c55e; }
        .header-dt   { font-size: 8pt; color: rgba(255,255,255,0.6); margin-top: 4px; }

        /* ─── Body ─── */
        .body { padding: 18px 24px; flex: 1; display: flex; flex-direction: column; gap: 12px; }

        /* ─── Section ─── */
        .section { border: 1px solid #e5e7eb; border-radius: 8px; overflow: hidden; }
        .section-head {
          background: #f8fafc;
          border-bottom: 1px solid #e5e7eb;
          padding: 6px 12px;
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .section-num {
          width: 18px; height: 18px;
          background: #0f172a;
          color: white;
          border-radius: 4px;
          font-size: 8pt;
          font-weight: 700;
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0;
        }
        .section-title { font-size: 8pt; font-weight: 700; text-transform: uppercase; letter-spacing: 0.6px; color: #374151; }
        .section-body  { padding: 10px 12px; }

        /* ─── Grid helpers ─── */
        .grid2 { display: grid; grid-template-columns: 1fr 1fr; gap: 8px 16px; }
        .grid3 { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 8px 16px; }
        .grid4 { display: grid; grid-template-columns: 1fr 1fr 1fr 1fr; gap: 8px 16px; }

        /* ─── Field ─── */
        .field { display: flex; flex-direction: column; gap: 2px; }
        .field-label { font-size: 7.5pt; color: #6b7280; font-weight: 500; }
        .field-value {
          font-size: 9pt; font-weight: 500; color: #111827;
          border-bottom: 1.5px solid #d1d5db;
          padding-bottom: 3px;
          min-height: 18px;
        }
        .field-value.tall { min-height: 40px; border: 1.5px solid #d1d5db; border-radius: 4px; padding: 4px 6px; }
        .field-value.empty { color: #d1d5db; }

        /* ─── Checkboxes ─── */
        .checks-grid { display: flex; flex-wrap: wrap; gap: 4px 16px; }
        .check-item  { display: flex; align-items: center; gap: 4px; font-size: 8.5pt; white-space: nowrap; }
        .check-box {
          width: 12px; height: 12px;
          border: 1.5px solid #9ca3af;
          border-radius: 2px;
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0;
        }
        .check-box.on { border-color: #0f172a; background: #0f172a; color: white; font-size: 8pt; }

        /* ─── Pills ─── */
        .pill-row { display: flex; flex-wrap: wrap; gap: 4px; }
        .pill {
          border: 1.5px solid #d1d5db;
          border-radius: 20px;
          padding: 2px 9px;
          font-size: 8pt;
          color: #374151;
        }
        .pill.on { border-color: #0f172a; background: #0f172a; color: white; font-weight: 600; }

        /* ─── Footer ─── */
        .footer {
          background: #0f172a;
          color: rgba(255,255,255,0.6);
          padding: 10px 24px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          font-size: 7.5pt;
          gap: 12px;
        }
        .footer-followup {
          text-align: right;
          color: white;
          font-size: 8pt;
        }
        .footer-followup span { color: #22c55e; font-weight: 700; font-size: 9pt; }

        /* ─── Horizontal divider ─── */
        .hdivider { border: none; border-top: 1px solid #e5e7eb; margin: 8px 0; }

        /* ─── Status badge ─── */
        .status-badge {
          display: inline-flex; align-items: center; gap: 4px;
          padding: 2px 8px; border-radius: 20px; font-size: 7.5pt; font-weight: 600;
        }
        .status-saved { background: #dcfce7; color: #15803d; }
        .status-incomplete { background: #fef3c7; color: #b45309; }

        @media print {
          body { background: white; }
          #print-root { padding: 0; }
          .page { box-shadow: none; width: 100%; min-height: 100vh; }
          @page { size: A4; margin: 0; }
        }
      `}</style>

      <div className="page">
        {/* Header */}
        <div className="header">
          <div className="header-brand">
            <div className="header-logo">🐾</div>
            <div>
              <div className="header-name">Royal Vet</div>
              <div className="header-sub">Veterinary Hospital System</div>
            </div>
          </div>
          <div className="header-meta">
            <div className="header-case">
              Case #{data.caseNumber ?? '—'}
            </div>
            <div className="header-dt">{dateStr} &nbsp;·&nbsp; {timeStr}</div>
            <div style={{marginTop:'4px'}}>
              <span className={`status-badge ${data.status === 'Saved' ? 'status-saved' : 'status-incomplete'}`}>
                {data.status}
              </span>
            </div>
          </div>
        </div>

        {/* Body */}
        <div className="body">

          {/* 1. Pet / Owner */}
          <div className="section">
            <div className="section-head">
              <div className="section-num">1</div>
              <div className="section-title">Pet &amp; Owner Information</div>
            </div>
            <div className="section-body">
              <div className="grid2" style={{marginBottom:'10px'}}>
                <div>
                  <div className="grid2" style={{gap:'6px 12px'}}>
                    <div className="field">
                      <div className="field-label">Owner Name</div>
                      <div className={`field-value ${!data.ownerName ? 'empty' : ''}`}>{data.ownerName || '—'}</div>
                    </div>
                    <div className="field">
                      <div className="field-label">Contact Info</div>
                      <div className={`field-value ${!data.contactInfo ? 'empty' : ''}`}>{data.contactInfo || '—'}</div>
                    </div>
                    <div className="field" style={{gridColumn:'1/-1'}}>
                      <div className="field-label">Address</div>
                      <div className={`field-value ${!data.address ? 'empty' : ''}`}>{data.address || '—'}</div>
                    </div>
                  </div>
                </div>

                <div>
                  <div className="grid2" style={{gap:'6px 12px'}}>
                    <div className="field">
                      <div className="field-label">Patient Name</div>
                      <div className={`field-value ${!data.patientName ? 'empty' : ''}`}>{data.patientName || '—'}</div>
                    </div>
                    <div className="field">
                      <div className="field-label">Breed</div>
                      <div className={`field-value ${!data.breed ? 'empty' : ''}`}>{data.breed || '—'}</div>
                    </div>
                    <div className="field">
                      <div className="field-label">Species</div>
                      <div className="field-value">{data.species}</div>
                    </div>
                    <div className="field">
                      <div className="field-label">Microchip No.</div>
                      <div className={`field-value ${!data.microchip ? 'empty' : ''}`}>{data.microchip || '—'}</div>
                    </div>
                  </div>
                </div>
              </div>

              <hr className="hdivider" />

              <div className="grid4" style={{gap:'6px 16px'}}>
                <div className="field">
                  <div className="field-label">Age</div>
                  <div className={`field-value ${!data.age ? 'empty' : ''}`}>{data.age ? `${data.age} ${data.ageUnit}` : '—'}</div>
                </div>
                <div className="field">
                  <div className="field-label">Weight</div>
                  <div className={`field-value ${!data.weight ? 'empty' : ''}`}>{data.weight ? `${data.weight} Kg` : '—'}</div>
                </div>
                <div className="field">
                  <div className="field-label">Gender</div>
                  <div className="field-value">{data.gender}</div>
                </div>
                <div className="field">
                  <div className="field-label">Stray</div>
                  <div className="field-value">{data.stray ? 'Yes' : 'No'}</div>
                </div>
                <div className="field">
                  <div className="field-label">Neutered / Spayed</div>
                  <div className="field-value">{data.neutered}</div>
                </div>
                <div className="field">
                  <div className="field-label">Vaccinated</div>
                  <div className="field-value">{data.vaccinated}</div>
                </div>
              </div>
            </div>
          </div>

          {/* 2. Reason + History */}
          <div className="section">
            <div className="section-head">
              <div className="section-num">2</div>
              <div className="section-title">Reason For Visit &amp; History</div>
            </div>
            <div className="section-body">
              <div className="grid2">
                <div className="field">
                  <div className="field-label">Reason For Visit</div>
                  <div className={`field-value tall ${!data.reasonForVisit ? 'empty' : ''}`}>{data.reasonForVisit || '—'}</div>
                </div>
                <div className="field">
                  <div className="field-label">Previous Illnesses, Surgeries, Allergies or Health Issues</div>
                  <div className={`field-value tall ${!data.history ? 'empty' : ''}`}>{data.history || '—'}</div>
                </div>
              </div>
            </div>
          </div>

          {/* 3. Case Notes */}
          <div className="section">
            <div className="section-head">
              <div className="section-num">3</div>
              <div className="section-title">Case Notes</div>
            </div>
            <div className="section-body">
              <div className={`field-value tall ${!data.caseNotes ? 'empty' : ''}`}>{data.caseNotes || '—'}</div>
            </div>
          </div>

          {/* 4. Vital Signs */}
          <div className="section">
            <div className="section-head">
              <div className="section-num">4</div>
              <div className="section-title">Vital Signs</div>
            </div>
            <div className="section-body">
              <div className="grid3">
                <div className="field">
                  <div className="field-label">Temperature</div>
                  <div className={`field-value ${!data.temperature ? 'empty' : ''}`}>{data.temperature ? `${data.temperature} °C` : '—'}</div>
                </div>
                <div className="field">
                  <div className="field-label">Heart Rate</div>
                  <div className={`field-value ${!data.heartRate ? 'empty' : ''}`}>{data.heartRate ? `${data.heartRate} bpm` : '—'}</div>
                </div>
                <div className="field">
                  <div className="field-label">Respiratory Rate</div>
                  <div className={`field-value ${!data.respRate ? 'empty' : ''}`}>{data.respRate ? `${data.respRate} brpm` : '—'}</div>
                </div>
              </div>
            </div>
          </div>

          {/* 5. Physical Examination */}
          <div className="section">
            <div className="section-head">
              <div className="section-num">5</div>
              <div className="section-title">Physical Examination</div>
            </div>
            <div className="section-body" style={{display:'flex', flexDirection:'column', gap:'8px'}}>
              <div className="grid3" style={{alignItems:'start'}}>
                <div>
                  <div className="field-label" style={{marginBottom:'5px'}}>Mentation / Attitude</div>
                  <div style={{display:'flex', flexDirection:'column', gap:'3px'}}>
                    {['BAR/QAR','Aggressive','Depressed','Anxious/Fearful'].map(o => (
                      <div key={o} className="check-item">
                        <div className={`check-box ${data.mentation === o ? 'on' : ''}`}>{data.mentation === o ? '✓' : ''}</div>
                        <span>{o}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <div className="field-label" style={{marginBottom:'5px'}}>Respiratory / Lungs</div>
                  <div style={{display:'flex', flexDirection:'column', gap:'3px'}}>
                    {['Appear normal','Nasal discharge','Congestion','Abnormal sound','Rapid Breathing','Breathing Difficulty','Coughing','Other'].map(o => (
                      <div key={o} className="check-item">
                        <div className={`check-box ${data.respiratory.has(o) ? 'on' : ''}`}>{data.respiratory.has(o) ? '✓' : ''}</div>
                        <span>{o}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <div className="field-label" style={{marginBottom:'5px'}}>Weight / BCS</div>
                  <div style={{display:'flex', flexDirection:'column', gap:'3px'}}>
                    {['Ideal Weight','Overweight','Underweight'].map(o => (
                      <div key={o} className="check-item">
                        <div className={`check-box ${data.weightBcs.has(o) ? 'on' : ''}`}>{data.weightBcs.has(o) ? '✓' : ''}</div>
                        <span>{o}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <hr className="hdivider" />

              <div className="grid2">
                <div className="field">
                  <div className="field-label">By Dr.</div>
                  <div className={`field-value ${!data.doctor ? 'empty' : ''}`}>{data.doctor || '—'}</div>
                </div>
                <div className="field">
                  <div className="field-label">By Technician</div>
                  <div className={`field-value ${!data.tech ? 'empty' : ''}`}>{data.tech || '—'}</div>
                </div>
              </div>
            </div>
          </div>

          {/* 6. Laboratory */}
          <div className="section">
            <div className="section-head">
              <div className="section-num">6</div>
              <div className="section-title">Laboratory Examinations</div>
            </div>
            <div className="section-body">
              <div className="grid4" style={{gap:'4px 16px'}}>
                {['CBC (Complete Blood Count)','Biochemistry','Urine Analyser','X-Ray','Sonar','Viral Test','Skin Test','ESR','Fecal Sample','Fluid Therapy'].map(o => (
                  <div key={o} className="check-item">
                    <div className={`check-box ${data.labs.has(o) ? 'on' : ''}`}>{data.labs.has(o) ? '✓' : ''}</div>
                    <span style={{fontSize:'8pt'}}>{o}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* 7. Prescription & Diagnosis */}
          <div className="section">
            <div className="section-head">
              <div className="section-num">7</div>
              <div className="section-title">Prescription &amp; Diagnosis</div>
            </div>
            <div className="section-body">
              <div className="grid2">
                <div className="field">
                  <div className="field-label">Prescription</div>
                  <div className={`field-value tall ${!data.prescription ? 'empty' : ''}`} style={{minHeight:'52px'}}>{data.prescription || '—'}</div>
                </div>
                <div className="field">
                  <div className="field-label">Suspect Diagnosis</div>
                  <div className={`field-value ${!data.diagnosis ? 'empty' : ''}`}>{data.diagnosis || '—'}</div>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Footer */}
        <div className="footer">
          <div>
            <div style={{color:'white', fontWeight:600, marginBottom:'2px'}}>Royal Veterinary Hospital</div>
            <div>📞 0770 089 3434 &nbsp;·&nbsp; 📍 Sulaymaniyah, Iraq</div>
          </div>
          <div style={{textAlign:'center', color:'rgba(255,255,255,0.4)'}}>
            <div>royal_vethospital</div>
            <div>Royal Veterinary Hospital</div>
          </div>
          <div className="footer-followup">
            <div style={{marginBottom:'3px', fontSize:'7.5pt', color:'rgba(255,255,255,0.5)'}}>Follow Up Next Visit</div>
            <span>{data.followUpDate || '—'}</span>
          </div>
        </div>
      </div>
    </div>
  )
}
