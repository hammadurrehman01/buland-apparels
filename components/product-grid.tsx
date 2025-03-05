"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import {Dialog,DialogTrigger,DialogContent,DialogHeader,DialogFooter,DialogTitle,DialogDescription,DialogClose,DialogOverlay,DialogPortal} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { ProductQuickView } from "../components/product-quickview"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select"

export function ProductGrid() {
  const [selectedProduct, setSelectedProduct] = useState<any>(null)

  return (
    <div className="space-y-6 mt-auto mx-auto max-w-screen-xl">
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <h1 className="text-4xl font-extrabold capitalize">t-shirts</h1>
        <div className="flex flex-wrap gap-4">
          <Select defaultValue="All Collections">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select Collection" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="All Collections">All Collections</SelectItem>
              <SelectItem value="Props Vol I">Props Vol I</SelectItem>
              <SelectItem value="Dystopia Collection">Dystopia Collection</SelectItem>
              <SelectItem value="Anime Collection">Anime Collection</SelectItem>
              <SelectItem value="Motorsport Collection">Motorsport Collection</SelectItem>
              <SelectItem value="Minimalist Collection">Minimalist Collection</SelectItem>
              <SelectItem value="Astro Attire Series">Astro Attire Series</SelectItem>
              <SelectItem value="Graphic StreetWear Collection">Graphic StreetWear Collection</SelectItem>
            </SelectContent>
          </Select>

          <Select defaultValue="All Designs">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select Design" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="All Designs">All Designs</SelectItem>
              <SelectItem value="Skin-Fit">Skin-Fit</SelectItem>
              <SelectItem value="Drop Shoulder Design">Drop Shoulder Design</SelectItem>
            </SelectContent>
          </Select>

          <Select defaultValue="Best Selling">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Best Selling">Best Selling</SelectItem>
              <SelectItem value="Price: Low to High">Price: Low to High</SelectItem>
              <SelectItem value="Price: High to Low">Price: High to Low</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {/* Product 1 */}
        <div className="relative group">
          <div className="relative overflow-hidden rounded-lg aspect-[3/4]">
            <Image
              src="/products/shirt-product-1.png"
              alt="Social Anxiety Tee-Dystopia Collection"
              fill
              className="object-contain transition-transform delay-300 duration-300 group-hover:scale-75"
            />
            <Image
              src="/products/shirt-product-1.png"
              alt="Social Anxiety Tee-Dystopia Collection"
              fill
              className="object-cover opacity-0 transition-opacity delay-300 duration-300 group-hover:opacity-100"
            />
            <div className="absolute inset-0 flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity bg-black/20">
              <Button 
                variant="secondary" 
                onClick={() => setSelectedProduct({
                  id: "1",
                  name: "Social Anxiety Tee-Dystopia Collection",
                  price: 1200,
                  images: ["/products/shirt-product-1.png", "/products/shirt-product-1.png", "/products/shirt-product-1.png"],
                  description: "A comfortable classic cotton t-shirt perfect for everyday wear.",
                  category: "t-shirts",
                  collection: "Dystopia Collection",
                  design: "Graphic Print",
                })}
              >
                Quick View
              </Button>
              <Button asChild>
                <Link href="/categories/products/product-page">View Product</Link>
              </Button>
            </div>
          </div>
          <div className="mt-4">
            <h3 className="font-semibold">Social Anxiety Tee-Dystopia Collection</h3>
            <p className="text-muted-foreground">$1200</p>
          </div>
        </div>

        {/* Product 2 */}
        <div className="relative group">
          <div className="relative overflow-hidden rounded-lg aspect-[3/4]">
            <Image
              src="/products/shirt-product-2.png"
              alt="Dreams Anxiety Tee-Dystopia Collection"
              fill
              className="object-contain transition-transform delay-300 duration-300 group-hover:scale-75"
            />
            <Image
              src="/products/shirt-product-2.png"
              alt="Dreams Anxiety Tee-Dystopia Collection"
              fill
              className="object-cover opacity-0 transition-opacity delay-300 duration-300 group-hover:opacity-100"
            />
            <div className="absolute inset-0 flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity bg-black/20">
              <Button 
                variant="secondary" 
                onClick={() => setSelectedProduct({
                  id: "2",
                  name: "Dreams Anxiety Tee-Dystopia Collection",
                  price: 1300,
                  images: ["/products/shirt-product-2.png", "/products/shirt-product-2.png", "/products/shirt-product-2.png"],
                  description: "A vintage-style graphic t-shirt with unique designs.",
                  category: "t-shirts",
                  collection: "Dystopia Collection",
                  design: "Graphic Print",
                })}
              >
                Quick View
              </Button>
              <Button asChild>
                <Link href="/categories/products/product-page">View Product</Link>
              </Button>
            </div>
          </div>
          <div className="mt-4">
            <h3 className="font-semibold">Dreams Anxiety Tee-Dystopia Collection</h3>
            <p className="text-muted-foreground">$1300</p>
          </div>
        </div>

        {/* Product 3 */}
        <div className="relative group">
          <div className="relative overflow-hidden rounded-lg aspect-[3/4]">
            <Image
              src="/products/shirt-product-3.png"
              alt="Hustle Habit Tee-Dystopia Collection"
              fill
              className="object-contain transition-transform delay-300 duration-300 group-hover:scale-75"
            />
            <Image
              src="/products/shirt-product-3.png"
              alt="Hustle Habit Tee-Dystopia Collection"
              fill
              className="object-cover opacity-0 transition-opacity delay-300 duration-300 group-hover:opacity-100"
            />
            <div className="absolute inset-0 flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity bg-black/20">
              <Button 
                variant="secondary" 
                onClick={() => setSelectedProduct({
                  id: "3",
                  name: "Hustle Habit Tee-Dystopia Collection",
                  price: 1300,
                  images: ["/products/shirt-product-3.png", "/products/shirt-product-3.png", "/products/shirt-product-3.png"],
                  description: "A vintage-style graphic t-shirt with unique designs.",
                  category: "t-shirts",
                  collection: "Dystopia Collection",
                  design: "Graphic Print",
                })}
              >
                Quick View
              </Button>
              <Button asChild>
                <Link href="/categories/products/product-page">View Product</Link>
              </Button>
            </div>
          </div>
          <div className="mt-4">
            <h3 className="font-semibold">Hustle Habit Tee-Dystopia Collection</h3>
            <p className="text-muted-foreground">$1300</p>
          </div>
        </div>

        {/* Product 4 */}
        <div className="relative group">
          <div className="relative overflow-hidden rounded-lg aspect-[3/4]">
            <Image
              src="/products/shirt-product-4.png"
              alt="Geospace Tee-Dystopia Collection"
              fill
              className="object-contain transition-transform delay-300 duration-300 group-hover:scale-75"
            />
            <Image
              src="/products/shirt-product-4.png"
              alt="Geospace Tee-Dystopia Collection"
              fill
              className="object-cover opacity-0 transition-opacity delay-300 duration-300 group-hover:opacity-100"
            />
            <div className="absolute inset-0 flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity bg-black/20">
              <Button 
                variant="secondary" 
                onClick={() => setSelectedProduct({
                  id: "4",
                  name: "Geospace Tee-Dystopia Collection",
                  price: 1300,
                  images: ["/products/shirt-product-4.png", "/products/shirt-product-4.png", "/products/shirt-product-4.png"],
                  description: "A vintage-style graphic t-shirt with unique designs.",
                  category: "t-shirts",
                  collection: "Dystopia Collection",
                  design: "Minimalist",
                })}
              >
                Quick View
              </Button>
              <Button asChild>
                <Link href="/categories/products/product-page">View Product</Link>
              </Button>
            </div>
          </div>
          <div className="mt-4">
            <h3 className="font-semibold">Geospace Tee-Dystopia Collection</h3>
            <p className="text-muted-foreground">$1300</p>
          </div>
        </div>

        {/* Product 5 */}
        <div className="relative group">
          <div className="relative overflow-hidden rounded-lg aspect-[3/4]">
            <Image
              src="/products/shirt-product-5.png"
              alt="Brave Tee-Dystopia Collection"
              fill
              className="object-contain transition-transform delay-300 duration-300 group-hover:scale-75"
            />
            <Image
              src="/products/shirt-product-5.png"
              alt="Brave Tee-Dystopia Collection"
              fill
              className="object-cover opacity-0 transition-opacity delay-300 duration-300 group-hover:opacity-100"
            />
            <div className="absolute inset-0 flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity bg-black/20">
              <Button 
                variant="secondary" 
                onClick={() => setSelectedProduct({
                  id: "5",
                  name: "Brave Tee-Dystopia Collection",
                  price: 1300,
                  images: ["/products/shirt-product-5.png", "/products/shirt-product-5.png", "/products/shirt-product-5.png"],
                  description: "A vintage-style graphic t-shirt with unique designs.",
                  category: "t-shirts",
                  collection: "Dystopia Collection",
                  design: "Minimalist",
                })}
              >
                Quick View
              </Button>
              <Button asChild>
                <Link href="/categories/products/product-page">View Product</Link>
              </Button>
            </div>
          </div>
          <div className="mt-4">
            <h3 className="font-semibold">Brave Tee-Dystopia Collection</h3>
            <p className="text-muted-foreground">$1300</p>
          </div>
        </div>

        {/* Product 6 */}
        <div className="relative group">
          <div className="relative overflow-hidden rounded-lg aspect-[3/4]">
            <Image
              src="/products/shirt-product-6.png"
              alt="Yakuza Tee-Dystopia Collection"
              fill
              className="object-contain transition-transform delay-300 duration-300 group-hover:scale-75"
            />
            <Image
              src="/products/shirt-product-6.png"
              alt="Yakuza Tee-Dystopia Collection"
              fill
              className="object-cover opacity-0 transition-opacity delay-300 duration-300 group-hover:opacity-100"
            />
            <div className="absolute inset-0 flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity bg-black/20">
              <Button 
                variant="secondary" 
                onClick={() => setSelectedProduct({
                  id: "6",
                  name: "Yakuza Tee-Dystopia Collection",
                  price: 1300,
                  images: ["/products/shirt-product-6.png", "/products/shirt-product-6.png", "/products/shirt-product-6.png"],
                  description: "A vintage-style graphic t-shirt with unique designs.",
                  category: "t-shirts",
                  collection: "Dystopia Collection",
                  design: "Minimalist",
                })}
              >
                Quick View
              </Button>
              <Button asChild>
                <Link href="/categories/products/product-page">View Product</Link>
              </Button>
            </div>
          </div>
          <div className="mt-4">
            <h3 className="font-semibold">Yakuza Tee-Dystopia Collection</h3>
            <p className="text-muted-foreground">$1300</p>
          </div>
        </div>

        {/* Product 7 */}
        <div className="relative group">
          <div className="relative overflow-hidden rounded-lg aspect-[3/4]">
            <Image
              src="/products/shirt-product-7.png"
              alt="Promise Tee-Dystopia Collection"
              fill
              className="object-contain transition-transform delay-300 duration-300 group-hover:scale-75"
            />
            <Image
              src="/products/shirt-product-7.png"
              alt="Promise Tee-Dystopia Collection"
              fill
              className="object-cover opacity-0 transition-opacity delay-300 duration-300 group-hover:opacity-100"
            />
            <div className="absolute inset-0 flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity bg-black/20">
              <Button 
                variant="secondary" 
                onClick={() => setSelectedProduct({
                  id: "7",
                  name: "Promise Tee-Dystopia Collection",
                  price: 1300,
                  images: ["/products/shirt-product-7.png", "/products/shirt-product-7.png", "/products/shirt-product-7.png"],
                  description: "A vintage-style graphic t-shirt with unique designs.",
                  category: "t-shirts",
                  collection: "Dystopia Collection",
                  design: "Minimalist",
                })}
              >
                Quick View
              </Button>
              <Button asChild>
                <Link href="/categories/products/product-page">View Product</Link>
              </Button>
            </div>
          </div>
          <div className="mt-4">
            <h3 className="font-semibold">Promise Tee-Dystopia Collection</h3>
            <p className="text-muted-foreground">$1300</p>
          </div>
        </div>

        {/* Hoodie Product */}
        <div className="relative group">
          <div className="relative overflow-hidden rounded-lg aspect-[3/4]">
            <Image
              src="/placeholder.svg"
              alt="Cozy Pullover Hoodie"
              fill
              className="object-contain transition-transform delay-300 duration-300 group-hover:scale-75"
            />
            <Image
              src="/placeholder.svg"
              alt="Cozy Pullover Hoodie"
              fill
              className="object-cover opacity-0 transition-opacity delay-300 duration-300 group-hover:opacity-100"
            />
            <div className="absolute inset-0 flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity bg-black/20">
              <Button 
                variant="secondary" 
                onClick={() => setSelectedProduct({
                  id: "8",
                  name: "Cozy Pullover Hoodie",
                  price: 59.99,
                  images: ["/placeholder.svg", "/placeholder.svg", "/placeholder.svg"],
                  description: "A warm and comfortable pullover hoodie for cold days.",
                  category: "hoodies",
                  collection: "Dystopia Collection",
                  design: "Minimalist",
                })}
              >
                Quick View
              </Button>
              <Button asChild>
                <Link href="/categories/products/product-page">View Product</Link>
              </Button>
            </div>
          </div>
          <div className="mt-4">
            <h3 className="font-semibold">Cozy Pullover Hoodie</h3>
            <p className="text-muted-foreground">$59.99</p>
          </div>
        </div>
      </div>

      <Dialog open={!!selectedProduct} onOpenChange={() => setSelectedProduct(null)}>
        {selectedProduct && <ProductQuickView product={selectedProduct} />}
      </Dialog>
    </div>
  )
}
