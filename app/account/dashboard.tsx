"use client"

import { useState, useEffect } from "react"
import { useMediaQuery } from "@/hooks/use-media-query"
import DashboardHeader from "@/components/dashboard/dashboard-header"
import DashboardSidebar from "@/components/dashboard/dashboard-sidebar"
import DashboardOverview from "@/components/dashboard/dashboard-overview"
import OrdersSection from "@/components/dashboard/orders-section"
import WishlistSection from "@/components/dashboard/wishlist-section"
import PaymentMethodsSection from "@/components/dashboard/payment-methods-section"
import AddressesSection from "@/components/dashboard/addresses-section"
import NotificationsSection from "@/components/dashboard/notification-settings"
import SettingsSection from "@/components/dashboard/setting-section"
import { navigationItems, userData } from "@/lib/dashboard-data"

export default function DashboardPage() {
  const [activeSection, setActiveSection] = useState<string>("dashboard")
  const [open, setOpen] = useState<boolean>(false)
  const [mounted, setMounted] = useState<boolean>(false)
  const isDesktop = useMediaQuery("(min-width: 1024px)")
  const [successMessage, setSuccessMessage] = useState<string>("")

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!isDesktop) {
      setOpen(false)
    }
  }, [activeSection, isDesktop])

  if (!mounted) {
    return null
  }

  return (
    <div className="bg-white dark:bg-zinc-950">
      <DashboardHeader activeSection={activeSection} navigationItems={navigationItems} userData={userData} />

      <div className=" mx-auto px-4 py-8 max-w-screen-2xl">
        <div className="flex flex-col lg:flex-row gap-8">
          <DashboardSidebar
            activeSection={activeSection}
            setActiveSection={setActiveSection}
            open={open}
            setOpen={setOpen}
            navigationItems={navigationItems}
            userData={userData}
            isDesktop={isDesktop}
          />

          {/* Main Content */}
          <div className="flex-1">
            {activeSection === "dashboard" && <DashboardOverview setActiveSection={setActiveSection} />}

            {activeSection === "orders" && <OrdersSection />}

            {activeSection === "wishlist" && <WishlistSection />}

            {activeSection === "payment" && <PaymentMethodsSection />}

            {activeSection === "addresses" && <AddressesSection />}

            {activeSection === "notifications" && <NotificationsSection />}

            {activeSection === "settings" && (
              <SettingsSection successMessage={successMessage} setSuccessMessage={setSuccessMessage} />
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
