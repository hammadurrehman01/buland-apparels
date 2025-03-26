"use client"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

// Testimonial data
const testimonials = [
  {
    id: 1,
    name: "Alex Johnson",
    avatar: "/testimonial-1.jpg",
    rating: 5,
    text: "The Dystopia Collection from Buland is exactly what I've been looking for. The quality is exceptional and the designs are truly unique. I've received so many compliments on my t-shirts!",
    location: "New York, USA",
  },
  {
    id: 2,
    name: "Sarah Williams",
    avatar: "/testimonial-2.jpg",
    rating: 5,
    text: "I'm obsessed with the Props Vol 1 Collection. The minimalist designs with subtle details make these pieces perfect for both casual and semi-formal occasions. Buland has become my go-to brand.",
    location: "London, UK",
  },
  {
    id: 3,
    name: "Michael Chen",
    avatar: "/testimonial-3.jpg",
    rating: 5,
    text: "The fit and fabric quality of Buland's shirts are unmatched. I've tried many premium brands, but nothing compares to how comfortable and durable these are. Worth every penny!",
    location: "Toronto, Canada",
  },
  {
    id: 4,
    name: "Priya Sharma",
    avatar: "/testimonial-4.jpg",
    rating: 5,
    text: "Buland's Dystopia Collection perfectly captures the edgy streetwear aesthetic I love. The attention to detail in the designs is impressive, and the shirts hold up well after multiple washes.",
    location: "Mumbai, India",
  },
  {
    id: 5,
    name: "David Rodriguez",
    avatar: "/testimonial-5.jpg",
    rating: 4,
    text: "The unique designs from Buland always get me compliments. The Props Vol 1 shirts have become staples in my wardrobe. The only reason for 4 stars is I wish they had more color options!",
    location: "Barcelona, Spain",
  },
]

export default function TestimonialSlider() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)
  const sliderRef = useRef<HTMLDivElement>(null)
  const autoPlayRef = useRef<NodeJS.Timeout | null>(null)

  const nextSlide = () => {
    if (!isAnimating) {
      setIsAnimating(true)
      setActiveIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1))
      setTimeout(() => setIsAnimating(false), 500)
    }
  }

  const prevSlide = () => {
    if (!isAnimating) {
      setIsAnimating(true)
      setActiveIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1))
      setTimeout(() => setIsAnimating(false), 500)
    }
  }

  const goToSlide = (index: number) => {
    if (!isAnimating && index !== activeIndex) {
      setIsAnimating(true)
      setActiveIndex(index)
      setTimeout(() => setIsAnimating(false), 500)
    }
  }

  // Auto play functionality
  useEffect(() => {
    autoPlayRef.current = setInterval(() => {
      nextSlide()
    }, 5000)

    return () => {
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current)
      }
    }
  }, [activeIndex])

  // Pause auto play on hover
  const pauseAutoPlay = () => {
    if (autoPlayRef.current) {
      clearInterval(autoPlayRef.current)
    }
  }

  const resumeAutoPlay = () => {
    if (autoPlayRef.current) {
      clearInterval(autoPlayRef.current)
    }
    autoPlayRef.current = setInterval(() => {
      nextSlide()
    }, 5000)
  }

  return (
    <section className="py-16 md:py-24 bg-muted/30 overflow-hidden">
      <div className="container">
        <div className="flex flex-col items-center justify-center text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl animate-fade-in">
            What Our Customers Say
          </h2>
          <p className="mt-4 max-w-[700px] text-muted-foreground md:text-xl animate-fade-in animation-delay-200">
            Don't just take our word for it — hear from our satisfied customers
          </p>
        </div>

        {/* Testimonial Slider */}
        <div
          className="relative mx-auto max-w-4xl px-4"
          onMouseEnter={pauseAutoPlay}
          onMouseLeave={resumeAutoPlay}
          ref={sliderRef}
        >
          {/* Large quote icon */}
          <div className="absolute -top-10 -left-4 md:-left-10 opacity-10 z-0">
            <Quote className="h-24 w-24 text-red-800" strokeWidth={1} />
          </div>

          {/* Testimonial cards */}
          <div className="relative h-[400px] md:h-[320px] overflow-hidden rounded-xl dark:bg-zinc-950 bg-background  shadow-lg">
            {testimonials.map((testimonial, index) => (
              <div
                key={testimonial.id}
                className={cn(
                  "absolute inset-0 p-6 md:p-10 transition-all duration-500 flex flex-col",
                  activeIndex === index
                    ? "opacity-100 translate-x-0 z-10"
                    : index < activeIndex
                      ? "opacity-0 -translate-x-full z-0"
                      : "opacity-0 translate-x-full z-0",
                )}
              >
                <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
                  <div className="flex-shrink-0">
                    <div className="h-16 w-16 md:h-20 md:w-20 rounded-full overflow-hidden border-2 border-red-800/20">
                      <Image
                        src={testimonial.avatar || "/placeholder.svg"}
                        alt={testimonial.name}
                        width={100}
                        height={100}
                        className="h-full w-full object-cover"
                      />
                    </div>
                  </div>

                  <div className="flex flex-col">
                    <h3 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-zinc-50">{testimonial.name}</h3>
                    <p className="text-sm text-gray-500">{testimonial.location}</p>
                    <div className="flex items-center mt-1">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          className={cn(
                            "h-4 w-4",
                            i < testimonial.rating ? "fill-red-800 text-red-800" : "fill-gray-200 text-gray-200",
                          )}
                        />
                      ))}
                    </div>
                  </div>
                </div>

                <div className="mt-6 flex-grow flex items-center">
                  <p className="text-foreground text-lg md:text-xl italic leading-relaxed">"{testimonial.text}"</p>
                </div>

                <div className="mt-auto pt-4 flex justify-between items-center">
                  <p className="text-sm text-gray-500">Verified Purchase</p>
                  <p className="text-sm font-medium text-red-800">Buland Customer</p>
                </div>
              </div>
            ))}
          </div>

          {/* Navigation buttons */}
          <div className="absolute top-1/2 -translate-y-1/2 left-0 right-0 flex justify-between pointer-events-none px-2 md:-mx-12">
            <Button
              variant="outline"
              size="icon"
              className="rounded-full bg-white/80 backdrop-blur-sm border-white/40 text-black hover:bg-white transition-all duration-300 hover:scale-110 shadow-lg pointer-events-auto"
              onClick={prevSlide}
            >
              <ChevronLeft className="h-5 w-5" />
              <span className="sr-only">Previous testimonial</span>
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="rounded-full bg-white/80 backdrop-blur-sm border-white/40 text-black hover:bg-white transition-all duration-300 hover:scale-110 shadow-lg pointer-events-auto"
              onClick={nextSlide}
            >
              <ChevronRight className="h-5 w-5" />
              <span className="sr-only">Next testimonial</span>
            </Button>
          </div>

          {/* Indicators */}
          <div className="flex justify-center mt-6 gap-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                className={cn(
                  "w-2 h-2 rounded-full transition-all duration-300",
                  activeIndex === index ? "bg-red-800 w-8" : "bg-gray-300 hover:bg-gray-400",
                )}
                onClick={() => goToSlide(index)}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

