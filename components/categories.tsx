import Link from "next/link"
import Image from "next/image"

const categories = [
  {
    id: "t-shirts",
    name: "T-Shirts",
    image: "/category/shirt-category.png",
    description: "Comfortable and stylish t-shirts for everyday wear",
  },
  {
    id: "hoodies",
    name: "Hoodies",
    image: "/category/hoodie-category.png",
    description: "Warm and cozy hoodies for the cold weather",
  },
  {
    id: "longsleeves",
    name: "Long Sleeves",
    image: "/category/long-sleev.png",
    description: "Stylish Long Sleeves for any occasion",
  },
  {
    id: "jeans",
    name: "Jeans",
    image: "/category/jeans-category.png",
    description: "Stylish Jeans for any occasion",
  },
  {
    id: "trousers",
    name: "Trousers",
    image: "/category/trousers-category.png",
    description: "Trousers for any occasion",
  },
  {
    id: "polo",
    name: "Polo",
    image: "/category/polos-category.png",
    description: "Stylish Polos for any occasion",
  },
]

export function Categories() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {categories.map((category) => (
        <Link
          key={category.id}
          href={`/categories/${category.id}`}
          className="group relative overflow-hidden rounded-lg hover:shadow-lg transition-shadow"
        >
          <Image
            src={category.image || "/placeholder.svg"}
            alt={category.name}
            width={400}
            height={400}
            className="w-full h-[300px] object-contain transition-transform group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-black/40 flex flex-col justify-end p-6">
            <h2 className="text-white text-2xl font-bold mb-2">{category.name}</h2>
            <p className="text-white/90">{category.description}</p>
          </div>
        </Link>
      ))}
    </div>
  )
}

