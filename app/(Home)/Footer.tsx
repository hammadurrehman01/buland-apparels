"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import {
  ArrowRight,
  Instagram,
  Twitter,
  Youtube,
  Send,
  ChevronRight,
  CreditCard,
  Truck,
  ShieldCheck,
  User,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Image from "next/image"

export default function Footer() {
  const [email, setEmail] = useState("")
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) {
      setIsSubmitted(true)
      // In a real app, you would handle the newsletter signup here
      setTimeout(() => {
        setIsSubmitted(false)
        setEmail("")
      }, 3000)
    }
  }

  const footerLinks = [
    {
      title: "SHOP",
      links: [
        { name: "New Arrivals", href: "#" },
        { name: "Dystopia Collection", href: "#" },
        { name: "Props Vol. 1", href: "#" },
        { name: "Astro Collection", href: "#" },
        { name: "Accessories", href: "#" },
      ],
    },
    {
      title: "ACCOUNT",
      links: [
        { name: "My Account", href: "#" },
        { name: "Order History", href: "#" },
        { name: "Wishlist", href: "#" },
        { name: "Returns", href: "#" },
      ],
    },
    {
      title: "INFORMATION",
      links: [
        { name: "About Buland", href: "#" },
        { name: "Our Manifesto", href: "#" },
        { name: "FAQ", href: "#" },
      ],
    },
  ]

  const pakistaniMethods = [
    { name: "Cash on Delivery", src:"/payment-1.png" ,id: "cod" },
    { name: "SadaPay",src:"/payment-2.png" , id: "sadapay" },
    { name: "Meezan Bank",src:"/payment-3.png"  ,id: "meezan" },
    { name: "Easypaisa",src:"/payment-4.png" , id: "easypaisa" },
  ]

  const ecommerceFeatures = [
    {
      icon: <CreditCard className="h-5 w-5 text-red-600" />,
      title: "SECURE PAYMENT",
      description: "All major payment methods accepted",
    },
    {
      icon: <Truck className="h-5 w-5 text-red-600" />,
      title: "WORLDWIDE SHIPPING",
      description: "Free shipping on orders over $150",
    },
    {
      icon: <ShieldCheck className="h-5 w-5 text-red-600" />,
      title: "30-DAY RETURNS",
      description: "Easy returns and exchanges",
    },
    {
      icon: <User className="h-5 w-5 text-red-600" />,
      title: "24/7 SUPPORT",
      description: "Contact us anytime via email",
    },
  ]

  return (
    <footer className=" relative overflow-hidden mx-auto max-w-screen-2xl">
      {/* Diagonal top divider */}
      <div
        className="absolute top-0 left-0 w-full h-16 "
        style={{ clipPath: "polygon(0 0, 100% 100%, 100% 0, 0 0)" }}
      />

      {/* Red static lines overlay */}
      <div
        className="absolute inset-0 z-0 opacity-5 pointer-events-none bg-repeat"
        style={{
          backgroundImage:
            "linear-gradient(0deg, transparent 24%, rgba(239, 68, 68, .3) 25%, rgba(239, 68, 68, .3) 26%, transparent 27%, transparent 74%, rgba(239, 68, 68, .3) 75%, rgba(239, 68, 68, .3) 76%, transparent 77%, transparent)",
          backgroundSize: "50px 50px",
          mixBlendMode: "overlay",
        }}
      />

      {/* E-commerce features section */}
      <div className="relative mx-auto max-w-screen-xl z-10 border-b border-zinc-800">
        <div className=" px-4 md:px-6 py-10 md:py-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {ecommerceFeatures.map((feature, index) => (
              <div key={index} className="flex items-start space-x-4">
                <div className="mt-1">{feature.icon}</div>
                <div>
                  <h4 className=" text-sm font-bold mb-1">{feature.title}</h4>
                  <p className="text-zinc-400 text-sm">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Newsletter section */}
      <div className="relative z-10 border-b border-zinc-800">
        <div className="container px-4 md:px-6 py-12 md:py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
            <div>
              <h3 className="text-2xl md:text-3xl font-bold  mb-4">
                JOIN THE <span className="text-red-600">REBELLION</span>
              </h3>
              <p className="text-zinc-400 max-w-md">
                Subscribe to our newsletter for exclusive drops, limited editions, and dystopian fashion insights.
              </p>
            </div>

            <div>
              <form onSubmit={handleSubmit} className="relative">
                <div className="flex flex-col sm:flex-row gap-3">
                  <div className="relative flex-1">
                    <Input
                      type="email"
                      placeholder="Your email address"
                      className="bg-zinc-900 border-zinc-700  h-12 pl-4 pr-12 focus:border-red-600 rounded-none"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                    <Send className="absolute right-4 top-1/2 transform -translate-y-1/2 h-4 w-4 text-zinc-500" />
                  </div>
                  <Button type="submit" className="bg-red-600 hover:bg-red-700 text-white rounded-none h-12">
                    {isSubmitted ? "THANK YOU" : "SUBSCRIBE"} <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Main footer content */}
      <div className="relative z-10">
        <div className="container px-4 md:px-6 py-12 md:py-16">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
            {/* Brand column */}
            <div className="md:col-span-4 lg:col-span-3">
              <div className="mb-6">
                <Link href="/" className="inline-block">
                  <div className="text-3xl font-black underline decoration-red-600">
                    BULAND
                  </div>
                </Link>
              </div>

              <p className="text-zinc-400 mb-6">
                Engineered for the dystopian future. Clothing for those who refuse to conform.
              </p>

              <div className="flex space-x-4 mb-6">
                <Link href="https://www.instagram.com/bulandapparel" target="_blank" className="text-zinc-400 flex gap-2 items-center hover:text-red-600 transition-colors">
                  <Instagram className="h-5 w-5" />
                  bulandapparels
                </Link>
   
              </div>

              <div>
                <p className="text-zinc-400 mb-2">
                  <span className="">Customer Service:</span>
                </p>
                <Link href="mailto:support@buland.com" className="text-zinc-400 hover:text-red-600 transition-colors">
                  support@buland.com
                </Link>
              </div>
            </div>

            {/* Links columns */}
            {footerLinks.map((column) => (
              <div key={column.title} className="md:col-span-2 lg:col-span-2">
                <h4 className=" font-bold mb-4 flex items-center">
                  <div className="w-4 h-px bg-red-600 mr-2"></div>
                  {column.title}
                </h4>
                <ul className="space-y-2">
                  {column.links.map((link) => (
                    <motion.li key={link.name} whileHover={{ x: 5 }} className="text-zinc-400">
                      <Link
                        href={link.href}
                        className="hover:text-red-600 transition-colors inline-flex items-center group"
                      >
                        <span>{link.name}</span>
                        <ChevronRight className="ml-1 h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </Link>
                    </motion.li>
                  ))}
                </ul>
              </div>
            ))}

            <div className="md:col-span-4 lg:col-span-3">
              <h4 className="font-bold mb-4 flex items-center">
                <div className="w-4 h-px bg-red-600 mr-2"></div>
                PAYMENT PARTNERS
              </h4>

              <div className="grid grid-cols-2  gap-6 mb-6">
                {pakistaniMethods.map((method) => (
                  <div
                    key={method.id}
                    className="h-12 bg-zinc-200 w-[140px] flex items-center justify-center rounded-sm"
                    style={{ clipPath: "polygon(0 0, 100% 0, 100% 90%, 90% 100%, 0 100%)" }}
                  >
                    <Image className="mr-1" src={method.src} width={30} height={30} alt={method.id}></Image>

                    <div className="text-xs font-semibold text-black">{method.name}</div>
                  </div>
                ))}
              </div>

              <p className="text-sm text-zinc-500">We accept all major payment methods in Pakistan for your convenience.</p>
            </div>


          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="relative z-10 border-t border-zinc-800">
        <div className="container px-4 md:px-6 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-zinc-500 text-sm mb-4 md:mb-0">
              © {new Date().getFullYear()} Buland. All rights reserved.
            </div>

            <div className="flex flex-wrap justify-center gap-4 text-sm text-zinc-500">
              <Link href="#" className="hover:text-red-600 transition-colors">
                Privacy Policy
              </Link>
              <span className="hidden md:inline">|</span>
              <Link href="#" className="hover:text-red-600 transition-colors">
                Terms of Service
              </Link>
              <span className="hidden md:inline">|</span>
              <Link href="#" className="hover:text-red-600 transition-colors">
                Shipping Policy
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Red accent line at bottom */}
      <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-red-900 via-red-600 to-red-900"></div>
    </footer>
  )
}

