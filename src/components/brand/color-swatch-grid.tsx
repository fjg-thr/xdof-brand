"use client"

import { useMemo, useState } from "react"
import { Check, Copy } from "lucide-react"
import { cn } from "@/lib/utils"
import { useCopy } from "@/hooks"
import { formatColor, COLOR_FORMATS } from "@/lib/color"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import type { ColorPalette, ColorGroup, ColorEntry } from "@/lib/schema"

interface ColorSwatchGridProps {
  palette: ColorPalette
  readOnly?: boolean
  printMode?: boolean
}

export function ColorSwatchGrid({
  palette,
  readOnly = false,
  printMode = false,
}: ColorSwatchGridProps) {
  const { selectedColor, openShades, closeShades, setDialogOpen } = useShadeModal()

  return (
    <div className="space-y-14">
      {palette.groups.map((group) => (
        <ColorGroupBlock
          key={group.name}
          group={group}
          readOnly={readOnly}
          printMode={printMode}
          onOpenShadeModal={openShades}
        />
      ))}
      {!readOnly && (
        <ShadeScaleDialog
          color={selectedColor}
          open={!!selectedColor}
          onOpenChange={setDialogOpen}
          onClose={closeShades}
        />
      )}
    </div>
  )
}

function useShadeModal() {
  const [selectedColor, setSelectedColor] = useState<ColorEntry | null>(null)

  const openShades = (color: ColorEntry) => setSelectedColor(color)
  const closeShades = () => setSelectedColor(null)
  const setDialogOpen = (open: boolean) => {
    if (!open) closeShades()
  }

  return { selectedColor, openShades, closeShades, setDialogOpen }
}

interface ColorGroupBlockProps {
  group: ColorGroup
  readOnly: boolean
  printMode: boolean
  onOpenShadeModal: (color: ColorEntry) => void
}

function ColorGroupBlock({
  group,
  readOnly,
  printMode,
  onOpenShadeModal,
}: ColorGroupBlockProps) {
  const gridStyle = printMode
    ? { gridTemplateColumns: `repeat(${Math.max(group.colors.length, 1)}, minmax(0, 1fr))` }
    : undefined

  return (
    <div className={cn(printMode && "pdf-subsection-page")}>
      <h3 className="text-lg font-medium">{group.name}</h3>
      {group.description && (
        <p className="mt-1 text-sm text-muted-foreground">{group.description}</p>
      )}
      <div
        className={cn(
          "mt-6 grid gap-4",
          printMode ? "grid-flow-col" : "grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5"
        )}
        style={gridStyle}
      >
        {group.colors.map((color) => (
          <ColorSwatch
            key={`${group.name}:${color.name}:${color.hex}`}
            color={color}
            readOnly={readOnly}
            printMode={printMode}
            supportsShades={!isNeutralGroup(group.name)}
            onOpenShades={() => onOpenShadeModal(color)}
          />
        ))}
      </div>
    </div>
  )
}

interface ColorSwatchProps {
  color: ColorEntry
  readOnly: boolean
  printMode?: boolean
  supportsShades: boolean
  onOpenShades: () => void
}

function ColorSwatch({
  color,
  readOnly,
  printMode = false,
  supportsShades,
  onOpenShades,
}: ColorSwatchProps) {
  const { copy, isCopied } = useCopy()
  const isLight = isLightColor(color.hex)

  return (
    <div className="group">
      <div
        className={cn(
          printMode ? "aspect-3/2 rounded-md ring-1 ring-border/35" : "aspect-4/3 rounded-lg ring-1 ring-border/40",
          isLight && "ring-border/60"
        )}
        style={{ backgroundColor: color.hex }}
      />
      <div className={cn("mt-3 space-y-2", printMode && "mt-2 space-y-1.5")}>
        <p className={cn("text-sm font-medium", printMode && "text-xs")}>{color.name}</p>
        {color.usage && (
          <p className={cn("text-xs text-muted-foreground", printMode && "line-clamp-2 text-[10px]")}>
            {color.usage}
          </p>
        )}
        {readOnly ? (
          <ColorValueTextList value={color.hex} orientation="column" />
        ) : (
          <CopyFormatButtons
            value={color.hex}
            copy={copy}
            isCopied={isCopied}
            orientation="column"
            size="base"
            variant="icon"
            labelPrefix={`${color.name} base`}
          />
        )}
        {!readOnly && supportsShades && (
          <button
            onClick={onOpenShades}
            className={cn(
              "inline-flex w-full cursor-pointer items-center justify-center rounded px-1.5 py-1 text-[11px] transition-colors",
              "bg-muted/50 text-muted-foreground hover:bg-muted hover:text-foreground"
            )}
            aria-label={`Open shades for ${color.name}`}
          >
            View shades
          </button>
        )}
      </div>
    </div>
  )
}

