"use client"

import * as React from "react"
import Image from "next/image"
import Link from "next/link"
import { ChevronDown, ChevronRight, Menu, Moon, ShoppingBag, Sun, User } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import {Sidebar,SidebarContent,SidebarGroup,SidebarGroupContent,SidebarGroupLabel,SidebarHeader,SidebarMenu,SidebarMenuButton,SidebarMenuItem,SidebarProvider,} from "@/components/ui/sidebar"

const categories = {
  featured: {
    title: "Featured",
    items: ["New Arrivals", "Best Sellers", "Sale","Categories"],
  },
  men: {
    title: "Men",
    items: {
      clothing: {
        title: "Clothing",
        items: ["T-Shirts", "Hoodies", "Pants", "Jackets"],
      },
      accessories: {
        title: "Accessories",
        items: ["Bags", "Hats", "Jewelry"],
      },
      collections: {
        title: "Collections",
        items: ["Summer 2024", "Winter Essentials", "Sport"],
      },
    },
  },
  women: {
    title: "Women",
    items: {
      clothing: {
        title: "Clothing",
        items: ["T-Shirts", "Hoodies", "Dresses", "Skirts"],
      },
      accessories: {
        title: "Accessories",
        items: ["Bags", "Jewelry", "Scarves"],
      },
      collections: {
        title: "Collections",
        items: ["Summer 2024", "Winter Essentials", "Evening Wear"],
      },
    },
  },
}

export function Navbar() {
  const [theme, setTheme] = React.useState<"light" | "dark">("light")

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light"
    setTheme(newTheme)
    document.documentElement.classList.toggle("dark")
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 ">
      <div className="container flex h-20 items-center mx-auto">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="md:hidden">
              <Menu className="h-6 w-6" />
              <span className="sr-only">Toggle navigation menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-[300px] p-0">
            <SidebarProvider>
              <Sidebar>
                <SidebarHeader className="border-b p-4 bg-primary">
                  <SheetTitle className="flex items-center gap-2 text-primary-foreground">
                    <Image
                      src="/logo-1.png"
                      alt="Buland Logo"
                      width={80}
                      height={80}
                      className="invert"
                    />
                    <span className="text-xl font-bold">Buland</span>
                  </SheetTitle>
                </SidebarHeader>
                <SidebarContent className="p-0">
                  <div className="space-y-2 py-4">
                    {/* Featured Section */}
                    <div className="px-3">
                      <div className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                        Featured
                      </div>
                      {categories.featured.items.map((item) => (
                        <Link
                          key={item}
                          href={`/${item.toLowerCase().replace(/\s+/g, "-")}`}
                          className="block rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground"
                        >
                          {item}
                        </Link>
                      ))}
                    </div>

                    <div className="mx-3 h-px bg-border" />

                    {/* Main Categories */}
                    {Object.entries(categories)
                      .filter(([key]) => key !== "featured")
                      .map(([key, category]) => (
                        <Collapsible key={key}>
                          <CollapsibleTrigger className="flex w-full items-center justify-between px-3 py-2 text-sm font-medium hover:bg-accent">
                            <span>{category.title}</span>
                            <ChevronDown className="h-4 w-4 transition-transform duration-200 group-data-[state=open]:rotate-180" />
                          </CollapsibleTrigger>
                          <CollapsibleContent className="space-y-4 px-3 py-2">
                            {Object.entries(category.items).map(([subKey, subCategory]) => (
                              <Collapsible key={subKey}>
                                <CollapsibleTrigger className="flex w-full items-center justify-between rounded-md px-3 py-1 text-sm hover:bg-accent">
                                  <span>{subCategory.title}</span>
                                  <ChevronRight className="h-4 w-4 transition-transform duration-200 group-data-[state=open]:rotate-90" />
                                </CollapsibleTrigger>
                                <CollapsibleContent className="ml-3 space-y-1 pt-1">
                                  {subCategory.items.map((item :any) => (
                                    <Link
                                      key={item}
                                      href={`/products/${key}/${item.toLowerCase().replace(/\s+/g, "-")}`}
                                      className="block rounded-md px-3 py-1 text-sm text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                                    >
                                      {item}
                                    </Link>
                                  ))}
                                </CollapsibleContent>
                              </Collapsible>
                            ))}
                          </CollapsibleContent>
                        </Collapsible>
                      ))}
                  </div>
                </SidebarContent>
              </Sidebar>
            </SidebarProvider>
          </SheetContent>
        </Sheet>

        <div className="flex w-full items-center justify-between md:gap-10">
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/logo-1.png"
              alt="Buland Logo"
              width={60}
              height={60}
              className="dark:invert"
            />
            <span className="text-xl font-bold">Buland Apparel</span>
          </Link>

          <nav className="hidden md:flex md:gap-6">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" className="group font-medium">
                  Categories
                  <ChevronDown className="ml-2 h-4 w-4 transition-transform duration-200 group-data-[state=open]:rotate-180" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-[300px] p-0">
                <SidebarProvider>
                  <Sidebar>
                    <SidebarHeader className="border-b p-4 bg-primary">
                      <SheetTitle className="text-primary-foreground">Categories</SheetTitle>
                    </SidebarHeader>
                    <SidebarContent>
                      <SidebarGroup>
                        {Object.entries(categories)
                          .filter(([key]) => key !== "featured")
                          .map(([key, category]) => (
                            <div key={key} className="px-2 py-1">
                              <SidebarGroupLabel className="mb-2">{category.title}</SidebarGroupLabel>
                              <SidebarGroupContent>
                                <SidebarMenu>
                                  {Object.entries(category.items).map(([subKey, subCategory]) => (
                                    <SidebarMenuItem key={subKey}>
                                      <SidebarMenuButton asChild>
                                        <Link href={`/categories/${key}/${subKey}`}>{subCategory.title}</Link>
                                      </SidebarMenuButton>
                                    </SidebarMenuItem>
                                  ))}
                                </SidebarMenu>
                              </SidebarGroupContent>
                            </div>
                          ))}
                      </SidebarGroup>
                    </SidebarContent>
                  </Sidebar>
                </SidebarProvider>
              </SheetContent>
            </Sheet>
            {categories.featured.items.map((item) => (
              <Button
                key={item}
                variant="ghost"
                className="font-medium hover:bg-primary hover:text-primary-foreground"
                asChild
              >
                <Link href={`/${item.toLowerCase().replace(/\s+/g, "-")}`}>{item}</Link>
              </Button>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              className="relative hover:bg-primary hover:text-primary-foreground"
              aria-label="Shopping cart"
            >
              <ShoppingBag className="h-5 w-5" />
              <span className="absolute right-0 top-0 h-4 w-4 rounded-full bg-primary text-[10px] font-bold text-primary-foreground">
                2
              </span>
            </Button>
            
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              className="hover:bg-primary hover:text-primary-foreground"
              aria-label="Toggle theme"
            >
              {theme === "light" ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="hover:bg-primary hover:text-primary-foreground"
              aria-label="User account"
            >
              <User className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
}

