import { Sidebar } from '@/components/sidebar'
import { Topbar } from '@/components/topbar'
import { CaseMeta } from '@/components/case-meta'
import { CaseForm } from '@/components/case-form'
import { CasePanel } from '@/components/case-panel'

export default function Page() {
  return (
    <div className="flex h-screen overflow-hidden bg-background">
      <Sidebar />

      <div className="flex min-w-0 flex-1 flex-col">
        <Topbar />

        <div className="flex min-h-0 flex-1 overflow-hidden">
          {/* Main form area */}
          <main className="scroll-thin min-w-0 flex-1 overflow-y-auto">
            <div className="mx-auto max-w-2xl space-y-5 px-4 pb-10 pt-5 sm:px-6">
              <CaseMeta />
              <CaseForm />
            </div>
          </main>

          {/* Right panel */}
          <aside className="scroll-thin overflow-y-auto">
            <CasePanel />
          </aside>
        </div>
      </div>
    </div>
  )
}
