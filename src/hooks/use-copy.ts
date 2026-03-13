"use client"

import { useState, useCallback } from "react"

export function useCopy(timeout = 2000) {
  const [copiedValue, setCopiedValue] = useState<string | null>(null)

  const copy = useCallback(
    async (value: string) => {
      try {
        await navigator.clipboard.writeText(value)
        setCopiedValue(value)
        setTimeout(() => setCopiedValue(null), timeout)
      } catch {
        console.error("Failed to copy to clipboard")
      }
    },
    [timeout]
  )

  const isCopied = useCallback(
    (value: string) => copiedValue === value,
    [copiedValue]
  )

  return { copy, copiedValue, isCopied }
}
