"use client"

import { useEffect, useCallback } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { useLightbox } from "@/hooks"
import type { GalleryCollection } from "@/lib/schema"

interface ImageGalleryProps {
  gallery: GalleryCollection
  printMode?: boolean
}

export function ImageGallery({ gallery, printMode = false }: ImageGalleryProps) {
  const { isOpen, currentIndex, open, close, next, prev } = useLightbox()
  const images = gallery.images
  const total = images.length

  const handlePrev = useCallback(() => prev(total), [prev, total])
  const handleNext = useCallback(() => next(total), [next, total])

  useEffect(() => {
    if (!isOpen) return
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") handlePrev()
      if (e.key === "ArrowRight") handleNext()
    }
    window.addEventListener("keydown", handleKey)
    return () => window.removeEventListener("keydown", handleKey)
  }, [isOpen, handlePrev, handleNext])

  const current = images[currentIndex]

  if (printMode) {
    return (
      <div className="space-y-0">
        {images.map((image) => (
          <div key={image.src} className="pdf-subsection-page">
            <div className="flex h-full flex-col justify-center rounded-lg border border-border/30 bg-card p-3">
              <img
                src={image.src}
                alt={image.alt}
                className="mx-auto max-h-[5.5in] w-full rounded-md object-contain"
              />
            </div>
          </div>
        ))}
      </div>
    )
  }

  return (
    <div>
      <div className="flex flex-col gap-4">
        {images.map((image, index) => (
          <button
            key={image.src}
            onClick={() => open(index)}
            className="group relative aspect-video overflow-hidden rounded-lg bg-muted"
          >
            <img
              src={image.src}
              alt={image.alt}
              className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
          </button>
        ))}
      </div>

      <Dialog open={isOpen} onOpenChange={(o) => !o && close()}>
        <DialogContent
          className="max-w-5xl border-0 bg-black/95 p-0"
        >
          <DialogTitle className="sr-only">Image preview</DialogTitle>
          <div className="relative flex min-h-[60vh] items-center justify-center">
            <Button
              variant="ghost"
              size="icon"
              onClick={handlePrev}
              className="absolute left-2 z-10 text-white hover:bg-white/10"
              aria-label="Previous image"
            >
              <ChevronLeft className="h-6 w-6" />
            </Button>

            {current && (
              <div className="flex flex-col items-center p-6">
                <img
                  src={current.src}
                  alt={current.alt}
                  className="max-h-[70vh] max-w-full object-contain"
                />
                {current.caption && (
                  <p className="mt-4 text-center text-sm text-white/70">
                    {current.caption}
                  </p>
                )}
              </div>
            )}

            <Button
              variant="ghost"
              size="icon"
              onClick={handleNext}
              className="absolute right-2 z-10 text-white hover:bg-white/10"
              aria-label="Next image"
            >
              <ChevronRight className="h-6 w-6" />
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
