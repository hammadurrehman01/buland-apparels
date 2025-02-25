"use client"

import { Card, CardContent } from "@/components/ui/card"
import Image from "next/image"
import Link from "next/link"
import { useState } from "react"

interface Product {
  id: number
  name: string
  price: number
  images: string[]
  colors: string[]
  sizes: string[]
  description: string
}

export default function ProductCard({ product }: { product: Product }) {
  const [currentImage, setCurrentImage] = useState(0)

  return (
    <Link href={`/product/${product.id}`} className="group">
      <Card className="w-[300px] md:w-[400px] overflow-hidden">
        <CardContent className="p-0">
          <div
            className="relative h-[300px] md:h-[500px] w-full"
            onMouseEnter={() => setCurrentImage(1)}
            onMouseLeave={() => setCurrentImage(0)}
          >
            <Image
              src={product.images[currentImage] || "/placeholder.svg"}
              alt={product.name}
              fill
              className="object-cover transition-opacity duration-300"
            />
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
              <span className="text-white font-medium">Quick View</span>
            </div>
          </div>
          <div className="p-4">
            <h3 className="font-medium">{product.name}</h3>
            <p className="text-lg font-bold">${product.price}</p>
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}

