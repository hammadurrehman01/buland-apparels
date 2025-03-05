import Link from "next/link"
import Image from "next/image"
import { ArrowRight } from "lucide-react"

export function Categories() {
  return (
    <section className="w-full py-12 md:py-16  bg-white dark:bg-zinc-950 transition-colors duration-300">
    <div className="container px-4 md:px-6 mx-auto">
      {/* Section Header */}
      <div className="flex flex-col items-center mb-10 md:mb-16 text-center">
        <div className="inline-block px-3 py-1 mb-4 text-sm font-bold rounded-full bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300">
          COLLECTIONS
        </div>
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight text-zinc-900 dark:text-white mb-4">
          SHOP BY CATEGORY
        </h2>
        <div className="w-20 h-1 bg-red-500 mb-6"></div>
        <p className="text-zinc-600 dark:text-zinc-400 max-w-[600px] text-base md:text-lg">
          Explore our curated collection of premium streetwear essentials designed for those who live on the edge of
          fashion
        </p>
      </div>

      {/* Categories Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8">
        {/* T-Shirts Category */}
        <div className="group relative h-[400px] sm:h-[450px] overflow-hidden rounded-xl border border-zinc-200 dark:border-zinc-800 shadow-sm hover:shadow-xl transition-all duration-300">
          <div className="absolute inset-0 bg-zinc-100 dark:bg-zinc-900 z-0"></div>
          <Image
            src="/category/shirt-category.png"
            alt="T-Shirts Collection"
            width={300}
            height={350}
            className="absolute inset-0 w-full h-full object-contain transition-transform duration-700 ease-in-out group-hover:scale-110 z-10"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-900/90 via-zinc-900/40 to-transparent dark:from-black/90 dark:via-black/40 z-20"></div>
          <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-8 z-30">
            <div className="transform transition-transform duration-500 group-hover:translate-y-[-10px]">
              <span className="inline-block px-3 py-1 mb-3 text-xs font-medium rounded-full bg-red-500 text-white">
                POPULAR
              </span>
              <h3 className="text-white text-2xl md:text-3xl font-bold mb-2">T-SHIRTS</h3>
              <p className="text-zinc-300 mb-6 max-w-[90%] text-sm md:text-base">
                Statement pieces with bold graphics and premium cotton
              </p>
              <Link
                href="/categories/t-shirts"
                className="inline-flex items-center text-white bg-red-500 hover:bg-red-600 px-5 py-2.5 rounded-full font-medium transition-all duration-300"
              >
                <span>SHOP NOW</span>
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>

        {/* Hoodies Category */}
        <div className="group relative h-[400px] sm:h-[450px] overflow-hidden rounded-xl border border-zinc-200 dark:border-zinc-800 shadow-sm hover:shadow-xl transition-all duration-300">
          <div className="absolute inset-0 bg-zinc-100 dark:bg-zinc-900 z-0"></div>
          <Image
            src="/category/hoodie-category.png"
            alt="Hoodies Collection"
            width={400}
            height={450}
            className="absolute inset-0 w-full h-full object-contain transition-transform duration-700 ease-in-out group-hover:scale-110 z-10"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-900/90 via-zinc-900/40 to-transparent dark:from-black/90 dark:via-black/40 z-20"></div>
          <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-8 z-30">
            <div className="transform transition-transform duration-500 group-hover:translate-y-[-10px]">
              <span className="inline-block px-3 py-1 mb-3 text-xs font-medium rounded-full bg-red-500 text-white">
                TRENDING
              </span>
              <h3 className="text-white text-2xl md:text-3xl font-bold mb-2">HOODIES</h3>
              <p className="text-zinc-300 mb-6 max-w-[90%] text-sm md:text-base">
                Oversized fits with urban-inspired designs and premium comfort
              </p>
              <Link
                href="/categories/hoodies"
                className="inline-flex items-center text-white bg-red-500 hover:bg-red-600 px-5 py-2.5 rounded-full font-medium transition-all duration-300"
              >
                <span>SHOP NOW</span>
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>

        {/* Long Sleeves Category */}
        <div className="group relative h-[400px] sm:h-[450px] overflow-hidden rounded-xl border border-zinc-200 dark:border-zinc-800 shadow-sm hover:shadow-xl transition-all duration-300">
          <div className="absolute inset-0 bg-zinc-100 dark:bg-zinc-900 z-0"></div>
          <Image
            src="/category/long-sleev.png"
            alt="Long Sleeves Collection"
            width={400}
            height={450}
            className="absolute inset-0 w-full h-full object-contain transition-transform duration-700 ease-in-out group-hover:scale-110 z-10"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-900/90 via-zinc-900/40 to-transparent dark:from-black/90 dark:via-black/40 z-20"></div>
          <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-8 z-30">
            <div className="transform transition-transform duration-500 group-hover:translate-y-[-10px]">
              <span className="inline-block px-3 py-1 mb-3 text-xs font-medium rounded-full bg-red-500 text-white">
                NEW ARRIVALS
              </span>
              <h3 className="text-white text-2xl md:text-3xl font-bold mb-2">LONG SLEEVES</h3>
              <p className="text-zinc-300 mb-6 max-w-[90%] text-sm md:text-base">
                Versatile pieces with street-ready graphics and layering potential
              </p>
              <Link
                href="/categories/longsleeves"
                className="inline-flex items-center text-white bg-red-500 hover:bg-red-600 px-5 py-2.5 rounded-full font-medium transition-all duration-300"
              >
                <span>SHOP NOW</span>
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>

        {/* Jeans Category */}
        <div className="group relative h-[400px] sm:h-[450px] overflow-hidden rounded-xl border border-zinc-200 dark:border-zinc-800 shadow-sm hover:shadow-xl transition-all duration-300">
          <div className="absolute inset-0 bg-zinc-100 dark:bg-zinc-900 z-0"></div>
          <Image
            src="/category/jeans-category.png"
            alt="Jeans Collection"
            width={400}
            height={450}
            className="absolute inset-0 w-full h-full object-contain transition-transform duration-700 ease-in-out group-hover:scale-110 z-10"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-900/90 via-zinc-900/40 to-transparent dark:from-black/90 dark:via-black/40 z-20"></div>
          <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-8 z-30">
            <div className="transform transition-transform duration-500 group-hover:translate-y-[-10px]">
              <span className="inline-block px-3 py-1 mb-3 text-xs font-medium rounded-full bg-red-500 text-white">
                BESTSELLER
              </span>
              <h3 className="text-white text-2xl md:text-3xl font-bold mb-2">JEANS</h3>
              <p className="text-zinc-300 mb-6 max-w-[90%] text-sm md:text-base">
                Distressed details and perfect fits for the urban explorer
              </p>
              <Link
                href="/categories/jeans"
                className="inline-flex items-center text-white bg-red-500 hover:bg-red-600 px-5 py-2.5 rounded-full font-medium transition-all duration-300"
              >
                <span>SHOP NOW</span>
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>

        {/* Trousers Category */}
        <div className="group relative h-[400px] sm:h-[450px] overflow-hidden rounded-xl border border-zinc-200 dark:border-zinc-800 shadow-sm hover:shadow-xl transition-all duration-300">
          <div className="absolute inset-0 bg-zinc-100 dark:bg-zinc-900 z-0"></div>
          <Image
            src="/category/trousers-category.png"
            alt="Trousers Collection"
            width={400}
            height={450}
            className="absolute inset-0 w-full h-full object-contain transition-transform duration-700 ease-in-out group-hover:scale-110 z-10"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-900/90 via-zinc-900/40 to-transparent dark:from-black/90 dark:via-black/40 z-20"></div>
          <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-8 z-30">
            <div className="transform transition-transform duration-500 group-hover:translate-y-[-10px]">
              <span className="inline-block px-3 py-1 mb-3 text-xs font-medium rounded-full bg-red-500 text-white">
                PREMIUM
              </span>
              <h3 className="text-white text-2xl md:text-3xl font-bold mb-2">TROUSERS</h3>
              <p className="text-zinc-300 mb-6 max-w-[90%] text-sm md:text-base">
                Contemporary cuts with technical fabrics for modern street style
              </p>
              <Link
                href="/categories/trousers"
                className="inline-flex items-center text-white bg-red-500 hover:bg-red-600 px-5 py-2.5 rounded-full font-medium transition-all duration-300"
              >
                <span>SHOP NOW</span>
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>

        {/* Polo Category */}
        <div className="group relative h-[400px] sm:h-[450px] overflow-hidden rounded-xl border border-zinc-200 dark:border-zinc-800 shadow-sm hover:shadow-xl transition-all duration-300">
          <div className="absolute inset-0 bg-zinc-100 dark:bg-zinc-900 z-0"></div>
          <Image
            src="/category/polos-category.png"
            alt="Polo Collection"
            width={400}
            height={450}
            className="absolute inset-0 w-full h-full object-contain transition-transform duration-700 ease-in-out group-hover:scale-110 z-10"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-900/90 via-zinc-900/40 to-transparent dark:from-black/90 dark:via-black/40 z-20"></div>
          <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-8 z-30">
            <div className="transform transition-transform duration-500 group-hover:translate-y-[-10px]">
              <span className="inline-block px-3 py-1 mb-3 text-xs font-medium rounded-full bg-red-500 text-white">
                CLASSIC
              </span>
              <h3 className="text-white text-2xl md:text-3xl font-bold mb-2">POLO</h3>
              <p className="text-zinc-300 mb-6 max-w-[90%] text-sm md:text-base">
                Elevated basics with subtle branding and premium construction
              </p>
              <Link
                href="/categories/polo"
                className="inline-flex items-center text-white bg-red-500 hover:bg-red-600 px-5 py-2.5 rounded-full font-medium transition-all duration-300"
              >
                <span>SHOP NOW</span>
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* View All Categories Button */}
      <div className="flex justify-center mt-10 md:mt-16">
        <Link
          href="/categories"
          className="inline-flex items-center justify-center gap-2 px-8 py-3 text-base font-medium text-white bg-zinc-900 hover:bg-zinc-800 dark:bg-zinc-800 dark:hover:bg-zinc-700 rounded-full transition-colors duration-300"
        >
          <span>VIEW ALL CATEGORIES</span>
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </div>
  </section>

  )
}

