"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import {
  ChevronLeft,
  ChevronRight,
  CreditCard,
  TruckIcon,
  Shield,
  CheckCircle2,
  Clock,
  MapPin,
  User,
  CreditCardIcon,
  Wallet,
  AlertCircle,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"

// Sample cart items (same as cart page)
const cartItems = [
  {
    id: 1,
    name: "Dystopia Graphic Tee",
    slug: "dystopia-graphic-tee",
    image: "/products/shirt-product-4.png",
    price: 1500,
    originalPrice: 1800,
    color: "Black",
    size: "M",
    quantity: 1,
    collection: "Dystopia Collection",
  },
  {
    id: 2,
    name: "Minimalist Logo Shirt",
    slug: "minimalist-logo-shirt",
    image: "/products/shirt-product-5.png",
    price: 2000,
    originalPrice: 2199,
    color: "Black",
    size: "L",
    quantity: 2,
    collection: "Props Vol 1",
  },
]

// Shipping methods
const shippingMethods = [
  {
    id: "standard",
    name: "Standard Shipping",
    description: "3-5 business days",
    price: 999,
    icon: TruckIcon,
  },
  {
    id: "express",
    name: "Express Shipping",
    description: "1-2 business days",
    price: 1999,
    icon: Clock,
  },
  {
    id: "pickup",
    name: "Store Pickup",
    description: "Available next day",
    price: 0,
    icon: MapPin,
  },
]

// Payment methods
const paymentMethods = [
  {
    id: "credit-card",
    name: "Credit / Debit Card",
    icon: CreditCardIcon,
  },
  {
    id: "cash-on-delivery",
    name: "Cash on Delivery",
    icon: Wallet,
  },
  {
    id: "easypaisa",
    name: "Easypaisa",
    icon: () => <div className="h-4 w-4 flex items-center justify-center text-green-600 font-bold text-xs">EP</div>,
  },
  {
    id: "jazzcash",
    name: "JazzCash",
    icon: () => <div className="h-4 w-4 flex items-center justify-center text-red-600 font-bold text-xs">JC</div>,
  },
]

// Pakistani cities
const cities = [
  "Karachi",
  "Lahore",
  "Islamabad",
  "Rawalpindi",
  "Faisalabad",
  "Multan",
  "Peshawar",
  "Quetta",
  "Sialkot",
  "Gujranwala",
]

