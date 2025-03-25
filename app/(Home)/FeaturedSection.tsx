import Image from "next/image"
import Link from "next/link"
import { ChevronRight } from "lucide-react"

export default function FeaturedSection() {
  return (
    <section className="py-16 md:py-24 mx-auto max-w-screen-2xl">
      <div className=" px-4 md:px-6">
        <div className="flex flex-col items-center justify-center text-center mb-12">
          <h2 className="text-3xl font-extrabold tracking-tighter sm:text-4xl md:text-5xl text-red-600">DEFY CONFORMITY</h2>
          <p className="mt-4 max-w-[700px] text-gray-400 md:text-xl">
            Explore Buland's boundary-pushing collections designed for those who dare to stand out
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <div className="group relative overflow-hidden rounded-lg border-2 border-red-800 ">
            <div className="absolute top-0 right-0 z-10 bg-red-600 px-3 py-1 text-xs font-bold text-white">
              NEW DROP
            </div>
            <Image
              src="/products/shirt-product-2.png"
              alt="Dystopia Vol. 1"
              width={400}
              height={600}
              className="h-[400px] w-full object-contain transition-all duration-300 group-hover:scale-105 group-hover:brightness-50 filter grayscale group-hover:grayscale-0"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-90" />
            <div className="absolute bottom-0 left-0 w-full p-6">
              <h3 className="text-2xl font-bold text-white">
                PROPS <span className="text-red-600">VOL I</span>
              </h3>
              <p className="mt-1 text-sm text-gray-300 mb-3">Post-apocalyptic streetwear for the modern rebel</p>
              <Link
                href="#"
                className="mt-2 inline-flex items-center text-sm font-medium text-red-600 hover:text-red-400 transition-colors"
              >
                View Product <ChevronRight className="ml-1 h-4 w-4" />
              </Link>
            </div>
          </div>

          <div className="group relative overflow-hidden rounded-lg border-2 border-red-800">
            <div className="absolute top-0 right-0 z-10 bg-red-600 px-3 py-1 text-xs font-bold text-white">
              TRENDING
            </div>
            <Image
              src="/products/shirt-product-5.png"
              alt="Urban Rebellion"
              width={400}
              height={600}
              className="h-[400px] w-full object-contain transition-all duration-300 group-hover:scale-105 group-hover:brightness-50 filter grayscale group-hover:grayscale-0"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-90" />
            <div className="absolute bottom-0 left-0 w-full p-6">
              <h3 className="text-2xl font-bold text-white">
                DYSTOPIA <span className="text-red-600">COLLECTION</span>
              </h3>
              <p className="mt-1 text-sm text-gray-300 mb-3">Disruptive silhouettes that challenge the status quo</p>
              <Link
                href="#"
                className="mt-2 inline-flex items-center text-sm font-medium text-red-600 hover:text-red-400 transition-colors"
              >
                View Product <ChevronRight className="ml-1 h-4 w-4" />
              </Link>
            </div>
          </div>

          <div className="group relative overflow-hidden rounded-lg border-2 border-red-800">
            <Image
              src="/products/shirt-product-3.png"
              alt="Tactical Accessories"
              width={400}
              height={600}
              className="h-[400px] w-full object-contain transition-all duration-300 group-hover:scale-105 group-hover:brightness-50 filter grayscale group-hover:grayscale-0"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-90" />
            <div className="absolute bottom-0 left-0 w-full p-6">
              <h3 className="text-2xl font-bold text-white">
                ASTRO <span className="text-red-600">ATTIRE</span>
              </h3>
              <p className="mt-1 text-sm text-gray-300 mb-3">Utilitarian accessories for the digital wasteland</p>
              <Link
                href="#"
                className="mt-2 inline-flex items-center text-sm font-medium text-red-600 hover:text-red-400 transition-colors"
              >
                View Product <ChevronRight className="ml-1 h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-12 text-center">
          <Link
            href="#"
            className="inline-flex items-center justify-center px-8 py-3 text-base font-medium  bg-red-700 border border-transparent hover:bg-red-800 transition-colors duration-300 rounded-lg text-zinc-100"
          >
            EXPLORE ALL COLLECTIONS
          </Link>
        </div>
      </div>
    </section>
  )
}

