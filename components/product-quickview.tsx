"use client"

import Image from "next/image"
import Link from "next/link"
import { DialogContent } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import useEmblaCarousel from "embla-carousel-react"

export function ProductQuickView({ product }: { product: any }) {
  const [emblaRef] = useEmblaCarousel()

  return (
    <DialogContent className="max-w-3xl">
      <div className="grid gap-6 md:grid-cols-2">
        <div className="overflow-hidden rounded-lg" ref={emblaRef}>
          <div className="flex">
            {product.images.map((image: string, index: number) => (
              <div key={index} className="relative flex-[0_0_100%] aspect-square ">
                <Image
                  src={image || "/placeholder.svg"}
                  alt={`${product.name} - Image ${index + 1}`}
                  fill
                  className="object-contain"
                />
              </div>
            ))}
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <h2 className="text-2xl font-bold">{product.name}</h2>
          <p className="text-xl font-semibold">${product.price}</p>
          <p className="text-muted-foreground">{product.description}</p>
          <Button asChild className="mt-auto">
            <Link href={`/products/${product.name.toLowerCase().replace(/\s+/g, '-')}`}>View Full Details</Link>
          </Button>
        </div>
      </div>
    </DialogContent>
  )
}

