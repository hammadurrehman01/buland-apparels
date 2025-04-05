"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { CheckCircle2, Package, Printer, ShoppingBag } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"

// Sample order details
const orderDetails = {
  orderNumber: "BLD-" + Math.floor(100000 + Math.random() * 900000),
  date: new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }),
  items: [
    {
      id: 1,
      name: "Dystopia Graphic Tee",
      image: "/products/shirt-product-4.png",
      price: 3999,
      color: "Black",
      size: "M",
      quantity: 1,
    },
    {
      id: 2,
      name: "Minimalist Logo Shirt",
      image: "/products/shirt-product-5.png",
      price: 4499,
      color: "White",
      size: "L",
      quantity: 2,
    },
  ],
  shipping: {
    method: "Standard Shipping",
    cost: 999,
    address: "123 Main Street, Karachi, 75300",
    estimatedDelivery: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    }),
  },
  payment: {
    method: "Credit Card",
    last4: "4242",
  },
  subtotal: 12997,
  discount: 1300,
  tax: 934,
  total: 13630,
}

// Format price in PKR
const formatPrice = (price: number) => {
  return new Intl.NumberFormat("ur-PK").format(price)
}

export default function OrderConfirmationPage() {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 800)

    return () => clearTimeout(timer)
  }, [])

  if (isLoading) {
    return (
      <div className="mx-auto max-w-screen-2xl py-16 md:py-24">
        <div className="flex flex-col gap-6">
          <div className="bg-muted/20 animate-pulse h-12 w-48 rounded-lg"></div>
          <div className="bg-muted/20 animate-pulse h-96 rounded-lg"></div>
        </div>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-screen-2xl py-16 md:py-24 animate-fade-in">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 mb-4">
            <CheckCircle2 className="h-8 w-8 text-green-600" />
          </div>
          <h1 className="text-3xl font-bold mb-2">Order Confirmed!</h1>
          <p className="text-gray-600">
            Thank you for your purchase. Your order has been received and is being processed.
          </p>
        </div>

        <div className="bg-white dark:bg-zinc-950 rounded-lg shadow-sm border p-6 mb-8">
          <div className="flex flex-col md:flex-row justify-between mb-6">
            <div>
              <h2 className="text-lg font-semibold">Order #{orderDetails.orderNumber}</h2>
              <p className="text-gray-500">Placed on {orderDetails.date}</p>
            </div>
            <div className="mt-4 md:mt-0 flex gap-2">
              <Button variant="outline" size="sm" className="flex items-center">
                <Printer className="h-4 w-4 mr-2" />
                Print Receipt
              </Button>
              <Button variant="outline" size="sm" className="flex items-center">
                <Package className="h-4 w-4 mr-2" />
                Track Order
              </Button>
            </div>
          </div>

          <Separator className="mb-6" />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-6">
            <div>
              <h3 className="font-semibold mb-2">Shipping Information</h3>
              <p className="text-gray-600">{orderDetails.shipping.address}</p>
              <p className="text-gray-600 mt-2">
                <span className="font-medium">Method:</span> {orderDetails.shipping.method}
              </p>
              <p className="text-gray-600">
                <span className="font-medium">Estimated Delivery:</span> {orderDetails.shipping.estimatedDelivery}
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Payment Information</h3>
              <p className="text-gray-600">
                <span className="font-medium">Method:</span> {orderDetails.payment.method}
              </p>
              {orderDetails.payment.last4 && (
                <p className="text-gray-600">
                  <span className="font-medium">Card:</span> •••• {orderDetails.payment.last4}
                </p>
              )}
            </div>
          </div>

          <h3 className="font-semibold mb-4">Order Items</h3>
          <div className="space-y-4 mb-6">
            {orderDetails.items.map((item) => (
              <div key={item.id} className="flex items-center gap-4">
                <div className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-md border">
                  <Image src={item.image || "/placeholder.svg"} alt={item.name} fill className="object-cover" />
                </div>
                <div className="flex flex-1 flex-col">
                  <div className="flex justify-between text-base font-medium">
                    <h3>{item.name}</h3>
                    <p className="ml-4">₨ {formatPrice(item.price * item.quantity)}</p>
                  </div>
                  <div className="flex justify-between text-sm text-gray-500">
                    <p>
                      {item.color}, {item.size}
                    </p>
                    <p>Qty: {item.quantity}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <Separator className="mb-6" />

          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">Subtotal</span>
              <span>₨ {formatPrice(orderDetails.subtotal)}</span>
            </div>
            <div className="flex justify-between text-green-600">
              <span>Discount</span>
              <span>-₨ {formatPrice(orderDetails.discount)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Shipping</span>
              <span>₨ {formatPrice(orderDetails.shipping.cost)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Tax</span>
              <span>₨ {formatPrice(orderDetails.tax)}</span>
            </div>
            <div className="flex justify-between text-lg font-semibold pt-2">
              <span>Total</span>
              <span>₨ {formatPrice(orderDetails.total)}</span>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-zinc-950 rounded-lg shadow-sm border p-6 mb-8">
          <h2 className="text-lg font-semibold mb-4">What's Next?</h2>
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-red-100 flex items-center justify-center">
                <span className="font-semibold text-red-800">1</span>
              </div>
              <div>
                <h3 className="font-medium">Order Processing</h3>
                <p className="text-gray-600 text-sm">
                  Your order is being processed and prepared for shipping. You'll receive an email confirmation shortly.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-red-100 flex items-center justify-center">
                <span className="font-semibold text-red-800">2</span>
              </div>
              <div>
                <h3 className="font-medium">Shipping</h3>
                <p className="text-gray-600 text-sm">
                  Once your order ships, you'll receive a tracking number via email to monitor your delivery.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-red-100 flex items-center justify-center">
                <span className="font-semibold text-red-800">3</span>
              </div>
              <div>
                <h3 className="font-medium">Delivery</h3>
                <p className="text-gray-600 text-sm">
                  Your order should arrive by {orderDetails.shipping.estimatedDelivery}. Enjoy your new Buland items!
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/account/orders">
            <Button variant="outline" className="w-full sm:w-auto">
              View All Orders
            </Button>
          </Link>
          <Link href="/categories/products">
            <Button className="w-full sm:w-auto bg-red-800 hover:bg-red-900 text-white">
              Continue Shopping
              <ShoppingBag className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}

