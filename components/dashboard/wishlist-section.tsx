import Image from "next/image"
import Link from "next/link"
import { XCircle, ShoppingBag } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { dashboardData } from "@/lib/dashboard-data"
import { formatPrice } from "@/lib/utils"

export default function WishlistSection() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-gray-900">My Wishlist</h1>
        <p className="text-gray-500">Items you've saved for later.</p>
      </div>

      {dashboardData.wishlist.length > 0 ? (
        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {dashboardData.wishlist.map((item) => (
            <Card key={item.id} className="bg-white border border-gray-200 shadow-sm rounded-lg overflow-hidden">
              <div className="relative aspect-square">
                <Image
                  src={item.image || "/placeholder.svg"}
                  alt={item.name}
                  fill
                  className="object-cover transition-transform hover:scale-105"
                />
                {!item.inStock && (
                  <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                    <span className="text-white font-medium px-3 py-1 bg-black/80 rounded-full text-sm">
                      Out of Stock
                    </span>
                  </div>
                )}
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute top-2 right-2 h-8 w-8 rounded-full bg-white/80 text-red-800 hover:bg-white hover:text-red-900"
                >
                  <XCircle className="h-4 w-4" />
                  <span className="sr-only">Remove from wishlist</span>
                </Button>
              </div>
              <CardContent className="p-4">
                <h3 className="font-medium line-clamp-1 text-gray-900">{item.name}</h3>
                <div className="flex justify-between items-center mt-2">
                  <div className="font-semibold text-gray-900">₨ {formatPrice(item.price)}</div>
                  <Button
                    size="sm"
                    disabled={!item.inStock}
                    className={item.inStock ? "bg-red-800 hover:bg-red-900 text-white" : "bg-gray-200 text-gray-500"}
                  >
                    {item.inStock ? "Add to Cart" : "Sold Out"}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <Card className="bg-white border border-gray-200 shadow-sm rounded-lg overflow-hidden">
          <CardContent className="p-6 text-center">
            <div className="flex flex-col items-center justify-center py-8">
              <div className="h-12 w-12 rounded-full bg-gray-100 flex items-center justify-center mb-4">
                <ShoppingBag className="h-6 w-6 text-gray-400" />
              </div>
              <h3 className="font-medium text-lg mb-2 text-gray-900">Your Wishlist is Empty</h3>
              <p className="text-gray-500 mb-4">Save items you like while browsing to add them to your wishlist.</p>
              <Link href="/categories/products">
                <Button className="bg-red-800 hover:bg-red-900 text-white">
                  <ShoppingBag className="mr-2 h-4 w-4" />
                  Start Shopping
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
