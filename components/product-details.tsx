"use client"

import Image from "next/image"
import { Button } from "@/components/ui/button"
import useEmblaCarousel from "embla-carousel-react"

const products = {
  "1": {
    id: "1",
    name: "Classic Cotton Tee",
    price: 29.99,
    images: ["/placeholder.svg", "/placeholder.svg", "/placeholder.svg"],
    description: "A comfortable classic cotton t-shirt perfect for everyday wear.",
    category: "t-shirts",
    details: ["100% Cotton", "Regular fit", "Crew neck", "Machine washable"],
  },
  "2": {
    id: "2",
    name: "Vintage Graphic Tee",
    price: 34.99,
    images: ["/placeholder.svg", "/placeholder.svg", "/placeholder.svg"],
    description: "A vintage-style graphic t-shirt with unique designs.",
    category: "t-shirts",
    details: ["100% Cotton", "Regular fit", "Crew neck", "Machine washable"],
  },
  "3": {
    id: "3",
    name: "Cozy Pullover Hoodie",
    price: 59.99,
    images: ["/placeholder.svg", "/placeholder.svg", "/placeholder.svg"],
    description: "A warm and comfortable pullover hoodie for cold days.",
    category: "hoodies",
    details: ["80% Cotton, 20% Polyester", "Regular fit", "Hood with drawstring", "Machine washable"],
  },
  "4": {
    id: "4",
    name: "Denim Jacket",
    price: 89.99,
    images: ["/placeholder.svg", "/placeholder.svg", "/placeholder.svg"],
    description: "A classic denim jacket that never goes out of style.",
    category: "longsleeves",
    details: ["100% Cotton Denim", "Regular fit", "Button closure", "Machine washable"],
  },
  "5": {
    id: "5",
    name: "trousers",
    price: 89.99,
    images: ["/placeholder.svg", "/placeholder.svg", "/placeholder.svg"],
    description: "A classic denim jacket that never goes out of style.",
    category: "trousers",
    details: ["100% Cotton Denim", "Regular fit", "Button closure", "Machine washable"],
  },
}

export function ProductDetails({ id }: { id: string }) {
  const [mainCarouselRef] = useEmblaCarousel()
  const [thumbCarouselRef] = useEmblaCarousel({
    containScroll: "keepSnaps",
    dragFree: true,
  })

  const product = products[id as keyof typeof products]

  return (
    <div className="grid gap-8 md:grid-cols-2">
      <div className="space-y-4">
        <div className="overflow-hidden rounded-lg" ref={mainCarouselRef}>
          <div className="flex">
            {product.images.map((image, index) => (
              <div key={index} className="relative flex-[0_0_100%] aspect-square">
                <Image
                  src={image || "/placeholder.svg"}
                  alt={`${product.name} - Image ${index + 1}`}
                  fill
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        </div>
        <div className="overflow-hidden" ref={thumbCarouselRef}>
          <div className="flex gap-2">
            {product.images.map((image, index) => (
              <div
                key={index}
                className="relative flex-[0_0_80px] aspect-square rounded-md overflow-hidden cursor-pointer"
              >
                <Image
                  src={image || "/placeholder.svg"}
                  alt={`${product.name} - Thumbnail ${index + 1}`}
                  fill
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">{product.name}</h1>
          <p className="text-2xl font-semibold mt-2">${product.price}</p>
        </div>
        <p className="text-muted-foreground">{product.description}</p>
        <div>
          <h2 className="font-semibold mb-2">Product Details</h2>
          <ul className="list-disc list-inside space-y-1 text-muted-foreground">
            {product.details.map((detail, index) => (
              <li key={index}>{detail}</li>
            ))}
          </ul>
        </div>
        <Button size="lg" className="w-full md:w-auto">
          Add to Cart
        </Button>
      </div>
    </div>
  )
}

