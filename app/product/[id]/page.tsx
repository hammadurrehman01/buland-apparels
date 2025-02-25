"use client"
import ProductModal from "../../(Home)/Product-Modal"
import { products } from "../../(Home)/Flash-Sale"

export default function ProductPage({ params }: { params: { id: string } }) {
  const product = products.find((p) => p.id === Number.parseInt(params.id))

  if (!product) {
    return <div>Product not found</div>
  }

  return <ProductModal product={product} />
}

