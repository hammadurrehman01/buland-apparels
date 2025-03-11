
"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import {Star,ChevronRight,ChevronLeft,Heart,Share2,ShoppingBag,Plus,Minus,Ruler,Leaf,Check,X,ArrowDown,} from "lucide-react"
import useEmblaCarousel from "embla-carousel-react"

import { Button } from "@/components/ui/button"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Slider } from "@/components/ui/slider"
import { cn } from "@/lib/utils"
import { Textarea } from "./ui/textarea"

// Product data
const productSizes = ["XS", "S", "M", "L", "XL", "XXL"]
const productColors = [
  { name: "Black", value: "#000000" },
  { name: "White", value: "#FFFFFF" },
  { name: "Red", value: "#FF0000" },
  { name: "Grey", value: "#808080" },
]

const similarProducts = [
  {
    id: 1,
    name: "Akira Capsule Hoodie",
    price: "$89.99",
    image: "/products/shirt-product-1.png",
    category: "Anime",
    inStock: true,
    rating: 4.5,
    isNew: true,
  },
  {
    id: 2,
    name: "Tokyo Streets Tee",
    price: "$49.99",
    image: "/products/shirt-product-1.png",
    category: "Streetwear",
    inStock: true,
    rating: 4.8,
    isNew: false,
  },
  {
    id: 3,
    name: "Hypebeast Cargo Pants",
    price: "$129.99",
    image: "/products/shirt-product-1.png",
    category: "Urban",
    inStock: false,
    rating: 4.2,
    isNew: false,
  },
  {
    id: 4,
    name: "Naruto Graphic Sweatshirt",
    price: "$79.99",
    image: "/products/shirt-product-1.png",
    category: "Anime",
    inStock: true,
    rating: 4.7,
    isNew: true,
  },
]

const reviews = [
  {
    id: 1,
    author: "SneakerHead98",
    rating: 5,
    date: "2 months ago",
    content:
      "This tee is perfect. The fit is exactly what I was looking for and the design stands out from everything else in my collection.",
    likes: 24,
    verified: true,
    height: "5'10\"",
    weight: "165 lbs",
    size: "M",
  },
  {
    id: 2,
    author: "AnimeKing",
    rating: 4,
    date: "1 month ago",
    content:
      "Added this to my streetwear collection and it's excellent. Material is comfortable and the design is unique. Shipping took longer than expected.",
    likes: 17,
    verified: true,
    height: "5'8\"",
    weight: "150 lbs",
    size: "S",
  },
  {
    id: 3,
    author: "UrbanStylez",
    rating: 5,
    date: "2 weeks ago",
    content:
      "Best piece I've purchased this year. The anxiety design is distinctive and meaningful. Already ordered another color.",
    likes: 32,
    verified: false,
    height: "6'1\"",
    weight: "180 lbs",
    size: "L",
  },
]

// Sustainability metrics
const sustainabilityMetrics = [
  { name: "Materials", score: 85 },
  { name: "Production", score: 70 },
  { name: "Packaging", score: 90 },
  { name: "Carbon", score: 75 },
]

// Style combinations
const styleCombinations = [
  { name: "Street Goth", items: ["Black Cargo Pants", "Platform Boots", "Silver Chain"] },
  { name: "Anime Casual", items: ["Ripped Jeans", "High-top Sneakers", "Beanie"] },
  { name: "Urban Minimalist", items: ["Wide Leg Pants", "Chunky Sneakers", "Crossbody Bag"] },
]

// Product features
const productFeatures = [
  { name: "Premium Cotton Blend", description: "80% cotton, 20% polyester for comfort and durability" },
  { name: "Oversized Fit", description: "Relaxed silhouette for authentic streetwear aesthetic" },
  { name: "Dystopia Graphics", description: "Exclusive artwork from our in-house design team" },
  { name: "Limited Edition", description: "Only 500 pieces produced worldwide" },
  { name: "Pre-washed", description: "Minimal shrinkage after washing" },
  { name: "Reinforced Stitching", description: "Double-stitched seams for longevity" },
]

