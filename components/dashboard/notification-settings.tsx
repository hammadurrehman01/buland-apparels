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
        <h1 className="text-2xl font-bold tracking-tight text-gray-900">Notifications</h1>
        <p className="text-gray-500">Manage your notification preferences.</p>
      </div>

      <Card className="bg-white border border-gray-200 shadow-sm rounded-lg overflow-hidden">
        <CardHeader>
          <CardTitle className="text-gray-900">Notification Preferences</CardTitle>
          <CardDescription className="text-gray-500">Manage how you receive notifications and updates.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <h3 className="text-lg font-medium mb-4 text-gray-900">Email Notifications</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="email-marketing" className="text-gray-900">
                    Marketing and Promotions
                  </Label>
                  <p className="text-sm text-gray-500">Receive emails about new products, sales, and special offers.</p>
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
                  <Label htmlFor="email-orders" className="text-gray-900">
                    Order Updates
                  </Label>
                  <p className="text-sm text-gray-500">
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
                  <Label htmlFor="email-products" className="text-gray-900">
                    New Products
                  </Label>
                  <p className="text-sm text-gray-500">
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
            <h3 className="text-lg font-medium mb-4 text-gray-900">SMS Notifications</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="sms-orders" className="text-gray-900">
                    Order Updates
                  </Label>
                  <p className="text-sm text-gray-500">Receive text messages about your order status and delivery.</p>
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
                  <Label htmlFor="sms-promotions" className="text-gray-900">
                    Promotions
                  </Label>
                  <p className="text-sm text-gray-500">
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
