import type React from "react"
export interface NavigationItem {
  title: string
  href: string
  icon: React.ElementType
  badge?: number
}

export interface UserData {
  name: string
  email: string
  phone: string
  memberSince: string
}

export interface OrderItem {
  name: string
  image: string
  price?: number
  quantity?: number
}

export interface Order {
  id: string
  date: string
  status: "Delivered" | "Processing" | "Cancelled" | string
  total: number
  items: OrderItem[]
  trackingId?: string
}

export interface WishlistItem {
  id: number
  name: string
  image: string
  price: number
  inStock: boolean
}

export interface Address {
  id: number
  type: string
  default: boolean
  name: string
  address: string
  city: string
  postalCode: string
  phone: string
}

export interface PaymentMethod {
  id: number
  type: string
  default: boolean
  cardType: string
  lastFour: string
  expiryDate: string
}

export interface DashboardData {
  stats: {
    totalOrders: number
    wishlistItems: number
    savedCards: number
    loyaltyPoints: number
  }
  recentOrders: Order[]
  wishlist: WishlistItem[]
  upcomingDeliveries: Order[]
  addresses: Address[]
  paymentMethods: PaymentMethod[]
}

export interface OrdersData {
  all: Order[]
  processing: Order[]
  delivered: Order[]
  cancelled: Order[]
}
