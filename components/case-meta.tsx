'use client'

import { useEffect, useState } from 'react'
import { Hash, Calendar, Clock } from 'lucide-react'
import { Card } from './ui'
import { useCaseCtx } from '@/lib/case-context'

export function CaseMeta() {
  const { form } = useCaseCtx()
  const [dateStr, setDateStr] = useState('')
  const [time, setTime] = useState('')

  useEffect(() => {
    function tick() {
      const d = new Date()
      const h = d.getHours()
      const m = String(d.getMinutes()).padStart(2, '0')
      const ampm = h >= 12 ? 'PM' : 'AM'
      const h12 = h % 12 || 12
      setTime(`${h12}:${m} ${ampm}`)
      setDateStr(
        `${String(d.getDate()).padStart(2, '0')} / ${String(d.getMonth() + 1).padStart(2, '0')} / ${d.getFullYear()}`
      )
    }
    tick()
    const id = setInterval(tick, 10000)
    return () => clearInterval(id)
  }, [])

  const isSaved = form.status === 'Saved'

  return (
    <Card className="overflow-hidden">
      <div className="flex flex-col gap-4 p-5 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-4">
          <span className={`flex size-12 items-center justify-center rounded-2xl ${isSaved ? 'bg-success/10 text-success' : 'bg-warning/10 text-warning'}`}>
            <Hash className="size-6" />
          </span>
          <div>
            <p className="text-xs font-medium text-muted">
              {form.caseNumber ? 'Case' : 'New Case'}
            </p>
            <h1 className="text-lg font-bold text-foreground">
              Case No.{' '}
              {form.caseNumber ? (
                <span className="text-foreground">#{form.caseNumber}</span>
              ) : (
                <span className="text-faint">_ _ _ _</span>
              )}
            </h1>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-2.5 rounded-xl border border-border bg-input px-4 py-2.5">
            <Calendar className="size-4 text-faint" />
            <div className="leading-tight">
              <p className="text-[11px] text-faint">Date</p>
              <p className="text-sm font-semibold">{dateStr}</p>
            </div>
          </div>
          <div className="flex items-center gap-2.5 rounded-xl border border-border bg-input px-4 py-2.5">
            <Clock className="size-4 text-faint" />
            <div className="leading-tight">
              <p className="text-[11px] text-faint">Time</p>
              <p className="text-sm font-semibold">{time}</p>
            </div>
          </div>
          <span
            className={`flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold ${
              isSaved
                ? 'bg-success/10 text-success'
                : 'bg-warning/10 text-warning'
            }`}
          >
            <span className={`size-1.5 rounded-full ${isSaved ? 'bg-success' : 'bg-warning'}`} />
            {form.status}
          </span>
        </div>
      </div>
    </Card>
  )
}
