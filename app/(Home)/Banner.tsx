import React from 'react'
import { Carousel } from "@/components/carousel";
import { Button } from "@/components/ui/button";
import Image from "next/image";

function Banner() {
      const bannerSlides = [
        {
          image: "/banner-1.png",
          title: "Up to 10% off Voucher",
          description: "Shop now and save with our exclusive voucher",
        },
        {
          image: "/42d021a5b157b69718015745241c45da.jpg",
          title: "New Season Arrivals",
          description: "Check out our latest collection",
        },
        {
          image: "/banner-3.png",
          title: "Special Offers",
          description: "Limited time deals on selected items",
        },
      ]
  return (
    <div className="mx-auto max-w-screen-xl my-5">
    <Carousel className="rounded-lg">
      {bannerSlides.map((slide, index) => (
        <div key={index} className="relative aspect-[20/9] overflow-hidden rounded-lg">
          <Image
            src={slide.image || "/placeholder.svg"}
            alt={slide.title}
            fill
            className="object-cover"
            priority={index === 0}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent" />
          <div className="absolute inset-0 flex items-center p-8">
            <div className="text-white">
              <h1 className="text-4xl font-bold mb-4">{slide.title}</h1>
              <p className="mb-4">{slide.description}</p>
              <Button className="bg-white text-black hover:bg-white/90">Shop Now</Button>
            </div>
          </div>
        </div>
      ))}
    </Carousel>
</div>
  )
}

export default Banner