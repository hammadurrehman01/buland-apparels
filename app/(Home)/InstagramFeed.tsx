"use client"

import { useState } from "react"
import Image from "next/image"
import { Heart, MessageCircle, Instagram, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import Link from "next/link"

// Instagram post data
const instagramPosts = [
  {
    id: 1,
    image: "/product-3.png",
    likes: 342,
    comments: 18,
    caption: "Our new Dystopia Collection dropping this weekend. #BulandStyle #DystopiaCollection",
    type: "outfit",
  },
  {
    id: 2,
    image: "/category/hoodie-category.png",
    likes: 289,
    comments: 24,
    caption: "Minimalist elegance from our Props Vol 1 Collection. #BulandStyle #PropsVol1",
    type: "product",
  },
  {
    id: 3,
    image: "/motorsport-1.png",
    likes: 512,
    comments: 36,
    caption: "Behind the scenes at our latest photoshoot. #BulandStyle #BehindTheScenes",
    type: "lifestyle",
  },
  {
    id: 4,
    image: "/motorsport-2.png",
    likes: 423,
    comments: 29,
    caption: "Street style inspiration featuring our Dystopia tee. #BulandStyle #StreetStyle",
    type: "outfit",
  },
  {
    id: 5,
    image: "/products/shirt-product-7.png",
    likes: 376,
    comments: 21,
    caption: "Details matter. Close-up of our premium stitching. #BulandStyle #QualityCraftsmanship",
    type: "product",
  },
  {
    id: 6,
    image: "/product-2.png",
    likes: 298,
    comments: 15,
    caption: "Weekend vibes in our Props Vol 1 shirt. #BulandStyle #WeekendOutfit",
    type: "lifestyle",
  },
]

export default function InstagramFeed() {
  const [activeFilter, setActiveFilter] = useState<string | null>(null)
  const [hoveredPost, setHoveredPost] = useState<number | null>(null)

  const filteredPosts = activeFilter ? instagramPosts.filter((post) => post.type === activeFilter) : instagramPosts

  return (
    <section className="py-16 md:py-24 overflow-hidden">
      <div className="mx-auto max-w-screen-2xl">
        <div className="flex flex-col items-center justify-center text-center mb-8">
          <div className="flex items-center gap-2 mb-3">
            <Instagram className="h-6 w-6 text-red-800" />
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl animate-fade-in">
              Follow Our Style
            </h2>
          </div>
          <p className="mt-2 max-w-[700px] text-muted-foreground md:text-xl animate-fade-in animation-delay-200">
            Get inspired by our community on Instagram <Link href={'https://www.instagram.com/bulandapparel'} target="_blank" className="font-medium text-red-800">@bulandapparels</Link>
          </p>
        </div>

        {/* Filter buttons */}
        <div className="flex justify-center gap-3 mb-8">
          <Button
            variant={activeFilter === null ? "default" : "outline"}
            size="sm"
            className={cn("rounded-full", activeFilter === null ? "bg-red-800 hover:bg-red-900 text-zinc-50" : "hover:bg-red-50 hover:text-red-950")}
            onClick={() => setActiveFilter(null)}
          >
            All
          </Button>
          <Button
            variant={activeFilter === "outfit" ? "default" : "outline"}
            size="sm"
            className={cn(
              "rounded-full",
              activeFilter === "outfit" ? "bg-red-800 hover:bg-red-900 text-zinc-50" : "hover:bg-red-50 hover:text-red-950",
            )}
            onClick={() => setActiveFilter("outfit")}
          >
            Outfits
          </Button>
          <Button
            variant={activeFilter === "product" ? "default" : "outline"}
            size="sm"
            className={cn(
              "rounded-full",
              activeFilter === "product" ? "bg-red-800 hover:bg-red-900 text-zinc-50" : "hover:bg-red-50 hover:text-red-950",
            )}
            onClick={() => setActiveFilter("product")}
          >
            Products
          </Button>
          <Button
            variant={activeFilter === "lifestyle" ? "default" : "outline"}
            size="sm"
            className={cn(
              "rounded-full",
              activeFilter === "lifestyle" ? "bg-red-800 hover:bg-red-900 text-zinc-50" : "hover:bg-red-50 hover:text-red-950",
            )}
            onClick={() => setActiveFilter("lifestyle")}
          >
            Lifestyle
          </Button>
        </div>

        {/* Instagram grid */}
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-6">
          {filteredPosts.map((post) => (
            <div
              key={post.id}
              className="group relative aspect-square overflow-hidden rounded-lg animate-scale-in"
              style={{ animationDelay: `${post.id * 100}ms` }}
              onMouseEnter={() => setHoveredPost(post.id)}
              onMouseLeave={() => setHoveredPost(null)}
            >
              <Image
                src={post.image || "/placeholder.svg"}
                alt={`Instagram post ${post.id}`}
                width={400}
                height={400}
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
              />

              {/* Instagram-style overlay */}
              <div
                className={cn(
                  "absolute inset-0 bg-black/60 flex flex-col items-center justify-center transition-opacity duration-300",
                  hoveredPost === post.id ? "opacity-100" : "opacity-0",
                )}
              >
                <div className="flex items-center gap-4 mb-3">
                  <div className="flex items-center gap-1">
                    <Heart className="h-5 w-5 text-white fill-white" />
                    <span className="text-white text-sm font-medium">{post.likes}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <MessageCircle className="h-5 w-5 text-white" />
                    <span className="text-white text-sm font-medium">{post.comments}</span>
                  </div>
                </div>

                <p className="text-white text-xs text-center px-3 line-clamp-2 mb-3">{post.caption}</p>

                <Button
                  variant="outline"
                  size="sm"
                  className="rounded-full border-white text-white hover:bg-white/20 hover:text-white"
                >
                  <ExternalLink className="h-3 w-3 mr-1" />
                  View Post
                </Button>
              </div>

              {/* Type badge */}
              <div className="absolute top-2 right-2 bg-white/80 backdrop-blur-sm rounded-full px-2 py-0.5 text-xs font-medium text-gray-800">
                {post.type === "outfit" ? "Outfit" : post.type === "product" ? "Product" : "Lifestyle"}
              </div>
            </div>
          ))}
        </div>

        {/* Follow button */}
        <div className="flex justify-center mt-10">
          <Link href={'https://www.instagram.com/bulandapparel'} target="_blank" className="flex  items-center py-2 rounded-full bg-gradient-to-r from-purple-600 to-red-600 hover:from-purple-700 hover:to-red-700 text-white px-8 group">
            <Instagram className="h-4 w-4 mr-2 group-hover:rotate-12 transition-transform" />
            Follow @bulandapparels
          </Link>
        </div>
      </div>
    </section>
  )
}

