"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import { toast } from "sonner"

interface CopyOptions {
  successMessage?: string
}

export function useCopy(timeout = 2000) {
  const [copiedValue, setCopiedValue] = useState<string | null>(null)
  const clearTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    return () => {
      if (clearTimerRef.current) {
        clearTimeout(clearTimerRef.current)
      }
    }
  }, [])

  const copy = useCallback(
    async (value: string, options?: CopyOptions) => {
      try {
        await navigator.clipboard.writeText(value)
        setCopiedValue(value)
        toast.success(options?.successMessage ?? "Copied to clipboard")
        if (clearTimerRef.current) {
          clearTimeout(clearTimerRef.current)
        }
        clearTimerRef.current = setTimeout(() => setCopiedValue(null), timeout)
      } catch {
        toast.error("Could not copy value")
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
