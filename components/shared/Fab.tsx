'use client'

import { Plus } from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

type FabRootProps = {
  children: React.ReactNode
}

function FabRoot({ children }: FabRootProps) {
  return (
    <div className="pointer-events-none fixed right-6 bottom-6 z-50">
      <div className="pointer-events-auto">
        <DropdownMenu>{children}</DropdownMenu>
      </div>
    </div>
  )
}

type FabTriggerProps = {
  label: string
}

function FabTrigger({ label }: FabTriggerProps) {
  return (
    <DropdownMenuTrigger asChild>
      <button
        type="button"
        aria-label={label}
        className="flex size-14 items-center justify-center rounded-full bg-[#06C755] text-white shadow-[0_10px_30px_rgba(6,199,85,0.35)] ring-1 ring-black/[0.06] transition hover:scale-[1.04] hover:bg-[#05b04a] active:scale-[0.96]"
      >
        <Plus className="size-6" strokeWidth={2.5} />
      </button>
    </DropdownMenuTrigger>
  )
}

type FabMenuProps = {
  children: React.ReactNode
}

function FabMenu({ children }: FabMenuProps) {
  return (
    <DropdownMenuContent
      align="end"
      side="top"
      sideOffset={12}
      className="min-w-[220px] rounded-[16px] border-black/[0.06] bg-white/95 p-1.5 text-[#1D1D1F] shadow-2xl backdrop-blur-2xl"
    >
      {children}
    </DropdownMenuContent>
  )
}

type FabItemProps = {
  icon: React.ReactNode
  label: string
  onSelect?: () => void
}

function FabItem({ icon, label, onSelect }: FabItemProps) {
  return (
    <DropdownMenuItem
      onSelect={onSelect}
      className="cursor-pointer gap-3 rounded-[10px] px-3 py-2.5 text-[13px] font-medium text-[#1D1D1F] focus:bg-black/[0.05] focus:text-[#1D1D1F]"
    >
      <span className="flex size-7 items-center justify-center rounded-full bg-black/[0.04] ring-1 ring-black/[0.05]">
        {icon}
      </span>
      {label}
    </DropdownMenuItem>
  )
}

export const Fab = {
  Root: FabRoot,
  Trigger: FabTrigger,
  Menu: FabMenu,
  Item: FabItem,
}