function ShadeScaleDialog({
  color,
  open,
  onOpenChange,
  onClose,
}: {
  color: ColorEntry | null
  open: boolean
  onOpenChange: (open: boolean) => void
  onClose: () => void
}) {
  const shades = useMemo(() => buildShadeScale(color?.hex ?? ""), [color?.hex])
  const { copy, isCopied } = useCopy()

  if (!color) return null

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[85vh] max-w-[calc(100%-1rem)] gap-0 overflow-hidden p-0 sm:max-w-4xl">
        <DialogHeader className="border-b border-border/60 px-5 py-4">
          <DialogTitle>{color.name} Shades</DialogTitle>
          <DialogDescription>Expanded shade scale for {color.hex.toUpperCase()}</DialogDescription>
        </DialogHeader>
        <div className="overflow-y-auto p-5">
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
            {shades.map((shade) => (
              <ShadeCard
                key={`${color.hex}-${shade.label}`}
                colorName={color.name}
                label={shade.label}
                hex={shade.hex}
                copy={copy}
                isCopied={isCopied}
              />
            ))}
          </div>
        </div>
        <div className="border-t border-border/60 p-4">
          <button
            onClick={onClose}
            className="inline-flex w-full cursor-pointer items-center justify-center rounded-md border border-border/70 bg-background px-3 py-2 text-sm font-medium transition-colors hover:bg-muted/60 sm:w-auto"
            aria-label="Close shades dialog"
          >
            Close
          </button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

function ShadeCard({
  colorName,
  label,
  hex,
  copy,
  isCopied,
}: {
  colorName: string
  label: string
  hex: string
  copy: (value: string, options?: { successMessage?: string }) => Promise<void>
  isCopied: (value: string) => boolean
}) {
  return (
    <div
      className="flex min-h-32 w-full flex-col justify-between overflow-hidden rounded-md border border-border/60 bg-background"
      aria-label={`${colorName} shade ${label}`}
    >
      <div
        className="h-16 w-full ring-1 ring-inset ring-border/40"
        style={{ backgroundColor: hex }}
      />
      <div className="space-y-2 p-2">
        <div className="flex items-center justify-between text-[10px] text-muted-foreground">
          <span>{label}</span>
          <span className="font-mono uppercase">{hex}</span>
        </div>
        <CopyFormatButtons
          value={hex}
          orientation="row"
          copy={copy}
          isCopied={isCopied}
          size="shade"
          variant="check"
          labelPrefix={`${colorName} shade ${label}`}
        />
      </div>
    </div>
  )
}

interface CopyFormatButtonsProps {
  value: string
  orientation: "row" | "column"
  copy: (value: string, options?: { successMessage?: string }) => Promise<void>
  isCopied: (value: string) => boolean
  readOnly?: boolean
  size: "base" | "shade" | "text"
  variant: "icon" | "check" | "text"
  labelPrefix: string
}

function CopyFormatButtons({
  value,
  orientation,
  copy,
  isCopied,
  readOnly = false,
  size,
  variant,
  labelPrefix,
}: CopyFormatButtonsProps) {
  return (
    <div className={cn("pt-1", orientation === "row" ? "flex gap-1" : "flex flex-col gap-1")}>
      {COLOR_FORMATS.map(({ label, format }) => {
        const formattedValue = formatColor(value, format)
        const copied = isCopied(formattedValue)

        if (readOnly || variant === "text") {
          return (
            <p
              key={`${value}-${format}`}
              className={cn(
                "rounded bg-muted/40 px-2 py-1 font-mono text-muted-foreground",
                orientation === "row" ? "flex-1 text-center text-[10px]" : "text-[11px]"
              )}
            >
              {label}: {formattedValue}
            </p>
          )
        }

        return (
          <button
            key={`${value}-${format}`}
            onClick={() =>
              copy(formattedValue, {
                successMessage: `Copied ${labelPrefix} ${label}: ${formattedValue}`,
              })
            }
            className={cn(
              "inline-flex cursor-pointer items-center justify-center rounded transition-colors",
              orientation === "row" && "flex-1",
              size === "base" ? "gap-1 px-1.5 py-0.5 text-[11px]" : "gap-1 px-1.5 py-1 text-[10px]",
              copied
                ? "bg-emerald-50 text-emerald-700"
                : "bg-muted/50 text-muted-foreground hover:bg-muted hover:text-foreground"
            )}
            aria-label={`Copy ${labelPrefix} ${label}: ${formattedValue}`}
          >
            {variant === "icon" ? (
              <>
                {copied ? (
                  <Check className="h-3 w-3 text-emerald-600" />
                ) : (
                  <Copy className="h-3 w-3 opacity-40" />
                )}
                <span className="font-mono">{label}</span>
              </>
            ) : copied ? (
              <Check className="h-3 w-3" />
            ) : (
              <span className="font-mono">{label}</span>
            )}
          </button>
        )
      })}
    </div>
  )
}

function ColorValueTextList({
  value,
  orientation,
}: {
  value: string
  orientation: "row" | "column"
}) {
  return (
    <CopyFormatButtons
      value={value}
      orientation={orientation}
      copy={async () => Promise.resolve()}
      isCopied={() => false}
      readOnly
      size="text"
      variant="text"
      labelPrefix=""
    />
  )
}

function isNeutralGroup(groupName: string): boolean {
  return /neutral/i.test(groupName)
}

function isLightColor(hex: string): boolean {
  const match = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
  if (!match) return false
  const r = parseInt(match[1], 16)
  const g = parseInt(match[2], 16)
  const b = parseInt(match[3], 16)
  return (r * 299 + g * 587 + b * 114) / 1000 > 186
}

function buildShadeScale(hex: string): { label: string; hex: string }[] {
  const white = { r: 255, g: 255, b: 255 }
  const black = { r: 0, g: 0, b: 0 }
  const base = hexToRgb(hex)
  if (!base) return [{ label: "500", hex: hex.toUpperCase() }]

  const shadeConfig: Array<{ label: string; toward: "white" | "black"; amount: number }> = [
    { label: "50", toward: "white", amount: 0.92 },
    { label: "100", toward: "white", amount: 0.84 },
    { label: "200", toward: "white", amount: 0.68 },
    { label: "300", toward: "white", amount: 0.52 },
    { label: "400", toward: "white", amount: 0.28 },
    { label: "500", toward: "white", amount: 0 },
    { label: "600", toward: "black", amount: 0.14 },
    { label: "700", toward: "black", amount: 0.28 },
    { label: "800", toward: "black", amount: 0.45 },
    { label: "900", toward: "black", amount: 0.62 },
  ]

  return shadeConfig.map(({ label, toward, amount }) => {
    const target = toward === "white" ? white : black
    const mixed = mixRgb(base, target, amount)
    return { label, hex: rgbToHex(mixed.r, mixed.g, mixed.b) }
  })
}

function hexToRgb(hex: string): { r: number; g: number; b: number } | null {
  const match = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
  if (!match) return null
  return {
    r: parseInt(match[1], 16),
    g: parseInt(match[2], 16),
    b: parseInt(match[3], 16),
  }
}

function mixRgb(
  source: { r: number; g: number; b: number },
  target: { r: number; g: number; b: number },
  amount: number
): { r: number; g: number; b: number } {
  const clampAmount = Math.max(0, Math.min(1, amount))
  return {
    r: Math.round(source.r + (target.r - source.r) * clampAmount),
    g: Math.round(source.g + (target.g - source.g) * clampAmount),
    b: Math.round(source.b + (target.b - source.b) * clampAmount),
  }
}

function rgbToHex(r: number, g: number, b: number): string {
  const toHex = (value: number) =>
    Math.max(0, Math.min(255, value)).toString(16).padStart(2, "0")
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`.toUpperCase()
}
