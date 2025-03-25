"use client"

import React from "react"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { Loader2, ChevronRight } from "lucide-react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function LoginPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [mounted, setMounted] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [emailError, setEmailError] = useState("")
  const [passwordError, setPasswordError] = useState("")

  useEffect(() => {
    setMounted(true)
  }, [])

  function validateForm() {
    let isValid = true

    // Reset errors
    setEmailError("")
    setPasswordError("")

    // Validate email
    if (!email) {
      setEmailError("Email is required")
      isValid = false
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setEmailError("Please enter a valid email address")
      isValid = false
    }

    // Validate password
    if (!password) {
      setPasswordError("Password is required")
      isValid = false
    } else if (password.length < 8) {
      setPasswordError("Password must be at least 8 characters")
      isValid = false
    }

    return isValid
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()

    if (!validateForm()) return

    setIsLoading(true)
    setError("")

    try {
      // Hammad idar authentication ki integration krni hai
      await new Promise((resolve) => setTimeout(resolve, 1500))

      console.log("Login successful", { email, password })
      router.push("/shop")
    } catch (err) {
      setError("Invalid email or password. Please try again.")
      console.error(err)
    } finally {
      setIsLoading(false)
    }
  }

  if (!mounted) return null

  return (
    <div className="min-h-screen w-full bg-background overflow-hidden relative flex items-center justify-center">
      {/* Background elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 right-0 w-1/2 h-screen bg-gradient-to-b from-red-600/20 to-transparent blur-3xl opacity-30"></div>
        <div className="absolute bottom-0 left-0 w-1/2 h-screen bg-gradient-to-t from-red-600/20 to-transparent blur-3xl opacity-30"></div>
      </div>

      {/* Animated grid lines */}
      <div className="absolute inset-0 z-0 opacity-20">
        <div className="h-full w-full bg-[linear-gradient(to_right,#18181b_1px,transparent_1px),linear-gradient(to_bottom,#18181b_1px,transparent_1px)] bg-[size:4rem_4rem]"></div>
      </div>

      <div className="container px-4 z-10 flex flex-col lg:flex-row items-center gap-8 lg:gap-20 py-10">
        {/* Brand section */}
        <motion.div
          className="w-full lg:w-1/2 flex flex-col items-center lg:items-start text-center lg:text-left"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="relative mb-6">
            <div className="absolute -inset-1 bg-red-500 rounded-lg blur-md opacity-75"></div>
            <div className="relative bg-background px-6 py-3 rounded-lg border border-red-500/50 flex items-center gap-2">
             <Image className="dark:invert" src={'/logo-1.png'} width={30} height={30} alt="logo"></Image>
              <span className="text-3xl font-bold tracking-tighter ">BULAND</span>
            </div>
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight  mb-4">
            <span className="bg-clip-text text-transparent dark:bg-gradient-to-r dark:from-white dark:to-red-500 bg-gradient-to-r from-gray-700 to-red-600">
              Elevate Your Style
            </span>
          </h1>

          <p className="text-lg md:text-xl text-zinc-400 max-w-md mb-8">
            Where anime aesthetics meet streetwear culture. Join the movement.
          </p>

          <div className="grid grid-cols-3 gap-4 w-full max-w-md mb-8">
         
              <motion.div

                className="aspect-square rounded-xl overflow-hidden relative group"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent z-10"></div>
                <Image
                  src={`/products/shirt-product-1.png`}
                  alt="Product preview"
                  width={300}
                  height={300}
                  className="object-cover h-full w-full transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute bottom-2 left-2 right-2 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <p className="text-xs font-medium  truncate">Limited Edition</p>
                </div>
              </motion.div>
              <motion.div

                className="aspect-square rounded-xl overflow-hidden relative group"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent z-10"></div>
                <Image
                  src={`/products/shirt-product-2.png`}
                  alt="Product preview"
                  width={300}
                  height={300}
                  className="object-cover h-full w-full transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute bottom-2 left-2 right-2 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <p className="text-xs font-medium  truncate">Limited Edition</p>
                </div>
              </motion.div>
              <motion.div

                className="aspect-square rounded-xl overflow-hidden relative group"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent z-10"></div>
                <Image
                  src={`/products/shirt-product-3.png`}
                  alt="Product preview"
                  width={300}
                  height={300}
                  className="object-cover h-full w-full transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute bottom-2 left-2 right-2 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <p className="text-xs font-medium  truncate">Limited Edition</p>
                </div>
              </motion.div>
          </div>

          <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
            <div className="flex items-center text-zinc-500 text-sm">
              <span className="inline-block w-2 h-2 rounded-full bg-green-500 mr-2"></span>
              2,400+ Active Users
            </div>
            <div className="flex items-center text-zinc-500 text-sm">
              <span className="inline-block w-2 h-2 rounded-full bg-red-500 mr-2"></span>
              New Drops Weekly
            </div>
            <div className="flex items-center text-zinc-500 text-sm">
              <span className="inline-block w-2 h-2 rounded-full bg-blue-500 mr-2"></span>
              Exclusive Collections
            </div>
          </div>
        </motion.div>

        {/* Login form */}
        <motion.div
          className="w-full lg:w-1/2 max-w-md"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="relative">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-red-500 to-red-700 rounded-2xl blur opacity-30"></div>
            <div className="relative bg-background backdrop-blur-sm border border-zinc-800 rounded-2xl p-8">
              <div className="mb-6">
                <h2 className="text-2xl font-bold  mb-2">Welcome Back</h2>
                <p className="text-zinc-400">Sign in to access your account</p>
              </div>

              {error && (
                <motion.div
                  className="mb-6 rounded-lg bg-red-500/10 border border-red-500/20 p-4 text-sm text-red-200"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  {error}
                </motion.div>
              )}

              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="space-y-1">
                  <div className="relative">
                    <Input
                      placeholder="Email"
                      type="email"
                      autoComplete="email"
                      className="bg-zinc-100 dark:bg-zinc-800/50 border-zinc-700/50  h-14 px-4 rounded-xl focus-visible:ring-red-500 focus-visible:ring-offset-red-500/20 focus-visible:ring-offset-2 placeholder:text-zinc-500"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  {emailError && <p className="text-red-400 text-xs mt-2 ml-1">{emailError}</p>}
                </div>

                <div className="space-y-1">
                  <div className="relative">
                    <Input
                      placeholder="Password"
                      type="password"
                      autoComplete="current-password"
                      className="bg-zinc-100 dark:bg-zinc-800/50 border-zinc-700/50  h-14 px-4 rounded-xl focus-visible:ring-red-500 focus-visible:ring-offset-red-500/20 focus-visible:ring-offset-2 placeholder:text-zinc-500"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                  <div className="flex justify-between">
                    {passwordError && <p className="text-red-400 text-xs mt-2 ml-1">{passwordError}</p>}
                    <Link
                      href="/forgot-password"
                      className="text-xs font-medium text-zinc-400 hover:text-red-400 transition-colors mt-2 ml-auto"
                    >
                      Forgot password?
                    </Link>
                  </div>
                </div>

                <Button
                  type="submit"
                  className="text-white w-full h-14 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600  rounded-xl font-medium text-base transition-all duration-300 shadow-lg shadow-red-600/20"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <Loader2 className="h-5 w-5 animate-spin" />
                  ) : (
                    <span className="flex items-center">
                      Sign In
                      <ChevronRight className="ml-2 h-5 w-5" />
                    </span>
                  )}
                </Button>
              </form>

              <div className="mt-6 flex items-center justify-center">
                <div className="w-1/2 border-t border-zinc-800"></div>
                <div className="px-3">OR</div>
                <div className="w-1/2 border-t border-zinc-800"></div>
         
              </div>

              <div className="mt-6">
                <Button
                  variant="outline"
                  className="w-full text-white bg-zinc-900 dark:bg-zinc-800/50 border-zinc-700/50  dark:hover:bg-zinc-100 dark:hover:text-black rounded-xl h-12"
                >
                  <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                      fill="#4285F4"
                    />
                    <path
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                      fill="#34A853"
                    />
                    <path
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                      fill="#FBBC05"
                    />
                    <path
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                      fill="#EA4335"
                    />
                  </svg>
                  Continue with Google
                </Button>
              </div>

              <div className="mt-8 text-center">
                <p className="text-zinc-500 text-sm">
                  Don't have an account?{" "}
                  <Link href="/signup" className="text-red-400 hover:text-red-300 font-medium">
                    Sign up
                  </Link>
                </p>
              </div>
            </div>
          </div>

          <p className="mt-6 text-center text-xs text-zinc-600">
            By signing in, you agree to our{" "}
            <Link href="/terms" className="text-zinc-400 hover:text-red-400 transition-colors">
              Terms
            </Link>{" "}
            and{" "}
            <Link href="/privacy" className="text-zinc-400 hover:text-red-400 transition-colors">
              Privacy Policy
            </Link>
          </p>
        </motion.div>
      </div>
    </div>
  )
}

