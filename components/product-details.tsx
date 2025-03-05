"use client"

import Image from "next/image"
import { Button } from "@/components/ui/button"
import useEmblaCarousel from "embla-carousel-react"

export function ProductDetails() {
  const [mainCarouselRef] = useEmblaCarousel()
  const [thumbCarouselRef] = useEmblaCarousel({
    containScroll: "keepSnaps",
    dragFree: true,
  })

  return (
    <div className="grid gap-8 md:grid-cols-2">
      <div className="space-y-4">
        <div className="overflow-hidden rounded-lg" ref={mainCarouselRef}>
          <div className="flex">
            <div className="relative flex-[0_0_100%] aspect-square">
              <Image
                src="/products/shirt-product-1.png"
                alt="Social Anxiety Tee - Image 1"
                fill
                className="object-cover"
              />
            </div>
            <div className="relative flex-[0_0_100%] aspect-square">
              <Image
                src="/products/shirt-product-1.png"
                alt="Social Anxiety Tee - Image 2"
                fill
                className="object-cover"
              />
            </div>
            <div className="relative flex-[0_0_100%] aspect-square">
              <Image
                src="/products/shirt-product-1.png"
                alt="Social Anxiety Tee - Image 3"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
        <div className="overflow-hidden" ref={thumbCarouselRef}>
          <div className="flex gap-2">
            <div className="relative flex-[0_0_80px] aspect-square rounded-md overflow-hidden cursor-pointer">
              <Image
                src="/products/shirt-product-1.png"
                alt="Social Anxiety Tee - Thumbnail 1"
                fill
                className="object-cover"
              />
            </div>
            <div className="relative flex-[0_0_80px] aspect-square rounded-md overflow-hidden cursor-pointer">
              <Image
                src="/products/shirt-product-1.png"
                alt="Social Anxiety Tee - Thumbnail 2"
                fill
                className="object-cover"
              />
            </div>
            <div className="relative flex-[0_0_80px] aspect-square rounded-md overflow-hidden cursor-pointer">
              <Image
                src="/products/shirt-product-1.png"
                alt="Social Anxiety Tee - Thumbnail 3"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </div>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Social Anxiety Tee-Dystopia Collection</h1>
          <p className="text-2xl font-semibold mt-2">$1200</p>
        </div>
        <p className="text-muted-foreground">A comfortable classic cotton t-shirt perfect for everyday wear.</p>
        <div>
          <h2 className="font-semibold mb-2">Product Details</h2>
          <ul className="list-disc list-inside space-y-1 text-muted-foreground">
            <li>100% Cotton</li>
            <li>Regular fit</li>
            <li>Crew neck</li>
            <li>Machine washable</li>
          </ul>
        </div>
        <Button size="lg" className="w-full md:w-auto">
          Add to Cart
        </Button>
      </div>
    </div>
  )
}

