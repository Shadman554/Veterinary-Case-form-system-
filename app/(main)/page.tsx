import { CaseMeta } from '@/components/case-meta'
import { CaseForm } from '@/components/case-form'
import { CasePanel } from '@/components/case-panel'

export default function Page() {
  return (
    <div className="flex min-h-0 flex-1 overflow-hidden">
      <main className="scroll-thin min-w-0 flex-1 overflow-y-auto">
        <div className="mx-auto max-w-2xl space-y-5 px-4 pb-10 pt-5 sm:px-6">
          <CaseMeta />
          <CaseForm />
        </div>
      </main>
      <aside className="flex h-full w-72 shrink-0 flex-col overflow-hidden">
        <CasePanel />
      </aside>
    </div>
  )
}
