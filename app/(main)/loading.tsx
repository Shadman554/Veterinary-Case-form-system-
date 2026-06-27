export default function HomeLoading() {
  return (
    <div className="flex min-h-0 flex-1 overflow-hidden">
      <main className="flex-1 overflow-y-auto">
        <div className="mx-auto max-w-2xl space-y-5 px-4 pb-10 pt-5 sm:px-6">
          {/* Case meta skeleton */}
          <div className="overflow-hidden rounded-2xl border border-border bg-surface shadow-[0_1px_2px_rgba(15,23,42,0.04)]">
            <div className="flex items-center gap-4 px-5 py-4">
              <div className="h-10 w-10 animate-pulse rounded-xl bg-input" />
              <div className="space-y-1.5">
                <div className="h-3 w-20 animate-pulse rounded bg-input" />
                <div className="h-5 w-32 animate-pulse rounded bg-input" />
              </div>
              <div className="ml-auto flex gap-2">
                <div className="h-8 w-20 animate-pulse rounded-lg bg-input" />
                <div className="h-8 w-20 animate-pulse rounded-lg bg-input" />
              </div>
            </div>
          </div>

          {/* Section skeletons */}
          {[3, 2, 4, 3].map((fields, i) => (
            <div key={i} className="overflow-hidden rounded-2xl border border-border bg-surface shadow-[0_1px_2px_rgba(15,23,42,0.04)]">
              <div className="flex items-center gap-3 border-b border-border px-5 py-4">
                <div className="h-9 w-9 animate-pulse rounded-xl bg-input" />
                <div className="h-4 w-36 animate-pulse rounded bg-input" />
              </div>
              <div className="grid gap-4 p-5 sm:grid-cols-2 lg:grid-cols-3">
                {[...Array(fields)].map((_, j) => (
                  <div key={j} className="space-y-1.5">
                    <div className="h-3 w-20 animate-pulse rounded bg-input" />
                    <div className="h-11 w-full animate-pulse rounded-xl bg-input" />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Right panel skeleton */}
      <aside className="flex h-full w-72 shrink-0 flex-col overflow-hidden border-l border-border bg-surface">
        <div className="border-b border-border p-4">
          <div className="h-11 w-full animate-pulse rounded-xl bg-input" />
        </div>
        <div className="flex-1 space-y-2 p-3">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="flex items-center gap-3 rounded-xl p-3">
              <div className="h-8 w-8 animate-pulse rounded-full bg-input" />
              <div className="flex-1 space-y-1">
                <div className="h-3 w-24 animate-pulse rounded bg-input" />
                <div className="h-3 w-16 animate-pulse rounded bg-input" />
              </div>
            </div>
          ))}
        </div>
      </aside>
    </div>
  )
}
