import { notFound } from "next/navigation"
import { ProductDetails } from "@/components/product-details"

// This is your product data - in a real app, this would be in a database
const products = {
  "1": {
    id: "1",
    name: "Social Anxiety Tee-Dystopia Collection",
    price: 1200,
    images: ["/products/shirt-product-1.png", "/products/shirt-product-1.png", "/products/shirt-product-1.png"],
    description: "A comfortable classic cotton t-shirt perfect for everyday wear.",
    category: "t-shirts",
    details: ["100% Cotton", "Regular fit", "Crew neck", "Machine washable"],
  },
  "2": {
    id: "2",
    name: "Dreams Anxiety Tee-Dystopia Collection",
    price: 1300,
    images: ["/products/shirt-product-2.png", "/products/shirt-product-2.png", "/products/shirt-product-2.png"],
    description: "A vintage-style graphic t-shirt with unique designs.",
    category: "t-shirts",
    details: ["100% Cotton", "Regular fit", "Crew neck", "Machine washable"],
  },
  "3": {
    id: "3",
    name: "Hustle Habit Tee-Dystopia Collection",
    price: 1300,
    images: ["/products/shirt-product-3.png", "/products/shirt-product-3.png", "/products/shirt-product-3.png"],
    description: "A vintage-style graphic t-shirt with unique designs.",
    category: "t-shirts",
    details: ["100% Cotton", "Regular fit", "Crew neck", "Machine washable"],
  },
  "4": {
    id: "4",
    name: "Geospace Tee-Dystopia Collection",
    price: 1300,
    images: ["/products/shirt-product-4.png", "/products/shirt-product-4.png", "/products/shirt-product-4.png"],
    description: "A vintage-style graphic t-shirt with unique designs.",
    category: "t-shirts",
    details: ["100% Cotton", "Regular fit", "Crew neck", "Machine washable"],
  },
  "5": {
    id: "5",
    name: "Brave Tee-Dystopia Collection",
    price: 1300,
    images: ["/products/shirt-product-5.png", "/products/shirt-product-5.png", "/products/shirt-product-5.png"],
    description: "A vintage-style graphic t-shirt with unique designs.",
    category: "t-shirts",
    details: ["100% Cotton", "Regular fit", "Crew neck", "Machine washable"],
  },
  "6": {
    id: "6",
    name: "Yakuza Tee-Dystopia Collection",
    price: 1300,
    images: ["/products/shirt-product-6.png", "/products/shirt-product-6.png", "/products/shirt-product-6.png"],
    description: "A vintage-style graphic t-shirt with unique designs.",
    category: "t-shirts",
    details: ["100% Cotton", "Regular fit", "Crew neck", "Machine washable"],
  },
  "7": {
    id: "7",
    name: "Promise Tee-Dystopia Collection",
    price: 1300,
    images: ["/products/shirt-product-7.png", "/products/shirt-product-7.png", "/products/shirt-product-7.png"],
    description: "A vintage-style graphic t-shirt with unique designs.",
    category: "t-shirts",
    details: ["100% Cotton", "Regular fit", "Crew neck", "Machine washable"],
  },
  "8": {
    id: "8",
    name: "Cozy Pullover Hoodie",
    price: 59.99,
    images: ["/placeholder.svg", "/placeholder.svg", "/placeholder.svg"],
    description: "A warm and comfortable pullover hoodie for cold days.",
    category: "hoodies",
    details: ["80% Cotton, 20% Polyester", "Regular fit", "Hood with drawstring", "Machine washable"],
  },
  "9": {
    id: "9",
    name: "Denim Jacket",
    price: 89.99,
    images: ["/placeholder.svg", "/placeholder.svg", "/placeholder.svg"],
    description: "A classic denim jacket that never goes out of style.",
    category: "longsleeves",
    details: ["100% Cotton Denim", "Regular fit", "Button closure", "Machine washable"],
  },
  "10": {
    id: "10",
    name: "Trousers",
    price: 89.99,
    images: ["/placeholder.svg", "/placeholder.svg", "/placeholder.svg"],
    description: "A classic denim jacket that never goes out of style.",
    category: "trousers",
    details: ["100% Cotton Denim", "Regular fit", "Button closure", "Machine washable"],
  },
}

// Generate static params for all known products
export async function generateStaticParams() {
  return Object.keys(products).map((id) => ({
    id,
  }))
}

export default function ProductPage({
  params,
}: {
  params: { id: string }
}) {
  // Check if the product exists
  if (!products[params.id as keyof typeof products]) {
    notFound()
  }

  return (
    <main className="container mx-auto px-4 py-8">
      <ProductDetails id={params.id} />
    </main>
  )
}
