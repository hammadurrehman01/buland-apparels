"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronRight, Slash } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function Manifesto() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [isHovering, setIsHovering] = useState(false)

  useEffect(() => {
    if (isHovering) return

    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % manifestoPoints.length)
    }, 4000)

    return () => clearInterval(interval)
  }, [isHovering])

  const manifestoPoints = [
    {
      number: "01",
      title: "DEFY CONFORMITY",
      description:
        "We create for those who refuse to blend in. Our designs are weapons against the mundane, tools for those who choose to stand apart.",
    },
    {
      number: "02",
      title: "EMBRACE DYSTOPIA",
      description:
        "In a world of chaos, we find beauty in the breakdown. Our collections draw inspiration from the collision of past rebellion and future collapse.",
    },
    {
      number: "03",
      title: "TECHNICAL REBELLION",
      description:
        "Function meets disruption. We engineer garments with purpose, designed for survival in both urban landscapes and digital wastelands.",
    },
    {
      number: "04",
      title: "CULTURAL INSURGENCE",
      description:
        "We don't follow culture—we infiltrate and reconstruct it. Each piece is a statement against the algorithm of mainstream fashion.",
    },
  ]

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.5 },
    },
  }

  const textRevealVariants = {
    hidden: { y: 100 },
    visible: {
      y: 0,
      transition: { duration: 0.8, ease: [0.25, 0.1, 0.25, 1.0] },
    },
    exit: {
      y: -100,
      opacity: 0,
      transition: { duration: 0.4, ease: [0.25, 0.1, 0.25, 1.0] },
    },
  }

  return (
    <section className="py-20 md:py-32 mx-auto max-w-screen-xl relative overflow-hidden">
      {/* Diagonal line pattern background */}
      <div className="absolute inset-0 opacity-10">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern
              id="diagonalLines"
              width="40"
              height="40"
              patternUnits="userSpaceOnUse"
              patternTransform="rotate(45)"
            >
              <line x1="0" y1="0" x2="0" y2="40" stroke="#ef4444" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#diagonalLines)" />
        </svg>
      </div>

      {/* Red vertical line */}
      <div className="absolute top-0 left-1/4 w-px h-full bg-red-600 opacity-30"></div>
      <div className="absolute top-0 right-1/4 w-px h-full bg-red-600 opacity-30"></div>

      <div className="container relative z-10 px-4 md:px-6">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12"
        >
          {/* Left column - Section title */}
          <motion.div className="md:col-span-4 lg:col-span-3" variants={itemVariants}>
            <div className="sticky top-20">
              <div className="flex items-center mb-4">
                <div className="h-px w-12 bg-red-600 mr-4"></div>
                <span className="text-red-600 uppercase text-sm tracking-widest">Our Ethos</span>
              </div>

              <h2 className="text-3xl md:text-4xl lg:text-5xl font-black uppercase tracking-tighter  mb-6">
                THE
                <br />
                <span className="text-red-600">BULAND</span>
                <br />
                MANIFESTO
              </h2>

              <p className="text-zinc-400 mb-8">
                Not just clothing—a statement against conformity. Each piece is engineered for those who refuse to be
                categorized.
              </p>

              <Button className="bg-transparent hover:bg-red-600 text-red-600 hover:text-zinc-50 border border-red-600 rounded-none px-6 py-2 transition-colors duration-300">
                OUR STORY <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </motion.div>

          {/* Right column - Manifesto points */}
          <motion.div className="md:col-span-8 lg:col-span-9" variants={itemVariants}>
            <div
              className="grid grid-cols-1 gap-1 relative"
              onMouseEnter={() => setIsHovering(true)}
              onMouseLeave={() => setIsHovering(false)}
            >
              {manifestoPoints.map((point, index) => (
                <motion.div
                  key={point.number}
                  className={`border-l-2 pl-6 py-6 transition-all duration-500 relative ${
                    activeIndex === index ? "border-red-600 bg-zinc-900/30" : "border-zinc-800 hover:border-zinc-600"
                  }`}
                  onClick={() => setActiveIndex(index)}
                  whileHover={{ x: 5 }}
                >
                  {/* Number indicator */}
                  <div className="absolute -left-3 top-6 w-6 h-6 flex items-center justify-center">
                    <div className={`w-4 h-4 ${activeIndex === index ? "bg-red-600" : "bg-zinc-800"}`}></div>
                  </div>

                  <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-6">
                    <span className="text-2xl font-bold text-zinc-700">{point.number}</span>
                    <h3 className="text-xl md:text-2xl font-bold ">{point.title}</h3>
                  </div>

                  {/* Description - only visible when active */}
                  <AnimatePresence mode="wait">
                    {activeIndex === index && (
                      <motion.div
                        key={`desc-${index}`}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        variants={textRevealVariants}
                        className="overflow-hidden"
                      >
                        <p className="mt-4 text-muted-foreground max-w-3xl">{point.description}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </div>

            {/* Stats/highlights */}
            <motion.div
              className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12 border-t border-zinc-800 pt-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.6 }}
            >
              <div className="text-center">
                <div className="inline-flex items-center justify-center">
                  <Slash className="h-5 w-5 text-red-600 mr-1" />
                  <span className="text-3xl font-bold ">4</span>
                </div>
                <p className="text-xs uppercase tracking-wider text-zinc-500 mt-2">Collections</p>
              </div>

              <div className="text-center">
                <div className="inline-flex items-center justify-center">
                  <Slash className="h-5 w-5 text-red-600 mr-1" />
                  <span className="text-3xl font-bold ">56</span>
                </div>
                <p className="text-xs uppercase tracking-wider text-zinc-500 mt-2">Unique Pieces</p>
              </div>

              <div className="text-center">
                <div className="inline-flex items-center justify-center">
                  <Slash className="h-5 w-5 text-red-600 mr-1" />
                  <span className="text-3xl font-bold ">12K</span>
                </div>
                <p className="text-xs uppercase tracking-wider text-zinc-500 mt-2">Rebels Outfitted</p>
              </div>

              <div className="text-center">
                <div className="inline-flex items-center justify-center">
                  <Slash className="h-5 w-5 text-red-600 mr-1" />
                  <span className="text-3xl font-bold ">3</span>
                </div>
                <p className="text-xs uppercase tracking-wider text-zinc-500 mt-2">Years Disrupting</p>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>

      {/* Bottom red accent line */}
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-red-600 to-transparent"></div>
    </section>
  )
}

