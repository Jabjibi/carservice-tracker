'use client'

import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useTranslations } from 'next-intl'
import { Bell, Car, LayoutDashboard, PanelLeft, type LucideIcon } from 'lucide-react'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from '@/components/ui/sidebar'
import { UserProfileCard } from '@/components/shared/UserProfileCard'
import { useUser } from '@/lib/hooks/use-user'
import { logout } from '@/lib/actions/auth'

type NavKey = 'dashboard' | 'cars' | 'notifications'

type NavItem = {
  key: NavKey
  href: string
  icon: LucideIcon
}

const NAV_ITEMS: ReadonlyArray<NavItem> = [
  { key: 'dashboard', href: '/dashboard', icon: LayoutDashboard },
  { key: 'cars', href: '/mycar', icon: Car },
  { key: 'notifications', href: '/notifications', icon: Bell },
]

const GLASS_INNER = [
  '[&>[data-slot=sidebar-inner]]:bg-white/[0.6]',
  '[&>[data-slot=sidebar-inner]]:ring-black/[0.06]',
  '[&>[data-slot=sidebar-inner]]:backdrop-blur-2xl',
  '[&>[data-slot=sidebar-inner]]:rounded-[20px]',
  '[&>[data-slot=sidebar-inner]]:shadow-none',
].join(' ')

export function AppSidebar() {
  const t = useTranslations('sidebar')
  const pathname = usePathname()
  const { toggleSidebar } = useSidebar()
  const user = useUser()

  return (
    <Sidebar variant="floating" collapsible="icon" className={GLASS_INNER}>
      <SidebarHeader className="px-3 pt-4 pb-2 group-data-[collapsible=icon]:px-1!">
        <div className="flex items-center justify-between group-data-[collapsible=icon]:justify-center">
          <Link
            href="/dashboard"
            aria-label="Car Service Tracker"
            className="inline-flex items-center group-data-[collapsible=icon]:hidden"
          >
            <Image
              src="/image/logo2.png"
              alt="Car Service Tracker"
              width={160}
              height={240}
              priority
              className="h-24 w-auto object-contain"
            />
          </Link>
          <button
            onClick={toggleSidebar}
            aria-label="Toggle Sidebar"
            className="text-text-secondary hover:text-text-primary flex size-8 shrink-0 items-center justify-center rounded-[12px] transition hover:bg-black/[0.04]"
          >
            <PanelLeft className="size-[18px]" />
          </button>
        </div>
      </SidebarHeader>

      <SidebarContent className="px-2 pt-2 group-data-[collapsible=icon]:px-2!">
        <SidebarGroup className="group-data-[collapsible=icon]:p-0!">
          <SidebarGroupContent className="group-data-[collapsible=icon]:p-0!">
            <SidebarMenu className="gap-1">
              {NAV_ITEMS.map((item) => {
                const href = item.href
                const isActive = pathname === href || pathname.startsWith(`${href}/`)
                const Icon = item.icon
                const label = t(item.key)
                return (
                  <SidebarMenuItem key={item.key}>
                    <SidebarMenuButton
                      asChild
                      isActive={isActive}
                      tooltip={label}
                      className="text-text-secondary hover:text-text-primary data-[active=true]:text-text-primary h-10 rounded-[12px] px-3 text-[14px] font-medium transition group-data-[collapsible=icon]:h-10! group-data-[collapsible=icon]:w-full! group-data-[collapsible=icon]:justify-center! group-data-[collapsible=icon]:p-0! hover:bg-black/[0.04] data-[active=true]:bg-black/[0.05] data-[active=true]:ring-1 data-[active=true]:ring-black/[0.06]"
                    >
                      <Link href={href}>
                        <Icon className="size-[18px] shrink-0" />
                        <span className="group-data-[collapsible=icon]:hidden">{label}</span>
                        {isActive && (
                          <span className="ml-auto size-1.5 rounded-full bg-[#06C755] group-data-[collapsible=icon]:hidden" />
                        )}
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                )
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="px-2 pb-3 group-data-[collapsible=icon]:items-center group-data-[collapsible=icon]:px-1">
        <UserProfileCard
          name={user?.displayName ?? '...'}
          avatarUrl={user?.pictureUrl}
          logoutAction={logout}
        />
      </SidebarFooter>
    </Sidebar>
  )
}