export function ProductDetails() {
 
  const [selectedSize, setSelectedSize] = useState("M")
  const [selectedColor, setSelectedColor] = useState(productColors[0])
  const [quantity, setQuantity] = useState(1)
  const [reviewName, setReviewName] = useState("")
  const [reviewEmail, setReviewEmail] = useState("")
  const [reviewRating, setReviewRating] = useState(5)
  const [reviewContent, setReviewContent] = useState("")
  const [isWishlisted, setIsWishlisted] = useState(false)
  const [stockCount] = useState(12)
  const [showSizeGuide, setShowSizeGuide] = useState(false)
  const [bodyType, setBodyType] = useState(50)
  const [height, setHeight] = useState(50)
  const [sustainabilityExpanded, setSustainabilityExpanded] = useState(false)
  const [recentViewers, setRecentViewers] = useState(0)
  const [activeFeature, setActiveFeature] = useState(0)
  const [reviewFilter, setReviewFilter] = useState("all")
  const [showReviewForm, setShowReviewForm] = useState(false)
  const [currentSlide, setCurrentSlide] = useState(0)

  // Carousels
  const [mainCarouselRef, mainCarouselApi] = useEmblaCarousel({ loop: true })
  const [thumbCarouselRef, thumbCarouselApi] = useEmblaCarousel({
    containScroll: "keepSnaps",
    dragFree: true,
  })
  const [similarProductsRef, similarProductsApi] = useEmblaCarousel({
    align: "start",
    containScroll: "trimSnaps",
    loop: false,
    dragFree: true,
  })

  // Feature rotation effect
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveFeature((prev) => (prev + 1) % productFeatures.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  // Simulate recent viewers
  useEffect(() => {
    setRecentViewers(Math.floor(Math.random() * 15) + 5)
    const interval = setInterval(() => {
      setRecentViewers((prev) => {
        const change = Math.floor(Math.random() * 3) - 1 // -1, 0, or 1
        return Math.max(3, Math.min(25, prev + change))
      })
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  // Sync the main carousel with the thumbnail carousel
  useEffect(() => {
    if (!mainCarouselApi || !thumbCarouselApi) return

    const onSelect = () => {
      setCurrentSlide(mainCarouselApi.selectedScrollSnap())
      thumbCarouselApi.scrollTo(mainCarouselApi.selectedScrollSnap())
    }

    mainCarouselApi.on("select", onSelect)
    return () => {
      mainCarouselApi.off("select", onSelect)
    }
  }, [mainCarouselApi, thumbCarouselApi])

  const onThumbClick = (index: number) => {
    if (!mainCarouselApi) return
    mainCarouselApi.scrollTo(index)
  }

  const submitReview = (e: { preventDefault: () => void }) => {
    e.preventDefault()
    alert("Thank you for your review.")
    setReviewName("")
    setReviewEmail("")
    setReviewRating(5)
    setReviewContent("")
    setShowReviewForm(false)
  }

  const scrollPrev = () => {
    if (similarProductsApi) similarProductsApi.scrollPrev()
  }

  const scrollNext = () => {
    if (similarProductsApi) similarProductsApi.scrollNext()
  }

  const incrementQuantity = () => {
    if (quantity < stockCount) {
      setQuantity(quantity + 1)
    }
  }

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1)
    }
  }

  const getSizeRecommendation = () => {
    // Simple algorithm based on body type and height
    const bodyFactor = bodyType / 100 
    const heightFactor = height / 100 

    if (bodyFactor < 0.3) {
      return heightFactor < 0.4 ? "XS" : heightFactor < 0.7 ? "S" : "M"
    } else if (bodyFactor < 0.6) {
      return heightFactor < 0.4 ? "S" : heightFactor < 0.7 ? "M" : "L"
    } else {
      return heightFactor < 0.4 ? "M" : heightFactor < 0.7 ? "L" : "XL"
    }
  }

  const recommendedSize = getSizeRecommendation()

  // Filter reviews based on selected filter
  const filteredReviews =
    reviewFilter === "all"
      ? reviews
      : reviewFilter === "verified"
        ? reviews.filter((r) => r.verified)
        : reviews.filter((r) => r.rating === Number.parseInt(reviewFilter))

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Top banner */}
      <div className="bg-black text-white dark:bg-zinc-100 dark:text-zinc-950 mb-8 py-3 px-6 flex justify-between items-center rounded-sm">
        <div className="flex items-center gap-2">
          <span className="inline-block w-2 h-2 bg-primary rounded-full animate-pulse"></span>
          <span className="text-sm font-medium">{recentViewers} people viewing this item</span>
        </div>
        <div className="text-sm font-medium">Limited time offer: 20% off ends in 48 hours</div>
      </div>

      <div className="grid gap-12 md:grid-cols-2">
      <div className="space-y-4">
         <div className="overflow-hidden rounded-lg" ref={mainCarouselRef}>
           <div className="flex">
             <div className="relative flex-[0_0_100%] aspect-square">
               <Image
                src="/products/shirt-product-1.png"
                alt="Social Anxiety Tee - Image 1"
                fill
                className="object-cover"
              />
            </div>
            <div className="relative flex-[0_0_100%] aspect-square">
              <Image
                src="/products/shirt-product-1.png"
                alt="Social Anxiety Tee - Image 2"
                fill
                className="object-cover"
              />
            </div>
            <div className="relative flex-[0_0_100%] aspect-square">
              <Image
                src="/products/shirt-product-1.png"
                alt="Social Anxiety Tee - Image 3"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
        <div className="overflow-hidden" ref={thumbCarouselRef}>
          <div className="flex gap-2">
            <div className="relative flex-[0_0_80px] aspect-square rounded-md overflow-hidden cursor-pointer">
              <Image
                src="/products/shirt-product-1.png"
                alt="Social Anxiety Tee - Thumbnail 1"
                fill
                className="object-cover"
              />
            </div>
            <div className="relative flex-[0_0_80px] aspect-square rounded-md overflow-hidden cursor-pointer">
              <Image
                src="/products/shirt-product-1.png"
                alt="Social Anxiety Tee - Thumbnail 2"
                fill
                className="object-cover"
              />
            </div>
            <div className="relative flex-[0_0_80px] aspect-square rounded-md overflow-hidden cursor-pointer">
              <Image
                src="/products/shirt-product-1.png"
                alt="Social Anxiety Tee - Thumbnail 3"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </div>

        {/* Product Details */}
        <div className="space-y-8">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Badge variant="outline" className="text-xs font-medium border-primary/50 text-primary">
                STREETWEAR
              </Badge>
              <Badge variant="outline" className="text-xs font-medium border-primary/50 text-primary">
                LIMITED EDITION
              </Badge>
            </div>
            <h1 className="text-4xl font-bold tracking-tight">
              Social Anxiety Tee
              <span className="block text-primary mt-1 text-2xl">Dystopia Collection</span>
            </h1>
            <div className="flex items-center mt-3 space-x-2">
              <div className="flex">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className={cn(
                      "w-4 h-4",
                      star <= 4 ? "fill-primary text-primary" : "fill-muted text-muted-foreground",
                    )}
                  />
                ))}
              </div>
              <span className="text-sm text-muted-foreground">({reviews.length} reviews)</span>
            </div>
            <div className="flex items-center gap-3 mt-4">
              <p className="text-3xl font-bold">$120.00</p>
              <p className="text-lg text-muted-foreground line-through">$150.00</p>
              <Badge className="bg-primary text-white font-medium">-20%</Badge>
            </div>
          </div>

          <div className="prose prose-sm max-w-none">
            <p>
              Express your social anxiety in style. This tee isn't just clothing—it's a statement. Part of our exclusive
              Dystopia Collection, featuring premium materials and a unique design that captures the essence of modern
              urban culture.
            </p>
          </div>

          {/* Color Selection */}
          <div className="space-y-4">
            <h2 className="font-medium text-sm">
              COLOR: <span className="text-primary">{selectedColor.name}</span>
            </h2>
            <div className="flex space-x-3">
              {productColors.map((color) => (
                <button
                  key={color.name}
                  onClick={() => setSelectedColor(color)}
                  className={cn(
                    "w-10 h-10 rounded-full transition-all",
                    selectedColor.name === color.name
                      ? "ring-2 ring-primary ring-offset-2 ring-offset-background scale-110"
                      : "hover:scale-105",
                  )}
                  style={{ backgroundColor: color.value }}
                  aria-label={`Select ${color.name} color`}
                >
                  {color.name === "White" && (
                    <span className="sr-only">White (shows as light gray for visibility)</span>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Size Selection with Smart Recommender */}
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="font-medium text-sm">
                SIZE: <span className="text-primary">{selectedSize}</span>
                {recommendedSize === selectedSize && (
                  <Badge variant="outline" className="ml-2 text-[10px] border-green-500 text-green-500">
                    RECOMMENDED
                  </Badge>
                )}
              </h2>
              <button
                className="text-sm text-primary font-medium flex items-center gap-1"
                onClick={() => setShowSizeGuide(!showSizeGuide)}
              >
                <Ruler className="h-4 w-4" />
                <span>Size Guide</span>
              </button>
            </div>

            {showSizeGuide ? (
              <div className="border border-gray-200 dark:border-gray-800 rounded-sm p-5 space-y-5 bg-gray-50 dark:bg-gray-900">
                <div className="flex justify-between items-center">
                  <h3 className="font-medium text-sm">Smart Size Recommender</h3>
                  <Button variant="ghost" size="sm" className="h-8 text-xs" onClick={() => setShowSizeGuide(false)}>
                    Close
                  </Button>
                </div>

                <div className="space-y-5">
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs">
                      <span>Slim</span>
                      <span>Body Type</span>
                      <span>Athletic</span>
                    </div>
                    <Slider
                      value={[bodyType]}
                      min={0}
                      max={100}
                      step={1}
                      onValueChange={(value) => setBodyType(value[0])}
                      className="w-full"
                    />
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between text-xs">
                      <span>Short</span>
                      <span>Height</span>
                      <span>Tall</span>
                    </div>
                    <Slider
                      value={[height]}
                      min={0}
                      max={100}
                      step={1}
                      onValueChange={(value) => setHeight(value[0])}
                      className="w-full"
                    />
                  </div>

                  <div className="bg-black text-white p-4 rounded-sm text-center">
                    <p className="text-sm font-medium">Recommended Size</p>
                    <p className="text-3xl font-bold text-primary">{recommendedSize}</p>
                  </div>
                </div>
              </div>
            ) : (
              <RadioGroup value={selectedSize} onValueChange={setSelectedSize} className="grid grid-cols-6 gap-2">
                {productSizes.map((size) => (
                  <div key={size}>
                    <RadioGroupItem id={`size-${size}`} value={size} className="sr-only" />
                    <Label
                      htmlFor={`size-${size}`}
                      className={cn(
                        "flex h-12 items-center justify-center text-center font-medium transition-all rounded-sm",
                        selectedSize === size
                          ? "bg-primary text-white dark:text-black"
                          : "bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 hover:bg-gray-200 dark:hover:bg-gray-800 cursor-pointer",
                        recommendedSize === size && selectedSize !== size ? "ring-2 ring-green-500" : "",
                      )}
                    >
                      {size}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            )}
          </div>

          {/* Quantity */}
          <div className="space-y-4">
            <h2 className="font-medium text-sm">QUANTITY</h2>
            <div className="flex items-center">
              <Button
                variant="outline"
                size="icon"
                onClick={decrementQuantity}
                disabled={quantity <= 1}
                className="h-12 w-12 rounded-r-none border-r-0"
              >
                <Minus className="h-4 w-4" />
              </Button>
              <div className="h-12 w-12 flex items-center justify-center border-y border-x-0 font-medium">
                {quantity}
              </div>
              <Button
                variant="outline"
                size="icon"
                onClick={incrementQuantity}
                disabled={quantity >= stockCount}
                className="h-12 w-12 rounded-l-none border-l-0"
              >
                <Plus className="h-4 w-4" />
              </Button>
              <div className="ml-4 text-sm text-muted-foreground">{stockCount} items in stock</div>
            </div>
          </div>

          {/* Sustainability Score */}
          <div className="border border-gray-200 dark:border-gray-800 rounded-sm overflow-hidden">
            <button
              className="w-full p-4 flex items-center justify-between font-medium text-sm bg-gray-50 dark:bg-gray-900"
              onClick={() => setSustainabilityExpanded(!sustainabilityExpanded)}
            >
              <div className="flex items-center gap-2">
                <Leaf className="h-4 w-4 text-green-500" />
                <span>Sustainability Score</span>
              </div>
              <div className="flex items-center gap-2">
                <Badge className="bg-green-500 text-white">B+</Badge>
                <ArrowDown className={cn("h-4 w-4 transition-transform", sustainabilityExpanded && "rotate-180")} />
              </div>
            </button>

            {sustainabilityExpanded && (
              <div className="p-5 space-y-4 border-t border-gray-200 dark:border-gray-800">
                {sustainabilityMetrics.map((metric) => (
                  <div key={metric.name} className="space-y-1">
                    <div className="flex justify-between text-sm">
                      <span>{metric.name}</span>
                      <span className="font-medium">{metric.score}/100</span>
                    </div>
                    <div className="h-2 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                      <div
                        className={cn(
                          "h-full rounded-full",
                          metric.score > 80 ? "bg-green-500" : metric.score > 60 ? "bg-yellow-500" : "bg-red-500",
                        )}
                        style={{ width: `${metric.score}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
                <p className="text-xs text-muted-foreground mt-2">
                  This product is made with sustainable materials and ethical manufacturing processes. Learn more about
                  our sustainability initiatives.
                </p>
              </div>
            )}
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <Button size="lg" className="flex-1 gap-2 h-14 bg-zinc-900 dark:bg-zinc-100 hover:bg-background/90 text-white dark:text-zinc-900">
              <ShoppingBag className="h-5 w-5" />
              Add to Cart
            </Button>
            <Button
              size="lg"
              variant="outline"
              className={cn("flex-none w-14 h-14 p-0", isWishlisted ? "bg-primary/10 border-primary" : "")}
              onClick={() => setIsWishlisted(!isWishlisted)}
            >
              <Heart className={cn("h-5 w-5", isWishlisted ? "fill-primary text-primary" : "")} />
            </Button>
            <Button size="lg" variant="outline" className="flex-none w-14 h-14 p-0">
              <Share2 className="h-5 w-5" />
            </Button>
          </div>

          <div className="text-sm text-muted-foreground flex items-center gap-2 justify-center border-t border-gray-200 dark:border-gray-800 pt-4">
            <Check className="h-4 w-4 text-green-500" />
            Free shipping on orders over $100
            <span className="mx-2">•</span>
            <Check className="h-4 w-4 text-green-500" />
            Easy 30-day returns
          </div>
        </div>
      </div>

      {/* Product Tabs - Description and Reviews */}
      <div className="mt-16">
        <Tabs defaultValue="description" className="w-full">
          <TabsList className="w-full flex h-12 bg-transparent border-b border-gray-200 dark:border-gray-800 p-0 space-x-8">
            <TabsTrigger
              value="description"
              className="text-base font-medium data-[state=active]:text-primary data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none bg-transparent h-full"
            >
              Description
            </TabsTrigger>
            <TabsTrigger
              value="reviews"
              className="text-base font-medium data-[state=active]:text-primary data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none bg-transparent h-full"
            >
              Reviews ({reviews.length})
            </TabsTrigger>
          </TabsList>

          {/* Description Tab */}
          <TabsContent value="description" className="mt-8 space-y-8">
            <div className="grid md:grid-cols-2 gap-12">
              <div>
                <h3 className="text-xl font-bold mb-4 border-l-4 border-primary pl-4">About the Social Anxiety Tee</h3>
                <p className="mb-4">
                  The Social Anxiety Tee transcends conventional fashion. Part of our exclusive Dystopia Collection,
                  this piece captures the essence of modern urban culture with its distinctive design and premium
                  quality.
                </p>
                <p>
                  Each piece in the Dystopia Collection represents the digital age anxiety we all face, with graphics
                  inspired by Japanese anime and street art. The oversized fit delivers that authentic streetwear
                  silhouette that defines contemporary style.
                </p>

                {/* Interactive Feature List */}
                <div className="mt-8 space-y-4">
                  <h3 className="text-xl font-bold mb-4 border-l-4 border-primary pl-4">Key Features</h3>
                  <div className="space-y-4">
                    {productFeatures.map((feature, index) => (
                      <div
                        key={index}
                        className="flex items-start gap-3 p-3 rounded-sm bg-gray-50 dark:bg-gray-900 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                      >
                        <div className="w-1 h-6 bg-primary flex-shrink-0 mt-1"></div>
                        <div>
                          <h4 className="font-medium text-sm">{feature.name}</h4>
                          <p className="text-sm text-muted-foreground mt-1">{feature.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-4 border-l-4 border-primary pl-4">Material & Care</h3>
                <p className="mb-4">
                  We prioritize quality in every piece. This tee is crafted from a premium cotton blend that's both
                  durable and exceptionally soft against your skin.
                </p>
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-sm">
                    <h4 className="font-medium mb-1 text-sm text-primary">Fabric</h4>
                    <p className="text-sm">80% Cotton, 20% Polyester</p>
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-sm">
                    <h4 className="font-medium mb-1 text-sm text-primary">Fit</h4>
                    <p className="text-sm">Oversized/Relaxed</p>
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-sm">
                    <h4 className="font-medium mb-1 text-sm text-primary">Print</h4>
                    <p className="text-sm">High-quality DTG</p>
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-sm">
                    <h4 className="font-medium mb-1 text-sm text-primary">Weight</h4>
                    <p className="text-sm">220 GSM</p>
                  </div>
                </div>

                {/* Care Instructions with Icons */}
                <h4 className="font-medium mb-4 text-sm border-l-4 border-primary pl-4">Care Instructions</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-start gap-2">
                    <Check className="h-4 w-4 text-green-500 flex-shrink-0 mt-0.5" />
                    <span className="text-sm">Machine wash cold with similar colors</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Check className="h-4 w-4 text-green-500 flex-shrink-0 mt-0.5" />
                    <span className="text-sm">Turn inside out before washing</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <X className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-sm">Do not bleach</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Check className="h-4 w-4 text-green-500 flex-shrink-0 mt-0.5" />
                    <span className="text-sm">Tumble dry low</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Check className="h-4 w-4 text-green-500 flex-shrink-0 mt-0.5" />
                    <span className="text-sm">Iron on low heat if needed</span>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          {/* Reviews Tab */}
          <TabsContent value="reviews" className="mt-8">
            <div className="space-y-8">
              {/* Reviews Summary */}
              <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-sm">
                <div className="flex flex-col md:flex-row gap-8 items-center">
                  <div className="text-center">
                    <div className="text-5xl font-bold">4.7</div>
                    <div className="flex justify-center mt-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          className={cn(
                            "w-5 h-5",
                            star <= 4 ? "fill-primary text-primary" : "fill-muted text-muted-foreground",
                          )}
                        />
                      ))}
                    </div>
                    <div className="text-sm text-muted-foreground mt-1">Based on {reviews.length} reviews</div>
                  </div>

                  <div className="flex-1 space-y-2">
                    {[5, 4, 3, 2, 1].map((rating) => (
                      <div key={rating} className="flex items-center gap-2">
                        <div className="text-sm font-medium w-2">{rating}</div>
                        <Star className="w-4 h-4 fill-primary text-primary" />
                        <div className="w-full bg-gray-200 dark:bg-gray-800 rounded-full h-2 overflow-hidden">
                          <div
                            className="bg-primary h-full rounded-full"
                            style={{
                              width: `${rating === 5 ? 70 : rating === 4 ? 20 : rating === 3 ? 10 : 0}%`,
                            }}
                          ></div>
                        </div>
                        <div className="text-sm text-muted-foreground w-8">
                          {rating === 5 ? "70%" : rating === 4 ? "20%" : rating === 3 ? "10%" : "0%"}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Review Filters */}
              <div className="flex flex-wrap gap-2">
                <Button
                  variant={reviewFilter === "all" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setReviewFilter("all")}
                  className="text-xs h-8"
                >
                  All Reviews
                </Button>
                <Button
                  variant={reviewFilter === "verified" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setReviewFilter("verified")}
                  className="text-xs h-8"
                >
                  Verified Purchases
                </Button>
                {[5, 4, 3].map((rating) => (
                  <Button
                    key={rating}
                    variant={reviewFilter === rating.toString() ? "default" : "outline"}
                    size="sm"
                    onClick={() => setReviewFilter(rating.toString())}
                    className="text-xs h-8"
                  >
                    {rating} Stars
                  </Button>
                ))}
              </div>

              {/* Reviews List */}
              <div className="space-y-6">
                {filteredReviews.length > 0 ? (
                  filteredReviews.map((review) => (
                    <div key={review.id} className="border border-gray-200 dark:border-gray-800 p-5 rounded-sm">
                      <div className="flex justify-between">
                        <div>
                          <div className="flex items-center gap-2">
                            <h4 className="font-medium">@{review.author}</h4>
                            {review.verified && (
                              <Badge variant="outline" className="text-[10px] border-green-500 text-green-500">
                                VERIFIED
                              </Badge>
                            )}
                          </div>
                          <div className="flex mt-1">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <Star
                                key={star}
                                className={cn(
                                  "w-4 h-4",
                                  star <= review.rating
                                    ? "fill-primary text-primary"
                                    : "fill-muted text-muted-foreground",
                                )}
                              />
                            ))}
                          </div>
                        </div>
                        <span className="text-sm text-muted-foreground">{review.date}</span>
                      </div>

                      {/* Reviewer Stats */}
                      <div className="flex gap-4 mt-2 text-xs text-muted-foreground">
                        <span>Height: {review.height}</span>
                        <span>Weight: {review.weight}</span>
                        <span>Size: {review.size}</span>
                      </div>

                      <p className="mt-3">{review.content}</p>
                      <div className="mt-3 flex items-center gap-2">
                        <Button variant="ghost" size="sm" className="h-8 gap-1 hover:text-primary">
                          <Heart className="h-4 w-4" />
                          <span>{review.likes}</span>
                        </Button>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8 text-muted-foreground border border-gray-200 dark:border-gray-800 rounded-sm">
                    No reviews match your filter. Try a different filter.
                  </div>
                )}
              </div>

              {/* Review Form Toggle */}
              {!showReviewForm ? (
                <div className="text-center">
                  <Button onClick={() => setShowReviewForm(true)} className="bg-primary hover:bg-primary/90 text-white dark:text-black">
                    Write a Review
                  </Button>
                </div>
              ) : (
                <div className="border border-gray-200 dark:border-gray-800 p-6 rounded-sm">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-xl font-bold">Write a Review</h3>
                    <Button variant="ghost" size="sm" onClick={() => setShowReviewForm(false)}>
                      Cancel
                    </Button>
                  </div>
                  <form onSubmit={submitReview} className="space-y-4">
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="name" className="font-medium text-xs">
                          Username
                        </Label>
                        <Input
                          id="name"
                          placeholder="@yourusername"
                          value={reviewName}
                          onChange={(e) => setReviewName(e.target.value)}
                          required
                          className="h-10"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email" className="font-medium text-xs">
                          Email
                        </Label>
                        <Input
                          id="email"
                          type="email"
                          placeholder="your@email.com"
                          value={reviewEmail}
                          onChange={(e) => setReviewEmail(e.target.value)}
                          required
                          className="h-10"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label className="font-medium text-xs">Your Rating</Label>
                      <div className="flex">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <button
                            key={star}
                            type="button"
                            onClick={() => setReviewRating(star)}
                            className="focus:outline-none transition-transform hover:scale-110"
                          >
                            <Star
                              className={cn(
                                "w-6 h-6 cursor-pointer",
                                star <= reviewRating ? "fill-primary text-primary" : "fill-muted text-muted-foreground",
                              )}
                            />
                          </button>
                        ))}
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="review" className="font-medium text-xs">
                        Your Review
                      </Label>
                      <Textarea
                        id="review"
                        rows={4}
                        placeholder="Share your thoughts about this product..."
                        value={reviewContent}
                        onChange={(e) => setReviewContent(e.target.value)}
                        required
                        className="resize-none"
                      />
                    </div>
                    <Button type="submit" className="bg-black hover:bg-black/90 text-white dark:bg-white dark:text-black">
                      Submit Review
                    </Button>
                  </form>
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Similar Products */}
      <div className="mt-16">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">Complete Your Look</h2>
          <div className="flex space-x-2">
            <Button variant="outline" size="icon" onClick={scrollPrev} className="h-10 w-10 rounded-full">
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon" onClick={scrollNext} className="h-10 w-10 rounded-full">
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
        <div className="overflow-hidden" ref={similarProductsRef}>
          <div className="flex">
            {similarProducts.map((product) => (
              <div key={product.id} className="flex-[0_0_280px] mr-6">
                <div className="group cursor-pointer">
                  <div className="relative aspect-square overflow-hidden mb-3 rounded-sm">
                    <Image
                      src={product.image || "/placeholder.svg"}
                      alt={product.name}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute top-2 left-2">
                      <Badge className="bg-black text-white text-xs font-medium">{product.category}</Badge>
                    </div>
                    {product.isNew && (
                      <div className="absolute top-2 right-2">
                        <Badge className="bg-primary text-white text-xs font-medium">NEW</Badge>
                      </div>
                    )}
                    {!product.inStock && (
                      <div className="absolute bottom-0 left-0 right-0 bg-black/70 text-white text-center py-1 text-xs font-medium">
                        Sold Out
                      </div>
                    )}
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <Button className="bg-primary hover:bg-primary/90 text-white dark:text-black">Quick View</Button>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="font-medium group-hover:text-primary transition-colors text-sm">{product.name}</h3>
                      <p className="text-muted-foreground">{product.price}</p>
                    </div>
                    <div className="flex items-center">
                      <Star className="w-3 h-3 fill-primary text-primary" />
                      <span className="text-xs ml-1">{product.rating}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}



