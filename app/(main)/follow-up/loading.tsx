export default function FollowUpLoading() {
  return (
    <main className="flex-1 overflow-y-auto">
      <div className="sticky top-0 z-10 border-b border-border bg-surface/80 backdrop-blur-sm">
        <div className="flex items-center justify-between px-6 py-3">
          <div className="flex items-center gap-3">
            <div className="h-4 w-4 animate-pulse rounded bg-input" />
            <div className="h-4 w-24 animate-pulse rounded bg-input" />
            <div className="h-5 w-20 animate-pulse rounded-full bg-input" />
          </div>
          <div className="h-8 w-24 animate-pulse rounded-lg bg-input" />
        </div>
      </div>

      <div className="space-y-6 px-6 py-5">
        <div className="h-7 w-48 animate-pulse rounded-lg bg-input" />

        {/* Overdue group */}
        {['Overdue', 'Due today', 'Upcoming'].map((label, gi) => (
          <div key={label}>
            <div className="mb-2 flex items-center gap-2.5">
              <div className="h-2 w-2 animate-pulse rounded-full bg-input" />
              <div className="h-3 w-20 animate-pulse rounded bg-input" />
              <div className="h-px flex-1 bg-border" />
            </div>
            <div className="overflow-hidden rounded-2xl border border-border bg-surface">
              {[...Array(gi === 0 ? 3 : 2)].map((_, i) => (
                <div key={i} className={`flex items-center gap-4 px-4 py-3.5 ${i !== (gi === 0 ? 2 : 1) ? 'border-b border-border' : ''}`}>
                  <div className="w-1 self-stretch rounded-full bg-input" />
                  <div className="min-w-[140px] space-y-1.5">
                    <div className="h-4 w-16 animate-pulse rounded bg-input" />
                    <div className="h-3 w-24 animate-pulse rounded bg-input" />
                  </div>
                  <div className="hidden min-w-[160px] space-y-1.5 sm:block">
                    <div className="h-4 w-28 animate-pulse rounded bg-input" />
                    <div className="h-3 w-32 animate-pulse rounded bg-input" />
                  </div>
                  <div className="flex-1">
                    <div className="h-3 w-40 animate-pulse rounded bg-input" />
                  </div>
                  <div className="h-4 w-20 animate-pulse rounded bg-input" />
                  <div className="flex gap-1.5">
                    <div className="h-8 w-8 animate-pulse rounded-lg bg-input" />
                    <div className="h-8 w-8 animate-pulse rounded-lg bg-input" />
                    <div className="h-8 w-8 animate-pulse rounded-lg bg-input" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </main>
  )
}
