export default function CasesLoading() {
  return (
    <main className="flex-1 overflow-y-auto">
      {/* Search bar skeleton */}
      <div className="sticky top-0 z-10 border-b border-border bg-surface/80 backdrop-blur-sm">
        <div className="flex items-center gap-2 px-6 py-3">
          <div className="h-9 flex-1 animate-pulse rounded-lg bg-input" />
          <div className="h-9 w-20 animate-pulse rounded-lg bg-input" />
          <div className="h-9 w-24 animate-pulse rounded-lg bg-input" />
        </div>
      </div>

      <div className="px-6 py-5">
        <div className="mb-5 h-7 w-40 animate-pulse rounded-lg bg-input" />

        {/* Date group 1 */}
        <div className="mb-5">
          <div className="mb-2 flex items-center gap-3">
            <div className="h-3 w-24 animate-pulse rounded bg-input" />
            <div className="h-px flex-1 bg-border" />
          </div>
          <div className="overflow-hidden rounded-2xl border border-border bg-surface">
            {[...Array(3)].map((_, i) => (
              <div key={i} className={`flex items-center gap-4 px-4 py-4 ${i !== 2 ? 'border-b border-border' : ''}`}>
                <div className="w-16 space-y-1.5">
                  <div className="h-4 w-10 animate-pulse rounded bg-input" />
                  <div className="h-3 w-8 animate-pulse rounded bg-input" />
                </div>
                <div className="h-7 w-7 animate-pulse rounded-full bg-input" />
                <div className="flex-1 space-y-1.5">
                  <div className="h-4 w-28 animate-pulse rounded bg-input" />
                  <div className="h-3 w-20 animate-pulse rounded bg-input" />
                </div>
                <div className="flex-1 space-y-1.5">
                  <div className="h-4 w-24 animate-pulse rounded bg-input" />
                  <div className="h-3 w-32 animate-pulse rounded bg-input" />
                </div>
                <div className="flex-1">
                  <div className="h-4 w-36 animate-pulse rounded bg-input" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Date group 2 */}
        <div className="mb-5">
          <div className="mb-2 flex items-center gap-3">
            <div className="h-3 w-24 animate-pulse rounded bg-input" />
            <div className="h-px flex-1 bg-border" />
          </div>
          <div className="overflow-hidden rounded-2xl border border-border bg-surface">
            {[...Array(5)].map((_, i) => (
              <div key={i} className={`flex items-center gap-4 px-4 py-4 ${i !== 4 ? 'border-b border-border' : ''}`}>
                <div className="w-16 space-y-1.5">
                  <div className="h-4 w-10 animate-pulse rounded bg-input" />
                  <div className="h-3 w-8 animate-pulse rounded bg-input" />
                </div>
                <div className="h-7 w-7 animate-pulse rounded-full bg-input" />
                <div className="flex-1 space-y-1.5">
                  <div className="h-4 w-28 animate-pulse rounded bg-input" />
                  <div className="h-3 w-20 animate-pulse rounded bg-input" />
                </div>
                <div className="flex-1 space-y-1.5">
                  <div className="h-4 w-24 animate-pulse rounded bg-input" />
                  <div className="h-3 w-32 animate-pulse rounded bg-input" />
                </div>
                <div className="flex-1">
                  <div className="h-4 w-36 animate-pulse rounded bg-input" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  )
}
