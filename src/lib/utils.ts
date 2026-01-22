import { clsx, type ClassValue } from "clsx"
// Remove import of 'tailwind-merge' because it's missing or cannot be resolved

export function cn(...inputs: ClassValue[]) {
  // Fallback to just clsx if tailwind-merge is unavailable
  return clsx(inputs)
}
