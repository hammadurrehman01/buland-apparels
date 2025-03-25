"use client"

import React, { useState, useEffect } from "react"
import Image from "next/image"
import { ArrowRight, ChevronLeft, ChevronRight, Truck, TrendingUp, Shield, BoxIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const collections = [
  {
    id: 1,
    name: "Dystopia Collection",
    description: "Bold designs for the modern rebel. Embrace the chaos with our edgy streetwear.",
    image: "/product-3.png",
  },
  {
    id: 2,
    name: "Props Vol 1 Collection",
    description: "Minimalist elegance with a contemporary twist. Redefine your style statement.",
    image: "/product-back.png",
  },
]

const features = [
  {
    icon: Truck,
    title: "Free Shipping",
    description: "On orders over $100",
  },
  {
    icon: Shield,
    title: "Secure Payment",
    description: "100% secure transactions",
  },
  {
    icon: BoxIcon,
    title: "Easy Returns",
    description: "30-day return policy",
  },
  {
    icon: TrendingUp,
    title: "Trending Styles",
    description: "Updated weekly",
  },
]

export default function BulandBanner() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)
  const [isHovering, setIsHovering] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  const nextSlide = () => {
    if (!isAnimating) {
      setIsAnimating(true)
      setCurrentSlide((prev) => (prev === collections.length - 1 ? 0 : prev + 1))
      setTimeout(() => {
        setIsAnimating(false)
      }, 800)
    }
  }

  const prevSlide = () => {
    if (!isAnimating) {
      setIsAnimating(true)
      setCurrentSlide((prev) => (prev === 0 ? collections.length - 1 : prev - 1))
      setTimeout(() => {
        setIsAnimating(false)
      }, 800)
    }
  }

  // Auto-advance slides
  useEffect(() => {
    const interval = setInterval(() => {
      if (!isHovering) {
        nextSlide()
      }
    }, 6000)
    return () => clearInterval(interval)
  }, [currentSlide, isHovering])

  return (
    <div className="mx-auto lg:max-w-screen-xl xl:max-w-screen-2xl  overflow-hidden">
      {/* Hero Banner Section */}
      <section className="relative">
        {/* Animated background elements */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <div className="animate-float-slow absolute -top-20 -left-20 w-40 h-40 rounded-full bg-red-800/10"></div>
          <div className="animate-float absolute top-40 -right-20 w-60 h-60 rounded-full bg-red-800/5"></div>
          <div className="animate-float-reverse absolute bottom-20 left-1/3 w-40 h-40 rounded-full bg-red-800/5"></div>
        </div>



        <div className="grid grid-cols-1 lg:grid-cols-2 my-5 relative z-10">
          {/* Text Content */}
          <div className="flex flex-col justify-center px-6 py-12 md:px-8 lg:px-12 xl:px-16 lg:py-24 z-20 order-2 lg:order-1 ">
            <div
              className={`inline-block w-auto text-center rounded-full bg-red-800/90 px-4 py-1.5 text-sm font-medium text-white mb-6 ${isLoaded ? "animate-bounce-in" : "opacity-0"}`}
            >
              New Collection
            </div>

            <h1
              className={`text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl mb-6  ${isLoaded ? "animate-reveal-text" : "opacity-0"}`}
            >
              {collections[currentSlide].name}
            </h1>

            <p
              className={`max-w-[600px] text-gray-600 md:text-xl mb-8 ${isLoaded ? "animate-fade-in-up animation-delay-300" : "opacity-0"}`}
            >
              {collections[currentSlide].description}
            </p>

            <div
              className={`flex flex-col sm:flex-row gap-4 ${isLoaded ? "animate-fade-in-up animation-delay-400" : "opacity-0"}`}
            >
              <Button
                size="lg"
                className="font-medium bg-red-800 hover:bg-red-900 text-white transition-all duration-300 hover:-translate-y-2 hover:shadow-lg group"
              >
                Shop Now <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="font-medium border-red-800 text-red-800 hover:bg-red-800/10 transition-all duration-300 hover:-translate-y-2 hover:shadow-lg"
              >
                Explore Collections
              </Button>
            </div>
          </div>

          {/* Image Carousel */}
          <div
            className={`relative h-[50vh] md:h-[60vh] lg:h-[80vh] my-8 overflow-hidden order-1 lg:order-2 border-8 border-white shadow-2xl ${isLoaded ? "animate-scale-in" : "opacity-0 scale-90"}`}
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
          >
            {collections.map((collection, index) => (
              <div
                key={collection.id}
                className={cn(
                  "absolute inset-0 transition-all duration-800",
                  currentSlide === index ? "opacity-100 z-10 animate-slide-in-right" : "opacity-0 z-0 translate-x-full",
                )}
              >
                <Image
                  src={collection.image || "/placeholder.svg"}
                  alt={collection.name}
                  fill
                  className={cn(
                    "object-cover object-center transition-transform duration-700",
                    isHovering ? "scale-105" : "scale-100",
                  )}
                  priority={index === 0}
                />
              </div>
            ))}

            {/* Animated decorative elements */}
            <div className="absolute top-0 left-0 w-24 h-24 border-t-4 border-l-4 border-white/70 z-20 m-6 animate-corner-expand"></div>
            <div className="absolute bottom-0 right-0 w-24 h-24 border-b-4 border-r-4 border-white/70 z-20 m-6 animate-corner-expand animation-delay-300"></div>

            {/* Animated shine effect */}
            <div className="absolute inset-0 z-10 pointer-events-none animate-shine opacity-30"></div>

            {/* Collection number indicator */}
            <div className="absolute top-6 right-6 z-20 bg-white/90 backdrop-blur-sm rounded-full h-16 w-16 flex items-center justify-center animate-spin-slow">
              <div className="text-center animate-counter-spin-slow">
                <span className="text-xl font-bold text-red-800">{currentSlide + 1}</span>
                <span className="text-xs block text-gray-600">/ {collections.length}</span>
              </div>
            </div>

            {/* Navigation Buttons */}
            <div className="absolute bottom-6 right-6 flex gap-2 z-20 animate-slide-in-up animation-delay-500">
              <Button
                variant="outline"
                size="icon"
                className="rounded-full bg-white/80 backdrop-blur-sm border-white/40 text-black hover:bg-white transition-all duration-300 hover:scale-110"
                onClick={prevSlide}
              >
                <ChevronLeft className="h-5 w-5" />
                <span className="sr-only">Previous slide</span>
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="rounded-full bg-white/80 backdrop-blur-sm border-white/40 text-black hover:bg-white transition-all duration-300 hover:scale-110"
                onClick={nextSlide}
              >
                <ChevronRight className="h-5 w-5" />
                <span className="sr-only">Next slide</span>
              </Button>
            </div>

            {/* Slide Indicators */}
            <div className="absolute bottom-6 left-6 flex gap-2 z-20 animate-slide-in-up animation-delay-500">
              {collections.map((_, index) => (
                <button
                  key={index}
                  className={cn(
                    "w-2 h-2 rounded-full transition-all duration-300",
                    currentSlide === index ? "bg-white w-6 animate-pulse-subtle" : "bg-white/50 hover:bg-white/70",
                  )}
                  onClick={() => {
                    if (!isAnimating) {
                      setIsAnimating(true)
                      setCurrentSlide(index)
                      setTimeout(() => {
                        setIsAnimating(false)
                      }, 800)
                    }
                  }}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="border-y  relative overflow-hidden">
        <div className="mx-auto max-w-screen-xl py-8 md:py-12 relative z-10">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((feature, index) => (
              <div
                key={index}
                className="flex items-center gap-4 group hover:-translate-y-2 transition-all duration-300 animate-slide-in-stagger p-4 rounded-lg "
                style={{ animationDelay: `${(index + 1) * 150}ms` }}
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-800/10 group-hover:bg-red-800/20 transition-all duration-300 group-hover:scale-110">
                  {feature.icon && React.createElement(feature.icon, { className: "h-6 w-6 text-red-800" })}
                </div>
                <div>
                  <h3 className="font-medium ">{feature.title}</h3>
                  <p className="text-sm text-gray-600">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Background animation for features section */}
        <div className="absolute inset-0 z-0">
          <div className="animate-float-slow absolute -bottom-20 -right-20 w-60 h-60 rounded-full bg-red-800/5"></div>
          <div className="animate-float-reverse absolute top-10 left-1/4 w-40 h-40 rounded-full bg-red-800/5"></div>
        </div>
      </section>
    </div>
  )
}

