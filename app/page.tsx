import { Sidebar } from '@/components/sidebar'
import { Topbar } from '@/components/topbar'
import { CaseMeta } from '@/components/case-meta'
import { CaseForm } from '@/components/case-form'
import { ActionBar } from '@/components/action-bar'

export default function Page() {
  return (
    <div className="flex h-screen overflow-hidden bg-background">
      <Sidebar />

      <div className="flex min-w-0 flex-1 flex-col">
        <Topbar />

        <main className="scroll-thin flex-1 overflow-y-auto">
          <div className="mx-auto max-w-3xl space-y-5 px-4 pb-28 pt-5 sm:px-6">
            <CaseMeta />
            <CaseForm />
          </div>
        </main>

        <ActionBar />
      </div>
    </div>
  )
}
