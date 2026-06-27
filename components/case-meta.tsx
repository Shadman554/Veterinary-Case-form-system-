import { Hash, Calendar, Clock } from 'lucide-react'
import { Card } from './ui'

export function CaseMeta() {
  return (
    <Card className="overflow-hidden">
      <div className="flex flex-col gap-4 p-5 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-4">
          <span className="flex size-12 items-center justify-center rounded-2xl bg-success/10 text-success">
            <Hash className="size-6" />
          </span>
          <div>
            <p className="text-xs font-medium text-muted">New Case</p>
            <h1 className="text-lg font-bold text-foreground">
              Case No. <span className="text-faint">_ _ _ _</span>
            </h1>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-2.5 rounded-xl border border-border bg-input px-4 py-2.5">
            <Calendar className="size-4 text-faint" />
            <div className="leading-tight">
              <p className="text-[11px] text-faint">Date</p>
              <p className="text-sm font-semibold">27 / 06 / 2026</p>
            </div>
          </div>
          <div className="flex items-center gap-2.5 rounded-xl border border-border bg-input px-4 py-2.5">
            <Clock className="size-4 text-faint" />
            <div className="leading-tight">
              <p className="text-[11px] text-faint">Time</p>
              <p className="text-sm font-semibold">10:32 AM</p>
            </div>
          </div>
          <span className="flex items-center gap-1.5 rounded-full bg-warning/10 px-3 py-1.5 text-xs font-semibold text-warning">
            <span className="size-1.5 rounded-full bg-warning" /> Incomplete
          </span>
        </div>
      </div>
    </Card>
  )
}
