"use client"

import * as React from "react"
import Image from "next/image"
import Link from "next/link"
import { Menu, X, ShoppingBag, User, Search, Moon, Sun } from "lucide-react"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

// Navigation items
const navItems = [
  { name: "CATEGORIES", href: "/categories" },
  { name: "DROPS", href: "/new-arrivals" },
  { name: "BESTSELLERS", href: "/best-sellers" },
  { name: "COLLABS", href: "/collaborations" },
  { name: "Login", href: "/login" },
  { name: "Sign-UP", href: "/signup" },
]

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false)
  const [scrolled, setScrolled] = React.useState(false)
  const [darkMode, setDarkMode] = React.useState(false)

  // Handle scroll effect
  React.useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Initialize dark mode from localStorage or system preference
  React.useEffect(() => {
    // Check localStorage first
    const savedTheme = localStorage.getItem("theme")

    if (savedTheme === "dark") {
      setDarkMode(true)
      document.documentElement.classList.add("dark")
    } else if (savedTheme === "light") {
      setDarkMode(false)
      document.documentElement.classList.remove("dark")
    } else {
      // If no saved preference, check system preference
      if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
        setDarkMode(true)
        document.documentElement.classList.add("dark")
      }
    }
  }, [])

  // Toggle dark mode
  const toggleDarkMode = () => {
    const newDarkMode = !darkMode
    setDarkMode(newDarkMode)

    if (newDarkMode) {
      document.documentElement.classList.add("dark")
      localStorage.setItem("theme", "dark")
    } else {
      document.documentElement.classList.remove("dark")
      localStorage.setItem("theme", "light")
    }
  }

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-300",
        scrolled
          ? "bg-black text-white h-24 shadow-md dark:bg-zinc-900"
          : "bg-white text-black h-28 dark:bg-black dark:text-white",
      )}
    >
      {/* Announcement bar */}
      <div className="bg-black text-white text-xs py-1 text-center font-medium tracking-wider dark:bg-zinc-800">
        FREE SHIPPING ON ORDERS OVER $100
      </div>

      <div className="container mx-auto px-4 h-full flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="relative z-10">
          <div className="flex items-center">
            <div className="relative w-10 h-10 mr-2 overflow-hidden">
              <Image
                src="/logo-1.png"
                alt="BULAND Logo"
                fill
                className={cn("object-contain transition-all", darkMode || scrolled ? "invert" : "")}
              />
            </div>
            <span
              className={cn(
                "text-2xl font-extrabold tracking-tighter uppercase transition-all",
                scrolled ? "text-white" : "",
              )}
            >
              BULAND
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-1 lg:space-x-2">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "relative px-3 py-2 text-sm font-bold tracking-wider uppercase transition-all",
                "after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:bg-current",
                "after:transition-all after:duration-300 hover:after:w-full",
                scrolled ? "text-white" : "",
              )}
            >
              {item.name}
            </Link>
          ))}
        </nav>

        {/* Right side icons */}
        <div className="flex items-center gap-1 sm:gap-3">
          <Button
            variant="ghost"
            size="icon"
            className={cn(
              "rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800",
              scrolled ? "text-white hover:bg-zinc-800" : "",
            )}
            aria-label="Search"
          >
            <Search className="h-5 w-5" />
          </Button>

          {/* Theme Toggle Button */}
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleDarkMode}
            className={cn(
              "rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors",
              scrolled ? "text-white hover:bg-zinc-800" : "",
            )}
            aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
          >
            {darkMode ? (
              <Sun className="h-5 w-5 transition-transform duration-200 rotate-0 hover:rotate-90" />
            ) : (
              <Moon className="h-5 w-5" />
            )}
          </Button>

          <Button
            variant="ghost"
            size="icon"
            className={cn(
              "relative rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800",
              scrolled ? "text-white hover:bg-zinc-800" : "",
            )}
            aria-label="Shopping cart"
            asChild
          >
            <Link href="/cart">
              <ShoppingBag className="h-5 w-5" />
              <span className="absolute right-0 top-0 h-5 w-5 rounded-full bg-red-500 text-[10px] font-bold text-white flex items-center justify-center">
                2
              </span>
            </Link>
          </Button>

          <Button
            variant="ghost"
            size="icon"
            className={cn(
              "rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800",
              scrolled ? "text-white hover:bg-zinc-800" : "",
            )}
            aria-label="User account"
            asChild
          >
            <Link href="/account">
              <User className="h-5 w-5" />
            </Link>
          </Button>

          {/* Mobile menu button */}
          <Button
            variant="ghost"
            size="icon"
            className={cn(
              "md:hidden rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800",
              scrolled ? "text-white hover:bg-zinc-800" : "",
            )}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {/* Mobile menu overlay */}
      <div
        className={cn(
          "fixed inset-0 text-black dark:text-white bg-zinc-100 dark:bg-zinc-950 bg-opacity-90 z-50 transition-all duration-300 md:hidden overflow-y-auto",
          mobileMenuOpen ? "opacity-100 text-black dark:text-white bg-zinc-100 dark:bg-zinc-950 pointer-events-auto" : "opacity-0 pointer-events-none",
        )}
      >
        <div className="flex flex-col h-full pt-12 px-6 pb-6">
          {/* Add logo and brand name at the top of mobile menu */}
          <div className="flex items-center mb-8">
            <div className="relative w-10 h-10 mr-2 overflow-hidden">
              <Image
                src="/logo-1.png"
                alt="BULAND Logo"
                fill
                className={cn("object-contain", darkMode ? "invert" : "")}
              />
            </div>
            <span className="text-3xl font-black tracking-tighter uppercase ">BULAND</span>
          </div>

          {/* Close button */}
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-6 right-6 hover:bg-zinc-900 dark:hover:bg-zinc-100 dark:hover:text-red-500 hover:text-white rounded-full"
            onClick={() => setMobileMenuOpen(false)}
            aria-label="Close menu"
          >
            <X className="h-6 w-6" />
          </Button>

          <nav className="flex flex-col space-y-6">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className=" text-3xl font-black tracking-tight uppercase border-b border-zinc-800 pb-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.name}
              </a>
            ))}
          </nav>

          {/* Bottom Section */}
          <div className="mt-3">
            <div className="flex flex-col space-y-4">
              <a href="/account" className=" text-sm font-medium" onClick={() => setMobileMenuOpen(false)}>
                My Account
              </a>
              <a href="/orders" className=" text-sm font-medium" onClick={() => setMobileMenuOpen(false)}>
                Order History
              </a>
              <a href="/help" className=" text-sm font-medium" onClick={() => setMobileMenuOpen(false)}>
                Help & FAQ
              </a>

              <div className="border-t border-zinc-800 flex space-x-4">
              <a href="#" className="text-white hover:text-zinc-300">
                <span className="sr-only">Instagram</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path
                    fillRule="evenodd"
                    d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902..."
                    clipRule="evenodd"
                  />
                </svg>
              </a>
              <a href="#" className="text-white hover:text-zinc-300">
                <span className="sr-only">Twitter</span>
                {/* Add Twitter Icon Here */}
              </a>
            </div>
            </div>
          </div>
          <div className="mt-8 pt-6 flex space-x-6">
              <a href="#" className="hover:opacity-80">
                <span className="sr-only">Instagram</span>
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
                  className="lucide lucide-instagram"
                >
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"></line>
                </svg>
              </a>
              <a href="#" className="hover:opacity-80">
                <span className="sr-only">Twitter</span>
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
                  className="lucide lucide-twitter"
                >
                  <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
                </svg>
              </a>
              <a href="#" className="hover:opacity-80">
                <span className="sr-only">Facebook</span>
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
                  className="lucide lucide-facebook"
                >
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                </svg>
              </a>
            </div>
        </div>
      </div>
    
    </header>
  )
}