export default function CheckoutPage() {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(1)
  const [isLoading, setIsLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [promoCode, setPromoCode] = useState("")
  const [promoApplied, setPromoApplied] = useState(false)
  const [selectedShipping, setSelectedShipping] = useState("standard")
  const [selectedPayment, setSelectedPayment] = useState("credit-card")
  const [showCardForm, setShowCardForm] = useState(true)
  const [formErrors, setFormErrors] = useState<Record<string, string>>({})
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    postalCode: "",
    sameAsBilling: true,
    cardNumber: "",
    cardName: "",
    expiryDate: "",
    cvv: "",
    saveInfo: true,
    termsAccepted: false,
  })

  // Calculate order totals
  const subtotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0)
  const discount = promoApplied ? Math.round(subtotal * 0.1) : 0 // 10% discount if promo applied
  const shippingCost = shippingMethods.find((method) => method.id === selectedShipping)?.price || 0
  const tax = Math.round((subtotal - discount) * 0.08) // 8% tax
  const total = subtotal - discount + shippingCost + tax

  // Format price in PKR
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("ur-PK").format(price)
  }

  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 800)

    return () => clearTimeout(timer)
  }, [])

  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })

    // Clear error when field is edited
    if (formErrors[name]) {
      setFormErrors({
        ...formErrors,
        [name]: "",
      })
    }
  }

  // Handle checkbox changes
  const handleCheckboxChange = (name: string, checked: boolean) => {
    setFormData({
      ...formData,
      [name]: checked,
    })
  }

  // Apply promo code
  const applyPromoCode = () => {
    if (promoCode.toLowerCase() === "buland10") {
      setPromoApplied(true)
    }
  }

  // Validate form based on current step
  const validateForm = () => {
    const errors: Record<string, string> = {}

    if (currentStep === 1) {
      if (!formData.firstName) errors.firstName = "First name is required"
      if (!formData.lastName) errors.lastName = "Last name is required"
      if (!formData.email) errors.email = "Email is required"
      else if (!/\S+@\S+\.\S+/.test(formData.email)) errors.email = "Email is invalid"
      if (!formData.phone) errors.phone = "Phone number is required"
      if (!formData.address) errors.address = "Address is required"
      if (!formData.city) errors.city = "City is required"
      if (!formData.postalCode) errors.postalCode = "Postal code is required"
    }

    if (currentStep === 2 && selectedPayment === "credit-card") {
      if (!formData.cardNumber) errors.cardNumber = "Card number is required"
      else if (!/^\d{16}$/.test(formData.cardNumber.replace(/\s/g, "")))
        errors.cardNumber = "Card number must be 16 digits"

      if (!formData.cardName) errors.cardName = "Name on card is required"
      if (!formData.expiryDate) errors.expiryDate = "Expiry date is required"
      else if (!/^\d{2}\/\d{2}$/.test(formData.expiryDate)) errors.expiryDate = "Format must be MM/YY"

      if (!formData.cvv) errors.cvv = "CVV is required"
      else if (!/^\d{3,4}$/.test(formData.cvv)) errors.cvv = "CVV must be 3 or 4 digits"
    }

    if (currentStep === 3) {
      if (!formData.termsAccepted) errors.termsAccepted = "You must accept the terms and conditions"
    }

    setFormErrors(errors)
    return Object.keys(errors).length === 0
  }

  // Handle next step
  const handleNextStep = () => {
    if (validateForm()) {
      setCurrentStep(currentStep + 1)
      window.scrollTo(0, 0)
    }
  }

  // Handle previous step
  const handlePrevStep = () => {
    setCurrentStep(currentStep - 1)
    window.scrollTo(0, 0)
  }

  // Handle payment method change
  useEffect(() => {
    setShowCardForm(selectedPayment === "credit-card")
  }, [selectedPayment])

  // Handle form submission
  const handleSubmit = async () => {
    if (validateForm()) {
      setIsSubmitting(true)

      // Simulate API call
      setTimeout(() => {
        setIsSubmitting(false)
        router.push("/checkout/confirmation")
      }, 2000)
    }
  }

  // Format card number with spaces
  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "")
    const matches = v.match(/\d{4,16}/g)
    const match = (matches && matches[0]) || ""
    const parts = []

    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4))
    }

    if (parts.length) {
      return parts.join(" ")
    } else {
      return value
    }
  }

  // Format expiry date
  const formatExpiryDate = (value: string) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "")

    if (v.length >= 2) {
      return `${v.substring(0, 2)}/${v.substring(2, 4)}`
    }

    return v
  }

  if (isLoading) {
    return (
      <div className="mx-auto max-w-screen-2xl py-16 md:py-24">
        <div className="flex flex-col gap-6">
          <div className="bg-muted/20 animate-pulse h-12 w-48 rounded-lg"></div>
          <div className="bg-muted/20 animate-pulse h-96 rounded-lg"></div>
        </div>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-screen-xl py-16 md:py-24 animate-fade-in">
      <div className="flex items-center mb-8">
        <Link href="/cart" className="text-red-800 hover:text-red-900 mr-4">
          <ChevronLeft className="h-5 w-5" />
        </Link>
        <h1 className="text-3xl font-bold">Checkout</h1>
      </div>

      {/* Checkout Progress */}
      <div className="mb-10">
        <div className="flex items-center justify-between max-w-3xl mx-auto">
          <div className="flex flex-col items-center">
            <div
              className={cn(
                "w-10 h-10 rounded-full flex items-center justify-center text-white mb-2",
                currentStep >= 1 ? "bg-red-800" : "bg-gray-300 dark:bg-gray-800",
              )}
            >
              <User className="h-5 w-5" />
            </div>
            <span className="text-sm font-medium">Shipping</span>
          </div>
          <div className={cn("h-1 flex-grow mx-2", currentStep >= 2 ? "bg-red-800" : "bg-gray-300 dark:bg-gray-800")}></div>
          <div className="flex flex-col items-center">
            <div
              className={cn(
                "w-10 h-10 rounded-full flex items-center justify-center text-white mb-2",
                currentStep >= 2 ? "bg-red-800" : "bg-gray-300 dark:bg-gray-800",
              )}
            >
              <CreditCard className="h-5 w-5" />
            </div>
            <span className="text-sm font-medium">Payment</span>
          </div>
          <div className={cn("h-1 flex-grow mx-2", currentStep >= 3 ? "bg-red-800" : "bg-gray-300 dark:bg-gray-800")}></div>
          <div className="flex flex-col items-center">
            <div
              className={cn(
                "w-10 h-10 rounded-full flex items-center justify-center text-white mb-2",
                currentStep >= 3 ? "bg-red-800" : "bg-gray-300 dark:bg-gray-800",
              )}
            >
              <CheckCircle2 className="h-5 w-5" />
            </div>
            <span className="text-sm font-medium">Review</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Checkout Form */}
        <div className="lg:col-span-2">
          <div className="bg-white dark:bg-zinc-950 rounded-lg shadow-sm border p-6">
            {/* Step 1: Shipping Information */}
            {currentStep === 1 && (
              <div>
                <h2 className="text-xl font-semibold mb-6">Shipping Information</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div>
                    <Label htmlFor="firstName">First Name</Label>
                    <Input
                      id="firstName"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      className={formErrors.firstName ? "border-red-500" : ""}
                    />
                    {formErrors.firstName && <p className="text-red-500 text-xs mt-1">{formErrors.firstName}</p>}
                  </div>
                  <div>
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input
                      id="lastName"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      className={formErrors.lastName ? "border-red-500" : ""}
                    />
                    {formErrors.lastName && <p className="text-red-500 text-xs mt-1">{formErrors.lastName}</p>}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div>
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className={formErrors.email ? "border-red-500" : ""}
                    />
                    {formErrors.email && <p className="text-red-500 text-xs mt-1">{formErrors.email}</p>}
                  </div>
                  <div>
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className={formErrors.phone ? "border-red-500" : ""}
                    />
                    {formErrors.phone && <p className="text-red-500 text-xs mt-1">{formErrors.phone}</p>}
                  </div>
                </div>

                <div className="mb-6">
                  <Label htmlFor="address">Address</Label>
                  <Input
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    className={formErrors.address ? "border-red-500" : ""}
                  />
                  {formErrors.address && <p className="text-red-500 text-xs mt-1">{formErrors.address}</p>}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div>
                    <Label htmlFor="city">City</Label>
                    <Select
                      value={formData.city}
                      onValueChange={(value) => {
                        setFormData({ ...formData, city: value })
                        if (formErrors.city) {
                          setFormErrors({ ...formErrors, city: "" })
                        }
                      }}
                    >
                      <SelectTrigger className={formErrors.city ? "border-red-500" : ""}>
                        <SelectValue placeholder="Select a city" />
                      </SelectTrigger>
                      <SelectContent>
                        {cities.map((city) => (
                          <SelectItem key={city} value={city}>
                            {city}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {formErrors.city && <p className="text-red-500 text-xs mt-1">{formErrors.city}</p>}
                  </div>
                  <div>
                    <Label htmlFor="postalCode">Postal Code</Label>
                    <Input
                      id="postalCode"
                      name="postalCode"
                      value={formData.postalCode}
                      onChange={handleInputChange}
                      className={formErrors.postalCode ? "border-red-500" : ""}
                    />
                    {formErrors.postalCode && <p className="text-red-500 text-xs mt-1">{formErrors.postalCode}</p>}
                  </div>
                </div>

                <div className="flex items-center space-x-2 mb-6">
                  <Checkbox
                    id="sameAsBilling"
                    checked={formData.sameAsBilling}
                    onCheckedChange={(checked) => handleCheckboxChange("sameAsBilling", checked as boolean)}
                  />
                  <label
                    htmlFor="sameAsBilling"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Billing address same as shipping address
                  </label>
                </div>

                <h3 className="text-lg font-semibold mb-4">Shipping Method</h3>
                <RadioGroup value={selectedShipping} onValueChange={setSelectedShipping} className="space-y-3">
                  {shippingMethods.map((method) => (
                    <div key={method.id} className="flex items-center space-x-2">
                      <RadioGroupItem value={method.id} id={method.id} />
                      <Label htmlFor={method.id} className="flex flex-1 items-center justify-between cursor-pointer">
                        <div className="flex items-center">
                          <method.icon className="h-5 w-5 mr-2 text-gray-600" />
                          <div>
                            <span className="font-medium">{method.name}</span>
                            <p className="text-sm text-gray-500">{method.description}</p>
                          </div>
                        </div>
                        <span className="font-medium">
                          {method.price === 0 ? "Free" : `₨ ${formatPrice(method.price)}`}
                        </span>
                      </Label>
                    </div>
                  ))}
                </RadioGroup>

                <div className="mt-8 flex justify-end">
                  <Button className="bg-red-800 hover:bg-red-900 text-white" onClick={handleNextStep}>
                    Continue to Payment
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </div>
            )}

            {/* Step 2: Payment Information */}
            {currentStep === 2 && (
              <div>
                <h2 className="text-xl font-semibold mb-6">Payment Method</h2>

                <RadioGroup value={selectedPayment} onValueChange={setSelectedPayment} className="space-y-3 mb-6">
                  {paymentMethods.map((method) => (
                    <div key={method.id} className="flex items-center space-x-2">
                      <RadioGroupItem value={method.id} id={method.id} />
                      <Label htmlFor={method.id} className="flex items-center cursor-pointer">
                        {typeof method.icon === "function" ? (
                          <method.icon />
                        ) : (
                          <method.icon className="h-4 w-4 mr-2 text-gray-600" />
                        )}
                        <span className="ml-2">{method.name}</span>
                      </Label>
                    </div>
                  ))}
                </RadioGroup>

                {showCardForm && (
                  <div className="bg-gray-50 dark:bg-zinc-950 p-4 rounded-lg mb-6">
                    <h3 className="text-lg font-semibold mb-4">Card Details</h3>
                    <div className="mb-4">
                      <Label htmlFor="cardNumber">Card Number</Label>
                      <Input
                        id="cardNumber"
                        name="cardNumber"
                        value={formData.cardNumber}
                        onChange={(e) => {
                          const formatted = formatCardNumber(e.target.value)
                          setFormData({ ...formData, cardNumber: formatted })
                          if (formErrors.cardNumber) {
                            setFormErrors({ ...formErrors, cardNumber: "" })
                          }
                        }}
                        placeholder="1234 5678 9012 3456"
                        maxLength={19}
                        className={formErrors.cardNumber ? "border-red-500" : ""}
                      />
                      {formErrors.cardNumber && <p className="text-red-500 text-xs mt-1">{formErrors.cardNumber}</p>}
                    </div>

                    <div className="mb-4">
                      <Label htmlFor="cardName">Name on Card</Label>
                      <Input
                        id="cardName"
                        name="cardName"
                        value={formData.cardName}
                        onChange={handleInputChange}
                        className={formErrors.cardName ? "border-red-500" : ""}
                      />
                      {formErrors.cardName && <p className="text-red-500 text-xs mt-1">{formErrors.cardName}</p>}
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="expiryDate">Expiry Date</Label>
                        <Input
                          id="expiryDate"
                          name="expiryDate"
                          value={formData.expiryDate}
                          onChange={(e) => {
                            const formatted = formatExpiryDate(e.target.value)
                            setFormData({ ...formData, expiryDate: formatted })
                            if (formErrors.expiryDate) {
                              setFormErrors({ ...formErrors, expiryDate: "" })
                            }
                          }}
                          placeholder="MM/YY"
                          maxLength={5}
                          className={formErrors.expiryDate ? "border-red-500" : ""}
                        />
                        {formErrors.expiryDate && <p className="text-red-500 text-xs mt-1">{formErrors.expiryDate}</p>}
                      </div>
                      <div>
                        <Label htmlFor="cvv">CVV</Label>
                        <Input
                          id="cvv"
                          type="number"
                          name="cvv"
                          value={formData.cvv}
                          onChange={handleInputChange}
                          maxLength={4}
                          className={formErrors.cvv ? "border-red-500" : ""}
                        />
                        {formErrors.cvv && <p className="text-red-500 text-xs mt-1">{formErrors.cvv}</p>}
                      </div>
                    </div>
                  </div>
                )}

                <div className="flex items-center space-x-2 mb-6">
                  <Checkbox
                    id="saveInfo"
                    checked={formData.saveInfo}
                    onCheckedChange={(checked) => handleCheckboxChange("saveInfo", checked as boolean)}
                  />
                  <label
                    htmlFor="saveInfo"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Save payment information for future purchases
                  </label>
                </div>

                <div className="mt-8 flex justify-between">
                  <Button variant="outline" onClick={handlePrevStep}>
                    <ChevronLeft className="mr-2 h-4 w-4" />
                    Back to Shipping
                  </Button>
                  <Button className="bg-red-800 hover:bg-red-900 text-white" onClick={handleNextStep}>
                    Review Order
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </div>
            )}

            {/* Step 3: Order Review */}
            {currentStep === 3 && (
              <div>
                <h2 className="text-xl font-semibold mb-6">Review Your Order</h2>

                <div className="mb-6">
                  <h3 className="text-lg font-semibold mb-2">Shipping Address</h3>
                  <div className="bg-gray-50 dark:bg-zinc-950 p-4 rounded-lg">
                    <p className="font-medium">
                      {formData.firstName} {formData.lastName}
                    </p>
                    <p>{formData.address}</p>
                    <p>
                      {formData.city}, {formData.postalCode}
                    </p>
                    <p>{formData.phone}</p>
                    <p>{formData.email}</p>
                  </div>
                </div>

                <div className="mb-6">
                  <h3 className="text-lg font-semibold mb-2">Shipping Method</h3>
                  <div className="bg-gray-50 dark:bg-zinc-950 p-4 rounded-lg">
                    <div className="flex justify-between">
                      <div className="flex items-center">
                        {(() => {
                          const method = shippingMethods.find((m) => m.id === selectedShipping)
                          if (!method) return null
                          return (
                            <>
                              <method.icon className="h-5 w-5 mr-2 text-gray-600" />
                              <div>
                                <p className="font-medium">{method.name}</p>
                                <p className="text-sm text-gray-500">{method.description}</p>
                              </div>
                            </>
                          )
                        })()}
                      </div>
                      <span className="font-medium">
                        {shippingCost === 0 ? "Free" : `₨ ${formatPrice(shippingCost)}`}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="mb-6">
                  <h3 className="text-lg font-semibold mb-2">Payment Method</h3>
                  <div className="bg-gray-50 dark:bg-zinc-950 p-4 rounded-lg">
                    {(() => {
                      const method = paymentMethods.find((m) => m.id === selectedPayment)
                      if (!method) return null
                      return (
                        <div className="flex items-center">
                          {typeof method.icon === "function" ? (
                            <method.icon />
                          ) : (
                            <method.icon className="h-5 w-5 mr-2 text-gray-600" />
                          )}
                          <span className="ml-2 font-medium">{method.name}</span>
                          {selectedPayment === "credit-card" && (
                            <span className="ml-2 text-gray-500">•••• {formData.cardNumber.slice(-4)}</span>
                          )}
                        </div>
                      )
                    })()}
                  </div>
                </div>

                <div className="mb-6">
                  <h3 className="text-lg font-semibold mb-2">Order Items</h3>
                  <div className="bg-gray-50 dark:bg-zinc-900 p-4 rounded-lg">
                    <div className="space-y-4">
                      {cartItems.map((item) => (
                        <div key={item.id} className="flex items-center gap-4">
                          <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-md border">
                            <Image
                              src={item.image || "/placeholder.svg"}
                              alt={item.name}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <div className="flex flex-1 flex-col">
                            <div className="flex justify-between text-base font-medium">
                              <h3>{item.name}</h3>
                              <p className="ml-4">₨ {formatPrice(item.price)}</p>
                            </div>
                            <div className="flex justify-between text-sm text-gray-500">
                              <p>
                                {item.color}, {item.size}
                              </p>
                              <p>Qty: {item.quantity}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-2 mb-6">
                  <Checkbox
                    id="termsAccepted"
                    checked={formData.termsAccepted}
                    onCheckedChange={(checked) => handleCheckboxChange("termsAccepted", checked as boolean)}
                    className={formErrors.termsAccepted ? "border-red-500" : ""}
                  />
                  <label
                    htmlFor="termsAccepted"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    I agree to the{" "}
                    <Link href="/terms" className="text-red-800 hover:underline">
                      Terms and Conditions
                    </Link>{" "}
                    and{" "}
                    <Link href="/privacy" className="text-red-800 hover:underline">
                      Privacy Policy
                    </Link>
                  </label>
                </div>
                {formErrors.termsAccepted && <p className="text-red-500 text-xs mb-6">{formErrors.termsAccepted}</p>}

                <div className="mt-8 flex justify-between">
                  <Button variant="outline" onClick={handlePrevStep}>
                    <ChevronLeft className="mr-2 h-4 w-4" />
                    Back to Payment
                  </Button>
                  <Button
                    className="bg-red-800 hover:bg-red-900 text-white"
                    onClick={handleSubmit}
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <svg
                          className="animate-spin -ml-1 mr-3 h-4 w-4 text-white"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                        Processing...
                      </>
                    ) : (
                      <>
                        Place Order
                        <CheckCircle2 className="ml-2 h-4 w-4" />
                      </>
                    )}
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="bg-white dark:bg-zinc-950 rounded-lg shadow-sm border p-6 sticky top-24">
            <h2 className="font-semibold text-lg mb-4">Order Summary</h2>

            <div className="mb-4">
              <div className="text-sm text-gray-500 mb-2">
                {cartItems.length} {cartItems.length === 1 ? "item" : "items"} in cart
              </div>
              <div className="max-h-60 overflow-auto pr-2">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex py-2 border-b">
                    <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-md border">
                      <Image src={item.image || "/placeholder.svg"} alt={item.name} fill className="object-cover" />
                    </div>
                    <div className="ml-4 flex flex-1 flex-col">
                      <div className="flex justify-between text-sm font-medium">
                        <h3 className="line-clamp-1">{item.name}</h3>
                        <p className="ml-4">₨ {formatPrice(item.price * item.quantity)}</p>
                      </div>
                      <div className="flex mt-1 justify-between text-xs text-gray-500">
                        <p>
                          {item.color}, {item.size}
                        </p>
                        <p>x{item.quantity}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Promo Code */}
            <div className="mt-4 mb-6">
              <label className="text-sm font-medium mb-1 block">Promo Code</label>
              <div className="flex gap-2">
                <Input
                  placeholder="Enter code"
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                  disabled={promoApplied}
                  className="flex-grow"
                />
                <Button
                  variant={promoApplied ? "outline" : "default"}
                  onClick={applyPromoCode}
                  disabled={promoApplied || !promoCode}
                  className={promoApplied ? "bg-green-50 text-green-700 border-green-200" : ""}
                >
                  {promoApplied ? "Applied" : "Apply"}
                </Button>
              </div>
              {promoApplied && <p className="text-xs text-green-600 mt-1">Promo code applied successfully!</p>}
              {!promoApplied && <p className="text-xs text-muted-foreground mt-1">Try "BULAND10" for 10% off</p>}
            </div>

            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Subtotal</span>
                <span>₨ {formatPrice(subtotal)}</span>
              </div>

              {promoApplied && (
                <div className="flex justify-between text-green-600">
                  <span>Discount (10%)</span>
                  <span>-₨ {formatPrice(discount)}</span>
                </div>
              )}

              <div className="flex justify-between">
                <span className="text-muted-foreground">Shipping</span>
                <span>{shippingCost === 0 ? "Free" : `₨ ${formatPrice(shippingCost)}`}</span>
              </div>

              <div className="flex justify-between">
                <span className="text-muted-foreground">Tax (8%)</span>
                <span>₨ {formatPrice(tax)}</span>
              </div>

              <Separator className="my-3" />

              <div className="flex justify-between font-semibold text-base">
                <span>Total</span>
                <span>₨ {formatPrice(total)}</span>
              </div>
            </div>

            {/* Trust Badges */}
            <div className="mt-6 grid grid-cols-3 gap-2 text-center text-xs text-muted-foreground">
              <div className="flex flex-col items-center">
                <TruckIcon className="h-5 w-5 mb-1 text-gray-600" />
                <span>Free Shipping</span>
                <span>Over ₨ 10,000</span>
              </div>
              <div className="flex flex-col items-center">
                <Shield className="h-5 w-5 mb-1 text-gray-600" />
                <span>Secure</span>
                <span>Payment</span>
              </div>
              <div className="flex flex-col items-center">
                <AlertCircle className="h-5 w-5 mb-1 text-gray-600" />
                <span>24/7</span>
                <span>Support</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

