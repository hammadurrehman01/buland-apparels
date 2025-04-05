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
    name: "Usman Raza",
    avatar: "/testimonial-2.png",
    rating: 5,
    text: "Buland hoodies are next level! Super comfy and the prints don’t fade even after multiple washes. Definitely gonna buy more!",
    location: "Lahore, PK",
  },
  {
    id: 2,
    name: "Ayesha Malik",
    avatar: "/testimonial-2.png",
    rating: 5,
    text: "Ordered a couple of full-sleeve shirts, and I’m in love! The fabric is soft, and the fit is just perfect. Highly recommend!",
    location: "Karachi, PK",
  },
  {
    id: 3,
    name: "Hassan Javed",
    avatar: "/testimonial-2.png",
    rating: 5,
    text: "The quality of these t-shirts is 🔥. The prints are dope, and they don’t feel cheap at all. Best online purchase I’ve made in a while!",
    location: "Rawalpindi, PK",
  },
  {
    id: 4,
    name: "Zainab Shah",
    avatar: "/testimonial-2.png",
    rating: 5,
    text: "I was looking for some cool oversized hoodies, and Buland did not disappoint! Super cozy and stylish—love the designs!",
    location: "Faisalabad, PK",
  },
  {
    id: 5,
    name: "Ali Haider",
    avatar: "/testimonial-2.png",
    rating: 4,
    text: "Honestly, best streetwear brand in Pakistan. The fabric, the prints, the fit—everything is on point! Definitely coming back for more.",
    location: "Multan, PK",
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
      <div className="mx-auto max-w-screen-2xl">
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
                    <div className="h-12 w-12 md:h-16 md:w-16 rounded-full overflow-hidden border-2 border-red-800/20">
                      <Image
                        src={testimonial.avatar || "/placeholder.svg"}
                        alt={testimonial.name}
                        width={50}
                        height={50}
                        className="h-full w-full object-contain"
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
              className="rounded-full dark:bg-black/80 bg-white/80 backdrop-blur-sm border-white/40 text-black dark:text-white hover:bg-white transition-all duration-300 hover:scale-110 shadow-lg pointer-events-auto"
              onClick={prevSlide}
            >
              <ChevronLeft className="h-5 w-5" />
              <span className="sr-only">Previous testimonial</span>
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="rounded-full dark:bg-black/80 bg-white/80 backdrop-blur-sm border-white/40 text-black dark:text-white hover:bg-white transition-all duration-300 hover:scale-110 shadow-lg pointer-events-auto"
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

