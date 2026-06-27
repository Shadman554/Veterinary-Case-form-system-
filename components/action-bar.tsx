import { Save, X } from 'lucide-react'

export function ActionBar() {
  return (
    <div className="border-t border-border bg-surface/90 px-4 py-3 backdrop-blur-md sm:px-6">
      <div className="mx-auto flex max-w-3xl items-center justify-end gap-3">
        <button
          type="button"
          className="flex h-11 items-center gap-2 rounded-xl border border-border bg-surface px-4 text-sm font-semibold text-muted transition hover:bg-input hover:text-foreground"
        >
          <X className="size-4" /> Cancel
        </button>
        <button
          type="button"
          className="flex h-11 flex-1 items-center justify-center gap-2 rounded-xl bg-primary px-5 text-sm font-semibold text-white shadow-lg shadow-primary/25 transition hover:bg-primary-hover sm:flex-none"
        >
          <Save className="size-4" /> Save Case
        </button>
      </div>
    </div>
  )
}
