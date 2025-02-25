import { Categories } from '@/components/categories'
import React from 'react'

function page() {
  return (
    <main className="container mx-auto px-4 py-8">
    <h1 className="text-3xl font-bold mb-8">Featured Categories</h1>
    <Categories />
  </main>
  )
}

export default page