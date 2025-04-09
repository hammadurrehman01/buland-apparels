"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Switch } from "@/components/ui/switch"
import { useState } from "react"

export default function NotificationsSection() {
  const [notifications, setNotifications] = useState({
    email: {
      marketing: true,
      orderUpdates: true,
      newProducts: false,
    },
    sms: {
      orderUpdates: true,
      promotions: false,
    },
  })

  const handleNotificationChange = (category: "email" | "sms", type: string, checked: boolean) => {
    setNotifications((prev) => ({
      ...prev,
      [category]: {
        ...prev[category],
        [type]: checked,
      },
    }))
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold tracking-tight ">Notifications</h1>
        <p className="text-muted-foreground">Manage your notification preferences.</p>
      </div>

      <Card className="bg-white dark:bg-zinc-950 border border-gray-200 shadow-sm rounded-lg overflow-hidden">
        <CardHeader>
          <CardTitle className="">Notification Preferences</CardTitle>
          <CardDescription className="text-muted-foreground">Manage how you receive notifications and updates.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <h3 className="text-lg font-medium mb-4 ">Email Notifications</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="email-marketing" className="">
                    Marketing and Promotions
                  </Label>
                  <p className="text-sm text-muted-foreground">Receive emails about new products, sales, and special offers.</p>
                </div>
                <Switch
                  id="email-marketing"
                  checked={notifications.email.marketing}
                  onCheckedChange={(checked) => handleNotificationChange("email", "marketing", checked)}
                />
              </div>
              <Separator className="bg-gray-200" />
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="email-orders" className="">
                    Order Updates
                  </Label>
                  <p className="text-sm text-muted-foreground">
                    Receive emails about your order status, shipping, and delivery.
                  </p>
                </div>
                <Switch
                  id="email-orders"
                  checked={notifications.email.orderUpdates}
                  onCheckedChange={(checked) => handleNotificationChange("email", "orderUpdates", checked)}
                />
              </div>
              <Separator className="bg-gray-200" />
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="email-products" className="">
                    New Products
                  </Label>
                  <p className="text-sm text-muted-foreground">
                    Receive emails when new products are added to our collections.
                  </p>
                </div>
                <Switch
                  id="email-products"
                  checked={notifications.email.newProducts}
                  onCheckedChange={(checked) => handleNotificationChange("email", "newProducts", checked)}
                />
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-medium mb-4 ">SMS Notifications</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="sms-orders" className="">
                    Order Updates
                  </Label>
                  <p className="text-sm text-muted-foreground">Receive text messages about your order status and delivery.</p>
                </div>
                <Switch
                  id="sms-orders"
                  checked={notifications.sms.orderUpdates}
                  onCheckedChange={(checked) => handleNotificationChange("sms", "orderUpdates", checked)}
                />
              </div>
              <Separator className="bg-gray-200" />
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="sms-promotions" className="">
                    Promotions
                  </Label>
                  <p className="text-sm text-muted-foreground">
                    Receive text messages about sales, discounts, and special offers.
                  </p>
                </div>
                <Switch
                  id="sms-promotions"
                  checked={notifications.sms.promotions}
                  onCheckedChange={(checked) => handleNotificationChange("sms", "promotions", checked)}
                />
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-end">
          <Button className="bg-red-800 hover:bg-red-900 text-white">Save Preferences</Button>
        </CardFooter>
      </Card>
    </div>
  )
}
