"use client"

import type React from "react"

import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { useState } from "react"
import { ChevronLeft, ChevronRight, Heart, ShoppingBag } from "lucide-react"

interface Product {
  id: string
  name: string
  description: string
  price: number
  images: string[]
  colors: string[]
  sizes: string[]
}

interface ProductModalProps {
  product: Product
}

const ProductModal: React.FC<ProductModalProps> = ({ product }) => {
  const router = useRouter()
  const [currentImage, setCurrentImage] = useState(0)
  const [selectedColor, setSelectedColor] = useState(product.colors[0] || "")
  const [selectedSize, setSelectedSize] = useState(product.sizes[0] || "")

  const nextImage = () => {
    setCurrentImage((prev) => (prev + 1) % product.images.length)
  }

  const previousImage = () => {
    setCurrentImage((prev) => (prev - 1 + product.images.length) % product.images.length)
  }

  return (
    <Dialog open onOpenChange={() => router.back()}>
      <DialogContent className="max-w-5xl p-0">
        <div className="flex flex-col md:flex-row max-h-[calc(100vh-4rem)] overflow-hidden">
          {/* Left Side - Image Gallery */}
          <div className="relative w-full md:w-[60%] bg-muted/30">
            {/* Main Image */}
            <div className="relative h-[60vh] md:h-[80vh] group">
              <Image
                src={product.images[currentImage] || "/placeholder.svg"}
                alt={product.name}
                fill
                className="object-contain"
                priority
              />

              {/* Navigation Arrows */}
              <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex justify-between px-4 opacity-0 group-hover:opacity-100 transition-opacity">
                <button
                  onClick={previousImage}
                  className="p-2 rounded-full bg-white/90 shadow-lg hover:bg-white transition-colors"
                  aria-label="Previous image"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={nextImage}
                  className="p-2 rounded-full bg-white/90 shadow-lg hover:bg-white transition-colors"
                  aria-label="Next image"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>

              {/* Image Indicators */}
              <div className="absolute bottom-4 inset-x-0 flex justify-center gap-1.5">
                {product.images.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImage(index)}
                    className={`w-1.5 h-1.5 rounded-full transition-all ${
                      currentImage === index ? "w-4 bg-white" : "bg-white/60 hover:bg-white/80"
                    }`}
                    aria-label={`Go to image ${index + 1}`}
                  />
                ))}
              </div>
            </div>

            {/* Thumbnails - Desktop Only */}
            <div className="hidden md:flex absolute bottom-0 inset-x-0 h-20 bg-gradient-to-t from-black/20 to-transparent">
              <div className="flex gap-2 items-end p-4 overflow-x-auto">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImage(index)}
                    className={`relative h-12 w-12 flex-shrink-0 rounded-lg overflow-hidden transition-all ${
                      currentImage === index ? "ring-2 ring-white" : "opacity-70 hover:opacity-100"
                    }`}
                  >
                    <Image
                      src={image || "/placeholder.svg"}
                      alt={`Product view ${index + 1}`}
                      fill
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Right Side - Product Details */}
          <div className="flex flex-col w-full md:w-[40%] bg-white">
            <div className="flex-1 overflow-y-auto">
              <div className="p-6 space-y-8">
                {/* Product Info */}
                <div className="space-y-4">
                  <div className="flex justify-between items-start gap-4">
                    <h2 className="text-2xl font-semibold tracking-tight">{product.name}</h2>
                    <button className="p-2 rounded-full hover:bg-muted transition-colors" aria-label="Add to wishlist">
                      <Heart className="w-5 h-5" />
                    </button>
                  </div>
                  <p className="text-3xl font-semibold text-primary">${product.price}</p>
                  <p className="text-muted-foreground leading-relaxed">{product.description}</p>
                </div>

                {/* Color Selection */}
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <Label className="text-base font-medium">Color</Label>
                    <span className="text-sm text-muted-foreground">{selectedColor}</span>
                  </div>
                  <RadioGroup value={selectedColor} onValueChange={setSelectedColor} className="grid grid-cols-3 gap-2">
                    {product.colors.map((color) => (
                      <div key={color} className="flex items-center">
                        <RadioGroupItem value={color} id={`color-${color}`} className="peer sr-only" />
                        <Label
                          htmlFor={`color-${color}`}
                          className="w-full py-3 text-center rounded-lg border-2 peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/5 hover:bg-muted cursor-pointer transition-all"
                        >
                          {color}
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
                </div>

                {/* Size Selection */}
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <Label className="text-base font-medium">Size</Label>
                    <Button variant="link" className="h-auto p-0">
                      Size Guide
                    </Button>
                  </div>
                  <RadioGroup value={selectedSize} onValueChange={setSelectedSize} className="grid grid-cols-4 gap-2">
                    {product.sizes.map((size) => (
                      <div key={size} className="flex items-center">
                        <RadioGroupItem value={size} id={`size-${size}`} className="peer sr-only" />
                        <Label
                          htmlFor={`size-${size}`}
                          className="w-full h-11 flex items-center justify-center rounded-lg border-2 peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/5 hover:bg-muted cursor-pointer transition-all"
                        >
                          {size}
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="p-6 border-t bg-white/80 backdrop-blur-sm">
              <div className="flex gap-3">
                <Button className="flex-1 h-12 text-base rounded-lg" onClick={() => console.log("Added to cart")}>
                  <ShoppingBag className="w-5 h-5 mr-2" />
                  Add to Cart
                </Button>
                <Button
                  className="flex-1 h-12 text-base rounded-lg"
                  variant="secondary"
                  onClick={() => console.log("Buy now")}
                >
                  Buy Now
                </Button>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default ProductModal

