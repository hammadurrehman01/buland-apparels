import { ProductGrid } from "@/components/product-grid"

export default function CategoryPage({
  params,
}: {
  params: { category: string }
}) {
  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 capitalize">{params.category.replace("-", " ")}</h1>
      <ProductGrid category={params.category} />
    </main>
  )
}
