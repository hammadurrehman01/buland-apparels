"use client"

import useEmblaCarousel from "embla-carousel-react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { useCallback } from "react"
import { Button } from "@/components/ui/button"
import ProductCard from "./Product-Card"

export const products = [
  {
    id: 1,
    name: "Astro Attire Series",
    price: 29.99,
    images: ["/product-back.png", "/product-front.png"],
    colors: ["Black", "White", "Navy"],
    sizes: ["S", "M", "L", "XL"],
    description: "Premium cotton t-shirt with a comfortable fit and classic design.",
  },
  {
    id: 2,
    name: "Anime Collection",
    price: 59.99,
    images: ["/product-2.png", "/product-2-front.png"],
    colors: ["Blue", "Black", "Grey"],
    sizes: ["30", "32", "34", "36"],
    description: "Modern slim fit jeans with stretch comfort technology.",
  },
  {
    id: 3,
    name: " Attack on Titan-Collosal Titan-Anime Collection",
    price: 89.99,
    images: ["/product-3.png", "/product-3-front.png"],
    colors: ["White", "Black", "Red"],
    sizes: ["40", "41", "42", "43", "44"],
    description: "Lightweight athletic sneakers perfect for running and training.",
  },
  {
    id: 4,
    name: "Casual Hoodie",
    price: 49.99,
    images: ["/placeholder.svg?height=400&width=300", "/placeholder.svg?height=400&width=300"],
    colors: ["Grey", "Black", "Navy"],
    sizes: ["S", "M", "L", "XL"],
    description: "Cozy hoodie made from premium cotton blend material.",
  },
]

export default function FlashSale() {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    containScroll: "trimSnaps",
  })

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev()
  }, [emblaApi])

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext()
  }, [emblaApi])

  return (
    <section className="relative container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold">Flash Sale</h2>
          <p className="text-muted-foreground">Special deals for limited time</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="icon" onClick={scrollPrev}>
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon" onClick={scrollNext}>
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex gap-4">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  )
}

