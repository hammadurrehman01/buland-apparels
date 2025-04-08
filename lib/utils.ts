import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Format price in PKR
export function formatPrice(price: number): string {
  return new Intl.NumberFormat("ur-PK").format(price)
}
