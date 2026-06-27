import type { Metadata } from 'next'
import { GeistSans } from 'geist/font/sans'
import { CaseProvider } from '@/lib/case-context'
import './globals.css'

export const metadata: Metadata = {
  title: 'Royal Veterinary Hospital — Case Form',
  description:
    'New case intake, examination, laboratory and prescription form for Royal Veterinary Hospital.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={GeistSans.variable}>
      <body className="font-sans antialiased">
        <CaseProvider>{children}</CaseProvider>
      </body>
    </html>
  )
}
