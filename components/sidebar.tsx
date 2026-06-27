'use client'

import { useState } from 'react'
import {
  LayoutDashboard,
  PawPrint,
  Users,
  FlaskConical,
  CalendarClock,
  FileText,
  Receipt,
  Stethoscope,
  Settings,
  ChevronLeft,
  PanelLeftClose,
  PanelLeftOpen,
} from 'lucide-react'

const nav = [
  { label: 'Dashboard', icon: LayoutDashboard },
  { label: 'New Case', icon: PawPrint, active: true },
  { label: 'Patients', icon: Users },
  { label: 'Laboratory', icon: FlaskConical },
  { label: 'Follow Ups', icon: CalendarClock, badge: 45 },
  { label: 'Consent Forms', icon: FileText },
  { label: 'Payments', icon: Receipt },
]

export function Sidebar() {
  const [collapsed, setCollapsed] = useState(false)

  return (
    <aside
      className={`${
        collapsed ? 'w-[76px]' : 'w-[244px]'
      } hidden shrink-0 flex-col bg-navy text-white transition-all duration-300 lg:flex`}
    >
      {/* Brand */}
      <div className="flex h-16 items-center gap-3 px-4">
        <span className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-success font-bold">
          <Stethoscope className="size-5" />
        </span>
        {!collapsed && (
          <div className="min-w-0 leading-tight">
            <p className="truncate text-sm font-semibold">Royal Vet</p>
            <p className="truncate text-[11px] text-white/50">Hospital System</p>
          </div>
        )}
      </div>

      {/* Collapse toggle */}
      <button
        onClick={() => setCollapsed((c) => !c)}
        className="mx-3 mb-3 flex h-9 items-center justify-center gap-2 rounded-lg bg-white/5 text-xs font-medium text-white/70 transition hover:bg-white/10"
      >
        {collapsed ? (
          <PanelLeftOpen className="size-4" />
        ) : (
          <>
            <PanelLeftClose className="size-4" /> Collapse
          </>
        )}
      </button>

      {/* Nav */}
      <nav className="flex-1 space-y-1 px-3">
        {nav.map((item) => {
          const Icon = item.icon
          return (
            <button
              key={item.label}
              className={`group flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition ${
                item.active
                  ? 'bg-success text-white shadow-lg shadow-success/20'
                  : 'text-white/65 hover:bg-white/10 hover:text-white'
              }`}
            >
              <Icon className="size-[18px] shrink-0" />
              {!collapsed && <span className="flex-1 text-left">{item.label}</span>}
              {!collapsed && item.badge && (
                <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-danger px-1.5 text-[11px] font-bold">
                  {item.badge}
                </span>
              )}
            </button>
          )
        })}
      </nav>

      {/* Footer */}
      <div className="space-y-1 p-3">
        <button className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-white/65 transition hover:bg-white/10 hover:text-white">
          <Settings className="size-[18px] shrink-0" />
          {!collapsed && <span>Settings</span>}
        </button>
        <div className="mt-2 flex items-center gap-3 rounded-xl bg-white/5 p-2.5">
          <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-semibold">
            DR
          </span>
          {!collapsed && (
            <div className="min-w-0 flex-1 leading-tight">
              <p className="truncate text-xs font-semibold">Dr. Gullan</p>
              <p className="truncate text-[11px] text-white/50">Veterinarian</p>
            </div>
          )}
          {!collapsed && <ChevronLeft className="size-4 text-white/40" />}
        </div>
      </div>
    </aside>
  )
}
