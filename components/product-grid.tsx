"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Dialog } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { ProductQuickView } from "../components/product-quickview"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select"

const products = {
  "t-shirts": [
    {
      id: "1",
      name: "Social Anxiety Tee-Dystopia Collection",
      price: 1200,
      images: ["/products/shirt-product-1.png", "/products/shirt-product-1.png", "/products/shirt-product-1.png"],
      description: "A comfortable classic cotton t-shirt perfect for everyday wear.",
      category: "t-shirts",
      collection: "Dystopia Collection",
      design: "Graphic Print",
    },
    {
      id: "2",
      name: "Dreams Anxiety Tee-Dystopia Collection",
      price: 1300,
      images: ["/products/shirt-product-2.png", "/products/shirt-product-2.png", "/products/shirt-product-2.png"],
      description: "A vintage-style graphic t-shirt with unique designs.",
      category: "t-shirts",
      collection: "Dystopia Collection",
      design: "Graphic Print",
    },
    {
      id: "3",
      name: "Hustle Habit Tee-Dystopia Collection",
      price: 1300,
      images: ["/products/shirt-product-3.png", "/products/shirt-product-3.png", "/products/shirt-product-3.png"],
      description: "A vintage-style graphic t-shirt with unique designs.",
      category: "t-shirts",
      collection: "Dystopia Collection",
      design: "Graphic Print",
    },
    {
      id: "4",
      name: "Geospace Tee-Dystopia Collection",
      price: 1300,
      images: ["/products/shirt-product-4.png", "/products/shirt-product-4.png", "/products/shirt-product-4.png"],
      description: "A vintage-style graphic t-shirt with unique designs.",
      category: "t-shirts",
      collection: "Dystopia Collection",
      design: "Minimalist",
    },
    {
      id: "5",
      name: "Brave Tee-Dystopia Collection",
      price: 1300,
      images: ["/products/shirt-product-5.png", "/products/shirt-product-5.png", "/products/shirt-product-5.png"],
      description: "A vintage-style graphic t-shirt with unique designs.",
      category: "t-shirts",
      collection: "Dystopia Collection",
      design: "Minimalist",
    },
    {
      id: "6",
      name: "Yakuza Tee-Dystopia Collection",
      price: 1300,
      images: ["/products/shirt-product-6.png", "/products/shirt-product-6.png", "/products/shirt-product-6.png"],
      description: "A vintage-style graphic t-shirt with unique designs.",
      category: "t-shirts",
      collection: "Dystopia Collection",
      design: "Minimalist",
    },
    {
      id: "7",
      name: "Promise Tee-Dystopia Collection",
      price: 1300,
      images: ["/products/shirt-product-7.png", "/products/shirt-product-7.png", "/products/shirt-product-7.png"],
      description: "A vintage-style graphic t-shirt with unique designs.",
      category: "t-shirts",
      collection: "Dystopia Collection",
      design: "Minimalist",
    },
  ],
  hoodies: [
    {
      id: "3",
      name: "Cozy Pullover Hoodie",
      price: 59.99,
      images: ["/placeholder.svg", "/placeholder.svg", "/placeholder.svg"],
      description: "A warm and comfortable pullover hoodie for cold days.",
      category: "hoodies",
      collection: "Dystopia Collection",
      design: "Minimalist",
    },
  ],
  longsleeves: [
    {
      id: "4",
      name: "Denim Jacket",
      price: 89.99,
      images: ["/placeholder.svg", "/placeholder.svg", "/placeholder.svg"],
      description: "A classic denim jacket that never goes out of style.",
      category: "longsleeves",
      collection: "Dystopia Collection",
      design: "Graphic Print",
    },
  ],
  trousers: [
    {
      id: "4",
      name: "Trousers",
      price: 89.99,
      images: ["/placeholder.svg", "/placeholder.svg", "/placeholder.svg"],
      description: "A classic denim jacket that never goes out of style.",
      category: "trousers",
      collection: "Dystopia Collection",
      design: "Vintage",
    },
  ],
}

const collections = ["All Collections", "Dystopia Collection", "Anime Collection", "Motorsport Collection"]
const designs = ["All Designs", "Graphic Print", "Vintage", "Minimalist"]
const sortOptions = ["Best Selling", "Price: Low to High", "Price: High to Low"]

export function ProductGrid({ category }: { category: string }) {
  const [selectedProduct, setSelectedProduct] = useState<any>(null)
  const [selectedCollection, setSelectedCollection] = useState("All Collections")
  const [selectedDesign, setSelectedDesign] = useState("All Designs")
  const [selectedSort, setSelectedSort] = useState("Best Selling")

  const filteredProducts = products[category as keyof typeof products]?.filter((product) => {
    if (selectedCollection !== "All Collections" && product.collection !== selectedCollection) return false
    if (selectedDesign !== "All Designs" && product.design !== selectedDesign) return false
    return true
  })

  const sortedProducts = [...(filteredProducts || [])].sort((a, b) => {
    if (selectedSort === "Price: Low to High") return a.price - b.price
    if (selectedSort === "Price: High to Low") return b.price - a.price
    return 0
  })

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <h1 className="text-3xl font-bold capitalize">{category}</h1>
        <div className="flex flex-wrap gap-4">
          <Select defaultValue={selectedCollection} onValueChange={setSelectedCollection}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select Collection" />
            </SelectTrigger>
            <SelectContent>
              {collections.map((collection) => (
                <SelectItem key={collection} value={collection}>
                  {collection}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select defaultValue={selectedDesign} onValueChange={setSelectedDesign}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select Design" />
            </SelectTrigger>
            <SelectContent>
              {designs.map((design) => (
                <SelectItem key={design} value={design}>
                  {design}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select defaultValue={selectedSort} onValueChange={setSelectedSort}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              {sortOptions.map((option) => (
                <SelectItem key={option} value={option}>
                  {option}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {sortedProducts?.map((product) => (
          <div key={product.id} className="relative group">
            <div className="relative overflow-hidden rounded-lg aspect-[3/4]">
              <Image
                src={product.images[0] || "/placeholder.svg"}
                alt={product.name}
                fill
                className="object-contain transition-transform delay-300 duration-300 group-hover:scale-75"
              />
              <Image
                src={product.images[1] || "/placeholder.svg"}
                alt={product.name}
                fill
                className="object-cover opacity-0 transition-opacity delay-300 duration-300 group-hover:opacity-100"
              />
              <div className="absolute inset-0 flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity bg-black/20">
                <Button variant="secondary" onClick={() => setSelectedProduct(product)}>
                  Quick View
                </Button>
                <Button asChild>
                  <Link href={`/products/${product.id}`}>View Product</Link>
                </Button>
              </div>
            </div>
            <div className="mt-4">
              <h3 className="font-semibold">{product.name}</h3>
              <p className="text-muted-foreground">${product.price}</p>
            </div>
          </div>
        ))}
      </div>

      <Dialog open={!!selectedProduct} onOpenChange={() => setSelectedProduct(null)}>
        {selectedProduct && <ProductQuickView product={selectedProduct} />}
      </Dialog>
    </div>
  )
}

