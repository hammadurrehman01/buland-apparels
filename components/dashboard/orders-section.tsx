"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Search, Package, ShoppingBag } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"
import { ordersData } from "@/lib/dashboard-data"
import type { Order } from "@/lib/dashboard-types"
import { formatPrice } from "@/lib/utils"

export default function OrdersSection() {
  const [searchQuery, setSearchQuery] = useState("")

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight ">My Orders</h1>
          <p className="text-gray-500">View and track your order history.</p>
        </div>
        <div className="mt-4 sm:mt-0 flex items-center gap-2">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
            <Input
              type="search"
              placeholder="Search orders..."
              className="w-full sm:w-[250px] pl-8 border-gray-300"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Orders Tabs */}
      <Tabs defaultValue="all" className="space-y-4">
        <TabsList className="bg-zinc-100 dark:bg-zinc-950 p-1">
          <TabsTrigger value="all" className="data-[state=active]:bg-white data-[state=active]:text-gray-900">
            All Orders
          </TabsTrigger>
          <TabsTrigger value="processing" className="data-[state=active]:bg-white data-[state=active]:text-gray-900">
            Processing
          </TabsTrigger>
          <TabsTrigger value="delivered" className="data-[state=active]:bg-white data-[state=active]:text-gray-900">
            Delivered
          </TabsTrigger>
          <TabsTrigger value="cancelled" className="data-[state=active]:bg-white data-[state=active]:text-gray-900">
            Cancelled
          </TabsTrigger>
        </TabsList>

        {/* All Orders Tab */}
        <TabsContent value="all" className="space-y-4">
          {ordersData.all.length > 0 ? (
            <div className="grid gap-4">
              {ordersData.all.map((order) => (
                <OrderCard key={order.id} order={order} />
              ))}
            </div>
          ) : (
            <EmptyOrdersState />
          )}
        </TabsContent>

        {/* Processing Orders Tab */}
        <TabsContent value="processing" className="space-y-4">
          {ordersData.processing.length > 0 ? (
            <div className="grid gap-4">
              {ordersData.processing.map((order) => (
                <OrderCard key={order.id} order={order} />
              ))}
            </div>
          ) : (
            <EmptyOrdersState status="processing" />
          )}
        </TabsContent>

        {/* Delivered Orders Tab */}
        <TabsContent value="delivered" className="space-y-4">
          {ordersData.delivered.length > 0 ? (
            <div className="grid gap-4">
              {ordersData.delivered.map((order) => (
                <OrderCard key={order.id} order={order} />
              ))}
            </div>
          ) : (
            <EmptyOrdersState status="delivered" />
          )}
        </TabsContent>

        {/* Cancelled Orders Tab */}
        <TabsContent value="cancelled" className="space-y-4">
          {ordersData.cancelled.length > 0 ? (
            <div className="grid gap-4">
              {ordersData.cancelled.map((order) => (
                <OrderCard key={order.id} order={order} />
              ))}
            </div>
          ) : (
            <EmptyOrdersState status="cancelled" />
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}

interface OrderCardProps {
  order: Order
}

function OrderCard({ order }: OrderCardProps) {
  const getStatusColor = (status: Order["status"]) => {
    switch (status) {
      case "Delivered":
        return "border-green-500 text-green-600 bg-green-50"
      case "Processing":
        return "bg-blue-100 text-blue-800"
      case "Cancelled":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusVariant = (status: Order["status"]) => {
    switch (status) {
      case "Delivered":
        return "outline"
      case "Processing":
        return "secondary"
      case "Cancelled":
        return "secondary"
      default:
        return "default"
    }
  }

  return (
    <Card className="bg-white border border-gray-200 shadow-sm rounded-lg overflow-hidden">
      <CardContent className="p-6">
        <OrderHeader order={order} getStatusColor={getStatusColor} getStatusVariant={getStatusVariant} />
        <div className="my-4 h-px bg-gray-200" />
        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
          {order.items.map((item, index) => (
            <div key={index} className="flex items-start gap-3">
              <div className="h-16 w-16 rounded-md overflow-hidden bg-gray-100 flex-shrink-0">
                <Image
                  src={item.image || "/placeholder.svg"}
                  alt={item.name}
                  width={64}
                  height={64}
                  className="h-full w-full object-cover"
                />
              </div>
              <div>
                <h4 className="font-medium text-sm line-clamp-1 text-gray-900">{item.name}</h4>
                {item.quantity && <p className="text-sm text-gray-500">Qty: {item.quantity}</p>}
                {item.price && <p className="text-sm font-medium text-gray-900">₨ {formatPrice(item.price)}</p>}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

interface OrderHeaderProps {
  order: Order
  getStatusColor: (status: string) => string
  getStatusVariant: (status: string) => string
}

function OrderHeader({ order, getStatusColor, getStatusVariant }: OrderHeaderProps) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
      <div className="mb-4 sm:mb-0">
        <div className="flex items-center gap-2">
          <h3 className="font-semibold text-gray-900">Order #{order.id}</h3>
          <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(order.status)}`}>
            {order.status}
          </span>
        </div>
        <div className="flex items-center gap-2 mt-1 text-sm text-gray-500">
          <span>{order.date}</span>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <div className="text-right">
          <div className="font-medium text-gray-900">₨ {formatPrice(order.total)}</div>
          <div className="text-xs text-gray-500">{order.items.length} items</div>
        </div>
        <Button variant="ghost" size="sm" className="text-red-800 hover:text-red-900 hover:bg-red-50">
          <span>View Details</span>
        </Button>
      </div>
    </div>
  )
}

interface EmptyOrdersStateProps {
  status?: string
}

function EmptyOrdersState({ status = "all" }: EmptyOrdersStateProps) {
  const getMessage = () => {
    switch (status) {
      case "processing":
        return "You don't have any orders being processed right now."
      case "delivered":
        return "You don't have any delivered orders yet."
      case "cancelled":
        return "You don't have any cancelled orders."
      default:
        return "You haven't placed any orders yet."
    }
  }

  return (
    <Card className="bg-white border border-gray-200 shadow-sm rounded-lg overflow-hidden">
      <CardContent className="p-6 text-center">
        <div className="flex flex-col items-center justify-center py-8">
          <Package className="h-12 w-12 text-gray-400 mb-4" />
          <h3 className="font-medium text-lg mb-2 text-gray-900">No Orders Found</h3>
          <p className="text-gray-500 mb-4">{getMessage()}</p>
          <Link href="/categories/products">
            <Button className="bg-red-800 hover:bg-red-900 text-white">
              <ShoppingBag className="mr-2 h-4 w-4" />
              Start Shopping
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  )
}
