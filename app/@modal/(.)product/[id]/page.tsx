import ProductModal from "../../../(Home)/Product-Modal"
import { products } from "../../../(Home)/Flash-Sale"

export default function InterceptedProductModal({ params }: { params: { id: string } }) {
  const product = products.find((p) => p.id === Number.parseInt(params.id))

  if (!product) {
    return null
  }

  return <ProductModal product={product} />
}