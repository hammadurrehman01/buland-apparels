"use client"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { ChevronLeft, ChevronRight, Clock, ShoppingBag, Heart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

// Product data
const products = [
  {
    id: 1,
    name: "Dystopia Graphic Tee",
    slug: "dystopia-graphic-tee",
    image: "/products/shirt-product-1.png",
    price: 49.99,
    salePrice: 39.99,
    discount: 20,
    collection: "Dystopia Collection",
    isNew: true,
    colors: ["Black", "White", "Gray"],
    sizes: ["S", "M", "L", "XL"],
  },
  {
    id: 2,
    name: "Minimalist Logo Shirt",
    slug: "minimalist-logo-shirt",
    image: "/products/shirt-product-2.png",
    price: 59.99,
    salePrice: 44.99,
    discount: 25,
    collection: "Props Vol 1",
    isNew: false,
    colors: ["White", "Black", "Navy"],
    sizes: ["S", "M", "L", "XL", "XXL"],
  },
  {
    id: 3,
    name: "Urban Chaos Tee",
    slug: "urban-chaos-tee",
    image: "/products/shirt-product-3.png",
    price: 45.99,
    salePrice: 36.79,
    discount: 20,
    collection: "Dystopia Collection",
    isNew: true,
    colors: ["Black", "Gray"],
    sizes: ["S", "M", "L", "XL"],
  },
  {
    id: 4,
    name: "Structured Collar Shirt",
    slug: "structured-collar-shirt",
    image: "/products/shirt-product-4.png",
    price: 69.99,
    salePrice: 48.99,
    discount: 30,
    collection: "Props Vol 1",
    isNew: false,
    colors: ["White", "Light Blue", "Black"],
    sizes: ["S", "M", "L", "XL"],
  },
  {
    id: 5,
    name: "Dystopia Oversized Tee",
    slug: "dystopia-oversized-tee",
    image: "/products/shirt-product-5.png",
    price: 54.99,
    salePrice: 43.99,
    discount: 20,
    collection: "Dystopia Collection",
    isNew: true,
    colors: ["Black", "White", "Beige"],
    sizes: ["S", "M", "L", "XL"],
  },
  {
    id: 6,
    name: "Minimal Stripe Shirt",
    slug: "minimal-stripe-shirt",
    image: "/products/shirt-product-6.png",
    price: 64.99,
    salePrice: 51.99,
    discount: 20,
    collection: "Props Vol 1",
    isNew: false,
    colors: ["White/Black", "Blue/White"],
    sizes: ["S", "M", "L", "XL"],
  },
]



export default function ProductSlider() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)
  const [hoveredProduct, setHoveredProduct] = useState<number | null>(null)
  const sliderRef = useRef<HTMLDivElement>(null)
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    // Set end date to 7 days from now, only once
    const endDate = new Date();
    endDate.setDate(endDate.getDate() + 7);

    const calculateTimeLeft = () => {
      const difference = endDate.getTime() - new Date().getTime();

      if (difference <= 0) {
        return { days: 0, hours: 0, minutes: 0, seconds: 0 };
      }

      return {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / (1000 * 60)) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    };

    setTimeLeft(calculateTimeLeft()); // Initial update

    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Calculate visible products based on screen size
  const getVisibleCount = () => {
    if (typeof window !== "undefined") {
      if (window.innerWidth < 640) return 1
      if (window.innerWidth < 1024) return 2
      return 3
    }
    return 3 // Default for SSR
  }

  const visibleCount = getVisibleCount()
  const maxIndex = products.length - visibleCount

  const nextSlide = () => {
    if (!isAnimating && currentIndex < maxIndex) {
      setIsAnimating(true)
      setCurrentIndex((prev) => prev + 1)
      setTimeout(() => setIsAnimating(false), 500)
    }
  }

  const prevSlide = () => {
    if (!isAnimating && currentIndex > 0) {
      setIsAnimating(true)
      setCurrentIndex((prev) => prev - 1)
      setTimeout(() => setIsAnimating(false), 500)
    }
  }

  return (
    <section className=" py-16 md:py-24 bg-muted/10 overflow-hidden">
      <div className="mx-auto max-w-screen-xl">
        <div className="flex flex-col md:flex-row items-center justify-between mb-10 gap-6">
          <div className="text-center md:text-left">
            <Badge variant="outline" className="mb-3 border-red-800 text-red-600 px-3 py-1">
              Limited Time Offer
            </Badge>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-2 animate-fade-in">
              Summer Sale <span className="text-red-800">Up to 30% Off</span>
            </h2>
            <p className="text-muted-foreground md:text-lg max-w-[600px] animate-fade-in animation-delay-200">
              Grab our hottest styles from Dystopia and Props Vol 1 collections before they're gone!
            </p>
          </div>

          {/* Countdown Timer */}
          <div className="bg-white dark:bg-zinc-950 rounded-xl shadow-lg p-4 animate-bounce-in">
            <div className="flex items-center gap-2 mb-2 text-red-600">
              <Clock className="h-5 w-5" />
              <p className="font-medium">Sale Ends In:</p>
            </div>
            <div className="flex gap-3 text-center">
              <div className="bg-gray-100 dark:bg-zinc-900 rounded-lg p-2 w-16">
                <div className="text-2xl font-bold">{timeLeft.days}</div>
                <div className="text-xs text-gray-500">Days</div>
              </div>
              <div className="bg-gray-100 dark:bg-zinc-900 rounded-lg p-2 w-16">
                <div className="text-2xl font-bold">{timeLeft.hours}</div>
                <div className="text-xs text-gray-500">Hours</div>
              </div>
              <div className="bg-gray-100 dark:bg-zinc-900 rounded-lg p-2 w-16">
                <div className="text-2xl font-bold">{timeLeft.minutes}</div>
                <div className="text-xs text-gray-500">Mins</div>
              </div>
              <div className="bg-gray-100 dark:bg-zinc-900 rounded-lg p-2 w-16">
                <div className="text-2xl font-bold animate-pulse-subtle">{timeLeft.seconds}</div>
                <div className="text-xs text-gray-500">Secs</div>
              </div>
            </div>
          </div>


        </div>

        {/* Product Slider */}
        <div className="relative">
          <div ref={sliderRef} className="overflow-hidden">
            <div
              className="flex transition-transform duration-500 ease-out"
              style={{ transform: `translateX(-${currentIndex * (100 / visibleCount)}%)` }}
            >
              {products.map((product) => (
                <div
                  key={product.id}
                  className="w-full sm:w-1/2 lg:w-1/3 flex-shrink-0 p-4"
                  onMouseEnter={() => setHoveredProduct(product.id)}
                  onMouseLeave={() => setHoveredProduct(null)}
                >
                  <Link href={`/products/${product.slug}`} className="block">
                    <div className="bg-zinc-100 dark:bg-zinc-950 rounded-xl shadow-sm overflow-hidden group transition-all duration-300 hover:shadow-md">
                      {/* Product Image */}
                      <div className="relative aspect-[4/5] overflow-hidden">
                        <Image
                          src={product.image || "/placeholder.svg"}
                          alt={product.name}
                          fill
                          className="object-contain transition-transform duration-700 group-hover:scale-105"
                        />

                        {/* Discount badge */}
                        {product.discount > 0 && (
                          <div className="absolute top-3 left-3 bg-red-800 text-white text-xs font-bold px-2 py-1 rounded">
                            -{product.discount}%
                          </div>
                        )}

                        {/* New badge */}
                        {product.isNew && (
                          <div className="absolute top-3 right-3 bg-black text-white text-xs font-bold px-2 py-1 rounded">
                            NEW
                          </div>
                        )}

                        {/* Quick actions */}
                        <div
                          className={cn(
                            "absolute bottom-0 left-0 right-0 bg-black/70 backdrop-blur-sm py-3 px-4 transition-transform duration-300",
                            hoveredProduct === product.id ? "translate-y-0" : "translate-y-full",
                          )}
                        >
                          <div className="flex justify-between items-center">
                            <Button size="sm" className="bg-white text-black hover:bg-gray-100 rounded-full">
                              <ShoppingBag className="h-4 w-4 mr-1" />
                              Add to Cart
                            </Button>
                            <Button
                              size="icon"
                              variant="ghost"
                              className="text-white hover:bg-white/20 rounded-full h-8 w-8"
                            >
                              <Heart className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </div>

                      {/* Product Info */}
                      <div className="p-4">
                        <div className="text-xs text-gray-500 mb-1">{product.collection}</div>
                        <h3 className="font-medium text-lg mb-1 line-clamp-1">{product.name}</h3>
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-red-800">${product.salePrice}</span>
                          <span className="text-gray-500 line-through text-sm">${product.price}</span>
                        </div>

                        {/* Color options */}
                        <div className="mt-3 flex items-center gap-1">
                          {product.colors.slice(0, 3).map((color, i) => (
                            <div
                              key={i}
                              className="w-3 h-3 rounded-full border border-gray-300"
                              style={{
                                backgroundColor:
                                  color.toLowerCase() === "black"
                                    ? "#000"
                                    : color.toLowerCase() === "white"
                                      ? "#fff"
                                      : color.toLowerCase() === "gray"
                                        ? "#888"
                                        : color.toLowerCase() === "navy"
                                          ? "#0a2463"
                                          : color.toLowerCase() === "beige"
                                            ? "#f5f5dc"
                                            : color.toLowerCase() === "light blue"
                                              ? "#add8e6"
                                              : color.includes("/")
                                                ? "linear-gradient(45deg, #000 50%, #fff 50%)"
                                                : "#ddd",
                              }}
                            />
                          ))}
                          {product.colors.length > 3 && (
                            <span className="text-xs text-gray-500">+{product.colors.length - 3}</span>
                          )}
                        </div>
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation buttons */}
          <Button
            variant="outline"
            size="icon"
            className={cn(
              "absolute top-1/2 -translate-y-1/2 -left-4 md:-left-6 rounded-full bg-white dark:bg-zinc-950 shadow-md z-10 transition-opacity duration-300",
              currentIndex === 0 ? "opacity-50 cursor-not-allowed" : "opacity-100",
            )}
            onClick={prevSlide}
            disabled={currentIndex === 0}
          >
            <ChevronLeft className="h-5 w-5" />
            <span className="sr-only">Previous products</span>
          </Button>
          <Button
            variant="outline"
            size="icon"
            className={cn(
              "absolute top-1/2 -translate-y-1/2 -right-4 md:-right-6 rounded-full bg-white dark:bg-zinc-950 shadow-md z-10 transition-opacity duration-300",
              currentIndex >= maxIndex ? "opacity-50 cursor-not-allowed" : "opacity-100",
            )}
            onClick={nextSlide}
            disabled={currentIndex >= maxIndex}
          >
            <ChevronRight className="h-5 w-5" />
            <span className="sr-only">Next products</span>
          </Button>
        </div>

     
      </div>
    </section>
  )
}

