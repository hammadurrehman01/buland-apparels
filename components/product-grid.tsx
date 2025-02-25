"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Dialog } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { ProductQuickView } from "../components/product-quickview"
import useEmblaCarousel from "embla-carousel-react"

const products = {
  "t-shirts": [
    {
      id: "1",
      name: "Classic Cotton Tee",
      price: 29.99,
      images: ["/placeholder.svg", "/placeholder.svg", "/placeholder.svg"],
      description: "A comfortable classic cotton t-shirt perfect for everyday wear.",
      category: "t-shirts",
    },
    {
      id: "2",
      name: "Vintage Graphic Tee",
      price: 34.99,
      images: ["/placeholder.svg", "/placeholder.svg", "/placeholder.svg"],
      description: "A vintage-style graphic t-shirt with unique designs.",
      category: "t-shirts",
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
    },
  ],
}

export function ProductGrid({ category }: { category: string }) {
  const [selectedProduct, setSelectedProduct] = useState<any>(null)
  const [emblaRef] = useEmblaCarousel({
    align: "start",
    containScroll: "trimSnaps",
  })

  return (
    <>
      <div className="relative overflow-hidden" ref={emblaRef}>
        <div className="flex gap-6">
          {products[category as keyof typeof products]?.map((product) => (
            <div key={product.id} className="relative flex-[0_0_280px] md:flex-[0_0_320px] group">
              <div className="relative overflow-hidden rounded-lg aspect-[3/4]">
                <Image
                  src={product.images[0] || "/placeholder.svg"}
                  alt={product.name}
                  fill
                  className="object-cover transition-transform group-hover:scale-110"
                />
                <Image
                  src={product.images[1] || "/placeholder.svg"}
                  alt={product.name}
                  fill
                  className="object-cover opacity-0 transition-opacity group-hover:opacity-100"
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
      </div>

      <Dialog open={!!selectedProduct} onOpenChange={() => setSelectedProduct(null)}>
        {selectedProduct && <ProductQuickView product={selectedProduct} />}
      </Dialog>
    </>
  )
}

