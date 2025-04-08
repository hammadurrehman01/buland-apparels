import Link from "next/link"
import { ArrowLeft, ShoppingBag } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import type { NavigationItem, UserData } from "@/lib/dashboard-types"

interface DashboardHeaderProps {
  activeSection: string
  navigationItems: NavigationItem[]
  userData: UserData
}

export default function DashboardHeader({ activeSection, navigationItems, userData }: DashboardHeaderProps) {
  return (
    <header className="bg-white dark:bg-zinc-950 border-b border-gray-200 py-4">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/" className="flex items-center gap-2">
              <Button variant="ghost" size="icon" className="text-muted-foreground hover:bg-gray-100">
                <ArrowLeft className="h-5 w-5" />
                <span className="sr-only">Back to home</span>
              </Button>
              <span className="font-bold text-xl bg-red-800 text-white px-2 py-1 rounded">BULAND</span>
            </Link>
            <h1 className="text-lg font-semibold hidden md:block text-muted-foreground">
              {navigationItems.find((item) => item.href.replace("#", "") === activeSection)?.title || "Dashboard"}
            </h1>
          </div>

          {/* <div className="flex items-center gap-4">
            <Link href="/cart">
              <Button variant="ghost" size="icon" className="relative text-gray-700 hover:bg-gray-100">
                <ShoppingBag className="h-5 w-5" />
                <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-800 text-[10px] font-bold text-white">
                  3
                </span>
                <span className="sr-only">Cart</span>
              </Button>
            </Link>
            <Avatar className="h-8 w-8 border border-gray-200">
              <AvatarFallback className="bg-red-100 text-red-800">{userData.name.charAt(0)}</AvatarFallback>
            </Avatar>
          </div> */}
        </div>
      </div>
    </header>
  )
}
