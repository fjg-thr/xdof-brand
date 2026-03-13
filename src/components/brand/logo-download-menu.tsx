"use client"

import { Download, ChevronDown } from "lucide-react"
import { useState, useRef, useEffect } from "react"
import { cn } from "@/lib/utils"
import { useSvgToPng } from "@/hooks/use-svg-to-png"

interface LogoDownloadMenuProps {
  svgUrl: string
  name: string
  /** Render as a floating overlay button (solid white, works on any bg) */
  floating?: boolean
}

const PNG_SIZES = [256, 512, 1024, 2048]

export function LogoDownloadMenu({
  svgUrl,
  name,
  floating,
}: LogoDownloadMenuProps) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const { downloadAsPng } = useSvgToPng()

  const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, "-")

  useEffect(() => {
    if (!open) return
    const handleClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node))
        setOpen(false)
    }
    document.addEventListener("mousedown", handleClick)
    return () => document.removeEventListener("mousedown", handleClick)
  }, [open])

  return (
    <div ref={ref} className="relative inline-block">
      <button
        onClick={() => setOpen(!open)}
        className={cn(
          "inline-flex shrink-0 items-center gap-1.5 rounded-lg border px-3 py-1.5 text-sm font-medium transition-colors",
          floating
            ? "border-black/10 bg-white text-black shadow-md hover:bg-gray-50"
            : "border-border bg-card text-card-foreground shadow-sm hover:bg-muted"
        )}
      >
        <Download className="h-3.5 w-3.5" />
        Download
        <ChevronDown className="h-3 w-3 opacity-50" />
      </button>

      {open && (
        <div className="absolute right-0 top-full z-50 mt-1 w-44 rounded-lg border border-black/10 bg-white p-1 text-black shadow-xl">
          <a
            href={svgUrl}
            download={`${slug}.svg`}
            className="flex w-full items-center rounded-md px-3 py-1.5 text-sm hover:bg-gray-100"
            onClick={() => setOpen(false)}
          >
            SVG
            <span className="ml-auto text-[11px] text-gray-500">Vector</span>
          </a>
          {PNG_SIZES.map((size) => (
            <button
              key={size}
              onClick={() => {
                downloadAsPng(svgUrl, slug, size)
                setOpen(false)
              }}
              className="flex w-full items-center rounded-md px-3 py-1.5 text-sm hover:bg-gray-100"
            >
              PNG
              <span className="ml-auto text-[11px] text-gray-500">
                {size}px
              </span>
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
