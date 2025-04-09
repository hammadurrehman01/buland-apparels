"use client"

import type React from "react"

import Link from "next/link"
import { Package, Heart, CreditCard, Gift, ShoppingBag, ChevronRight, Calendar, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { formatPrice } from "@/lib/utils"
import { dashboardData } from "@/lib/dashboard-data"
import Image from "next/image"

interface DashboardOverviewProps {
  setActiveSection: (section: string) => void
}

export default function DashboardOverview({ setActiveSection }: DashboardOverviewProps) {
  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight ">Dashboard</h1>
          <p className="text-gray-500">Welcome back to your Buland account.</p>
        </div>
        <div className="mt-4 sm:mt-0 flex items-center gap-2">
          <Link href="/categories/products">
            <Button className="bg-red-800 hover:bg-red-900 text-white">
              <ShoppingBag className="mr-2 h-4 w-4" />
              Shop Now
            </Button>
          </Link>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatsCard
          title="Total Orders"
          value={dashboardData.stats.totalOrders}
          icon={<Package className="h-4 w-4 text-gray-500" />}
          linkText="View order history"
          onClick={() => setActiveSection("orders")}
        />
        <StatsCard
          title="Wishlist Items"
          value={dashboardData.stats.wishlistItems}
          icon={<Heart className="h-4 w-4 text-gray-500" />}
          linkText="View your wishlist"
          onClick={() => setActiveSection("wishlist")}
        />
        <StatsCard
          title="Saved Cards"
          value={dashboardData.stats.savedCards}
          icon={<CreditCard className="h-4 w-4 text-gray-500" />}
          linkText="Manage payment methods"
          onClick={() => setActiveSection("payment")}
        />
        <Card className="bg-white dark:bg-zinc-950 border border-gray-200 shadow-sm rounded-lg overflow-hidden">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Loyalty Points</CardTitle>
            <Gift className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold ">{dashboardData.stats.loyaltyPoints}</div>
            <div className="mt-2">
              <Progress value={45} className="h-2 bg-gray-200" />
            </div>
            <p className="text-xs text-gray-500 mt-1">
              <span className="text-green-600">50 more points</span> until your next reward
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Tabs Section */}
      <Tabs defaultValue="orders" className="space-y-4">
        <TabsList className="bg-white dark:bg-zinc-950 p-1">
          <TabsTrigger value="orders" className="data-[state=active]:bg-white data-[state=active]:text-black">
            Recent Orders
          </TabsTrigger>
          <TabsTrigger value="wishlist" className="data-[state=active]:bg-white data-[state=active]:text-black">
            Wishlist
          </TabsTrigger>
          <TabsTrigger value="upcoming" className="data-[state=active]:bg-white data-[state=active]:text-black">
            Upcoming Deliveries
          </TabsTrigger>
        </TabsList>

        {/* Recent Orders Tab */}
        <TabsContent value="orders" className="space-y-4">
          <div className="grid gap-4">
            {dashboardData.recentOrders.map((order) => (
              <Card key={order.id} className="bg-white dark:bg-zinc-950 border border-gray-200 shadow-sm rounded-lg overflow-hidden">
                <CardContent className="p-6">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                    <div className="mb-4 sm:mb-0">
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold ">Order #{order.id}</h3>
                        <Badge
                          variant={
                            order.status === "Delivered"
                              ? "outline"
                              : order.status === "Processing"
                                ? "secondary"
                                : "default"
                          }
                          className={
                            order.status === "Delivered"
                              ? "border-green-500 text-green-600 bg-green-50"
                              : order.status === "Processing"
                                ? "bg-blue-100 text-blue-800"
                                : "bg-gray-100 text-gray-800"
                          }
                        >
                          {order.status}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-2 mt-1 text-sm text-gray-500">
                        <Calendar className="h-3.5 w-3.5" />
                        <span>{order.date}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <div className="font-medium ">₨ {formatPrice(order.total)}</div>
                        <div className="text-xs text-gray-500">{order.items.length} items</div>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-red-800 hover:text-red-900 hover:bg-red-50"
                        onClick={() => setActiveSection("orders")}
                      >
                        <span className="sr-only sm:not-sr-only sm:inline-block">View Order</span>
                        <ChevronRight className="h-4 w-4 sm:ml-1" />
                      </Button>
                    </div>
                  </div>
                  <div className="mt-4 flex items-center gap-2">
                    <div className="flex -space-x-3">
                      {order.items.map((item, index) => (
                        <div
                          key={index}
                          className="h-10 w-10 rounded-full border-2 border-white overflow-hidden bg-gray-100"
                        >
                          <Image
                            src={item.image || "/placeholder.svg"}
                            alt={item.name}
                            width={40}
                            height={40}
                            className="h-full w-full object-cover"
                          />
                        </div>
                      ))}
                    </div>
                    <div className="text-sm text-gray-500">
                      {order.items.map((item, index) => (
                        <span key={index}>
                          {item.name}
                          {index < order.items.length - 1 ? ", " : ""}
                        </span>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
            <div className="text-center">
              <Button
                variant="outline"
                onClick={() => setActiveSection("orders")}
                className="border border-gray-300 bg-white dark:bg-zinc-950 hover:bg-gray-50 "
              >
                View All Orders
                <ChevronRight className="ml-1 h-4 w-4" />
              </Button>
            </div>
          </div>
        </TabsContent>

        {/* Wishlist Tab */}
        <TabsContent value="wishlist" className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
            {dashboardData.wishlist.slice(0, 3).map((item) => (
              <WishlistItem key={item.id} item={item} />
            ))}
          </div>
          <div className="text-center">
            <Button
              variant="outline"
              onClick={() => setActiveSection("wishlist")}
              className="border border-gray-300 bg-white dark:bg-zinc-950 hover:bg-gray-50 text-gray-800"
            >
              View Full Wishlist
              <ChevronRight className="ml-1 h-4 w-4" />
            </Button>
          </div>
        </TabsContent>

        {/* Upcoming Deliveries Tab */}
        <TabsContent value="upcoming" className="space-y-4">
          {dashboardData.upcomingDeliveries.length > 0 ? (
            <div className="grid gap-4">
              {dashboardData.upcomingDeliveries.map((delivery) => (
                <Card
                  key={delivery.id}
                  className="bg-white dark:bg-zinc-950 border border-gray-200 shadow-sm rounded-lg overflow-hidden"
                >
                  <CardContent className="p-6">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                      <div className="mb-4 sm:mb-0">
                        <div className="flex items-center gap-2">
                          <h3 className="font-semibold ">Order #{delivery.id}</h3>
                          <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
                            {delivery.status}
                          </Badge>
                        </div>
                        <div className="flex items-center gap-2 mt-1 text-sm text-gray-500">
                          <Clock className="h-3.5 w-3.5" />
                          <span>Expected delivery: {delivery.date}</span>
                        </div>
                        <div className="text-xs text-gray-500 mt-1">
                          Tracking ID: <span className="font-medium">{delivery.trackingId}</span>
                        </div>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        className="text-red-800 hover:bg-red-50 border border-gray-300"
                      >
                        Track Package
                      </Button>
                    </div>
                    <div className="mt-4 flex items-center gap-2">
                      <div className="flex -space-x-3">
                        {delivery.items.map((item, index) => (
                          <div
                            key={index}
                            className="h-10 w-10 rounded-full border-2 border-white overflow-hidden bg-gray-100"
                          >
                            <Image
                              src={item.image || "/placeholder.svg"}
                              alt={item.name}
                              width={40}
                              height={40}
                              className="h-full w-full object-cover"
                            />
                          </div>
                        ))}
                      </div>
                      <div className="text-sm text-gray-500">
                        {delivery.items.map((item, index) => (
                          <span key={index}>
                            {item.name}
                            {index < delivery.items.length - 1 ? ", " : ""}
                          </span>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <EmptyState
              icon={<Package className="h-12 w-12 text-gray-400 mb-4" />}
              title="No Upcoming Deliveries"
              description="You don't have any packages on the way right now."
              buttonText="Shop Now"
              buttonIcon={<ShoppingBag className="mr-2 h-4 w-4" />}
              buttonLink="/categories/products"
            />
          )}
        </TabsContent>
      </Tabs>

      {/* Special Offers */}
      <Card className="bg-gradient-to-r from-red-800 to-red-900 text-white border-0 shadow-md">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div className="mb-4 md:mb-0">
              <h3 className="text-xl font-bold mb-2">Exclusive Member Offer</h3>
              <p className="opacity-90">Use code MEMBER15 for an extra 15% off your next purchase.</p>
            </div>
            <Button variant="outline" className="bg-white dark:bg-black  border-white text-black dark:text-white hover:bg-red-800 hover:text-white dark:hover:bg-red-950 border">
              Shop the Sale
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

// Helper Components
function StatsCard({
  title,
  value,
  icon,
  linkText,
  onClick,
}: {
  title: string
  value: number
  icon: React.ReactNode
  linkText: string
  onClick: () => void
}) {
  return (
    <Card className="bg-white dark:bg-zinc-950 border border-gray-200 shadow-sm rounded-lg overflow-hidden">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold ">{value}</div>
        <p className="text-xs text-gray-500">
          <button onClick={onClick} className="text-red-800 hover:underline">
            {linkText}
          </button>
        </p>
      </CardContent>
    </Card>
  )
}

function WishlistItem({ item }: { item: any }) {
  return (
    <Card className="bg-white dark:bg-zinc-950 border border-gray-200 shadow-sm rounded-lg overflow-hidden">
      <div className="relative aspect-square">
        <Image
          src={item.image || "/placeholder.svg"}
          alt={item.name}
          fill
          className="object-cover transition-transform hover:scale-105"
        />
        {!item.inStock && (
          <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
            <span className="text-white font-medium px-3 py-1 bg-black/80 rounded-full text-sm">Out of Stock</span>
          </div>
        )}
      </div>
      <CardContent className="p-4">
        <h3 className="font-medium line-clamp-1 ">{item.name}</h3>
        <div className="flex justify-between items-center mt-2">
          <div className="font-semibold ">₨ {formatPrice(item.price)}</div>
          <Button
            size="sm"
            disabled={!item.inStock}
            className={item.inStock ? "bg-red-800 hover:bg-red-900 text-white" : "bg-gray-200 text-gray-500"}
          >
            {item.inStock ? "Add to Cart" : "Sold Out"}
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

function EmptyState({
  icon,
  title,
  description,
  buttonText,
  buttonIcon,
  buttonLink,
}: {
  icon: React.ReactNode
  title: string
  description: string
  buttonText: string
  buttonIcon: React.ReactNode
  buttonLink: string
}) {
  return (
    <Card className="bg-white dark:bg-zinc-950  border border-gray-200 shadow-sm rounded-lg overflow-hidden">
      <CardContent className="p-6 text-center">
        <div className="flex flex-col items-center justify-center py-8">
          {icon}
          <h3 className="font-medium text-lg mb-2 ">{title}</h3>
          <p className="text-gray-500 mb-4">{description}</p>
          <Link href={buttonLink}>
            <Button className="bg-red-800 hover:bg-red-900 text-white">
              {buttonIcon}
              {buttonText}
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  )
}
