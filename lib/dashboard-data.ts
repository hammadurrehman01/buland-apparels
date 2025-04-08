import { Package, Heart, CreditCard, MapPin, Bell, Settings, Home } from "lucide-react"
import type { NavigationItem, UserData, DashboardData, OrdersData } from "./dashboard-types"

// Navigation items
export const navigationItems: NavigationItem[] = [
  {
    title: "Dashboard",
    href: "#dashboard",
    icon: Home,
  },
  {
    title: "Orders",
    href: "#orders",
    icon: Package,
  },
  {
    title: "Wishlist",
    href: "#wishlist",
    icon: Heart,
  },
  {
    title: "Payment Methods",
    href: "#payment",
    icon: CreditCard,
  },
  {
    title: "Addresses",
    href: "#addresses",
    icon: MapPin,
  },
  {
    title: "Notifications",
    href: "#notifications",
    icon: Bell,
    badge: 3,
  },
  {
    title: "Account Settings",
    href: "#settings",
    icon: Settings,
  },
]

// Mock user data
export const userData: UserData = {
  name: "Ahmed Khan",
  email: "ahmed.khan@example.com",
  phone: "+92 300 1234567",
  memberSince: "January 2023",
}

// Mock data for dashboard
export const dashboardData: DashboardData = {
  stats: {
    totalOrders: 12,
    wishlistItems: 8,
    savedCards: 2,
    loyaltyPoints: 450,
  },
  recentOrders: [
    {
      id: "BLD-123456",
      date: "May 15, 2023",
      status: "Delivered",
      total: 8999,
      items: [
        {
          name: "Dystopia Graphic Tee",
          image: "/products/shirt-product-4.png",
        },
        {
          name: "Minimalist Logo Shirt",
          image: "/products/shirt-product-5.png",
        },
      ],
    },
    {
      id: "BLD-123455",
      date: "April 28, 2023",
      status: "Processing",
      total: 4999,
      items: [
        {
          name: "Urban Chaos Tee",
          image: "/product-3.jpg",
        },
      ],
    },
    {
      id: "BLD-123454",
      date: "March 12, 2023",
      status: "Delivered",
      total: 12998,
      items: [
        {
          name: "Structured Collar Shirt",
          image: "/product-4.jpg",
        },
        {
          name: "Dystopia Oversized Tee",
          image: "/product-5.jpg",
        },
      ],
    },
  ],
  wishlist: [
    {
      id: 1,
      name: "Minimal Stripe Shirt",
      image: "/product-6.jpg",
      price: 4999,
      inStock: true,
    },
    {
      id: 2,
      name: "Classic Fit Tee",
      image: "/product-1.jpg",
      price: 3799,
      inStock: true,
    },
    {
      id: 3,
      name: "Premium Cotton Shirt",
      image: "/product-2.jpg",
      price: 4099,
      inStock: false,
    },
    {
      id: 4,
      name: "Urban Chaos Tee",
      image: "/product-3.jpg",
      price: 3699,
      inStock: true,
    },
  ],
  upcomingDeliveries: [
    {
      id: "BLD-123455",
      date: "May 22, 2023",
      status: "In Transit",
      trackingId: "TRK-987654",
      total: 4999,
      items: [
        {
          name: "Urban Chaos Tee",
          image: "/product-3.jpg",
        },
      ],
    },
  ],
  addresses: [
    {
      id: 1,
      type: "Home",
      default: true,
      name: "Ahmed Khan",
      address: "123 Main Street, Block 7",
      city: "Karachi",
      postalCode: "75300",
      phone: "+92 300 1234567",
    },
    {
      id: 2,
      type: "Office",
      default: false,
      name: "Ahmed Khan",
      address: "456 Business Avenue, Floor 3",
      city: "Karachi",
      postalCode: "75600",
      phone: "+92 300 7654321",
    },
  ],
  paymentMethods: [
    {
      id: 1,
      type: "Credit Card",
      default: true,
      cardType: "Visa",
      lastFour: "4242",
      expiryDate: "05/25",
    },
    {
      id: 2,
      type: "Credit Card",
      default: false,
      cardType: "Mastercard",
      lastFour: "8888",
      expiryDate: "12/24",
    },
  ],
}

// Mock data for orders
export const ordersData: OrdersData = {
  all: [
    {
      id: "BLD-123456",
      date: "May 15, 2023",
      status: "Delivered",
      total: 8999,
      items: [
        {
          name: "Dystopia Graphic Tee",
          image: "/products/shirt-product-4.png",
          price: 3999,
          quantity: 1,
        },
        {
          name: "Minimalist Logo Shirt",
          image: "/products/shirt-product-5.png",
          price: 4999,
          quantity: 1,
        },
      ],
    },
    {
      id: "BLD-123455",
      date: "April 28, 2023",
      status: "Processing",
      total: 4999,
      items: [
        {
          name: "Urban Chaos Tee",
          image: "/product-3.jpg",
          price: 4999,
          quantity: 1,
        },
      ],
    },
    {
      id: "BLD-123454",
      date: "March 12, 2023",
      status: "Delivered",
      total: 12998,
      items: [
        {
          name: "Structured Collar Shirt",
          image: "/product-4.jpg",
          price: 6999,
          quantity: 1,
        },
        {
          name: "Dystopia Oversized Tee",
          image: "/product-5.jpg",
          price: 5999,
          quantity: 1,
        },
      ],
    },
    {
      id: "BLD-123453",
      date: "February 5, 2023",
      status: "Cancelled",
      total: 4999,
      items: [
        {
          name: "Minimal Stripe Shirt",
          image: "/product-6.jpg",
          price: 4999,
          quantity: 1,
        },
      ],
    },
  ],
  processing: [
    {
      id: "BLD-123455",
      date: "April 28, 2023",
      status: "Processing",
      total: 4999,
      items: [
        {
          name: "Urban Chaos Tee",
          image: "/product-3.jpg",
          price: 4999,
          quantity: 1,
        },
      ],
    },
  ],
  delivered: [
    {
      id: "BLD-123456",
      date: "May 15, 2023",
      status: "Delivered",
      total: 8999,
      items: [
        {
          name: "Dystopia Graphic Tee",
          image: "/products/shirt-product-4.png",
          price: 3999,
          quantity: 1,
        },
        {
          name: "Minimalist Logo Shirt",
          image: "/products/shirt-product-5.png",
          price: 4999,
          quantity: 1,
        },
      ],
    },
    {
      id: "BLD-123454",
      date: "March 12, 2023",
      status: "Delivered",
      total: 12998,
      items: [
        {
          name: "Structured Collar Shirt",
          image: "/product-4.jpg",
          price: 6999,
          quantity: 1,
        },
        {
          name: "Dystopia Oversized Tee",
          image: "/product-5.jpg",
          price: 5999,
          quantity: 1,
        },
      ],
    },
  ],
  cancelled: [
    {
      id: "BLD-123453",
      date: "February 5, 2023",
      status: "Cancelled",
      total: 4999,
      items: [
        {
          name: "Minimal Stripe Shirt",
          image: "/product-6.jpg",
          price: 4999,
          quantity: 1,
        },
      ],
    },
  ],
}
