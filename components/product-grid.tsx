"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { X, Filter, Search, ShoppingBag } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogTitle, DialogDescription, DialogClose } from "@/components/ui/dialog"
import { Slider } from "@/components/ui/slider"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs"

const products = [
  {
    id: "1",
    name: "Social Anxiety Tee-Dystopia Collection",
    price: 1200,
    images: ["/products/shirt-product-1.png", "/products/shirt-product-1.png"],
    description: "A comfortable classic cotton t-shirt perfect for everyday wear.",
    category: "t-shirts",
    collection: "Dystopia Collection",
    design: "Graphic Print",
    tags: ["bestseller", "new"],
  },
  {
    id: "2",
    name: "Dreams Anxiety Tee-Dystopia Collection",
    price: 1300,
    images: ["/products/shirt-product-2.png", "/products/shirt-product-2.png"],
    description: "A vintage-style graphic t-shirt with unique designs.",
    category: "t-shirts",
    collection: "Dystopia Collection",
    design: "Graphic Print",
    tags: ["limited"],
  },
  {
    id: "3",
    name: "Hustle Habit Tee-Dystopia Collection",
    price: 1300,
    images: ["/products/shirt-product-3.png", "/products/shirt-product-3.png"],
    description: "A vintage-style graphic t-shirt with unique designs.",
    category: "t-shirts",
    collection: "Dystopia Collection",
    design: "Graphic Print",
    tags: [],
  },
  {
    id: "4",
    name: "Geospace Tee-Dystopia Collection",
    price: 1300,
    images: ["/products/shirt-product-4.png", "/products/shirt-product-4.png"],
    description: "A vintage-style graphic t-shirt with unique designs.",
    category: "t-shirts",
    collection: "Dystopia Collection",
    design: "Minimalist",
    tags: ["bestseller"],
  },
  {
    id: "5",
    name: "Brave Tee-Dystopia Collection",
    price: 1300,
    images: ["/products/shirt-product-5.png", "/products/shirt-product-5.png"],
    description: "A vintage-style graphic t-shirt with unique designs.",
    category: "t-shirts",
    collection: "Dystopia Collection",
    design: "Minimalist",
    tags: [],
  },
  {
    id: "6",
    name: "Yakuza Tee-Dystopia Collection",
    price: 1300,
    images: ["/products/shirt-product-6.png", "/products/shirt-product-6.png"],
    description: "A vintage-style graphic t-shirt with unique designs.",
    category: "t-shirts",
    collection: "Dystopia Collection",
    design: "Minimalist",
    tags: ["new"],
  },
  {
    id: "7",
    name: "Promise Tee-Dystopia Collection",
    price: 1300,
    images: ["/products/shirt-product-7.png", "/products/shirt-product-7.png"],
    description: "A vintage-style graphic t-shirt with unique designs.",
    category: "t-shirts",
    collection: "Dystopia Collection",
    design: "Minimalist",
    tags: [],
  },
  {
    id: "8",
    name: "Cozy Pullover Hoodie",
    price: 5999,
    images: ["/placeholder.svg?height=600&width=400", "/placeholder.svg?height=600&width=400"],
    description: "A warm and comfortable pullover hoodie for cold days.",
    category: "hoodies",
    collection: "Dystopia Collection",
    design: "Minimalist",
    tags: ["limited"],
  },
]

const collections = [
  "All Collections",
  "Dystopia Collection",
  "Anime Collection",
  "Motorsport Collection",
  "Minimalist Collection",
  "Astro Attire Series",
  "Graphic StreetWear Collection",
  "Props Vol I",
]

const designs = [
  "All Designs",
  "Graphic Print",
  "Minimalist",
  "Skin-Fit",
  "Drop Shoulder Design",
  "Oversized",
  "Distressed",
]

const sortOptions = [
  { value: "bestselling", label: "Best Selling" },
  { value: "newest", label: "Newest Arrivals" },
  { value: "priceLow", label: "Price: Low to High" },
  { value: "priceHigh", label: "Price: High to Low" },
]

