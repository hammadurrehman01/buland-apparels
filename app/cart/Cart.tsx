"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Trash2, ShoppingBag, ArrowLeft, CreditCard, TruckIcon, Shield, ChevronRight, Minus, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { cn } from "@/lib/utils"

// Sample cart items
const initialCartItems = [
  {
    id: 1,
    name: "Dystopia Graphic Tee",
    slug: "dystopia-graphic-tee",
    image: "/products/shirt-product-4.png",
    price: 3999,
    originalPrice: 4999,
    color: "Black",
    size: "M",
    quantity: 1,
    collection: "Dystopia Collection",
  },
  {
    id: 2,
    name: "Minimalist Logo Shirt",
    slug: "minimalist-logo-shirt",
    image: "/products/shirt-product-5.png",
    price: 4499,
    originalPrice: 5999,
    color: "White",
    size: "L",
    quantity: 2,
    collection: "Props Vol 1",
  },
]

// Recommended products
const recommendedProducts = [
  {
    id: 1,
    name: "Urban Chaos Tee",
    slug: "urban-chaos-tee",
    image: "/products/shirt-product-3.png",
    price: 3499,
    collection: "Dystopia Collection",
  },
  {
    id: 2,
    name: "Structured Collar Shirt",
    slug: "structured-collar-shirt",
    image: "/products/shirt-product-2.png",
    price: 3999,
    collection: "Props Vol 1",
  },
  {
    id: 3,
    name: "Dystopia Oversized Tee",
    slug: "dystopia-oversized-tee",
    image: "/products/shirt-product-1.png",
    price: 4499,
    collection: "Dystopia Collection",
  },
  {
    id: 4,
    name: "Minimal Stripe Shirt",
    slug: "minimal-stripe-shirt",
    image: "/products/shirt-product-7.png",
    price: 4999,
    collection: "Props Vol 1",
  },
]

// Recently viewed products
const recentlyViewedProducts = [
  {
    id: 1,
    name: "Classic Fit Tee",
    slug: "classic-fit-tee",
    image: "/motorsport-1.png",
    price: 3799,
    collection: "Motorsport Collection",
  },
  {
    id: 2,
    name: "Premium Cotton Shirt",
    slug: "premium-cotton-shirt",
    image: "/motorsport-2.png",
    price: 4099,
    collection: "Motorsport Collection",
  },
  {
    id: 3,
    name: "Graphic Print Tee",
    slug: "graphic-print-tee",
    image: "/props-1.png",
    price: 4399,
    collection: "Props Vol 1",
  },
  {
    id: 4,
    name: "Slim Fit Button-Up",
    slug: "slim-fit-button-up",
    image: "/product-4.jpg",
    price: 4699,
    collection: "Props Vol 1",
  },
  {
    id: 5,
    name: "Statement Logo Tee",
    slug: "statement-logo-tee",
    image: "/product-5.jpg",
    price: 4999,
    collection: "Dystopia Collection",
  },
  {
    id: 6,
    name: "Casual Oxford Shirt",
    slug: "casual-oxford-shirt",
    image: "/product-6.jpg",
    price: 5299,
    collection: "Props Vol 1",
  },
]

