export default function ConsentLoading() {
  return (
    <main className="flex-1 overflow-y-auto">
      <div className="mx-auto max-w-2xl px-4 pb-12 pt-5 sm:px-6">
        {/* Document header skeleton */}
        <div className="mb-6 overflow-hidden rounded-2xl border border-border bg-surface shadow-[0_1px_2px_rgba(15,23,42,0.04)]">
          <div className="flex items-center justify-between bg-navy px-5 py-4">
            <div className="flex items-center gap-3">
              <div className="h-9 w-9 animate-pulse rounded-xl bg-white/10" />
              <div className="space-y-1.5">
                <div className="h-4 w-40 animate-pulse rounded bg-white/10" />
                <div className="h-3 w-56 animate-pulse rounded bg-white/10" />
              </div>
            </div>
            <div className="space-y-1.5 text-right">
              <div className="h-3 w-16 animate-pulse rounded bg-white/10" />
              <div className="h-4 w-32 animate-pulse rounded bg-white/10" />
            </div>
          </div>
          <div className="flex items-center gap-4 px-5 py-3">
            <div className="h-5 w-28 animate-pulse rounded bg-input" />
            <div className="ml-auto flex gap-2">
              <div className="h-8 w-28 animate-pulse rounded-lg bg-input" />
              <div className="h-8 w-16 animate-pulse rounded-lg bg-input" />
              <div className="h-8 w-24 animate-pulse rounded-lg bg-input" />
            </div>
          </div>
        </div>

        {/* Section skeletons */}
        {[3, 5, 2, 4].map((fields, i) => (
          <div key={i} className="mb-5 overflow-hidden rounded-2xl border border-border bg-surface shadow-[0_1px_2px_rgba(15,23,42,0.04)]">
            <div className="flex items-center gap-3 border-b border-border px-5 py-4">
              <div className="h-9 w-9 animate-pulse rounded-xl bg-input" />
              <div className="h-4 w-36 animate-pulse rounded bg-input" />
            </div>
            <div className="grid gap-4 p-5 sm:grid-cols-2">
              {[...Array(fields)].map((_, j) => (
                <div key={j} className={fields === 5 && j === 2 ? 'col-span-full space-y-1.5' : 'space-y-1.5'}>
                  <div className="h-3 w-24 animate-pulse rounded bg-input" />
                  <div className="h-11 w-full animate-pulse rounded-xl bg-input" />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </main>
  )
}
