"use client"

import { useState, useCallback, useEffect } from "react"

export function useLightbox() {
  const [isOpen, setIsOpen] = useState(false)
  const [currentIndex, setCurrentIndex] = useState(0)

  const open = useCallback((index: number) => {
    setCurrentIndex(index)
    setIsOpen(true)
  }, [])

  const close = useCallback(() => setIsOpen(false), [])

  const next = useCallback(
    (total: number) => setCurrentIndex((i) => (i + 1) % total),
    []
  )

  const prev = useCallback(
    (total: number) => setCurrentIndex((i) => (i - 1 + total) % total),
    []
  )

  useEffect(() => {
    if (!isOpen) return
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close()
    }
    window.addEventListener("keydown", handleKey)
    return () => window.removeEventListener("keydown", handleKey)
  }, [isOpen, close])

  return { isOpen, currentIndex, open, close, next, prev }
}