export default function CartPage() {
  const [cartItems, setCartItems] = useState(initialCartItems)
  const [promoCode, setPromoCode] = useState("")
  const [promoApplied, setPromoApplied] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [isUpdating, setIsUpdating] = useState<number | null>(null)

  // Calculate cart totals dynamically
  const subtotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0)
  const discount = promoApplied ? Math.round(subtotal * 0.1) : 0 // 10% discount if promo applied
  const shipping = subtotal > 10000 ? 0 : 999 // Free shipping over PKR 10,000
  const tax = Math.round((subtotal - discount) * 0.08) // 8% tax
  const total = subtotal - discount + shipping + tax

  // Format price in PKR
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("ur-PK").format(price)
  }

  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 800)

    return () => clearTimeout(timer)
  }, [])

  // Update quantity
  const updateQuantity = (id: number, newQuantity: number) => {
    if (newQuantity < 1) return

    setIsUpdating(id)

    // Simulate API call
    setTimeout(() => {
      setCartItems(cartItems.map((item) => (item.id === id ? { ...item, quantity: newQuantity } : item)))
      setIsUpdating(null)
    }, 300)
  }

  // Remove item
  const removeItem = (id: number) => {
    setIsUpdating(id)

    // Simulate API call
    setTimeout(() => {
      setCartItems(cartItems.filter((item) => item.id !== id))
      setIsUpdating(null)
    }, 300)
  }

  // Apply promo code
  const applyPromoCode = () => {
    if (promoCode.toLowerCase() === "buland10") {
      setPromoApplied(true)
    }
  }

  // Empty cart view
  if (cartItems.length === 0) {
    return (
      <div className="mx-auto max-w-screen-xl py-16 md:py-24">
        <h1 className="text-3xl font-bold mb-8">Your Shopping Cart</h1>

        <div className="flex flex-col items-center justify-center py-16 text-center">
          <div className="bg-muted/30 rounded-full p-6 mb-6">
            <ShoppingBag className="h-12 w-12 text-muted-foreground" />
          </div>
          <h2 className="text-2xl font-bold mb-2">Your cart is empty</h2>
          <p className="text-muted-foreground mb-8 max-w-md">
            Looks like you haven't added anything to your cart yet. Explore our collections to find something you'll
            love.
          </p>
          <Link href="/categories/products">
            <Button size="lg" className="bg-red-800 hover:bg-red-900 text-white">
              Continue Shopping
            </Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-screen-xl py-16 md:py-24 animate-fade-in">
      <h1 className="text-3xl font-bold mb-8">Your Shopping Cart</h1>

      {isLoading ? (
        <div className="flex flex-col gap-6">
          {[1, 2].map((i) => (
            <div key={i} className="bg-muted/20 animate-pulse h-40 rounded-lg"></div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="rounded-lg shadow-sm border p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="font-semibold text-lg">Cart Items ({cartItems.length})</h2>
                <Link
                  href="/categories/products"
                  className="text-red-800 hover:text-red-900 text-sm font-medium flex items-center"
                >
                  <ArrowLeft className="h-4 w-4 mr-1" />
                  Continue Shopping
                </Link>
              </div>

              <div className="space-y-6">
                {cartItems.map((item) => (
                  <div
                    key={item.id}
                    className={cn(
                      "flex flex-col sm:flex-row gap-4 pb-6 border-b transition-opacity",
                      isUpdating === item.id ? "opacity-50" : "opacity-100",
                    )}
                  >
                    {/* Product Image */}
                    <div className="flex-shrink-0">
                      <Link href={`/products/${item.slug}`}>
                        <div className="relative h-24 w-24 sm:h-32 sm:w-32 rounded-md overflow-hidden bg-muted/20">
                          <Image src={item.image || "/placeholder.svg"} alt={item.name} fill className="object-cover" />
                        </div>
                      </Link>
                    </div>

                    {/* Product Details */}
                    <div className="flex-grow flex flex-col sm:flex-row justify-between gap-4">
                      <div>
                        <Link href={`/products/${item.slug}`}>
                          <h3 className="font-medium hover:text-red-800 transition-colors">{item.name}</h3>
                        </Link>
                        <p className="text-sm text-muted-foreground">{item.collection}</p>
                        <div className="flex gap-2 mt-1">
                          <span className="text-xs bg-muted/30 px-2 py-0.5 rounded">Color: {item.color}</span>
                          <span className="text-xs bg-muted/30 px-2 py-0.5 rounded">Size: {item.size}</span>
                        </div>
                        <div className="mt-2 flex items-center">
                          <span className="font-semibold">₨ {formatPrice(item.price)}</span>
                          {item.originalPrice > item.price && (
                            <span className="text-sm text-muted-foreground line-through ml-2">
                              ₨ {formatPrice(item.originalPrice)}
                            </span>
                          )}
                        </div>
                      </div>

                      <div className="flex flex-row sm:flex-col justify-between items-end gap-4">
                        {/* Quantity Selector */}
                        <div className="flex items-center border rounded-md">
                          <button
                            className="px-2 py-1 text-gray-600 hover:text-red-800 disabled:opacity-50"
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            disabled={item.quantity <= 1 || isUpdating === item.id}
                          >
                            <Minus className="h-4 w-4" />
                          </button>
                          <span className="px-4 py-1 text-center w-10">{item.quantity}</span>
                          <button
                            className="px-2 py-1 text-gray-600 hover:text-red-800 disabled:opacity-50"
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            disabled={isUpdating === item.id}
                          >
                            <Plus className="h-4 w-4" />
                          </button>
                        </div>

                        {/* Remove Button */}
                        <button
                          className="text-gray-500 hover:text-red-800 flex items-center text-sm"
                          onClick={() => removeItem(item.id)}
                          disabled={isUpdating === item.id}
                        >
                          <Trash2 className="h-4 w-4 mr-1" />
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="rounded-lg shadow-sm border p-6 sticky top-24">
              <h2 className="font-semibold text-lg mb-4">Order Summary</h2>

              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>₨ {formatPrice(subtotal)}</span>
                </div>

                {promoApplied && (
                  <div className="flex justify-between text-green-600">
                    <span>Discount (10%)</span>
                    <span>-₨ {formatPrice(discount)}</span>
                  </div>
                )}

                <div className="flex justify-between">
                  <span className="text-muted-foreground">Shipping</span>
                  <span>{shipping === 0 ? "Free" : `₨ ${formatPrice(shipping)}`}</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-muted-foreground">Tax (8%)</span>
                  <span>₨ {formatPrice(tax)}</span>
                </div>

                <Separator className="my-3" />

                <div className="flex justify-between font-semibold text-base">
                  <span>Total</span>
                  <span>₨ {formatPrice(total)}</span>
                </div>
              </div>

              {/* Promo Code */}
              <div className="mt-6">
                <label className="text-sm font-medium mb-1 block">Promo Code</label>
                <div className="flex gap-2">
                  <Input
                    placeholder="Enter code"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    disabled={promoApplied}
                    className="flex-grow"
                  />
                  <Button
                    variant={promoApplied ? "outline" : "default"}
                    onClick={applyPromoCode}
                    disabled={promoApplied || !promoCode}
                    className={promoApplied ? "bg-green-50 text-green-700 border-green-200" : ""}
                  >
                    {promoApplied ? "Applied" : "Apply"}
                  </Button>
                </div>
                {promoApplied && <p className="text-xs text-green-600 mt-1">Promo code applied successfully!</p>}
                {!promoApplied && <p className="text-xs text-muted-foreground mt-1">Try "BULAND10" for 10% off</p>}
              </div>

              {/* Checkout Button */}
              <Button className="w-full mt-6 bg-red-800 hover:bg-red-900 text-white" size="lg">
                <CreditCard className="h-4 w-4 mr-2" />
                Proceed to Checkout
              </Button>

              {/* Trust Badges */}
              <div className="mt-6 grid grid-cols-3 gap-2 text-center text-xs text-muted-foreground">
                <div className="flex flex-col items-center">
                  <TruckIcon className="h-5 w-5 mb-1 text-gray-600" />
                  <span>Free Shipping</span>
                  <span>Over ₨ 10,000</span>
                </div>
                <div className="flex flex-col items-center">
                  <Shield className="h-5 w-5 mb-1 text-gray-600" />
                  <span>Secure</span>
                  <span>Payment</span>
                </div>
                <div className="flex flex-col items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-5 w-5 mb-1 text-gray-600"
                  >
                    <path d="M21 10V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l2-1.14" />
                    <path d="m7.5 4.27 9 5.15" />
                    <polyline points="3.29 7 12 12 20.71 7" />
                    <line x1="12" x2="12" y1="22" y2="12" />
                    <circle cx="18.5" cy="15.5" r="2.5" />
                    <path d="M20.27 17.27 22 19" />
                  </svg>
                  <span>Easy</span>
                  <span>Returns</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* You May Also Like */}
      <div className="mt-16">
        <h2 className="text-2xl font-bold mb-6">You May Also Like</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {recommendedProducts.map((product) => (
            <Link href={`/products/${product.slug}`} key={product.id} className="group">
              <div className="rounded-lg overflow-hidden shadow-sm border">
                <div className="relative aspect-square overflow-hidden">
                  <Image
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                <div className="p-3">
                  <h3 className="font-medium text-sm line-clamp-1 group-hover:text-red-800 transition-colors">
                    {product.name}
                  </h3>
                  <p className="text-sm font-semibold mt-1">₨ {formatPrice(product.price)}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Recently Viewed */}
      <div className="mt-16">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Recently Viewed</h2>
          <Link href="/products" className="text-red-800 hover:text-red-900 text-sm font-medium flex items-center">
            View All
            <ChevronRight className="h-4 w-4 ml-1" />
          </Link>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {recentlyViewedProducts.map((product) => (
            <Link href={`/products/${product.slug}`} key={product.id} className="group">
              <div className="rounded-lg overflow-hidden shadow-sm border">
                <div className="relative aspect-square overflow-hidden">
                  <Image
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                <div className="p-3">
                  <h3 className="font-medium text-sm line-clamp-1 group-hover:text-red-800 transition-colors">
                    {product.name}
                  </h3>
                  <p className="text-sm font-semibold mt-1">₨ {formatPrice(product.price)}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}

