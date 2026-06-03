import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar'
import { TooltipProvider } from '@/components/ui/tooltip'
import { AppSidebar } from '@/components/shared/AppSidebar'

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative min-h-svh bg-[#F5F5F7] text-[#1D1D1F]">
      {/* ambient tint — soft green wash for frosted glass to filter */}
      <div className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute -top-32 right-[20%] size-[520px] rounded-full bg-[#06C755]/[0.06] blur-[160px]" />
        <div className="absolute bottom-0 left-[10%] size-[420px] rounded-full bg-[#1D1D1F]/[0.04] blur-[160px]" />
      </div>

      <TooltipProvider delayDuration={200}>
        <SidebarProvider defaultOpen>
          <AppSidebar />
          <SidebarInset className="bg-transparent">
            <div className="px-6 py-6 lg:px-10 lg:py-10">{children}</div>
          </SidebarInset>
        </SidebarProvider>
      </TooltipProvider>
    </div>
  )
}
