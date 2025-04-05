"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { Button } from '@/components/ui/button'
import { ArrowUpRight } from 'lucide-react'
import Image from 'next/image'
import React from 'react'

function TrendingSection() {
    const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  })

  // Parallax effect values
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -100])
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -50])
  const y3 = useTransform(scrollYProgress, [0, 1], [0, -150])

  // Products data
  const trendingItems = [
    {
      id: 1,
      name: "DYSTOPIA OVERSIZED HOODIE",
      price: "$129.99",
      image: "/category/hoodie-category.png",
      position: "col-span-12 md:col-span-6 lg:col-span-4",
      delay: 0.1,
    },
    {
      id: 2,
      name: "PROPS VOL.1 CARGO PANTS",
      price: "$149.99",
      image: "/product-3.png",
      position: "col-span-12 md:col-span-6 lg:col-span-8",
      delay: 0.3,
    },
    {
      id: 3,
      name: "REBELLION TACTICAL VEST",
      price: "$189.99",
      image: "/products/shirt-product-6.png",
      position: "col-span-12 md:col-span-12 lg:col-span-6",
      delay: 0.5,
    },
    {
      id: 4,
      name: "ASTRO COMBAT BOOTS",
      price: "$219.99",
      image: "/products/shirt-product-5.png",
      position: "col-span-12 md:col-span-6 lg:col-span-6",
      delay: 0.7,
    },
  ]

  // Glitch effect for text
  const GlitchText: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = "" }) => {
    return (
      <div className={`relative inline-block ${className}`}>
        <span className="relative z-10">{children}</span>
        <span className="absolute top-0 left-0 z-0 text-red-500 opacity-70 transform translate-x-[1px] translate-y-[1px]">
          {children}
        </span>
        <span className="absolute top-0 left-0 z-0 text-cyan-500 opacity-70 transform -translate-x-[1px] -translate-y-[1px]">
          {children}
        </span>
      </div>
    )
  }
  return (
    <section ref={containerRef} className="py-20 md:py-32 bg-zinc-50 dark:bg-zinc-950 relative overflow-hidden mx-auto ">
    {/* Diagonal divider */}
    <div
      className="absolute top-0 left-0 w-full h-24 bg-zinc-200 dark:bg-zinc-900"
      style={{ clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 0)" }}
    />

    {/* Noise overlay */}
    <div
      className="absolute inset-0 opacity-5 mix-blend-overlay pointer-events-none"
      style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
      }}
    />

    <div className="container relative z-10 px-4 md:px-6">
      {/* Heading with glitch effect */}
      <div className="mb-16 md:mb-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative"
        >
          <div className="absolute -top-12 left-0 text-9xl font-black text-red-600 opacity-10 uppercase tracking-tighter">
            BULAND
          </div>
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-black uppercase tracking-tighter text-white">
            <GlitchText>Trending</GlitchText> <span className="text-red-600">Rebellion</span>
          </h2>
          <div className="h-1 w-32 bg-red-600 mt-4"></div>
        </motion.div>
      </div>

      {/* Asymmetrical grid layout */}
      <div className="grid grid-cols-12 gap-4 md:gap-6">
        {trendingItems.map((item, index) => (
          <motion.div
            key={item.id}
            className={`${item.position} group`}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.7,
              delay: item.delay,
              ease: [0.25, 0.1, 0.25, 1.0],
            }}
          >
            <motion.div
              className="relative h-full overflow-hidden"
              style={{
                y: index % 2 === 0 ? y1 : index % 3 === 0 ? y3 : y2,
                clipPath: "polygon(0 0, 100% 0, 100% 94%, 94% 100%, 0 100%)",
              }}
            >
              {/* Red static lines overlay */}
              <div
                className="absolute inset-0 z-10 opacity-20 pointer-events-none bg-repeat"
                style={{
                  backgroundImage:
                    "linear-gradient(0deg, transparent 24%, rgba(239, 68, 68, .3) 25%, rgba(239, 68, 68, .3) 26%, transparent 27%, transparent 74%, rgba(239, 68, 68, .3) 75%, rgba(239, 68, 68, .3) 76%, transparent 77%, transparent)",
                  backgroundSize: "50px 50px",
                  mixBlendMode: "overlay",
                }}
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-0 group-hover:opacity-80 transition-opacity duration-500" />

              <Image
                src={item.image || "/placeholder.svg"}
                alt={item.name}
                width={600}
                height={800}
                className="h-full w-full object-contain transition-all duration-700 
                  group-hover:scale-110 filter grayscale group-hover:grayscale-0"
              />

              <div className="absolute bottom-0 left-0 w-full p-4 md:p-6 transform translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                <div className="flex flex-col">
                  <h3 className="text-xl md:text-2xl font-bold text-white mb-2">{item.name}</h3>
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-bold text-red-500">{item.price}</span>
                    <Button
                      variant="outline"
                      size="sm"
                      className="rounded-none border-red-600 text-red-600 hover:bg-red-600 hover:text-white"
                    >
                      SHOP <ArrowUpRight className="ml-1 h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>

              {/* Red corner accent */}
              <div
                className="absolute bottom-0 right-0 w-12 h-12 bg-red-600"
                style={{ clipPath: "polygon(100% 0, 100% 100%, 0 100%)" }}
              />
            </motion.div>
          </motion.div>
        ))}
      </div>

      {/* CTA Section */}
      <motion.div
        className="mt-16 md:mt-24 text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.8 }}
      >
        <div className="inline-block relative">
          <Button
            size="lg"
            className="bg-red-600 hover:bg-red-700 text-white border-none rounded-none px-8 py-6 text-lg relative z-10"
          >
            EXPLORE THE DYSTOPIA
          </Button>
          <div className="absolute -bottom-2 -right-2 w-full h-full border-2 border-red-600"></div>
        </div>
      </motion.div>
    </div>

    {/* Diagonal divider at bottom */}
    <div
      className="absolute bottom-0 left-0 w-full h-24 bg-zinc-200 dark:bg-zinc-900"
      style={{ clipPath: "polygon(0 100%, 100% 0, 100% 100%, 0 100%)" }}
    />
  </section>  )
}

export default TrendingSection