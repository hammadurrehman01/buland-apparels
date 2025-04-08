"use client"

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { LogOut, Menu } from "lucide-react"
import { cn } from "@/lib/utils"
import type { NavigationItem, UserData } from "@/lib/dashboard-types"

interface DashboardSidebarProps {
  activeSection: string
  setActiveSection: (section: string) => void
  open: boolean
  setOpen: (open: boolean) => void
  navigationItems: NavigationItem[]
  userData: UserData
  isDesktop: boolean
}

export default function DashboardSidebar({
  activeSection,
  setActiveSection,
  open,
  setOpen,
  navigationItems,
  userData,
  isDesktop,
}: DashboardSidebarProps) {
  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center gap-3">
          <Avatar className="h-10 w-10 border border-gray-200">
            <AvatarFallback className="bg-red-100 text-red-800">{userData.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div>
            <h2 className="font-semibold ">{userData.name}</h2>
            <p className="text-xs text-muted-foreground">{userData.email}</p>
          </div>
        </div>
      </div>
      <nav className="flex-1 overflow-auto py-4">
        {navigationItems.map((item) => (
          <button
            key={item.href}
            className={cn(
              "flex w-full items-center gap-3 px-4 py-3 text-sm transition-colors hover:bg-gray-100 dark:hover:bg-gray-950 rounded-md mb-1",
              activeSection === item.href.replace("#", "") ? "bg-red-50 dark:bg-red-950  font-medium" : "",
            )}
            onClick={() => setActiveSection(item.href.replace("#", ""))}
          >
            <item.icon className="h-5 w-5" />
            <span>{item.title}</span>
            {item.badge && (
              <span className="ml-auto flex h-5 w-5 items-center justify-center rounded-full bg-red-100 text-xs font-medium text-red-800">
                {item.badge}
              </span>
            )}
          </button>
        ))}
      </nav>
      <div className="border-t border-gray-200 p-4">
        <Button variant="outline" className="w-full justify-start  border border-gray-300">
          <LogOut className="mr-2 h-4 w-4" />
          Log Out
        </Button>
      </div>
    </div>
  )

  // Mobile sidebar trigger
  const MobileSidebarTrigger = () => (
    <div className="lg:hidden fixed bottom-4 right-4 z-30">
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <Button size="icon" className="rounded-full shadow-lg bg-red-800 hover:bg-red-900  border-0">
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-72 p-0 border-r border-gray-200">
          <SidebarContent />
        </SheetContent>
      </Sheet>
    </div>
  )

  return (
    <>
      {/* Desktop Sidebar */}
      <div className="hidden lg:block w-64 shrink-0">
        <div className="sticky top-4 bg-white dark:bg-zinc-950 border border-gray-200 rounded-lg overflow-hidden">
          <SidebarContent />
        </div>
      </div>

      {/* Mobile Sidebar Trigger */}
      <MobileSidebarTrigger />
    </>
  )
}
