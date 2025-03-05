import Link from "next/link"
import Image from "next/image"

export function Categories() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {/* T-Shirts Category */}
      <Link
        href="/categories/t-shirts"
        className="group relative overflow-hidden rounded-lg hover:shadow-lg transition-shadow"
      >
        <Image
          src="/category/shirt-category.png"
          alt="T-Shirts"
          width={400}
          height={400}
          className="w-full h-[300px] object-contain transition-transform group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-black/40 flex flex-col justify-end p-6">
          <h2 className="text-white text-2xl font-bold mb-2">T-Shirts</h2>
          <p className="text-white/90">Comfortable and stylish t-shirts for everyday wear</p>
        </div>
      </Link>

      {/* Hoodies Category */}
      <Link
        href="/categories/hoodies"
        className="group relative overflow-hidden rounded-lg hover:shadow-lg transition-shadow"
      >
        <Image
          src="/category/hoodie-category.png"
          alt="Hoodies"
          width={400}
          height={400}
          className="w-full h-[300px] object-contain transition-transform group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-black/40 flex flex-col justify-end p-6">
          <h2 className="text-white text-2xl font-bold mb-2">Hoodies</h2>
          <p className="text-white/90">Warm and cozy hoodies for the cold weather</p>
        </div>
      </Link>

      {/* Long Sleeves Category */}
      <Link
        href="/categories/longsleeves"
        className="group relative overflow-hidden rounded-lg hover:shadow-lg transition-shadow"
      >
        <Image
          src="/category/long-sleev.png"
          alt="Long Sleeves"
          width={400}
          height={400}
          className="w-full h-[300px] object-contain transition-transform group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-black/40 flex flex-col justify-end p-6">
          <h2 className="text-white text-2xl font-bold mb-2">Long Sleeves</h2>
          <p className="text-white/90">Stylish Long Sleeves for any occasion</p>
        </div>
      </Link>

      {/* Jeans Category */}
      <Link
        href="/categories/jeans"
        className="group relative overflow-hidden rounded-lg hover:shadow-lg transition-shadow"
      >
        <Image
          src="/category/jeans-category.png"
          alt="Jeans"
          width={400}
          height={400}
          className="w-full h-[300px] object-contain transition-transform group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-black/40 flex flex-col justify-end p-6">
          <h2 className="text-white text-2xl font-bold mb-2">Jeans</h2>
          <p className="text-white/90">Stylish Jeans for any occasion</p>
        </div>
      </Link>

      {/* Trousers Category */}
      <Link
        href="/categories/trousers"
        className="group relative overflow-hidden rounded-lg hover:shadow-lg transition-shadow"
      >
        <Image
          src="/category/trousers-category.png"
          alt="Trousers"
          width={400}
          height={400}
          className="w-full h-[300px] object-contain transition-transform group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-black/40 flex flex-col justify-end p-6">
          <h2 className="text-white text-2xl font-bold mb-2">Trousers</h2>
          <p className="text-white/90">Trousers for any occasion</p>
        </div>
      </Link>

      {/* Polo Category */}
      <Link
        href="/categories/polo"
        className="group relative overflow-hidden rounded-lg hover:shadow-lg transition-shadow"
      >
        <Image
          src="/category/polos-category.png"
          alt="Polo"
          width={400}
          height={400}
          className="w-full h-[300px] object-contain transition-transform group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-black/40 flex flex-col justify-end p-6">
          <h2 className="text-white text-2xl font-bold mb-2">Polo</h2>
          <p className="text-white/90">Stylish Polos for any occasion</p>
        </div>
      </Link>
    </div>
  )
}

