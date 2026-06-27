import { Sidebar } from '@/components/sidebar'
import { Topbar } from '@/components/topbar'

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen overflow-hidden bg-background">
      <Sidebar />
      <div className="flex min-w-0 flex-1 flex-col">
        <Topbar />
        {children}
      </div>
    </div>
  )
}
