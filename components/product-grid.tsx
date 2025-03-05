"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { X, Filter } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Dialog } from "@/components/ui/dialog"
import { Slider } from "@/components/ui/slider"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { ScrollArea } from "./ui/scroll-area"

// Mock product data
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

// Filter options
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
const colors = ["Black", "White", "Red", "Grey", "Green", "Blue"]

export default function ProductGrid() {
  const [selectedProduct, setSelectedProduct] = useState<null | typeof products[0]>(null)
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)
  const [priceRange, setPriceRange] = useState([0, 6000])
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

  // Apply filters
  useEffect(() => {
    let result = [...products]

    // Filter by price range
    result = result.filter((product) => product.price >= priceRange[0] && product.price <= priceRange[1])

    // Filter by collection
    if (activeFilters.collection !== "All Collections") {
      result = result.filter((product) => product.collection === activeFilters.collection)
    }

    // Filter by design
    if (activeFilters.design !== "All Designs") {
      result = result.filter((product) => product.design === activeFilters.design)
    }

    // Filter by sizes (if any selected)
    if (activeFilters.sizes.length > 0) {
      // This is a mock filter since we don't have size data in our products
      // In a real app, you would filter by available sizes
    }

    // Filter by colors (if any selected)
    if (activeFilters.colors.length > 0) {
      // This is a mock filter since we don't have color data in our products
      // In a real app, you would filter by available colors
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
        // In a real app, you would sort by date
        break
      default:
        // Best selling - products with bestseller tag first
        result.sort((a, b) => {
          const aIsBestseller = a.tags?.includes("bestseller") ? 1 : 0
          const bIsBestseller = b.tags?.includes("bestseller") ? 1 : 0
          return bIsBestseller - aIsBestseller
        })
    }

    setFilteredProducts(result)
  }, [activeFilters, priceRange])

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
  }

  return (
    <div className="bg-black text-white min-h-screen">
      <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Mobile filter dialog */}
        <div
          className={`fixed inset-0 bg-black/90 z-50 transition-opacity duration-300 ${mobileFiltersOpen ? "opacity-100" : "opacity-0 pointer-events-none"}`}
        >
          <div className="h-full flex flex-col">
            <div className="flex items-center justify-between p-4 border-b border-gray-800">
              <h2 className="text-xl font-bold">Filters</h2>
              <Button variant="ghost" size="icon" onClick={() => setMobileFiltersOpen(false)}>
                <X className="h-6 w-6" />
              </Button>
            </div>
            <ScrollArea className="flex-1 p-4">
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

                <Separator className="bg-gray-800" />

                <div>
                  <h3 className="text-lg font-semibold mb-3">Collection</h3>
                  <Select
                    value={activeFilters.collection}
                    onValueChange={(value) => setActiveFilters((prev) => ({ ...prev, collection: value }))}
                  >
                    <SelectTrigger className="w-full bg-gray-900 border-gray-700">
                      <SelectValue placeholder="Select Collection" />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-900 border-gray-700">
                      {collections.map((collection) => (
                        <SelectItem key={collection} value={collection}>
                          {collection}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <Separator className="bg-gray-800" />

                <div>
                  <h3 className="text-lg font-semibold mb-3">Design</h3>
                  <Select
                    value={activeFilters.design}
                    onValueChange={(value) => setActiveFilters((prev) => ({ ...prev, design: value }))}
                  >
                    <SelectTrigger className="w-full bg-gray-900 border-gray-700">
                      <SelectValue placeholder="Select Design" />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-900 border-gray-700">
                      {designs.map((design) => (
                        <SelectItem key={design} value={design}>
                          {design}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <Separator className="bg-gray-800" />

                <div>
                  <h3 className="text-lg font-semibold mb-3">Size</h3>
                  <div className="grid grid-cols-3 gap-2">
                    {sizes.map((size) => (
                      <Label
                        key={size}
                        className={`flex items-center justify-center p-2 border ${
                          activeFilters.sizes.includes(size)
                            ? "border-white bg-white/10"
                            : "border-gray-700 hover:border-gray-500"
                        } rounded cursor-pointer transition-colors`}
                        onClick={() => toggleSizeFilter(size)}
                      >
                        {size}
                      </Label>
                    ))}
                  </div>
                </div>

                <Separator className="bg-gray-800" />

                <div>
                  <h3 className="text-lg font-semibold mb-3">Color</h3>
                  <div className="grid grid-cols-3 gap-2">
                    {colors.map((color) => (
                      <Label
                        key={color}
                        className={`flex items-center justify-center p-2 border ${
                          activeFilters.colors.includes(color)
                            ? "border-white bg-white/10"
                            : "border-gray-700 hover:border-gray-500"
                        } rounded cursor-pointer transition-colors`}
                        onClick={() => toggleColorFilter(color)}
                      >
                        {color}
                      </Label>
                    ))}
                  </div>
                </div>
              </div>
            </ScrollArea>
            <div className="p-4 border-t border-gray-800">
              <Button variant="outline" className="w-full" onClick={resetFilters}>
                Reset Filters
              </Button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-8">
          {/* Sidebar filters - desktop */}
          <div className="hidden lg:block space-y-8 sticky top-8 self-start">
            <div className="bg-gray-900 rounded-lg p-6 space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-3 flex items-center">
                  <Filter className="mr-2 h-5 w-5" />
                  Filters
                </h3>
                <Button
                  variant="link"
                  className="text-gray-400 hover:text-white p-0 h-auto text-sm"
                  onClick={resetFilters}
                >
                  Reset All
                </Button>
              </div>

              <Separator className="bg-gray-800" />

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

              <Separator className="bg-gray-800" />

              <div>
                <h3 className="text-lg font-semibold mb-3">Collection</h3>
                <Select
                  value={activeFilters.collection}
                  onValueChange={(value) => setActiveFilters((prev) => ({ ...prev, collection: value }))}
                >
                  <SelectTrigger className="w-full bg-gray-900 border-gray-700">
                    <SelectValue placeholder="Select Collection" />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-900 border-gray-700">
                    {collections.map((collection) => (
                      <SelectItem key={collection} value={collection}>
                        {collection}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <Separator className="bg-gray-800" />

              <div>
                <h3 className="text-lg font-semibold mb-3">Design</h3>
                <Select
                  value={activeFilters.design}
                  onValueChange={(value) => setActiveFilters((prev) => ({ ...prev, design: value }))}
                >
                  <SelectTrigger className="w-full bg-gray-900 border-gray-700">
                    <SelectValue placeholder="Select Design" />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-900 border-gray-700">
                    {designs.map((design) => (
                      <SelectItem key={design} value={design}>
                        {design}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <Separator className="bg-gray-800" />

              <div>
                <h3 className="text-lg font-semibold mb-3">Size</h3>
                <div className="grid grid-cols-3 gap-2">
                  {sizes.map((size) => (
                    <Label
                      key={size}
                      className={`flex items-center justify-center p-2 border ${
                        activeFilters.sizes.includes(size)
                          ? "border-white bg-white/10"
                          : "border-gray-700 hover:border-gray-500"
                      } rounded cursor-pointer transition-colors`}
                      onClick={() => toggleSizeFilter(size)}
                    >
                      {size}
                    </Label>
                  ))}
                </div>
              </div>

              <Separator className="bg-gray-800" />

              <div>
                <h3 className="text-lg font-semibold mb-3">Color</h3>
                <div className="grid grid-cols-3 gap-2">
                  {colors.map((color) => (
                    <Label
                      key={color}
                      className={`flex items-center justify-center p-2 border ${
                        activeFilters.colors.includes(color)
                          ? "border-white bg-white/10"
                          : "border-gray-700 hover:border-gray-500"
                      } rounded cursor-pointer transition-colors`}
                      onClick={() => toggleColorFilter(color)}
                    >
                      {color}
                    </Label>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Main content */}
          <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
              <div>
                <h1 className="text-4xl font-extrabold uppercase tracking-tighter">
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-pink-500">
                    T-Shirts
                  </span>
                </h1>
                <p className="text-gray-400 mt-1">{filteredProducts.length} products found</p>
              </div>

              <div className="flex flex-wrap gap-3 w-full sm:w-auto">
                {/* Mobile filter button */}
                <Button variant="outline" className="lg:hidden flex-1" onClick={() => setMobileFiltersOpen(true)}>
                  <Filter className="mr-2 h-4 w-4" />
                  Filters
                </Button>

                {/* Sort dropdown */}
                <Select
                  value={activeFilters.sort}
                  onValueChange={(value) => setActiveFilters((prev) => ({ ...prev, sort: value }))}
                >
                  <SelectTrigger className="w-full sm:w-[180px] bg-gray-900 border-gray-700">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-900 border-gray-700">
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
              activeFilters.design !== "All Designs") && (
              <div className="flex flex-wrap gap-2 items-center">
                <span className="text-sm text-gray-400">Active filters:</span>

                {activeFilters.collection !== "All Collections" && (
                  <Badge variant="outline" className="flex items-center gap-1 bg-gray-900">
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
                  <Badge variant="outline" className="flex items-center gap-1 bg-gray-900">
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
                  <Badge key={size} variant="outline" className="flex items-center gap-1 bg-gray-900">
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
                  <Badge key={color} variant="outline" className="flex items-center gap-1 bg-gray-900">
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
                  className="text-gray-400 hover:text-white p-0 h-auto text-sm"
                  onClick={resetFilters}
                >
                  Clear All
                </Button>
              </div>
            )}

            {/* Product grid */}
            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredProducts.map((product) => (
                  <div key={product.id} className="group relative">
                    <div className="relative overflow-hidden rounded-lg aspect-[3/4] bg-gray-900">
                      {/* Product tags */}
                      <div className="absolute top-2 left-2 z-10 flex flex-col gap-2">
                        {product.tags?.includes("new") && (
                          <Badge className="bg-purple-600 hover:bg-purple-700">NEW</Badge>
                        )}
                        {product.tags?.includes("bestseller") && (
                          <Badge className="bg-amber-600 hover:bg-amber-700">BESTSELLER</Badge>
                        )}
                        {product.tags?.includes("limited") && (
                          <Badge className="bg-red-600 hover:bg-red-700">LIMITED</Badge>
                        )}
                      </div>

                      {/* Main image */}
                      <Image
                        src={product.images[0] || "/placeholder.svg"}
                        alt={product.name}
                        fill
                        className="object-cover transition-transform duration-500 ease-out group-hover:scale-110"
                      />

                      {/* Hover overlay */}
                      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                        <div className="flex flex-col gap-3 p-4">
                          <Button
                            variant="outline"
                            className="border-white text-white hover:bg-white hover:text-black transition-colors"
                            onClick={() => setSelectedProduct(product)}
                          >
                            Quick View
                          </Button>
                          <Button asChild>
                            <Link href={`/products/${product.id}`} className="bg-white text-black hover:bg-gray-200">
                              View Details
                            </Link>
                          </Button>
                        </div>
                      </div>
                    </div>

                    {/* Product info */}
                    <div className="mt-4 space-y-1">
                      <h3 className="font-bold text-lg tracking-tight group-hover:text-purple-400 transition-colors">
                        {product.name}
                      </h3>
                      <p className="text-xl font-semibold">{formatPrice(product.price)}</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <div className="bg-gray-900 p-6 rounded-lg max-w-md">
                  <h3 className="text-xl font-bold mb-2">No products found</h3>
                  <p className="text-gray-400 mb-4">Try adjusting your filters to find what you're looking for.</p>
                  <Button onClick={resetFilters}>Reset Filters</Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Quick view dialog would go here */}
      <Dialog open={!!selectedProduct} onOpenChange={() => setSelectedProduct(null)}>
        {/* ProductQuickView component would be rendered here */}
      </Dialog>
    </div>
  )
}

