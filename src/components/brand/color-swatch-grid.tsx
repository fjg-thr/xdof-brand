"use client"

import { Check, Copy } from "lucide-react"
import { cn } from "@/lib/utils"
import { useCopy } from "@/hooks"
import { formatColor, COLOR_FORMATS } from "@/lib/color"
import type { ColorPalette, ColorGroup, ColorEntry } from "@/lib/schema"

interface ColorSwatchGridProps {
  palette: ColorPalette
}

export function ColorSwatchGrid({ palette }: ColorSwatchGridProps) {
  return (
    <div className="space-y-14">
      {palette.groups.map((group) => (
        <ColorGroupBlock key={group.name} group={group} />
      ))}
    </div>
  )
}

function ColorGroupBlock({ group }: { group: ColorGroup }) {
  return (
    <div>
      <h3 className="text-lg font-medium">{group.name}</h3>
      {group.description && (
        <p className="mt-1 text-sm text-muted-foreground">{group.description}</p>
      )}
      <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
        {group.colors.map((color) => (
          <ColorSwatch key={color.hex} color={color} />
        ))}
      </div>
    </div>
  )
}

function ColorSwatch({ color }: { color: ColorEntry }) {
  const { copy, isCopied } = useCopy()
  const isLight = isLightColor(color.hex)

  return (
    <div className="group">
      <div
        className={cn(
          "aspect-[4/3] rounded-lg ring-1 ring-border/40",
          isLight && "ring-border/60"
        )}
        style={{ backgroundColor: color.hex }}
      />
      <div className="mt-3 space-y-1">
        <p className="text-sm font-medium">{color.name}</p>
        {color.usage && (
          <p className="text-xs text-muted-foreground">{color.usage}</p>
        )}
        <div className="flex flex-col gap-1 pt-1">
          {COLOR_FORMATS.map(({ label, format }) => {
            const value = formatColor(color.hex, format)
            const copied = isCopied(value)
            return (
              <button
                key={format}
                onClick={() => copy(value)}
                className={cn(
                  "inline-flex cursor-pointer items-center gap-1 rounded px-1.5 py-0.5 text-[11px] transition-colors",
                  "bg-muted/50 text-muted-foreground hover:bg-muted hover:text-foreground"
                )}
                aria-label={`Copy ${label} value: ${value}`}
              >
                {copied ? (
                  <Check className="h-3 w-3 text-emerald-600" />
                ) : (
                  <Copy className="h-3 w-3 opacity-40" />
                )}
                <span className="font-mono">{label}</span>
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}

function isLightColor(hex: string): boolean {
  const match = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
  if (!match) return false
  const r = parseInt(match[1], 16)
  const g = parseInt(match[2], 16)
  const b = parseInt(match[3], 16)
  return (r * 299 + g * 587 + b * 114) / 1000 > 186
}