const sizes = ["XS", "S", "M", "L", "XL", "XXL"]
// const colors = ["Black", "White", "Red", "Grey", "Green", "Blue"]

export default function ProductGrid() {
  const [selectedProduct, setSelectedProduct] = useState<null | typeof products[0]>(null)
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)
  const [priceRange, setPriceRange] = useState([0, 6000])
  const [searchQuery, setSearchQuery] = useState("")
  const [activeFilters, setActiveFilters] = useState<{
    collection: string,
    design: string,
    sort: string,
    sizes: string[],
    colors: string[],
    tags: string[],
  }>({
    collection: "All Collections",
    design: "All Designs",
    sort: "bestselling",
    sizes: [],
    colors: [],
    tags: [],
  })

  const [filteredProducts, setFilteredProducts] = useState(products)

  useEffect(() => {
    let result = [...products]

    if (searchQuery.trim() !== "") {
      const query = searchQuery.toLowerCase()
      result = result.filter(
        product => 
          product.name.toLowerCase().includes(query) || 
          product.description.toLowerCase().includes(query) ||
          product.collection.toLowerCase().includes(query)
      )
    }

    result = result.filter((product) => product.price >= priceRange[0] && product.price <= priceRange[1])

    if (activeFilters.collection !== "All Collections") {
      result = result.filter((product) => product.collection === activeFilters.collection)
    }

    if (activeFilters.design !== "All Designs") {
      result = result.filter((product) => product.design === activeFilters.design)
    }

    if (activeFilters.sizes.length > 0) {
   
    }

    if (activeFilters.colors.length > 0) {

    }

    // Sort products
    switch (activeFilters.sort) {
      case "priceLow":
        result.sort((a, b) => a.price - b.price)
        break
      case "priceHigh":
        result.sort((a, b) => b.price - a.price)
        break
      case "newest":
        break
      default:
        result.sort((a, b) => {
          const aIsBestseller = a.tags?.includes("bestseller") ? 1 : 0
          const bIsBestseller = b.tags?.includes("bestseller") ? 1 : 0
          return bIsBestseller - aIsBestseller
        })
    }

    setFilteredProducts(result)
  }, [activeFilters, priceRange, searchQuery])

  const toggleSizeFilter = (size: string) => {
    setActiveFilters((prev) => ({
      ...prev,
      sizes: prev.sizes.includes(size) ? prev.sizes.filter((s) => s !== size) : [...prev.sizes, size],
    }))
  }

  const toggleColorFilter = (color: string) => {
    setActiveFilters((prev) => ({
      ...prev,
      colors: prev.colors.includes(color) ? prev.colors.filter((c) => c !== color) : [...prev.colors, color],
    }))
  }

  const formatPrice = (price: number | bigint) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price)
  }

  const resetFilters = () => {
    setActiveFilters({
      collection: "All Collections",
      design: "All Designs",
      sort: "bestselling",
      sizes: [],
      colors: [],
      tags: [],
    })
    setPriceRange([0, 6000])
    setSearchQuery("")
  }

  return (
    <div className="">
      <div className=" px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero section */}
        <div className="mb-12 text-center">
          <h1 className="text-2xl md:text-8xl font-extrabold mb-4 tracking-tight">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-red-500 via-red-700 to-red-900">
              Shop the Collection 
            </span>
          </h1>
          <p className="text-zinc-400 max-w-2xl mx-auto text-lg">
            Explore our exclusive designs that blend urban aesthetics with dystopian themes.
            Each piece tells a story of rebellion and self-expression.
          </p>
        </div>

        {/* Search bar */}
        <div className="relative max-w-md mx-auto mb-10">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 " />
            <Input
              type="text"
              placeholder="Search products..."
              className="pl-10 bg-zinc-100 dark:bg-zinc-800/50 border-zinc-700 focus-visible:ring-red-500 "
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {searchQuery && (
              <Button 
                variant="ghost" 
                size="icon" 
                className="absolute right-2 top-1/2 transform -translate-y-1/2 h-6 w-6 "
                onClick={() => setSearchQuery("")}
              >
                <X className="h-4 w-4" />
              </Button>
            )}
          </div>
        </div>

        {/* Mobile filter dialog */}
        <Dialog open={mobileFiltersOpen} onOpenChange={setMobileFiltersOpen}>
          <DialogContent className="sm:max-w-[425px] bg-zinc-900 border-zinc-800 text-zinc-100">
            <DialogTitle className="text-xl font-bold">Filters</DialogTitle>
            <DialogDescription className="text-zinc-400">
              Refine your product selection with these filters.
            </DialogDescription>
            <ScrollArea className="h-[60vh] pr-4">
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-3">Price Range</h3>
                  <div className="px-2">
                    <Slider
                      defaultValue={[0, 6000]}
                      max={6000}
                      step={100}
                      value={priceRange}
                      onValueChange={setPriceRange}
                      className="mb-6"
                    />
                    <div className="flex items-center justify-between">
                      <span>{formatPrice(priceRange[0])}</span>
                      <span>{formatPrice(priceRange[1])}</span>
                    </div>
                  </div>
                </div>

                <Separator className="bg-zinc-800 dark:bg-slate-300" />

                <div>
                  <h3 className="text-lg font-semibold mb-3">Collection</h3>
                  <Select
                    value={activeFilters.collection}
                    onValueChange={(value) => setActiveFilters((prev) => ({ ...prev, collection: value }))}
                  >
                    <SelectTrigger className="w-full bg-zinc-800 border-zinc-700">
                      <SelectValue placeholder="Select Collection" />
                    </SelectTrigger>
                    <SelectContent className="bg-zinc-800 border-zinc-700">
                      {collections.map((collection) => (
                        <SelectItem key={collection} value={collection}>
                          {collection}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <Separator className="bg-zinc-800 dark:bg-slate-300" />

                <div>
                  <h3 className="text-lg font-semibold mb-3">Design</h3>
                  <Select
                    value={activeFilters.design}
                    onValueChange={(value) => setActiveFilters((prev) => ({ ...prev, design: value }))}
                  >
                    <SelectTrigger className="w-full bg-zinc-800 border-zinc-700">
                      <SelectValue placeholder="Select Design" />
                    </SelectTrigger>
                    <SelectContent className="bg-zinc-800 border-zinc-700">
                      {designs.map((design) => (
                        <SelectItem key={design} value={design}>
                          {design}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <Separator className="bg-zinc-800 dark:bg-slate-300" />

                <div>
                  <h3 className="text-lg font-semibold mb-3">Size</h3>
                  <div className="grid grid-cols-3 gap-2">
                    {sizes.map((size) => (
                      <Label
                        key={size}
                        className={`flex items-center justify-center p-2 border ${
                          activeFilters.sizes.includes(size)
                            ? "border-red-500 bg-red-500/10 text-red-300"
                            : "border-zinc-700 hover:border-zinc-500"
                        } rounded-md cursor-pointer transition-colors`}
                        onClick={() => toggleSizeFilter(size)}
                      >
                        {size}
                      </Label>
                    ))}
                  </div>
                </div>

                <Separator className="bg-zinc-800 dark:bg-slate-300" />

              </div>
            </ScrollArea>
            <div className="flex justify-between">
              <Button variant="outline" onClick={resetFilters} className="border-zinc-700 text-zinc-300">
                Reset All
              </Button>
              <DialogClose asChild>
                <Button className="bg-red-600 hover:bg-red-700">Apply Filters</Button>
              </DialogClose>
            </div>
          </DialogContent>
        </Dialog>

        <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-8">
          {/* Sidebar filters - desktop */}
          <div className="hidden lg:block space-y-6 sticky top-8 self-start">
            <Card className="bg-zinc-100 dark:bg-zinc-900/60 border-zinc-800 backdrop-blur-sm">
              <CardContent className="p-6 space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-3 flex items-center">
                    <Filter className="mr-2 h-5 w-5 text-red-400" />
                    Filters
                  </h3>
                  <Button
                    variant="link"
                    className="text-zinc-400 hover:text-red-400 p-0 h-auto text-sm"
                    onClick={resetFilters}
                  >
                    Reset All
                  </Button>
                </div>

                <Separator className="bg-zinc-800 dark:bg-slate-300" />

                <div>
                  <h3 className="text-lg font-semibold mb-3">Price Range</h3>
                  <div className="px-2">
                    <Slider
                      defaultValue={[0, 6000]}
                      max={6000}
                      step={100}
                      value={priceRange}
                      onValueChange={setPriceRange}
                      className="mb-6"
                    />
                    <div className="flex items-center justify-between ">
                      <span>{formatPrice(priceRange[0])}</span>
                      <span>{formatPrice(priceRange[1])}</span>
                    </div>
                  </div>
                </div>

                <Separator className="bg-zinc-800 dark:bg-slate-300" />

                <div>
                  <h3 className="text-lg font-semibold mb-3">Collection</h3>
                  <Select
                    value={activeFilters.collection}
                    onValueChange={(value) => setActiveFilters((prev) => ({ ...prev, collection: value }))}
                  >
                    <SelectTrigger className="w-full bg-zinc-200 dark:bg-zinc-800 border-zinc-700">
                      <SelectValue placeholder="Select Collection" />
                    </SelectTrigger>
                    <SelectContent className="bg-zinc-200 dark:bg-zinc-800 border-zinc-700">
                      {collections.map((collection) => (
                        <SelectItem key={collection} value={collection}>
                          {collection}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <Separator className="bg-zinc-800 dark:bg-slate-300" />

                <div>
                  <h3 className="text-lg font-semibold mb-3">Design</h3>
                  <Select
                    value={activeFilters.design}
                    onValueChange={(value) => setActiveFilters((prev) => ({ ...prev, design: value }))}
                  >
                    <SelectTrigger className="w-full bg-zinc-200 dark:bg-zinc-800 border-zinc-700">
                      <SelectValue placeholder="Select Design" />
                    </SelectTrigger>
                    <SelectContent className="bg-zinc-200 dark:bg-zinc-800 border-zinc-700">
                      {designs.map((design) => (
                        <SelectItem key={design} value={design}>
                          {design}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <Separator className="bg-zinc-800 dark:bg-slate-300" />

                <div>
                  <h3 className="text-lg font-semibold mb-3">Size</h3>
                  <div className="grid grid-cols-3 gap-2">
                    {sizes.map((size) => (
                      <Label
                        key={size}
                        className={`flex items-center justify-center p-2 border ${
                          activeFilters.sizes.includes(size)
                            ? "border-red-500 bg-red-500/10 text-red-300"
                            : "border-zinc-700 hover:border-zinc-500"
                        } rounded-md cursor-pointer transition-colors`}
                        onClick={() => toggleSizeFilter(size)}
                      >
                        {size}
                      </Label>
                    ))}
                  </div>
                </div>

                <Separator className="bg-zinc-800 dark:bg-slate-300" />

         
              </CardContent>
            </Card>
          </div>

          {/* Main content */}
          <div className="space-y-8">
            {/* Header */}
            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
              <div>
                <h2 className="text-3xl font-bold tracking-tight">
                  T-Shirts
                  <span className="ml-2 text-zinc-400 text-lg font-normal">
                    ({filteredProducts.length} products)
                  </span>
                </h2>
              </div>

              <div className="flex flex-wrap gap-3 w-full sm:w-auto">
                {/* Mobile filter button */}
                <Button 
                  variant="outline" 
                  className="lg:hidden flex-1 border-zinc-700 bg-zinc-800/50 hover:bg-zinc-800 text-zinc-300"
                  onClick={() => setMobileFiltersOpen(true)}
                >
                  <Filter className="mr-2 h-4 w-4" />
                  Filters
                </Button>

                {/* Sort dropdown */}
                <Select
                  value={activeFilters.sort}
                  onValueChange={(value) => setActiveFilters((prev) => ({ ...prev, sort: value }))}
                >
                  <SelectTrigger className="w-full sm:w-[180px] bg-zinc-200 dark:bg-zinc-800/50 border-zinc-700">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent className="dark:bg-zinc-800 bg-zinc-200 border-zinc-700">
                    {sortOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Active filters */}
            {(activeFilters.sizes.length > 0 ||
              activeFilters.colors.length > 0 ||
              activeFilters.collection !== "All Collections" ||
              activeFilters.design !== "All Designs" ||
              searchQuery) && (
              <div className="flex flex-wrap gap-2 items-center bg-zinc-900/30 p-3 rounded-lg backdrop-blur-sm">
                <span className="text-sm text-zinc-400">Active filters:</span>

                {searchQuery && (
                  <Badge variant="outline" className="flex items-center gap-1 bg-zinc-800 border-zinc-700">
                    Search: {searchQuery}
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-4 w-4 p-0 ml-1"
                      onClick={() => setSearchQuery("")}
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </Badge>
                )}

                {activeFilters.collection !== "All Collections" && (
                  <Badge variant="outline" className="flex items-center gap-1 bg-zinc-800 border-zinc-700">
                    {activeFilters.collection}
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-4 w-4 p-0 ml-1"
                      onClick={() => setActiveFilters((prev) => ({ ...prev, collection: "All Collections" }))}
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </Badge>
                )}

                {activeFilters.design !== "All Designs" && (
                  <Badge variant="outline" className="flex items-center gap-1 bg-zinc-800 border-zinc-700">
                    {activeFilters.design}
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-4 w-4 p-0 ml-1"
                      onClick={() => setActiveFilters((prev) => ({ ...prev, design: "All Designs" }))}
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </Badge>
                )}

                {activeFilters.sizes.map((size) => (
                  <Badge key={size} variant="outline" className="flex items-center gap-1 bg-zinc-800 border-zinc-700">
                    Size: {size}
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-4 w-4 p-0 ml-1"
                      onClick={() => toggleSizeFilter(size)}
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </Badge>
                ))}

                {activeFilters.colors.map((color) => (
                  <Badge key={color} variant="outline" className="flex items-center gap-1 bg-zinc-800 border-zinc-700">
                    Color: {color}
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-4 w-4 p-0 ml-1"
                      onClick={() => toggleColorFilter(color)}
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </Badge>
                ))}

                <Button
                  variant="link"
                  className="text-zinc-400 hover:text-red-400 p-0 h-auto text-sm"
                  onClick={resetFilters}
                >
                  Clear All
                </Button>
              </div>
            )}

            {/* View options */}
            <Tabs defaultValue="grid" className="w-full ">
              <div className="md:flex justify-end mb-4 hidden ">
                <TabsList className="bg-zinc-200 dark:bg-zinc-800/50 border border-zinc-700">
                  <TabsTrigger value="grid" className="">Grid</TabsTrigger>
                  <TabsTrigger value="list" className="">List</TabsTrigger>
                </TabsList>
              </div>

              {/* Grid view */}
              <TabsContent value="grid" className="mt-0">
                {filteredProducts.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-6">
                    {filteredProducts.map((product) => (
                      <Card 
                        key={product.id} 
                        className="group bg-zinc-200 dark:bg-zinc-900/40 border-zinc-800 overflow-hidden hover:border-red-500/50 transition-all duration-300"
                      >
                        <div className="relative overflow-hidden aspect-[3/4]">
                          {/* Product tags */}
                          <div className="absolute top-3 left-3 z-10 flex flex-col gap-2">
                            {product.tags?.includes("new") && (
                              <Badge className="bg-red-600 hover:bg-red-700 px-3 py-1">NEW</Badge>
                            )}
                            {product.tags?.includes("bestseller") && (
                              <Badge className="bg-amber-600 hover:bg-amber-700 px-3 py-1">BESTSELLER</Badge>
                            )}
                            {product.tags?.includes("limited") && (
                              <Badge className="bg-rose-600 hover:bg-rose-700 px-3 py-1">LIMITED</Badge>
                            )}
                          </div>

                          {/* Main image */}
                          <Image
                            src={product.images[0] || "/placeholder.svg?height=600&width=400"}
                            alt={product.name}
                            fill
                            className="object-contain transition-transform duration-700 ease-out group-hover:scale-110"
                          />

                          {/* Hover overlay */}
                          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center">
                            <div className="p-4 w-full">
                              <div className="flex gap-2 mb-2">
                                <Button
                                  variant="outline"
                                  size="sm"
                                  className="flex-1 bg-zinc-800/80 border-zinc-700 text-zinc-100 hover:bg-zinc-700 hover:text-white"
                                  onClick={() => setSelectedProduct(product)}
                                >
                                  Quick View
                                </Button>
                                <Button
                                  size="sm"
                                  className="flex-1 bg-red-600 hover:bg-red-700 text-white"
                                  asChild
                                >
                                  <Link href={`/categories/products/product-page`}>
                                    <ShoppingBag className="h-4 w-4 mr-2" />
                                    Shop
                                  </Link>
                                </Button>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Product info */}
                        <CardContent className="p-4">
                          <div className="space-y-1">
                            <h3 className="font-medium text-lg tracking-tight group-hover:text-red-400 transition-colors line-clamp-1">
                              {product.name}
                            </h3>
                            <p className="text-zinc-400 text-sm line-clamp-1">{product.collection}</p>
                            <p className="text-xl font-semibold mt-2">{formatPrice(product.price)}</p>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center py-16 text-center">
                    <div className="bg-zinc-200 dark:bg-zinc-900/60 p-8 rounded-lg max-w-md backdrop-blur-sm border border-zinc-800">
                      <h3 className="text-xl font-bold mb-2">No products found</h3>
                      <p className="text-zinc-400 mb-6">Try adjusting your filters to find what you&apos;re looking for.</p>
                      <Button onClick={resetFilters} className="bg-red-600 hover:bg-red-700">Reset Filters</Button>
                    </div>
                  </div>
                )}
              </TabsContent>

              {/* List view */}
              <TabsContent value="list" className="mt-0 hidden md:block">
                {filteredProducts.length > 0 ? (
                  <div className="space-y-4">
                    {filteredProducts.map((product) => (
                      <Card 
                        key={product.id} 
                        className="group bg-zinc-200 dark:bg-zinc-900/40 border-zinc-800 overflow-hidden hover:border-red-500/50 transition-all duration-300"
                      >
                        <div className="flex flex-col sm:flex-row">
                          <div className="relative w-full sm:w-[200px] h-[200px]">
                            {/* Product tags */}
                            <div className="absolute top-2 left-2 z-10 flex flex-col gap-1">
                              {product.tags?.includes("new") && (
                                <Badge className="bg-red-600 hover:bg-red-700">NEW</Badge>
                              )}
                              {product.tags?.includes("bestseller") && (
                                <Badge className="bg-amber-600 hover:bg-amber-700">BESTSELLER</Badge>
                              )}
                              {product.tags?.includes("limited") && (
                                <Badge className="bg-rose-600 hover:bg-rose-700">LIMITED</Badge>
                              )}
                            </div>

                            {/* Main image */}
                            <Image
                              src={product.images[0] || "/placeholder.svg?height=600&width=400"}
                              alt={product.name}
                              fill
                              className="object-cover"
                            />
                          </div>

                          <CardContent className="p-4 flex-1 flex flex-col justify-between">
                            <div>
                              <h3 className="font-medium text-lg tracking-tight group-hover:text-red-400 transition-colors">
                                {product.name}
                              </h3>
                              <p className="text-muted-foreground text-sm">{product.collection}</p>
                              <p className="text-muted-foreground mt-2">{product.description}</p>
                            </div>
                            
                            <div className="flex items-center justify-between mt-4">
                              <p className="text-xl font-semibold">{formatPrice(product.price)}</p>
                              <div className="flex gap-2">
                                <Button
                                  variant="outline"
                                  size="sm"
                                  className="bg-zinc-800 border-zinc-700 text-zinc-100 hover:bg-zinc-700 hover:text-white"
                                  onClick={() => setSelectedProduct(product)}
                                >
                                  Quick View
                                </Button>
                                <Button
                                  size="sm"
                                  className="bg-red-600 hover:bg-red-700"
                                  asChild
                                >
                                  <Link href={`/categories/products/product-page`}>
                                    <ShoppingBag className="h-4 w-4 mr-2" />
                                    Shop
                                  </Link>
                                </Button>
                              </div>
                            </div>
                          </CardContent>
                        </div>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center py-16 text-center">
                    <div className="bg-zinc-900/60 p-8 rounded-lg max-w-md backdrop-blur-sm border border-zinc-800">
                      <h3 className="text-xl font-bold mb-2">No products found</h3>
                      <p className="text-zinc-400 mb-6">Try adjusting your filters to find what you&apos;re looking for.</p>
                      <Button onClick={resetFilters} className="bg-red-600 hover:bg-red-700">Reset Filters</Button>
                    </div>
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>

      {/* Quick view dialog */}
      <Dialog open={!!selectedProduct} onOpenChange={() => setSelectedProduct(null)}>
        <DialogContent className="sm:max-w-[800px] bg-zinc-900 border-zinc-800 text-zinc-100">
          {selectedProduct && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="relative aspect-square overflow-hidden rounded-md">
                <Image
                  src={selectedProduct.images[0] || "/placeholder.svg?height=600&width=600"}
                  alt={selectedProduct.name}
                  fill
                  className="object-cover"
                />
                {/* Product tags */}
                <div className="absolute top-2 left-2 z-10 flex flex-col gap-1">
                  {selectedProduct.tags?.includes("new") && (
                    <Badge className="bg-red-600 hover:bg-red-700">NEW</Badge>
                  )}
                  {selectedProduct.tags?.includes("bestseller") && (
                    <Badge className="bg-amber-600 hover:bg-amber-700">BESTSELLER</Badge>
                  )}
                  {selectedProduct.tags?.includes("limited") && (
                    <Badge className="bg-rose-600 hover:bg-rose-700">LIMITED</Badge>
                  )}
                </div>
              </div>
              
              <div className="space-y-4">
                <div>
                  <h2 className="text-2xl font-bold">{selectedProduct.name}</h2>
                  <p className="text-zinc-400">{selectedProduct.collection}</p>
                </div>
                
                <div className="text-2xl font-bold">{formatPrice(selectedProduct.price)}</div>
                
                <p className="text-zinc-300">{selectedProduct.description}</p>
                
                <div>
                  <h3 className="font-medium mb-2">Size</h3>
                  <div className="flex flex-wrap gap-2">
                    {sizes.map((size) => (
                      <Label
                        key={size}
                        className="flex items-center justify-center p-2 border border-zinc-700 hover:border-zinc-500 rounded-md cursor-pointer transition-colors"
                      >
                        {size}
                      </Label>
                    ))}
                  </div>
                </div>
                
                <div className="pt-4">
                  <Button className="w-full bg-red-600 hover:bg-red-700" asChild>
                    <Link href={`/products/${selectedProduct.id}`}>
                      <ShoppingBag className="h-4 w-4 mr-2" />
                      Add to Cart
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
